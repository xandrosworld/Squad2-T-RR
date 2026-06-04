// =====================================================
// Tab: Đánh giá chung
// =====================================================

window.TabDanhGiaChung = function () {
    const e = React.createElement;

    // Section completion tracking
    const [sectionDone, setSectionDone] = React.useState({
        ruiRo: false,
        tuanThu: false,
        yKienTDRR: false,
        qlrrTapTrung: false,
        gioiHanNganh: false
    });

    // Auto-check sections completion
    var checkSectionCompletion = function() {
        var newDone = {};
        // Rủi ro: completed if at least 1 risk entry exists
        newDone.ruiRo = ruiRoList.length > 0;
        // Tuân thủ: completed if at least 1 regulation entry exists
        newDone.tuanThu = quyDinhList.length > 0;
        // Ý kiến TĐRR: completed if đánh giá field has content
        newDone.yKienTDRR = tdrrDanhGiaDeXuat && tdrrDanhGiaDeXuat !== '';
        // QLRR tập trung: completed if qlrrData has entries
        newDone.qlrrTapTrung = qlrrData.length > 0;
        // Giới hạn ngành: completed if ngành list has entries
        newDone.gioiHanNganh = gioiHanNganhList.length > 0;
        setSectionDone(newDone);
    };

    // Auto-check when data changes
    React.useEffect(function() {
        checkSectionCompletion();
    }, [ruiRoList, quyDinhList, tdrrDanhGiaDeXuat, qlrrData, gioiHanNganhList]);

    // Helper: render section completion badge
    var renderSectionBadge = function(sectionKey) {
        return e('span', {
            className: sectionDone[sectionKey] ? 'ml-2 inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full' : 'hidden'
        }, e('i', { className: 'fas fa-check-circle text-[10px]' }), ' Hoàn thành');
    };

    // State cho phần TĐRR
    const [tdrrDanhGiaDeXuat, setTdrrDanhGiaDeXuat] = React.useState('');
    const [tdrrRuiRoOption, setTdrrRuiRoOption] = React.useState('daDayDu'); // 'daDayDu' | 'boSung'
    const [tdrrBoSungYKien, setTdrrBoSungYKien] = React.useState('');

    // State cho Đánh giá đáp ứng quy định (TĐRR)
    const [tdrrQuyDinhOption, setTdrrQuyDinhOption] = React.useState('daDayDu'); // 'daDayDu' | 'boSung'
    const [tdrrQuyDinhData, setTdrrQuyDinhData] = React.useState([
        { stt: 1, tenVanBan: 'Chính sách cấp tín dụng (Quy định số 1234/QĐ-BIDV ngày 15/01/2024 về Chính sách cấp tín dụng)', yKienTDRR: 'Đáp ứng', chiTiet: 'Yêu cầu bảo đảm bằng bất động sản với tỷ lệ 70%, giám sát chặt chẽ dòng tiền từ các hợp đồng' },
        { stt: 2, tenVanBan: 'Định hướng cấp tín dụng đối với ngành Xây dựng (Quyết định số 567/QĐ-BIDV ngày 20/02/2024)', yKienTDRR: 'Đáp ứng', chiTiet: 'Đánh giá định kỳ 6 tháng/lần về tình hình tài chính, yêu cầu duy trì tỷ lệ thanh toán tối thiểu' },
        { stt: 3, tenVanBan: 'Quản lý danh sách khách hàng', yKienTDRR: 'Không đáp ứng', chiTiet: 'Yêu cầu bảo đảm bằng bất động sản với tỷ lệ 70%, giám sát chặt chẽ dòng tiền từ các hợp đồng' },
        { stt: 4, tenVanBan: 'Quy định về hạn mức tín dụng và thẩm quyền phê duyệt (Quy định số 234/QĐ-BIDV ngày 05/04/2024)', yKienTDRR: 'Đáp ứng', chiTiet: 'Yêu cầu bảo hiểm tài sản bảo đảm, đánh giá lại định kỳ' },
        { stt: 5, tenVanBan: 'Tạo nội dung thương mại điện tử', yKienTDRR: 'Đáp ứng', chiTiet: 'Đánh giá định kỳ 6 tháng/lần về tình hình tài chính, yêu cầu duy trì tỷ lệ thanh toán tối thiểu' }
    ]);

    // State cho Đánh giá các chỉ tiêu QLRR tập trung
    const [qlrrData, setQlrrData] = React.useState([
        { stt: 1, chiTieu: 'Giới hạn TSCRTD giao Ban Khách hàng/Chi nhánh', dieuKien: '≤ 500 tỷ VND', tinhHinhThucHien: '320 tỷ VND', danhGia: 'Đáp ứng' },
        { stt: 2, chiTieu: 'Giới hạn tín dụng ngành', dieuKien: '≤ 2,500,000,000,000 VND', tinhHinhThucHien: '1,650,000,000,000 VNĐ', danhGia: 'Đáp ứng' },
        { stt: 3, chiTieu: 'Tỷ lệ Tổng mức dư nợ TD đối với 1 KH/dư nợ tư cấp', dieuKien: '≤ 15%', tinhHinhThucHien: '8.2%', danhGia: 'Đáp ứng' },
        { stt: 4, chiTieu: 'Tỷ lệ Tổng mức dư nợ TD đối với 1 nhóm KH/Quyền tự cấp', dieuKien: '≤ 25%', tinhHinhThucHien: '18.5%', danhGia: 'Đáp ứng' }
    ]);

    // State cho phần rủi ro - chuyển thành state có thể thay đổi
    const [ruiRoList, setRuiRoList] = React.useState([
        {
            stt: 1,
            loaiRuiRo: 'Rủi ro tín dụng',
            ruiRoCuThe: 'Khách hàng không có khả năng trả nợ đúng hạn',
            bienPhapKH: 'Yêu cầu bảo đảm bằng bất động sản với tỷ lệ 70%, giám sát chặt chẽ dòng tiền từ các hợp đồng',
            bienPhapNH: 'Đánh giá định kỳ 6 tháng/lần về tình hình tài chính, yêu cầu duy trì tỷ lệ thanh toán tối thiểu'
        },
        {
            stt: 2,
            loaiRuiRo: 'Rủi ro thanh khoản',
            ruiRoCuThe: 'Dòng tiền không ổn định do tính chất ngành xây dựng',
            bienPhapKH: 'Đánh giá định kỳ 6 tháng/lần về tình hình tài chính, yêu cầu duy trì tỷ lệ thanh toán tối thiểu',
            bienPhapNH: 'Yêu cầu bảo hiểm tài sản bảo đảm, định giá lại định kỳ'
        },
        {
            stt: 3,
            loaiRuiRo: 'Rủi ro tài sản bảo đảm',
            ruiRoCuThe: 'Giá trị tài sản bảo đảm giảm',
            bienPhapKH: 'Yêu cầu bảo hiểm tài sản bảo đảm, định giá lại định kỳ',
            bienPhapNH: 'Yêu cầu bảo hiểm tài sản bảo đảm, định giá lại định kỳ'
        }
    ]);

    // State cho modal chỉnh sửa rủi ro
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [editingRuiRo, setEditingRuiRo] = React.useState(null);
    const [editingIndex, setEditingIndex] = React.useState(null);
    const [isAddingNew, setIsAddingNew] = React.useState(false);

    // Loại rủi ro options
    const loaiRuiRoOptions = [
        'Rủi ro tín dụng',
        'Rủi ro thanh khoản',
        'Rủi ro tài sản bảo đảm',
        'Rủi ro thị trường',
        'Rủi ro hoạt động',
        'Rủi ro pháp lý'
    ];

    // Gợi ý rủi ro mẫu cho từng loại rủi ro
    const goiYRuiRo = {
        'Rủi ro tín dụng': {
            ruiRoCuThe: 'Khách hàng không có khả năng trả nợ đúng hạn',
            bienPhapKH: 'Yêu cầu bảo đảm bằng bất động sản với tỷ lệ 70%, giám sát chặt chẽ dòng tiền từ các hợp đồng',
            bienPhapNH: 'Đánh giá định kỳ 6 tháng/lần về tình hình tài chính, yêu cầu duy trì tỷ lệ thanh toán tối thiểu'
        },
        'Rủi ro thanh khoản': {
            ruiRoCuThe: 'Dòng tiền không ổn định do tính chất ngành xây dựng',
            bienPhapKH: 'Đánh giá định kỳ 6 tháng/lần về tình hình tài chính, yêu cầu duy trì tỷ lệ thanh toán tối thiểu',
            bienPhapNH: 'Yêu cầu bảo hiểm tài sản bảo đảm, định giá lại định kỳ'
        },
        'Rủi ro tài sản bảo đảm': {
            ruiRoCuThe: 'Giá trị tài sản bảo đảm giảm',
            bienPhapKH: 'Yêu cầu bảo hiểm tài sản bảo đảm, định giá lại định kỳ',
            bienPhapNH: 'Yêu cầu bảo hiểm tài sản bảo đảm, định giá lại định kỳ'
        },
        'Rủi ro thị trường': {
            ruiRoCuThe: 'Biến động giá nguyên vật liệu, lãi suất hoặc tỷ giá ảnh hưởng đến hoạt động kinh doanh',
            bienPhapKH: 'Đa dạng hóa nguồn cung, ký hợp đồng kỳ hạn để phòng ngừa rủi ro giá',
            bienPhapNH: 'Theo dõi biến động thị trường, yêu cầu KH báo cáo định kỳ về tình hình kinh doanh'
        },
        'Rủi ro hoạt động': {
            ruiRoCuThe: 'Rủi ro từ quy trình nội bộ, con người hoặc hệ thống không đầy đủ hoặc thất bại',
            bienPhapKH: 'Hoàn thiện quy trình quản lý nội bộ, đào tạo nhân sự',
            bienPhapNH: 'Kiểm tra định kỳ quy trình hoạt động của KH, yêu cầu báo cáo quản trị rủi ro'
        },
        'Rủi ro pháp lý': {
            ruiRoCuThe: 'Rủi ro liên quan đến việc không tuân thủ quy định pháp luật hoặc tranh chấp pháp lý',
            bienPhapKH: 'Đảm bảo tuân thủ đầy đủ các quy định pháp luật, thuê tư vấn pháp lý',
            bienPhapNH: 'Thẩm định pháp lý đầy đủ, theo dõi các vụ kiện/tranh chấp liên quan đến KH'
        }
    };

    // Handler khi chọn loại rủi ro - tự động điền gợi ý
    const handleSelectLoaiRuiRo = (loaiRuiRo) => {
        if (loaiRuiRo && goiYRuiRo[loaiRuiRo] && isAddingNew) {
            setEditingRuiRo({
                ...editingRuiRo,
                loaiRuiRo: loaiRuiRo,
                ruiRoCuThe: goiYRuiRo[loaiRuiRo].ruiRoCuThe,
                bienPhapKH: goiYRuiRo[loaiRuiRo].bienPhapKH,
                bienPhapNH: goiYRuiRo[loaiRuiRo].bienPhapNH
            });
        } else {
            setEditingRuiRo({ ...editingRuiRo, loaiRuiRo: loaiRuiRo });
        }
    };

    // Handlers cho rủi ro
    const handleSaveRuiRo = () => {
        if (isAddingNew) {
            // Thêm mới
            setRuiRoList([...ruiRoList, editingRuiRo]);
        } else {
            // Cập nhật
            const newList = [...ruiRoList];
            newList[editingIndex] = editingRuiRo;
            setRuiRoList(newList);
        }
        setShowEditModal(false);
        setEditingRuiRo(null);
        setEditingIndex(null);
        setIsAddingNew(false);
    };

    const handleDeleteRuiRo = (idx) => {
        if (confirm('Bạn có chắc chắn muốn xóa dòng này?')) {
            const newList = ruiRoList.filter((_, i) => i !== idx);
            // Cập nhật lại STT
            const updatedList = newList.map((item, i) => ({ ...item, stt: i + 1 }));
            setRuiRoList(updatedList);
        }
    };

    const handleCancelEdit = () => {
        setShowEditModal(false);
        setEditingRuiRo(null);
        setEditingIndex(null);
        setIsAddingNew(false);
    };

    // Sample data cho bảng Đánh giá đáp ứng quy định
    // State cho bảng đánh giá quy định - khởi đầu rỗng
    const [quyDinhList, setQuyDinhList] = React.useState([]);

    // State cho modal chọn văn bản quy định
    const [showVanBanModal, setShowVanBanModal] = React.useState(false);
    const [searchVanBan, setSearchVanBan] = React.useState('');
    const [selectedVanBan, setSelectedVanBan] = React.useState([]);

    // Danh sách văn bản quy định có sẵn
    const danhSachVanBan = [
        { soQuyDinh: '1234/QĐ-NHNN', tenQuyDinh: 'Quy định về cấp tín dụng đối với khách hàng' },
        { soQuyDinh: '567/QĐ-BIDV', tenQuyDinh: 'Định hướng cấp tín dụng ngành xây dựng năm 2024' },
        { soQuyDinh: '890/QĐ-BIDV', tenQuyDinh: 'Quy định cấp tín dụng đối với nhóm khách hàng liên quan' },
        { soQuyDinh: '1122/TT-NHNN', tenQuyDinh: 'Thông tư về giới hạn tín dụng ngành bất động sản' },
        { soQuyDinh: '345/QĐ-BIDV', tenQuyDinh: 'Quy định về gói tín dụng ưu đãi doanh nghiệp vừa và nhỏ' },
        { soQuyDinh: '678/CV-HĐTD', tenQuyDinh: 'Công văn chỉ đạo tín dụng quý I/2024' },
        { soQuyDinh: '2000/QĐ-NHNN', tenQuyDinh: 'Quy định về phân loại nợ và trích lập dự phòng rủi ro' },
        { soQuyDinh: '445/QĐ-BIDV', tenQuyDinh: 'Quy định về thẩm định tài sản bảo đảm' },
        { soQuyDinh: '789/QĐ-BIDV', tenQuyDinh: 'Quy định về hạn mức tín dụng và thẩm quyền phê duyệt' },
        { soQuyDinh: '1001/QĐ-NHNN', tenQuyDinh: 'Quy định về quản lý rủi ro tín dụng' }
    ];

    // Filter văn bản theo search
    const filteredVanBan = danhSachVanBan.filter(vb =>
        vb.soQuyDinh.toLowerCase().includes(searchVanBan.toLowerCase()) ||
        vb.tenQuyDinh.toLowerCase().includes(searchVanBan.toLowerCase())
    );

    // Toggle chọn văn bản
    const handleToggleVanBan = (soQuyDinh) => {
        if (selectedVanBan.includes(soQuyDinh)) {
            setSelectedVanBan(selectedVanBan.filter(s => s !== soQuyDinh));
        } else {
            setSelectedVanBan([...selectedVanBan, soQuyDinh]);
        }
    };

    // Thêm văn bản từ danh sách vào bảng
    const handleAddVanBanFromList = () => {
        const newItems = selectedVanBan.map((soQD, idx) => {
            const vb = danhSachVanBan.find(v => v.soQuyDinh === soQD);
            return {
                stt: quyDinhList.length + idx + 1,
                tenVanBan: vb ? `${vb.soQuyDinh} - ${vb.tenQuyDinh}` : soQD,
                yKienDeXuat: '',
                chiTiet: ''
            };
        });
        setQuyDinhList([...quyDinhList, ...newItems]);
        setSelectedVanBan([]);
        setShowVanBanModal(false);
        setSearchVanBan('');
    };

    // Thêm dòng mới thủ công
    const handleAddQuyDinhManual = () => {
        setQuyDinhList([...quyDinhList, {
            stt: quyDinhList.length + 1,
            tenVanBan: '',
            yKienDeXuat: '',
            chiTiet: ''
        }]);
    };

    // Cập nhật dòng quy định
    const handleUpdateQuyDinh = (idx, field, value) => {
        const newList = [...quyDinhList];
        newList[idx][field] = value;
        setQuyDinhList(newList);
    };

    // Xóa dòng quy định
    const handleDeleteQuyDinh = (idx) => {
        const newList = quyDinhList.filter((_, i) => i !== idx);
        const updatedList = newList.map((item, i) => ({ ...item, stt: i + 1 }));
        setQuyDinhList(updatedList);
    };

    // ==================
    // STATE CHO KHỐI GIỚI HẠN TÍN DỤNG NGÀNH
    // ==================
    const [gioiHanNganhList, setGioiHanNganhList] = React.useState([]);
    const [showNganhModal, setShowNganhModal] = React.useState(false);
    const [editingNganh, setEditingNganh] = React.useState(null);
    const [editingNganhIndex, setEditingNganhIndex] = React.useState(null);
    const [isAddingNganh, setIsAddingNganh] = React.useState(false);

    // Dữ liệu mã ngành theo core (từ Tab Thông tin khách hàng)
    const maNganhCore = [
        {
            nguonMaNganh: 'Ngành kinh tế theo core',
            nganhCap1: 'Xây dựng',
            nganhCap2: 'Xây dựng công trình dân dụng',
            kiemSoatRuiRo: 'Có',
            hanMucPheDuyet: '500.000.000.000',
            duNoThucHien: '320.000.000.000'
        },
        {
            nguonMaNganh: 'Ngành kinh tế theo core',
            nganhCap1: 'Bất động sản',
            nganhCap2: 'Kinh doanh bất động sản',
            kiemSoatRuiRo: 'Có',
            hanMucPheDuyet: '800.000.000.000',
            duNoThucHien: '650.000.000.000'
        },
        {
            nguonMaNganh: 'Ngành kinh tế theo core',
            nganhCap1: 'Công nghiệp chế biến',
            nganhCap2: 'Sản xuất thực phẩm',
            kiemSoatRuiRo: 'Không',
            hanMucPheDuyet: '1.000.000.000.000',
            duNoThucHien: '1.200.000.000.000'
        }
    ];

    // Dữ liệu mã ngành theo commitment (từ Tab Khoản tín dụng)
    const maNganhCommitment = [
        {
            nguonMaNganh: 'Ngành theo commitment 2025100abcd',
            nganhCap1: 'Bất động sản',
            nganhCap2: 'Kinh doanh bất động sản',
            kiemSoatRuiRo: 'Có',
            hanMucPheDuyet: '800.000.000.000',
            duNoThucHien: '650.000.000.000'
        },
        {
            nguonMaNganh: 'Ngành theo commitment 2025104xyct',
            nganhCap1: 'Công nghiệp chế biến',
            nganhCap2: 'Sản xuất thực phẩm',
            kiemSoatRuiRo: 'Không',
            hanMucPheDuyet: '1.000.000.000.000',
            duNoThucHien: '1.200.000.000.000'
        }
    ];

    // Handler khi chọn nguồn mã ngành
    const handleSelectNguonMaNganh = (nguonMaNganh) => {
        if (!nguonMaNganh) {
            setEditingNganh({
                ...editingNganh,
                nguonMaNganh: '',
                nganhCap1: '',
                nganhCap2: '',
                kiemSoatRuiRo: '',
                hanMucPheDuyet: '',
                duNoThucHien: '',
                ghiChu: ''
            });
            return;
        }

        // Tìm trong core trước
        let found = maNganhCore.find(m => m.nguonMaNganh === nguonMaNganh);
        if (!found) {
            found = maNganhCommitment.find(m => m.nguonMaNganh === nguonMaNganh);
        }

        if (found) {
            setEditingNganh({
                ...editingNganh,
                nguonMaNganh: found.nguonMaNganh,
                nganhCap1: found.nganhCap1,
                nganhCap2: found.nganhCap2,
                kiemSoatRuiRo: found.kiemSoatRuiRo,
                hanMucPheDuyet: found.hanMucPheDuyet,
                duNoThucHien: found.duNoThucHien,
                ghiChu: editingNganh?.ghiChu || ''
            });
        }
    };

    // Thêm/cập nhật ngành
    const handleSaveNganh = () => {
        if (isAddingNganh) {
            setGioiHanNganhList([...gioiHanNganhList, { ...editingNganh, stt: gioiHanNganhList.length + 1 }]);
        } else {
            const newList = [...gioiHanNganhList];
            newList[editingNganhIndex] = editingNganh;
            setGioiHanNganhList(newList);
        }
        setShowNganhModal(false);
        setEditingNganh(null);
        setEditingNganhIndex(null);
        setIsAddingNganh(false);
    };

    // Xóa ngành
    const handleDeleteNganh = (idx) => {
        if (confirm('Bạn có chắc chắn muốn xóa dòng này?')) {
            const newList = gioiHanNganhList.filter((_, i) => i !== idx);
            const updatedList = newList.map((item, i) => ({ ...item, stt: i + 1 }));
            setGioiHanNganhList(updatedList);
        }
    };

    // Hủy modal ngành
    const handleCancelNganh = () => {
        setShowNganhModal(false);
        setEditingNganh(null);
        setEditingNganhIndex(null);
        setIsAddingNganh(false);
    };

    // ==================
    // RENDER KHỐI Ý KIẾN ĐỀ XUẤT (Readonly)
    // ==================
    const renderDeXuatSection = () => {
        return e('div', { className: 'bg-white rounded-lg border border-gray-200 mb-6' },

            e('div', { className: 'p-4 space-y-6' },
                // Bảng 1: Đánh giá rủi ro và các biện pháp phòng ngừa
                e('div', null,
                    e('div', { className: 'flex items-center justify-between mb-3' },
                        e('h4', { className: 'text-base font-bold text-[#006B68] flex items-center gap-2' },
                            e('i', { className: 'fas fa-shield-alt text-sm' }),
                            'Đánh giá rủi ro và các biện pháp phòng ngừa',
                            renderSectionBadge('ruiRo')
                        ),
                        e('button', {
                            className: 'px-3 py-1.5 text-sm text-[#006B68] border border-[#006B68] rounded-lg hover:bg-[#e6f4f1] flex items-center gap-1',
                            onClick: () => {
                                setEditingRuiRo({
                                    stt: ruiRoList.length + 1,
                                    loaiRuiRo: '',
                                    ruiRoCuThe: '',
                                    bienPhapKH: '',
                                    bienPhapNH: ''
                                });
                                setIsAddingNew(true);
                                setShowEditModal(true);
                            }
                        },
                            e('i', { className: 'fas fa-plus text-xs' }),
                            'Thêm mới'
                        )
                    ),
                    e('div', { className: 'overflow-x-auto border border-gray-200 rounded-lg' },
                        e('table', { className: 'w-full text-sm' },
                            e('thead', null,
                                e('tr', { className: 'bg-gray-50 text-left' },
                                    e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium w-12 border-r border-gray-200' }, 'STT'),
                                    e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium border-r border-gray-200' }, 'Loại rủi ro'),
                                    e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium border-r border-gray-200' }, 'Rủi ro cụ thể'),
                                    e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium border-r border-gray-200' }, 'Biện pháp phòng ngừa của khách hàng'),
                                    e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium border-r border-gray-200' }, 'Biện pháp phòng ngừa của ngân hàng'),
                                    e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium text-center w-24' }, 'Tác vụ')
                                )
                            ),
                            e('tbody', null,
                                ruiRoList.map((row, idx) =>
                                    e('tr', { key: idx, className: 'border-t border-gray-200 hover:bg-gray-50' },
                                        e('td', { className: 'px-3 py-2.5 text-gray-700 border-r border-gray-200' }, row.stt),
                                        e('td', { className: 'px-3 py-2.5 text-gray-700 border-r border-gray-200' }, row.loaiRuiRo),
                                        e('td', { className: 'px-3 py-2.5 text-gray-700 border-r border-gray-200' }, row.ruiRoCuThe),
                                        e('td', { className: 'px-3 py-2.5 text-gray-700 border-r border-gray-200' }, row.bienPhapKH),
                                        e('td', { className: 'px-3 py-2.5 text-gray-700 border-r border-gray-200' }, row.bienPhapNH),
                                        e('td', { className: 'px-3 py-2.5 text-center' },
                                            e('div', { className: 'flex items-center justify-center gap-2' },
                                                // Edit button
                                                e('button', {
                                                    className: 'w-8 h-8 rounded-full bg-[#e6f4f1] text-[#006B68] hover:bg-[#006B68] hover:text-white transition-colors flex items-center justify-center',
                                                    title: 'Chỉnh sửa',
                                                    onClick: () => {
                                                        setEditingRuiRo({ ...row });
                                                        setEditingIndex(idx);
                                                        setIsAddingNew(false);
                                                        setShowEditModal(true);
                                                    }
                                                },
                                                    e('i', { className: 'fas fa-pen text-xs' })
                                                ),
                                                // Delete button
                                                e('button', {
                                                    className: 'w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center',
                                                    title: 'Xóa',
                                                    onClick: () => handleDeleteRuiRo(idx)
                                                },
                                                    e('i', { className: 'fas fa-trash text-xs' })
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    ),

                    // Ý kiến TDRR
                    e('div', { className: 'mt-4' },
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Ý kiến TDRR'),
                        e('div', { className: 'flex items-center gap-6' },
                            e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                e('input', {
                                    type: 'radio',
                                    name: 'yKienTDRR_ruiro',
                                    checked: tdrrRuiRoOption === 'daDayDu',
                                    onChange: () => setTdrrRuiRoOption('daDayDu'),
                                    className: 'w-4 h-4 accent-[#006B68]'
                                }),
                                e('span', { className: 'text-sm text-gray-700' }, 'Đã đầy đủ')
                            ),
                            e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                e('input', {
                                    type: 'radio',
                                    name: 'yKienTDRR_ruiro',
                                    checked: tdrrRuiRoOption === 'boSung',
                                    onChange: () => setTdrrRuiRoOption('boSung'),
                                    className: 'w-4 h-4 accent-[#006B68]'
                                }),
                                e('span', { className: 'text-sm text-gray-700' }, 'Bổ sung ý kiến')
                            )
                        )
                    )
                ),

                // Ý kiến đánh giá (Readonly)
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Ý kiến đánh giá *'),
                    e('div', { className: 'flex items-center gap-4 mb-2' },
                        e('label', { className: 'flex items-center gap-2' },
                            e('input', { type: 'radio', name: 'deXuatYKien', checked: false, disabled: true }),
                            e('span', { className: 'text-sm text-gray-600' }, 'Đầy đủ, hợp lý')
                        ),
                        e('label', { className: 'flex items-center gap-2' },
                            e('input', { type: 'radio', name: 'deXuatYKien', checked: true, disabled: true }),
                            e('span', { className: 'text-sm text-gray-600' }, 'Ý kiến khác')
                        )
                    ),
                    e('div', { className: 'bg-gray-50 border border-gray-200 rounded-lg p-3' },
                        e('p', { className: 'text-sm text-gray-600' }, 'Nhập ý kiến')
                    ),
                    e('div', { className: 'text-right text-xs text-gray-400 mt-1' }, '0/500')
                ),

                // Bảng 2: Đánh giá đáp ứng quy định
                e('div', null,
                    e('h4', { className: 'text-base font-bold text-[#006B68] mb-3 flex items-center gap-2' },
                        e('i', { className: 'fas fa-clipboard-check text-sm' }),
                        'Đánh giá tuân thủ chính sách, quy định',
                        renderSectionBadge('tuanThu')
                    ),

                    // Bảng với border
                    e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                        e('table', { className: 'w-full text-sm' },
                            e('thead', null,
                                e('tr', { className: 'bg-gray-50 text-left border-b border-gray-200' },
                                    e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium w-12 border-r border-gray-200' }, 'STT'),
                                    e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium border-r border-gray-200' }, 'Các văn bản/quy định'),
                                    e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium w-48 border-r border-gray-200' }, 'Ý kiến đánh giá của BP đề xuất'),
                                    e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium border-r border-gray-200' }, 'Chi tiết đánh giá'),
                                    e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium w-20 text-center' }, 'Tác vụ')
                                )
                            ),
                            e('tbody', null,
                                quyDinhList.length === 0
                                    ? e('tr', null,
                                        e('td', { colSpan: 5, className: 'px-3 py-8 text-center text-gray-400' },
                                            'Chưa có dữ liệu. Nhấn "Thêm quy định" để thêm văn bản/quy định cần đánh giá.'
                                        )
                                    )
                                    : quyDinhList.map((row, idx) =>
                                        e('tr', { key: idx, className: 'border-t border-gray-200 hover:bg-gray-50' },
                                            e('td', { className: 'px-3 py-2.5 text-gray-700 border-r border-gray-200 text-center' }, row.stt),
                                            e('td', { className: 'px-3 py-2.5 border-r border-gray-200' },
                                                e('input', {
                                                    type: 'text',
                                                    className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#006B68]',
                                                    placeholder: 'Nhập văn bản/quy định...',
                                                    value: row.tenVanBan,
                                                    onChange: (ev) => handleUpdateQuyDinh(idx, 'tenVanBan', ev.target.value)
                                                })
                                            ),
                                            e('td', { className: 'px-3 py-2.5 border-r border-gray-200' },
                                                e('select', {
                                                    className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#006B68]',
                                                    value: row.yKienDeXuat,
                                                    onChange: (ev) => handleUpdateQuyDinh(idx, 'yKienDeXuat', ev.target.value)
                                                },
                                                    e('option', { value: '' }, 'Chọn đánh giá'),
                                                    e('option', { value: 'Đáp ứng' }, 'Đáp ứng'),
                                                    e('option', { value: 'Không đáp ứng' }, 'Không đáp ứng'),
                                                    e('option', { value: 'Khác' }, 'Khác')
                                                )
                                            ),
                                            e('td', { className: 'px-3 py-2.5 border-r border-gray-200' },
                                                e('input', {
                                                    type: 'text',
                                                    className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#006B68]',
                                                    placeholder: 'Nhập chi tiết đánh giá...',
                                                    value: row.chiTiet,
                                                    onChange: (ev) => handleUpdateQuyDinh(idx, 'chiTiet', ev.target.value)
                                                })
                                            ),
                                            e('td', { className: 'px-3 py-2.5 text-center' },
                                                e('button', {
                                                    className: 'w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center mx-auto',
                                                    title: 'Xóa',
                                                    onClick: () => handleDeleteQuyDinh(idx)
                                                },
                                                    e('i', { className: 'fas fa-trash text-xs' })
                                                )
                                            )
                                        )
                                    )
                            )
                        )
                    ),

                    // Buttons: Chọn từ danh sách, Thêm mới
                    e('div', { className: 'flex items-center gap-3 mt-3' },
                        e('button', {
                            className: 'px-3 py-1.5 text-sm text-[#006B68] border border-[#006B68] rounded-lg hover:bg-[#e6f4f1] flex items-center gap-1',
                            onClick: () => setShowVanBanModal(true)
                        },
                            e('i', { className: 'fas fa-plus text-xs' }),
                            'Chọn từ danh sách'
                        ),
                        e('button', {
                            className: 'px-3 py-1.5 text-sm bg-[#006B68] text-white rounded-lg hover:bg-[#005a57] flex items-center gap-1',
                            onClick: handleAddQuyDinhManual
                        },
                            e('i', { className: 'fas fa-plus text-xs' }),
                            'Thêm mới'
                        )
                    )
                )
            )
        );
    };

    // ==================
    // RENDER KHỐI Ý KIẾN THẨM ĐỊNH RỦI RO
    // ==================
    const renderTDRRSection = () => {
        return e('div', { className: 'bg-white rounded-lg border border-gray-200' },
            // Header
            e('div', { className: 'px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between' },
                e('div', { className: 'flex items-center gap-2' },
                    e('h3', { className: 'text-sm font-semibold text-gray-800' }, 'Ý kiến thẩm định rủi ro'),
                    renderSectionBadge('yKienTDRR')
                )
            ),

            e('div', { className: 'p-4 space-y-4' },
                // Đánh giá ý kiến của bộ phận đề xuất
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Đánh giá ý kiến của bộ phận đề xuất'),
                    e('textarea', {
                        className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#006B68] focus:border-[#006B68]',
                        rows: 3,
                        placeholder: 'Nhập đánh giá ý kiến của bộ phận đề xuất...',
                        value: tdrrDanhGiaDeXuat,
                        onChange: (ev) => setTdrrDanhGiaDeXuat(ev.target.value)
                    }),
                    e('div', { className: 'text-right text-xs text-gray-400 mt-1' }, tdrrDanhGiaDeXuat.length + '/500')
                ),

                // Đánh giá rủi ro và các biện pháp phòng ngừa
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Đánh giá rủi ro và các biện pháp phòng ngừa'),
                    e('div', { className: 'flex items-center gap-6 mb-3' },
                        e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                            e('input', {
                                type: 'radio',
                                name: 'tdrrRuiRo',
                                checked: tdrrRuiRoOption === 'daDayDu',
                                onChange: () => setTdrrRuiRoOption('daDayDu'),
                                className: 'w-4 h-4 text-[#006B68]'
                            }),
                            e('span', { className: 'text-sm text-gray-700' }, 'Đã đầy đủ')
                        ),
                        e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                            e('input', {
                                type: 'radio',
                                name: 'tdrrRuiRo',
                                checked: tdrrRuiRoOption === 'boSung',
                                onChange: () => setTdrrRuiRoOption('boSung'),
                                className: 'w-4 h-4 text-[#006B68]'
                            }),
                            e('span', { className: 'text-sm text-gray-700' }, 'Bổ sung ý kiến')
                        )
                    ),

                    // Hiển thị textarea khi chọn "Bổ sung ý kiến"
                    tdrrRuiRoOption === 'boSung' && e('div', { className: 'border border-[#006B68] rounded-lg overflow-hidden' },
                        e('textarea', {
                            className: 'w-full px-3 py-2 text-sm focus:outline-none',
                            rows: 4,
                            placeholder: 'Nhập ý kiến...',
                            value: tdrrBoSungYKien,
                            onChange: (ev) => setTdrrBoSungYKien(ev.target.value)
                        })
                    )
                ),

                // Đánh giá đáp ứng quy định
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Đánh giá đáp ứng quy định'),
                    e('div', { className: 'flex items-center gap-6 mb-3' },
                        e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                            e('input', {
                                type: 'radio',
                                name: 'tdrrQuyDinh',
                                checked: tdrrQuyDinhOption === 'daDayDu',
                                onChange: () => setTdrrQuyDinhOption('daDayDu'),
                                className: 'w-4 h-4 text-[#006B68]'
                            }),
                            e('span', { className: 'text-sm text-gray-700' }, 'Đã đầy đủ')
                        ),
                        e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                            e('input', {
                                type: 'radio',
                                name: 'tdrrQuyDinh',
                                checked: tdrrQuyDinhOption === 'boSung',
                                onChange: () => setTdrrQuyDinhOption('boSung'),
                                className: 'w-4 h-4 text-[#006B68]'
                            }),
                            e('span', { className: 'text-sm text-gray-700' }, 'Bổ sung ý kiến')
                        )
                    ),

                    // Hiển thị bảng khi chọn "Bổ sung ý kiến"
                    tdrrQuyDinhOption === 'boSung' && e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                        // Header với button
                        e('div', { className: 'px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between' },
                            e('h5', { className: 'text-sm font-medium text-gray-700' }, 'Đánh giá đáp ứng quy định'),
                            e('button', { className: 'btn btn-outline text-xs py-1 px-3' },
                                e('i', { className: 'fas fa-list text-xs mr-1' }), 'Thêm từ danh sách'
                            )
                        ),

                        // Bảng
                        e('div', { className: 'overflow-x-auto' },
                            e('table', { className: 'w-full text-sm' },
                                e('thead', null,
                                    e('tr', { className: 'bg-gray-50 text-left' },
                                        e('th', { className: 'px-3 py-2 text-gray-600 font-medium w-12' }, 'STT'),
                                        e('th', { className: 'px-3 py-2 text-gray-600 font-medium' }, 'Tên văn bản/quy định'),
                                        e('th', { className: 'px-3 py-2 text-gray-600 font-medium w-40' }, 'Ý kiến đánh giá của TĐRR'),
                                        e('th', { className: 'px-3 py-2 text-gray-600 font-medium' }, 'Chi tiết đánh giá')
                                    )
                                ),
                                e('tbody', null,
                                    tdrrQuyDinhData.map((row, idx) =>
                                        e('tr', { key: idx, className: 'border-t border-gray-100' },
                                            e('td', { className: 'px-3 py-2 text-gray-700' }, row.stt),
                                            e('td', { className: 'px-3 py-2 text-gray-700' }, row.tenVanBan),
                                            e('td', { className: 'px-3 py-2' },
                                                e('select', {
                                                    className: 'w-full px-2 py-1 border border-gray-300 rounded text-sm',
                                                    value: row.yKienTDRR,
                                                    onChange: (ev) => {
                                                        const newData = [...tdrrQuyDinhData];
                                                        newData[idx].yKienTDRR = ev.target.value;
                                                        setTdrrQuyDinhData(newData);
                                                    }
                                                },
                                                    e('option', { value: 'Đáp ứng' }, '✓ Đáp ứng'),
                                                    e('option', { value: 'Không đáp ứng' }, '✗ Không đáp ứng')
                                                )
                                            ),
                                            e('td', { className: 'px-3 py-2 text-gray-700' }, row.chiTiet)
                                        )
                                    )
                                )
                            )
                        ),

                        // Footer với nút Thêm thủ công
                        e('div', { className: 'px-4 py-2 border-t border-gray-200 text-center' },
                            e('button', { className: 'text-[#006B68] hover:text-[#005d4b] text-sm font-medium' },
                                e('i', { className: 'fas fa-plus text-xs mr-1' }), 'Thêm thủ công'
                            )
                        )
                    )
                ),

                // ===== GIỚI HẠN TÍN DỤNG NGÀNH =====
                e('div', null,
                    e('div', { className: 'flex items-center justify-between mb-3' },
                        e('label', { className: 'text-sm font-medium text-gray-700' }, 'Giới hạn tín dụng ngành')
                    ),
                    e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                        e('div', { className: 'overflow-x-auto' },
                            e('table', { className: 'w-full text-sm' },
                                e('thead', null,
                                    e('tr', { className: 'bg-gray-50 text-left border-b border-gray-200' },
                                        e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium w-12 border-r border-gray-200' }, 'STT'),
                                        e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium border-r border-gray-200' }, 'Ngành cấp 1'),
                                        e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium border-r border-gray-200' }, 'Ngành cấp 2'),
                                        e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium w-28 border-r border-gray-200 text-center' }, 'Kiểm soát rủi ro'),
                                        e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium border-r border-gray-200' }, 'Giới hạn phê duyệt'),
                                        e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium border-r border-gray-200' }, 'Dư nợ thực hiện'),
                                        e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium border-r border-gray-200' }, 'Ghi chú'),
                                        e('th', { className: 'px-3 py-2.5 text-gray-600 font-medium w-24 text-center' }, 'Tác vụ')
                                    )
                                ),
                                e('tbody', null,
                                    gioiHanNganhList.length === 0
                                        ? e('tr', null,
                                            e('td', { colSpan: 8, className: 'px-3 py-8 text-center text-gray-400' },
                                                'Chưa có dữ liệu. Nhấn "Thêm mới" để thêm giới hạn ngành.'
                                            )
                                        )
                                        : gioiHanNganhList.map((row, idx) =>
                                            e('tr', { key: idx, className: 'border-t border-gray-200 hover:bg-gray-50' },
                                                e('td', { className: 'px-3 py-2.5 text-gray-700 border-r border-gray-200 text-center' }, row.stt),
                                                e('td', { className: 'px-3 py-2.5 text-gray-700 border-r border-gray-200' }, row.nganhCap1),
                                                e('td', { className: 'px-3 py-2.5 text-gray-700 border-r border-gray-200' }, row.nganhCap2),
                                                e('td', { className: 'px-3 py-2.5 border-r border-gray-200 text-center' },
                                                    e('span', {
                                                        className: 'px-2 py-1 rounded text-xs font-medium ' +
                                                            (row.kiemSoatRuiRo === 'Có' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')
                                                    }, row.kiemSoatRuiRo)
                                                ),
                                                e('td', { className: 'px-3 py-2.5 text-gray-700 border-r border-gray-200' }, row.hanMucPheDuyet),
                                                e('td', { className: 'px-3 py-2.5 text-gray-700 border-r border-gray-200' }, row.duNoThucHien),
                                                e('td', { className: 'px-3 py-2.5 text-gray-700 border-r border-gray-200' }, row.ghiChu),
                                                e('td', { className: 'px-3 py-2.5 text-center' },
                                                    e('div', { className: 'flex items-center justify-center gap-2' },
                                                        // Edit button
                                                        e('button', {
                                                            className: 'w-8 h-8 rounded-full bg-[#e6f4f1] text-[#006B68] hover:bg-[#006B68] hover:text-white transition-colors flex items-center justify-center',
                                                            title: 'Chỉnh sửa',
                                                            onClick: () => {
                                                                setEditingNganh({ ...row });
                                                                setEditingNganhIndex(idx);
                                                                setIsAddingNganh(false);
                                                                setShowNganhModal(true);
                                                            }
                                                        },
                                                            e('i', { className: 'fas fa-pen text-xs' })
                                                        ),
                                                        // Delete button
                                                        e('button', {
                                                            className: 'w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center',
                                                            title: 'Xóa',
                                                            onClick: () => handleDeleteNganh(idx)
                                                        },
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

            )
        );
    };

    // ==================
    // MAIN LAYOUT
    // ==================
    return e('div', { className: 'credit-tab space-y-5' },
        // Khối Ý kiến đề xuất (Readonly)
        renderDeXuatSection(),

        // Khối Ý kiến thẩm định rủi ro
        renderTDRRSection(),

        // ===== VALIDATION PROGRESS SUMMARY =====
        e('div', { className: 'bg-white border border-gray-200 rounded-lg p-5' },
            // Progress summary
            e('div', { className: 'flex items-center justify-between mb-4' },
                e('div', { className: 'flex items-center gap-3' },
                    e('h3', { className: 'font-semibold text-gray-800' }, 'Trạng thái hoàn thành'),
                    e('span', { className: 'text-sm text-gray-500' },
                        Object.values(sectionDone).filter(function(v) { return v; }).length + '/' + Object.keys(sectionDone).length + ' mục đã hoàn thành'
                    )
                ),
                // Progress bar
                e('div', { className: 'w-48 h-2 bg-gray-200 rounded-full overflow-hidden' },
                    e('div', {
                        className: 'h-full bg-[#006B68] rounded-full transition-all duration-500',
                        style: { width: (Object.values(sectionDone).filter(function(v) { return v; }).length / Object.keys(sectionDone).length * 100) + '%' }
                    })
                )
            ),
            // Section detail badges
            e('div', { className: 'flex flex-wrap gap-2' },
                e('span', { className: 'inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ' + (sectionDone.ruiRo ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500') },
                    e('i', { className: 'fas ' + (sectionDone.ruiRo ? 'fa-check-circle' : 'fa-circle') + ' text-[10px]' }),
                    'Đánh giá rủi ro'
                ),
                e('span', { className: 'inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ' + (sectionDone.tuanThu ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500') },
                    e('i', { className: 'fas ' + (sectionDone.tuanThu ? 'fa-check-circle' : 'fa-circle') + ' text-[10px]' }),
                    'Tuân thủ quy định'
                ),
                e('span', { className: 'inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ' + (sectionDone.yKienTDRR ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500') },
                    e('i', { className: 'fas ' + (sectionDone.yKienTDRR ? 'fa-check-circle' : 'fa-circle') + ' text-[10px]' }),
                    'Ý kiến TĐRR'
                ),
                e('span', { className: 'inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ' + (sectionDone.qlrrTapTrung ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500') },
                    e('i', { className: 'fas ' + (sectionDone.qlrrTapTrung ? 'fa-check-circle' : 'fa-circle') + ' text-[10px]' }),
                    'QLRR tập trung'
                ),
                e('span', { className: 'inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ' + (sectionDone.gioiHanNganh ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500') },
                    e('i', { className: 'fas ' + (sectionDone.gioiHanNganh ? 'fa-check-circle' : 'fa-circle') + ' text-[10px]' }),
                    'Giới hạn ngành'
                )
            )
        ),

        // ===== MODAL CHỈNH SỬA RỦI RO =====
        showEditModal && editingRuiRo && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-lg shadow-xl w-[600px] max-h-[90vh] overflow-hidden' },
                // Header
                e('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-gray-200' },
                    e('div', null,
                        e('h3', { className: 'text-lg font-semibold text-gray-800' }, isAddingNew ? 'Thêm đánh giá rủi ro' : 'Sửa đánh giá rủi ro'),
                        e('p', { className: 'text-sm text-gray-500 mt-0.5' }, isAddingNew ? 'Thêm mới đánh giá rủi ro và biện pháp phòng ngừa' : 'Cập nhật thông tin đánh giá rủi ro')
                    ),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: handleCancelEdit
                    },
                        e('i', { className: 'fas fa-times text-lg' })
                    )
                ),
                // Body
                e('div', { className: 'p-6 space-y-4 max-h-[60vh] overflow-y-auto' },
                    // Loại rủi ro
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Loại rủi ro ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('select', {
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            value: editingRuiRo.loaiRuiRo,
                            onChange: (ev) => handleSelectLoaiRuiRo(ev.target.value)
                        },
                            e('option', { value: '' }, 'Chọn loại rủi ro...'),
                            loaiRuiRoOptions.map((opt, idx) =>
                                e('option', { key: idx, value: opt }, opt)
                            )
                        )
                    ),
                    // Rủi ro cụ thể
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Rủi ro cụ thể ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('textarea', {
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30 resize-none',
                            rows: 2,
                            placeholder: 'Nhập rủi ro cụ thể...',
                            value: editingRuiRo.ruiRoCuThe,
                            onChange: (ev) => setEditingRuiRo({ ...editingRuiRo, ruiRoCuThe: ev.target.value })
                        })
                    ),
                    // Biện pháp phòng ngừa của khách hàng
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Biện pháp phòng ngừa của khách hàng ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('textarea', {
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30 resize-none',
                            rows: 3,
                            placeholder: 'Nhập biện pháp phòng ngừa của khách hàng...',
                            value: editingRuiRo.bienPhapKH,
                            onChange: (ev) => setEditingRuiRo({ ...editingRuiRo, bienPhapKH: ev.target.value })
                        })
                    ),
                    // Biện pháp phòng ngừa của ngân hàng
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Biện pháp phòng ngừa của ngân hàng ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('textarea', {
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30 resize-none',
                            rows: 3,
                            placeholder: 'Nhập biện pháp phòng ngừa của ngân hàng...',
                            value: editingRuiRo.bienPhapNH,
                            onChange: (ev) => setEditingRuiRo({ ...editingRuiRo, bienPhapNH: ev.target.value })
                        })
                    )
                ),
                // Footer
                e('div', { className: 'flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50' },
                    e('button', {
                        className: 'px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100',
                        onClick: handleCancelEdit
                    }, 'Hủy'),
                    e('button', {
                        className: 'px-5 py-2 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005a57]',
                        onClick: handleSaveRuiRo
                    }, isAddingNew ? 'Thêm' : 'Cập nhật')
                )
            )
        ),

        // ===== MODAL CHỌN VĂN BẢN QUY ĐỊNH =====
        showVanBanModal && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-lg shadow-xl w-[600px] max-h-[80vh] overflow-hidden' },
                // Header
                e('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-gray-200' },
                    e('div', null,
                        e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Chọn văn bản quy định'),
                        e('p', { className: 'text-sm text-gray-500 mt-0.5' }, 'Tìm kiếm và chọn văn bản quy định từ danh sách có sẵn')
                    ),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: () => { setShowVanBanModal(false); setSelectedVanBan([]); setSearchVanBan(''); }
                    },
                        e('i', { className: 'fas fa-times text-lg' })
                    )
                ),
                // Body
                e('div', { className: 'p-6' },
                    // Search
                    e('div', { className: 'relative mb-4' },
                        e('i', { className: 'fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' }),
                        e('input', {
                            type: 'text',
                            placeholder: 'Tìm kiếm theo số quy định, tên quy định, ngày ban hành hoặc...',
                            className: 'w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            value: searchVanBan,
                            onChange: (ev) => setSearchVanBan(ev.target.value)
                        })
                    ),
                    // Count
                    e('p', { className: 'text-sm text-gray-500 mb-3' }, 'Hiển thị ' + filteredVanBan.length + ' văn bản'),
                    // List
                    e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden max-h-[350px] overflow-y-auto' },
                        e('table', { className: 'w-full text-sm' },
                            e('thead', null,
                                e('tr', { className: 'bg-gray-50 sticky top-0' },
                                    e('th', { className: 'px-3 py-2 text-left w-10' }),
                                    e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium' }, 'Số quy định'),
                                    e('th', { className: 'px-3 py-2 text-left text-gray-600 font-medium' }, 'Tên quy định')
                                )
                            ),
                            e('tbody', null,
                                filteredVanBan.map((vb, idx) =>
                                    e('tr', {
                                        key: idx,
                                        className: 'border-t border-gray-200 hover:bg-gray-50 cursor-pointer' + (selectedVanBan.includes(vb.soQuyDinh) ? ' bg-[#e6f4f1]' : ''),
                                        onClick: () => handleToggleVanBan(vb.soQuyDinh)
                                    },
                                        e('td', { className: 'px-3 py-2' },
                                            e('input', {
                                                type: 'checkbox',
                                                className: 'w-4 h-4 accent-[#006B68]',
                                                checked: selectedVanBan.includes(vb.soQuyDinh),
                                                onChange: () => handleToggleVanBan(vb.soQuyDinh)
                                            })
                                        ),
                                        e('td', { className: 'px-3 py-2 text-gray-700 font-medium' }, vb.soQuyDinh),
                                        e('td', { className: 'px-3 py-2 text-gray-600' }, vb.tenQuyDinh)
                                    )
                                )
                            )
                        )
                    )
                ),
                // Footer
                e('div', { className: 'flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50' },
                    e('button', {
                        className: 'px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100',
                        onClick: () => { setShowVanBanModal(false); setSelectedVanBan([]); setSearchVanBan(''); }
                    }, 'Hủy'),
                    e('button', {
                        className: 'px-5 py-2 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005a57]' + (selectedVanBan.length === 0 ? ' opacity-50 cursor-not-allowed' : ''),
                        onClick: handleAddVanBanFromList,
                        disabled: selectedVanBan.length === 0
                    }, 'Thêm')
                )
            )
        ),

        // ===== MODAL THÊM/SỬA HẠN MỨC NGÀNH =====
        showNganhModal && editingNganh && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-lg shadow-xl w-[550px] max-h-[90vh] overflow-hidden' },
                // Header
                e('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-gray-200' },
                    e('div', null,
                        e('h3', { className: 'text-lg font-semibold text-gray-800' }, isAddingNganh ? 'Thêm hạn mức ngành' : 'Sửa hạn mức ngành'),
                        e('p', { className: 'text-sm text-gray-500 mt-0.5' }, isAddingNganh ? 'Thêm mới hạn mức ngành cần đánh giá' : 'Cập nhật thông tin hạn mức ngành')
                    ),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: handleCancelNganh
                    },
                        e('i', { className: 'fas fa-times text-lg' })
                    )
                ),
                // Body
                e('div', { className: 'p-6 space-y-4 max-h-[60vh] overflow-y-auto' },
                    // Nguồn mã ngành
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Nguồn mã ngành ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('select', {
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            value: editingNganh.nguonMaNganh,
                            onChange: (ev) => handleSelectNguonMaNganh(ev.target.value)
                        },
                            e('option', { value: '' }, 'Chọn nguồn mã ngành'),
                            e('optgroup', { label: 'Mã ngành theo Core' },
                                e('option', { value: 'Ngành kinh tế theo core' }, 'Ngành kinh tế theo core')
                            ),
                            e('optgroup', { label: 'Mã ngành theo Commitment' },
                                maNganhCommitment.map((m, idx) =>
                                    e('option', { key: idx, value: m.nguonMaNganh }, m.nguonMaNganh)
                                )
                            )
                        ),
                        // Warning message
                        e('p', { className: 'text-xs text-orange-600 mt-1' },
                            'Chưa có commitment. Vui lòng thêm tại tab "Cấp tín dụng" > "Khoản tín dụng"'
                        )
                    ),
                    // Ngành cấp 1
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Ngành cấp 1 ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('input', {
                            type: 'text',
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30 bg-gray-50',
                            placeholder: 'Nhập ngành cấp 1...',
                            value: editingNganh.nganhCap1,
                            onChange: (ev) => setEditingNganh({ ...editingNganh, nganhCap1: ev.target.value }),
                            readOnly: !!editingNganh.nguonMaNganh
                        })
                    ),
                    // Ngành cấp 2
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Ngành cấp 2 ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('input', {
                            type: 'text',
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30 bg-gray-50',
                            placeholder: 'Nhập ngành cấp 2...',
                            value: editingNganh.nganhCap2,
                            onChange: (ev) => setEditingNganh({ ...editingNganh, nganhCap2: ev.target.value }),
                            readOnly: !!editingNganh.nguonMaNganh
                        })
                    ),
                    // Kiểm soát rủi ro
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Kiểm soát rủi ro ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('select', {
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30 bg-gray-50',
                            value: editingNganh.kiemSoatRuiRo,
                            onChange: (ev) => setEditingNganh({ ...editingNganh, kiemSoatRuiRo: ev.target.value }),
                            disabled: !!editingNganh.nguonMaNganh
                        },
                            e('option', { value: 'Có' }, 'Có'),
                            e('option', { value: 'Không' }, 'Không')
                        ),
                        editingNganh.nguonMaNganh && e('p', { className: 'text-xs text-gray-500 mt-1' }, 'Tự động điền từ nguồn mã ngành')
                    ),
                    // Hạn mức được phê duyệt
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Hạn mức được phê duyệt ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('input', {
                            type: 'text',
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30 bg-gray-50',
                            placeholder: 'Nhập hạn mức được phê duyệt...',
                            value: editingNganh.hanMucPheDuyet,
                            onChange: (ev) => setEditingNganh({ ...editingNganh, hanMucPheDuyet: ev.target.value }),
                            readOnly: !!editingNganh.nguonMaNganh
                        })
                    ),
                    // Số dư thực tế
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Số dư thực tế ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('input', {
                            type: 'text',
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30 bg-gray-50',
                            placeholder: 'Nhập số dư thực tế...',
                            value: editingNganh.duNoThucHien,
                            onChange: (ev) => setEditingNganh({ ...editingNganh, duNoThucHien: ev.target.value }),
                            readOnly: !!editingNganh.nguonMaNganh
                        })
                    ),
                    // Ghi chú
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ghi chú'),
                        e('input', {
                            type: 'text',
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            placeholder: 'Nhập ghi chú...',
                            value: editingNganh.ghiChu || '',
                            onChange: (ev) => setEditingNganh({ ...editingNganh, ghiChu: ev.target.value })
                        })
                    )
                ),
                // Footer
                e('div', { className: 'flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50' },
                    e('button', {
                        className: 'px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100',
                        onClick: handleCancelNganh
                    }, 'Hủy'),
                    e('button', {
                        className: 'px-5 py-2 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005a57]',
                        onClick: handleSaveNganh
                    }, isAddingNganh ? 'Thêm' : 'Cập nhật')
                )
            )
        )
    );
};
