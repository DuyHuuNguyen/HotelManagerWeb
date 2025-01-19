const { useState, useEffect } = React;

// Utility function to generate random data
const generateMonthlyData = (baseValue, variance) => {
  return Array.from({ length: 12 }, () => 
    Math.floor(baseValue + (Math.random() - 0.5) * variance)
  );
};

// Progress Bar Component
const ProgressBar = ({ value, max }) => (
  <div className="progress mt-2 mb-3" style={{ height: "10px" }}>
    <div 
      className="progress-bar" 
      role="progressbar" 
      style={{ width: `${(value/max * 100)}%`, backgroundColor: "#00ACC1" }}
      aria-valuenow={value} 
      aria-valuemin="0" 
      aria-valuemax={max}
    ></div>
  </div>
);

// Stats Card Component
const StatsCard = ({ title, value, icon, trend, link }) => (
  <div className="col-md-6 col-lg-3 mb-4">
    <a href={link} className="text-decoration-none">
      <div className="card border-0 shadow h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center h-100">
            <div>
              <h6 className="text-muted">{title}</h6>
              {value !== undefined && <h3 className="text-dark mb-0">{Number(value).toLocaleString()}</h3>}
              {trend !== undefined && (
                <small className="text-secondary">
                  <i className={`fas fa-arrow-${trend > 0 ? 'up text-success' : 'down text-danger'} me-1`}></i>
                  {Math.abs(trend)}% so với tháng trước
                </small>
              )}
            </div>
            <div className="bg-secondary bg-opacity-10 p-3 rounded d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
              <i className={`fas fa-${String(icon).replace(/[^a-z-]/g, '')} fa-2x`} style={{ color: "#00ACC1" }} title={title}></i>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
);

// Chart Section Component
const ChartSection = ({ title, data, chartId, type = 'line' }) => {
  useEffect(() => {
    const ctx = document.getElementById(chartId);
    if (ctx) {
    const chartConfig = {
      type: type,
      data: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [{
          label: title,
          data: data,
          borderColor: '#00ACC1',
          backgroundColor: type === 'bar' ? '#00ACC1' : 'transparent',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
          display: false
        }
        },
        scales: {
        x: {
          grid: {
            display: false,
          }
        },
        y: {
          beginAtZero: true,
        }
        }
      }
    };

      new Chart(ctx, chartConfig);
    }
  }, [data]);

  return (
    <div className="col-12 col-md-6 mb-4">
      <div className="card border-0 shadow h-100">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div style={{ height: '300px', width: '100%' }}>
            <canvas id={chartId} style={{ width: '100%', height: '100%' }}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

//Status Component
const Status = ({ stats }) => {
  const [activeTab, setActiveTab] = useState('rooms');

  const occupancyRate = Math.round((stats.rooms.booked / stats.rooms.total) * 100);
  const homestayActiveRate = Math.round((80/stats.homestays) * 100);

  const StatusContent = {
    rooms: {
      details: (
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Phòng trống</span>
            <span className="badge bg-secondary">{stats.rooms.available}</span>
          </div>
          <ProgressBar value={stats.rooms.available} max={stats.rooms.total} />

          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Đang đặt</span>
            <span className="badge bg-secondary">{stats.rooms.booked}</span>
          </div>
          <ProgressBar value={stats.rooms.booked} max={stats.rooms.total} />

          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Bảo trì</span>
            <span className="badge bg-secondary">{stats.rooms.maintenance}</span>
          </div>
          <ProgressBar value={stats.rooms.maintenance} max={stats.rooms.total} />

          <div className="alert alert-secondary mt-3">
            <i className="fas fa-info-circle me-2"></i>
            Tỷ lệ lấp đầy: {occupancyRate}%
          </div>
        </div>
      )
    },
    homestays: {
      details: (
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Đang hoạt động</span>
            <span className="badge bg-secondary">80</span>
          </div>
          <ProgressBar value={80} max={stats.homestays} />

          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Tạm ngưng</span>
            <span className="badge bg-secondary">30</span>
          </div>
          <ProgressBar value={30} max={stats.homestays} />

          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>Đang xét duyệt</span>
            <span className="badge bg-secondary">10</span>
          </div>
          <ProgressBar value={10} max={stats.homestays} />

          <div className="alert alert-secondary mt-3">
            <i className="fas fa-info-circle me-2"></i>
            Tỷ lệ hoạt động: {homestayActiveRate}%
          </div>
        </div>
      )
    }
  };

  return (
    <>
      <div className="col-12 col-md-6 mb-4">
        <div className="card border-0 shadow h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title mb-0">Trạng thái chi tiết</h5>
              <div className="nav nav-pills">
                <button 
                  className={`nav-link btn btn-sm me-2 ${activeTab === 'rooms' ? 'active bg-secondary' : 'text-secondary'}`}
                  onClick={() => setActiveTab('rooms')}
                >
                  <i className="fas fa-bed me-1"></i> Phòng
                </button>
                <button 
                  className={`nav-link btn btn-sm ${activeTab === 'homestays' ? 'active bg-secondary' : 'text-secondary'}`}
                  onClick={() => setActiveTab('homestays')}
                >
                  <i className="fas fa-home me-1"></i> Nhà nghỉ
                </button>
              </div>
            </div>
            {StatusContent[activeTab].details}
          </div>
        </div>
      </div>
    </>
  );
};

// Recent Activity Component
const RecentActivity = () => {
  const activities = [
    { type: 'booking', user: 'Nguyễn Văn A', action: 'đặt phòng', time: '5 phút trước', location: 'Homestay Đà Lạt' },
    { type: 'comment', user: 'Trần Thị B', action: 'bình luận', time: '10 phút trước', location: 'Villa Hồ Tây' },
    { type: 'check-in', user: 'Lê Văn C', action: 'check-in', time: '15 phút trước', location: 'Resort Phú Quốc' },
    { type: 'review', user: 'Mai Thị E', action: 'đánh giá', time: '25 phút trước', location: 'Homestay Sapa' },
    { type: 'check-out', user: 'Phạm Thị D', action: 'check-out', time: '1 giờ trước', location: 'Villa Vũng Tàu' }
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'booking': return 'calendar-check';
      case 'check-in': return 'sign-in-alt';
      case 'check-out': return 'sign-out-alt';
      case 'review': return 'star';
      case 'comment': return 'comment';
      default: return 'circle';
    }
  };

  return (
    <div className="col-12 col-md-6 mb-4">
      <div className="card border-0 shadow h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="card-title m-0">Hoạt động gần đây</h5>
            <a href="#" className="text-decoration-none">
              <small className="text-muted">Xem tất cả <i className="fas fa-chevron-right ms-1"></i></small>
            </a>
          </div>
          <div className="activity-list">
            {activities.map((activity, index) => (
              <div key={index} className="d-flex align-items-start mb-3 pb-3" 
                   style={{ borderBottom: index !== activities.length - 1 ? '1px solid #eee' : 'none' }}>
                <div className="activity-icon me-3">
                  <div className="rounded-circle p-2 bg-secondary" 
                       style={{
                         width: '40px',
                         height: '40px',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center'
                       }}>
                    <i className={`fas fa-${getActivityIcon(activity.type)} text-white`}></i>
                  </div>
                </div>
                <div className="activity-details flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <div className="fw-bold">{activity.user}</div>
                      <div className="text-muted small">
                        {activity.action} - <span>{activity.location}</span>
                      </div>
                    </div>
                    <small className="text-muted ms-2">{activity.time}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [stats, setStats] = useState({
    rooms: { total: 150, available: 50, booked: 80, maintenance: 20 },
    users: { total: 1200, active: 800, new: 50 },
    posts: { total: 300, published: 250, draft: 50 },
    bookings: { total: 450, pending: 30, confirmed: 400, completed: 20 },
    locations: 25,
    homestays: 120,
    comments: 450
  });

  const occupancyRate = Math.round((stats.rooms.booked / stats.rooms.total) * 100);

  return (
    <div className="container-fluid">
      <div className="row">
        <StatsCard 
          title="Danh mục"
          icon="list"
          link="23130028_LeNgocChau_danhmuc.html"
        />
        <StatsCard
          title="Bài viết" 
          value={stats.posts.total}
          icon="file-alt"
          trend={-1}
          link="23130039_NguyenXuanDai_bai_viet.html"
        />
        <StatsCard 
          title="Địa điểm"
          value={stats.locations}
          icon="map-marker-alt"
          link="23130039_NguyenXuanDai_dia_diem.html"
          trend={3}
        />
        <StatsCard
          title="Nhà nghỉ" 
          value={stats.homestays}
          icon="hotel"
          link="23130075_NguyenHuuDuy_homestay.html"
          trend={5}
        />
        <StatsCard 
          title="Tổng số phòng"
          value={stats.rooms.total}
          icon="bed"
          link="23130370_NguyenVoQuocTuan_rooms.html"
          trend={5}
        />
        <StatsCard
          title="Đặt phòng"
          value={stats.bookings.total}
          icon="calendar-alt"
          trend={8}
          link="23130107_NguyenDinhHieu_danhSachDatPhong.html"
        />
        <StatsCard
          title="Bình luận"
          value={stats.comments}
          icon="comments"
          link="23130028_LeNgocChau_comment.html"
          trend={2}
        />
        <StatsCard 
          title="Vai trò"
          icon="user-cog"
          link="23130075_NguyenHuuDuy_role.html"
        />
        <StatsCard 
          title="Người dùng"
          value={stats.users.total}
          icon="users"
          trend={2}
          link="23130107_NguyenDinhHieu_nguoiDung.html"
        />
      </div>

      {/* Charts */}
      <div className="row">
        <ChartSection 
          title="Thống kê đặt phòng theo tháng"
          data={generateMonthlyData(100, 50)}
          chartId="bookingsChart"
          type="line"
        />
        <ChartSection
          title="Doanh thu theo tháng (Triệu VNĐ)"
          data={generateMonthlyData(500, 200)}
          chartId="revenueChart"
          type="bar"
        />
      </div>

      {/* Status and Recent Activity */}
      <div className="row">
        <Status stats={stats} />
        <RecentActivity />
      </div>
    </div>
  );
};

// Render the dashboard
const root = ReactDOM.createRoot(document.getElementById('index-root'));
root.render(<Dashboard />);
