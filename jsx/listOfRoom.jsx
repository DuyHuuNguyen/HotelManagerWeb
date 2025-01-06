// Import React hooks
const { useState, useRef } = React;

// Initial room data
const initialRooms = [
    {
        id: 1,
        name: "Deluxe Room with Hammock",
        image: "https://i.pinimg.com/736x/90/eb/df/90ebdf2408037ade7af157117b96b0dd.jpg",
        homestay: "Green Suites Hotel",
        location: "Công viên Hạ Long, Khu du lịch Bãi Cháy, Phường Bãi Cháy, Thành phố Hạ Long, Tỉnh Quảng Ninh, Việt Nam",
        price: 1550000,
        discount: 0,
        maxGuests: 12,
        type: "Phòng vip",
        status: "Đang trống"
    },
    {
        id: 2,
        name: "Harmony Homestay",
        image: "https://th.bing.com/th/id/R.6d4d0b4b3479f6ce94ab9c8f004ec636?rik=MN7d9NpGR%2fTiJg&pid=ImgRaw&r=0",
        homestay: "Green Suites Hotel",
        location: "Gần rạp chiếu phim CGV",
        price: 1212000,
        discount: 3,
        maxGuests: 1,
        type: "Phòng standard",
        status: "Đã đặt"
    }
];

// Icons components (since we can't use lucide-react in this setup)
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
)

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
                                <i className="fas fa-cloud-upload-alt fa-3x text-secondary mb-3"></i>
                                <p className="mb-2">Kéo và thả hình ảnh vào đây hoặc</p>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
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

const AddRoomPage = ({ onSave, onCancel }) => {
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
        roomSize: ''
    });

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
                <div className="card-body d-flex flex-column">
                    <form onSubmit={handleSubmit} className="d-flex flex-column flex-grow-1">
                        {/* Scrollable content area */}
                        <div
                            className="flex-grow-1 overflow-auto"
                            style={{ maxHeight: '55vh', paddingRight: '15px' }}
                        >
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
                                                        className="form-control"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        autoFocus={true}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold">HomeStay</label>
                                                    <select
                                                        name="homestay"
                                                        className="form-select"
                                                        value={formData.homestay}
                                                        onChange={handleChange}
                                                    >
                                                        {homestayOptions.map(option => (
                                                            <option key={option} value={option}>{option}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col mt-2">
                                                <label className="form-label fw-bold">Địa điểm</label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    className="form-control"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    required
                                                />
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
                                                    <div className="d-flex flex-nowrap input-group">
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
                                                    <div className="d-flex flex-nowrap input-group">
                                                        <input
                                                            type="text"
                                                            name="roomSize"
                                                            className="form-control"
                                                            value={formData.roomSize}
                                                            onChange={handleChange}
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
                                                <div className="col-md-6">
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
                                                <div className="col-md-6">
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
                        </div>

                        {/* Action Buttons - Fixed at bottom */}
                        <div className="row mt-3">
                            <div className="col-12">
                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="btn btn-outline-secondary px-4"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn px-4"
                                        style={{ backgroundColor: '#00ACC1', color: 'white' }}
                                    >
                                        Thêm phòng
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
                <div className="card-body d-flex flex-column">
                    <form onSubmit={handleSubmit} className="d-flex flex-column flex-grow-1">
                        {/* Scrollable content area */}
                        <div
                            className="flex-grow-1 overflow-auto"
                            style={{ maxHeight: '55vh', paddingRight: '15px' }}
                        >
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
                                                        className="form-control"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        autoFocus={true}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold">HomeStay</label>
                                                    <select
                                                        name="homestay"
                                                        className="form-select"
                                                        value={formData.homestay}
                                                        onChange={handleChange}
                                                    >
                                                        {homestayOptions.map(option => (
                                                            <option key={option} value={option}>{option}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col mt-2">
                                                <label className="form-label fw-bold">Địa điểm</label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    className="form-control"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    required
                                                />
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
                                                    <div className="d-flex flex-nowrap input-group">
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
                                                    <div className="d-flex flex-nowrap input-group">
                                                        <input
                                                            type="text"
                                                            name="roomSize"
                                                            className="form-control"
                                                            value={formData.roomSize}
                                                            onChange={handleChange}
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
                                                <div className="col-md-6">
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
                                                <div className="col-md-6">
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
                        </div>

                        {/* Action Buttons - Fixed at bottom */}
                        <div className="row mt-3">
                            <div className="col-12">
                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="btn btn-outline-secondary px-4"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn px-4"
                                        style={{ backgroundColor: '#00ACC1', color: 'white' }}
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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(rooms.length / itemsPerPage);
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

    const handleClear = () => {
        setSearchTerm('');
        setRooms(initialRooms);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredRooms = initialRooms.filter(room =>
            room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.homestay.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRooms(filteredRooms);
    };

    const handleAddRoom = (newRoomData) => {
        setRooms(prevRooms => [...prevRooms, { ...newRoomData, id: prevRooms.length + 1, image: "/api/placeholder/300/200" }]);
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
        <div className="">
            <div className="d-flex mb-4 search-bar gap-2">
                <form onSubmit={handleSearch} className="d-flex me-auto gap-2">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control text-truncate"
                            placeholder="Tìm kiếm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden'
                            }}
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                className="btn position-absolute end-0 top-50 translate-middle-y text-secondary border-0 bg-transparent"
                                style={{ zIndex: 5, padding: '0.375rem 0.75rem' }}
                                onClick={handleClear}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </div>
                    <button type="submit" className="btn btn-outline-secondary">
                        <SearchIcon />
                    </button>
                </form>
                <button
                    className="btn"
                    style={{ backgroundColor: '#00ACC1', color: 'white' }}
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    <i className="fas fa-plus me-2"></i>
                    Tạo mới
                </button>
            </div>
            {showAddForm && (
                <div
                    className="modal fade show"
                    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header text-white py-3" style={{ backgroundColor: '#00ACC1' }}>
                                <div className="d-flex justify-content-between align-items-center w-100">
                                    <h4 className="mb-0">Thêm phòng mới</h4>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="btn btn-light btn-sm"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                            <div className="modal-body">
                                <AddRoomPage
                                    onSave={handleAddRoom}
                                    onCancel={() => setShowAddForm(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Room Form */}
            {editingRoom && (
                <div
                    className="modal fade show"
                    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header text-white py-3" style={{ backgroundColor: '#00ACC1' }}>
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
                <table className="table table-bordered table-light">
                    <thead>
                        <tr>
                            <th style={{ width: "5%" }}>STT</th>
                            <th style={{ width: "20%" }}>Tên phòng</th>
                            <th style={{ width: "15%" }}>Hình ảnh</th>
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
                                <td className="text-truncate" style={{ maxWidth: "150px" }} title={room.name}>{room.name}</td>
                                <td>
                                    <img
                                        src={room.image}
                                        alt={room.name}
                                        className="room-image"
                                    />
                                </td>
                                <td className="text-truncate" style={{ maxWidth: "150px" }} title={room.homestay}>{room.homestay}</td>
                                <td>
                                    <div className="text-truncate" style={{ maxWidth: "200px" }} title={room.location}><strong>Địa điểm:</strong> {room.location}</div>
                                    <div><strong>Giá:</strong> {room.price.toLocaleString()} vnd</div>
                                    <div><strong>Giảm giá:</strong> {room.discount}</div>
                                    <div><strong>Số người tối đa:</strong> {room.maxGuests}</div>
                                    <div><strong>Loại phòng:</strong> {room.type}</div>
                                </td>
                                <td>
                                    <span className="badge bg-secondary bg-gradient">
                                        {room.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="d-flex justify-content-center gap-2">
                                        <button
                                            className="btn btn-sm btn-outline-secondary rounded"
                                            title="Edit Room"
                                            onClick={() => handleEdit(room)}
                                        >
                                            <PencilIcon />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger rounded"
                                            title="Delete Room"
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
                {/* Pagination */}
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <nav>
                        <ul className="pagination mb-0">
                            <li className="page-item">
                                <button className="page-link" style= {{ color: "#00ACC1"}} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                                    Trước
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} style={{ color: "#00ACC1" }}>
                                    <button className="page-link" onClick={() => setCurrentPage(index + 1)} style= {{backgroundColor: "#00ACC1", color: "white"}}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className="page-item">
                                <button className="page-link" style= {{ color: "#00ACC1"}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                                    Sau
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal fade show"
                    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header" style={{ backgroundColor: '#00ACC1' }}>
                                <h5 className="modal-title text-white">Xác nhận xóa</h5>
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
                                    className="btn btn-outline-secondary"
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