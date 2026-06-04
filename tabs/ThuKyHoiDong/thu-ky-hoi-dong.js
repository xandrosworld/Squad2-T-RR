// =====================================================
// Module: Thư ký Hội đồng (Council Secretary)
// =====================================================

(function () {
    const e = React.createElement;

    // =====================================================
    // MOCK DATA
    // =====================================================

    const MOCK_HOSO_DATA = [
        {
            id: 'HS001',
            soHoSo: 'TD-120-25-52656565',
            tenKH: 'Công ty CP Tập đoàn Hòa Phát',
            cif: '297',
            chiNhanh: 'Quang Trung',
            loaiHS: 'Cấp mới',
            soBCDX: 'BCDX-HP-2026-001',
            tongHanMuc: '1.250 tỷ VND',
            loaiNoiDungYKien: 'Phê duyệt cấp tín dụng',
            xhtd: 'AA',
            ngayTiepNhan: '15/01/2026',
            thamQuyen: 'HĐTDTƯ',
            trangThai: 'cho-xu-ly',
            buocXuLy: 'Xin ý kiến TVHĐ'
        },
        {
            id: 'HS002',
            soHoSo: 'TD-120-25-52656566',
            tenKH: 'Công ty CP Tập đoàn VinGroup',
            cif: '1234',
            chiNhanh: 'Sở Giao dịch 1',
            loaiHS: 'Tái cấp',
            soBCDX: 'BCDX-VG-2026-002',
            tongHanMuc: '2.500 tỷ VND',
            loaiNoiDungYKien: 'Phê duyệt cấp tín dụng',
            xhtd: 'AAA',
            ngayTiepNhan: '16/01/2026',
            ngayPhatHanhPYK: '17/01/2026 09:20',
            hanGuiPhieu: '20/01/2026 17:00',
            thamQuyen: 'HĐTDTƯ',
            trangThai: 'da-gui-pyk',
            buocXuLy: 'Chờ phản hồi TVHĐ'
        },
        {
            id: 'HS003',
            soHoSo: 'TD-120-25-52656567',
            tenKH: 'Công ty CP Thép Hòa Phát Dung Quất',
            cif: '990',
            chiNhanh: 'Hà Thành',
            loaiHS: 'Điều chỉnh',
            soBCDX: 'BCDX-HPT-2026-003',
            tongHanMuc: '800 tỷ VND',
            loaiNoiDungYKien: 'Phê duyệt khác biệt',
            xhtd: 'A',
            ngayTiepNhan: '10/01/2026',
            ngayPhatHanhPYK: '11/01/2026 10:00',
            hanGuiPhieu: '14/01/2026 17:00',
            thamQuyen: 'HĐTDTƯ',
            trangThai: 'hoan-tat',
            buocXuLy: 'Hoàn tất',
            ngayHoanTat: '22/01/2026',
            soQuyetDinh: 'QĐ-HĐTDTW-2026-003'
        }
    ];

    const MOCK_THANH_VIEN_HD = [
        { id: 'TV01', hoTen: 'Lê Đức Thọ', chucVu: 'Chủ tịch HĐTDTƯ', maNV: '100001', email: 'ldtho@bidv.com.vn' },
        { id: 'TV02', hoTen: 'Trần Long', chucVu: 'Phó TGĐ - Thành viên HĐTDTƯ', maNV: '100002', email: 'tlong@bidv.com.vn' },
        { id: 'TV03', hoTen: 'Nguyễn Thu Hà', chucVu: 'Giám đốc Khối QLRR - Thành viên HĐTDTƯ', maNV: '100003', email: 'ntha@bidv.com.vn' },
        { id: 'TV04', hoTen: 'Phạm Hoàng Long', chucVu: 'Giám đốc Ban TD - Thành viên HĐTDTƯ', maNV: '100004', email: 'phlong@bidv.com.vn' },
        { id: 'TV05', hoTen: 'Vũ Thị Mai Anh', chucVu: 'Giám đốc Ban QLRR - Thành viên HĐTDTƯ', maNV: '100005', email: 'vtmanh@bidv.com.vn' }
    ];

    const MOCK_NOIDUNG_DEXUAT = [
        {
            id: 1, group: 'Nội dung cấp tín dụng', items: [
                'Nội dung cấp tín dụng',
                'Số tiền, đồng tiền cấp tín dụng',
                'Mục đích cấp tín dụng',
                'Lãi suất/phí',
                'Thời hạn cấp tín dụng',
                'Kỳ hạn trả nợ'
            ]
        },
        { id: 2, group: 'Biện pháp bảo đảm', items: ['Biện pháp bảo đảm tiền vay'] },
        { id: 3, group: 'Các điều kiện tín dụng', items: ['Điều kiện giải ngân', 'Điều kiện sau giải ngân'] }
    ];

    // =====================================================
    // DASHBOARD - THƯ KÝ HỘI ĐỒNG
    // =====================================================

    function TKHDDashboard({ onSelectHoSo, onBack }) {
        const [activeTab, setActiveTab] = React.useState('cho-xu-ly');
        const [mode, setMode] = React.useState('vanBan');
        const [hopScreen, setHopScreen] = React.useState('list');
        const [searchText, setSearchText] = React.useState('');
        const [filters, setFilters] = React.useState({});
        const [attendanceChoice, setAttendanceChoice] = React.useState('Tham dự');
        const [absenceReason, setAbsenceReason] = React.useState('');
        const [preMeetingNote, setPreMeetingNote] = React.useState('');
        const [selectedDiscussionCase, setSelectedDiscussionCase] = React.useState('LH2025.000123');
        const [discussionMember, setDiscussionMember] = React.useState('Nguyễn Văn A');
        const [discussionOpinion, setDiscussionOpinion] = React.useState('');
        const [discussionGroup, setDiscussionGroup] = React.useState('ĐKTD');
        const [discussionConclusion, setDiscussionConclusion] = React.useState('');

        const tabs = [
            { id: 'cho-xu-ly', label: '1. Chưa phát hành Phiếu xin ý kiến', count: 12 },
            { id: 'da-gui-pyk', label: '2. Đang tổng hợp ý kiến TVHĐ', count: 7 },
            { id: 'hoan-tat', label: '3. Hoàn tất phê duyệt (Đã ra QĐ cấp tín dụng)', count: 18 }
        ];

        const listChuaPhatHanh = [
            Object.assign({}, MOCK_HOSO_DATA[0], { soHoSo: 'LH2025.000123', tenKH: 'CÔNG TY TNHH ABC', cif: 'KH00012345', sanPham: 'Vay trung dài hạn - Dự án đầu tư', tongHanMuc: '100.000.000.000 VND', ngayTiepNhan: '21/05/2025 09:15', nguoiXuLy: 'Phạm Văn C (CB0001) | Giám đốc TTTĐPD' }),
            { id: 'HS011', soHoSo: 'LH2025.000122', tenKH: 'CÔNG TY CP XYZ', cif: 'KH00054321', sanPham: 'Vay lưu động', tongHanMuc: '80.000.000.000 VND', chiNhanh: 'Trần Hưng Đạo (124)', ngayTiepNhan: '20/05/2025 16:40', nguoiXuLy: 'Lê Văn D (CB0002) | PGĐ TTTĐPD', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', trangThai: 'cho-xu-ly' },
            { id: 'HS012', soHoSo: 'LH2025.000121', tenKH: 'CÔNG TY TNHH DEF', cif: 'KH00067890', sanPham: 'Vay trung dài hạn - Máy móc TB', tongHanMuc: '65.000.000.000 VND', chiNhanh: 'Quang Trung (123)', ngayTiepNhan: '19/05/2025 11:20', nguoiXuLy: 'Trần Thị B (CB0003) | Phó TGĐ phụ trách TTTĐPD', loaiNoiDungYKien: 'Phê duyệt khác biệt', trangThai: 'cho-xu-ly' },
            { id: 'HS013', soHoSo: 'LH2025.000120', tenKH: 'CÔNG TY CP GHI', cif: 'KH00011111', sanPham: 'Cho vay từng lần', tongHanMuc: '50.000.000.000 VND', chiNhanh: 'Chiến Thắng (125)', ngayTiepNhan: '18/05/2025 10:05', nguoiXuLy: 'Phạm Văn C (CB0001) | Giám đốc TTTĐPD', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', trangThai: 'cho-xu-ly' },
            { id: 'HS014', soHoSo: 'LH2025.000119', tenKH: 'CÔNG TY TNHH JKL', cif: 'KH00022222', sanPham: 'Vay trung dài hạn - BĐS', tongHanMuc: '45.000.000.000 VND', chiNhanh: 'Quang Trung (123)', ngayTiepNhan: '17/05/2025 14:30', nguoiXuLy: 'Lê Văn D (CB0002) | PGĐ TTTĐPD', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', trangThai: 'cho-xu-ly' },
            { id: 'HS015', soHoSo: 'LH2025.000118', tenKH: 'CÔNG TY CP MNO', cif: 'KH00033333', sanPham: 'Vay lưu động', tongHanMuc: '35.000.000.000 VND', chiNhanh: 'Nguyễn Trãi (126)', ngayTiepNhan: '16/05/2025 09:50', nguoiXuLy: 'Trần Thị B (CB0003) | Phó TGĐ phụ trách TTTĐPD', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', trangThai: 'cho-xu-ly' },
            { id: 'HS016', soHoSo: 'LH2025.000117', tenKH: 'CÔNG TY TNHH PQR', cif: 'KH00044444', sanPham: 'Vay trung dài hạn - Dự án đầu tư', tongHanMuc: '30.000.000.000 VND', chiNhanh: 'Quang Trung (123)', ngayTiepNhan: '15/05/2025 13:25', nguoiXuLy: 'Phạm Văn C (CB0001) | Giám đốc TTTĐPD', loaiNoiDungYKien: 'Phê duyệt khác biệt', trangThai: 'cho-xu-ly' },
            { id: 'HS017', soHoSo: 'LH2025.000116', tenKH: 'CÔNG TY CP STU', cif: 'KH00055555', sanPham: 'Cho vay từng lần', tongHanMuc: '28.000.000.000 VND', chiNhanh: 'Lê Lợi (127)', ngayTiepNhan: '14/05/2025 10:10', nguoiXuLy: 'Lê Văn D (CB0002) | PGĐ TTTĐPD', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', trangThai: 'cho-xu-ly' },
            { id: 'HS018', soHoSo: 'LH2025.000115', tenKH: 'CÔNG TY TNHH VWX', cif: 'KH00066666', sanPham: 'Vay trung dài hạn - Xe thiết bị', tongHanMuc: '25.000.000.000 VND', chiNhanh: 'Quang Trung (123)', ngayTiepNhan: '13/05/2025 09:05', nguoiXuLy: 'Trần Thị B (CB0003) | Phó TGĐ phụ trách TTTĐPD', loaiNoiDungYKien: 'Phê duyệt khác biệt', trangThai: 'cho-xu-ly' },
            { id: 'HS019', soHoSo: 'LH2025.000114', tenKH: 'CÔNG TY CP YZA', cif: 'KH00077777', sanPham: 'Vay lưu động', tongHanMuc: '20.000.000.000 VND', chiNhanh: 'Trần Hưng Đạo (124)', ngayTiepNhan: '12/05/2025 15:30', nguoiXuLy: 'Phạm Văn C (CB0001) | Giám đốc TTTĐPD', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', trangThai: 'cho-xu-ly' }
        ];
        const listDangTongHop = [
            Object.assign({}, MOCK_HOSO_DATA[1], { soHoSo: 'LH2025.000113', tenKH: 'CÔNG TY TNHH BCD', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', ngayPhatHanhPYK: '21/05/2025 09:20', hanGuiPhieu: '25/05/2025', daPhanHoi: 4, chuaPhanHoi: 3, tyLe: 57, trangThaiLabel: 'Đang tổng hợp' }),
            { id: 'HS021', soHoSo: 'LH2025.000112', tenKH: 'CÔNG TY CP EFG', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', ngayPhatHanhPYK: '20/05/2025 16:30', hanGuiPhieu: '24/05/2025', daPhanHoi: 5, chuaPhanHoi: 2, tyLe: 71, trangThaiLabel: 'Quá hạn', trangThai: 'da-gui-pyk' },
            { id: 'HS022', soHoSo: 'LH2025.000111', tenKH: 'CÔNG TY TNHH HIJ', loaiNoiDungYKien: 'Phê duyệt khác biệt', ngayPhatHanhPYK: '19/05/2025 10:15', hanGuiPhieu: '23/05/2025', daPhanHoi: 3, chuaPhanHoi: 4, tyLe: 43, trangThaiLabel: 'Quá hạn', trangThai: 'da-gui-pyk' },
            { id: 'HS023', soHoSo: 'LH2025.000110', tenKH: 'CÔNG TY CP KLM', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', ngayPhatHanhPYK: '18/05/2025 09:45', hanGuiPhieu: '22/05/2025', daPhanHoi: 6, chuaPhanHoi: 1, tyLe: 86, trangThaiLabel: 'Quá hạn', trangThai: 'da-gui-pyk' },
            { id: 'HS024', soHoSo: 'LH2025.000109', tenKH: 'CÔNG TY TNHH NOP', loaiNoiDungYKien: 'Phê duyệt khác biệt', ngayPhatHanhPYK: '16/05/2025 14:20', hanGuiPhieu: '21/05/2025', daPhanHoi: 2, chuaPhanHoi: 5, tyLe: 29, trangThaiLabel: 'Quá hạn', trangThai: 'da-gui-pyk' },
            { id: 'HS025', soHoSo: 'LH2025.000108', tenKH: 'CÔNG TY CP QRS', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', ngayPhatHanhPYK: '15/05/2025 11:00', hanGuiPhieu: '20/05/2025', daPhanHoi: 4, chuaPhanHoi: 3, tyLe: 57, trangThaiLabel: 'Đang tổng hợp', trangThai: 'da-gui-pyk' },
            { id: 'HS026', soHoSo: 'LH2025.000107', tenKH: 'CÔNG TY TNHH TUV', loaiNoiDungYKien: 'Phê duyệt khác biệt', ngayPhatHanhPYK: '14/05/2025 09:30', hanGuiPhieu: '19/05/2025', daPhanHoi: 5, chuaPhanHoi: 2, tyLe: 71, trangThaiLabel: 'Đang tổng hợp', trangThai: 'da-gui-pyk' }
        ];
        const listHoanTat = [
            Object.assign({}, MOCK_HOSO_DATA[2], { soHoSo: 'LH2025.000105', tenKH: 'CÔNG TY CP BBB', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', ngayHoanTat: '18/05/2025 11:00', ngayBanHanhQD: '18/05/2025', soQuyetDinh: '122/QĐ-HĐTD', giaTriQD: '80.000.000.000 VND', trangThaiLabel: 'Đã ban hành' }),
            { id: 'HS031', soHoSo: 'LH2025.000104', tenKH: 'CÔNG TY TNHH CCC', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', ngayHoanTat: '17/05/2025 16:45', ngayBanHanhQD: '17/05/2025', soQuyetDinh: '121/QĐ-HĐTD', giaTriQD: '65.000.000.000 VND', trangThaiLabel: 'Đã ban hành', trangThai: 'hoan-tat' },
            { id: 'HS032', soHoSo: 'LH2025.000103', tenKH: 'CÔNG TY CP DDD', loaiNoiDungYKien: 'Phê duyệt khác biệt', ngayHoanTat: '16/05/2025 10:20', ngayBanHanhQD: '16/05/2025', soQuyetDinh: '120/QĐ-HĐTD', giaTriQD: '50.000.000.000 VND', trangThaiLabel: 'Đã ban hành', trangThai: 'hoan-tat' },
            { id: 'HS033', soHoSo: 'LH2025.000098', tenKH: 'CÔNG TY TNHH EEE', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', ngayHoanTat: '15/05/2025 14:10', ngayBanHanhQD: '15/05/2025', soQuyetDinh: '119/QĐ-HĐTD', giaTriQD: '45.000.000.000 VND', trangThaiLabel: 'Đã ban hành', trangThai: 'hoan-tat' },
            { id: 'HS034', soHoSo: 'LH2025.000097', tenKH: 'CÔNG TY CP FFF', loaiNoiDungYKien: 'Phê duyệt khác biệt', ngayHoanTat: '14/05/2025 09:50', ngayBanHanhQD: '14/05/2025', soQuyetDinh: '118/QĐ-HĐTD', giaTriQD: '35.000.000.000 VND', trangThaiLabel: 'Đã ban hành', trangThai: 'hoan-tat' },
            { id: 'HS035', soHoSo: 'LH2025.000093', tenKH: 'CÔNG TY TNHH GGG', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', ngayHoanTat: '13/05/2025 16:20', ngayBanHanhQD: '13/05/2025', soQuyetDinh: '117/QĐ-HĐTD', giaTriQD: '30.000.000.000 VND', trangThaiLabel: 'Đã ban hành', trangThai: 'hoan-tat' },
            { id: 'HS036', soHoSo: 'LH2025.000092', tenKH: 'CÔNG TY CP HHH', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', ngayHoanTat: '12/05/2025 11:05', ngayBanHanhQD: '12/05/2025', soQuyetDinh: '116/QĐ-HĐTD', giaTriQD: '25.000.000.000 VND', trangThaiLabel: 'Đã ban hành', trangThai: 'hoan-tat' },
            { id: 'HS037', soHoSo: 'LH2025.000088', tenKH: 'CÔNG TY TNHH III', loaiNoiDungYKien: 'Phê duyệt khác biệt', ngayHoanTat: '11/05/2025 15:30', ngayBanHanhQD: '11/05/2025', soQuyetDinh: '115/QĐ-HĐTD', giaTriQD: '20.000.000.000 VND', trangThaiLabel: 'Đã ban hành', trangThai: 'hoan-tat' },
            { id: 'HS038', soHoSo: 'LH2025.000065', tenKH: 'CÔNG TY CP JJJ', loaiNoiDungYKien: 'Phê duyệt cấp tín dụng', ngayHoanTat: '10/05/2025 10:25', ngayBanHanhQD: '10/05/2025', soQuyetDinh: '114/QĐ-HĐTD', giaTriQD: '18.000.000.000 VND', trangThaiLabel: 'Đã ban hành', trangThai: 'hoan-tat' },
            { id: 'HS039', soHoSo: 'LH2025.000062', tenKH: 'CÔNG TY TNHH KKK', loaiNoiDungYKien: 'Phê duyệt khác biệt', ngayHoanTat: '09/05/2025 09:10', ngayBanHanhQD: '09/05/2025', soQuyetDinh: '113/QĐ-HĐTD', giaTriQD: '15.000.000.000 VND', trangThaiLabel: 'Đã ban hành', trangThai: 'hoan-tat' }
        ];

        const setFilterValue = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

        const renderFilterControl = (item) => {
            const value = item.bindSearch ? searchText : (filters[item.key] || '');
            const onChange = item.bindSearch ? (ev) => setSearchText(ev.target.value) : (ev) => setFilterValue(item.key, ev.target.value);
            const baseClass = 'w-full h-9 border border-gray-200 rounded-lg px-3 text-sm outline-none focus:border-[#006B68] focus:ring-2 focus:ring-[#006B68]/10 bg-white';

            if (item.type === 'select') {
                return e('select', { className: baseClass, value, onChange },
                    (item.options || ['Tất cả']).map(option =>
                        e('option', { key: option, value: option === 'Tất cả' ? '' : option }, option)
                    )
                );
            }

            return e('input', {
                type: item.type || 'text',
                className: baseClass + (item.icon ? ' pr-8' : ''),
                placeholder: item.placeholder || 'Nhập thông tin',
                value,
                onChange
            });
        };

        const resetFilters = () => {
            setSearchText('');
            setFilters({});
            if (typeof showToastNotification === 'function') showToastNotification('Đã xóa bộ lọc.', 'success');
        };

        const openHopTab = () => {
            setMode('hop');
            setHopScreen('list');
        };

        const exportDashboard = () => {
            if (typeof showToastNotification === 'function') showToastNotification('Đã chuẩn bị file Excel danh sách hồ sơ.', 'success');
        };

        const applySearch = () => {
            if (typeof showToastNotification === 'function') showToastNotification('Đã áp dụng điều kiện tìm kiếm.', 'success');
        };

        const visibleRows = (rows) => {
            if (!searchText.trim()) return rows;
            const s = searchText.trim().toLowerCase();
            return rows.filter(row =>
                String(row.soHoSo || '').toLowerCase().includes(s) ||
                String(row.tenKH || '').toLowerCase().includes(s) ||
                String(row.cif || '').toLowerCase().includes(s)
            );
        };

        const filterRow = (items) =>
            e('div', { className: 'grid grid-cols-1 md:grid-cols-5 gap-4 mb-4' },
                items.map((item) =>
                    e('div', { key: item.label },
                        e('label', { className: 'block text-xs font-semibold text-gray-700 mb-1.5' }, item.label),
                        e('div', { className: 'relative' },
                            renderFilterControl(item),
                            item.icon && e('i', { className: 'fas ' + item.icon + ' absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs' })
                        )
                    )
                )
            );

        const tableShell = (children) => e('div', { className: 'bg-white rounded-lg shadow overflow-hidden' }, children);
        const progressCell = (pct) =>
            e('div', { className: 'flex items-center gap-2' },
                e('span', { className: 'text-xs font-semibold text-gray-700 w-8' }, pct + '%'),
                e('div', { className: 'h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden' },
                    e('div', { className: 'h-full bg-orange-500 rounded-full', style: { width: pct + '%' } })
                )
            );

        const renderVanBanDashboard = () =>
            e(React.Fragment, null,
                e('div', { className: 'flex gap-1 mb-4 border-b border-gray-200' },
                    tabs.map(tab =>
                        e('button', {
                            key: tab.id,
                            className: 'pb-2.5 px-4 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ' +
                                (activeTab === tab.id ? 'text-[#006B68] border-[#006B68]' : 'text-gray-500 border-transparent hover:text-gray-700'),
                            onClick: () => setActiveTab(tab.id)
                        },
                            tab.label,
                            e('span', { className: 'min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold flex items-center justify-center ' + (activeTab === tab.id ? 'bg-[#006B68] text-white' : 'bg-gray-200 text-gray-600') }, tab.count)
                        )
                    )
                ),
                e('div', { className: 'bg-white rounded-lg shadow p-4 mb-4' },
                    activeTab === 'cho-xu-ly' && filterRow([
                        { key: 'maHoSo', label: 'Mã hồ sơ', placeholder: 'Nhập mã hồ sơ', icon: 'fa-search', bindSearch: true },
                        { key: 'tenKH', label: 'Tên khách hàng / CIF', placeholder: 'Nhập tên khách hàng hoặc CIF', icon: 'fa-search' },
                        { key: 'ngayNhanTu', label: 'Ngày nhận từ', type: 'date' },
                        { key: 'ngayNhanDen', label: 'Ngày nhận đến', type: 'date' },
                        { key: 'soTien', label: 'Số tiền đề xuất', type: 'select', options: ['Tất cả', 'Dưới 50 tỷ', '50 - 100 tỷ', 'Trên 100 tỷ'] }
                    ]),
                    activeTab === 'da-gui-pyk' && filterRow([
                        { key: 'maHoSo', label: 'Mã hồ sơ', placeholder: 'Nhập mã hồ sơ', icon: 'fa-search', bindSearch: true },
                        { key: 'tenKH', label: 'Tên khách hàng', placeholder: 'Nhập tên khách hàng', icon: 'fa-search' },
                        { key: 'hanGui', label: 'Hạn gửi phiếu ý kiến', type: 'date' },
                        { key: 'trangThaiPhanHoi', label: 'Trạng thái phản hồi', type: 'select', options: ['Tất cả', 'Đang tổng hợp', 'Quá hạn'] }
                    ]),
                    activeTab === 'hoan-tat' && filterRow([
                        { key: 'maHoSo', label: 'Mã hồ sơ', placeholder: 'Nhập mã hồ sơ', icon: 'fa-search', bindSearch: true },
                        { key: 'tenKH', label: 'Tên khách hàng', placeholder: 'Nhập tên khách hàng' },
                        { key: 'ngayQDTu', label: 'Ngày ban hành QĐ từ ngày', type: 'date' },
                        { key: 'ngayQDDen', label: 'Ngày ban hành QĐ đến ngày', type: 'date' },
                        { key: 'trangThaiQD', label: 'Trạng thái QĐ', type: 'select', options: ['Tất cả', 'Đã ban hành', 'Dự thảo'] }
                    ]),
                    e('div', { className: 'flex justify-between items-center' },
                        e('button', { className: 'text-sm text-[#006B68] font-semibold', onClick: resetFilters }, e('i', { className: 'fas fa-rotate-left mr-2' }), 'Xóa bộ lọc'),
                        e('div', { className: 'flex gap-2' },
                            e('button', { className: 'h-9 px-4 border border-[#006B68]/30 text-[#006B68] rounded-lg text-sm font-semibold', onClick: exportDashboard }, e('i', { className: 'fas fa-download mr-2' }), 'Xuất Excel'),
                            e('button', { className: 'h-9 px-5 bg-[#006B68] text-white rounded-lg text-sm font-semibold', onClick: applySearch }, e('i', { className: 'fas fa-search mr-2' }), 'Tìm kiếm')
                        )
                    )
                ),
                activeTab === 'cho-xu-ly' && e(React.Fragment, null,
                    e('div', { className: 'mb-4 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-sm text-[#006B68] font-semibold' },
                        e('i', { className: 'fas fa-circle-info mr-2' }), 'Danh sách các hồ sơ tín dụng đã đủ điều kiện trình HĐTD nhưng chưa phát hành Phiếu xin ý kiến.'
                    ),
                    tableShell(e('table', { className: 'w-full text-sm' },
                        e('thead', null, e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                            ['STT', 'Mã hồ sơ', 'Tên khách hàng / CIF', 'Sản phẩm', 'Số tiền đề xuất', 'Chi nhánh', 'Ngày nhận', 'Người xử lý gần nhất', 'Tác vụ'].map(h => e('th', { key: h, className: 'px-4 py-3 text-left font-semibold text-gray-700' }, h))
                        )),
                        e('tbody', null, visibleRows(listChuaPhatHanh).map((row, idx) =>
                            e('tr', { key: row.id, className: 'border-b border-gray-100 hover:bg-gray-50' },
                                e('td', { className: 'px-4 py-3' }, idx + 1),
                                e('td', { className: 'px-4 py-3 font-semibold text-[#006B68]' }, row.soHoSo),
                                e('td', { className: 'px-4 py-3' }, e('div', { className: 'font-semibold' }, row.tenKH), e('div', { className: 'text-xs text-gray-500' }, 'CIF: ' + row.cif)),
                                e('td', { className: 'px-4 py-3' }, row.sanPham),
                                e('td', { className: 'px-4 py-3 font-semibold' }, row.tongHanMuc),
                                e('td', { className: 'px-4 py-3' }, row.chiNhanh),
                                e('td', { className: 'px-4 py-3' }, row.ngayTiepNhan),
                                e('td', { className: 'px-4 py-3 text-xs' }, row.nguoiXuLy),
                                e('td', { className: 'px-4 py-3' },
                                    e('button', { className: 'h-8 px-3 border border-[#006B68]/30 text-[#006B68] rounded-lg text-xs font-semibold', onClick: () => onSelectHoSo(row, 'taoPYK') },
                                        e('i', { className: 'fas fa-file-circle-plus mr-1' }), 'Tạo PYK')
                                )
                            )
                        ))
                    ))
                ),
                activeTab === 'da-gui-pyk' && tableShell(e('table', { className: 'w-full text-sm' },
                    e('thead', null,
                        e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                            ['STT', 'Mã hồ sơ', 'Tên khách hàng', 'Loại nội dung xin ý kiến', 'Ngày phát hành PYK', 'Hạn gửi phiếu ý kiến'].map(h => e('th', { key: h, className: 'px-4 py-3 text-left font-semibold text-gray-700' }, h)),
                            e('th', { className: 'px-4 py-3 text-center font-semibold text-gray-700', colSpan: 3 }, 'Phản hồi ý kiến'),
                            e('th', { className: 'px-4 py-3 text-left font-semibold text-gray-700' }, 'Trạng thái'),
                            e('th', { className: 'px-4 py-3 text-center font-semibold text-gray-700' }, 'Tác vụ')
                        ),
                        e('tr', { className: 'bg-gray-50 border-b border-gray-200 text-xs text-gray-500' },
                            e('th', { colSpan: 6 }), ['Đã phản hồi', 'Chưa phản hồi', 'Tỷ lệ phản hồi'].map(h => e('th', { key: h, className: 'px-4 py-2 text-center font-semibold' }, h)), e('th', null), e('th', null)
                        )
                    ),
                    e('tbody', null, visibleRows(listDangTongHop).map((row, idx) =>
                        e('tr', { key: row.id, className: 'border-b border-gray-100 hover:bg-gray-50' },
                            e('td', { className: 'px-4 py-3' }, idx + 1),
                            e('td', { className: 'px-4 py-3 font-semibold text-blue-600' }, row.soHoSo),
                            e('td', { className: 'px-4 py-3 font-semibold' }, row.tenKH),
                            e('td', { className: 'px-4 py-3' }, row.loaiNoiDungYKien),
                            e('td', { className: 'px-4 py-3' }, row.ngayPhatHanhPYK),
                            e('td', { className: 'px-4 py-3 text-red-600 font-semibold' }, row.hanGuiPhieu, e('div', { className: 'text-xs' }, row.trangThaiLabel === 'Quá hạn' ? 'Hết hạn' : 'Còn 1 ngày')),
                            e('td', { className: 'px-4 py-3 text-center font-semibold' }, row.daPhanHoi + '/7'),
                            e('td', { className: 'px-4 py-3 text-center font-semibold' }, row.chuaPhanHoi),
                            e('td', { className: 'px-4 py-3' }, progressCell(row.tyLe)),
                            e('td', { className: 'px-4 py-3' }, e('span', { className: 'px-2 py-1 rounded-full text-xs font-semibold ' + (row.trangThaiLabel === 'Quá hạn' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700') }, row.trangThaiLabel)),
                            e('td', { className: 'px-4 py-3 text-center' },
                                e('button', { className: 'w-8 h-8 border border-gray-200 rounded-lg text-[#006B68] mr-1', onClick: () => onSelectHoSo(row, 'tongHopYK') }, e('i', { className: 'fas fa-eye' })),
                                e('button', { className: 'w-8 h-8 border border-gray-200 rounded-lg text-orange-600', onClick: () => onSelectHoSo(row, 'nhacNho') }, e('i', { className: 'fas fa-bell' }))
                            )
                        )
                    ))
                )),
                activeTab === 'hoan-tat' && e(React.Fragment, null,
                    e('div', { className: 'mb-4 bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-sm text-green-700 font-semibold' },
                        e('i', { className: 'fas fa-circle-check mr-2' }), 'Danh sách các hồ sơ đã được Hội đồng tín dụng cấp cao phê duyệt và ban hành Quyết định cấp tín dụng.'
                    ),
                    tableShell(e('table', { className: 'w-full text-sm' },
                        e('thead', null, e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                            ['STT', 'Mã hồ sơ', 'Tên khách hàng', 'Loại nội dung xin ý kiến', 'Ngày hoàn tất', 'Ngày ban hành QĐ', 'Số hiệu QĐ', 'Giá trị QĐ', 'Trạng thái', 'Tác vụ'].map(h => e('th', { key: h, className: 'px-4 py-3 text-left font-semibold text-gray-700' }, h))
                        )),
                        e('tbody', null, visibleRows(listHoanTat).map((row, idx) =>
                            e('tr', { key: row.id, className: 'border-b border-gray-100 hover:bg-gray-50' },
                                [idx + 1, row.soHoSo, row.tenKH, row.loaiNoiDungYKien, row.ngayHoanTat, row.ngayBanHanhQD, row.soQuyetDinh, row.giaTriQD].map((c, i) => e('td', { key: i, className: 'px-4 py-3 ' + (i === 1 ? 'font-semibold text-blue-600' : '') }, c)),
                                e('td', { className: 'px-4 py-3' }, e('span', { className: 'px-2 py-1 rounded-full text-xs bg-green-50 text-green-700 font-semibold' }, row.trangThaiLabel)),
                                e('td', { className: 'px-4 py-3' }, e('button', { className: 'w-8 h-8 border border-gray-200 rounded-lg text-[#006B68]', onClick: () => onSelectHoSo(row, 'bienBan') }, e('i', { className: 'fas fa-eye' })))
                            )
                        ))
                    ))
                )
            );

        const renderHopPlaceholder = () => {
            const meetingRows = [
                { stt: '1', maHoSo: 'LH2025.000123', khachHang: 'Công ty ABC', loaiNoiDung: 'Phê duyệt cấp tín dụng', hoiDong: 'HĐTD cấp cao', ngayHop: '25/05/2025 14:00', hinhThuc: 'Hybrid', quorum: '4/5', trangThai: 'Chờ họp' },
                { stt: '2', maHoSo: 'LH2025.000122', khachHang: 'Công ty CP XYZ', loaiNoiDung: 'Phê duyệt khác biệt', hoiDong: 'HĐTDTƯ', ngayHop: '26/05/2025 09:00', hinhThuc: 'Online', quorum: '3/5', trangThai: 'Đang họp' }
            ];

            const meetingCases = [
                { stt: '1', maHoSo: 'LH2025.000123', khachHang: 'Công ty ABC', noiDung: 'Phê duyệt cấp tín dụng', soTien: '100 tỷ', nguoiXuLy: 'Trần Thị B', taiLieu: 'Xem', trangThaiThaoLuan: 'Đang thảo luận' },
                { stt: '2', maHoSo: 'LH2025.000122', khachHang: 'Công ty CP XYZ', noiDung: 'Phê duyệt khác biệt', soTien: '80 tỷ', nguoiXuLy: 'Lê Văn D', taiLieu: 'Xem', trangThaiThaoLuan: 'Chờ thảo luận' }
            ];

            const participantRows = [
                { stt: '1', thanhVien: 'Nguyễn Văn A', vaiTro: 'Chủ tịch HĐ', trangThai: 'Tham dự', thoiGian: '13:50' },
                { stt: '2', thanhVien: 'Trần Thị C', vaiTro: 'Thành viên', trangThai: 'Tham dự', thoiGian: '13:55' },
                { stt: '3', thanhVien: 'Lê Văn D', vaiTro: 'Thành viên', trangThai: 'Vắng mặt', thoiGian: '13:40' }
            ];

            const memberInviteRows = [
                { stt: '1', thanhVien: 'Nguyễn Văn A', chucDanh: 'Chủ tịch HĐ', vaiTro: 'Chủ trì', email: 'nva@bidv.com.vn', trangThaiMoi: 'Đã gửi', xacNhan: 'Chưa xác nhận' },
                { stt: '2', thanhVien: 'Trần Thị C', chucDanh: 'Thành viên', vaiTro: 'Thành viên HĐ', email: 'ttc@bidv.com.vn', trangThaiMoi: 'Đã gửi', xacNhan: 'Tham dự' },
                { stt: '3', thanhVien: 'Lê Văn D', chucDanh: 'Thành viên', vaiTro: 'Thành viên HĐ', email: 'lvd@bidv.com.vn', trangThaiMoi: 'Chưa gửi', xacNhan: 'Chưa xác nhận' }
            ];

            const selectedCase = meetingCases.find(row => row.maHoSo === selectedDiscussionCase) || meetingCases[0];
            const inputClass = 'w-full h-9 border border-gray-200 rounded-lg px-3 text-sm outline-none focus:border-[#006B68] focus:ring-2 focus:ring-[#006B68]/10 bg-white';

            const renderInfoField = (label, value, tone) =>
                e('div', { className: 'min-w-0' },
                    e('div', { className: 'text-xs text-gray-500 mb-1' }, label),
                    e('div', { className: 'text-sm font-semibold text-gray-800 break-words' },
                        tone ? e('span', { className: tone }, value) : value
                    )
                );

            const renderFormField = (label, control) =>
                e('div', null,
                    e('label', { className: 'block text-xs font-semibold text-gray-700 mb-1.5' }, label),
                    control
                );

            const renderSectionTitle = (icon, title) =>
                e('div', { className: 'flex items-center gap-2' },
                    e('i', { className: 'fas ' + icon + ' text-[#006B68] text-sm' }),
                    e('h3', { className: 'font-bold text-[#006B68]' }, title)
                );

            const renderSelect = (value, options, onChange) =>
                e('select', Object.assign({ className: inputClass }, onChange ? { value, onChange } : { defaultValue: value }),
                    options.map(opt => e('option', { key: opt, value: opt }, opt))
                );

            const renderStatusPill = (status) => {
                const tone = status === 'Tham dự' || status === 'Đủ điều kiện họp' || status === 'Đã gửi'
                    ? 'bg-green-50 text-green-700 border-green-100'
                    : status === 'Vắng mặt' || status === 'Chưa gửi'
                        ? 'bg-red-50 text-red-700 border-red-100'
                        : 'bg-orange-50 text-orange-700 border-orange-100';
                return e('span', { className: 'inline-flex px-2 py-1 rounded-full border text-xs font-semibold ' + tone }, status);
            };

            return e('div', { className: 'space-y-4' },
                hopScreen === 'list' && e('div', { className: 'bg-white rounded-lg shadow p-4' },
                    e('div', { className: 'flex items-center justify-between mb-4' },
                        e('h2', { className: 'text-lg font-bold text-gray-800' }, 'Hồ sơ tín dụng xin ý kiến Hội đồng - Tổ chức họp'),
                        e('span', { className: 'px-3 py-1 bg-[#006B68]/10 text-[#006B68] rounded-full text-xs font-semibold' }, '2 phiên họp')
                    ),
                    filterRow([
                        { key: 'hopMaHoSo', label: 'Mã hồ sơ', placeholder: 'LH2025.000123', icon: 'fa-search' },
                        { key: 'hopTenKH', label: 'Tên khách hàng', placeholder: 'Công ty ABC', icon: 'fa-search' },
                        { key: 'loaiHoiDong', label: 'Loại Hội đồng', type: 'select', options: ['Tất cả', 'HĐTD cấp cao', 'HĐTDTƯ'] },
                        { key: 'ngayHopTu', label: 'Ngày họp từ ngày', type: 'date' },
                        { key: 'ngayHopDen', label: 'Ngày họp đến ngày', type: 'date' },
                        { key: 'trangThaiPhienHop', label: 'Trạng thái phiên họp', type: 'select', options: ['Tất cả', 'Chờ họp', 'Đang họp', 'Hoàn tất'] },
                        { key: 'hinhThucHop', label: 'Hình thức họp', type: 'select', options: ['Tất cả', 'Trực tiếp', 'Online', 'Hybrid'] }
                    ]),
                    e('div', { className: 'flex flex-wrap justify-end gap-2' },
                        e('button', { className: 'h-9 px-4 border border-[#006B68]/30 text-[#006B68] rounded-lg text-sm font-semibold', onClick: applySearch }, e('i', { className: 'fas fa-search mr-2 text-xs' }), 'Tìm kiếm'),
                        e('button', { className: 'h-9 px-4 border border-gray-200 rounded-lg text-sm font-semibold', onClick: resetFilters }, 'Xóa bộ lọc'),
                        e('button', { className: 'h-9 px-4 border border-[#006B68]/30 text-[#006B68] rounded-lg text-sm font-semibold', onClick: exportDashboard }, 'Xuất Excel'),
                        e('button', { className: 'h-9 px-4 bg-[#006B68] text-white rounded-lg text-sm font-semibold', onClick: () => setHopScreen('create') }, e('i', { className: 'fas fa-plus mr-2' }), 'Tạo phiên họp')
                    )
                ),

                hopScreen === 'list' && tableShell(e('div', { className: 'overflow-x-auto' },
                    e('table', { className: 'w-full text-sm', style: { minWidth: '1080px' } },
                        e('thead', null, e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                            ['STT', 'Mã hồ sơ', 'Khách hàng', 'Loại nội dung', 'Hội đồng', 'Ngày họp', 'Hình thức họp', 'Quorum', 'Trạng thái', 'Tác vụ'].map(h => e('th', { key: h, className: 'px-4 py-3 text-left font-semibold text-gray-700' }, h))
                        )),
                        e('tbody', null,
                            meetingRows.map(row =>
                                e('tr', { key: row.maHoSo, className: 'border-b border-gray-100 hover:bg-gray-50' },
                                    [row.stt, row.maHoSo, row.khachHang, row.loaiNoiDung, row.hoiDong, row.ngayHop, row.hinhThuc, row.quorum].map((c, idx) => e('td', { key: idx, className: 'px-4 py-3 ' + (idx === 1 ? 'font-semibold text-blue-700' : '') }, c)),
                                    e('td', { className: 'px-4 py-3' }, renderStatusPill(row.trangThai)),
                                    e('td', { className: 'px-4 py-3' },
                                        e('div', { className: 'flex items-center gap-2 text-xs font-semibold' },
                                            e('button', { className: 'text-[#006B68] hover:underline', onClick: () => setHopScreen('attendance') }, 'Xem'),
                                            e('span', { className: 'text-gray-300' }, '/'),
                                            e('button', { className: 'text-[#006B68] hover:underline', onClick: () => setHopScreen('conduct') }, 'Vào họp')
                                        )
                                    )
                                )
                            )
                        )
                    )
                )),

                hopScreen === 'create' && e('section', { className: 'bg-white rounded-lg shadow p-4 space-y-4' },
                    e('div', { className: 'flex items-center justify-between gap-3' },
                        renderSectionTitle('fa-calendar-plus', 'Khởi tạo phiên họp Hội đồng'),
                        e('button', { className: 'h-9 px-4 border border-gray-200 rounded-lg text-sm font-semibold', onClick: () => setHopScreen('list') }, e('i', { className: 'fas fa-arrow-left mr-2 text-xs' }), 'Quay lại danh sách')
                    ),
                    e('div', { className: 'grid grid-cols-1 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-4' },
                        e('div', { className: 'border border-gray-200 rounded-lg p-4' },
                            e('h4', { className: 'text-sm font-bold text-gray-800 mb-3' }, 'I. Thông tin hồ sơ'),
                            e('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-3' },
                                [
                                    ['Mã hồ sơ', 'LH2025.000123'],
                                    ['Khách hàng', 'Công ty TNHH ABC'],
                                    ['Sản phẩm', 'Vay trung dài hạn'],
                                    ['Số tiền đề xuất', '100 tỷ VND'],
                                    ['Trạng thái hồ sơ', 'Chờ ý kiến Hội đồng'],
                                    ['CBQLRR phụ trách', 'Trần Thị B']
                                ].map(row => renderInfoField(row[0], row[1]))
                            )
                        ),
                        e('div', { className: 'border border-gray-200 rounded-lg p-4' },
                            e('h4', { className: 'text-sm font-bold text-gray-800 mb-3' }, 'II. Thông tin phiên họp'),
                            e('div', { className: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3' },
                                renderFormField('Số phiên họp', e('input', { className: inputClass + ' bg-gray-50', value: 'PH-2025-0001', readOnly: true })),
                                renderFormField('Loại Hội đồng', renderSelect('HĐTD cấp cao', ['HĐTD cấp cao', 'HĐTDTƯ'])),
                                renderFormField('Tiêu đề phiên họp', e('input', { className: inputClass, defaultValue: 'Họp HĐTD cấp cao phê duyệt khoản vay Công ty ABC' })),
                                renderFormField('Ngày giờ họp', e('input', { type: 'datetime-local', className: inputClass, defaultValue: '2025-05-25T14:00' })),
                                renderFormField('Hình thức họp', renderSelect('Hybrid', ['Trực tiếp', 'Online', 'Hybrid'])),
                                renderFormField('Địa điểm họp', e('input', { className: inputClass, defaultValue: 'Phòng họp 601' })),
                                renderFormField('Link họp online', e('input', { className: inputClass, defaultValue: 'Teams link' })),
                                renderFormField('Chủ trì phiên họp', renderSelect('Nguyễn Văn A', ['Nguyễn Văn A', 'Trần Thị C', 'Lê Văn D'])),
                                renderFormField('Thư ký phiên họp', renderSelect('Ngô Thị Hải Yến', ['Ngô Thị Hải Yến', 'Phạm Thị Hồng Ngọc']))
                            ),
                            e('div', { className: 'mt-3' },
                                renderFormField('Nội dung họp', e('textarea', { className: 'w-full min-h-[72px] border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006B68]', defaultValue: 'Phê duyệt cấp tín dụng đối với khoản vay Công ty ABC.' }))
                            )
                        )
                    ),
                    e('div', { className: 'grid grid-cols-1 2xl:grid-cols-2 gap-4' },
                        e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                            e('div', { className: 'px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between' },
                                e('h4', { className: 'text-sm font-bold text-gray-800' }, 'III. Danh sách hồ sơ trình họp'),
                                e('div', { className: 'flex gap-2' },
                                    e('button', { className: 'h-8 px-3 border border-gray-200 rounded-lg text-xs font-semibold', onClick: () => notify('Đã thêm hồ sơ vào phiên họp mẫu.', 'success') }, e('i', { className: 'fas fa-plus mr-1' }), 'Thêm hồ sơ'),
                                    e('button', { className: 'h-8 px-3 border border-red-200 text-red-600 rounded-lg text-xs font-semibold', onClick: () => notify('Đã xóa hồ sơ khỏi phiên họp mẫu.', 'warning') }, 'Xóa khỏi phiên họp')
                                )
                            ),
                            e('div', { className: 'overflow-x-auto' },
                                e('table', { className: 'w-full text-xs', style: { minWidth: '760px' } },
                                    e('thead', null, e('tr', { className: 'bg-white border-b border-gray-200' },
                                        ['STT', 'Mã hồ sơ', 'Khách hàng', 'Nội dung trình', 'Số tiền', 'Người xử lý', 'Tài liệu'].map(h => e('th', { key: h, className: 'px-3 py-2.5 text-left font-semibold text-gray-700' }, h))
                                    )),
                                    e('tbody', null,
                                        meetingCases.map(row =>
                                            e('tr', { key: row.maHoSo, className: 'border-b border-gray-100 last:border-b-0' },
                                                [row.stt, row.maHoSo, row.khachHang, row.noiDung, row.soTien, row.nguoiXuLy].map((c, idx) => e('td', { key: idx, className: 'px-3 py-2.5 ' + (idx === 1 ? 'font-semibold text-blue-700' : '') }, c)),
                                                e('td', { className: 'px-3 py-2.5' }, e('button', { className: 'text-[#006B68] font-semibold hover:underline', onClick: () => notify('Đang mở tài liệu hồ sơ ' + row.maHoSo + '.', 'info') }, row.taiLieu))
                                            )
                                        )
                                    )
                                )
                            )
                        ),
                        e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                            e('div', { className: 'px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between' },
                                e('h4', { className: 'text-sm font-bold text-gray-800' }, 'IV. Danh sách Thành viên Hội đồng'),
                                e('button', { className: 'h-8 px-3 border border-gray-200 rounded-lg text-xs font-semibold', onClick: () => notify('Đã thêm thành viên vào phiên họp mẫu.', 'success') }, e('i', { className: 'fas fa-plus mr-1' }), 'Thêm thành viên')
                            ),
                            e('div', { className: 'overflow-x-auto' },
                                e('table', { className: 'w-full text-xs', style: { minWidth: '820px' } },
                                    e('thead', null, e('tr', { className: 'bg-white border-b border-gray-200' },
                                        ['STT', 'Thành viên', 'Chức danh', 'Vai trò', 'Email', 'Trạng thái mời', 'Xác nhận tham dự'].map(h => e('th', { key: h, className: 'px-3 py-2.5 text-left font-semibold text-gray-700' }, h))
                                    )),
                                    e('tbody', null,
                                        memberInviteRows.map(row =>
                                            e('tr', { key: row.stt, className: 'border-b border-gray-100 last:border-b-0' },
                                                [row.stt, row.thanhVien, row.chucDanh, row.vaiTro, row.email].map((c, idx) => e('td', { key: idx, className: 'px-3 py-2.5 ' + (idx === 1 ? 'font-semibold text-gray-800' : '') }, c)),
                                                e('td', { className: 'px-3 py-2.5' }, renderStatusPill(row.trangThaiMoi)),
                                                e('td', { className: 'px-3 py-2.5' }, renderStatusPill(row.xacNhan))
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    e('div', { className: 'flex flex-wrap justify-end gap-2' },
                        e('button', { className: 'h-9 px-4 border border-gray-200 rounded-lg text-sm font-semibold', onClick: () => setHopScreen('list') }, 'Hủy'),
                        e('button', { className: 'h-9 px-4 border border-[#006B68]/30 text-[#006B68] rounded-lg text-sm font-semibold', onClick: () => notify('Đã lưu nháp phiên họp.', 'success') }, e('i', { className: 'fas fa-save mr-2 text-xs' }), 'Lưu nháp'),
                        e('button', { className: 'h-9 px-4 bg-[#006B68] text-white rounded-lg text-sm font-semibold', onClick: () => { notify('Đã gửi thông báo họp tới thành viên Hội đồng.', 'success'); setHopScreen('list'); } }, e('i', { className: 'fas fa-paper-plane mr-2 text-xs' }), 'Gửi thông báo họp')
                    )
                ),

                hopScreen === 'attendance' && e('section', { className: 'bg-white rounded-lg shadow p-4 space-y-4' },
                    e('div', { className: 'flex items-center justify-between gap-3' },
                        renderSectionTitle('fa-user-check', 'Xác nhận tham dự phiên họp Hội đồng'),
                        e('button', { className: 'h-9 px-4 border border-gray-200 rounded-lg text-sm font-semibold', onClick: () => setHopScreen('list') }, e('i', { className: 'fas fa-arrow-left mr-2 text-xs' }), 'Quay lại danh sách')
                    ),
                    e('div', { className: 'grid grid-cols-1 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-4' },
                        e('div', { className: 'border border-gray-200 rounded-lg p-4 space-y-3' },
                            e('h4', { className: 'text-sm font-bold text-gray-800' }, 'I. Thông tin phiên họp'),
                            e('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-3' },
                                [
                                    ['Tiêu đề phiên họp', 'Họp HĐTD cấp cao phê duyệt khoản vay Công ty ABC'],
                                    ['Thời gian', '25/05/2025 14:00'],
                                    ['Hình thức họp', 'Hybrid'],
                                    ['Địa điểm / Link họp', 'Phòng họp 601 / Teams link'],
                                    ['Chủ trì', 'Nguyễn Văn A']
                                ].map(row => renderInfoField(row[0], row[1]))
                            )
                        ),
                        e('div', { className: 'border border-gray-200 rounded-lg p-4 space-y-3' },
                            e('h4', { className: 'text-sm font-bold text-gray-800' }, 'II. Nội dung họp'),
                            e('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-3 text-sm' },
                                e('div', { className: 'rounded-lg bg-gray-50 border border-gray-100 p-3' },
                                    e('div', { className: 'text-xs text-gray-500 mb-1' }, 'Danh sách hồ sơ trình họp'),
                                    e('div', { className: 'font-semibold text-gray-800' }, 'LH2025.000123 - Công ty ABC')
                                ),
                                e('div', { className: 'rounded-lg bg-gray-50 border border-gray-100 p-3' },
                                    e('div', { className: 'text-xs text-gray-500 mb-1' }, 'Tài liệu đính kèm'),
                                    e('div', { className: 'font-semibold text-gray-800' }, '05 tài liệu')
                                ),
                                e('div', { className: 'rounded-lg bg-gray-50 border border-gray-100 p-3' },
                                    e('div', { className: 'text-xs text-gray-500 mb-1' }, 'Nội dung xin ý kiến'),
                                    e('div', { className: 'font-semibold text-gray-800' }, 'Phê duyệt cấp tín dụng')
                                ),
                                e('div', { className: 'rounded-lg bg-gray-50 border border-gray-100 p-3' },
                                    e('div', { className: 'text-xs text-gray-500 mb-1' }, 'Câu hỏi biểu quyết dự kiến'),
                                    e('div', { className: 'font-semibold text-gray-800' }, 'Đồng ý phê duyệt khoản vay?')
                                )
                            )
                        )
                    ),
                    e('div', { className: 'border border-gray-200 rounded-lg p-4' },
                        e('h4', { className: 'text-sm font-bold text-gray-800 mb-3' }, 'III. Xác nhận tham dự'),
                        e('div', { className: 'grid grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)_minmax(0,1fr)] gap-4' },
                            e('div', null,
                                e('label', { className: 'block text-xs font-semibold text-gray-700 mb-2' }, 'Xác nhận'),
                                e('div', { className: 'flex gap-4 text-sm' },
                                    ['Tham dự', 'Vắng mặt'].map(option =>
                                        e('label', { key: option, className: 'inline-flex items-center gap-2 font-medium text-gray-700' },
                                            e('input', { type: 'radio', name: 'xac-nhan-tham-du', className: 'accent-[#006B68]', checked: attendanceChoice === option, onChange: () => setAttendanceChoice(option) }),
                                            option
                                        )
                                    )
                                )
                            ),
                            renderFormField('Lý do vắng mặt', e('input', { className: inputClass, value: absenceReason, onChange: ev => setAbsenceReason(ev.target.value), placeholder: 'Nhập lý do nếu vắng mặt' })),
                            renderFormField('Ý kiến trước phiên họp nếu có', e('input', { className: inputClass, value: preMeetingNote, onChange: ev => setPreMeetingNote(ev.target.value), placeholder: 'Nhập ý kiến trước phiên họp' }))
                        ),
                        e('div', { className: 'flex flex-wrap justify-end gap-2 mt-4' },
                            e('button', { className: 'h-9 px-4 border border-[#006B68]/30 text-[#006B68] rounded-lg text-sm font-semibold', onClick: () => notify('Đang tải tài liệu phiên họp.', 'info') }, e('i', { className: 'fas fa-download mr-2 text-xs' }), 'Tải tài liệu'),
                            e('button', { className: 'h-9 px-4 bg-[#006B68] text-white rounded-lg text-sm font-semibold', onClick: () => notify('Đã xác nhận trạng thái tham dự: ' + attendanceChoice + '.', 'success') }, e('i', { className: 'fas fa-check mr-2 text-xs' }), 'Xác nhận')
                        )
                    )
                ),

                hopScreen === 'conduct' && e('section', { className: 'bg-white rounded-lg shadow p-4 space-y-4' },
                    e('div', { className: 'flex items-center justify-between gap-3' },
                        renderSectionTitle('fa-gavel', 'Điều hành phiên họp Hội đồng'),
                        e('button', { className: 'h-9 px-4 border border-gray-200 rounded-lg text-sm font-semibold', onClick: () => setHopScreen('list') }, e('i', { className: 'fas fa-arrow-left mr-2 text-xs' }), 'Quay lại danh sách')
                    ),
                    e('div', { className: 'grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto] gap-4 items-start' },
                        e('div', { className: 'grid grid-cols-2 md:grid-cols-5 gap-3' },
                            [
                                ['Phiên họp', 'PH-2025-0001'],
                                ['Hội đồng', 'HĐTD cấp cao'],
                                ['Thời gian', '25/05/2025 14:00'],
                                ['Trạng thái', 'Đang họp'],
                                ['Quorum', '4/5 - Đủ điều kiện họp']
                            ].map(row => renderInfoField(row[0], row[1], row[0] === 'Quorum' ? 'text-green-700' : null))
                        ),
                        e('div', { className: 'flex flex-wrap gap-2 justify-end' },
                            e('button', { className: 'h-9 px-4 bg-[#006B68] text-white rounded-lg text-sm font-semibold', onClick: () => notify('Đã bắt đầu phiên họp.', 'success') }, e('i', { className: 'fas fa-play mr-2 text-xs' }), 'Bắt đầu phiên họp'),
                            e('button', { className: 'h-9 px-4 border border-[#006B68]/30 text-[#006B68] rounded-lg text-sm font-semibold', onClick: () => notify('Đã cập nhật danh sách tham dự.', 'success') }, 'Cập nhật tham dự'),
                            e('button', { className: 'h-9 px-4 border border-red-200 text-red-600 rounded-lg text-sm font-semibold', onClick: () => notify('Đã kết thúc phiên họp mẫu.', 'warning') }, 'Kết thúc phiên họp')
                        )
                    ),
                    e('div', { className: 'rounded-lg bg-green-50 border border-green-100 px-4 py-3 text-sm font-semibold text-green-700' },
                        e('i', { className: 'fas fa-circle-check mr-2' }), 'Phiên họp đủ điều kiện quorum. Cho phép bắt đầu họp.'
                    ),
                    e('div', { className: 'grid grid-cols-1 2xl:grid-cols-2 gap-4' },
                        e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                            e('div', { className: 'px-4 py-3 bg-gray-50 border-b border-gray-200' }, e('h4', { className: 'text-sm font-bold text-gray-800' }, 'I. Danh sách tham dự')),
                            e('table', { className: 'w-full text-sm' },
                                e('thead', null, e('tr', { className: 'bg-white border-b border-gray-200' },
                                    ['STT', 'Thành viên', 'Vai trò', 'Trạng thái tham dự', 'Thời gian xác nhận'].map(h => e('th', { key: h, className: 'px-3 py-2.5 text-left font-semibold text-gray-700' }, h))
                                )),
                                e('tbody', null,
                                    participantRows.map(row =>
                                        e('tr', { key: row.stt, className: 'border-b border-gray-100 last:border-b-0' },
                                            [row.stt, row.thanhVien, row.vaiTro].map((c, idx) => e('td', { key: idx, className: 'px-3 py-2.5 ' + (idx === 1 ? 'font-semibold text-gray-800' : '') }, c)),
                                            e('td', { className: 'px-3 py-2.5' }, renderStatusPill(row.trangThai)),
                                            e('td', { className: 'px-3 py-2.5' }, row.thoiGian)
                                        )
                                    )
                                )
                            )
                        ),
                        e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                            e('div', { className: 'px-4 py-3 bg-gray-50 border-b border-gray-200' }, e('h4', { className: 'text-sm font-bold text-gray-800' }, 'II. Nội dung thảo luận theo hồ sơ')),
                            e('table', { className: 'w-full text-sm' },
                                e('thead', null, e('tr', { className: 'bg-white border-b border-gray-200' },
                                    ['STT', 'Mã hồ sơ', 'Khách hàng', 'Nội dung trình', 'Trạng thái thảo luận', 'Tác vụ'].map(h => e('th', { key: h, className: 'px-3 py-2.5 text-left font-semibold text-gray-700' }, h))
                                )),
                                e('tbody', null,
                                    meetingCases.map(row =>
                                        e('tr', { key: row.maHoSo, className: 'border-b border-gray-100 last:border-b-0 ' + (selectedDiscussionCase === row.maHoSo ? 'bg-[#006B68]/5' : '') },
                                            [row.stt, row.maHoSo, row.khachHang, row.noiDung, row.trangThaiThaoLuan].map((c, idx) => e('td', { key: idx, className: 'px-3 py-2.5 ' + (idx === 1 ? 'font-semibold text-blue-700' : '') }, c)),
                                            e('td', { className: 'px-3 py-2.5' }, e('button', { className: 'text-[#006B68] font-semibold hover:underline', onClick: () => setSelectedDiscussionCase(row.maHoSo) }, 'Ghi nhận ý kiến'))
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    e('div', { className: 'grid grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_420px] gap-4' },
                        e('div', { className: 'border border-gray-200 rounded-lg p-4 space-y-4' },
                            e('h4', { className: 'text-sm font-bold text-gray-800' }, 'Chi tiết hồ sơ đang thảo luận - ' + selectedCase.maHoSo),
                            e('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-3' },
                                [
                                    ['Thông tin khoản vay', selectedCase.soTien + ' - Vay trung dài hạn'],
                                    ['Nội dung đề xuất', selectedCase.noiDung],
                                    ['Nội dung thẩm định', 'QLRR đề xuất phê duyệt 80 tỷ VND'],
                                    ['Điều kiện tín dụng', 'Bổ sung hồ sơ pháp lý TSBĐ trước giải ngân'],
                                    ['TSBĐ', 'QSDĐ, nhà xưởng, máy móc thiết bị'],
                                    ['Tài liệu liên quan', 'BCĐX, BCTĐRR, hồ sơ pháp lý, phương án kinh doanh']
                                ].map(row => renderInfoField(row[0], row[1]))
                            )
                        ),
                        e('div', { className: 'border border-gray-200 rounded-lg p-4 space-y-3' },
                            e('h4', { className: 'text-sm font-bold text-gray-800' }, 'III. Ghi nhận ý kiến thảo luận'),
                            renderFormField('Thành viên phát biểu', renderSelect(discussionMember, ['Nguyễn Văn A', 'Trần Thị C', 'Lê Văn D'], ev => setDiscussionMember(ev.target.value))),
                            renderFormField('Nội dung ý kiến', e('textarea', { className: 'w-full min-h-[86px] border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006B68]', value: discussionOpinion, onChange: ev => setDiscussionOpinion(ev.target.value), placeholder: 'Nhập nội dung ý kiến thảo luận' })),
                            renderFormField('Nhóm nội dung', renderSelect(discussionGroup, ['Commitment', 'TSBĐ', 'ĐKTD', 'Khác biệt', 'Khác'], ev => setDiscussionGroup(ev.target.value))),
                            renderFormField('Kết luận xử lý', e('input', { className: inputClass, value: discussionConclusion, onChange: ev => setDiscussionConclusion(ev.target.value), placeholder: 'Nhập kết luận xử lý' })),
                            e('button', {
                                className: 'w-full h-9 bg-[#006B68] text-white rounded-lg text-sm font-semibold',
                                onClick: () => {
                                    setDiscussionOpinion('');
                                    setDiscussionConclusion('');
                                    notify('Đã ghi nhận ý kiến thảo luận.', 'success');
                                }
                            }, e('i', { className: 'fas fa-check mr-2 text-xs' }), 'Ghi nhận ý kiến')
                        )
                    )
                )
            );
        };

        return e('div', { className: 'flex-1 flex flex-col overflow-auto bg-[#eff2f5] p-5' },
            e('div', { className: 'mb-4' },
                e('div', { className: 'flex items-center justify-between mb-2' },
                    e('h1', { className: 'text-xl font-bold text-gray-800' }, 'Hồ sơ tín dụng chờ phê duyệt'),
                    e('span', { className: 'px-3 py-1 bg-[#006B68]/10 text-[#006B68] text-xs font-semibold rounded-full' }, 'Thư ký Hội đồng')
                ),
                e('div', { className: 'flex gap-4 border-b border-gray-200' },
                    e('button', { className: 'pb-2 px-1 text-sm font-semibold border-b-2 ' + (mode === 'vanBan' ? 'text-[#006B68] border-[#006B68]' : 'text-gray-500 border-transparent'), onClick: () => setMode('vanBan') }, 'Lấy ý kiến bằng văn bản'),
                    e('button', { className: 'pb-2 px-1 text-sm font-semibold border-b-2 ' + (mode === 'hop' ? 'text-[#006B68] border-[#006B68]' : 'text-gray-500 border-transparent'), onClick: openHopTab }, 'Tổ chức họp')
                )
            ),
            mode === 'hop' ? renderHopPlaceholder() : renderVanBanDashboard()
        );
    }

    // =====================================================
    // CHI TIẾT HỒ SƠ - MÀN HÌNH CHÍNH THƯ KÝ
    // =====================================================

    function TKHDChiTietHoSo({ hoSo, onBack, onSwitchFlow, initialScreen }) {
        const [activeScreen, setActiveScreen] = React.useState(initialScreen || 'tongQuan');
        // State cho wizard tạo PYK
        const [wizardStep, setWizardStep] = React.useState(1);
        const [loaiYKien, setLoaiYKien] = React.useState(hoSo.loaiNoiDungYKien || 'Phê duyệt cấp tín dụng');
        const [selectedLoaiYKien, setSelectedLoaiYKien] = React.useState([hoSo.loaiNoiDungYKien || 'Phê duyệt cấp tín dụng']);
        const [selectedMembers, setSelectedMembers] = React.useState(MOCK_THANH_VIEN_HD.map(m => m.id));
        const [noiDungYKien, setNoiDungYKien] = React.useState('Đề nghị cho ý kiến về đề xuất cấp tín dụng đối với ' + hoSo.tenKH);
        const [thoiHan, setThoiHan] = React.useState('3');
        const [phuongThucYKien, setPhuongThucYKien] = React.useState('Văn bản');
        const [hanPhanHoiDate, setHanPhanHoiDate] = React.useState('2025-05-25');
        const [hanPhanHoiTime, setHanPhanHoiTime] = React.useState('15:30');
        const [tieuDeYKien, setTieuDeYKien] = React.useState('Xin ý kiến phê duyệt khoản vay 100 tỷ đồng - Dự án đầu tư xây dựng nhà máy của Công ty TNHH ABC');
        const [cauHoiYKien, setCauHoiYKien] = React.useState('Quý Thành viên Hội đồng tín dụng cấp cao có đồng ý phê duyệt nội dung nêu trên không?');
        const [hinhThucTraLoi, setHinhThucTraLoi] = React.useState('Biểu quyết bấm lựa chọn');
        const [luaChonTraLoi, setLuaChonTraLoi] = React.useState('Đồng ý');
        const [ghiChuPhieu, setGhiChuPhieu] = React.useState('');
        const [ghiChuThem, setGhiChuThem] = React.useState('');
        const [creditApprovals, setCreditApprovals] = React.useState({ '1': 'Đồng ý', '2': 'Đồng ý', '3': 'Đồng ý' });
        const [reminderTitle, setReminderTitle] = React.useState('Nhắc nhở phản hồi phiếu lấy ý kiến PLYK-2025-0007');
        const [reminderMessage, setReminderMessage] = React.useState('Kính gửi Thành viên Hội đồng,\nHồ sơ LH2025.000113 - CÔNG TY ABC hiện đang tổng hợp ý kiến theo Phiếu lấy ý kiến PLYK-2025-0007. Đề nghị Quý Thành viên phản hồi trước thời hạn 25/05/2025 15:30.\nTrân trọng cảm ơn!');
        const [reminderChannels, setReminderChannels] = React.useState({ system: true, email: true, sms: false });
        const [reminderCounts, setReminderCounts] = React.useState({});
        const [showMemberPicker, setShowMemberPicker] = React.useState(false);
        const [memberSearch, setMemberSearch] = React.useState('');
        const [memberFilters, setMemberFilters] = React.useState({ chucVu: 'Tất cả', vaiTro: 'Tất cả', donVi: 'Tất cả' });
        const [documents, setDocuments] = React.useState([
            { name: 'Báo cáo thẩm định tín dụng.pdf', size: '2.4 MB', icon: 'fa-file-pdf', tone: 'text-red-500' },
            { name: 'Tờ trình phê duyệt.pdf', size: '1.8 MB', icon: 'fa-file-pdf', tone: 'text-red-500' },
            { name: 'Phương án kinh doanh.xlsx', size: '3.2 MB', icon: 'fa-file-excel', tone: 'text-green-600' },
            { name: 'Báo cáo tài chính 2024.pdf', size: '1.2 MB', icon: 'fa-file-pdf', tone: 'text-red-500' },
            { name: 'Hồ sơ pháp lý.pdf', size: '4.6 MB', icon: 'fa-file-pdf', tone: 'text-red-500' }
        ]);
        const fileInputRef = React.useRef(null);
        const [pykSent, setPykSent] = React.useState(hoSo.trangThai !== 'cho-xu-ly');

        // State for Tổng hợp ý kiến
        const [yKienData, setYKienData] = React.useState([
            { id: 'TV01', hoTen: 'Lê Đức Thọ', chucVu: 'Chủ tịch HĐTDTƯ', trangThai: 'da-phan-hoi', yKien: 'dong-y', ghiChu: '', ngayPH: '18/01/2026' },
            { id: 'TV02', hoTen: 'Trần Long', chucVu: 'Phó TGĐ', trangThai: 'da-phan-hoi', yKien: 'dong-y', ghiChu: 'Đề nghị lưu ý rủi ro ngành xây dựng', ngayPH: '19/01/2026' },
            { id: 'TV03', hoTen: 'Nguyễn Thu Hà', chucVu: 'GĐ Khối QLRR', trangThai: 'da-phan-hoi', yKien: 'dong-y', ghiChu: '', ngayPH: '18/01/2026' },
            { id: 'TV04', hoTen: 'Phạm Hoàng Long', chucVu: 'GĐ Ban TD', trangThai: 'da-phan-hoi', yKien: 'khong-dong-y', ghiChu: 'Đề nghị xem xét lại phương án tài chính', ngayPH: '19/01/2026' },
            { id: 'TV05', hoTen: 'Vũ Thị Mai Anh', chucVu: 'GĐ Ban QLRR', trangThai: 'da-phan-hoi', yKien: 'dong-y-co-dk', ghiChu: 'Cần bổ sung thẩm định TSĐB', ngayPH: '19/01/2026' }
        ]);

        // Biên bản state
        const [bienBanSaved, setBienBanSaved] = React.useState(false);

        // === TASK 14: New states ===
        const [isLocked, setIsLocked] = React.useState(false);
        const [sessionStatus, setSessionStatus] = React.useState('active');
        const [showTongHopKQPopup, setShowTongHopKQPopup] = React.useState(false);
        const [showHuyPhienPopup, setShowHuyPhienPopup] = React.useState(false);
        const [huyPhienReason, setHuyPhienReason] = React.useState('');
        const [huyPhienError, setHuyPhienError] = React.useState('');
        const [showLichSuPopup, setShowLichSuPopup] = React.useState(false);
        const [tongHopTimestamp, setTongHopTimestamp] = React.useState('');

        var mockLichSuData = [
            { thoiGian: '18/01/2026 09:15', nguoi: 'Phạm Thị Hồng Ngọc', hanhDong: 'Tạo phiếu lấy ý kiến', noiDung: 'Phát hành PLYK-2025-0073 cho 5 thành viên HĐ' },
            { thoiGian: '18/01/2026 10:30', nguoi: 'Hệ thống', hanhDong: 'Gửi thông báo', noiDung: 'Gửi email thông báo tới 5 thành viên Hội đồng' },
            { thoiGian: '18/01/2026 14:20', nguoi: 'Nguyễn Thu Hà', hanhDong: 'Phản hồi ý kiến', noiDung: 'Đồng ý cấp tín dụng theo đề xuất' },
            { thoiGian: '19/01/2026 10:30', nguoi: 'Trần Long', hanhDong: 'Phản hồi ý kiến', noiDung: 'Đồng ý - Lưu ý rủi ro ngành xây dựng' },
            { thoiGian: '19/01/2026 11:45', nguoi: 'Phạm Hoàng Long', hanhDong: 'Phản hồi ý kiến', noiDung: 'Không đồng ý - Đề nghị xem xét lại phương án tài chính' },
            { thoiGian: '20/01/2026 09:00', nguoi: 'Phạm Thị Hồng Ngọc', hanhDong: 'Nhắc nhở', noiDung: 'Gửi nhắc nhở tới 2 thành viên chưa phản hồi' }
        ];

        const allCouncilMembers = React.useMemo(() => [
            ...MOCK_THANH_VIEN_HD,
            { id: 'TV06', hoTen: 'Nguyễn Tiến Đức', chucVu: 'Phó Giám đốc', maNV: '100006', email: 'ntduc@bidv.com.vn', donVi: 'Ban Tài trợ dự án' },
            { id: 'TV07', hoTen: 'Nguyễn Ngọc Tú', chucVu: 'Phó Giám đốc', maNV: '100007', email: 'nntu@bidv.com.vn', donVi: 'Ban KHDN nước ngoài' },
            { id: 'TV08', hoTen: 'Mạc Thị Thanh Xuân', chucVu: 'Phó Giám đốc', maNV: '100008', email: 'mttxuan@bidv.com.vn', donVi: 'Ban Khách hàng DN' },
            { id: 'TV09', hoTen: 'Đỗ Thị Mai', chucVu: 'Giám đốc', maNV: '100009', email: 'dtmai@bidv.com.vn', donVi: 'Trung tâm TĐ&PP' },
            { id: 'TV10', hoTen: 'Vũ Quốc Anh', chucVu: 'Phó Giám đốc', maNV: '100010', email: 'vqanh@bidv.com.vn', donVi: 'Ban Quản trị rủi ro' },
            { id: 'TV11', hoTen: 'Lê Quang Minh', chucVu: 'Phó Giám đốc', maNV: '100011', email: 'lqminh@bidv.com.vn', donVi: 'Ban Pháp chế' },
            { id: 'TV12', hoTen: 'Phạm Quốc Hùng', chucVu: 'Giám đốc', maNV: '100012', email: 'pqhung@bidv.com.vn', donVi: 'Ban Tài chính' },
            { id: 'TV13', hoTen: 'Hoàng Thị Bích Ngọc', chucVu: 'Phó Giám đốc', maNV: '100013', email: 'htbngoc@bidv.com.vn', donVi: 'Ban Thẩm định rủi ro' },
            { id: 'TV14', hoTen: 'Ngô Thị Hải Yến', chucVu: 'Trưởng phòng', maNV: '100014', email: 'nthy@bidv.com.vn', donVi: 'Thư ký Hội đồng' }
        ], []);

        const getMemberRole = (tv) => {
            if (tv.id === 'TV01') return 'Chủ tịch';
            if (tv.id === 'TV02') return 'Phó Chủ tịch';
            return 'Thành viên';
        };

        const normalizeText = (value) =>
            String(value || '')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/\u0111/g, 'd')
                .replace(/\u0110/g, 'D')
                .toLowerCase();

        const filteredCouncilMembers = React.useMemo(() => {
            const searchText = normalizeText(memberSearch.trim());
            return allCouncilMembers.filter(tv => {
                const role = getMemberRole(tv);
                const matchesSearch = !searchText ||
                    normalizeText(tv.hoTen).includes(searchText) ||
                    normalizeText(tv.chucVu).includes(searchText) ||
                    normalizeText(tv.email).includes(searchText) ||
                    normalizeText(tv.donVi).includes(searchText);
                const matchesChucVu = memberFilters.chucVu === 'Tất cả' || normalizeText(tv.chucVu).includes(normalizeText(memberFilters.chucVu));
                const matchesVaiTro = memberFilters.vaiTro === 'Tất cả' || role === memberFilters.vaiTro;
                const matchesDonVi = memberFilters.donVi === 'Tất cả' || tv.donVi === memberFilters.donVi;
                return matchesSearch && matchesChucVu && matchesVaiTro && matchesDonVi;
            });
        }, [allCouncilMembers, memberSearch, memberFilters]);

        const formatDateVN = (isoDate) => {
            if (!isoDate || !isoDate.includes('-')) return isoDate || '';
            const parts = isoDate.split('-');
            return parts[2] + '/' + parts[1] + '/' + parts[0];
        };

        const handleFileUpload = (ev) => {
            const files = Array.from(ev.target.files || []);
            if (!files.length) return;
            setDocuments(prev => prev.concat(files.map(file => ({
                name: file.name,
                size: Math.max(1, Math.round(file.size / 1024)) + ' KB',
                icon: file.name.toLowerCase().endsWith('.xlsx') || file.name.toLowerCase().endsWith('.xls') ? 'fa-file-excel' : 'fa-file-pdf',
                tone: file.name.toLowerCase().endsWith('.xlsx') || file.name.toLowerCase().endsWith('.xls') ? 'text-green-600' : 'text-red-500'
            }))));
            ev.target.value = '';
            if (typeof showToastNotification === 'function') showToastNotification('Đã thêm tài liệu đính kèm.', 'success');
        };

        const removeDocument = (name) => {
            setDocuments(prev => prev.filter(file => file.name !== name));
            if (typeof showToastNotification === 'function') showToastNotification('Đã xóa tài liệu đính kèm.', 'warning');
        };

        const notify = (message, type) => {
            if (typeof showToastNotification === 'function') {
                showToastNotification(message, type || 'info');
            }
        };

        const toggleReminderChannel = (channel) => {
            setReminderChannels(prev => ({ ...prev, [channel]: !prev[channel] }));
        };

        const navItems = [
            { id: 'tongQuan', label: 'Tổng quan hồ sơ', icon: 'fa-file-alt' },
            { id: 'taoPYK', label: 'Tạo phiếu lấy ý kiến', icon: 'fa-paper-plane' },
            { id: 'tongHopYK', label: 'Tổng hợp ý kiến', icon: 'fa-chart-bar', badge: pykSent ? yKienData.filter(y => y.trangThai === 'cho-phan-hoi').length : 0 },
            { id: 'bienBan', label: 'Biên bản & Nghị quyết', icon: 'fa-gavel' },
            { id: 'nhacNho', label: 'Nhắc nhở TVHĐ', icon: 'fa-bell' }
        ];

        // Summary cards for the header
        var summaryRows = [
            [
                ['Số hồ sơ:', hoSo.soHoSo],
                ['Loại Hồ sơ:', hoSo.loaiHS],
                ['Trạng thái:', hoSo.buocXuLy],
                ['Thẩm quyền:', hoSo.thamQuyen],
                ['Thư ký:', 'Phạm Thị Hồng Ngọc (1272)']
            ],
            [
                ['Khách hàng:', hoSo.tenKH],
                ['CIF:', hoSo.cif],
                ['XHTDNB:', hoSo.xhtd],
                ['Tổng hạn mức:', hoSo.tongHanMuc],
                ['Ngày tiếp nhận:', hoSo.ngayTiepNhan]
            ]
        ];

        // =====================================================
        // RENDER: TỔNG QUAN HỒ SƠ
        // =====================================================
        function renderTongQuan() {
            return e('div', null,
                // Thông tin KH
                e('div', { className: 'bg-white rounded-lg shadow mb-4' },
                    e('div', { className: 'px-4 py-3 border-b border-gray-100 flex items-center gap-2' },
                        e('i', { className: 'fas fa-building text-[#006B68]' }),
                        e('h3', { className: 'font-semibold text-gray-800' }, 'Thông tin khách hàng')
                    ),
                    e('div', { className: 'p-4 grid grid-cols-2 gap-x-8 gap-y-3 text-sm' },
                        e('div', null, e('span', { className: 'text-gray-500' }, 'Tên khách hàng: '), e('span', { className: 'font-medium' }, hoSo.tenKH)),
                        e('div', null, e('span', { className: 'text-gray-500' }, 'CIF: '), e('span', { className: 'font-medium' }, hoSo.cif)),
                        e('div', null, e('span', { className: 'text-gray-500' }, 'Chi nhánh: '), e('span', { className: 'font-medium' }, hoSo.chiNhanh)),
                        e('div', null, e('span', { className: 'text-gray-500' }, 'XHTDNB: '), e('span', { className: 'font-semibold text-[#006B68]' }, hoSo.xhtd)),
                        e('div', null, e('span', { className: 'text-gray-500' }, 'Ngành nghề: '), e('span', { className: 'font-medium' }, 'Sản xuất thép, vật liệu xây dựng')),
                        e('div', null, e('span', { className: 'text-gray-500' }, 'Số BCĐX: '), e('span', { className: 'font-medium text-[#006B68]' }, hoSo.soBCDX))
                    )
                ),

                // Nội dung đề xuất
                e('div', { className: 'bg-white rounded-lg shadow mb-4' },
                    e('div', { className: 'px-4 py-3 border-b border-gray-100 flex items-center gap-2' },
                        e('i', { className: 'fas fa-file-invoice-dollar text-[#006B68]' }),
                        e('h3', { className: 'font-semibold text-gray-800' }, 'Nội dung đề xuất cấp tín dụng')
                    ),
                    e('div', { className: 'overflow-x-auto' },
                        e('table', { className: 'w-full text-sm' },
                            e('thead', null,
                                e('tr', { className: 'bg-gray-50' },
                                    e('th', { className: 'px-4 py-2.5 text-left font-semibold text-gray-700 border-b' }, 'STT'),
                                    e('th', { className: 'px-4 py-2.5 text-left font-semibold text-gray-700 border-b' }, 'Khoản tín dụng'),
                                    e('th', { className: 'px-4 py-2.5 text-right font-semibold text-gray-700 border-b' }, 'Đề xuất'),
                                    e('th', { className: 'px-4 py-2.5 text-right font-semibold text-gray-700 border-b' }, 'Thẩm định'),
                                    e('th', { className: 'px-4 py-2.5 text-left font-semibold text-gray-700 border-b' }, 'Mục đích'),
                                    e('th', { className: 'px-4 py-2.5 text-left font-semibold text-gray-700 border-b' }, 'Thời hạn')
                                )
                            ),
                            e('tbody', null,
                                [
                                    ['1', 'Hạn mức tín dụng ngắn hạn', '900 tỷ', '860 tỷ', 'Bổ sung vốn lưu động', '11 tháng'],
                                    ['2', 'Bảo lãnh thanh toán', '250 tỷ', '250 tỷ', 'Bảo lãnh thực hiện hợp đồng', '12 tháng'],
                                    ['3', 'Cho vay trung dài hạn', '100 tỷ', '70 tỷ', 'Đầu tư dự án mở rộng', '60 tháng']
                                ].map((row, idx) =>
                                    e('tr', { key: idx, className: 'border-b border-gray-100 hover:bg-gray-50' },
                                        e('td', { className: 'px-4 py-2.5 text-center' }, row[0]),
                                        e('td', { className: 'px-4 py-2.5 font-medium' }, row[1]),
                                        e('td', { className: 'px-4 py-2.5 text-right font-semibold' }, row[2]),
                                        e('td', { className: 'px-4 py-2.5 text-right font-semibold text-[#006B68]' }, row[3]),
                                        e('td', { className: 'px-4 py-2.5 text-gray-600' }, row[4]),
                                        e('td', { className: 'px-4 py-2.5 text-gray-600' }, row[5])
                                    )
                                ),
                                e('tr', { className: 'bg-[#006B68]/5 font-semibold' },
                                    e('td', { className: 'px-4 py-2.5', colSpan: 2 }, 'Tổng cộng'),
                                    e('td', { className: 'px-4 py-2.5 text-right' }, '1.250 tỷ'),
                                    e('td', { className: 'px-4 py-2.5 text-right text-[#006B68]' }, '1.180 tỷ'),
                                    e('td', { className: 'px-4 py-2.5', colSpan: 2 }, '')
                                )
                            )
                        )
                    )
                ),

                // Hồ sơ đính kèm
                e('div', { className: 'bg-white rounded-lg shadow mb-4' },
                    e('div', { className: 'px-4 py-3 border-b border-gray-100 flex items-center gap-2' },
                        e('i', { className: 'fas fa-paperclip text-[#006B68]' }),
                        e('h3', { className: 'font-semibold text-gray-800' }, 'Hồ sơ đính kèm')
                    ),
                    e('div', { className: 'p-4' },
                        [
                            { ten: 'BCĐX tín dụng', loai: 'PDF', ngay: '15/01/2026', nguoi: 'Nguyễn Văn 1 (123451)' },
                            { ten: 'BCTĐ rủi ro', loai: 'PDF', ngay: '14/01/2026', nguoi: 'Nguyễn Văn 5 (123455)' },
                            { ten: 'Hồ sơ pháp lý doanh nghiệp', loai: 'PDF', ngay: '10/01/2026', nguoi: 'Nguyễn Văn 1 (123451)' },
                            { ten: 'BCTC đã kiểm toán 2025', loai: 'Excel', ngay: '12/01/2026', nguoi: 'Nguyễn Văn 1 (123451)' }
                        ].map((hs, idx) =>
                            e('div', { key: idx, className: 'flex items-center gap-3 py-2 ' + (idx > 0 ? 'border-t border-gray-100' : '') },
                                e('i', { className: 'fas ' + (hs.loai === 'PDF' ? 'fa-file-pdf text-red-500' : 'fa-file-excel text-green-600') + ' text-lg' }),
                                e('div', { className: 'flex-1' },
                                    e('span', { className: 'text-sm font-medium text-[#006B68] hover:underline cursor-pointer' }, hs.ten),
                                    e('span', { className: 'text-xs text-gray-400 ml-2' }, hs.loai)
                                ),
                                e('span', { className: 'text-xs text-gray-500' }, hs.nguoi),
                                e('span', { className: 'text-xs text-gray-400 ml-3' }, hs.ngay)
                            )
                        )
                    )
                )
            );
        }

        // =====================================================
        // RENDER: TẠO PHIẾU LẤY Ý KIẾN (WIZARD)
        // =====================================================
        function renderTaoPYK() {
            var steps = [
                { num: 1, label: 'Chọn hồ sơ & loại xin ý kiến' },
                { num: 2, label: 'Nhập nội dung xin ý kiến' },
                { num: 3, label: 'Chọn thành viên HĐ' },
                { num: 4, label: 'Xác nhận & Gửi' }
            ];

            const renderReadOnlyField = (label, value, tone) =>
                e('div', null,
                    e('label', { className: 'block text-xs font-semibold text-gray-600 mb-1' }, label),
                    e('div', { className: 'min-h-[36px] px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm font-semibold text-gray-800' },
                        tone ? e('span', { className: tone }, value) : value
                    )
                );

            const renderHoSoTinDung = () =>
                e('section', { className: 'border border-gray-200 rounded-lg p-4' },
                    e('h4', { className: 'text-sm font-bold text-[#006B68] uppercase mb-4' }, 'Thông tin hồ sơ tín dụng'),
                    e('div', { className: 'grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4' },
                        renderReadOnlyField('Mã hồ sơ', 'LH2025.000123'),
                        renderReadOnlyField('Tên khách hàng / CIF', 'CÔNG TY TNHH ABC (KH00012345)'),
                        renderReadOnlyField('Sản phẩm', 'Vay trung dài hạn - Dự án đầu tư'),
                        renderReadOnlyField('Số tiền đề xuất', '100.000.000.000 VND'),
                        renderReadOnlyField('Số tiền QLRR thẩm định', '80.000.000.000 VND'),
                        renderReadOnlyField('Thời hạn khoản vay', '60 tháng'),
                        renderReadOnlyField('Cán bộ QLRR phụ trách', 'Trần Thị B'),
                        renderReadOnlyField('Chi nhánh', 'Quang Trung (123)'),
                        renderReadOnlyField('Trạng thái hồ sơ', 'Chờ xử lý', 'inline-flex px-2 py-0.5 rounded border border-orange-200 bg-orange-50 text-orange-700 text-xs'),
                        renderReadOnlyField('Bước xử lý', 'Phê duyệt cấp tín dụng', 'inline-flex px-2 py-0.5 rounded border border-[#006B68]/20 bg-[#006B68]/5 text-[#006B68] text-xs'),
                        renderReadOnlyField('Mục đích vay', 'Đầu tư xây dựng nhà máy'),
                        renderReadOnlyField('Ngày tạo hồ sơ', '20/05/2025')
                    )
                );

            const activeLoaiYKien = selectedLoaiYKien.includes(loaiYKien) ? loaiYKien : selectedLoaiYKien[0];
            const toggleLoaiYKien = (title) => {
                setSelectedLoaiYKien(prev => {
                    const hasSelected = prev.includes(title);
                    const next = hasSelected ? prev.filter(item => item !== title) : prev.concat(title);
                    if (!next.length) return prev;
                    if (!hasSelected || !next.includes(loaiYKien)) setLoaiYKien(next[0]);
                    return next;
                });
            };

            const renderLoaiYKienCard = (title, text, applyText, index) =>
                e('label', {
                    className: 'border rounded-lg p-4 cursor-pointer flex items-start gap-3 ' + (selectedLoaiYKien.includes(title) ? 'border-[#006B68] bg-[#006B68]/5' : 'border-gray-200 bg-white hover:border-[#006B68]/50')
                },
                    e('input', {
                        type: 'checkbox',
                        className: 'mt-1 accent-[#006B68]',
                        checked: selectedLoaiYKien.includes(title),
                        onChange: () => toggleLoaiYKien(title)
                    }),
                    e('div', { className: 'min-w-0 flex-1' },
                        e('div', { className: 'text-sm font-bold text-gray-800' }, index + '. ' + title),
                        e('div', { className: 'text-xs text-gray-500 mt-1 leading-5' }, text),
                        e('div', { className: 'mt-3 rounded-lg bg-gray-50 border border-gray-100 p-3 text-xs text-gray-600 leading-5' },
                            e('div', { className: 'font-bold text-gray-700 mb-1' }, 'Áp dụng khi:'),
                            applyText
                        )
                    )
                );

            const attachments = [
                ['Báo cáo thẩm định tín dụng.pdf', '2.4 MB', 'fa-file-pdf', 'text-red-500'],
                ['Tờ trình phê duyệt.pdf', '1.8 MB', 'fa-file-pdf', 'text-red-500'],
                ['Phương án kinh doanh.xlsx', '3.2 MB', 'fa-file-excel', 'text-green-600'],
                ['Báo cáo tài chính 2024.pdf', '1.2 MB', 'fa-file-pdf', 'text-red-500'],
                ['Hồ sơ pháp lý.pdf', '4.6 MB', 'fa-file-pdf', 'text-red-500']
            ];

            const renderToolbar = () =>
                e('div', { className: 'h-9 border border-gray-200 border-b-0 rounded-t-lg bg-gray-50 flex items-center gap-2 px-3 text-xs text-gray-600' },
                    e('span', { className: 'font-semibold' }, 'Inter'),
                    e('span', { className: 'px-2 border-l border-gray-200' }, '14'),
                    ['fa-bold', 'fa-italic', 'fa-underline', 'fa-align-left', 'fa-align-center', 'fa-list-ul', 'fa-link'].map(icon =>
                        e('i', { key: icon, className: 'fas ' + icon })
                    )
                );

            const renderDifferenceTable = () =>
                e('table', { className: 'w-full text-xs border border-gray-200' },
                    e('thead', null, e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                        ['STT', 'Nội dung khác biệt', 'Đề xuất của BPĐX', 'Đề xuất của BPTĐRR', 'Lý do khác biệt'].map(h => e('th', { key: h, className: 'px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-100 last:border-r-0' }, h))
                    )),
                    e('tbody', null,
                        e('tr', null,
                            ['1', 'Tỷ lệ vốn tự có tham gia dự án', 'Tối thiểu 20% tổng mức đầu tư', 'Tối thiểu 30% tổng mức đầu tư', 'BPTĐRR yêu cầu tỷ lệ vốn tự có cao hơn do rủi ro thị trường và biến động chi phí.'].map((c, idx) =>
                                e('td', { key: idx, className: 'px-3 py-2 border-r border-gray-100 last:border-r-0 align-top' }, c)
                            )
                        )
                    )
                );

            const renderCreditTable = () =>
                e('table', { className: 'w-full text-xs border border-gray-200' },
                    e('thead', null, e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                        ['STT', 'Điều kiện', 'Đề xuất của BPĐX', 'Đề xuất của BPTĐRR', 'Phê duyệt của HĐTD'].map(h => e('th', { key: h, className: 'px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-100 last:border-r-0' }, h))
                    )),
                    e('tbody', null,
                        [
                            ['1', 'Giải ngân', 'Theo tiến độ dự án', 'Theo tiến độ dự án và tỷ lệ vốn tự có tối thiểu 30%'],
                            ['2', 'Tài sản bảo đảm', 'Hoàn thiện thủ tục pháp lý trước khi giải ngân', 'Hoàn thiện thủ tục pháp lý trước khi giải ngân'],
                            ['3', 'Báo cáo tài chính', 'Định kỳ quý', 'Định kỳ quý']
                        ].map(row => e('tr', { key: row[0], className: 'border-b border-gray-100' },
                            row.map((c, idx) => e('td', { key: idx, className: 'px-3 py-2 border-r border-gray-100 last:border-r-0 align-top' }, c)),
                            e('td', { className: 'px-3 py-2' },
                                ['Đồng ý', 'Không đồng ý'].map(option =>
                                    e('label', { key: option, className: option === 'Đồng ý' ? 'mr-3' : '' },
                                        e('input', {
                                            type: 'radio',
                                            name: 'phe-duyet-dieu-kien-' + row[0],
                                            checked: (creditApprovals[row[0]] || 'Đồng ý') === option,
                                            onChange: () => setCreditApprovals(prev => ({ ...prev, [row[0]]: option })),
                                            className: 'accent-[#006B68] mr-1'
                                        }),
                                        option
                                    )
                                )
                            )
                        ))
                    )
                );

            const renderAttachmentsPanel = () =>
                e('aside', { className: 'space-y-4' },
                    e('div', { className: 'border border-gray-200 rounded-lg bg-white overflow-hidden' },
                        e('div', { className: 'px-4 py-3 border-b border-gray-100 flex items-center justify-between' },
                            e('h4', { className: 'font-bold text-[#006B68] text-sm uppercase' }, 'Tài liệu đính kèm'),
                            e('button', {
                                className: 'text-xs font-semibold text-[#006B68]',
                                onClick: () => typeof showToastNotification === 'function' && showToastNotification('Đang tải toàn bộ tài liệu đính kèm.', 'info')
                            }, e('i', { className: 'fas fa-download mr-1' }), 'Tải tất cả')
                        ),
                        e('div', { className: 'p-4 space-y-3' },
                            documents.map(file =>
                                e('div', { key: file.name, className: 'flex items-center gap-3 border-b border-gray-100 last:border-b-0 pb-2 last:pb-0' },
                                    e('i', { className: 'fas ' + file.icon + ' ' + file.tone }),
                                    e('div', { className: 'min-w-0 flex-1' },
                                        e('div', { className: 'text-xs font-semibold text-gray-700 truncate' }, file.name),
                                        e('div', { className: 'text-[11px] text-gray-400' }, file.size)
                                    ),
                                    e('button', { className: 'text-gray-400 hover:text-red-500', onClick: () => removeDocument(file.name) }, e('i', { className: 'fas fa-times' }))
                                )
                            ),
                            e('button', {
                                type: 'button',
                                className: 'w-full border border-dashed border-blue-200 rounded-lg p-5 text-center text-xs text-blue-600 bg-blue-50/30 hover:bg-blue-50',
                                onClick: () => fileInputRef.current && fileInputRef.current.click()
                            },
                                e('i', { className: 'fas fa-cloud-arrow-up text-xl mb-2' }),
                                e('div', { className: 'font-semibold' }, 'Kéo thả tệp vào đây hoặc bấm để tải lên'),
                                e('div', { className: 'text-gray-400 mt-1' }, 'Hỗ trợ: .pdf, .docx, .xlsx (tối đa 50MB/tệp)')
                            ),
                            e('input', {
                                ref: fileInputRef,
                                type: 'file',
                                multiple: true,
                                className: 'hidden',
                                accept: '.pdf,.doc,.docx,.xls,.xlsx',
                                onChange: handleFileUpload
                            })
                        )
                    ),
                    e('div', { className: 'border border-gray-200 rounded-lg bg-white p-4' },
                        e('label', { className: 'block text-sm font-semibold text-gray-700 mb-2' }, 'Ghi chú'),
                        e('textarea', {
                            className: 'w-full min-h-[92px] border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-[#006B68]',
                            placeholder: 'Nhập ghi chú cho nội dung xin ý kiến (nếu có)',
                            value: ghiChuPhieu,
                            onChange: ev => setGhiChuPhieu(ev.target.value)
                        })
                    )
                );

            return e('div', null,
                // Wizard steps indicator
                e('div', { className: 'bg-white rounded-lg shadow mb-4 p-4' },
                    e('div', { className: 'flex items-center justify-between max-w-2xl mx-auto' },
                        steps.map((step, idx) =>
                            e(React.Fragment, { key: step.num },
                                e('div', { className: 'flex items-center gap-2' },
                                    e('div', {
                                        className: 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ' +
                                            (wizardStep === step.num ? 'bg-[#006B68] text-white' :
                                                wizardStep > step.num ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500')
                                    }, wizardStep > step.num ? e('i', { className: 'fas fa-check text-xs' }) : step.num),
                                    e('span', {
                                        className: 'text-xs font-medium hidden sm:inline ' +
                                            (wizardStep === step.num ? 'text-[#006B68]' : 'text-gray-500')
                                    }, step.label)
                                ),
                                idx < steps.length - 1 && e('div', { className: 'flex-1 h-0.5 mx-2 ' + (wizardStep > step.num ? 'bg-green-500' : 'bg-gray-200') })
                            )
                        )
                    )
                ),

                // Step content
                wizardStep === 1 && e('div', { className: 'bg-white rounded-lg shadow' },
                    e('div', { className: 'px-4 py-3 border-b border-gray-100 flex items-center justify-between' },
                        e('div', { className: 'flex items-center gap-2' },
                            e('i', { className: 'fas fa-folder-open text-[#006B68]' }),
                            e('h3', { className: 'font-semibold text-gray-800' }, 'Chọn hồ sơ & loại xin ý kiến')
                        ),
                        e('span', { className: 'text-xs text-gray-500' }, hoSo.soHoSo)
                    ),
                    e('div', { className: 'p-4 space-y-4' },
                        renderHoSoTinDung(),
                        e('section', { className: 'border border-gray-200 rounded-lg p-4' },
                            e('h4', { className: 'text-sm font-bold text-[#006B68] uppercase mb-1' }, 'Chọn loại nội dung xin ý kiến'),
                            e('p', { className: 'text-xs text-gray-500 mb-4' }, 'Vui lòng chọn loại nội dung xin ý kiến.'),
                            e('div', { className: 'grid grid-cols-1 xl:grid-cols-2 gap-4' },
                                renderLoaiYKienCard('Phê duyệt khác biệt', 'Xin ý kiến phê duyệt đối với các nội dung khác biệt giữa đề xuất của BPĐX và thẩm định của BPTĐRR.', 'Có ít nhất một nội dung khác biệt giữa BPĐX và BPTĐRR cần được Hội đồng tín dụng cấp cao xem xét, phê duyệt.', 1),
                                renderLoaiYKienCard('Phê duyệt cấp tín dụng', 'Xin ý kiến phê duyệt cấp tín dụng đối với khoản vay theo đề xuất và thẩm định.', 'Không có nội dung khác biệt hoặc sau khi các khác biệt đã được Hội đồng tín dụng cấp cao phê duyệt.', 2)
                            ),
                            e('div', { className: 'mt-4' },
                                e('label', { className: 'block text-sm font-semibold text-gray-700 mb-2' }, 'Ghi chú (nếu có)'),
                                e('div', { className: 'relative' },
                                    e('textarea', { className: 'w-full min-h-[74px] border border-gray-200 rounded-lg p-3 pr-14 text-sm outline-none focus:border-[#006B68]', placeholder: 'Nhập ghi chú...' }),
                                    e('span', { className: 'absolute right-3 bottom-2 text-[11px] text-gray-400' }, '0/500')
                                )
                            )
                        )
                    ),
                    e('div', { className: 'px-4 py-3 border-t border-gray-100 flex justify-between' },
                        e('button', { className: 'px-6 py-2 border border-[#006B68]/30 text-[#006B68] rounded-lg text-sm font-semibold', onClick: onBack }, 'Hủy'),
                        e('button', {
                            className: 'px-5 py-2 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005B58]',
                            onClick: () => setWizardStep(2)
                        }, 'Tiếp tục ', e('i', { className: 'fas fa-arrow-right ml-1' }))
                    )
                ),

                wizardStep === 2 && e('div', { className: 'bg-white rounded-lg shadow' },
                    e('div', { className: 'px-4 py-3 border-b border-gray-100 flex items-center justify-between' },
                        e('div', { className: 'flex items-center gap-2' },
                            e('i', { className: 'fas fa-edit text-[#006B68]' }),
                            e('h3', { className: 'font-semibold text-gray-800' }, 'Nội dung xin ý kiến các Thành viên Hội đồng tín dụng cấp cao'),
                            e('span', { className: 'px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs font-semibold' }, 'Soạn thảo')
                        ),
                        e('button', { className: 'text-xs font-semibold text-blue-600', onClick: () => setWizardStep(1) }, e('i', { className: 'fas fa-arrow-left mr-1' }), 'Quay lại phiếu xin ý kiến')
                    ),
                    e('div', { className: 'p-4 space-y-4' },
                        e('div', { className: 'border border-gray-200 rounded-lg p-4' },
                            e('h4', { className: 'text-sm font-bold text-[#006B68] uppercase mb-3' }, 'Thông tin hồ sơ'),
                            e('div', { className: 'grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 text-xs' },
                                [['Mã hồ sơ', 'LH2025.000123'], ['Khách hàng', 'CÔNG TY TNHH ABC'], ['Sản phẩm', 'Vay trung dài hạn - Dự án đầu tư'], ['Trạng thái hồ sơ', 'Chờ xử lý'], ['Bước xử lý', 'Phê duyệt cấp tín dụng'], ['Cán bộ QLRR phụ trách', 'Trần Thị B'], ['Số tiền đề xuất', '100.000.000.000 VND'], ['Số tiền QLRR thẩm định', '80.000.000.000 VND'], ['Thời hạn khoản vay', '60 tháng'], ['Mục đích vay', 'Đầu tư xây dựng nhà máy'], ['Ngày tạo hồ sơ', '20/05/2025']].map(row =>
                                    e('div', { key: row[0] }, e('div', { className: 'text-gray-500 mb-1' }, row[0]), e('div', { className: 'font-semibold text-gray-800' }, row[1]))
                                )
                            )
                        ),
                        e('div', { className: 'grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4' },
                            e('div', { className: 'space-y-4' },
                                e('div', { className: 'border border-gray-200 rounded-lg p-4' },
                                    e('h4', { className: 'text-sm font-bold text-[#006B68] uppercase mb-3' }, 'Thông tin phiếu lấy ý kiến'),
                                    e('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-4' },
                                        e('div', null,
                                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-2' }, 'Phương thức lấy ý kiến'),
                                            e('div', { className: 'flex flex-wrap gap-2' }, ['Văn bản', 'Họp', 'Kết hợp'].map(opt =>
                                                e('label', { key: opt, className: 'inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs cursor-pointer ' + (phuongThucYKien === opt ? 'border-[#006B68] bg-[#006B68]/5 text-[#006B68] font-semibold' : 'border-gray-200 text-gray-600') },
                                                    e('input', { type: 'radio', className: 'accent-[#006B68]', checked: phuongThucYKien === opt, onChange: () => setPhuongThucYKien(opt) }),
                                                    opt
                                                )
                                            ))
                                        ),
                                        e('div', null,
                                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-2' }, 'Hạn phản hồi'),
                                            e('div', { className: 'grid grid-cols-[112px_minmax(0,1fr)] gap-2' },
                                                e('input', { type: 'time', className: 'w-full min-w-[112px] border border-gray-200 rounded-lg px-3 py-2 pr-1 text-sm tabular-nums', value: hanPhanHoiTime, onChange: ev => setHanPhanHoiTime(ev.target.value) }),
                                                e('input', { type: 'date', className: 'w-full min-w-[160px] border border-gray-200 rounded-lg px-3 py-2 text-sm', value: hanPhanHoiDate, onChange: ev => setHanPhanHoiDate(ev.target.value) })
                                            )
                                        ),
                                        e('div', null,
                                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-2' }, 'Loại nội dung'),
                                            e('div', { className: 'min-h-9 flex items-center px-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-[#006B68]' }, selectedLoaiYKien.join(', '))
                                        )
                                    )
                                ),
                                e('div', { className: 'border border-gray-200 rounded-lg p-4' },
                                    e('h4', { className: 'text-sm font-bold text-[#006B68] uppercase mb-3' }, 'Nội dung xin ý kiến'),
                                    e('div', { className: 'flex gap-2 mb-3' },
                                        selectedLoaiYKien.map((tab, idx) =>
                                            e('button', { key: tab, className: 'h-8 px-4 rounded-lg border text-xs font-semibold ' + (activeLoaiYKien === tab ? 'bg-[#006B68] text-white border-[#006B68]' : 'bg-white text-gray-600 border-gray-200'), onClick: () => setLoaiYKien(tab) }, (idx + 1) + '. ' + tab)
                                        )
                                    ),
                                    e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1' }, 'Tiêu đề nội dung xin ý kiến ', e('span', { className: 'text-red-500' }, '*')),
                                    e('input', { className: 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 outline-none focus:border-[#006B68]', value: tieuDeYKien, onChange: ev => setTieuDeYKien(ev.target.value) }),
                                    e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1' }, 'Nội dung chi tiết ', e('span', { className: 'text-red-500' }, '*')),
                                    renderToolbar(),
                                    e('textarea', { className: 'w-full min-h-[142px] border border-gray-200 rounded-b-lg p-3 text-sm outline-none focus:border-[#006B68]', value: noiDungYKien, onChange: ev => setNoiDungYKien(ev.target.value) }),
                                    e('div', { className: 'mt-3' }, activeLoaiYKien === 'Phê duyệt khác biệt' ? renderDifferenceTable() : renderCreditTable()),
                                    e('div', { className: 'mt-4 space-y-3' },
                                        e('div', null,
                                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-2' }, 'Hình thức lấy ý kiến ', e('span', { className: 'text-red-500' }, '*')),
                                            e('div', { className: 'flex gap-4 text-sm' },
                                                ['Biểu quyết bấm lựa chọn', 'Gửi ý kiến bằng văn bản'].map((opt) =>
                                                    e('label', { key: opt, className: 'inline-flex items-center gap-2' },
                                                        e('input', { type: 'radio', name: 'hinh-thuc', checked: hinhThucTraLoi === opt, onChange: () => setHinhThucTraLoi(opt), className: 'accent-[#006B68]' }),
                                                        opt
                                                    )
                                                )
                                            )
                                        ),
                                        e('div', null,
                                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1' }, 'Câu hỏi xin ý kiến ', e('span', { className: 'text-red-500' }, '*')),
                                            e('input', { className: 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm', value: cauHoiYKien, onChange: ev => setCauHoiYKien(ev.target.value) })
                                        ),
                                        e('div', null,
                                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-2' }, 'Lựa chọn trả lời ', e('span', { className: 'text-red-500' }, '*')),
                                            e('div', { className: 'flex gap-4 text-sm' }, ['Đồng ý', 'Không đồng ý', 'Đồng ý có điều kiện'].map((opt) =>
                                                e('label', { key: opt, className: 'inline-flex items-center gap-2' },
                                                    e('input', { type: 'radio', name: 'tra-loi', checked: luaChonTraLoi === opt, onChange: () => setLuaChonTraLoi(opt), className: 'accent-[#006B68]' }),
                                                    opt
                                                )
                                            ))
                                        ),
                                        e('div', null,
                                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1' }, 'Ghi chú thêm (nếu có)'),
                                            e('textarea', {
                                                className: 'w-full min-h-[62px] border border-gray-200 rounded-lg p-3 text-sm',
                                                placeholder: 'Nhập ghi chú thêm (nếu có)',
                                                value: ghiChuThem,
                                                onChange: ev => setGhiChuThem(ev.target.value)
                                            })
                                        )
                                    )
                                )
                            ),
                            renderAttachmentsPanel()
                        )
                    ),
                    e('div', { className: 'px-4 py-3 border-t border-gray-100 flex justify-between' },
                        e('button', {
                            className: 'px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50',
                            onClick: () => setWizardStep(1)
                        }, e('i', { className: 'fas fa-arrow-left mr-1' }), ' Quay lại'),
                        e('button', {
                            className: 'px-5 py-2 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005B58]',
                            onClick: () => setWizardStep(3)
                        }, 'Tiếp tục ', e('i', { className: 'fas fa-arrow-right ml-1' }))
                    )
                ),

                wizardStep === 3 && e('div', { className: 'bg-white rounded-lg shadow' },
                    e('div', { className: 'px-4 py-3 border-b border-gray-100 flex items-center gap-2' },
                        e('i', { className: 'fas fa-users text-[#006B68]' }),
                        e('h3', { className: 'font-semibold text-gray-800' }, 'Chọn thành viên Hội đồng & tài liệu đính kèm')
                    ),
                    e('div', { className: 'p-4 space-y-4' },
                        e('div', { className: 'grid grid-cols-1 md:grid-cols-4 gap-3' },
                            e('div', { className: 'relative' },
                                e('input', {
                                    className: 'w-full h-9 border border-gray-200 rounded-lg px-3 pr-8 text-sm outline-none focus:border-[#006B68]',
                                    placeholder: 'Tìm kiếm theo họ tên, chức vụ, email, đơn vị...',
                                    value: memberSearch,
                                    onChange: ev => setMemberSearch(ev.target.value)
                                }),
                                e('i', { className: 'fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs' })
                            ),
                            e('select', {
                                className: 'w-full h-9 border border-gray-200 rounded-lg px-3 text-sm outline-none focus:border-[#006B68] bg-white',
                                value: memberFilters.chucVu,
                                onChange: ev => setMemberFilters(prev => ({ ...prev, chucVu: ev.target.value }))
                            },
                                ['Tất cả', 'Chủ tịch', 'Phó TGĐ', 'Giám đốc', 'Phó Giám đốc', 'Trưởng phòng'].map(opt =>
                                    e('option', { key: opt, value: opt }, 'Chức vụ: ' + opt)
                                )
                            ),
                            e('select', {
                                className: 'w-full h-9 border border-gray-200 rounded-lg px-3 text-sm outline-none focus:border-[#006B68] bg-white',
                                value: memberFilters.vaiTro,
                                onChange: ev => setMemberFilters(prev => ({ ...prev, vaiTro: ev.target.value }))
                            },
                                ['Tất cả', 'Chủ tịch', 'Phó Chủ tịch', 'Thành viên'].map(opt =>
                                    e('option', { key: opt, value: opt }, 'Vai trò: ' + opt)
                                )
                            ),
                            e('select', {
                                className: 'w-full h-9 border border-gray-200 rounded-lg px-3 text-sm outline-none focus:border-[#006B68] bg-white',
                                value: memberFilters.donVi,
                                onChange: ev => setMemberFilters(prev => ({ ...prev, donVi: ev.target.value }))
                            },
                                ['Tất cả'].concat(Array.from(new Set(allCouncilMembers.map(tv => tv.donVi).filter(Boolean)))).map(opt =>
                                    e('option', { key: opt, value: opt }, 'Đơn vị: ' + opt)
                                )
                            )
                        ),
                        e('div', { className: 'grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px] gap-4' },
                        e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                            e('div', { className: 'px-3 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between' },
                                e('h4', { className: 'text-sm font-bold text-gray-800 uppercase' }, 'Danh sách thành viên (' + filteredCouncilMembers.length + ')'),
                                e('button', { className: 'text-xs font-semibold text-[#006B68]', onClick: () => setShowMemberPicker(true) }, e('i', { className: 'fas fa-plus mr-1' }), 'Thêm thành viên')
                            ),
                            e('div', { className: 'p-3' },
                                filteredCouncilMembers.length === 0 && e('div', { className: 'py-8 text-center text-sm text-gray-500' }, 'Không tìm thấy thành viên phù hợp bộ lọc.'),
                                filteredCouncilMembers.map((tv, idx) =>
                                    e('label', {
                                        key: tv.id,
                                        className: 'flex items-center gap-3 py-2.5 cursor-pointer ' + (idx > 0 ? 'border-t border-gray-100' : '')
                                    },
                                        e('input', {
                                            type: 'checkbox',
                                            className: 'w-4 h-4 accent-[#006B68]',
                                            checked: selectedMembers.includes(tv.id),
                                            onChange: () => {
                                                setSelectedMembers(prev =>
                                                    prev.includes(tv.id) ? prev.filter(id => id !== tv.id) : [...prev, tv.id]
                                                );
                                            }
                                        }),
                                        e('div', { className: 'w-8 h-8 rounded-full bg-[#006B68]/10 flex items-center justify-center flex-shrink-0' },
                                            e('span', { className: 'text-xs font-bold text-[#006B68]' }, tv.hoTen.split(' ').pop()[0])
                                        ),
                                        e('div', { className: 'flex-1 min-w-0' },
                                            e('p', { className: 'text-sm font-medium text-gray-800' }, tv.hoTen),
                                            e('p', { className: 'text-xs text-gray-500 truncate' }, tv.chucVu)
                                        ),
                                        e('span', { className: 'text-xs text-gray-400' }, tv.maNV)
                                    )
                                )
                            )
                        ),
                        e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                            e('div', { className: 'px-3 py-2.5 bg-gray-50 border-b border-gray-200' },
                                e('h4', { className: 'text-sm font-bold text-gray-800 uppercase' }, 'Danh sách đã chọn (' + selectedMembers.length + ')')
                            ),
                            e('table', { className: 'w-full text-sm' },
                                e('thead', null,
                                    e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                                        ['#', 'Họ và tên', 'Chức vụ', 'Vai trò', ''].map(h => e('th', { key: h, className: 'px-3 py-2 text-left font-semibold text-gray-700' }, h))
                                    )
                                ),
                                e('tbody', null,
                                    allCouncilMembers.filter(tv => selectedMembers.includes(tv.id)).map((tv, idx) =>
                                        e('tr', { key: idx, className: 'border-b border-gray-100' },
                                            e('td', { className: 'px-3 py-2.5 font-semibold text-gray-500' }, idx + 1),
                                            e('td', { className: 'px-3 py-2.5 font-medium text-gray-800' }, tv.hoTen),
                                            e('td', { className: 'px-3 py-2.5 text-gray-600' }, tv.chucVu),
                                            e('td', { className: 'px-3 py-2.5 text-gray-600' }, getMemberRole(tv)),
                                            e('td', { className: 'px-3 py-2.5 text-red-500' },
                                                e('button', { onClick: () => setSelectedMembers(prev => prev.filter(id => id !== tv.id)) }, e('i', { className: 'fas fa-trash' }))
                                            )
                                        )
                                    )
                                )
                            ),
                            e('div', { className: 'm-3 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2 text-xs text-blue-700' },
                                e('i', { className: 'fas fa-circle-info mr-2' }), 'Có thể kéo thả để thay đổi thứ tự thành viên trong danh sách.'
                            )
                        )
                        )
                    ),
                    e('div', { className: 'px-4 py-3 border-t border-gray-100 flex justify-between' },
                        e('button', {
                            className: 'px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50',
                            onClick: () => setWizardStep(2)
                        }, e('i', { className: 'fas fa-arrow-left mr-1' }), ' Quay lại'),
                        e('button', {
                            className: 'px-5 py-2 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005B58]',
                            onClick: () => setWizardStep(4)
                        }, 'Tiếp tục ', e('i', { className: 'fas fa-arrow-right ml-1' }))
                    )
                ),

                wizardStep === 4 && e('div', { className: 'bg-white rounded-lg shadow' },
                    e('div', { className: 'px-4 py-3 border-b border-gray-100 flex items-center gap-2' },
                        e('i', { className: 'fas fa-clipboard-check text-[#006B68]' }),
                        e('h3', { className: 'font-semibold text-gray-800' }, 'Xác nhận và gửi phiếu lấy ý kiến')
                    ),
                    e('div', { className: 'p-4 space-y-4' },
                        // Summary
                        e('div', { className: 'bg-[#006B68]/5 rounded-lg p-4 border border-[#006B68]/20' },
                            e('h4', { className: 'font-semibold text-[#006B68] mb-3' }, 'Thông tin phiếu lấy ý kiến'),
                            e('div', { className: 'grid grid-cols-2 gap-3 text-sm' },
                                e('div', null, e('span', { className: 'text-gray-500' }, 'Khách hàng: '), e('span', { className: 'font-medium' }, hoSo.tenKH)),
                                e('div', null, e('span', { className: 'text-gray-500' }, 'Số BCĐX: '), e('span', { className: 'font-medium' }, hoSo.soBCDX)),
                                e('div', null, e('span', { className: 'text-gray-500' }, 'Loại xin ý kiến: '), e('span', { className: 'font-semibold text-[#006B68]' }, selectedLoaiYKien.join(', '))),
                                e('div', null, e('span', { className: 'text-gray-500' }, 'Số TV nhận PYK: '), e('span', { className: 'font-semibold text-[#006B68]' }, selectedMembers.length + ' thành viên')),
                                e('div', null, e('span', { className: 'text-gray-500' }, 'Thời hạn phản hồi: '), e('span', { className: 'font-semibold' }, hanPhanHoiTime + ' ngày ' + formatDateVN(hanPhanHoiDate)))
                            )
                        ),
                        // Thành viên nhận
                        e('div', null,
                            e('h4', { className: 'text-sm font-semibold text-gray-700 mb-2' }, 'Danh sách thành viên nhận phiếu:'),
                            e('div', { className: 'flex flex-wrap gap-2' },
                                allCouncilMembers.filter(tv => selectedMembers.includes(tv.id)).map(tv =>
                                    e('span', { key: tv.id, className: 'px-3 py-1.5 bg-[#006B68]/10 text-[#006B68] text-xs font-medium rounded-full' },
                                        tv.hoTen + ' - ' + tv.chucVu)
                                )
                            )
                        ),
                        // Nội dung
                        e('div', null,
                            e('h4', { className: 'text-sm font-semibold text-gray-700 mb-1' }, 'Nội dung lấy ý kiến:'),
                            e('p', { className: 'text-sm text-gray-600 bg-gray-50 p-3 rounded-lg' }, noiDungYKien)
                        )
                    ),
                    e('div', { className: 'px-4 py-3 border-t border-gray-100 flex justify-between' },
                        e('button', {
                            className: 'px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50',
                            onClick: () => setWizardStep(3)
                        }, e('i', { className: 'fas fa-arrow-left mr-1' }), ' Quay lại'),
                        e('button', {
                            className: 'px-5 py-2 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005B58]',
                            onClick: () => {
                                setPykSent(true);
                                if (typeof showToastNotification === 'function') {
                                    showToastNotification('Đã gửi phiếu lấy ý kiến đến ' + selectedMembers.length + ' thành viên Hội đồng!', 'success');
                                }
                                setActiveScreen('tongHopYK');
                            }
                        }, e('i', { className: 'fas fa-paper-plane mr-2' }), 'Gửi phiếu lấy ý kiến')
                    )
                ),
                showMemberPicker && e('div', { className: 'fixed inset-0 z-[90] bg-black/40 flex items-center justify-center p-4', onClick: ev => { if (ev.target === ev.currentTarget) setShowMemberPicker(false); } },
                    e('div', { className: 'w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden' },
                        e('div', { className: 'px-5 py-4 border-b border-gray-200 flex items-center justify-between' },
                            e('h3', { className: 'text-lg font-bold text-gray-800' }, 'Thêm thành viên Hội đồng'),
                            e('button', { className: 'w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-500', onClick: () => setShowMemberPicker(false) }, e('i', { className: 'fas fa-times' }))
                        ),
                        e('div', { className: 'p-5 grid grid-cols-1 xl:grid-cols-2 gap-5' },
                            e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                                e('div', { className: 'px-3 py-2 bg-gray-50 font-bold text-sm' }, 'Danh sách thành viên (14)'),
                                e('div', { className: 'divide-y divide-gray-100' },
                                    allCouncilMembers.map(tv =>
                                        e('label', { key: tv.id, className: 'flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer hover:bg-gray-50' },
                                            e('input', {
                                                type: 'checkbox',
                                                className: 'accent-[#006B68]',
                                                checked: selectedMembers.includes(tv.id),
                                                onChange: () => {
                                                    setSelectedMembers(prev =>
                                                        prev.includes(tv.id) ? prev.filter(id => id !== tv.id) : [...prev, tv.id]
                                                    );
                                                }
                                            }),
                                            e('span', { className: 'flex-1 font-medium' }, tv.hoTen),
                                            e('span', { className: 'text-xs text-gray-500' }, tv.chucVu)
                                        )
                                    )
                                )
                            ),
                            e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                                e('div', { className: 'px-3 py-2 bg-gray-50 font-bold text-sm' }, 'Danh sách đã chọn (' + selectedMembers.length + ')'),
                                e('div', { className: 'divide-y divide-gray-100' },
                                    allCouncilMembers.filter(tv => selectedMembers.includes(tv.id)).map((tv, idx) => e('div', { key: tv.id, className: 'grid grid-cols-[32px_minmax(0,1fr)_92px_24px] gap-2 px-3 py-2.5 text-sm items-center' },
                                        e('span', { className: 'font-semibold text-gray-500' }, idx + 1),
                                        e('span', { className: 'font-medium' }, tv.hoTen),
                                        e('span', { className: 'text-xs text-gray-500' }, getMemberRole(tv)),
                                        e('button', {
                                            className: 'text-red-500 hover:text-red-700',
                                            onClick: () => setSelectedMembers(prev => prev.filter(id => id !== tv.id))
                                        }, e('i', { className: 'fas fa-trash' }))
                                    ))
                                )
                            )
                        ),
                        e('div', { className: 'px-5 py-4 border-t border-gray-100 flex justify-end gap-3' },
                            e('button', { className: 'h-9 px-5 border border-gray-200 rounded-lg text-sm font-semibold', onClick: () => setShowMemberPicker(false) }, 'Hủy bỏ'),
                            e('button', { className: 'h-9 px-5 bg-[#006B68] text-white rounded-lg text-sm font-semibold', onClick: () => setShowMemberPicker(false) }, 'Xác nhận')
                        )
                    )
                )
            );
        }

        // =====================================================
        // RENDER: TỔNG HỢP Ý KIẾN
        // =====================================================
        function renderTongHopYK() {
            if (!pykSent) {
                return e('div', { className: 'bg-white rounded-lg shadow p-8 text-center' },
                    e('div', { className: 'w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4' },
                        e('i', { className: 'fas fa-paper-plane text-gray-400 text-2xl' })
                    ),
                    e('h3', { className: 'text-lg font-bold text-gray-800 mb-2' }, 'Chưa gửi phiếu lấy ý kiến'),
                    e('p', { className: 'text-sm text-gray-500 mb-4' }, 'Vui lòng tạo và gửi phiếu lấy ý kiến trước.'),
                    e('button', {
                        className: 'px-4 py-2 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005B58]',
                        onClick: () => setActiveScreen('taoPYK')
                    }, 'Tạo phiếu lấy ý kiến')
                );
            }

            var totalTV = yKienData.length;
            var daPhanHoi = yKienData.filter(y => y.trangThai === 'da-phan-hoi').length;
            var dongY = yKienData.filter(y => y.yKien === 'dong-y').length;
            var dongYCoDK = yKienData.filter(y => y.yKien === 'dong-y-co-dk').length;
            var khongDongY = yKienData.filter(y => y.yKien === 'khong-dong-y').length;

            return e('div', null,
                e('div', { className: 'bg-white rounded-lg shadow p-4 mb-4' },
                    e('div', { className: 'grid grid-cols-1 md:grid-cols-6 gap-3 mb-4' },
                        [
                            ['Hội đồng', 'HĐTDCC - Hội đồng tín dụng cấp cao'],
                            ['Phiếu lấy ý kiến', 'PLYK-2025-0073'],
                            ['Nội dung lấy ý kiến', selectedLoaiYKien.join(', ')],
                            ['Lĩnh vực', 'Tín dụng'],
                            ['Trạng thái phiếu', 'Đã tổng hợp'],
                            ['Thời gian tổng hợp', '26/05/2025 15:00']
                        ].map(row =>
                            e('div', { key: row[0] },
                                e('div', { className: 'text-xs text-gray-500 mb-1' }, row[0]),
                                e('div', { className: 'h-9 px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 truncate' }, row[1])
                            )
                        )
                    ),
                    e('div', { className: 'flex justify-between items-center' },
                        e('button', {
                            className: 'h-8 px-3 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700',
                            onClick: () => notify('Đã mở bộ lọc nâng cao của báo cáo tổng hợp.', 'info')
                        },
                            e('i', { className: 'fas fa-filter mr-2 text-[#006B68]' }), 'Bộ lọc khác'
                        ),
                        e('div', { className: 'flex gap-2' },
                            e('button', {
                                className: 'h-8 px-3 border border-blue-200 text-blue-700 rounded-lg text-xs font-semibold',
                                onClick: () => notify('Đã chuẩn bị file Excel báo cáo tổng hợp ý kiến.', 'success')
                            }, e('i', { className: 'fas fa-download mr-2' }), 'Xuất Excel'),
                            e('button', {
                                className: 'h-8 px-3 border border-blue-200 text-blue-700 rounded-lg text-xs font-semibold',
                                onClick: () => notify('Đã gửi báo cáo tổng hợp tới hàng đợi in.', 'success')
                            }, e('i', { className: 'fas fa-print mr-2' }), 'In báo cáo'),
                            e('button', { className: 'h-8 px-3 bg-blue-600 text-white rounded-lg text-xs font-semibold', onClick: onBack }, e('i', { className: 'fas fa-arrow-left mr-2' }), 'Quay lại')
                        )
                    )
                ),
                e('div', { className: 'bg-white rounded-lg shadow p-4 mb-4' },
                    e('h3', { className: 'text-sm font-bold text-[#006B68] uppercase mb-3' }, 'I. Kết quả tổng hợp phiếu lấy ý kiến'),
                    e('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-4 text-xs' },
                        [['Ngày gửi phiếu lấy ý kiến', '21/05/2025'], ['Thời hạn tham gia ý kiến cuối cùng', hanPhanHoiTime + ' ngày ' + formatDateVN(hanPhanHoiDate)], ['Số thành viên đã tham gia ý kiến', daPhanHoi + ' thành viên'], ['Số thành viên đã tham gia ý kiến', daPhanHoi + ' thành viên'], ['Thời gian tổng hợp', '26/05/2025 15:00'], ['Người tổng hợp', 'Thư ký HĐTDCC']].map(row =>
                            e('div', { key: row[0] + row[1], className: 'flex justify-between gap-3 border-b border-gray-100 pb-2' },
                                e('span', { className: 'text-gray-500' }, row[0]),
                                e('span', { className: 'font-semibold text-gray-800 text-right' }, row[1])
                            )
                        )
                    )
                ),
                // Summary cards
                e('div', { className: 'grid grid-cols-4 gap-4 mb-4' },
                    e('div', { className: 'bg-white rounded-lg shadow p-4' },
                        e('div', { className: 'flex items-center gap-3' },
                            e('div', { className: 'w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center' },
                                e('i', { className: 'fas fa-users text-blue-500' })
                            ),
                            e('div', null,
                                e('p', { className: 'text-xs text-gray-500' }, 'Tổng TV'),
                                e('p', { className: 'text-xl font-bold text-gray-800' }, totalTV)
                            )
                        )
                    ),
                    e('div', { className: 'bg-white rounded-lg shadow p-4' },
                        e('div', { className: 'flex items-center gap-3' },
                            e('div', { className: 'w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center' },
                                e('i', { className: 'fas fa-check-circle text-green-500' })
                            ),
                            e('div', null,
                                e('p', { className: 'text-xs text-gray-500' }, 'Đã phản hồi'),
                                e('p', { className: 'text-xl font-bold text-green-600' }, daPhanHoi + '/' + totalTV)
                            )
                        )
                    ),
                    e('div', { className: 'bg-white rounded-lg shadow p-4' },
                        e('div', { className: 'flex items-center gap-3' },
                            e('div', { className: 'w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center' },
                                e('i', { className: 'fas fa-thumbs-up text-emerald-500' })
                            ),
                            e('div', null,
                                e('p', { className: 'text-xs text-gray-500' }, 'Đồng ý'),
                                e('p', { className: 'text-xl font-bold text-emerald-600' }, dongY + dongYCoDK)
                            )
                        )
                    ),
                    e('div', { className: 'bg-white rounded-lg shadow p-4' },
                        e('div', { className: 'flex items-center gap-3' },
                            e('div', { className: 'w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center' },
                                e('i', { className: 'fas fa-clock text-orange-500' })
                            ),
                            e('div', null,
                                e('p', { className: 'text-xs text-gray-500' }, 'Chờ phản hồi'),
                                e('p', { className: 'text-xl font-bold text-orange-600' }, totalTV - daPhanHoi)
                            )
                        )
                    )
                ),
                e('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4' },
                    e('div', { className: 'bg-green-50 border border-green-100 rounded-lg p-4 flex items-center justify-between' },
                        e('div', { className: 'flex items-center gap-3' },
                            e('div', { className: 'w-10 h-10 rounded-full bg-white text-green-700 flex items-center justify-center' }, e('i', { className: 'fas fa-check' })),
                            e('div', null, e('div', { className: 'text-sm font-bold text-green-700' }, 'Ý kiến Đồng ý'), e('div', { className: 'text-xs text-gray-500' }, 'Tỷ lệ dựa trên tổng số thành viên tham gia'))
                        ),
                        e('div', { className: 'text-2xl font-bold text-green-700' }, (dongY + dongYCoDK) + '/' + totalTV)
                    ),
                    e('div', { className: 'bg-red-50 border border-red-100 rounded-lg p-4 flex items-center justify-between' },
                        e('div', { className: 'flex items-center gap-3' },
                            e('div', { className: 'w-10 h-10 rounded-full bg-white text-red-700 flex items-center justify-center' }, e('i', { className: 'fas fa-times' })),
                            e('div', null, e('div', { className: 'text-sm font-bold text-red-700' }, 'Ý kiến Không đồng ý'), e('div', { className: 'text-xs text-gray-500' }, 'Bao gồm ý kiến không chấp thuận'))
                        ),
                        e('div', { className: 'text-2xl font-bold text-red-700' }, khongDongY + '/' + totalTV)
                    )
                ),

                // Progress bar
                e('div', { className: 'bg-white rounded-lg shadow p-4 mb-4' },
                    e('div', { className: 'flex items-center justify-between mb-2' },
                        e('span', { className: 'text-sm font-semibold text-gray-700' }, 'Tiến độ phản hồi'),
                        e('span', { className: 'text-sm font-bold text-[#006B68]' }, Math.round(daPhanHoi / totalTV * 100) + '%')
                    ),
                    e('div', { className: 'w-full h-2.5 bg-gray-200 rounded-full overflow-hidden' },
                        e('div', {
                            className: 'h-full bg-[#006B68] rounded-full transition-all',
                            style: { width: Math.round(daPhanHoi / totalTV * 100) + '%' }
                        })
                    )
                ),

                // Table chi tiết
                e('div', { className: 'bg-white rounded-lg shadow overflow-hidden' },
                    e('div', { className: 'px-4 py-3 border-b border-gray-100 flex items-center justify-between' },
                        e('div', { className: 'flex items-center gap-2' },
                            e('i', { className: 'fas fa-list-alt text-[#006B68]' }),
                            e('h3', { className: 'font-semibold text-gray-800' }, 'II. Nội dung ý kiến các Thành viên')
                        ),
                        (totalTV - daPhanHoi) > 0 && e('button', {
                            className: 'px-3 py-1.5 border border-[#006B68] text-[#006B68] rounded-lg text-xs font-medium hover:bg-[#006B68]/5',
                            onClick: () => {
                                setActiveScreen('nhacNho');
                            }
                        }, e('i', { className: 'fas fa-bell mr-1' }), 'Nhắc nhở')
                    ),
                    e('table', { className: 'w-full text-sm' },
                        e('thead', null,
                            e('tr', { className: 'bg-[#006B68] text-white' },
                                e('th', { className: 'px-4 py-3 text-left font-semibold w-10' }, 'STT'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Thành viên'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Chức vụ'),
                                e('th', { className: 'px-4 py-3 text-center font-semibold' }, 'Trạng thái'),
                                e('th', { className: 'px-4 py-3 text-center font-semibold' }, 'Ý kiến'),
                                e('th', { className: 'px-4 py-3 text-center font-semibold' }, 'Phê duyệt khác biệt'),
                                e('th', { className: 'px-4 py-3 text-center font-semibold' }, 'Phê duyệt cấp tín dụng'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Ghi chú'),
                                e('th', { className: 'px-4 py-3 text-left font-semibold' }, 'Ngày PH')
                            )
                        ),
                        e('tbody', null,
                            yKienData.map((yk, idx) => {
                                var yKienBadge = null;
                                if (yk.yKien === 'dong-y') {
                                    yKienBadge = e('span', { className: 'inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium' },
                                        e('i', { className: 'fas fa-check text-[10px]' }), 'Đồng ý');
                                } else if (yk.yKien === 'dong-y-co-dk') {
                                    yKienBadge = e('span', { className: 'inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium' },
                                        e('i', { className: 'fas fa-check text-[10px]' }), 'Đồng ý có ĐK');
                                } else if (yk.yKien === 'khong-dong-y') {
                                    yKienBadge = e('span', { className: 'inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium' },
                                        e('i', { className: 'fas fa-times text-[10px]' }), 'Không đồng ý');
                                } else {
                                    yKienBadge = e('span', { className: 'text-xs text-gray-400' }, '—');
                                }

                                return e('tr', {
                                    key: yk.id,
                                    className: 'border-b border-gray-100 hover:bg-gray-50 ' + (idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50')
                                },
                                    e('td', { className: 'px-4 py-3 text-center' }, idx + 1),
                                    e('td', { className: 'px-4 py-3 font-medium text-gray-800' }, yk.hoTen),
                                    e('td', { className: 'px-4 py-3 text-gray-600' }, yk.chucVu),
                                    e('td', { className: 'px-4 py-3 text-center' },
                                        yk.trangThai === 'da-phan-hoi' ?
                                            e('span', { className: 'inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs' },
                                                e('span', { className: 'w-1.5 h-1.5 rounded-full bg-green-500' }), 'Đã phản hồi') :
                                            e('span', { className: 'inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs' },
                                                e('span', { className: 'w-1.5 h-1.5 rounded-full bg-orange-500' }), 'Chờ phản hồi')
                                    ),
                                    e('td', { className: 'px-4 py-3 text-center' }, yKienBadge),
                                    e('td', { className: 'px-4 py-3 text-center' },
                                        e('span', { className: 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ' + (yk.yKien === 'khong-dong-y' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700') },
                                            yk.yKien === 'khong-dong-y' ? 'Không đồng ý' : 'Đồng ý'
                                        )
                                    ),
                                    e('td', { className: 'px-4 py-3 text-center' },
                                        e('span', { className: 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ' + (yk.yKien === 'khong-dong-y' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700') },
                                            yk.yKien === 'khong-dong-y' ? 'Không đồng ý' : 'Đồng ý'
                                        )
                                    ),
                                    e('td', { className: 'px-4 py-3 text-gray-600 text-xs max-w-[200px]' }, yk.ghiChu || '—'),
                                    e('td', { className: 'px-4 py-3 text-gray-500' }, yk.ngayPH || '—')
                                );
                            })
                        )
                    )
                ),
                e('div', { className: 'flex justify-end mt-4' },
                    e('button', {
                        className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005B58]',
                        onClick: () => setActiveScreen('bienBan')
                    }, e('i', { className: 'fas fa-gavel mr-2' }), 'Lập biên bản/nghị quyết')
                )
            );
        }

        // =====================================================
        // RENDER: BIÊN BẢN & NGHỊ QUYẾT
        // =====================================================
        function renderBienBan() {
            var daPhanHoi = yKienData.filter(y => y.trangThai === 'da-phan-hoi').length;
            var totalTV = yKienData.length;
            var dongY = yKienData.filter(y => y.yKien === 'dong-y' || y.yKien === 'dong-y-co-dk').length;
            var khongDongY = totalTV - dongY;

            if (!pykSent || daPhanHoi < totalTV) {
                return e('div', { className: 'bg-white rounded-lg shadow p-8 text-center' },
                    e('div', { className: 'w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4' },
                        e('i', { className: 'fas fa-gavel text-gray-400 text-2xl' })
                    ),
                    e('h3', { className: 'text-lg font-bold text-gray-800 mb-2' }, 'Chưa đủ điều kiện lập biên bản'),
                    e('p', { className: 'text-sm text-gray-500 mb-1' }, 'Cần thu thập đầy đủ ý kiến của tất cả thành viên Hội đồng.'),
                    e('p', { className: 'text-sm text-gray-500 mb-4' }, 'Tiến độ: ' + daPhanHoi + '/' + totalTV + ' thành viên đã phản hồi.'),
                    e('button', {
                        className: 'px-4 py-2 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005B58]',
                        onClick: () => setActiveScreen('tongHopYK')
                    }, 'Xem tổng hợp ý kiến')
                );
            }

            const renderSideBlock = (title, iconClass, children) =>
                e('div', { className: 'bg-white rounded-lg shadow overflow-hidden' },
                    e('div', { className: 'px-4 py-3 border-b border-gray-100 flex items-center gap-2' },
                        e('i', { className: 'fas ' + iconClass + ' text-[#006B68]' }),
                        e('h3', { className: 'font-semibold text-gray-800 text-sm' }, title)
                    ),
                    e('div', { className: 'p-4' }, children)
                );

            const renderInfoRows = (rows) =>
                e('div', { className: 'space-y-3' },
                    rows.map((row) =>
                        e('div', { key: row[0], className: 'flex items-start justify-between gap-3 text-xs' },
                            e('span', { className: 'text-gray-500' }, row[0]),
                            e('span', { className: 'font-semibold text-gray-800 text-right' }, row[1])
                        )
                    )
                );

            const renderTimeline = () =>
                e('div', { className: 'space-y-3' },
                    [
                        ['Phát hành PYK', hoSo.ngayPhatHanhPYK || '20/01/2026 09:00'],
                        ['Hoàn tất lấy ý kiến', '20/01/2026 14:30'],
                        ['Lập biên bản/nghị quyết', '20/01/2026 15:00']
                    ].map((item, idx) =>
                        e('div', { key: item[0], className: 'flex gap-2.5 text-xs' },
                            e('div', { className: 'w-5 flex flex-col items-center' },
                                e('span', { className: 'w-2 h-2 rounded-full bg-[#006B68] mt-1' }),
                                idx < 2 && e('span', { className: 'w-px flex-1 bg-gray-200 mt-1' })
                            ),
                            e('div', { className: 'min-w-0' },
                                e('div', { className: 'font-semibold text-gray-800' }, item[0]),
                                e('div', { className: 'text-gray-500 mt-0.5' }, item[1])
                            )
                        )
                    )
                );

            const renderBienBanSidebar = () =>
                e('aside', { className: 'space-y-3 xl:sticky xl:top-0' },
                    renderSideBlock('Kết quả tổng hợp', 'fa-chart-pie',
                        e('div', { className: 'space-y-3' },
                            e('div', { className: 'grid grid-cols-2 gap-2 text-center' },
                                e('div', { className: 'rounded-lg bg-green-50 border border-green-100 p-3' },
                                    e('div', { className: 'text-xl font-bold text-green-700' }, dongY + '/' + totalTV),
                                    e('div', { className: 'text-[11px] text-green-700 mt-1' }, 'Đồng ý')
                                ),
                                e('div', { className: 'rounded-lg bg-red-50 border border-red-100 p-3' },
                                    e('div', { className: 'text-xl font-bold text-red-700' }, khongDongY + '/' + totalTV),
                                    e('div', { className: 'text-[11px] text-red-700 mt-1' }, 'Không đồng ý')
                                )
                            ),
                            renderInfoRows([
                                ['Tổng số TV tham gia', totalTV + '/' + totalTV],
                                ['Tỷ lệ đồng ý', Math.round((dongY / totalTV) * 100) + '%'],
                                ['Kết luận', dongY > totalTV / 2 ? 'Thông qua' : 'Không thông qua']
                            ])
                        )
                    ),
                    renderSideBlock('Thông tin biên bản', 'fa-file-signature',
                        renderInfoRows([
                            ['Số biên bản', 'BB-HĐTDTW-2026/' + hoSo.id.replace('HS', '')],
                            ['Số nghị quyết', 'NQ-HĐTDTW-2026/' + hoSo.id.replace('HS', '')],
                            ['Ngày lập', '20/01/2026 15:00'],
                            ['Người lập', 'Phạm Thị Hồng Ngọc'],
                            ['Trạng thái', bienBanSaved ? 'Đã lưu dự thảo' : 'Dự thảo']
                        ])
                    ),
                    renderSideBlock('Lịch sử xử lý', 'fa-clock-rotate-left', renderTimeline())
                );

            return e('div', { className: 'grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-4' },
                e('div', null,
                // Kết quả tổng hợp
                e('div', { className: 'bg-white rounded-lg shadow mb-4' },
                    e('div', { className: 'px-4 py-3 border-b border-gray-100 flex items-center gap-2' },
                        e('i', { className: 'fas fa-poll text-[#006B68]' }),
                        e('h3', { className: 'font-semibold text-gray-800' }, 'I. Nội dung tổng hợp ý kiến')
                    ),
                    e('div', { className: 'p-4' },
                        e('div', { className: 'flex items-center justify-center gap-8 mb-4' },
                            e('div', { className: 'text-center' },
                                e('div', { className: 'text-3xl font-bold text-green-600' }, dongY + '/' + totalTV),
                                e('p', { className: 'text-sm text-gray-500 mt-1' }, 'Đồng ý')
                            ),
                            e('div', { className: 'w-px h-12 bg-gray-200' }),
                            e('div', { className: 'text-center' },
                                e('div', {
                                    className: 'text-lg font-bold px-4 py-1.5 rounded-full ' +
                                        (dongY > totalTV / 2 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')
                                }, dongY > totalTV / 2 ? '✓ THÔNG QUA' : '✗ KHÔNG THÔNG QUA')
                            )
                        ),
                        // Chi tiết từng TV
                        e('table', { className: 'w-full text-sm' },
                            e('thead', null,
                                e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                                    ['STT', 'Thành viên Hội đồng', 'Vai trò', 'Phê duyệt khác biệt', 'Phê duyệt cấp tín dụng', 'Ghi chú'].map(h =>
                                        e('th', { key: h, className: 'px-3 py-2 text-left font-semibold text-gray-700' }, h)
                                    )
                                )
                            ),
                            e('tbody', null,
                                yKienData.map((yk, idx) =>
                                    e('tr', { key: yk.id, className: 'border-b border-gray-100' },
                                        e('td', { className: 'px-3 py-2 font-semibold text-gray-500' }, idx + 1),
                                        e('td', { className: 'px-3 py-2 font-medium' }, yk.hoTen, e('div', { className: 'text-[11px] text-gray-400' }, idx === 0 ? 'Họ và tên - Chủ danh' : 'Họ và tên')),
                                        e('td', { className: 'px-3 py-2 text-gray-600' }, idx === 0 ? 'Chủ tịch' : idx === 1 ? 'Phó Chủ tịch' : 'Thành viên HĐ'),
                                        e('td', { className: 'px-3 py-2' },
                                            (yk.yKien === 'dong-y' || yk.yKien === 'dong-y-co-dk') ?
                                                e('span', { className: 'text-green-600 font-bold' }, 'Đồng ý') :
                                                e('span', { className: 'text-red-600 font-bold' }, 'Không đồng ý')
                                        ),
                                        e('td', { className: 'px-3 py-2' },
                                            (yk.yKien === 'dong-y' || yk.yKien === 'dong-y-co-dk') ?
                                                e('span', { className: 'text-green-600 font-bold' }, 'Đồng ý') :
                                                e('span', { className: 'text-red-600 font-bold' }, 'Không đồng ý')
                                        ),
                                        e('td', { className: 'px-3 py-2 text-gray-600 text-xs' }, yk.ghiChu || '—')
                                    )
                                )
                            )
                        ),
                        e('div', { className: 'mt-4 space-y-3 text-sm' },
                            e('div', null,
                                e('h4', { className: 'text-sm font-bold text-[#006B68] mb-2' }, 'II. Kết luận'),
                                e('ul', { className: 'space-y-1 text-gray-700 list-disc list-inside' },
                                    e('li', null, 'Phê duyệt khác biệt: ' + dongY + '/' + totalTV + ' thành viên đồng ý, đạt tỷ lệ thông qua.'),
                                    e('li', null, 'Phê duyệt cấp tín dụng: ' + dongY + '/' + totalTV + ' thành viên đồng ý, đạt tỷ lệ thông qua.'),
                                    e('li', null, 'Kết luận chung: Thông qua chủ trương cấp hạn mức tín dụng theo điều kiện tổng hợp nêu tại mục I.')
                                )
                            ),
                            e('div', null,
                                e('h4', { className: 'text-sm font-bold text-[#006B68] mb-2' }, 'III. Nghị quyết'),
                                e('p', { className: 'text-gray-700 leading-6' }, 'Hội đồng tín dụng cấp cao quyết nghị thông qua chủ trương cấp hạn mức tín dụng đối với khách hàng theo nội dung, điều kiện và các ý kiến bổ sung đã tổng hợp.')
                            )
                        )
                    )
                ),

                // Biên bản
                e('div', { className: 'bg-white rounded-lg shadow mb-4' },
                    e('div', { className: 'px-4 py-3 border-b border-gray-100 flex items-center justify-between' },
                        e('div', { className: 'flex items-center gap-2' },
                            e('i', { className: 'fas fa-file-contract text-[#006B68]' }),
                            e('h3', { className: 'font-semibold text-gray-800' }, 'Biên bản & Nghị quyết')
                        ),
                        e('div', { className: 'flex items-center gap-2' },
                            e('button', {
                                className: 'px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50',
                                onClick: () => notify('Đang mở bản xem trước biên bản dạng PDF.', 'info')
                            }, e('i', { className: 'fas fa-eye mr-1' }), 'Xem trước'),
                            e('button', {
                                className: 'px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50',
                                onClick: () => notify('Đã chuẩn bị file PDF biên bản/nghị quyết.', 'success')
                            }, e('i', { className: 'fas fa-download mr-1' }), 'Tải PDF')
                        )
                    ),
                    e('div', { className: 'p-4' },
                        // Biên bản preview
                        e('div', {
                            className: 'border border-gray-200 rounded-lg p-6 bg-gray-50',
                            style: { fontFamily: '"Times New Roman", serif', fontSize: '13px', lineHeight: '1.6' }
                        },
                            e('div', { className: 'text-center mb-4' },
                                e('p', { className: 'font-bold text-sm', style: { color: '#006B68' } }, 'NGÂN HÀNG TMCP ĐẦU TƯ VÀ PHÁT TRIỂN VIỆT NAM'),
                                e('p', { className: 'font-bold', style: { fontSize: '16px' } }, 'BIÊN BẢN LẤY Ý KIẾN BẰNG VĂN BẢN'),
                                e('p', { className: 'text-gray-600 text-sm' }, 'CỦA HỘI ĐỒNG TÍN DỤNG TRUNG ƯƠNG'),
                                e('p', { className: 'text-gray-500 text-xs mt-1' }, 'Số: BB-HĐTDTW-2026/' + hoSo.id.replace('HS', ''))
                            ),
                            e('p', { className: 'mb-2' }, 'Ngày: ...../...../2026'),
                            e('p', { className: 'mb-2' }, e('strong', null, 'Nội dung: '), 'Cho ý kiến về đề xuất cấp tín dụng đối với ', e('strong', null, hoSo.tenKH)),
                            e('p', { className: 'mb-2' }, e('strong', null, 'Tổng hạn mức đề xuất: '), hoSo.tongHanMuc),
                            e('p', { className: 'mb-2' }, e('strong', null, 'Kết quả biểu quyết: '), dongY + '/' + totalTV + ' đồng ý'),
                            e('p', { className: 'mb-2 font-bold', style: { color: dongY > totalTV / 2 ? '#15803d' : '#dc2626' } },
                                'Kết luận: ' + (dongY > totalTV / 2 ? 'THÔNG QUA' : 'KHÔNG THÔNG QUA')),
                            e('p', { className: 'text-gray-500 text-xs mt-4 italic' }, '(Biên bản này được tạo tự động bởi hệ thống LendingHub)')
                        )
                    )
                ),

                // Action buttons
                e('div', { className: 'flex justify-end gap-3' },
                    e('button', {
                        className: 'px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50',
                        onClick: () => {
                            setBienBanSaved(true);
                            if (typeof showToastNotification === 'function') {
                                showToastNotification('Đã lưu biên bản thành công!', 'success');
                            }
                        }
                    }, e('i', { className: 'fas fa-save mr-2' }), 'Lưu biên bản'),
                    e('button', {
                        className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005B58]',
                        onClick: () => {
                            if (typeof showToastNotification === 'function') {
                                showToastNotification('Đã trình duyệt biên bản & nghị quyết thành công!', 'success');
                            }
                        }
                    }, e('i', { className: 'fas fa-paper-plane mr-2' }), 'Trình phê duyệt')
                )
                ),
                renderBienBanSidebar()
            );
        }

        // =====================================================
        // RENDER: NHẮC NHỞ THÀNH VIÊN
        // =====================================================
        function renderNhacNho() {
            const pendingMembers = [
                ['TVHĐ-02', 'Phó Giám đốc KHDNNN', '25/05/2025 15:30', 'Chưa phản hồi', '0'],
                ['TVHĐ-03', 'Phó Giám đốc Ban KHDN', '25/05/2025 15:30', 'Chưa phản hồi', '0'],
                ['TVHĐ-04', 'Giám đốc phê duyệt cấp 2 Trung tâm TĐ&PD', '25/05/2025 15:30', 'Chưa phản hồi', '0']
            ];
            const selectedChannelCount = Object.values(reminderChannels).filter(Boolean).length;
            const sendReminder = (memberCode) => {
                if (selectedChannelCount === 0) {
                    notify('Vui lòng chọn ít nhất một kênh gửi nhắc nhở.', 'warning');
                    return;
                }

                if (memberCode === 'all') {
                    setReminderCounts(prev => {
                        const next = { ...prev };
                        pendingMembers.forEach(row => { next[row[0]] = (next[row[0]] || 0) + 1; });
                        return next;
                    });
                    notify('Đã gửi nhắc nhở hàng loạt tới ' + pendingMembers.length + ' thành viên.', 'success');
                    return;
                }

                setReminderCounts(prev => ({ ...prev, [memberCode]: (prev[memberCode] || 0) + 1 }));
                notify('Đã gửi nhắc nhở tới ' + memberCode + '.', 'success');
            };

            return e('div', { className: 'space-y-4' },
                e('div', { className: 'flex items-center justify-between' },
                    e('div', null,
                        e('h2', { className: 'text-lg font-bold text-gray-800' }, 'Tác vụ nhắc nhở Thành viên'),
                        e('div', { className: 'text-xs text-gray-500 mt-1' }, 'Theo dõi và gửi nhắc nhở đối với Thành viên Hội đồng chưa phản hồi phiếu lấy ý kiến')
                    ),
                    e('button', { className: 'h-9 px-4 border border-gray-200 rounded-lg text-sm font-semibold', onClick: () => setActiveScreen('tongHopYK') },
                        e('i', { className: 'fas fa-arrow-left mr-2' }), 'Quay lại tổng hợp'
                    )
                ),
                e('div', { className: 'bg-white rounded-lg shadow p-4 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-4' },
                    e('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-3 text-xs' },
                        [
                            ['Mã hồ sơ', 'LH2025.000113'],
                            ['Ngày gửi phiếu lấy ý kiến', '21/05/2025 09:25'],
                            ['Khách hàng (CIF)', 'KH00012345 - CÔNG TY ABC'],
                            ['Hạn gửi phiếu ý kiến', '25/05/2025 (Còn 1 ngày)'],
                            ['Loại nội dung xin ý kiến', selectedLoaiYKien.join(', ')],
                            ['Thời hạn tham gia ý kiến cuối cùng', '15:30 ngày 25/05/2025'],
                            ['Số Phiếu lấy ý kiến', 'PLYK-2025-0007'],
                            ['Tổng số Thành viên được đề nghị', '04 thành viên']
                        ].map(row =>
                            e('div', { key: row[0], className: 'flex justify-between gap-3 border-b border-gray-100 pb-2' },
                                e('span', { className: 'text-gray-500' }, row[0]),
                                e('span', { className: 'font-semibold text-blue-700 text-right' }, row[1])
                            )
                        )
                    ),
                    e('div', { className: 'rounded-lg border border-gray-100 p-3' },
                        e('h4', { className: 'font-semibold text-gray-800 mb-3' }, 'Trạng thái phản hồi'),
                        e('div', { className: 'grid grid-cols-3 gap-2 text-center text-xs' },
                            [['Đã phản hồi', '1', 'text-green-700 bg-green-50'], ['Chưa phản hồi', '3', 'text-orange-700 bg-orange-50'], ['Hết hạn', '0', 'text-red-700 bg-red-50']].map(item =>
                                e('div', { key: item[0], className: 'rounded-lg p-3 ' + item[2] },
                                    e('div', { className: 'text-xl font-bold' }, item[1]),
                                    e('div', null, item[0])
                                )
                            )
                        )
                    )
                ),
                e('div', { className: 'bg-white rounded-lg shadow overflow-hidden' },
                    e('div', { className: 'px-4 py-3 border-b border-gray-100 flex items-center justify-between' },
                        e('h3', { className: 'font-bold text-[#006B68]' }, 'Danh sách Thành viên chưa phản hồi'),
                        e('button', { className: 'h-8 px-3 bg-blue-600 text-white rounded-lg text-xs font-semibold', onClick: () => sendReminder('all') },
                            e('i', { className: 'fas fa-paper-plane mr-2' }), 'Gửi nhắc nhở hàng loạt'
                        )
                    ),
                    e('table', { className: 'w-full text-sm' },
                        e('thead', null, e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                            ['STT', 'Thành viên', 'Chức danh', 'Vai trò', 'Thời hạn phản hồi', 'Trạng thái phản hồi', 'Lần nhắc nhở gần nhất', 'Số lần nhắc nhở', 'Tác vụ'].map(h => e('th', { key: h, className: 'px-4 py-3 text-left font-semibold text-gray-700' }, h))
                        )),
                        e('tbody', null, pendingMembers.map((row, idx) =>
                            e('tr', { key: row[0], className: 'border-b border-gray-100' },
                                e('td', { className: 'px-4 py-3' }, idx + 1),
                                e('td', { className: 'px-4 py-3 font-semibold text-blue-700' }, row[0]),
                                e('td', { className: 'px-4 py-3' }, row[1]),
                                e('td', { className: 'px-4 py-3' }, 'Thành viên Hội đồng'),
                                e('td', { className: 'px-4 py-3 text-red-600 font-semibold' }, row[2], e('div', { className: 'text-xs' }, '(Còn 1 ngày)')),
                                e('td', { className: 'px-4 py-3' }, e('span', { className: 'px-2 py-1 rounded bg-orange-50 text-orange-700 text-xs font-semibold' }, row[3])),
                                e('td', { className: 'px-4 py-3 text-gray-400' }, '-'),
                                e('td', { className: 'px-4 py-3 text-center' }, (Number(row[4]) || 0) + (reminderCounts[row[0]] || 0)),
                                e('td', { className: 'px-4 py-3' }, e('button', { className: 'h-8 px-3 border border-blue-200 text-blue-700 rounded-lg text-xs font-semibold', onClick: () => sendReminder(row[0]) }, e('i', { className: 'fas fa-paper-plane mr-1' }), 'Gửi nhắc nhở'))
                            )
                        ))
                    )
                ),
                e('div', { className: 'grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-4' },
                    e('div', { className: 'bg-white rounded-lg shadow p-4' },
                        e('h3', { className: 'font-bold text-gray-800 mb-3' }, 'Nội dung nhắc nhở'),
                        e('label', { className: 'block text-xs font-semibold text-gray-600 mb-1' }, 'Tiêu đề nhắc nhở'),
                        e('input', {
                            className: 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3',
                            value: reminderTitle,
                            onChange: ev => setReminderTitle(ev.target.value)
                        }),
                        e('label', { className: 'block text-xs font-semibold text-gray-600 mb-1' }, 'Nội dung tin nhắn'),
                        e('textarea', {
                            className: 'w-full min-h-[120px] border border-gray-200 rounded-lg p-3 text-sm',
                            value: reminderMessage,
                            onChange: ev => setReminderMessage(ev.target.value)
                        }),
                        e('div', { className: 'flex gap-4 mt-3 text-sm' },
                            [
                                ['system', 'Hệ thống (Thông báo nội bộ)'],
                                ['email', 'Email'],
                                ['sms', 'SMS']
                            ].map((item) => e('label', { key: item[0], className: 'inline-flex items-center gap-2' },
                                e('input', {
                                    type: 'checkbox',
                                    checked: reminderChannels[item[0]],
                                    onChange: () => toggleReminderChannel(item[0]),
                                    className: 'accent-[#006B68]'
                                }),
                                item[1]
                            ))
                        )
                    ),
                    e('div', { className: 'bg-white rounded-lg shadow p-4 text-sm' },
                        e('h3', { className: 'font-bold text-[#006B68] mb-3' }, 'Tổng quan nhắc nhở'),
                        [['Số Thành viên chưa phản hồi', '3'], ['Gửi nhắc nhở', '3'], ['Thời hạn phản hồi', '25/05/2025 15:30'], ['Thời gian còn lại', '1 ngày 06:15:45'], ['Số lần nhắc nhở tối đa', '3 lần/Thành viên']].map(row =>
                            e('div', { key: row[0], className: 'flex justify-between gap-3 border-b border-gray-100 py-2' },
                                e('span', { className: 'text-gray-500' }, row[0]),
                                e('span', { className: 'font-semibold text-gray-800 text-right' }, row[1])
                            )
                        )
                    )
                ),
                e('div', { className: 'flex justify-end gap-3' },
                    e('button', { className: 'h-10 px-5 border border-gray-200 rounded-lg text-sm font-semibold', onClick: () => setActiveScreen('tongHopYK') }, 'Hủy'),
                    e('button', { className: 'h-10 px-5 bg-blue-600 text-white rounded-lg text-sm font-semibold', onClick: () => sendReminder('all') }, e('i', { className: 'fas fa-paper-plane mr-2' }), 'Gửi nhắc nhở')
                )
            );
        }

        // =====================================================
        // MAIN RENDER: CHI TIẾT HỒ SƠ
        // =====================================================
        return e('div', { className: 'flex h-screen w-full overflow-hidden' },
            e(Sidebar),
            e('div', { className: 'flex-1 flex flex-col h-full overflow-hidden' },
                e(Header, { onSwitchFlow: onSwitchFlow, roleLabel: 'Thư ký Hội đồng' }),
                // Page header
                e('div', { className: 'case-header flex-shrink-0' },
                    e('div', { className: 'case-breadcrumb' },
                        e('span', { className: 'text-[#006B68] cursor-pointer hover:underline', onClick: onBack }, 'Lending'),
                        e('i', { className: 'fas fa-chevron-right' }),
                        e('span', { className: 'text-[#006B68] cursor-pointer hover:underline', onClick: onBack }, 'Thư ký Hội đồng'),
                        e('i', { className: 'fas fa-chevron-right' }),
                        e('span', null, hoSo.tenKH)
                    ),
                    e('div', { className: 'case-title-row' },
                        e('h1', { className: 'case-title' },
                            e('i', { className: 'fas fa-chevron-left cursor-pointer', onClick: onBack }),
                            'Xử lý hồ sơ - Thư ký Hội đồng'
                        ),
                        e('div', { className: 'case-actions' },
                            e('button', {
                                className: 'case-btn case-btn-outline',
                                onClick: function() { setShowLichSuPopup(true); }
                            }, e('i', { className: 'fas fa-clock-rotate-left' }), 'Lịch sử lấy ý kiến'),
                            sessionStatus !== 'da-huy' && e('button', {
                                className: 'case-btn case-btn-outline',
                                style: { borderColor: '#ef4444', color: '#ef4444' },
                                onClick: function() { setShowHuyPhienPopup(true); setHuyPhienReason(''); setHuyPhienError(''); }
                            }, e('i', { className: 'fas fa-ban' }), 'Hủy phiên XYK'),
                            !isLocked && sessionStatus !== 'da-huy' && e('button', {
                                className: 'case-btn case-btn-primary',
                                style: { backgroundColor: '#006B68' },
                                onClick: function() { setShowTongHopKQPopup(true); }
                            }, e('i', { className: 'fas fa-chart-bar' }), 'Tổng hợp kết quả'),
                            e('button', {
                                className: 'case-btn case-btn-outline',
                                onClick: onBack
                            }, e('i', { className: 'fas fa-arrow-left' }), 'Quay lại'),
                            e('button', {
                                className: 'case-btn case-btn-primary',
                                onClick: () => {
                                    if (typeof showToastNotification === 'function') {
                                        showToastNotification('Đã lưu thành công!', 'success');
                                    }
                                }
                            }, e('i', { className: 'fas fa-save' }), 'Lưu')
                        )
                    ),
                    // Summary
                    e('div', { className: 'case-summary case-summary-mockup' },
                        summaryRows.map((row, rowIdx) =>
                            e('div', { key: rowIdx, className: 'case-summary-row' },
                                row.map((item, itemIdx) =>
                                    e('div', { key: itemIdx, className: 'case-summary-item' },
                                        e('span', { className: 'case-summary-label' }, item[0]),
                                        e('span', { className: 'case-summary-value' }, item[1])
                                    )
                                )
                            )
                        )
                    )
                ),
                // Body: Left nav + content
                e('div', { className: 'flex flex-1 overflow-hidden bg-[#eff2f5]' },
                    // Left nav
                    e('div', { className: 'nav-panel' },
                        navItems.map(item =>
                            e('div', {
                                key: item.id,
                                className: 'nav-panel-direct ' + (activeScreen === item.id ? 'active' : ''),
                                onClick: () => setActiveScreen(item.id)
                            },
                                e('span', { className: 'flex items-center gap-2' },
                                    e('i', { className: 'fas ' + item.icon + ' text-xs' }),
                                    item.label,
                                    item.badge > 0 && e('span', {
                                        className: 'ml-auto min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center'
                                    }, item.badge)
                                )
                            )
                        )
                    ),
                    // Content
                    e('div', { className: 'flex-1 overflow-y-auto px-3 md:px-5 py-3 md:py-4' },
                        // === TASK 14: Locked / Cancelled status banner ===
                        isLocked && e('div', { className: 'flex items-center gap-2 px-3 py-2 mb-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700 font-semibold' },
                            e('i', { className: 'fas fa-lock' }),
                            'Đã tổng hợp kết quả lúc ' + tongHopTimestamp + ' — Chế độ chỉ đọc'
                        ),
                        sessionStatus === 'da-huy' && e('div', { className: 'flex items-center gap-2 px-3 py-2 mb-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700 font-semibold' },
                            e('i', { className: 'fas fa-ban' }),
                            'Phiên lấy ý kiến đã bị hủy'
                        ),

                        activeScreen === 'tongQuan' && renderTongQuan(),
                        activeScreen === 'taoPYK' && renderTaoPYK(),
                        activeScreen === 'tongHopYK' && renderTongHopYK(),
                        activeScreen === 'bienBan' && renderBienBan(),
                        activeScreen === 'nhacNho' && renderNhacNho()
                    ),

                    // === TASK 14: Tổng hợp kết quả Popup ===
                    showTongHopKQPopup && e('div', {
                        className: 'fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4',
                        onClick: function(ev) { if (ev.target === ev.currentTarget) setShowTongHopKQPopup(false); }
                    },
                        e('div', { className: 'w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden' },
                            e('div', { className: 'px-5 py-4 border-b border-gray-200 bg-gray-50' },
                                e('h3', { className: 'text-base font-bold text-[#006B68]' }, 'Xác nhận tổng hợp kết quả')
                            ),
                            e('div', { className: 'p-5 space-y-3' },
                                e('div', { className: 'flex items-start gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2.5 leading-5' },
                                    e('i', { className: 'fas fa-triangle-exclamation mt-0.5 flex-shrink-0' }),
                                    e('span', null, 'Sau khi tổng hợp, toàn bộ phản hồi của TVHD sẽ bị khóa và chuyển sang chế độ chỉ đọc.')
                                ),
                                e('p', { className: 'text-sm text-gray-700' }, 'Bạn có chắc chắn muốn tổng hợp kết quả lấy ý kiến không?'),
                                e('div', { className: 'flex justify-end gap-2 pt-2' },
                                    e('button', {
                                        className: 'h-9 px-4 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700',
                                        onClick: function() { setShowTongHopKQPopup(false); }
                                    }, 'Hủy'),
                                    e('button', {
                                        className: 'h-9 px-5 bg-[#006B68] text-white rounded-lg text-sm font-semibold hover:bg-[#005B58]',
                                        onClick: function() {
                                            var now = new Date();
                                            var ts = now.toLocaleDateString('vi-VN') + ' ' + now.toLocaleTimeString('vi-VN');
                                            setTongHopTimestamp(ts);
                                            setIsLocked(true);
                                            setShowTongHopKQPopup(false);
                                            if (typeof showToastNotification === 'function') {
                                                showToastNotification('Đã tổng hợp kết quả thành công', 'success');
                                            }
                                        }
                                    }, e('i', { className: 'fas fa-check mr-2 text-xs' }), 'Xác nhận tổng hợp')
                                )
                            )
                        )
                    ),

                    // === TASK 14: Hủy phiên XYK Popup ===
                    showHuyPhienPopup && e('div', {
                        className: 'fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4',
                        onClick: function(ev) { if (ev.target === ev.currentTarget) setShowHuyPhienPopup(false); }
                    },
                        e('div', { className: 'w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden' },
                            e('div', { className: 'px-5 py-4 border-b border-gray-200 bg-gray-50' },
                                e('h3', { className: 'text-base font-bold text-red-600' }, 'Hủy phiên lấy ý kiến')
                            ),
                            e('div', { className: 'p-5 space-y-3' },
                                e('div', { className: 'flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5 leading-5' },
                                    e('i', { className: 'fas fa-exclamation-circle mt-0.5 flex-shrink-0' }),
                                    e('span', null, 'Hành động này sẽ hủy toàn bộ phiên lấy ý kiến và không thể hoàn tác.')
                                ),
                                e('div', null,
                                    e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1.5' },
                                        'Lý do hủy ', e('span', { className: 'text-red-500' }, '*')
                                    ),
                                    e('textarea', {
                                        className: 'w-full min-h-[80px] border rounded-lg p-3 text-sm outline-none ' +
                                            (huyPhienError ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-[#006B68] focus:ring-2 focus:ring-[#006B68]/10'),
                                        placeholder: 'Nhập lý do hủy phiên lấy ý kiến...',
                                        value: huyPhienReason,
                                        onChange: function(ev) { setHuyPhienReason(ev.target.value); setHuyPhienError(''); }
                                    }),
                                    huyPhienError && e('p', { className: 'text-xs text-red-500 mt-1' }, huyPhienError)
                                ),
                                e('div', { className: 'flex justify-end gap-2 pt-2' },
                                    e('button', {
                                        className: 'h-9 px-4 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700',
                                        onClick: function() { setShowHuyPhienPopup(false); }
                                    }, 'Quay lại'),
                                    e('button', {
                                        className: 'h-9 px-5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700',
                                        onClick: function() {
                                            if (!huyPhienReason.trim()) {
                                                setHuyPhienError('Vui lòng nhập lý do hủy phiên lấy ý kiến');
                                                return;
                                            }
                                            setSessionStatus('da-huy');
                                            setShowHuyPhienPopup(false);
                                            if (typeof showToastNotification === 'function') {
                                                showToastNotification('Đã hủy phiên lấy ý kiến', 'warning');
                                            }
                                        }
                                    }, e('i', { className: 'fas fa-ban mr-2 text-xs' }), 'Xác nhận hủy')
                                )
                            )
                        )
                    ),

                    // === TASK 14: Lịch sử lấy ý kiến Popup ===
                    showLichSuPopup && e('div', {
                        className: 'fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4',
                        onClick: function(ev) { if (ev.target === ev.currentTarget) setShowLichSuPopup(false); }
                    },
                        e('div', { className: 'w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden' },
                            e('div', { className: 'px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50' },
                                e('h3', { className: 'text-base font-bold text-[#006B68]' }, 'Lịch sử lấy ý kiến'),
                                e('button', {
                                    className: 'w-9 h-9 rounded-lg hover:bg-gray-200 text-gray-500',
                                    onClick: function() { setShowLichSuPopup(false); }
                                }, e('i', { className: 'fas fa-times' }))
                            ),
                            e('div', { className: 'p-5 overflow-x-auto' },
                                e('table', { className: 'w-full text-sm', style: { minWidth: '600px' } },
                                    e('thead', null,
                                        e('tr', { className: 'bg-[#006B68] text-white' },
                                            ['Thời gian', 'Người thao tác', 'Hành động', 'Nội dung'].map(function(h) {
                                                return e('th', { key: h, className: 'px-4 py-3 text-left font-semibold' }, h);
                                            })
                                        )
                                    ),
                                    e('tbody', null,
                                        mockLichSuData.map(function(row, idx) {
                                            var actionTone = row.hanhDong === 'Phản hồi ý kiến' ? 'bg-green-100 text-green-700'
                                                : row.hanhDong === 'Nhắc nhở' ? 'bg-orange-100 text-orange-700'
                                                : row.hanhDong === 'Gửi thông báo' ? 'bg-blue-100 text-blue-700'
                                                : 'bg-gray-100 text-gray-700';
                                            return e('tr', { key: idx, className: 'border-b border-gray-100 last:border-b-0 hover:bg-gray-50' },
                                                e('td', { className: 'px-4 py-3 text-gray-500 whitespace-nowrap' }, row.thoiGian),
                                                e('td', { className: 'px-4 py-3 font-semibold text-gray-800' }, row.nguoi),
                                                e('td', { className: 'px-4 py-3' },
                                                    e('span', { className: 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ' + actionTone }, row.hanhDong)
                                                ),
                                                e('td', { className: 'px-4 py-3 text-gray-600' }, row.noiDung)
                                            );
                                        })
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }

    // =====================================================
    // FLOW CONTROLLER
    // =====================================================

    window.TKHDFlow = function ({ onBack }) {
        const [screen, setScreen] = React.useState('dashboard');
        const [selectedHoSo, setSelectedHoSo] = React.useState(null);
        const [initialScreen, setInitialScreen] = React.useState('tongQuan');

        if (screen === 'chiTiet' && selectedHoSo) {
            return e(TKHDChiTietHoSo, {
                hoSo: selectedHoSo,
                initialScreen: initialScreen,
                onSwitchFlow: onBack,
                onBack: () => { setScreen('dashboard'); setSelectedHoSo(null); }
            });
        }

        // Dashboard
        return e('div', { className: 'flex h-screen w-full overflow-hidden' },
            e(Sidebar),
            e('div', { className: 'flex-1 flex flex-col h-full overflow-hidden' },
                e(Header, { onSwitchFlow: onBack, roleLabel: 'Thư ký Hội đồng' }),
                e(TKHDDashboard, {
                    onSelectHoSo: (hs, nextScreen) => { setSelectedHoSo(hs); setInitialScreen(nextScreen || 'tongQuan'); setScreen('chiTiet'); },
                    onBack: onBack
                })
            )
        );
    };

})();
