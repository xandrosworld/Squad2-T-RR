// =====================================================
// Tab: Thông tin tài chính
// =====================================================

window.TabThongTinTaiChinh = function () {
    const e = React.createElement;

    // States
    const [activeSubTab, setActiveSubTab] = React.useState('danhGiaTaiChinh');
    const [activeChiTieuTab, setActiveChiTieuTab] = React.useState('quanTrong');

    // Collapsible sections state
    const [openSections, setOpenSections] = React.useState({ baoCaoTC: false, bieuDoTC: false, chiTieuTC: false, danhGiaTC: false });
    const toggleTCSection = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

    // Filter states
    const [mauBaoCao, setMauBaoCao] = React.useState('200/2014/TT-BTC');
    const [loaiBaoCao, setLoaiBaoCao] = React.useState('riengLe');
    const [showKyDropdown, setShowKyDropdown] = React.useState(false);

    // Available periods data
    const availableNam = [
        { id: '2022-nb', label: '31/12/2022' },
        { id: '2023-kt', label: '31/12/2023' },
        { id: '2024-sx', label: '31/12/2024' }
    ];

    const availableQuy = [
        { id: 'q1-2024-sx', label: '31/03/2024' },
        { id: 'q2-2024-nb', label: '30/06/2024' },
        { id: 'q3-2024-sx', label: '30/09/2024' },
        { id: 'q4-2024-nb', label: '31/12/2024' },
        { id: 'q1-2023-kt', label: '31/03/2023' }
    ];

    const [selectedPeriods, setSelectedPeriods] = React.useState(['2022-nb', '2023-kt', '2024-sx']);

    // Applied filter for display
    const [appliedPeriods, setAppliedPeriods] = React.useState(['31/12/2022', '31/12/2023', '31/12/2024']);

    // Danh sách chỉ tiêu đã chọn trong phần Ý kiến TĐRR
    const [chiTieuRows, setChiTieuRows] = React.useState([{ id: 1, chiTieu: '', values: [] }]);

    // Danh mục chỉ tiêu từ BCTC
    const danhMucChiTieu = {
        'Bảng cân đối kế toán': [
            { ma: 'TTS', ten: 'Tổng tài sản', values: ['666.165', '648.983', '675.873'] },
            { ma: 'TSNH', ten: 'Tài sản ngắn hạn', values: ['168.939', '171.322', '188.755'] },
            { ma: 'HTK', ten: 'Hàng tồn kho', values: ['21.283', '25.674', '24.625'] },
            { ma: 'PTNH', ten: 'Phải thu ngắn hạn', values: ['34.057', '47.740', '53.824'] },
            { ma: 'NPT', ten: 'Nợ phải trả', values: ['440.815', '452.849', '474.631'] },
            { ma: 'VCSH', ten: 'Vốn chủ sở hữu', values: ['225.350', '196.134', '201.242'] }
        ],
        'Báo cáo KQHĐKD': [
            { ma: 'DTT', ten: 'Doanh thu thuần', values: ['463.000', '500.720', '580.537'] },
            { ma: 'GVHB', ten: 'Giá vốn hàng bán', values: ['452.420', '487.678', '530.949'] },
            { ma: 'LNG', ten: 'Lợi nhuận gộp', values: ['10.580', '13.042', '49.588'] },
            { ma: 'CPLV', ten: 'Chi phí lãi vay', values: ['14.504', '18.986', '17.039'] },
            { ma: 'LNST', ten: 'Lợi nhuận sau thuế', values: ['-20.747', '-26.772', '8.238'] }
        ]
    };

    const togglePeriod = (id) => {
        if (selectedPeriods.includes(id)) {
            setSelectedPeriods(selectedPeriods.filter(p => p !== id));
        } else {
            setSelectedPeriods([...selectedPeriods, id]);
        }
    };

    const resetPeriods = () => {
        setSelectedPeriods([]);
    };

    const applyFilter = () => {
        // Map selected periods to display columns
        const periodLabels = [];
        selectedPeriods.forEach(id => {
            const nam = availableNam.find(n => n.id === id);
            const quy = availableQuy.find(q => q.id === id);
            if (nam) periodLabels.push(nam.label);
            if (quy) periodLabels.push(quy.label);
        });
        if (periodLabels.length > 0) {
            setAppliedPeriods(periodLabels);
        }
        setShowKyDropdown(false);
    };

    // Left sidebar subtabs
    const subTabs = [
        { id: 'baoCaoTaiChinh', label: 'Báo cáo tài chính' },
        { id: 'bieuDoTaiChinh', label: 'Biểu đồ tài chính' },
        { id: 'chiTieuTaiChinh', label: 'Chỉ tiêu tài chính' },
        { id: 'danhGiaTaiChinh', label: 'Đánh giá tài chính' }
    ];

    // Generate data based on applied periods
    const generateValues = (baseValues) => {
        return appliedPeriods.map((_, idx) => baseValues[idx % baseValues.length]);
    };

    const getPeriodYear = (period) => (period.match(/\d{4}/) || ['2024'])[0];
    const getPeriodDate = (period) => {
        const dateMatch = period.match(/\d{2}\/\d{2}\/\d{4}/);
        return dateMatch ? dateMatch[0] : '31/12/' + getPeriodYear(period);
    };

    // Sample data cho Bảng cân đối kế toán - Tài sản
    const taiSanData = [
        {
            id: 1, name: 'A. Tài sản ngắn hạn', ma: 'TSNH', strong: true, values: generateValues(['168.939', '171.322', '188.755']), children: [
                { id: 11, name: 'Tiền và tương đương tiền', ma: 'TM&TĐT', values: generateValues(['38.641', '36.498', '17.185']) },
                { id: 12, name: 'Đầu tư tài chính ngắn hạn', ma: 'ĐTTCNH', values: generateValues(['62.896', '44.780', '74.110']) },
                { id: 13, name: 'Phải thu ngắn hạn', ma: 'PTNH', values: generateValues(['34.057', '47.740', '53.824']) },
                { id: 14, name: 'Hàng tồn kho', ma: 'HTK', values: generateValues(['21.283', '25.674', '24.625']) },
                { id: 15, name: 'Tài sản ngắn hạn khác', ma: 'TSNHK', values: generateValues(['12.062', '16.630', '19.010']) }
            ]
        },
        {
            id: 2, name: 'B. Tài sản dài hạn', ma: 'TSDH', strong: true, values: generateValues(['497.226', '477.662', '487.118']), children: [
                { id: 21, name: 'Phải thu dài hạn', ma: 'PTDH', values: generateValues(['221', '247', '191']) },
                { id: 22, name: 'Tài sản cố định', ma: 'TSCĐ', values: generateValues(['436.734', '408.711', '402.035']) },
                { id: 23, name: 'Bất động sản đầu tư', ma: 'BĐSĐT', values: generateValues(['21', '21', '21']) },
                { id: 24, name: 'Tài sản dở dang dài hạn', ma: 'TSDDDH', values: generateValues(['40.472', '48.396', '63.398']) },
                { id: 25, name: 'Đầu tư tài chính dài hạn', ma: 'ĐTTCDH', values: generateValues(['7.209', '7.064', '7.169']) },
                { id: 26, name: 'Tài sản dài hạn khác', ma: 'TSDHK', values: generateValues(['12.568', '13.224', '14.303']) }
            ]
        },
        { id: 3, name: 'Tổng tài sản', ma: 'TTS', strong: true, values: generateValues(['666.165', '648.983', '675.873']), children: [] }
    ];

    // Sample data cho Nguồn vốn
    const nguonVonData = [
        {
            id: 4, name: 'C. Nợ phải trả', ma: 'NPT', strong: true, values: generateValues(['440.815', '452.849', '474.631']), children: [
                {
                    id: 41, name: 'Nợ ngắn hạn', ma: 'NNH', values: generateValues(['159.960', '185.459', '195.717']), children: [
                        { id: 411, name: 'Phải trả người bán ngắn hạn', ma: 'PTNB', values: generateValues(['79.144', '96.593', '111.758']) }
                    ]
                },
                {
                    id: 42, name: 'Nợ dài hạn', ma: 'NDH', values: generateValues(['280.855', '267.390', '278.914']), children: [
                        { id: 421, name: 'Phải trả người bán dài hạn', ma: 'PTNBDH', values: generateValues(['483', '574', '583']) }
                    ]
                }
            ]
        },
        {
            id: 5, name: 'D. Vốn chủ sở hữu', ma: 'VCSH', strong: true, values: generateValues(['225.350', '196.134', '201.242']), children: [
                { id: 51, name: 'Vốn góp của chủ sở hữu', ma: 'VGCSH', values: generateValues(['225.397', '196.133', '201.241']) }
            ]
        },
        { id: 6, name: 'Tổng nguồn vốn', ma: 'TNV', strong: true, values: generateValues(['666.165', '648.983', '675.873']), children: [] }
    ];

    // Sample data cho Kết quả hoạt động kinh doanh
    const ketQuaKinhDoanhData = [
        { id: 8, name: 'Doanh thu thuần', ma: 'DTT', strong: true, values: generateValues(['463.000', '500.720', '580.537']), children: [] },
        { id: 9, name: 'Giá vốn hàng bán', ma: 'GVHB', values: generateValues(['452.420', '487.678', '530.949']), children: [] },
        {
            id: 10, name: 'Lợi nhuận gộp', ma: 'LNG', strong: true, values: generateValues(['10.580', '13.042', '49.588']), children: [
                { id: 11, name: 'Lợi nhuận hoạt động tài chính', ma: 'LNHDTC', values: generateValues(['-10.810', '-18.621', '-18.699']) },
                { id: 12, name: 'Chi phí lãi vay', ma: 'CPLV', values: generateValues(['14.504', '18.986', '17.039']) },
                { id: 13, name: 'Chi phí bán hàng', ma: 'CPBH', values: generateValues(['6.173', '6.601', '7.309']) },
                { id: 14, name: 'Chi phí quản lý doanh nghiệp', ma: 'CPQL', values: generateValues(['14.381', '14.800', '15.734']) },
                { id: 15, name: 'Lợi nhuận thuần từ HĐKD', ma: 'LNTHD', strong: true, values: generateValues(['-19.516', '-25.970', '8.661']) },
                { id: 17, name: 'Lợi nhuận trước thuế', ma: 'LNTT', strong: true, values: generateValues(['-18.613', '-25.565', '9.437']) }
            ]
        },
        { id: 18, name: 'Lợi nhuận sau thuế', ma: 'LNST', strong: true, values: generateValues(['-20.747', '-26.772', '8.238']), children: [] }
    ];

    // Sample data cho Lưu chuyển tiền tệ
    const luuChuyenTienTeData = [
        {
            id: 700,
            name: 'Lưu Chuyển Tiền Từ Hoạt Động Kinh Doanh',
            ma: 'LC_HDKD',
            strong: true,
            values: generateValues(['47.287', '47.936', '75.004']),
            children: [
                { id: 701, name: 'Lợi nhuận trước thuế', ma: 'LNTT', values: generateValues(['(18.613)', '(25.565)', '9.437']) },
                { id: 702, name: 'Điều chỉnh cho các khoản', ma: 'DCCK', strong: true, values: generateValues(['', '', '']) },
                { id: 703, name: 'Khấu hao và phân bổ', ma: 'KHPB', values: generateValues(['68.959', '68.915', '69.913']) },
                { id: 704, name: 'Các khoản dự phòng', ma: 'DP', values: generateValues(['569', '72', '40']) },
                { id: 705, name: '(Lãi) lỗ chênh lệch tỷ giá hối đoái chưa thực hiện', ma: 'CLTG', values: generateValues(['(209)', '3.050', '3.547']) },
                { id: 706, name: '(Lãi) Lỗ Từ Hoạt Động Đầu Tư', ma: 'LLHDDT', values: generateValues(['(5.377)', '(4.643)', '(3.444)']) },
                { id: 707, name: 'Chi Phí Lãi Vay', ma: 'CPLV', values: generateValues(['14.504', '18.986', '17.039']) },
                { id: 708, name: 'Lợi nhuận từ hoạt động kinh doanh trước thay đổi vốn lưu động', ma: 'LNTVLĐ', strong: true, values: generateValues(['59.832', '60.814', '96.531']) },
                { id: 709, name: '(Tăng) / giảm các khoản phải thu', ma: 'PT', values: generateValues(['(12.550)', '(17.625)', '(5.582)']) },
                { id: 710, name: '(Tăng) / giảm hàng tồn kho', ma: 'HTK', values: generateValues(['2.775', '(4.121)', '1.053']) },
                { id: 711, name: '(Tăng) / Giảm Các Khoản Phải Trả', ma: 'PTra', values: generateValues(['18.991', '31.786', '6.692']) },
                { id: 712, name: '(Tăng) / giảm chi phí trả trước', ma: 'CPTT', values: generateValues(['(2.450)', '(533)', '(854)']) },
                { id: 713, name: 'Tiền Lãi Vay Đã Trả', ma: 'TLVDT', values: generateValues(['(13.333)', '(18.366)', '(17.950)']) },
                { id: 714, name: 'Thuế Thu Nhập Doanh Nghiệp Đã Nộp', ma: 'TTNDN', values: generateValues(['(2.978)', '(1.598)', '(1.025)']) },
                { id: 715, name: 'Tiền Chi Khác Cho Hoạt Động Kinh Doanh', ma: 'TCKHDKD', values: generateValues(['(3.000)', '(2.422)', '(2.862)']) }
            ]
        },
        {
            id: 720,
            name: 'Lưu Chuyển Tiền Từ Hoạt Động Đầu Tư',
            ma: 'LC_HDDT',
            strong: true,
            values: generateValues(['(14.471)', '(26.227)', '(102.702)']),
            children: [
                { id: 721, name: 'Tiền Chi Để Mua Sắm, Xây Dựng TSCĐ Và Các Tài Sản Dài Hạn Khác', ma: 'MS_TSCĐ', values: generateValues(['(48.805)', '(48.384)', '(76.198)']) },
                { id: 722, name: 'Tiền Thu Từ Thanh Lý, Nhượng Bán TSCĐ Và Các Tài Sản Dài Hạn Khác', ma: 'TL_TSCĐ', values: generateValues(['212', '247', '439']) },
                { id: 723, name: 'Tiền Chi Cho Vay, Mua Các Công Cụ Nợ Của Đơn Vị Khác', ma: 'CV_CCN', values: generateValues(['(62.957)', '(44.810)', '(74.110)']) },
                { id: 724, name: 'Tiền Thu Hồi Cho Vay, Bán Lại Các Công Cụ Nợ Của Đơn Vị Khác', ma: 'TH_CCN', values: generateValues(['93.140', '62.957', '44.780']) },
                { id: 725, name: 'Tiền Chi Đầu Tư Góp Vốn Vào Đơn Vị Khác', ma: 'DTGV', values: generateValues(['(76)', '(94)', '(26)']) },
                { id: 726, name: 'Tiền Thu Hồi Đầu Tư Góp Vốn Vào Đơn Vị Khác', ma: 'THDTGV', values: generateValues(['5', '30', '2']) },
                { id: 727, name: 'Tiền Thu Lãi Cho Vay, Cổ Tức Và Lợi Nhuận Được Chia', ma: 'LCT_LN', values: generateValues(['4.009', '3.828', '2.412']) }
            ]
        },
        {
            id: 730,
            name: 'Lưu Chuyển Tiền Từ Hoạt Động Tài Chính',
            ma: 'LC_HDTC',
            strong: true,
            values: generateValues(['(33.907)', '(23.857)', '8.406']),
            children: [
                { id: 731, name: 'Tiền Thu Từ Đi Vay', ma: 'TTV', values: generateValues(['23.176', '33.661', '80.874']) },
                { id: 732, name: 'Tiền Chi Trả Nợ Gốc Vay', ma: 'TCTNGV', values: generateValues(['(52.638)', '(55.838)', '(71.006)']) },
                { id: 733, name: 'Tiền Chi Trả Nợ Thuê Tài Chính', ma: 'TCTNTTC', values: generateValues(['-', '(15)', '-']) },
                { id: 734, name: 'Cổ Tức, Lợi Nhuận Đã Trả Cho Chủ Sở Hữu', ma: 'CTLN', values: generateValues(['(4.469)', '(1.666)', '(1.462)']) }
            ]
        },
        {
            id: 740,
            name: 'Lưu chuyển tiền thuần trong kỳ',
            ma: 'LCTTK',
            strong: true,
            values: generateValues(['(1.090)', '(2.148)', '(19.293)']),
            children: [
                { id: 741, name: 'Tiền Và Tương Đương Tiền Đầu Kỳ', ma: 'TVTĐTĐK', values: generateValues(['39.726', '38.641', '36.498']) }
            ]
        }
    ];

    // Sample data cho Chỉ tiêu tài chính
    const chiTieuQuanTrongData = [
        { name: 'Tổng tài sản', values: generateValues(['666.165', '648.983', '675.873']) },
        { name: 'Tài sản ngắn hạn', values: generateValues(['168.939', '171.322', '188.755']) },
        { name: 'Tài sản dài hạn', values: generateValues(['497.226', '477.662', '487.118']) },
        { name: 'Nợ phải trả', values: generateValues(['440.815', '452.849', '474.631']) },
        { name: 'Vốn chủ sở hữu', values: generateValues(['225.350', '196.134', '201.242']) },
        { name: 'Doanh thu thuần', values: generateValues(['463.000', '500.720', '580.537']) },
        { name: 'Lợi nhuận gộp', values: generateValues(['10.580', '13.042', '49.588']) },
        { name: 'Lợi nhuận thuần từ HĐKD', values: generateValues(['-19.516', '-25.970', '8.661']) },
        { name: 'Lợi nhuận trước thuế', values: generateValues(['-18.613', '-25.565', '9.437']) },
        { name: 'Lợi nhuận sau thuế', values: generateValues(['-20.747', '-26.772', '8.238']) }
    ];

    // Expanded rows state
    const [expandedRows, setExpandedRows] = React.useState([]);

    const toggleRow = (id) => {
        if (expandedRows.includes(id)) {
            setExpandedRows(expandedRows.filter(r => r !== id));
        } else {
            setExpandedRows([...expandedRows, id]);
        }
    };

    // Render tree row
    const renderTreeRow = (item, level = 0, showCode = false) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedRows.includes(item.id);
        const cellClass = item.strong ? 'text-sm font-semibold text-gray-900' : 'text-sm text-gray-700';
        const rowClass = 'border-t border-gray-100 hover:bg-gray-50' + (item.strong ? ' font-semibold bg-white' : '');

        return e(React.Fragment, { key: item.id },
            e('tr', { className: rowClass },
                e('td', { className: 'px-3 py-2.5', style: { paddingLeft: (14 + level * 18) + 'px' } },
                    e('div', { className: 'flex items-center gap-2' },
                        hasChildren && e('button', {
                            className: 'w-4 h-4 flex items-center justify-center text-gray-400',
                            onClick: () => toggleRow(item.id)
                        },
                            e('i', { className: 'fas fa-chevron-' + (isExpanded ? 'down' : 'right') + ' text-[10px]' })
                        ),
                        e('span', { className: cellClass }, item.name)
                    )
                ),
                showCode && e('td', { className: 'px-3 py-2.5 text-sm text-gray-500 text-center' }, item.ma),
                ...item.values.map((val, idx) =>
                    e('td', { key: idx, className: 'px-3 py-2.5 text-right whitespace-nowrap ' + cellClass }, val)
                )
            ),
            isExpanded && hasChildren && item.children.map(child => renderTreeRow(child, level + 1, showCode))
        );
    };

    const renderFinancialTable = (firstColumnLabel, data, showCode = false) =>
        e('div', { className: 'w-full overflow-hidden' },
            e('table', { className: 'w-full table-fixed text-sm' },
                e('thead', null,
                    e('tr', { className: 'bg-gray-50 border-y border-gray-200' },
                        e('th', { className: 'px-3 py-2.5 text-left font-semibold text-gray-900 w-[40%]' }, firstColumnLabel),
                        showCode && e('th', { className: 'px-3 py-2.5 text-center font-semibold text-gray-900 w-16' }, 'Mã'),
                        ...appliedPeriods.map((period, idx) =>
                            e('th', { key: idx, className: 'px-3 py-2.5 text-right font-semibold text-gray-900' },
                                getPeriodDate(period)
                            )
                        )
                    )
                ),
                e('tbody', null, data.map(item => renderTreeRow(item, 0, showCode)))
            )
        );

    // Render Filter Bar
    const renderFilterBar = () => {
        const selectedCount = selectedPeriods.length;

        return e('div', { className: 'grid grid-cols-[minmax(180px,1fr)_minmax(180px,1fr)_minmax(180px,1fr)_auto] gap-3 items-center' },
            // Mẫu báo cáo
            e('select', {
                className: 'h-9 w-full min-w-0 px-3 border border-gray-300 rounded-md text-xs bg-white text-gray-700 shadow-sm',
                value: mauBaoCao,
                onChange: (ev) => setMauBaoCao(ev.target.value)
            },
                e('option', { value: '' }, 'Chọn mẫu báo cáo'),
                e('option', { value: '200/2014/TT-BTC' }, '200/2014/TT-BTC'),
                e('option', { value: '133/2016/TT-BTC' }, '133/2016/TT-BTC')
            ),
            // Loại báo cáo
            e('select', {
                className: 'h-9 w-full min-w-0 px-3 border border-gray-300 rounded-md text-xs bg-white text-gray-700 shadow-sm',
                value: loaiBaoCao,
                onChange: (ev) => setLoaiBaoCao(ev.target.value)
            },
                e('option', { value: '' }, 'Chọn loại báo cáo'),
                e('option', { value: 'riengLe' }, 'Riêng lẻ'),
                e('option', { value: 'hopNhat' }, 'Hợp nhất')
            ),
            // Kỳ báo cáo dropdown
            e('div', { className: 'relative min-w-0' },
                e('div', {
                    className: 'h-9 w-full min-w-0 px-3 border border-gray-300 rounded-md text-xs bg-white cursor-pointer flex items-center justify-between gap-3 text-gray-700 shadow-sm',
                    onClick: () => setShowKyDropdown(!showKyDropdown)
                },
                    e('span', { className: selectedCount > 0 ? 'text-gray-700' : 'text-gray-500' },
                        selectedCount > 0 ? `Đã chọn ${selectedCount} giá trị` : 'Chọn kỳ dữ liệu'
                    ),
                    e('i', { className: 'fas fa-chevron-down text-gray-400 text-xs' })
                ),
                // Dropdown panel
                showKyDropdown && e('div', {
                    className: 'absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-[480px]'
                },
                    // Header
                    e('div', { className: 'px-4 py-3 border-b border-gray-200 flex items-center justify-between' },
                        e('span', { className: 'text-sm font-medium text-gray-700' },
                            'Đã chọn ' + selectedPeriods.length + '/' + (availableNam.length + availableQuy.length)
                        ),
                        e('button', {
                            className: 'text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1',
                            onClick: resetPeriods
                        },
                            e('i', { className: 'fas fa-redo text-xs' }),
                            'Đặt lại dữ liệu'
                        )
                    ),
                    // Two columns
                    e('div', { className: 'flex' },
                        // Left column - Năm
                        e('div', { className: 'flex-1 border-r border-gray-200' },
                            e('div', { className: 'px-4 py-2 bg-gray-50 text-sm font-medium text-gray-600 border-b border-gray-200' }, 'Năm'),
                            e('div', { className: 'max-h-[200px] overflow-y-auto' },
                                availableNam.map(item =>
                                    e('label', {
                                        key: item.id,
                                        className: 'flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ' +
                                            (selectedPeriods.includes(item.id) ? 'bg-[#e6f4f1]' : 'hover:bg-gray-50')
                                    },
                                        e('input', {
                                            type: 'checkbox',
                                            checked: selectedPeriods.includes(item.id),
                                            onChange: () => togglePeriod(item.id),
                                            className: 'w-4 h-4 rounded border-gray-300 text-[#006B68]'
                                        }),
                                        e('span', { className: 'text-sm text-gray-700' }, item.label)
                                    )
                                )
                            )
                        ),
                        // Right column - Quý
                        e('div', { className: 'flex-1' },
                            e('div', { className: 'px-4 py-2 bg-gray-50 text-sm font-medium text-gray-600 border-b border-gray-200' }, 'Quý'),
                            e('div', { className: 'max-h-[200px] overflow-y-auto' },
                                availableQuy.map(item =>
                                    e('label', {
                                        key: item.id,
                                        className: 'flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ' +
                                            (selectedPeriods.includes(item.id) ? 'bg-[#006B68] text-white rounded-md mx-2 my-0.5' : 'hover:bg-gray-50')
                                    },
                                        e('input', {
                                            type: 'checkbox',
                                            checked: selectedPeriods.includes(item.id),
                                            onChange: () => togglePeriod(item.id),
                                            className: 'w-4 h-4 rounded border-gray-300'
                                        }),
                                        e('span', { className: 'text-sm' }, item.label)
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            // Nút lấy dữ liệu
            e('button', {
                className: 'h-9 px-4 bg-[#006B68] text-white rounded-md text-xs font-semibold hover:bg-[#005a57] inline-flex items-center justify-center gap-2 shadow-sm whitespace-nowrap',
                onClick: applyFilter
            },
                e('i', { className: 'fas fa-search-dollar text-[11px]' }), 'Lấy dữ liệu'
            )
        );
    };

    // State for Tạo mới dropdown
    const [showTaoMoiDropdown, setShowTaoMoiDropdown] = React.useState(false);

    // Render Báo cáo tài chính
    const renderBaoCaoTaiChinh = () => {
        return e('div', { className: 'space-y-4' },

            // Bảng cân đối kế toán - Tài sản
            e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                e('div', { className: 'bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100' },
                    e('span', { className: 'text-sm font-medium text-gray-700' }, 'Bảng cân đối kế toán - Tài sản'),
                    e('i', { className: 'fas fa-chevron-down text-gray-400 text-xs' })
                ),
                e('div', { className: 'w-full overflow-hidden' },
                    e('table', { className: 'w-full table-fixed text-sm' },
                        e('thead', null,
                            e('tr', { className: 'bg-gray-100' },
                                e('th', { className: 'px-3 py-2.5 text-left font-semibold text-gray-900 w-[40%]' }, 'Khoản mục'),
                                ...appliedPeriods.map((period, idx) =>
                                    e('th', { key: idx, className: 'px-3 py-2.5 text-right font-semibold text-gray-900' },
                                        getPeriodDate(period)
                                    )
                                )
                            )
                        ),
                        e('tbody', null,
                            taiSanData.map(item => renderTreeRow(item, 0, false))
                        )
                    )
                )
            ),
            // Bảng cân đối kế toán - Nguồn vốn
            e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                e('div', { className: 'bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100' },
                    e('span', { className: 'text-sm font-medium text-gray-700' }, 'Bảng cân đối kế toán - Nguồn vốn'),
                    e('i', { className: 'fas fa-chevron-down text-gray-400 text-xs' })
                ),
                e('div', { className: 'w-full overflow-hidden' },
                    e('table', { className: 'w-full table-fixed text-sm' },
                        e('thead', null,
                            e('tr', { className: 'bg-gray-100' },
                                e('th', { className: 'px-3 py-2.5 text-left font-semibold text-gray-900 w-[40%]' }, 'Khoản mục'),
                                ...appliedPeriods.map((period, idx) =>
                                    e('th', { key: idx, className: 'px-3 py-2.5 text-right font-semibold text-gray-900' },
                                        getPeriodDate(period)
                                    )
                                )
                            )
                        ),
                        e('tbody', null,
                            nguonVonData.map(item => renderTreeRow(item, 0, false))
                        )
                    )
                )
            ),
            // Kết quả hoạt động kinh doanh
            e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                e('div', { className: 'bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100' },
                    e('span', { className: 'text-sm font-medium text-gray-700' }, 'Kết quả hoạt động kinh doanh'),
                    e('i', { className: 'fas fa-chevron-down text-gray-400 text-xs' })
                ),
                renderFinancialTable('Khoản mục', ketQuaKinhDoanhData)
            ),
            // Lưu chuyển tiền tệ
            e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                e('div', { className: 'bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100' },
                    e('span', { className: 'text-sm font-medium text-gray-700' }, 'Lưu chuyển tiền tệ'),
                    e('i', { className: 'fas fa-chevron-down text-gray-400 text-xs' })
                ),
                renderFinancialTable('Khoản mục', luuChuyenTienTeData)
            )
        );
    };

    // Render Biểu đồ tài chính
    const renderBieuDoTaiChinh = () => {
        // Simple chart placeholder using CSS
        const renderLineChart = (title, color, data) => {
            return e('div', { className: 'bg-white border border-gray-200 rounded-lg p-4' },
                e('h4', { className: 'text-sm font-medium text-gray-700 mb-4' }, title),
                e('div', { className: 'h-40 relative' },
                    // Y axis labels
                    e('div', { className: 'absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500' },
                        e('span', null, data.max),
                        e('span', null, (data.max * 0.5).toFixed(1)),
                        e('span', null, '0')
                    ),
                    // Chart area
                    e('div', { className: 'ml-10 h-full relative bg-gradient-to-t rounded', style: { background: 'linear-gradient(to top, ' + color + '20, ' + color + '05)' } },
                        // Line
                        e('svg', { className: 'absolute inset-0 w-full h-full', viewBox: '0 0 100 100', preserveAspectRatio: 'none' },
                            e('polyline', {
                                fill: 'none',
                                stroke: color,
                                strokeWidth: '2',
                                points: data.points
                            })
                        )
                    ),
                    // X axis labels
                    e('div', { className: 'absolute bottom-[-24px] left-10 right-0 flex justify-between text-xs text-gray-500' },
                        e('span', null, '2022'),
                        e('span', null, '2023'),
                        e('span', null, '2024')
                    )
                )
            );
        };

        const renderBarChart = (title) => {
            const bars = [
                { year: '2022', value: 2.58, label: '31/12/2022' },
                { year: '2023', value: 2.94, label: '31/12/2023' },
                { year: '2024', value: 3.22, label: '31/12/2024' }
            ];
            const maxVal = 4;

            return e('div', { className: 'bg-white border border-gray-200 rounded-lg p-4' },
                e('div', { className: 'flex items-center justify-between mb-4' },
                    e('h4', { className: 'text-sm font-medium text-gray-700' }, title),
                    e('div', { className: 'flex items-center gap-2' },
                        e('select', { className: 'px-2 py-1 border border-gray-300 rounded text-xs' },
                            e('option', null, 'VND')
                        ),
                        e('select', { className: 'px-2 py-1 border border-gray-300 rounded text-xs' },
                            e('option', null, 'Tỷ')
                        )
                    )
                ),
                e('div', { className: 'h-40 flex items-end justify-around gap-2 px-4' },
                    bars.map((bar, idx) =>
                        e('div', { key: idx, className: 'flex flex-col items-center gap-1' },
                            e('span', { className: 'text-xs font-medium text-white bg-[#006B68] px-1.5 py-0.5 rounded' }, bar.value),
                            e('div', {
                                className: 'w-10 bg-[#006B68] rounded-t',
                                style: { height: (bar.value / maxVal * 100) + '%', minHeight: '20px' }
                            }),
                            e('div', { className: 'text-center mt-1' },
                                e('div', { className: 'text-xs text-gray-700' }, bar.year),
                                e('div', { className: 'text-[10px] text-gray-500' }, bar.label)
                            )
                        )
                    )
                )
            );
        };

        return e('div', { className: 'space-y-4' },
            e('div', { className: 'flex items-center gap-2' },
                e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Biểu đồ tài chính'),
                e('i', { className: 'fas fa-sync-alt text-gray-400 text-sm cursor-pointer hover:text-gray-600' })
            ),
            e('div', { className: 'grid grid-cols-2 gap-4' },
                renderLineChart('Khả năng thanh toán hiện hành', '#f59e0b', { max: 1.6, points: '0,30 20,25 40,30 60,25 80,30 100,25' }),
                renderLineChart('Tổng nợ vay/Vốn chủ sở hữu', '#006B68', { max: 2.4, points: '0,50 20,40 40,35 60,30 80,25 100,20' }),
                renderLineChart('Tỷ lệ đòn bẩy', '#006B68', { max: 80, points: '0,15 20,12 40,10 60,10 80,12 100,12' }),
                renderBarChart('Vòng quay vốn lưu động')
            )
        );
    };

    // Render Chỉ tiêu tài chính
    const renderChiTieuTaiChinh = () => {
        return e('div', { className: 'space-y-4' },
            // Header
            e('div', { className: 'flex items-center justify-between' },
                e('div', { className: 'flex items-center gap-3' },
                    e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Chỉ tiêu tài chính'),
                    e('i', { className: 'fas fa-sync-alt text-gray-400 text-sm cursor-pointer hover:text-gray-600' }),
                    e('button', { className: 'btn btn-outline text-sm' },
                        e('i', { className: 'fas fa-file-excel mr-1' }), 'Xuất Excel'
                    )
                ),
                e('div', { className: 'flex items-center gap-3' },
                    e('span', { className: 'text-sm text-gray-600' }, 'Đơn vị tính:'),
                    e('select', { className: 'px-2 py-1 border border-gray-300 rounded text-sm' },
                        e('option', null, 'VND')
                    ),
                    e('span', { className: 'text-sm text-gray-600' }, 'Đơn vị hiển thị:'),
                    e('select', { className: 'px-2 py-1 border border-gray-300 rounded text-sm' },
                        e('option', null, 'Tỷ')
                    )
                )
            ),
            // Tabs
            e('div', { className: 'flex border-b border-gray-200' },
                e('button', {
                    className: 'px-4 py-2 text-sm font-medium ' + (activeChiTieuTab === 'quanTrong' ? 'text-[#006B68] border-b-2 border-[#006B68]' : 'text-gray-500'),
                    onClick: () => setActiveChiTieuTab('quanTrong')
                }, 'Chỉ tiêu quan trọng'),
                e('button', {
                    className: 'px-4 py-2 text-sm font-medium ' + (activeChiTieuTab === 'boSung' ? 'text-[#006B68] border-b-2 border-[#006B68]' : 'text-gray-500'),
                    onClick: () => setActiveChiTieuTab('boSung')
                }, 'Chỉ tiêu tài chính bổ sung')
            ),
            e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                e('div', { className: 'overflow-x-auto' },
                    e('table', { className: 'w-full text-sm' },
                        e('thead', null,
                            e('tr', { className: 'bg-gray-100' },
                                e('th', { className: 'px-4 py-3 text-left font-semibold text-gray-900' }, 'Chỉ tiêu'),
                                ...appliedPeriods.map((period, idx) =>
                                    e('th', { key: idx, className: 'px-3 py-3 text-center font-semibold text-gray-900' },
                                        getPeriodDate(period)
                                    )
                                )
                            )
                        ),
                        e('tbody', null,
                            chiTieuQuanTrongData.map((item, idx) =>
                                e('tr', { key: idx, className: 'border-t border-gray-100 hover:bg-gray-50' },
                                    e('td', { className: 'px-4 py-2.5 text-gray-700' }, item.name),
                                    ...item.values.map((val, vIdx) =>
                                        e('td', { key: vIdx, className: 'px-3 py-2.5 text-right text-gray-700' }, val)
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    };

    // State cho Đánh giá tài chính
    const [danhGiaYKien, setDanhGiaYKien] = React.useState('day-du');
    const [showLayMauPopup, setShowLayMauPopup] = React.useState(false);
    const [selectedBCDX, setSelectedBCDX] = React.useState('');
    const [danhGiaText, setDanhGiaText] = React.useState('');
    const [nhanXetTDRR, setNhanXetTDRR] = React.useState('');
    const [openOpinionSections, setOpenOpinionSections] = React.useState({ tongQuan: true, deXuat: false, thamDinh: true });
    const [thamDinhOpinionMode, setThamDinhOpinionMode] = React.useState('boSung');
    const [thamDinhOpinionText, setThamDinhOpinionText] = React.useState('');
    const [thamDinhLegacyMode, setThamDinhLegacyMode] = React.useState('boSung');
    const [thamDinhLegacyText, setThamDinhLegacyText] = React.useState('TĐRR cơ bản thống nhất với đánh giá của bộ phận đề xuất. Tuy nhiên, đề nghị bổ sung phân tích xu hướng dòng tiền hoạt động kinh doanh và áp lực vốn lưu động khi doanh thu tiếp tục tăng.');
    const [financePopup, setFinancePopup] = React.useState(null);
    const [overviewOpen, setOverviewOpen] = React.useState({ canDoi: false, kqkd: false, luuChuyen: false, chiTieu: false });

    const toggleOpinionSection = (key) => {
        setOpenOpinionSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleOverviewSection = (key) => {
        setOverviewOpen(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Danh sách BCĐX mẫu
    const danhSachBCDX = [
        { id: 'han-muc-2024', name: 'Hạn mức 2024-2025' },
        { id: 'vay-oto', name: 'Vay món trung hạn ô tô' },
        { id: 'vay-mmtb', name: 'Vay đầu tư MMTB 2025' },
        { id: 'vay-von-luu-dong', name: 'Vay vốn lưu động ngắn hạn' },
        { id: 'vay-bat-dong-san', name: 'Vay mua bất động sản 2024' }
    ];

    // Dữ liệu mẫu theo từng BCĐX
    const mauDuLieu = {
        'han-muc-2024': {
            danhGia: 'Khách hàng có tình hình tài chính ổn định, doanh thu tăng trưởng 15% so với năm trước. Tỷ lệ nợ/vốn chủ sở hữu đạt 1.2, nằm trong ngưỡng cho phép.',
            nhanXet: 'TĐRR đánh giá khách hàng đủ điều kiện cấp hạn mức tín dụng cho giai đoạn 2024-2025. Đề xuất mức hạn mức phù hợp với quy mô hoạt động kinh doanh.'
        },
        'vay-oto': {
            danhGia: 'Khách hàng có thu nhập ổn định, khả năng trả nợ tốt. Tài sản đảm bảo là xe ô tô mới 100%, giá trị định giá 850 triệu đồng.',
            nhanXet: 'TĐRR đồng ý với đề xuất cấp tín dụng vay mua ô tô. Lưu ý: Cần hoàn thiện hồ sơ bảo hiểm xe và đăng ký thế chấp tài sản.'
        },
        'vay-mmtb': {
            danhGia: 'Dự án đầu tư máy móc thiết bị có tính khả thi cao, NPV dương, IRR = 18% > chi phí vốn. Thời gian hoàn vốn 3.5 năm.',
            nhanXet: 'TĐRR đề xuất phê duyệt khoản vay đầu tư MMTB. Cần theo dõi tiến độ nhập khẩu thiết bị và nghiệm thu lắp đặt theo đúng kế hoạch.'
        },
        'vay-von-luu-dong': {
            danhGia: 'Nhu cầu vốn lưu động phù hợp với quy mô sản xuất kinh doanh. Vòng quay vốn lưu động đạt 4.2 lần/năm, thanh khoản tốt.',
            nhanXet: 'TĐRR thống nhất cấp vốn lưu động ngắn hạn. Đề xuất giải ngân theo tiến độ mua nguyên vật liệu và đơn hàng.'
        },
        'vay-bat-dong-san': {
            danhGia: 'Bất động sản mua có vị trí tốt, pháp lý rõ ràng, giá mua hợp lý so với thị trường. Tỷ lệ cho vay/giá trị tài sản = 65%.',
            nhanXet: 'TĐRR đánh giá khoản vay mua BĐS có rủi ro thấp. Cần hoàn thiện thủ tục công chứng và đăng ký giao dịch bảo đảm trước khi giải ngân.'
        }
    };

    const handleLayMau = () => {
        if (selectedBCDX && mauDuLieu[selectedBCDX]) {
            setDanhGiaYKien('bo-sung');
            setDanhGiaText(mauDuLieu[selectedBCDX].danhGia);
            setNhanXetTDRR(mauDuLieu[selectedBCDX].nhanXet);
            setShowLayMauPopup(false);
            setSelectedBCDX('');
        }
    };

    // State cho nhiều khối đánh giá
    const [danhGiaBlocks, setDanhGiaBlocks] = React.useState([
        {
            id: 1,
            chiTieuRows: [
                { id: 1, chiTieu: 'Tổng tài sản', values: ['666.165', '648.983', '675.873'] },
                { id: 2, chiTieu: 'Vốn chủ sở hữu', values: ['225.350', '196.134', '201.242'] },
                { id: 3, chiTieu: '', values: [] }
            ],
            danhGiaText: ''
        }
    ]);

    // Thêm khối đánh giá mới
    const handleAddDanhGiaBlock = () => {
        const newId = Math.max(...danhGiaBlocks.map(b => b.id)) + 1;
        setDanhGiaBlocks([...danhGiaBlocks, {
            id: newId,
            chiTieuRows: [{ id: 1, chiTieu: '', values: [] }],
            danhGiaText: ''
        }]);
    };

    // Xóa khối đánh giá
    const handleRemoveDanhGiaBlock = (blockId) => {
        if (danhGiaBlocks.length > 1) {
            setDanhGiaBlocks(danhGiaBlocks.filter(b => b.id !== blockId));
        }
    };

    // Sao chép khối đánh giá
    const handleCopyDanhGiaBlock = (block) => {
        const newId = Math.max(...danhGiaBlocks.map(b => b.id)) + 1;
        const copiedBlock = {
            ...block,
            id: newId,
            chiTieuRows: block.chiTieuRows.map((r, idx) => ({ ...r, id: idx + 1 }))
        };
        setDanhGiaBlocks([...danhGiaBlocks, copiedBlock]);
    };

    // Thêm chỉ tiêu trong block
    const handleAddChiTieuToBlock = (blockId) => {
        setDanhGiaBlocks(danhGiaBlocks.map(block => {
            if (block.id === blockId) {
                const newRowId = Math.max(...block.chiTieuRows.map(r => r.id)) + 1;
                return {
                    ...block,
                    chiTieuRows: [...block.chiTieuRows, { id: newRowId, chiTieu: '', values: [] }]
                };
            }
            return block;
        }));
    };

    // Xóa chỉ tiêu trong block
    const handleRemoveChiTieuFromBlock = (blockId, rowId) => {
        setDanhGiaBlocks(danhGiaBlocks.map(block => {
            if (block.id === blockId && block.chiTieuRows.length > 1) {
                return {
                    ...block,
                    chiTieuRows: block.chiTieuRows.filter(r => r.id !== rowId)
                };
            }
            return block;
        }));
    };

    // Cập nhật chỉ tiêu trong block
    const handleUpdateChiTieuInBlock = (blockId, rowId, newChiTieu) => {
        // Tìm values từ danh mục
        let newValues = [];
        Object.values(danhMucChiTieu).forEach(items => {
            const found = items.find(item => item.ten === newChiTieu);
            if (found) newValues = found.values;
        });

        setDanhGiaBlocks(danhGiaBlocks.map(block => {
            if (block.id === blockId) {
                return {
                    ...block,
                    chiTieuRows: block.chiTieuRows.map(r =>
                        r.id === rowId ? { ...r, chiTieu: newChiTieu, values: newValues } : r
                    )
                };
            }
            return block;
        }));
    };

    // Cập nhật đánh giá text trong block
    const handleUpdateDanhGiaText = (blockId, text) => {
        setDanhGiaBlocks(danhGiaBlocks.map(block => {
            if (block.id === blockId) {
                return { ...block, danhGiaText: text };
            }
            return block;
        }));
    };

    const financialRatioRows = [
        {
            id: 'liq', group: true, name: 'Khả năng thanh khoản', children: [
                { id: 'current', level: 1, name: 'Khả năng thanh toán hiện hành', values: generateValues(['1,06', '0,92', '0,96']) },
                { id: 'quick', level: 1, name: 'Khả năng thanh toán nhanh', values: generateValues(['0,92', '0,79', '0,84']) }
            ]
        },
        {
            id: 'debt', group: true, name: 'Đòn bẩy tài chính', children: [
                { id: 'debt-assets', level: 1, name: 'Tổng nợ phải trả/Tổng tài sản', values: generateValues(['66,2%', '69,8%', '70,2%']) },
                { id: 'long-debt-equity', level: 1, name: 'Nợ dài hạn/Nguồn vốn CSH', values: generateValues(['124,6%', '136,3%', '138,6%']) }
            ]
        },
        {
            id: 'activity', group: true, name: 'Hiệu quả hoạt động', children: [
                { id: 'working-capital', level: 1, name: 'Vòng quay vốn lưu động', values: generateValues(['2,58', '2,94', '3,22']) },
                { id: 'inventory', level: 1, name: 'Vòng quay hàng tồn kho', values: generateValues(['20,12', '21,33', '21,11']) },
                { id: 'receivable', level: 1, name: 'Vòng quay các khoản phải thu', values: generateValues(['15,52', '12,24', '11,43']) }
            ]
        },
        {
            id: 'profitability', group: true, name: 'Khả năng sinh lời', children: [
                { id: 'roe', level: 1, name: 'Lợi nhuận sau thuế/VCSH bq (ROE)', values: generateValues(['-8,8%', '-12,7%', '4,1%']) },
                { id: 'roa', level: 1, name: 'LNST/Tổng Tài sản bq (ROA)', values: generateValues(['-3,0%', '-4,1%', '1,2%']) },
                { id: 'interest-coverage', level: 1, name: 'EBIT/Chi phí lãi vay', values: generateValues(['(13,68)', '(24,31)', '1,55']) }
            ]
        }
    ];
    const [expandedRatioGroups, setExpandedRatioGroups] = React.useState([]);
    const toggleRatioGroup = (id) => {
        setExpandedRatioGroups(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    };

    const tdrrReviewRows = [
        { content: 'Kết quả hoạt động kinh doanh', proposal: 'Đã đánh giá đầy đủ', risk: 'Bổ sung ý kiến', level: 'Khác biệt' },
        { content: 'Khả năng sinh lời', proposal: 'Đã đánh giá đầy đủ', risk: 'Bổ sung ý kiến', level: 'Khác biệt' },
        { content: 'Quy mô & cơ cấu tài sản - nguồn vốn', proposal: 'Đã đánh giá đầy đủ', risk: 'Bổ sung ý kiến', level: 'Khác biệt' },
        { content: 'Hiệu quả sử dụng tài sản & vốn lưu động', proposal: 'Đã đánh giá đầy đủ', risk: 'Bổ sung ý kiến', level: 'Khác biệt' },
        { content: 'Đòn bẩy & khả năng trả nợ', proposal: 'Đã đánh giá đầy đủ', risk: 'Bổ sung ý kiến', level: 'Khác biệt' },
        { content: 'Dòng tiền', proposal: 'Đã đánh giá đầy đủ', risk: 'Bổ sung ý kiến', level: 'Khác biệt' },
        { content: 'Đánh giá chung', proposal: 'Đã đánh giá đầy đủ', risk: 'Bổ sung ý kiến', level: 'Khác biệt' }
    ];
    const [tdrrReviewModes, setTdrrReviewModes] = React.useState(() => tdrrReviewRows.map(() => 'boSung'));

    const setTdrrReviewMode = (idx, mode) => {
        setTdrrReviewModes(prev => prev.map((item, itemIdx) => itemIdx === idx ? mode : item));
    };

    const proposalAssessmentBlocks = [
        {
            title: 'Kết quả hoạt động kinh doanh',
            text: 'Doanh thu thuần của EVN tăng trưởng ổn định trong giai đoạn 2022-2024, từ 463.000 tỷ đồng lên 580.537 tỷ đồng, tương đương tăng khoảng 15,9% trong năm 2024 so với 2023, nhờ tăng sản lượng điện và điều chỉnh giá bán điện.\n\nGiá vốn hàng bán vẫn chiếm tỷ trọng lớn nhưng đã cải thiện đáng kể, tỷ lệ giá vốn/doanh thu giảm từ khoảng 97,4% năm 2023 xuống còn 91,5% năm 2024, giúp lợi nhuận gộp tăng mạnh lên 49.588 tỷ đồng, tăng khoảng 280%.\n\nSau giai đoạn thua lỗ 2022-2023, EVN đã phục hồi và ghi nhận lợi nhuận trước thuế 9.437 tỷ đồng năm 2024.'
        },
        {
            title: 'Khả năng sinh lời',
            text: 'Biên lợi nhuận gộp cải thiện mạnh từ mức 2,3% năm 2022 lên 8,5% năm 2024. Các chỉ tiêu sinh lời như ROA, ROE chuyển từ âm sang dương, trong đó ROE đạt khoảng 4,1%, phản ánh hiệu quả hoạt động đã được cải thiện đáng kể.\n\nTuy nhiên, mức sinh lời vẫn còn thấp so với quy mô tài sản và vốn đầu tư lớn của Tập đoàn.'
        },
        {
            title: 'Quy mô & cơ cấu tài sản - nguồn vốn',
            text: 'Tổng tài sản EVN duy trì quy mô lớn, khoảng 650.000-675.000 tỷ đồng, tăng nhẹ 4,1% trong năm 2024. Cơ cấu tài sản phù hợp đặc thù ngành điện với tài sản dài hạn chiếm khoảng 72%.\n\nTài sản ngắn hạn tăng chủ yếu do đầu tư tài chính ngắn hạn tăng mạnh và khoản phải thu tăng.\n\nVề nguồn vốn, nợ phải trả chiếm khoảng 70,2% tổng nguồn vốn, trong khi vốn chủ sở hữu chiếm khoảng 29,8%.'
        },
        {
            title: 'Hiệu quả sử dụng tài sản & vốn lưu động',
            text: 'Các chỉ tiêu hiệu quả hoạt động có xu hướng cải thiện, thể hiện qua vòng quay tổng tài sản tăng và vòng quay vốn lưu động cải thiện.\n\nTuy nhiên, vòng quay khoản phải thu giảm từ 15,52 vòng xuống 11,43 vòng, tiềm ẩn rủi ro về chất lượng công nợ và cần tiếp tục theo dõi khả năng thu hồi khi quy mô doanh thu tăng.'
        },
        {
            title: 'Đòn bẩy & khả năng trả nợ',
            text: 'Tỷ lệ nợ/Tổng tài sản tăng từ 66,2% lên 70,2%, phản ánh mức độ đòn bẩy tài chính cao. Nợ dài hạn tăng do nhu cầu đầu tư các dự án nguồn điện lớn.\n\nKhả năng thanh toán năm 2024 ở mức chưa thực sự mạnh: thanh toán hiện hành khoảng 0,96 lần và thanh toán nhanh khoảng 0,84 lần, cho thấy trạng thái mất cân đối nhẹ trong ngắn hạn.'
        },
        {
            title: 'Dòng tiền',
            text: 'Lưu chuyển tiền từ hoạt động kinh doanh năm 2024 đạt 75.004 tỷ đồng, tăng mạnh 56,5% so với 2023, phản ánh khả năng tạo tiền tốt.\n\nTuy nhiên, dòng tiền đầu tư âm lớn ở mức -102.702 tỷ đồng do đầu tư dự án, dòng tiền tài chính dương nhờ vay vốn và tiền cuối kỳ giảm mạnh khoảng 52,9%.'
        }
    ];
    const assessmentGeneralText = 'Giai đoạn 2022-2023, EVN chịu ảnh hưởng lớn từ biến động giá đầu vào dẫn đến thua lỗ. Đến năm 2024 và 6T/2025, hoạt động đã phục hồi rõ rệt với doanh thu và lợi nhuận cải thiện.\n\nTuy nhiên, một số rủi ro cần lưu ý gồm đòn bẩy tài chính cao, khoảng 70% tổng tài sản; áp lực vốn cho đầu tư lớn; thanh khoản ngắn hạn chưa thực sự mạnh; và dòng tiền phụ thuộc vào chu kỳ đầu tư.\n\nKết luận: Tình hình tài chính của EVN đang trong xu hướng phục hồi tích cực, phù hợp đặc thù ngành, tuy nhiên cần tiếp tục theo dõi chặt chẽ dòng tiền, công nợ và nghĩa vụ nợ vay.';

    const renderPeriodHeader = (period, idx) =>
        e('th', { key: idx, className: 'px-3 py-2.5 text-right font-semibold text-gray-900' },
            getPeriodDate(period)
        );

    const renderFinancialRatioTable = () =>
        e('div', { className: 'w-full overflow-hidden' },
            e('table', { className: 'w-full table-fixed text-sm' },
                e('thead', null,
                    e('tr', { className: 'bg-gray-50 border-y border-gray-200' },
                        e('th', { className: 'px-3 py-2.5 text-left font-semibold text-gray-900 w-[40%]' }, 'Chỉ tiêu'),
                        ...appliedPeriods.map(renderPeriodHeader)
                    )
                ),
                e('tbody', null,
                    financialRatioRows.flatMap(row => {
                        const isExpanded = expandedRatioGroups.includes(row.id);
                        const groupRow = e('tr', {
                            key: row.id,
                            className: 'border-b border-gray-100 hover:bg-gray-50 font-semibold text-gray-900 cursor-pointer',
                            onClick: () => toggleRatioGroup(row.id)
                        },
                            e('td', { className: 'px-3 py-2.5' },
                                e('div', { className: 'flex items-center gap-2 min-w-0' },
                                    e('i', { className: 'fas fa-chevron-' + (isExpanded ? 'down' : 'right') + ' text-xs text-gray-500 w-3' }),
                                    e('span', { className: 'break-words leading-4' }, row.name)
                                )
                            ),
                            ...appliedPeriods.map((_, idx) =>
                                e('td', { key: idx, className: 'px-3 py-2.5 text-right' }, '')
                            )
                        );

                        if (!isExpanded) return [groupRow];

                        return [
                            groupRow,
                            ...row.children.map(child =>
                                e('tr', {
                                    key: child.id,
                                    className: 'border-b border-gray-100 hover:bg-gray-50 text-gray-700'
                                },
                                    e('td', { className: 'px-3 py-2.5' },
                                        e('div', {
                                            className: 'flex items-center gap-2 min-w-0',
                                            style: { paddingLeft: '26px' }
                                        },
                                            e('span', { className: 'break-words leading-4' }, child.name)
                                        )
                                    ),
                                    ...child.values.map((value, idx) =>
                                        e('td', { key: idx, className: 'px-3 py-2.5 text-right whitespace-nowrap text-gray-700' }, value)
                                    )
                                )
                            )
                        ];
                    })
                )
            )
        );

    const renderAccordion = (title, children, isOpen = false, onToggle) =>
        e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm' },
            e('button', {
                className: 'w-full h-11 px-4 flex items-center justify-between bg-white text-left hover:bg-gray-50 transition-colors',
                onClick: onToggle
            },
                e('span', { className: 'text-sm font-semibold text-gray-800' }, title),
                e('i', { className: 'fas fa-chevron-' + (isOpen ? 'up' : 'down') + ' text-xs text-gray-400' })
            ),
            isOpen && children
        );

    const renderReadonlyGroup = (title, children) =>
        e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm' },
            e('div', { className: 'px-4 py-3 border-b border-gray-200 bg-white' },
                e('span', { className: 'text-sm font-semibold text-gray-800' }, title)
            ),
            e('div', { className: 'p-3 space-y-3 bg-[#f7f8f9]' }, children)
        );

    const renderOpinionSection = (key, title, iconClass, children) => {
        const isOpen = openOpinionSections[key];

        return e('div', { className: 'border border-[#cfe8e5] bg-[#e8f7f5] overflow-hidden' },
            e('button', {
                className: 'w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-[#ddf1ef] transition-colors',
                onClick: () => toggleOpinionSection(key)
            },
                e('span', { className: 'flex items-center gap-2 min-w-0' },
                    e('span', { className: 'w-4 h-4 inline-flex items-center justify-center flex-shrink-0 text-[13px]' },
                        e('i', { className: iconClass + ' text-[#d9a300]' })
                    ),
                    e('span', { className: 'text-sm font-semibold text-[#006B68] truncate' }, title)
                ),
                e('span', { className: 'flex items-center gap-2 flex-shrink-0' },
                    e('span', { className: 'text-xs font-medium text-gray-500' }, isOpen ? 'Thu gọn' : 'Mở rộng'),
                    e('i', { className: 'fas fa-chevron-' + (isOpen ? 'up' : 'down') + ' text-gray-400 text-xs transition-transform' })
                )
            ),
            openOpinionSections[key] && children
        );
    };

    const renderLegacyRiskAssessmentOption = () =>
        e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm' },
            e('div', { className: 'p-4 space-y-4' },
                e('div', { className: 'flex items-center gap-8 flex-wrap' },
                    e('span', { className: 'text-sm font-semibold text-[#006B68]' }, 'Đánh giá ý kiến Bộ phận đề xuất'),
                    e('label', { className: 'flex items-center gap-2 text-sm font-medium text-gray-800 cursor-pointer' },
                        e('input', {
                            type: 'radio',
                            name: 'thamDinhLegacyMode',
                            checked: thamDinhLegacyMode === 'dayDu',
                            onChange: () => setThamDinhLegacyMode('dayDu'),
                            className: 'w-4 h-4 accent-[#006B68]'
                        }),
                        'Đã đánh giá đầy đủ'
                    ),
                    e('label', { className: 'flex items-center gap-2 text-sm font-medium text-gray-800 cursor-pointer' },
                        e('input', {
                            type: 'radio',
                            name: 'thamDinhLegacyMode',
                            checked: thamDinhLegacyMode === 'boSung',
                            onChange: () => setThamDinhLegacyMode('boSung'),
                            className: 'w-4 h-4 accent-[#006B68]'
                        }),
                        'Bổ sung ý kiến'
                    )
                ),
                thamDinhLegacyMode === 'boSung' && e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                    e('div', { className: 'px-3 py-2 border-b border-gray-100 bg-[#f8fbfb] text-sm font-semibold text-[#006B68]' }, 'Nhận xét, đánh giá bổ sung'),
                    e('div', { className: 'border-b border-gray-100 px-3 py-2 flex items-center gap-1.5 flex-wrap' },
                        e('button', { className: 'w-8 h-8 rounded hover:bg-gray-100 text-gray-800 font-bold' }, 'B'),
                        e('button', { className: 'w-8 h-8 rounded hover:bg-gray-100 text-gray-800 italic font-semibold' }, 'I'),
                        e('button', { className: 'w-8 h-8 rounded hover:bg-gray-100 text-gray-800 underline font-semibold' }, 'U'),
                        e('button', { className: 'w-8 h-8 rounded hover:bg-gray-100 text-gray-800' }, e('i', { className: 'fas fa-align-left' })),
                        e('button', { className: 'w-8 h-8 rounded hover:bg-gray-100 text-gray-800' }, e('i', { className: 'fas fa-list-ul' })),
                        e('button', { className: 'w-8 h-8 rounded hover:bg-gray-100 text-gray-800' }, e('i', { className: 'fas fa-list-ol' }))
                    ),
                    e('div', { className: 'relative' },
                        e('textarea', {
                            className: 'w-full min-h-[130px] px-4 py-3 text-sm text-gray-800 outline-none resize-y',
                            placeholder: 'Nhập nhận xét bổ sung của TĐRR',
                            value: thamDinhLegacyText,
                            maxLength: 4000,
                            onChange: (ev) => setThamDinhLegacyText(ev.target.value)
                        }),
                        e('span', { className: 'absolute right-3 bottom-3 text-xs text-gray-400' }, `${thamDinhLegacyText.length}/4000`)
                    )
                )
            )
        );

    const renderRiskAssessmentOpinion = () =>
        e('div', { className: 'bg-white border-t border-[#d7ecea] p-4' },
            e('div', { className: 'space-y-4' },
                renderLegacyRiskAssessmentOption(),
                e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm' },
                    e('div', { className: 'px-4 py-3 bg-[#f8fbfb] border-b border-gray-200' },
                        e('h4', { className: 'text-sm font-bold text-[#006B68] uppercase' }, 'Phương án 2: Đánh giá nội dung')
                    ),
                    e('div', { className: 'overflow-hidden' },
                        e('table', { className: 'w-full text-sm table-fixed' },
                            e('thead', null,
                                e('tr', { className: 'bg-gray-50 border-b border-gray-200 text-gray-600' },
                                    e('th', { className: 'px-4 py-2.5 text-left font-semibold w-[31%]' }, 'Nội dung'),
                                    e('th', { className: 'px-4 py-2.5 text-center font-semibold w-[46%] border-l border-gray-200', colSpan: 2 }, 'Ý kiến Bộ phận thẩm định rủi ro'),
                                    e('th', { className: 'px-4 py-2.5 text-center font-semibold w-[23%] border-l border-gray-200' }, 'Mức độ')
                                )
                            ),
                            e('tbody', null,
                                tdrrReviewRows.map((row, idx) => {
                                    const selectedMode = tdrrReviewModes[idx] || 'boSung';
                                    const isDayDu = selectedMode === 'dayDu';
                                    const level = isDayDu ? 'Thống nhất' : 'Khác biệt';
                                    return e('tr', { key: idx, className: 'border-b border-gray-100 last:border-b-0 hover:bg-gray-50 text-gray-900 font-semibold transition-colors' },
                                        e('td', { className: 'px-4 py-3' }, row.content),
                                        e('td', { className: 'px-4 py-3 text-center border-l border-gray-100' },
                                            e('label', {
                                                className: 'inline-flex min-w-[190px] items-center justify-center gap-2 rounded-lg px-3 py-2 cursor-pointer transition-all ' +
                                                    (isDayDu ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100' : 'text-gray-500 hover:bg-gray-50')
                                            },
                                                e('input', {
                                                    type: 'radio',
                                                    name: `tdrrReview-${idx}`,
                                                    checked: isDayDu,
                                                    onChange: () => setTdrrReviewMode(idx, 'dayDu'),
                                                    className: 'w-4 h-4 accent-[#007672]'
                                                }),
                                                e('span', null, row.proposal)
                                            )
                                        ),
                                        e('td', { className: 'px-4 py-3 text-center border-l border-gray-100' },
                                            e('label', {
                                                className: 'inline-flex min-w-[190px] items-center justify-center gap-2 rounded-lg px-3 py-2 cursor-pointer transition-all ' +
                                                    (!isDayDu ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-100' : 'text-gray-500 hover:bg-gray-50')
                                            },
                                                e('input', {
                                                    type: 'radio',
                                                    name: `tdrrReview-${idx}`,
                                                    checked: !isDayDu,
                                                    onChange: () => setTdrrReviewMode(idx, 'boSung'),
                                                    className: 'w-4 h-4 accent-[#b45309]'
                                                }),
                                                e('span', null, row.risk)
                                            )
                                        ),
                                        e('td', { className: 'px-4 py-3 text-center border-l border-gray-100' },
                                            e('span', {
                                                className: 'inline-flex min-w-[92px] items-center justify-center px-3 py-1 rounded-full text-xs font-semibold ' +
                                                    (isDayDu ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700')
                                            }, level)
                                        )
                                    );
                                })
                            )
                        )
                    )
                ),
                e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm' },
                    e('div', { className: 'px-4 py-3 bg-[#f8fbfb] border-b border-gray-200' },
                        e('h4', { className: 'text-sm font-bold text-[#006B68] uppercase' }, 'Kết luận tổng hợp từ TĐRR')
                    ),
                    e('div', { className: 'p-4 flex items-center gap-8 flex-wrap' },
                        e('label', { className: 'flex items-center gap-2 text-sm font-medium text-gray-800 cursor-pointer' },
                            e('input', {
                                type: 'radio',
                                name: 'thamDinhOpinionMode',
                                checked: thamDinhOpinionMode === 'dayDu',
                                onChange: () => setThamDinhOpinionMode('dayDu'),
                                className: 'w-4 h-4 accent-[#006B68]'
                            }),
                            'Đã đánh giá đầy đủ'
                        ),
                        e('label', { className: 'flex items-center gap-2 text-sm font-medium text-gray-800 cursor-pointer' },
                            e('input', {
                                type: 'radio',
                                name: 'thamDinhOpinionMode',
                                checked: thamDinhOpinionMode === 'boSung',
                                onChange: () => setThamDinhOpinionMode('boSung'),
                                className: 'w-4 h-4 accent-[#006B68]'
                            }),
                            'Bổ sung ý kiến'
                        )
                    )
                ),
                thamDinhOpinionMode === 'boSung' && e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm' },
                    e('div', { className: 'px-4 py-3 bg-[#f8fbfb] border-b border-gray-200' },
                        e('h4', { className: 'text-sm font-bold text-[#006B68] uppercase' }, 'Nhận xét, đánh giá bổ sung')
                    ),
                    e('div', { className: 'border-b border-gray-100 px-3 py-2 flex items-center gap-1.5 flex-wrap' },
                        e('button', { className: 'w-8 h-8 rounded hover:bg-gray-100 text-gray-800 font-bold' }, 'B'),
                        e('button', { className: 'w-8 h-8 rounded hover:bg-gray-100 text-gray-800 italic font-semibold' }, 'I'),
                        e('button', { className: 'w-8 h-8 rounded hover:bg-gray-100 text-gray-800 underline font-semibold' }, 'U'),
                        e('button', { className: 'w-8 h-8 rounded hover:bg-gray-100 text-gray-800' }, e('i', { className: 'fas fa-align-left' })),
                        e('button', { className: 'w-8 h-8 rounded hover:bg-gray-100 text-gray-800' }, e('i', { className: 'fas fa-list-ul' })),
                        e('button', { className: 'w-8 h-8 rounded hover:bg-gray-100 text-gray-800' }, e('i', { className: 'fas fa-list-ol' }))
                    ),
                    e('div', { className: 'relative' },
                        e('textarea', {
                            className: 'w-full min-h-[170px] px-4 py-3 text-sm text-gray-800 outline-none resize-y',
                            placeholder: 'Nhập nhận xét bổ sung của TĐRR',
                            value: thamDinhOpinionText,
                            maxLength: 4000,
                            onChange: (ev) => setThamDinhOpinionText(ev.target.value)
                        }),
                        e('span', { className: 'absolute right-3 bottom-3 text-xs text-gray-400' }, `${thamDinhOpinionText.length}/4000`)
                    )
                )
            )
        );

    const renderReadonlyAssessmentBlock = (block) =>
        e('div', { key: block.title, className: 'bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm' },
            e('div', { className: 'px-4 py-2 border-b border-gray-200 bg-[#fbfcfc]' },
                e('span', { className: 'text-sm font-semibold text-gray-800' }, block.title)
            ),
            e('div', { className: 'px-4 py-3 text-sm leading-5 text-gray-800 whitespace-pre-line' }, block.text)
        );

    const renderFinancialOverview = () =>
        e('div', { className: 'bg-[#f5f6f7] border-t border-[#d7ecea] p-3 space-y-3' },
            renderAccordion('Bảng cân đối kế toán',
                e('div', { className: 'p-3 space-y-3 bg-[#f7f8f9]' },
                    e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
                        e('div', { className: 'px-4 py-2.5 border-b border-gray-200 text-sm font-semibold text-gray-800' }, 'Tài sản'),
                        renderFinancialTable('Khoản mục', taiSanData)
                    ),
                    e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
                        e('div', { className: 'px-4 py-2.5 border-b border-gray-200 text-sm font-semibold text-gray-800' }, 'Nguồn vốn'),
                        renderFinancialTable('Khoản mục', nguonVonData)
                    )
                ),
                overviewOpen.canDoi,
                () => toggleOverviewSection('canDoi')
            ),
            renderAccordion('Kết quả hoạt động kinh doanh',
                renderFinancialTable('Khoản mục', ketQuaKinhDoanhData),
                overviewOpen.kqkd,
                () => toggleOverviewSection('kqkd')
            ),
            renderAccordion('Lưu chuyển tiền tệ',
                renderFinancialTable('Khoản mục', luuChuyenTienTeData),
                overviewOpen.luuChuyen,
                () => toggleOverviewSection('luuChuyen')
            ),
            renderAccordion('Chỉ tiêu tài chính', renderFinancialRatioTable(), overviewOpen.chiTieu, () => toggleOverviewSection('chiTieu'))
        );

    const renderProposalOpinion = () =>
        e('div', { className: 'bg-[#f5f6f7] border-t border-[#d7ecea] p-3 space-y-3' },
            renderReadonlyGroup('Đánh giá tài chính',
                e(React.Fragment, null,
                    proposalAssessmentBlocks.map(renderReadonlyAssessmentBlock),
                    e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm' },
                        e('div', { className: 'px-4 py-2 border-b border-gray-200 bg-[#fbfcfc]' },
                            e('span', { className: 'text-sm font-semibold text-gray-800' }, 'Đánh giá chung')
                        ),
                        e('div', { className: 'px-4 py-3 text-sm leading-5 text-gray-800 bg-white whitespace-pre-line' }, assessmentGeneralText)
                    )
                )
            )
        );

    const renderChiTieuTaiChinhPopup = () =>
        e('div', { className: 'space-y-4' },
            e('div', { className: 'flex items-center justify-between gap-3 flex-wrap' },
                e('button', { className: 'h-9 px-3 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2' },
                    e('i', { className: 'fas fa-file-excel text-[#006B68]' }),
                    'Xuất Excel'
                ),
                e('div', { className: 'flex items-center gap-4 flex-wrap' },
                    e('label', { className: 'flex items-center gap-2 text-sm text-gray-600' },
                        'Đơn vị tính:',
                        e('select', { className: 'h-9 px-3 border border-gray-300 rounded-md bg-white text-sm text-gray-900' },
                            e('option', null, 'VND')
                        )
                    ),
                    e('label', { className: 'flex items-center gap-2 text-sm text-gray-600' },
                        'Đơn vị hiển thị:',
                        e('select', { className: 'h-9 px-3 border border-gray-300 rounded-md bg-white text-sm text-gray-900' },
                            e('option', null, 'Tỷ')
                        )
                    )
                )
            ),
            e('div', { className: 'flex border-b border-gray-200' },
                e('button', {
                    className: 'px-4 py-2 text-sm font-semibold ' + (activeChiTieuTab === 'quanTrong' ? 'text-[#006B68] border-b-2 border-[#006B68]' : 'text-gray-500'),
                    onClick: () => setActiveChiTieuTab('quanTrong')
                }, 'Chỉ tiêu quan trọng'),
                e('button', {
                    className: 'px-4 py-2 text-sm font-semibold ' + (activeChiTieuTab === 'boSung' ? 'text-[#006B68] border-b-2 border-[#006B68]' : 'text-gray-500'),
                    onClick: () => setActiveChiTieuTab('boSung')
                }, 'Chỉ tiêu tài chính bổ sung')
            ),
            e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                e('div', { className: 'overflow-x-auto' },
                    e('table', { className: 'w-full text-sm min-w-[900px]' },
                        e('thead', null,
                            e('tr', { className: 'bg-gray-50' },
                                e('th', { className: 'px-4 py-3 text-left font-semibold text-gray-900' }, 'Chỉ tiêu'),
                                ...appliedPeriods.map((period, idx) =>
                                    e('th', { key: idx, className: 'px-3 py-3 text-center font-semibold text-gray-900' },
                                        getPeriodDate(period)
                                    )
                                )
                            )
                        ),
                        e('tbody', null,
                            chiTieuQuanTrongData.map((item, idx) =>
                                e('tr', { key: idx, className: 'border-t border-gray-100 hover:bg-gray-50' },
                                    e('td', { className: 'px-4 py-2.5 text-gray-700' }, item.name),
                                    ...item.values.map((val, vIdx) =>
                                        e('td', { key: vIdx, className: 'px-3 py-2.5 text-right text-gray-700' }, val)
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );

    const renderFinancePopup = () => {
        if (!financePopup) return null;

        const isReport = financePopup === 'baoCaoTaiChinh';
        const title = isReport ? 'Báo cáo tài chính' : 'Chỉ tiêu tài chính';

        return e('div', { className: 'fixed top-0 right-0 bottom-0 left-14 z-50 bg-white shadow-2xl flex flex-col border-l border-gray-200' },
            e('div', { className: 'h-12 px-5 border-b border-gray-200 flex items-center justify-between bg-white flex-shrink-0' },
                e('div', { className: 'flex items-center gap-2 min-w-0 text-[#006B68]' },
                    e('i', { className: 'fas fa-external-link-alt text-sm flex-shrink-0' }),
                    e('h3', { className: 'text-base font-bold truncate' }, title)
                ),
                e('button', {
                    className: 'w-8 h-8 rounded-md hover:bg-gray-100 text-gray-500 flex items-center justify-center transition-colors',
                    onClick: () => setFinancePopup(null)
                }, e('i', { className: 'fas fa-times' }))
            ),
            e('div', { className: 'flex-1 min-h-0 overflow-auto bg-[#f5f7f8] p-4' },
                e('div', { className: 'max-w-[1600px] mx-auto' },
                    isReport
                        ? renderBaoCaoTaiChinh()
                        : e('div', { className: 'bg-white border border-gray-200 rounded-lg p-4 shadow-sm' },
                            renderChiTieuTaiChinhPopup()
                        )
                )
            )
        );
    };

    // Render Đánh giá tài chính
    const renderDanhGiaTaiChinh = () => {
        return e('div', { className: 'space-y-3' },
            e('div', { className: 'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3' },
                e('div', { className: 'flex items-center gap-3 flex-wrap min-w-0' },
                    e('div', { className: 'flex items-center gap-3' },
                        e('h3', { className: 'text-xl font-bold text-gray-800' }, 'Đánh giá tài chính'),
                        e('button', { className: 'text-gray-400 hover:text-gray-600' },
                            e('i', { className: 'fas fa-sync-alt text-sm' })
                        )
                    ),
                    e('button', {
                        className: 'h-8 px-3 border border-[#16a3a0] text-[#007672] bg-white rounded-md text-xs font-semibold hover:bg-[#eefbf9] flex items-center gap-2',
                        onClick: () => setFinancePopup('baoCaoTaiChinh')
                    },
                        e('i', { className: 'fas fa-external-link-alt text-[10px]' }),
                        'Báo cáo tài chính'
                    ),
                    e('button', {
                        className: 'h-8 px-3 border border-[#16a3a0] text-[#007672] bg-white rounded-md text-xs font-semibold hover:bg-[#eefbf9] flex items-center gap-2',
                        onClick: () => setFinancePopup('chiTieuTaiChinh')
                    },
                        e('i', { className: 'fas fa-external-link-alt text-[10px]' }),
                        'Chỉ tiêu tài chính'
                    ),
                    e('button', { className: 'h-8 px-4 bg-[#006B68] text-white rounded-md text-xs font-semibold hover:bg-[#005a57] flex items-center gap-2' },
                        e('i', { className: 'fas fa-save text-[11px]' }),
                        'Lưu'
                    )
                ),
                e('div', { className: 'flex items-center gap-2 justify-end flex-shrink-0' },
                    e('label', { className: 'h-8 px-3 border border-gray-200 rounded-md bg-white text-xs text-gray-500 flex items-center gap-1' },
                        'Đơn vị tính:',
                        e('span', { className: 'font-semibold text-gray-700' }, 'VND')
                    ),
                    e('label', { className: 'h-8 px-3 border border-gray-200 rounded-md bg-white text-xs text-gray-500 flex items-center gap-1' },
                        'Đơn vị hiển thị:',
                        e('span', { className: 'font-semibold text-gray-700' }, 'Tỷ')
                    )
                )
            ),

            e('div', { className: 'bg-white border border-[#cfe8e7] overflow-hidden' },
                renderOpinionSection('tongQuan', 'Tổng quan Tài chính', 'fas fa-chart-line', renderFinancialOverview()),
                renderOpinionSection('deXuat', 'Ý kiến Bộ phận đề xuất', 'fas fa-lightbulb', renderProposalOpinion()),
                renderOpinionSection('thamDinh', 'Ý kiến Bộ phận Thẩm định rủi ro', 'fas fa-clipboard-check', renderRiskAssessmentOpinion())
            ),
            renderFinancePopup()
        );
    };

    // Render content based on active subtab
    const renderContent = () => {
        switch (activeSubTab) {
            case 'baoCaoTaiChinh': return renderBaoCaoTaiChinh();
            case 'bieuDoTaiChinh': return renderBieuDoTaiChinh();
            case 'chiTieuTaiChinh': return renderChiTieuTaiChinh();
            case 'danhGiaTaiChinh': return renderDanhGiaTaiChinh();
            default: return null;
        }
    };

    return e('div', { className: 'space-y-3' },
        // Filter bar
        renderFilterBar(),
        renderContent()
    );
};
