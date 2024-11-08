// Import React hooks
const { useState, useRef } = React;

// Initial room data
const initialRooms = [
    {
        id: 1,
        name: "Deluxe Room with Hammock",
        image: "https://i.pinimg.com/736x/90/eb/df/90ebdf2408037ade7af157117b96b0dd.jpg",
        homestay: "Green Suites Hotel",
        location: "Công viên Hạ Long",
        price: 1550000,
        discount: 0,
        maxGuests: 12,
        type: "Phòng vip",
        status: "Đang trống"
    }
];

// Icons components (since we can't use lucide-react in this setup)
const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
    </svg>
);

const ImageUploadSection = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageUpload = (files) => {
        const file = files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        
        const files = Array.from(e.dataTransfer.files);
        handleImageUpload(files);
    };

    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files);
        handleImageUpload(files);
    };

    return (
        <div className="row mb-4">
            <div className="col-12">
                <div className="card border-light bg-light">
                    <div className="card-header">
                        <h5 className="mb-0">Hình ảnh</h5>
                    </div>
                    <div className="card-body">
                        <div 
                            className={`upload-area p-4 border rounded ${isDragging ? 'border-primary' : 'border-dashed'}`}
                            style={{
                                backgroundColor: isDragging ? 'rgba(0,123,255,0.1)' : 'white',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onClick={() => fileInputRef.current.click()}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <div className="text-center">
                                <i className="fas fa-cloud-upload-alt fa-3x text-primary mb-3"></i>
                                <p className="mb-2">Kéo và thả hình ảnh vào đây hoặc</p>
                                <button 
                                    type="button" 
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    Chọn tệp
                                </button>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="d-none"
                                accept="image/*"
                                onChange={handleFileInputChange}
                                multiple
                            />
                        </div>
                        
                        {imagePreview && (
                            <div className="mt-3">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="img-thumbnail"
                                    style={{ maxHeight: '200px' }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const EditRoomPage = ({ room, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        homestay: '',
        location: '',
        price: 0,
        discount: 0,
        maxGuests: 1,
        type: 'Phòng vip',
        status: 'Đang trống',
        description: '',
        roomAmenities: '',
        images: [],
        roomSize: '',
        bedConfiguration: ''
    });

    const [imagePreview, setImagePreview] = useState(null);

    React.useEffect(() => {
        if (room) {
            setFormData({
                name: room.name || '',
                homestay: room.homestay || '',
                location: room.location || '',
                price: room.price || 0,
                discount: room.discount || 0,
                maxGuests: room.maxGuests || 1,
                type: room.type || 'Phòng vip',
                status: room.status || 'Đang trống',
                description: room.description || '',
                roomAmenities: room.roomAmenities || '',
                images: room.images || [],
                roomSize: room.roomSize || '',
                bedConfiguration: room.bedConfiguration || ''
            });
        }
    }, [room]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const roomTypes = [
        { id: 1, name: 'Phòng vip' },
        { id: 2, name: 'Phòng standard' },
        { id: 3, name: 'Phòng deluxe' }
    ];

    const statusOptions = [
        'Đang trống',
        'Đã đặt',
        'Đang sửa chữa'
    ];

    const homestayOptions = [
        'Green Suites Hotel',
        'Luxury Resort',
        'Beach Villa'
    ];

    const locationOptions = [
        'Công viên Hạ Long',
        'Phố cổ Hội An',
        'Vịnh Hạ Long'
    ];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleMaxGuestsChange = (e) => {
        const value = Math.max(1, Number(e.target.value));
        setFormData(prevData => ({
            ...prevData,
            maxGuests: value
        }));
    };

    return (
        <div className="container-fluid p-4">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Basic Information Group */}
                        <div className="row mb-4">
                            <div className="col-12">
                                <div className="card border-light bg-light">
                                    <div className="card-header">
                                        <h5 className="mb-0">Thông tin cơ bản</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Tên phòng</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control form-control-lg"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">HomeStay</label>
                                                <select
                                                    name="homestay"
                                                    className="form-select form-select-lg"
                                                    value={formData.homestay}
                                                    onChange={handleChange}
                                                >
                                                    {homestayOptions.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing and Capacity Group */}
                        <div className="row mb-4">
                            <div className="col-12">
                                <div className="card border-light bg-light">
                                    <div className="card-header">
                                        <h5 className="mb-0">Giá và sức chứa</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-md-3">
                                                <label className="form-label fw-bold">Giá (VND)</label>
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        className="form-control"
                                                        value={formData.price}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <span className="input-group-text">VND</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label fw-bold">Giảm giá (%)</label>
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        name="discount"
                                                        className="form-control"
                                                        value={formData.discount}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="input-group-text">%</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label fw-bold">Số người tối đa</label>
                                                <input
                                                    type="number"
                                                    name="maxGuests"
                                                    className="form-control"
                                                    value={formData.maxGuests}
                                                    onChange={handleMaxGuestsChange}
                                                    min="1"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label fw-bold">Kích thước phòng</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        name="roomSize"
                                                        className="form-control"
                                                        value={formData.roomSize}
                                                        onChange={(e) => setFormData({ ...formData, roomSize: e.target.value })}
                                                    />
                                                    <span className="input-group-text">m²</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Room Details Group */}
                        <div className="row mb-4">
                            <div className="col-12">
                                <div className="card border-light bg-light">
                                    <div className="card-header">
                                        <h5 className="mb-0">Chi tiết phòng</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <label className="form-label fw-bold">Kiểu phòng</label>
                                                <select
                                                    name="type"
                                                    className="form-select"
                                                    value={formData.type}
                                                    onChange={handleChange}
                                                >
                                                    {roomTypes.map(type => (
                                                        <option key={type.id} value={type.name}>{type.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label fw-bold">Trạng thái</label>
                                                <select
                                                    name="status"
                                                    className="form-select"
                                                    value={formData.status}
                                                    onChange={handleChange}
                                                >
                                                    {statusOptions.map(status => (
                                                        <option key={status} value={status}>{status}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label fw-bold">Cấu hình giường</label>
                                                <input
                                                    type="text"
                                                    name="bedConfiguration"
                                                    className="form-control"
                                                    value={formData.bedConfiguration}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description and Amenities Group */}
                        <div className="row mb-4">
                            <div className="col-12">
                                <div className="card border-light bg-light">
                                    <div className="card-header">
                                        <h5 className="mb-0">Mô tả và tiện nghi</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Mô tả phòng</label>
                                                <textarea
                                                    name="description"
                                                    className="form-control"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    rows="4"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Tiện nghi phòng</label>
                                                <textarea
                                                    name="roomAmenities"
                                                    className="form-control"
                                                    value={formData.roomAmenities}
                                                    onChange={handleChange}
                                                    rows="4"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Images Group */}
                        <ImageUploadSection />

                        {/* Action Buttons */}
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="btn btn-secondary btn-lg px-4"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg px-4"
                                    >
                                        Lưu dữ liệu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const HotelManagement = () => {
    const [rooms, setRooms] = useState(initialRooms);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null);
    const [newRoom, setNewRoom] = useState({
        name: "",
        homestay: "",
        location: "",
        price: 0,
        discount: 0,
        maxGuests: 1,
        type: "Phòng vip",
        status: "Đang trống"
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredRooms = initialRooms.filter(room =>
            room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.homestay.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRooms(filteredRooms);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setRooms(initialRooms);
    };

    const handleAddRoom = (e) => {
        e.preventDefault();
        setRooms([...rooms, { ...newRoom, id: rooms.length + 1, image: "/api/placeholder/300/200" }]);
        setShowAddForm(false);
        setNewRoom({
            name: "",
            homestay: "",
            location: "",
            price: 0,
            discount: 0,
            maxGuests: 1,
            type: "Phòng vip",
            status: "Đang trống"
        });
    };

    const handleEdit = (room) => {
        setEditingRoom(room);
    };

    const handleSaveEdit = (updatedRoom) => {
        setRooms(rooms.map(room =>
            room.id === editingRoom.id ? { ...updatedRoom, id: room.id, image: room.image } : room
        ));
        setEditingRoom(null);
    };

    const handleDelete = (room) => {
        setRoomToDelete(room);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (roomToDelete) {
            setRooms(rooms.filter(room => room.id !== roomToDelete.id));
            setShowDeleteModal(false);
            setRoomToDelete(null);
        }
    };

    return (
        <div className="container-fluid p-4 ">

            {/* Search Bar */}
            <div className="card mb-4 search-bar">
                <div className="card-body">
                    <form onSubmit={handleSearch} className="row g-3">
                        <div className="col-md-9">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm theo tên phòng hoặc homestay..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-success flex-grow-1">
                                    Tìm kiếm
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={handleClearSearch}>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Add New Room Button */}
            <div className="text-end mb-4">
                <button
                    className="btn btn-primary"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    Tạo mới
                </button>
            </div>

            {/* Add Room Form */}
            {showAddForm && (
                <div className="card mb-4">
                    <div className="card-body">
                        <form onSubmit={handleAddRoom}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên phòng"
                                        value={newRoom.name}
                                        onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Homestay"
                                        value={newRoom.homestay}
                                        onChange={(e) => setNewRoom({ ...newRoom, homestay: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Giá"
                                        value={newRoom.price}
                                        onChange={(e) => setNewRoom({ ...newRoom, price: parseInt(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Số người tối đa"
                                        value={newRoom.maxGuests}
                                        onChange={(e) => setNewRoom({ ...newRoom, maxGuests: parseInt(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary">
                                        Thêm phòng
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editingRoom && (
                <div
                    className="modal fade show"
                    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white py-3">
                                <div className="d-flex justify-content-between align-items-center w-100">
                                    <h4 className="mb-0">Chỉnh sửa thông tin phòng</h4>
                                    <button
                                        type="button"
                                        onClick={() => setEditingRoom(null)}
                                        className="btn btn-light btn-sm"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                            <div className="modal-body">
                                <EditRoomPage
                                    room={editingRoom}
                                    onSave={handleSaveEdit}
                                    onCancel={() => setEditingRoom(null)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Rooms Table */}
            <div className="table-container">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: "5%" }}>STT</th>
                            <th style={{ width: "15%" }}>Tên phòng</th>
                            <th style={{ width: "20%" }}>Hình ảnh</th>
                            <th style={{ width: "15%" }}>HomeStay</th>
                            <th style={{ width: "25%" }}>Thông tin</th>
                            <th style={{ width: "10%" }}>Trạng thái</th>
                            <th style={{ width: "10%" }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room, index) => (
                            <tr key={room.id}>
                                <td>{index + 1}</td>
                                <td>{room.name}</td>
                                <td>
                                    <img
                                        src={room.image}
                                        alt={room.name}
                                        className="room-image"
                                    />
                                </td>
                                <td>{room.homestay}</td>
                                <td>
                                    <div><strong>Địa điểm:</strong> {room.location}</div>
                                    <div><strong>Giá:</strong> {room.price.toLocaleString()} vnd</div>
                                    <div><strong>Giảm giá:</strong> {room.discount}</div>
                                    <div><strong>Số người tối đa:</strong> {room.maxGuests}</div>
                                    <div><strong>Loại phòng:</strong> {room.type}</div>
                                </td>
                                <td>
                                    <span className={`badge ${room.status === 'Đang trống' ? 'bg-success' :
                                        room.status === 'Đã đặt' ? 'bg-warning' : 'bg-danger'}`}>
                                        {room.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleEdit(room)}
                                        >
                                            <PencilIcon />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(room)}
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal fade show"
                    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Xác nhận xóa</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDeleteModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn xóa phòng "{roomToDelete?.name}"?</p>
                                <p className="text-danger">Hành động này không thể hoàn tác!</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={confirmDelete}
                                >
                                    Xác nhận xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('listOfRoom-root'));
root.render(<HotelManagement />);