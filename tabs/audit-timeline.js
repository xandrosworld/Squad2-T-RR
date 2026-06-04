// =====================================================
// SHARED: AuditTimeline - Component dùng chung cho log/audit
// Dùng trong: Quan hệ TCTD ĐKUN, Tài liệu tín dụng, Phê duyệt, Hội đồng
// =====================================================

(function() {
    const e = React.createElement;

    // ===== Helper: tạo timestamp giả =====
    window.AuditHelpers = {
        now: function() {
            var d = new Date();
            return d.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
        },
        mockTimestamp: function(daysAgo) {
            var d = new Date();
            d.setDate(d.getDate() - (daysAgo || 0));
            return d.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
        },
        showToast: function(message, type) {
            // Tạo toast element
            var toast = document.createElement('div');
            toast.className = 'fixed top-4 right-4 z-[9999] px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 text-sm font-medium transition-all';
            toast.style.animation = 'slideDown 0.3s ease';

            if (type === 'error') {
                toast.className += ' bg-red-600 text-white';
                toast.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
            } else if (type === 'warning') {
                toast.className += ' bg-orange-500 text-white';
                toast.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ' + message;
            } else {
                toast.className += ' bg-green-600 text-white';
                toast.innerHTML = '<i class="fas fa-check-circle"></i> ' + message;
            }

            document.body.appendChild(toast);
            setTimeout(function() {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(-20px)';
                toast.style.transition = 'all 0.3s ease';
                setTimeout(function() { document.body.removeChild(toast); }, 300);
            }, 3000);
        },
        addLogEntry: function(logArray, action, user, detail) {
            var entry = {
                id: Date.now(),
                thoiGian: window.AuditHelpers.now(),
                nguoiThaoTac: user || 'Nguyễn Châu Giang (159420)',
                hanhDong: action,
                buocXuLy: 'Lập BCTĐRR',
                noiDung: detail || ''
            };
            return [entry].concat(logArray || []);
        }
    };

    // ===== AuditTimeline Component =====
    window.AuditTimeline = function AuditTimeline(props) {
        var logs = props.logs || [];
        var title = props.title || 'Lịch sử thao tác';
        var onClose = props.onClose;

        return e('div', {
            className: 'fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4',
            onClick: function(ev) { if (ev.target === ev.currentTarget && onClose) onClose(); }
        },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col' },
                // Header
                e('div', { className: 'flex items-center justify-between px-5 py-4 border-b border-gray-200' },
                    e('div', { className: 'flex items-center gap-3' },
                        e('div', { className: 'w-9 h-9 bg-[#006B68]/10 rounded-lg flex items-center justify-center' },
                            e('i', { className: 'fas fa-history text-[#006B68]' })
                        ),
                        e('h3', { className: 'font-semibold text-gray-800' }, title)
                    ),
                    onClose && e('button', {
                        className: 'w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600',
                        onClick: onClose
                    }, e('i', { className: 'fas fa-times' }))
                ),
                // Body - Timeline
                e('div', { className: 'flex-1 overflow-auto p-5' },
                    logs.length === 0
                        ? e('div', { className: 'text-center py-10' },
                            e('div', { className: 'w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3' },
                                e('i', { className: 'fas fa-inbox text-gray-300 text-xl' })
                            ),
                            e('p', { className: 'text-sm text-gray-400' }, 'Chưa có lịch sử thao tác')
                          )
                        : e('div', { className: 'relative' },
                            // Timeline line
                            e('div', { className: 'absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200' }),
                            // Timeline entries
                            logs.map(function(log, idx) {
                                var isFirst = idx === 0;
                                var dotColor = isFirst ? 'bg-[#006B68]' : 'bg-gray-300';
                                return e('div', { key: log.id || idx, className: 'relative pl-10 pb-5' },
                                    // Dot
                                    e('div', { className: 'absolute left-2.5 top-1 w-3 h-3 rounded-full border-2 border-white ' + dotColor }),
                                    // Content
                                    e('div', { className: 'bg-gray-50 rounded-lg p-3 border border-gray-100' },
                                        e('div', { className: 'flex items-center justify-between mb-1.5' },
                                            e('span', { className: 'text-xs font-semibold text-gray-800' }, log.hanhDong),
                                            e('span', { className: 'text-xs text-gray-400' }, log.thoiGian)
                                        ),
                                        e('div', { className: 'flex items-center gap-4 text-xs text-gray-500' },
                                            e('span', null, e('i', { className: 'fas fa-user text-[10px] mr-1' }), log.nguoiThaoTac),
                                            log.buocXuLy && e('span', null, e('i', { className: 'fas fa-layer-group text-[10px] mr-1' }), log.buocXuLy)
                                        ),
                                        log.noiDung && e('p', { className: 'text-xs text-gray-600 mt-1.5 bg-white rounded p-2 border border-gray-100' }, log.noiDung)
                                    )
                                );
                            })
                          )
                ),
                // Footer
                e('div', { className: 'px-5 py-3 border-t border-gray-100 flex justify-between items-center' },
                    e('span', { className: 'text-xs text-gray-400' }, 'Tổng: ' + logs.length + ' thao tác'),
                    onClose && e('button', {
                        className: 'px-4 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200',
                        onClick: onClose
                    }, 'Đóng')
                )
            )
        );
    };

    // ===== Default mock log data for demo =====
    window.MOCK_AUDIT_LOGS = [
        { id: 1, thoiGian: '14:30 04/06/2026', nguoiThaoTac: 'Nguyễn Châu Giang (159420)', hanhDong: 'Cập nhật đánh giá ĐKUN', buocXuLy: 'Lập BCTĐRR', noiDung: 'Cập nhật kết quả đánh giá điều kiện "Duy trì tỷ lệ nợ/VCSH ≤ 3" thành "Đã đánh giá đầy đủ"' },
        { id: 2, thoiGian: '10:15 04/06/2026', nguoiThaoTac: 'Trần Văn Bình (159421)', hanhDong: 'Upload file đánh giá', buocXuLy: 'Lập BCTĐRR', noiDung: 'Tải lên file BCTC_Q4_2025.pdf' },
        { id: 3, thoiGian: '09:00 03/06/2026', nguoiThaoTac: 'Nguyễn Châu Giang (159420)', hanhDong: 'Tra cứu CIC', buocXuLy: 'Lập BCTĐRR', noiDung: 'Tra cứu CIC cho KH TỔNG CÔNG TY ĐIỆN LỰC VN - CIF: 297' },
        { id: 4, thoiGian: '16:45 02/06/2026', nguoiThaoTac: 'Lê Hoàng Nam (159422)', hanhDong: 'Đồng bộ XHTD', buocXuLy: 'Lập BCTĐRR', noiDung: 'Đồng bộ dữ liệu xếp hạng tín dụng từ hệ thống' },
        { id: 5, thoiGian: '11:30 01/06/2026', nguoiThaoTac: 'Nguyễn Châu Giang (159420)', hanhDong: 'Tạo hồ sơ', buocXuLy: 'Lập BCTĐRR', noiDung: 'Khởi tạo hồ sơ thẩm định rủi ro TD-120-25-52656565' }
    ];

})();
