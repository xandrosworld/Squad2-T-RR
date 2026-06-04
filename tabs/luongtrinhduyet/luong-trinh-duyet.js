// =====================================================
// Tab: Luồng trình duyệt (Rewritten - Clean)
// =====================================================

window.TabLuongTrinhDuyet = function () {
    const e = React.createElement;

    // ===== SEGMENT STATE =====
    const [activeSegment, setActiveSegment] = React.useState('luongTrinh');

    // ===== STATES =====
    const [thamQuyenPheDuyet, setThamQuyenPheDuyet] = React.useState('');
    const [confirmedThamQuyen, setConfirmedThamQuyen] = React.useState('');
    const [thamQuyenDropdownOpen, setThamQuyenDropdownOpen] = React.useState(false);
    const [pdfViewer, setPdfViewer] = React.useState(null);
    const [thamQuyenSearch, setThamQuyenSearch] = React.useState('');
    const [coSoTQPD, setCoSoTQPD] = React.useState('');
    const [showSuccessToast, setShowSuccessToast] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState('');
    const [dynamicSteps, setDynamicSteps] = React.useState([]);
    const [isSaved, setIsSaved] = React.useState(false);
    const [hasBeenSaved, setHasBeenSaved] = React.useState(false);

    // ===== DATA: Thẩm quyền options =====
    var thamQuyenOptions = [
        { value: 'lanh-dao-pgd', label: 'Lãnh đạo phòng giao dịch' },
        { value: 'pgd-qlkh-cn', label: 'PGĐ phụ trách QLKH (CN)' },
        { value: 'pgd-qlrr', label: 'PGĐ phụ trách QLRR' },
        { value: 'giam-doc-cn', label: 'Giám đốc Chi nhánh' },
        { value: 'hdtd-co-so', label: 'Hội đồng tín dụng cơ sở' },
        { value: 'hd-ccn-co-so', label: 'Hội đồng cơ cấu nợ cơ sở' },
        { value: 'tru-so-chinh', label: 'Trụ Sở Chính' }
    ];

    var filteredOptions = thamQuyenOptions.filter(function (opt) {
        return opt.label.toLowerCase().includes(thamQuyenSearch.toLowerCase());
    });

    var selectedLabel = '';
    for (var i = 0; i < thamQuyenOptions.length; i++) {
        if (thamQuyenOptions[i].value === thamQuyenPheDuyet) {
            selectedLabel = thamQuyenOptions[i].label;
            break;
        }
    }

    // ===== DATA: Luồng trình config theo thẩm quyền =====
    function getLuongTrinhConfig(thamQuyen) {
        var fixed = {
            tenBuoc: 'Lập BCDXTD',
            vaiTro: 'Cán bộ QLKH',
            nguoiXuLy: 'Nguyễn Trung Hiếu'
        };

        var configs = {
            'lanh-dao-pgd': {
                fixedStep: fixed,
                dynamicSteps: [
                    {
                        id: 'tham-dinh-td', tenBuoc: 'Thẩm định tín dụng',
                        defaultRole: 'Giám đốc Phòng Giao dịch/Phó Giám đốc Phòng Giao dịch',
                        roleOptions: ['Giám đốc Phòng Giao dịch/Phó Giám đốc Phòng Giao dịch'],
                        handlerOptions: ['Mai Tấn Thành', 'Trần Văn Bình', 'Lê Hoàng Nam']
                    },
                    {
                        id: 'phe-duyet-ctd', tenBuoc: 'Phê duyệt cấp tín dụng',
                        defaultRole: 'Giám đốc Phòng Giao dịch/Phó Giám đốc Phòng Giao dịch',
                        roleOptions: ['Giám đốc Phòng Giao dịch/Phó Giám đốc Phòng Giao dịch'],
                        handlerOptions: ['Mai Tấn Thành', 'Trần Văn Bình', 'Nguyễn Thị Hương']
                    }
                ]
            },
            'pgd-qlkh-cn': {
                fixedStep: fixed,
                dynamicSteps: [
                    {
                        id: 'tham-dinh-td', tenBuoc: 'Thẩm định tín dụng',
                        defaultRole: '', roleOptions: ['Trưởng phòng QLKH/Phó Trưởng phòng QLKH', 'Cán bộ thẩm định tín dụng'],
                        handlerOptions: ['Phạm Minh Tuấn', 'Mai Tấn Thành', 'Đỗ Quang Huy', 'Vũ Thị Mai']
                    },
                    {
                        id: 'phe-duyet-ctd', tenBuoc: 'Phê duyệt cấp tín dụng',
                        defaultRole: 'Phó Giám đốc phụ trách QLKH tại CN, HSC (KHDNL, ĐCTC)',
                        roleOptions: ['Phó Giám đốc phụ trách QLKH tại CN, HSC (KHDNL, ĐCTC)'],
                        handlerOptions: ['Lê Thanh Tùng', 'Nguyễn Đức Anh', 'Mai Tấn Thành']
                    }
                ]
            },
            'pgd-qlrr': {
                fixedStep: fixed,
                dynamicSteps: [
                    { id: 'tham-dinh-td', tenBuoc: 'Thẩm định tín dụng', defaultRole: '', roleOptions: ['Trưởng phòng QLKH/Phó Trưởng phòng QLKH', 'Cán bộ thẩm định tín dụng'], handlerOptions: ['Phạm Minh Tuấn', 'Trần Thị Ngọc', 'Đỗ Quang Huy'] },
                    { id: 'phe-duyet-bcdxtd', tenBuoc: 'Phê duyệt BCDXTD', defaultRole: 'Phó Giám đốc phụ trách QLKH tại CN, HSC (KHDNL, ĐCTC)', roleOptions: ['Phó Giám đốc phụ trách QLKH tại CN, HSC (KHDNL, ĐCTC)'], handlerOptions: ['Lê Thanh Tùng', 'Nguyễn Đức Anh', 'Mai Tấn Thành'] },
                    { id: 'lap-bctdrr', tenBuoc: 'Lập BCTĐRR', defaultRole: '', roleOptions: ['Cán bộ thẩm định rủi ro', 'Chuyên viên TTTĐPD'], handlerOptions: ['Hoàng Văn Sơn', 'Trần Kim Anh', 'Nguyễn Phương Linh'] },
                    { id: 'kiem-soat-bctdrr', tenBuoc: 'Kiểm soát BCTĐRR', defaultRole: 'Lãnh đạo phòng Quản lý rủi ro (Trưởng Phòng/Phó Trưởng phòng)', roleOptions: ['Lãnh đạo phòng Quản lý rủi ro (Trưởng Phòng/Phó Trưởng phòng)'], handlerOptions: ['Bùi Quốc Việt', 'Phan Thị Hà', 'Mai Tấn Thành'] },
                    { id: 'phe-duyet-bctdrr', tenBuoc: 'Phê duyệt BCTĐRR', defaultRole: 'Phó Giám đốc Chi nhánh phụ trách QLRR', defaultHandler: 'Nguyễn F', roleOptions: ['Phó Giám đốc Chi nhánh phụ trách QLRR'], handlerOptions: ['Nguyễn F', 'Lê Văn Đạt', 'Mai Tấn Thành'] },
                    { id: 'phe-duyet-ctd', tenBuoc: 'Phê duyệt cấp tín dụng', defaultRole: '', roleOptions: ['Phó Giám đốc Chi nhánh phụ trách QLRR', 'Giám đốc Chi nhánh/Ban tại HSC (KHDNL, ĐCTC)'], handlerOptions: ['Trần Quốc Bảo', 'Nguyễn Hữu Phước', 'Vũ Minh Châu'] }
                ]
            },
            'giam-doc-cn': {
                fixedStep: fixed,
                dynamicSteps: [
                    { id: 'tham-dinh-td', tenBuoc: 'Thẩm định tín dụng', defaultRole: '', roleOptions: ['Trưởng phòng QLKH/Phó Trưởng phòng QLKH', 'Cán bộ thẩm định tín dụng'], handlerOptions: ['Mai Tấn Thành', 'Phạm Minh Tuấn', 'Trần Thị Ngọc'] },
                    { id: 'phe-duyet-bcdxtd', tenBuoc: 'Phê duyệt BCDXTD', defaultRole: 'Phó Giám đốc phụ trách QLKH tại CN, HSC (KHDNL, ĐCTC)', roleOptions: ['Phó Giám đốc phụ trách QLKH tại CN, HSC (KHDNL, ĐCTC)'], handlerOptions: ['Lê Thanh Tùng', 'Nguyễn Đức Anh', 'Mai Tấn Thành'] },
                    { id: 'lap-bctdrr', tenBuoc: 'Lập BCTĐRR', defaultRole: '', roleOptions: ['Cán bộ thẩm định rủi ro', 'Chuyên viên TTTĐPD'], handlerOptions: ['Hoàng Văn Sơn', 'Trần Kim Anh', 'Nguyễn Phương Linh'] },
                    { id: 'kiem-soat-bctdrr', tenBuoc: 'Kiểm soát BCTĐRR', defaultRole: 'Lãnh đạo phòng Quản lý rủi ro (Trưởng Phòng/Phó Trưởng phòng)', roleOptions: ['Lãnh đạo phòng Quản lý rủi ro (Trưởng Phòng/Phó Trưởng phòng)'], handlerOptions: ['Bùi Quốc Việt', 'Phan Thị Hà', 'Đặng Hoàng Long'] },
                    { id: 'phe-duyet-ctd', tenBuoc: 'Phê duyệt cấp tín dụng', defaultRole: 'Giám đốc Chi nhánh/Ban tại HSC (KHDNL, ĐCTC)', defaultHandler: 'Mai Thị Lan', roleOptions: ['Giám đốc Chi nhánh/Ban tại HSC (KHDNL, ĐCTC)'], handlerOptions: ['Mai Thị Lan', 'Trần Quốc Bảo', 'Mai Tấn Thành'] }
                ]
            },
            'hdtd-co-so': {
                fixedStep: fixed,
                dynamicSteps: [
                    { id: 'tham-dinh-td', tenBuoc: 'Thẩm định tín dụng', defaultRole: '', roleOptions: ['Trưởng phòng QLKH/Phó Trưởng phòng QLKH', 'Cán bộ thẩm định tín dụng'], handlerOptions: ['Mai Tấn Thành', 'Phạm Minh Tuấn', 'Đỗ Quang Huy', 'Vũ Thị Mai'] },
                    { id: 'phe-duyet-bcdxtd', tenBuoc: 'Phê duyệt BCDXTD', defaultRole: 'Phó Giám đốc phụ trách QLKH tại CN, HSC (KHDNL, ĐCTC)', roleOptions: ['Phó Giám đốc phụ trách QLKH tại CN, HSC (KHDNL, ĐCTC)'], handlerOptions: ['Lê Thanh Tùng', 'Nguyễn Đức Anh', 'Mai Tấn Thành'] },
                    { id: 'lap-bctdrr', tenBuoc: 'Lập BCTĐRR', defaultRole: '', roleOptions: ['Cán bộ thẩm định rủi ro', 'Chuyên viên TTTĐPD'], handlerOptions: ['Hoàng Văn Sơn', 'Trần Kim Anh', 'Nguyễn Phương Linh'] },
                    { id: 'kiem-soat-bctdrr', tenBuoc: 'Kiểm soát BCTĐRR', defaultRole: 'Lãnh đạo phòng Quản lý rủi ro (Trưởng Phòng/Phó Trưởng phòng)', roleOptions: ['Lãnh đạo phòng Quản lý rủi ro (Trưởng Phòng/Phó Trưởng phòng)'], handlerOptions: ['Bùi Quốc Việt', 'Phan Thị Hà', 'Đặng Hoàng Long'] },
                    { id: 'phe-duyet-bctdrr', tenBuoc: 'Phê duyệt BCTĐRR', defaultRole: '', roleOptions: ['Phó Giám đốc Chi nhánh phụ trách QLRR', 'Giám đốc Chi nhánh/Ban tại HSC (KHDNL, ĐCTC)'], handlerOptions: ['Lê Văn Đạt', 'Nguyễn Hữu Phước', 'Mai Tấn Thành'] },
                    { id: 'phe-duyet-xl-khac-biet', tenBuoc: 'Phê duyệt xử lý khác biệt', defaultRole: 'Giám đốc Chi nhánh/Ban tại HSC (KHDNL, ĐCTC)', defaultHandler: 'Mai Thị Lan', roleOptions: ['Giám đốc Chi nhánh/Ban tại HSC (KHDNL, ĐCTC)'], handlerOptions: ['Mai Thị Lan', 'Trần Quốc Bảo', 'Mai Tấn Thành'] },
                    { id: 'xin-y-kien', tenBuoc: 'Xin ý kiến', defaultRole: 'Thư ký HĐTDCS', defaultHandler: 'Mai Thị Lan 2', roleOptions: ['Thư ký HĐTDCS'], handlerOptions: ['Mai Thị Lan 2', 'Nguyễn Hoa', 'Phạm Anh Dũng'] },
                    { id: 'phe-duyet-ctd', tenBuoc: 'Phê duyệt cấp tín dụng', defaultRole: '', roleOptions: ['Chủ tịch HĐTDCS', 'Thành viên HĐTDCS'], handlerOptions: ['Trần Quốc Bảo', 'Nguyễn Hữu Phước', 'Vũ Minh Châu', 'Mai Tấn Thành'] }
                ]
            },
            'hd-ccn-co-so': {
                fixedStep: fixed,
                dynamicSteps: [
                    { id: 'tham-dinh-td', tenBuoc: 'Thẩm định tín dụng', defaultRole: '', roleOptions: ['Trưởng phòng QLKH/Phó Trưởng phòng QLKH', 'Cán bộ thẩm định tín dụng'], handlerOptions: ['Phạm Minh Tuấn', 'Trần Thị Ngọc', 'Mai Tấn Thành', 'Đỗ Quang Huy'] },
                    { id: 'phe-duyet-bcdxtd', tenBuoc: 'Phê duyệt BCDXTD', defaultRole: 'Phó Giám đốc phụ trách QLKH tại CN, HSC (KHDNL, ĐCTC)', roleOptions: ['Phó Giám đốc phụ trách QLKH tại CN, HSC (KHDNL, ĐCTC)'], handlerOptions: ['Lê Thanh Tùng', 'Nguyễn Đức Anh', 'Mai Tấn Thành'] },
                    { id: 'lap-bctdrr', tenBuoc: 'Lập BCTĐRR', defaultRole: '', roleOptions: ['Cán bộ thẩm định rủi ro', 'Chuyên viên TTTĐPD'], handlerOptions: ['Hoàng Văn Sơn', 'Trần Kim Anh', 'Nguyễn Phương Linh'] },
                    { id: 'kiem-soat-bctdrr', tenBuoc: 'Kiểm soát BCTĐRR', defaultRole: 'Lãnh đạo phòng Quản lý rủi ro (Trưởng Phòng/Phó Trưởng phòng)', roleOptions: ['Lãnh đạo phòng Quản lý rủi ro (Trưởng Phòng/Phó Trưởng phòng)'], handlerOptions: ['Bùi Quốc Việt', 'Phan Thị Hà', 'Mai Tấn Thành'] },
                    { id: 'phe-duyet-bctdrr', tenBuoc: 'Phê duyệt BCTĐRR', defaultRole: '', roleOptions: ['Phó Giám đốc Chi nhánh phụ trách QLRR', 'Giám đốc Chi nhánh/Ban tại HSC (KHDNL, ĐCTC)'], handlerOptions: ['Lê Văn Đạt', 'Nguyễn Hữu Phước', 'Đặng Hoàng Long'] },
                    { id: 'xin-y-kien', tenBuoc: 'Xin ý kiến', defaultRole: 'Thư ký HĐCCNCS', defaultHandler: 'Nguyễn Hoa', roleOptions: ['Thư ký HĐCCNCS'], handlerOptions: ['Nguyễn Hoa', 'Phạm Anh Dũng', 'Mai Tấn Thành'] },
                    { id: 'phe-duyet-ctd', tenBuoc: 'Phê duyệt cấp tín dụng', defaultRole: '', roleOptions: ['Chủ tịch HĐCCNCS', 'Thành viên HĐCCNCS'], handlerOptions: ['Trần Quốc Bảo', 'Vũ Minh Châu', 'Nguyễn Hữu Phước', 'Mai Tấn Thành'] }
                ]
            },
            'tru-so-chinh': {
                fixedStep: fixed,
                dynamicSteps: [
                    { id: 'tham-dinh-td', tenBuoc: 'Thẩm định tín dụng', defaultRole: '', roleOptions: ['Trưởng phòng QLKH/Phó Trưởng phòng QLKH', 'Cán bộ thẩm định tín dụng'], handlerOptions: ['Mai Tấn Thành', 'Phạm Minh Tuấn', 'Trần Thị Ngọc', 'Đỗ Quang Huy'] },
                    { id: 'xem-xet-bcdxtd', tenBuoc: 'Xem xét, có ý kiến BCDXTD', defaultRole: 'Phó Giám đốc phụ trách QLKH tại CN, HSC (KHDNL, ĐCTC)', roleOptions: ['Phó Giám đốc phụ trách QLKH tại CN, HSC (KHDNL, ĐCTC)'], handlerOptions: ['Lê Thanh Tùng', 'Nguyễn Đức Anh', 'Mai Tấn Thành'] },
                    { id: 'phe-duyet-bcdxtd', tenBuoc: 'Phê duyệt BCDXTD', defaultRole: 'Giám đốc Chi nhánh/Ban tại HSC (KHDNL, ĐCTC)', defaultHandler: 'Mai Thị Lan', roleOptions: ['Giám đốc Chi nhánh/Ban tại HSC (KHDNL, ĐCTC)'], handlerOptions: ['Mai Thị Lan', 'Trần Quốc Bảo', 'Mai Tấn Thành'] },
                    { id: 'lap-bctdrr', tenBuoc: 'Lập BCTĐRR', defaultRole: 'Chuyên viên TTTĐPD', defaultHandler: 'Trần Kim Anh', roleOptions: ['Chuyên viên TTTĐPD'], handlerOptions: ['Trần Kim Anh', 'Hoàng Văn Sơn', 'Mai Tấn Thành'] }
                ]
            }
        };

        return configs[thamQuyen] || null;
    }

    // ===== HANDLERS =====
    function addStep(afterIndex) {
        var newStep = {
            id: 'step-' + Date.now(),
            tenBuoc: 'Bước xử lý mới',
            roleOptions: [
                'Giám đốc Phòng Giao dịch/Phó Giám đốc Phòng Giao dịch',
                'Cán bộ thẩm định tín dụng',
                'Trưởng phòng tín dụng',
                'Phó Giám đốc Chi nhánh'
            ],
            handlerOptions: [],
            selectedRole: '',
            selectedHandler: ''
        };
        var newSteps = dynamicSteps.slice();
        newSteps.splice(afterIndex + 1, 0, newStep);
        setDynamicSteps(newSteps);
    }

    function removeStep(index) {
        if (dynamicSteps.length <= 1) return;
        setDynamicSteps(dynamicSteps.filter(function (_, i) { return i !== index; }));
    }

    function updateStepField(index, field, value) {
        var newSteps = dynamicSteps.slice();
        newSteps[index] = Object.assign({}, newSteps[index]);
        newSteps[index][field] = value;
        setDynamicSteps(newSteps);
    }

    // Close dropdown on outside click
    React.useEffect(function () {
        function handleClickOutside(ev) {
            if (thamQuyenDropdownOpen) {
                var dropdown = document.getElementById('thamquyen-dropdown-container');
                if (dropdown && !dropdown.contains(ev.target)) {
                    setThamQuyenDropdownOpen(false);
                    setThamQuyenSearch('');
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return function () { document.removeEventListener('mousedown', handleClickOutside); };
    }, [thamQuyenDropdownOpen]);

    function showToast(msg) {
        setToastMessage(msg);
        setShowSuccessToast(true);
        setTimeout(function () { setShowSuccessToast(false); }, 3000);
    }

    function handleSave() {
        setIsSaved(true);
        setHasBeenSaved(true);
        if (window.setLuongTrinhSaved) window.setLuongTrinhSaved(true);
        showToast('Đã lưu thành công!');
    }

    function handleEdit() {
        setIsSaved(false);
        if (window.setLuongTrinhSaved) window.setLuongTrinhSaved(false);
    }

    function handleXacNhan() {
        if (!thamQuyenPheDuyet) {
            alert('Vui lòng chọn thẩm quyền phê duyệt');
            return;
        }
        setConfirmedThamQuyen(thamQuyenPheDuyet);
        var config = getLuongTrinhConfig(thamQuyenPheDuyet);
        if (config) {
            setDynamicSteps(config.dynamicSteps.map(function (step) {
                return Object.assign({}, step, {
                    selectedRole: step.defaultRole || '',
                    selectedHandler: step.defaultHandler || ''
                });
            }));
        }
        showToast('Đã xác nhận thẩm quyền phê duyệt');
        setTimeout(function () {
            var el = document.getElementById('block-luong-trinh-duyet');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
    }

    var confirmedConfig = confirmedThamQuyen ? getLuongTrinhConfig(confirmedThamQuyen) : null;

    // ===== DERIVED STATE =====
    var hasThamQuyenSelected = !!thamQuyenPheDuyet;
    var hasConfirmed = !!confirmedThamQuyen;
    var allStepsFilled = hasConfirmed && dynamicSteps.length > 0 && dynamicSteps.every(function (step) {
        return step.selectedRole && step.selectedHandler;
    });

    // ===== RENDER =====

    // ===== SEGMENT SWITCH: Render Phân bổ tự động =====
    // Keep this after every hook so switching segments never changes hook order.
    if (activeSegment === 'phanBo') {
        return e('div', { className: 'space-y-0' },
            e('div', { className: 'flex items-center bg-gray-100 rounded-lg p-1 mb-5' },
                e('button', {
                    className: 'px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700',
                    onClick: function () { setActiveSegment('luongTrinh'); }
                }, 'Thiết lập luồng trình'),
                e('button', {
                    className: 'px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-[#006B68]',
                    onClick: function () { setActiveSegment('phanBo'); }
                }, 'Phân bổ tự động')
            ),
            window.TabPhanBoTuDong ? e(window.TabPhanBoTuDong) : e('div', { className: 'text-sm text-gray-400 text-center py-8' }, 'Đang tải...')
        );
    }

    // ========================
    // SAVED (READ-ONLY) MODE
    // ========================
    if (isSaved) {
        return e('div', { className: 'space-y-0' },
            // SEGMENTED CONTROL
            e('div', { className: 'flex items-center bg-gray-100 rounded-lg p-1 mb-5' },
                e('button', {
                    className: 'px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-[#006B68]',
                    onClick: function () { setActiveSegment('luongTrinh'); }
                }, 'Thiết lập luồng trình'),
                e('button', {
                    className: 'px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700',
                    onClick: function () { setActiveSegment('phanBo'); }
                }, 'Phân bổ tự động')
            ),
            // HEADER: title + Chỉnh sửa button + Lịch sử phê duyệt
            e('div', { className: 'flex items-center gap-3 mb-5 pb-4 border-b border-gray-200' },
                e('h2', { className: 'text-lg font-bold text-gray-800' }, 'Luồng trình duyệt'),
                e('button', {
                    className: 'px-3.5 py-1.5 border border-gray-300 rounded-lg text-sm flex items-center gap-1.5 hover:bg-gray-50 transition-colors font-medium text-gray-700 bg-white',
                    onClick: handleEdit
                }, e('i', { className: 'fas fa-pen text-xs' }), 'Chỉnh sửa'),
                // Lịch sử phê duyệt button
                e('button', {
                    className: 'ml-auto px-5 py-2 rounded-full text-sm font-semibold text-white flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.03] active:scale-95',
                    style: { background: 'linear-gradient(135deg, #006B68 0%, #008B87 50%, #00A59E 100%)' },
                    onClick: function () { if (window.__showLichSuPopup) window.__showLichSuPopup(true); }
                }, e('i', { className: 'fas fa-history text-xs' }), 'Lịch sử phê duyệt')
            ),

            // Read-only: Thẩm quyền + TQPD
            e('div', { className: 'bg-white border border-gray-200 rounded-lg p-4 md:p-5 mb-5' },
                e('div', { className: 'mb-3' },
                    e('div', { className: 'text-xs text-gray-500 mb-0.5' }, 'Thẩm quyền phê duyệt'),
                    e('div', { className: 'text-sm font-medium text-gray-800' }, selectedLabel || '—')
                ),
                e('div', null,
                    e('div', { className: 'text-xs text-gray-500 mb-0.5' }, 'Cơ sở xác định TQPD'),
                    e('div', { className: 'text-sm text-gray-800' }, coSoTQPD || '—')
                )
            ),

            // Read-only: Chi tiết luồng trình
            confirmedConfig && e('div', null,
                e('div', { className: 'flex items-center gap-3 mb-4 pt-2 border-t border-gray-200' },
                    e('h3', { className: 'text-sm font-semibold text-gray-800 pt-3' }, 'Chi tiết luồng trình')
                ),
                e('div', { className: 'space-y-0 relative' },
                    e('div', { className: 'absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 z-0', style: { top: '20px', bottom: '20px' } }),
                    // Fixed step
                    e('div', { className: 'relative z-10 mb-4' },
                        e('div', { className: 'absolute left-0 top-0 w-8 h-8 rounded-full bg-[#006B68] text-white flex items-center justify-center text-xs font-bold z-20' }, '1'),
                        e('div', { className: 'ml-10 md:ml-12' },
                            e('div', { className: 'bg-[#e0f2f1] border border-[#b2dfdb] rounded-t-lg px-3 md:px-4 py-2' },
                                e('span', { className: 'text-sm font-bold text-gray-800' }, confirmedConfig.fixedStep.tenBuoc)
                            ),
                            e('div', { className: 'bg-[#e0f2f1] border border-t-0 border-[#b2dfdb] rounded-b-lg px-3 md:px-4 py-2 md:py-3' },
                                e('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6' },
                                    e('div', null, e('div', { className: 'text-xs text-gray-500 mb-0.5' }, 'Vai trò'), e('div', { className: 'text-sm font-medium text-gray-800' }, confirmedConfig.fixedStep.vaiTro)),
                                    e('div', null, e('div', { className: 'text-xs text-gray-500 mb-0.5' }, 'Người xử lý'), e('div', { className: 'text-sm font-medium text-gray-800' }, confirmedConfig.fixedStep.nguoiXuLy))
                                )
                            )
                        )
                    ),
                    // Dynamic steps (read-only)
                    dynamicSteps.map(function (step, idx) {
                        var stepNumber = idx + 2;
                        return e('div', { key: step.id, className: 'relative z-10 mb-4' },
                            e('div', { className: 'absolute left-0 top-0 w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-bold z-20' }, stepNumber),
                            e('div', { className: 'ml-10 md:ml-12' },
                                e('div', { className: 'bg-white border border-gray-200 rounded-t-lg px-3 md:px-4 py-2' },
                                    e('span', { className: 'text-sm font-bold text-gray-800' }, step.tenBuoc)
                                ),
                                e('div', { className: 'bg-white border border-t-0 border-gray-200 rounded-b-lg px-3 md:px-4 py-2 md:py-3' },
                                    e('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6' },
                                        e('div', null, e('div', { className: 'text-xs text-gray-500 mb-0.5' }, 'Vai trò'), e('div', { className: 'text-sm font-medium text-gray-800' }, step.selectedRole || '—')),
                                        e('div', null, e('div', { className: 'text-xs text-gray-500 mb-0.5' }, 'Người xử lý'), e('div', { className: 'text-sm font-medium text-gray-800' }, step.selectedHandler || '—'))
                                    )
                                )
                            )
                        );
                    })
                )
            ),

            // Toast
            showSuccessToast && e('div', {
                className: 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50',
                style: { animation: 'slideUp 0.3s ease' }
            },
                e('i', { className: 'fas fa-check-circle' }),
                e('span', null, toastMessage)
            )
        );
    }

    // ========================
    // EDIT MODE
    // ========================
    return e('div', { className: 'space-y-0' },

        // SEGMENTED CONTROL
        e('div', { className: 'flex items-center bg-gray-100 rounded-lg p-1 mb-5' },
            e('button', {
                className: 'px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-[#006B68]',
                onClick: function () { setActiveSegment('luongTrinh'); }
            }, 'Thiết lập luồng trình'),
            e('button', {
                className: 'px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700',
                onClick: function () { setActiveSegment('phanBo'); }
            }, 'Phân bổ tự động')
        ),

        // ============================================
        // HEADER: Luồng trình duyệt + Hủy/Lưu buttons
        // ============================================
        e('div', { className: 'flex items-center gap-3 mb-5 pb-4 border-b border-gray-200' },
            e('h2', { className: 'text-lg font-bold text-gray-800' }, 'Luồng trình duyệt'),
            e('div', { className: 'flex items-center gap-2' },
                hasBeenSaved && e('button', {
                    className: 'px-3.5 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 flex items-center gap-1.5 hover:bg-gray-50 transition-colors bg-white font-medium',
                    onClick: function () { setIsSaved(true); }
                }, e('i', { className: 'fas fa-times text-xs' }), 'Hủy'),
                e('button', {
                    className: 'px-3.5 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors font-medium ' +
                        (allStepsFilled
                            ? 'bg-[#006B68] text-white hover:bg-[#005a57] cursor-pointer'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'),
                    onClick: allStepsFilled ? handleSave : undefined,
                    disabled: !allStepsFilled
                }, e('i', { className: 'fas fa-save text-xs' }), 'Lưu')
            ),
            // Lịch sử phê duyệt button
            e('button', {
                className: 'ml-auto px-5 py-2 rounded-full text-sm font-semibold text-white flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.03] active:scale-95',
                style: { background: 'linear-gradient(135deg, #006B68 0%, #008B87 50%, #00A59E 100%)' },
                onClick: function () { if (window.__showLichSuPopup) window.__showLichSuPopup(true); }
            }, e('i', { className: 'fas fa-history text-xs' }), 'Lịch sử phê duyệt')
        ),

        // ============================================
        // SECTION 1: THẨM QUYỀN PHÊ DUYỆT
        // ============================================
        e('div', { className: 'bg-white border border-gray-200 rounded-lg p-4 md:p-5 mb-5' },
            e('div', null,
                e('label', { className: 'block text-sm font-medium text-gray-700 mb-1.5' },
                    'Thẩm quyền phê duyệt', e('span', { className: 'text-red-500 ml-0.5' }, ' *')
                ),
                e('div', { className: 'flex flex-col md:flex-row md:items-center gap-3' },
                    e('div', { id: 'thamquyen-dropdown-container', className: 'relative flex-1 md:max-w-[400px]' },
                        e('button', {
                            type: 'button',
                            className: 'w-full px-3 py-2.5 border rounded-lg text-sm bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors ' +
                                (thamQuyenDropdownOpen ? 'border-[#006B68] ring-2 ring-[#006B68]/20' : 'border-gray-300'),
                            onClick: function () { setThamQuyenDropdownOpen(!thamQuyenDropdownOpen); setThamQuyenSearch(''); }
                        },
                            e('span', { className: selectedLabel ? 'text-gray-800' : 'text-gray-400' }, selectedLabel || 'Chọn thẩm quyền'),
                            e('i', { className: 'fas fa-chevron-down text-gray-400 text-xs' })
                        ),
                        thamQuyenDropdownOpen && e('div', { className: 'absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50', style: { maxHeight: '320px' } },
                            e('div', { className: 'p-2 border-b border-gray-100' },
                                e('div', { className: 'relative' },
                                    e('i', { className: 'fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs' }),
                                    e('input', { type: 'text', className: 'w-full pl-8 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#006B68]', placeholder: 'Tìm kiếm', value: thamQuyenSearch, onChange: function (ev) { setThamQuyenSearch(ev.target.value); }, autoFocus: true })
                                )
                            ),
                            e('div', { className: 'overflow-auto', style: { maxHeight: '240px' } },
                                filteredOptions.map(function (opt) {
                                    return e('div', {
                                        key: opt.value,
                                        className: 'px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ' + (thamQuyenPheDuyet === opt.value ? 'bg-gray-50' : ''),
                                        onClick: function () { setThamQuyenPheDuyet(opt.value); setThamQuyenDropdownOpen(false); setThamQuyenSearch(''); }
                                    },
                                        e('span', { className: 'text-gray-700' }, opt.label),
                                        thamQuyenPheDuyet === opt.value && e('i', { className: 'fas fa-check text-[#006B68] text-sm' })
                                    );
                                }),
                                filteredOptions.length === 0 && e('div', { className: 'px-4 py-3 text-sm text-gray-400 text-center' }, 'Không tìm thấy kết quả')
                            )
                        )
                    ),
                    // Xác nhận button
                    e('div', { className: 'flex-1 flex justify-end' },
                        e('button', {
                            className: 'px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ' +
                                (hasThamQuyenSelected && thamQuyenPheDuyet !== confirmedThamQuyen
                                    ? 'bg-[#006B68] text-white hover:bg-[#005a57] cursor-pointer'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'),
                            onClick: (hasThamQuyenSelected && thamQuyenPheDuyet !== confirmedThamQuyen) ? handleXacNhan : undefined,
                            disabled: !hasThamQuyenSelected || thamQuyenPheDuyet === confirmedThamQuyen
                        }, 'Xác nhận')
                    )
                )
            )
        ),

        // ============================================
        // SECTION 2: CƠ SỞ XÁC ĐỊNH TQPD
        // ============================================
        hasThamQuyenSelected && e('div', { className: 'bg-white border border-gray-200 rounded-lg p-4 md:p-5 mb-5' },
            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1.5' },
                'Cơ sở xác định TQPD', e('span', { className: 'text-red-500 ml-0.5' }, ' *')
            ),
            e('textarea', {
                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white resize-none focus:outline-none focus:border-[#006B68] focus:ring-2 focus:ring-[#006B68]/20',
                placeholder: 'Nhập cơ sở...', value: coSoTQPD,
                onChange: function (ev) { if (ev.target.value.length <= 1000) setCoSoTQPD(ev.target.value); },
                rows: 3, maxLength: 1000
            }),
            e('div', { className: 'text-right mt-1 text-xs text-gray-400' }, coSoTQPD.length + '/1000')
        ),

        // ============================================
        // SECTION 3: CHI TIẾT LUỒNG TRÌNH / EMPTY STATE
        // ============================================
        hasConfirmed && confirmedConfig ? e('div', { id: 'block-luong-trinh-duyet' },
            e('div', { className: 'flex items-center gap-3 mb-4 pt-2 border-t border-gray-200' },
                e('h3', { className: 'text-sm font-semibold text-gray-800 pt-3' }, 'Chi tiết luồng trình')
            ),
            e('div', { className: 'space-y-0 relative' },
                e('div', { className: 'absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 z-0', style: { top: '20px', bottom: '20px' } }),
                e('div', { className: 'relative z-10 mb-4' },
                    e('div', { className: 'absolute left-0 top-0 w-8 h-8 rounded-full bg-[#006B68] text-white flex items-center justify-center text-xs font-bold z-20' }, '1'),
                    e('div', { className: 'ml-10 md:ml-12' },
                        e('div', { className: 'bg-[#e0f2f1] border border-[#b2dfdb] rounded-t-lg px-3 md:px-4 py-2 flex items-center justify-between' },
                            e('span', { className: 'text-sm font-bold text-gray-800' }, confirmedConfig.fixedStep.tenBuoc),
                            e('button', { className: 'w-6 h-6 rounded bg-white border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-xs', onClick: function () { addStep(-1); }, title: 'Thêm bước' }, '+')
                        ),
                        e('div', { className: 'bg-[#e0f2f1] border border-t-0 border-[#b2dfdb] rounded-b-lg px-3 md:px-4 py-2 md:py-3' },
                            e('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6' },
                                e('div', null, e('div', { className: 'text-xs text-gray-500 mb-0.5' }, 'Vai trò'), e('div', { className: 'text-sm font-medium text-gray-800' }, confirmedConfig.fixedStep.vaiTro)),
                                e('div', null, e('div', { className: 'text-xs text-gray-500 mb-0.5' }, 'Người xử lý'), e('div', { className: 'text-sm font-medium text-gray-800' }, confirmedConfig.fixedStep.nguoiXuLy))
                            )
                        )
                    )
                ),
                dynamicSteps.map(function (step, idx) {
                    var stepNumber = idx + 2;
                    return e('div', { key: step.id, className: 'relative z-10 mb-4' },
                        e('div', { className: 'absolute left-0 top-0 w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-bold z-20' }, stepNumber),
                        e('div', { className: 'ml-10 md:ml-12' },
                            e('div', { className: 'bg-[#e0f2f1] border border-[#b2dfdb] rounded-t-lg px-3 md:px-4 py-2 flex items-center justify-between' },
                                e('span', { className: 'text-sm font-bold text-gray-800' }, step.tenBuoc),
                                e('div', { className: 'flex items-center gap-1' },
                                    e('button', { className: 'w-6 h-6 rounded bg-white border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-xs', onClick: function () { addStep(idx); }, title: 'Thêm bước' }, '+'),
                                    e('button', { className: 'w-6 h-6 rounded bg-white border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-xs', onClick: function () { removeStep(idx); }, title: 'Xóa bước' }, '\u2212')
                                )
                            ),
                            e('div', { className: 'bg-white border border-t-0 border-gray-200 rounded-b-lg px-3 md:px-4 py-2 md:py-3' },
                                e('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4' },
                                    e('select', { className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:border-[#006B68]', value: step.selectedRole, onChange: function (ev) { updateStepField(idx, 'selectedRole', ev.target.value); } },
                                        e('option', { value: '' }, 'Chọn vai trò'),
                                        (step.roleOptions || []).map(function (role, rIdx) { return e('option', { key: rIdx, value: role }, role); })
                                    ),
                                    e('select', { className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:border-[#006B68]', value: step.selectedHandler, onChange: function (ev) { updateStepField(idx, 'selectedHandler', ev.target.value); } },
                                        e('option', { value: '' }, 'Chọn người xử lý'),
                                        (step.handlerOptions || []).map(function (handler, hIdx) { return e('option', { key: hIdx, value: handler }, handler); })
                                    )
                                )
                            )
                        )
                    );
                })
            )
        ) :
        // Empty state
        hasThamQuyenSelected && e('div', { className: 'flex flex-col items-center justify-center py-12 text-center' },
            e('div', { className: 'w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4' },
                e('i', { className: 'fas fa-file-alt text-2xl text-gray-300' })
            ),
            e('p', { className: 'text-sm text-gray-400' }, 'Hãy chọn thông tin để nhận gợi ý luồng trình duyệt tương ứng')
        ), // end SECTION 3

        // === 6. PDF VIEWER MODAL ===
        pdfViewer && e('div', {
            className: 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]',
            onClick: function () { setPdfViewer(null); }
        },
            e('div', {
                className: 'bg-white rounded-xl shadow-2xl w-[90%] max-w-[900px] max-h-[90vh] flex flex-col overflow-hidden',
                onClick: function (ev) { ev.stopPropagation(); },
                style: { animation: 'slideUp 0.3s ease' }
            },
                // Toolbar
                e('div', { className: 'flex items-center justify-between px-5 py-3 bg-gradient-to-r from-[#006B68] to-[#008B87] text-white flex-shrink-0' },
                    e('div', { className: 'flex items-center gap-3' },
                        e('div', { className: 'w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center' },
                            e('i', { className: 'fas fa-file-pdf text-sm' })
                        ),
                        e('div', null,
                            e('div', { className: 'font-semibold text-sm' }, pdfViewer.ten),
                            e('div', { className: 'text-xs text-white/70' }, 'Bước: ' + pdfViewer.buocXuLy + ' | STT: ' + pdfViewer.stt)
                        )
                    ),
                    e('div', { className: 'flex items-center gap-2' },
                        e('button', {
                            className: 'w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors',
                            title: 'Tải xuống'
                        }, e('i', { className: 'fas fa-download text-xs' })),
                        e('button', {
                            className: 'w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors',
                            title: 'In'
                        }, e('i', { className: 'fas fa-print text-xs' })),
                        e('button', {
                            className: 'w-8 h-8 rounded-lg bg-white/10 hover:bg-red-500/80 flex items-center justify-center transition-colors',
                            title: 'Đóng',
                            onClick: function () { setPdfViewer(null); }
                        }, e('i', { className: 'fas fa-times text-sm' }))
                    )
                ),

                // Document content
                e('div', { id: 'pdf-doc-content', className: 'flex-1 overflow-y-auto p-8 bg-gray-100' },
                    e('div', {
                        className: 'bg-white mx-auto shadow-lg border border-gray-200',
                        style: { maxWidth: '750px', minHeight: '900px', padding: '60px 50px', fontFamily: "'Times New Roman', serif" }
                    },
                        // BIDV Header
                        e('div', { className: 'text-center mb-6', style: { borderBottom: '3px double #006B68', paddingBottom: '16px' } },
                            e('div', { style: { fontSize: '13px', fontWeight: 'bold', color: '#006B68', letterSpacing: '1px' } }, 'NGÂN HÀNG TMCP ĐẦU TƯ VÀ PHÁT TRIỂN VIỆT NAM'),
                            e('div', { style: { fontSize: '11px', color: '#666', marginTop: '2px' } }, 'BANK FOR INVESTMENT AND DEVELOPMENT OF VIETNAM (BIDV)'),
                            e('div', { style: { fontSize: '11px', color: '#666', marginTop: '4px' } }, 'Chi nhánh Tây Hồ - Mã CN: 10021')
                        ),
                        // Title
                        e('div', { className: 'text-center mb-6' },
                            e('h1', { style: { fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a', textTransform: 'uppercase', margin: '16px 0 4px' } },
                                pdfViewer.loai === 'bien-ban' ? 'BIÊN BẢN HỌP VÀ QUYẾT ĐỊNH' :
                                    pdfViewer.loai === 'to-trinh' ? 'TỜ TRÌNH ĐỀ XUẤT CẤP TÍN DỤNG' :
                                        'BÁO CÁO THẨM ĐỊNH RỦI RO'
                            ),
                            e('div', { style: { fontSize: '12px', color: '#666', fontStyle: 'italic' } }, 'Số BC: 19203945 – Ngày: 16/03/2034')
                        ),
                        // Metadata table
                        e('table', { style: { width: '100%', fontSize: '13px', marginBottom: '20px', borderCollapse: 'collapse' } },
                            e('tbody', null,
                                e('tr', null,
                                    e('td', { style: { padding: '6px 0', width: '160px', color: '#555', fontWeight: 'bold' } }, 'Loại tài liệu:'),
                                    e('td', { style: { padding: '6px 0' } }, pdfViewer.ten)
                                ),
                                e('tr', null,
                                    e('td', { style: { padding: '6px 0', color: '#555', fontWeight: 'bold' } }, 'Người tạo:'),
                                    e('td', { style: { padding: '6px 0' } }, pdfViewer.nguoiXuLy || 'Nguyễn Văn A - CB QLKH')
                                ),
                                e('tr', null,
                                    e('td', { style: { padding: '6px 0', color: '#555', fontWeight: 'bold' } }, 'Ngày tạo:'),
                                    e('td', { style: { padding: '6px 0' } }, pdfViewer.thoiGian || '16/03/2034')
                                ),
                                e('tr', null,
                                    e('td', { style: { padding: '6px 0', color: '#555', fontWeight: 'bold' } }, 'Trạng thái:'),
                                    e('td', { style: { padding: '6px 0' } },
                                        e('span', { style: { background: '#e8f5e9', color: '#2e7d32', padding: '2px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' } }, 'Đã phê duyệt')
                                    )
                                )
                            )
                        ),
                        e('hr', { style: { border: 'none', borderTop: '1px solid #ddd', margin: '16px 0' } }),

                        // === Document body by type ===
                        pdfViewer.loai === 'bien-ban' ? e('div', { style: { fontSize: '13px', lineHeight: '1.8', color: '#333' } },
                            e('p', { style: { fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' } }, 'I. THÔNG TIN KHÁCH HÀNG'),
                            e('table', { style: { width: '100%', marginBottom: '16px', borderCollapse: 'collapse' } },
                                e('tbody', null,
                                    [['Tên khách hàng', 'Công ty CP Tập đoàn Hòa Phát'], ['Mã số thuế', '0100100100'], ['Địa chỉ', '39 Nguyễn Đình Chiểu, Quận 1, TP.HCM'], ['Ngành nghề', 'Sản xuất thép và vật liệu xây dựng'], ['Số CIF', '19203945']].map(function (item, i) {
                                        return e('tr', { key: i },
                                            e('td', { style: { padding: '4px 0', width: '180px', color: '#555' } }, '• ' + item[0] + ':'),
                                            e('td', { style: { padding: '4px 0', fontWeight: '500' } }, item[1])
                                        );
                                    })
                                )
                            ),
                            e('p', { style: { fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' } }, 'II. NỘI DUNG ĐỀ XUẤT CẤP TÍN DỤNG'),
                            e('table', { style: { width: '100%', marginBottom: '16px', borderCollapse: 'collapse' } },
                                e('tbody', null,
                                    [['Hạn mức đề xuất', '500.000.000.000 VNĐ'], ['Thời hạn', '36 tháng'], ['Lãi suất', '8.5%/năm'], ['Mục đích', 'Bổ sung vốn lưu động phục vụ sản xuất kinh doanh'], ['Phương thức giải ngân', 'Chuyển khoản theo tiến độ']].map(function (item, i) {
                                        return e('tr', { key: i },
                                            e('td', { style: { padding: '4px 0', width: '180px', color: '#555' } }, '• ' + item[0] + ':'),
                                            e('td', { style: { padding: '4px 0', fontWeight: '500' } }, item[1])
                                        );
                                    })
                                )
                            ),
                            e('p', { style: { fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' } }, 'III. QUYẾT ĐỊNH'),
                            e('p', null, 'Hội đồng tín dụng nhất trí phê duyệt cấp tín dụng theo đề xuất với các điều kiện đã nêu.'),
                            e('p', { style: { marginTop: '4px' } }, 'Kết quả biểu quyết: ', e('strong', null, 'Đồng ý 5/5 thành viên'), '.')
                        ) :

                            pdfViewer.loai === 'to-trinh' ? e('div', { style: { fontSize: '13px', lineHeight: '1.8', color: '#333' } },
                                e('p', { style: { marginBottom: '12px' } }, 'Kính gửi: ', e('strong', null, 'Ban Giám đốc Chi nhánh Tây Hồ')),
                                e('p', { style: { fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' } }, 'I. CĂN CỨ ĐỀ XUẤT'),
                                e('p', null, '- Căn cứ Quy chế cho vay số 1050/QĐ-BIDV ngày 15/06/2033;'),
                                e('p', null, '- Căn cứ nhu cầu vay vốn của Công ty CP Tập đoàn Hòa Phát;'),
                                e('p', null, '- Căn cứ kết quả thẩm định tín dụng và thẩm định rủi ro;'),
                                e('p', { style: { fontWeight: 'bold', fontSize: '14px', margin: '16px 0 8px' } }, 'II. NỘI DUNG ĐỀ XUẤT'),
                                e('p', null, 'Phòng Quản lý khách hàng kính trình Ban Giám đốc xem xét, phê duyệt cấp tín dụng với nội dung sau:'),
                                e('table', { style: { width: '100%', margin: '12px 0', borderCollapse: 'collapse', border: '1px solid #ddd' } },
                                    e('thead', null,
                                        e('tr', { style: { background: '#f5f5f5' } },
                                            e('th', { style: { padding: '8px 12px', border: '1px solid #ddd', fontSize: '12px', textAlign: 'left' } }, 'Nội dung'),
                                            e('th', { style: { padding: '8px 12px', border: '1px solid #ddd', fontSize: '12px', textAlign: 'left' } }, 'Chi tiết')
                                        )
                                    ),
                                    e('tbody', null,
                                        [['Hạn mức tín dụng', '500.000.000.000 VNĐ'], ['Thời hạn cấp TD', '36 tháng'], ['Lãi suất cho vay', '8.5%/năm'], ['TSĐB', 'BĐS tại 39 Nguyễn Đình Chiểu, Q1'], ['Giá trị TSĐB', '800.000.000.000 VNĐ'], ['Tỷ lệ TSĐB/Dư nợ', '160%']].map(function (item, i) {
                                            return e('tr', { key: i },
                                                e('td', { style: { padding: '6px 12px', border: '1px solid #ddd', fontSize: '12px', fontWeight: '500' } }, item[0]),
                                                e('td', { style: { padding: '6px 12px', border: '1px solid #ddd', fontSize: '12px' } }, item[1])
                                            );
                                        })
                                    )
                                ),
                                e('p', { style: { fontWeight: 'bold', fontSize: '14px', margin: '16px 0 8px' } }, 'III. KIẾN NGHỊ'),
                                e('p', null, 'Kính đề nghị Ban Giám đốc xem xét và phê duyệt cấp tín dụng theo nội dung trên.')
                            ) :

                                // BCTĐRR
                                e('div', { style: { fontSize: '13px', lineHeight: '1.8', color: '#333' } },
                                    e('p', { style: { fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' } }, 'I. THÔNG TIN CHUNG'),
                                    e('p', null, 'Khách hàng: ', e('strong', null, 'Công ty CP Tập đoàn Hòa Phát')),
                                    e('p', null, 'Hạn mức đề xuất: ', e('strong', null, '500.000.000.000 VNĐ')),
                                    e('p', { style: { fontWeight: 'bold', fontSize: '14px', margin: '16px 0 8px' } }, 'II. ĐÁNH GIÁ RỦI RO'),
                                    e('table', { style: { width: '100%', margin: '12px 0', borderCollapse: 'collapse', border: '1px solid #ddd' } },
                                        e('thead', null,
                                            e('tr', { style: { background: '#f5f5f5' } },
                                                e('th', { style: { padding: '8px 12px', border: '1px solid #ddd', fontSize: '12px', textAlign: 'left' } }, 'Tiêu chí'),
                                                e('th', { style: { padding: '8px 12px', border: '1px solid #ddd', fontSize: '12px', textAlign: 'center', width: '100px' } }, 'Điểm'),
                                                e('th', { style: { padding: '8px 12px', border: '1px solid #ddd', fontSize: '12px', textAlign: 'left' } }, 'Đánh giá')
                                            )
                                        ),
                                        e('tbody', null,
                                            [['Rủi ro tín dụng', '85/100', 'Thấp'], ['Rủi ro thị trường', '78/100', 'Trung bình'], ['Rủi ro hoạt động', '90/100', 'Thấp'], ['Rủi ro pháp lý', '92/100', 'Rất thấp'], ['Rủi ro TSĐB', '88/100', 'Thấp']].map(function (item, i) {
                                                var riskLevel = item[2];
                                                var isLow = riskLevel === 'Thấp' || riskLevel === 'Rất thấp';
                                                return e('tr', { key: i },
                                                    e('td', { style: { padding: '6px 12px', border: '1px solid #ddd', fontSize: '12px' } }, item[0]),
                                                    e('td', { style: { padding: '6px 12px', border: '1px solid #ddd', fontSize: '12px', textAlign: 'center', fontWeight: 'bold', color: '#006B68' } }, item[1]),
                                                    e('td', { style: { padding: '6px 12px', border: '1px solid #ddd', fontSize: '12px' } },
                                                        e('span', { style: { background: isLow ? '#e8f5e9' : '#fff3e0', color: isLow ? '#2e7d32' : '#e65100', padding: '1px 8px', borderRadius: '3px', fontSize: '11px' } }, riskLevel)
                                                    )
                                                );
                                            })
                                        )
                                    ),
                                    e('p', { style: { fontWeight: 'bold', fontSize: '14px', margin: '16px 0 8px' } }, 'III. KẾT LUẬN VÀ KIẾN NGHỊ'),
                                    e('p', null, 'Tổng điểm đánh giá rủi ro: ', e('strong', { style: { color: '#006B68' } }, '86.6/100'), ' - Mức rủi ro: ', e('strong', { style: { color: '#2e7d32' } }, 'THẤP')),
                                    e('p', null, 'Kiến nghị: Đồng ý cấp tín dụng theo đề xuất. Khách hàng đáp ứng đủ điều kiện theo quy định.')
                                ),

                        // Signatures
                        e('div', { style: { marginTop: '40px', display: 'flex', justifyContent: 'space-between' } },
                            e('div', { style: { textAlign: 'center', width: '45%' } },
                                e('p', { style: { fontSize: '12px', fontWeight: 'bold', marginBottom: '60px' } }, 'NGƯỜI LẬP'),
                                e('p', { style: { fontSize: '12px', fontStyle: 'italic', color: '#999' } }, '(Đã ký điện tử)'),
                                e('p', { style: { fontSize: '13px', fontWeight: 'bold', marginTop: '4px' } },
                                    pdfViewer.nguoiXuLy ? pdfViewer.nguoiXuLy.split('(')[0].trim() : 'Nguyễn Văn A'
                                )
                            ),
                            e('div', { style: { textAlign: 'center', width: '45%' } },
                                e('p', { style: { fontSize: '12px', fontWeight: 'bold', marginBottom: '60px' } }, 'PHÊ DUYỆT'),
                                e('p', { style: { fontSize: '12px', fontStyle: 'italic', color: '#999' } }, '(Đã ký điện tử)'),
                                e('p', { style: { fontSize: '13px', fontWeight: 'bold', marginTop: '4px' } }, 'Mai Thị Lan')
                            )
                        ),
                        // Footer
                        e('div', { style: { marginTop: '40px', paddingTop: '12px', borderTop: '1px solid #ddd', textAlign: 'center', fontSize: '10px', color: '#999' } },
                            'Tài liệu được tạo tự động bởi Hệ thống LendingHub – BIDV © 2034 – Trang 1/1'
                        )
                    )
                )
            )
        ),

        // === 7. TOAST ===
        showSuccessToast && e('div', {
            className: 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50',
            style: { animation: 'slideUp 0.3s ease' }
        },
            e('i', { className: 'fas fa-check-circle' }),
            e('span', null, toastMessage)
        )
    );
};
