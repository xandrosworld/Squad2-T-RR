// =====================================================
// Tab: Nhóm KH liên quan
// =====================================================

window.TabNhomKHLienQuan = function () {
    const e = React.createElement;

    // Collapsible sections state
    const [nkOpen, setNkOpen] = React.useState({});
    const toggleNk = (key) => setNkOpen(prev => ({ ...prev, [key]: !prev[key] }));
    const isNkOpen = (key) => !!nkOpen[key];

    // State cho nhóm KHLQ được chọn
    const [activeNhomKHLQ, setActiveNhomKHLQ] = React.useState('vingroup');

    // State cho Tổng GHTD nhập thủ công
    const [tongGHTD, setTongGHTD] = React.useState('125.000');

    // Data nhóm KHLQ
    const nhomKHLQData = [
        { id: 'vingroup', name: 'Nhóm Vingroup Holdings', soThanhVien: 47 },
        { id: 'vintech', name: 'Nhóm VinTech Ecosystem', soThanhVien: 23 }
    ];

    // Data thống kê KHLQ
    const thongKeKHLQ = {
        thanhVien: { value: 47, label: 'Công ty hoạt động' },
        tranGHTD: { value: '125.000', label: 'Tỷ VNĐ' },
        ghtdDaPheDuyet: { value: '98.500', label: 'Tỷ VNĐ' },
        tyLeSuDung: { value: '71.6%', label: 'Dư nợ/GHTD' },
        tyLeDuNo: { value: '2.99%', label: 'Giới hạn: 3%', warning: false }
    };

    // Data chi tiết thành viên KHLQ
    const danhSachKHLQ = [
        { stt: 1, ten: 'Công ty TNHH VinFast Trading', soDKKD: '0101234567', nganhNghe: 'Sản xuất và kinh doanh ô tô', moiQuanHe: 'Công ty con trực tiếp' },
        { stt: 2, ten: 'Công ty CP Vinpearl', soDKKD: '0109876543', nganhNghe: 'Kinh doanh khách sạn, du lịch', moiQuanHe: 'Công ty con trực tiếp' },
        { stt: 3, ten: 'Công ty CP VinCommerce', soDKKD: '0102468135', nganhNghe: 'Bán lẻ, thương mại điện tử', moiQuanHe: 'Công ty con trực tiếp' },
        { stt: 4, ten: 'Công ty CP VinSchool', soDKKD: '0107531986', nganhNghe: 'Giáo dục và đào tạo', moiQuanHe: 'Công ty con trực tiếp' }
    ];

    // Data quan hệ tín dụng tại BIDV
    const quanHeBIDV = [
        { stt: 1, tenCongTy: 'Công ty TNHH VinFast Trading', cif: 'VF001234', chiNhanh: 'CN Hoàn Kiếm', xepHang: 'AA-', phanLoaiNo: 'Nhóm 1', ghtd: 15 },
        { stt: 2, tenCongTy: 'Công ty CP Vinpearl', cif: 'VP002345', chiNhanh: 'CN Hai Bà Trưng', xepHang: 'A+', phanLoaiNo: 'Nhóm 1', ghtd: 12 },
        { stt: 3, tenCongTy: 'Công ty CP VinCommerce', cif: 'VC003456', chiNhanh: 'CN Thanh Xuân', xepHang: 'A+', phanLoaiNo: 'Nhóm 2', ghtd: 10.5 },
        { stt: 4, tenCongTy: 'Công ty CP VinSchool', cif: 'VS005678', chiNhanh: 'CN Đống Đa', xepHang: 'A+', phanLoaiNo: 'Nhóm 1', ghtd: 8 }
    ];

    // Data quan hệ tín dụng tại TCTD khác
    const quanHeTCTDKhac = [
        { stt: 1, tenKH: 'Công ty TNHH VinFast Trading', duNoNH: 8.5, duNoTDHF: 2.3, duCKNB: 1.2, nhomNo: 'Nhóm 1' },
        { stt: 2, tenKH: 'Công ty CP Vinpearl', duNoNH: 6.7, duNoTDHF: 1.8, duCKNB: 0.9, nhomNo: 'Nhóm 1' },
        { stt: 3, tenKH: 'Công ty CP VinCommerce', duNoNH: 5.2, duNoTDHF: 1.5, duCKNB: 0.7, nhomNo: 'Nhóm 1' },
        { stt: 4, tenKH: 'Công ty CP VinSchool', duNoNH: 4.1, duNoTDHF: 1.1, duCKNB: 0.5, nhomNo: 'Nhóm 2' }
    ];

    return e('div', { className: 'space-y-6' },
        // ===== KHỐI 1: HEADER + TABS + CARDS THỐNG KÊ =====
        e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
            e('div', {
                className: 'px-5 py-3 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors',
                onClick: () => toggleNk('thongTinKHLQ')
            },
                e('div', { className: 'flex items-center gap-2' },
                    e('i', { className: 'fas fa-users text-[#006B68]' }),
                    e('span', { className: 'font-semibold text-gray-800' }, 'Thông tin khách hàng liên quan')
                ),
                e('i', { className: 'fas fa-chevron-' + (isNkOpen('thongTinKHLQ') ? 'up' : 'down') + ' text-gray-400 text-sm' })
            ),
            isNkOpen('thongTinKHLQ') && e('div', { className: 'p-5' },
                // Tabs nhóm KHLQ
                e('div', { className: 'flex gap-4 mb-6' },
                    nhomKHLQData.map(nhom =>
                        e('button', {
                            key: nhom.id,
                            className: 'flex items-center gap-3 px-5 py-3 rounded-lg border-2 transition-all ' +
                                (activeNhomKHLQ === nhom.id
                                    ? 'border-[#006B68] bg-[#006B68]/5'
                                    : 'border-gray-200 hover:border-gray-300'),
                            onClick: () => setActiveNhomKHLQ(nhom.id)
                        },
                            e('i', { className: 'fas fa-building text-[#006B68]' }),
                            e('div', { className: 'text-left' },
                                e('p', { className: 'font-semibold text-gray-800' }, nhom.name),
                                e('p', { className: 'text-xs text-gray-500' }, nhom.soThanhVien + ' thành viên')
                            ),
                            e('span', { className: 'ml-3 w-8 h-8 flex items-center justify-center bg-[#006B68] text-white rounded-full text-sm font-semibold' }, nhom.soThanhVien)
                        )
                    )
                ),
                // 5 Cards thống kê
                e('div', { className: 'grid grid-cols-5 gap-4' },
                    // Card 1: Thành viên nhóm
                    e('div', { className: 'bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100' },
                        e('div', { className: 'flex items-center justify-between mb-3' },
                            e('i', { className: 'fas fa-users text-teal-600' }),
                            e('div', { className: 'flex items-center gap-1' },
                                e('i', { className: 'fas fa-chart-line text-teal-500 text-xs' }),
                                e('div', { className: 'w-6 h-6 bg-teal-500 rounded' })
                            )
                        ),
                        e('p', { className: 'text-xs text-gray-500 uppercase tracking-wide mb-1' }, 'THÀNH VIÊN NHÓM'),
                        e('p', { className: 'text-3xl font-bold text-gray-800 mb-1' }, thongKeKHLQ.thanhVien.value),
                        e('p', { className: 'text-xs text-gray-500' }, thongKeKHLQ.thanhVien.label),
                        e('div', { className: 'mt-3 h-1 bg-teal-200 rounded-full overflow-hidden' },
                            e('div', { className: 'h-full bg-teal-500', style: { width: '70%' } })
                        )
                    ),
                    // Card 2: Tổng GHTD nhóm KHLQ đã được phê duyệt (nhập thủ công)
                    e('div', { className: 'bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100' },
                        e('div', { className: 'flex items-center justify-between mb-3' },
                            e('i', { className: 'fas fa-credit-card text-blue-600' }),
                            e('div', { className: 'flex items-center gap-1' },
                                e('i', { className: 'fas fa-dollar-sign text-yellow-500 text-xs' }),
                                e('div', { className: 'w-6 h-6 bg-yellow-500 rounded' })
                            )
                        ),
                        e('p', { className: 'text-xs text-gray-500 uppercase tracking-wide mb-1' }, 'TỔNG GHTD NHÓM KHLQ ĐÃ ĐƯỢC PHÊ DUYỆT'),
                        e('input', {
                            type: 'text',
                            className: 'w-full text-3xl font-bold text-gray-800 mb-1 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 focus:outline-none py-1',
                            value: tongGHTD,
                            onChange: (ev) => setTongGHTD(ev.target.value),
                            placeholder: 'Nhập số liệu'
                        }),
                        e('p', { className: 'text-xs text-gray-500' }, thongKeKHLQ.tranGHTD.label),
                        e('div', { className: 'mt-3 h-1 bg-blue-200 rounded-full overflow-hidden' },
                            e('div', { className: 'h-full bg-blue-500', style: { width: '100%' } })
                        )
                    ),
                    // Card 3: GHTD đã phê duyệt
                    e('div', { className: 'bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100' },
                        e('div', { className: 'flex items-center justify-between mb-3' },
                            e('i', { className: 'fas fa-check-circle text-green-600' }),
                            e('div', { className: 'flex items-center gap-1' },
                                e('i', { className: 'fas fa-file-alt text-orange-500 text-xs' }),
                                e('div', { className: 'w-6 h-6 bg-orange-400 rounded' })
                            )
                        ),
                        e('p', { className: 'text-xs text-gray-500 uppercase tracking-wide mb-1' }, 'GHTD ĐÃ PHÊ DUYỆT'),
                        e('p', { className: 'text-3xl font-bold text-gray-800 mb-1' }, thongKeKHLQ.ghtdDaPheDuyet.value),
                        e('p', { className: 'text-xs text-gray-500' }, thongKeKHLQ.ghtdDaPheDuyet.label),
                        e('div', { className: 'mt-3 h-1 bg-green-200 rounded-full overflow-hidden' },
                            e('div', { className: 'h-full bg-green-500', style: { width: '78%' } })
                        )
                    ),
                    // Card 4: Tỷ lệ sử dụng
                    e('div', { className: 'bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100' },
                        e('div', { className: 'flex items-center justify-between mb-3' },
                            e('i', { className: 'fas fa-chart-pie text-yellow-600' }),
                            e('div', { className: 'flex items-center gap-1' },
                                e('i', { className: 'fas fa-chart-bar text-yellow-500 text-xs' }),
                                e('div', { className: 'w-6 h-6 bg-yellow-500 rounded' })
                            )
                        ),
                        e('p', { className: 'text-xs text-gray-500 uppercase tracking-wide mb-1' }, 'TỶ LỆ SỬ DỤNG'),
                        e('p', { className: 'text-3xl font-bold text-yellow-600 mb-1' }, thongKeKHLQ.tyLeSuDung.value),
                        e('p', { className: 'text-xs text-gray-500' }, thongKeKHLQ.tyLeSuDung.label),
                        e('div', { className: 'mt-3 h-1 bg-yellow-200 rounded-full overflow-hidden' },
                            e('div', { className: 'h-full bg-yellow-500', style: { width: '71.6%' } })
                        )
                    ),
                    // Card 5: Tỷ lệ dư nợ/vốn tự có
                    e('div', { className: 'bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 border border-red-100' },
                        e('div', { className: 'flex items-center justify-between mb-3' },
                            e('i', { className: 'fas fa-percentage text-red-500' }),
                            e('div', { className: 'flex items-center gap-1' },
                                e('div', { className: 'w-6 h-6 bg-red-400 rounded' })
                            )
                        ),
                        e('p', { className: 'text-xs text-gray-500 uppercase tracking-wide mb-1' }, 'TỶ LỆ DƯ NỢ/VỐN TỰ CÓ NH'),
                        e('p', { className: 'text-3xl font-bold text-red-500 mb-1' }, thongKeKHLQ.tyLeDuNo.value),
                        e('p', { className: 'text-xs text-gray-500' }, thongKeKHLQ.tyLeDuNo.label),
                        e('div', { className: 'mt-3 h-1 bg-red-200 rounded-full overflow-hidden' },
                            e('div', { className: 'h-full bg-red-400', style: { width: '99%' } })
                        )
                    )
                )
            )
        ),

        // ===== KHỐI 2: THÔNG TIN NHÓM KHLQ CHI TIẾT =====
        e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
            e('div', {
                className: 'px-5 py-3 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors',
                onClick: () => toggleNk('chiTietKHLQ')
            },
                e('div', { className: 'flex items-center gap-2' },
                    e('i', { className: 'fas fa-users text-[#006B68]' }),
                    e('span', { className: 'font-semibold text-gray-800' }, 'Thông tin nhóm KHLQ'),
                    e('span', { className: 'text-xs text-gray-500 ml-1' }, 'Chi tiết thông tin các thành viên trong nhóm')
                ),
                e('i', { className: 'fas fa-chevron-' + (isNkOpen('chiTietKHLQ') ? 'up' : 'down') + ' text-gray-400 text-sm' })
            ),
            isNkOpen('chiTietKHLQ') && e('div', { className: 'p-5' },
                e('table', { className: 'w-full text-sm' },
                    e('thead', null,
                        e('tr', { className: 'border-b border-gray-200' },
                            e('th', { className: 'px-4 py-3 text-left font-semibold text-gray-600' }, 'STT'),
                            e('th', { className: 'px-4 py-3 text-left font-semibold text-gray-600' }, 'TÊN KHÁCH HÀNG'),
                            e('th', { className: 'px-4 py-3 text-left font-semibold text-gray-600' }, 'SỐ ĐKKD'),
                            e('th', { className: 'px-4 py-3 text-left font-semibold text-gray-600' }, 'NGÀNH NGHỀ KINH DOANH'),
                            e('th', { className: 'px-4 py-3 text-left font-semibold text-gray-600' }, 'MỐI QUAN HỆ VỚI KH TRUNG TÂM')
                        )
                    ),
                    e('tbody', null,
                        danhSachKHLQ.map(kh =>
                            e('tr', { key: kh.stt, className: 'border-b border-gray-100 hover:bg-gray-50' },
                                e('td', { className: 'px-4 py-3 text-center' }, kh.stt),
                                e('td', { className: 'px-4 py-3 font-medium text-gray-800' }, kh.ten),
                                e('td', { className: 'px-4 py-3 text-gray-600' }, kh.soDKKD),
                                e('td', { className: 'px-4 py-3 text-gray-600' }, kh.nganhNghe),
                                e('td', { className: 'px-4 py-3' },
                                    e('span', { className: 'px-3 py-1 bg-[#006B68]/10 text-[#006B68] rounded-full text-xs font-medium' }, kh.moiQuanHe)
                                )
                            )
                        )
                    )
                ),
                // Đánh giá mối quan hệ nhóm KHLQ
                e('div', { className: 'mt-6 border border-gray-200 rounded-lg p-4' },
                    e('div', { className: 'flex items-center justify-between mb-3' },
                        e('div', { className: 'flex items-center gap-2' },
                            e('i', { className: 'fas fa-edit text-[#006B68]' }),
                            e('span', { className: 'font-semibold text-gray-800' }, 'Đánh giá mối quan hệ nhóm KHLQ')
                        ),
                        e('button', { className: 'px-4 py-1.5 bg-[#006B68] text-white rounded-lg text-sm flex items-center gap-2' },
                            e('i', { className: 'fas fa-pencil-alt text-xs' }),
                            'Chỉnh sửa'
                        )
                    ),
                    e('p', { className: 'text-sm text-gray-600 mb-3' }, 'Mô tả mối quan hệ kinh doanh, ảnh hưởng, chi phối lẫn nhau giữa các khách hàng trong nhóm KHLQ, mức độ ảnh hưởng đến rủi ro và khả năng trả nợ của khách hàng'),
                    e('textarea', {
                        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-[#006B68]',
                        rows: 4,
                        placeholder: 'Nhập đánh giá chi tiết về mối quan hệ giữa các khách hàng trong nhóm KHLQ...'
                    }),
                    e('p', { className: 'text-xs text-gray-400 mt-2' }, '0/1000 ký tự')
                )
            )
        ),

        // ===== KHỐI 3: TÌNH HÌNH QUAN HỆ TÍN DỤNG TẠI BIDV =====
        e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
            e('div', {
                className: 'px-5 py-3 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors',
                onClick: () => toggleNk('quanHeBIDV_KHLQ')
            },
                e('div', { className: 'flex items-center gap-2' },
                    e('i', { className: 'fas fa-university text-[#006B68]' }),
                    e('span', { className: 'font-semibold text-gray-800' }, 'Tình hình quan hệ tín dụng của nhóm KHLQ tại BIDV')
                ),
                e('div', { className: 'flex items-center gap-3' },
                    e('span', { className: 'px-3 py-1 bg-[#006B68] text-white rounded text-sm' }, '4 kết quả'),
                    e('button', { className: 'px-4 py-1.5 border border-gray-300 text-gray-600 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50', onClick: (ev) => ev.stopPropagation() },
                        e('i', { className: 'fas fa-filter text-xs' }),
                        'Bộ lọc'
                    ),
                    e('i', { className: 'fas fa-chevron-' + (isNkOpen('quanHeBIDV_KHLQ') ? 'up' : 'down') + ' text-gray-400 text-sm' })
                )
            ),
            isNkOpen('quanHeBIDV_KHLQ') && e('div', { className: 'p-5' },
                // Search + filters
                e('div', { className: 'flex items-center gap-4 mb-4' },
                    e('div', { className: 'flex-1 relative' },
                        e('i', { className: 'fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm' }),
                        e('input', {
                            type: 'text',
                            className: 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm',
                            placeholder: 'Tìm kiếm theo tên công ty hoặc CIF...'
                        })
                    ),
                    e('select', { className: 'px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white' },
                        e('option', null, 'Tất cả phân loại nợ')
                    ),
                    e('select', { className: 'px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white' },
                        e('option', null, 'Tất cả xếp hạng')
                    )
                ),
                // Table
                e('table', { className: 'w-full text-sm' },
                    e('thead', null,
                        e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                            e('th', { className: 'px-3 py-3 text-left font-medium text-gray-600' }, 'STT ▼'),
                            e('th', { className: 'px-3 py-3 text-left font-medium text-gray-600' }, 'TÊN CÔNG TY ▼'),
                            e('th', { className: 'px-3 py-3 text-left font-medium text-gray-600' }, 'CIF'),
                            e('th', { className: 'px-3 py-3 text-left font-medium text-gray-600' }, 'CHI NHÁNH ▼'),
                            e('th', { className: 'px-3 py-3 text-center font-medium text-gray-600' }, 'XẾP HẠNG ▼'),
                            e('th', { className: 'px-3 py-3 text-center font-medium text-gray-600' }, 'PHÂN LOẠI NỢ ▼'),
                            e('th', { className: 'px-3 py-3 text-right font-medium text-gray-600' }, 'GHTD ĐÃ PHÊ DUYỆT', e('br'), e('span', { className: 'text-xs font-normal' }, '(tỷ VND)'))
                        )
                    ),
                    e('tbody', null,
                        quanHeBIDV.map(item =>
                            e('tr', { key: item.stt, className: 'border-b border-gray-100 hover:bg-gray-50' },
                                e('td', { className: 'px-3 py-3 text-center' }, item.stt),
                                e('td', { className: 'px-3 py-3 font-medium text-blue-600' }, item.tenCongTy),
                                e('td', { className: 'px-3 py-3 text-gray-600' }, item.cif),
                                e('td', { className: 'px-3 py-3' },
                                    e('span', { className: 'px-2 py-1 bg-[#006B68]/10 text-[#006B68] rounded text-xs' }, item.chiNhanh)
                                ),
                                e('td', { className: 'px-3 py-3 text-center font-semibold text-[#006B68]' }, item.xepHang),
                                e('td', { className: 'px-3 py-3 text-center' },
                                    e('span', { className: 'px-2 py-1 rounded text-xs ' + (item.phanLoaiNo === 'Nhóm 1' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700') }, item.phanLoaiNo)
                                ),
                                e('td', { className: 'px-3 py-3 text-right' },
                                    e('div', { className: 'flex items-center justify-end gap-2' },
                                        e('span', { className: 'font-semibold text-[#006B68]' }, item.ghtd),
                                        e('div', { className: 'w-16 h-2 bg-gray-200 rounded-full overflow-hidden' },
                                            e('div', { className: 'h-full bg-[#006B68]', style: { width: (item.ghtd / 15 * 100) + '%' } })
                                        )
                                    )
                                )
                            )
                        ),
                        e('tr', { className: 'bg-gray-50 font-semibold' },
                            e('td', { className: 'px-3 py-3', colSpan: 6 }, 'Tổng cộng'),
                            e('td', { className: 'px-3 py-3 text-right text-[#006B68]' }, '45.5')
                        )
                    )
                )
            )
        ),

        // ===== KHỐI 4: TÌNH HÌNH QUAN HỆ TÍN DỤNG TẠI CÁC TCTD KHÁC =====
        e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
            e('div', {
                className: 'px-5 py-3 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors',
                onClick: () => toggleNk('quanHeTCTD_KHLQ')
            },
                e('div', { className: 'flex items-center gap-2' },
                    e('i', { className: 'fas fa-building text-[#006B68]' }),
                    e('span', { className: 'font-semibold text-gray-800' }, 'Tình hình quan hệ tín dụng của nhóm KHLQ tại các TCTD khác')
                ),
                e('div', { className: 'flex items-center gap-3' },
                    e('span', { className: 'px-3 py-1 border border-gray-300 text-gray-600 rounded text-sm' }, '4 kết quả'),
                    e('button', { className: 'px-4 py-1.5 bg-[#006B68] text-white rounded-lg text-sm flex items-center gap-2', onClick: (ev) => ev.stopPropagation() },
                        e('i', { className: 'fas fa-search text-xs' }),
                        'Truy vấn CIC'
                    ),
                    e('i', { className: 'fas fa-chevron-' + (isNkOpen('quanHeTCTD_KHLQ') ? 'up' : 'down') + ' text-gray-400 text-sm' })
                )
            ),
            isNkOpen('quanHeTCTD_KHLQ') && e('div', { className: 'p-5' },
                // Search + filter
                e('div', { className: 'flex items-center gap-4 mb-4' },
                    e('div', { className: 'flex-1 relative' },
                        e('i', { className: 'fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm' }),
                        e('input', {
                            type: 'text',
                            className: 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm',
                            placeholder: 'Tìm kiếm theo tên khách hàng...'
                        })
                    ),
                    e('select', { className: 'px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white' },
                        e('option', null, 'Tất cả nhóm nợ')
                    )
                ),
                // Table
                e('table', { className: 'w-full text-sm' },
                    e('thead', null,
                        e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                            e('th', { className: 'px-3 py-3 text-left font-medium text-gray-600', rowSpan: 2 }, 'STT'),
                            e('th', { className: 'px-3 py-3 text-left font-medium text-gray-600', rowSpan: 2 }, 'TÊN KHÁCH HÀNG'),
                            e('th', { className: 'px-3 py-3 text-center font-medium text-gray-600 border-l border-gray-200', colSpan: 3 }, 'SỐ DƯ TẠI CÁC TCTD KHÁC'),
                            e('th', { className: 'px-3 py-3 text-center font-medium text-gray-600 border-l border-gray-200', rowSpan: 2 }, 'NHÓM NỢ')
                        ),
                        e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                            e('th', { className: 'px-3 py-2 text-center font-normal text-gray-500 text-xs border-l border-gray-200' }, 'DƯ NỢ NH', e('br'), '(tỷ VND)'),
                            e('th', { className: 'px-3 py-2 text-center font-normal text-gray-500 text-xs' }, 'DƯ NỢ TDHF', e('br'), '(tỷ VND)'),
                            e('th', { className: 'px-3 py-2 text-center font-normal text-gray-500 text-xs' }, 'DƯ CKNB', e('br'), '(tỷ VND)')
                        )
                    ),
                    e('tbody', null,
                        quanHeTCTDKhac.map(item =>
                            e('tr', { key: item.stt, className: 'border-b border-gray-100 hover:bg-gray-50' },
                                e('td', { className: 'px-3 py-3 text-center' }, item.stt),
                                e('td', { className: 'px-3 py-3 font-medium text-gray-800' }, item.tenKH),
                                e('td', { className: 'px-3 py-3 text-center text-blue-600 font-medium border-l border-gray-100' }, item.duNoNH),
                                e('td', { className: 'px-3 py-3 text-center text-[#006B68] font-medium' }, item.duNoTDHF),
                                e('td', { className: 'px-3 py-3 text-center text-yellow-600 font-medium' }, item.duCKNB),
                                e('td', { className: 'px-3 py-3 text-center border-l border-gray-100' },
                                    e('span', { className: 'px-2 py-1 rounded text-xs ' + (item.nhomNo === 'Nhóm 1' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700') }, item.nhomNo)
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};
