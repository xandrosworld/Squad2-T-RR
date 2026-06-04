// =====================================================
// Tab: Điều kiện tín dụng
// =====================================================

window.TabDieuKienTinDung = function () {
    const e = React.createElement;

    // State cho modal chỉnh sửa
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [selectedDieuKien, setSelectedDieuKien] = React.useState(null);
    const [editFormData, setEditFormData] = React.useState({});

    // State cho dropdown menu "Thêm điều kiện"
    const [showAddMenu, setShowAddMenu] = React.useState(false);

    // State cho modal tìm kiếm bộ khung
    const [showBoKhungModal, setShowBoKhungModal] = React.useState(false);
    const [searchFilters, setSearchFilters] = React.useState({
        tuKhoa: '',
        loaiDieuKien: '',
        nhomDieuKien: '',
        loaiKhachHang: '',
        kyHan: '',
        mucDich: ''
    });
    const [boKhungResults, setBoKhungResults] = React.useState([]);

    // State cho modal Sao chép từ Commitment/TSBD khác
    const [showSaoChepModal, setShowSaoChepModal] = React.useState(false);
    const [saoChepFilters, setSaoChepFilters] = React.useState({
        cif: '',
        tuNgay: '09/12/2023',
        denNgay: '09/12/2025'
    });
    const [saoChepResults, setSaoChepResults] = React.useState({ commitment: [], tsbđ: [] });
    const [expandedItems, setExpandedItems] = React.useState({});

    // Sample data cho bảng điều kiện tín dụng
    const dieuKienData = [
        {
            stt: 1,
            idCommitment: 'CMM0001 - Hạn mức tín dụng',
            nhomDieuKien: 'Nội dung cấp tín dụng',
            loaiDieuKien: 'Số tiền cấp tín dụng',
            noiDung: 'Số tiền cấp tín dụng là hạn mức tối đa mà ngân hàng cam kết giải ngân cho khách hàng dựa trên kết quả thẩm định năng lực tài chính và nhu cầu vốn thực tế của phương án kinh doanh hoặc dự án đầu tư. Việc xác định số tiền này phải tuân thủ nghiêm ngặt các quy định về giới hạn cấp tín dụng đối với một khách hàng và nhóm khách hàng liên quan theo quy định của Ngân hàng Nhà nước để đảm bảo an toàn hệ thống.',
            tanSuat: 'Hàng tháng',
            camKetHDTD: 'Không',
            dieuKienTQ: 'Trước khi cấp tín dụng',
            trangThai: true,
            userCapNhat: 'Phòng Tín dụng - 1200...'
        },
        {
            stt: 2,
            idCommitment: 'CMM0002',
            nhomDieuKien: 'Nội dung cấp tín dụng',
            loaiDieuKien: 'Mục đích cấp tín dụng',
            noiDung: 'Mục đích cấp tín dụng xác định rõ ràng phạm vi sử dụng nguồn vốn vay, là yếu tố then chốt để ngân hàng đánh giá tính hợp pháp và hiệu quả kinh tế của khoản vay. Khách hàng phải cam kết sử dụng vốn đúng cho các hoạt động như bổ sung vốn lưu động phục vụ sản xuất kinh doanh, thu mua nguyên vật liệu, thanh toán chi phí nhân công, hoặc đầu tư tài sản cố định, máy móc thiết bị và các mục tiêu phát triển doanh nghiệp đã được phê duyệt trong phương án vay vốn.',
            tanSuat: 'Hàng năm',
            camKetHDTD: 'Có',
            dieuKienTQ: 'Trước khi ký HĐTĐ',
            trangThai: true,
            userCapNhat: 'Trần Thị Bảo\nPhòng Tín dụng - 1200...'
        },
        {
            stt: 3,
            idCommitment: 'CMM0003',
            nhomDieuKien: 'Nội dung cấp tín dụng',
            loaiDieuKien: 'Thời hạn cho vay đối với từng',
            noiDung: 'Khoảng thời gian mà hạn mức tín dụng hoặc hợp đồng tín dụng có giá trị pháp lý.',
            tanSuat: 'Hàng quý',
            camKetHDTD: 'Có',
            dieuKienTQ: 'Trước khi cấp tín dụng',
            trangThai: true,
            userCapNhat: 'Hồ Thị Yến\nPhòng Tín dụng - 1200...'
        },
        {
            stt: 4,
            idCommitment: 'CMM0004',
            nhomDieuKien: 'Nội dung cấp tín dụng',
            loaiDieuKien: 'Số tiền cấp tín dụng',
            noiDung: 'Khoảng thời gian khách hàng được phép thực hiện giải ngân kể từ ngày ký hợp đồng.',
            tanSuat: '',
            camKetHDTD: '28/11/2026',
            dieuKienTQ: 'Không',
            trangThai: false,
            userCapNhat: 'Ngô Thị Hoa\nPhòng Tín dụng - 1200...'
        },
        {
            stt: 5,
            idCommitment: 'CMM0005',
            nhomDieuKien: 'Nội dung cấp tín dụng',
            loaiDieuKien: 'Số tiền cấp tín dụng',
            noiDung: 'Thời hạn tối đa để khách hàng hoàn trả nợ gốc cho mỗi lần giải ngân cụ thể.',
            tanSuat: 'Hàng tháng',
            camKetHDTD: 'Có',
            dieuKienTQ: 'Trước khi cấp tín dụng',
            trangThai: true,
            userCapNhat: 'Trần Thị Hoa\nPhòng Tín dụng - 1200...'
        },
        {
            stt: 6,
            idCommitment: 'CMM0006',
            nhomDieuKien: 'Biện pháp bảo đảm',
            loaiDieuKien: 'Tỷ lệ TSBD',
            noiDung: 'Tỷ lệ phần trăm giữa giá trị khoản vay so với giá trị tài sản bảo đảm (LTV - Loan to Value)',
            tanSuat: 'Hàng tháng',
            camKetHDTD: 'Không',
            dieuKienTQ: 'Trước khi cấp tín dụng',
            trangThai: true,
            userCapNhat: 'Vũ Thị Tâm\nPhòng Tín dụng - 1200...'
        },
        {
            stt: 7,
            idCommitment: 'CMM0007',
            nhomDieuKien: 'Biện pháp bảo đảm',
            loaiDieuKien: 'Loại TSBĐ',
            noiDung: 'Phân loại tài sản (Ví dụ: Bất động sản, phương tiện vận tải, máy móc thiết bị, giấy tờ có giá...)',
            tanSuat: 'Hàng tháng',
            camKetHDTD: 'Không',
            dieuKienTQ: 'Trước khi cấp tín dụng',
            trangThai: true,
            userCapNhat: ''
        },
        {
            stt: 8,
            idCommitment: 'CMM0008',
            nhomDieuKien: 'Biện pháp bảo đảm',
            loaiDieuKien: 'Khác',
            noiDung: 'Điều kiện về việc thêm tài sản bảo đảm trong trường hợp giá trị tài sản hiện tại sụt giảm hoặc dư nợ tăng.',
            tanSuat: 'Hàng quý',
            camKetHDTD: 'Có',
            dieuKienTQ: 'Trước khi cấp tín dụng',
            trangThai: true,
            userCapNhat: 'Lê Thị Lan\nPhòng Tín dụng - 1200...'
        },
        {
            stt: 9,
            idCommitment: 'CMM0009',
            nhomDieuKien: 'Biện pháp bảo đảm',
            loaiDieuKien: 'Khác',
            noiDung: 'Các điều khoản cam kết khác liên quan đến biện pháp bảo đảm (Bảo hiểm tài sản, công chứng, đăng ký giao dịch bảo đảm,...)',
            tanSuat: 'Hàng quý',
            camKetHDTD: 'Có',
            dieuKienTQ: 'Trước khi cấp tín dụng',
            trangThai: true,
            userCapNhat: 'Hồ Thị Phượng\nPhòng Tín dụng - 1200...'
        },
        {
            stt: 10,
            idCommitment: 'CMM0010',
            nhomDieuKien: 'Điều kiện cấp tín dụng',
            loaiDieuKien: 'Pháp lý',
            noiDung: 'Viết tắt của "Tài sản hình thành từ vốn vay" - Tài sản được mua bằng tiền vay và dùng làm bảo đảm.',
            tanSuat: 'Hàng tháng',
            camKetHDTD: 'Có',
            dieuKienTQ: 'Trước khi cấp tín dụng',
            trangThai: true,
            userCapNhat: 'Đỗ Thị Khánh\nPhòng Tín dụng - 1200...'
        }
    ];

    return e('div', { className: 'credit-tab space-y-4' },
        // Header
        e('div', { className: 'flex items-center justify-between' },
            e('h2', { className: 'text-lg font-bold text-gray-800' }, 'Điều kiện tín dụng'),
            e('div', { className: 'flex items-center gap-2' },
                e('button', { className: 'btn btn-outline text-xs py-1 px-3' },
                    e('i', { className: 'far fa-save text-xs mr-1' }), 'Lưu'
                ),
                // Dropdown "Thêm điều kiện"
                e('div', { className: 'relative' },
                    e('button', {
                        className: 'btn btn-primary text-xs py-1 px-3 flex items-center gap-1',
                        onClick: () => setShowAddMenu(!showAddMenu)
                    },
                        e('i', { className: 'fas fa-plus text-xs' }), 'Thêm điều kiện',
                        e('i', { className: 'fas fa-chevron-down text-xs ml-1' })
                    ),
                    // Dropdown menu
                    showAddMenu && e('div', {
                        className: 'absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 w-64'
                    },
                        e('button', {
                            className: 'w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2',
                            onClick: () => {
                                setShowBoKhungModal(true);
                                setShowAddMenu(false);
                            }
                        },
                            e('i', { className: 'fas fa-box text-gray-400' }), 'Thêm từ Bộ khung điều kiện'
                        ),
                        e('button', {
                            className: 'w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2',
                            onClick: () => {
                                setShowSaoChepModal(true);
                                setShowAddMenu(false);
                                setSaoChepResults({ commitment: [], tsbđ: [] });
                            }
                        },
                            e('i', { className: 'fas fa-copy text-gray-400' }), 'Sao chép từ Commitment/TSBD khác'
                        ),
                        e('button', {
                            className: 'w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2',
                            onClick: () => {
                                setEditFormData({
                                    doiTuong: 'commitment',
                                    commitmentApDung: '',
                                    nhomDieuKien: '',
                                    loaiDieuKien: '',
                                    noiDung: '',
                                    tanSuat: '',
                                    dieuKienTQ: '',
                                    camKetHDTD: false,
                                    dieuKienKHHoanThien: false,
                                    mienApDung: false
                                });
                                setSelectedDieuKien(null);
                                setShowEditModal(true);
                                setShowAddMenu(false);
                            }
                        },
                            e('i', { className: 'fas fa-pen text-gray-400' }), 'Thêm thủ công'
                        ),
                        e('button', {
                            className: 'w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
                        },
                            e('i', { className: 'fas fa-upload text-gray-400' }), 'Upload theo lô'
                        )
                    )
                )
            )
        ),

        // Bảng danh sách
        e('div', { className: 'bg-white rounded-lg border border-gray-200' },
            // Header bảng
            e('div', { className: 'px-4 py-2 border-b border-gray-200 flex items-center justify-between' },
                e('div', { className: 'flex items-center gap-2' },
                    e('span', { className: 'text-sm font-medium text-gray-700' }, 'Danh sách điều kiện gắn với commitment'),
                    e('span', { className: 'bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs' }, dieuKienData.length)
                ),
                e('button', { className: 'btn btn-outline text-xs py-1 px-3' },
                    e('i', { className: 'fas fa-sort text-xs mr-1' }), 'Sắp xếp'
                )
            ),

            // Bảng với scroll ngang
            e('div', { className: 'overflow-x-auto' },
                e('table', { className: 'w-full text-sm', style: { minWidth: '1400px' } },
                    e('thead', null,
                        e('tr', { className: 'bg-gray-50 text-left border-b border-gray-200' },
                            e('th', { className: 'px-3 py-2 text-gray-600 font-medium w-8' },
                                e('input', { type: 'checkbox', className: 'rounded' })
                            ),
                            e('th', { className: 'px-3 py-2 text-gray-600 font-medium w-12' }, 'STT'),
                            e('th', { className: 'px-3 py-2 text-gray-600 font-medium w-40' }, 'ID Commitment'),
                            e('th', { className: 'px-3 py-2 text-gray-600 font-medium w-36' }, 'Nhóm điều kiện'),
                            e('th', { className: 'px-3 py-2 text-gray-600 font-medium w-40' }, 'Loại điều kiện'),
                            e('th', { className: 'px-3 py-2 text-gray-600 font-medium' }, 'Nội dung điều kiện'),
                            e('th', { className: 'px-3 py-2 text-gray-600 font-medium w-28' }, 'Tần suất báo cáo đánh giá'),
                            e('th', { className: 'px-3 py-2 text-gray-600 font-medium w-28' }, 'Cam kết tại HĐTD'),
                            e('th', { className: 'px-3 py-2 text-gray-600 font-medium w-36' }, 'Điều kiện tiên quyết'),
                            e('th', { className: 'px-3 py-2 text-gray-600 font-medium w-24' }, 'Trạng thái'),
                            e('th', { className: 'px-3 py-2 text-gray-600 font-medium w-44' }, 'User cập nhật gần nhất')
                        )
                    ),
                    e('tbody', null,
                        dieuKienData.map((row, idx) =>
                            e('tr', { key: idx, className: 'border-t border-gray-100 hover:bg-gray-50' },
                                e('td', { className: 'px-3 py-2' },
                                    e('input', { type: 'checkbox', className: 'rounded' })
                                ),
                                e('td', { className: 'px-3 py-2 text-gray-700' }, row.stt),
                                e('td', { className: 'px-3 py-2 text-gray-700 font-medium' }, row.idCommitment),
                                e('td', { className: 'px-3 py-2 text-gray-700' }, row.nhomDieuKien),
                                e('td', { className: 'px-3 py-2 text-gray-700' }, row.loaiDieuKien),
                                e('td', { className: 'px-3 py-2 text-gray-700' },
                                    e('div', { className: 'line-clamp-3' }, row.noiDung)
                                ),
                                e('td', { className: 'px-3 py-2 text-gray-700' }, row.tanSuat || '-'),
                                e('td', { className: 'px-3 py-2' },
                                    row.camKetHDTD === 'Có' ?
                                        e('span', { className: 'text-green-600 flex items-center gap-1' },
                                            e('i', { className: 'fas fa-check text-xs' }), 'Có'
                                        ) :
                                        row.camKetHDTD === 'Không' ?
                                            e('span', { className: 'text-gray-500' }, 'Không') :
                                            e('span', { className: 'text-gray-700' }, row.camKetHDTD)
                                ),
                                e('td', { className: 'px-3 py-2 text-gray-700' }, row.dieuKienTQ),
                                e('td', { className: 'px-3 py-2' },
                                    e('span', {
                                        className: 'inline-flex items-center gap-1 text-xs ' + (row.trangThai ? 'text-green-600' : 'text-gray-400')
                                    },
                                        e('span', { className: 'w-2 h-2 rounded-full ' + (row.trangThai ? 'bg-green-500' : 'bg-gray-400') }),
                                        row.trangThai ? 'Mail' : 'Mail'
                                    )
                                ),
                                e('td', { className: 'px-3 py-2' },
                                    e('div', { className: 'flex items-center justify-between' },
                                        e('span', { className: 'text-gray-700 text-xs whitespace-pre-line' }, row.userCapNhat || '-'),
                                        e('div', { className: 'flex items-center gap-1' },
                                            e('button', {
                                                className: 'p-1 text-gray-400 hover:text-blue-600',
                                                onClick: () => {
                                                    setSelectedDieuKien(row);
                                                    setEditFormData({
                                                        doiTuong: 'commitment',
                                                        commitmentApDung: row.idCommitment,
                                                        nhomDieuKien: row.nhomDieuKien,
                                                        loaiDieuKien: row.loaiDieuKien,
                                                        noiDung: row.noiDung,
                                                        tanSuat: row.tanSuat,
                                                        dieuKienTQ: row.dieuKienTQ,
                                                        camKetHDTD: row.camKetHDTD === 'Có',
                                                        dieuKienKHHoanThien: false,
                                                        mienApDung: false
                                                    });
                                                    setShowEditModal(true);
                                                }
                                            },
                                                e('i', { className: 'fas fa-pen text-xs' })
                                            ),
                                            e('button', { className: 'p-1 text-gray-400 hover:text-red-600' },
                                                e('i', { className: 'fas fa-trash text-xs' })
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),

        // Modal chỉnh sửa điều kiện
        showEditModal && e('div', { className: 'fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 overflow-auto' },
            e('div', { className: 'bg-white rounded-lg shadow-2xl w-full max-w-3xl' },
                // Header
                e('div', { className: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between' },
                    e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Thêm điều kiện thủ công'),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: () => setShowEditModal(false)
                    },
                        e('i', { className: 'fas fa-times text-lg' })
                    )
                ),

                // Body
                e('div', { className: 'p-6 space-y-5' },
                    // ID và thông tin
                    e('div', { className: 'flex items-center gap-4' },
                        e('div', { className: 'w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center' },
                            e('span', { className: 'text-gray-400 font-bold' }, '#')
                        ),
                        e('div', null,
                            e('div', { className: 'font-semibold text-gray-800' }, 'CAS' + (selectedDieuKien?.stt || 'XXX')),
                            e('div', { className: 'flex items-center gap-3 text-xs text-gray-500' },
                                e('span', { className: 'flex items-center gap-1' },
                                    e('span', { className: 'w-2 h-2 rounded-full bg-green-500' }), 'Mới'
                                ),
                                e('span', null, '📅 Ngày tạo: 07/01/2026 14:23:15'),
                                e('span', null, '👤 User tạo: Hoang Quoc Dat')
                            )
                        )
                    ),

                    // Đối tượng áp dụng
                    e('div', null,
                        e('label', { className: 'block text-sm text-gray-600 mb-2' }, 'Đối tượng áp dụng'),
                        e('div', { className: 'flex items-center gap-6' },
                            e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                e('input', {
                                    type: 'radio',
                                    name: 'doiTuong',
                                    checked: editFormData.doiTuong === 'commitment',
                                    onChange: () => setEditFormData({ ...editFormData, doiTuong: 'commitment' }),
                                    className: 'w-4 h-4'
                                }),
                                e('span', { className: 'text-sm' }, 'Commitment')
                            ),
                            e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                e('input', {
                                    type: 'radio',
                                    name: 'doiTuong',
                                    checked: editFormData.doiTuong === 'taisandambao',
                                    onChange: () => setEditFormData({ ...editFormData, doiTuong: 'taisandambao' }),
                                    className: 'w-4 h-4'
                                }),
                                e('span', { className: 'text-sm' }, 'Tài sản đảm bảo')
                            )
                        )
                    ),

                    // Commitment áp dụng
                    e('div', null,
                        e('label', { className: 'block text-sm text-gray-600 mb-1' },
                            'Commitment áp dụng ', e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('select', {
                            className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
                            value: editFormData.commitmentApDung || '',
                            onChange: (ev) => setEditFormData({ ...editFormData, commitmentApDung: ev.target.value })
                        },
                            e('option', { value: '' }, 'Lựa chọn'),
                            e('option', { value: 'CMT_2025_001 - Hạn mức tín dụng KKH - 50 tỷ VND' }, 'CMT_2025_001 - Hạn mức tín dụng KKH - 50 tỷ VND'),
                            e('option', { value: 'CMT_2025_002 - Vay vốn lưu động - 30 tỷ VND' }, 'CMT_2025_002 - Vay vốn lưu động - 30 tỷ VND')
                        )
                    ),

                    // Nhóm điều kiện + Loại điều kiện
                    e('div', { className: 'grid grid-cols-2 gap-4' },
                        e('div', null,
                            e('label', { className: 'block text-sm text-gray-600 mb-1' },
                                'Nhóm điều kiện ', e('span', { className: 'text-red-500' }, '*')
                            ),
                            e('select', {
                                className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
                                value: editFormData.nhomDieuKien || '',
                                onChange: (ev) => setEditFormData({ ...editFormData, nhomDieuKien: ev.target.value })
                            },
                                e('option', { value: '' }, 'Lựa chọn'),
                                e('option', { value: 'Nội dung cấp tín dụng' }, 'Nội dung cấp tín dụng'),
                                e('option', { value: 'Biện pháp bảo đảm' }, 'Biện pháp bảo đảm'),
                                e('option', { value: 'Điều kiện cấp tín dụng' }, 'Điều kiện cấp tín dụng')
                            )
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm text-gray-600 mb-1' },
                                'Loại điều kiện ', e('span', { className: 'text-red-500' }, '*')
                            ),
                            e('select', {
                                className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50',
                                value: editFormData.loaiDieuKien || '',
                                onChange: (ev) => setEditFormData({ ...editFormData, loaiDieuKien: ev.target.value })
                            },
                                e('option', { value: '' }, 'Lựa chọn'),
                                e('option', { value: 'Số tiền cấp tín dụng' }, 'Số tiền cấp tín dụng'),
                                e('option', { value: 'Mục đích cấp tín dụng' }, 'Mục đích cấp tín dụng'),
                                e('option', { value: 'Tỷ lệ TSBD' }, 'Tỷ lệ TSBD'),
                                e('option', { value: 'Pháp lý' }, 'Pháp lý')
                            )
                        )
                    ),

                    // Nội dung điều kiện
                    e('div', null,
                        e('label', { className: 'block text-sm text-gray-600 mb-1' },
                            'Nội dung điều kiện ', e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('textarea', {
                            className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
                            rows: 3,
                            placeholder: 'Nhập nội dung',
                            value: editFormData.noiDung || '',
                            onChange: (ev) => setEditFormData({ ...editFormData, noiDung: ev.target.value })
                        })
                    ),

                    // Tần suất báo cáo đánh giá
                    e('div', null,
                        e('label', { className: 'block text-sm text-gray-600 mb-1' },
                            'Tần suất báo cáo đánh giá ', e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('select', {
                            className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
                            value: editFormData.tanSuat || '',
                            onChange: (ev) => setEditFormData({ ...editFormData, tanSuat: ev.target.value })
                        },
                            e('option', { value: '' }, 'Lựa chọn'),
                            e('option', { value: 'Hàng tháng' }, 'Hàng tháng'),
                            e('option', { value: 'Hàng quý' }, 'Hàng quý'),
                            e('option', { value: 'Hàng năm' }, 'Hàng năm')
                        )
                    ),

                    // Điều kiện tiên quyết
                    e('div', null,
                        e('label', { className: 'block text-sm text-gray-600 mb-1' }, 'Điều kiện tiên quyết'),
                        e('select', {
                            className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
                            value: editFormData.dieuKienTQ || '',
                            onChange: (ev) => setEditFormData({ ...editFormData, dieuKienTQ: ev.target.value })
                        },
                            e('option', { value: '' }, 'Lựa chọn'),
                            e('option', { value: 'Trước khi cấp tín dụng' }, 'Trước khi cấp tín dụng'),
                            e('option', { value: 'Trước khi ký HĐTĐ' }, 'Trước khi ký HĐTĐ'),
                            e('option', { value: 'Không' }, 'Không')
                        )
                    ),

                    // Checkboxes
                    e('div', { className: 'bg-gray-50 rounded-lg p-4 flex items-center gap-6' },
                        e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                            e('input', {
                                type: 'checkbox',
                                checked: editFormData.camKetHDTD || false,
                                onChange: (ev) => setEditFormData({ ...editFormData, camKetHDTD: ev.target.checked })
                            }),
                            e('span', { className: 'text-sm' }, 'Cam kết HĐTD')
                        ),
                        e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                            e('input', {
                                type: 'checkbox',
                                checked: editFormData.dieuKienKHHoanThien || false,
                                onChange: (ev) => setEditFormData({ ...editFormData, dieuKienKHHoanThien: ev.target.checked })
                            }),
                            e('span', { className: 'text-sm' }, 'Điều kiện KH phải hoàn thiện')
                        )
                    ),

                    // Toggle Miễn áp dụng
                    e('div', { className: 'flex items-center gap-3' },
                        e('button', {
                            className: 'w-10 h-5 rounded-full transition-colors ' + (editFormData.mienApDung ? 'bg-[#006B68]' : 'bg-gray-300'),
                            onClick: () => setEditFormData({ ...editFormData, mienApDung: !editFormData.mienApDung })
                        },
                            e('span', {
                                className: 'block w-4 h-4 bg-white rounded-full shadow transform transition-transform ' +
                                    (editFormData.mienApDung ? 'translate-x-5' : 'translate-x-0.5')
                            })
                        ),
                        e('span', { className: 'text-sm text-gray-700' }, 'Miễn áp dụng')
                    )
                ),

                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex justify-end' },
                    e('button', {
                        className: 'btn btn-primary',
                        onClick: () => setShowEditModal(false)
                    }, 'Xác nhận')
                )
            )
        ),

        // Modal "Thêm từ Bộ khung điều kiện"
        showBoKhungModal && e('div', { className: 'fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 overflow-auto' },
            e('div', { className: 'bg-white rounded-lg shadow-2xl w-full max-w-4xl' },
                // Header
                e('div', { className: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between' },
                    e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Thêm từ Bộ khung điều kiện'),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: () => setShowBoKhungModal(false)
                    },
                        e('i', { className: 'fas fa-times text-lg' })
                    )
                ),

                // Body
                e('div', { className: 'p-6' },
                    // Thông tin tìm kiếm
                    e('div', { className: 'mb-6' },
                        e('div', { className: 'flex items-center gap-2 mb-4' },
                            e('i', { className: 'fas fa-search text-gray-400' }),
                            e('span', { className: 'text-sm font-medium text-gray-700' }, 'Thông tin tìm kiếm')
                        ),

                        // Row 1: Từ khóa, Loại điều kiện, Nhóm điều kiện
                        e('div', { className: 'grid grid-cols-3 gap-4 mb-4' },
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-1' }, 'Từ khóa'),
                                e('input', {
                                    type: 'text',
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
                                    placeholder: 'Nhập từ khóa tìm kiếm theo ID, nội dung, văn bả...',
                                    value: searchFilters.tuKhoa,
                                    onChange: (ev) => setSearchFilters({ ...searchFilters, tuKhoa: ev.target.value })
                                })
                            ),
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-1' }, 'Loại điều kiện'),
                                e('select', {
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
                                    value: searchFilters.loaiDieuKien,
                                    onChange: (ev) => setSearchFilters({ ...searchFilters, loaiDieuKien: ev.target.value })
                                },
                                    e('option', { value: '' }, 'Lựa chọn'),
                                    e('option', { value: 'Số tiền cấp tín dụng' }, 'Số tiền cấp tín dụng'),
                                    e('option', { value: 'Tỷ lệ TSBĐ' }, 'Tỷ lệ TSBĐ'),
                                    e('option', { value: 'Loại TSBĐ' }, 'Loại TSBĐ'),
                                    e('option', { value: 'Thời hạn cho vay' }, 'Thời hạn cho vay'),
                                    e('option', { value: 'Pháp lý' }, 'Pháp lý'),
                                    e('option', { value: 'Khác' }, 'Khác')
                                )
                            ),
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-1' }, 'Nhóm điều kiện'),
                                e('select', {
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
                                    value: searchFilters.nhomDieuKien,
                                    onChange: (ev) => setSearchFilters({ ...searchFilters, nhomDieuKien: ev.target.value })
                                },
                                    e('option', { value: '' }, 'Lựa chọn'),
                                    e('option', { value: 'Nội dung cấp tín dụng' }, 'Nội dung cấp tín dụng'),
                                    e('option', { value: 'Biện pháp bảo đảm' }, 'Biện pháp bảo đảm'),
                                    e('option', { value: 'Điều kiện cấp tín dụng' }, 'Điều kiện cấp tín dụng')
                                )
                            )
                        ),

                        // Row 2: Loại khách hàng, Kỳ hạn, Mục đích cấp tín dụng
                        e('div', { className: 'grid grid-cols-3 gap-4 mb-4' },
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-1' }, 'Loại khách hàng'),
                                e('select', {
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
                                    value: searchFilters.loaiKhachHang,
                                    onChange: (ev) => setSearchFilters({ ...searchFilters, loaiKhachHang: ev.target.value })
                                },
                                    e('option', { value: '' }, 'Lựa chọn'),
                                    e('option', { value: 'Cá nhân' }, 'Cá nhân'),
                                    e('option', { value: 'Doanh nghiệp' }, 'Doanh nghiệp')
                                )
                            ),
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-1' }, 'Kỳ hạn'),
                                e('select', {
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
                                    value: searchFilters.kyHan,
                                    onChange: (ev) => setSearchFilters({ ...searchFilters, kyHan: ev.target.value })
                                },
                                    e('option', { value: '' }, 'Lựa chọn'),
                                    e('option', { value: 'Ngắn hạn' }, 'Ngắn hạn'),
                                    e('option', { value: 'Trung hạn' }, 'Trung hạn'),
                                    e('option', { value: 'Dài hạn' }, 'Dài hạn')
                                )
                            ),
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-1' }, 'Mục đích cấp tín dụng'),
                                e('select', {
                                    className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
                                    value: searchFilters.mucDich,
                                    onChange: (ev) => setSearchFilters({ ...searchFilters, mucDich: ev.target.value })
                                },
                                    e('option', { value: '' }, 'Lựa chọn'),
                                    e('option', { value: 'Vốn lưu động' }, 'Vốn lưu động'),
                                    e('option', { value: 'Đầu tư TSCĐ' }, 'Đầu tư TSCĐ'),
                                    e('option', { value: 'Tiêu dùng' }, 'Tiêu dùng')
                                )
                            )
                        ),

                        // Buttons tìm kiếm
                        e('div', { className: 'flex justify-end gap-3' },
                            e('button', {
                                className: 'btn btn-outline text-sm',
                                onClick: () => setSearchFilters({
                                    tuKhoa: '', loaiDieuKien: '', nhomDieuKien: '',
                                    loaiKhachHang: '', kyHan: '', mucDich: ''
                                })
                            }, 'Xóa bộ lọc'),
                            e('button', {
                                className: 'btn btn-primary text-sm',
                                onClick: () => {
                                    // Giả lập kết quả tìm kiếm
                                    setBoKhungResults([
                                        { id: 1, maDK: 'DKCTD-001', nhom: 'Điều kiện cấp tín dụng', loai: 'Pháp lý', moTa: 'KH chưa cung cấp báo cáo tài chính năm gần nhất được kiểm toán', noiDung: 'Doanh nghiệp phải có đầy đủ giấy phép kinh doanh hợp lệ, không bị đình chỉ', dieuKienBB: 'Không', checked: true },
                                        { id: 2, maDK: 'DKCTD-002', nhom: 'Điều kiện cấp tín dụng', loai: 'Pháp lý', moTa: 'KH chưa cung cấp báo cáo tài chính năm gần nhất được kiểm toán', noiDung: 'Doanh nghiệp phải có đầy đủ giấy phép kinh doanh hợp lệ, không bị đình chỉ', dieuKienBB: 'Có', checked: false },
                                        { id: 3, maDK: 'DKCTD-003', nhom: 'Biện pháp bảo đảm', loai: 'Tỷ lệ TSBĐ', moTa: 'KH chưa cung cấp báo cáo tài chính năm gần nhất được kiểm toán', noiDung: 'Doanh nghiệp phải có đầy đủ giấy phép kinh doanh hợp lệ, không bị đình chỉ', dieuKienBB: 'Có', checked: true },
                                        { id: 4, maDK: 'DKCTD-004', nhom: 'Biện pháp bảo đảm', loai: 'Tỷ lệ TSBĐ', moTa: 'KH chưa cung cấp báo cáo tài chính năm gần nhất được kiểm toán', noiDung: 'Doanh nghiệp phải có đầy đủ giấy phép kinh doanh hợp lệ, không bị đình chỉ', dieuKienBB: 'Có', checked: true },
                                        { id: 5, maDK: 'DKCTD-005', nhom: 'Điều kiện cấp tín dụng', loai: 'Pháp lý', moTa: 'KH chưa cung cấp báo cáo tài chính năm gần nhất được kiểm toán', noiDung: 'Doanh nghiệp phải có đầy đủ giấy phép kinh doanh hợp lệ, không bị đình chỉ', dieuKienBB: 'Có', checked: false },
                                        { id: 6, maDK: 'DKCTD-006', nhom: 'Điều kiện cấp tín dụng', loai: 'Tài chính', moTa: 'KH chưa cung cấp báo cáo tài chính năm gần nhất được kiểm toán', noiDung: 'Doanh nghiệp phải có đầy đủ giấy phép kinh doanh hợp lệ, không bị đình chỉ', dieuKienBB: 'Có', checked: true }
                                    ]);
                                }
                            },
                                e('i', { className: 'fas fa-search text-xs mr-1' }), 'Tìm kiếm'
                            )
                        )
                    ),

                    // Danh sách điều kiện
                    e('div', null,
                        boKhungResults.length === 0 ?
                            // Empty state
                            e('div', { className: 'text-center py-12' },
                                e('div', { className: 'w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4' },
                                    e('i', { className: 'fas fa-cloud text-gray-300 text-2xl' })
                                ),
                                e('p', { className: 'text-gray-500 font-medium' }, 'Không có dữ liệu'),
                                e('p', { className: 'text-gray-400 text-sm' }, 'Nhập thông tin tìm kiếm để hiển thị danh sách')
                            ) :
                            // Results list với scroll
                            e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                                e('div', { className: 'overflow-x-auto' },
                                    e('table', { className: 'w-full text-sm', style: { minWidth: '1000px' } },
                                        e('thead', null,
                                            e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                                                e('th', { className: 'px-3 py-2 text-left w-10' },
                                                    e('input', { type: 'checkbox' })
                                                ),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium w-12' }, 'STT'),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium w-28' }, 'Mã điều kiện'),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium w-40' }, 'Nhóm điều kiện'),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium w-28' }, 'Loại điều kiện'),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium' }, 'Mô tả trường hợp áp dụng'),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium' }, 'Nội dung điều kiện'),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium w-28' }, 'Điều kiện bắt buộc')
                                            )
                                        ),
                                        e('tbody', null,
                                            boKhungResults.map((item, idx) =>
                                                e('tr', {
                                                    key: idx,
                                                    className: 'border-t border-gray-100 hover:bg-gray-50 ' + (item.checked ? 'bg-green-50' : '')
                                                },
                                                    e('td', { className: 'px-3 py-2' },
                                                        e('input', {
                                                            type: 'checkbox',
                                                            checked: item.checked || false,
                                                            onChange: () => {
                                                                const newResults = [...boKhungResults];
                                                                newResults[idx].checked = !newResults[idx].checked;
                                                                setBoKhungResults(newResults);
                                                            }
                                                        })
                                                    ),
                                                    e('td', { className: 'px-3 py-2 text-gray-700' }, item.id),
                                                    e('td', { className: 'px-3 py-2 text-gray-700 font-medium' }, item.maDK),
                                                    e('td', { className: 'px-3 py-2 text-gray-700' }, item.nhom),
                                                    e('td', { className: 'px-3 py-2 text-gray-700' }, item.loai),
                                                    e('td', { className: 'px-3 py-2 text-gray-600' }, item.moTa),
                                                    e('td', { className: 'px-3 py-2 text-gray-700' }, item.noiDung),
                                                    e('td', { className: 'px-3 py-2 text-gray-700' }, item.dieuKienBB)
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                    )
                ),

                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex items-center justify-between' },
                    e('span', { className: 'text-sm text-gray-600' },
                        'Đã chọn ',
                        e('span', { className: 'font-semibold text-[#006B68]' }, boKhungResults.filter(r => r.checked).length),
                        ' điều kiện'
                    ),
                    e('button', {
                        className: 'btn btn-primary',
                        onClick: () => setShowBoKhungModal(false)
                    }, 'Xác nhận')
                )
            )
        ),

        // Modal "Sao chép từ Commitment/TSBD khác"
        showSaoChepModal && e('div', { className: 'fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 overflow-auto' },
            e('div', { className: 'bg-white rounded-lg shadow-2xl w-full max-w-4xl mb-10' },
                // Header
                e('div', { className: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between' },
                    e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Sao chép từ Commitment/TSBD khác'),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: () => setShowSaoChepModal(false)
                    },
                        e('i', { className: 'fas fa-times text-lg' })
                    )
                ),

                // Body
                e('div', { className: 'p-6' },
                    // Form tìm kiếm
                    e('div', { className: 'flex items-end gap-4 mb-6' },
                        e('div', { className: 'w-32' },
                            e('label', { className: 'block text-sm text-gray-600 mb-1' }, 'CIF'),
                            e('div', { className: 'relative' },
                                e('i', { className: 'fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs' }),
                                e('input', {
                                    type: 'text',
                                    className: 'w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm',
                                    placeholder: 'Tìm kiếm CIF',
                                    value: saoChepFilters.cif,
                                    onChange: (ev) => setSaoChepFilters({ ...saoChepFilters, cif: ev.target.value })
                                })
                            )
                        ),
                        e('div', { className: 'flex-1' },
                            e('label', { className: 'block text-sm text-gray-600 mb-1' }, 'Thời gian phê duyệt Đề xuất cấp tín dụng'),
                            e('div', { className: 'flex items-center gap-2' },
                                e('div', { className: 'relative' },
                                    e('input', {
                                        type: 'text',
                                        className: 'w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm',
                                        value: saoChepFilters.tuNgay,
                                        onChange: (ev) => setSaoChepFilters({ ...saoChepFilters, tuNgay: ev.target.value })
                                    }),
                                    e('i', { className: 'fas fa-calendar absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs' })
                                ),
                                e('div', { className: 'relative' },
                                    e('input', {
                                        type: 'text',
                                        className: 'w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm',
                                        value: saoChepFilters.denNgay,
                                        onChange: (ev) => setSaoChepFilters({ ...saoChepFilters, denNgay: ev.target.value })
                                    }),
                                    e('i', { className: 'fas fa-calendar absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs' })
                                )
                            )
                        ),
                        e('button', {
                            className: 'btn btn-primary text-sm',
                            onClick: () => {
                                // Giả lập kết quả tìm kiếm
                                setSaoChepResults({
                                    commitment: [
                                        { id: 'CMT_2024_001', name: 'Hạn mức KKH - Công ty TNHH MTV', soLuong: 2 },
                                        { id: 'CMT_2024_002', name: 'Vay ngắn hạn - Công ty Phát triển HD', soLuong: 5 },
                                        { id: 'CMT_2024_003', name: 'Vay ngắn hạn - Khu công nghiệp', soLuong: 8 },
                                        { id: 'CMT_2024_004', name: 'Hạn mức KKH - Tập đoàn viễn thông quân đội Viettel', soLuong: 5 },
                                        { id: 'CMT_2024_005', name: 'Vay ngắn hạn - Tổng công ty dịch vụ số Viettel', soLuong: 3 }
                                    ],
                                    tsbđ: [
                                        { id: 'TSBD_2024_001', name: 'Quyền sử dụng đất - 123 Nguyễn Huệ', soLuong: 2 },
                                        { id: 'TSBD_2024_002', name: 'Nhà xưởng - KCN Tân Bình', soLuong: 5 },
                                        { id: 'TSBD_2024_004', name: 'Quyền sử dụng đất - Nhà máy THT', soLuong: 3 },
                                        { id: 'TSBD_2024_005', name: 'Nhà xưởng - KCN đã Khánh Thành', soLuong: 3 }
                                    ]
                                });
                            }
                        }, 'Tìm kiếm')
                    ),

                    // Kết quả hoặc empty state
                    saoChepResults.commitment.length === 0 && saoChepResults.tsbđ.length === 0 ?
                        e('div', { className: 'text-center py-16' },
                            e('div', { className: 'w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4' },
                                e('i', { className: 'fas fa-file-search text-gray-300 text-3xl' })
                            ),
                            e('p', { className: 'text-gray-500' }, 'Nhập CIF để tìm kiếm điều kiện')
                        ) :
                        e('div', { className: 'space-y-6' },
                            // Danh sách điều kiện gắn với commitment
                            e('div', null,
                                e('div', { className: 'flex items-center justify-between mb-3' },
                                    e('h4', { className: 'text-sm font-medium text-gray-700' }, 'Danh sách điều kiện gắn với commitment'),
                                    e('button', { className: 'btn btn-outline text-xs py-1 px-3' },
                                        e('i', { className: 'fas fa-filter text-xs mr-1' }), 'Lọc'
                                    )
                                ),
                                e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                                    e('table', { className: 'w-full text-sm' },
                                        e('thead', null,
                                            e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                                                e('th', { className: 'px-3 py-2 w-10' }),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium' }),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium' }, 'Nhóm điều kiện'),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium' }, 'Loại điều kiện'),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium' }, 'Nội dung điều kiện'),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium w-24' }, 'Trạng thái')
                                            )
                                        ),
                                        e('tbody', null,
                                            saoChepResults.commitment.map((item, idx) =>
                                                e('tr', { key: idx, className: 'border-t border-gray-100 hover:bg-gray-50' },
                                                    e('td', { className: 'px-3 py-2' },
                                                        e('input', { type: 'checkbox' })
                                                    ),
                                                    e('td', { className: 'px-3 py-2' },
                                                        e('div', { className: 'flex items-center gap-2' },
                                                            e('button', {
                                                                className: 'text-gray-400 hover:text-gray-600',
                                                                onClick: () => setExpandedItems({ ...expandedItems, ['cmt_' + idx]: !expandedItems['cmt_' + idx] })
                                                            },
                                                                e('i', { className: 'fas fa-chevron-' + (expandedItems['cmt_' + idx] ? 'down' : 'right') + ' text-xs' })
                                                            ),
                                                            e('span', { className: 'font-medium text-gray-800' }, item.id + ' - ' + item.name),
                                                            e('span', { className: 'text-xs text-orange-500 ml-1' }, item.soLuong + ' điều kiện')
                                                        )
                                                    ),
                                                    e('td', { className: 'px-3 py-2' }),
                                                    e('td', { className: 'px-3 py-2' }),
                                                    e('td', { className: 'px-3 py-2' }),
                                                    e('td', { className: 'px-3 py-2' })
                                                )
                                            )
                                        )
                                    )
                                )
                            ),

                            // Danh sách điều kiện gắn với Tài sản đảm bảo
                            e('div', null,
                                e('div', { className: 'flex items-center justify-between mb-3' },
                                    e('h4', { className: 'text-sm font-medium text-gray-700' }, 'Danh sách điều kiện gắn với Tài sản đảm bảo'),
                                    e('button', { className: 'btn btn-outline text-xs py-1 px-3' },
                                        e('i', { className: 'fas fa-filter text-xs mr-1' }), 'Lọc'
                                    )
                                ),
                                e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                                    e('table', { className: 'w-full text-sm' },
                                        e('thead', null,
                                            e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                                                e('th', { className: 'px-3 py-2 w-10' }),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium' }),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium' }, 'Nhóm điều kiện'),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium' }, 'Loại điều kiện'),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium' }, 'Nội dung điều kiện'),
                                                e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium w-24' }, 'Trạng thái')
                                            )
                                        ),
                                        e('tbody', null,
                                            saoChepResults.tsbđ.map((item, idx) =>
                                                e('tr', { key: idx, className: 'border-t border-gray-100 hover:bg-gray-50' },
                                                    e('td', { className: 'px-3 py-2' },
                                                        e('input', { type: 'checkbox' })
                                                    ),
                                                    e('td', { className: 'px-3 py-2' },
                                                        e('div', { className: 'flex items-center gap-2' },
                                                            e('button', {
                                                                className: 'text-gray-400 hover:text-gray-600',
                                                                onClick: () => setExpandedItems({ ...expandedItems, ['tsbd_' + idx]: !expandedItems['tsbd_' + idx] })
                                                            },
                                                                e('i', { className: 'fas fa-chevron-' + (expandedItems['tsbd_' + idx] ? 'down' : 'right') + ' text-xs' })
                                                            ),
                                                            e('span', { className: 'font-medium text-gray-800' }, item.id + ' - ' + item.name),
                                                            e('span', { className: 'text-xs text-orange-500 ml-1' }, item.soLuong + ' điều kiện')
                                                        )
                                                    ),
                                                    e('td', { className: 'px-3 py-2' }),
                                                    e('td', { className: 'px-3 py-2' }),
                                                    e('td', { className: 'px-3 py-2' }),
                                                    e('td', { className: 'px-3 py-2' })
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                ),

                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex justify-end' },
                    e('button', {
                        className: 'btn btn-primary',
                        onClick: () => setShowSaoChepModal(false)
                    }, 'Xác nhận')
                )
            )
        )
    );
};
