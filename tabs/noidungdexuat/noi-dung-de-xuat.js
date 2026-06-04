// =====================================================
// Menu: Nội dung đề xuất
// =====================================================

window.TabNoiDungDeXuat = function () {
    const e = React.createElement;

    // States
    const [yKienTDRR, setYKienTDRR] = React.useState('dong-y');
    const [showPopupMauBC, setShowPopupMauBC] = React.useState(false);
    const [selectedMauBC, setSelectedMauBC] = React.useState(null);
    const [showBaoCaoViewer, setShowBaoCaoViewer] = React.useState(false);
    const [bangKhacBiet, setBangKhacBiet] = React.useState([
        { id: 1, noiDung: '', yKienBPDeXuat: '', yKienTDRR: '' }
    ]);

    // Danh sách nội dung dropdown
    const danhSachNoiDung = [
        'Số tiền cấp tín dụng',
        'Thời hạn cấp tín dụng',
        'Kỳ hạn trả nợ',
        'Tài sản bảo đảm',
        'Vốn chủ sở hữu tham gia/Vốn vay'
    ];

    // Danh sách mẫu báo cáo
    const danhSachMauBC = [
        { id: 1, name: 'Mẫu BCTĐRR ngắn hạn', type: 'ngan-han' },
        { id: 2, name: 'Mẫu BCTĐRR TDH', type: 'tdh' },
        { id: 3, name: 'Mẫu BCTĐRR NH 100% TG', type: 'nh-100' },
        { id: 4, name: 'Mẫu BCTĐRR TDH 100% TG', type: 'tdh-100' },
        { id: 5, name: 'Mẫu Tờ trình TGĐ để trình HĐQT', type: 'to-trinh' }
    ];

    // Thêm dòng
    const themDong = () => {
        const newId = bangKhacBiet.length > 0 ? Math.max(...bangKhacBiet.map(r => r.id)) + 1 : 1;
        setBangKhacBiet([...bangKhacBiet, { id: newId, noiDung: '', yKienBPDeXuat: '', yKienTDRR: '' }]);
    };

    // Xóa dòng
    const xoaDong = (id) => {
        if (bangKhacBiet.length > 1) {
            setBangKhacBiet(bangKhacBiet.filter(r => r.id !== id));
        }
    };

    // Cập nhật dòng
    const capNhatDong = (id, field, value) => {
        setBangKhacBiet(bangKhacBiet.map(r => r.id === id ? { ...r, [field]: value } : r));
    };

    // Chọn mẫu báo cáo và mở xem báo cáo
    const handleSelectMau = (mauId) => {
        setSelectedMauBC(mauId);
        setShowPopupMauBC(false);
        setShowBaoCaoViewer(true);
    };

    // In báo cáo
    const handlePrint = () => {
        window.print();
    };

    // Tải xuống (giả lập)
    const handleDownload = () => {
        alert('Đang tải xuống báo cáo...');
    };

    // Lấy tên mẫu báo cáo đã chọn
    const getSelectedMauName = () => {
        const mau = danhSachMauBC.find(m => m.id === selectedMauBC);
        return mau ? mau.name : '';
    };

    // Lấy ngày hiện tại
    const getNgayHienTai = () => {
        const now = new Date();
        return now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
    };

    // Render Popup Xem Báo Cáo
    const renderBaoCaoViewer = () => {
        return e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-[800px] max-h-[95vh] overflow-hidden flex flex-col' },
                // Header
                e('div', { className: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white flex-shrink-0' },
                    e('h3', { className: 'text-lg font-semibold text-gray-800 flex items-center gap-2' },
                        e('i', { className: 'fas fa-file-alt text-[#006B68]' }),
                        getSelectedMauName()
                    ),
                    e('div', { className: 'flex items-center gap-2' },
                        e('button', {
                            className: 'px-3 py-2 bg-[#006B68] text-white rounded-lg text-sm flex items-center gap-2 hover:bg-[#005B58]',
                            onClick: handleDownload
                        },
                            e('i', { className: 'fas fa-download' }),
                            'Tải xuống'
                        ),
                        e('button', {
                            className: 'px-3 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700',
                            onClick: handlePrint
                        },
                            e('i', { className: 'fas fa-print' }),
                            'In báo cáo'
                        ),
                        e('button', {
                            className: 'w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600',
                            onClick: () => setShowBaoCaoViewer(false)
                        },
                            e('i', { className: 'fas fa-times text-lg' })
                        )
                    )
                ),

                // Content - Báo cáo
                e('div', { className: 'flex-1 overflow-y-auto p-8 bg-gray-50', id: 'bao-cao-content' },
                    e('div', { className: 'bg-white p-8 shadow-lg max-w-[700px] mx-auto', style: { fontFamily: 'Times New Roman, serif' } },
                        // Header báo cáo
                        e('div', { className: 'text-center mb-6' },
                            e('p', { className: 'text-sm text-blue-700 font-semibold' }, 'NGÂN HÀNG ĐẦU TƯ VÀ PHÁT TRIỂN VIỆT NAM'),
                            e('p', { className: 'text-sm text-blue-700' }, 'CHI NHÁNH BÀ RỊA VŨNG TÀU'),
                            e('h1', { className: 'text-xl font-bold text-blue-800 mt-4' }, 'BÁO CÁO THẨM ĐỊNH RỦI RO'),
                            e('p', { className: 'text-lg font-semibold text-blue-700 mt-1' }, 'ĐỀ XUẤT CẤP TÍN DỤNG NGẮN HẠN'),
                            e('p', { className: 'text-sm text-gray-600 mt-2 italic' }, 'Ngày lập: ' + getNgayHienTai())
                        ),

                        // I. THÔNG TIN KHÁCH HÀNG
                        e('div', { className: 'mb-6' },
                            e('h2', { className: 'text-base font-bold text-blue-800 mb-3' }, 'I. THÔNG TIN KHÁCH HÀNG'),
                            e('div', { className: 'space-y-2 pl-4 text-sm' },
                                e('p', null, e('strong', null, 'Tên khách hàng: '), 'CÔNG TY TNHH XUẤT NHẬP KHẨU PETROLIMEX'),
                                e('p', null, e('strong', null, 'Mã số thuế: '), '0123456789'),
                                e('p', null, e('strong', null, 'Địa chỉ: '), '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM'),
                                e('p', null, e('strong', null, 'Số điện thoại: '), '028-12345678'),
                                e('p', null, e('strong', null, 'Email: '), 'contact@petrolimex.com'),
                                e('p', null, e('strong', null, 'Người đại diện: '), 'Nguyễn Văn A - Giám đốc'),
                                e('p', null, e('strong', null, 'Lĩnh vực kinh doanh: '), 'Xuất nhập khẩu xăng dầu'),
                                e('p', null, e('strong', null, 'Số lượng nhân viên: '), '250 người')
                            )
                        ),

                        // II. NỘI DUNG ĐỀ XUẤT
                        e('div', { className: 'mb-6' },
                            e('h2', { className: 'text-base font-bold text-blue-800 mb-3' }, 'II. NỘI DUNG ĐỀ XUẤT'),
                            e('div', { className: 'space-y-2 pl-4 text-sm' },
                                e('p', null, e('strong', null, '1. Phương thức cấp tín dụng: '), 'Hạn mức tín dụng'),
                                e('div', null,
                                    e('p', null, e('strong', null, '2. Số tiền: '), '100.000 triệu VND'),
                                    e('p', { className: 'pl-4' }, '- Cho vay: 60.000 triệu VND'),
                                    e('p', { className: 'pl-4' }, '- Bảo lãnh: 40.000 triệu VND')
                                ),
                                e('p', null, e('strong', null, '3. Mục đích: '), 'Cấp tín dụng vốn lưu động'),
                                e('p', null, e('strong', null, '4. Thời hạn: '), '30/10/2026'),
                                e('p', null, e('strong', null, '5. Biện pháp bảo đảm: '), 'Tỷ lệ bảo đảm đáp ứng theo chính sách cấp tín dụng hiện hành của HĐQT nhưng không thấp hơn 30% dư tín dụng quy đổi'),
                                e('div', null,
                                    e('p', null, e('strong', null, '6. Điều kiện tín dụng:')),
                                    e('p', { className: 'pl-4' }, '- Thời hạn vay cụ thể tối đa không quá 6 tháng/món'),
                                    e('p', { className: 'pl-4' }, '- Thường xuyên theo dõi tình hình hoạt động SXKD của khách hàng để cấp tín dụng phù hợp nhu cầu.'),
                                    e('p', { className: 'pl-4' }, '- Kiểm tra mục đích sử dụng vốn vay, đảm bảo khách hàng sử dụng vốn đúng mục đích')
                                )
                            )
                        ),

                        // III. TÌNH HÌNH TÀI CHÍNH
                        e('div', { className: 'mb-6' },
                            e('h2', { className: 'text-base font-bold text-blue-800 mb-3' }, 'III. TÌNH HÌNH TÀI CHÍNH'),
                            e('div', { className: 'space-y-2 pl-4 text-sm' },
                                e('div', null,
                                    e('p', null, e('strong', null, '1. Tình hình kinh doanh:')),
                                    e('p', { className: 'pl-4' }, 'Doanh nghiệp hoạt động ổn định với doanh thu tăng trưởng ổn định qua các năm.')
                                ),
                                e('div', null,
                                    e('p', null, e('strong', null, '2. Các chỉ tiêu tài chính chính:')),
                                    e('p', { className: 'pl-4' }, '- Tỷ suất lợi nhuận: Đạt mức trung bình ngành'),
                                    e('p', { className: 'pl-4' }, '- Khả năng thanh toán: Tốt'),
                                    e('p', { className: 'pl-4' }, '- Tỷ lệ nợ/Vốn chủ sở hữu: Hợp lý')
                                )
                            )
                        ),

                        // IV. ĐÁNH GIÁ RỦI RO
                        e('div', { className: 'mb-6' },
                            e('h2', { className: 'text-base font-bold text-blue-800 mb-3' }, 'IV. ĐÁNH GIÁ RỦI RO'),
                            e('div', { className: 'space-y-2 pl-4 text-sm' },
                                e('div', null,
                                    e('p', null, e('strong', null, '1. Rủi ro tín dụng:')),
                                    e('p', { className: 'pl-4' }, 'Khách hàng có lịch sử thanh toán tốt với BIDV. Không có nợ quá hạn trong 12 tháng gần nhất.')
                                ),
                                e('div', null,
                                    e('p', null, e('strong', null, '2. Rủi ro ngành:')),
                                    e('p', { className: 'pl-4' }, 'Ngành xăng dầu có mức độ rủi ro trung bình, phụ thuộc vào biến động giá dầu thế giới.')
                                ),
                                e('div', null,
                                    e('p', null, e('strong', null, '3. Biện pháp giảm thiểu rủi ro:')),
                                    e('p', { className: 'pl-4' }, '- Giám sát chặt chẽ tình hình hoạt động kinh doanh'),
                                    e('p', { className: 'pl-4' }, '- Yêu cầu tài sản bảo đảm đầy đủ'),
                                    e('p', { className: 'pl-4' }, '- Theo dõi mục đích sử dụng vốn')
                                )
                            )
                        ),

                        // V. KẾT LUẬN VÀ ĐỀ XUẤT
                        e('div', { className: 'mb-8' },
                            e('h2', { className: 'text-base font-bold text-blue-800 mb-3' }, 'V. KẾT LUẬN VÀ ĐỀ XUẤT'),
                            e('div', { className: 'pl-4 text-sm' },
                                e('p', { className: 'mb-2' }, 'Căn cứ vào kết quả phân tích, đánh giá, Trung tâm TĐRR đề xuất:'),
                                e('p', { className: 'font-bold' }, 'Đồng ý cấp tín dụng cho khách hàng theo nội dung đề xuất của BP QLKH với các điều kiện đã nêu.')
                            )
                        ),

                        // Chữ ký
                        e('div', { className: 'mt-12 pt-4' },
                            e('div', { className: 'grid grid-cols-2 gap-8 text-center text-sm' },
                                e('div', null,
                                    e('p', { className: 'font-bold' }, 'Người thẩm định'),
                                    e('p', { className: 'text-gray-500 italic' }, '(Ký, họ tên)'),
                                    e('div', { className: 'mt-16 border-b border-gray-400 w-40 mx-auto' })
                                ),
                                e('div', null,
                                    e('p', { className: 'font-bold' }, 'Phó Giám đốc'),
                                    e('p', { className: 'text-gray-500 italic' }, '(Ký, họ tên)'),
                                    e('div', { className: 'mt-16 border-b border-gray-400 w-40 mx-auto' })
                                )
                            )
                        )
                    )
                )
            )
        );
    };

    return e('div', { className: 'space-y-6' },
        // ===== KHỐI 1: THÔNG TIN ĐỀ XUẤT (READ-ONLY) =====
        e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
            e('div', { className: 'bg-white px-4 py-3 border-b border-gray-200' },
                e('h4', { className: 'text-[#006B68] font-semibold flex items-center gap-2' },
                    e('i', { className: 'fas fa-file-alt' }),
                    'Thông tin đề xuất'
                )
            ),
            e('div', { className: 'p-5 space-y-5' },
                // Row 1: Phương thức cấp tín dụng | Số tiền
                e('div', { className: 'grid grid-cols-2 gap-6' },
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Phương thức cấp tín dụng'),
                        e('div', { className: 'px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600' }, 'Hạn mức tín dụng')
                    ),
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Số tiền'),
                        e('div', { className: 'px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 font-medium' }, '100.000 trVND')
                    )
                ),

                // Row 2: Chi tiết: Cho vay | Bảo lãnh
                e('div', { className: 'grid grid-cols-2 gap-6' },
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Chi tiết: Cho vay'),
                        e('div', { className: 'px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 font-medium' }, '60.000 trVND')
                    ),
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Bảo lãnh'),
                        e('div', { className: 'px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 font-medium' }, '40.000 trVND')
                    )
                ),

                // Row 3: Mục đích | Thời hạn
                e('div', { className: 'grid grid-cols-2 gap-6' },
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Mục đích'),
                        e('div', { className: 'px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600' }, 'Cấp tín dụng vốn lưu động')
                    ),
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Thời hạn'),
                        e('div', { className: 'px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800' }, '30/10/2026')
                    )
                ),

                // Biện pháp bảo đảm
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Biện pháp bảo đảm'),
                    e('div', { className: 'px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600' },
                        'Tỷ lệ bảo đảm đáp ứng theo chính sách cấp tín dụng hiện hành của HĐQT nhưng không thấp hơn 30% dư tín dụng quy đổi'
                    )
                ),

                // Điều kiện tín dụng
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Điều kiện tín dụng'),
                    e('div', { className: 'px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg' },
                        e('ul', { className: 'space-y-2 text-sm text-gray-600' },
                            e('li', { className: 'flex items-start gap-2' },
                                e('span', { className: 'text-[#006B68] mt-1' }, '•'),
                                'Thời hạn vay cụ thể tối đa không quá 6 tháng/món'
                            ),
                            e('li', { className: 'flex items-start gap-2' },
                                e('span', { className: 'text-[#006B68] mt-1' }, '•'),
                                'Thường xuyên theo dõi tình hình hoạt động SXKD của khách hàng để cấp tín dụng phù hợp nhu cầu.'
                            ),
                            e('li', { className: 'flex items-start gap-2' },
                                e('span', { className: 'text-[#006B68] mt-1' }, '•'),
                                'Kiểm tra mục đích sử dụng vốn vay, đảm bảo khách hàng sử dụng vốn đúng mục đích'
                            )
                        )
                    )
                )
            )
        ),

        // ===== KHỐI 2: Ý KIẾN TĐRR =====
        e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
            e('div', { className: 'bg-white px-4 py-3 border-b border-gray-200' },
                e('h4', { className: 'text-[#006B68] font-semibold flex items-center gap-2' },
                    e('i', { className: 'fas fa-clipboard-check' }),
                    'Ý kiến TĐRR đối với các nội dung đề xuất của BP QLKH'
                )
            ),
            e('div', { className: 'p-5 space-y-5' },
                // Radio buttons
                e('div', null,
                    e('div', { className: 'flex items-center gap-8 flex-wrap' },
                        e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                            e('input', {
                                type: 'radio',
                                name: 'yKienTDRR',
                                checked: yKienTDRR === 'dong-y',
                                onChange: () => setYKienTDRR('dong-y'),
                                className: 'w-4 h-4 text-[#006B68]'
                            }),
                            e('span', { className: 'text-sm text-gray-700' }, 'Đồng ý')
                        ),
                        e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                            e('input', {
                                type: 'radio',
                                name: 'yKienTDRR',
                                checked: yKienTDRR === 'dong-y-bo-sung',
                                onChange: () => setYKienTDRR('dong-y-bo-sung'),
                                className: 'w-4 h-4 text-[#006B68]'
                            }),
                            e('span', { className: 'text-sm text-gray-700' }, 'Đồng ý và bổ sung điều kiện')
                        ),
                        e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                            e('input', {
                                type: 'radio',
                                name: 'yKienTDRR',
                                checked: yKienTDRR === 'khong-dong-y',
                                onChange: () => setYKienTDRR('khong-dong-y'),
                                className: 'w-4 h-4 text-[#006B68]'
                            }),
                            e('span', { className: 'text-sm text-gray-700' }, 'Không đồng ý')
                        ),
                        e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                            e('input', {
                                type: 'radio',
                                name: 'yKienTDRR',
                                checked: yKienTDRR === 'y-kien-khac',
                                onChange: () => setYKienTDRR('y-kien-khac'),
                                className: 'w-4 h-4 text-[#006B68]'
                            }),
                            e('span', { className: 'text-sm text-gray-700' }, 'Ý kiến khác')
                        )
                    )
                ),

                // Bảng Ý kiến khác biệt (hiện khi chọn "Ý kiến khác")
                yKienTDRR === 'y-kien-khac' && e('div', { className: 'pt-4 space-y-3' },
                    e('div', { className: 'flex items-center justify-between' },
                        e('div', null,
                            e('h5', { className: 'text-sm font-semibold text-gray-800' }, 'Ý kiến khác biệt'),
                            e('p', { className: 'text-xs text-gray-500' }, 'Quản lý và xử lý các ý kiến khác biệt giữa BP đề xuất và TĐRR')
                        ),
                        e('div', { className: 'flex items-center gap-2' },
                            e('button', {
                                className: 'px-3 py-1.5 bg-[#006B68] text-white rounded text-sm flex items-center gap-1 hover:bg-[#005B58]',
                                onClick: themDong
                            },
                                e('i', { className: 'fas fa-plus text-xs' }),
                                'Thêm dòng'
                            ),
                            e('button', {
                                className: 'px-3 py-1.5 border border-gray-300 text-gray-600 rounded text-sm flex items-center gap-1 hover:bg-gray-50',
                                onClick: () => bangKhacBiet.length > 1 && setBangKhacBiet([bangKhacBiet[0]])
                            },
                                e('i', { className: 'fas fa-trash text-xs' }),
                                'Xóa'
                            )
                        )
                    ),

                    // Bảng
                    e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                        e('table', { className: 'w-full text-sm' },
                            e('thead', null,
                                e('tr', { className: 'bg-gray-100' },
                                    e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600 w-12' }, 'STT'),
                                    e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600 w-1/4' }, 'Nội dung'),
                                    e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600' }, 'Ý kiến BP đề xuất'),
                                    e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600' }, 'Ý kiến TĐRR'),
                                    e('th', { className: 'px-3 py-2 text-center font-medium text-gray-600 w-16' }, 'Xóa')
                                )
                            ),
                            e('tbody', null,
                                bangKhacBiet.map((row, idx) =>
                                    e('tr', { key: row.id, className: 'border-t border-gray-100' },
                                        e('td', { className: 'px-3 py-2 text-gray-600' }, idx + 1),
                                        e('td', { className: 'px-3 py-2' },
                                            e('select', {
                                                className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-white',
                                                value: row.noiDung,
                                                onChange: (ev) => capNhatDong(row.id, 'noiDung', ev.target.value)
                                            },
                                                e('option', { value: '' }, 'Chọn nội dung'),
                                                danhSachNoiDung.map((nd, i) =>
                                                    e('option', { key: i, value: nd }, nd)
                                                )
                                            )
                                        ),
                                        e('td', { className: 'px-3 py-2' },
                                            e('input', {
                                                type: 'text',
                                                className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm',
                                                placeholder: 'Nhập ý kiến BP đề xuất',
                                                value: row.yKienBPDeXuat,
                                                onChange: (ev) => capNhatDong(row.id, 'yKienBPDeXuat', ev.target.value)
                                            })
                                        ),
                                        e('td', { className: 'px-3 py-2' },
                                            e('input', {
                                                type: 'text',
                                                className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm',
                                                placeholder: 'Nhập ý kiến TĐRR',
                                                value: row.yKienTDRR,
                                                onChange: (ev) => capNhatDong(row.id, 'yKienTDRR', ev.target.value)
                                            })
                                        ),
                                        e('td', { className: 'px-3 py-2 text-center' },
                                            e('button', {
                                                className: 'text-gray-400 hover:text-red-500',
                                                onClick: () => xoaDong(row.id)
                                            },
                                                e('i', { className: 'fas fa-trash' })
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

        // ===== BUTTON TẠO BÁO CÁO =====
        e('div', { className: 'flex justify-center pt-4' },
            e('button', {
                className: 'px-6 py-3 bg-[#006B68] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#005B58] shadow-lg',
                onClick: () => setShowPopupMauBC(true)
            },
                e('i', { className: 'fas fa-file-export' }),
                'Tạo báo cáo'
            )
        ),

        // ===== POPUP CHỌN MẪU BÁO CÁO =====
        showPopupMauBC && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-[480px] max-h-[90vh] overflow-hidden' },
                // Header
                e('div', { className: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between' },
                    e('h3', { className: 'text-lg font-semibold text-gray-800 flex items-center gap-2' },
                        e('i', { className: 'fas fa-file-alt text-[#006B68]' }),
                        'Chọn Mẫu báo cáo'
                    ),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: () => setShowPopupMauBC(false)
                    },
                        e('i', { className: 'fas fa-times' })
                    )
                ),

                // Content
                e('div', { className: 'p-6 space-y-3' },
                    danhSachMauBC.map(mau =>
                        e('div', {
                            key: mau.id,
                            className: 'border rounded-lg p-4 cursor-pointer transition-all border-gray-200 hover:border-[#006B68] hover:bg-[#006B68]/5',
                            onClick: () => handleSelectMau(mau.id)
                        },
                            e('div', { className: 'flex items-center gap-3' },
                                e('div', { className: 'w-10 h-10 bg-[#006B68]/10 rounded-lg flex items-center justify-center' },
                                    e('i', { className: 'fas fa-file-alt text-[#006B68]' })
                                ),
                                e('span', { className: 'text-sm font-medium text-gray-800' }, mau.name)
                            )
                        )
                    )
                ),

                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex justify-end' },
                    e('button', {
                        className: 'px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200',
                        onClick: () => setShowPopupMauBC(false)
                    }, 'Đóng')
                )
            )
        ),

        // ===== POPUP XEM BÁO CÁO =====
        showBaoCaoViewer && renderBaoCaoViewer()
    );
};
