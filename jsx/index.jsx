const { useState } = React;

// Constants and configurations
const ROOM_STATUSES = {
    AVAILABLE: 'Trống',
    RESERVED: 'Đã đặt',
    MAINTENANCE: 'Bảo trì'
};

const ROOM_TYPES = {
    STANDARD: 'Phòng Thường',
    DELUXE: 'Phòng Cao cấp',
    SUITE: 'Phòng Suite',
    FAMILY: 'Phòng Gia đình'
};

const STATUS_STYLES = {
    [ROOM_STATUSES.AVAILABLE]: { bg: 'success', text: 'success' },
    [ROOM_STATUSES.RESERVED]: { bg: 'warning', text: 'warning' },
    [ROOM_STATUSES.MAINTENANCE]: { bg: 'danger', text: 'danger' }
};

// Modal Components
const BookingModal = ({ show, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        guestName: '',
        checkIn: '',
        checkOut: '',
        roomType: ROOM_TYPES.STANDARD,
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Đặt Phòng</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Tên Khách</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.guestName}
                                    onChange={e => setFormData({ ...formData, guestName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ngày nhận phòng</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={formData.checkIn}
                                    onChange={e => setFormData({ ...formData, checkIn: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ngày trả phòng</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={formData.checkOut}
                                    onChange={e => setFormData({ ...formData, checkOut: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Loại phòng</label>
                                <select
                                    className="form-select"
                                    value={formData.roomType}
                                    onChange={e => setFormData({ ...formData, roomType: e.target.value })}
                                >
                                    {Object.values(ROOM_TYPES).map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ghi chú</label>
                                <textarea
                                    className="form-control"
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Đóng</button>
                            <button type="submit" className="btn btn-primary">Đặt phòng</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const FilterModal = ({ show, onClose, onApply }) => {
    const [filters, setFilters] = useState({
        priceRange: { min: 0, max: 1000 },
        roomTypes: Object.values(ROOM_TYPES).reduce((acc, type) => ({ ...acc, [type]: false }), {}),
        dateRange: { start: '', end: '' }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onApply(filters);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Lọc Phòng</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Khoảng giá</label>
                                <div className="d-flex gap-2">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Thấp nhất"
                                        value={filters.priceRange.min}
                                        onChange={e => setFilters({
                                            ...filters,
                                            priceRange: { ...filters.priceRange, min: e.target.value }
                                        })}
                                    />
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Cao nhất"
                                        value={filters.priceRange.max}
                                        onChange={e => setFilters({
                                            ...filters,
                                            priceRange: { ...filters.priceRange, max: e.target.value }
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Loại phòng</label>
                                {Object.values(ROOM_TYPES).map(type => (
                                    <div className="form-check" key={type}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={filters.roomTypes[type]}
                                            onChange={e => setFilters({
                                                ...filters,
                                                roomTypes: {
                                                    ...filters.roomTypes,
                                                    [type]: e.target.checked
                                                }
                                            })}
                                        />
                                        <label className="form-check-label">{type}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Khoảng thời gian</label>
                                <div className="d-flex gap-2">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={filters.dateRange.start}
                                        onChange={e => setFilters({
                                            ...filters,
                                            dateRange: { ...filters.dateRange, start: e.target.value }
                                        })}
                                    />
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={filters.dateRange.end}
                                        onChange={e => setFilters({
                                            ...filters,
                                            dateRange: { ...filters.dateRange, end: e.target.value }
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
                            <button type="submit" className="btn btn-primary">Áp dụng</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const AddRoomModal = ({ show, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        roomId: '',
        type: ROOM_TYPES.STANDARD,
        price: '',
        status: ROOM_STATUSES.AVAILABLE,
        homestay: '',
        floor: '',
        facilities: [],
        description: ''
    });

    const homestays = [
        { id: 'all', name: 'Tất cả Homestay' },
        { id: 'hs1', name: 'Biệt thự Ven biển' },
        { id: 'hs2', name: 'Nhà nghỉ Núi' },
        { id: 'hs3', name: 'Căn hộ Thành phố' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content d-flex flex-column" style={{ height: '90vh' }}>
                    <div className="modal-header border-0">
                        <h5 className="modal-title fw-bold">Thêm Phòng Mới</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body flex-grow-1 overflow-auto" style={{ maxHeight: '70vh' }}>
                            <div className="row">
                                {/* Basic Information Group */}
                                <div className="col-md-6">
                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h6 className="card-title mb-0">Thông Tin Cơ Bản</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <label className="form-label">Mã phòng</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={formData.roomId}
                                                    onChange={e => setFormData({ ...formData, roomId: e.target.value })}
                                                    required
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Loại phòng</label>
                                                <select
                                                    className="form-select"
                                                    value={formData.type}
                                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                                    required
                                                >
                                                    {Object.values(ROOM_TYPES).map(type => (
                                                        <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Giá phòng</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">₫</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={formData.price}
                                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                                        required
                                                    />
                                                    <span className="input-group-text">/đêm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Location and Status Group */}
                                <div className="col-md-6">
                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h6 className="card-title mb-0">Vị Trí & Trạng Thái</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <label className="form-label">Trạng thái</label>
                                                <select
                                                    className="form-select"
                                                    value={formData.status}
                                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                                    required
                                                >
                                                    {Object.values(ROOM_STATUSES).map(status => (
                                                        <option key={status} value={status}>{status}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Homestay</label>
                                                <select
                                                    className="form-select"
                                                    value={formData.homestay}
                                                    onChange={e => setFormData({ ...formData, homestay: e.target.value })}
                                                    required
                                                >
                                                    <option value="">Chọn Homestay</option>
                                                    {homestays.filter(h => h.id !== 'all').map(homestay => (
                                                        <option key={homestay.id} value={homestay.id}>
                                                            {homestay.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Tầng</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={formData.floor}
                                                    onChange={e => setFormData({ ...formData, floor: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Facilities and Description Group */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h6 className="card-title mb-0">Tiện Nghi & Mô Tả</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <label className="form-label">Tiện nghi</label>
                                                <div className="row g-2">
                                                    {['TV', 'Tủ lạnh', 'Điều hòa', 'WiFi', 'Máy giặt', 'Bếp'].map(facility => (
                                                        <div className="col-md-4" key={facility}>
                                                            <div className="form-check">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id={`facility-${facility}`}
                                                                    checked={formData.facilities.includes(facility)}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) {
                                                                            setFormData({
                                                                                ...formData,
                                                                                facilities: [...formData.facilities, facility]
                                                                            });
                                                                        } else {
                                                                            setFormData({
                                                                                ...formData,
                                                                                facilities: formData.facilities.filter(f => f !== facility)
                                                                            });
                                                                        }
                                                                    }}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`facility-${facility}`}
                                                                >
                                                                    {facility}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Mô tả</label>
                                                <textarea
                                                    className="form-control"
                                                    rows="3"
                                                    value={formData.description}
                                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Đóng</button>
                            <button type="submit" className="btn btn-primary">Thêm phòng</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Stats Card Component
const StatsCard = ({ title, stats, colorClass }) => (
    <div className="col-md-6 ">
        <div className={`card h-100 border-0 shadow-sm ${colorClass}`}>
            <div className="card-body">
                <h6 className="card-title text-uppercase fw-bold text-muted mb-3">{title}</h6>
                <div className="d-flex justify-content-between">
                    {Object.entries(stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                            <h3 className="fs-2 fw-bold mb-1">{value}</h3>
                            <small className="text-muted text-uppercase">{key.toUpperCase()}</small>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// Main Component
const RoomManagement = () => {
    const [selectedHomestay, setSelectedHomestay] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('ALL');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showAddRoomModal, setShowAddRoomModal] = useState(false);

    const stats = {
        homeStays: {
            total: 500,
            available: 120,
            booked: 300,
            maintenance: 50,
        },
        rooms: {
            total: 1500,
            available: 400,
            reserved: 900,
            maintenance: 100,
        },
    };

    const homestays = [
        { id: 'all', name: 'Tất cả Homestay' },
        { id: 'hs1', name: 'Biệt thự Ven biển' },
        { id: 'hs2', name: 'Nhà nghỉ Núi' },
        { id: 'hs3', name: 'Căn hộ Thành phố' },
    ];

    const rooms = [
        {
            id: 'R001',
            type: ROOM_TYPES.DELUXE,
            price: 199.99,
            status: ROOM_STATUSES.AVAILABLE,
            bookingDate: '-',
            checkInDate: '-',
            homestay: 'hs1'
        },
        {
            id: 'R002',
            type: ROOM_TYPES.SUITE,
            price: 299.99,
            status: ROOM_STATUSES.RESERVED,
            bookingDate: 'Apr 02, 2024',
            checkInDate: 'Apr 15, 2024',
            homestay: 'hs1'
        },
        {
            id: 'R003',
            type: ROOM_TYPES.STANDARD,
            price: 149.99,
            status: ROOM_STATUSES.MAINTENANCE,
            bookingDate: '-',
            checkInDate: '-',
            homestay: 'hs2'
        },
    ];

    const handleBookRoom = (bookingData) => {
        console.log('Booking data:', bookingData);
        // Implement booking logic
    };

    const handleApplyFilters = (filters) => {
        console.log('Applied filters:', filters);
        // Implement filtering logic
    };

    const handleAddRoom = (roomData) => {
        console.log('New room data:', roomData);
        // Implement adding logic
    };

    const filteredRooms = rooms.filter(room => {
        const matchesHomestay = selectedHomestay === 'all' || room.homestay === selectedHomestay;
        const matchesSearch = room.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = activeTab === 'ALL' || room.status === activeTab;
        return matchesHomestay && matchesSearch && matchesTab;
    });

    return (
        <div className="container-fluid p-4">
            {/* Stats Cards */}
            <div className="row mb-4">
                <StatsCard
                    title="THỐNG KÊ HOMESTAY"
                    stats={{
                        'Tổng số': stats.homeStays.total,
                        'Còn trống': stats.homeStays.available,
                        'Đã đặt': stats.homeStays.booked,
                        'Bảo trì': stats.homeStays.maintenance
                    }}
                    colorClass="bg-info-subtle"
                />
                <StatsCard
                    title="THỐNG KÊ PHÒNG"
                    stats={{
                        'Tổng số': stats.rooms.total,
                        'Còn trống': stats.rooms.available,
                        'Đã đặt': stats.rooms.reserved,
                        'Bảo trì': stats.rooms.maintenance
                    }}
                    colorClass="bg-primary-subtle"
                />
            </div>

            {/* Search and Actions */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex gap-3 align-items-center w-75">
                    <div className="input-group w-50">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm phòng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ minWidth: '150px' }}
                        />
                    </div>
                    <select
                        className="form-select w-25"
                        value={selectedHomestay}
                        onChange={(e) => setSelectedHomestay(e.target.value)}
                        style={{ minWidth: '150px' }}
                    >
                        {homestays.map(homestay => (
                            <option key={homestay.id} value={homestay.id}>
                                {homestay.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex flex-nowrap gap-2 ">
                    <button
                        className="btn btn-outline-secondary text-nowrap"
                        onClick={() => setShowFilterModal(true)}
                    >
                        <i className="bi bi-funnel"></i> Lọc
                    </button>
                    <button
                        className="btn btn-primary text-nowrap"
                        onClick={() => setShowAddRoomModal(true)}
                    >
                        <i className="bi bi-plus-lg"></i> Thêm phòng
                    </button>
                    <button
                        className="btn btn-success text-nowrap"
                        onClick={() => setShowBookingModal(true)}
                    >
                        <i className="bi bi-calendar-check"></i> Đặt phòng
                    </button>
                </div>
            </div>

            {/* Room Tabs */}
            <div className="mb-4">
                <ul className="nav nav-tabs">
                    {['ALL', ...Object.values(ROOM_STATUSES)].map(status => (
                        <li className="nav-item" key={status}>
                            <a
                                className={`nav-link ${activeTab === status ? 'active' : ''}`}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab(status);
                                }}
                            >
                                {status.toUpperCase()} ({
                                    status === 'ALL'
                                        ? rooms.length
                                        : rooms.filter(room => room.status === status).length
                                })
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Rooms Table */}
            <div className="table-responsive">
                <table className="table">
                    <thead className="bg-light">
                        <tr>
                            <th className="border-0 text-uppercase text-muted fw-bold">Mã phòng</th>
                            <th className="border-0 text-uppercase text-muted fw-bold">Loại phòng</th>
                            <th className="border-0 text-uppercase text-muted fw-bold">Giá</th>
                            <th className="border-0 text-uppercase text-muted fw-bold">Trạng thái</th>
                            <th className="border-0 text-uppercase text-muted fw-bold">Ngày đặt</th>
                            <th className="border-0 text-uppercase text-muted fw-bold">Ngày nhận</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRooms.map(room => (
                            <tr key={room.id}>
                                <td>{room.id}</td>
                                <td>{room.type}</td>
                                <td>${room.price}</td>
                                <td>
                                    <span className={`badge rounded-pill bg-${STATUS_STYLES[room.status].bg}-subtle text-${STATUS_STYLES[room.status].text}`}>
                                        {room.status}
                                    </span>
                                </td>
                                <td>{room.bookingDate}</td>
                                <td>{room.checkInDate}</td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-link text-muted" data-bs-toggle="dropdown">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Chỉnh sửa</a></li>
                                            <li><a className="dropdown-item" href="#">Xóa</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            <BookingModal
                show={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                onSubmit={handleBookRoom}
            />
            <FilterModal
                show={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                onApply={handleApplyFilters}
            />
            <AddRoomModal
                show={showAddRoomModal}
                onClose={() => setShowAddRoomModal(false)}
                onSubmit={handleAddRoom}
            />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('index-root'));
root.render(<RoomManagement />);