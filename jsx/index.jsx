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
      className="progress-bar bg-primary" 
      role="progressbar" 
      style={{ width: `${(value/max * 100)}%` }}
      aria-valuenow={value} 
      aria-valuemin="0" 
      aria-valuemax={max}
    ></div>
  </div>
);

// Stats Card Component
const StatsCard = ({ title, value, icon, trend }) => (
  <div className="col-md-6 col-lg-3 mb-4">
    <div className="card border-0 shadow h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted">{title}</h6>
            <h3 className="mb-0">{value.toLocaleString()}</h3>
            {trend && (
              <small className="text-secondary">
                <i className={`fas fa-arrow-${trend > 0 ? 'up text-success' : 'down text-danger'} me-1`}></i>
                {Math.abs(trend)}% so với tháng trước
              </small>
            )}
          </div>
          <div className="bg-secondary bg-opacity-10 p-3 rounded">
            <i className={`fas fa-${icon.replace(/[^a-z-]/g, '')} fa-2x text-primary`}></i>
          </div>
        </div>
      </div>
    </div>
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
          borderColor: '#0d6efd',
          backgroundColor: type === 'bar' ? '#0d6efd' : 'transparent',
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

// Recent Activity Component
const RecentActivity = () => {
  const activities = [
    { type: 'booking', user: 'Nguyễn Văn A', action: 'đặt phòng', time: '5 phút trước' },
    { type: 'check-in', user: 'Trần Thị B', action: 'check-in', time: '15 phút trước' },
    { type: 'review', user: 'Lê Văn C', action: 'đánh giá', time: '30 phút trước' },
    { type: 'check-out', user: 'Phạm Thị D', action: 'check-out', time: '1 giờ trước' }
  ];

  return (
    <div className="col-12 col-md-6 mb-4">
      <div className="card border-0 shadow h-100">
        <div className="card-body">
          <h5 className="card-title">Hoạt động gần đây</h5>
          <div className="activity-list">
            {activities.map((activity, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <div className="activity-icon me-3">
                  <i className={`fas fa-$
                    {activity.type === 'booking' ? 'calendar' :
                    activity.type === 'check-in' ? 'sign-in-alt' :
                    activity.type === 'check-out' ? 'sign-out-alt' : 'star'} text-secondary`}></i>
                </div>
                <div className="activity-details">
                  <div className="fw-bold">{activity.user}</div>
                  <div className="text-muted small">
                    {activity.action} - {activity.time}
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
    bookings: { total: 450, pending: 30, confirmed: 400, completed: 20 }
  });

  const occupancyRate = Math.round((stats.rooms.booked / stats.rooms.total) * 100);

  return (
    <div className="container-fluid">
      {/* Stats Cards */}
      <div className="row">
        <StatsCard 
          title="Tổng số phòng"
          value={stats.rooms.total}
          icon="bed"
          trend={5}
        />
        <StatsCard
          title="Người dùng" 
          value={stats.users.total}
          icon="users"
          trend={2}
        />
        <StatsCard
          title="Bài viết"
          value={stats.posts.total} 
          icon="newspaper"
          trend={-1}
        />
        <StatsCard
          title="Đặt phòng"
          value={stats.bookings.total}
          icon="calendar"
          trend={8}
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

      {/* Room Status and Recent Activity */}
      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          <div className="card border-0 shadow h-100">
            <div className="card-body">
              <h5 className="card-title">Trạng thái phòng</h5>
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

                <div className="alert alert-primary mt-3">
                  <i className="fas fa-info-circle me-2"></i>
                  Tỷ lệ lấp đầy: {occupancyRate}%
                </div>
              </div>
            </div>
          </div>
        </div>
        <RecentActivity />
      </div>
    </div>
  );
};

// Render the dashboard
const root = ReactDOM.createRoot(document.getElementById('index-root'));
root.render(<Dashboard />);
