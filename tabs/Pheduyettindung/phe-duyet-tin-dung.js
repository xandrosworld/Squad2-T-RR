// =====================================================
// Tab: Phê duyệt tín dụng
// =====================================================

// --- Helper: Export table data to Excel ---
function exportToExcel(headers, rows, fileName) {
    if (typeof XLSX === 'undefined') { alert('Thư viện xuất Excel chưa sẵn sàng. Vui lòng tải lại trang.'); return; }
    var data = [headers].concat(rows);
    var ws = XLSX.utils.aoa_to_sheet(data);
    // Auto-fit column widths
    ws['!cols'] = headers.map(function(h, i) {
        var maxLen = h.length;
        rows.forEach(function(r) { if (r[i] && String(r[i]).length > maxLen) maxLen = String(r[i]).length; });
        return { wch: Math.min(maxLen + 4, 50) };
    });
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
}

// --- Helper: Show toast notification ---
function showToastNotification(message, type) {
    var existing = document.querySelector('.custom-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'custom-toast';
    var iconColor = type === 'success' ? '#006B68' : type === 'warning' ? '#ea580c' : '#3b82f6';
    var iconClass = type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-circle' : 'fa-info-circle';
    toast.innerHTML = '<div style="display:flex;align-items:center;gap:10px;padding:14px 20px;background:white;border:1px solid #e5e7eb;border-radius:10px;box-shadow:0 10px 25px rgba(0,0,0,0.12);font-size:13px;font-family:Inter,sans-serif;color:#374151;animation:slideUp 0.3s ease">' +
        '<i class="fas ' + iconClass + '" style="color:' + iconColor + ';font-size:16px"></i>' +
        '<span>' + message + '</span></div>';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999';
    document.body.appendChild(toast);
    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 3000);
}

window.TabPheDuyetTinDung = function () {
    const e = React.createElement;
    const [activeTab, setActiveTab] = React.useState('tongQuan');
    const [approvalNote, setApprovalNote] = React.useState('');
    const [showCollateralList, setShowCollateralList] = React.useState(false);
    const [conditionDecisions, setConditionDecisions] = React.useState({});
    const [diffDecisions, setDiffDecisions] = React.useState({});
    const [diffComments, setDiffComments] = React.useState({});

    const tabs = [
        { id: 'tongQuan', label: 'Tổng quan' },
        { id: 'deXuatThamDinh', label: 'Đề xuất & Thẩm định' },
        { id: 'khacBietTrongYeu', label: 'Khác biệt trọng yếu', badge: 6 },
        { id: 'dieuKienTinDung', label: 'Điều kiện tín dụng', badge: 1 },
        { id: 'taiSanBaoDam', label: 'Biện pháp bảo đảm' }
    ];

    const approvalSummary = [
        { label: 'Tổng hạn mức đề xuất', value: '1.250 tỷ VND', icon: 'fa-sack-dollar', tone: 'bg-emerald-50 text-emerald-700' },
        { label: 'Tổng hạn mức thẩm định', value: '1.180 tỷ VND', icon: 'fa-file-signature', tone: 'bg-blue-50 text-blue-700' },
        { label: 'Khác biệt trọng yếu', value: '01', icon: 'fa-triangle-exclamation', tone: 'bg-red-50 text-red-700' },
        { label: 'Điều kiện cần lưu ý', value: '01', icon: 'fa-clipboard-check', tone: 'bg-amber-50 text-amber-700' }
    ];

    const proposalRows = [
        ['Hạn mức tín dụng ngắn hạn', '900 tỷ VND', '860 tỷ VND', 'Giảm do điều chỉnh tỷ lệ tài sản bảo đảm'],
        ['Bảo lãnh thanh toán', '250 tỷ VND', '250 tỷ VND', 'Phù hợp đề xuất'],
        ['Cho vay trung dài hạn', '100 tỷ VND', '70 tỷ VND', 'Rút ngắn thời hạn theo dòng tiền dự án']
    ];

    const differenceRows = [
        ['Hạn mức ngắn hạn', 'Giảm 40 tỷ VND so với đề xuất', 'Trọng yếu', 'Chờ ý kiến cấp phê duyệt'],
        ['Thời hạn khoản vay dự án', 'Thẩm định đề xuất rút từ 84 tháng còn 72 tháng', 'Theo dõi', 'Đã ghi nhận']
    ];

    const conditionRows = [
        ['Trước giải ngân', 'Bổ sung hồ sơ pháp lý tài sản hình thành trong tương lai', 'Bắt buộc', 'Chưa hoàn tất'],
        ['Sau giải ngân', 'Duy trì tỷ lệ tài sản bảo đảm tối thiểu 120%', 'Theo dõi định kỳ', 'Đang áp dụng'],
        ['Cam kết khách hàng', 'Không phát sinh nợ quá hạn tại TCTD khác', 'Bắt buộc', 'Đạt']
    ];

    const collateralRows = [
        ['Bất động sản', 'KCN Phú Mỹ, Bà Rịa - Vũng Tàu', '520 tỷ VND', 'Đã định giá'],
        ['Máy móc thiết bị', 'Dây chuyền sản xuất số 02', '180 tỷ VND', 'Cần cập nhật bảo hiểm'],
        ['Hàng tồn kho luân chuyển', 'Nguyên vật liệu và thành phẩm', '260 tỷ VND', 'Theo dõi hàng tháng']
    ];

    const collateralAssetRows = [
        ['1', 'Bất động sản', 'Quyền sử dụng đất và nhà xưởng tại KCN Yên Phong, Bắc Ninh', '60.000.000.000', '60,00%', 'Hợp lệ'],
        ['2', 'Máy móc thiết bị', 'Dây chuyền sản xuất chi tiết tủ phụ lực', '25.000.000.000', '25,00%', 'Hợp lệ'],
        ['3', 'Phương tiện vận tải', '02 xe đầu kéo', '3.000.000.000', '3,00%', 'Hợp lệ'],
        ['4', 'Tiền gửi', 'Tiền gửi tại BIDV', '2.000.000.000', '2,00%', 'Hợp lệ'],
        ['5', 'Hàng tồn kho', 'Nguyên vật liệu, thành phẩm', '10.000.000.000', '10,00%', 'Hợp lệ']
    ];

    const relatedDocuments = [
        { name: 'BC đề xuất tín dụng', file: 'BCDXTD_123.pdf', icon: 'fa-file-pdf', tone: 'text-red-500 bg-red-50' },
        { name: 'BC thẩm định rủi ro', file: 'BCTDRR_123.pdf', icon: 'fa-file-lines', tone: 'text-blue-600 bg-blue-50' },
        { name: 'Phương án kinh doanh', file: 'PAKD_ABC.xlsx', icon: 'fa-file-excel', tone: 'text-emerald-600 bg-emerald-50' },
        { name: 'Hồ sơ pháp lý KH', file: 'HSDKH_ABC.pdf', icon: 'fa-file-pdf', tone: 'text-red-500 bg-red-50' },
        { name: 'Tài liệu TSBĐ', file: 'TSBD_ABC.pdf', icon: 'fa-file-pdf', tone: 'text-red-500 bg-red-50' }
    ];

    const infoSummary = [
        ['Số tiền đề xuất', '100.000.000.000 VND'],
        ['Số tiền QLRR thẩm định', '80.000.000.000 VND'],
        ['Thời hạn khoản vay', '60 tháng'],
        ['Phương thức cho vay', 'Theo hạn mức'],
        ['Cán bộ QLRR phụ trách', 'Trần Thị B']
    ];

    const involvedPeople = [
        ['Cán bộ QLRR', 'Trần Thị B'],
        ['Cán bộ quản lý KH', 'Phạm Văn C'],
        ['Giám đốc đơn vị', 'Lê Văn D']
    ];

    const renderStatus = (status) => {
        const toneMap = {
            'Trọng yếu': 'bg-red-100 text-red-700',
            'Theo dõi': 'bg-amber-100 text-amber-700',
            'Bắt buộc': 'bg-red-100 text-red-700',
            'Theo dõi định kỳ': 'bg-amber-100 text-amber-700',
            'Đạt': 'bg-green-100 text-green-700',
            'Đã định giá': 'bg-green-100 text-green-700',
            'Chưa hoàn tất': 'bg-red-100 text-red-700',
            'Đang áp dụng': 'bg-blue-100 text-blue-700'
        };

        return e('span', {
            className: 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ' + (toneMap[status] || 'bg-gray-100 text-gray-700')
        }, status);
    };

    const renderTable = (headers, rows, statusIndexes) =>
        e('div', { className: 'overflow-x-auto border border-gray-200 rounded-lg' },
            e('table', { className: 'w-full text-xs', style: { minWidth: '640px' } },
                e('thead', null,
                    e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                        headers.map((header) =>
                            e('th', { key: header, className: 'px-3 py-2 text-left text-[11px] font-semibold text-gray-600' }, header)
                        )
                    )
                ),
                e('tbody', null,
                    rows.map((row, rowIndex) =>
                        e('tr', { key: rowIndex, className: 'border-b border-gray-100 last:border-b-0 hover:bg-gray-50' },
                            row.map((cell, cellIndex) =>
                                e('td', { key: cellIndex, className: 'px-3 py-2.5 text-gray-700 align-top' },
                                    statusIndexes && statusIndexes.includes(cellIndex) ? renderStatus(cell) : cell
                                )
                            )
                        )
                    )
                )
            )
        );

    const renderTongQuan = () => {
        const summaryGroups = [
            [
                ['Số tiền đề xuất', '100.000.000.000 VND'],
                ['Số tiền QLRR thẩm định', '80.000.000.000 VND'],
                ['Thời hạn khoản vay', '60 tháng'],
                ['Phương thức cho vay', 'Theo hạn mức']
            ],
            [
                ['Mục đích vay', 'Đầu tư xây dựng nhà máy'],
                ['Loại tiền', 'VND'],
                ['Lãi suất đề xuất', '9,0%/năm'],
                ['Lãi suất thẩm định', '8,5%/năm']
            ],
            [
                ['Cán bộ QLRR phụ trách', 'Trần Thị B'],
                ['Cán bộ quản lý KH', 'Phạm Văn C'],
                ['Chi nhánh quản lý', 'CN Sở giao dịch 1'],
                ['Ngày tạo hồ sơ', '20/05/2025']
            ]
        ];

        const renderFieldRows = (rows) =>
            e('div', { className: 'space-y-2.5' },
                rows.map((row) =>
                    e('div', { key: row[0], className: 'grid grid-cols-[minmax(112px,0.8fr)_minmax(0,1fr)] gap-3 text-xs' },
                        e('span', { className: 'text-gray-500 font-medium' }, row[0]),
                        e('span', { className: 'text-gray-800 font-semibold' }, row[1])
                    )
                )
            );

        return e('div', { className: 'space-y-4' },
            e('section', null,
                e('h3', { className: 'text-sm font-bold uppercase tracking-wide text-[#006B68] mb-3' }, 'Thông tin tóm tắt'),
                e('div', { className: 'grid grid-cols-1 lg:grid-cols-3 gap-4' },
                    summaryGroups.map((group, idx) =>
                        e('div', { key: idx, className: 'border-r border-gray-100 last:border-r-0 lg:pr-4 last:pr-0' },
                            renderFieldRows(group)
                        )
                    )
                )
            ),

            e('section', null,
                e('h3', { className: 'text-sm font-bold uppercase tracking-wide text-[#006B68] mb-3' }, 'Kết quả thẩm định'),
                e('div', { className: 'grid grid-cols-1 lg:grid-cols-3 gap-3' },
                    e('div', { className: 'bg-gray-50 border border-gray-100 rounded-lg p-3.5' },
                        e('h4', { className: 'text-xs font-bold text-gray-800 mb-3' }, 'Đánh giá của BPTĐRR'),
                        e('div', { className: 'space-y-3 text-xs' },
                            e('div', { className: 'flex items-center justify-between gap-3' },
                                e('span', { className: 'text-gray-500' }, 'Xếp hạng tín dụng'),
                                e('span', { className: 'px-2.5 py-1 bg-green-100 text-green-700 rounded-md font-bold' }, 'BBB')
                            ),
                            e('div', { className: 'flex items-center justify-between gap-3' },
                                e('span', { className: 'text-gray-500' }, 'Điểm xếp hạng'),
                                e('span', { className: 'font-semibold text-gray-800' }, '72/100')
                            ),
                            e('div', { className: 'grid grid-cols-[84px_minmax(0,1fr)] gap-3' },
                                e('span', { className: 'text-gray-500' }, 'Kết luận'),
                                e('span', { className: 'font-semibold text-gray-800' }, 'Khách hàng đáp ứng yêu cầu tín dụng')
                            )
                        )
                    ),
                    e('div', { className: 'bg-gray-50 border border-gray-100 rounded-lg p-3.5' },
                        e('h4', { className: 'text-xs font-bold text-gray-800 mb-3' }, 'Khuyến nghị'),
                        renderFieldRows([
                            ['Số tiền khuyến nghị', '80.000.000.000 VND'],
                            ['Thời hạn khuyến nghị', '60 tháng'],
                            ['Phương thức cho vay', 'Theo hạn mức'],
                            ['Tài sản bảo đảm', 'Đầy đủ']
                        ])
                    ),
                    e('div', { className: 'bg-gray-50 border border-gray-100 rounded-lg p-3.5' },
                        e('h4', { className: 'text-xs font-bold text-gray-800 mb-3' }, 'Nhận xét chính'),
                        e('ul', { className: 'space-y-2 text-xs text-gray-700 leading-5' },
                            [
                                'Tình hình tài chính ổn định, dòng tiền ổn định.',
                                'Dự án khả thi, hiệu quả tài chính tốt.',
                                'TSBĐ đáp ứng tỷ lệ 120% theo chính sách.',
                                'Tuân thủ đầy đủ điều kiện cấp tín dụng.'
                            ].map((item) =>
                                e('li', { key: item, className: 'flex gap-2' },
                                    e('span', { className: 'text-[#006B68] mt-0.5' }, '•'),
                                    e('span', null, item)
                                )
                            )
                        )
                    )
                )
            ),

            e('section', null,
                e('h3', { className: 'text-sm font-bold uppercase tracking-wide text-[#006B68] mb-3' }, 'Quyết định cấp tín dụng'),
                e('div', { className: 'grid grid-cols-1 lg:grid-cols-[1.35fr_repeat(4,minmax(0,1fr))] gap-3 items-center bg-green-50/70 border border-green-100 rounded-lg p-3.5' },
                    e('div', { className: 'flex items-center gap-3' },
                        e('div', { className: 'w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0' },
                            e('i', { className: 'fas fa-check text-sm' })
                        ),
                        e('div', null,
                            e('div', { className: 'text-xs text-gray-500 font-semibold' }, 'Quyết định'),
                            e('div', { className: 'text-sm font-bold text-green-700' }, 'PHÊ DUYỆT CẤP TÍN DỤNG')
                        )
                    ),
                    [
                        ['Số tiền phê duyệt', '80.000.000.000 VND'],
                        ['Ngày quyết định', '21/05/2025'],
                        ['Hiệu lực đến', '21/05/2026']
                    ].map((item) =>
                        e('div', { key: item[0], className: 'text-xs' },
                            e('div', { className: 'text-gray-500 font-semibold mb-1' }, item[0]),
                            e('div', { className: 'text-[#006B68] font-bold' }, item[1])
                        )
                    ),
                    e('div', { className: 'text-xs' },
                        e('div', { className: 'text-gray-500 font-semibold mb-1' }, 'Người phê duyệt'),
                        e('div', { className: 'text-gray-800 font-bold' }, 'Nguyễn Văn A'),
                        e('div', { className: 'text-gray-500 mt-0.5' }, 'Phó Giám đốc')
                    )
                )
            )
        );
    };

    const renderDeXuatThamDinh = () => {
        const proposalDetailRows = [
            ['1', 'Số tiền cấp tín dụng', '100.000.000.000 VND'],
            ['2', 'Thời hạn khoản vay', '60 tháng'],
            ['3', 'Phương thức cho vay', 'Theo hạn mức'],
            ['4', 'Kỳ hạn trả nợ gốc', 'Trả gốc 6 tháng/lần'],
            ['5', 'Kỳ hạn trả lãi', 'Trả lãi 3 tháng/lần'],
            ['6', 'Tài sản bảo đảm', 'TSBĐ gồm: QSDĐ, Nhà xưởng, Máy móc thiết bị'],
            ['7', 'Vốn chủ sở hữu tham gia', '20% tổng mức đầu tư; góp trước giải ngân 30%'],
            ['8', 'Tỷ lệ cấp tín dụng', '75% tổng nhu cầu vốn'],
            ['9', 'Mục đích vay', 'Đầu tư xây dựng nhà máy sản xuất linh kiện điện tử'],
            ['10', 'Phương án trả nợ', 'Trả nợ từ dòng tiền hoạt động của dự án']
        ];

        const appraisalDetailRows = [
            ['1', 'Số tiền cấp tín dụng', '80.000.000.000 VND'],
            ['2', 'Thời hạn khoản vay', '48 tháng'],
            ['3', 'Phương thức cho vay', 'Theo hạn mức'],
            ['4', 'Kỳ hạn trả nợ gốc', 'Trả gốc 3 tháng/lần'],
            ['5', 'Kỳ hạn trả lãi', 'Trả lãi 3 tháng/lần'],
            ['6', 'Tài sản bảo đảm', 'Bổ sung thêm TSBĐ: Quyền sử dụng đất khác'],
            ['7', 'Vốn chủ sở hữu tham gia', '30% tổng mức đầu tư; góp trước giải ngân 50%'],
            ['8', 'Tỷ lệ cấp tín dụng', '65% tổng nhu cầu vốn'],
            ['9', 'Đánh giá rủi ro tổng quan', 'Rủi ro trung bình - Biện pháp kiểm soát chấp nhận được'],
            ['10', 'Kết luận thẩm định', 'Đáp ứng điều kiện cấp tín dụng với các điều kiện kèm theo']
        ];

        const renderDetailCard = (title, subtitle, headers, rows, buttonText, iconClass, tone) =>
            e('div', { className: 'border border-gray-200 rounded-lg bg-white overflow-hidden' },
                e('div', { className: 'px-3.5 py-3 border-b border-gray-100' },
                    e('h3', { className: 'text-sm font-bold uppercase tracking-wide ' + tone.title },
                        title,
                        e('span', { className: 'normal-case text-[11px] text-gray-500 font-semibold ml-1' }, subtitle)
                    )
                ),
                e('div', { className: 'overflow-x-auto' },
                    e('table', { className: 'w-full text-xs', style: { minWidth: '520px' } },
                        e('thead', null,
                            e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                                headers.map((header, idx) =>
                                    e('th', {
                                        key: header,
                                        className: 'px-3 py-2.5 text-left text-[11px] font-bold text-gray-700',
                                        style: idx === 0 ? { width: '46px' } : idx === 1 ? { width: '34%' } : {}
                                    }, header)
                                )
                            )
                        ),
                        e('tbody', null,
                            rows.map((row) =>
                                e('tr', { key: row[0], className: 'border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70' },
                                    e('td', { className: 'px-3 py-2.5 text-center text-gray-600 font-semibold align-top' }, row[0]),
                                    e('td', { className: 'px-3 py-2.5 text-gray-700 font-semibold align-top' }, row[1]),
                                    e('td', { className: 'px-3 py-2.5 text-gray-800 align-top leading-5' }, row[2])
                                )
                            )
                        )
                    )
                ),
                e('div', { className: 'px-3 py-2.5 border-t border-gray-100 bg-gray-50' },
                    e('button', { className: 'h-8 px-3 border rounded-lg text-xs font-semibold ' + tone.button },
                        e('i', { className: 'fas ' + iconClass + ' mr-2 text-[11px]' }),
                        buttonText,
                        e('i', { className: 'fas fa-circle-info ml-2 text-[11px] opacity-70' })
                    )
                )
            );

        return e('div', { className: 'grid grid-cols-1 2xl:grid-cols-2 gap-3' },
            renderDetailCard(
                'A. Thông tin đề xuất tín dụng',
                '(Theo Báo cáo đề xuất tín dụng)',
                ['STT', 'Nội dung', 'Chi tiết đề xuất'],
                proposalDetailRows,
                'Xem Báo cáo đề xuất tín dụng',
                'fa-file-lines',
                { title: 'text-[#006B68]', button: 'border-[#006B68]/30 text-[#006B68] bg-white hover:bg-[#006B68]/5' }
            ),
            renderDetailCard(
                'B. Kết quả thẩm định QLRR',
                '(Theo Báo cáo thẩm định rủi ro)',
                ['STT', 'Nội dung', 'Kết quả thẩm định QLRR'],
                appraisalDetailRows,
                'Xem Báo cáo thẩm định rủi ro',
                'fa-file-shield',
                { title: 'text-blue-700', button: 'border-blue-200 text-blue-700 bg-white hover:bg-blue-50' }
            )
        );
    };

    const renderKhacBiet = () => {
        const diffRows = [
            { id: 'kb-1', stt: '1', group: 'Số tiền cấp tín dụng', content: 'Khác biệt về tổng mức cấp tín dụng đề xuất', bpdx: '100.000.000.000 VND', qlrr: '80.000.000.000 VND', level: 'Trọng yếu' },
            { id: 'kb-2', stt: '2', group: 'Thời hạn cấp tín dụng', content: 'Khác biệt về thời hạn khoản vay', bpdx: '60 tháng', qlrr: '48 tháng', level: 'Trọng yếu' },
            { id: 'kb-3', stt: '3', group: 'Kỳ hạn trả nợ', content: 'Khác biệt về lịch trả nợ gốc/lãi', bpdx: 'Trả gốc 6 tháng/lần, lãi hàng tháng', qlrr: 'Trả gốc 3 tháng/lần, lãi hàng tháng', level: 'Trọng yếu' },
            { id: 'kb-4', stt: '4', group: 'Tài sản bảo đảm', content: 'Khác biệt về danh mục/ tỷ lệ TSBĐ', bpdx: 'Bảo đảm một phần, TSBĐ theo danh mục A', qlrr: 'Bổ sung TSBĐ để đạt tỷ lệ tối thiểu theo quy định', level: 'Trọng yếu' },
            { id: 'kb-5', stt: '5', group: 'Vốn chủ sở hữu tham gia', content: 'Khác biệt về tỷ lệ/ thời điểm góp vốn', bpdx: '20%, góp vốn theo tiến độ dự án', qlrr: '30%, góp trước khi giải ngân', level: 'Trọng yếu' },
            { id: 'kb-6', stt: '6', group: 'Tỷ lệ cấp tín dụng', content: 'Khác biệt về tỷ lệ cấp tín dụng/ tổng nhu cầu vốn', bpdx: '75% tổng nhu cầu vốn', qlrr: '65% tổng nhu cầu vốn', level: 'Trọng yếu' }
        ];

        const diffDecisionOptions = ['Chọn', 'Chấp thuận theo BCĐXTD', 'Chấp thuận theo BCTĐRR', 'Chấp thuận phương án khác', 'Không chấp thuận nội dung đề xuất'];

        return e('div', { className: 'space-y-3' },
            // Header with title and action buttons
            e('div', { className: 'flex flex-wrap items-center justify-between gap-3' },
                e('h3', { className: 'text-sm font-bold uppercase tracking-wide text-[#006B68] flex items-center gap-2' },
                    'Xử lý khác biệt trọng yếu',
                    e('i', { className: 'fas fa-circle-info text-[11px] text-gray-400' })
                ),
                e('div', { className: 'flex items-center gap-2' },
                    e('button', { className: 'h-8 px-3 border border-gray-200 bg-white text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 flex items-center gap-2',
                        onClick: function() { showToastNotification('Đang mở Báo cáo đề xuất tín dụng...', 'info'); }
                    },
                        e('i', { className: 'fas fa-file-lines text-[11px] text-[#006B68]' }), 'Xem BCĐXTD'
                    ),
                    e('button', { className: 'h-8 px-3 border border-gray-200 bg-white text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 flex items-center gap-2',
                        onClick: function() { showToastNotification('Đang mở Báo cáo thẩm định rủi ro...', 'info'); }
                    },
                        e('i', { className: 'fas fa-file-shield text-[11px] text-blue-600' }), 'Xem BCTĐRR'
                    ),
                    e('button', { className: 'h-8 px-3 border border-[#006B68]/30 bg-white text-[#006B68] rounded-lg text-xs font-semibold hover:bg-[#006B68]/5 flex items-center gap-2',
                        onClick: function() {
                            var headers = ['STT', 'Nhóm nội dung khác biệt', 'Nội dung khác biệt', 'Đề xuất của BPĐX (Theo BCĐXTD)', 'Ý kiến của QLRR (Theo BCTĐRR)', 'Mức độ ảnh hưởng', 'Quyết định phê duyệt', 'Ý kiến/Điều kiện phê duyệt'];
                            var rows = diffRows.map(function(r) { return [r.stt, r.group, r.content, r.bpdx, r.qlrr, r.level, diffDecisions[r.id] || 'Chưa chọn', diffComments[r.id] || '']; });
                            exportToExcel(headers, rows, 'Khac_biet_trong_yeu.xlsx');
                            showToastNotification('Đã xuất file Excel thành công!', 'success');
                        }
                    },
                        e('i', { className: 'fas fa-file-excel text-[11px]' }), 'Xuất Excel'
                    )
                )
            ),

            // Info banner
            e('div', { className: 'flex items-start gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5 leading-5' },
                e('i', { className: 'fas fa-circle-info mt-0.5 flex-shrink-0' }),
                e('span', null, 'Khi có sự khác biệt ý kiến giữa Báo cáo thẩm định rủi ro với Báo cáo đề xuất tín dụng về những vấn đề trọng yếu, bộ phận QLRR nêu rõ các nội dung khác biệt tại Báo cáo thẩm định rủi ro và trình cấp thẩm quyền phê duyệt xử lý khác biệt để xem xét, quyết định.')
            ),

            // Table
            e('div', { className: 'overflow-x-auto border border-gray-200 rounded-lg bg-white' },
                e('table', { className: 'w-full text-xs', style: { minWidth: '1100px' } },
                    e('thead', null,
                        e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                            e('th', { className: 'px-3 py-3 text-left font-bold text-gray-700', style: { width: '44px' } }, 'STT'),
                            e('th', { className: 'px-3 py-3 text-left font-bold text-gray-700', style: { width: '150px' } }, 'Nhóm nội dung khác biệt'),
                            e('th', { className: 'px-3 py-3 text-left font-bold text-gray-700', style: { width: '180px' } }, 'Nội dung khác biệt'),
                            e('th', { className: 'px-3 py-3 text-left font-bold text-gray-700' },
                                'Đề xuất của BPĐX',
                                e('div', { className: 'text-[10px] text-gray-400 font-semibold mt-0.5' }, '(Theo BCĐXTD)')
                            ),
                            e('th', { className: 'px-3 py-3 text-left font-bold text-gray-700' },
                                'Ý kiến của QLRR',
                                e('div', { className: 'text-[10px] text-gray-400 font-semibold mt-0.5' }, '(Theo BCTĐRR)')
                            ),
                            e('th', { className: 'px-3 py-3 text-center font-bold text-gray-700', style: { width: '100px' } }, 'Mức độ ảnh hưởng'),
                            e('th', { className: 'px-3 py-3 text-left font-bold text-gray-700', style: { width: '190px' } },
                                'Quyết định phê duyệt ', e('span', { className: 'text-red-500' }, '*')
                            ),
                            e('th', { className: 'px-3 py-3 text-left font-bold text-gray-700', style: { width: '160px' } }, 'Ý kiến/Điều kiện phê duyệt')
                        )
                    ),
                    e('tbody', null,
                        diffRows.map((row) =>
                            e('tr', { key: row.id, className: 'border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70 align-top' },
                                e('td', { className: 'px-3 py-3 text-center text-gray-600 font-semibold' }, row.stt),
                                e('td', { className: 'px-3 py-3 text-gray-700 font-semibold' }, row.group),
                                e('td', { className: 'px-3 py-3 text-gray-600 leading-5' }, row.content),
                                e('td', { className: 'px-3 py-3 text-gray-700 leading-5' }, row.bpdx),
                                e('td', { className: 'px-3 py-3 text-orange-700 font-semibold leading-5' }, row.qlrr),
                                e('td', { className: 'px-3 py-3 text-center' },
                                    e('span', { className: 'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold bg-red-100 text-red-700' }, row.level)
                                ),
                                e('td', { className: 'px-3 py-3' },
                                    e('select', {
                                        className: 'w-full border border-gray-200 bg-white text-gray-700 rounded-lg px-2 py-1.5 text-xs font-semibold focus:border-[#006B68] focus:ring-2 focus:ring-[#006B68]/10 outline-none',
                                        value: diffDecisions[row.id] || 'Chọn',
                                        onChange: (ev) => setDiffDecisions(prev => ({ ...prev, [row.id]: ev.target.value }))
                                    },
                                        diffDecisionOptions.map((opt) =>
                                            e('option', { key: opt, value: opt, disabled: opt === 'Chọn' }, opt)
                                        )
                                    )
                                ),
                                e('td', { className: 'px-3 py-3' },
                                    e('input', {
                                        type: 'text',
                                        className: 'w-full border border-gray-200 bg-white text-gray-700 rounded-lg px-2 py-1.5 text-xs focus:border-[#006B68] focus:ring-2 focus:ring-[#006B68]/10 outline-none',
                                        placeholder: 'Nhập ý kiến...',
                                        value: diffComments[row.id] || '',
                                        onChange: (ev) => setDiffComments(prev => ({ ...prev, [row.id]: ev.target.value }))
                                    })
                                )
                            )
                        )
                    )
                )
            ),

            // Footer note
            e('div', { className: 'flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2.5 leading-5' },
                e('i', { className: 'fas fa-circle-exclamation mt-0.5 flex-shrink-0' }),
                e('div', null,
                    e('span', { className: 'font-bold' }, 'Lưu ý:'),
                    e('ul', { className: 'mt-1 space-y-0.5 list-disc list-inside text-amber-700' },
                        e('li', null, 'Cấp phê duyệt phải lựa chọn quyết định xử lý đối với từng nội dung khác biệt trước khi hoàn tất phê duyệt hồ sơ.'),
                        e('li', null, 'Trường hợp chọn "Chấp thuận phương án khác" hoặc "Không chấp thuận nội dung đề xuất", cần nhập ý kiến/điều kiện phê duyệt.')
                    )
                )
            )
        );
    };

    const renderDieuKien = () => {
        const decisionOptions = ['Thống nhất BCĐXTD', 'Thống nhất BCTĐTD'];
        const conditionGroups = [
            {
                group: '1. Điều kiện giải ngân',
                rows: [
                    { id: 'dk-11', code: '1.1', content: 'Giấy phép xây dựng', bpdX: 'Đã có giấy phép xây dựng', bptdrr: 'Đã có giấy phép xây dựng', type: 'same' },
                    { id: 'dk-12', code: '1.2', content: 'Hợp đồng EPC', bpdX: 'Đã ký hợp đồng EPC với tổng thầu đủ điều kiện', bptdrr: 'Đã ký hợp đồng EPC với tổng thầu đủ điều kiện', type: 'same' },
                    { id: 'dk-13', code: '1.3', content: 'Vốn chủ sở hữu đã góp', bpdX: 'Tối thiểu 20% tổng mức đầu tư', bptdrr: 'Tối thiểu 30% tổng mức đầu tư', type: 'diff', decision: 'Thống nhất BCTĐTD' },
                    { id: 'dk-14', code: '1.4', content: 'Bảo hiểm công trình', bpdX: 'Bắt buộc mua bảo hiểm mọi rủi ro trong suốt thời gian xây dựng', bptdrr: 'Bắt buộc mua bảo hiểm mọi rủi ro trong suốt thời gian xây dựng và vận hành thử', type: 'diff', decision: 'Thống nhất BCTĐTD' }
                ]
            },
            {
                group: '2. Điều kiện trong quá trình vay',
                rows: [
                    { id: 'dk-21', code: '2.1', content: 'Báo cáo tài chính', bpdX: 'Định kỳ hàng quý, trong vòng 20 ngày kể từ ngày kết thúc quý', bptdrr: 'Định kỳ hàng quý, trong vòng 30 ngày kể từ ngày kết thúc quý', type: 'diff', decision: 'Thống nhất BCĐXTD' },
                    { id: 'dk-22', code: '2.2', content: 'Duy trì tỷ lệ DSCR tối thiểu', bpdX: 'DSCR ≥ 1,20 lần', bptdrr: 'DSCR ≥ 1,30 lần', type: 'diff', decision: 'Thống nhất BCTĐTD' },
                    { id: 'dk-23', code: '2.3', content: 'Không chia cổ tức', bpdX: 'Không chia cổ tức trong thời gian vay', bptdrr: 'Không chia cổ tức trong thời gian vay', type: 'same' },
                    { id: 'dk-24', code: '2.4', content: 'Thay đổi mục đích sử dụng vốn', bpdX: 'Không được thay đổi mục đích sử dụng vốn', bptdrr: 'Không được thay đổi mục đích sử dụng vốn trừ trường hợp được ngân hàng chấp thuận', type: 'diff', decision: 'Thống nhất BCTĐTD' }
                ]
            },
            {
                group: '3. Điều kiện sau khi vay',
                rows: [
                    { id: 'dk-31', code: '3.1', content: 'Cung cấp báo cáo quyết toán dự án', bpdX: 'Trong vòng 6 tháng kể từ ngày nghiệm thu', bptdrr: 'Trong vòng 3 tháng kể từ ngày nghiệm thu', type: 'diff', decision: 'Thống nhất BCTĐTD' },
                    { id: 'dk-32', code: '3.2', content: 'Lưu giữ TSBĐ', bpdX: 'Lưu giữ TSBĐ tại vị trí do KH quản lý', bptdrr: 'Lưu giữ TSBĐ tại vị trí do Ngân hàng chỉ định', type: 'diff', decision: 'Thống nhất BCTĐTD' },
                    { id: 'dk-33', code: '3.3', content: 'Kiểm tra, giám sát sau vay', bpdX: 'Theo kế hoạch của Ngân hàng', bptdrr: 'Ít nhất 2 lần/năm hoặc theo yêu cầu', type: 'supplement' }
                ]
            }
        ];

        const renderDecision = (row) => {
            const isDiff = row.bpdX !== row.bptdrr;
            if (!isDiff) {
                return e('span', { className: 'text-xs text-gray-300' }, '—');
            }

            const value = conditionDecisions[row.id] || row.decision || decisionOptions[0];
            return e('select', {
                className: 'w-full min-w-[150px] border border-gray-200 bg-white text-gray-700 rounded-lg px-2 py-1.5 text-xs font-semibold focus:border-[#006B68] focus:ring-2 focus:ring-[#006B68]/10 outline-none',
                value,
                onChange: (ev) => setConditionDecisions(prev => ({ ...prev, [row.id]: ev.target.value }))
            },
                decisionOptions.map((option) =>
                    e('option', { key: option, value: option }, option)
                )
            );
        };

        const renderComparisonCell = (value, type) => {
            const tone = type === 'diff'
                ? 'text-orange-700 font-semibold'
                : type === 'supplement'
                    ? 'text-blue-700 font-semibold'
                    : 'text-gray-700';

            return e('span', { className: tone }, value);
        };

        return e('div', { className: 'space-y-3' },
            e('div', { className: 'flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2' },
                e('div', { className: 'flex items-center gap-2 text-xs font-semibold text-amber-700' },
                    e('i', { className: 'fas fa-circle-exclamation text-amber-500' }),
                    e('span', null, 'Điều kiện tín dụng giữa BPĐX và BPTĐRR có khác biệt. Vui lòng xem chi tiết và xác nhận quyết định.')
                ),
                e('div', { className: 'flex items-center gap-4 text-[11px] text-gray-600' },
                    e('span', { className: 'inline-flex items-center gap-1.5' }, e('i', { className: 'fas fa-circle text-[7px] text-green-500' }), 'Giống nhau'),
                    e('span', { className: 'inline-flex items-center gap-1.5' }, e('i', { className: 'fas fa-circle text-[7px] text-orange-500' }), 'Khác biệt'),
                    e('span', { className: 'inline-flex items-center gap-1.5' }, e('i', { className: 'fas fa-circle text-[7px] text-blue-500' }), 'BPTĐRR bổ sung')
                )
            ),
            e('div', { className: 'overflow-x-auto border border-gray-200 rounded-lg bg-white' },
                e('table', { className: 'w-full text-xs', style: { minWidth: '980px' } },
                    e('thead', null,
                        e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                            e('th', { className: 'px-3 py-3 text-left font-bold text-gray-700', style: { width: '130px' } }, 'Nhóm điều kiện'),
                            e('th', { className: 'px-3 py-3 text-left font-bold text-gray-700', style: { width: '190px' } }, 'Nội dung điều kiện'),
                            e('th', { className: 'px-3 py-3 text-left font-bold text-gray-700' },
                                'Đề xuất của BPĐX',
                                e('div', { className: 'text-[10px] text-gray-400 font-semibold mt-0.5' }, 'Ngày 18/05/2025')
                            ),
                            e('th', { className: 'px-3 py-3 text-left font-bold text-gray-700' },
                                'Đề xuất của BPTĐRR',
                                e('div', { className: 'text-[10px] text-gray-400 font-semibold mt-0.5' }, 'Ngày 20/05/2025')
                            ),
                            e('th', { className: 'px-3 py-3 text-left font-bold text-gray-700', style: { width: '180px' } },
                                'Quyết định ', e('i', { className: 'fas fa-circle-info text-[#006B68] text-[11px]' })
                            )
                        )
                    ),
                    e('tbody', null,
                        conditionGroups.flatMap((group) =>
                            group.rows.map((row, rowIdx) =>
                                e('tr', { key: row.id, className: 'border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70' },
                                    rowIdx === 0 && e('td', {
                                        rowSpan: group.rows.length,
                                        className: 'px-3 py-3 align-middle text-gray-700 font-bold bg-gray-50/60 border-r border-gray-100'
                                    }, group.group),
                                    e('td', { className: 'px-3 py-3 align-top text-gray-700 font-semibold' },
                                        e('span', { className: 'text-gray-500 mr-1' }, row.code),
                                        row.content
                                    ),
                                    e('td', { className: 'px-3 py-3 align-top leading-5' }, renderComparisonCell(row.bpdX, 'same')),
                                    e('td', { className: 'px-3 py-3 align-top leading-5' }, renderComparisonCell(row.bptdrr, row.type)),
                                    e('td', { className: 'px-3 py-3 align-top' }, renderDecision(row))
                                )
                            )
                        )
                    )
                )
            )
        );
    };

    const renderTaiSanBaoDam = () => {
        const coefficientList = [
            'Bất động sản: hệ số 0,70',
            'Máy móc thiết bị: hệ số 0,50',
            'Phương tiện vận tải: hệ số 0,50',
            'Tiền gửi: hệ số 1,00',
            'Hàng tồn kho: hệ số 0,50'
        ];
        const managementRules = [
            'Công chứng/đăng ký giao dịch bảo đảm',
            'Mua bảo hiểm và chuyển quyền thụ hưởng',
            'Kiểm tra, đánh giá lại định kỳ 12 tháng/lần',
            'Không mua bán, chuyển nhượng khi chưa có văn bản đồng ý của BIDV'
        ];

        const renderBullets = (items) =>
            e('ul', { className: 'space-y-1.5 text-xs text-gray-700 leading-5' },
                items.map((item) =>
                    e('li', { key: item, className: 'flex gap-2' },
                        e('span', { className: 'text-gray-500 mt-0.5' }, '•'),
                        e('span', null, item)
                    )
                )
            );

        const renderPolicyRows = (rows) =>
            e('div', { className: 'border border-gray-100 rounded-lg overflow-hidden' },
                rows.map((row, idx) =>
                    e('div', {
                        key: row.label,
                        className: 'grid grid-cols-[minmax(150px,0.8fr)_minmax(0,1fr)] gap-3 px-3 py-2.5 text-xs border-b border-gray-100 last:border-b-0 ' + (idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60')
                    },
                        e('div', { className: 'text-gray-600 font-semibold' }, row.label),
                        e('div', { className: 'text-gray-800 font-medium leading-5' },
                            Array.isArray(row.value) ? renderBullets(row.value) : row.value
                        )
                    )
                )
            );

        const renderProposalCard = (title, sectionTitle, rows, tone, extraTop) =>
            e('div', { className: 'border border-gray-200 rounded-lg bg-white overflow-hidden' },
                e('div', { className: 'px-4 py-3 border-b border-gray-100 ' + tone.header },
                    e('h3', { className: 'text-sm font-bold uppercase tracking-wide ' + tone.title }, title)
                ),
                e('div', { className: 'p-3.5 space-y-3' },
                    extraTop,
                    e('div', { className: 'flex items-center justify-between gap-3' },
                        e('h4', { className: 'text-xs font-bold text-[#006B68]' }, sectionTitle),
                        e('i', { className: 'fas fa-chevron-down text-[10px] text-gray-400' })
                    ),
                    renderPolicyRows(rows)
                )
            );

        const proposalRows = [
            { label: 'Chính sách tỷ lệ TSBĐ yêu cầu', value: '≥ 100%' },
            { label: 'Tỷ lệ TSBĐ đề xuất', value: '100%' },
            { label: 'Tỷ lệ TSBĐ thực tế (theo giá trị định giá)', value: '115% (115.000.000.000 VND)' },
            { label: 'Loại TSBĐ yêu cầu - Hệ số TSBĐ yêu cầu', value: coefficientList },
            { label: 'Điều kiện quản lý TSBĐ', value: managementRules },
            { label: 'Chính sách kiểm soát dòng tiền từ TSBĐ', value: 'Toàn bộ dòng tiền từ TSBĐ chuyển về tài khoản phong tỏa tại BIDV' },
            { label: 'Đánh giá - Kết luận', value: 'TSBĐ đảm bảo đủ tỷ lệ theo chính sách, đáp ứng yêu cầu bảo đảm khoản vay.' }
        ];

        const appraisalRows = [
            { label: 'Chính sách tỷ lệ TSBĐ yêu cầu', value: '≥ 120%' },
            { label: 'Tỷ lệ TSBĐ đề xuất', value: '120%' },
            { label: 'Tỷ lệ TSBĐ thực tế (theo giá trị định giá)', value: '110% (110.000.000.000 VND)' },
            { label: 'Loại TSBĐ yêu cầu - Hệ số TSBĐ yêu cầu', value: coefficientList },
            { label: 'Yêu cầu TSBĐ bổ sung', value: 'Yêu cầu bổ sung thêm TSBĐ trị giá tối thiểu 10.000.000.000 VND' },
            { label: 'Điều kiện quản lý TSBĐ', value: managementRules },
            { label: 'Chính sách kiểm soát dòng tiền từ TSBĐ', value: 'Toàn bộ dòng tiền từ TSBĐ chuyển về tài khoản phong tỏa tại BIDV và tài khoản thanh toán để trả nợ vay' },
            { label: 'Đánh giá - Kết luận của BPTĐRR', value: 'TSBĐ hiện tại chưa đạt tỷ lệ theo chính sách. Đề nghị bổ sung TSBĐ để đảm bảo tỷ lệ ≥ 120%.' }
        ];

        return e('div', { className: 'grid grid-cols-1 2xl:grid-cols-2 gap-3' },
            renderProposalCard(
                'A. Đề xuất của BPĐX',
                '2. Chính sách TSBĐ đề xuất',
                proposalRows,
                { header: 'bg-[#006B68]/5', title: 'text-[#006B68]' },
                e('button', {
                    className: 'w-full flex items-center justify-between gap-3 px-3 py-2.5 bg-[#006B68]/5 border border-[#006B68]/20 rounded-lg text-left hover:bg-[#006B68]/10',
                    onClick: () => setShowCollateralList(true)
                },
                    e('span', { className: 'text-xs font-bold text-[#006B68]' }, '1. Danh sách TSBĐ hiện tại (5 tài sản)'),
                    e('span', { className: 'inline-flex items-center gap-1 text-[11px] font-semibold text-[#006B68]' },
                        'Xem danh sách',
                        e('i', { className: 'fas fa-arrow-up-right-from-square text-[10px]' })
                    )
                )
            ),
            renderProposalCard(
                'B. Đề xuất của BPTĐRR',
                '1. Chính sách TSBĐ đề xuất',
                appraisalRows,
                { header: 'bg-blue-50', title: 'text-blue-700' },
                null
            )
        );
    };

    const renderCollateralListModal = () =>
        e('div', {
            className: 'fixed inset-0 z-[80] bg-black/40 flex items-center justify-center p-4',
            onClick: (ev) => { if (ev.target === ev.currentTarget) setShowCollateralList(false); }
        },
            e('div', { className: 'w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden' },
                e('div', { className: 'px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50' },
                    e('div', null,
                        e('h3', { className: 'text-base font-bold text-[#006B68]' }, 'Danh sách TSBĐ đề xuất')
                    ),
                    e('button', {
                        className: 'w-9 h-9 rounded-lg hover:bg-gray-200 text-gray-500',
                        onClick: () => setShowCollateralList(false)
                    }, e('i', { className: 'fas fa-times' }))
                ),
                e('div', { className: 'p-5 overflow-x-auto' },
                    e('table', { className: 'w-full text-xs border border-gray-200', style: { minWidth: '820px' } },
                        e('thead', null,
                            e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                                ['STT', 'Loại TSBĐ', 'Mô tả TSBĐ', 'Giá trị định giá (VND)', 'Tỷ lệ bảo đảm (%)', 'Tình trạng pháp lý'].map((header) =>
                                    e('th', { key: header, className: 'px-3 py-2.5 text-left font-bold text-gray-700 border-r border-gray-200 last:border-r-0' }, header)
                                )
                            )
                        ),
                        e('tbody', null,
                            collateralAssetRows.map((row) =>
                                e('tr', { key: row[0], className: 'border-b border-gray-100 last:border-b-0 hover:bg-gray-50' },
                                    row.map((cell, idx) =>
                                        e('td', {
                                            key: idx,
                                            className: 'px-3 py-2.5 text-gray-700 border-r border-gray-100 last:border-r-0 ' + (idx === 0 ? 'text-center font-semibold' : idx >= 3 ? 'text-right' : '')
                                        }, cell)
                                    )
                                )
                            ),
                            e('tr', { className: 'bg-gray-50 font-bold text-gray-800' },
                                e('td', { className: 'px-3 py-2.5 text-center border-r border-gray-200', colSpan: 3 }, 'TỔNG CỘNG'),
                                e('td', { className: 'px-3 py-2.5 text-right border-r border-gray-200' }, '100.000.000.000'),
                                e('td', { className: 'px-3 py-2.5 text-right border-r border-gray-200' }, '100,00%'),
                                e('td', { className: 'px-3 py-2.5 text-center' }, '')
                            )
                        )
                    )
                )
            )
        );

    const renderSidebarBlock = (title, children, action) =>
        e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
            e('div', { className: 'px-3 py-2.5 border-b border-gray-100 flex items-center justify-between' },
                e('h3', { className: 'text-[11px] font-bold uppercase tracking-wide text-[#006B68]' }, title),
                action
            ),
            e('div', { className: 'p-3' }, children)
        );

    const renderRightSidebar = () => {
        const progressSteps = [
            { label: 'Tiếp nhận hồ sơ', done: true },
            { label: 'Thẩm định QLRR', done: true },
            { label: 'Phê duyệt cấp tín dụng', done: false, current: true },
            { label: 'Phê duyệt giải ngân', done: false }
        ];

        return e('aside', { className: 'space-y-3 xl:sticky xl:top-0' },
            // Tiến trình xử lý
            renderSidebarBlock('Tiến trình xử lý',
                e('div', { className: 'flex items-start justify-between gap-0' },
                    progressSteps.map(function(step, idx) {
                        var isLast = idx === progressSteps.length - 1;
                        return e('div', { key: idx, className: 'flex flex-col items-center flex-1 relative' },
                            // Line connector (before icon)
                            idx > 0 && e('div', {
                                className: 'absolute top-[14px] right-1/2 h-[2px] w-full',
                                style: { background: progressSteps[idx - 1].done ? '#006B68' : '#d1d5db' }
                            }),
                            // Icon circle
                            e('div', {
                                className: 'relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ' +
                                    (step.done ? 'bg-[#006B68] text-white' :
                                    step.current ? 'bg-white border-2 border-[#006B68] text-[#006B68]' :
                                    'bg-white border-2 border-gray-300 text-gray-400')
                            },
                                step.done ? e('i', { className: 'fas fa-check text-[10px]' }) : e('span', null, idx + 1)
                            ),
                            // Label
                            e('div', {
                                className: 'mt-1.5 text-center text-[10px] leading-tight ' +
                                    (step.done || step.current ? 'text-[#006B68] font-semibold' : 'text-gray-400 font-medium')
                            }, step.label)
                        );
                    })
                )
            ),
            renderSidebarBlock('Tài liệu liên quan',
                e('div', { className: 'space-y-2' },
                    relatedDocuments.map((doc) =>
                        e('div', { key: doc.file, className: 'flex items-center gap-2.5 py-1.5 border-b border-gray-100 last:border-b-0' },
                            e('div', { className: 'w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ' + doc.tone },
                                e('i', { className: 'fas ' + doc.icon + ' text-xs' })
                            ),
                            e('div', { className: 'min-w-0 flex-1' },
                                e('div', { className: 'text-xs font-semibold text-gray-700 truncate' }, doc.name),
                                e('div', { className: 'text-[11px] text-gray-400 truncate' }, doc.file)
                            )
                        )
                    ),
                    e('button', { className: 'w-full mt-2 h-8 border border-[#006B68]/30 text-[#006B68] rounded-lg text-xs font-semibold hover:bg-[#006B68]/5',
                        onClick: function() { showToastNotification('Đang chuẩn bị tải toàn bộ hồ sơ...', 'info'); }
                    },
                        e('i', { className: 'fas fa-download mr-2 text-[11px]' }), 'Tải toàn bộ hồ sơ'
                    )
                ),
                e('button', { className: 'text-[11px] font-semibold text-blue-600 hover:underline' }, 'Xem tất cả (18)')
            ),
            renderSidebarBlock('Thông tin tóm tắt',
                e('div', { className: 'space-y-2.5' },
                    infoSummary.map((row) =>
                        e('div', { key: row[0], className: 'flex items-start justify-between gap-3 text-xs' },
                            e('span', { className: 'text-gray-500' }, row[0]),
                            e('span', { className: 'font-semibold text-gray-800 text-right' }, row[1])
                        )
                    ),
                    e('button', { className: 'pt-1 text-xs font-semibold text-blue-600 hover:underline' }, 'Xem chi tiết')
                )
            ),
            renderSidebarBlock('Người liên quan',
                e('div', { className: 'space-y-2.5' },
                    involvedPeople.map((row) =>
                        e('div', { key: row[0], className: 'flex items-center justify-between gap-3 text-xs' },
                            e('span', { className: 'text-gray-500' }, row[0]),
                            e('span', { className: 'font-semibold text-gray-800 text-right' }, row[1])
                        )
                    )
                )
            )
        );
    };

    const renderActionBar = () =>
        e('div', { className: 'sticky bottom-0 z-20 bg-white border border-gray-200 rounded-lg shadow-[0_-6px_16px_rgba(15,23,42,0.06)] p-3' },
            e('div', { className: 'grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto] gap-3 items-end' },
                e('div', null,
                    e('label', { className: 'block text-xs font-bold text-gray-700 mb-1.5' },
                        'Ý kiến phê duyệt ', e('span', { className: 'font-semibold text-gray-400' }, '(bắt buộc)')
                    ),
                    e('div', { className: 'relative' },
                        e('textarea', {
                            className: 'w-full min-h-[54px] resize-none border border-gray-200 rounded-lg px-3 py-2 pr-14 text-xs text-gray-700 focus:border-[#006B68] focus:ring-2 focus:ring-[#006B68]/10 outline-none',
                            maxLength: 1000,
                            placeholder: 'Nhập ý kiến phê duyệt, yêu cầu hoặc lưu ý đối với hồ sơ...',
                            value: approvalNote,
                            onChange: (ev) => setApprovalNote(ev.target.value)
                        }),
                        e('span', { className: 'absolute right-3 bottom-2 text-[10px] text-gray-400' }, approvalNote.length + '/1000')
                    )
                ),
                e('div', { className: 'flex flex-wrap justify-end gap-2' },
                    e('button', {
                        className: 'h-10 px-5 border border-orange-200 bg-orange-50 text-orange-700 rounded-lg text-sm font-semibold hover:bg-orange-100',
                        onClick: function() { showToastNotification('Hồ sơ đã được trả lại cho bộ phận đề xuất.', 'warning'); }
                    }, e('i', { className: 'fas fa-rotate-left mr-2 text-xs' }), 'Trả hồ sơ'),
                    e('button', {
                        className: 'h-10 px-5 border border-[#006B68]/30 text-[#006B68] bg-white rounded-lg text-sm font-semibold hover:bg-[#006B68]/5',
                        onClick: function() { showToastNotification('Đã lưu nháp thành công lúc ' + new Date().toLocaleTimeString('vi-VN') + '.', 'success'); }
                    }, e('i', { className: 'fas fa-file-lines mr-2 text-xs' }), 'Lưu nháp'),
                    e('button', {
                        className: 'h-10 px-6 bg-[#006B68] text-white rounded-lg text-sm font-semibold hover:bg-[#005B58]',
                        onClick: function() {
                            if (!approvalNote.trim()) { showToastNotification('Vui lòng nhập ý kiến phê duyệt trước khi phê duyệt.', 'warning'); return; }
                            showToastNotification('Đã phê duyệt cấp tín dụng thành công!', 'success');
                        }
                    }, e('i', { className: 'fas fa-check mr-2 text-xs' }), 'Phê duyệt cấp tín dụng')
                )
            )
        );

    const renderActiveContent = () => {
        if (activeTab === 'deXuatThamDinh') return renderDeXuatThamDinh();
        if (activeTab === 'khacBietTrongYeu') return renderKhacBiet();
        if (activeTab === 'dieuKienTinDung') return renderDieuKien();
        if (activeTab === 'taiSanBaoDam') return renderTaiSanBaoDam();
        return renderTongQuan();
    };

    const showActionBar = ['khacBietTrongYeu', 'dieuKienTinDung', 'taiSanBaoDam'].includes(activeTab);

    return e('div', { className: 'credit-workspace space-y-3 pb-2' },
        e('div', { className: 'credit-tab-title' }, 'Phê duyệt tín dụng'),
        e('div', { className: 'grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_282px] gap-3 items-start' },
            e('div', { className: 'content-card bg-white min-w-0' },
                e('div', { className: 'flex items-center gap-5 px-3 pt-1 border-b border-gray-200 overflow-x-auto' },
                    tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return e('button', {
                            key: tab.id,
                            className: 'relative flex items-center gap-1.5 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ' +
                                (isActive ? 'text-[#006B68] border-[#006B68]' : 'text-gray-500 border-transparent hover:text-gray-800'),
                            onClick: () => setActiveTab(tab.id)
                        },
                            e('span', null, tab.label),
                            tab.badge && e('span', {
                                className: 'min-w-[16px] h-4 rounded-full bg-red-500 text-white text-[10px] leading-4 text-center font-bold px-1'
                            }, tab.badge)
                        );
                    })
                ),
                e('div', { className: 'p-3' }, renderActiveContent())
            ),
            renderRightSidebar()
        ),
        showActionBar && renderActionBar(),
        showCollateralList && renderCollateralListModal()
    );
};
