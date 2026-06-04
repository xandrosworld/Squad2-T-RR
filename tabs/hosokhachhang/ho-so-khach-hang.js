// =====================================================
// Tab: Hồ sơ khách hàng
// =====================================================

window.TabHoSoKhachHang = function () {
    const e = React.createElement;

    // State for folder tree
    const [expandedFolders, setExpandedFolders] = React.useState({
        hoSoPhapLy: true,
        hoSoXHTDNB: false,
        hoSoTaiChinh: false,
        hoSoTinDung: false,
        hoSoTSDB: false,
        hoSoNhomKHLQ: false,
        hoSoKhac: false
    });

    const [selectedFolder, setSelectedFolder] = React.useState('giayToThanhLap');
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [searchText, setSearchText] = React.useState('');

    // States for modals
    const [showGoiYModal, setShowGoiYModal] = React.useState(false);
    const [showDiChuyenModal, setShowDiChuyenModal] = React.useState(false);
    const [diChuyenData, setDiChuyenData] = React.useState({
        nhomHoSo: 'hoSoPhapLy',
        phanNhom: '',
        loaiHoSo: 'giayToThanhLap',
        tenHoSo: ''
    });

    // ===== TASK 7-11 STATES =====
    // Toast
    const [toastMsg, setToastMsg] = React.useState('');
    const [toastType, setToastType] = React.useState('success');
    const [showToast, setShowToast] = React.useState(false);
    const toastTimer = React.useRef(null);
    const fireToast = (msg, type) => {
        setToastMsg(msg);
        setToastType(type || 'success');
        setShowToast(true);
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setShowToast(false), 3000);
    };

    // Task 8: Advanced Search
    const [showAdvSearch, setShowAdvSearch] = React.useState(false);
    const [advSearch, setAdvSearch] = React.useState({
        trangThaiTL: '',
        tinhChatTL: '',
        trangThaiQTTD: '',
        nguoiCapNhat: '',
        ngayHetHLTu: '',
        ngayHetHLDen: '',
        ngayTaiTu: '',
        ngayTaiDen: ''
    });

    // Task 9: Add new document wizard
    const [showAddWizard, setShowAddWizard] = React.useState(false);
    const [wizardStep, setWizardStep] = React.useState(1);
    const [wizardFiles, setWizardFiles] = React.useState([]);
    const [wizardMeta, setWizardMeta] = React.useState({
        hinhThucTaiLieu: '',
        soVanBan: '',
        coQuanBanHanh: '',
        ngayBanHanh: '',
        ngayHieuLuc: '',
        ngayHetHieuLuc: '',
        trangThaiBan: ''
    });
    const [wizardErrors, setWizardErrors] = React.useState({});
    const wizardFileCounter = React.useRef(100);

    // Task 10: Existing document selection
    const [showExistDocPopup, setShowExistDocPopup] = React.useState(false);
    const [existDocSearch, setExistDocSearch] = React.useState({ soHoSo: '', tenHoSo: '' });
    const [existDocExpanded, setExistDocExpanded] = React.useState({ root1: true, root2: false });
    const [existDocSelected, setExistDocSelected] = React.useState([]);

    // Task 11: Preview / Delete confirm / Move modal
    const [showPreviewPopup, setShowPreviewPopup] = React.useState(false);
    const [previewDoc, setPreviewDoc] = React.useState(null);
    const [previewZoom, setPreviewZoom] = React.useState(100);
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
    const [deleteDoc, setDeleteDoc] = React.useState(null);
    const [showMoveModal, setShowMoveModal] = React.useState(false);
    const [moveDoc, setMoveDoc] = React.useState(null);
    const [moveDestination, setMoveDestination] = React.useState('');
    const [moveTreeExpanded, setMoveTreeExpanded] = React.useState({ hoSoPhapLy: true });

    // Existing document tree data for Task 10
    const existDocTree = [
        {
            id: 'root1',
            label: 'HSTD-2024-001 — Hồ sơ vay vốn Công ty ABC',
            children: [
                { id: 'ed1', label: 'Giấy CNĐKKD — GCNDKKD_ABC.pdf', soHoSo: 'HSTD-2024-001' },
                { id: 'ed2', label: 'Báo cáo tài chính 2023 — BCTC_2023.pdf', soHoSo: 'HSTD-2024-001' },
                { id: 'ed3', label: 'Điều lệ công ty — DieuLe_ABC.pdf', soHoSo: 'HSTD-2024-001' }
            ]
        },
        {
            id: 'root2',
            label: 'HSTD-2024-002 — Hồ sơ tín dụng Công ty XYZ',
            children: [
                { id: 'ed4', label: 'Hợp đồng tín dụng — HDTD_XYZ.pdf', soHoSo: 'HSTD-2024-002' },
                { id: 'ed5', label: 'Biên bản thẩm định — BBTD_XYZ.pdf', soHoSo: 'HSTD-2024-002' }
            ]
        }
    ];

    // Danh mục gợi ý hồ sơ
    const goiYHoSo = {
        phapLy: [
            'Giấy chứng nhận đăng ký doanh nghiệp',
            'Điều lệ công ty (Bản sửa đổi mới nhất)',
            'Giấy phép đầu tư (nếu có)',
            'Quyết định bổ nhiệm người đại diện theo pháp luật'
        ],
        taiChinh: [
            'Báo cáo tài chính đã kiểm toán 3 năm gần nhất',
            'Báo cáo tài chính quý gần nhất',
            'Bảng cân đối kế toán',
            'Báo cáo kết quả kinh doanh'
        ],
        tinDung: [
            'Báo cáo đề xuất tín dụng',
            'Hợp đồng tín dụng (nếu đã có)',
            'Phương án sử dụng vốn vay',
            'Phương án trả nợ'
        ]
    };

    // Folder structure
    const folderTree = [
        {
            id: 'hoSoPhapLy',
            label: 'Hồ sơ pháp lý',
            icon: 'fa-folder',
            children: [
                { id: 'giayToThanhLap', label: 'Giấy tờ thành lập & đăng ký hoạt động' },
                { id: 'gopVonSoHuu', label: 'Góp vốn & sở hữu' },
                { id: 'dieuLeQuyChe', label: 'Điều lệ & Quy chế' },
                { id: 'boNhiemNhanSu', label: 'Bổ nhiệm & nhân sự' },
                { id: 'giayToDinhDanh', label: 'Giấy tờ định danh cá nhân' },
                { id: 'hoSoPhapLyLienQuan', label: 'Hồ sơ pháp lý liên quan' }
            ]
        },
        {
            id: 'hoSoXHTDNB',
            label: 'Hồ sơ XHTDNB',
            icon: 'fa-folder'
        },
        {
            id: 'hoSoTaiChinh',
            label: 'Hồ sơ tài chính',
            icon: 'fa-folder',
            children: [
                { id: 'baoCaoTaiChinh', label: 'Báo cáo tài chính' },
                { id: 'baoCaoThue', label: 'Báo cáo thuế' },
                { id: 'hoSoTaiChinhKhac', label: 'Hồ sơ tài chính khác' }
            ]
        },
        {
            id: 'hoSoTinDung',
            label: 'Hồ sơ khoản tín dụng',
            icon: 'fa-folder',
            children: [
                { id: 'hoSoVayVon', label: 'Hồ sơ vay vốn' },
                { id: 'hoSoPheDuyet', label: 'Hồ sơ phê duyệt' }
            ]
        },
        {
            id: 'hoSoTSDB',
            label: 'Hồ sơ tài sản đảm bảo',
            icon: 'fa-folder',
            children: [
                { id: 'batDongSan', label: 'Bất động sản' },
                { id: 'dongSan', label: 'Động sản' },
                { id: 'xe', label: 'Xe' }
            ]
        },
        {
            id: 'hoSoNhomKHLQ',
            label: 'Hồ sơ thông tin nhóm KHLQ',
            icon: 'fa-folder'
        },
        {
            id: 'hoSoKhac',
            label: 'Hồ sơ khác',
            icon: 'fa-folder'
        }
    ];

    // Sample documents data với đầy đủ thông tin
    const [documents, setDocuments] = React.useState([
        {
            id: 1,
            tenTaiLieu: 'Báo cáo đề xuất tín dụng áp dụng cho khoản cấp tín dụng ...',
            phanNhomHoSo: '--',
            loaiHoSo: 'Giấy tờ thành lập & đăng ký hoạt động',
            tenHoSo: 'BCDX_TinDung_2024.pdf',
            folder: 'giayToThanhLap',
            tinhChat: 'Bản gốc',
            trangThai: 'Dự thảo',
            ngayDangTai: '08/12/2025',
            ngayCapNhat: '17/10/2025',
            soVanBan: '83/QĐ-HĐQT',
            hinhThucTaiLieu: 'Bản scan',
            coQuanBanHanh: 'Sở Kế hoạch và Đầu tư (KH&ĐT) TP. Hà Nội',
            ngayBanHanh: '08/12/2025',
            ngayUpload: '08/12/2025',
            truocPheDuyetCAS: 'Có',
            ngayHieuLuc: '08/12/2025',
            ngayHetHieuLuc: '08/12/2026',
            nguoiCapNhat: '181720 - Hoàng Quốc Đạt',
            maTaiLieu: '1038249',
            hinhThucLuuTru: 'Bản scan',
            trangThaiLuuTru: 'Chưa lưu kho',
            idTsdb: '',
            hinhThucKhoQuy: '',
            trangThaiKhoQuy: '',
            tenKho: '',
            tu: '',
            ke: '',
            ngan: ''
        },
        {
            id: 2,
            tenTaiLieu: 'Giấy chứng nhận đăng ký kinh doanh',
            phanNhomHoSo: 'Hồ sơ pháp lý',
            loaiHoSo: 'Giấy tờ thành lập & đăng ký hoạt động',
            tenHoSo: 'GCNDKKD_ABC.pdf',
            folder: 'giayToThanhLap',
            tinhChat: 'Bản công chứng',
            trangThai: 'Đã phê duyệt',
            ngayDangTai: '05/12/2025',
            ngayCapNhat: '15/12/2025',
            soVanBan: '0102456789',
            hinhThucTaiLieu: 'Bản scan',
            coQuanBanHanh: 'Sở Kế hoạch và Đầu tư TP. Hà Nội',
            ngayBanHanh: '15/03/2020',
            ngayUpload: '05/12/2025',
            truocPheDuyetCAS: 'Có',
            ngayHieuLuc: '15/03/2020',
            ngayHetHieuLuc: '',
            nguoiCapNhat: '181720 - Hoàng Quốc Đạt',
            maTaiLieu: '1038250',
            hinhThucLuuTru: 'Bản scan',
            trangThaiLuuTru: 'Đã lưu kho',
            idTsdb: '',
            hinhThucKhoQuy: '',
            trangThaiKhoQuy: '',
            tenKho: '',
            tu: '',
            ke: '',
            ngan: ''
        },
        {
            id: 3,
            tenTaiLieu: 'Báo cáo tài chính năm 2023',
            phanNhomHoSo: 'Hồ sơ tài chính',
            loaiHoSo: 'Hồ sơ báo cáo tài chính',
            tenHoSo: 'BCTC_2023.pdf',
            folder: 'baoCaoTaiChinh',
            tinhChat: 'Bản sao',
            trangThai: 'Đã phê duyệt',
            ngayDangTai: '01/12/2025',
            ngayCapNhat: '10/12/2025',
            soVanBan: 'BCTC-2023-001',
            hinhThucTaiLieu: 'Bản scan',
            coQuanBanHanh: 'Công ty TNHH ABC',
            ngayBanHanh: '31/03/2024',
            ngayUpload: '01/12/2025',
            truocPheDuyetCAS: 'Không',
            ngayHieuLuc: '01/01/2023',
            ngayHetHieuLuc: '31/12/2023',
            nguoiCapNhat: '181720 - Hoàng Quốc Đạt',
            maTaiLieu: '1038251',
            hinhThucLuuTru: 'Bản scan',
            trangThaiLuuTru: 'Chưa lưu kho',
            idTsdb: '',
            hinhThucKhoQuy: '',
            trangThaiKhoQuy: '',
            tenKho: '',
            tu: '',
            ke: '',
            ngan: ''
        },
        {
            id: 7,
            tenTaiLieu: 'Hợp đồng thế chấp tài sản',
            phanNhomHoSo: 'Hồ sơ tài sản đảm bảo',
            loaiHoSo: 'Hồ sơ TSĐB',
            tenHoSo: 'HD_TheChap_TS.pdf',
            folder: 'hoSoTSDB',
            tinhChat: 'Bản gốc',
            trangThai: 'Đã phê duyệt',
            ngayDangTai: '10/12/2025',
            ngayCapNhat: '12/12/2025',
            soVanBan: 'HD-TC-2025-001',
            hinhThucTaiLieu: 'Bản scan',
            coQuanBanHanh: 'BIDV Chi nhánh Hà Thành',
            ngayBanHanh: '10/12/2025',
            ngayUpload: '10/12/2025',
            truocPheDuyetCAS: 'Có',
            ngayHieuLuc: '10/12/2025',
            ngayHetHieuLuc: '10/12/2030',
            nguoiCapNhat: '181720 - Hoàng Quốc Đạt',
            maTaiLieu: '1038252',
            hinhThucLuuTru: 'Bản scan',
            trangThaiLuuTru: 'Chưa lưu kho',
            // Kho quỹ - chỉ hiển thị với TSĐB
            idTsdb: '123445',
            hinhThucKhoQuy: 'Bản gốc',
            trangThaiKhoQuy: 'Đã lưu kho',
            tenKho: 'Kho chính 99000',
            tu: '124000 CN Hà Thành',
            ke: '124151 PGD Thọ Nhuộm',
            ngan: 'Tài sản đảm bảo'
        }
    ]);

    // State cho chi tiết tài liệu
    const [selectedDocument, setSelectedDocument] = React.useState(null);
    const [showDetailView, setShowDetailView] = React.useState(false);
    const [showEditDocModal, setShowEditDocModal] = React.useState(false);
    const [editDocData, setEditDocData] = React.useState({});

    // Toggle folder expand
    const toggleFolder = (folderId) => {
        setExpandedFolders(prev => ({
            ...prev,
            [folderId]: !prev[folderId]
        }));
    };

    // Select folder
    const handleSelectFolder = (folderId) => {
        setSelectedFolder(folderId);
        setSelectedFiles([]);
    };

    // Filter documents by selected folder
    const getFilteredDocuments = () => {
        let filtered = documents;

        // Filter by folder
        if (selectedFolder) {
            // If selected a parent folder, show all children
            const parentFolder = folderTree.find(f => f.id === selectedFolder);
            if (parentFolder && parentFolder.children) {
                const childIds = parentFolder.children.map(c => c.id);
                filtered = documents.filter(d => childIds.includes(d.folder) || d.folder === selectedFolder);
            } else {
                filtered = documents.filter(d => d.folder === selectedFolder);
            }
        }

        // Filter by search
        if (searchText) {
            filtered = filtered.filter(d =>
                d.tenTaiLieu.toLowerCase().includes(searchText.toLowerCase()) ||
                d.tenHoSo.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        return filtered;
    };

    // Toggle file selection
    const toggleFileSelection = (fileId) => {
        setSelectedFiles(prev =>
            prev.includes(fileId)
                ? prev.filter(id => id !== fileId)
                : [...prev, fileId]
        );
    };

    // Toggle all files
    const toggleAllFiles = () => {
        const filtered = getFilteredDocuments();
        if (selectedFiles.length === filtered.length) {
            setSelectedFiles([]);
        } else {
            setSelectedFiles(filtered.map(d => d.id));
        }
    };

    // Render folder item
    const renderFolderItem = (folder, level = 0) => {
        const hasChildren = folder.children && folder.children.length > 0;
        const isExpanded = expandedFolders[folder.id];
        const isSelected = selectedFolder === folder.id;

        return e('div', { key: folder.id },
            e('div', {
                className: 'flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors rounded-md mx-1 ' +
                    (isSelected ? 'bg-[#e6f4f1] text-[#006B68]' : 'hover:bg-gray-100 text-gray-700'),
                style: { paddingLeft: `${12 + level * 16}px` },
                onClick: () => {
                    if (hasChildren) {
                        toggleFolder(folder.id);
                    }
                    handleSelectFolder(folder.id);
                }
            },
                hasChildren && e('i', {
                    className: `fas ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'} text-gray-400 text-xs w-3`
                }),
                !hasChildren && e('span', { className: 'w-3' }),
                e('i', {
                    className: `fas ${isExpanded ? 'fa-folder-open' : 'fa-folder'} ${isSelected ? 'text-[#006B68]' : 'text-yellow-500'} text-sm`
                }),
                e('span', { className: 'text-sm truncate' }, folder.label)
            ),
            // Render children
            hasChildren && isExpanded && e('div', null,
                folder.children.map(child => renderFolderItem(child, level + 1))
            )
        );
    };

    const filteredDocuments = getFilteredDocuments();

    return e('div', { className: 'flex gap-4 h-full' },
        // ===== LEFT SIDEBAR - FOLDER TREE =====
        e('div', { className: 'w-64 flex-shrink-0' },
            e('div', { className: 'bg-white border border-gray-200 rounded-lg h-full' },
                // Search
                e('div', { className: 'p-3 border-b border-gray-200' },
                    e('div', { className: 'relative' },
                        e('i', { className: 'fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm' }),
                        e('input', {
                            type: 'text',
                            placeholder: 'Tìm kiếm tên hồ sơ',
                            className: 'w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            value: searchText,
                            onChange: (ev) => setSearchText(ev.target.value)
                        })
                    )
                ),
                // Folder tree
                e('div', { className: 'py-2 max-h-[calc(100vh-300px)] overflow-y-auto' },
                    folderTree.map(folder => renderFolderItem(folder))
                )
            )
        ),

        // ===== RIGHT CONTENT - DOCUMENT TABLE =====
        e('div', { className: 'flex-1' },
            e('div', { className: 'bg-white border border-gray-200 rounded-lg h-full' },
                // ===== TASK 7: FULL ACTION BAR =====
                e('div', { className: 'flex items-center justify-between px-4 py-3 border-b border-gray-200' },
                    e('div', { className: 'flex items-center gap-3' },
                        e('h3', { className: 'text-sm font-semibold text-gray-800' }, 'Danh mục tài liệu'),
                        e('button', {
                            className: 'p-1 text-gray-400 hover:text-gray-600 transition-colors',
                            onClick: () => setShowGoiYModal(true),
                            title: 'Gợi ý hồ sơ cần có'
                        },
                            e('i', { className: 'fas fa-question-circle text-sm' })
                        )
                    ),
                    e('div', { className: 'flex items-center gap-2 flex-wrap' },
                        // Lưu
                        e('button', {
                            className: 'px-3 py-1.5 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005B58] flex items-center gap-1.5 transition-colors',
                            title: 'Lưu thay đổi',
                            onClick: () => fireToast('Đã lưu thành công!', 'success')
                        },
                            e('i', { className: 'fas fa-save text-xs' }),
                            'Lưu'
                        ),
                        // Xuất danh sách
                        e('button', {
                            className: 'px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors',
                            title: 'Xuất danh sách ra file Excel',
                            onClick: () => fireToast('Đã xuất danh sách thành công!', 'success')
                        },
                            e('i', { className: 'fas fa-file-export text-xs' }),
                            'Xuất danh sách'
                        ),
                        // Tải xuống
                        e('button', {
                            className: 'px-3 py-1.5 border border-gray-300 rounded-lg text-sm flex items-center gap-1.5 transition-colors ' +
                                (selectedFiles.length > 0 ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed border-gray-200'),
                            title: selectedFiles.length > 0 ? 'Tải xuống ' + selectedFiles.length + ' tài liệu đã chọn' : 'Chọn tài liệu để tải xuống',
                            disabled: selectedFiles.length === 0,
                            onClick: () => { if (selectedFiles.length > 0) fireToast('Đang tải xuống ' + selectedFiles.length + ' tài liệu...', 'info'); }
                        },
                            e('i', { className: 'fas fa-download text-xs' }),
                            'Tải xuống'
                        ),
                        // Gửi nhắc tài liệu
                        e('button', {
                            className: 'px-3 py-1.5 border border-gray-300 rounded-lg text-sm flex items-center gap-1.5 transition-colors ' +
                                (selectedFiles.length > 0 ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed border-gray-200'),
                            title: 'Gửi nhắc tài liệu cho khách hàng',
                            disabled: selectedFiles.length === 0,
                            onClick: () => { if (selectedFiles.length > 0) fireToast('Đã gửi nhắc tài liệu thành công!', 'success'); }
                        },
                            e('i', { className: 'fas fa-bell text-xs' }),
                            'Gửi nhắc tài liệu'
                        ),
                        // Thêm mới
                        e('button', {
                            className: 'px-3 py-1.5 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005B58] flex items-center gap-1.5 transition-colors',
                            title: 'Thêm tài liệu mới',
                            onClick: () => {
                                setWizardStep(1);
                                setWizardFiles([]);
                                setWizardMeta({ hinhThucTaiLieu: '', soVanBan: '', coQuanBanHanh: '', ngayBanHanh: '', ngayHieuLuc: '', ngayHetHieuLuc: '', trangThaiBan: '' });
                                setWizardErrors({});
                                setShowAddWizard(true);
                            }
                        },
                            e('i', { className: 'fas fa-plus text-xs' }),
                            'Thêm mới'
                        ),
                        // Di chuyển
                        e('button', {
                            className: 'px-3 py-1.5 border border-gray-300 rounded-lg text-sm flex items-center gap-1.5 transition-colors ' +
                                (selectedFiles.length > 0 ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed border-gray-200'),
                            title: selectedFiles.length > 0 ? 'Di chuyển tài liệu đã chọn' : 'Chọn tài liệu để di chuyển',
                            disabled: selectedFiles.length === 0,
                            onClick: () => {
                                if (selectedFiles.length > 0) {
                                    var doc = documents.find(d => d.id === selectedFiles[0]);
                                    setMoveDoc(doc || null);
                                    setMoveDestination('');
                                    setMoveTreeExpanded({ hoSoPhapLy: true });
                                    setShowMoveModal(true);
                                }
                            }
                        },
                            e('i', { className: 'fas fa-arrows-alt text-xs' }),
                            'Di chuyển'
                        ),
                        // Tìm kiếm nâng cao
                        e('button', {
                            className: 'px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors',
                            title: 'Tìm kiếm nâng cao',
                            onClick: () => setShowAdvSearch(true)
                        },
                            e('i', { className: 'fas fa-search text-xs' }),
                            'Tìm kiếm nâng cao'
                        ),
                        // Preview
                        e('button', {
                            className: 'px-3 py-1.5 border border-gray-300 rounded-lg text-sm flex items-center gap-1.5 transition-colors ' +
                                (selectedFiles.length === 1 ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-300 cursor-not-allowed border-gray-200'),
                            title: selectedFiles.length === 1 ? 'Xem trước tài liệu' : 'Chọn 1 tài liệu để xem trước',
                            disabled: selectedFiles.length !== 1,
                            onClick: () => {
                                if (selectedFiles.length === 1) {
                                    var doc = documents.find(d => d.id === selectedFiles[0]);
                                    if (doc) { setPreviewDoc(doc); setPreviewZoom(100); setShowPreviewPopup(true); }
                                }
                            }
                        },
                            e('i', { className: 'fas fa-eye text-xs' }),
                            'Preview'
                        )
                    )
                ),

                // Table
                e('div', { className: 'overflow-x-auto' },
                    e('table', { className: 'w-full text-sm' },
                        e('thead', null,
                            e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                                e('th', { className: 'px-2 py-3 text-left w-10' },
                                    e('input', {
                                        type: 'checkbox',
                                        checked: selectedFiles.length === filteredDocuments.length && filteredDocuments.length > 0,
                                        onChange: toggleAllFiles,
                                        className: 'w-4 h-4 rounded border-gray-300'
                                    })
                                ),
                                e('th', { className: 'px-2 py-3 text-left font-medium text-gray-600 w-12' }, 'STT'),
                                e('th', { className: 'px-2 py-3 text-left font-medium text-gray-600 min-w-[200px]' }, 'Tên tài liệu'),
                                e('th', { className: 'px-2 py-3 text-left font-medium text-gray-600' }, 'Phân nhóm'),
                                e('th', { className: 'px-2 py-3 text-left font-medium text-gray-600' }, 'Loại hồ sơ'),
                                e('th', { className: 'px-2 py-3 text-left font-medium text-gray-600' }, 'Tên hồ sơ'),
                                e('th', { className: 'px-2 py-3 text-left font-medium text-gray-600' }, 'Tính chất'),
                                e('th', { className: 'px-2 py-3 text-left font-medium text-gray-600' }, 'Trạng thái'),
                                e('th', { className: 'px-2 py-3 text-left font-medium text-gray-600' }, 'Ngày đăng tải'),
                                e('th', { className: 'px-2 py-3 text-left font-medium text-gray-600' }, 'Ngày cập nhật'),
                                e('th', { className: 'px-2 py-3 text-center font-medium text-gray-600 w-28' }, 'Thao tác')
                            )
                        ),
                        e('tbody', null,
                            filteredDocuments.length > 0
                                ? filteredDocuments.map((doc, idx) =>
                                    e('tr', {
                                        key: doc.id,
                                        className: 'border-b border-gray-100 hover:bg-gray-50 cursor-pointer ' +
                                            (selectedFiles.includes(doc.id) ? 'bg-[#e6f4f1]' : '')
                                    },
                                        e('td', { className: 'px-2 py-3' },
                                            e('input', {
                                                type: 'checkbox',
                                                checked: selectedFiles.includes(doc.id),
                                                onChange: (ev) => {
                                                    ev.stopPropagation();
                                                    toggleFileSelection(doc.id);
                                                },
                                                className: 'w-4 h-4 rounded border-gray-300'
                                            })
                                        ),
                                        e('td', { className: 'px-2 py-3 text-gray-600' }, idx + 1),
                                        e('td', {
                                            className: 'px-2 py-3',
                                            onClick: () => {
                                                setSelectedDocument(doc);
                                                setShowDetailView(true);
                                            }
                                        },
                                            e('div', { className: 'flex items-center gap-2' },
                                                e('i', { className: 'fas fa-file-pdf text-red-500' }),
                                                e('span', { className: 'text-[#006B68] hover:underline cursor-pointer' }, doc.tenTaiLieu)
                                            )
                                        ),
                                        e('td', { className: 'px-2 py-3 text-gray-600 text-xs' }, doc.phanNhomHoSo || '—'),
                                        e('td', { className: 'px-2 py-3 text-gray-600 text-xs' }, doc.loaiHoSo),
                                        e('td', { className: 'px-2 py-3 text-gray-600 text-xs' }, doc.tenHoSo),
                                        e('td', { className: 'px-2 py-3 text-gray-600 text-xs' }, doc.tinhChat || '—'),
                                        e('td', { className: 'px-2 py-3' },
                                            e('span', {
                                                className: 'px-2 py-1 rounded text-xs ' +
                                                    (doc.trangThai === 'Đã phê duyệt' ? 'bg-green-50 text-green-700' :
                                                        doc.trangThai === 'Dự thảo' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-50 text-gray-700')
                                            }, doc.trangThai || '—')
                                        ),
                                        e('td', { className: 'px-2 py-3 text-gray-600 text-xs' }, doc.ngayDangTai || '—'),
                                        e('td', { className: 'px-2 py-3 text-gray-600 text-xs' }, doc.ngayCapNhat || '—'),
                                        e('td', { className: 'px-2 py-3' },
                                            e('div', { className: 'flex items-center justify-center gap-2' },
                                                // Preview (Task 11)
                                                e('button', {
                                                    className: 'p-1 text-gray-400 hover:text-[#006B68]',
                                                    title: 'Xem trước',
                                                    onClick: (ev) => {
                                                        ev.stopPropagation();
                                                        setPreviewDoc(doc);
                                                        setPreviewZoom(100);
                                                        setShowPreviewPopup(true);
                                                    }
                                                },
                                                    e('i', { className: 'fas fa-eye text-sm' })
                                                ),
                                                // Xem chi tiết
                                                e('button', {
                                                    className: 'p-1 text-gray-400 hover:text-[#006B68]',
                                                    title: 'Xem chi tiết',
                                                    onClick: (ev) => {
                                                        ev.stopPropagation();
                                                        setSelectedDocument(doc);
                                                        setShowDetailView(true);
                                                    }
                                                },
                                                    e('i', { className: 'fas fa-info-circle text-sm' })
                                                ),
                                                // Tải
                                                e('button', {
                                                    className: 'p-1 text-gray-400 hover:text-[#006B68]',
                                                    title: 'Tải xuống'
                                                },
                                                    e('i', { className: 'fas fa-download text-sm' })
                                                ),
                                                // Chỉnh sửa
                                                e('button', {
                                                    className: 'p-1 text-gray-400 hover:text-[#006B68]',
                                                    title: 'Chỉnh sửa',
                                                    onClick: (ev) => {
                                                        ev.stopPropagation();
                                                        setSelectedDocument(doc);
                                                        setEditDocData({ ...doc });
                                                        setShowEditDocModal(true);
                                                    }
                                                },
                                                    e('i', { className: 'fas fa-edit text-sm' })
                                                ),
                                                // Xóa (Task 11)
                                                e('button', {
                                                    className: 'p-1 text-gray-400 hover:text-red-500',
                                                    title: 'Xóa tài liệu',
                                                    onClick: (ev) => {
                                                        ev.stopPropagation();
                                                        setDeleteDoc(doc);
                                                        setShowDeleteConfirm(true);
                                                    }
                                                },
                                                    e('i', { className: 'fas fa-trash-alt text-sm' })
                                                )
                                            )
                                        )
                                    )
                                )
                                : e('tr', null,
                                    e('td', { colSpan: 11, className: 'px-3 py-10 text-center text-gray-400' },
                                        e('i', { className: 'fas fa-folder-open text-4xl mb-3 opacity-50' }),
                                        e('br'),
                                        'Không có tài liệu trong thư mục này'
                                    )
                                )
                        )
                    )
                ),

                // Pagination / Info
                filteredDocuments.length > 0 && e('div', { className: 'flex items-center justify-between px-4 py-3 border-t border-gray-200' },
                    e('span', { className: 'text-sm text-gray-500' }, `Hiển thị ${filteredDocuments.length} tài liệu`),
                    e('div', { className: 'flex items-center gap-2' },
                        selectedFiles.length > 0 && e('span', { className: 'text-sm text-[#006B68]' },
                            `Đã chọn ${selectedFiles.length} tài liệu`
                        )
                    )
                )
            )
        ),

        // ===== MODAL GỢI Ý HỒ SƠ =====
        showGoiYModal && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[80vh] overflow-hidden' },
                // Header
                e('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-gray-200' },
                    e('div', null,
                        e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Danh mục tài liệu gợi ý'),
                        e('p', { className: 'text-sm text-gray-500 mt-1' }, 'Danh sách các tài liệu được đề xuất cho hồ sơ tín dụng')
                    ),
                    e('button', {
                        className: 'p-1.5 text-gray-400 hover:text-gray-600',
                        onClick: () => setShowGoiYModal(false)
                    },
                        e('i', { className: 'fas fa-times' })
                    )
                ),
                // Body
                e('div', { className: 'px-6 py-5 overflow-y-auto max-h-[60vh] space-y-6' },
                    // Hồ sơ pháp lý
                    e('div', null,
                        e('h4', { className: 'text-sm font-semibold text-gray-800 mb-3' }, 'Hồ sơ pháp lý'),
                        e('ul', { className: 'space-y-2' },
                            goiYHoSo.phapLy.map((item, idx) =>
                                e('li', { key: idx, className: 'flex items-start gap-2 text-sm text-gray-700' },
                                    e('span', { className: 'text-[#d4a017] mt-0.5' }, '●'),
                                    item
                                )
                            )
                        )
                    ),
                    // Hồ sơ tài chính
                    e('div', null,
                        e('h4', { className: 'text-sm font-semibold text-gray-800 mb-3' }, 'Hồ sơ tài chính'),
                        e('ul', { className: 'space-y-2' },
                            goiYHoSo.taiChinh.map((item, idx) =>
                                e('li', { key: idx, className: 'flex items-start gap-2 text-sm text-gray-700' },
                                    e('span', { className: 'text-[#d4a017] mt-0.5' }, '●'),
                                    item
                                )
                            )
                        )
                    ),
                    // Hồ sơ khoản tín dụng
                    e('div', null,
                        e('h4', { className: 'text-sm font-semibold text-gray-800 mb-3' }, 'Hồ sơ khoản tín dụng'),
                        e('ul', { className: 'space-y-2' },
                            goiYHoSo.tinDung.map((item, idx) =>
                                e('li', { key: idx, className: 'flex items-start gap-2 text-sm text-gray-700' },
                                    e('span', { className: 'text-[#d4a017] mt-0.5' }, '●'),
                                    item
                                )
                            )
                        )
                    )
                ),
                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex justify-end' },
                    e('button', {
                        className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005a57]',
                        onClick: () => setShowGoiYModal(false)
                    }, 'Đóng')
                )
            )
        ),

        // ===== MODAL DI CHUYỂN TÀI LIỆU =====
        showDiChuyenModal && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4' },
                // Header
                e('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-gray-200' },
                    e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Di chuyển tài liệu'),
                    e('button', {
                        className: 'p-1.5 text-gray-400 hover:text-gray-600',
                        onClick: () => setShowDiChuyenModal(false)
                    },
                        e('i', { className: 'fas fa-times' })
                    )
                ),
                // Body
                e('div', { className: 'px-6 py-5 space-y-4' },
                    // Row 1: Nhóm hồ sơ & Phân nhóm
                    e('div', { className: 'grid grid-cols-2 gap-4' },
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                'Nhóm hồ sơ ',
                                e('span', { className: 'text-red-500' }, '*')
                            ),
                            e('select', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: diChuyenData.nhomHoSo,
                                onChange: (ev) => setDiChuyenData({ ...diChuyenData, nhomHoSo: ev.target.value })
                            },
                                e('option', { value: 'hoSoPhapLy' }, 'Hồ sơ pháp lý'),
                                e('option', { value: 'hoSoTaiChinh' }, 'Hồ sơ tài chính'),
                                e('option', { value: 'hoSoTinDung' }, 'Hồ sơ khoản tín dụng'),
                                e('option', { value: 'hoSoTSDB' }, 'Hồ sơ tài sản đảm bảo'),
                                e('option', { value: 'hoSoKhac' }, 'Hồ sơ khác')
                            )
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Phân nhóm hồ sơ'),
                            e('select', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: diChuyenData.phanNhom,
                                onChange: (ev) => setDiChuyenData({ ...diChuyenData, phanNhom: ev.target.value })
                            },
                                e('option', { value: '' }, 'Lựa chọn')
                            )
                        )
                    ),
                    // Row 2: Loại hồ sơ & Tên hồ sơ
                    e('div', { className: 'grid grid-cols-2 gap-4' },
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                'Loại hồ sơ ',
                                e('span', { className: 'text-red-500' }, '*')
                            ),
                            e('select', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: diChuyenData.loaiHoSo,
                                onChange: (ev) => setDiChuyenData({ ...diChuyenData, loaiHoSo: ev.target.value })
                            },
                                e('option', { value: 'giayToThanhLap' }, 'Giấy tờ thành lập & đăng ký hoạt động'),
                                e('option', { value: 'gopVonSoHuu' }, 'Góp vốn & sở hữu'),
                                e('option', { value: 'dieuLeQuyChe' }, 'Điều lệ & Quy chế'),
                                e('option', { value: 'boNhiemNhanSu' }, 'Bổ nhiệm & nhân sự')
                            )
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                'Tên hồ sơ ',
                                e('span', { className: 'text-red-500' }, '*')
                            ),
                            e('select', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: diChuyenData.tenHoSo,
                                onChange: (ev) => setDiChuyenData({ ...diChuyenData, tenHoSo: ev.target.value })
                            },
                                e('option', { value: '' }, 'Giấy chứng nhận đăng ký mã số...')
                            )
                        )
                    )
                ),
                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex justify-end' },
                    e('button', {
                        className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005a57]',
                        onClick: () => {
                            // Logic di chuyển
                            setShowDiChuyenModal(false);
                        }
                    }, 'Xác nhận')
                )
            )
        ),

        // ===== MÀN HÌNH CHI TIẾT TÀI LIỆU =====
        showDetailView && selectedDocument && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-hidden' },
                // Header
                e('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-gray-200' },
                    e('div', null,
                        e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Chi tiết tài liệu'),
                        e('div', { className: 'flex items-center gap-3 mt-2' },
                            e('div', { className: 'w-10 h-10 bg-yellow-100 rounded flex items-center justify-center' },
                                e('i', { className: 'fas fa-file-alt text-yellow-600' })
                            ),
                            e('div', null,
                                e('div', { className: 'flex items-center gap-2' },
                                    e('span', { className: 'font-medium text-gray-800' }, selectedDocument.tenHoSo),
                                    e('i', { className: 'fas fa-pencil-alt text-gray-400 text-xs cursor-pointer hover:text-[#006B68]' })
                                ),
                                e('div', { className: 'flex items-center gap-2 text-xs text-gray-500' },
                                    e('span', { className: 'px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded' }, selectedDocument.trangThai || 'Dự thảo'),
                                    e('span', null, 'Mã tài liệu: ' + (selectedDocument.maTaiLieu || '—'))
                                )
                            )
                        )
                    ),
                    e('button', {
                        className: 'p-1.5 text-gray-400 hover:text-gray-600',
                        onClick: () => setShowDetailView(false)
                    },
                        e('i', { className: 'fas fa-times' })
                    )
                ),
                // Content
                e('div', { className: 'flex' },
                    // Sidebar
                    e('div', { className: 'w-48 bg-gray-50 border-r border-gray-200 py-4' },
                        e('div', { className: 'space-y-1' },
                            e('div', { className: 'px-4 py-2 text-xs text-gray-500' }, 'Nhóm hồ sơ'),
                            e('div', { className: 'px-4 py-2 text-sm font-medium text-[#006B68] bg-[#e6f4f1] border-l-2 border-[#006B68]' }, selectedDocument.phanNhomHoSo || 'Hồ sơ pháp lý'),
                            e('div', { className: 'px-4 py-2 text-xs text-gray-500 mt-3' }, 'Phân nhóm hồ sơ'),
                            e('div', { className: 'px-4 py-2 text-sm text-gray-700' }, '—'),
                            e('div', { className: 'px-4 py-2 text-xs text-gray-500 mt-3' }, 'Loại hồ sơ'),
                            e('div', { className: 'px-4 py-2 text-sm text-gray-700' }, selectedDocument.loaiHoSo || '—'),
                            e('div', { className: 'px-4 py-2 text-xs text-gray-500 mt-3' }, 'Tên hồ sơ'),
                            e('div', { className: 'px-4 py-2 text-sm text-gray-700' }, selectedDocument.tenHoSo || '—'),
                            e('div', { className: 'px-4 py-2 text-xs text-gray-500 mt-3' }, 'Tính chất hồ sơ'),
                            e('div', { className: 'px-4 py-2 text-sm text-gray-700' }, selectedDocument.tinhChat || '—')
                        )
                    ),
                    // Main content
                    e('div', { className: 'flex-1 overflow-y-auto max-h-[calc(90vh-120px)] p-6 space-y-6' },
                        // Thông tin chung
                        e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
                            e('div', { className: 'flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50' },
                                e('div', { className: 'flex items-center gap-2' },
                                    e('div', { className: 'w-1 h-5 bg-[#006B68] rounded' }),
                                    e('h4', { className: 'font-semibold text-gray-800' }, 'Thông tin chung')
                                ),
                                e('button', {
                                    className: 'flex items-center gap-1 text-sm text-gray-500 hover:text-[#006B68]',
                                    onClick: () => {
                                        setEditDocData({ ...selectedDocument });
                                        setShowEditDocModal(true);
                                    }
                                },
                                    e('i', { className: 'fas fa-pencil-alt text-xs' }),
                                    'Chỉnh sửa'
                                )
                            ),
                            e('div', { className: 'p-4 grid grid-cols-2 gap-4 text-sm' },
                                e('div', null,
                                    e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Số văn bản'),
                                    e('div', { className: 'font-medium text-gray-800' }, selectedDocument.soVanBan || '—')
                                ),
                                e('div', null,
                                    e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Hình thức tài liệu'),
                                    e('div', { className: 'font-medium text-gray-800' }, selectedDocument.hinhThucTaiLieu || '—')
                                ),
                                e('div', null,
                                    e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Cơ quan ban hành'),
                                    e('div', { className: 'font-medium text-gray-800' }, selectedDocument.coQuanBanHanh || '—')
                                ),
                                e('div', null,
                                    e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Ngày ban hành'),
                                    e('div', { className: 'font-medium text-gray-800' }, selectedDocument.ngayBanHanh || '—')
                                ),
                                e('div', null,
                                    e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Ngày upload tài liệu'),
                                    e('div', { className: 'font-medium text-gray-800' }, selectedDocument.ngayUpload || '—')
                                ),
                                e('div', null,
                                    e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Trước phê duyệt CAS'),
                                    e('div', { className: 'font-medium text-gray-800' }, selectedDocument.truocPheDuyetCAS || '—')
                                ),
                                e('div', null,
                                    e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Ngày hiệu lực'),
                                    e('div', { className: 'font-medium text-gray-800' }, selectedDocument.ngayHieuLuc || '—')
                                ),
                                e('div', null,
                                    e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Ngày hết hiệu lực'),
                                    e('div', { className: 'font-medium text-gray-800' }, selectedDocument.ngayHetHieuLuc || '—')
                                ),
                                e('div', null,
                                    e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Ngày cập nhật'),
                                    e('div', { className: 'font-medium text-gray-800' }, selectedDocument.ngayCapNhat || '—')
                                ),
                                e('div', null,
                                    e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Người cập nhật'),
                                    e('div', { className: 'font-medium text-gray-800' }, selectedDocument.nguoiCapNhat || '—')
                                )
                            )
                        ),
                        // Lưu trữ
                        e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
                            e('div', { className: 'flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50' },
                                e('div', { className: 'w-1 h-5 bg-[#006B68] rounded' }),
                                e('h4', { className: 'font-semibold text-gray-800' }, 'Lưu trữ')
                            ),
                            e('div', { className: 'p-4 grid grid-cols-2 gap-4 text-sm' },
                                e('div', null,
                                    e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Hình thức tài liệu tại BP lưu trữ HSTD'),
                                    e('div', { className: 'font-medium text-gray-800' }, selectedDocument.hinhThucLuuTru || '—')
                                ),
                                e('div', null,
                                    e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Trạng thái tài liệu tại BP lưu trữ HSTD'),
                                    e('div', { className: 'font-medium text-gray-800' }, selectedDocument.trangThaiLuuTru || '—')
                                )
                            )
                        ),
                        // Kho quỹ - chỉ hiển thị với TSĐB
                        selectedDocument.folder === 'hoSoTSDB' && e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
                            e('div', { className: 'flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50' },
                                e('div', { className: 'w-1 h-5 bg-[#006B68] rounded' }),
                                e('h4', { className: 'font-semibold text-gray-800' }, 'Kho quỹ')
                            ),
                            e('div', { className: 'p-4 space-y-4 text-sm' },
                                e('div', { className: 'grid grid-cols-2 gap-4' },
                                    e('div', null,
                                        e('div', { className: 'text-gray-500 text-xs mb-1' }, 'ID tỷ dụng TSĐB'),
                                        e('div', { className: 'font-medium text-gray-800' }, selectedDocument.idTsdb || '—')
                                    ),
                                    e('div', null,
                                        e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Hình thức tài liệu tại kho quỹ'),
                                        e('div', { className: 'font-medium text-gray-800' }, selectedDocument.hinhThucKhoQuy || '—')
                                    )
                                ),
                                e('div', null,
                                    e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Trạng thái tài liệu tại kho quỹ'),
                                    e('div', { className: 'font-medium text-gray-800' }, selectedDocument.trangThaiKhoQuy || '—')
                                ),
                                // Thông tin kho vật lý
                                e('div', { className: 'bg-gray-50 rounded-lg p-4 mt-2' },
                                    e('div', { className: 'flex items-center gap-2 mb-3' },
                                        e('div', { className: 'w-1 h-4 bg-gray-400 rounded' }),
                                        e('span', { className: 'text-sm font-medium text-gray-700' }, 'Thông tin kho vật lý')
                                    ),
                                    e('div', { className: 'grid grid-cols-2 gap-4' },
                                        e('div', null,
                                            e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Tên kho'),
                                            e('div', { className: 'font-medium text-gray-800' }, selectedDocument.tenKho || '—')
                                        ),
                                        e('div', null,
                                            e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Tủ'),
                                            e('div', { className: 'font-medium text-gray-800' }, selectedDocument.tu || '—')
                                        ),
                                        e('div', null,
                                            e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Kệ'),
                                            e('div', { className: 'font-medium text-gray-800' }, selectedDocument.ke || '—')
                                        ),
                                        e('div', null,
                                            e('div', { className: 'text-gray-500 text-xs mb-1' }, 'Ngăn'),
                                            e('div', { className: 'font-medium text-gray-800' }, selectedDocument.ngan || '—')
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),

        // ===== MODAL CHỈNH SỬA TÀI LIỆU =====
        showEditDocModal && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-[60]' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden' },
                // Header
                e('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-gray-200' },
                    e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Chỉnh sửa thông tin tài liệu'),
                    e('button', {
                        className: 'p-1.5 text-gray-400 hover:text-gray-600',
                        onClick: () => setShowEditDocModal(false)
                    },
                        e('i', { className: 'fas fa-times' })
                    )
                ),
                // Body
                e('div', { className: 'px-6 py-5 overflow-y-auto max-h-[60vh] space-y-4' },
                    e('div', { className: 'grid grid-cols-2 gap-4' },
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Số văn bản'),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: editDocData.soVanBan || '',
                                onChange: (ev) => setEditDocData({ ...editDocData, soVanBan: ev.target.value })
                            })
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Hình thức tài liệu'),
                            e('select', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: editDocData.hinhThucTaiLieu || '',
                                onChange: (ev) => setEditDocData({ ...editDocData, hinhThucTaiLieu: ev.target.value })
                            },
                                e('option', { value: 'Bản scan' }, 'Bản scan'),
                                e('option', { value: 'Bản gốc' }, 'Bản gốc'),
                                e('option', { value: 'Bản sao' }, 'Bản sao')
                            )
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Cơ quan ban hành'),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: editDocData.coQuanBanHanh || '',
                                onChange: (ev) => setEditDocData({ ...editDocData, coQuanBanHanh: ev.target.value })
                            })
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày ban hành'),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: editDocData.ngayBanHanh || '',
                                onChange: (ev) => setEditDocData({ ...editDocData, ngayBanHanh: ev.target.value })
                            })
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày hiệu lực'),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: editDocData.ngayHieuLuc || '',
                                onChange: (ev) => setEditDocData({ ...editDocData, ngayHieuLuc: ev.target.value })
                            })
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày hết hiệu lực'),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: editDocData.ngayHetHieuLuc || '',
                                onChange: (ev) => setEditDocData({ ...editDocData, ngayHetHieuLuc: ev.target.value })
                            })
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Tính chất hồ sơ'),
                            e('select', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: editDocData.tinhChat || '',
                                onChange: (ev) => setEditDocData({ ...editDocData, tinhChat: ev.target.value })
                            },
                                e('option', { value: 'Bản gốc' }, 'Bản gốc'),
                                e('option', { value: 'Bản sao' }, 'Bản sao'),
                                e('option', { value: 'Bản công chứng' }, 'Bản công chứng')
                            )
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Trước phê duyệt CAS'),
                            e('select', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: editDocData.truocPheDuyetCAS || '',
                                onChange: (ev) => setEditDocData({ ...editDocData, truocPheDuyetCAS: ev.target.value })
                            },
                                e('option', { value: 'Có' }, 'Có'),
                                e('option', { value: 'Không' }, 'Không')
                            )
                        )
                    )
                ),
                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex justify-end gap-3' },
                    e('button', {
                        className: 'px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50',
                        onClick: () => setShowEditDocModal(false)
                    }, 'Hủy'),
                    e('button', {
                        className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005a57]',
                        onClick: () => {
                            // Cập nhật document
                            const updatedDocs = documents.map(d =>
                                d.id === editDocData.id ? { ...d, ...editDocData } : d
                            );
                            setDocuments(updatedDocs);
                            setSelectedDocument({ ...selectedDocument, ...editDocData });
                            setShowEditDocModal(false);
                        }
                    }, 'Cập nhật')
                )
            )
        ),

        // ===== TASK 8: ADVANCED SEARCH POPUP =====
        showAdvSearch && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[85vh] overflow-hidden' },
                // Header
                e('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-gray-200' },
                    e('div', null,
                        e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Tìm kiếm nâng cao'),
                        e('p', { className: 'text-sm text-gray-500 mt-0.5' }, 'Lọc tài liệu theo nhiều tiêu chí')
                    ),
                    e('button', {
                        className: 'p-1.5 text-gray-400 hover:text-gray-600',
                        onClick: () => setShowAdvSearch(false)
                    }, e('i', { className: 'fas fa-times' }))
                ),
                // Body
                e('div', { className: 'px-6 py-5 space-y-4 overflow-y-auto max-h-[60vh]' },
                    // Row 1
                    e('div', { className: 'grid grid-cols-3 gap-4' },
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Trạng thái tài liệu'),
                            e('select', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: advSearch.trangThaiTL,
                                onChange: (ev) => setAdvSearch({ ...advSearch, trangThaiTL: ev.target.value })
                            },
                                e('option', { value: '' }, '— Tất cả —'),
                                e('option', { value: 'Dự thảo' }, 'Dự thảo'),
                                e('option', { value: 'Đã phê duyệt' }, 'Đã phê duyệt'),
                                e('option', { value: 'Chờ phê duyệt' }, 'Chờ phê duyệt'),
                                e('option', { value: 'Từ chối' }, 'Từ chối')
                            )
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Tính chất tài liệu'),
                            e('select', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: advSearch.tinhChatTL,
                                onChange: (ev) => setAdvSearch({ ...advSearch, tinhChatTL: ev.target.value })
                            },
                                e('option', { value: '' }, '— Tất cả —'),
                                e('option', { value: 'Bản gốc' }, 'Bản gốc'),
                                e('option', { value: 'Bản sao' }, 'Bản sao'),
                                e('option', { value: 'Bản công chứng' }, 'Bản công chứng')
                            )
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Trạng thái QTTD'),
                            e('select', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: advSearch.trangThaiQTTD,
                                onChange: (ev) => setAdvSearch({ ...advSearch, trangThaiQTTD: ev.target.value })
                            },
                                e('option', { value: '' }, '— Tất cả —'),
                                e('option', { value: 'Đang xử lý' }, 'Đang xử lý'),
                                e('option', { value: 'Hoàn thành' }, 'Hoàn thành'),
                                e('option', { value: 'Hủy' }, 'Hủy')
                            )
                        )
                    ),
                    // Row 2: Người cập nhật
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Người cập nhật'),
                        e('input', {
                            type: 'text',
                            placeholder: 'Nhập mã NV hoặc tên...',
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            value: advSearch.nguoiCapNhat,
                            onChange: (ev) => setAdvSearch({ ...advSearch, nguoiCapNhat: ev.target.value })
                        })
                    ),
                    // Row 3: Ngày hết hiệu lực từ/đến
                    e('div', { className: 'grid grid-cols-2 gap-4' },
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày hết hiệu lực từ'),
                            e('input', {
                                type: 'date',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: advSearch.ngayHetHLTu,
                                onChange: (ev) => setAdvSearch({ ...advSearch, ngayHetHLTu: ev.target.value })
                            })
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày hết hiệu lực đến'),
                            e('input', {
                                type: 'date',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: advSearch.ngayHetHLDen,
                                onChange: (ev) => setAdvSearch({ ...advSearch, ngayHetHLDen: ev.target.value })
                            })
                        )
                    ),
                    // Row 4: Ngày tải tài liệu từ/đến
                    e('div', { className: 'grid grid-cols-2 gap-4' },
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày tải tài liệu từ'),
                            e('input', {
                                type: 'date',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: advSearch.ngayTaiTu,
                                onChange: (ev) => setAdvSearch({ ...advSearch, ngayTaiTu: ev.target.value })
                            })
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày tải tài liệu đến'),
                            e('input', {
                                type: 'date',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: advSearch.ngayTaiDen,
                                onChange: (ev) => setAdvSearch({ ...advSearch, ngayTaiDen: ev.target.value })
                            })
                        )
                    )
                ),
                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex justify-end gap-3' },
                    e('button', {
                        className: 'px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50',
                        onClick: () => {
                            setAdvSearch({ trangThaiTL: '', tinhChatTL: '', trangThaiQTTD: '', nguoiCapNhat: '', ngayHetHLTu: '', ngayHetHLDen: '', ngayTaiTu: '', ngayTaiDen: '' });
                            fireToast('Đã xóa bộ lọc tìm kiếm', 'info');
                        }
                    }, e('i', { className: 'fas fa-eraser mr-1.5' }), 'Xóa bộ lọc'),
                    e('button', {
                        className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005B58]',
                        onClick: () => {
                            // Mock filter
                            var count = documents.filter(d => {
                                if (advSearch.trangThaiTL && d.trangThai !== advSearch.trangThaiTL) return false;
                                if (advSearch.tinhChatTL && d.tinhChat !== advSearch.tinhChatTL) return false;
                                if (advSearch.nguoiCapNhat && !(d.nguoiCapNhat || '').toLowerCase().includes(advSearch.nguoiCapNhat.toLowerCase())) return false;
                                return true;
                            }).length;
                            setShowAdvSearch(false);
                            fireToast('Tìm thấy ' + count + ' tài liệu phù hợp', 'success');
                        }
                    }, e('i', { className: 'fas fa-search mr-1.5' }), 'Tìm kiếm')
                )
            )
        ),

        // ===== TASK 9: ADD NEW DOCUMENT WIZARD (2 STEPS) =====
        showAddWizard && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden flex flex-col' },
                // Header with step indicator
                e('div', { className: 'px-6 py-4 border-b border-gray-200' },
                    e('div', { className: 'flex items-center justify-between mb-3' },
                        e('h3', { className: 'text-lg font-semibold text-gray-800' }, wizardStep === 1 ? 'Thêm tài liệu' : 'Nhập thông tin'),
                        e('button', {
                            className: 'p-1.5 text-gray-400 hover:text-gray-600',
                            onClick: () => setShowAddWizard(false)
                        }, e('i', { className: 'fas fa-times' }))
                    ),
                    // Step indicator
                    e('div', { className: 'flex items-center gap-2' },
                        e('div', { className: 'flex items-center gap-2' },
                            e('div', { className: 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ' + (wizardStep >= 1 ? 'bg-[#006B68] text-white' : 'bg-gray-200 text-gray-500') }, '1'),
                            e('span', { className: 'text-sm font-medium ' + (wizardStep >= 1 ? 'text-[#006B68]' : 'text-gray-400') }, 'Thêm tài liệu')
                        ),
                        e('div', { className: 'w-16 h-0.5 ' + (wizardStep >= 2 ? 'bg-[#006B68]' : 'bg-gray-200') }),
                        e('div', { className: 'flex items-center gap-2' },
                            e('div', { className: 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ' + (wizardStep >= 2 ? 'bg-[#006B68] text-white' : 'bg-gray-200 text-gray-500') }, '2'),
                            e('span', { className: 'text-sm font-medium ' + (wizardStep >= 2 ? 'text-[#006B68]' : 'text-gray-400') }, 'Nhập thông tin')
                        )
                    )
                ),
                // Body
                e('div', { className: 'flex-1 overflow-y-auto px-6 py-5' },
                    wizardStep === 1 ? e('div', { className: 'space-y-4' },
                        // Upload area
                        e('div', { className: 'border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#006B68] transition-colors' },
                            e('i', { className: 'fas fa-cloud-upload-alt text-3xl text-gray-300 mb-2' }),
                            e('p', { className: 'text-sm text-gray-500 mb-3' }, 'Kéo thả file vào đây hoặc nhấn nút bên dưới'),
                            e('div', { className: 'flex items-center justify-center gap-3' },
                                e('button', {
                                    className: 'px-4 py-2 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005B58]',
                                    onClick: () => {
                                        var fId = ++wizardFileCounter.current;
                                        var fakeNames = ['HopDong_TinDung_' + fId + '.pdf', 'BaoCao_TaiChinh_' + fId + '.xlsx', 'GiayPhep_KinhDoanh_' + fId + '.pdf', 'BienBan_ThamDinh_' + fId + '.docx'];
                                        var name = fakeNames[Math.floor(Math.random() * fakeNames.length)];
                                        setWizardFiles(prev => [...prev, {
                                            id: fId,
                                            fileName: name,
                                            size: (Math.random() * 5 + 0.5).toFixed(1) + ' MB',
                                            nhomHoSo: '',
                                            phanNhom: '',
                                            loaiHoSo: '',
                                            tenHoSo: ''
                                        }]);
                                    }
                                },
                                    e('i', { className: 'fas fa-plus mr-1.5' }),
                                    'Chọn file'
                                ),
                                e('button', {
                                    className: 'px-4 py-2 border border-[#006B68] text-[#006B68] rounded-lg text-sm hover:bg-[#e6f4f1]',
                                    onClick: () => {
                                        setExistDocSearch({ soHoSo: '', tenHoSo: '' });
                                        setExistDocSelected([]);
                                        setExistDocExpanded({ root1: true, root2: false });
                                        setShowExistDocPopup(true);
                                    }
                                },
                                    e('i', { className: 'fas fa-link mr-1.5' }),
                                    'Chọn hồ sơ có sẵn'
                                )
                            )
                        ),
                        // File list table
                        wizardFiles.length > 0 && e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                            e('table', { className: 'w-full text-sm' },
                                e('thead', null,
                                    e('tr', { className: 'bg-[#006B68] text-white' },
                                        e('th', { className: 'px-3 py-2.5 text-left font-medium w-10' }, 'STT'),
                                        e('th', { className: 'px-3 py-2.5 text-left font-medium' }, 'Tên file'),
                                        e('th', { className: 'px-3 py-2.5 text-left font-medium w-20' }, 'Dung lượng'),
                                        e('th', { className: 'px-3 py-2.5 text-left font-medium' }, 'Nhóm hồ sơ'),
                                        e('th', { className: 'px-3 py-2.5 text-left font-medium' }, 'Phân nhóm'),
                                        e('th', { className: 'px-3 py-2.5 text-left font-medium' }, 'Loại hồ sơ'),
                                        e('th', { className: 'px-3 py-2.5 text-left font-medium' }, 'Tên hồ sơ'),
                                        e('th', { className: 'px-3 py-2.5 text-center font-medium w-16' }, '')
                                    )
                                ),
                                e('tbody', null,
                                    wizardFiles.map((f, idx) =>
                                        e('tr', { key: f.id, className: 'border-b border-gray-100 hover:bg-gray-50' },
                                            e('td', { className: 'px-3 py-2.5 text-gray-600' }, idx + 1),
                                            e('td', { className: 'px-3 py-2.5' },
                                                e('div', { className: 'flex items-center gap-2' },
                                                    e('i', { className: 'fas fa-file text-gray-400 text-xs' }),
                                                    e('span', { className: 'text-gray-800' }, f.fileName)
                                                )
                                            ),
                                            e('td', { className: 'px-3 py-2.5 text-gray-500 text-xs' }, f.size),
                                            e('td', { className: 'px-3 py-2' },
                                                e('select', {
                                                    className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#006B68]/30',
                                                    value: f.nhomHoSo,
                                                    onChange: (ev) => setWizardFiles(prev => prev.map(x => x.id === f.id ? { ...x, nhomHoSo: ev.target.value } : x))
                                                },
                                                    e('option', { value: '' }, '— Chọn —'),
                                                    e('option', { value: 'Hồ sơ pháp lý' }, 'Hồ sơ pháp lý'),
                                                    e('option', { value: 'Hồ sơ tài chính' }, 'Hồ sơ tài chính'),
                                                    e('option', { value: 'Hồ sơ tín dụng' }, 'Hồ sơ tín dụng'),
                                                    e('option', { value: 'Hồ sơ TSĐB' }, 'Hồ sơ TSĐB')
                                                )
                                            ),
                                            e('td', { className: 'px-3 py-2' },
                                                e('select', {
                                                    className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#006B68]/30',
                                                    value: f.phanNhom,
                                                    onChange: (ev) => setWizardFiles(prev => prev.map(x => x.id === f.id ? { ...x, phanNhom: ev.target.value } : x))
                                                },
                                                    e('option', { value: '' }, '— Chọn —'),
                                                    e('option', { value: 'Nhóm A' }, 'Nhóm A'),
                                                    e('option', { value: 'Nhóm B' }, 'Nhóm B')
                                                )
                                            ),
                                            e('td', { className: 'px-3 py-2' },
                                                e('select', {
                                                    className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#006B68]/30',
                                                    value: f.loaiHoSo,
                                                    onChange: (ev) => setWizardFiles(prev => prev.map(x => x.id === f.id ? { ...x, loaiHoSo: ev.target.value } : x))
                                                },
                                                    e('option', { value: '' }, '— Chọn —'),
                                                    e('option', { value: 'Giấy tờ thành lập' }, 'Giấy tờ thành lập'),
                                                    e('option', { value: 'Báo cáo tài chính' }, 'Báo cáo tài chính'),
                                                    e('option', { value: 'Hợp đồng' }, 'Hợp đồng')
                                                )
                                            ),
                                            e('td', { className: 'px-3 py-2' },
                                                e('select', {
                                                    className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#006B68]/30',
                                                    value: f.tenHoSo,
                                                    onChange: (ev) => setWizardFiles(prev => prev.map(x => x.id === f.id ? { ...x, tenHoSo: ev.target.value } : x))
                                                },
                                                    e('option', { value: '' }, '— Chọn —'),
                                                    e('option', { value: 'Giấy CNĐKKD' }, 'Giấy CNĐKKD'),
                                                    e('option', { value: 'BCTC kiểm toán' }, 'BCTC kiểm toán'),
                                                    e('option', { value: 'Hợp đồng tín dụng' }, 'Hợp đồng tín dụng')
                                                )
                                            ),
                                            e('td', { className: 'px-3 py-2 text-center' },
                                                e('button', {
                                                    className: 'p-1 text-gray-400 hover:text-red-500',
                                                    title: 'Xóa file',
                                                    onClick: () => {
                                                        if (confirm('Xác nhận xóa file "' + f.fileName + '"?')) {
                                                            setWizardFiles(prev => prev.filter(x => x.id !== f.id));
                                                        }
                                                    }
                                                },
                                                    e('i', { className: 'fas fa-trash-alt text-sm' })
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        wizardFiles.length === 0 && e('div', { className: 'text-center py-8 text-gray-400' },
                            e('i', { className: 'fas fa-file-upload text-4xl mb-3 opacity-50' }),
                            e('br'),
                            'Chưa có file nào được thêm'
                        )
                    )
                    // Step 2: Metadata
                    : e('div', { className: 'space-y-4' },
                        e('div', { className: 'grid grid-cols-2 gap-4' },
                            e('div', null,
                                e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                    'Hình thức tài liệu ',
                                    e('span', { className: 'text-red-500' }, '*')
                                ),
                                e('select', {
                                    className: 'w-full px-3 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30 ' + (wizardErrors.hinhThucTaiLieu ? 'border-red-400' : 'border-gray-300'),
                                    value: wizardMeta.hinhThucTaiLieu,
                                    onChange: (ev) => { setWizardMeta({ ...wizardMeta, hinhThucTaiLieu: ev.target.value }); setWizardErrors(prev => ({ ...prev, hinhThucTaiLieu: false })); }
                                },
                                    e('option', { value: '' }, '— Chọn —'),
                                    e('option', { value: 'Bản scan' }, 'Bản scan'),
                                    e('option', { value: 'Bản gốc' }, 'Bản gốc'),
                                    e('option', { value: 'Bản sao' }, 'Bản sao')
                                )
                            ),
                            e('div', null,
                                e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                    'Số văn bản ',
                                    e('span', { className: 'text-red-500' }, '*')
                                ),
                                e('input', {
                                    type: 'text',
                                    placeholder: 'Nhập số văn bản...',
                                    className: 'w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30 ' + (wizardErrors.soVanBan ? 'border-red-400' : 'border-gray-300'),
                                    value: wizardMeta.soVanBan,
                                    onChange: (ev) => { setWizardMeta({ ...wizardMeta, soVanBan: ev.target.value }); setWizardErrors(prev => ({ ...prev, soVanBan: false })); }
                                })
                            ),
                            e('div', null,
                                e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Cơ quan ban hành'),
                                e('input', {
                                    type: 'text',
                                    placeholder: 'Nhập cơ quan ban hành...',
                                    className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                    value: wizardMeta.coQuanBanHanh,
                                    onChange: (ev) => setWizardMeta({ ...wizardMeta, coQuanBanHanh: ev.target.value })
                                })
                            ),
                            e('div', null,
                                e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày ban hành'),
                                e('input', {
                                    type: 'date',
                                    className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                    value: wizardMeta.ngayBanHanh,
                                    onChange: (ev) => setWizardMeta({ ...wizardMeta, ngayBanHanh: ev.target.value })
                                })
                            ),
                            e('div', null,
                                e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày hiệu lực'),
                                e('input', {
                                    type: 'date',
                                    className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                    value: wizardMeta.ngayHieuLuc,
                                    onChange: (ev) => setWizardMeta({ ...wizardMeta, ngayHieuLuc: ev.target.value })
                                })
                            ),
                            e('div', null,
                                e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày hết hiệu lực'),
                                e('input', {
                                    type: 'date',
                                    className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                    value: wizardMeta.ngayHetHieuLuc,
                                    onChange: (ev) => setWizardMeta({ ...wizardMeta, ngayHetHieuLuc: ev.target.value })
                                })
                            ),
                            e('div', null,
                                e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                    'Trạng thái bản ',
                                    e('span', { className: 'text-red-500' }, '*')
                                ),
                                e('select', {
                                    className: 'w-full px-3 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30 ' + (wizardErrors.trangThaiBan ? 'border-red-400' : 'border-gray-300'),
                                    value: wizardMeta.trangThaiBan,
                                    onChange: (ev) => { setWizardMeta({ ...wizardMeta, trangThaiBan: ev.target.value }); setWizardErrors(prev => ({ ...prev, trangThaiBan: false })); }
                                },
                                    e('option', { value: '' }, '— Chọn —'),
                                    e('option', { value: 'Bản gốc' }, 'Bản gốc'),
                                    e('option', { value: 'Bản sao' }, 'Bản sao'),
                                    e('option', { value: 'Bản công chứng' }, 'Bản công chứng')
                                )
                            )
                        )
                    )
                ),
                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex items-center justify-between' },
                    e('div', null,
                        wizardStep === 2 && e('button', {
                            className: 'px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1',
                            onClick: () => setWizardStep(1)
                        },
                            e('i', { className: 'fas fa-arrow-left text-xs' }),
                            'Quay lại'
                        )
                    ),
                    e('div', { className: 'flex items-center gap-3' },
                        e('button', {
                            className: 'px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50',
                            onClick: () => setShowAddWizard(false)
                        }, 'Thoát'),
                        wizardStep === 1 ?
                            e('button', {
                                className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005B58]',
                                onClick: () => {
                                    if (wizardFiles.length === 0) {
                                        fireToast('Vui lòng thêm ít nhất 1 file', 'warning');
                                        return;
                                    }
                                    setWizardStep(2);
                                }
                            }, 'Tiếp theo ', e('i', { className: 'fas fa-arrow-right text-xs ml-1' }))
                        : e(React.Fragment, null,
                            e('button', {
                                className: 'px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50',
                                onClick: () => {
                                    // Save draft
                                    fireToast('Đã lưu bản nháp thành công!', 'success');
                                    setShowAddWizard(false);
                                }
                            }, e('i', { className: 'fas fa-save mr-1.5' }), 'Lưu'),
                            e('button', {
                                className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005B58]',
                                onClick: () => {
                                    // Validate required fields
                                    var errs = {};
                                    if (!wizardMeta.hinhThucTaiLieu) errs.hinhThucTaiLieu = true;
                                    if (!wizardMeta.soVanBan) errs.soVanBan = true;
                                    if (!wizardMeta.trangThaiBan) errs.trangThaiBan = true;
                                    setWizardErrors(errs);
                                    if (Object.keys(errs).length > 0) {
                                        fireToast('Vui lòng điền đầy đủ các trường bắt buộc (*)', 'warning');
                                        return;
                                    }
                                    // Mock add documents
                                    var today = new Date().toLocaleDateString('vi-VN');
                                    var newDocs = wizardFiles.map((f, i) => ({
                                        id: Date.now() + i,
                                        tenTaiLieu: f.fileName.replace(/\.[^.]+$/, ''),
                                        phanNhomHoSo: f.nhomHoSo || '—',
                                        loaiHoSo: f.loaiHoSo || '—',
                                        tenHoSo: f.fileName,
                                        folder: selectedFolder || 'giayToThanhLap',
                                        tinhChat: wizardMeta.trangThaiBan,
                                        trangThai: 'Dự thảo',
                                        ngayDangTai: today,
                                        ngayCapNhat: today,
                                        soVanBan: wizardMeta.soVanBan,
                                        hinhThucTaiLieu: wizardMeta.hinhThucTaiLieu,
                                        coQuanBanHanh: wizardMeta.coQuanBanHanh,
                                        ngayBanHanh: wizardMeta.ngayBanHanh,
                                        ngayUpload: today,
                                        truocPheDuyetCAS: 'Không',
                                        ngayHieuLuc: wizardMeta.ngayHieuLuc,
                                        ngayHetHieuLuc: wizardMeta.ngayHetHieuLuc,
                                        nguoiCapNhat: '181720 - Hoàng Quốc Đạt',
                                        maTaiLieu: '' + (1038253 + Math.floor(Math.random() * 1000)),
                                        hinhThucLuuTru: wizardMeta.hinhThucTaiLieu,
                                        trangThaiLuuTru: 'Chưa lưu kho',
                                        idTsdb: '', hinhThucKhoQuy: '', trangThaiKhoQuy: '', tenKho: '', tu: '', ke: '', ngan: ''
                                    }));
                                    setDocuments(prev => [...prev, ...newDocs]);
                                    setShowAddWizard(false);
                                    fireToast('Đã đẩy duyệt ' + newDocs.length + ' tài liệu thành công!', 'success');
                                }
                            }, e('i', { className: 'fas fa-paper-plane mr-1.5' }), 'Đẩy duyệt')
                        )
                    )
                )
            )
        ),

        // ===== TASK 10: EXISTING DOCUMENT SELECTION POPUP =====
        showExistDocPopup && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-[60]' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden flex flex-col' },
                // Header
                e('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-gray-200' },
                    e('div', null,
                        e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Chọn hồ sơ có sẵn'),
                        e('p', { className: 'text-sm text-gray-500 mt-0.5' }, 'Tìm và liên kết tài liệu từ hồ sơ tín dụng khác')
                    ),
                    e('button', {
                        className: 'p-1.5 text-gray-400 hover:text-gray-600',
                        onClick: () => setShowExistDocPopup(false)
                    }, e('i', { className: 'fas fa-times' }))
                ),
                // Search fields
                e('div', { className: 'px-6 py-3 border-b border-gray-200 bg-gray-50' },
                    e('div', { className: 'grid grid-cols-2 gap-3' },
                        e('div', null,
                            e('label', { className: 'block text-xs font-medium text-gray-600 mb-1' }, 'Số hồ sơ tín dụng'),
                            e('input', {
                                type: 'text',
                                placeholder: 'VD: HSTD-2024-001',
                                className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: existDocSearch.soHoSo,
                                onChange: (ev) => setExistDocSearch({ ...existDocSearch, soHoSo: ev.target.value })
                            })
                        ),
                        e('div', null,
                            e('label', { className: 'block text-xs font-medium text-gray-600 mb-1' }, 'Tên hồ sơ'),
                            e('input', {
                                type: 'text',
                                placeholder: 'Nhập tên hồ sơ...',
                                className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: existDocSearch.tenHoSo,
                                onChange: (ev) => setExistDocSearch({ ...existDocSearch, tenHoSo: ev.target.value })
                            })
                        )
                    )
                ),
                // Tree
                e('div', { className: 'flex-1 overflow-y-auto px-6 py-4' },
                    existDocTree.map(root =>
                        e('div', { key: root.id, className: 'mb-3' },
                            e('div', {
                                className: 'flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100',
                                onClick: () => setExistDocExpanded(prev => ({ ...prev, [root.id]: !prev[root.id] }))
                            },
                                e('i', { className: 'fas ' + (existDocExpanded[root.id] ? 'fa-chevron-down' : 'fa-chevron-right') + ' text-gray-400 text-xs w-3' }),
                                e('i', { className: 'fas ' + (existDocExpanded[root.id] ? 'fa-folder-open text-[#006B68]' : 'fa-folder text-yellow-500') + ' text-sm' }),
                                e('span', { className: 'text-sm font-medium text-gray-700' }, root.label)
                            ),
                            existDocExpanded[root.id] && root.children && e('div', { className: 'ml-6 mt-1 space-y-1' },
                                root.children.filter(child => {
                                    if (existDocSearch.soHoSo && !(child.soHoSo || '').toLowerCase().includes(existDocSearch.soHoSo.toLowerCase())) return false;
                                    if (existDocSearch.tenHoSo && !child.label.toLowerCase().includes(existDocSearch.tenHoSo.toLowerCase())) return false;
                                    return true;
                                }).map(child =>
                                    e('label', {
                                        key: child.id,
                                        className: 'flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer hover:bg-[#e6f4f1] transition-colors ' +
                                            (existDocSelected.includes(child.id) ? 'bg-[#e6f4f1]' : '')
                                    },
                                        e('input', {
                                            type: 'checkbox',
                                            className: 'w-4 h-4 rounded border-gray-300',
                                            checked: existDocSelected.includes(child.id),
                                            onChange: () => setExistDocSelected(prev =>
                                                prev.includes(child.id) ? prev.filter(x => x !== child.id) : [...prev, child.id]
                                            )
                                        }),
                                        e('i', { className: 'fas fa-file-alt text-gray-400 text-sm' }),
                                        e('span', { className: 'text-sm text-gray-700' }, child.label)
                                    )
                                )
                            )
                        )
                    )
                ),
                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex items-center justify-between' },
                    e('span', { className: 'text-sm text-gray-500' },
                        existDocSelected.length > 0 ? 'Đã chọn ' + existDocSelected.length + ' hồ sơ' : 'Chưa chọn hồ sơ nào'
                    ),
                    e('div', { className: 'flex items-center gap-3' },
                        e('button', {
                            className: 'px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 ' +
                                (existDocSelected.length !== 1 ? 'opacity-50 cursor-not-allowed' : ''),
                            disabled: existDocSelected.length !== 1,
                            onClick: () => fireToast('Đang mở xem hồ sơ...', 'info')
                        }, e('i', { className: 'fas fa-eye mr-1.5' }), 'Xem hồ sơ'),
                        e('button', {
                            className: 'px-4 py-2.5 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005B58] ' +
                                (existDocSelected.length === 0 ? 'opacity-50 cursor-not-allowed' : ''),
                            disabled: existDocSelected.length === 0,
                            onClick: () => {
                                // Add linked rows to wizard
                                var allChildren = existDocTree.flatMap(r => r.children || []);
                                var linked = existDocSelected.map(selId => {
                                    var ch = allChildren.find(c => c.id === selId);
                                    var fId = ++wizardFileCounter.current;
                                    return {
                                        id: fId,
                                        fileName: ch ? ch.label.split(' — ')[1] || ch.label : 'linked_doc.pdf',
                                        size: 'Liên kết',
                                        nhomHoSo: '',
                                        phanNhom: '',
                                        loaiHoSo: '',
                                        tenHoSo: ''
                                    };
                                });
                                setWizardFiles(prev => [...prev, ...linked]);
                                setShowExistDocPopup(false);
                                fireToast('Đã liên kết ' + linked.length + ' hồ sơ', 'success');
                            }
                        }, e('i', { className: 'fas fa-check mr-1.5' }), 'Xác nhận')
                    )
                )
            )
        ),

        // ===== TASK 11: PREVIEW POPUP =====
        showPreviewPopup && previewDoc && e('div', { className: 'fixed inset-0 bg-black/80 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[92vh] overflow-hidden flex flex-col' },
                // Header
                e('div', { className: 'flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-900 text-white' },
                    e('div', { className: 'flex items-center gap-3' },
                        e('i', { className: 'fas fa-file-pdf text-red-400' }),
                        e('span', { className: 'text-sm font-medium' }, previewDoc.tenHoSo || previewDoc.tenTaiLieu)
                    ),
                    e('div', { className: 'flex items-center gap-2' },
                        // Toolbar
                        e('button', {
                            className: 'p-2 text-gray-300 hover:text-white rounded hover:bg-gray-700 transition-colors',
                            title: 'Thu nhỏ',
                            onClick: () => setPreviewZoom(prev => Math.max(25, prev - 25))
                        }, e('i', { className: 'fas fa-search-minus text-sm' })),
                        e('span', { className: 'text-xs text-gray-400 w-12 text-center' }, previewZoom + '%'),
                        e('button', {
                            className: 'p-2 text-gray-300 hover:text-white rounded hover:bg-gray-700 transition-colors',
                            title: 'Phóng to',
                            onClick: () => setPreviewZoom(prev => Math.min(200, prev + 25))
                        }, e('i', { className: 'fas fa-search-plus text-sm' })),
                        e('button', {
                            className: 'p-2 text-gray-300 hover:text-white rounded hover:bg-gray-700 transition-colors',
                            title: 'Vừa chiều rộng',
                            onClick: () => setPreviewZoom(100)
                        }, e('i', { className: 'fas fa-expand text-sm' })),
                        e('div', { className: 'w-px h-5 bg-gray-600 mx-1' }),
                        e('button', {
                            className: 'p-2 text-gray-300 hover:text-white rounded hover:bg-gray-700 transition-colors',
                            title: 'Tải xuống',
                            onClick: () => fireToast('Đang tải xuống ' + (previewDoc.tenHoSo || 'tài liệu') + '...', 'info')
                        }, e('i', { className: 'fas fa-download text-sm' })),
                        e('div', { className: 'w-px h-5 bg-gray-600 mx-1' }),
                        e('button', {
                            className: 'p-2 text-gray-300 hover:text-white rounded hover:bg-gray-700 transition-colors',
                            title: 'Đóng',
                            onClick: () => setShowPreviewPopup(false)
                        }, e('i', { className: 'fas fa-times text-sm' }))
                    )
                ),
                // Document viewer placeholder
                e('div', {
                    className: 'flex-1 overflow-auto bg-gray-100 flex items-center justify-center',
                    style: { minHeight: '500px' }
                },
                    e('div', {
                        className: 'bg-white shadow-lg border border-gray-300 p-12 text-center',
                        style: { width: (595 * previewZoom / 100) + 'px', minHeight: (842 * previewZoom / 100) + 'px', transition: 'all 0.2s ease' }
                    },
                        e('div', { className: 'mb-6' },
                            e('div', { className: 'text-xl font-bold text-gray-800 mb-2', style: { fontSize: (20 * previewZoom / 100) + 'px' } }, 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'),
                            e('div', { className: 'text-base font-semibold text-gray-700 mb-1', style: { fontSize: (16 * previewZoom / 100) + 'px' } }, 'Độc lập – Tự do – Hạnh phúc'),
                            e('div', { className: 'w-24 h-0.5 bg-gray-800 mx-auto mt-2' })
                        ),
                        e('div', { className: 'mb-4', style: { fontSize: (14 * previewZoom / 100) + 'px' } },
                            e('div', { className: 'font-bold text-lg mb-3 text-gray-800' }, previewDoc.tenTaiLieu || 'Tài liệu'),
                            e('div', { className: 'text-gray-500 text-sm mb-1' }, 'Số văn bản: ' + (previewDoc.soVanBan || '—')),
                            e('div', { className: 'text-gray-500 text-sm mb-1' }, 'Cơ quan ban hành: ' + (previewDoc.coQuanBanHanh || '—')),
                            e('div', { className: 'text-gray-500 text-sm' }, 'Ngày ban hành: ' + (previewDoc.ngayBanHanh || '—'))
                        ),
                        e('div', { className: 'mt-8 border-t border-gray-200 pt-6' },
                            e('div', { className: 'text-gray-400 text-sm italic' }, '[Nội dung tài liệu hiển thị tại đây — Bản xem trước]'),
                            e('div', { className: 'mt-4 space-y-2 text-left text-gray-500 text-xs' },
                                e('p', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'),
                                e('p', null, 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'),
                                e('p', null, 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.')
                            )
                        )
                    )
                )
            )
        ),

        // ===== TASK 11: DELETE CONFIRM =====
        showDeleteConfirm && deleteDoc && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-[60]' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-md mx-4' },
                // Header
                e('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-gray-200' },
                    e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Xác nhận xóa'),
                    e('button', {
                        className: 'p-1.5 text-gray-400 hover:text-gray-600',
                        onClick: () => setShowDeleteConfirm(false)
                    }, e('i', { className: 'fas fa-times' }))
                ),
                // Body
                e('div', { className: 'px-6 py-5' },
                    deleteDoc.trangThai === 'Đã phê duyệt'
                        ? e('div', null,
                            e('div', { className: 'flex items-center gap-3 mb-3' },
                                e('div', { className: 'w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0' },
                                    e('i', { className: 'fas fa-exclamation-triangle text-orange-500' })
                                ),
                                e('div', null,
                                    e('div', { className: 'font-medium text-gray-800' }, 'Tài liệu đã được phê duyệt'),
                                    e('div', { className: 'text-sm text-gray-500 mt-0.5' }, '"' + deleteDoc.tenTaiLieu + '"')
                                )
                            ),
                            e('div', { className: 'bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-700' },
                                e('i', { className: 'fas fa-info-circle mr-1.5' }),
                                'Thao tác này chỉ xóa liên kết tài liệu khỏi hồ sơ tín dụng hiện tại. Tài liệu gốc vẫn được lưu trữ trong hệ thống.'
                            )
                        )
                        : e('div', null,
                            e('div', { className: 'flex items-center gap-3 mb-3' },
                                e('div', { className: 'w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0' },
                                    e('i', { className: 'fas fa-trash-alt text-red-500' })
                                ),
                                e('div', null,
                                    e('div', { className: 'font-medium text-gray-800' }, 'Xóa file khỏi HSTD'),
                                    e('div', { className: 'text-sm text-gray-500 mt-0.5' }, '"' + deleteDoc.tenTaiLieu + '"')
                                )
                            ),
                            e('div', { className: 'bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700' },
                                e('i', { className: 'fas fa-exclamation-circle mr-1.5' }),
                                'File sẽ bị xóa vĩnh viễn khỏi hồ sơ tín dụng. Thao tác này không thể hoàn tác.'
                            )
                        )
                ),
                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex justify-end gap-3' },
                    e('button', {
                        className: 'px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50',
                        onClick: () => setShowDeleteConfirm(false)
                    }, 'Hủy'),
                    e('button', {
                        className: 'px-5 py-2.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700',
                        onClick: () => {
                            setDocuments(prev => prev.filter(d => d.id !== deleteDoc.id));
                            setSelectedFiles(prev => prev.filter(id => id !== deleteDoc.id));
                            setShowDeleteConfirm(false);
                            setDeleteDoc(null);
                            fireToast(
                                deleteDoc.trangThai === 'Đã phê duyệt'
                                    ? 'Đã xóa liên kết tài liệu thành công'
                                    : 'Đã xóa file khỏi HSTD thành công',
                                'success'
                            );
                        }
                    }, deleteDoc.trangThai === 'Đã phê duyệt' ? 'Xóa liên kết' : 'Xóa file')
                )
            )
        ),

        // ===== TASK 11: MOVE MODAL =====
        showMoveModal && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[80vh] overflow-hidden flex flex-col' },
                // Header
                e('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-gray-200' },
                    e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Di chuyển tài liệu'),
                    e('button', {
                        className: 'p-1.5 text-gray-400 hover:text-gray-600',
                        onClick: () => setShowMoveModal(false)
                    }, e('i', { className: 'fas fa-times' }))
                ),
                // Rule explanation
                e('div', { className: 'px-6 py-3 bg-blue-50 border-b border-blue-100' },
                    e('div', { className: 'flex items-start gap-2 text-sm text-blue-700' },
                        e('i', { className: 'fas fa-info-circle mt-0.5 flex-shrink-0' }),
                        e('div', null,
                            e('div', { className: 'font-medium mb-1' }, 'Quy tắc di chuyển:'),
                            e('ul', { className: 'space-y-1 text-xs' },
                                e('li', null, '• ', e('strong', null, 'Đã duyệt'), ': Tạo bản sao (duplicate bản ghi), sinh ID mới, xóa liên kết cũ.'),
                                e('li', null, '• ', e('strong', null, 'Chưa duyệt'), ': Di chuyển trực tiếp sang thư mục đích.')
                            )
                        )
                    )
                ),
                // Move doc info
                moveDoc && e('div', { className: 'px-6 py-3 border-b border-gray-200 bg-gray-50' },
                    e('div', { className: 'flex items-center gap-2 text-sm' },
                        e('i', { className: 'fas fa-file-alt text-gray-400' }),
                        e('span', { className: 'text-gray-700' }, moveDoc.tenTaiLieu),
                        e('span', {
                            className: 'px-2 py-0.5 rounded text-xs ' +
                                (moveDoc.trangThai === 'Đã phê duyệt' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700')
                        }, moveDoc.trangThai || 'Dự thảo')
                    )
                ),
                // Destination folder tree
                e('div', { className: 'flex-1 overflow-y-auto px-6 py-4' },
                    e('div', { className: 'text-sm font-medium text-gray-700 mb-3' }, 'Chọn thư mục đích:'),
                    folderTree.map(folder =>
                        e('div', { key: folder.id, className: 'mb-1' },
                            e('div', {
                                className: 'flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ' +
                                    (moveDestination === folder.id ? 'bg-[#e6f4f1] text-[#006B68]' : 'hover:bg-gray-100 text-gray-700'),
                                onClick: () => {
                                    setMoveDestination(folder.id);
                                    if (folder.children) setMoveTreeExpanded(prev => ({ ...prev, [folder.id]: !prev[folder.id] }));
                                }
                            },
                                folder.children && e('i', { className: 'fas ' + (moveTreeExpanded[folder.id] ? 'fa-chevron-down' : 'fa-chevron-right') + ' text-gray-400 text-xs w-3' }),
                                !folder.children && e('span', { className: 'w-3' }),
                                e('i', { className: 'fas ' + (moveTreeExpanded[folder.id] ? 'fa-folder-open' : 'fa-folder') + ' ' + (moveDestination === folder.id ? 'text-[#006B68]' : 'text-yellow-500') + ' text-sm' }),
                                e('span', { className: 'text-sm' }, folder.label)
                            ),
                            folder.children && moveTreeExpanded[folder.id] && e('div', { className: 'ml-6' },
                                folder.children.map(child =>
                                    e('div', {
                                        key: child.id,
                                        className: 'flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-colors ' +
                                            (moveDestination === child.id ? 'bg-[#e6f4f1] text-[#006B68]' : 'hover:bg-gray-100 text-gray-600'),
                                        onClick: () => setMoveDestination(child.id)
                                    },
                                        e('span', { className: 'w-3' }),
                                        e('i', { className: 'fas fa-folder ' + (moveDestination === child.id ? 'text-[#006B68]' : 'text-yellow-500') + ' text-sm' }),
                                        e('span', { className: 'text-sm' }, child.label)
                                    )
                                )
                            )
                        )
                    )
                ),
                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex justify-end gap-3' },
                    e('button', {
                        className: 'px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50',
                        onClick: () => setShowMoveModal(false)
                    }, 'Hủy'),
                    e('button', {
                        className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005B58] ' +
                            (!moveDestination ? 'opacity-50 cursor-not-allowed' : ''),
                        disabled: !moveDestination,
                        onClick: () => {
                            if (!moveDestination) return;
                            if (moveDoc) {
                                if (moveDoc.trangThai === 'Đã phê duyệt') {
                                    // Duplicate: add copy to destination, mark old as moved
                                    var newId = Date.now();
                                    var copy = { ...moveDoc, id: newId, folder: moveDestination, maTaiLieu: '' + (1038253 + Math.floor(Math.random() * 1000)) };
                                    setDocuments(prev => [...prev.filter(d => d.id !== moveDoc.id), copy]);
                                    fireToast('Đã tạo bản sao và di chuyển đến thư mục mới', 'success');
                                } else {
                                    // Direct move
                                    setDocuments(prev => prev.map(d => d.id === moveDoc.id ? { ...d, folder: moveDestination } : d));
                                    fireToast('Đã di chuyển tài liệu thành công', 'success');
                                }
                            }
                            setSelectedFiles([]);
                            setShowMoveModal(false);
                        }
                    }, e('i', { className: 'fas fa-check mr-1.5' }), 'Xác nhận')
                )
            )
        ),

        // ===== TOAST NOTIFICATION =====
        showToast && e('div', {
            className: 'fixed bottom-6 left-1/2 z-[100]',
            style: { transform: 'translateX(-50%)' }
        },
            e('div', {
                className: 'flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-xl shadow-lg text-sm',
                style: { animation: 'slideUp 0.3s ease' }
            },
                e('i', {
                    className: 'fas ' +
                        (toastType === 'success' ? 'fa-check-circle text-green-500' :
                        toastType === 'warning' ? 'fa-exclamation-triangle text-orange-500' :
                        toastType === 'error' ? 'fa-times-circle text-red-500' :
                        'fa-info-circle text-blue-500')
                }),
                e('span', { className: 'text-gray-700' }, toastMsg),
                e('button', {
                    className: 'ml-3 text-gray-400 hover:text-gray-600',
                    onClick: () => setShowToast(false)
                }, e('i', { className: 'fas fa-times text-xs' }))
            )
        )
    );
};
