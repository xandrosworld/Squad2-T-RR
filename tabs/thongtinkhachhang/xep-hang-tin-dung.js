// =====================================================
// Tab: Xếp hạng tín dụng nội bộ
// =====================================================

window.TabXepHangTinDung = function () {
    const e = React.createElement;

    // States
    const [lichSuCollapsed, setLichSuCollapsed] = React.useState(false);
    const [danhGiaXepHang, setDanhGiaXepHang] = React.useState('chinh-xac');
    const [yKienChuaChinhXac, setYKienChuaChinhXac] = React.useState('');

    // Dữ liệu lịch sử xếp hạng
    const lichSuXepHang = [
        { ngay: '15/11/2025', xepHang: 'A+', kyBaoCao: 'Q1/2024 Soát xét - Riêng lẻ', donVi: 'Chi nhánh SGD1', canBo: 'Nguyễn Văn B', trangThai: 'de-xuat' },
        { ngay: '15/11/2025', xepHang: 'A+', kyBaoCao: 'Q4/2024 Nội bộ - Hợp nhất', donVi: 'Chi nhánh SGD1', canBo: 'Nguyễn Văn A', trangThai: 'phe-duyet' },
        { ngay: '15/11/2025', xepHang: 'A', kyBaoCao: 'Q2/2023 Nội bộ - Riêng lẻ', donVi: 'Chi nhánh Đông Đô', canBo: 'Nguyễn Trần Văn Anh Thư Hồng', trangThai: 'phe-duyet' },
        { ngay: '15/11/2025', xepHang: 'A+', kyBaoCao: 'Q1/2023 Nội bộ - Hợp nhất', donVi: 'Chi nhánh HCM', canBo: 'Lưu Mai Thu Thảo', trangThai: 'phe-duyet' },
        { ngay: '15/11/2025', xepHang: 'A-', kyBaoCao: 'Q1/2022 Nội bộ - Hợp nhất', donVi: 'Chi nhánh HN', canBo: 'Nguyễn Văn B', trangThai: 'phe-duyet' }
    ];

    // Render badge trạng thái
    const renderTrangThai = (trangThai) => {
        if (trangThai === 'de-xuat') {
            return e('span', { className: 'px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs font-medium' }, 'Đề xuất');
        }
        return e('span', { className: 'px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-medium' }, 'Đã phê duyệt');
    };

    // Render xếp hạng badge
    const renderXepHangBadge = (xepHang, size = 'large') => {
        const colors = {
            'A+': { bg: 'bg-green-500', text: 'text-white' },
            'A': { bg: 'bg-green-400', text: 'text-white' },
            'A-': { bg: 'bg-lime-500', text: 'text-white' },
            'B+': { bg: 'bg-[#FFC62F]', text: 'text-gray-800' },
            'B': { bg: 'bg-yellow-500', text: 'text-white' },
            'C': { bg: 'bg-orange-500', text: 'text-white' }
        };
        const color = colors[xepHang] || { bg: 'bg-gray-400', text: 'text-white' };
        const sizeClass = size === 'large' ? 'w-16 h-16 text-2xl' : 'w-8 h-8 text-sm';

        return e('div', { className: `${sizeClass} ${color.bg} ${color.text} rounded-lg flex items-center justify-center font-bold` }, xepHang);
    };

    return e('div', { className: 'space-y-4' },
        // Header
        e('div', { className: 'flex items-center justify-between' },
            e('div', { className: 'flex items-center gap-3' },
                e('h2', { className: 'text-lg font-bold text-gray-800' }, 'Xếp hạng tín dụng nội bộ'),
                e('button', { className: 'text-gray-400 hover:text-gray-600' },
                    e('i', { className: 'fas fa-sync-alt' })
                )
            ),
            e('button', { className: 'px-4 py-2 bg-[#006B68] text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#005B58]' },
                e('i', { className: 'fas fa-plus' }),
                'Tạo mới'
            )
        ),

        // Main content - 2 khối ngang
        e('div', { className: 'flex gap-4' },
            // Khối trái: Lịch sử xếp hạng (collapsible)
            e('div', {
                className: 'transition-all duration-300 ' + (lichSuCollapsed ? 'w-12' : 'w-2/5'),
                style: { minWidth: lichSuCollapsed ? '48px' : '300px' }
            },
                e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden h-full' },
                    // Header
                    e('div', {
                        className: 'bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer',
                        onClick: () => setLichSuCollapsed(!lichSuCollapsed)
                    },
                        !lichSuCollapsed && e('h4', { className: 'text-sm font-semibold text-gray-800 flex items-center gap-2' },
                            e('i', { className: 'fas fa-history text-gray-400' }),
                            'Lịch sử xếp hạng tín dụng nội bộ'
                        ),
                        e('button', { className: 'text-gray-400 hover:text-gray-600' },
                            e('i', { className: 'fas fa-chevron-' + (lichSuCollapsed ? 'right' : 'left') })
                        )
                    ),

                    // Content
                    !lichSuCollapsed && e('div', { className: 'p-0' },
                        e('table', { className: 'w-full text-xs' },
                            e('thead', null,
                                e('tr', { className: 'bg-gray-100' },
                                    e('th', { className: 'px-2 py-2 text-left font-medium text-gray-600' }, 'Ngày xếp hạng'),
                                    e('th', { className: 'px-2 py-2 text-center font-medium text-gray-600' }, 'Xếp hạng'),
                                    e('th', { className: 'px-2 py-2 text-left font-medium text-gray-600' }, 'Kỳ báo cáo tài chính'),
                                    e('th', { className: 'px-2 py-2 text-left font-medium text-gray-600' }, 'Đơn vị'),
                                    e('th', { className: 'px-2 py-2 text-left font-medium text-gray-600' }, 'Cán bộ thực hiện'),
                                    e('th', { className: 'px-2 py-2 text-center font-medium text-gray-600' }, 'Trạng thái')
                                )
                            ),
                            e('tbody', null,
                                lichSuXepHang.map((item, idx) =>
                                    e('tr', { key: idx, className: 'border-t border-gray-100 hover:bg-gray-50' },
                                        e('td', { className: 'px-2 py-2 text-gray-700' }, item.ngay),
                                        e('td', { className: 'px-2 py-2 text-center' },
                                            e('span', { className: 'px-2 py-0.5 bg-green-500 text-white rounded text-xs font-bold' }, item.xepHang)
                                        ),
                                        e('td', { className: 'px-2 py-2 text-gray-600' }, item.kyBaoCao),
                                        e('td', { className: 'px-2 py-2 text-gray-600' }, item.donVi),
                                        e('td', { className: 'px-2 py-2 text-gray-600 max-w-[100px] truncate', title: item.canBo }, item.canBo),
                                        e('td', { className: 'px-2 py-2 text-center' }, renderTrangThai(item.trangThai))
                                    )
                                )
                            )
                        ),
                        // Pagination
                        e('div', { className: 'px-3 py-2 border-t border-gray-200 flex items-center justify-between' },
                            e('div', { className: 'flex items-center gap-1' },
                                e('button', { className: 'w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600' },
                                    e('i', { className: 'fas fa-chevron-left text-xs' })
                                ),
                                e('span', { className: 'px-2 py-1 bg-[#006B68] text-white rounded text-xs' }, '1'),
                                e('button', { className: 'w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600' },
                                    e('i', { className: 'fas fa-chevron-right text-xs' })
                                )
                            ),
                            e('select', { className: 'text-xs border border-gray-300 rounded px-2 py-1' },
                                e('option', null, '10 /Trang')
                            )
                        )
                    )
                )
            ),

            // Khối phải: Kết quả xếp hạng gần nhất (khối chính)
            e('div', { className: 'flex-1' },
                e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                    e('div', { className: 'bg-[#006B68] px-4 py-3' },
                        e('h4', { className: 'text-white font-semibold flex items-center gap-2' },
                            e('i', { className: 'fas fa-star' }),
                            'Kết quả xếp hạng gần nhất'
                        )
                    ),
                    e('div', { className: 'p-6' },
                        e('div', { className: 'flex gap-6' },
                            // Xếp hạng badge lớn
                            e('div', { className: 'flex flex-col items-center' },
                                e('div', { className: 'w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg' },
                                    e('span', { className: 'text-4xl font-bold text-white' }, 'A+')
                                ),
                                e('span', { className: 'mt-2 text-xs text-gray-500' }, 'Kết quả xếp hạng')
                            ),

                            // Thông tin chi tiết
                            e('div', { className: 'flex-1 grid grid-cols-2 gap-4' },
                                e('div', null,
                                    e('label', { className: 'block text-xs text-gray-500 mb-1' }, 'Ngày xếp hạng'),
                                    e('div', { className: 'text-sm font-medium text-gray-800' }, '15/11/2024')
                                ),
                                e('div', null,
                                    e('label', { className: 'block text-xs text-gray-500 mb-1' }, 'Kỳ BCTC xếp hạng'),
                                    e('div', { className: 'text-sm font-medium text-gray-800' }, 'Q1/2024 Soát xét - Riêng lẻ')
                                ),
                                e('div', null,
                                    e('label', { className: 'block text-xs text-gray-500 mb-1' }, 'Trạng thái'),
                                    e('span', { className: 'px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs font-medium' }, 'Đề xuất')
                                ),
                                e('div', null,
                                    e('label', { className: 'block text-xs text-gray-500 mb-1' }, 'Đơn vị xếp hạng'),
                                    e('div', { className: 'text-sm font-medium text-gray-800' }, 'Chi nhánh Sở Giao Dịch 1')
                                ),
                                e('div', { className: 'col-span-2' },
                                    e('label', { className: 'block text-xs text-gray-500 mb-1' }, 'Cán bộ thực hiện'),
                                    e('div', { className: 'text-sm font-medium text-gray-800' }, 'Nguyễn Văn A')
                                )
                            )
                        )
                    )
                )
            )
        ),

        // Khối Ý kiến thẩm định rủi ro
        e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
            e('div', { className: 'bg-[#006B68] px-4 py-3' },
                e('h4', { className: 'text-white font-semibold' }, 'Ý kiến thẩm định rủi ro')
            ),
            e('div', { className: 'p-5 space-y-4' },
                // Đánh giá kết quả xếp hạng
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-3' }, 'Đánh giá kết quả xếp hạng tín dụng nội bộ'),
                    e('div', { className: 'flex items-center gap-6' },
                        e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                            e('input', {
                                type: 'radio',
                                name: 'danhGiaXepHang',
                                checked: danhGiaXepHang === 'chinh-xac',
                                onChange: () => setDanhGiaXepHang('chinh-xac'),
                                className: 'w-4 h-4 text-[#006B68]'
                            }),
                            e('span', { className: 'text-sm text-gray-700' }, 'Đã chính xác')
                        ),
                        e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                            e('input', {
                                type: 'radio',
                                name: 'danhGiaXepHang',
                                checked: danhGiaXepHang === 'chua-chinh-xac',
                                onChange: () => setDanhGiaXepHang('chua-chinh-xac'),
                                className: 'w-4 h-4 text-[#006B68]'
                            }),
                            e('span', { className: 'text-sm text-gray-700' }, 'Chưa chính xác')
                        )
                    )
                ),

                // Textarea khi chọn "Chưa chính xác"
                danhGiaXepHang === 'chua-chinh-xac' && e('div', { className: 'pt-2' },
                    e('textarea', {
                        className: 'w-full px-3 py-2 border border-[#006B68] rounded-lg text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                        placeholder: 'Nhập ý kiến...',
                        value: yKienChuaChinhXac,
                        onChange: (ev) => setYKienChuaChinhXac(ev.target.value)
                    })
                )
            )
        )
    );
};
