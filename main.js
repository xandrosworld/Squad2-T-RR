// =====================================================
// RM - MAIN.JS - Template cố định (React.createElement, không JSX)
// =====================================================

const e = React.createElement;

// CONFIG
const MAIN_TABS = [
    { id: 'thongTinKH', label: 'Thông tin khách hàng' },
    { id: 'hoSoKH', label: 'Hồ sơ khách hàng' },
    { id: 'capTinDung', label: 'Khoản cấp tín dụng và Đề xuất' },
    { id: 'pheDuyetTinDung', label: 'Phê duyệt tín dụng' },
    { id: 'luongTrinhDuyet', label: 'Luồng trình duyệt' }
];

const SUB_TABS_CAP_TD = [];

const SUB_TABS_TTKH = [
    { id: 'thongTinPhiTaiChinh', label: 'Thông tin phi tài chính', component: 'TabThongTinPhiTaiChinh' },
    { id: 'thongTinTaiChinh', label: 'Thông tin tài chính', component: 'TabThongTinTaiChinh' },
    { id: 'quanHeTCTD', label: 'Quan hệ TCTD', component: 'TabQuanHeTCTD' }
];

const SUB_TABS_PHE_DUYET_TD = [
    { id: 'tongQuan', label: 'Tổng quan' },
    { id: 'deXuatThamDinh', label: 'Đề xuất & Thẩm định' },
    { id: 'khacBietTrongYeu', label: 'Khác biệt trọng yếu', badge: 1 },
    { id: 'dieuKienTinDung', label: 'Điều kiện tín dụng', badge: 1 },
    { id: 'taiSanBaoDam', label: 'Tài sản bảo đảm' }
];

const SIDEBAR_ITEMS = [
    { icon: 'fa-th-large' },
    { icon: 'fa-tasks', active: true },
    { icon: 'fa-file-alt' },
    { icon: 'fa-user' },
    { icon: 'fa-folder' },
    { icon: 'fa-shield-alt' },
    { icon: 'fa-exchange-alt' },
    { icon: 'fa-link' }
];

// =====================================================
// FIXED COMPONENTS
// =====================================================

function Sidebar() {
    return e('div', { className: 'sidebar' },
        // Icon toggle menu thay vì logo
        e('div', { className: 'sidebar-logo' },
            e('i', { className: 'fas fa-bars text-white' })
        ),
        e('div', { className: 'sidebar-menu' },
            SIDEBAR_ITEMS.map((item, i) =>
                e('div', { key: i, className: 'sidebar-item ' + (item.active ? 'active' : '') },
                    e('i', { className: 'fas ' + item.icon })
                )
            )
        ),
        e('div', { className: 'sidebar-bottom' },
            e('div', { className: 'sidebar-item' }, e('i', { className: 'fas fa-cog' })),
            e('div', { className: 'sidebar-item' }, e('i', { className: 'fas fa-sign-out-alt' }))
        )
    );
}

function Header({ onSwitchFlow, roleLabel } = {}) {
    // States cho dropdowns
    const [showNotifications, setShowNotifications] = React.useState(false);
    const [showFolders, setShowFolders] = React.useState(false);
    const [showHelp, setShowHelp] = React.useState(false);
    const [saveMessage, setSaveMessage] = React.useState(null);

    // Mock data thông báo
    const notifications = [
        { id: 1, title: 'Yêu cầu phê duyệt mới', desc: 'BC#19203945 cần phê duyệt', time: '5 phút trước', unread: true },
        { id: 2, title: 'Hồ sơ đã được cập nhật', desc: 'KH: Công ty ABC đã bổ sung hồ sơ', time: '30 phút trước', unread: true },
        { id: 3, title: 'Nhắc nhở deadline', desc: 'BC#19203940 hết hạn trong 2 ngày', time: '1 giờ trước', unread: true },
        { id: 4, title: 'Phê duyệt thành công', desc: 'BC#19203938 đã được duyệt', time: '2 giờ trước', unread: false },
        { id: 5, title: 'Yêu cầu bổ sung hồ sơ', desc: 'Cần bổ sung BCTC Q4/2025', time: '3 giờ trước', unread: false },
    ];

    // Mock data hồ sơ
    const folders = [
        { id: 1, name: 'BC#19203945 - Công ty TNHH ABC', status: 'Đang xử lý', color: 'orange' },
        { id: 2, name: 'BC#19203944 - CTCP XYZ', status: 'Chờ phê duyệt', color: 'blue' },
        { id: 3, name: 'BC#19203943 - Công ty DEF', status: 'Hoàn thành', color: 'green' },
    ];

    // SVG Icons
    const HelpIcon = () => e('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#9ca3af', strokeWidth: 1.5 },
        e('circle', { cx: 12, cy: 12, r: 10 }),
        e('path', { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', strokeLinecap: 'round', strokeLinejoin: 'round' }),
        e('circle', { cx: 12, cy: 17, r: 0.5, fill: '#9ca3af' })
    );

    const SaveIcon = () => e('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#9ca3af', strokeWidth: 1.5 },
        e('path', { d: 'M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z', strokeLinecap: 'round', strokeLinejoin: 'round' }),
        e('polyline', { points: '17 21 17 13 7 13 7 21', strokeLinecap: 'round', strokeLinejoin: 'round' }),
        e('polyline', { points: '7 3 7 8 15 8', strokeLinecap: 'round', strokeLinejoin: 'round' })
    );

    const FolderIcon = () => e('div', { className: 'relative' },
        e('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#9ca3af', strokeWidth: 1.5 },
            e('path', { d: 'M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z', strokeLinecap: 'round', strokeLinejoin: 'round' })
        ),
        // Badge đỏ với số 1
        e('span', {
            className: 'absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1'
        }, '1')
    );

    const MailIcon = () => e('div', { className: 'relative' },
        e('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#9ca3af', strokeWidth: 1.5 },
            e('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', strokeLinecap: 'round', strokeLinejoin: 'round' }),
            e('polyline', { points: '22,6 12,13 2,6', strokeLinecap: 'round', strokeLinejoin: 'round' })
        ),
        // Badge đỏ với số thông báo
        e('span', {
            className: 'absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1'
        }, '9+')
    );

    // Handler lưu
    const handleSave = () => {
        setSaveMessage('Đã lưu thành công!');
        setTimeout(() => setSaveMessage(null), 2000);
    };

    // Click outside to close dropdowns
    React.useEffect(() => {
        const handleClickOutside = () => {
            setShowNotifications(false);
            setShowFolders(false);
            setShowHelp(false);
        };
        if (showNotifications || showFolders || showHelp) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [showNotifications, showFolders, showHelp]);

    return e('div', { className: 'header relative' },
        // Logo BIDV bên trái
        e('div', { className: 'flex items-center' },
            e('img', {
                src: 'logo-BIDV.jpg',
                alt: 'BIDV',
                className: 'h-12 object-contain'
            })
        ),
        // Right side - Icons + User
        e('div', { className: 'flex items-center gap-3 md:gap-5' },
            onSwitchFlow && e('button', {
                className: 'h-9 px-3 border border-[#006B68]/30 text-[#006B68] bg-white rounded-lg text-xs font-semibold hover:bg-[#006B68]/5 flex items-center gap-2',
                onClick: onSwitchFlow,
                title: 'Đổi luồng nghiệp vụ'
            },
                e('i', { className: 'fas fa-repeat text-[11px]' }),
                'Đổi luồng'
            ),
            // Icon buttons
            e('div', { className: 'flex items-center gap-3' },
                // Help button với dropdown
                e('div', { className: 'relative' },
                    e('button', {
                        className: 'p-2 hover:bg-gray-100 rounded-lg transition-colors',
                        title: 'Trợ giúp',
                        onClick: (ev) => { ev.stopPropagation(); setShowHelp(!showHelp); setShowNotifications(false); setShowFolders(false); }
                    }, e(HelpIcon)),
                    showHelp && e('div', {
                        className: 'absolute right-0 top-12 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50',
                        onClick: (ev) => ev.stopPropagation()
                    },
                        e('div', { className: 'p-4 border-b border-gray-100' },
                            e('h3', { className: 'font-semibold text-gray-800' }, 'Trợ giúp')
                        ),
                        e('div', { className: 'p-3 space-y-2' },
                            e('a', { href: '#', className: 'flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700' },
                                e('i', { className: 'fas fa-book text-[#006B68]' }), 'Hướng dẫn sử dụng'),
                            e('a', { href: '#', className: 'flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700' },
                                e('i', { className: 'fas fa-video text-[#006B68]' }), 'Video hướng dẫn'),
                            e('a', { href: '#', className: 'flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700' },
                                e('i', { className: 'fas fa-headset text-[#006B68]' }), 'Liên hệ hỗ trợ: 1900 9247'),
                            e('a', { href: '#', className: 'flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700' },
                                e('i', { className: 'fas fa-question-circle text-[#006B68]' }), 'FAQ - Câu hỏi thường gặp')
                        )
                    )
                ),
                // Save button
                e('div', { className: 'relative' },
                    e('button', {
                        className: 'p-2 hover:bg-gray-100 rounded-lg transition-colors',
                        title: 'Lưu',
                        onClick: handleSave
                    }, e(SaveIcon)),
                    saveMessage && e('div', { className: 'absolute right-0 top-12 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap z-50' },
                        '✓ ', saveMessage)
                ),
                // Folder button với dropdown
                e('div', { className: 'relative' },
                    e('button', {
                        className: 'p-2 hover:bg-gray-100 rounded-lg transition-colors',
                        title: 'Hồ sơ đang xử lý',
                        onClick: (ev) => { ev.stopPropagation(); setShowFolders(!showFolders); setShowNotifications(false); setShowHelp(false); }
                    }, e(FolderIcon)),
                    showFolders && e('div', {
                        className: 'absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50',
                        onClick: (ev) => ev.stopPropagation()
                    },
                        e('div', { className: 'p-4 border-b border-gray-100 flex items-center justify-between' },
                            e('h3', { className: 'font-semibold text-gray-800' }, 'Hồ sơ đang xử lý'),
                            e('span', { className: 'text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium' }, '1 mới')
                        ),
                        e('div', { className: 'max-h-64 overflow-auto' },
                            folders.map(folder =>
                                e('div', { key: folder.id, className: 'p-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer' },
                                    e('div', { className: 'flex items-start gap-3' },
                                        e('div', { className: 'w-8 h-8 rounded-lg bg-[#006B68]/10 flex items-center justify-center flex-shrink-0' },
                                            e('i', { className: 'fas fa-folder text-[#006B68] text-sm' })),
                                        e('div', { className: 'flex-1 min-w-0' },
                                            e('p', { className: 'text-sm font-medium text-gray-800 truncate' }, folder.name),
                                            e('span', {
                                                className: 'text-xs px-2 py-0.5 rounded-full ' +
                                                    (folder.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                                                        folder.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600')
                                            }, folder.status))
                                    )
                                )
                            )
                        ),
                        e('div', { className: 'p-3 border-t border-gray-100' },
                            e('a', { href: '#', className: 'text-sm text-[#006B68] font-medium hover:underline' }, 'Xem tất cả hồ sơ →'))
                    )
                ),
                // Notification button với dropdown
                e('div', { className: 'relative' },
                    e('button', {
                        className: 'p-2 hover:bg-gray-100 rounded-lg transition-colors',
                        title: 'Thông báo',
                        onClick: (ev) => { ev.stopPropagation(); setShowNotifications(!showNotifications); setShowFolders(false); setShowHelp(false); }
                    }, e(MailIcon)),
                    showNotifications && e('div', {
                        className: 'absolute right-0 top-12 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50',
                        onClick: (ev) => ev.stopPropagation()
                    },
                        e('div', { className: 'p-4 border-b border-gray-100 flex items-center justify-between' },
                            e('h3', { className: 'font-semibold text-gray-800' }, 'Thông báo'),
                            e('span', { className: 'text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium' }, '3 chưa đọc')
                        ),
                        e('div', { className: 'max-h-80 overflow-auto' },
                            notifications.map(notif =>
                                e('div', { key: notif.id, className: 'p-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer ' + (notif.unread ? 'bg-blue-50/50' : '') },
                                    e('div', { className: 'flex items-start gap-3' },
                                        e('div', { className: 'w-8 h-8 rounded-full bg-[#006B68] flex items-center justify-center flex-shrink-0' },
                                            e('i', { className: 'fas fa-bell text-white text-xs' })),
                                        e('div', { className: 'flex-1 min-w-0' },
                                            e('div', { className: 'flex items-center gap-2' },
                                                e('p', { className: 'text-sm font-medium text-gray-800' }, notif.title),
                                                notif.unread && e('span', { className: 'w-2 h-2 bg-red-500 rounded-full' })),
                                            e('p', { className: 'text-xs text-gray-500 mt-0.5' }, notif.desc),
                                            e('p', { className: 'text-xs text-gray-400 mt-1' }, notif.time))
                                    )
                                )
                            )
                        ),
                        e('div', { className: 'p-3 border-t border-gray-100 flex items-center justify-between' },
                            e('a', { href: '#', className: 'text-sm text-[#006B68] font-medium hover:underline' }, 'Xem tất cả thông báo'),
                            e('button', { className: 'text-xs text-gray-500 hover:text-gray-700' }, 'Đánh dấu đã đọc'))
                    )
                )
            ),
            // Divider
            e('div', { className: 'w-px h-8 bg-gray-200 hidden md:block' }),
            // User info
            e('div', { className: 'hidden md:flex items-center gap-3' },
                e('div', { className: 'w-10 h-10 rounded-full bg-[#006B68] flex items-center justify-center text-white font-semibold text-sm overflow-hidden' },
                    e('img', {
                        src: 'avatar.jpg',
                        alt: 'Avatar',
                        className: 'w-full h-full object-cover',
                        onError: (ev) => { ev.target.style.display = 'none'; ev.target.parentNode.textContent = 'TL'; }
                    })
                ),
                e('div', { className: 'text-left' },
                    e('div', { className: 'text-sm font-semibold text-gray-800' }, 'Nguyễn Châu Giang'),
                    e('div', { className: 'text-xs text-[#006B68] font-medium' }, roleLabel || 'Chuyên viên')
                ),
                // Online indicator
                e('div', { className: 'w-2.5 h-2.5 bg-green-500 rounded-full' })
            )
        )
    );
}

function PageHeader({ activeMainTab, luongTrinhSaved, tabSaveStatus, onSave, onTrinhDuyet, caseStatus }) {
    const isLuongTrinhTab = activeMainTab === 'luongTrinhDuyet';
    const savedTabs = tabSaveStatus || {};
    const currentStatus = caseStatus || 'Chờ xử lý';
    var tabLabels = [
        { id: 'thongTinKH', label: 'TTKH' },
        { id: 'hoSoKH', label: 'TLTD' },
        { id: 'capTinDung', label: 'CTD' },
        { id: 'pheDuyetTinDung', label: 'PDTD' },
        { id: 'luongTrinhDuyet', label: 'LTD' }
    ];
    const summaryRows = [
        [
            ['Số hồ sơ:', 'TD-120-25-52656565'],
            ['Loại Hồ sơ:', 'Tái cấp'],
            ['Trạng thái', currentStatus],
            ['Bước xử lý', 'Lập BCTĐRR'],
            ['Người xử lý:', 'Nguyễn Châu Giang (159420)']
        ],
        [
            ['Khách hàng:', 'TỔNG CÔNG TY ĐIỆN LỰC VN'],
            ['CIF:', '297'],
            ['XHTDNB', 'AA'],
            ['Hồ sơ tham chiếu:', 'TD-120-25-123456'],
            ['Phiên bản hồ sơ:', '1']
        ]
    ];

    return e('div', { className: 'case-header flex-shrink-0' },
        e('div', { className: 'case-breadcrumb' },
            e('span', { className: 'text-[#006B68] cursor-pointer hover:underline' }, 'Lending'),
            e('i', { className: 'fas fa-chevron-right' }),
            e('span', { className: 'text-[#006B68] cursor-pointer hover:underline' }, 'Công việc cho tôi xử lý'),
            e('i', { className: 'fas fa-chevron-right' }),
            e('span', null, 'Hồ sơ trình cấp tín dụng')
        ),
        e('div', { className: 'case-title-row' },
            e('h1', { className: 'case-title' },
                e('i', { className: 'fas fa-chevron-left' }),
                'Hồ sơ trình cấp tín dụng'
            ),
            e('div', { className: 'case-actions' },
                e('div', { className: 'flex items-center gap-1 mr-3' },
                    tabLabels.map(function(tab) {
                        var isSaved = savedTabs[tab.id];
                        return e('div', {
                            key: tab.id,
                            className: 'flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium ' +
                                (isSaved ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400')
                        },
                            e('i', { className: isSaved ? 'fas fa-check-circle text-green-500 text-[9px]' : 'far fa-circle text-gray-300 text-[9px]' }),
                            tab.label
                        );
                    })
                ),
                e('button', {
                    className: 'case-btn case-btn-outline'
                }, e('i', { className: 'fas fa-undo-alt' }), 'Trả lại'),
                !e('button', {
                    className: 'case-btn case-btn-primary',
                    onClick: onSave
                }, e('i', { className: 'fas fa-save' }), 'Lưu'),
                isLuongTrinhTab && e('button', {
                    className: luongTrinhSaved ? 'btn-trinh-duyet' : 'btn-trinh-duyet-disabled',
                    onClick: onTrinhDuyet,
                    disabled: !luongTrinhSaved,
                    style: !luongTrinhSaved ? { opacity: 0.5, cursor: 'not-allowed' } : {}
                },
                    e('span', { className: 'btn-trinh-duyet-icon' },
                        e('i', { className: 'fas fa-paper-plane text-xs' }),
                        'Trình duyệt'
                    )
                )
            )
        ),
        e('div', { className: 'case-summary case-summary-mockup' },
            summaryRows.map((row, rowIdx) =>
                e('div', { key: rowIdx, className: 'case-summary-row' },
                    row.map((item, itemIdx) =>
                        e('div', { key: itemIdx, className: 'case-summary-item' },
                            e('span', { className: 'case-summary-label' }, item[0]),
                            e('span', {
                                className: 'case-summary-value' + (item[1] === 'Chờ xử lý' ? ' case-summary-status-waiting' : '')
                            }, item[1])
                        )
                    )
                )
            )
        )
    );
}


// =====================================================
// LEFT NAV PANEL - Thay the tab ngang
// =====================================================

function LeftNavPanel({ activeMainTab, setActiveMainTab, activeSubTab, setActiveSubTab }) {
    const [openSections, setOpenSections] = React.useState({ thongTinKH: true, capTinDung: false });

    const handleMainClick = (tabId) => {
        if (activeMainTab === tabId) {
            setOpenSections(prev => ({ ...prev, [tabId]: !prev[tabId] }));
        } else {
            setActiveMainTab(tabId);
            if (tabId === 'thongTinKH') {
                setActiveSubTab('thongTinPhiTaiChinh');
            }
            setOpenSections(prev => ({ ...prev, [tabId]: true }));
        }
    };

    const handleSubClick = (mainTab, subTab) => {
        setActiveMainTab(mainTab);
        setActiveSubTab(subTab);
    };

    const ttkh_isOpen = openSections.thongTinKH;
    const capTD_isOpen = openSections.capTinDung;

    return e('div', { className: 'nav-panel' },
        e('div', { className: 'nav-panel-section' },
            e('div', {
                className: 'nav-panel-header ' +
                    (activeMainTab === 'thongTinKH' ? 'active ' : '') +
                    (ttkh_isOpen ? 'open' : ''),
                onClick: () => handleMainClick('thongTinKH')
            },
                e('span', null, 'Th\u00f4ng tin kh\u00e1ch h\u00e0ng'),
                e('i', { className: 'fas fa-chevron-down nav-chevron' })
            ),
            ttkh_isOpen && e('div', { className: 'nav-panel-subitems' },
                SUB_TABS_TTKH.map(sub =>
                    e('div', {
                        key: sub.id,
                        className: 'nav-panel-subitem ' + (activeMainTab === 'thongTinKH' && activeSubTab === sub.id ? 'active' : ''),
                        onClick: () => handleSubClick('thongTinKH', sub.id)
                    }, sub.label)
                )
            )
        ),
        e('div', {
            className: 'nav-panel-direct ' + (activeMainTab === 'hoSoKH' ? 'active' : ''),
            onClick: () => setActiveMainTab('hoSoKH')
        },
            e('span', null, 'T\u00e0i li\u1ec7u t\u00edn d\u1ee5ng')
        ),
        e('div', {
            className: 'nav-panel-direct ' + (activeMainTab === 'capTinDung' ? 'active' : ''),
            onClick: () => setActiveMainTab('capTinDung')
        },
            e('span', null, 'Kho\u1ea3n c\u1ea5p t\u00edn d\u1ee5ng v\u00e0 \u0110\u1ec1 xu\u1ea5t')
        ),
        e('div', {
            className: 'nav-panel-direct ' + (activeMainTab === 'pheDuyetTinDung' ? 'active' : ''),
            onClick: () => setActiveMainTab('pheDuyetTinDung')
        },
            e('span', null, 'Ph\u00ea duy\u1ec7t t\u00edn d\u1ee5ng')
        ),
        e('div', {
            className: 'nav-panel-direct ' + (activeMainTab === 'luongTrinhDuyet' ? 'active' : ''),
            onClick: () => setActiveMainTab('luongTrinhDuyet')
        },
            e('span', null, 'Lu\u1ed3ng tr\u00ecnh duy\u1ec7t')
        )
    );
}

// =====================================================
// CONTENT AREA - Load tab từ file riêng
// =====================================================

function ContentArea({ activeMainTab, activeSubTab }) {
    return e('div', { className: 'flex-1 overflow-y-auto px-3 md:px-5 py-3 md:py-4' },
        e(TabContent, { activeMainTab, activeSubTab })
    );
}

function TabContent({ activeMainTab, activeSubTab }) {
    // Tab Thông tin khách hàng - load component từ SUB_TABS_TTKH
    if (activeMainTab === 'thongTinKH') {
        const subTabConfig = SUB_TABS_TTKH.find(t => t.id === activeSubTab);
        if (subTabConfig && window[subTabConfig.component]) {
            return e(window[subTabConfig.component]);
        }
        // Fallback: show Thông tin phi tài chính
        if (window.TabThongTinPhiTaiChinh) {
            return e(window.TabThongTinPhiTaiChinh);
        }
        return e('div', { className: 'content-card p-6' },
            e('p', { className: 'text-gray-500 text-center py-10' }, 'Loading...')
        );
    }

    if (activeMainTab === 'hoSoKH') {
        if (window.TabHoSoKhachHang) {
            return e('div', { className: 'content-card p-6' },
                e(window.TabHoSoKhachHang)
            );
        }
        return e('div', { className: 'content-card p-6' },
            e('p', { className: 'text-gray-500 text-center py-10' }, 'Loading...')
        );
    }
    // Tab noiDungDeXuat đã bị xóa

    if (activeMainTab === 'pheDuyetTinDung') {
        if (window.TabPheDuyetTinDung) {
            return e(window.TabPheDuyetTinDung);
        }
        return e('div', { className: 'content-card p-6' },
            e('p', { className: 'text-gray-500 text-center py-10' }, 'Loading...')
        );
    }

    // Tab Luồng trình duyệt
    if (activeMainTab === 'luongTrinhDuyet') {
        if (window.TabLuongTrinhDuyet) {
            return e('div', { className: 'p-2' },
                e(window.TabLuongTrinhDuyet)
            );
        }
        return e('div', { className: 'content-card p-6' },
            e('p', { className: 'text-gray-500 text-center py-10' }, 'Loading...')
        );
    }

    if (activeMainTab === 'capTinDung') {
        // Sub-tab: Phương án cấp tín dụng
        if (activeSubTab === 'phuongAn' || !activeSubTab) {
            if (window.TabPhuongAnCapTD) {
                return e(window.TabPhuongAnCapTD);
            }
        }
        // Sub-tab: Khoản tín dụng và đề xuất (placeholder)
        if (activeSubTab === 'khoanTD') {
            return e('div', { className: 'content-card p-6' },
                e('p', { className: 'text-gray-500 text-center py-10' }, 'Khoản tín dụng và đề xuất - Đang phát triển...')
            );
        }
        if (window.TabPhuongAnCapTD) {
            return e(window.TabPhuongAnCapTD);
        }
        return e('div', { className: 'content-card p-6' },
            e('p', { className: 'text-gray-500 text-center py-10' }, 'Loading...')
        );
    }

    return null;
}

// =====================================================
// APP
// =====================================================

// Màn hình chọn tính năng
function FeatureSelectScreen({ onSelectFeature }) {
    return e('div', { className: 'min-h-screen bg-gradient-to-br from-[#006B68] to-[#004a47] flex items-center justify-center' },
        e('div', { className: 'bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg' },
            // Logo
            e('div', { className: 'text-center mb-8' },
                e('img', { src: 'logo-BIDV.jpg', alt: 'BIDV', className: 'h-16 mx-auto mb-4' }),
                e('h1', { className: 'text-2xl font-bold text-[#006B68]' }, 'Hệ thống Lending Hub'),
                e('p', { className: 'text-gray-500 text-sm mt-1' }, 'Vui lòng chọn tính năng')
            ),
            // Feature options
            e('div', { className: 'space-y-4' },
                e('button', {
                    onClick: () => onSelectFeature('RM'),
                    className: 'w-full p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#006B68] hover:bg-[#006B68]/5 transition-all flex items-center gap-4 group'
                },
                    e('div', { className: 'w-12 h-12 bg-[#006B68]/10 rounded-lg flex items-center justify-center group-hover:bg-[#006B68]/20' },
                        e('i', { className: 'fas fa-user-tie text-[#006B68] text-xl' })
                    ),
                    e('div', { className: 'text-left' },
                        e('p', { className: 'font-semibold text-gray-800' }, 'RM - Quản lý quan hệ khách hàng'),
                        e('p', { className: 'text-sm text-gray-500' }, 'Xử lý công việc tín dụng, tạo báo cáo đề xuất')
                    )
                ),
                e('button', {
                    onClick: () => onSelectFeature('TVHD'),
                    className: 'w-full p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#006B68] hover:bg-[#006B68]/5 transition-all flex items-center gap-4 group'
                },
                    e('div', { className: 'w-12 h-12 bg-[#006B68]/10 rounded-lg flex items-center justify-center group-hover:bg-[#006B68]/20' },
                        e('i', { className: 'fas fa-users text-[#006B68] text-xl' })
                    ),
                    e('div', { className: 'text-left' },
                        e('p', { className: 'font-semibold text-gray-800' }, 'Cho ý kiến - Thành viên Hội đồng'),
                        e('p', { className: 'text-sm text-gray-500' }, 'Xem và phản hồi phiếu lấy ý kiến')
                    )
                )
            ),
            // Footer
            e('p', { className: 'text-center text-xs text-gray-400 mt-8' }, '© 2026 BIDV - Bank for Investment and Development of Vietnam')
        )
    );
}

// Màn hình đăng nhập
function LoginScreen({ onLogin, selectedFeature, onBack }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleLogin = () => {
        if (username === '999' && password === '999') {
            onLogin();
        } else {
            setError('Sai tên đăng nhập hoặc mật khẩu!');
        }
    };

    const featureLabel = selectedFeature === 'RM' ? 'RM - Quản lý quan hệ khách hàng' : 'Thành viên Hội đồng';

    return e('div', { className: 'min-h-screen bg-gradient-to-br from-[#006B68] to-[#004a47] flex items-center justify-center' },
        e('div', { className: 'bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md' },
            // Back button
            e('button', {
                onClick: onBack,
                className: 'text-sm text-gray-500 hover:text-[#006B68] mb-4 flex items-center gap-1'
            },
                e('i', { className: 'fas fa-arrow-left' }), ' Quay lại'
            ),
            // Logo
            e('div', { className: 'text-center mb-6' },
                e('img', { src: 'logo-BIDV.jpg', alt: 'BIDV', className: 'h-14 mx-auto mb-3' }),
                e('h1', { className: 'text-xl font-bold text-[#006B68]' }, 'Đăng nhập'),
                e('p', { className: 'text-sm text-gray-500 mt-1' }, featureLabel)
            ),
            // Form
            e('div', { className: 'space-y-4' },
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Tên đăng nhập'),
                    e('input', {
                        type: 'text',
                        value: username,
                        onChange: (ev) => setUsername(ev.target.value),
                        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006B68] focus:border-[#006B68] outline-none',
                        placeholder: 'Nhập tên đăng nhập'
                    })
                ),
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Mật khẩu'),
                    e('input', {
                        type: 'password',
                        value: password,
                        onChange: (ev) => setPassword(ev.target.value),
                        onKeyPress: (ev) => ev.key === 'Enter' && handleLogin(),
                        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006B68] focus:border-[#006B68] outline-none',
                        placeholder: 'Nhập mật khẩu'
                    })
                ),
                error && e('p', { className: 'text-red-500 text-sm' }, error),
                e('button', {
                    onClick: handleLogin,
                    className: 'w-full py-3 bg-[#006B68] text-white font-semibold rounded-lg hover:bg-[#005B58] transition-colors'
                }, 'Đăng nhập'),
                // Gợi ý đăng nhập
                e('div', { className: 'mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200' },
                    e('p', { className: 'text-sm text-blue-700 font-medium' }, '💡 Tài khoản Demo:'),
                    e('p', { className: 'text-sm text-blue-600' }, 'User: ', e('strong', null, '999'), ' | Pass: ', e('strong', null, '999'))
                )
            ),
            // Footer
            e('p', { className: 'text-center text-xs text-gray-400 mt-6' }, '© 2026 BIDV - Bank for Investment and Development of Vietnam')
        )
    );
}

// Màn hình Công việc cá nhân (Dashboard)
function DashboardScreen({ onSelectBCDX }) {
    const [activeTab, setActiveTab] = React.useState('congViecTD');

    // Mock data cho bảng
    const congViecData = [
        { stt: 1, vaiTro: 'Thành viên HĐTDTƯ', ngayTiepNhan: '17/01/2026', buocXuLy: 'Xin ý kiến TVHĐ', chiNhanh: 'Quang Trung', tenKH: 'Công ty CP Tập đoàn Hòa Phát - 123', soBCDX: 'zxcvbn - Cấp mới', loaiBCDX: 'HĐTDTƯ' },
        { stt: 2, vaiTro: 'Thành viên HĐTDCC', ngayTiepNhan: '18/01/2026', buocXuLy: 'Xin ý kiến TVHĐ', chiNhanh: 'Sở Giao dịch 1', tenKH: 'Công ty CP Tập đoàn VinGroup - 123', soBCDX: 'abcxyz - Điều chỉnh', loaiBCDX: 'HĐTDCC' },
        { stt: 3, vaiTro: 'Thành viên HĐCCNTƯ', ngayTiepNhan: '25/01/2026', buocXuLy: 'Xin ý kiến TVHĐ', chiNhanh: 'Hà Thành', tenKH: 'Công ty CP Thép Hòa Phát Dung Quất - 990', soBCDX: 'abcxyz - Điều chỉnh', loaiBCDX: 'HĐCCNTƯ' },
    ];

    return e('div', { className: 'flex h-screen w-full overflow-hidden' },
        e(Sidebar),
        e('div', { className: 'flex-1 flex flex-col h-full overflow-hidden' },
            e(Header),
            e('div', { className: 'flex-1 flex flex-col overflow-auto bg-[#eff2f5] p-5' },
                // Title
                e('div', { className: 'mb-4' },
                    e('h1', { className: 'text-xl font-bold text-gray-800' }, 'Công việc cá nhân'),
                    e('div', { className: 'flex items-center gap-4 mt-2' },
                        e('span', { className: 'text-sm text-gray-500' }, 'Tìm kiếm'),
                        e('span', { className: 'text-sm text-[#006B68] cursor-pointer hover:underline' }, 'Bộ lọc nâng cao')
                    )
                ),
                // Tabs
                e('div', { className: 'flex gap-4 mb-4 border-b border-gray-200' },
                    e('button', {
                        className: 'pb-2 px-1 text-sm font-medium ' + (activeTab === 'congViecTD' ? 'text-[#006B68] border-b-2 border-[#006B68]' : 'text-gray-500'),
                        onClick: () => setActiveTab('congViecTD')
                    }, 'Công việc tín dụng'),
                    e('button', {
                        className: 'pb-2 px-1 text-sm font-medium ' + (activeTab === 'thamGiaYKien' ? 'text-[#006B68] border-b-2 border-[#006B68]' : 'text-gray-500'),
                        onClick: () => setActiveTab('thamGiaYKien')
                    }, 'Tham gia ý kiến')
                ),
                // Table
                e('div', { className: 'bg-white rounded-lg shadow overflow-hidden' },
                    e('table', { className: 'w-full text-sm' },
                        e('thead', null,
                            e('tr', { className: 'bg-[#006B68] text-white' },
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'STT'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Vai trò của tôi'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Ngày tiếp nhận'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Bước xử lý hiện tại'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Chi nhánh'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Tên khách hàng', e('br'), 'Số CIF'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Số BCĐX- Loại BCĐX'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Thẩm quyền đề xuất')
                            )
                        ),
                        e('tbody', null,
                            congViecData.map((row, idx) =>
                                e('tr', { key: row.stt, className: idx % 2 === 0 ? 'bg-white' : 'bg-gray-50' },
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' }, row.stt),
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' }, row.vaiTro),
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' }, row.ngayTiepNhan),
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' }, row.buocXuLy),
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' }, row.chiNhanh),
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' }, row.tenKH),
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' },
                                        e('a', {
                                            href: '#',
                                            className: 'text-[#006B68] font-medium hover:underline cursor-pointer',
                                            onClick: (ev) => { ev.preventDefault(); onSelectBCDX(row); }
                                        }, row.soBCDX),
                                        e('br'),
                                        e('span', { className: 'text-xs text-gray-500' }, row.loaiBCDX)
                                    ),
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' }, row.loaiBCDX)
                                )
                            )
                        )
                    )
                )
            )
        )
    );
}

// Main BCDX Screen (màn hình chi tiết hiện tại)
function BCDXScreen({ selectedBCDX, onBack, initialMainTab }) {
    const [activeMainTab, setActiveMainTab] = React.useState(initialMainTab || 'thongTinKH');
    const [activeSubTab, setActiveSubTab] = React.useState('thongTinPhiTaiChinh');
    const [luongTrinhSaved, setLuongTrinhSaved] = React.useState(false);
    const [showLichSuPopup, setShowLichSuPopup] = React.useState(false);
    const [lichSuPdfViewer, setLichSuPdfViewer] = React.useState(null);

    // === Save/Submit workflow (dau viec 15) ===
    const [tabSaveStatus, setTabSaveStatus] = React.useState({});
    const [caseStatus, setCaseStatus] = React.useState('Chờ xử lý');
    const [showTrinhDuyetPopup, setShowTrinhDuyetPopup] = React.useState(false);

    function handleGlobalSave() {
        var ns = Object.assign({}, tabSaveStatus);
        ns[activeMainTab] = true;
        setTabSaveStatus(ns);
        if (window.AuditHelpers) { window.AuditHelpers.showToast('\u2713 Đã lưu thành công tab hiện tại'); }
        else { alert('Đã lưu thành công!'); }
    }

    function handleTrinhDuyet() { setShowTrinhDuyetPopup(true); }

    function confirmTrinhDuyet() {
        setCaseStatus('Đã trình duyệt');
        setShowTrinhDuyetPopup(false);
        if (window.AuditHelpers) { window.AuditHelpers.showToast('\u2713 Đã trình duyệt hồ sơ thành công!'); }
        else { alert('Đã trình duyệt thành công!'); }
    }

    // Expose setters to window for cross-component communication
    React.useEffect(() => {
        window.switchToSubTab = (tabId) => setActiveSubTab(tabId);
        window.setLuongTrinhSaved = (val) => setLuongTrinhSaved(val);
        window.__showLichSuPopup = (val) => setShowLichSuPopup(val);
        return () => { delete window.switchToSubTab; delete window.setLuongTrinhSaved; delete window.__showLichSuPopup; };
    }, []);

    // Sync: when capTinDung is selected without sub, default to phuongAn
    React.useEffect(() => {
        if (activeMainTab === 'capTinDung' && activeSubTab === 'thongTinPhiTaiChinh') {
            setActiveSubTab('phuongAn');
        }
    }, [activeMainTab]);

    // Lịch sử phê duyệt data
    var lichSuTableData = [
        { stt: 11, buocXuLy: 'Phê duyệt cấp tín dụng', vaiTro: '- HĐTĐTW', nguoiXuLy: 'Nguyễn Văn 11 (123461) | 990', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: 'cho-xu-ly', thaoTac: 'Trình duyệt', yKien: 'Đồng ý', sla: '1N/1N', hoSo: { ten: 'Biên bản+QĐ', loai: 'bien-ban-qd' } },
        { stt: 10, buocXuLy: 'Xin ý kiến TVHĐ', vaiTro: '- Thư ký HĐTĐTƯ', nguoiXuLy: 'Nguyễn Văn 9 (123459) | 990', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: 'cho-xu-ly', thaoTac: 'Xin ý kiến TVHĐ', yKien: 'Xin ý kiến TVHĐ', sla: '1N/2N', hoSo: null },
        { stt: 9, buocXuLy: 'Phê duyệt BCTĐRR/BCTĐTD', vaiTro: '- Phó TGĐ TTTĐPD', nguoiXuLy: 'Nguyễn Văn 7 (123457) | 990', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: 'cho-xu-ly', thaoTac: 'Trình duyệt', yKien: 'Đồng ý', sla: '2N/1N', hoSo: { ten: 'BCTĐRR', loai: 'bctdrr' } },
        { stt: 8, buocXuLy: 'Kiểm soát BCTĐRR/BCTĐTD', vaiTro: '- Phó Giám đốc TTTĐPD', nguoiXuLy: 'Nguyễn Văn 6 (123456) | 990', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: 'cho-xu-ly', thaoTac: 'Trình duyệt', yKien: 'Trình duyệt', sla: '3N/2N', hoSo: { ten: 'BCTĐRR', loai: 'bctdrr' } },
        { stt: 7, buocXuLy: 'Lập BCTĐRR/BCTĐTD', vaiTro: '- Cán bộ TĐRR/TĐTD', nguoiXuLy: 'Nguyễn Văn 5.1 (123455) | 990', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: 'da-tra-lai', thaoTac: 'Trình duyệt', yKien: 'Trình duyệt', sla: '8N/9N', hoSo: { ten: 'BCTĐRR', loai: 'bctdrr' } },
        { stt: 8, buocXuLy: 'Kiểm soát BCTĐRR/BCTĐTD', vaiTro: '- Phó Giám đốc TTTĐPD', nguoiXuLy: 'Nguyễn Văn 6 (123456) | 990', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: 'cho-xu-ly', thaoTac: 'Trả lại', yKien: 'Bổ sung hồ sơ', sla: '', hoSo: null },
        { stt: 7, buocXuLy: 'Lập BCTĐRR/BCTĐTD', vaiTro: '- Cán bộ TĐRR/TĐTD', nguoiXuLy: 'Nguyễn Văn 5.1 (123455) | 990', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: 'cho-xu-ly', thaoTac: 'Trình duyệt', yKien: 'Trình duyệt', sla: '', hoSo: null },
        { stt: 8, buocXuLy: 'Kiểm soát BCTĐRR/BCTĐTD', vaiTro: '- Phó Giám đốc TTTĐPD', nguoiXuLy: 'Nguyễn Văn 6 (123456) | 990', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: 'cho-xu-ly', thaoTac: 'Phân bổ lại', yKien: 'Nghỉ phép', sla: '', hoSo: null },
        { stt: 7, buocXuLy: 'Lập BCTĐRR/BCTĐTD', vaiTro: '- Cán bộ TĐRR/TĐTD', nguoiXuLy: 'Nguyễn Văn 5 (123455) | 990', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: 'cho-xu-ly', thaoTac: 'Trình duyệt', yKien: 'Trình duyệt', sla: '', hoSo: null },
        { stt: 6, buocXuLy: 'Lập BCTĐRR/BCTĐTD', vaiTro: '- Cán bộ TĐRR/TĐTD', nguoiXuLy: '', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: 'cho-phan-cong', thaoTac: 'Phân công tự động', yKien: 'Phân công tự động', sla: '', hoSo: null },
        { stt: 5, buocXuLy: 'Phê duyệt BCDXTD', vaiTro: '- Giám đốc Chi nhánh', nguoiXuLy: 'Nguyễn Văn 4 (123454) | 123', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: 'cho-xu-ly', thaoTac: 'Trình duyệt', yKien: 'Đồng ý', sla: '1N/1N', hoSo: { ten: 'BCDXTD', loai: 'bcdxtd' } },
        { stt: 4, buocXuLy: 'Xem xét BCDXTD', vaiTro: '- PGĐ QLKH', nguoiXuLy: 'Nguyễn Văn 3 (123453) | 123', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: 'cho-xu-ly', thaoTac: 'Trình duyệt', yKien: 'Đồng ý', sla: '1N/1N', hoSo: { ten: 'BCDXTD', loai: 'bcdxtd' } },
        { stt: 3, buocXuLy: 'Thẩm định tín dụng', vaiTro: '- LĐP QLKH', nguoiXuLy: 'Nguyễn Văn 2 (123452) | 123', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: 'cho-xu-ly', thaoTac: 'Trình duyệt', yKien: 'Đồng ý', sla: '2N/1N', hoSo: { ten: 'BCDXTD', loai: 'bcdxtd' } },
        { stt: 2, buocXuLy: 'Lập BCDXTD', vaiTro: '- Cán bộ QLKH', nguoiXuLy: 'Nguyễn Văn 1 (123451) | 123', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: 'du-thao', thaoTac: 'Trình duyệt', yKien: 'Trình duyệt', sla: '', hoSo: { ten: 'BCDXTD', loai: 'bcdxtd' } },
        { stt: 1, buocXuLy: 'Lập BCDXTD', vaiTro: '- Cán bộ QLKH', nguoiXuLy: 'Nguyễn Văn 1 (123451) | 123', thoiGian: 'hh:mm dd/mm/yyyy', trangThai: '', thaoTac: 'Tạo BCDXTD', yKien: 'Tạo BCDXTD', sla: '', hoSo: null }
    ];

    return e('div', { className: 'flex h-screen w-full overflow-hidden' },
        e(Sidebar),
        e('div', { className: 'flex-1 flex flex-col h-full overflow-hidden' },
            e(Header, { onSwitchFlow: onBack, roleLabel: 'Cán bộ TĐRR' }),
            // PageHeader (info card, breadcrumb, action buttons) - NO tabs
            e(PageHeader, { activeMainTab, luongTrinhSaved, tabSaveStatus, onSave: handleGlobalSave, onTrinhDuyet: handleTrinhDuyet, caseStatus }),
            // Body: Left nav panel + content area
            e('div', { className: 'flex flex-1 overflow-hidden bg-[#eff2f5]' },
                // Left nav panel
                e(LeftNavPanel, { activeMainTab, setActiveMainTab, activeSubTab, setActiveSubTab }),
                // Content area (scrollable)
                e(ContentArea, { activeMainTab, activeSubTab })
            )
        ),

        // ===== FULLSCREEN POPUP: Lịch sử phê duyệt =====
        showLichSuPopup && e('div', {
            className: 'fixed inset-0 bg-black/60 z-[60] flex flex-col',
            style: { backdropFilter: 'blur(4px)' }
        },
            // Header bar
            e('div', {
                className: 'flex items-center justify-between px-6 py-4 flex-shrink-0',
                style: { background: 'linear-gradient(135deg, #006B68 0%, #008B87 50%, #00A59E 100%)' }
            },
                e('div', { className: 'flex items-center gap-3' },
                    e('div', { className: 'w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm' },
                        e('i', { className: 'fas fa-history text-white text-lg' })
                    ),
                    e('div', null,
                        e('h2', { className: 'text-lg font-bold text-white' }, 'Lịch sử phê duyệt'),
                        e('p', { className: 'text-white/70 text-xs' }, 'Số BC: 19203945 • Công ty CP Tập đoàn Hòa Phát')
                    )
                ),
                e('div', { className: 'flex items-center gap-3' },
                    e('button', {
                        className: 'px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 flex items-center gap-2 transition-colors backdrop-blur-sm',
                        onClick: () => { alert('Xuất báo cáo lịch sử phê duyệt'); }
                    },
                        e('i', { className: 'fas fa-download text-xs' }), 'Xuất báo cáo'
                    ),
                    e('button', {
                        className: 'w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-colors backdrop-blur-sm',
                        onClick: () => setShowLichSuPopup(false)
                    },
                        e('i', { className: 'fas fa-times text-lg' })
                    )
                )
            ),
            // Content
            e('div', { className: 'flex-1 overflow-auto p-6 bg-[#f5f7fa]' },
                e('div', { className: 'max-w-[1600px] mx-auto' },
                    // Summary cards
                    e('div', { className: 'grid grid-cols-4 gap-4 mb-5' },
                        e('div', { className: 'bg-white rounded-xl p-4 border border-gray-100 shadow-sm' },
                            e('div', { className: 'flex items-center gap-3' },
                                e('div', { className: 'w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center' },
                                    e('i', { className: 'fas fa-list-ol text-blue-500' })
                                ),
                                e('div', null,
                                    e('p', { className: 'text-xs text-gray-500' }, 'Tổng bước'),
                                    e('p', { className: 'text-xl font-bold text-gray-800' }, '11')
                                )
                            )
                        ),
                        e('div', { className: 'bg-white rounded-xl p-4 border border-gray-100 shadow-sm' },
                            e('div', { className: 'flex items-center gap-3' },
                                e('div', { className: 'w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center' },
                                    e('i', { className: 'fas fa-check-circle text-green-500' })
                                ),
                                e('div', null,
                                    e('p', { className: 'text-xs text-gray-500' }, 'Đã xử lý'),
                                    e('p', { className: 'text-xl font-bold text-green-600' }, '8')
                                )
                            )
                        ),
                        e('div', { className: 'bg-white rounded-xl p-4 border border-gray-100 shadow-sm' },
                            e('div', { className: 'flex items-center gap-3' },
                                e('div', { className: 'w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center' },
                                    e('i', { className: 'fas fa-clock text-orange-500' })
                                ),
                                e('div', null,
                                    e('p', { className: 'text-xs text-gray-500' }, 'Chờ xử lý'),
                                    e('p', { className: 'text-xl font-bold text-orange-600' }, '3')
                                )
                            )
                        ),
                        e('div', { className: 'bg-white rounded-xl p-4 border border-gray-100 shadow-sm' },
                            e('div', { className: 'flex items-center gap-3' },
                                e('div', { className: 'w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center' },
                                    e('i', { className: 'fas fa-undo text-red-500' })
                                ),
                                e('div', null,
                                    e('p', { className: 'text-xs text-gray-500' }, 'Trả lại'),
                                    e('p', { className: 'text-xl font-bold text-red-600' }, '1')
                                )
                            )
                        )
                    ),
                    // Table
                    e('div', { className: 'bg-white border border-gray-200 rounded-xl overflow-x-auto shadow-sm' },
                        e('table', { className: 'w-full text-sm', style: { minWidth: '1200px' } },
                            e('thead', null,
                                e('tr', { className: 'border-b border-gray-200', style: { background: 'linear-gradient(135deg, #006B68 0%, #008B87 100%)' } },
                                    e('th', { className: 'px-3 py-3 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '50px' } }, 'STT'),
                                    e('th', { className: 'px-3 py-3 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '200px' } }, 'Bước xử lý'),
                                    e('th', { className: 'px-3 py-3 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '180px' } }, 'Vai trò'),
                                    e('th', { className: 'px-3 py-3 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '200px' } }, 'Người xử lý'),
                                    e('th', { className: 'px-3 py-3 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '160px' } }, 'Thời gian tiếp nhận'),
                                    e('th', { className: 'px-3 py-3 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '130px' } },
                                        'Trạng thái HS ', e('i', { className: 'fas fa-sort text-white/60 text-xs ml-1' })),
                                    e('th', { className: 'px-3 py-3 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '130px' } }, 'Thao tác'),
                                    e('th', { className: 'px-3 py-3 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '130px' } }, 'Ý kiến/Lý do'),
                                    e('th', { className: 'px-3 py-3 text-center text-xs font-semibold text-white whitespace-nowrap', style: { width: '90px' } }, 'SLAqđ/SLAtt'),
                                    e('th', { className: 'px-3 py-3 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '100px' } }, 'HS đính kèm')
                                )
                            ),
                            e('tbody', null,
                                lichSuTableData.map(function (row, idx) {
                                    var statusMap = {
                                        'da-duyet': { label: 'Đã duyệt', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
                                        'cho-xu-ly': { label: 'Chờ xử lý', bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
                                        'du-thao': { label: 'Dự thảo', bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
                                        'da-tra-lai': { label: 'Đã trả lại', bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
                                        'cho-phan-cong': { label: 'Chờ phân công', bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' }
                                    };
                                    var status = row.trangThai ? (statusMap[row.trangThai] || statusMap['cho-xu-ly']) : null;
                                    var slaColor = '';
                                    var slaIcon = null;
                                    if (row.sla) {
                                        var parts = row.sla.split('/');
                                        if (parts.length === 2) {
                                            var qd = parseInt(parts[0]);
                                            var tt = parseInt(parts[1]);
                                            slaColor = tt > qd ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold';
                                            slaIcon = e('span', { className: 'inline-block w-2.5 h-2.5 rounded-full ml-1 ' + (tt > qd ? 'bg-red-500' : 'bg-green-500') });
                                        }
                                    }
                                    var yKienContent = row.yKien;
                                    if (row.yKien === 'Đồng ý') {
                                        yKienContent = e('span', { className: 'inline-flex items-center gap-1 text-green-600' },
                                            e('i', { className: 'fas fa-check text-xs' }),
                                            'Đồng ý'
                                        );
                                    }
                                    return e('tr', {
                                        key: row.stt + '-' + idx,
                                        className: 'border-b border-gray-100 hover:bg-gray-50 transition-colors ' + (idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50')
                                    },
                                        e('td', { className: 'px-3 py-2.5 text-xs text-gray-500 whitespace-nowrap text-center' }, row.stt),
                                        e('td', { className: 'px-3 py-2.5 text-xs text-gray-800 font-medium whitespace-nowrap' }, row.buocXuLy),
                                        e('td', { className: 'px-3 py-2.5 text-xs text-gray-600 whitespace-nowrap' }, row.vaiTro),
                                        e('td', { className: 'px-3 py-2.5 text-xs text-gray-600 whitespace-nowrap' }, row.nguoiXuLy),
                                        e('td', { className: 'px-3 py-2.5 text-xs text-gray-600 whitespace-nowrap' }, row.thoiGian),
                                        e('td', { className: 'px-3 py-2.5 whitespace-nowrap' },
                                            status ? e('span', {
                                                className: 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ' + status.bg + ' ' + status.text
                                            },
                                                e('span', { className: 'w-1.5 h-1.5 rounded-full ' + status.dot }),
                                                status.label
                                            ) : e('span', { className: 'text-xs text-gray-300' }, '___')
                                        ),
                                        e('td', { className: 'px-3 py-2.5 text-xs text-gray-600 whitespace-nowrap' }, row.thaoTac),
                                        e('td', { className: 'px-3 py-2.5 text-xs whitespace-nowrap' }, yKienContent),
                                        e('td', { className: 'px-3 py-2.5 text-xs text-center whitespace-nowrap ' + slaColor },
                                            row.sla ? e('span', { className: 'inline-flex items-center' }, row.sla, slaIcon) : e('span', { className: 'text-gray-300' }, '___')
                                        ),
                                        e('td', { className: 'px-3 py-2.5 whitespace-nowrap' },
                                            row.hoSo ? e('button', {
                                                className: 'inline-flex items-center gap-1.5 text-xs text-[#006B68] hover:text-[#005B58] hover:underline cursor-pointer font-medium whitespace-nowrap',
                                                onClick: function () { setLichSuPdfViewer({ ten: row.hoSo.ten, loai: row.hoSo.loai, stt: row.stt, buocXuLy: row.buocXuLy, nguoiXuLy: row.nguoiXuLy, thoiGian: row.thoiGian }); }
                                            },
                                                e('i', { className: 'fas fa-paperclip text-[10px]' }),
                                                e('span', null, row.hoSo.ten)
                                            ) : e('span', { className: 'text-xs text-gray-300' }, '___')
                                        )
                                    );
                                })
                            )
                        )
                    )
                )
            ),

            // ===== PDF VIEWER MODAL (inside popup, on top) =====
            lichSuPdfViewer && e('div', {
                className: 'fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4',
                onClick: function (ev) { if (ev.target === ev.currentTarget) setLichSuPdfViewer(null); }
            },
                e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col' },
                    // Toolbar
                    e('div', { className: 'flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-gray-50 rounded-t-xl flex-shrink-0' },
                        e('div', { className: 'flex items-center gap-3' },
                            e('i', { className: 'fas fa-file-pdf text-red-500 text-xl' }),
                            e('div', null,
                                e('h3', { className: 'font-semibold text-gray-800 text-sm' },
                                    lichSuPdfViewer.loai === 'bcdxtd' ? 'Báo cáo đề xuất cấp tín dụng' : lichSuPdfViewer.loai === 'bctdrr' ? 'Báo cáo thẩm định rủi ro' : 'Biên bản họp & Quyết định cấp tín dụng'
                                ),
                                e('span', { className: 'text-xs text-gray-500' },
                                    lichSuPdfViewer.ten + '_CTCP_ABC_2026.pdf • Bước: ' + lichSuPdfViewer.buocXuLy
                                )
                            )
                        ),
                        e('div', { className: 'flex items-center gap-2' },
                            e('button', {
                                className: 'px-3 py-1.5 bg-[#006B68] text-white rounded-lg text-xs font-medium hover:bg-[#005B58] flex items-center gap-1.5',
                                onClick: function () { alert('In tài liệu: ' + lichSuPdfViewer.ten); }
                            }, e('i', { className: 'fas fa-print text-xs' }), 'In'),
                            e('button', {
                                className: 'px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 flex items-center gap-1.5',
                                onClick: function () { alert('Đã tải xuống: ' + lichSuPdfViewer.ten + '_CTCP_ABC_2026.pdf'); }
                            }, e('i', { className: 'fas fa-download text-xs' }), 'Tải PDF'),
                            e('button', {
                                className: 'w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500',
                                onClick: function () { setLichSuPdfViewer(null); }
                            }, e('i', { className: 'fas fa-times' }))
                        )
                    ),

                    // PDF Content
                    e('div', {
                        className: 'flex-1 overflow-y-auto bg-gray-100 p-6',
                        style: { minHeight: 0 }
                    },
                        e('div', {
                            className: 'bg-white mx-auto shadow-lg',
                            style: { maxWidth: '210mm', padding: '40px 50px', fontFamily: '"Times New Roman", serif', color: '#1a1a1a', lineHeight: '1.6', fontSize: '13px' }
                        },
                            // === HEADER ===
                            e('div', { style: { textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid #006B68', paddingBottom: '16px' } },
                                e('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                                    e('div', { style: { textAlign: 'left' } },
                                        e('div', { style: { fontWeight: 'bold', fontSize: '14px', color: '#006B68' } }, 'NGÂN HÀNG TMCP ĐẦU TƯ VÀ'),
                                        e('div', { style: { fontWeight: 'bold', fontSize: '14px', color: '#006B68' } }, 'PHÁT TRIỂN VIỆT NAM (BIDV)'),
                                        e('div', { style: { fontSize: '11px', color: '#666', marginTop: '2px' } }, 'Chi nhánh Hai Bà Trưng')
                                    ),
                                    e('div', { style: { textAlign: 'right', fontSize: '11px', color: '#666' } },
                                        e('div', null, 'Số: ' + (lichSuPdfViewer.loai === 'bcdxtd' ? 'BCĐX' : lichSuPdfViewer.loai === 'bctdrr' ? 'BCTĐRR' : 'BB-QĐ') + '/2026/001'),
                                        e('div', null, 'Ngày: 10/03/2026'),
                                        e('div', { style: { marginTop: '4px', padding: '2px 8px', background: '#e6f4f1', borderRadius: '4px', display: 'inline-block', color: '#006B68', fontWeight: 'bold' } }, 'MẬT')
                                    )
                                ),
                                e('h1', { style: { fontSize: '18px', fontWeight: 'bold', marginTop: '16px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' } },
                                    lichSuPdfViewer.loai === 'bcdxtd' ? 'BÁO CÁO ĐỀ XUẤT CẤP TÍN DỤNG' : lichSuPdfViewer.loai === 'bctdrr' ? 'BÁO CÁO THẨM ĐỊNH RỦI RO' : 'BIÊN BẢN HỌP & QUYẾT ĐỊNH CẤP TÍN DỤNG'
                                ),
                                e('div', { style: { fontSize: '12.5px', color: '#444' } }, 'Đối với Công ty Cổ phần ABC')
                            ),

                            // === CONTENT FOR BCDXTD ===
                            lichSuPdfViewer.loai === 'bcdxtd' && e('div', null,
                                e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'I. THÔNG TIN KHÁCH HÀNG'),
                                e('table', { style: { width: '100%', borderCollapse: 'collapse', marginBottom: '16px' } },
                                    e('tbody', null,
                                        [['Tên khách hàng', 'CÔNG TY CỔ PHẦN ABC'],
                                        ['Mã khách hàng (CIF)', '1234567890'],
                                        ['Địa chỉ', 'Số 10, Đường Lê Lai, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh'],
                                        ['Ngành nghề kinh doanh', 'Xây dựng công trình dân dụng'],
                                        ['Xếp hạng tín dụng', 'AA - Đã phê duyệt']
                                        ].map(function (row, idx) {
                                            return e('tr', { key: idx },
                                                e('td', { style: { border: '1px solid #ccc', padding: '6px 10px', width: '35%', background: '#f8f9fa', fontWeight: '600', fontSize: '12px' } }, row[0]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '6px 10px', fontSize: '12px' } }, row[1])
                                            );
                                        })
                                    )
                                ),
                                e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '8px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'II. NỘI DUNG ĐỀ XUẤT CẤP TÍN DỤNG'),
                                e('p', { style: { fontSize: '12.5px', marginBottom: '8px' } }, 'Nội dung đề xuất: ', e('strong', null, 'Cấp hạn mức tín dụng năm 2026 đối với Công ty CP ABC')),
                                e('div', { style: { display: 'flex', gap: '24px', marginBottom: '12px', fontSize: '12.5px' } },
                                    e('span', null, 'Phương thức: ', e('strong', null, 'Hạn mức tín dụng')),
                                    e('span', null, 'Loại hình: ', e('strong', null, 'Ngắn hạn')),
                                    e('span', null, 'Thời hạn: ', e('strong', null, '30/10/2026'))
                                ),
                                e('table', { style: { width: '100%', borderCollapse: 'collapse', marginBottom: '16px' } },
                                    e('thead', null,
                                        e('tr', null,
                                            ['STT', 'Khoản tín dụng', 'Số tiền', 'Mục đích', 'Thời hạn', 'Lãi suất'].map(function (h, i) {
                                                return e('th', { key: i, style: { border: '1px solid #999', padding: '6px', background: '#e8e8e8', fontSize: '11px', fontWeight: 'bold', textAlign: i === 2 ? 'right' : 'left' } }, h);
                                            })
                                        )
                                    ),
                                    e('tbody', null,
                                        [
                                            { tenKhoan: 'Tên commitment level 1 (Hạn mức tín dụng năm 2026)', soTien: '200.000', mucDich: 'Cho vay, bảo lãnh, bổ sung vốn lưu động', thoiHanChoVay: '11 tháng', laiSuat: 'Theo quy định của BIDV từng thời kỳ' },
                                            { tenKhoan: 'Tên commitment level 2 (Cho vay vốn lưu động)', soTien: '60.000', mucDich: 'Bổ sung vốn lưu động', thoiHanChoVay: '11 tháng', laiSuat: '7.5%/năm' },
                                            { tenKhoan: 'Tên commitment level 2 (Bảo lãnh)', soTien: '40.000', mucDich: 'Bảo lãnh thanh toán, thực hiện hợp đồng', thoiHanChoVay: '11 tháng', laiSuat: 'Phí BL: 1.5%/năm' }
                                        ].map(function (item, idx) {
                                            return e('tr', { key: idx },
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', textAlign: 'center', fontSize: '11px' } }, idx + 1),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '11px' } }, item.tenKhoan),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold' } }, item.soTien),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '10px' } }, item.mucDich),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', textAlign: 'center', fontSize: '11px' } }, item.thoiHanChoVay),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '10px' } }, item.laiSuat)
                                            );
                                        })
                                    )
                                ),
                                e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '8px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'III. KẾT LUẬN VÀ ĐỀ XUẤT'),
                                e('div', { style: { background: '#f8f9fa', border: '1px solid #ddd', borderRadius: '4px', padding: '12px 16px', marginBottom: '20px', fontSize: '12.5px' } },
                                    e('p', { style: { marginBottom: '8px' } }, 'Căn cứ kết quả thẩm định, bộ phận quản lý khách hàng đề xuất:'),
                                    e('ul', { style: { paddingLeft: '20px', marginBottom: '8px' } },
                                        e('li', { style: { marginBottom: '4px' } }, 'Cấp hạn mức tín dụng năm 2026: ', e('strong', null, '200.000 triệu VNĐ')),
                                        e('li', { style: { marginBottom: '4px' } }, 'Cho vay: ', e('strong', null, '60.000 triệu VNĐ'), ', Bảo lãnh: ', e('strong', null, '40.000 triệu VNĐ'))
                                    ),
                                    e('p', { style: { fontStyle: 'italic' } }, 'Kính trình Ban Giám đốc xem xét, phê duyệt.')
                                )
                            ),

                            // === CONTENT FOR BCTĐRR ===
                            lichSuPdfViewer.loai === 'bctdrr' && e('div', null,
                                e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'I. THÔNG TIN TỔNG QUAN'),
                                e('table', { style: { width: '100%', borderCollapse: 'collapse', marginBottom: '16px' } },
                                    e('tbody', null,
                                        [['Khách hàng', 'CÔNG TY CỔ PHẦN ABC'],
                                        ['CIF', '1234567890'],
                                        ['Ngành nghề', 'Xây dựng công trình dân dụng'],
                                        ['Xếp hạng tín dụng nội bộ', 'AA'],
                                        ['Tổng dư nợ hiện tại', '150.000 triệu VNĐ'],
                                        ['Tổng dư nợ đề xuất', '200.000 triệu VNĐ']
                                        ].map(function (row, idx) {
                                            return e('tr', { key: idx },
                                                e('td', { style: { border: '1px solid #ccc', padding: '6px 10px', width: '35%', background: '#f8f9fa', fontWeight: '600', fontSize: '12px' } }, row[0]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '6px 10px', fontSize: '12px' } }, row[1])
                                            );
                                        })
                                    )
                                ),
                                e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '8px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'II. ĐÁNH GIÁ RỦI RO'),
                                e('table', { style: { width: '100%', borderCollapse: 'collapse', marginBottom: '16px' } },
                                    e('thead', null,
                                        e('tr', null,
                                            ['STT', 'Tiêu chí đánh giá', 'Mức rủi ro', 'Nhận xét'].map(function (h, i) {
                                                return e('th', { key: i, style: { border: '1px solid #999', padding: '6px', background: '#e8e8e8', fontSize: '11px', fontWeight: 'bold' } }, h);
                                            })
                                        )
                                    ),
                                    e('tbody', null,
                                        [
                                            ['1', 'Rủi ro tín dụng', 'Thấp', 'Khách hàng có lịch sử tín dụng tốt, xếp hạng AA'],
                                            ['2', 'Rủi ro thị trường', 'Trung bình', 'Ngành xây dựng có biến động theo chu kỳ kinh tế'],
                                            ['3', 'Rủi ro hoạt động', 'Thấp', 'Doanh nghiệp có hệ thống quản trị nội bộ tốt'],
                                            ['4', 'Rủi ro tài sản đảm bảo', 'Thấp', 'TSĐB có tính thanh khoản cao, giá trị ổn định'],
                                            ['5', 'Rủi ro pháp lý', 'Thấp', 'Hồ sơ pháp lý đầy đủ, không có tranh chấp'],
                                            ['6', 'Rủi ro tập trung', 'Trung bình', 'Dư nợ trong ngưỡng cho phép theo quy định']
                                        ].map(function (row, idx) {
                                            var riskColor = row[2] === 'Thấp' ? '#15803d' : row[2] === 'Trung bình' ? '#d97706' : '#dc2626';
                                            return e('tr', { key: idx },
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', textAlign: 'center', fontSize: '11px' } }, row[0]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '11px', fontWeight: '600' } }, row[1]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '11px', textAlign: 'center', color: riskColor, fontWeight: 'bold' } }, row[2]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '11px' } }, row[3])
                                            );
                                        })
                                    )
                                ),
                                e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '8px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'III. PHÂN TÍCH TÀI CHÍNH'),
                                e('table', { style: { width: '100%', borderCollapse: 'collapse', marginBottom: '16px' } },
                                    e('thead', null,
                                        e('tr', null,
                                            ['Chỉ tiêu', 'Năm 2023', 'Năm 2024', 'Năm 2025', 'Đánh giá'].map(function (h, i) {
                                                return e('th', { key: i, style: { border: '1px solid #999', padding: '6px', background: '#e8e8e8', fontSize: '11px', fontWeight: 'bold' } }, h);
                                            })
                                        )
                                    ),
                                    e('tbody', null,
                                        [
                                            ['Doanh thu (tỷ VNĐ)', '450', '520', '610', 'Tăng trưởng 17.3%'],
                                            ['Lợi nhuận sau thuế (tỷ VNĐ)', '32', '41', '55', 'Tăng trưởng 34.1%'],
                                            ['ROE (%)', '12.5', '14.2', '16.8', 'Tốt'],
                                            ['Hệ số nợ/VCSH', '1.8', '1.6', '1.4', 'Cải thiện'],
                                            ['Khả năng thanh toán hiện hành', '1.3', '1.5', '1.7', 'Tốt'],
                                            ['Vòng quay khoản phải thu (ngày)', '45', '42', '38', 'Cải thiện']
                                        ].map(function (row, idx) {
                                            return e('tr', { key: idx },
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '11px', fontWeight: '600' } }, row[0]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', textAlign: 'right', fontSize: '11px' } }, row[1]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', textAlign: 'right', fontSize: '11px' } }, row[2]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold' } }, row[3]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '11px', color: '#15803d' } }, row[4])
                                            );
                                        })
                                    )
                                ),
                                e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '8px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'IV. KẾT LUẬN THẨM ĐỊNH'),
                                e('div', { style: { background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '4px', padding: '12px 16px', marginBottom: '20px', fontSize: '12.5px' } },
                                    e('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' } },
                                        e('i', { className: 'fas fa-check-circle', style: { color: '#15803d', fontSize: '16px' } }),
                                        e('strong', { style: { color: '#15803d' } }, 'ĐỒNG Ý CẤP TÍN DỤNG')
                                    ),
                                    e('p', { style: { marginBottom: '8px' } }, 'Qua quá trình thẩm định, đánh giá toàn diện năng lực tài chính, hoạt động kinh doanh và tài sản đảm bảo, bộ phận QLRR nhận thấy:'),
                                    e('ul', { style: { paddingLeft: '20px', marginBottom: '8px' } },
                                        e('li', { style: { marginBottom: '4px' } }, 'Khách hàng đáp ứng đủ điều kiện cấp tín dụng theo quy định'),
                                        e('li', { style: { marginBottom: '4px' } }, 'Mức rủi ro tổng thể: ', e('strong', null, 'CHẤP NHẬN ĐƯỢC')),
                                        e('li', { style: { marginBottom: '4px' } }, 'Đề xuất phê duyệt hạn mức: ', e('strong', null, '200.000 triệu VNĐ'))
                                    ),
                                    e('p', { style: { fontStyle: 'italic' } }, 'Kính trình lãnh đạo xem xét, phê duyệt.')
                                )
                            ),

                            // === CONTENT FOR BIÊN BẢN + QĐ ===
                            lichSuPdfViewer.loai === 'bien-ban-qd' && e('div', null,
                                e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'I. THÔNG TIN CUỘC HỌP'),
                                e('table', { style: { width: '100%', borderCollapse: 'collapse', marginBottom: '16px' } },
                                    e('tbody', null,
                                        [['Phiên họp số', 'HĐTĐTW-2026/015'],
                                        ['Thời gian', '14:00 ngày 10/03/2026'],
                                        ['Địa điểm', 'Phòng họp Tầng 8 - Trụ sở chính BIDV'],
                                        ['Chủ tọa', 'Ông Nguyễn Văn 11 - Chủ tịch HĐTĐTW'],
                                        ['Thư ký', 'Ông Nguyễn Văn 9 - Thư ký HĐTĐTƯ']
                                        ].map(function (row, idx) {
                                            return e('tr', { key: idx },
                                                e('td', { style: { border: '1px solid #ccc', padding: '6px 10px', width: '30%', background: '#f8f9fa', fontWeight: '600', fontSize: '12px' } }, row[0]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '6px 10px', fontSize: '12px' } }, row[1])
                                            );
                                        })
                                    )
                                ),
                                e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '8px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'II. THÀNH PHẦN THAM DỰ'),
                                e('table', { style: { width: '100%', borderCollapse: 'collapse', marginBottom: '16px' } },
                                    e('thead', null,
                                        e('tr', null,
                                            ['STT', 'Họ và tên', 'Chức vụ', 'Có mặt'].map(function (h, i) {
                                                return e('th', { key: i, style: { border: '1px solid #999', padding: '6px', background: '#e8e8e8', fontSize: '11px', fontWeight: 'bold' } }, h);
                                            })
                                        )
                                    ),
                                    e('tbody', null,
                                        [
                                            ['1', 'Nguyễn Văn 11', 'Chủ tịch HĐTĐTW', '✔'],
                                            ['2', 'Trần Thị Hương', 'Phó Chủ tịch HĐTĐTW', '✔'],
                                            ['3', 'Lê Minh Đức', 'Thành viên HĐTĐTW', '✔'],
                                            ['4', 'Phạm Hoàng Long', 'Thành viên HĐTĐTW', '✔'],
                                            ['5', 'Vũ Thị Mai Anh', 'Thành viên HĐTĐTW', '✔'],
                                            ['6', 'Nguyễn Văn 9', 'Thư ký', '✔']
                                        ].map(function (row, idx) {
                                            return e('tr', { key: idx },
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', textAlign: 'center', fontSize: '11px' } }, row[0]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '11px', fontWeight: '600' } }, row[1]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '11px' } }, row[2]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '11px', textAlign: 'center', color: '#15803d', fontWeight: 'bold' } }, row[3])
                                            );
                                        })
                                    )
                                ),
                                e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '8px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'III. NỘI DUNG XÉT DUYỆT'),
                                e('div', { style: { background: '#f8f9fa', border: '1px solid #ddd', borderRadius: '4px', padding: '12px 16px', marginBottom: '16px', fontSize: '12.5px' } },
                                    e('p', { style: { marginBottom: '8px' } }, e('strong', null, 'Khách hàng: '), 'CÔNG TY CỔ PHẦN ABC (CIF: 1234567890)'),
                                    e('p', { style: { marginBottom: '8px' } }, e('strong', null, 'Đề xuất: '), 'Cấp hạn mức tín dụng năm 2026'),
                                    e('p', { style: { marginBottom: '8px' } }, e('strong', null, 'Số tiền: '), '200.000 triệu VNĐ (Cho vay: 60.000, Bảo lãnh: 40.000)'),
                                    e('p', { style: { marginBottom: '0' } }, e('strong', null, 'Xếp hạng tín dụng: '), 'AA - Đã phê duyệt')
                                ),
                                e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '8px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'IV. KẾT QUẢ BIỂU QUYẾT'),
                                e('table', { style: { width: '100%', borderCollapse: 'collapse', marginBottom: '16px' } },
                                    e('thead', null,
                                        e('tr', null,
                                            ['Thành viên', 'Đồng ý', 'Không đồng ý', 'Ghi chú'].map(function (h, i) {
                                                return e('th', { key: i, style: { border: '1px solid #999', padding: '6px', background: '#e8e8e8', fontSize: '11px', fontWeight: 'bold', textAlign: 'center' } }, h);
                                            })
                                        )
                                    ),
                                    e('tbody', null,
                                        [
                                            ['Nguyễn Văn 11', '✔', '', ''],
                                            ['Trần Thị Hương', '✔', '', ''],
                                            ['Lê Minh Đức', '✔', '', ''],
                                            ['Phạm Hoàng Long', '✔', '', 'Đề nghị lưu ý rủi ro ngành'],
                                            ['Vũ Thị Mai Anh', '✔', '', '']
                                        ].map(function (row, idx) {
                                            return e('tr', { key: idx },
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 8px', fontSize: '11px', fontWeight: '600' } }, row[0]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', textAlign: 'center', fontSize: '13px', color: '#15803d' } }, row[1]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', textAlign: 'center', fontSize: '13px', color: '#dc2626' } }, row[2]),
                                                e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '11px', fontStyle: 'italic' } }, row[3])
                                            );
                                        })
                                    )
                                ),
                                e('div', { style: { textAlign: 'center', marginBottom: '16px', fontSize: '13px' } },
                                    e('strong', null, 'Kết quả: '), e('span', { style: { color: '#15803d', fontWeight: 'bold', fontSize: '14px' } }, '5/5 đồng ý'), ' — ', e('strong', { style: { color: '#15803d' } }, 'THÔNG QUA')
                                ),
                                e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '8px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'V. QUYẾT ĐỊNH'),
                                e('div', { style: { background: '#f0fdf4', border: '2px solid #15803d', borderRadius: '4px', padding: '16px 20px', marginBottom: '20px', fontSize: '12.5px' } },
                                    e('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' } },
                                        e('i', { className: 'fas fa-gavel', style: { color: '#15803d', fontSize: '18px' } }),
                                        e('strong', { style: { color: '#15803d', fontSize: '14px' } }, 'QUYẾT ĐỊNH PHÊ DUYỆT CẤP TÍN DỤNG')
                                    ),
                                    e('p', { style: { marginBottom: '8px' } }, 'Hội đồng tín dụng Trung ương quyết định:'),
                                    e('ul', { style: { paddingLeft: '20px', marginBottom: '12px' } },
                                        e('li', { style: { marginBottom: '6px' } }, e('strong', null, 'Đồng ý'), ' cấp hạn mức tín dụng năm 2026 đối với Công ty Cổ phần ABC'),
                                        e('li', { style: { marginBottom: '6px' } }, 'Tổng hạn mức: ', e('strong', null, '200.000 triệu VNĐ')),
                                        e('li', { style: { marginBottom: '6px' } }, 'Cho vay: ', e('strong', null, '60.000 triệu VNĐ'), ' | Bảo lãnh: ', e('strong', null, '40.000 triệu VNĐ')),
                                        e('li', { style: { marginBottom: '6px' } }, 'Thời hạn hiệu lực: ', e('strong', null, '12 tháng kể từ ngày ký'))
                                    ),
                                    e('p', { style: { fontWeight: 'bold', borderTop: '1px solid #bbf7d0', paddingTop: '8px' } }, 'Quyết định này có hiệu lực kể từ ngày ký.')
                                )
                            ),

                            // === SIGNATURES (dynamic based on doc type & STT) ===
                            (function () {
                                var mkSig = function (name) {
                                    var sigs = {
                                        'NV1': {
                                            path: 'M78,24 C68,6 28,4 18,22 C8,40 22,54 48,48 C62,44 78,36 82,26 C86,16 78,14 72,20 M58,16 L14,88 M52,52 C52,42 56,38 56,50 L56,58 C58,48 62,44 64,52 C66,58 62,60 64,56 C66,50 70,46 70,54 L70,58 C70,48 74,44 74,54 L74,62',
                                            vb: '0 0 100 95', w: '88px', h: '78px', color: '#0033cc', sw: '1.6'
                                        },
                                        'NV2': {
                                            path: 'M30,90 C28,60 28,40 30,22 C32,8 38,2 42,8 C48,16 40,22 34,26 M34,26 C26,34 18,44 14,54 M34,26 C42,34 50,44 54,50 M46,62 C42,58 40,64 44,66 C48,68 52,60 54,58 C54,54 56,58 58,60 C60,62 60,66 62,64 M10,90 C28,96 58,94 76,86',
                                            vb: '0 0 82 100', w: '68px', h: '80px', color: '#1a1a1a', sw: '1.8'
                                        },
                                        'NV3s': {
                                            path: 'M2,14 C6,6 12,4 16,10 C18,14 14,16 18,14 C22,12 24,8 28,10 L30,8 M8,18 L24,17',
                                            vb: '0 0 34 22', w: '24px', h: '16px', color: '#1a1a1a', sw: '1.6'
                                        },
                                        'NV4': {
                                            path: 'M74,20 C62,4 24,2 18,24 C12,46 34,54 56,46 C72,40 84,28 78,18 C74,12 68,16 72,22 M56,14 L18,82 M48,48 C48,38 52,34 52,48 L52,56 C54,46 58,42 60,50 C62,56 56,60 60,56 C64,50 66,56 66,64 C66,72 68,78 72,84 M10,88 C30,94 60,92 82,84',
                                            vb: '0 0 100 98', w: '86px', h: '80px', color: '#1a1a1a', sw: '1.6'
                                        },
                                        'NV9': {
                                            path: 'M8,30 C14,12 24,6 32,14 C36,20 30,28 36,24 L46,14 C50,8 56,14 54,20 L60,14 M18,36 L52,36',
                                            vb: '0 0 70 42', w: '80px', h: '48px', color: '#1a1a1a', sw: '1.4'
                                        },
                                        'NV6': {
                                            path: 'M10,28 C14,12 22,6 30,12 C36,16 32,24 38,20 C44,16 48,8 54,14 C58,18 56,26 60,24 L68,18 M24,34 L54,34 M70,16 L71,17',
                                            vb: '0 0 78 40', w: '80px', h: '48px', color: '#1a1a1a', sw: '1.4'
                                        },
                                        'NV11': {
                                            path: 'M6,32 C10,14 20,4 32,10 C40,14 36,26 30,28 C24,30 22,20 30,12 C38,4 52,4 60,14 C66,22 62,32 68,28 C74,24 80,14 88,10 M20,38 C38,42 62,40 86,34 M22,42 C40,45 64,43 84,38',
                                            vb: '0 0 96 48', w: '80px', h: '48px', color: '#1a1a1a', sw: '1.4'
                                        }
                                    };
                                    var s = sigs[name] || sigs['NV1'];
                                    return e('svg', {
                                        viewBox: s.vb,
                                        style: { width: s.w, height: s.h, display: 'block', margin: name === 'NV3s' ? '0' : '0 auto' }
                                    },
                                        e('path', {
                                            d: s.path,
                                            fill: 'none',
                                            stroke: s.color,
                                            strokeWidth: s.sw,
                                            strokeLinecap: 'round',
                                            strokeLinejoin: 'round',
                                            opacity: '0.92'
                                        })
                                    );
                                };

                                var isBCDXTD = lichSuPdfViewer.loai === 'bcdxtd';
                                var isBCTDRR = lichSuPdfViewer.loai === 'bctdrr';
                                var isBBQD = lichSuPdfViewer.loai === 'bien-ban-qd';
                                var stt = lichSuPdfViewer.stt;

                                var label1 = isBCDXTD ? 'CÁN BỘ TÍN DỤNG' : isBBQD ? 'THƯ KÝ' : 'CÁN BỘ THẨM ĐỊNH';
                                var label2 = isBCDXTD ? 'CÁN BỘ TĐTD' : 'KIỂM SOÁT';
                                var label3 = 'PHÊ DUYỆT';

                                var showSig1 = true;
                                var showSig2 = true;
                                var showCounter = false;
                                var showSig3 = true;
                                var name1 = 'Nguyễn Văn 1';
                                var name2 = isBCDXTD ? 'Nguyễn Văn 2' : 'Nguyễn Văn 6';
                                var name3 = isBCDXTD ? 'Nguyễn Văn 4' : isBBQD ? 'Nguyễn Văn 11' : 'Nguyễn Văn 7';
                                var sigKey1 = 'NV1';
                                var sigKey2 = isBCDXTD ? 'NV2' : 'NV6';
                                var sigKey3 = isBCDXTD ? 'NV4' : isBBQD ? 'NV11' : 'NV7';

                                if (isBCDXTD) {
                                    name1 = 'Nguyễn Văn 1';
                                    if (stt === 2) { showSig2 = false; showSig3 = false; }
                                    else if (stt === 3) { showSig3 = false; }
                                    else if (stt === 4) { showCounter = true; showSig3 = false; }
                                    else if (stt === 5) { showCounter = true; }
                                }
                                if (isBCTDRR) {
                                    name1 = lichSuPdfViewer.nguoiXuLy ? lichSuPdfViewer.nguoiXuLy.split('(')[0].trim() : '';
                                    sigKey1 = 'NV1';
                                    sigKey2 = 'NV2';
                                    sigKey3 = 'NV4';
                                    if (stt === 7) { showSig2 = false; showSig3 = false; }
                                    else if (stt === 8) { showSig3 = false; }
                                }
                                if (isBBQD) {
                                    name1 = 'Nguyễn Văn 9';
                                    sigKey1 = 'NV9';
                                    name2 = 'Nguyễn Văn 6';
                                    sigKey2 = 'NV6';
                                }

                                return e('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '40px', textAlign: 'center', pageBreakInside: 'avoid' } },
                                    e('div', { style: { width: '30%' } },
                                        e('div', { style: { fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' } }, label1),
                                        e('div', { style: { fontSize: '11px', fontStyle: 'italic', color: '#666', marginBottom: '8px' } }, '(Ký, ghi rõ họ tên)'),
                                        showSig1 ? e('div', { style: { marginBottom: '4px' } }, mkSig(sigKey1)) : e('div', { style: { height: '42px' } }),
                                        e('div', { style: { fontWeight: 'bold', fontSize: '12px' } }, name1)
                                    ),
                                    e('div', { style: { width: '30%', position: 'relative' } },
                                        e('div', { style: { fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' } }, label2),
                                        e('div', { style: { fontSize: '11px', fontStyle: 'italic', color: '#666', marginBottom: '8px' } }, '(Ký, ghi rõ họ tên)'),
                                        showSig2 ? e('div', { style: { marginBottom: '4px', position: 'relative' } },
                                            mkSig(sigKey2),
                                            showCounter ? e('div', {
                                                style: { position: 'absolute', right: '10px', bottom: '-4px', transform: 'rotate(-5deg)' }
                                            }, mkSig('NV3s')) : null
                                        ) : e('div', { style: { height: '42px' } }),
                                        showSig2 ? e('div', { style: { fontWeight: 'bold', fontSize: '12px' } }, name2) : null
                                    ),
                                    e('div', { style: { width: '30%' } },
                                        e('div', { style: { fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' } }, label3),
                                        e('div', { style: { fontSize: '11px', fontStyle: 'italic', color: '#666', marginBottom: '8px' } }, '(Ký, ghi rõ họ tên)'),
                                        showSig3 ? e('div', { style: { marginBottom: '4px' } }, mkSig(sigKey3)) : e('div', { style: { height: '42px' } }),
                                        showSig3 ? e('div', { style: { fontWeight: 'bold', fontSize: '12px' } }, name3) : null
                                    )
                                );
                            })(),

                            // Footer
                            e('div', { style: { marginTop: '40px', paddingTop: '12px', borderTop: '1px solid #ddd', textAlign: 'center', fontSize: '10px', color: '#999' } },
                                'Tài liệu MẬT - Chỉ sử dụng nội bộ BIDV | Được tạo tự động bởi hệ thống LOS | Ngày xuất: 10/03/2026'
                            )
                        )
                    )
                )
            )
        )
    ,

        // ===== POPUP: Trinh duyet xac nhan =====
        showTrinhDuyetPopup && e('div', {
            className: 'fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4',
            onClick: function(ev) { if (ev.target === ev.currentTarget) setShowTrinhDuyetPopup(false); }
        },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-md' },
                e('div', { className: 'flex items-center gap-3 px-5 py-4 border-b border-gray-200' },
                    e('div', { className: 'w-10 h-10 rounded-full flex items-center justify-center bg-green-100' },
                        e('i', { className: 'fas fa-paper-plane text-green-600' })
                    ),
                    e('div', null,
                        e('h3', { className: 'font-semibold text-gray-800' }, 'Xác nhận trình duyệt'),
                        e('p', { className: 'text-xs text-gray-500' }, 'Hồ sơ TD-120-25-52656565')
                    )
                ),
                e('div', { className: 'px-5 py-4' },
                    e('p', { className: 'text-sm text-gray-600 mb-3' }, 'Bạn có chắc chắn muốn trình duyệt hồ sơ này?'),
                    e('div', { className: 'bg-green-50 border border-green-200 rounded-lg p-3' },
                        e('p', { className: 'text-xs text-green-700' },
                            e('i', { className: 'fas fa-check-circle mr-1' }),
                            'Hồ sơ sẵn sàng trình duyệt.'
                        )
                    )
                ),
                e('div', { className: 'flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl' },
                    e('button', {
                        className: 'px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg',
                        onClick: function() { setShowTrinhDuyetPopup(false); }
                    }, 'Hủy'),
                    e('button', {
                        className: 'px-5 py-2 bg-[#006B68] text-white text-sm font-medium rounded-lg hover:bg-[#005B58] flex items-center gap-2',
                        onClick: confirmTrinhDuyet
                    }, e('i', { className: 'fas fa-paper-plane text-xs' }), 'Xác nhận trình duyệt')
                )
            )
        )
    );
}

// =====================================================
// LUỒNG THÀNH VIÊN HỘI ĐỒNG
// =====================================================

// Dashboard cho Thành viên Hội đồng
function TVHDDashboardScreen({ onSelectPhieu }) {
    const [activeTab, setActiveTab] = React.useState('thamGiaYKien');

    // Mock data cho bảng
    const phieuData = [
        { stt: 1, vaiTro: 'Thành viên HĐTDTƯ', ngayTiepNhan: '17/01/2026', buocXuLy: 'Xin ý kiến TVHĐ', chiNhanh: 'Quang Trung', tenKH: 'Công ty CP Tập đoàn Hòa Phát - 123', soPhieu: 'Phiếu ý kiến 1234', thamQuyen: 'HĐTDTƯ' },
        { stt: 2, vaiTro: 'Thành viên HĐTDCC', ngayTiepNhan: '18/01/2026', buocXuLy: 'Xin ý kiến TVHĐ', chiNhanh: 'Sở Giao dịch 1', tenKH: 'Công ty CP Tập đoàn VinGroup - 123', soPhieu: 'Phiếu ý kiến 1441', thamQuyen: 'HĐTDCC' },
        { stt: 3, vaiTro: 'Thành viên HĐCCNTƯ', ngayTiepNhan: '25/01/2026', buocXuLy: 'Xin ý kiến TVHĐ', chiNhanh: 'Hà Thành', tenKH: 'Công ty CP Thép Hòa Phát Dung Quất - 990', soPhieu: 'Phiếu ý kiến 235', thamQuyen: 'HĐCCNTƯ' },
    ];

    return e('div', { className: 'flex h-screen w-full overflow-hidden' },
        e(Sidebar),
        e('div', { className: 'flex-1 flex flex-col h-full overflow-hidden' },
            e(Header),
            e('div', { className: 'flex-1 flex flex-col overflow-auto bg-[#eff2f5] p-5' },
                // Title
                e('div', { className: 'mb-4' },
                    e('h1', { className: 'text-xl font-bold text-gray-800' }, 'Công việc cá nhân'),
                    e('div', { className: 'flex items-center gap-4 mt-2' },
                        e('span', { className: 'text-sm text-gray-500' }, 'Tìm kiếm'),
                        e('span', { className: 'text-sm text-[#006B68] cursor-pointer hover:underline' }, 'Bộ lọc nâng cao')
                    )
                ),
                // Tabs
                e('div', { className: 'flex gap-4 mb-4 border-b border-gray-200' },
                    e('button', {
                        className: 'pb-2 px-1 text-sm font-medium ' + (activeTab === 'congViecTD' ? 'text-[#006B68] border-b-2 border-[#006B68]' : 'text-gray-500'),
                        onClick: () => setActiveTab('congViecTD')
                    }, 'Công việc tín dụng'),
                    e('button', {
                        className: 'pb-2 px-1 text-sm font-medium ' + (activeTab === 'thamGiaYKien' ? 'text-[#006B68] border-b-2 border-[#006B68]' : 'text-gray-500'),
                        onClick: () => setActiveTab('thamGiaYKien')
                    }, 'Tham gia ý kiến')
                ),
                // Table
                e('div', { className: 'bg-white rounded-lg shadow overflow-hidden' },
                    e('table', { className: 'w-full text-sm' },
                        e('thead', null,
                            e('tr', { className: 'bg-[#006B68] text-white' },
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'STT'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Vai trò của tôi'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Ngày tiếp nhận'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Bước xử lý hiện tại'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Chi nhánh'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Tên khách hàng', e('br'), 'Số CIF'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Số Phiếu ý kiến'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Thẩm quyền')
                            )
                        ),
                        e('tbody', null,
                            phieuData.map((row, idx) =>
                                e('tr', { key: row.stt, className: idx % 2 === 0 ? 'bg-white' : 'bg-gray-50' },
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' }, row.stt),
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' }, row.vaiTro),
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' }, row.ngayTiepNhan),
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' }, row.buocXuLy),
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' }, row.chiNhanh),
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' }, row.tenKH),
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' },
                                        e('a', {
                                            href: '#',
                                            className: 'text-[#006B68] font-medium hover:underline cursor-pointer',
                                            onClick: (ev) => { ev.preventDefault(); onSelectPhieu(row); }
                                        }, row.soPhieu)
                                    ),
                                    e('td', { className: 'px-4 py-3 border-b border-gray-100' }, row.thamQuyen)
                                )
                            )
                        )
                    )
                )
            )
        )
    );
}

// Màn hình Phiếu ý kiến
function PhieuYKienScreen({ selectedPhieu, onBack }) {
    const [opinions, setOpinions] = React.useState({});
    const [comment, setComment] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    // Nội dung đề xuất tín dụng (read-only)
    const noiDungDeXuat = [
        {
            id: 1, group: 'Nội dung cấp tín dụng', items: [
                'Nội dung cấp tín dụng',
                'Số tiền, đồng tiền cấp tín dụng',
                'Mục đích cấp tín dụng',
                'Lãi suất/phí',
                'Thời hạn cấp tín dụng',
                'Kỳ hạn trả nợ'
            ]
        },
        { id: 2, group: 'Biện pháp bảo đảm', items: ['Biện pháp bảo đảm'] },
        { id: 3, group: 'Các điều kiện tín dụng', items: ['Điều kiện 1', 'Điều kiện 2', 'Điều kiện ...'] },
    ];

    const handleOpinionChange = (itemKey, value) => {
        setOpinions(prev => ({ ...prev, [itemKey]: value }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
        setTimeout(() => {
            alert('Đã gửi ý kiến thành công!');
            onBack();
        }, 500);
    };

    return e('div', { className: 'flex h-screen w-full overflow-hidden' },
        e(Sidebar),
        e('div', { className: 'flex-1 flex flex-col h-full overflow-hidden' },
            // Header với nút Lưu
            e('div', { className: 'header flex items-center justify-between' },
                e('img', { src: 'logo-BIDV.jpg', alt: 'BIDV', className: 'h-12' }),
                e('button', { className: 'px-4 py-2 bg-[#FFC62F] text-gray-800 font-semibold rounded-lg hover:bg-[#e6b22a]' }, 'Lưu')
            ),
            e('div', { className: 'flex-1 overflow-auto bg-[#eff2f5] p-5' },
                // Breadcrumb
                e('div', { className: 'text-sm text-gray-500 mb-4 flex items-center gap-2' },
                    e('span', { className: 'text-[#006B68] cursor-pointer hover:underline', onClick: onBack }, 'Công việc cá nhân'),
                    e('span', null, '›'),
                    e('span', null, 'Phiếu lấy ý kiến')
                ),
                // Title
                e('h1', { className: 'text-xl font-bold text-gray-800 text-center mb-6' }, 'PHIẾU LẤY Ý KIẾN'),

                // Section: Nội dung lấy ý kiến
                e('div', { className: 'bg-white rounded-lg shadow mb-6' },
                    e('div', { className: 'bg-[#006B68] text-white px-4 py-2 rounded-t-lg font-semibold' }, 'NỘI DUNG LẤY Ý KIẾN'),
                    e('div', { className: 'p-4 grid grid-cols-2 gap-4 text-sm' },
                        e('div', null, e('span', { className: 'text-gray-500' }, 'Nội dung: '), e('span', { className: 'font-medium' }, 'Nhập nội dung lấy ý kiến')),
                        e('div', null),
                        e('div', null, e('span', { className: 'text-gray-500' }, 'ID truy vấn: '), e('span', { className: 'font-medium' }, 'ID "Số BCDX_HĐTD/HĐQT_stt"')),
                        e('div', null, e('span', { className: 'text-gray-500' }, 'Trạng thái truy vấn: '), e('span', { className: 'px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-xs font-medium' }, 'Chờ phản hồi')),
                        e('div', null, e('span', { className: 'text-gray-500' }, 'Người gửi: '), e('span', { className: 'font-medium' }, '1272 - Phạm Thị Hồng Ngọc – Thư ký HĐTDTƯ')),
                        e('div', null, e('span', { className: 'text-gray-500' }, 'Ngày gửi PYK: '), e('span', { className: 'font-medium' }, '17/01/2026')),
                        e('div', null, e('span', { className: 'text-gray-500' }, 'Người nhận: '), e('span', { className: 'font-medium' }, 'PTGĐ Trần Long – Thành viên HĐTDTƯ')),
                        e('div', null, e('span', { className: 'text-gray-500' }, 'Thời hạn TGYK cuối cùng: '), e('span', { className: 'font-medium' }, '20/01/2026')),
                        e('div', null, e('span', { className: 'text-gray-500' }, 'Số BCĐXTD: '), e('span', { className: 'font-medium' }, selectedPhieu?.soPhieu || 'Số BCDX_'))
                    )
                ),

                // Section: Hồ sơ đính kèm
                e('div', { className: 'bg-white rounded-lg shadow mb-6' },
                    e('div', { className: 'bg-[#006B68] text-white px-4 py-2 rounded-t-lg font-semibold' }, 'Hồ sơ đính kèm'),
                    e('table', { className: 'w-full text-sm' },
                        e('thead', null,
                            e('tr', { className: 'bg-gray-100' },
                                e('th', { className: 'px-4 py-2 text-left' }, 'STT'),
                                e('th', { className: 'px-4 py-2 text-left' }, 'Tên Hồ sơ'),
                                e('th', { className: 'px-4 py-2 text-left' }, 'Hồ sơ đính kèm'),
                                e('th', { className: 'px-4 py-2 text-left' }, 'Người đính hồ sơ'),
                                e('th', { className: 'px-4 py-2 text-left' }, 'Ngày, giờ'),
                                e('th', { className: 'px-4 py-2 text-left' }, 'Tác vụ')
                            )
                        ),
                        e('tbody', null,
                            e('tr', null,
                                e('td', { className: 'px-4 py-3 border-b' }, '1'),
                                e('td', { className: 'px-4 py-3 border-b' }, ''),
                                e('td', { className: 'px-4 py-3 border-b' }, e('input', { type: 'checkbox', className: 'w-4 h-4' })),
                                e('td', { className: 'px-4 py-3 border-b' }, ''),
                                e('td', { className: 'px-4 py-3 border-b' }, ''),
                                e('td', { className: 'px-4 py-3 border-b' }, '')
                            )
                        )
                    ),
                    e('div', { className: 'p-3 flex justify-end' },
                        e('button', { className: 'px-4 py-2 bg-[#006B68] text-white rounded-lg text-sm font-medium' }, 'Gửi Phiếu lấy ý kiến')
                    )
                ),

                // Section: Ý kiến của Thành viên Hội đồng
                e('div', { className: 'bg-white rounded-lg shadow mb-6' },
                    e('div', { className: 'bg-[#006B68] text-white px-4 py-2 rounded-t-lg font-semibold' }, 'Ý KIẾN CỦA THÀNH VIÊN HỘI ĐỒNG'),
                    e('table', { className: 'w-full text-sm' },
                        e('thead', null,
                            e('tr', { className: 'bg-[#006B68] text-white' },
                                e('th', { className: 'px-4 py-2 text-left', rowSpan: 2 }, 'STT'),
                                e('th', { className: 'px-4 py-2 text-left', rowSpan: 2 }, 'Các nội dung đề xuất tín dụng'),
                                e('th', { className: 'px-4 py-2 text-center', colSpan: 2 }, 'Ý kiến phê duyệt của Thành viên hội đồng')
                            ),
                            e('tr', { className: 'bg-[#006B68] text-white' },
                                e('th', { className: 'px-4 py-2 text-center border-l border-white/30' }, 'Đồng ý'),
                                e('th', { className: 'px-4 py-2 text-center border-l border-white/30' }, 'Không đồng ý')
                            )
                        ),
                        e('tbody', null,
                            noiDungDeXuat.map(section =>
                                [
                                    e('tr', { key: 'g' + section.id, className: 'bg-gray-50' },
                                        e('td', { className: 'px-4 py-2 border font-semibold' }, section.id),
                                        e('td', { className: 'px-4 py-2 border font-semibold', colSpan: 3 }, section.group)
                                    ),
                                    ...section.items.map((item, idx) => {
                                        const key = section.id + '-' + idx;
                                        return e('tr', { key },
                                            e('td', { className: 'px-4 py-2 border' }, ''),
                                            e('td', { className: 'px-4 py-2 border text-gray-600' }, item),
                                            e('td', { className: 'px-4 py-2 border text-center' },
                                                e('input', {
                                                    type: 'radio',
                                                    name: 'opinion-' + key,
                                                    className: 'w-4 h-4 accent-[#006B68]',
                                                    checked: opinions[key] === 'agree',
                                                    onChange: () => handleOpinionChange(key, 'agree')
                                                })
                                            ),
                                            e('td', { className: 'px-4 py-2 border text-center' },
                                                e('input', {
                                                    type: 'radio',
                                                    name: 'opinion-' + key,
                                                    className: 'w-4 h-4 accent-red-500',
                                                    checked: opinions[key] === 'disagree',
                                                    onChange: () => handleOpinionChange(key, 'disagree')
                                                })
                                            )
                                        );
                                    })
                                ]
                            ).flat()
                        )
                    )
                ),

                // Ý kiến bổ sung
                e('div', { className: 'bg-white rounded-lg shadow mb-6 p-4' },
                    e('label', { className: 'block font-semibold text-gray-800 mb-2' }, 'Ý kiến bổ sung (nếu có):'),
                    e('textarea', {
                        className: 'w-full border border-gray-300 rounded-lg p-3 min-h-[100px] focus:ring-2 focus:ring-[#006B68] focus:border-[#006B68] outline-none',
                        placeholder: 'Nhập ý kiến bổ sung của bạn...',
                        value: comment,
                        onChange: (ev) => setComment(ev.target.value)
                    })
                ),

                // Nút Gửi ý kiến
                e('div', { className: 'flex justify-end' },
                    e('button', {
                        onClick: handleSubmit,
                        disabled: submitted,
                        className: 'px-6 py-3 bg-[#006B68] text-white font-semibold rounded-lg hover:bg-[#005B58] disabled:opacity-50 disabled:cursor-not-allowed'
                    }, submitted ? 'Đang gửi...' : 'Gửi ý kiến')
                )
            )
        )
    );
}

// =====================================================
// =====================================================
// MAIN APP - Multi-flow selector
// =====================================================

function FlowSelectScreen({ onSelectFlow }) {
    return e('div', { className: 'flex h-screen w-full overflow-hidden' },
        e(Sidebar),
        e('div', { className: 'flex-1 flex flex-col h-full overflow-hidden' },
            e(Header),
            e('div', { className: 'flex-1 overflow-auto bg-[#eff2f5] flex items-center justify-center p-5' },
                e('div', { className: 'bg-white rounded-xl shadow-lg p-8 w-full max-w-lg' },
                    e('div', { className: 'text-center mb-6' },
                        e('div', { className: 'w-14 h-14 bg-[#006B68]/10 rounded-xl flex items-center justify-center mx-auto mb-3' },
                            e('i', { className: 'fas fa-exchange-alt text-[#006B68] text-xl' })
                        ),
                        e('h2', { className: 'text-lg font-bold text-gray-800' }, 'Ch\u1ECDn lu\u1ED3ng nghi\u1EC7p v\u1EE5'),
                        e('p', { className: 'text-sm text-gray-500 mt-1' }, 'Vui l\u00F2ng ch\u1ECDn vai tr\u00F2 \u0111\u1EC3 ti\u1EBFp t\u1EE5c')
                    ),
                    e('div', { className: 'space-y-3' },
                        e('button', {
                            onClick: function() { onSelectFlow('RM'); },
                            className: 'w-full p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#006B68] hover:bg-[#006B68]/5 transition-all flex items-center gap-4 group text-left'
                        },
                            e('div', { className: 'w-11 h-11 bg-[#006B68]/10 rounded-lg flex items-center justify-center group-hover:bg-[#006B68]/20 flex-shrink-0' },
                                e('i', { className: 'fas fa-user-tie text-[#006B68] text-lg' })
                            ),
                            e('div', { className: 'flex-1' },
                                e('p', { className: 'font-semibold text-gray-800 text-sm' }, 'C\u00E1n b\u1ED9 T\u0110RR'),
                                e('p', { className: 'text-xs text-gray-500' }, 'R\u00E0 so\u00E1t/th\u1EA9m \u0111\u1ECBnh, ph\u00EA duy\u1EC7t t\u00EDn d\u1EE5ng')
                            ),
                            e('i', { className: 'fas fa-chevron-right text-gray-400 group-hover:text-[#006B68]' })
                        ),
                        e('button', {
                            onClick: function() { onSelectFlow('TKHD'); },
                            className: 'w-full p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#006B68] hover:bg-[#006B68]/5 transition-all flex items-center gap-4 group text-left'
                        },
                            e('div', { className: 'w-11 h-11 bg-[#006B68]/10 rounded-lg flex items-center justify-center group-hover:bg-[#006B68]/20 flex-shrink-0' },
                                e('i', { className: 'fas fa-user-shield text-[#006B68] text-lg' })
                            ),
                            e('div', { className: 'flex-1' },
                                e('p', { className: 'font-semibold text-gray-800 text-sm' }, 'Th\u01B0 k\u00FD H\u1ED9i \u0111\u1ED3ng'),
                                e('p', { className: 'text-xs text-gray-500' }, 'Xin \u00FD ki\u1EBFn H\u1ED9i \u0111\u1ED3ng, t\u1ED5ng h\u1EE3p \u00FD ki\u1EBFn, l\u1EADp bi\u00EAn b\u1EA3n/ngh\u1ECB quy\u1EBFt')
                            ),
                            e('i', { className: 'fas fa-chevron-right text-gray-400 group-hover:text-[#006B68]' })
                        )
                    )
                )
            )
        )
    );
}

function App() {
    var _s = React.useState(null);
    var currentFlow = _s[0];
    var setCurrentFlow = _s[1];
    var _t = React.useState('dashboard');
    var tvhdScreen = _t[0];
    var setTvhdScreen = _t[1];
    var _u = React.useState(null);
    var selectedPhieu = _u[0];
    var setSelectedPhieu = _u[1];

    var mockBCDX = {
        stt: 1,
        vaiTro: 'RM',
        ngayTiepNhan: '17/01/2026',
        buocXuLy: 'X\u1EED l\u00FD RM',
        chiNhanh: 'CN T\u00E2y H\u1ED3',
        tenKH: 'C\u00F4ng ty CP T\u1EADp \u0111o\u00E0n H\u00F2a Ph\u00E1t - 123',
        soBCDX: 'BCDX-001',
        loaiBCDX: 'C\u1EA5p m\u1EDBi'
    };

    if (!currentFlow) {
        return e(FlowSelectScreen, { onSelectFlow: setCurrentFlow });
    }

    if (currentFlow === 'RM') {
        return e(BCDXScreen, { selectedBCDX: mockBCDX, initialMainTab: 'pheDuyetTinDung', onBack: function() { setCurrentFlow(null); } });
    }

    if (currentFlow === 'TKHD') {
        if (window.TKHDFlow) {
            return e(window.TKHDFlow, { onBack: function() { setCurrentFlow(null); } });
        }
        return e('div', { className: 'p-10 text-center text-gray-500' }, 'Loading...');
    }

    if (currentFlow === 'TVHD') {
        if (tvhdScreen === 'phieu' && selectedPhieu) {
            return e(PhieuYKienScreen, {
                selectedPhieu: selectedPhieu,
                onBack: function() { setTvhdScreen('dashboard'); setSelectedPhieu(null); }
            });
        }
        return e(TVHDDashboardScreen, {
            onSelectPhieu: function(phieu) { setSelectedPhieu(phieu); setTvhdScreen('phieu'); }
        });
    }

    return null;
}

// RENDER
var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e(App));
