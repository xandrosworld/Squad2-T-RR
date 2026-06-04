// =====================================================
// Tab: Thông tin chung - Dashboard tổng hợp
// =====================================================

window.TabThongTinChung = function () {
    const e = React.createElement;

    // ===== DỮ LIỆU TỰ ĐỘNG LẤY TỪ CÁC SUBTAB KHÁC =====

    // Thông tin pháp lý (từ Thông tin phi tài chính)
    const thongTinPhapLy = {
        tenCongTy: 'Công ty Cổ phần Vingroup',
        tenTiengAnh: 'Vingroup Joint Stock Company',
        tenVietTat: 'Vingroup',
        maSoDN: '0104831030',
        loaiHinhDN: 'Công ty Cổ phần',
        ngayDangKy: '15/01/2010',
        diaChiDKKD: 'Tầng 48-52 Tòa nhà Viettel, 285 Cách Mạng Tháng 8, P.12, Q.10, TP. Hồ Chí Minh',
        dienThoai: '(+84) 28 3910 8888',
        email: 'info@vingroup.net',
        website: 'www.vingroup.net',
        nganhNgheCore: '6810 - Kinh doanh bất động sản',
        vonDieuLe: '34.302 tỷ VND',
        vonThucGop: '34.302 tỷ VND'
    };

    // Thông tin niêm yết (từ Thông tin phi tài chính)
    const thongTinNiemYet = {
        daNiemYet: true,
        maCoPhieu: 'VIC',
        sanNiemYet: 'HOSE',
        thoiDiemNiemYet: '17/01/2007',
        quyMoVonHoa: '320.000 tỷ VND'
    };

    // Chỉ tiêu tài chính quan trọng (từ Thông tin tài chính)
    const chiTieuTaiChinh = {
        tongTaiSan: { value: '2.900.000 tỷ VND', trend: '+15.2%', status: 'up' },
        vonChuSoHuu: { value: '250.000 tỷ VND', trend: '+8.5%', status: 'up' },
        doanhThuThuan: { value: '5.200.000 tỷ VND', trend: '+22.1%', status: 'up' },
        loiNhuanSauThue: { value: '320.000 tỷ VND', trend: '+18.3%', status: 'up' },
        tyLeNoVonCSH: { value: '1.2x', trend: '-5.2%', status: 'down' },
        tyLeThanhtoanHienHanh: { value: '1.35x', trend: '+2.1%', status: 'up' }
    };

    // Thông tin quản lý (từ Mô hình quản lý)
    const thongTinQuanLy = {
        soCongTyCon: 15,
        soCongTyLienKet: 3,
        soNhanVien: '45.000+',
        tongVonCongTyCon: '185.500 tỷ VND'
    };

    // Xếp hạng tín dụng (từ Quan hệ TCTD)
    const xepHangTinDung = {
        xepHangBIDV: 'AA-',
        xepHangCIC: 'A+',
        nhomNo: 'Nhóm 1',
        ghtdDaPheDuyet: '125.000 tỷ VND'
    };

    // Cổ đông lớn (từ Mô hình quản lý)
    const coDongLon = [
        { ten: 'Phạm Nhật Vượng', tyLe: '40.0%', viTri: 'Chủ tịch HĐQT' },
        { ten: 'Dragon Capital', tyLe: '14.0%', viTri: 'NĐT tài chính' },
        { ten: 'VinaCapital', tyLe: '7.0%', viTri: 'NĐT nước ngoài' },
        { ten: 'BlackRock', tyLe: '5.0%', viTri: 'Quỹ quốc tế' }
    ];

    // Lịch sử hoạt động gần nhất (từ Thông tin pháp lý)
    const lichSuGanNhat = [
        { ngay: '15/11/2024', noiDung: 'Duy trì vị trí tập đoàn kinh tế tư nhân lớn nhất Việt Nam' },
        { ngay: '22/03/2023', noiDung: 'VinFast chính thức niêm yết trên sàn NASDAQ (Mỹ)' },
        { ngay: '20/06/2021', noiDung: 'VinFast xuất khẩu lô xe đầu tiên sang Mỹ và Châu Âu' }
    ];

    // Render Info Card
    const renderInfoCard = (icon, label, value, subValue = null, className = '') => {
        return e('div', { className: 'bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow ' + className },
            e('div', { className: 'flex items-start gap-3' },
                e('div', { className: 'w-10 h-10 rounded-lg bg-gradient-to-br from-[#006B68] to-[#00857f] flex items-center justify-center flex-shrink-0' },
                    e('i', { className: icon + ' text-white' })
                ),
                e('div', { className: 'flex-1 min-w-0' },
                    e('p', { className: 'text-xs text-gray-500 uppercase tracking-wide mb-0.5' }, label),
                    e('p', { className: 'text-sm font-semibold text-gray-800 truncate' }, value),
                    subValue && e('p', { className: 'text-xs text-gray-500 mt-0.5' }, subValue)
                )
            )
        );
    };

    // Render Stat Card với trend
    const renderStatCard = (label, value, trend, status, icon) => {
        const trendColor = status === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
        const trendIcon = status === 'up' ? 'fa-arrow-up' : 'fa-arrow-down';

        return e('div', { className: 'bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-0.5' },
            e('div', { className: 'flex items-center justify-between mb-3' },
                e('div', { className: 'w-12 h-12 rounded-xl bg-gradient-to-br from-[#006B68]/10 to-[#006B68]/5 flex items-center justify-center' },
                    e('i', { className: icon + ' text-[#006B68] text-lg' })
                ),
                e('span', { className: 'px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ' + trendColor },
                    e('i', { className: 'fas ' + trendIcon + ' text-[10px]' }),
                    trend
                )
            ),
            e('p', { className: 'text-2xl font-bold text-gray-800 mb-1' }, value),
            e('p', { className: 'text-sm text-gray-500' }, label)
        );
    };

    return e('div', { className: 'space-y-6' },
        // ===== HEADER =====
        e('div', { className: 'flex items-center justify-between' },
            e('div', null,
                e('h2', { className: 'text-xl font-bold text-gray-800 flex items-center gap-2' },
                    e('i', { className: 'fas fa-building text-[#006B68]' }),
                    'Tổng quan khách hàng'
                ),
                e('p', { className: 'text-sm text-gray-500 mt-1' }, 'Thông tin được tự động tổng hợp từ các tab chi tiết')
            ),
            e('div', { className: 'flex items-center gap-3' },
                e('span', { className: 'text-xs text-gray-400' }, 'Cập nhật: 06/02/2026 15:28'),
                e('button', { className: 'px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 flex items-center gap-2' },
                    e('i', { className: 'fas fa-sync-alt text-xs' }),
                    'Làm mới'
                )
            )
        ),

        // ===== THÔNG TIN CƠ BẢN =====
        e('div', { className: 'bg-gradient-to-br from-[#006B68] to-[#008884] rounded-2xl p-6 text-white' },
            e('div', { className: 'flex items-start justify-between' },
                e('div', { className: 'flex-1' },
                    e('div', { className: 'flex items-center gap-3 mb-4' },
                        e('div', { className: 'w-16 h-16 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center' },
                            e('span', { className: 'text-2xl font-bold' }, 'VIC')
                        ),
                        e('div', null,
                            e('h3', { className: 'text-2xl font-bold' }, thongTinPhapLy.tenCongTy),
                            e('p', { className: 'text-white/80 text-sm' }, thongTinPhapLy.tenTiengAnh)
                        )
                    ),
                    e('div', { className: 'grid grid-cols-4 gap-4 mt-4' },
                        e('div', null,
                            e('p', { className: 'text-white/60 text-xs uppercase tracking-wide' }, 'Mã số DN'),
                            e('p', { className: 'font-semibold' }, thongTinPhapLy.maSoDN)
                        ),
                        e('div', null,
                            e('p', { className: 'text-white/60 text-xs uppercase tracking-wide' }, 'Loại hình'),
                            e('p', { className: 'font-semibold' }, thongTinPhapLy.loaiHinhDN)
                        ),
                        e('div', null,
                            e('p', { className: 'text-white/60 text-xs uppercase tracking-wide' }, 'Mã cổ phiếu'),
                            e('p', { className: 'font-semibold' }, thongTinNiemYet.maCoPhieu + ' - ' + thongTinNiemYet.sanNiemYet)
                        ),
                        e('div', null,
                            e('p', { className: 'text-white/60 text-xs uppercase tracking-wide' }, 'Xếp hạng BIDV'),
                            e('p', { className: 'font-semibold flex items-center gap-2' },
                                xepHangTinDung.xepHangBIDV,
                                e('span', { className: 'px-2 py-0.5 bg-green-500 text-white text-xs rounded' }, xepHangTinDung.nhomNo)
                            )
                        )
                    )
                ),
                e('div', { className: 'text-right' },
                    e('p', { className: 'text-white/60 text-xs uppercase tracking-wide mb-1' }, 'Vốn điều lệ'),
                    e('p', { className: 'text-3xl font-bold' }, thongTinPhapLy.vonDieuLe),
                    e('p', { className: 'text-white/60 text-xs mt-2' }, 'Đăng ký: ' + thongTinPhapLy.ngayDangKy)
                )
            )
        ),

        // ===== CHỈ TIÊU TÀI CHÍNH QUAN TRỌNG =====
        e('div', null,
            e('div', { className: 'flex items-center gap-2 mb-4' },
                e('i', { className: 'fas fa-chart-line text-[#006B68]' }),
                e('h3', { className: 'font-semibold text-gray-800' }, 'Chỉ tiêu tài chính'),
                e('span', { className: 'text-xs text-gray-500 ml-2' }, '(Dữ liệu từ Thông tin tài chính)')
            ),
            e('div', { className: 'grid grid-cols-6 gap-4' },
                renderStatCard('Tổng tài sản', chiTieuTaiChinh.tongTaiSan.value, chiTieuTaiChinh.tongTaiSan.trend, chiTieuTaiChinh.tongTaiSan.status, 'fas fa-coins'),
                renderStatCard('Vốn chủ sở hữu', chiTieuTaiChinh.vonChuSoHuu.value, chiTieuTaiChinh.vonChuSoHuu.trend, chiTieuTaiChinh.vonChuSoHuu.status, 'fas fa-piggy-bank'),
                renderStatCard('Doanh thu thuần', chiTieuTaiChinh.doanhThuThuan.value, chiTieuTaiChinh.doanhThuThuan.trend, chiTieuTaiChinh.doanhThuThuan.status, 'fas fa-file-invoice-dollar'),
                renderStatCard('Lợi nhuận sau thuế', chiTieuTaiChinh.loiNhuanSauThue.value, chiTieuTaiChinh.loiNhuanSauThue.trend, chiTieuTaiChinh.loiNhuanSauThue.status, 'fas fa-chart-pie'),
                renderStatCard('Tỷ lệ Nợ/VCSH', chiTieuTaiChinh.tyLeNoVonCSH.value, chiTieuTaiChinh.tyLeNoVonCSH.trend, chiTieuTaiChinh.tyLeNoVonCSH.status, 'fas fa-balance-scale'),
                renderStatCard('Thanh toán hiện hành', chiTieuTaiChinh.tyLeThanhtoanHienHanh.value, chiTieuTaiChinh.tyLeThanhtoanHienHanh.trend, chiTieuTaiChinh.tyLeThanhtoanHienHanh.status, 'fas fa-water')
            )
        ),

        // ===== ROW: THÔNG TIN LIÊN HỆ + CỔ ĐÔNG LỚN + QUAN HỆ TÍN DỤNG =====
        e('div', { className: 'grid grid-cols-3 gap-6' },
            // Thông tin liên hệ
            e('div', { className: 'bg-white rounded-xl border border-gray-200 overflow-hidden' },
                e('div', { className: 'px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2' },
                    e('i', { className: 'fas fa-address-card text-[#006B68]' }),
                    e('span', { className: 'font-semibold text-gray-800' }, 'Thông tin liên hệ'),
                    e('span', { className: 'text-xs text-gray-400 ml-auto' }, 'Từ: Thông tin pháp lý')
                ),
                e('div', { className: 'p-5 space-y-3' },
                    e('div', { className: 'flex items-start gap-3' },
                        e('i', { className: 'fas fa-map-marker-alt text-gray-400 mt-0.5' }),
                        e('p', { className: 'text-sm text-gray-700' }, thongTinPhapLy.diaChiDKKD)
                    ),
                    e('div', { className: 'flex items-center gap-3' },
                        e('i', { className: 'fas fa-phone text-gray-400' }),
                        e('p', { className: 'text-sm text-gray-700' }, thongTinPhapLy.dienThoai)
                    ),
                    e('div', { className: 'flex items-center gap-3' },
                        e('i', { className: 'fas fa-envelope text-gray-400' }),
                        e('p', { className: 'text-sm text-gray-700' }, thongTinPhapLy.email)
                    ),
                    e('div', { className: 'flex items-center gap-3' },
                        e('i', { className: 'fas fa-globe text-gray-400' }),
                        e('a', { href: 'https://' + thongTinPhapLy.website, target: '_blank', className: 'text-sm text-[#006B68] hover:underline' }, thongTinPhapLy.website)
                    )
                )
            ),

            // Cổ đông lớn
            e('div', { className: 'bg-white rounded-xl border border-gray-200 overflow-hidden' },
                e('div', { className: 'px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2' },
                    e('i', { className: 'fas fa-users text-[#006B68]' }),
                    e('span', { className: 'font-semibold text-gray-800' }, 'Cổ đông lớn'),
                    e('span', { className: 'text-xs text-gray-400 ml-auto' }, 'Từ: Mô hình quản lý')
                ),
                e('div', { className: 'divide-y divide-gray-100' },
                    coDongLon.map((cd, idx) =>
                        e('div', { key: idx, className: 'px-5 py-3 flex items-center justify-between hover:bg-gray-50' },
                            e('div', null,
                                e('p', { className: 'text-sm font-medium text-gray-800' }, cd.ten),
                                e('p', { className: 'text-xs text-gray-500' }, cd.viTri)
                            ),
                            e('span', { className: 'px-3 py-1 bg-[#006B68]/10 text-[#006B68] font-semibold rounded-full text-sm' }, cd.tyLe)
                        )
                    )
                )
            ),

            // Quan hệ tín dụng
            e('div', { className: 'bg-white rounded-xl border border-gray-200 overflow-hidden' },
                e('div', { className: 'px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2' },
                    e('i', { className: 'fas fa-university text-[#006B68]' }),
                    e('span', { className: 'font-semibold text-gray-800' }, 'Quan hệ tín dụng BIDV'),
                    e('span', { className: 'text-xs text-gray-400 ml-auto' }, 'Từ: Quan hệ TCTD')
                ),
                e('div', { className: 'p-5 space-y-4' },
                    e('div', { className: 'flex items-center justify-between' },
                        e('span', { className: 'text-sm text-gray-600' }, 'Xếp hạng BIDV'),
                        e('span', { className: 'px-3 py-1 bg-green-100 text-green-700 font-bold rounded text-lg' }, xepHangTinDung.xepHangBIDV)
                    ),
                    e('div', { className: 'flex items-center justify-between' },
                        e('span', { className: 'text-sm text-gray-600' }, 'Xếp hạng CIC'),
                        e('span', { className: 'px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded' }, xepHangTinDung.xepHangCIC)
                    ),
                    e('div', { className: 'flex items-center justify-between' },
                        e('span', { className: 'text-sm text-gray-600' }, 'Phân loại nợ'),
                        e('span', { className: 'px-3 py-1 bg-green-500 text-white font-medium rounded' }, xepHangTinDung.nhomNo)
                    ),
                    e('div', { className: 'pt-3 border-t border-gray-200' },
                        e('p', { className: 'text-xs text-gray-500 uppercase tracking-wide mb-1' }, 'GHTD đã phê duyệt'),
                        e('p', { className: 'text-xl font-bold text-[#006B68]' }, xepHangTinDung.ghtdDaPheDuyet)
                    )
                )
            )
        ),

        // ===== ROW: THỐNG KÊ NHANH + LỊCH SỬ HOẠT ĐỘNG =====
        e('div', { className: 'grid grid-cols-3 gap-6' },
            // Thống kê nhanh
            e('div', { className: 'bg-white rounded-xl border border-gray-200 p-5' },
                e('div', { className: 'flex items-center gap-2 mb-4' },
                    e('i', { className: 'fas fa-sitemap text-[#006B68]' }),
                    e('span', { className: 'font-semibold text-gray-800' }, 'Cơ cấu tổ chức'),
                    e('span', { className: 'text-xs text-gray-400 ml-auto' }, 'Từ: Mô hình quản lý')
                ),
                e('div', { className: 'grid grid-cols-2 gap-4' },
                    e('div', { className: 'text-center p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl' },
                        e('p', { className: 'text-3xl font-bold text-[#006B68]' }, thongTinQuanLy.soCongTyCon),
                        e('p', { className: 'text-xs text-gray-600 mt-1' }, 'Công ty con')
                    ),
                    e('div', { className: 'text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl' },
                        e('p', { className: 'text-3xl font-bold text-blue-600' }, thongTinQuanLy.soCongTyLienKet),
                        e('p', { className: 'text-xs text-gray-600 mt-1' }, 'Công ty liên kết')
                    ),
                    e('div', { className: 'text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl' },
                        e('p', { className: 'text-3xl font-bold text-amber-600' }, thongTinQuanLy.soNhanVien),
                        e('p', { className: 'text-xs text-gray-600 mt-1' }, 'Nhân viên')
                    ),
                    e('div', { className: 'text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl col-span-2' },
                        e('p', { className: 'text-2xl font-bold text-green-600' }, thongTinQuanLy.tongVonCongTyCon),
                        e('p', { className: 'text-xs text-gray-600 mt-1' }, 'Tổng vốn công ty con')
                    )
                )
            ),

            // Lịch sử hoạt động
            e('div', { className: 'col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden' },
                e('div', { className: 'px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2' },
                    e('i', { className: 'fas fa-history text-[#006B68]' }),
                    e('span', { className: 'font-semibold text-gray-800' }, 'Hoạt động gần đây'),
                    e('span', { className: 'text-xs text-gray-400 ml-auto' }, 'Từ: Thông tin pháp lý')
                ),
                e('div', { className: 'divide-y divide-gray-100' },
                    lichSuGanNhat.map((ls, idx) =>
                        e('div', { key: idx, className: 'px-5 py-4 flex items-start gap-4 hover:bg-gray-50' },
                            e('div', { className: 'w-24 flex-shrink-0' },
                                e('span', { className: 'px-2 py-1 bg-[#006B68]/10 text-[#006B68] text-xs font-medium rounded' }, ls.ngay)
                            ),
                            e('p', { className: 'text-sm text-gray-700 flex-1' }, ls.noiDung),
                            idx === 0 && e('span', { className: 'px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full' }, 'Mới nhất')
                        )
                    ),
                    e('div', { className: 'px-5 py-3 text-center' },
                        e('button', { className: 'text-sm text-[#006B68] hover:underline flex items-center gap-1 mx-auto' },
                            'Xem thêm lịch sử hoạt động',
                            e('i', { className: 'fas fa-arrow-right text-xs' })
                        )
                    )
                )
            )
        ),

        // ===== NGÀNH NGHỀ KINH DOANH =====
        e('div', { className: 'bg-white rounded-xl border border-gray-200 overflow-hidden' },
            e('div', { className: 'px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2' },
                e('i', { className: 'fas fa-industry text-[#006B68]' }),
                e('span', { className: 'font-semibold text-gray-800' }, 'Ngành nghề kinh doanh'),
                e('span', { className: 'text-xs text-gray-400 ml-auto' }, 'Từ: Thông tin pháp lý')
            ),
            e('div', { className: 'p-5' },
                e('div', { className: 'flex flex-wrap gap-2' },
                    e('span', { className: 'px-4 py-2 bg-[#006B68] text-white rounded-full text-sm font-medium flex items-center gap-2' },
                        e('i', { className: 'fas fa-star text-yellow-300 text-xs' }),
                        '6810 - Kinh doanh bất động sản'
                    ),
                    e('span', { className: 'px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm' }, '4100 - Xây dựng nhà các loại'),
                    e('span', { className: 'px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm' }, '4711 - Bán lẻ tổng hợp'),
                    e('span', { className: 'px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm' }, '5510 - Khách sạn, lưu trú'),
                    e('span', { className: 'px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm' }, '8530 - Giáo dục đại học'),
                    e('span', { className: 'px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm' }, '8610 - Hoạt động bệnh viện'),
                    e('span', { className: 'px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm' }, '2910 - Sản xuất ô tô')
                ),
                e('p', { className: 'text-xs text-gray-500 mt-3 flex items-center gap-2' },
                    e('i', { className: 'fas fa-star text-yellow-500 text-[10px]' }),
                    'Ngành nghề kinh doanh chính'
                )
            )
        )
    );
};
