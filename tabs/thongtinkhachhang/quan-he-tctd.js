// =====================================================
// Tab: Quan hệ TCTD
// =====================================================

window.TabQuanHeTCTD = function () {
    const e = React.createElement;

    const [openMain, setOpenMain] = React.useState({
        thongTinChung: true,
        xepHangTinDung: true,
        quanHeBidv: true,
        dieuKienUyNhiem: true,
        phiTinDung: true,
        tctdKhac: true,
        nhomKhlqTctd: true
    });
    const [openOpinion, setOpenOpinion] = React.useState({
        bidvProposal: false,
        bidvRisk: true,
        phiProposal: false,
        phiRisk: true
    });
    const [bidvRiskMode, setBidvRiskMode] = React.useState('bo-sung');
    const [uyNhiemRiskMode, setUyNhiemRiskMode] = React.useState('bo-sung');
    const [phiRiskMode, setPhiRiskMode] = React.useState('bo-sung');
    const [selectedKhlqCustomer, setSelectedKhlqCustomer] = React.useState(null);
    const [customerType, setCustomerType] = React.useState('Khách hàng loại 1');
    const [debtGroup, setDebtGroup] = React.useState('Nhóm 1');
    const [overdueDebt, setOverdueDebt] = React.useState('X,000 tỷ');
    const [bidvRiskText, setBidvRiskText] = React.useState('1. Đánh giá uy tín của khách hàng trong quá trình quan hệ tín dụng\n\n2. Đánh giá tình hình thực hiện điều kiện điều khoản\n\n3. Đánh giá Quan hệ phi tín dụng & Tổng hòa lợi ích khách hàng');
    const [uyNhiemRiskText, setUyNhiemRiskText] = React.useState('Các điều kiện uỷ nhiệm chưa thực hiện hoặc đã thực hiện một phần đã được rà soát. Cần tiếp tục theo dõi thời hạn hoàn thành và cập nhật diễn giải đánh giá sau khi khách hàng bổ sung hồ sơ.');
    const [phiRiskText, setPhiRiskText] = React.useState('Khách hàng có quan hệ phi tín dụng ở mức ổn định, tuy nhiên mức độ sử dụng sản phẩm chưa đồng đều. Đề xuất tiếp tục khai thác tiền gửi, thanh toán, bảo lãnh và các sản phẩm ngoại hối để tăng tổng hòa lợi ích.');
    const [tctdKhacRiskMode, setTctdKhacRiskMode] = React.useState('day-du');
    const [tctdKhacRiskText, setTctdKhacRiskText] = React.useState('');
    const [showCanhBaoModal, setShowCanhBaoModal] = React.useState(false);
    const [showHoSoModal, setShowHoSoModal] = React.useState(false);
    const [showPhiTinDungModal, setShowPhiTinDungModal] = React.useState(false);

    // Dữ liệu cảnh báo sớm
    const canhBaoRows = [
        { stt: 1, tenDauHieu: 'Hệ số nợ tại BIDV cao', diemCanhBao: '24.458', mucCanhBao: 'Trung bình', mucTone: 'orange' },
        { stt: 2, tenDauHieu: 'Giải ngân 1 khoản gần hết hạn mức', diemCanhBao: '32.682', mucCanhBao: 'Cao', mucTone: 'red' },
        { stt: 3, tenDauHieu: 'Doanh thu không thay đổi qua 2 kỳ BCTC', diemCanhBao: '32.682', mucCanhBao: 'Thấp', mucTone: 'green' }
    ];

    // Dữ liệu danh sách hồ sơ
    const hoSoRows = [
        { stt: 1, maHS: 'HS-123', loaiHS: 'Điều chỉnh', tenHS: 'Hạn mức ngắn hạn 2025', ngayTrinh: '15/10/2028', nguoiKhoiTao: '15/10/2028', ngayPheDuyet: '19/10/2028', nguoiPheDuyet: '19/10/2028', trangThai: 'Đã phê duyệt', trangThaiTone: 'green' },
        { stt: 2, maHS: 'HS-123', loaiHS: 'Tái cấp', tenHS: 'Dự án đầu tư nhà xưởng', ngayTrinh: '04/05/2028', nguoiKhoiTao: '04/05/2028', ngayPheDuyet: '', nguoiPheDuyet: '', trangThai: 'Chờ xử lý', trangThaiTone: 'blue' },
        { stt: 3, maHS: 'HS-123', loaiHS: 'Điều chỉnh', tenHS: 'Vay mua máy móc sản xuất', ngayTrinh: '15/10/2027', nguoiKhoiTao: '15/10/2027', ngayPheDuyet: '20/10/2027', nguoiPheDuyet: '20/10/2027', trangThai: 'Đã từ chối', trangThaiTone: 'red' },
        { stt: 4, maHS: 'HS-123', loaiHS: 'Cấp mới', tenHS: 'Vay đầu tư TSCĐ gián tiếp', ngayTrinh: '03/05/2027', nguoiKhoiTao: '03/05/2027', ngayPheDuyet: '10/05/2027', nguoiPheDuyet: '10/05/2027', trangThai: 'Đã phê duyệt', trangThaiTone: 'green' }
    ];

    const toggleMain = (key) => setOpenMain(prev => ({ ...prev, [key]: !prev[key] }));
    const toggleOpinion = (key) => setOpenOpinion(prev => ({ ...prev, [key]: !prev[key] }));

    const bidvCreditRows = [
        { kind: 'group', stt: 'A', loai: 'Khoản tín dụng đang trình duyệt' },
        { kind: 'group', stt: 'I', loai: 'HMTD ngắn hạn' },
        { stt: '', loai: 'Cho vay', baoDam: 'link', status: 'Điều chỉnh', statusTone: 'yellow' },
        { stt: '', loai: 'Bảo lãnh', baoDam: 'link', status: 'Điều chỉnh', statusTone: 'yellow' },
        { stt: '', loai: 'Phát hành L/C', baoDam: 'link', status: 'Điều chỉnh', statusTone: 'yellow' },
        { stt: '', loai: 'Thẻ tín dụng DN...', status: 'Mới', statusTone: 'blue' },
        { kind: 'group', stt: 'B', loai: 'Khoản tín dụng đang hiệu lực' },
        { kind: 'group', stt: 'I', loai: 'Cấp tín dụng theo món' },
        { stt: '1', loai: 'Món Cho vay/Bảo lãnh/Phát hành L/C/Chiết khấu/Bao thanh toán 1', baoDam: 'link', status: 'Hiệu lực', statusTone: 'green' },
        { kind: 'group', stt: 'II', loai: 'GHTD Trung dài hạn' },
        { stt: '', loai: 'Dự án ...', baoDam: 'link', status: 'Hiệu lực', statusTone: 'green' },
        { stt: '', loai: '.....' }
    ];

    const uyNhiemRows = [
        { stt: 1, ma: 'CMT_2025_001', ten: 'Bảo lãnh thầu dự án', noiDung: 'Mục đích cấp tín dụng xác định rõ ràng...', danhGia: 'Chưa thực hiện', dienGiai: 'Đã nhận đủ hồ sơ' },
        { stt: 2, ma: 'CMT_2025_001', ten: 'Cho vay mua nhà ở xã hội', noiDung: 'Khoảng thời gian mà hạn mức tín dụng...', danhGia: 'Chưa thực hiện', dienGiai: 'Đã nhận đủ hồ sơ' },
        { stt: 3, ma: 'CMT_2025_001', ten: 'Bảo lãnh thực hiện hợp đồng', noiDung: 'Khoảng thời gian khách hàng được phép...', danhGia: 'Đã thực hiện 1 phần', dienGiai: 'Đã nhận đủ hồ sơ' },
        { stt: 4, ma: 'CMT_2025_001', ten: 'Cho vay dài hạn đầu tư', noiDung: 'Thời hạn tối đa để khách hàng hoàn trả...', danhGia: 'Đã thực hiện 1 phần', dienGiai: 'Đã nhận đủ hồ sơ' }
    ];

    const phiTinDungRows = [
        { kind: 'group', stt: 'I', chiTieu: 'Quan hệ phi tín dụng' },
        { stt: '1', chiTieu: 'Tiền gửi bình quân', t2: '125 tỷ', t1: '138 tỷ', t: '142 tỷ', quy: '148 tỷ' },
        { stt: '2', chiTieu: 'Tiền gửi cuối kỳ', t2: '98 tỷ', t1: '110 tỷ', t: '117 tỷ', quy: '120 tỷ' },
        { stt: '3', chiTieu: 'Hạn mức đối tác', t2: '80 tỷ', t1: '90 tỷ', t: '95 tỷ', quy: '100 tỷ' },
        { stt: '4', chiTieu: 'SP Treasury/Phái sinh khác', t2: '2', t1: '3', t: '4', quy: '4' },
        { kind: 'group', stt: 'II', chiTieu: 'Tổng hòa lợi ích' },
        { stt: '1', chiTieu: 'Thu nhập thuần từ lãi', t2: '8,2 tỷ', t1: '9,1 tỷ', t: '9,8 tỷ', quy: '10,4 tỷ' },
        { stt: '2', chiTieu: 'Thu nhập ngoài lãi', t2: '1,1 tỷ', t1: '1,4 tỷ', t: '1,6 tỷ', quy: '1,8 tỷ' },
        { stt: '3', chiTieu: 'Tổng lợi ích KH', t2: '9,3 tỷ', t1: '10,5 tỷ', t: '11,4 tỷ', quy: '12,2 tỷ' },
        { stt: '4', chiTieu: 'RoRWA', t2: '1,05%', t1: '1,12%', t: '1,18%', quy: '1,20%' }
    ];

    const tctdKhacRows = [
        { stt: 1, tctd: 'VCB', ghtdNH: '', ghtdTDH: '', duVayNH: '15.440,4', duVayTDH: '', camKet: '', nhomNo: '', noXau: '', vamc: '', tsbd: 'Bảo lãnh Bộ Tài chính, Tài sản HTTL, MMTB, Tín chấp' },
        { stt: 2, tctd: 'VCBNEO', ghtdNH: '', ghtdTDH: '', duVayNH: '11.280,9', duVayTDH: '', camKet: '', nhomNo: '', noXau: '', vamc: '', tsbd: 'Tài sản HTTL, Quyền tài sản' },
        { stt: 3, tctd: 'Agribank', ghtdNH: '', ghtdTDH: '', duVayNH: '2.659,3', duVayTDH: '577,2', camKet: '', nhomNo: '', noXau: '', vamc: '', tsbd: 'Bảo lãnh Bộ Tài chính, Tài sản HTTL, Quyền tài sản, MMTB, Tín chấp' },
        { stt: 4, tctd: 'VietinBank', ghtdNH: '', ghtdTDH: '', duVayNH: '2.133,6', duVayTDH: '106,4', camKet: '', nhomNo: '', noXau: '', vamc: '', tsbd: 'Bảo lãnh Bộ Tài chính, Tài sản HTTL, Quyền tài sản, Tiền gửi, Tín chấp' },
        { stt: 5, tctd: 'BIDV', ghtdNH: '', ghtdTDH: '', duVayNH: '1.653,5', duVayTDH: '245,3', camKet: '', nhomNo: '', noXau: '', vamc: '', tsbd: 'Bảo lãnh Bộ Tài chính, Tài sản HTTL, Quyền tài sản, MMTB, Tín chấp' },
        { stt: 6, tctd: 'SeaBank', ghtdNH: '', ghtdTDH: '', duVayNH: '737,3', duVayTDH: '', camKet: '', nhomNo: '', noXau: '', vamc: '', tsbd: 'Tín chấp' },
        { stt: 7, tctd: 'MSB', ghtdNH: '', ghtdTDH: '', duVayNH: '314,0', duVayTDH: '', camKet: '', nhomNo: '', noXau: '', vamc: '', tsbd: 'Quyền tài sản' },
        { stt: 8, tctd: 'TPBank', ghtdNH: '', ghtdTDH: '', duVayNH: '246,9', duVayTDH: '', camKet: '', nhomNo: '', noXau: '', vamc: '', tsbd: 'Tín chấp' },
        { stt: 9, tctd: 'Công ty Tài chính CP Điện lực', ghtdNH: '', ghtdTDH: '', duVayNH: '215,7', duVayTDH: '', camKet: '', nhomNo: '', noXau: '', vamc: '', tsbd: 'MMTB' },
        { stt: 10, tctd: 'Woori', ghtdNH: '', ghtdTDH: '', duVayNH: '181,1', duVayTDH: '', camKet: '', nhomNo: '', noXau: '', vamc: '', tsbd: 'Tín chấp' },
        { stt: 11, tctd: 'Taipei Fubon', ghtdNH: '', ghtdTDH: '', duVayNH: '130,1', duVayTDH: '', camKet: '', nhomNo: '', noXau: '', vamc: '', tsbd: 'Tín chấp' },
        { stt: 12, tctd: 'VIB', ghtdNH: '', ghtdTDH: '', duVayNH: '130,1', duVayTDH: '', camKet: '', nhomNo: '', noXau: '', vamc: '', tsbd: 'BĐS, Quyền đòi nợ' },
        { stt: 13, tctd: 'MB Bank', ghtdNH: '', ghtdTDH: '', duVayNH: '102,5', duVayTDH: '', camKet: '', nhomNo: '', noXau: '', vamc: '', tsbd: 'Quyền tài sản' },
        { stt: 14, tctd: 'Bank of China', ghtdNH: '', ghtdTDH: '', duVayNH: '46,9', duVayTDH: '', camKet: '', nhomNo: '', noXau: '', vamc: '', tsbd: 'Bảo lãnh Bộ Tài chính' }
    ];

    // ── Khối 5: Dữ liệu nhóm KHLQ ──
    const khlqNhomList = [
        { stt: 1, nhom: 'EVN GENCO', isDominant: true, vaiTro: 'Thành viên', tongGHTD: 48778, tongDuNo: 41179, cnql: 'CN Hà Nội', capPD: 'Cấp A', tylVTC: '18,6%' },
        { stt: 2, nhom: 'EVN SPC', isDominant: false, vaiTro: 'Thành viên', tongGHTD: 48105, tongDuNo: 40466, cnql: 'CN Hà Nội', capPD: 'Cấp B', tylVTC: '18,2%' },
        { stt: 3, nhom: 'EVN CPC', isDominant: false, vaiTro: 'Thành viên', tongGHTD: 48034, tongDuNo: 40395, cnql: 'CN Hà Nội', capPD: 'Cấp C', tylVTC: '18,2%' },
        { stt: 4, nhom: 'EVN', isDominant: false, vaiTro: 'Trung tâm', tongGHTD: 48269, tongDuNo: 40670, cnql: 'CN Hà Nội', capPD: 'Cấp D', tylVTC: '18,3%' },
        { stt: 5, nhom: 'EVN GENCO1', isDominant: false, vaiTro: 'Thành viên', tongGHTD: 48014, tongDuNo: 40415, cnql: 'CN Hà Nội', capPD: 'Cấp E', tylVTC: '18,2%' },
        { stt: 6, nhom: 'EVN NPC', isDominant: false, vaiTro: 'Thành viên', tongGHTD: 47571, tongDuNo: 39972, cnql: 'CN Hà Nội', capPD: 'Cấp F', tylVTC: '18,0%' },
        { stt: 7, nhom: 'EVN GENCO2', isDominant: false, vaiTro: 'Thành viên', tongGHTD: 47640, tongDuNo: 40041, cnql: 'CN Hà Nội', capPD: 'Cấp G', tylVTC: '' }
    ];

    const khlqKhList = [
        { stt: 1, nhom: 'EVN', ten: 'Tập đoàn Điện lực Việt Nam', cif: '297', cnql: '', vaiTro: 'Trung tâm', moiQH: 'Khách hàng vay', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '', isHighlight: true },
        { stt: 2, nhom: 'EVN GENCO3', ten: 'TCT Phát điện 3', cif: '1353572', cnql: 'CN Hà Nội', vaiTro: 'Thành viên', moiQH: 'Công ty mẹ', tongGHTD: 'xxxx', tongDuNo: 'xxxx', tyTrong: '', cic: '' },
        { stt: 3, nhom: 'EVN GENCO3', ten: 'CTCP Thủy điện Vĩnh Sơn Sông Hinh', cif: '509244', cnql: 'CN Sở giao dịch', vaiTro: 'Thành viên', moiQH: 'Công ty liên kết', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 4, nhom: 'EVN GENCO3', ten: 'CTCP Thủy điện Buôn Đôn', cif: '2911357', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty liên kết', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 5, nhom: 'EVN GENCO2', ten: 'TCT Phát điện 2', cif: '6360044', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 6, nhom: 'EVN GENCO2', ten: 'CTCP Thủy điện A Vương', cif: '2088052', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 7, nhom: 'EVN GENCO1', ten: 'TCT Phát điện 1', cif: '490577', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 8, nhom: 'EVN GENCO1', ten: 'CTCP Nhiệt điện Quảng Ninh', cif: '4971641', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty liên kết', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 9, nhom: 'EVN GENCO1', ten: 'CTCP PT điện lực Việt Nam', cif: '7757730', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty liên kết', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 10, nhom: 'EVN NPC', ten: 'TCT Điện lực Miền Bắc', cif: '161813', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 11, nhom: 'EVN NPC', ten: 'CTCP Thủy điện Hồ Bốn', cif: '1831546', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 12, nhom: 'EVN NPC', ten: 'CTCP ĐTPT Bắc Minh', cif: '2329335', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 13, nhom: 'EVN NPC', ten: 'CTCP Thủy điện Nậm Đông 4', cif: '7185199', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty liên kết', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 14, nhom: 'EVN SPC', ten: 'TCT Điện lực Miền Nam', cif: '93340', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 15, nhom: 'EVN SPC', ten: 'CTCP Thủy điện Miền Nam', cif: '20593429', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty liên kết', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 16, nhom: 'EVN SPC', ten: 'CTCP ĐTKD Điện lực HCM', cif: '6752458', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 17, nhom: 'EVN CPC', ten: 'TCT Điện lực Miền Trung', cif: '257075', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 18, nhom: 'EVN CPC', ten: 'CTCP Điện lực Khánh Hòa', cif: '311745', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 19, nhom: 'EVN CPC', ten: 'CTCP Thủy điện Miền Trung', cif: '11741779', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty liên kết', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 20, nhom: 'EVN', ten: 'TCT Điện lực TP Hà Nội', cif: '376', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 21, nhom: 'EVN', ten: 'TCT Truyền tải điện Quốc gia', cif: '2477120', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 22, nhom: 'EVN', ten: 'CTCP Tư vấn XD Điện 1', cif: '134658', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 23, nhom: 'EVN', ten: 'CTCP Tư vấn XD Điện 2', cif: '93115', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 24, nhom: 'EVN', ten: 'CTCP Tư vấn XD Điện 3', cif: '95234', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty liên kết', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' },
        { stt: 25, nhom: 'EVN', ten: 'CTCP Tư vấn XD Điện 4', cif: '311145', cnql: '', vaiTro: 'Thành viên', moiQH: 'Công ty con', tongGHTD: '', tongDuNo: '', tyTrong: '', cic: '' }
    ];


    const statusPill = (text, tone) => {
        const tones = {
            green: 'bg-[#e6f4da] text-[#2b7a0b] ring-[#cde8bd]',
            yellow: 'bg-[#fff0bf] text-[#8a5a00] ring-[#f1d889]',
            blue: 'bg-[#dceff8] text-[#006b9a] ring-[#b9e0f0]',
            red: 'bg-red-50 text-red-700 ring-red-100'
        };
        return text ? e('span', { className: 'inline-flex h-6 min-w-[78px] items-center justify-center rounded-full px-2.5 text-xs font-semibold whitespace-nowrap ring-1 ring-inset ' + (tones[tone] || tones.green) }, text) : null;
    };

    const sectionShell = (key, title, icon, children, rightText) =>
        e('section', { className: 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm' },
            e('button', {
                type: 'button',
                className: 'w-full px-4 py-3 bg-[#006B68] text-white flex items-center justify-between text-left hover:bg-[#005f5c] transition-colors',
                onClick: () => toggleMain(key)
            },
                e('div', { className: 'flex items-center gap-2 min-w-0' },
                    e('span', { className: 'inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 shrink-0' },
                        e('i', { className: icon + ' text-sm' })
                    ),
                    e('span', { className: 'text-sm font-semibold truncate' }, title)
                ),
                e('div', { className: 'flex items-center gap-3' },
                    rightText && e('span', { className: 'hidden md:inline text-xs italic text-white/80' }, rightText),
                    e('i', { className: 'fas fa-chevron-' + (openMain[key] ? 'up' : 'down') + ' text-xs' })
                )
            ),
            openMain[key] && e('div', { className: 'bg-[#f4f7f7] p-3 md:p-4 space-y-3' }, children)
        );

    const opinionSection = (key, title, icon, children) => {
        const isOpen = openOpinion[key];
        return e('div', { className: 'border border-[#c7e6e3] bg-white rounded-xl overflow-hidden shadow-sm' },
            e('button', {
                type: 'button',
                className: 'w-full min-h-[48px] px-4 py-3 bg-[#e8f7f5] flex items-center justify-between text-left hover:bg-[#dff2f0] transition-colors',
                onClick: () => toggleOpinion(key)
            },
                e('div', { className: 'flex items-center gap-3' },
                    e('span', { className: 'inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/70 shrink-0' },
                        e('i', { className: icon + ' text-[#d69a00] text-sm' })
                    ),
                    e('span', { className: 'text-sm font-semibold text-[#006B68]' }, title)
                ),
                e('div', { className: 'flex items-center gap-2 text-xs text-gray-500 shrink-0' },
                    e('span', null, isOpen ? 'Đang mở' : 'Đang thu gọn'),
                    e('i', { className: 'fas fa-chevron-' + (isOpen ? 'up' : 'down') + ' text-[#006B68]' })
                )
            ),
            isOpen && e('div', { className: 'p-3 md:p-4 space-y-3 bg-white' }, children)
        );
    };

    const reviewControls = (mode, setMode, text, setText) =>
        e('div', { className: 'border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm' },
            e('div', { className: 'px-4 py-3 flex flex-wrap items-center gap-x-8 gap-y-3 bg-[#f8fbfb] border-b border-gray-100' },
                e('span', { className: 'text-sm font-semibold text-[#006B68]' }, 'Đánh giá ý kiến Bộ phận đề xuất'),
                e('label', { className: 'inline-flex items-center gap-2 text-sm font-medium text-gray-800 cursor-pointer' },
                    e('input', {
                        type: 'radio',
                        checked: mode === 'day-du',
                        onChange: () => setMode('day-du'),
                        className: 'w-4 h-4 accent-[#006B68]'
                    }),
                    'Đã đánh giá đầy đủ'
                ),
                e('label', { className: 'inline-flex items-center gap-2 text-sm font-medium text-gray-800 cursor-pointer' },
                    e('input', {
                        type: 'radio',
                        checked: mode === 'bo-sung',
                        onChange: () => setMode('bo-sung'),
                        className: 'w-4 h-4 accent-[#006B68]'
                    }),
                    'Bổ sung ý kiến'
                )
            ),
            mode === 'bo-sung' && e('div', { className: 'p-4' },
                e('textarea', {
                    className: 'w-full min-h-[112px] resize-y border border-gray-300 rounded-lg px-3 py-2 text-sm leading-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#006B68]/20 focus:border-[#006B68]',
                    value: text,
                    maxLength: 4000,
                    onChange: ev => setText(ev.target.value)
                }),
                e('div', { className: 'mt-1 text-right text-xs text-gray-400' }, text.length + '/4000')
            )
        );

    const simpleReadonlyBox = (title, text) =>
        e('div', { className: 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm' },
            e('div', { className: 'px-4 py-2.5 border-b border-gray-200 bg-[#f8fbfb] text-sm font-semibold text-[#006B68]' }, title),
            e('div', { className: 'px-4 py-3 text-sm leading-6 text-gray-800 whitespace-pre-line' }, text)
        );

    const renderGeneralInfo = () =>
        sectionShell('thongTinChung', 'Thông tin chung', 'fas fa-scroll',
            e('div', { className: 'qhtctd-flat-wrap' },

                e('div', { className: 'qhtctd-flat-group-hdr' }, 'Tình trạng tín dụng'),
                e('div', { className: 'qhtctd-flat-row' },
                    e('div', { className: 'qhtctd-flat-cell' },
                        e('span', { className: 'qhtctd-flat-lbl' }, 'Nhóm nợ'),
                        debtGroupSelect()
                    ),
                    e('div', { className: 'qhtctd-flat-cell' },
                        e('span', { className: 'qhtctd-flat-lbl' }, 'Loại KH'),
                        customerTypeSelect()
                    ),
                    e('div', { className: 'qhtctd-flat-cell is-empty' })
                ),

                e('div', { className: 'qhtctd-flat-group-hdr' }, 'Quy mô & sử dụng hạn mức'),
                e('div', { className: 'qhtctd-flat-row' },
                    e('div', { className: 'qhtctd-flat-cell' },
                        e('span', { className: 'qhtctd-flat-lbl' }, 'Dư nợ hiện tại'),
                        e('span', { className: 'qhtctd-flat-val' },
                            '1,200 tỷ',
                            amountWithHint('', [
                                ['Cho vay', '900 tỷ đồng'],
                                ['Bảo lãnh', '200 tỷ đồng'],
                                ['LC', '100 tỷ đồng']
                            ])
                        )
                    ),
                    e('div', { className: 'qhtctd-flat-cell' },
                        e('span', { className: 'qhtctd-flat-lbl' }, 'Nợ quá hạn'),
                        overdueDebtDisplay()
                    ),
                    e('div', { className: 'qhtctd-flat-cell' },
                        e('span', { className: 'qhtctd-flat-lbl' }, 'Giá trị TSBĐ (quy đổi)'),
                        e('span', { className: 'qhtctd-flat-val' }, '420 tỷ')
                    )
                ),
                e('div', { className: 'qhtctd-flat-row' },
                    e('div', { className: 'qhtctd-flat-cell' },
                        e('span', { className: 'qhtctd-flat-lbl' }, 'Hạn mức được cấp'),
                        e('span', { className: 'qhtctd-flat-val' },
                            '1,500 tỷ',
                            amountWithHint('', [
                                ['Cho vay', '1.000 tỷ đồng'],
                                ['Bảo lãnh', '300 tỷ đồng'],
                                ['LC', '200 tỷ đồng']
                            ])
                        )
                    ),
                    e('div', { className: 'qhtctd-flat-cell is-empty' }),
                    e('div', { className: 'qhtctd-flat-cell is-empty' })
                ),

                e('div', { className: 'qhtctd-flat-group-hdr' }, 'Lịch sử quan hệ'),
                e('div', { className: 'qhtctd-flat-row is-last' },
                    e('div', { className: 'qhtctd-flat-cell' },
                        e('span', { className: 'qhtctd-flat-lbl' }, 'Ngày phát sinh số dư cấp tín dụng'),
                        e('span', { className: 'qhtctd-flat-val' }, '06/05/2026')
                    ),
                    e('div', { className: 'qhtctd-flat-cell' },
                        e('span', { className: 'qhtctd-flat-lbl' }, 'Cảnh báo sớm'),
                        e('a', { className: 'qhtctd-compact-link cursor-pointer', onClick: () => setShowCanhBaoModal(true) }, '[Xem chi tiết]')
                    ),
                    e('div', { className: 'qhtctd-flat-cell' },
                        e('span', { className: 'qhtctd-flat-lbl' }, 'Danh sách hồ sơ'),
                        e('a', { className: 'qhtctd-compact-link cursor-pointer', onClick: () => setShowHoSoModal(true) }, '[Xem chi tiết]')
                    )
                )
            )
        );

    const renderRatingSection = () =>
        e('section', { className: 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm' },
            e('button', {
                type: 'button',
                className: 'w-full px-4 py-3 bg-[#006B68] text-white flex items-center justify-between text-left hover:bg-[#005f5c] transition-colors',
                onClick: () => toggleMain('xepHangTinDung')
            },
                e('div', { className: 'flex items-center gap-2 min-w-0' },
                    e('span', { className: 'inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 shrink-0' },
                        e('i', { className: 'fas fa-award text-sm' })
                    ),
                    e('span', { className: 'text-sm font-semibold truncate' }, 'Xếp hạng tín dụng')
                ),
                e('div', { className: 'flex items-center gap-3' },
                    e('span', {
                        className: 'hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 hover:bg-white/25 rounded-md text-xs font-medium text-white cursor-pointer transition-colors',
                        title: 'Điều hướng đến màn hình chi tiết Lịch sử xếp hạng',
                        onClick: (ev) => { ev.stopPropagation(); }
                    },
                        e('i', { className: 'fas fa-history text-[10px]' }),
                        'Lịch sử xếp hạng'
                    ),
                    e('i', { className: 'fas fa-chevron-' + (openMain['xepHangTinDung'] ? 'up' : 'down') + ' text-xs' })
                )
            ),
            openMain['xepHangTinDung'] && e('div', { className: 'bg-[#f4f7f7] p-3 md:p-4 space-y-3' },
                e('div', { className: 'qhtctd-rating-matrix' },
                    e('div', { className: 'qhtctd-rating-toolbar' },
                        e('div', { className: 'text-xs text-gray-500' }, 'Kết quả xếp hạng hiện hành theo hồ sơ gần nhất'),
                        e('a', { className: 'qhtctd-compact-link cursor-pointer' }, '[Xem chi tiết]')
                    ),
                    e('div', { className: 'qhtctd-rating-cards' },
                        ratingItem('XHTDNB', 'AA', 'fas fa-gauge-high'),
                        ratingItem('Ngày duyệt', '29/04/2026', 'fas fa-calendar-check'),
                        ratingItem('BCTC', 'BCTC thuế', 'fas fa-file-invoice')
                    )
                )
            )
        );

    function compactTitle(title) {
        return e('div', { className: 'qhtctd-compact-title' }, title);
    }

    function compactRow(label, value) {
        return e('div', { className: 'qhtctd-compact-row' },
            e('span', { className: 'qhtctd-compact-label' }, label),
            value
        );
    }

    function infoField(label, value) {
        return e('div', { className: 'qhtctd-info-field' },
            e('span', { className: 'qhtctd-compact-label' }, label),
            value
        );
    }

    function debtGroupSelect() {
        return e('select', {
            className: 'qhtctd-compact-select is-green',
            value: debtGroup,
            onChange: ev => setDebtGroup(ev.target.value)
        },
            e('option', null, 'Nhóm 1'),
            e('option', null, 'Nhóm 2'),
            e('option', null, 'Nhóm 3'),
            e('option', null, 'Nhóm 4'),
            e('option', null, 'Nhóm 5')
        );
    }

    function customerTypeSelect() {
        return e('select', {
            className: 'qhtctd-compact-select is-blue',
            value: customerType,
            onChange: ev => setCustomerType(ev.target.value)
        },
            e('option', null, 'Khách hàng loại 1'),
            e('option', null, 'Khách hàng loại 2')
        );
    }

    function overdueDebtDisplay() {
        return e('span', {
            className: 'qhtctd-flat-val',
            style: { color: '#dc2626', fontWeight: 600 }
        }, overdueDebt);
    }

    function generalCardTitle(title, icon) {
        return e('div', { className: 'qhtctd-card-title' },
            e('span', null, e('i', { className: icon + ' text-xs' })),
            e('h4', null, title)
        );
    }

    function generalMetricCard(label, amount, unit, details) {
        return e('div', { className: 'qhtctd-metric-card' },
            e('div', { className: 'qhtctd-mini-label' }, label),
            e('div', { className: 'qhtctd-metric-value' },
                e('span', null, amount),
                e('small', null, unit),
                amountWithHint('', details)
            )
        );
    }

    function quickLinkTile(title, desc, icon) {
        return e('a', { className: 'qhtctd-action-tile cursor-pointer' },
            e('span', { className: 'qhtctd-action-icon' }, e('i', { className: icon + ' text-xs' })),
            e('span', { className: 'min-w-0' },
                e('b', null, title),
                e('small', null, desc)
            ),
            e('i', { className: 'fas fa-arrow-right text-[11px] ml-auto' })
        );
    }

    function ratingItem(label, value, icon) {
        return e('div', { className: 'qhtctd-rating-item' },
            e('span', { className: 'qhtctd-rating-item-icon' }, e('i', { className: icon + ' text-xs' })),
            e('span', null,
                e('small', null, label),
                e('b', null, value)
            )
        );
    }

    function amountWithHint(value, details) {
        const onMouseEnter = (ev) => {
            const icon = ev.currentTarget;
            const popover = icon.querySelector('.qhtctd-info-popover');
            if (!popover) return;
            const rect = icon.getBoundingClientRect();
            const pw = 210;
            let left = rect.left + rect.width / 2 - pw / 2;
            if (left < 8) left = 8;
            if (left + pw > window.innerWidth - 8) left = window.innerWidth - pw - 8;
            const top = rect.top - 8;
            popover.style.left = left + 'px';
            popover.style.top = top + 'px';
            popover.style.transform = 'translateY(-100%)';
            popover.style.minWidth = pw + 'px';
        };
        return e('span', { className: 'inline-flex items-center gap-2 font-medium text-[#006B68]' },
            value ? e('span', null, value) : null,
            e('span', { className: 'qhtctd-info-tip', onMouseEnter },
                e('i', { className: 'fas fa-circle-info text-xs' }),
                e('span', { className: 'qhtctd-info-popover' },
                    details.map(([label, amount]) =>
                        e('span', { key: label, className: 'qhtctd-info-popover-row' },
                            e('span', null, label),
                            e('b', null, amount)
                        )
                    )
                )
            )
        );
    }

    function infoRow(label, value) {
        return e('div', { className: 'grid grid-cols-[180px_minmax(0,1fr)] gap-3 items-center text-sm' },
            e('span', { className: 'text-gray-700' }, label),
            typeof value === 'string' ? e('span', { className: 'font-medium text-[#006B68]' }, value) : value
        );
    }

    const renderCreditTable = () =>
        e('div', { className: 'qhtctd-scroll bg-white border border-gray-200 rounded-xl overflow-x-auto shadow-sm' },
            e('table', { className: 'w-full min-w-[1120px] text-[13px]' },
                e('thead', null,
                    e('tr', { className: 'bg-[#f8fbfb] border-b border-[#d7e5e3] text-[#006B68]' },
                        ['TT', 'Loại hình/Khoản tín dụng', 'Số tiền cấp tín dụng', 'Mục đích', 'Dư nợ', 'Thời hạn', 'Ngày hết hạn', 'Biện pháp bảo đảm', 'Trạng thái Khoản tín dụng'].map((h, idx) =>
                            e('th', {
                                key: h,
                                className: 'px-3 py-2.5 text-center text-xs font-semibold border-r border-[#d7e5e3] leading-4 ' +
                                    (idx === 0 ? 'w-11 ' : idx === 1 ? 'w-[220px] text-left ' : idx === 7 ? 'w-[200px] text-left ' : idx === 8 ? 'w-[120px] ' : 'w-[105px] ')
                            }, h)
                        )
                    )
                ),
                e('tbody', null,
                    bidvCreditRows.map((row, idx) =>
                        e('tr', { key: idx, className: 'border-b border-[#edf2f1] hover:bg-[#f8fbfb] ' + (row.kind === 'group' ? 'font-semibold text-[#006B68] bg-white' : 'text-gray-700') },
                            e('td', { className: 'px-3 py-2.5 text-center border-r border-[#edf2f1] align-middle' }, row.stt || ''),
                            e('td', { className: 'px-3 py-2.5 border-r border-[#edf2f1] align-middle leading-5' }, row.loai || ''),
                            e('td', { className: 'px-3 py-2.5 text-right border-r border-[#edf2f1] align-middle whitespace-nowrap' }, row.soTien || ''),
                            e('td', { className: 'px-3 py-2.5 border-r border-[#edf2f1] align-middle leading-5' }, row.mucDich || ''),
                            e('td', { className: 'px-3 py-2.5 text-right border-r border-[#edf2f1] align-middle whitespace-nowrap' }, row.duNo || ''),
                            e('td', { className: 'px-3 py-2.5 text-center border-r border-[#edf2f1] align-middle whitespace-nowrap' }, row.thoiHan || ''),
                            e('td', { className: 'px-3 py-2.5 text-center border-r border-[#edf2f1] align-middle whitespace-nowrap' }, row.ngayHetHan || ''),
                            e('td', { className: 'px-3 py-2.5 border-r border-[#edf2f1] align-middle leading-5' },
                                row.baoDam === 'link'
                                    ? e('a', { className: 'qhtctd-compact-link cursor-pointer whitespace-nowrap' }, 'Chi tiết BPBĐ')
                                    : e('span', { className: 'italic text-gray-500' }, row.baoDam || '')
                            ),
                            e('td', { className: 'px-3 py-2.5 text-center align-middle' }, statusPill(row.status, row.statusTone))
                        )
                    )
                )
            )
        );

    const renderUyNhiemTable = () =>
        e('div', { className: 'qhtctd-scroll bg-white border border-gray-200 rounded-xl overflow-x-auto shadow-sm' },
            e('table', { className: 'w-full min-w-[1020px] text-[13px]' },
                e('thead', null,
                    e('tr', { className: 'bg-[#f8fbfb] border-b border-[#d7e5e3] text-[#006B68]' },
                        [
                            ['STT', 'w-12 text-center'], ['Mã commitment/TSBĐ', 'w-[170px]'], ['Tên commitment/TSBĐ', 'w-[260px]'],
                            ['Nội dung điều kiện', 'w-[360px]'], ['Đánh giá', 'w-[150px]'], ['Diễn giải đánh giá', 'w-[180px]']
                        ].map(([h, w]) => e('th', { key: h, className: 'px-3 py-2.5 text-left text-xs font-semibold border-r border-[#d7e5e3] leading-4 ' + w }, h))
                    )
                ),
                e('tbody', null,
                    uyNhiemRows.map(row =>
                        e('tr', { key: row.stt, className: 'border-b border-[#edf2f1] text-gray-700 hover:bg-[#f8fbfb]' },
                            e('td', { className: 'px-3 py-2.5 text-center border-r border-[#edf2f1] align-middle' }, row.stt),
                            e('td', { className: 'px-3 py-2.5 border-r border-[#edf2f1] text-[#006B68] align-middle whitespace-nowrap font-medium' }, row.ma),
                            e('td', { className: 'px-3 py-2.5 border-r border-[#edf2f1] align-middle leading-5' }, row.ten),
                            e('td', { className: 'px-3 py-2.5 border-r border-[#edf2f1] align-middle leading-5' }, row.noiDung),
                            e('td', { className: 'px-3 py-2.5 border-r border-[#edf2f1] align-middle leading-5 font-medium ' + (row.danhGia === 'Chưa thực hiện' ? 'bg-red-50 text-red-700' : row.danhGia === 'Đã thực hiện 1 phần' ? 'bg-amber-50 text-amber-700' : 'text-[#006B68]') }, row.danhGia),
                            e('td', { className: 'px-3 py-2.5 align-middle leading-5' }, row.dienGiai)
                        )
                    )
                )
            )
        );

    const renderPhiTinDungTable = () =>
        e('div', { className: 'qhtctd-scroll bg-white border border-gray-200 rounded-xl overflow-x-auto max-w-[900px] shadow-sm' },
            e('table', { className: 'w-full min-w-[760px] text-[13px]' },
                e('thead', null,
                    e('tr', { className: 'bg-[#f8fbfb] border-b border-[#d7e5e3] text-[#006B68]' },
                        ['TT', 'Chỉ tiêu', 'N-2', 'N-1', 'N', 'Quý gần nhất'].map((h, idx) =>
                            e('th', { key: h, className: 'px-3 py-2.5 text-xs font-semibold border-r border-[#d7e5e3] whitespace-nowrap ' + (idx === 1 ? 'text-left w-[280px]' : 'text-center') }, h)
                        )
                    )
                ),
                e('tbody', null,
                    phiTinDungRows.map((row, idx) =>
                        e('tr', { key: idx, className: 'border-b border-[#edf2f1] hover:bg-[#f8fbfb] ' + (row.kind === 'group' ? 'font-semibold text-[#006B68] bg-white' : 'text-gray-700') },
                            e('td', { className: 'px-3 py-2.5 text-center border-r border-[#edf2f1]' }, row.stt),
                            e('td', { className: 'px-3 py-2.5 border-r border-[#edf2f1]' }, row.chiTieu),
                            e('td', { className: 'px-3 py-2.5 text-right border-r border-[#edf2f1] whitespace-nowrap' }, row.t2 || ''),
                            e('td', { className: 'px-3 py-2.5 text-right border-r border-[#edf2f1] whitespace-nowrap' }, row.t1 || ''),
                            e('td', { className: 'px-3 py-2.5 text-right border-r border-[#edf2f1] whitespace-nowrap' }, row.t || ''),
                            e('td', { className: 'px-3 py-2.5 text-right whitespace-nowrap' }, row.quy || '')
                        )
                    )
                )
            )
        );

    const renderTctdKhacTable = () =>
        e('div', { className: 'qhtctd-scroll bg-white border border-gray-200 rounded-xl overflow-x-auto shadow-sm' },
            e('table', { className: 'w-full min-w-[1120px] text-[13px]' },
                e('thead', null,
                    e('tr', { className: 'bg-[#f8fbfb] border-b border-[#d7e5e3] text-[#006B68]' },
                        e('th', { className: 'px-3 py-2 text-center text-xs font-semibold border-r border-gray-200 w-12', rowSpan: 2 }, 'TT'),
                        e('th', { className: 'px-3 py-2 text-left text-xs font-semibold border-r border-gray-200 w-[180px]', rowSpan: 2 }, 'TCTD'),
                        e('th', { className: 'px-3 py-2 text-center text-xs font-semibold border-r border-gray-200', colSpan: 2 }, 'GHTD được cấp'),
                        e('th', { className: 'px-3 py-2 text-center text-xs font-semibold border-r border-gray-200', colSpan: 3 }, 'Dư nợ tín dụng'),
                        e('th', { className: 'px-3 py-2 text-center text-xs font-semibold border-r border-gray-200 w-[100px]', rowSpan: 2 }, 'Nhóm nợ'),
                        e('th', { className: 'px-3 py-2 text-center text-xs font-semibold border-r border-gray-200 w-[120px]', rowSpan: 2 }, 'Dư nợ xấu hiện tại'),
                        e('th', { className: 'px-3 py-2 text-center text-xs font-semibold border-r border-gray-200 w-[140px]', rowSpan: 2 }, 'Dư tín dụng đã bán VAMC'),
                        e('th', { className: 'px-3 py-2 text-center text-xs font-semibold', rowSpan: 2 }, 'Loại TSBĐ')
                    ),
                    e('tr', { className: 'bg-[#f8fbfb] border-b border-[#d7e5e3] text-[#006B68]' },
                        ['Ngắn hạn', 'TDH', 'Dư vay NH', 'Dư vay TDH', 'Cam kết ngoại bảng'].map(h =>
                            e('th', { key: h, className: 'px-3 py-2 text-center text-xs font-semibold border-r border-gray-200 w-[110px]' }, h)
                        )
                    )
                ),
                e('tbody', null,
                    tctdKhacRows.map(row =>
                        e('tr', { key: row.stt, className: 'border-b border-[#edf2f1] text-gray-700 hover:bg-[#f8fbfb]' },
                            e('td', { className: 'px-3 py-2.5 text-center border-r border-[#edf2f1]' }, row.stt),
                            e('td', { className: 'px-3 py-2.5 font-medium border-r border-[#edf2f1]' }, row.tctd),
                            e('td', { className: 'px-3 py-2.5 text-right border-r border-[#edf2f1] whitespace-nowrap' }, row.ghtdNH),
                            e('td', { className: 'px-3 py-2.5 text-right border-r border-[#edf2f1] whitespace-nowrap' }, row.ghtdTDH),
                            e('td', { className: 'px-3 py-2.5 text-right border-r border-[#edf2f1] whitespace-nowrap' }, row.duVayNH),
                            e('td', { className: 'px-3 py-2.5 text-right border-r border-[#edf2f1] whitespace-nowrap' }, row.duVayTDH),
                            e('td', { className: 'px-3 py-2.5 text-right border-r border-[#edf2f1] whitespace-nowrap' }, row.camKet),
                            e('td', { className: 'px-3 py-2.5 text-center border-r border-[#edf2f1] whitespace-nowrap' }, row.nhomNo),
                            e('td', { className: 'px-3 py-2.5 text-right border-r border-[#edf2f1] whitespace-nowrap' }, row.noXau),
                            e('td', { className: 'px-3 py-2.5 text-right border-r border-[#edf2f1] whitespace-nowrap' }, row.vamc),
                            e('td', { className: 'px-3 py-2.5 text-left whitespace-nowrap' }, row.tsbd)
                        )
                    )
                )
            )
        );

    // ── Khối 5: Render nhóm KHLQ ──
    const [khlqRiskMode, setKhlqRiskMode] = React.useState('day-du');
    const [khlqRiskText, setKhlqRiskText] = React.useState('');
    // State: nhóm KHLQ nào đang expand — mặc định chỉ EVN GENCO3
    const [expandedKhlqGroups, setExpandedKhlqGroups] = React.useState({ 'EVN GENCO3': true });
    const toggleKhlqGroup = (nhom) => setExpandedKhlqGroups(prev => ({ ...prev, [nhom]: !prev[nhom] }));
    // State: filter cho bảng danh sách KH liên quan
    const [khlqActiveFilter, setKhlqActiveFilter] = React.useState(null); // column name or null
    const [khlqFilterValues, setKhlqFilterValues] = React.useState({}); // { colKey: Set of selected values }
    // State: sort cho bảng danh sách nhóm KHLQ
    const [nhomSortCol, setNhomSortCol] = React.useState(null); // 'tongGHTD_asc' | 'tongGHTD_desc' | 'tongDuNo_asc' | 'tongDuNo_desc' | null

    const renderKhlqSection = () => {
        // #4: Tự động xác định nhóm có tổng GHTD lớn nhất
        const dominant = khlqNhomList.reduce((max, n) => n.tongGHTD > max.tongGHTD ? n : max, khlqNhomList[0]);
        // #5: Tự động xác định KH thuộc nhiều nhóm KHLQ (cùng CIF xuất hiện > 1 lần)
        const cifCount = {};
        khlqKhList.forEach(r => { cifCount[r.cif] = (cifCount[r.cif] || 0) + 1; });
        const multiCIFs = new Set(Object.keys(cifCount).filter(c => cifCount[c] > 1));

        return sectionShell('nhomKhlqTctd', 'Nhóm Khách hàng liên quan', 'fas fa-users',
            e(React.Fragment, null,

                // ── Thông tin nhóm KHLQ (header info) ──
                e('div', { className: 'qhtctd-flat-wrap mb-3' },
                    e('div', { className: 'qhtctd-flat-group-hdr' }, 'Thông tin nhóm KHLQ'),
                    e('div', { className: 'qhtctd-flat-row' },
                        e('div', { className: 'qhtctd-flat-cell' },
                            e('span', { className: 'qhtctd-flat-lbl' }, 'Số KH liên quan'),
                            e('span', { className: 'qhtctd-flat-val' }, '24')
                        ),
                        e('div', { className: 'qhtctd-flat-cell is-empty', style: { gridColumn: 'span 2' } })
                    ),
                    e('div', { className: 'qhtctd-flat-row' },
                        e('div', { className: 'qhtctd-flat-cell' },
                            e('span', { className: 'qhtctd-flat-lbl' }, 'Số nhóm KHLQ'),
                            e('span', { className: 'qhtctd-flat-val' }, '7')
                        ),
                        e('div', { className: 'qhtctd-flat-cell is-empty' }),
                        e('div', { className: 'qhtctd-flat-cell is-empty' })
                    ),
                    e('div', { className: 'qhtctd-flat-row' },
                        e('div', { className: 'qhtctd-flat-cell' },
                            e('span', { className: 'qhtctd-flat-lbl' }, 'Nhóm chi phối thẩm quyền'),
                            e('span', { className: 'qhtctd-flat-val' },
                                e('span', { className: 'inline-block w-2.5 h-2.5 rounded-full bg-[#dc2626] mr-1.5' }),
                                dominant ? dominant.nhom : ''
                            )
                        ),
                        e('div', { className: 'qhtctd-flat-cell is-empty' }),
                        e('div', { className: 'qhtctd-flat-cell is-empty' })
                    ),
                    e('div', { className: 'qhtctd-flat-row is-last' },
                        e('div', { className: 'qhtctd-flat-cell' },
                            e('span', { className: 'qhtctd-flat-lbl' }, 'GHTD để xác định thẩm quyền'),
                            e('span', { className: 'qhtctd-flat-val' }, dominant ? dominant.tongGHTD.toLocaleString() + ' tỷ đồng' : '')
                        ),
                        e('div', { className: 'qhtctd-flat-cell is-empty' }),
                        e('div', { className: 'qhtctd-flat-cell is-empty' })
                    )
                ),

                // ── Danh sách nhóm KHLQ ──
                e('div', { className: 'mb-3' },
                    e('div', { className: 'flex items-center justify-between mb-2' },
                        e('div', { className: 'text-sm font-semibold text-[#006B68]' }, 'Danh sách nhóm KHLQ'),
                        e('div', { className: 'text-xs text-gray-500 italic' }, 'Đơn vị: tỷ đồng')
                    ),
                    e('div', { className: 'qhtctd-scroll bg-white border border-gray-200 rounded-xl overflow-x-auto shadow-sm' },
                        e('table', { className: 'w-full min-w-[900px] text-[13px]' },
                            e('thead', null,
                                e('tr', { className: 'bg-[#f8fbfb] border-b border-[#d7e5e3] text-[#006B68]' },
                                    ['Thứ tự', 'Nhóm KHLQ', 'Vai trò'].map(h =>
                                        e('th', { key: h, className: 'px-3 py-2.5 text-left text-xs font-semibold border-r border-[#d7e5e3] whitespace-nowrap' }, h)
                                    ),
                                    // Tổng GHTD with sort
                                    e('th', {
                                        key: 'tongGHTD',
                                        className: 'px-3 py-2.5 text-left text-xs font-semibold border-r border-[#d7e5e3] whitespace-nowrap cursor-pointer select-none hover:bg-[#edf5f4] transition-colors',
                                        onClick: () => setNhomSortCol(prev => prev === 'tongGHTD_asc' ? 'tongGHTD_desc' : prev === 'tongGHTD_desc' ? null : 'tongGHTD_asc')
                                    },
                                        'Tổng GHTD',
                                        e('i', { className: 'fas fa-sort ml-1.5 text-[9px] ' + (nhomSortCol && nhomSortCol.startsWith('tongGHTD') ? 'text-[#006B68]' : 'text-gray-400') })
                                    ),
                                    ['CNQL nhóm', 'Cấp phê duyệt', 'Tài liệu phê duyệt'].map(h =>
                                        e('th', { key: h, className: 'px-3 py-2.5 text-left text-xs font-semibold border-r border-[#d7e5e3] whitespace-nowrap' }, h)
                                    )
                                )
                            ),
                            e('tbody', null,
                                (() => {
                                    let sorted = [...khlqNhomList];
                                    if (nhomSortCol) {
                                        const [col, dir] = nhomSortCol.split('_');
                                        sorted.sort((a, b) => {
                                            let va = a[col], vb = b[col];
                                            return dir === 'asc' ? va - vb : vb - va;
                                        });
                                    }
                                    return sorted.map((row, idx) => {
                                        const isDom = row.nhom === dominant.nhom;
                                        return e('tr', {
                                            key: row.stt,
                                            className: 'border-b border-[#edf2f1] hover:bg-[#f8fbfb] ' +
                                                (isDom ? 'font-bold bg-[#f0faf9]' : 'text-gray-700')
                                        },
                                            e('td', { className: 'px-3 py-2 text-center border-r border-[#edf2f1]' }, nhomSortCol ? idx + 1 : row.stt),
                                            e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] whitespace-nowrap' },
                                                isDom ? e('span', { className: 'inline-block w-2.5 h-2.5 rounded-full bg-[#dc2626] mr-1.5 align-middle' }) : null,
                                                row.nhom
                                            ),
                                            e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] whitespace-nowrap' },
                                                row.vaiTro === 'Trung tâm'
                                                    ? e('span', null, e('i', { className: 'fas fa-star qhtctd-star-sparkle mr-1 text-xs' }), 'Trung tâm')
                                                    : row.vaiTro
                                            ),
                                            e('td', { className: 'px-3 py-2 text-right border-r border-[#edf2f1] tabular-nums whitespace-nowrap' }, row.tongGHTD.toLocaleString()),
                                            e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] whitespace-nowrap' }, row.cnql),
                                            e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] whitespace-nowrap' }, row.capPD),
                                            e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] whitespace-nowrap' })
                                        );
                                    });
                                })()
                            )
                        )
                    )
                ),

                // ── Danh sách khách hàng liên quan ──
                e('div', { className: 'mb-3' },
                    e('div', { className: 'flex items-center justify-between mb-2' },
                        e('div', { className: 'text-sm font-semibold text-[#006B68]' }, 'Danh sách khách hàng liên quan')
                    ),

                    e('div', { className: 'qhtctd-scroll bg-white border border-gray-200 rounded-xl overflow-x-auto shadow-sm', style: { position: 'relative' } },
                        e('table', { className: 'w-full min-w-[1200px] text-[13px]' },
                            e('thead', null,
                                e('tr', { className: 'bg-[#f8fbfb] border-b border-[#d7e5e3] text-[#006B68]' },
                                    (() => {
                                        const filterColMap = {
                                            'Mối quan hệ với KH vay': 'moiQH',
                                            'Tổng GHTD': 'tongGHTD',
                                            'Tổng dư nợ': 'tongDuNo'
                                        };
                                        const cols = ['STT', 'Nhóm KHLQ', 'Tên KH', 'CIF', 'CNQL KH', 'Vai trò', 'Mối quan hệ với KH vay', 'Tổng GHTD', 'Tổng dư nợ', 'Tỷ trọng', 'CIC'];
                                        return cols.map(h => {
                                            const colKey = filterColMap[h];
                                            const isFilterable = !!colKey;
                                            const isActive = khlqActiveFilter === h;
                                            const hasFilter = khlqFilterValues[colKey] && khlqFilterValues[colKey].length > 0;

                                            // Collect unique values for this column
                                            let uniqueVals = [];
                                            if (isFilterable) {
                                                const valSet = new Set();
                                                khlqKhList.forEach(row => {
                                                    const v = row[colKey];
                                                    if (v && v !== '') valSet.add(v);
                                                });
                                                uniqueVals = Array.from(valSet).sort();
                                            }

                                            return e('th', {
                                                key: h,
                                                className: 'px-3 py-2.5 text-left text-xs font-semibold border-r border-[#d7e5e3] whitespace-nowrap',
                                                style: { position: 'relative' }
                                            },
                                                h,
                                                isFilterable
                                                    ? e('i', {
                                                        className: 'fas fa-filter ml-1.5 text-[9px] cursor-pointer transition-colors ' +
                                                            (hasFilter ? 'text-[#006B68]' : 'text-gray-400 hover:text-[#006B68]'),
                                                        onClick: (ev) => {
                                                            ev.stopPropagation();
                                                            setKhlqActiveFilter(isActive ? null : h);
                                                        }
                                                    })
                                                    : null,
                                                // Filter dropdown panel
                                                isActive ? e('div', {
                                                    className: 'absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50',
                                                    style: { minWidth: '200px', maxHeight: '260px', animation: 'modalSlideIn 0.15s ease-out' },
                                                    onClick: ev => ev.stopPropagation()
                                                },
                                                    // Header
                                                    e('div', { className: 'px-3 py-2 border-b border-gray-100 flex items-center justify-between' },
                                                        e('span', { className: 'text-xs font-semibold text-gray-700' }, 'Lọc: ' + h),
                                                        e('i', {
                                                            className: 'fas fa-times text-[10px] text-gray-400 cursor-pointer hover:text-red-500',
                                                            onClick: () => setKhlqActiveFilter(null)
                                                        })
                                                    ),
                                                    // Quick actions
                                                    e('div', { className: 'px-3 py-1.5 border-b border-gray-100 flex gap-2' },
                                                        e('button', {
                                                            className: 'text-[10px] text-[#006B68] hover:underline font-medium',
                                                            onClick: () => setKhlqFilterValues(prev => {
                                                                const next = { ...prev };
                                                                delete next[colKey];
                                                                return next;
                                                            })
                                                        }, 'Chọn tất cả'),
                                                        e('span', { className: 'text-gray-300' }, '|'),
                                                        e('button', {
                                                            className: 'text-[10px] text-red-500 hover:underline font-medium',
                                                            onClick: () => setKhlqFilterValues(prev => ({
                                                                ...prev,
                                                                [colKey]: ['__NONE__']
                                                            }))
                                                        }, 'Bỏ chọn')
                                                    ),
                                                    // Checkbox list
                                                    e('div', { className: 'overflow-y-auto', style: { maxHeight: '180px' } },
                                                        uniqueVals.map(val => {
                                                            const currentFilter = khlqFilterValues[colKey] || [];
                                                            const isChecked = currentFilter.length === 0 || currentFilter.includes(val);
                                                            return e('label', {
                                                                key: val,
                                                                className: 'flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-xs text-gray-700'
                                                            },
                                                                e('input', {
                                                                    type: 'checkbox',
                                                                    className: 'h-3 w-3 accent-[#006B68]',
                                                                    checked: isChecked,
                                                                    onChange: () => {
                                                                        setKhlqFilterValues(prev => {
                                                                            const cur = prev[colKey] && prev[colKey][0] !== '__NONE__' ? [...prev[colKey]] : (prev[colKey] && prev[colKey][0] === '__NONE__' ? [] : [...uniqueVals]);
                                                                            let next;
                                                                            if (isChecked) {
                                                                                next = cur.filter(v => v !== val);
                                                                            } else {
                                                                                next = [...cur, val];
                                                                            }
                                                                            // If all selected, clear filter
                                                                            if (next.length >= uniqueVals.length) {
                                                                                const copy = { ...prev };
                                                                                delete copy[colKey];
                                                                                return copy;
                                                                            }
                                                                            return { ...prev, [colKey]: next.length === 0 ? ['__NONE__'] : next };
                                                                        });
                                                                    }
                                                                }),
                                                                val
                                                            );
                                                        }),
                                                        uniqueVals.length === 0
                                                            ? e('div', { className: 'px-3 py-2 text-xs text-gray-400 italic' }, 'Không có dữ liệu')
                                                            : null
                                                    )
                                                ) : null
                                            );
                                        });
                                    })()
                                )
                            ),
                            e('tbody', null,
                                (() => {
                                    // Filter logic
                                    const filterColMap = {
                                        'moiQH': 'moiQH',
                                        'tongGHTD': 'tongGHTD',
                                        'tongDuNo': 'tongDuNo'
                                    };
                                    const passesFilter = (row) => {
                                        for (const [colKey, vals] of Object.entries(khlqFilterValues)) {
                                            if (!vals || vals.length === 0) continue;
                                            if (vals[0] === '__NONE__') return false;
                                            const rowVal = row[colKey];
                                            if (!vals.includes(rowVal)) return false;
                                        }
                                        return true;
                                    };

                                    // Group rows by nhom, preserving order
                                    const groups = [];
                                    const groupMap = {};
                                    khlqKhList.forEach(row => {
                                        if (!groupMap[row.nhom]) {
                                            groupMap[row.nhom] = { nhom: row.nhom, rows: [] };
                                            groups.push(groupMap[row.nhom]);
                                        }
                                        groupMap[row.nhom].rows.push(row);
                                    });

                                    const result = [];
                                    groups.forEach(group => {
                                        const isExpanded = !!expandedKhlqGroups[group.nhom];
                                        const isRedDot = group.nhom === 'EVN GENCO3';
                                        const filteredRows = group.rows.filter(passesFilter);

                                        // Group header row (clickable)
                                        result.push(
                                            e('tr', {
                                                key: 'grp-' + group.nhom,
                                                className: 'border-b border-[#d7e5e3] bg-[#f0f7f6] cursor-pointer select-none hover:bg-[#e6f0ef] transition-colors',
                                                onClick: () => toggleKhlqGroup(group.nhom)
                                            },
                                                e('td', { className: 'px-3 py-2 text-center border-r border-[#d7e5e3]', colSpan: 1 },
                                                    e('i', { className: 'fas fa-chevron-' + (isExpanded ? 'down' : 'right') + ' text-[10px] text-[#006B68]' })
                                                ),
                                                e('td', { className: 'px-3 py-2 border-r border-[#d7e5e3] font-semibold text-[#006B68] whitespace-nowrap', colSpan: 1 },
                                                    isRedDot
                                                        ? e('span', null,
                                                            e('span', { className: 'inline-block w-2.5 h-2.5 rounded-full bg-[#dc2626] mr-1.5 align-middle' }),
                                                            group.nhom
                                                          )
                                                        : group.nhom
                                                ),
                                                e('td', { className: 'px-3 py-2 border-r border-[#d7e5e3] text-xs text-gray-500', colSpan: 9 },
                                                    filteredRows.length + '/' + group.rows.length + ' khách hàng'
                                                )
                                            )
                                        );

                                        // Child rows (only if expanded)
                                        if (isExpanded) {
                                            filteredRows.forEach(row => {
                                                const isCenter = row.vaiTro === 'Trung tâm';
                                                const rowCls = 'border-b border-[#edf2f1] hover:bg-[#f8fbfb] ' +
                                                    (isCenter ? 'bg-[#f0faf9] font-semibold' :
                                                     row.isHighlight ? 'bg-amber-50/60' : 'text-gray-700');
                                                result.push(
                                                    e('tr', { key: row.stt, className: rowCls },
                                                        e('td', { className: 'px-3 py-2 text-center border-r border-[#edf2f1]' }, row.stt),
                                                        e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] whitespace-nowrap font-medium text-[#006B68]' }, row.nhom),
                                                        e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] leading-5' }, row.ten),
                                                        e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] tabular-nums' }, row.cif),
                                                        e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] whitespace-nowrap' }, row.cnql),
                                                        e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] whitespace-nowrap' },
                                                            isCenter
                                                                ? e('span', null, e('i', { className: 'fas fa-star qhtctd-star-sparkle mr-1 text-xs' }), 'Trung tâm')
                                                                : row.vaiTro
                                                        ),
                                                        e('td', { className: 'px-3 py-2 border-r border-[#edf2f1]' }, row.moiQH),
                                                        e('td', { className: 'px-3 py-2 text-right border-r border-[#edf2f1] tabular-nums whitespace-nowrap' }, row.tongGHTD),
                                                        e('td', { className: 'px-3 py-2 text-right border-r border-[#edf2f1] tabular-nums whitespace-nowrap' }, row.tongDuNo),
                                                        e('td', { className: 'px-3 py-2 text-right border-r border-[#edf2f1] tabular-nums' }, row.tyTrong),
                                                        e('td', { className: 'px-3 py-2 text-center' },
                                                            e('a', {
                                                                href: '#',
                                                                className: 'text-[#006B68] hover:underline font-medium',
                                                                onClick: ev => ev.preventDefault()
                                                            }, 'CIC')
                                                        )
                                                    )
                                                );
                                            });
                                        }
                                    });
                                    return result;
                                })()
                            )
                        )
                    )
                ),

                // ── Ý kiến Bộ phận đề xuất ──
                opinionSection('khlqProposal', 'Ý kiến Bộ phận đề xuất', 'fas fa-lightbulb',
                    null
                ),

                // ── Ý kiến Bộ phận Thẩm định rủi ro ──
                opinionSection('khlqRisk', 'Ý kiến Bộ phận Thẩm định rủi ro', 'fas fa-clipboard-check',
                    reviewControls(khlqRiskMode, setKhlqRiskMode, khlqRiskText, setKhlqRiskText)
                )
            )
        );
    };

    // ── Khối 5 Phương án 2: Nhóm KHLQ (Visual) ──
    const renderKhlqSectionV2 = () => {
        const dominant = khlqNhomList.reduce((max, n) => n.tongGHTD > max.tongGHTD ? n : max, khlqNhomList[0]);
        const cifCount = {};
        khlqKhList.forEach(r => { cifCount[r.cif] = (cifCount[r.cif] || 0) + 1; });
        const multiCIFs = new Set(Object.keys(cifCount).filter(c => cifCount[c] > 1));
        const sorted = [...khlqNhomList].sort((a, b) => b.tongGHTD - a.tongGHTD);
        const childGroups = khlqNhomList.filter(n => n.vaiTro !== 'Trung tâm');
        const centerGroup = khlqNhomList.find(n => n.vaiTro === 'Trung tâm');

        return sectionShell('nhomKhlqV2', 'Nhóm KHLQ (Phương án 2)', 'fas fa-project-diagram',
            e(React.Fragment, null,

                // ── Hero header ──
                e('div', { className: 'bg-gradient-to-r from-[#006B68] to-[#00857f] rounded-xl p-5 text-white mb-3' },
                    e('div', { className: 'text-xs font-semibold uppercase tracking-widest text-white/60 mb-1' }, 'NHÓM KHÁCH HÀNG LIÊN QUAN'),
                    e('div', { className: 'text-lg font-bold' }, 'KH vay: Tập đoàn Điện lực Việt Nam - EVN'),
                    e('div', { className: 'mt-3 flex flex-wrap gap-2' },
                        e('span', { className: 'inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-semibold' },
                            e('i', { className: 'fas fa-users text-[10px]' }), khlqKhList.length + ' KHLQ'
                        ),
                        e('span', { className: 'inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-semibold' },
                            e('i', { className: 'fas fa-layer-group text-[10px]' }), '0' + khlqNhomList.length + ' nhóm KHLQ'
                        ),
                        e('span', { className: 'inline-flex items-center gap-1.5 rounded-full bg-red-500/80 px-3 py-1 text-xs font-semibold' },
                            e('span', { className: 'inline-block w-2 h-2 rounded-full bg-white animate-pulse' }),
                            'Nhóm chi phối: ' + dominant.nhom
                        )
                    )
                ),

                // ── 2-column: Sơ đồ + So sánh ──
                e('div', { className: 'grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3' },

                    // LEFT: Sơ đồ nhóm KHLQ
                    e('div', { className: 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm' },
                        e('div', { className: 'px-4 py-2.5 bg-[#f8fbfb] border-b border-gray-200 text-sm font-semibold text-[#006B68]' }, 'Sơ đồ nhóm KHLQ'),
                        e('div', { className: 'p-4 flex flex-col items-center gap-4' },
                            // Center node (EVN)
                            e('div', { className: 'relative' },
                                e('div', { className: 'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#006B68] to-[#00857f] text-white font-bold text-sm shadow-lg' },
                                    e('i', { className: 'fas fa-building text-xs' }),
                                    centerGroup ? centerGroup.nhom : 'EVN'
                                )
                            ),
                            // Connector
                            e('div', { className: 'w-0.5 h-6 bg-gray-300' }),
                            e('div', { className: 'h-0.5 bg-gray-300 self-stretch mx-8' }),
                            // Children
                            e('div', { className: 'grid grid-cols-3 sm:grid-cols-6 gap-2 w-full' },
                                childGroups.map(g => {
                                    const isDom = g.nhom === dominant.nhom;
                                    return e('div', {
                                        key: g.nhom,
                                        className: 'flex flex-col items-center gap-1'
                                    },
                                        e('div', { className: 'w-0.5 h-3 bg-gray-300' }),
                                        e('div', {
                                            className: 'relative px-2.5 py-1.5 rounded-lg text-xs font-semibold text-center border transition-all ' +
                                                (isDom
                                                    ? 'bg-[#006B68] text-white border-[#006B68] shadow-md ring-2 ring-[#006B68]/30'
                                                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#006B68]/40')
                                        },
                                            g.nhom.replace('EVN ', ''),
                                            isDom && e('span', {
                                                className: 'absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white',
                                                title: 'Chi phối thẩm quyền'
                                            })
                                        )
                                    );
                                })
                            )
                        )
                    ),

                    // RIGHT: So sánh 07 nhóm KHLQ
                    e('div', { className: 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm' },
                        e('div', { className: 'px-4 py-2.5 bg-[#f8fbfb] border-b border-gray-200 text-sm font-semibold text-[#006B68]' },
                            'So sánh ' + ('0' + khlqNhomList.length).slice(-2) + ' nhóm KHLQ'
                        ),
                        e('div', { className: 'p-4 space-y-2' },
                            sorted.map((g, idx) => {
                                const isDom = g.nhom === dominant.nhom;
                                const maxGHTD = sorted[0].tongGHTD;
                                const pct = Math.round((g.tongGHTD / maxGHTD) * 100);
                                return e('div', { key: g.nhom, className: 'flex items-center gap-3' },
                                    e('span', { className: 'w-5 text-xs font-bold text-gray-400 text-right shrink-0' }, idx + 1 + '.'),
                                    e('div', { className: 'flex-1 min-w-0' },
                                        e('div', { className: 'flex items-center justify-between mb-0.5' },
                                            e('span', { className: 'text-xs font-semibold truncate ' + (isDom ? 'text-[#006B68]' : 'text-gray-700') },
                                                isDom && e('span', { className: 'inline-block w-2 h-2 rounded-full bg-red-500 mr-1.5 align-middle' }),
                                                g.nhom
                                            ),
                                            e('span', { className: 'text-[11px] tabular-nums text-gray-500 shrink-0 ml-2' }, g.tongGHTD.toLocaleString())
                                        ),
                                        e('div', { className: 'h-2 rounded-full overflow-hidden ' + (isDom ? 'bg-[#006B68]/10' : 'bg-gray-100') },
                                            e('div', {
                                                className: 'h-full rounded-full transition-all ' + (isDom ? 'bg-[#006B68]' : 'bg-gray-300'),
                                                style: { width: pct + '%' }
                                            })
                                        )
                                    ),
                                    idx === 0 && e('span', { className: 'text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0' }, 'Dư nợ cao nhất')
                                );
                            })
                        )
                    )
                ),

                // ── Legend ──
                e('div', { className: 'flex flex-wrap items-center gap-x-6 gap-y-2 bg-[#f8fbfb] border border-gray-200 rounded-lg px-4 py-2 mb-3 text-xs text-gray-600' },
                    e('span', { className: 'font-semibold text-gray-700' }, 'Legend:'),
                    e('span', { className: 'inline-flex items-center gap-1.5' },
                        e('span', { className: 'inline-block w-2.5 h-2.5 rounded-full bg-red-500' }),
                        'Nhóm chi phối thẩm quyền'
                    ),
                    e('span', { className: 'inline-flex items-center gap-1.5' },
                        e('i', { className: 'fas fa-star qhtctd-star-sparkle text-[10px]' }),
                        'KH vay (Trung tâm)'
                    ),
                    e('span', { className: 'inline-flex items-center gap-1.5' },
                        e('span', { className: 'inline-block w-3 h-2 rounded-sm bg-indigo-100 border border-indigo-200' }),
                        'KH thuộc nhiều nhóm'
                    )
                ),

                // ── Danh sách KH liên quan (reuse from PA1) ──
                e('div', { className: 'mb-3' },
                    e('div', { className: 'flex items-center justify-between mb-2' },
                        e('div', { className: 'text-sm font-semibold text-[#006B68]' },
                            'Danh sách ' + khlqKhList.length + ' khách hàng liên quan'
                        )
                    ),
                    e('div', { className: 'qhtctd-scroll bg-white border border-gray-200 rounded-xl overflow-x-auto shadow-sm' },
                        e('table', { className: 'w-full min-w-[1200px] text-[13px]' },
                            e('thead', null,
                                e('tr', { className: 'bg-[#f8fbfb] border-b border-[#d7e5e3] text-[#006B68]' },
                                    ['STT', 'Nhóm KHLQ', 'Tên KH', 'CIF', 'CNQL KH', 'Vai trò', 'Mối quan hệ với KH vay', 'Tổng GHTD', 'Tổng dư nợ', 'Tỷ trọng', 'CIC'].map(h =>
                                        e('th', { key: h, className: 'px-3 py-2.5 text-left text-xs font-semibold border-r border-[#d7e5e3] whitespace-nowrap' }, h)
                                    )
                                )
                            ),
                            e('tbody', null,
                                khlqKhList.map(row => {
                                    const isDomGroup = row.nhom === dominant.nhom;
                                    const isMulti = multiCIFs.has(row.cif);
                                    const isCenter = row.vaiTro === 'Trung tâm';
                                    const rowCls = 'border-b border-[#edf2f1] hover:bg-[#f8fbfb] ' +
                                        (isCenter ? 'bg-[#f0faf9] font-semibold' :
                                         isDomGroup ? 'bg-[#f7fcfb]' :
                                         isMulti ? 'bg-indigo-50/40' : 'text-gray-700');
                                    return e('tr', { key: row.stt, className: rowCls },
                                        e('td', { className: 'px-3 py-2 text-center border-r border-[#edf2f1]' }, row.stt),
                                        e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] whitespace-nowrap font-medium text-[#006B68]' }, row.nhom),
                                        e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] leading-5' }, row.ten),
                                        e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] tabular-nums' }, row.cif),
                                        e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] whitespace-nowrap' }, row.cnql),
                                        e('td', { className: 'px-3 py-2 border-r border-[#edf2f1] whitespace-nowrap' },
                                            isCenter
                                                ? e('span', null, e('i', { className: 'fas fa-star qhtctd-star-sparkle mr-1 text-xs' }), 'Trung tâm')
                                                : row.vaiTro
                                        ),
                                        e('td', { className: 'px-3 py-2 border-r border-[#edf2f1]' }, row.moiQH),
                                        e('td', { className: 'px-3 py-2 text-right border-r border-[#edf2f1] tabular-nums whitespace-nowrap' }, row.tongGHTD),
                                        e('td', { className: 'px-3 py-2 text-right border-r border-[#edf2f1] tabular-nums whitespace-nowrap' }, row.tongDuNo),
                                        e('td', { className: 'px-3 py-2 text-right border-r border-[#edf2f1] tabular-nums' }, row.tyTrong),
                                        e('td', { className: 'px-3 py-2 text-center' }, row.cic)
                                    );
                                })
                            )
                        )
                    )
                ),

                // ── Ý kiến ──
                opinionSection('khlqV2Proposal', 'Ý kiến Bộ phận đề xuất', 'fas fa-lightbulb', null),
                opinionSection('khlqV2Risk', 'Ý kiến Bộ phận Thẩm định rủi ro', 'fas fa-clipboard-check',
                    reviewControls(khlqRiskMode, setKhlqRiskMode, khlqRiskText, setKhlqRiskText)
                )
            )
        );
    };

    const renderBidvSection = () =>
        sectionShell('quanHeBidv', 'Tình hình quan hệ tín dụng tại BIDV', 'fas fa-university',
            e(React.Fragment, null,

                // Sub-header: Tình hình quan hệ tín dụng
                e('div', { className: 'px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#006B68] shadow-sm' },
                    'Tình hình quan hệ tín dụng'
                ),
                renderCreditTable(),

                // Sub-section: Uỷ nhiệm
                opinionSection('bidvProposal', 'Tình hình thực hiện các điều kiện uỷ nhiệm', 'fas fa-clipboard-list',
                    e(React.Fragment, null,
                        e('div', { className: 'flex items-center justify-end text-xs italic text-gray-500 mb-2' },
                            'Chỉ hiển thị các ĐK có trạng thái "Chưa thực hiện" và "Đã thực hiện 1 phần"'
                        ),
                        renderUyNhiemTable()
                    )
                ),

                // Sub-section: Phi tín dụng
                opinionSection('phiProposal', 'Tình hình Quan hệ phi tín dụng \u0026 Tổng hòa lợi ích khách hàng', 'fas fa-chart-line',
                    e(React.Fragment, null,
                        e('div', { className: 'flex items-center justify-end mb-2' },
                            e('a', { className: 'qhtctd-compact-link cursor-pointer', onClick: () => setShowPhiTinDungModal(true) }, '[Xem chi tiết]')
                        ),
                        renderPhiTinDungTable()
                    )
                ),

                // Sub-section: Ý kiến Bộ phận đề xuất
                opinionSection('bidvRisk', 'Ý kiến Bộ phận đề xuất', 'fas fa-lightbulb',
                    e(React.Fragment, null,
                        simpleReadonlyBox('Đánh giá uy tín của khách hàng trong quá trình quan hệ tín dụng',
                            'Khách hàng có lịch sử quan hệ tín dụng tại BIDV trong 8 năm, nhóm nợ hiện tại thuộc Nhóm 1. Các khoản cấp tín dụng còn hiệu lực được kiểm soát theo hạn mức và tình trạng thực hiện nghĩa vụ nợ nhìn chung ổn định.')
                    )
                ),

                // Sub-section: Ý kiến Thẩm định rủi ro
                opinionSection('phiRisk', 'Ý kiến Bộ phận Thẩm định rủi ro', 'fas fa-clipboard-check',
                    reviewControls(bidvRiskMode, setBidvRiskMode, bidvRiskText, setBidvRiskText)
                )
            )
        );

    const renderTctdKhacSection = () =>
        sectionShell('tctdKhac', 'Tình hình quan hệ tín dụng tại TCTD khác', 'fas fa-building',
            e(React.Fragment, null,
                renderTctdKhacTable(),
                opinionSection('tctdProposal', 'Ý kiến Bộ phận đề xuất', 'fas fa-lightbulb',
                    null
                ),
                opinionSection('tctdRisk', 'Ý kiến Bộ phận Thẩm định rủi ro', 'fas fa-clipboard-check',
                    reviewControls(tctdKhacRiskMode, setTctdKhacRiskMode, tctdKhacRiskText, setTctdKhacRiskText)
                )
            )
        );

    // ── Modal: Chi tiết cảnh báo ──
    const renderCanhBaoModal = () => {
        if (!showCanhBaoModal) return null;
        const mucColors = { green: '#16a34a', orange: '#ea580c', red: '#dc2626' };
        const mucBg = { green: '#f0fdf4', orange: '#fff7ed', red: '#fef2f2' };
        return ReactDOM.createPortal(e('div', {
            className: 'fixed inset-0 z-50 flex items-center justify-center',
            style: { background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' },
            onClick: () => setShowCanhBaoModal(false)
        },
            e('div', {
                className: 'bg-white rounded-xl shadow-2xl w-full max-w-[640px] mx-4 overflow-hidden',
                style: { animation: 'modalSlideIn 0.25s ease-out' },
                onClick: ev => ev.stopPropagation()
            },
                // Header
                e('div', { className: 'flex items-center justify-between px-5 py-4 border-b border-gray-200' },
                    e('h3', { className: 'text-base font-bold text-gray-900' }, 'Chi tiết cảnh báo'),
                    e('button', {
                        className: 'w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors',
                        onClick: () => setShowCanhBaoModal(false)
                    }, e('i', { className: 'fas fa-times text-sm' }))
                ),
                // Body
                e('div', { className: 'p-5' },
                    e('table', { className: 'w-full text-[13px]' },
                        e('thead', null,
                            e('tr', { className: 'border-b-2 border-gray-200 text-gray-500' },
                                e('th', { className: 'px-3 py-2.5 text-center font-semibold w-12' }, 'STT'),
                                e('th', { className: 'px-3 py-2.5 text-left font-semibold' }, 'Tên dấu hiệu'),
                                e('th', { className: 'px-3 py-2.5 text-center font-semibold w-[120px]' }, 'Điểm cảnh báo'),
                                e('th', { className: 'px-3 py-2.5 text-center font-semibold w-[120px]' }, 'Mức cảnh báo')
                            )
                        ),
                        e('tbody', null,
                            canhBaoRows.map(row =>
                                e('tr', { key: row.stt, className: 'border-b border-gray-100 hover:bg-gray-50 transition-colors' },
                                    e('td', { className: 'px-3 py-3 text-center font-medium text-gray-500' }, row.stt),
                                    e('td', { className: 'px-3 py-3 text-gray-800 leading-5 font-medium' }, row.tenDauHieu),
                                    e('td', { className: 'px-3 py-3 text-center font-semibold text-gray-700 tabular-nums' }, row.diemCanhBao),
                                    e('td', { className: 'px-3 py-3 text-center' },
                                        e('span', {
                                            className: 'inline-block px-3 py-1 rounded-full text-xs font-semibold',
                                            style: { color: mucColors[row.mucTone], backgroundColor: mucBg[row.mucTone] }
                                        }, row.mucCanhBao)
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ), document.body);
    };

    // ── Modal: Danh sách hồ sơ ──
    const renderHoSoModal = () => {
        if (!showHoSoModal) return null;
        const trangThaiColors = { green: '#16a34a', blue: '#2563eb', red: '#dc2626' };
        const trangThaiBg = { green: '#f0fdf4', blue: '#eff6ff', red: '#fef2f2' };
        return ReactDOM.createPortal(e('div', {
            className: 'fixed inset-0 z-50 flex items-center justify-center',
            style: { background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' },
            onClick: () => setShowHoSoModal(false)
        },
            e('div', {
                className: 'bg-white rounded-xl shadow-2xl w-full max-w-[960px] mx-4 overflow-hidden',
                style: { animation: 'modalSlideIn 0.25s ease-out' },
                onClick: ev => ev.stopPropagation()
            },
                // Header
                e('div', { className: 'flex items-center justify-between px-5 py-4 border-b border-gray-200' },
                    e('h3', { className: 'text-base font-bold text-gray-900' }, 'Danh sách hồ sơ'),
                    e('button', {
                        className: 'w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors',
                        onClick: () => setShowHoSoModal(false)
                    }, e('i', { className: 'fas fa-times text-sm' }))
                ),
                // Body
                e('div', { className: 'p-5 overflow-x-auto' },
                    e('table', { className: 'w-full text-[13px] min-w-[880px]' },
                        e('thead', null,
                            e('tr', { className: 'border-b-2 border-gray-200 text-gray-500' },
                                e('th', { className: 'px-3 py-2.5 text-center font-semibold w-10' }, 'STT'),
                                e('th', { className: 'px-3 py-2.5 text-left font-semibold w-[80px]' }, 'Mã hồ sơ'),
                                e('th', { className: 'px-3 py-2.5 text-left font-semibold w-[100px]' }, 'Loại hồ sơ'),
                                e('th', { className: 'px-3 py-2.5 text-left font-semibold' }, 'Tên hồ sơ'),
                                e('th', { className: 'px-3 py-2.5 text-center font-semibold w-[100px]' }, 'Ngày trình'),
                                e('th', { className: 'px-3 py-2.5 text-center font-semibold w-[110px]' }, 'Người khởi tạo'),
                                e('th', { className: 'px-3 py-2.5 text-center font-semibold w-[110px]' }, 'Ngày phê duyệt'),
                                e('th', { className: 'px-3 py-2.5 text-center font-semibold w-[120px]' }, 'Người phê duyệt'),
                                e('th', { className: 'px-3 py-2.5 text-center font-semibold w-[110px]' }, 'Trạng thái')
                            )
                        ),
                        e('tbody', null,
                            hoSoRows.map(row =>
                                e('tr', { key: row.stt, className: 'border-b border-gray-100 hover:bg-gray-50 transition-colors' },
                                    e('td', { className: 'px-3 py-3 text-center font-medium text-gray-500' }, row.stt),
                                    e('td', { className: 'px-3 py-3 font-semibold text-[#006B68]' }, row.maHS),
                                    e('td', { className: 'px-3 py-3 text-gray-700' }, row.loaiHS),
                                    e('td', { className: 'px-3 py-3 text-gray-800 font-medium' }, row.tenHS),
                                    e('td', { className: 'px-3 py-3 text-center text-gray-600 tabular-nums whitespace-nowrap' }, row.ngayTrinh),
                                    e('td', { className: 'px-3 py-3 text-center text-gray-600 tabular-nums whitespace-nowrap' }, row.nguoiKhoiTao),
                                    e('td', { className: 'px-3 py-3 text-center text-gray-600 tabular-nums whitespace-nowrap' }, row.ngayPheDuyet || '—'),
                                    e('td', { className: 'px-3 py-3 text-center text-gray-600 tabular-nums whitespace-nowrap' }, row.nguoiPheDuyet || '—'),
                                    e('td', { className: 'px-3 py-3 text-center' },
                                        e('span', {
                                            className: 'inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap',
                                            style: { color: trangThaiColors[row.trangThaiTone], backgroundColor: trangThaiBg[row.trangThaiTone] }
                                        }, row.trangThai)
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ), document.body);
    };

    // ── Modal: Chi tiết phi tín dụng & Tổng hòa lợi ích ──
    const renderPhiTinDungModal = () => {
        if (!showPhiTinDungModal) return null;

        // Dữ liệu bảng 1: Chi tiết tình hình quan hệ phi tín dụng
        const phiTdChiTietRows = [
            { stt: '1', chiTieu: 'Thông tin quan hệ tiền gửi', isGroup: true, level: 0 },
            { chiTieu: 'Tiền gửi không kỳ hạn/ Tiền gửi thanh toán', isGroup: true, level: 1, collapsible: true },
            { chiTieu: 'Số dư cuối kỳ', t2: '1,000,000,000', t1: '1,000,000,000', t: '1,000,000,000', level: 2 },
            { chiTieu: 'Số dư bình quân từ đầu năm', t2: '750,000,000', t1: '750,000,000', t: '750,000,000', level: 2 },
            { chiTieu: 'Doanh số ghi có từ đầu năm', t2: '500,000,000', t1: '500,000,000', t: '500,000,000', level: 2 },
            { chiTieu: 'Số dư tiền gửi có kỳ hạn', isGroup: true, level: 1, collapsible: true, t2: '250,000,000', t1: '250,000,000', t: '250,000,000' },
            { chiTieu: 'Số dư cuối kỳ', t2: '100,000,000,000', t1: '100,000,000,000', t: '100,000,000,000', level: 2 },
            { chiTieu: 'Số dư bình quân từ đầu năm', t2: '1,000,000,000', t1: '1,000,000,000', t: '1,000,000,000', level: 2 },
            { stt: '2', chiTieu: 'Kinh doanh vốn, tiền tệ, sản phẩm phát sinh rủi ro tín dụng đối tác', isGroup: true, level: 0 },
            { chiTieu: 'Hạn mức rủi ro tín dụng đối tác được cấp', t2: '750,000,000', t1: '1,000,000,000', t: '1,000,000,000', level: 1 },
            { chiTieu: 'Số dư cuối kỳ các sản phẩm phát sinh rủi ro...', t2: '500,000,000', t1: '750,000,000', t: '750,000,000', level: 1 },
            { stt: '3', chiTieu: 'KD ngoại hối và vàng', isGroup: true, level: 0, t2: '250,000,000', t1: '500,000,000', t: '500,000,000' }
        ];

        // Dữ liệu bảng 2: Tổng hòa lợi ích của khách hàng
        const tongHoaRows = [
            { chiTieu: 'Thu nhập thuần từ lãi (FTP cơ sở)', isGroup: true, level: 0, collapsible: true },
            { chiTieu: 'Thu nhập thuần từ tín dụng (FTP cơ sở)', t2: '250,000,000', level: 1 },
            { chiTieu: 'Thu nhập thuần từ HDV (FTP cơ sở)', t2: '750,000,000', level: 1 },
            { chiTieu: 'Thu nhập thuần từ lãi khác', t2: '1,000,000,000', level: 1 },
            { chiTieu: 'Thu nhập thuần từ lãi (FTP cơ sở + bổ sung)', isGroup: true, level: 0, collapsible: true },
            { chiTieu: 'Thu nhập thuần từ tín dụng (FTP cơ sở + bổ sung)', t2: '1,000,000,000', t1: '1,000,000,000', t: '1,000,000,000', quy: '1,000,000,000', level: 1 },
            { chiTieu: 'Thu nhập thuần từ HDV (FTP cơ sở + bổ sung)', t2: '750,000,000', t1: '750,000,000', t: '750,000,000', quy: '750,000,000', level: 1 },
            { chiTieu: 'Thu nhập thuần từ lãi khác', t2: '500,000,000', t1: '500,000,000', t: '500,000,000', quy: '500,000,000', level: 1 },
            { chiTieu: 'Thu nhập thuần ngoài lãi', isGroup: true, level: 0, collapsible: true, t2: '250,000,000', t1: '250,000,000', t: '250,000,000', quy: '250,000,000' },
            { chiTieu: 'Thu nhập thuần từ bảo lãnh', t2: '100,000,000,000', t1: '100,000,000,000', t: '100,000,000,000', quy: '100,000,000,000', level: 1 },
            { chiTieu: 'Thu nhập thuần từ hoạt động TTTM', t2: '1,000,000,000', t1: '1,000,000,000', t: '1,000,000,000', quy: '1,000,000,000', level: 1 },
            { chiTieu: 'Tổng hòa lợi ích', isGroup: true, level: 0, collapsible: true },
            { chiTieu: 'Thu nhập thuần theo FTP cơ sở', t2: '750,000,000', t1: '1,000,000,000', t: '1,000,000,000', quy: '1,000,000,000', level: 1 },
            { chiTieu: 'Thu nhập thuần theo FTP cơ sở + bổ sung', t2: '500,000,000', t1: '750,000,000', t: '750,000,000', quy: '750,000,000', level: 1 },
            { chiTieu: 'NIM tín dụng thực tế (FTP cơ sở + bổ sung)...', t2: '250,000,000', t1: '500,000,000', t: '500,000,000', quy: '500,000,000', level: 1 },
            { chiTieu: 'NIM huy động vốn (FTP cơ sở + bổ sung)(quy...', t2: '250,000,000', t1: '250,000,000', t: '250,000,000', quy: '250,000,000', level: 1 },
            { chiTieu: 'RoRWA', isGroup: true, isBold: true, level: 0, t: '10%', quy: '12%' }
        ];

        const hierarchyRow = (row, idx, hasSTT, hasQuy) => {
            const pl = (row.level || 0) * 24;
            const isBold = row.isGroup || row.isBold;
            return e('tr', {
                key: idx,
                className: 'border-b border-gray-100 hover:bg-gray-50/50 transition-colors'
            },
                hasSTT && e('td', { className: 'px-3 py-2.5 text-center text-gray-500 font-medium align-top', style: { width: 48 } }, row.stt || ''),
                e('td', {
                    className: 'px-3 py-2.5 leading-5 align-top ' + (isBold ? 'font-semibold text-gray-900' : 'text-gray-700'),
                    style: { paddingLeft: (12 + pl) + 'px' }
                },
                    row.collapsible && e('i', { className: 'fas fa-chevron-down text-[10px] text-gray-400 mr-2' }),
                    row.chiTieu
                ),
                e('td', { className: 'px-3 py-2.5 text-right tabular-nums whitespace-nowrap ' + (isBold ? 'font-semibold text-gray-900' : 'text-gray-600') }, row.t2 || ''),
                e('td', { className: 'px-3 py-2.5 text-right tabular-nums whitespace-nowrap ' + (isBold ? 'font-semibold text-gray-900' : 'text-gray-600') }, row.t1 || ''),
                e('td', { className: 'px-3 py-2.5 text-right tabular-nums whitespace-nowrap ' + (isBold ? 'font-semibold text-gray-900' : 'text-gray-600') }, row.t || ''),
                hasQuy && e('td', { className: 'px-3 py-2.5 text-right tabular-nums whitespace-nowrap ' + (isBold ? 'font-semibold text-gray-900' : 'text-gray-600') }, row.quy || '')
            );
        };

        return ReactDOM.createPortal(e('div', {
            className: 'fixed inset-0 z-50 flex items-center justify-center',
            style: { background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' },
            onClick: () => setShowPhiTinDungModal(false)
        },
            e('div', {
                className: 'bg-white rounded-xl shadow-2xl w-full max-w-[1100px] mx-4 overflow-hidden flex flex-col',
                style: { animation: 'modalSlideIn 0.25s ease-out', maxHeight: '90vh' },
                onClick: ev => ev.stopPropagation()
            },
                // Header
                e('div', { className: 'flex items-center justify-between px-5 py-4 border-b border-gray-200 shrink-0' },
                    e('h3', { className: 'text-base font-bold text-gray-900' }, 'Chi tiết tình hình Quan hệ phi tín dụng & Tổng hòa lợi ích'),
                    e('button', {
                        className: 'w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors',
                        onClick: () => setShowPhiTinDungModal(false)
                    }, e('i', { className: 'fas fa-times text-sm' }))
                ),
                // Scrollable body
                e('div', { className: 'overflow-y-auto flex-1 p-5 space-y-6' },

                    // === Bảng 1: Chi tiết quan hệ phi tín dụng ===
                    e('div', null,
                        e('div', { className: 'flex items-center gap-2 mb-3' },
                            e('span', { className: 'inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#006B68]/10 shrink-0' },
                                e('i', { className: 'fas fa-piggy-bank text-xs text-[#006B68]' })
                            ),
                            e('h4', { className: 'text-sm font-bold text-[#006B68]' }, 'Chi tiết tình hình quan hệ phi tín dụng')
                        ),
                        e('div', { className: 'overflow-x-auto border border-gray-200 rounded-xl' },
                            e('table', { className: 'w-full text-[13px] min-w-[700px]' },
                                e('thead', null,
                                    e('tr', { className: 'bg-[#f8fbfb] border-b border-gray-200 text-gray-500' },
                                        e('th', { className: 'px-3 py-2.5 text-center font-semibold w-12' }, 'STT'),
                                        e('th', { className: 'px-3 py-2.5 text-left font-semibold' }, 'Chỉ tiêu'),
                                        e('th', { className: 'px-3 py-2.5 text-center font-semibold w-[150px]' }, 'Năm T-2'),
                                        e('th', { className: 'px-3 py-2.5 text-center font-semibold w-[150px]' }, 'Năm T-1'),
                                        e('th', { className: 'px-3 py-2.5 text-center font-semibold w-[150px]' }, 'Năm T')
                                    )
                                ),
                                e('tbody', null,
                                    phiTdChiTietRows.map((row, idx) => hierarchyRow(row, idx, true, false))
                                )
                            )
                        )
                    ),

                    // === Bảng 2: Tổng hòa lợi ích của khách hàng ===
                    e('div', null,
                        e('div', { className: 'flex items-center justify-between mb-3' },
                            e('div', { className: 'flex items-center gap-2' },
                                e('span', { className: 'inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#d69a00]/10 shrink-0' },
                                    e('i', { className: 'fas fa-coins text-xs text-[#d69a00]' })
                                ),
                                e('h4', { className: 'text-sm font-bold text-[#006B68]' }, 'Tổng hòa lợi ích của khách hàng')
                            ),
                            e('span', { className: 'text-xs text-gray-500 italic' }, 'Đơn vị: Triệu đ')
                        ),
                        e('div', { className: 'overflow-x-auto border border-gray-200 rounded-xl' },
                            e('table', { className: 'w-full text-[13px] min-w-[800px]' },
                                e('thead', null,
                                    e('tr', { className: 'bg-[#f8fbfb] border-b border-gray-200 text-gray-500' },
                                        e('th', { className: 'px-3 py-2.5 text-left font-semibold' }, 'Chỉ tiêu'),
                                        e('th', { className: 'px-3 py-2.5 text-center font-semibold w-[140px]' }, 'Năm T-2'),
                                        e('th', { className: 'px-3 py-2.5 text-center font-semibold w-[140px]' }, 'Năm T-1'),
                                        e('th', { className: 'px-3 py-2.5 text-center font-semibold w-[140px]' }, 'Năm T'),
                                        e('th', { className: 'px-3 py-2.5 text-center font-semibold w-[140px]' }, 'Quý gần nhất')
                                    )
                                ),
                                e('tbody', null,
                                    tongHoaRows.map((row, idx) => hierarchyRow(row, idx, false, true))
                                )
                            )
                        )
                    )
                )
            )
        ), document.body);
    };

    return e('div', { className: 'space-y-4 pb-4' },
        renderGeneralInfo(),
        renderRatingSection(),
        renderBidvSection(),
        renderTctdKhacSection(),
        renderKhlqSection(),
        renderKhlqSectionV2(),
        renderCanhBaoModal(),
        renderHoSoModal(),
        renderPhiTinDungModal()
    );
};
