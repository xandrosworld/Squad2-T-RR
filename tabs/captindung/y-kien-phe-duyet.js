// =====================================================
// Tab: Ý kiến cấp phê duyệt
// =====================================================

window.TabYKienPheDuyet = function () {
    const e = React.createElement;

    // States
    const [pheDuyetOption, setPheDuyetOption] = React.useState('dong-y');
    const [expandedRows, setExpandedRows] = React.useState([1]);
    const [showCommitmentDetail, setShowCommitmentDetail] = React.useState(false);
    const [selectedCommitment, setSelectedCommitment] = React.useState(null);
    const [expandedDetailSections, setExpandedDetailSections] = React.useState(['thongTinChung', 'thoiHan', 'mucDich']);
    const [isEditingCommitment, setIsEditingCommitment] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState(null);

    // States cho phiếu ý kiến hội đồng
    const [showPhieuYKien, setShowPhieuYKien] = React.useState(false);
    const [phieuDaGui, setPhieuDaGui] = React.useState(null);
    const [selectedThanhVien, setSelectedThanhVien] = React.useState([1, 2, 3, 4, 5, 6]);
    const [phieuYKienData, setPhieuYKienData] = React.useState({
        noiDung: '',
        idTruyVan: 'ID "Số BCDX_HDTD/HDQT_stt"',
        trangThai: 'Dự thảo',
        nguoiGui: 'Họ và tên (MCB) - Chức danh - Vai trò',
        ngayGuiPYK: '',
        nguoiNhan: 'Họ và tên (MCB) - Chức danh - Vai trò',
        thoiHanTGYK: '',
        soBCDXTD: 'Số BCDX_'
    });

    // State hiển thị tổng hợp
    const [showTongHop, setShowTongHop] = React.useState(false);

    // States cho Soạn Biên bản/Quyết định
    const [showChonPhuongAn, setShowChonPhuongAn] = React.useState(false);
    const [selectedPhuongAn, setSelectedPhuongAn] = React.useState(null);
    const [showBienBanQuyetDinh, setShowBienBanQuyetDinh] = React.useState(false);
    const [generatedFiles, setGeneratedFiles] = React.useState([]);

    // Danh sách thành viên hội đồng (có thêm 2 cột mới)
    const thanhVienHoiDong = [
        { id: 1, hoTen: 'Nguyễn Văn An', chucVu: 'Chủ tịch Hội đồng', vaiTro: 'Chủ tịch HĐTD', yKien: 'Đồng ý cấp tín dụng theo đề xuất', ketQua: 'Đồng ý', coTrongTDRR: 'Có', thuKyLamRo: '-' },
        { id: 2, hoTen: 'Trần Thị Bình', chucVu: 'PCT Hội đồng', vaiTro: 'Phó CT HĐTD', yKien: 'Đồng ý với điều kiện bổ sung TSBĐ', ketQua: 'Đồng ý có đ...', coTrongTDRR: 'Có', thuKyLamRo: 'Bổ sung tài liệu chứng minh nguồn thu của khách hà...' },
        { id: 3, hoTen: 'Lê Minh Cường', chucVu: 'TVHĐ', vaiTro: 'Thành viên HĐTD', yKien: 'Không đồng ý do rủi ro cao', ketQua: 'Không đồng ý', coTrongTDRR: 'Không', thuKyLamRo: '-' },
        { id: 4, hoTen: 'Phạm Thị Dung', chucVu: 'TVHĐ', vaiTro: 'Thành viên HĐTD', yKien: 'Đang xem xét hồ sơ', ketQua: 'Chưa gửi ý ...', coTrongTDRR: 'Có', thuKyLamRo: 'Bổ sung hồ sơ pháp lý chứng minh quyền sở hữu tài ...' },
        { id: 5, hoTen: 'Hoàng Văn Em', chucVu: 'TVHĐ', vaiTro: 'Thành viên HĐTD', yKien: '', ketQua: 'Không gửi ý...', coTrongTDRR: 'Không', thuKyLamRo: '-' },
        { id: 6, hoTen: 'Vũ Thị Phương', chucVu: 'TVHĐ', vaiTro: 'Thành viên HĐTD', yKien: 'Đồng ý theo phương án đề xuất', ketQua: 'Đồng ý', coTrongTDRR: 'Có', thuKyLamRo: '-' }
    ];

    // Các nội dung đề xuất
    const noiDungDeXuat = [
        { stt: 1, noiDung: 'Nội dung cấp tín dụng', items: ['Số tiền, đồng tiền cấp tín dụng', 'Mục đích cấp tín dụng', 'Lãi suất/phí', 'Thời hạn cấp tín dụng', 'Kỳ hạn trả nợ'] },
        { stt: 2, noiDung: 'Biện pháp bảo đảm', items: [] },
        { stt: 3, noiDung: 'Các điều kiện tín dụng', items: ['Điều kiện 1', 'Điều kiện 2', 'Điều kiện ...'] },
        { stt: 4, noiDung: 'Lý do và/hoặc các ý kiến tham gia bổ sung (nếu có):', items: [] }
    ];

    // Sample data cho bảng cấu trúc tín dụng
    const creditData = [
        {
            id: 1,
            stt: 1,
            name: 'HMTD 2025-2026',
            soTienDeXuat: { vnd: '10,500,000,000', nguyen: '1,848.68 EUR' },
            soTienDaDuyet: { vnd: '10,500,000,000', nguyen: '1,848.68 EUR' },
            thoiHan: { deXuat: '12 tháng', daDuyet: '10 tháng' },
            soDu: '10,500,000,000',
            children: [
                { id: 11, name: 'Hạn mức vay', soTienDeXuat: { vnd: '200,500,000,000', nguyen: '8,280.15 EUR' }, soTienDaDuyet: { vnd: '200,500,000,000', nguyen: '8,280.15 EUR' }, thoiHan: { deXuat: '12 tháng', daDuyet: '10 tháng' }, soDu: '200,500,000,000' },
                { id: 12, name: 'Hạn mức bảo lãnh', soTienDeXuat: { vnd: '200,500,000,000', nguyen: '4,010.89 EUR' }, soTienDaDuyet: { vnd: '200,500,000,000', nguyen: '4,010.89 EUR' }, thoiHan: { deXuat: '12 tháng', daDuyet: '12 tháng' }, soDu: '200,500,000,000' }
            ]
        },
        {
            id: 2,
            stt: 2,
            name: 'HMTD 2024-2025',
            soTienDeXuat: { vnd: '200,500,000,000', nguyen: '2,844.29 EUR' },
            soTienDaDuyet: { vnd: '200,500,000,000', nguyen: '2,844.29 EUR' },
            thoiHan: { deXuat: '12 tháng', daDuyet: '10 tháng' },
            soDu: '200,500,000,000',
            children: []
        },
        {
            id: 3,
            stt: 3,
            name: 'HMTD 2023-2024',
            soTienDeXuat: { vnd: '200,500,000,000', nguyen: '4,096.24 EUR' },
            soTienDaDuyet: { vnd: '200,500,000,000', nguyen: '4,096.24 EUR' },
            thoiHan: { deXuat: '12 tháng', daDuyet: '10 tháng' },
            soDu: '200,500,000,000',
            children: []
        }
    ];

    const toggleRow = (id) => {
        if (expandedRows.includes(id)) {
            setExpandedRows(expandedRows.filter(r => r !== id));
        } else {
            setExpandedRows([...expandedRows, id]);
        }
    };

    // Render table row
    const renderCreditRow = (item, isChild = false) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedRows.includes(item.id);

        return e(React.Fragment, { key: item.id },
            e('tr', { className: 'border-t border-gray-200 hover:bg-gray-50' },
                e('td', { className: 'px-2 py-3 text-center' },
                    e('i', { className: 'fas fa-grip-vertical text-gray-300 cursor-move' })
                ),
                e('td', { className: 'px-3 py-3 text-sm text-gray-600' }, item.stt || ''),
                e('td', { className: 'px-3 py-3' },
                    e('div', { className: 'flex items-center gap-2 ' + (isChild ? 'pl-6' : '') },
                        hasChildren && e('button', {
                            className: 'w-5 h-5 flex items-center justify-center',
                            onClick: () => toggleRow(item.id)
                        },
                            e('i', { className: 'fas fa-chevron-' + (isExpanded ? 'down' : 'right') + ' text-xs text-gray-400' })
                        ),
                        e('span', { className: 'text-sm text-gray-800' }, item.name)
                    )
                ),
                e('td', { className: 'px-3 py-3 text-right' },
                    e('div', null,
                        e('div', { className: 'text-sm text-gray-800' }, item.soTienDeXuat.vnd),
                        e('div', { className: 'text-xs text-gray-500' }, item.soTienDeXuat.nguyen)
                    )
                ),
                e('td', { className: 'px-3 py-3 text-right' },
                    e('div', null,
                        e('div', { className: 'text-sm text-gray-800' }, item.soTienDaDuyet.vnd),
                        e('div', { className: 'text-xs text-gray-500' }, item.soTienDaDuyet.nguyen)
                    )
                ),
                e('td', { className: 'px-3 py-3 text-sm text-gray-600 text-center' }, item.thoiHan.deXuat),
                e('td', { className: 'px-3 py-3 text-sm text-gray-600 text-center' }, item.thoiHan.daDuyet),
                e('td', { className: 'px-3 py-3 text-sm text-gray-800 text-right' }, item.soDu),
                e('td', { className: 'px-3 py-3 text-center' },
                    e('button', {
                        className: 'text-gray-400 hover:text-[#006B68]',
                        onClick: () => { setSelectedCommitment(item); setShowCommitmentDetail(true); }
                    },
                        e('i', { className: 'fas fa-pen text-xs' })
                    )
                )
            ),
            isExpanded && hasChildren && item.children.map(child =>
                renderCreditRow({ ...child, stt: '' }, true)
            )
        );
    };

    // Render modal chi tiết commitment
    const renderCommitmentDetailModal = () => {
        if (!showCommitmentDetail || !selectedCommitment) return null;

        const toggleDetailSection = (id) => {
            if (expandedDetailSections.includes(id)) {
                setExpandedDetailSections(expandedDetailSections.filter(s => s !== id));
            } else {
                setExpandedDetailSections([...expandedDetailSections, id]);
            }
        };

        const renderDetailSection = (id, icon, title, content) => {
            const isExpanded = expandedDetailSections.includes(id);
            return e('div', { key: id, className: 'border border-gray-200 rounded-lg overflow-hidden' },
                e('div', {
                    className: 'flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer',
                    onClick: () => toggleDetailSection(id)
                },
                    e('div', { className: 'flex items-center gap-2' },
                        e('i', { className: icon + ' text-[#006B68]' }),
                        e('span', { className: 'font-medium text-gray-800' }, title)
                    ),
                    e('i', { className: 'fas fa-chevron-' + (isExpanded ? 'up' : 'down') + ' text-gray-400' })
                ),
                isExpanded && e('div', { className: 'p-4 bg-white' }, content)
            );
        };

        // Helper: render field
        const renderField = (label, value, isHighlight = false) => {
            return e('div', { className: 'mb-4' },
                e('label', { className: 'block text-sm font-medium text-gray-600 mb-1' }, label),
                isEditingCommitment ?
                    e('input', {
                        type: 'text',
                        className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
                        defaultValue: value
                    }) :
                    e('div', { className: 'text-sm ' + (isHighlight ? 'text-[#006B68] font-semibold' : 'text-gray-800') }, value)
            );
        };

        return e('div', { className: 'fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 overflow-auto' },
            e('div', { className: 'bg-white rounded-lg shadow-2xl w-full max-w-3xl mb-10' },
                // Header
                e('div', { className: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between' },
                    e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Chi tiết Commitment'),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: () => { setShowCommitmentDetail(false); setIsEditingCommitment(false); }
                    },
                        e('i', { className: 'fas fa-times text-lg' })
                    )
                ),
                // Body
                e('div', { className: 'p-6 space-y-4 max-h-[70vh] overflow-y-auto' },
                    // Success message
                    successMessage && e('div', { className: 'bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2' },
                        e('i', { className: 'fas fa-check-circle' }),
                        e('span', null, successMessage)
                    ),

                    // Thông tin chung
                    renderDetailSection('thongTinChung', 'fas fa-info-circle', 'Thông tin chung',
                        e('div', { className: 'grid grid-cols-2 gap-4' },
                            renderField('Tên Commitment', selectedCommitment.name, true),
                            renderField('Loại Commitment', 'Hạn mức tín dụng'),
                            renderField('Số tiền đề xuất (VND)', selectedCommitment.soTienDeXuat?.vnd || ''),
                            renderField('Số tiền đã duyệt (VND)', selectedCommitment.soTienDaDuyet?.vnd || ''),
                            renderField('Số tiền đề xuất (Nguyên tệ)', selectedCommitment.soTienDeXuat?.nguyen || ''),
                            renderField('Số tiền đã duyệt (Nguyên tệ)', selectedCommitment.soTienDaDuyet?.nguyen || '')
                        )
                    ),
                    // Thời hạn
                    renderDetailSection('thoiHan', 'fas fa-calendar-alt', 'Thời hạn',
                        e('div', { className: 'grid grid-cols-2 gap-4' },
                            renderField('Thời hạn đề xuất', selectedCommitment.thoiHan?.deXuat || ''),
                            renderField('Thời hạn đã duyệt', selectedCommitment.thoiHan?.daDuyet || ''),
                            renderField('Ngày bắt đầu', '01/01/2025'),
                            renderField('Ngày kết thúc', '31/12/2025')
                        )
                    ),
                    // Mục đích sử dụng
                    renderDetailSection('mucDich', 'fas fa-bullseye', 'Mục đích sử dụng',
                        e('div', null,
                            renderField('Mục đích', 'Bổ sung vốn lưu động phục vụ hoạt động sản xuất kinh doanh'),
                            renderField('Nguồn trả nợ', 'Doanh thu từ hoạt động kinh doanh'),
                            renderField('Phương thức trả nợ gốc', 'Trả một lần khi đến hạn'),
                            renderField('Phương thức trả lãi', 'Định kỳ hàng tháng')
                        )
                    ),
                    // Lãi suất
                    renderDetailSection('laiSuat', 'fas fa-percentage', 'Lãi suất',
                        e('div', { className: 'grid grid-cols-2 gap-4' },
                            renderField('Loại lãi suất', 'Lãi suất thả nổi'),
                            renderField('Lãi suất cơ sở', 'BIDV Prime'),
                            renderField('Biên độ', '+ 2.5%/năm'),
                            renderField('Lãi suất hiện tại', '10.5%/năm')
                        )
                    ),
                    // Điều kiện giải ngân
                    renderDetailSection('dieuKien', 'fas fa-list-check', 'Điều kiện giải ngân',
                        e('div', null,
                            renderField('Điều kiện 1', 'Hoàn thiện hồ sơ pháp lý'),
                            renderField('Điều kiện 2', 'Đăng ký giao dịch bảo đảm'),
                            renderField('Điều kiện 3', 'Mua bảo hiểm tài sản đảm bảo')
                        )
                    )
                ),
                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex justify-end gap-3' },
                    isEditingCommitment ?
                        e(React.Fragment, null,
                            e('button', {
                                className: 'btn btn-outline',
                                onClick: () => setIsEditingCommitment(false)
                            }, 'Hủy'),
                            e('button', {
                                className: 'btn btn-primary',
                                onClick: () => {
                                    setSuccessMessage('Đã lưu thay đổi thành công!');
                                    setIsEditingCommitment(false);
                                    setTimeout(() => setSuccessMessage(null), 3000);
                                }
                            }, e('i', { className: 'fas fa-save mr-1' }), 'Lưu thay đổi')
                        ) :
                        e(React.Fragment, null,
                            e('button', {
                                className: 'btn btn-outline',
                                onClick: () => { setShowCommitmentDetail(false); setIsEditingCommitment(false); }
                            }, 'Đóng'),
                            e('button', {
                                className: 'btn btn-primary',
                                onClick: () => setIsEditingCommitment(true)
                            }, e('i', { className: 'fas fa-pen mr-1' }), 'Chỉnh sửa')
                        )
                )
            )
        );
    };

    return e('div', { className: 'space-y-6' },
        // Section: Ý kiến cấp phê duyệt
        e('div', { className: 'content-card' },
            e('div', { className: 'section-header' },
                e('i', { className: 'fas fa-check-circle section-icon' }),
                e('h2', { className: 'section-title' }, 'Ý kiến cấp phê duyệt')
            ),
            e('div', { className: 'p-6 space-y-6' },
                // Phê duyệt cấp tín dụng
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-3' }, 'Phê duyệt cấp tín dụng'),
                    e('div', { className: 'bg-gray-50 px-4 py-3 rounded-lg border border-gray-200' },
                        e('div', { className: 'flex items-center gap-8' },
                            // Đồng ý
                            e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                e('input', {
                                    type: 'radio',
                                    name: 'pheDuyet',
                                    checked: pheDuyetOption === 'dong-y',
                                    onChange: () => setPheDuyetOption('dong-y')
                                }),
                                e('span', { className: 'flex items-center gap-2 text-sm text-gray-700' },
                                    e('span', { className: 'w-2 h-2 bg-[#006B68] rounded-full' }),
                                    'Đồng ý'
                                )
                            ),
                            // Đồng ý bổ sung điều kiện
                            e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                e('input', {
                                    type: 'radio',
                                    name: 'pheDuyet',
                                    checked: pheDuyetOption === 'dong-y-bo-sung',
                                    onChange: () => setPheDuyetOption('dong-y-bo-sung')
                                }),
                                e('span', { className: 'text-sm text-gray-700' }, 'Đồng ý bổ sung điều kiện')
                            ),
                            // Không đồng ý
                            e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                e('input', {
                                    type: 'radio',
                                    name: 'pheDuyet',
                                    checked: pheDuyetOption === 'khong-dong-y',
                                    onChange: () => setPheDuyetOption('khong-dong-y')
                                }),
                                e('span', { className: 'text-sm text-gray-700' }, 'Không đồng ý')
                            )
                        )
                    )
                ),

                // Hiển thị bảng cấu trúc tín dụng nếu chọn "Đồng ý bổ sung điều kiện"
                pheDuyetOption === 'dong-y-bo-sung' && e('div', null,
                    e('h3', { className: 'text-[#006B68] font-semibold mb-4' }, 'Cấu trúc tín dụng'),
                    e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                        e('div', { className: 'overflow-x-auto' },
                            e('table', { className: 'w-full', style: { minWidth: '1000px' } },
                                e('thead', null,
                                    e('tr', { className: 'bg-gray-100' },
                                        e('th', { className: 'px-2 py-3 text-left w-10' }),
                                        e('th', { className: 'px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase w-12' }, 'STT'),
                                        e('th', { className: 'px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase' }, 'Tên Commitment'),
                                        e('th', { className: 'px-3 py-3 text-center text-xs font-medium text-gray-600 uppercase', colSpan: 2 },
                                            e('div', null, 'Số tiền đề xuất'),
                                            e('div', { className: 'flex justify-around text-[10px] text-gray-500 mt-1' },
                                                e('span', null, 'VND'),
                                                e('span', null, 'Nguyên tệ')
                                            )
                                        ),
                                        e('th', { className: 'px-3 py-3 text-center text-xs font-medium text-gray-600 uppercase', colSpan: 2 },
                                            e('div', null, 'Số tiền đã duyệt'),
                                            e('div', { className: 'flex justify-around text-[10px] text-gray-500 mt-1' },
                                                e('span', null, 'VND'),
                                                e('span', null, 'Nguyên tệ')
                                            )
                                        ),
                                        e('th', { className: 'px-3 py-3 text-center text-xs font-medium text-gray-600 uppercase', colSpan: 2 },
                                            e('div', null, 'Thời hạn'),
                                            e('div', { className: 'flex justify-around text-[10px] text-gray-500 mt-1' },
                                                e('span', null, 'Đề xuất'),
                                                e('span', null, 'Đã duyệt')
                                            )
                                        ),
                                        e('th', { className: 'px-3 py-3 text-center text-xs font-medium text-gray-600 uppercase' }, 'Số dư (VND)'),
                                        e('th', { className: 'px-3 py-3 text-center text-xs font-medium text-gray-600 uppercase w-20' }, '')
                                    )
                                ),
                                e('tbody', null,
                                    creditData.map(item => renderCreditRow(item))
                                )
                            )
                        )
                    ),

                    // Khối Đề xuất chính sách tài sản bảo đảm
                    e('div', { className: 'mt-6' },
                        e('h3', { className: 'text-[#006B68] font-semibold mb-4' }, 'Đề xuất chính sách tài sản bảo đảm'),
                        e('div', { className: 'bg-[#e0f2f1] border border-[#006B68]/30 rounded-lg p-4' },
                            e('p', { className: 'text-sm text-gray-700 mb-3' }, 'Tại mọi thời điểm, Khách hàng đáp ứng chính sách về TSDB của BIDV trong từng thời kỳ:'),
                            e('ul', { className: 'space-y-2 text-sm text-gray-700' },
                                e('li', { className: 'flex items-start gap-2' },
                                    e('span', { className: 'text-[#006B68] mt-1' }, '•'),
                                    e('span', null,
                                        'Với ',
                                        e('span', { className: 'font-semibold text-[#006B68]' }, 'Khoản vay vốn lưu động ngắn hạn'),
                                        ' tỷ lệ TSDB yêu cầu là ',
                                        e('span', { className: 'font-bold' }, '80%'),
                                        '.',
                                        e('br'),
                                        'Từ ngày 2027-01-01, tỷ lệ TSDB yêu cầu là ',
                                        e('span', { className: 'font-bold' }, '100%'),
                                        '.'
                                    )
                                ),
                                e('li', { className: 'flex items-start gap-2' },
                                    e('span', { className: 'text-[#006B68] mt-1' }, '•'),
                                    e('span', null,
                                        'Đối với TSBD là tiền gửi, giấy tờ có giá: áp dụng tỷ lệ TSBDB tối thiểu là ',
                                        e('span', { className: 'font-bold' }, '100%')
                                    )
                                )
                            )
                        )
                    ),

                    // Khối Điều kiện tín dụng
                    e('div', { className: 'mt-6' },
                        e('h3', { className: 'text-[#006B68] font-semibold mb-4' }, 'Điều kiện tín dụng'),
                        e('div', { className: 'bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3' },
                            e('i', { className: 'fas fa-info-circle text-blue-500 text-lg' }),
                            e('span', { className: 'text-sm text-gray-700' },
                                'Chi tiết tại tab ',
                                e('span', {
                                    className: 'font-semibold text-[#006B68] cursor-pointer hover:underline',
                                    onClick: () => window.switchToSubTab && window.switchToSubTab('dieuKienTinDung')
                                }, 'Điều kiện tín dụng')
                            )
                        )
                    )
                ),

                // Không đồng ý - hiện textarea lý do
                pheDuyetOption === 'khong-dong-y' && e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Lý do không đồng ý'),
                    e('textarea', {
                        className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[100px]',
                        placeholder: 'Nhập lý do không đồng ý...'
                    })
                )
            )
        ),

        // Section: Xin ý kiến Hội đồng
        e('div', { className: 'content-card' },
            e('div', { className: 'px-5 py-3 flex items-center gap-2', style: { backgroundColor: '#006B68' } },
                e('div', { className: 'w-4 h-4 bg-[#FFC62F] rounded' }),
                e('h2', { className: 'text-lg font-semibold text-white' }, 'Xin ý kiến Hội đồng')
            ),
            e('div', { className: 'p-6' },
                // Button + Link phiếu đã gửi
                e('div', { className: 'flex items-center gap-4 mb-6' },
                    e('button', {
                        className: 'px-4 py-2 border-2 border-[#006B68] text-[#006B68] rounded-lg text-sm font-medium hover:bg-[#006B68] hover:text-white transition-all',
                        onClick: () => setShowPhieuYKien(true)
                    }, 'Lập Phiếu ý kiến'),
                    // Hiện link phiếu đã gửi
                    phieuDaGui && e('a', {
                        href: '#',
                        className: 'text-[#006B68] font-medium underline hover:text-[#005B58]'
                    }, phieuDaGui.tenPhieu)
                ),

                // Bảng ý kiến thành viên hội đồng (chỉ hiện khi đã gửi phiếu)
                phieuDaGui && e('div', null,
                    e('div', { className: 'flex items-center gap-2 mb-4' },
                        e('select', { className: 'px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white' },
                            e('option', null, 'Ý kiến thành viên Hội đồng')
                        ),
                        e('button', { className: 'p-2 border border-gray-300 rounded-lg hover:bg-gray-50' },
                            e('i', { className: 'fas fa-table text-gray-500' })
                        )
                    ),
                    e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                        e('table', { className: 'w-full text-sm' },
                            e('thead', null,
                                e('tr', { className: 'bg-gray-50' },
                                    e('th', { className: 'px-3 py-3 text-left font-medium text-gray-600 w-16' },
                                        e('div', { className: 'flex items-center gap-1' }, 'STT', e('i', { className: 'fas fa-sort text-gray-400 text-xs' }))
                                    ),
                                    e('th', { className: 'px-3 py-3 text-left font-medium text-gray-600' },
                                        e('div', { className: 'flex items-center gap-1' }, 'Họ và tên TVHĐ', e('i', { className: 'fas fa-sort text-gray-400 text-xs' }))
                                    ),
                                    e('th', { className: 'px-3 py-3 text-left font-medium text-gray-600' },
                                        e('div', { className: 'flex items-center gap-1' }, 'Chức vụ', e('i', { className: 'fas fa-sort text-gray-400 text-xs' }))
                                    ),
                                    e('th', { className: 'px-3 py-3 text-left font-medium text-gray-600' },
                                        e('div', { className: 'flex items-center gap-1' }, 'Vai trò', e('i', { className: 'fas fa-sort text-gray-400 text-xs' }))
                                    ),
                                    e('th', { className: 'px-3 py-3 text-left font-medium text-gray-600' },
                                        e('div', { className: 'flex items-center gap-1' }, 'Ý kiến của TVI', e('i', { className: 'fas fa-sort text-gray-400 text-xs' }))
                                    ),
                                    e('th', { className: 'px-3 py-3 text-left font-medium text-gray-600' },
                                        e('div', { className: 'flex items-center gap-1' }, 'Kết quả lấy ý k...', e('i', { className: 'fas fa-sort text-gray-400 text-xs' }))
                                    ),
                                    // 2 cột mới
                                    e('th', { className: 'px-3 py-3 text-left font-medium text-gray-600' },
                                        e('div', { className: 'flex items-center gap-1' }, 'Có trong ý kiến TĐRR?')
                                    ),
                                    e('th', { className: 'px-3 py-3 text-left font-medium text-gray-600' },
                                        e('div', { className: 'flex items-center gap-1' }, 'Thư ký làm rõ')
                                    )
                                )
                            ),
                            e('tbody', null,
                                thanhVienHoiDong.filter(tv => selectedThanhVien.includes(tv.id)).map((tv, idx) =>
                                    e('tr', { key: tv.id, className: 'border-t border-gray-200' },
                                        e('td', { className: 'px-3 py-3' }, idx + 1),
                                        e('td', { className: 'px-3 py-3' },
                                            e('select', { className: 'w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white' },
                                                e('option', null, tv.hoTen)
                                            )
                                        ),
                                        e('td', { className: 'px-3 py-3' },
                                            e('select', { className: 'w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white' },
                                                e('option', null, tv.chucVu)
                                            )
                                        ),
                                        e('td', { className: 'px-3 py-3' },
                                            e('select', { className: 'w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white' },
                                                e('option', null, tv.vaiTro || '')
                                            )
                                        ),
                                        e('td', { className: 'px-3 py-3' },
                                            e('select', { className: 'w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white' },
                                                e('option', null, '')
                                            )
                                        ),
                                        e('td', { className: 'px-3 py-3' },
                                            e('select', { className: 'w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white' },
                                                e('option', null, tv.ketQua)
                                            )
                                        ),
                                        // 2 cột mới
                                        e('td', { className: 'px-3 py-3' },
                                            e('select', { className: 'w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white' },
                                                e('option', null, tv.coTrongTDRR)
                                            )
                                        ),
                                        e('td', { className: 'px-3 py-3 text-sm text-gray-600 max-w-[200px] truncate', title: tv.thuKyLamRo },
                                            tv.thuKyLamRo
                                        )
                                    )
                                )
                            )
                        )
                    ),

                    // Nút Tổng hợp ý kiến
                    e('div', { className: 'mt-4' },
                        e('button', {
                            className: 'px-4 py-2 border-2 border-[#FFC62F] bg-[#FFC62F]/10 text-gray-800 rounded-lg text-sm font-medium hover:bg-[#FFC62F] transition-all',
                            onClick: () => setShowTongHop(!showTongHop)
                        }, 'Tổng hợp YK TVHD')
                    ),

                    // Hiển thị tổng hợp khi click
                    showTongHop && e('div', { className: 'mt-4 border border-[#FFC62F] rounded-lg p-4 bg-[#FFC62F]/5' },
                        e('div', { className: 'space-y-3 text-sm' },
                            e('div', { className: 'flex items-center gap-2' },
                                e('i', { className: 'fas fa-user text-[#006B68]' }),
                                e('span', { className: 'text-gray-700 font-medium' }, 'Tổng số Thành viên đã có ý kiến:'),
                                e('span', { className: 'font-bold text-[#006B68]' }, '4')
                            ),
                            e('div', { className: 'flex items-center gap-2' },
                                e('div', { className: 'w-3 h-3 bg-gray-400 rounded' }),
                                e('span', { className: 'text-gray-700 font-medium' }, 'Tổng số Thành viên không gửi ý kiến (tính đến 17h ngày 03/02/2026):'),
                                e('span', { className: 'font-bold text-gray-600' }, '2')
                            ),
                            e('div', { className: 'flex items-start gap-2' },
                                e('i', { className: 'fas fa-poll text-blue-500 mt-1' }),
                                e('span', { className: 'text-gray-700 font-medium' }, 'Kết quả lấy ý kiến như sau:')
                            ),
                            e('div', { className: 'ml-6 flex flex-wrap gap-6' },
                                e('span', { className: 'flex items-center gap-2' },
                                    e('span', { className: 'w-3 h-3 bg-[#006B68] rounded-full' }),
                                    'Đồng ý',
                                    e('span', { className: 'font-bold text-[#006B68] border border-[#006B68] px-2 rounded' }, '2')
                                ),
                                e('span', { className: 'flex items-center gap-2' },
                                    e('span', { className: 'w-3 h-3 bg-yellow-500 rounded-full' }),
                                    'Đồng ý và bổ sung điều kiện',
                                    e('span', { className: 'font-bold text-yellow-600 border border-yellow-500 px-2 rounded' }, '1')
                                ),
                                e('span', { className: 'flex items-center gap-2' },
                                    e('span', { className: 'w-3 h-3 bg-red-500 rounded-full' }),
                                    'Không đồng ý',
                                    e('span', { className: 'font-bold text-red-500 border border-red-500 px-2 rounded' }, '1')
                                )
                            )
                        ),
                        // Button Soạn Biên bản/Quyết định
                        e('div', { className: 'mt-6 pt-4 border-t border-[#FFC62F]' },
                            e('button', {
                                className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005B58] transition-all flex items-center gap-2',
                                onClick: () => setShowChonPhuongAn(true)
                            },
                                e('i', { className: 'fas fa-file-alt' }),
                                'Soạn Biên bản/Quyết định'
                            )
                        )
                    )
                )
            )
        ),

        // Modal chọn phương án
        showChonPhuongAn && e('div', { className: 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-md p-6' },
                e('div', { className: 'flex items-center justify-between mb-6' },
                    e('h3', { className: 'text-lg font-bold text-gray-800' }, 'Chọn phương án trình'),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: () => setShowChonPhuongAn(false)
                    }, e('i', { className: 'fas fa-times text-lg' }))
                ),
                e('div', { className: 'space-y-3' },
                    e('button', {
                        className: 'w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#006B68] hover:bg-[#006B68]/5 transition-all text-left flex items-center gap-3',
                        onClick: () => {
                            setSelectedPhuongAn(1);
                            setGeneratedFiles([
                                { name: 'Biên bản họp HĐTD', type: 'bienban', icon: 'fa-file-word', color: 'text-blue-600' },
                                { name: 'Quyết định cấp tín dụng', type: 'quyetdinh', icon: 'fa-file-signature', color: 'text-green-600' }
                            ]);
                            setShowChonPhuongAn(false);
                            setShowBienBanQuyetDinh(true);
                        }
                    },
                        e('div', { className: 'w-10 h-10 bg-[#006B68]/10 rounded-lg flex items-center justify-center' },
                            e('span', { className: 'text-[#006B68] font-bold' }, '1')
                        ),
                        e('div', null,
                            e('p', { className: 'font-semibold text-gray-800' }, 'Trình Chủ tịch 1 phương án'),
                            e('p', { className: 'text-sm text-gray-500' }, 'Tạo 1 Biên bản + 1 Quyết định')
                        )
                    ),
                    e('button', {
                        className: 'w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#006B68] hover:bg-[#006B68]/5 transition-all text-left flex items-center gap-3',
                        onClick: () => {
                            setSelectedPhuongAn(2);
                            setGeneratedFiles([
                                { name: 'Biên bản họp HĐTD - Phương án 1', type: 'bienban1', icon: 'fa-file-word', color: 'text-blue-600' },
                                { name: 'Biên bản họp HĐTD - Phương án 2', type: 'bienban2', icon: 'fa-file-word', color: 'text-blue-600' },
                                { name: 'Quyết định cấp tín dụng - Phương án 1', type: 'quyetdinh1', icon: 'fa-file-signature', color: 'text-green-600' },
                                { name: 'Quyết định cấp tín dụng - Phương án 2', type: 'quyetdinh2', icon: 'fa-file-signature', color: 'text-green-600' }
                            ]);
                            setShowChonPhuongAn(false);
                            setShowBienBanQuyetDinh(true);
                        }
                    },
                        e('div', { className: 'w-10 h-10 bg-[#FFC62F]/20 rounded-lg flex items-center justify-center' },
                            e('span', { className: 'text-[#FFC62F] font-bold' }, '2')
                        ),
                        e('div', null,
                            e('p', { className: 'font-semibold text-gray-800' }, 'Trình Chủ tịch 2 phương án'),
                            e('p', { className: 'text-sm text-gray-500' }, 'Tạo 2 Biên bản + 2 Quyết định')
                        )
                    )
                )
            )
        ),

        // Modal xem Biên bản/Quyết định đã gen
        showBienBanQuyetDinh && e('div', { className: 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-2xl' },
                e('div', { className: 'px-6 py-4 bg-[#006B68] rounded-t-xl flex items-center justify-between' },
                    e('h3', { className: 'text-lg font-bold text-white flex items-center gap-2' },
                        e('i', { className: 'fas fa-file-alt' }),
                        'Biên bản & Quyết định - Phương án ' + selectedPhuongAn
                    ),
                    e('button', {
                        className: 'text-white/80 hover:text-white',
                        onClick: () => setShowBienBanQuyetDinh(false)
                    }, e('i', { className: 'fas fa-times text-lg' }))
                ),
                e('div', { className: 'p-6' },
                    e('p', { className: 'text-sm text-gray-600 mb-4' },
                        'Các file sau đã được tạo tự động dựa trên thông tin đã nhập:'
                    ),
                    e('div', { className: 'space-y-3' },
                        generatedFiles.map((file, idx) =>
                            e('div', {
                                key: idx,
                                className: 'flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#006B68] transition-all cursor-pointer'
                            },
                                e('div', { className: 'flex items-center gap-3' },
                                    e('i', { className: 'fas ' + file.icon + ' text-2xl ' + file.color }),
                                    e('div', null,
                                        e('p', { className: 'font-medium text-gray-800' }, file.name),
                                        e('p', { className: 'text-xs text-gray-500' }, 'Ngày tạo: 04/02/2026 00:05')
                                    )
                                ),
                                e('div', { className: 'flex items-center gap-2' },
                                    e('button', {
                                        className: 'px-3 py-1.5 bg-[#006B68] text-white text-sm rounded-lg hover:bg-[#005B58]',
                                        onClick: () => alert('Đang mở xem file: ' + file.name)
                                    },
                                        e('i', { className: 'fas fa-eye mr-1' }), 'Xem'
                                    ),
                                    e('button', {
                                        className: 'px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300'
                                    },
                                        e('i', { className: 'fas fa-download mr-1' }), 'Tải'
                                    )
                                )
                            )
                        )
                    ),
                    e('div', { className: 'mt-6 flex justify-end gap-3' },
                        e('button', {
                            className: 'px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50',
                            onClick: () => setShowBienBanQuyetDinh(false)
                        }, 'Đóng'),
                        e('button', {
                            className: 'px-4 py-2 bg-[#006B68] text-white rounded-lg hover:bg-[#005B58]'
                        }, 'Gửi phê duyệt')
                    )
                )
            )
        ),

        // Modal chi tiết commitment
        renderCommitmentDetailModal(),

        // Modal Phiếu lấy ý kiến
        showPhieuYKien && e('div', { className: 'fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-5 overflow-auto' },
            e('div', { className: 'bg-white rounded-lg shadow-2xl w-full max-w-5xl mb-10' },
                // Header
                e('div', { className: 'px-6 py-3 bg-[#006B68] flex items-center justify-between rounded-t-lg' },
                    e('div', { className: 'flex items-center gap-3' },
                        e('div', { className: 'text-white font-bold text-lg' }, 'BIDV'),
                        e('div', { className: 'w-8 h-8 bg-[#008d79] rounded-full flex items-center justify-center' },
                            e('span', { className: 'text-white text-xs' }, '✦')
                        )
                    ),
                    e('button', {
                        className: 'px-4 py-1.5 bg-[#006B68] border border-white text-white rounded text-sm hover:bg-[#005B58]',
                        onClick: () => setShowPhieuYKien(false)
                    }, 'Lưu')
                ),
                // Title
                e('div', { className: 'text-center py-4' },
                    e('h2', { className: 'text-xl font-bold text-[#006B68]' }, 'PHIẾU LẤY Ý KIẾN')
                ),
                // Body
                e('div', { className: 'px-6 pb-6 space-y-6' },
                    // Nội dung lấy ý kiến
                    e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
                        e('div', { className: 'px-4 py-2 bg-[#006B68] text-white font-medium text-sm flex items-center gap-2' },
                            e('div', { className: 'w-3 h-3 bg-[#FFC62F] rounded' }),
                            'NỘI DUNG LẤY Ý KIẾN'
                        ),
                        e('div', { className: 'p-4' },
                            e('div', { className: 'grid grid-cols-2 gap-4' },
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Nội dung'),
                                    e('input', { type: 'text', className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm', placeholder: 'Nhập nội dung lấy ý kiến' })
                                ),
                                e('div', null),
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'ID truy vấn'),
                                    e('input', { type: 'text', className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50', defaultValue: phieuYKienData.idTruyVan, readOnly: true })
                                ),
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Trạng thái truy vấn'),
                                    e('select', { className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white' },
                                        e('option', null, 'Dự thảo')
                                    )
                                ),
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Người gửi'),
                                    e('input', { type: 'text', className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50', defaultValue: phieuYKienData.nguoiGui, readOnly: true })
                                ),
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày gửi PYK'),
                                    e('input', { type: 'text', className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm', placeholder: 'dd/mm/yyyy' })
                                ),
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Người nhận'),
                                    e('input', { type: 'text', className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50', defaultValue: phieuYKienData.nguoiNhan, readOnly: true })
                                ),
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Thời hạn TGYK cuối cùng'),
                                    e('input', { type: 'text', className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm', placeholder: 'dd/mm/yyyy' })
                                ),
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Số BCDXTD'),
                                    e('input', { type: 'text', className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50', defaultValue: phieuYKienData.soBCDXTD, readOnly: true })
                                )
                            )
                        )
                    ),

                    // Hồ sơ đính kèm
                    e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
                        e('div', { className: 'px-4 py-2 bg-[#006B68] text-white font-medium text-sm flex items-center gap-2' },
                            e('div', { className: 'w-3 h-3 bg-[#FFC62F] rounded' }),
                            'Hồ sơ đính kèm'
                        ),
                        e('div', { className: 'p-4' },
                            e('table', { className: 'w-full text-sm border border-gray-200' },
                                e('thead', null,
                                    e('tr', { className: 'bg-gray-50' },
                                        e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600 border-b border-gray-200 w-16' }, 'STT'),
                                        e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600 border-b border-gray-200' }, 'Tên Hồ sơ'),
                                        e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600 border-b border-gray-200' }, 'Hồ sơ đính kèm'),
                                        e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600 border-b border-gray-200' }, 'Người đính hồ sơ'),
                                        e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600 border-b border-gray-200' }, 'Ngày, giờ'),
                                        e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600 border-b border-gray-200' }, 'Tác vụ')
                                    )
                                ),
                                e('tbody', null,
                                    e('tr', { className: 'border-b border-gray-200' },
                                        e('td', { className: 'px-3 py-3' }, '1'),
                                        e('td', { className: 'px-3 py-3' }),
                                        e('td', { className: 'px-3 py-3' },
                                            e('div', { className: 'w-4 h-4 border border-gray-300 bg-green-100 rounded' })
                                        ),
                                        e('td', { className: 'px-3 py-3' }),
                                        e('td', { className: 'px-3 py-3' }),
                                        e('td', { className: 'px-3 py-3' })
                                    )
                                )
                            ),
                            e('div', { className: 'mt-3 flex justify-end' },
                                e('button', { className: 'px-4 py-2 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005B58]' }, 'Gửi Phiếu lấy ý kiến')
                            )
                        )
                    ),

                    // Ý kiến của thành viên hội đồng
                    e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
                        e('div', { className: 'px-4 py-2 bg-[#006B68] text-white font-medium text-sm flex items-center gap-2' },
                            e('div', { className: 'w-3 h-3 bg-[#FFC62F] rounded' }),
                            'Ý KIẾN CỦA THÀNH VIÊN HỘI ĐỒNG'
                        ),
                        e('div', { className: 'p-4' },
                            e('table', { className: 'w-full text-sm border border-gray-200' },
                                e('thead', null,
                                    e('tr', { className: 'bg-gray-50' },
                                        e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600 border border-gray-200 w-12' }, 'STT'),
                                        e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600 border border-gray-200' }, 'Các nội dung đề xuất tín dụng'),
                                        e('th', { className: 'px-3 py-2 text-center font-medium text-gray-600 border border-gray-200', colSpan: 3 },
                                            'Ý kiến phê duyệt của Thành viên hội đồng',
                                            e('div', { className: 'flex justify-around mt-1 text-xs font-normal' },
                                                e('span', null, 'Đồng ý'),
                                                e('span', null, 'Đồng ý có điều kiện'),
                                                e('span', null, 'Không đồng ý')
                                            )
                                        )
                                    )
                                ),
                                e('tbody', null,
                                    // Row 1
                                    e('tr', { className: 'border-b border-gray-200' },
                                        e('td', { className: 'px-3 py-2 border border-gray-200', rowSpan: 6 }, '1'),
                                        e('td', { className: 'px-3 py-2 border border-gray-200 font-medium' }, 'Nội dung cấp tín dụng'),
                                        e('td', { className: 'px-3 py-2 border border-gray-200 text-center' }, e('input', { type: 'checkbox', className: 'w-4 h-4' })),
                                        e('td', { className: 'px-3 py-2 border border-gray-200 text-center' }, e('input', { type: 'checkbox', className: 'w-4 h-4' })),
                                        e('td', { className: 'px-3 py-2 border border-gray-200 text-center' }, e('input', { type: 'checkbox', className: 'w-4 h-4' }))
                                    ),
                                    ['Số tiền, đồng tiền cấp tín dụng', 'Mục đích cấp tín dụng', 'Lãi suất/phí', 'Thời hạn cấp tín dụng', 'Kỳ hạn trả nợ'].map((item, idx) =>
                                        e('tr', { key: idx, className: 'border-b border-gray-200' },
                                            e('td', { className: 'px-3 py-2 border border-gray-200 text-gray-600 pl-6' }, item),
                                            e('td', { className: 'px-3 py-2 border border-gray-200 text-center' }, e('input', { type: 'checkbox', className: 'w-4 h-4' })),
                                            e('td', { className: 'px-3 py-2 border border-gray-200 text-center' }, e('input', { type: 'checkbox', className: 'w-4 h-4' })),
                                            e('td', { className: 'px-3 py-2 border border-gray-200 text-center' }, e('input', { type: 'checkbox', className: 'w-4 h-4' }))
                                        )
                                    ),
                                    // Row 2
                                    e('tr', { className: 'border-b border-gray-200' },
                                        e('td', { className: 'px-3 py-2 border border-gray-200' }, '2'),
                                        e('td', { className: 'px-3 py-2 border border-gray-200 font-medium' }, 'Biện pháp bảo đảm'),
                                        e('td', { className: 'px-3 py-2 border border-gray-200 text-center' }, e('input', { type: 'checkbox', className: 'w-4 h-4' })),
                                        e('td', { className: 'px-3 py-2 border border-gray-200 text-center' }, e('input', { type: 'checkbox', className: 'w-4 h-4', defaultChecked: true })),
                                        e('td', { className: 'px-3 py-2 border border-gray-200 text-center' }, e('input', { type: 'checkbox', className: 'w-4 h-4' }))
                                    ),
                                    // Note
                                    e('tr', { className: 'border-b border-gray-200 bg-blue-50' },
                                        e('td', { className: 'px-3 py-2 text-xs text-gray-500 italic', colSpan: 5 },
                                            'User chọn "Đồng ý và bổ sung điều kiện", hệ thống hiển thị Textbox - TVHĐ cho ý kiến về BPBD'
                                        )
                                    ),
                                    // Row 3
                                    e('tr', { className: 'border-b border-gray-200' },
                                        e('td', { className: 'px-3 py-2 border border-gray-200', rowSpan: 4 }, '3'),
                                        e('td', { className: 'px-3 py-2 border border-gray-200 font-medium' }, 'Các điều kiện tín dụng'),
                                        e('td', { className: 'px-3 py-2 border border-gray-200 text-center' }, 'Đồng ý'),
                                        e('td', { className: 'px-3 py-2 border border-gray-200 text-center', colSpan: 2 }, 'Không đồng ý')
                                    ),
                                    ['Điều kiện 1', 'Điều kiện 2', 'Điều kiện ...'].map((item, idx) =>
                                        e('tr', { key: idx, className: 'border-b border-gray-200' },
                                            e('td', { className: 'px-3 py-2 border border-gray-200 text-gray-600 pl-6' }, item),
                                            e('td', { className: 'px-3 py-2 border border-gray-200 text-center' }, e('input', { type: 'checkbox', className: 'w-4 h-4' })),
                                            e('td', { className: 'px-3 py-2 border border-gray-200 text-center', colSpan: 2 }, e('input', { type: 'checkbox', className: 'w-4 h-4' }))
                                        )
                                    ),
                                    // Row 4
                                    e('tr', { className: 'border-b border-gray-200' },
                                        e('td', { className: 'px-3 py-2 border border-gray-200' }, '4'),
                                        e('td', { className: 'px-3 py-2 border border-gray-200', colSpan: 4 },
                                            e('div', { className: 'font-medium mb-2' }, 'Lý do và/hoặc các ý kiến tham gia bổ sung (nếu có):'),
                                            e('div', { className: 'text-xs text-gray-500 italic' }, 'Textbox - TVHĐ cho ý kiến tham gia bổ sung')
                                        )
                                    )
                                )
                            ),
                            // Button gửi
                            e('div', { className: 'mt-4 flex justify-end' },
                                e('button', {
                                    className: 'px-6 py-2 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005B58]',
                                    onClick: () => {
                                        const today = new Date();
                                        const dateStr = today.toLocaleDateString('vi-VN').replace(/\//g, '.');
                                        setPhieuDaGui({
                                            tenPhieu: 'Phiếu ý kiến ' + dateStr.slice(0, 8),
                                            ngayGui: dateStr,
                                            thanhVien: selectedThanhVien
                                        });
                                        setShowPhieuYKien(false);
                                    }
                                }, 'Gửi ý kiến')
                            )
                        )
                    )
                )
            )
        )
    );
};
