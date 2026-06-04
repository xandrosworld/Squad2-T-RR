// =====================================================
// Tab: Khoản tín dụng - RM Version
// =====================================================

window.TabKhoangTinDung = function () {
    const e = React.createElement;
    const [expandedRows, setExpandedRows] = React.useState([1]);
    const [showCommitmentDetail, setShowCommitmentDetail] = React.useState(false);
    const [selectedCommitment, setSelectedCommitment] = React.useState(null);
    const [expandedDetailSections, setExpandedDetailSections] = React.useState(['thongTinChung', 'thoiHan', 'mucDich']);
    const [isEditingCommitment, setIsEditingCommitment] = React.useState(false);
    const [isCreatingNew, setIsCreatingNew] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
    const [deleteTargetId, setDeleteTargetId] = React.useState(null);

    // Data cho Cấu trúc tín dụng - format đơn giản VND
    const [creditData, setCreditData] = React.useState([
        {
            id: 1,
            stt: 1,
            name: 'HMTD 2025-2026',
            soTienDeXuat: '10,500,000,000',
            soTienDaDuyet: '10,500,000,000',
            thoiHan: { deXuat: '12 tháng', daDuyet: '10 tháng' },
            soDu: '',
            children: [
                { id: 11, name: 'Hạn mức vay', soTienDeXuat: '5,500,000,000', soTienDaDuyet: '5,500,000,000', thoiHan: { deXuat: '12 tháng', daDuyet: '10 tháng' }, soDu: '' },
                { id: 12, name: 'Hạn mức bảo lãnh', soTienDeXuat: '5,000,000,000', soTienDaDuyet: '5,000,000,000', thoiHan: { deXuat: '12 tháng', daDuyet: '12 tháng' }, soDu: '' }
            ]
        }
    ]);

    // State cho Giới hạn tín dụng
    const [gioiHanThuCong, setGioiHanThuCong] = React.useState({
        ghtdKhongGom: '480,000,000,000',
        ghdtBaoDam: '95,000,000,000'
    });
    const [gioiHanHeThong, setGioiHanHeThong] = React.useState({
        ghtdKhongGom: '480,000,000,000',
        ghdtBaoDam: '95,000,000,000'
    });

    // Hàm tính toán
    const handleTinhToan = () => {
        const randomValue1 = (Math.floor(Math.random() * 100) + 400).toString() + ',000,000,000';
        const randomValue2 = (Math.floor(Math.random() * 50) + 80).toString() + ',000,000,000';
        setGioiHanHeThong({
            ghtdKhongGom: randomValue1,
            ghdtBaoDam: randomValue2
        });
        setGioiHanThuCong({
            ghtdKhongGom: randomValue1,
            ghdtBaoDam: randomValue2
        });
    };

    const toggleRow = (id) => {
        if (expandedRows.includes(id)) {
            setExpandedRows(expandedRows.filter(r => r !== id));
        } else {
            setExpandedRows([...expandedRows, id]);
        }
    };

    // Hàm xóa commitment
    const handleDelete = (id) => {
        setCreditData(prevData => {
            // Xóa ở level parent
            const filteredParent = prevData.filter(item => item.id !== id);
            // Xóa ở level children
            return filteredParent.map(item => ({
                ...item,
                children: item.children ? item.children.filter(child => child.id !== id) : []
            }));
        });
        setShowDeleteConfirm(false);
        setDeleteTargetId(null);
        setSuccessMessage('Đã xóa commitment thành công');
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    // Hàm tạo mới commitment
    const handleCreateNew = () => {
        setSelectedCommitment(null);
        setIsCreatingNew(true);
        setIsEditingCommitment(true);
        setShowCommitmentDetail(true);
    };

    // Render table row
    const renderRow = (item, isChild = false) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedRows.includes(item.id);

        return e(React.Fragment, { key: item.id },
            e('tr', { className: 'border-t border-gray-200 hover:bg-gray-50' },
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
                    e('span', { className: 'text-sm text-gray-800' }, item.soTienDeXuat + ' VND')
                ),
                e('td', { className: 'px-3 py-3 text-right' },
                    e('span', { className: 'text-sm text-gray-800' }, item.soTienDaDuyet + ' VND')
                ),
                e('td', { className: 'px-3 py-3 text-sm text-gray-600 text-center' }, item.thoiHan.deXuat),
                e('td', { className: 'px-3 py-3 text-sm text-gray-600 text-center' }, item.thoiHan.daDuyet),
                e('td', { className: 'px-3 py-3 text-sm text-gray-600 text-right' }, item.soDu || '—'),
                // Actions: Sửa, Xóa, Hủy
                e('td', { className: 'px-3 py-3' },
                    e('div', { className: 'flex items-center justify-center gap-2' },
                        // Icon Bút - Sửa
                        e('button', {
                            className: 'w-7 h-7 flex items-center justify-center text-[#006B68] hover:bg-[#e6f4f1] rounded transition-colors',
                            onClick: () => {
                                setSelectedCommitment(item);
                                setIsCreatingNew(false);
                                setIsEditingCommitment(true);
                                setShowCommitmentDetail(true);
                            },
                            title: 'Chỉnh sửa'
                        },
                            e('i', { className: 'fas fa-pen text-sm' })
                        ),
                        // Icon Thùng rác - Xóa
                        e('button', {
                            className: 'w-7 h-7 flex items-center justify-center text-red-500 hover:bg-red-50 rounded transition-colors',
                            onClick: () => { setDeleteTargetId(item.id); setShowDeleteConfirm(true); },
                            title: 'Xóa'
                        },
                            e('i', { className: 'fas fa-trash text-sm' })
                        ),
                        // Icon X - Hủy
                        e('button', {
                            className: 'w-7 h-7 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded transition-colors',
                            onClick: () => {
                                setSuccessMessage('Đã hủy commitment: ' + item.name);
                                setTimeout(() => setSuccessMessage(null), 3000);
                            },
                            title: 'Hủy'
                        },
                            e('i', { className: 'fas fa-times text-sm' })
                        )
                    )
                )
            ),
            isExpanded && hasChildren && item.children.map(child =>
                renderRow({ ...child, stt: '' }, true)
            )
        );
    };

    // ==================
    // MAIN LAYOUT
    // ==================
    return e('div', { className: 'credit-tab space-y-5' },
        // Header
        e('div', { className: 'flex items-center justify-between' },
            e('h2', { className: 'text-xl font-bold text-gray-800' }, 'Khoản tín dụng'),
            e('button', { className: 'btn btn-primary' },
                e('i', { className: 'far fa-save text-xs' }), ' Lưu'
            )
        ),

        // ===== Cấu trúc tín dụng =====
        e('div', { className: 'bg-white rounded-lg border border-gray-200 p-4' },
            // Header với nút Tạo mới
            e('div', { className: 'flex items-center justify-between mb-3' },
                e('h5', { className: 'text-sm font-semibold text-gray-700 flex items-center gap-2' },
                    e('span', { className: 'w-2 h-2 bg-[#006B68] rounded-full' }),
                    'Cấu trúc tín dụng'
                ),
                e('button', {
                    className: 'px-3 py-1.5 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005a57] flex items-center gap-2 transition-colors',
                    onClick: handleCreateNew
                },
                    e('i', { className: 'fas fa-plus text-xs' }),
                    'Tạo mới commitment'
                )
            ),
            e('div', { className: 'overflow-x-auto border border-gray-200 rounded-lg' },
                e('table', { className: 'w-full text-sm' },
                    e('thead', { className: 'bg-gray-50' },
                        e('tr', null,
                            e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600 w-12' }, 'STT'),
                            e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600' }, 'Tên Commitment'),
                            e('th', { className: 'px-3 py-2 text-right font-medium text-gray-600' }, 'Đề xuất (VND)'),
                            e('th', { className: 'px-3 py-2 text-right font-medium text-gray-600' }, 'Số tiền đã duyệt'),
                            e('th', { className: 'px-3 py-2 text-center font-medium text-gray-600' }, 'Đề xuất'),
                            e('th', { className: 'px-3 py-2 text-center font-medium text-gray-600' }, 'Đã duyệt'),
                            e('th', { className: 'px-3 py-2 text-right font-medium text-gray-600' }, 'Số dư (VND)'),
                            e('th', { className: 'px-3 py-2 text-center font-medium text-gray-600 w-32' }, 'Thao tác')
                        )
                    ),
                    e('tbody', null,
                        creditData.map(item => renderRow(item, false))
                    )
                )
            )
        ),

        // ===== Giới hạn tín dụng của khách hàng =====
        e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
            e('div', { className: 'bg-[#006B68] px-4 py-3' },
                e('h4', { className: 'text-white font-semibold' }, 'Giới hạn tín dụng của khách hàng')
            ),
            e('div', { className: 'p-4' },
                e('div', { className: 'grid grid-cols-2 gap-6' },
                    // Tính toán thủ công - editable
                    e('div', { className: 'bg-gray-50 rounded-lg p-4' },
                        e('h6', { className: 'text-sm font-medium text-gray-700 mb-3' }, 'Tính toán thủ công'),
                        e('div', { className: 'grid grid-cols-2 gap-3 mb-3' },
                            e('div', null,
                                e('label', { className: 'block text-xs text-gray-600 mb-1' }, 'GHTD không gồm TD bảo đảm 100% TG,GTCG *'),
                                e('div', { className: 'flex' },
                                    e('input', {
                                        type: 'text',
                                        className: 'flex-1 px-2 py-1.5 border border-gray-300 rounded-l text-sm',
                                        value: gioiHanThuCong.ghtdKhongGom,
                                        onChange: (ev) => setGioiHanThuCong({ ...gioiHanThuCong, ghtdKhongGom: ev.target.value })
                                    }),
                                    e('span', { className: 'px-2 py-1.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r text-xs text-gray-500' }, 'VND')
                                )
                            ),
                            e('div', null,
                                e('label', { className: 'block text-xs text-gray-600 mb-1' }, 'GHDT bảo đảm 100% TG,GTCG *'),
                                e('div', { className: 'flex' },
                                    e('input', {
                                        type: 'text',
                                        className: 'flex-1 px-2 py-1.5 border border-gray-300 rounded-l text-sm',
                                        value: gioiHanThuCong.ghdtBaoDam,
                                        onChange: (ev) => setGioiHanThuCong({ ...gioiHanThuCong, ghdtBaoDam: ev.target.value })
                                    }),
                                    e('span', { className: 'px-2 py-1.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r text-xs text-gray-500' }, 'VND')
                                )
                            )
                        ),
                        e('div', null,
                            e('label', { className: 'block text-xs text-gray-600 mb-1' }, 'Diễn giải'),
                            e('textarea', { className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm', rows: 2, placeholder: 'Nhập diễn giải về cách tính giới hạn tín dụng' })
                        )
                    ),
                    // Hệ thống gợi ý
                    e('div', { className: 'bg-orange-50 rounded-lg p-4 border border-orange-200' },
                        e('h6', { className: 'text-sm font-medium text-gray-700 mb-3' }, 'Hệ thống gợi ý'),
                        e('div', { className: 'grid grid-cols-2 gap-3 mb-3' },
                            e('div', null,
                                e('label', { className: 'block text-xs text-gray-600 mb-1' }, 'GHTD không gồm TD bảo đảm 100% TG,GTCG'),
                                e('div', { className: 'px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-700' }, gioiHanHeThong.ghtdKhongGom + ' VND')
                            ),
                            e('div', null,
                                e('label', { className: 'block text-xs text-gray-600 mb-1' }, 'GHDT bảo đảm 100% TG,GTCG'),
                                e('div', { className: 'px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-700' }, gioiHanHeThong.ghdtBaoDam + ' VND')
                            )
                        ),
                        e('button', {
                            className: 'btn btn-primary w-full',
                            onClick: handleTinhToan
                        },
                            e('i', { className: 'fas fa-sync-alt text-xs' }), ' Tính toán'
                        )
                    )
                )
            )
        ),

        // Modal xác nhận xóa
        showDeleteConfirm && e('div', { className: 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center' },
            e('div', { className: 'bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 p-5' },
                e('div', { className: 'text-center mb-4' },
                    e('div', { className: 'w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3' },
                        e('i', { className: 'fas fa-exclamation-triangle text-red-500 text-xl' })
                    ),
                    e('h3', { className: 'text-lg font-semibold text-gray-800 mb-2' }, 'Xác nhận xóa'),
                    e('p', { className: 'text-sm text-gray-600' }, 'Bạn có chắc chắn muốn xóa commitment này? Hành động này không thể hoàn tác.')
                ),
                e('div', { className: 'flex gap-3' },
                    e('button', {
                        className: 'flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50',
                        onClick: () => { setShowDeleteConfirm(false); setDeleteTargetId(null); }
                    }, 'Hủy'),
                    e('button', {
                        className: 'flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600',
                        onClick: () => handleDelete(deleteTargetId)
                    }, 'Xóa')
                )
            )
        ),

        // Toast thông báo thành công
        successMessage && e('div', {
            className: 'fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 z-50'
        },
            e('span', { className: 'w-6 h-6 bg-[#006B68] rounded-full flex items-center justify-center' },
                e('i', { className: 'fas fa-check text-white text-xs' })
            ),
            e('span', { className: 'text-sm text-gray-800' }, successMessage),
            e('button', {
                className: 'ml-2 text-gray-400 hover:text-gray-600',
                onClick: () => setSuccessMessage(null)
            },
                e('i', { className: 'fas fa-times text-xs' })
            )
        ),

        // Modal Chi tiết Commitment (Tạo mới / Chỉnh sửa)
        showCommitmentDetail && renderCommitmentDetailModal()
    );

    // Hàm render modal chi tiết commitment
    function renderCommitmentDetailModal() {
        const toggleDetailSection = (id) => {
            if (expandedDetailSections.includes(id)) {
                setExpandedDetailSections(expandedDetailSections.filter(s => s !== id));
            } else {
                setExpandedDetailSections([...expandedDetailSections, id]);
            }
        };

        const renderDetailSection = (id, icon, title, content) => {
            const isOpen = expandedDetailSections.includes(id);
            return e('div', { className: 'border border-gray-200 rounded-lg mb-4' },
                e('div', {
                    className: 'px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50',
                    onClick: () => toggleDetailSection(id)
                },
                    e('h3', { className: 'text-sm font-semibold text-gray-800 flex items-center gap-2' },
                        e('span', { className: 'text-base' }, icon), title
                    ),
                    e('i', { className: 'fas fa-chevron-' + (isOpen ? 'up' : 'down') + ' text-gray-400 text-xs' })
                ),
                isOpen && e('div', { className: 'px-4 pb-4' }, content)
            );
        };

        // Helper: render field - readonly hoặc editable
        const renderField = (label, value, isHighlight = false) => {
            const displayValue = isCreatingNew ? '' : value;
            return e('div', null,
                e('p', { className: 'text-xs text-gray-500 mb-1' }, label),
                isEditingCommitment ?
                    e('input', {
                        type: 'text',
                        className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm ' + (isHighlight ? 'font-bold text-[#006B68]' : ''),
                        defaultValue: displayValue,
                        placeholder: isCreatingNew ? 'Nhập giá trị...' : ''
                    }) :
                    e('p', { className: 'text-sm ' + (isHighlight ? 'font-bold text-[#006B68]' : 'font-medium') }, value)
            );
        };

        // Helper: render select field
        const renderSelectField = (label, options, defaultValue) => {
            const displayValue = isCreatingNew ? '' : defaultValue;
            return e('div', null,
                e('p', { className: 'text-xs text-gray-500 mb-1' }, label),
                isEditingCommitment ?
                    e('select', {
                        className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-white',
                        defaultValue: displayValue
                    },
                        isCreatingNew && e('option', { value: '' }, '-- Chọn --'),
                        options.map(opt => e('option', { key: opt.value, value: opt.value }, opt.label))
                    ) :
                    e('p', { className: 'text-sm font-medium' }, defaultValue)
            );
        };

        return e('div', { className: 'fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 overflow-auto' },
            e('div', { className: 'bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto' },
                // Header
                e('div', { className: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10' },
                    e('div', { className: 'flex items-center gap-3' },
                        isCreatingNew ?
                            e('span', { className: 'text-base font-semibold text-gray-800' }, '✨ Tạo mới Commitment') :
                            e('span', { className: 'text-sm text-gray-600' }, 'ID: ' + (selectedCommitment?.id || '293940xyd'))
                    ),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: () => { setShowCommitmentDetail(false); setIsEditingCommitment(false); setIsCreatingNew(false); }
                    },
                        e('i', { className: 'fas fa-times text-lg' })
                    )
                ),

                // Content
                e('div', { className: 'p-6' },
                    // Thông tin chung
                    renderDetailSection('thongTinChung', '📄', 'Thông tin chung',
                        e('div', { className: 'space-y-4' },
                            e('div', { className: 'grid grid-cols-3 gap-4' },
                                renderField('Số thứ tự', isCreatingNew ? '' : '1'),
                                renderField('Số Commitment trên Core', isCreatingNew ? '' : '84738473'),
                                renderField('Mã - Tên sản phẩm (Core)', isCreatingNew ? '' : 'Hạn mức tín dụng tin chấp tiêu dùng')
                            ),
                            e('div', { className: 'grid grid-cols-2 gap-4' },
                                renderField('Tên Commitment', isCreatingNew ? '' : (selectedCommitment?.name || 'Hạn mức vay')),
                                renderField('Tên sản phẩm', isCreatingNew ? '' : 'Hạn mức tổng của khách hàng')
                            ),
                            e('div', { className: 'bg-gray-50 rounded-lg p-4 grid grid-cols-3 gap-4' },
                                renderField('Số tiền cấp tín dụng', isCreatingNew ? '' : ((selectedCommitment?.soTienDeXuat || '0') + ' VND'), true),
                                renderField('Số tiền quy đổi', isCreatingNew ? '' : '-'),
                                renderField('Số tiền đã phê duyệt', isCreatingNew ? '' : ((selectedCommitment?.soTienDaDuyet || '0') + ' VND'), true)
                            ),
                            e('div', { className: 'grid grid-cols-3 gap-4' },
                                renderField('Tỷ lệ tài sản bảo đảm', isCreatingNew ? '' : '10 %'),
                                renderField('% Trọng số rủi ro', isCreatingNew ? '' : '120%'),
                                renderField('Chi nhánh', isCreatingNew ? '' : 'Sở Giao dịch 1 - Hà Nội')
                            ),
                            e('div', { className: 'grid grid-cols-3 gap-4' },
                                renderSelectField('Quay vòng', [{ value: 'co', label: 'Có' }, { value: 'khong', label: 'Không' }], 'Có'),
                                renderSelectField('Chia sẻ', [{ value: 'co', label: 'Có' }, { value: 'khong', label: 'Không' }], 'Không'),
                                renderSelectField('Bảo đảm 100% TG, GTCG BIDV', [{ value: 'co', label: 'Có' }, { value: 'khong', label: 'Không' }], 'Không')
                            )
                        )
                    ),

                    // Thời hạn
                    renderDetailSection('thoiHan', '⏱️', 'Thời hạn',
                        e('div', { className: 'space-y-4' },
                            e('div', { className: 'grid grid-cols-2 gap-4' },
                                renderField('Thời hạn cấp tín dụng', isCreatingNew ? '' : '10 tháng'),
                                renderSelectField('Loại ngày', [
                                    { value: 'giai_ngan', label: 'Ngày giải ngân đầu tiên' },
                                    { value: 'ky_hop_dong', label: 'Ngày ký hợp đồng' }
                                ], 'Ngày giải ngân đầu tiên')
                            ),
                            e('div', { className: 'grid grid-cols-2 gap-4' },
                                renderField('Ngày hết hạn', isCreatingNew ? '' : '10/10/2025'),
                                renderSelectField('Thời hạn hiệu lực bảo lãnh', [
                                    { value: 'xac_dinh', label: 'Xác định' },
                                    { value: 'khong_xac_dinh', label: 'Không xác định' }
                                ], 'Xác định')
                            ),
                            e('div', { className: 'bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4' },
                                renderField('Thời hạn', isCreatingNew ? '' : '12 tháng kể từ ngày cấp'),
                                renderField('Loại ngày', isCreatingNew ? '' : 'Tiền tạm ứng về tài khoản KH mở tại BIDV')
                            ),
                            e('div', { className: 'grid grid-cols-2 gap-4' },
                                renderField('Thời hạn ân hạn', isCreatingNew ? '' : '12 tháng'),
                                renderField('Thời hạn rút vốn', isCreatingNew ? '' : '12 tháng')
                            )
                        )
                    ),

                    // Mục đích
                    renderDetailSection('mucDich', '🎯', 'Mục đích',
                        e('div', { className: 'space-y-4' },
                            e('div', { className: 'grid grid-cols-3 gap-4' },
                                renderField('Mã ngành cấp 1', isCreatingNew ? '' : 'A'),
                                renderField('Mã ngành cấp 2', isCreatingNew ? '' : '079584'),
                                renderField('Mã ngành cấp 3', isCreatingNew ? '' : '12468')
                            ),
                            renderField('Mục đích cấp tín dụng', isCreatingNew ? '' : 'F1 - Xây dựng công trình đường sắt, đường bộ'),
                            renderField('Mô tả', isCreatingNew ? '' : 'Phục vụ mục đích kinh doanh...')
                        )
                    ),

                    // Lãi suất, phí
                    renderDetailSection('laiSuat', '📊', 'Lãi suất, phí',
                        renderField('Quy định', isCreatingNew ? '' : 'Theo quy định của BIDV từng thời kỳ')
                    ),

                    // Kỳ hạn trả gốc & lãi
                    renderDetailSection('kyHan', '📅', 'Kỳ hạn trả gốc & lãi',
                        e('div', { className: 'grid grid-cols-2 gap-4' },
                            renderSelectField('Loại hình trả nợ', [
                                { value: '1_lan', label: 'Trả nợ 1 lần tại thời điểm đáo hạn' },
                                { value: 'dinh_ky', label: 'Trả nợ định kỳ' }
                            ], 'Trả nợ 1 lần tại thời điểm đáo hạn'),
                            renderField('Tần suất trả gốc', isCreatingNew ? '' : '1 tháng'),
                            renderField('Tần suất trả lãi', isCreatingNew ? '' : '1 tháng'),
                            renderField('Ngày bắt đầu trả nợ', isCreatingNew ? '' : '01/01/2026')
                        )
                    )
                ),

                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white' },
                    e('button', {
                        className: 'btn btn-outline',
                        onClick: () => { setShowCommitmentDetail(false); setIsEditingCommitment(false); setIsCreatingNew(false); }
                    },
                        e('i', { className: 'fas fa-times text-xs' }), ' Hủy'
                    ),
                    e('button', {
                        className: 'btn btn-primary',
                        onClick: () => {
                            if (isCreatingNew) {
                                // Tạo mới commitment
                                const newId = Date.now();
                                const newCommitment = {
                                    id: newId,
                                    stt: creditData.length + 1,
                                    name: 'Commitment mới',
                                    soTienDeXuat: '0',
                                    soTienDaDuyet: '0',
                                    thoiHan: { deXuat: '12 tháng', daDuyet: '12 tháng' },
                                    soDu: '',
                                    children: []
                                };
                                setCreditData([...creditData, newCommitment]);
                                setSuccessMessage('Đã tạo mới commitment thành công');
                            } else {
                                setSuccessMessage('Đã chỉnh sửa commitment: ' + (selectedCommitment?.name || 'ID: 293940xyd'));
                            }
                            setIsEditingCommitment(false);
                            setShowCommitmentDetail(false);
                            setIsCreatingNew(false);
                            setTimeout(() => setSuccessMessage(null), 3000);
                        }
                    },
                        e('i', { className: 'far fa-save text-xs' }), isCreatingNew ? ' Tạo mới' : ' Lưu'
                    )
                )
            )
        );
    }
};
