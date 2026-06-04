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
                // Toolbar
                e('div', { className: 'flex items-center justify-between px-4 py-3 border-b border-gray-200' },
                    e('div', { className: 'flex items-center gap-3' },
                        e('h3', { className: 'text-sm font-semibold text-gray-800' }, 'Danh mục tài liệu'),
                        // Info icon SVG (?)
                        e('button', {
                            className: 'p-1 text-gray-400 hover:text-gray-600 transition-colors',
                            onClick: () => setShowGoiYModal(true),
                            title: 'Gợi ý hồ sơ cần có'
                        },
                            e('svg', {
                                xmlns: 'http://www.w3.org/2000/svg',
                                width: '16',
                                height: '16',
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                stroke: 'currentColor',
                                strokeWidth: '2',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round'
                            },
                                e('circle', { cx: '12', cy: '12', r: '10' }),
                                e('path', { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' }),
                                e('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' })
                            )
                        ),
                        // Download icon SVG
                        e('button', {
                            className: 'p-1 text-gray-400 hover:text-gray-600 transition-colors',
                            title: 'Tải xuống hồ sơ đã chọn'
                        },
                            e('svg', {
                                xmlns: 'http://www.w3.org/2000/svg',
                                width: '16',
                                height: '16',
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                stroke: 'currentColor',
                                strokeWidth: '2',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round'
                            },
                                e('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
                                e('polyline', { points: '7 10 12 15 17 10' }),
                                e('line', { x1: '12', y1: '15', x2: '12', y2: '3' })
                            )
                        ),
                        // Forward/Move arrow icon SVG
                        e('button', {
                            className: 'p-1 text-gray-400 hover:text-gray-600 transition-colors',
                            onClick: () => setShowDiChuyenModal(true),
                            title: 'Di chuyển hồ sơ sang nhóm khác'
                        },
                            e('svg', {
                                xmlns: 'http://www.w3.org/2000/svg',
                                width: '16',
                                height: '16',
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                stroke: 'currentColor',
                                strokeWidth: '2',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round'
                            },
                                e('line', { x1: '5', y1: '12', x2: '19', y2: '12' }),
                                e('polyline', { points: '12 5 19 12 12 19' })
                            )
                        )
                    ),
                    e('div', { className: 'flex items-center gap-2' },
                        e('button', { className: 'px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2' },
                            e('i', { className: 'fas fa-upload' }),
                            'Tải lên'
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
                                                // Xem
                                                e('button', {
                                                    className: 'p-1 text-gray-400 hover:text-[#006B68]',
                                                    title: 'Xem chi tiết',
                                                    onClick: (ev) => {
                                                        ev.stopPropagation();
                                                        setSelectedDocument(doc);
                                                        setShowDetailView(true);
                                                    }
                                                },
                                                    e('i', { className: 'fas fa-eye text-sm' })
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
        )
    );
};
