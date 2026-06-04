// =====================================================
// Tab: Phân bổ tự động (Auto Allocation Rules)
// =====================================================

window.TabPhanBoTuDong = function () {
    const e = React.createElement;

    // ===== STATES =====
    var _useState = React.useState('list');
    var currentView = _useState[0];
    var setCurrentView = _useState[1];

    var _useState2 = React.useState(null);
    var selectedRule = _useState2[0];
    var setSelectedRule = _useState2[1];

    var _useState3 = React.useState('');
    var searchText = _useState3[0];
    var setSearchText = _useState3[1];

    var _useState4 = React.useState('');
    var filterLoai = _useState4[0];
    var setFilterLoai = _useState4[1];

    var _useState5 = React.useState('');
    var filterDonVi = _useState5[0];
    var setFilterDonVi = _useState5[1];

    var _useState6 = React.useState([]);
    var filterBuocApDung = _useState6[0];
    var setFilterBuocApDung = _useState6[1];

    var _useState7 = React.useState('');
    var filterTrangThai = _useState7[0];
    var setFilterTrangThai = _useState7[1];

    var _useState8 = React.useState(false);
    var showBuocPopup = _useState8[0];
    var setShowBuocPopup = _useState8[1];

    var _useState9 = React.useState([]);
    var tempBuocSelection = _useState9[0];
    var setTempBuocSelection = _useState9[1];

    var _useState10 = React.useState('');
    var buocSearch = _useState10[0];
    var setBuocSearch = _useState10[1];

    var _useState11 = React.useState(1);
    var currentPage = _useState11[0];
    var setCurrentPage = _useState11[1];

    var _useState12 = React.useState(10);
    var pageSize = _useState12[0];
    var setPageSize = _useState12[1];

    // ===== MOCK DATA =====
    var mockRules = [
        { id: 'QT001', ten: 'Phân bổ CB TĐRR theo kinh nghiệm', loai: 'Phân bổ người xử lý', donVi: 'Chi nhánh Hoàn Kiếm', trangThai: 'Hoạt động', buocApDung: 'Lập BCTĐRR', ngayCapNhat: '15/05/2026', nguoiCapNhat: 'Nguyễn Văn A' },
        { id: 'QT002', ten: 'Phân bổ theo workload QLKH', loai: 'Phân bổ theo nhóm', donVi: 'Chi nhánh Ba Đình', trangThai: 'Hoạt động', buocApDung: 'Thẩm định TD', ngayCapNhat: '10/05/2026', nguoiCapNhat: 'Trần Thị B' },
        { id: 'QT003', ten: 'Phân bổ bảo lãnh tự động', loai: 'Phân bổ người xử lý', donVi: 'Sở giao dịch 1', trangThai: 'Tạm dừng', buocApDung: 'Kiểm soát BCTĐRR', ngayCapNhat: '01/05/2026', nguoiCapNhat: 'Lê Văn C' },
        { id: 'QT004', ten: 'Phân bổ hồ sơ dự án', loai: 'Phân bổ theo nhóm', donVi: 'Chi nhánh Cầu Giấy', trangThai: 'Hoạt động', buocApDung: 'Lập BCTĐRR, Kiểm soát BCTĐRR', ngayCapNhat: '28/04/2026', nguoiCapNhat: 'Phạm D' },
        { id: 'QT005', ten: 'Phân bổ CB phê duyệt BCDXTD', loai: 'Phân bổ người xử lý', donVi: 'Chi nhánh Hai Bà Trưng', trangThai: 'Hoạt động', buocApDung: 'Phê duyệt BCDXTD', ngayCapNhat: '20/04/2026', nguoiCapNhat: 'Hoàng E' },
        { id: 'QT006', ten: 'Phân bổ hồ sơ đặc biệt', loai: 'Phân bổ theo nhóm', donVi: 'Trụ sở chính', trangThai: 'Hoạt động', buocApDung: 'Phê duyệt cấp TD', ngayCapNhat: '15/04/2026', nguoiCapNhat: 'Nguyễn F' },
        { id: 'QT007', ten: 'Phân bổ theo vùng miền', loai: 'Phân bổ theo nhóm', donVi: 'Chi nhánh Đống Đa', trangThai: 'Tạm dừng', buocApDung: 'Thẩm định TD', ngayCapNhat: '10/04/2026', nguoiCapNhat: 'Trần G' },
        { id: 'QT008', ten: 'Phân bổ ngẫu nhiên TĐRR', loai: 'Phân bổ người xử lý', donVi: 'Chi nhánh Thanh Xuân', trangThai: 'Hoạt động', buocApDung: 'Lập BCTĐRR', ngayCapNhat: '05/04/2026', nguoiCapNhat: 'Lê H' }
    ];

    var buocApDungOptions = [
        'Lập BCTĐRR',
        'Kiểm soát BCTĐRR',
        'Thẩm định TD',
        'Phê duyệt BCDXTD',
        'Phê duyệt cấp TD',
        'Phê duyệt BCTĐRR'
    ];

    // ===== DETAIL MOCK DATA =====
    var detailInfo = {
        loaiQuyTac: 'Phân bổ người xử lý',
        donVi: 'Chi nhánh Hoàn Kiếm',
        buocApDung: 'Lập BCTĐRR',
        vaiTroApDung: 'Cán bộ TĐRR',
        soQuyetDinh: 'QĐ-2026/001',
        ngayHieuLuc: '01/01/2026',
        dienGiai: 'Quy tắc phân bổ tự động cán bộ thẩm định rủi ro dựa trên kinh nghiệm, workload hiện tại và lịch sử xử lý hồ sơ của từng cán bộ.'
    };

    var toggleCriteria = [
        { id: 1, ten: 'Lịch sử xử lý hồ sơ', enabled: true },
        { id: 2, ten: 'Số lượng hồ sơ đang xử lý/workload', enabled: true },
        { id: 3, ten: 'Chức vụ', enabled: false },
        { id: 4, ten: 'Ngẫu nhiên', enabled: true }
    ];

    var nhomRules = [
        { thuTu: 1, tieuChi: 'Loại khách hàng', giaTri: ['DN lớn', 'DN vừa'], nhom: 'Nhóm TĐRR DN lớn' },
        { thuTu: 2, tieuChi: 'Ngành nghề', giaTri: ['Bất động sản', 'Xây dựng'], nhom: 'Nhóm TĐRR BĐS' },
        { thuTu: 3, tieuChi: 'Giá trị khoản vay', giaTri: ['> 100 tỷ'], nhom: 'Nhóm TĐRR khoản lớn' }
    ];

    // ===== FILTER LOGIC =====
    var filteredRules = mockRules.filter(function (rule) {
        var matchSearch = !searchText ||
            rule.id.toLowerCase().includes(searchText.toLowerCase()) ||
            rule.ten.toLowerCase().includes(searchText.toLowerCase());
        var matchLoai = !filterLoai || rule.loai === filterLoai;
        var matchDonVi = !filterDonVi || rule.donVi === filterDonVi;
        var matchTrangThai = !filterTrangThai || rule.trangThai === filterTrangThai;
        var matchBuoc = filterBuocApDung.length === 0 || filterBuocApDung.some(function (b) {
            return rule.buocApDung.includes(b);
        });
        return matchSearch && matchLoai && matchDonVi && matchTrangThai && matchBuoc;
    });

    // ===== PAGINATION =====
    var totalItems = filteredRules.length;
    var totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    var startIdx = (currentPage - 1) * pageSize;
    var endIdx = Math.min(startIdx + pageSize, totalItems);
    var pagedRules = filteredRules.slice(startIdx, endIdx);

    React.useEffect(function () {
        setCurrentPage(1);
    }, [searchText, filterLoai, filterDonVi, filterTrangThai, filterBuocApDung, pageSize]);

    // ===== HANDLERS =====
    function handleRowClick(rule) {
        setSelectedRule(rule);
        setCurrentView('detail');
    }

    function handleBack() {
        setCurrentView('list');
        setSelectedRule(null);
    }

    function openBuocPopup() {
        setTempBuocSelection(filterBuocApDung.slice());
        setBuocSearch('');
        setShowBuocPopup(true);
    }

    function toggleBuocItem(item) {
        var idx = tempBuocSelection.indexOf(item);
        if (idx > -1) {
            setTempBuocSelection(tempBuocSelection.filter(function (b) { return b !== item; }));
        } else {
            setTempBuocSelection(tempBuocSelection.concat([item]));
        }
    }

    function confirmBuocSelection() {
        setFilterBuocApDung(tempBuocSelection);
        setShowBuocPopup(false);
    }

    function cancelBuocSelection() {
        setShowBuocPopup(false);
    }

    // ===== RENDER: STATUS BADGE =====
    function renderStatusBadge(status) {
        var isActive = status === 'Hoạt động';
        return e('span', {
            className: 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ' +
                (isActive ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700')
        },
            e('span', {
                className: 'w-1.5 h-1.5 rounded-full ' + (isActive ? 'bg-green-500' : 'bg-orange-500')
            }),
            status
        );
    }

    // ================================================================
    // DETAIL VIEW
    // ================================================================
    if (currentView === 'detail' && selectedRule) {
        // If external detail component exists, use it
        if (window.TabPhanBoChiTiet) {
            return e(window.TabPhanBoChiTiet, { rule: selectedRule, onBack: handleBack });
        }

        var rule = selectedRule;
        return e('div', { className: 'space-y-5' },
            // Back button + Header
            e('div', { className: 'mb-2' },
                e('button', {
                    className: 'flex items-center gap-2 text-sm text-gray-500 hover:text-[#006B68] transition-colors mb-3',
                    onClick: handleBack
                },
                    e('i', { className: 'fas fa-arrow-left text-xs' }),
                    e('span', null, 'Xem chi tiết')
                ),
                e('div', { className: 'flex items-center gap-3 flex-wrap' },
                    e('h2', { className: 'text-lg font-bold text-gray-800' }, rule.ten),
                    renderStatusBadge(rule.trangThai)
                ),
                e('div', { className: 'flex items-center gap-4 mt-2 text-xs text-gray-500' },
                    e('span', null, e('i', { className: 'fas fa-hashtag mr-1' }), rule.id),
                    e('span', null, e('i', { className: 'fas fa-user mr-1' }), rule.nguoiCapNhat),
                    e('span', null, e('i', { className: 'fas fa-calendar mr-1' }), rule.ngayCapNhat)
                )
            ),

            // Card 1: Thông tin chung
            e('div', { className: 'bg-white border border-gray-200 rounded-lg p-4 md:p-5' },
                e('h3', { className: 'text-sm font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100' },
                    e('i', { className: 'fas fa-info-circle text-[#006B68] mr-2' }),
                    'Thông tin chung'
                ),
                e('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4' },
                    // Row 1
                    e('div', null,
                        e('div', { className: 'text-xs text-gray-500 mb-1' }, 'Loại quy tắc'),
                        e('div', { className: 'text-sm font-medium text-gray-800' }, detailInfo.loaiQuyTac)
                    ),
                    e('div', null,
                        e('div', { className: 'text-xs text-gray-500 mb-1' }, 'Đơn vị'),
                        e('div', { className: 'text-sm font-medium text-gray-800' }, detailInfo.donVi)
                    ),
                    e('div', null,
                        e('div', { className: 'text-xs text-gray-500 mb-1' }, 'Bước áp dụng'),
                        e('div', { className: 'text-sm font-medium text-gray-800' }, detailInfo.buocApDung)
                    ),
                    // Row 2
                    e('div', null,
                        e('div', { className: 'text-xs text-gray-500 mb-1' }, 'Vai trò áp dụng'),
                        e('div', { className: 'text-sm font-medium text-gray-800' }, detailInfo.vaiTroApDung)
                    ),
                    e('div', null,
                        e('div', { className: 'text-xs text-gray-500 mb-1' }, 'Số quyết định'),
                        e('div', { className: 'text-sm font-medium text-gray-800' }, detailInfo.soQuyetDinh)
                    ),
                    e('div', null,
                        e('div', { className: 'text-xs text-gray-500 mb-1' }, 'Ngày hiệu lực'),
                        e('div', { className: 'text-sm font-medium text-gray-800' }, detailInfo.ngayHieuLuc)
                    ),
                    // Diễn giải - full width
                    e('div', { className: 'md:col-span-2 lg:col-span-3' },
                        e('div', { className: 'text-xs text-gray-500 mb-1' }, 'Diễn giải'),
                        e('div', { className: 'text-sm text-gray-700' }, detailInfo.dienGiai)
                    )
                )
            ),

            // Card 2: Quy tắc xác định người xử lý
            e('div', { className: 'bg-white border border-gray-200 rounded-lg p-4 md:p-5' },
                e('h3', { className: 'text-sm font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100' },
                    e('i', { className: 'fas fa-user-cog text-[#006B68] mr-2' }),
                    'Quy tắc xác định người xử lý'
                ),
                e('div', { className: 'space-y-3' },
                    toggleCriteria.map(function (item) {
                        return e('div', {
                            key: item.id,
                            className: 'flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg'
                        },
                            e('div', { className: 'flex items-center gap-3' },
                                e('div', {
                                    className: 'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ' +
                                        (item.enabled ? 'bg-[#006B68] text-white' : 'bg-gray-200 text-gray-500')
                                }, item.id),
                                e('span', { className: 'text-sm font-medium text-gray-700' }, item.ten)
                            ),
                            // Toggle switch
                            e('div', {
                                className: 'relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-default ' +
                                    (item.enabled ? 'bg-[#006B68]' : 'bg-gray-300')
                            },
                                e('span', {
                                    className: 'inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ' +
                                        (item.enabled ? 'translate-x-6' : 'translate-x-1')
                                })
                            )
                        );
                    })
                )
            ),

            // Card 3: Quy tắc xác định nhóm
            e('div', { className: 'bg-white border border-gray-200 rounded-lg p-4 md:p-5' },
                e('h3', { className: 'text-sm font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-100' },
                    e('i', { className: 'fas fa-users text-[#006B68] mr-2' }),
                    'Quy tắc xác định nhóm'
                ),

                // Sub-section tabs
                e('div', { className: 'flex gap-2 mb-4' },
                    ['Hồ sơ đặc biệt', 'Hồ sơ dự án', 'Hồ sơ còn lại'].map(function (label, idx) {
                        return e('span', {
                            key: idx,
                            className: 'px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ' +
                                (idx === 0 ? 'bg-[#006B68] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
                        }, label);
                    })
                ),

                // Table
                e('div', { className: 'overflow-x-auto rounded-lg border border-gray-200' },
                    e('table', { className: 'w-full text-sm' },
                        e('thead', null,
                            e('tr', { className: 'bg-[#006B68] text-white' },
                                e('th', { className: 'px-4 py-3 text-left font-medium text-xs w-24' }, 'Thứ tự ưu tiên'),
                                e('th', { className: 'px-4 py-3 text-left font-medium text-xs' }, 'Tiêu chí'),
                                e('th', { className: 'px-4 py-3 text-left font-medium text-xs' }, 'Giá trị tiêu chí'),
                                e('th', { className: 'px-4 py-3 text-left font-medium text-xs' }, 'Nhóm xử lý hồ sơ')
                            )
                        ),
                        e('tbody', null,
                            nhomRules.map(function (row, idx) {
                                return e('tr', {
                                    key: idx,
                                    className: 'border-t border-gray-100 hover:bg-gray-50 transition-colors'
                                },
                                    e('td', { className: 'px-4 py-3 text-center' },
                                        e('span', {
                                            className: 'inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#006B68]/10 text-[#006B68] text-xs font-bold'
                                        }, row.thuTu)
                                    ),
                                    e('td', { className: 'px-4 py-3 font-medium text-gray-800' }, row.tieuChi),
                                    e('td', { className: 'px-4 py-3' },
                                        e('div', { className: 'flex flex-wrap gap-1.5' },
                                            row.giaTri.map(function (val, vIdx) {
                                                return e('span', {
                                                    key: vIdx,
                                                    className: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100'
                                                }, val);
                                            })
                                        )
                                    ),
                                    e('td', { className: 'px-4 py-3 text-gray-700' }, row.nhom)
                                );
                            })
                        )
                    )
                )
            )
        );
    }

    // ================================================================
    // LIST VIEW
    // ================================================================

    // Unique values for dropdowns
    var uniqueLoai = [];
    var uniqueDonVi = [];
    mockRules.forEach(function (r) {
        if (uniqueLoai.indexOf(r.loai) === -1) uniqueLoai.push(r.loai);
        if (uniqueDonVi.indexOf(r.donVi) === -1) uniqueDonVi.push(r.donVi);
    });

    var filteredBuocOptions = buocApDungOptions.filter(function (b) {
        return !buocSearch || b.toLowerCase().includes(buocSearch.toLowerCase());
    });

    return e('div', { className: 'space-y-5' },

        // ===== HEADER =====
        e('div', { className: 'flex items-center justify-between mb-1' },
            e('h2', { className: 'text-lg font-bold text-gray-800' }, 'Phân bổ tự động')
        ),

        // ===== SEARCH & FILTERS =====
        e('div', { className: 'bg-white border border-gray-200 rounded-lg p-4' },
            e('div', { className: 'flex flex-col lg:flex-row gap-3' },
                // Search input
                e('div', { className: 'relative flex-1 lg:max-w-xs' },
                    e('i', { className: 'fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs' }),
                    e('input', {
                        type: 'text',
                        className: 'w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#006B68] focus:ring-2 focus:ring-[#006B68]/20',
                        placeholder: 'Tìm kiếm mã, tên quy tắc',
                        value: searchText,
                        onChange: function (ev) { setSearchText(ev.target.value); }
                    })
                ),

                // Filter: Loại quy tắc
                e('select', {
                    className: 'px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:border-[#006B68]',
                    value: filterLoai,
                    onChange: function (ev) { setFilterLoai(ev.target.value); }
                },
                    e('option', { value: '' }, 'Tất cả loại quy tắc'),
                    uniqueLoai.map(function (l, i) { return e('option', { key: i, value: l }, l); })
                ),

                // Filter: Đơn vị
                e('select', {
                    className: 'px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:border-[#006B68]',
                    value: filterDonVi,
                    onChange: function (ev) { setFilterDonVi(ev.target.value); }
                },
                    e('option', { value: '' }, 'Tất cả đơn vị'),
                    uniqueDonVi.map(function (d, i) { return e('option', { key: i, value: d }, d); })
                ),

                // Filter: Bước áp dụng (popup trigger)
                e('button', {
                    className: 'px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-400 transition-colors flex items-center gap-2',
                    onClick: openBuocPopup
                },
                    e('span', null, filterBuocApDung.length > 0
                        ? 'Bước áp dụng (' + filterBuocApDung.length + ')'
                        : 'Tất cả bước áp dụng'),
                    e('i', { className: 'fas fa-chevron-down text-xs text-gray-400' })
                ),

                // Filter: Trạng thái
                e('select', {
                    className: 'px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:border-[#006B68]',
                    value: filterTrangThai,
                    onChange: function (ev) { setFilterTrangThai(ev.target.value); }
                },
                    e('option', { value: '' }, 'Trạng thái'),
                    e('option', { value: 'Hoạt động' }, 'Hoạt động'),
                    e('option', { value: 'Tạm dừng' }, 'Tạm dừng')
                )
            )
        ),

        // ===== BƯỚC ÁP DỤNG POPUP =====
        showBuocPopup && e('div', {
            className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50',
            onClick: cancelBuocSelection
        },
            e('div', {
                className: 'bg-white rounded-xl shadow-2xl w-full max-w-md mx-4',
                onClick: function (ev) { ev.stopPropagation(); },
                style: { animation: 'slideUp 0.3s ease' }
            },
                // Popup header
                e('div', { className: 'px-5 py-4 border-b border-gray-200' },
                    e('h3', { className: 'text-base font-semibold text-gray-800' }, 'Chọn bước áp dụng'),
                    e('div', { className: 'relative mt-3' },
                        e('i', { className: 'fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs' }),
                        e('input', {
                            type: 'text',
                            className: 'w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#006B68]',
                            placeholder: 'Tìm kiếm bước áp dụng',
                            value: buocSearch,
                            onChange: function (ev) { setBuocSearch(ev.target.value); },
                            autoFocus: true
                        })
                    )
                ),
                // Checkbox list
                e('div', { className: 'px-5 py-3 max-h-64 overflow-y-auto' },
                    filteredBuocOptions.map(function (item, idx) {
                        var isChecked = tempBuocSelection.indexOf(item) > -1;
                        return e('label', {
                            key: idx,
                            className: 'flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors'
                        },
                            e('input', {
                                type: 'checkbox',
                                checked: isChecked,
                                onChange: function () { toggleBuocItem(item); },
                                className: 'w-4 h-4 rounded border-gray-300 text-[#006B68] focus:ring-[#006B68]'
                            }),
                            e('span', { className: 'text-sm text-gray-700' }, item)
                        );
                    }),
                    filteredBuocOptions.length === 0 && e('div', { className: 'text-center py-4 text-sm text-gray-400' }, 'Không tìm thấy kết quả')
                ),
                // Footer buttons
                e('div', { className: 'px-5 py-4 border-t border-gray-200 flex justify-end gap-3' },
                    e('button', {
                        className: 'px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors',
                        onClick: cancelBuocSelection
                    }, 'Hủy'),
                    e('button', {
                        className: 'px-4 py-2 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005B58] transition-colors',
                        onClick: confirmBuocSelection
                    }, 'Xác nhận')
                )
            )
        ),

        // ===== TABLE =====
        filteredRules.length > 0 ?
            e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
                e('div', { className: 'overflow-x-auto' },
                    e('table', { className: 'w-full text-sm' },
                        e('thead', null,
                            e('tr', { className: 'bg-[#006B68] text-white' },
                                e('th', { className: 'px-4 py-3 text-left font-medium text-xs w-14' }, 'STT'),
                                e('th', { className: 'px-4 py-3 text-left font-medium text-xs' }, 'Tên quy tắc'),
                                e('th', { className: 'px-4 py-3 text-left font-medium text-xs' }, 'Loại quy tắc'),
                                e('th', { className: 'px-4 py-3 text-left font-medium text-xs' }, 'Đơn vị'),
                                e('th', { className: 'px-4 py-3 text-left font-medium text-xs' }, 'Trạng thái'),
                                e('th', { className: 'px-4 py-3 text-left font-medium text-xs' }, 'Bước áp dụng'),
                                e('th', { className: 'px-4 py-3 text-left font-medium text-xs' }, 'Ngày cập nhật'),
                                e('th', { className: 'px-4 py-3 text-left font-medium text-xs' }, 'Người cập nhật'),
                                e('th', { className: 'px-4 py-3 text-center font-medium text-xs w-28' }, 'Thao tác')
                            )
                        ),
                        e('tbody', null,
                            pagedRules.map(function (rule, idx) {
                                var stt = startIdx + idx + 1;
                                return e('tr', {
                                    key: rule.id,
                                    className: 'border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer',
                                    onClick: function () { handleRowClick(rule); }
                                },
                                    e('td', { className: 'px-4 py-3 text-gray-500 text-center' }, stt),
                                    e('td', { className: 'px-4 py-3 font-medium text-[#006B68]' }, rule.ten),
                                    e('td', { className: 'px-4 py-3 text-gray-700' }, rule.loai),
                                    e('td', { className: 'px-4 py-3 text-gray-700' }, rule.donVi),
                                    e('td', { className: 'px-4 py-3' }, renderStatusBadge(rule.trangThai)),
                                    e('td', { className: 'px-4 py-3 text-gray-700' }, rule.buocApDung),
                                    e('td', { className: 'px-4 py-3 text-gray-500' }, rule.ngayCapNhat),
                                    e('td', { className: 'px-4 py-3 text-gray-700' }, rule.nguoiCapNhat),
                                    e('td', { className: 'px-4 py-3 text-center', onClick: function (ev) { ev.stopPropagation(); } },
                                        e('div', { className: 'flex items-center justify-center gap-2' },
                                            e('button', {
                                                className: 'w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-[#006B68] hover:bg-[#006B68]/10 transition-colors',
                                                title: 'Xem chi tiết',
                                                onClick: function () { handleRowClick(rule); }
                                            }, e('i', { className: 'fas fa-eye text-xs' })),
                                            e('button', {
                                                className: 'w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors',
                                                title: 'Chỉnh sửa'
                                            }, e('i', { className: 'fas fa-pen text-xs' })),
                                            e('button', {
                                                className: 'w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors',
                                                title: 'Xóa'
                                            }, e('i', { className: 'fas fa-trash text-xs' }))
                                        )
                                    )
                                );
                            })
                        )
                    )
                ),

                // ===== PAGINATION =====
                e('div', { className: 'flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-200 gap-3' },
                    // Items info
                    e('div', { className: 'text-xs text-gray-500' },
                        'Hiển thị ' + (startIdx + 1) + '-' + endIdx + ' trong tổng số ' + totalItems + ' quy tắc'
                    ),

                    e('div', { className: 'flex items-center gap-4' },
                        // Page size selector
                        e('div', { className: 'flex items-center gap-2' },
                            e('span', { className: 'text-xs text-gray-500' }, 'Hiển thị'),
                            e('select', {
                                className: 'px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:border-[#006B68]',
                                value: pageSize,
                                onChange: function (ev) { setPageSize(Number(ev.target.value)); }
                            },
                                e('option', { value: 10 }, '10'),
                                e('option', { value: 20 }, '20'),
                                e('option', { value: 50 }, '50')
                            ),
                            e('span', { className: 'text-xs text-gray-500' }, '/ trang')
                        ),

                        // Page navigation
                        e('div', { className: 'flex items-center gap-1' },
                            e('button', {
                                className: 'w-8 h-8 rounded-md flex items-center justify-center text-xs border border-gray-300 transition-colors ' +
                                    (currentPage > 1 ? 'text-gray-600 hover:bg-gray-50 cursor-pointer' : 'text-gray-300 cursor-not-allowed'),
                                onClick: currentPage > 1 ? function () { setCurrentPage(currentPage - 1); } : undefined,
                                disabled: currentPage <= 1
                            }, e('i', { className: 'fas fa-chevron-left' })),

                            // Page numbers
                            Array.from({ length: totalPages }, function (_, i) { return i + 1; }).map(function (page) {
                                return e('button', {
                                    key: page,
                                    className: 'w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium transition-colors ' +
                                        (page === currentPage
                                            ? 'bg-[#006B68] text-white'
                                            : 'text-gray-600 hover:bg-gray-100 border border-gray-300'),
                                    onClick: function () { setCurrentPage(page); }
                                }, page);
                            }),

                            e('button', {
                                className: 'w-8 h-8 rounded-md flex items-center justify-center text-xs border border-gray-300 transition-colors ' +
                                    (currentPage < totalPages ? 'text-gray-600 hover:bg-gray-50 cursor-pointer' : 'text-gray-300 cursor-not-allowed'),
                                onClick: currentPage < totalPages ? function () { setCurrentPage(currentPage + 1); } : undefined,
                                disabled: currentPage >= totalPages
                            }, e('i', { className: 'fas fa-chevron-right' }))
                        )
                    )
                )
            ) :
            // ===== EMPTY STATE =====
            e('div', { className: 'bg-white border border-gray-200 rounded-lg' },
                e('div', { className: 'flex flex-col items-center justify-center py-16 text-center' },
                    e('div', { className: 'w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4' },
                        e('i', { className: 'fas fa-search text-2xl text-gray-300' })
                    ),
                    e('p', { className: 'text-sm font-medium text-gray-500 mb-1' }, 'Không tìm thấy quy tắc nào'),
                    e('p', { className: 'text-xs text-gray-400' }, 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm')
                )
            )
    );
};
