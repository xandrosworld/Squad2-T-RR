// =====================================================
// RM - Script
// Cấu trúc: Layout cố định + Content động theo tab
// =====================================================

// ===== CONFIG =====
const MAIN_TABS = [
    { id: 'thongTinKH', label: 'Thông tin khách hàng' },
    { id: 'hoSoKH', label: 'Hồ sơ khách hàng' },
    { id: 'capTinDung', label: 'Cấp tín dụng' },
    { id: 'noiDungDeXuat', label: 'Nội dung đề xuất' }
];

const SUB_TABS = [
    { id: 'phuongAnCapTD', label: 'Phương án cấp tín dụng' },
    { id: 'khoangTinDung', label: 'Khoản tín dụng' },
    { id: 'taiSanDamBao', label: 'Tài sản đảm bảo' },
    { id: 'danhGiaChung', label: 'Đánh giá chung' },
    { id: 'dieuKienTinDung', label: 'Điều kiện tín dụng' },
    { id: 'yKienPheDuyet', label: 'Ý kiến cấp phê duyệt' }
];

const SIDEBAR_ITEMS = [
    { icon: 'fa-th-large', active: false },
    { icon: 'fa-tasks', active: true },
    { icon: 'fa-file-alt', active: false },
    { icon: 'fa-user', active: false },
    { icon: 'fa-folder', active: false },
    { icon: 'fa-shield-alt', active: false },
    { icon: 'fa-exchange-alt', active: false },
    { icon: 'fa-link', active: false }
];

// ===== SIDEBAR COMPONENT (Cố định) =====
const Sidebar = () => (
    <div className="sidebar">
        <div className="sidebar-logo">B</div>
        <div className="sidebar-menu">
            {SIDEBAR_ITEMS.map((item, i) => (
                <div key={i} className={`sidebar-item ${item.active ? 'active' : ''}`}>
                    <i className={`fas ${item.icon}`}></i>
                </div>
            ))}
        </div>
        <div className="sidebar-bottom">
            <div className="sidebar-item"><i className="fas fa-cog"></i></div>
            <div className="sidebar-item"><i className="fas fa-sign-out-alt"></i></div>
        </div>
    </div>
);

// ===== HEADER COMPONENT (Cố định) =====
const Header = () => (
    <div className="header">
        <div className="header-left">
            <div className="header-breadcrumb">
                <span>Bước Xử lý: RM</span>
            </div>
        </div>
        <div className="header-right">
            <i className="far fa-bell text-gray-400 cursor-pointer"></i>
            <div className="header-avatar">
                <img src="https://i.pravatar.cc/100" alt="Avatar" />
            </div>
            <div className="text-right">
                <div className="text-sm font-medium text-gray-800">Mai Tấn Thành</div>
                <div className="text-xs text-gray-400">Chuyên viên</div>
            </div>
        </div>
    </div>
);

// ===== PAGE HEADER (Cố định - Số BC, Tabs) =====
const PageHeader = ({ activeMainTab, setActiveMainTab }) => (
    <div className="bg-[#eff2f5] px-5 pt-4">
        <div className="max-w-[1400px] mx-auto space-y-3">
            {/* Breadcrumb */}
            <div className="text-[11px] text-gray-500 flex items-center gap-2">
                <span>Công việc cá nhân</span>
                <span>›</span>
                <span>Chi tiết báo cáo</span>
            </div>

            {/* Title + Actions */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => window.location.href = '../CTDN.html'}>‹</span>
                    Báo cáo RM
                </h1>
                <div className="flex items-center gap-2.5">
                    <button className="btn btn-outline">
                        <i className="fas fa-times text-xs"></i> Hủy
                    </button>
                    <button className="btn btn-primary">
                        <i className="fas fa-save text-xs"></i> Lưu
                    </button>
                </div>
            </div>

            {/* Info Card */}
            <div className="info-card">
                <div className="info-card-title">
                    <i className="far fa-file-alt text-gray-400"></i>
                    Số BC: 19203945
                </div>
                <div className="info-card-meta">
                    <span className="badge badge-orange">Cấp mới</span>
                    <span>CN: <strong>10021 - CN Tây Hồ</strong></span>
                    <span>Người tạo: <strong>002345 - Mai Tấn Thành - Phòng NV tại CN</strong></span>
                    <span>Ngày khởi tạo: <strong>20/12/2025</strong></span>
                </div>

                {/* Main Tabs */}
                <div className="main-tabs">
                    {MAIN_TABS.map(tab => (
                        <div
                            key={tab.id}
                            className={`main-tab ${activeMainTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveMainTab(tab.id)}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// ===== CONTENT AREA (Thay đổi theo tab) =====
const ContentArea = ({ activeMainTab, activeSubTab, setActiveSubTab }) => {
    // Render nội dung dựa theo tab
    const renderContent = () => {
        switch (activeMainTab) {
            case 'thongTinKH':
                return <ThongTinKHContent />;
            case 'hoSoKH':
                return <HoSoKHContent />;
            case 'capTinDung':
                return <CapTinDungContent activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />;
            case 'noiDungDeXuat':
                return <NoiDungDeXuatContent />;
            default:
                return <div className="text-center text-gray-500 py-20">Chọn tab</div>;
        }
    };

    return (
        <div className="px-5 py-4">
            <div className="max-w-[1400px] mx-auto">
                {renderContent()}
            </div>
        </div>
    );
};

// ===== TAB CONTENTS (Mỗi tab là 1 component riêng) =====

// Tab: Thông tin khách hàng
const ThongTinKHContent = () => (
    <div className="content-card">
        <div className="content-card-body">
            <p className="text-gray-500 text-center py-10">Nội dung tab: Thông tin khách hàng</p>
        </div>
    </div>
);

// Tab: Hồ sơ khách hàng
const HoSoKHContent = () => (
    <div className="content-card">
        <div className="content-card-body">
            <p className="text-gray-500 text-center py-10">Nội dung tab: Hồ sơ khách hàng</p>
        </div>
    </div>
);

// Tab: Nội dung đề xuất
const NoiDungDeXuatContent = () => (
    <div className="content-card">
        <div className="content-card-body">
            <p className="text-gray-500 text-center py-10">Nội dung tab: Nội dung đề xuất</p>
        </div>
    </div>
);

// Tab: Cấp tín dụng (có Sub Tabs)
const CapTinDungContent = ({ activeSubTab, setActiveSubTab }) => (
    <React.Fragment>
        {/* Sub Tabs */}
        <div className="sub-tabs">
            {SUB_TABS.map(tab => (
                <div
                    key={tab.id}
                    className={`sub-tab ${activeSubTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveSubTab(tab.id)}
                >
                    {tab.label}
                </div>
            ))}
        </div>

        {/* Sub Tab Content */}
        <SubTabContent activeSubTab={activeSubTab} />
    </React.Fragment>
);

// Sub Tab Content Router
const SubTabContent = ({ activeSubTab }) => {
    switch (activeSubTab) {
        case 'phuongAnCapTD':
            return <PhuongAnCapTDContent />;
        case 'khoangTinDung':
            return <KhoangTinDungContent />;
        case 'taiSanDamBao':
            return <TaiSanDamBaoContent />;
        case 'danhGiaChung':
            return <DanhGiaChungContent />;
        case 'dieuKienTinDung':
            return <DieuKienTinDungContent />;
        case 'yKienPheDuyet':
            return <YKienPheDuyetContent />;
        default:
            return null;
    }
};

// ===== SUB TAB CONTENTS =====

const PhuongAnCapTDContent = () => (
    <div className="content-card">
        <div className="content-card-body">
            <p className="text-gray-500 text-center py-10">Sub-tab: Phương án cấp tín dụng</p>
        </div>
    </div>
);

const KhoangTinDungContent = () => (
    <div className="content-card">
        <div className="content-card-body">
            <p className="text-gray-500 text-center py-10">Sub-tab: Khoản tín dụng</p>
        </div>
    </div>
);

const TaiSanDamBaoContent = () => (
    <div className="content-card">
        <div className="content-card-body">
            <p className="text-gray-500 text-center py-10">Sub-tab: Tài sản đảm bảo</p>
        </div>
    </div>
);

const DanhGiaChungContent = () => (
    <div className="content-card">
        <div className="content-card-body">
            <p className="text-gray-500 text-center py-10">Sub-tab: Đánh giá chung</p>
        </div>
    </div>
);

const DieuKienTinDungContent = () => (
    <div className="content-card">
        <div className="content-card-body">
            <p className="text-gray-500 text-center py-10">Sub-tab: Điều kiện tín dụng</p>
        </div>
    </div>
);

const YKienPheDuyetContent = () => (
    <div className="content-card">
        <div className="content-card-body">
            <p className="text-gray-500 text-center py-10">Sub-tab: Ý kiến cấp phê duyệt</p>
        </div>
    </div>
);

// ===== MAIN APP =====
const App = () => {
    const [activeMainTab, setActiveMainTab] = React.useState('capTinDung');
    const [activeSubTab, setActiveSubTab] = React.useState('phuongAnCapTD');

    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Sidebar - Cố định */}
            <Sidebar />

            {/* Main Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header - Cố định */}
                <Header />

                {/* Page Content - Scrollable container */}
                <div className="flex-1 overflow-y-auto bg-[#eff2f5]">
                    {/* Page Header - Scroll cùng content */}
                    <PageHeader
                        activeMainTab={activeMainTab}
                        setActiveMainTab={setActiveMainTab}
                    />

                    {/* Content Area - Thay đổi theo tab */}
                    <ContentArea
                        activeMainTab={activeMainTab}
                        activeSubTab={activeSubTab}
                        setActiveSubTab={setActiveSubTab}
                    />
                </div>
            </div>
        </div>
    );
};

// ===== RENDER =====
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
