// =====================================================
// Tab: Tổng quan đề xuất
// =====================================================

window.TabTongQuanDeXuat = function () {
    const e = React.createElement;

    // States
    const [activeSubTab, setActiveSubTab] = React.useState('deXuat');
    const [sangLocStatus, setSangLocStatus] = React.useState(null); // null, 'loading', 'autoapprove', 'expert', 'manual'
    const [showSangLocResult, setShowSangLocResult] = React.useState(false);
    const [showReport, setShowReport] = React.useState(false);
    const [collapseTomTat, setCollapseTomTat] = React.useState(true);
    const [collapseKetLuan, setCollapseKetLuan] = React.useState(true);
    const [collapseLichSu, setCollapseLichSu] = React.useState(true);
    const [pdfViewer, setPdfViewer] = React.useState(null);

    // Sub tabs
    const subTabs = [
        { id: 'deXuat', label: 'Đề xuất' },
        { id: 'lichSu', label: 'Lịch sử phê duyệt' }
    ];

    // Sample data - Thông tin tóm tắt
    const tomTatData = {
        xepHangTD: 'AA',
        trangThaiXepHang: 'Đã phê duyệt',
        loaiHoSo: 'Tái cấp',
        loaiHinhCapTD: 'Ngắn hạn',
        phuongThucCapTD: 'Hạn mức tín dụng',
        noiDungDeXuat: 'Cấp hạn mức tín dụng năm 2026 đối với Công ty CP ABC',
        soTien: '100.000',
        choVay: '60.000',
        baoLanh: '40.000',
        mucDich: 'Cấp tín dụng vốn lưu động',
        thoiHan: '30/10/2026'
    };

    // Sample data - Khoản cấp tín dụng
    const khoangTinDungData = [
        {
            id: 1,
            tenKhoan: 'Tên commitment level 1 (Hạn mức tín dụng năm 2026)',
            soTien: '200.000',
            mucDich: 'Cho vay, bảo lãnh, bổ sung vốn lưu động phục vụ hoạt động kinh doanh',
            thoiHanHieuLuc: '12 tháng kể từ ngày ký hợp đồng tín dụng nhưng không quá ngày 28/02/2027',
            thoiHanChoVay: '11 tháng',
            laiSuat: 'Theo quy định của BIDV từng thời kỳ'
        },
        {
            id: 2,
            tenKhoan: 'Tên commitment level 2 (Hạn mức cho vay, bảo lãnh thanh toán)',
            soTien: '100.000',
            mucDich: 'Cho vay, bảo lãnh, bổ sung vốn lưu động phục vụ hoạt động kinh doanh',
            thoiHanHieuLuc: '12 tháng kể từ ngày ký hợp đồng tín dụng nhưng không quá ngày 28/02/2027',
            thoiHanChoVay: '11 tháng',
            laiSuat: 'Theo quy định của BIDV từng thời kỳ'
        },
        {
            id: 3,
            tenKhoan: 'Tên commitment level 3 (Hạn mức cho vay xây lắp)',
            soTien: '50.000',
            mucDich: 'Cho vay, bảo lãnh, bổ sung vốn lưu động phục vụ hoạt động kinh doanh',
            thoiHanHieuLuc: '12 tháng kể từ ngày ký hợp đồng tín dụng nhưng không quá ngày 28/02/2027',
            thoiHanChoVay: '11 tháng',
            laiSuat: 'Theo quy định của BIDV từng thời kỳ'
        },
        {
            id: 4,
            tenKhoan: 'Tên commitment level 4 (Hạn mức cho vay thương mại vật liệu xây dựng)',
            soTien: '50.000',
            mucDich: 'Cho vay, bảo lãnh, bổ sung vốn lưu động phục vụ hoạt động kinh doanh',
            thoiHanHieuLuc: '12 tháng kể từ ngày ký hợp đồng tín dụng nhưng không quá ngày 28/02/2027',
            thoiHanChoVay: '04 tháng',
            laiSuat: 'Theo quy định của BIDV từng thời kỳ'
        }
    ];

    // Sample data - Biện pháp bảo đảm
    const bienPhapBaoDamData = [
        {
            stt: 1,
            tenCommitment: 'Hạn mức tín dụng năm 2026',
            noiDung: 'Tại mọi thời điểm, Khách hàng đáp ứng chính sách cấp tín dụng, định hướng cấp tín dụng của BIDV, đồng thời:\n+ Đối với cho vay ngắn hạn, bảo lãnh: Tỷ lệ TSBĐ tối thiểu là 50%.\n+ Đối với cho vay thương mại vật liệu xây dựng: tỷ lệ TSBĐ tối thiểu 70%.'
        },
        {
            stt: 2,
            tenCommitment: 'Hạn mức tín dụng năm 2026',
            noiDung: 'Chi nhánh nhận làm tài sản bảo đảm bổ sung đối với hàng hóa luân chuyển trong quá trình sản xuất kinh doanh hình thành từ nguồn cấp tín dụng của BIDV. Công ty cam kết không thế chấp hóa luân chuyển trong quá trình sản xuất kinh doanh, các khoản phải thu, dòng tiền hình thành từ vốn vay BIDV cho tổ chức tín dụng khác hoặc bên thứ 3 (ghi rõ trong Hợp đồng tín dụng hạn mức).'
        },
        {
            stt: 3,
            tenCommitment: 'Hạn mức tín dụng năm 2026',
            noiDung: 'Các cổ đông (sở hữu từ 5% vốn điều lệ trở lên) cam kết không thế chấp cổ phần của Công ty tại bất kỳ tổ chức tín dụng/bên thứ ba khác'
        },
        {
            stt: 4,
            tenCommitment: 'Hạn mức tín dụng năm 2026',
            noiDung: 'Chi nhánh thực hiện định giá, nhận thế chấp/cầm cố, áp dụng hệ số giá trị tài sản bảo đảm, đăng ký giao dịch bảo đảm; Công ty mua bảo hiểm đối với tài sản bảo đảm theo đúng quy định của pháp luật và BIDV.'
        }
    ];

    // Điều kiện tín dụng
    const dieuKienTinDung = [
        'Thời hạn vay cụ thể tối đa không quá 6 tháng/món',
        'Thường xuyên theo dõi tình hình hoạt động SXKD của khách hàng để cấp tín dụng phù hợp nhu cầu.',
        'Kiểm tra mục đích sử dụng vốn vay, đảm bảo khách hàng sử dụng vốn đúng mục đích'
    ];

    // State cho khối luồng trình
    const [luongTrinhData, setLuongTrinhData] = React.useState({
        loaiKhachHang: 'Loại 1',
        tinDungDacThu: '',
        coSoXacDinhThamQuyen: '',
        thamQuyen: ''
    });

    // State cho người phê duyệt
    const [nguoiPheDuyet, setNguoiPheDuyet] = React.useState([
        { id: 1, cap: 'Người đề xuất', hoTen: 'Nguyễn Văn A', chucVu: 'Cán bộ QLKH', email: 'nguyenvana@bidv.com' },
        { id: 2, cap: 'Người thẩm định', hoTen: 'Nguyễn Thị B', chucVu: 'Trưởng phòng QLKH', email: 'nguyenthib@bidv.com' },
        { id: 3, cap: 'Người phê duyệt', hoTen: 'Nguyễn Đức C', chucVu: 'Phó Giám đốc Chi nhánh', email: 'nguyenducc@bidv.com' }
    ]);

    // Search user modal
    const [showSearchUser, setShowSearchUser] = React.useState(false);
    const [searchUserText, setSearchUserText] = React.useState('');
    const [editingIndex, setEditingIndex] = React.useState(null);

    // Sample users for search
    const allUsers = [
        { id: 1, maCB: 'CB001', hoTen: 'Nguyễn Văn A', chucVu: 'Cán bộ QLKH', email: 'nguyenvana@bidv.com' },
        { id: 2, maCB: 'CB002', hoTen: 'Nguyễn Thị B', chucVu: 'Trưởng phòng QLKH', email: 'nguyenthib@bidv.com' },
        { id: 3, maCB: 'CB003', hoTen: 'Nguyễn Đức C', chucVu: 'Phó Giám đốc Chi nhánh', email: 'nguyenducc@bidv.com' },
        { id: 4, maCB: 'CB004', hoTen: 'Trần Văn D', chucVu: 'Giám đốc Chi nhánh', email: 'tranvand@bidv.com' },
        { id: 5, maCB: 'CB005', hoTen: 'Lê Thị E', chucVu: 'Cán bộ thẩm định', email: 'lethie@bidv.com' },
        { id: 6, maCB: 'CB006', hoTen: 'Phạm Văn F', chucVu: 'Trưởng phòng TDRR', email: 'phamvanf@bidv.com' }
    ];

    // Tín dụng đặc thù options
    const tinDungDacThuOptions = [
        'Trả nợ khoản vay nước ngoài',
        'Cho vay trả cổ tức, chi lợi nhuận',
        'Cho vay trả nợ trước hạn khoản vay tại TCTD khác, chi nhánh NH nước ngoài',
        'Trả nợ bên thứ ba không phải TCTD',
        'Cho vay bù đắp tài chính',
        'Cho vay ra nước ngoài'
    ];

    // Thẩm quyền options
    const thamQuyenOptions = [
        'Phó Giám đốc QLKH',
        'Giám đốc Chi nhánh',
        'Hội đồng Tín dụng cơ sở',
        'Hội Sở chính'
    ];

    // Handle Sàng lọc
    const handleSangLoc = () => {
        setSangLocStatus('loading');
        // Simulate API call
        setTimeout(() => {
            // Random result for demo
            const results = ['autoapprove', 'expert', 'manual'];
            const randomResult = results[Math.floor(Math.random() * results.length)];
            setSangLocStatus(randomResult);
            setShowSangLocResult(true);
        }, 2000);
    };

    // Handle search and select user
    const handleSelectUser = (user) => {
        if (editingIndex !== null) {
            const updated = [...nguoiPheDuyet];
            updated[editingIndex] = {
                ...updated[editingIndex],
                hoTen: user.hoTen,
                chucVu: user.chucVu,
                email: user.email
            };
            setNguoiPheDuyet(updated);
        }
        setShowSearchUser(false);
        setSearchUserText('');
        setEditingIndex(null);
    };

    // Filter users
    const filteredUsers = allUsers.filter(u =>
        u.hoTen.toLowerCase().includes(searchUserText.toLowerCase()) ||
        u.maCB.toLowerCase().includes(searchUserText.toLowerCase()) ||
        u.email.toLowerCase().includes(searchUserText.toLowerCase())
    );

    // Render sub tab content
    const renderDeXuat = () => {
        return e('div', { className: 'space-y-3' },
            e('div', null,

                    // --- SUB-SECTION: Tóm tắt nội dung đề xuất ---
                    e('div', { className: 'bg-[#006B68]/5 border border-[#006B68]/20 rounded-lg px-4 py-3 mb-4' },
                        e('h4', { className: 'text-sm font-bold text-[#006B68] flex items-center gap-2 m-0' },
                            e('i', { className: 'fas fa-clipboard-list text-xs' }),
                            'Tóm tắt nội dung đề xuất'
                        )
                    ),

                    // Kết quả sàng lọc
                    showSangLocResult && e('div', {
                        className: 'mb-4 p-4 rounded-lg ' +
                            (sangLocStatus === 'autoapprove' ? 'bg-green-50 border border-green-200' :
                                sangLocStatus === 'expert' ? 'bg-blue-50 border border-blue-200' :
                                    'bg-yellow-50 border border-yellow-200')
                    },
                        e('div', { className: 'flex items-start gap-3' },
                            e('i', {
                                className: 'fas text-xl ' +
                                    (sangLocStatus === 'autoapprove' ? 'fa-check-circle text-green-500' :
                                        sangLocStatus === 'expert' ? 'fa-info-circle text-blue-500' :
                                            'fa-exclamation-triangle text-yellow-500')
                            }),
                            e('div', null,
                                e('h5', {
                                    className: 'font-semibold ' +
                                        (sangLocStatus === 'autoapprove' ? 'text-green-700' :
                                            sangLocStatus === 'expert' ? 'text-blue-700' : 'text-yellow-700')
                                },
                                    sangLocStatus === 'autoapprove' ? 'Đáp ứng điều kiện phê duyệt tự động' :
                                        sangLocStatus === 'expert' ? 'Đáp ứng điều kiện sản phẩm' :
                                            'Không đáp ứng điều kiện phê duyệt tự động/điều kiện sản phẩm'
                                ),
                                e('p', { className: 'text-sm text-gray-600 mt-1' },
                                    sangLocStatus === 'autoapprove' ? 'Cán bộ RM có thể sử dụng nút "Lưu" để hệ thống tự động lưu hồ sơ.' :
                                        sangLocStatus === 'expert' ? 'Hệ thống đã validate thẩm quyền phê duyệt theo luồng chuyên gia. Cán bộ QLKH có thể chỉnh sửa và đệ trình.' :
                                            'Cán bộ QLKH cần tự thêm luồng trình duyệt và thực hiện đệ trình hồ sơ theo luồng chuyên gia.'
                                )
                            )
                        )
                    ),

                    // Thông tin tóm tắt
                    e('div', { className: 'space-y-4 mb-6' },
                        e('div', { className: 'flex items-center gap-2' },
                            e('span', { className: 'text-sm text-gray-600 w-52' }, 'Nội dung đề xuất:'),
                            e('span', { className: 'text-sm font-semibold text-gray-800' }, tomTatData.noiDungDeXuat)
                        ),
                        e('div', { className: 'grid grid-cols-3 gap-4' },
                            e('div', { className: 'flex items-center gap-2' },
                                e('span', { className: 'text-sm text-gray-600' }, 'Xếp hạng tín dụng:'),
                                e('span', { className: 'text-sm font-semibold text-[#006B68]' }, tomTatData.xepHangTD),
                                e('span', { className: 'px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full ml-1' }, tomTatData.trangThaiXepHang)
                            ),
                            e('div', { className: 'flex items-center gap-2' },
                                e('span', { className: 'text-sm text-gray-600' }, 'Loại hình cấp tín dụng:'),
                                e('span', { className: 'text-sm font-medium text-gray-800' }, tomTatData.loaiHinhCapTD)
                            ),
                            e('div', { className: 'flex items-center gap-2' },
                                e('span', { className: 'text-sm text-gray-600' }, 'Phương thức cấp tín dụng:'),
                                e('span', { className: 'text-sm font-medium text-gray-800' }, 'Hạn mức')
                            )
                        )
                    ),

                    // 1. Nội dung khoản cấp tín dụng
                    e('div', { className: 'mb-6' },
                        e('h5', { className: 'text-sm font-semibold text-gray-800 mb-3' }, '1. Nội dung khoản cấp tín dụng:'),
                        e('div', { className: 'text-xs text-gray-500 text-right mb-2' }, 'Đơn vị: triệu đồng'),
                        e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                            e('table', { className: 'w-full text-sm' },
                                e('thead', null,
                                    e('tr', { className: 'bg-gray-100' },
                                        e('th', { className: 'px-3 py-2.5 text-left font-medium text-gray-600 border-r border-gray-200' }, 'Khoản tín dụng'),
                                        e('th', { className: 'px-3 py-2.5 text-right font-medium text-gray-600 border-r border-gray-200 w-24' }, 'Số tiền'),
                                        e('th', { className: 'px-3 py-2.5 text-left font-medium text-gray-600 border-r border-gray-200 w-40' }, 'Mục đích cấp tín dụng'),
                                        e('th', { className: 'px-3 py-2.5 text-left font-medium text-gray-600 border-r border-gray-200 w-36' }, 'Thời hạn hiệu lực'),
                                        e('th', { className: 'px-3 py-2.5 text-left font-medium text-gray-600 border-r border-gray-200 w-28' }, 'Thời hạn cho vay'),
                                        e('th', { className: 'px-3 py-2.5 text-left font-medium text-gray-600' }, 'Lãi suất, phí')
                                    )
                                ),
                                e('tbody', null,
                                    khoangTinDungData.map(item =>
                                        e('tr', { key: item.id, className: 'border-t border-gray-200' },
                                            e('td', { className: 'px-3 py-2 text-gray-700 border-r border-gray-200' }, item.tenKhoan),
                                            e('td', { className: 'px-3 py-2 text-right text-gray-700 border-r border-gray-200' }, item.soTien),
                                            e('td', { className: 'px-3 py-2 text-gray-700 border-r border-gray-200 text-xs' }, item.mucDich),
                                            e('td', { className: 'px-3 py-2 text-gray-700 border-r border-gray-200 text-xs' }, item.thoiHanHieuLuc),
                                            e('td', { className: 'px-3 py-2 text-gray-700 border-r border-gray-200 text-center' }, item.thoiHanChoVay),
                                            e('td', { className: 'px-3 py-2 text-gray-700 text-xs' }, item.laiSuat)
                                        )
                                    )
                                )
                            )
                        )
                    ),

                    // 2. Biện pháp bảo đảm
                    e('div', { className: 'mb-6' },
                        e('h5', { className: 'text-sm font-semibold text-gray-800 mb-3' }, '2. Biện pháp bảo đảm (thông tin đã khai báo tại câu phần "Biện pháp bảo đảm" tại "Tab điều kiện tín dụng"):'),
                        e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                            e('table', { className: 'w-full text-sm' },
                                e('thead', null,
                                    e('tr', { className: 'bg-gray-100' },
                                        e('th', { className: 'px-3 py-2.5 text-center font-medium text-gray-600 border-r border-gray-200 w-14' }, 'STT'),
                                        e('th', { className: 'px-3 py-2.5 text-left font-medium text-gray-600 border-r border-gray-200 w-48' }, 'Tên commitment'),
                                        e('th', { className: 'px-3 py-2.5 text-left font-medium text-gray-600' }, 'Nội dung điều kiện')
                                    )
                                ),
                                e('tbody', null,
                                    bienPhapBaoDamData.map(item =>
                                        e('tr', { key: item.stt, className: 'border-t border-gray-200' },
                                            e('td', { className: 'px-3 py-2 text-center text-gray-600 border-r border-gray-200' }, item.stt),
                                            e('td', { className: 'px-3 py-2 text-gray-700 border-r border-gray-200' }, item.tenCommitment),
                                            e('td', { className: 'px-3 py-2 text-gray-700 whitespace-pre-line' }, item.noiDung)
                                        )
                                    )
                                )
                            )
                        )
                    ),

                    // --- DIVIDER ---
                    e('div', { className: 'border-t border-gray-200 my-6' }),

                    // --- SUB-SECTION: Kết luận ---
                    e('div', { className: 'bg-[#006B68]/5 border border-[#006B68]/20 rounded-lg px-4 py-3 mb-4' },
                        e('h4', { className: 'text-sm font-bold text-[#006B68] flex items-center gap-2 m-0' },
                            e('i', { className: 'fas fa-check-double text-xs' }),
                            'Kết luận'
                        )
                    ),

                    // Nút Trích xuất báo cáo đề xuất
                    e('div', { className: 'flex justify-end mb-4' },
                        e('button', {
                            className: 'px-4 py-1.5 bg-[#006B68] text-white text-sm rounded-lg hover:bg-[#005a57] flex items-center gap-2 transition-colors',
                            onClick: function () { setShowReport(true); }
                        },
                            e('i', { className: 'fas fa-file-export' }),
                            'Trích xuất báo cáo đề xuất'
                        )
                    ),
                    // Thông tin người phê duyệt
                    e('div', { className: 'space-y-3 mb-6' },
                        nguoiPheDuyet.slice(0, 3).map((nguoi, idx) =>
                            e('div', { key: idx, className: 'flex items-center gap-4 p-3 bg-gray-50 rounded-lg' },
                                e('span', { className: 'text-sm font-medium text-gray-700 w-36' }, nguoi.cap + ':'),
                                e('span', { className: 'text-sm text-gray-800' }, nguoi.hoTen),
                                e('span', { className: 'text-sm text-gray-500' }, '– ' + nguoi.chucVu)
                            )
                        )
                    ),

                    // Ô free-text
                    e('div', { className: 'mb-6' },
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Ý kiến / Ghi chú'),
                        e('textarea', {
                            className: 'w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30 resize-none',
                            rows: 4,
                            placeholder: 'Nhập ý kiến hoặc ghi chú của bạn...'
                        })
                    )
                ), // end content div

            // ===== MODAL TÌM KIẾM USER =====
            showSearchUser && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
                e('div', { className: 'bg-white rounded-lg shadow-xl w-[600px] max-h-[80vh] overflow-hidden' },
                    e('div', { className: 'flex items-center justify-between px-5 py-4 border-b border-gray-200' },
                        e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Tìm kiếm cán bộ'),
                        e('button', {
                            className: 'text-gray-400 hover:text-gray-600',
                            onClick: () => { setShowSearchUser(false); setSearchUserText(''); setEditingIndex(null); }
                        },
                            e('i', { className: 'fas fa-times text-lg' })
                        )
                    ),
                    e('div', { className: 'p-5' },
                        e('div', { className: 'relative mb-4' },
                            e('i', { className: 'fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' }),
                            e('input', {
                                type: 'text',
                                placeholder: 'Tìm theo tên, mã cán bộ hoặc email...',
                                className: 'w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                value: searchUserText,
                                onChange: (ev) => setSearchUserText(ev.target.value),
                                autoFocus: true
                            })
                        ),
                        e('div', { className: 'max-h-[300px] overflow-y-auto' },
                            filteredUsers.length > 0
                                ? filteredUsers.map(user =>
                                    e('div', {
                                        key: user.id,
                                        className: 'flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer',
                                        onClick: () => handleSelectUser(user)
                                    },
                                        e('div', null,
                                            e('div', { className: 'flex items-center gap-2' },
                                                e('span', { className: 'text-xs text-gray-400' }, user.maCB),
                                                e('span', { className: 'text-sm font-medium text-gray-800' }, user.hoTen)
                                            ),
                                            e('div', { className: 'text-xs text-gray-500 mt-0.5' }, user.chucVu + ' • ' + user.email)
                                        ),
                                        e('i', { className: 'fas fa-chevron-right text-gray-400 text-xs' })
                                    )
                                )
                                : e('div', { className: 'text-center py-8 text-gray-400' },
                                    e('i', { className: 'fas fa-user-slash text-3xl mb-2' }),
                                    e('p', { className: 'text-sm' }, 'Không tìm thấy cán bộ')
                                )
                        )
                    )
                )
            ),

            // ===== MODAL BÁO CÁO ĐỀ XUẤT PDF =====
            showReport && e('div', {
                className: 'fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4',
                onClick: (ev) => { if (ev.target === ev.currentTarget) setShowReport(false); }
            },
                e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col' },
                    // Toolbar
                    e('div', { className: 'flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-gray-50 rounded-t-xl flex-shrink-0' },
                        e('div', { className: 'flex items-center gap-3' },
                            e('i', { className: 'fas fa-file-pdf text-red-500 text-xl' }),
                            e('div', null,
                                e('h3', { className: 'font-semibold text-gray-800 text-sm' }, 'Báo cáo đề xuất cấp tín dụng'),
                                e('span', { className: 'text-xs text-gray-500' }, 'BaoCaoDeXuat_CTCP_ABC_2026.pdf')
                            )
                        ),
                        e('div', { className: 'flex items-center gap-2' },
                            e('button', {
                                className: 'px-3 py-1.5 bg-[#006B68] text-white rounded-lg text-xs font-medium hover:bg-[#005B58] flex items-center gap-1.5',
                                onClick: () => {
                                    const printContent = document.getElementById('pdf-report-content');
                                    if (printContent) {
                                        const w = window.open('', '_blank');
                                        w.document.write('<html><head><title>Báo cáo đề xuất</title><style>body{font-family:"Times New Roman",serif;padding:40px;color:#222;font-size:13px}table{width:100%;border-collapse:collapse;margin:12px 0}th,td{border:1px solid #333;padding:6px 8px;text-align:left;font-size:12px}th{background:#e8e8e8;font-weight:bold}h1{font-size:16px;text-align:center}h2{font-size:14px;margin-top:16px}.header{text-align:center;margin-bottom:20px}.sig{display:flex;justify-content:space-between;margin-top:40px;text-align:center}</style></head><body>' + printContent.innerHTML + '</body></html>');
                                        w.document.close();
                                        w.print();
                                    }
                                }
                            },
                                e('i', { className: 'fas fa-print text-xs' }), 'In'
                            ),
                            e('button', {
                                className: 'px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 flex items-center gap-1.5',
                                onClick: () => {
                                    alert('Đã tải xuống file BaoCaoDeXuat_CTCP_ABC_2026.pdf');
                                }
                            },
                                e('i', { className: 'fas fa-download text-xs' }), 'Tải PDF'
                            ),
                            e('button', {
                                className: 'w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500',
                                onClick: () => setShowReport(false)
                            },
                                e('i', { className: 'fas fa-times' })
                            )
                        )
                    ),

                    // PDF Content
                    e('div', {
                        className: 'flex-1 overflow-y-auto bg-gray-100 p-6',
                        style: { minHeight: 0 }
                    },
                        e('div', {
                            id: 'pdf-report-content',
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
                                        e('div', null, 'Số: BCĐX/2026/001'),
                                        e('div', null, 'Ngày: 10/03/2026'),
                                        e('div', { style: { marginTop: '4px', padding: '2px 8px', background: '#e6f4f1', borderRadius: '4px', display: 'inline-block', color: '#006B68', fontWeight: 'bold' } }, 'MẬT')
                                    )
                                ),
                                e('h1', { style: { fontSize: '18px', fontWeight: 'bold', marginTop: '16px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' } }, 'BÁO CÁO ĐỀ XUẤT CẤP TÍN DỤNG'),
                                e('div', { style: { fontSize: '12.5px', color: '#444' } }, 'Đối với Công ty Cổ phần ABC')
                            ),

                            // === I. THÔNG TIN KHÁCH HÀNG ===
                            e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'I. THÔNG TIN KHÁCH HÀNG'),
                            e('table', { style: { width: '100%', borderCollapse: 'collapse', marginBottom: '16px' } },
                                e('tbody', null,
                                    [['Tên khách hàng', 'CÔNG TY CỔ PHẦN ABC'],
                                    ['Mã khách hàng (CIF)', '1234567890'],
                                    ['Địa chỉ', 'Số 10, Đường Lê Lai, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh'],
                                    ['Ngành nghề kinh doanh', 'Xây dựng công trình dân dụng'],
                                    ['Vốn điều lệ', '50.000.000.000 VNĐ'],
                                    ['Xếp hạng tín dụng', 'AA - Đã phê duyệt'],
                                    ['Loại hồ sơ', 'Tái cấp'],
                                    ].map((row, idx) =>
                                        e('tr', { key: idx },
                                            e('td', { style: { border: '1px solid #ccc', padding: '6px 10px', width: '35%', background: '#f8f9fa', fontWeight: '600', fontSize: '12px' } }, row[0]),
                                            e('td', { style: { border: '1px solid #ccc', padding: '6px 10px', fontSize: '12px' } }, row[1])
                                        )
                                    )
                                )
                            ),

                            // === II. NỘI DUNG ĐỀ XUẤT ===
                            e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '8px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'II. NỘI DUNG ĐỀ XUẤT CẤP TÍN DỤNG'),
                            e('p', { style: { fontSize: '12.5px', marginBottom: '8px' } }, 'Nội dung đề xuất: ', e('strong', null, tomTatData.noiDungDeXuat)),
                            e('div', { style: { display: 'flex', gap: '24px', marginBottom: '12px', fontSize: '12.5px' } },
                                e('span', null, 'Phương thức: ', e('strong', null, tomTatData.phuongThucCapTD)),
                                e('span', null, 'Loại hình: ', e('strong', null, tomTatData.loaiHinhCapTD)),
                                e('span', null, 'Thời hạn: ', e('strong', null, tomTatData.thoiHan))
                            ),

                            // Bảng khoản tín dụng
                            e('p', { style: { fontSize: '12.5px', fontWeight: 'bold', marginBottom: '6px', marginTop: '12px' } }, '1. Nội dung khoản cấp tín dụng:'),
                            e('div', { style: { fontSize: '11px', textAlign: 'right', color: '#666', marginBottom: '4px' } }, 'Đơn vị: triệu đồng'),
                            e('table', { style: { width: '100%', borderCollapse: 'collapse', marginBottom: '16px' } },
                                e('thead', null,
                                    e('tr', null,
                                        e('th', { style: { border: '1px solid #999', padding: '6px', background: '#e8e8e8', fontSize: '11px', fontWeight: 'bold' } }, 'STT'),
                                        e('th', { style: { border: '1px solid #999', padding: '6px', background: '#e8e8e8', fontSize: '11px', fontWeight: 'bold' } }, 'Khoản tín dụng'),
                                        e('th', { style: { border: '1px solid #999', padding: '6px', background: '#e8e8e8', fontSize: '11px', fontWeight: 'bold', textAlign: 'right' } }, 'Số tiền'),
                                        e('th', { style: { border: '1px solid #999', padding: '6px', background: '#e8e8e8', fontSize: '11px', fontWeight: 'bold' } }, 'Mục đích'),
                                        e('th', { style: { border: '1px solid #999', padding: '6px', background: '#e8e8e8', fontSize: '11px', fontWeight: 'bold' } }, 'Thời hạn cho vay'),
                                        e('th', { style: { border: '1px solid #999', padding: '6px', background: '#e8e8e8', fontSize: '11px', fontWeight: 'bold' } }, 'Lãi suất')
                                    )
                                ),
                                e('tbody', null,
                                    khoangTinDungData.map((item, idx) =>
                                        e('tr', { key: idx },
                                            e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', textAlign: 'center', fontSize: '11px' } }, idx + 1),
                                            e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '11px' } }, item.tenKhoan),
                                            e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold' } }, item.soTien),
                                            e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '10px' } }, item.mucDich),
                                            e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', textAlign: 'center', fontSize: '11px' } }, item.thoiHanChoVay),
                                            e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '10px' } }, item.laiSuat)
                                        )
                                    )
                                )
                            ),

                            // === III. BIỆN PHÁP BẢO ĐẢM ===
                            e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '8px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'III. BIỆN PHÁP BẢO ĐẢM'),
                            e('table', { style: { width: '100%', borderCollapse: 'collapse', marginBottom: '16px' } },
                                e('thead', null,
                                    e('tr', null,
                                        e('th', { style: { border: '1px solid #999', padding: '6px', background: '#e8e8e8', fontSize: '11px', fontWeight: 'bold', width: '40px' } }, 'STT'),
                                        e('th', { style: { border: '1px solid #999', padding: '6px', background: '#e8e8e8', fontSize: '11px', fontWeight: 'bold' } }, 'Tên commitment'),
                                        e('th', { style: { border: '1px solid #999', padding: '6px', background: '#e8e8e8', fontSize: '11px', fontWeight: 'bold' } }, 'Nội dung điều kiện')
                                    )
                                ),
                                e('tbody', null,
                                    bienPhapBaoDamData.map((item, idx) =>
                                        e('tr', { key: idx },
                                            e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', textAlign: 'center', fontSize: '11px' } }, item.stt),
                                            e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '11px' } }, item.tenCommitment),
                                            e('td', { style: { border: '1px solid #ccc', padding: '5px 6px', fontSize: '11px', whiteSpace: 'pre-line' } }, item.noiDung)
                                        )
                                    )
                                )
                            ),

                            // === IV. ĐIỀU KIỆN TÍN DỤNG ===
                            e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '8px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'IV. ĐIỀU KIỆN TÍN DỤNG'),
                            e('ul', { style: { paddingLeft: '20px', marginBottom: '16px' } },
                                dieuKienTinDung.map((dk, idx) =>
                                    e('li', { key: idx, style: { fontSize: '12px', marginBottom: '6px', lineHeight: '1.5' } }, dk)
                                )
                            ),

                            // === V. KẾT LUẬN VÀ ĐỀ XUẤT ===
                            e('h2', { style: { fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '8px', color: '#006B68', borderLeft: '3px solid #006B68', paddingLeft: '8px' } }, 'V. KẾT LUẬN VÀ ĐỀ XUẤT'),
                            e('div', { style: { background: '#f8f9fa', border: '1px solid #ddd', borderRadius: '4px', padding: '12px 16px', marginBottom: '20px', fontSize: '12.5px' } },
                                e('p', { style: { marginBottom: '8px' } }, 'Căn cứ kết quả thẩm định, phân tích năng lực tài chính và tình hình hoạt động kinh doanh của Công ty Cổ phần ABC, bộ phận quản lý khách hàng đề xuất:'),
                                e('ul', { style: { paddingLeft: '20px', marginBottom: '8px' } },
                                    e('li', { style: { marginBottom: '4px' } }, 'Cấp hạn mức tín dụng năm 2026 với tổng mức cấp tín dụng: ', e('strong', null, '200.000 triệu VNĐ')),
                                    e('li', { style: { marginBottom: '4px' } }, 'Trong đó cho vay: ', e('strong', null, tomTatData.choVay + ' triệu VNĐ'), ', bảo lãnh: ', e('strong', null, tomTatData.baoLanh + ' triệu VNĐ')),
                                    e('li', { style: { marginBottom: '4px' } }, 'Biện pháp bảo đảm theo quy định của BIDV')
                                ),
                                e('p', { style: { fontStyle: 'italic' } }, 'Kính trình Ban Giám đốc xem xét, phê duyệt.')
                            ),

                            // === CHỮ KÝ ===
                            e('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '40px', textAlign: 'center', pageBreakInside: 'avoid' } },
                                e('div', { style: { width: '30%' } },
                                    e('div', { style: { fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' } }, 'NGƯỜI ĐỀ XUẤT'),
                                    e('div', { style: { fontSize: '11px', fontStyle: 'italic', color: '#666', marginBottom: '50px' } }, '(Ký, ghi rõ họ tên)'),
                                    e('div', { style: { fontWeight: 'bold', fontSize: '12px' } }, nguoiPheDuyet[0]?.hoTen || ''),
                                    e('div', { style: { fontSize: '11px', color: '#666' } }, nguoiPheDuyet[0]?.chucVu || '')
                                ),
                                e('div', { style: { width: '30%' } },
                                    e('div', { style: { fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' } }, 'NGƯỜI THẨM ĐỊNH'),
                                    e('div', { style: { fontSize: '11px', fontStyle: 'italic', color: '#666', marginBottom: '50px' } }, '(Ký, ghi rõ họ tên)'),
                                    e('div', { style: { fontWeight: 'bold', fontSize: '12px' } }, nguoiPheDuyet[1]?.hoTen || ''),
                                    e('div', { style: { fontSize: '11px', color: '#666' } }, nguoiPheDuyet[1]?.chucVu || '')
                                ),
                                e('div', { style: { width: '30%' } },
                                    e('div', { style: { fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' } }, 'NGƯỜI PHÊ DUYỆT'),
                                    e('div', { style: { fontSize: '11px', fontStyle: 'italic', color: '#666', marginBottom: '50px' } }, '(Ký, ghi rõ họ tên)'),
                                    e('div', { style: { fontWeight: 'bold', fontSize: '12px' } }, nguoiPheDuyet[2]?.hoTen || ''),
                                    e('div', { style: { fontSize: '11px', color: '#666' } }, nguoiPheDuyet[2]?.chucVu || '')
                                )
                            ),

                            // Footer
                            e('div', { style: { marginTop: '40px', paddingTop: '12px', borderTop: '1px solid #ddd', textAlign: 'center', fontSize: '10px', color: '#999' } },
                                'Tài liệu MẬT - Chỉ sử dụng nội bộ BIDV | Được tạo tự động bởi hệ thống LOS | Ngày xuất: 10/03/2026'
                            )
                        )
                    )
                )
            )
        );
    };

    // Render Lịch sử phê duyệt (sub-tab)
    const renderLichSu = () => {
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

        return e('div', { className: 'space-y-3' },
            // Table
            e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-x-auto' },
                e('table', { className: 'w-full text-sm', style: { minWidth: '1200px' } },
                    e('thead', null,
                        e('tr', { className: 'border-b border-gray-200', style: { background: 'linear-gradient(135deg, #006B68 0%, #008B87 100%)' } },
                            e('th', { className: 'px-3 py-2.5 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '50px' } }, 'STT'),
                            e('th', { className: 'px-3 py-2.5 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '200px' } }, 'Bước xử lý'),
                            e('th', { className: 'px-3 py-2.5 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '180px' } }, 'Vai trò'),
                            e('th', { className: 'px-3 py-2.5 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '200px' } }, 'Người xử lý'),
                            e('th', { className: 'px-3 py-2.5 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '160px' } }, 'Thời gian tiếp nhận'),
                            e('th', { className: 'px-3 py-2.5 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '130px' } },
                                'Trạng thái HS ', e('i', { className: 'fas fa-sort text-white/60 text-xs ml-1' })),
                            e('th', { className: 'px-3 py-2.5 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '130px' } }, 'Thao tác'),
                            e('th', { className: 'px-3 py-2.5 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '130px' } }, 'Ý kiến/Lý do'),
                            e('th', { className: 'px-3 py-2.5 text-center text-xs font-semibold text-white whitespace-nowrap', style: { width: '90px' } }, 'SLAqđ/SLAtt'),
                            e('th', { className: 'px-3 py-2.5 text-left text-xs font-semibold text-white whitespace-nowrap', style: { width: '100px' } }, 'HS đính kèm')
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

                            // Ý kiến with check icon
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
                                        onClick: function () {
                                            setPdfViewer({
                                                ten: row.hoSo.ten,
                                                loai: row.hoSo.loai,
                                                stt: row.stt,
                                                buocXuLy: row.buocXuLy,
                                                nguoiXuLy: row.nguoiXuLy,
                                                thoiGian: row.thoiGian
                                            });
                                        }
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
        );
    };

    return e('div', { className: 'space-y-4' },
        // Sub-tab navigation (same style as Thông tin khách hàng)
        e('div', { className: 'flex gap-2 flex-wrap mb-4' },
            subTabs.map(function (tab) {
                return e('div', {
                    key: tab.id,
                    className: 'sub-tab ' + (activeSubTab === tab.id ? 'active' : ''),
                    onClick: function () { setActiveSubTab(tab.id); }
                }, tab.label);
            })
        ),
        // Content based on active sub-tab
        activeSubTab === 'deXuat' && renderDeXuat(),
        activeSubTab === 'lichSu' && renderLichSu(),

        // ===== MODAL PDF VIEWER (Lịch sử phê duyệt) =====
        pdfViewer && e('div', {
            className: 'fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4',
            onClick: function (ev) { if (ev.target === ev.currentTarget) setPdfViewer(null); }
        },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col' },
                // Toolbar
                e('div', { className: 'flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-gray-50 rounded-t-xl flex-shrink-0' },
                    e('div', { className: 'flex items-center gap-3' },
                        e('i', { className: 'fas fa-file-pdf text-red-500 text-xl' }),
                        e('div', null,
                            e('h3', { className: 'font-semibold text-gray-800 text-sm' },
                                pdfViewer.loai === 'bcdxtd' ? 'Báo cáo đề xuất cấp tín dụng' : pdfViewer.loai === 'bctdrr' ? 'Báo cáo thẩm định rủi ro' : 'Biên bản họp & Quyết định cấp tín dụng'
                            ),
                            e('span', { className: 'text-xs text-gray-500' },
                                pdfViewer.ten + '_CTCP_ABC_2026.pdf • Bước: ' + pdfViewer.buocXuLy
                            )
                        )
                    ),
                    e('div', { className: 'flex items-center gap-2' },
                        e('button', {
                            className: 'px-3 py-1.5 bg-[#006B68] text-white rounded-lg text-xs font-medium hover:bg-[#005B58] flex items-center gap-1.5',
                            onClick: function () { alert('In tài liệu: ' + pdfViewer.ten); }
                        },
                            e('i', { className: 'fas fa-print text-xs' }), 'In'
                        ),
                        e('button', {
                            className: 'px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 flex items-center gap-1.5',
                            onClick: function () { alert('Đã tải xuống: ' + pdfViewer.ten + '_CTCP_ABC_2026.pdf'); }
                        },
                            e('i', { className: 'fas fa-download text-xs' }), 'Tải PDF'
                        ),
                        e('button', {
                            className: 'w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500',
                            onClick: function () { setPdfViewer(null); }
                        },
                            e('i', { className: 'fas fa-times' })
                        )
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
                                    e('div', null, 'Số: ' + (pdfViewer.loai === 'bcdxtd' ? 'BCĐX' : pdfViewer.loai === 'bctdrr' ? 'BCTĐRR' : 'BB-QĐ') + '/2026/001'),
                                    e('div', null, 'Ngày: 10/03/2026'),
                                    e('div', { style: { marginTop: '4px', padding: '2px 8px', background: '#e6f4f1', borderRadius: '4px', display: 'inline-block', color: '#006B68', fontWeight: 'bold' } }, 'MẬT')
                                )
                            ),
                            e('h1', { style: { fontSize: '18px', fontWeight: 'bold', marginTop: '16px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' } },
                                pdfViewer.loai === 'bcdxtd' ? 'BÁO CÁO ĐỀ XUẤT CẤP TÍN DỤNG' : pdfViewer.loai === 'bctdrr' ? 'BÁO CÁO THẨM ĐỊNH RỦI RO' : 'BIÊN BẢN HỌP & QUYẾT ĐỊNH CẤP TÍN DỤNG'
                            ),
                            e('div', { style: { fontSize: '12.5px', color: '#444' } }, 'Đối với Công ty Cổ phần ABC')
                        ),

                        // === CONTENT FOR BCDXTD ===
                        pdfViewer.loai === 'bcdxtd' && e('div', null,
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
                            e('p', { style: { fontSize: '12.5px', marginBottom: '8px' } }, 'Nội dung đề xuất: ', e('strong', null, tomTatData.noiDungDeXuat)),
                            e('div', { style: { display: 'flex', gap: '24px', marginBottom: '12px', fontSize: '12.5px' } },
                                e('span', null, 'Phương thức: ', e('strong', null, tomTatData.phuongThucCapTD)),
                                e('span', null, 'Loại hình: ', e('strong', null, tomTatData.loaiHinhCapTD)),
                                e('span', null, 'Thời hạn: ', e('strong', null, tomTatData.thoiHan))
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
                                    khoangTinDungData.map(function (item, idx) {
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
                                    e('li', { style: { marginBottom: '4px' } }, 'Cho vay: ', e('strong', null, tomTatData.choVay + ' triệu VNĐ'), ', Bảo lãnh: ', e('strong', null, tomTatData.baoLanh + ' triệu VNĐ'))
                                ),
                                e('p', { style: { fontStyle: 'italic' } }, 'Kính trình Ban Giám đốc xem xét, phê duyệt.')
                            )
                        ),

                        // === CONTENT FOR BCTĐRR ===
                        pdfViewer.loai === 'bctdrr' && e('div', null,
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
                        pdfViewer.loai === 'bien-ban-qd' && e('div', null,
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
                            // Signature SVG helper - per-signature config
                            var mkSig = function (name) {
                                var sigs = {
                                    // === "Thanh" - Cán bộ tín dụng (BLUE) ===
                                    // Large tilted oval flourish + diagonal line down-left + "hanh" cursive
                                    'NV1': {
                                        path: 'M78,24 C68,6 28,4 18,22 C8,40 22,54 48,48 C62,44 78,36 82,26 C86,16 78,14 72,20 ' +
                                              'M58,16 L14,88 ' +
                                              'M52,52 C52,42 56,38 56,50 L56,58 ' +
                                              'C58,48 62,44 64,52 C66,58 62,60 64,56 ' +
                                              'C66,50 70,46 70,54 L70,58 ' +
                                              'C70,48 74,44 74,54 L74,62',
                                        vb: '0 0 100 95', w: '88px', h: '78px', color: '#0033cc', sw: '1.6'
                                    },
                                    // === "Yen" - Cán bộ TĐTD (DARK) ===
                                    // Tall Y with elegant loop at top + "en" cursive + gentle underline
                                    'NV2': {
                                        path: 'M30,90 C28,60 28,40 30,22 C32,8 38,2 42,8 C48,16 40,22 34,26 ' +
                                              'M34,26 C26,34 18,44 14,54 ' +
                                              'M34,26 C42,34 50,44 54,50 ' +
                                              'M46,62 C42,58 40,64 44,66 C48,68 52,60 54,58 ' +
                                              'C54,54 56,58 58,60 C60,62 60,66 62,64 ' +
                                              'M10,90 C28,96 58,94 76,86',
                                        vb: '0 0 82 100', w: '68px', h: '80px', color: '#1a1a1a', sw: '1.8'
                                    },
                                    // === Countersign (small paraph) ===
                                    'NV3s': {
                                        path: 'M2,14 C6,6 12,4 16,10 C18,14 14,16 18,14 C22,12 24,8 28,10 L30,8 M8,18 L24,17',
                                        vb: '0 0 34 22', w: '24px', h: '16px', color: '#1a1a1a', sw: '1.6'
                                    },
                                    // === "Thuy" - Phê duyệt (DARK) ===
                                    // Large oval similar to Thanh but darker + diagonal + "huy" + bottom flourish
                                    'NV4': {
                                        path: 'M74,20 C62,4 24,2 18,24 C12,46 34,54 56,46 C72,40 84,28 78,18 C74,12 68,16 72,22 ' +
                                              'M56,14 L18,82 ' +
                                              'M48,48 C48,38 52,34 52,48 L52,56 ' +
                                              'C54,46 58,42 60,50 C62,56 56,60 60,56 ' +
                                              'C64,50 66,56 66,64 C66,72 68,78 72,84 ' +
                                              'M10,88 C30,94 60,92 82,84',
                                        vb: '0 0 100 98', w: '86px', h: '80px', color: '#1a1a1a', sw: '1.6'
                                    },
                                    // === Biên bản+QĐ signatures ===
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
                                    style: {
                                        width: s.w,
                                        height: s.h,
                                        display: 'block',
                                        margin: name === 'NV3s' ? '0' : '0 auto'
                                    }
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

                            // Determine labels based on doc type
                            var isBCDXTD = pdfViewer.loai === 'bcdxtd';
                            var isBCTDRR = pdfViewer.loai === 'bctdrr';
                            var isBBQD = pdfViewer.loai === 'bien-ban-qd';
                            var stt = pdfViewer.stt;

                            var label1 = isBCDXTD ? 'CÁN BỘ TÍN DỤNG' : isBBQD ? 'THƯ KÝ' : 'CÁN BỘ THẨM ĐỊNH';
                            var label2 = isBCDXTD ? 'CÁN BỘ TĐTD' : 'KIỂM SOÁT';
                            var label3 = 'PHÊ DUYỆT';

                            // Determine which signatures to show based on STT for BCDXTD
                            // STT 2: only sig1 (Cán bộ tín dụng - NV1)
                            // STT 3: sig1 + sig2 (Cán bộ TĐTD - NV2)
                            // STT 4: sig1 + sig2 + countersign (NV3 small next to sig2)
                            // STT 5: sig1 + sig2 + countersign + sig3 (Phê duyệt - NV4)
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
                                name1 = pdfViewer.nguoiXuLy ? pdfViewer.nguoiXuLy.split('(')[0].trim() : '';
                                sigKey1 = 'NV1';
                                sigKey2 = 'NV2';
                                sigKey3 = 'NV4';
                                // Progressive: STT 7 = only sig1, STT 8 = sig1+sig2, STT 9 = all
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
                                // Column 1
                                e('div', { style: { width: '30%' } },
                                    e('div', { style: { fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' } }, label1),
                                    e('div', { style: { fontSize: '11px', fontStyle: 'italic', color: '#666', marginBottom: '8px' } }, '(Ký, ghi rõ họ tên)'),
                                    showSig1 ? e('div', { style: { marginBottom: '4px' } }, mkSig(sigKey1)) : e('div', { style: { height: '42px' } }),
                                    e('div', { style: { fontWeight: 'bold', fontSize: '12px' } }, name1)
                                ),
                                // Column 2
                                e('div', { style: { width: '30%', position: 'relative' } },
                                    e('div', { style: { fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' } }, label2),
                                    e('div', { style: { fontSize: '11px', fontStyle: 'italic', color: '#666', marginBottom: '8px' } }, '(Ký, ghi rõ họ tên)'),
                                    showSig2 ? e('div', { style: { marginBottom: '4px', position: 'relative' } },
                                        mkSig(sigKey2),
                                        // Countersign (small initial next to main sig)
                                        showCounter ? e('div', {
                                            style: { position: 'absolute', right: '10px', bottom: '-4px', transform: 'rotate(-5deg)' }
                                        }, mkSig('NV3s')) : null
                                    ) : e('div', { style: { height: '42px' } }),
                                    showSig2 ? e('div', { style: { fontWeight: 'bold', fontSize: '12px' } }, name2) : null
                                ),
                                // Column 3
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
    );
};
