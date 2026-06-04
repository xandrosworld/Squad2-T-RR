// =====================================================
// Tab: Tài sản đảm bảo
// =====================================================

window.TabTaiSanDamBao = function () {
    const e = React.createElement;

    // State cho section TĐRR
    const [danhGiaYKien, setDanhGiaYKien] = React.useState('day-du');
    const [boSungYKien, setBoSungYKien] = React.useState('');

    // State cho Đề xuất chính sách bảo đảm theo ý kiến TĐRR
    const [mucTyLeGTCG, setMucTyLeGTCG] = React.useState('100');
    const [heSoToiThieu, setHeSoToiThieu] = React.useState('0.7');
    const [chinhSachData, setChinhSachData] = React.useState([
        { stt: '1', idCommitment: 'HD-001', tenCommitment: 'Hạn mức vốn lưu động', tyLeBaoDam: '50', mocThoiGian: [], hienThi: false, isChild: false },
        { stt: '1.1', idCommitment: 'KV-001-001', tenCommitment: 'Khoản vay vốn lưu động ngắn hạn', tyLeBaoDam: '80', mocThoiGian: [{ ngay: '2027-01-01', tyLe: '100' }], hienThi: true, isChild: true },
        { stt: '1.2', idCommitment: 'KV-001-002', tenCommitment: 'Khoản vay vốn lưu động dài hạn', tyLeBaoDam: '80', mocThoiGian: [], hienThi: false, isChild: true }
    ]);

    // Functions để update chính sách
    const updateChinhSach = (idx, field, value) => {
        const newData = [...chinhSachData];
        newData[idx][field] = value;
        setChinhSachData(newData);
    };

    const addMocThoiGian = (idx, ngay, tyLe) => {
        const newData = [...chinhSachData];
        newData[idx].mocThoiGian.push({ ngay, tyLe });
        setChinhSachData(newData);
    };

    const removeMocThoiGian = (idx, mocIdx) => {
        const newData = [...chinhSachData];
        newData[idx].mocThoiGian.splice(mocIdx, 1);
        setChinhSachData(newData);
    };

    // State cho chọn TSBD và cảnh báo
    const [selectedTSBD, setSelectedTSBD] = React.useState([]);
    const [warningMessage, setWarningMessage] = React.useState('');
    const [searchTSBD, setSearchTSBD] = React.useState('');

    // State cho collapse/expand các nhóm TSDB cấp 1
    const [expandedGroups, setExpandedGroups] = React.useState(['batDongSan', 'dongSan', 'giayToCoGia']);

    // Toggle expand/collapse group
    const toggleGroup = (groupId) => {
        if (expandedGroups.includes(groupId)) {
            setExpandedGroups(expandedGroups.filter(g => g !== groupId));
        } else {
            setExpandedGroups([...expandedGroups, groupId]);
        }
    };

    // State cho modal Giải chấp
    const [showGiaiChapModal, setShowGiaiChapModal] = React.useState(false);
    const [lyDoGiaiChap, setLyDoGiaiChap] = React.useState('');
    const [moTaChiTiet, setMoTaChiTiet] = React.useState('');

    // State cho modal Thêm mới TSDB
    const [showThemMoiModal, setShowThemMoiModal] = React.useState(false);
    const [showTimKiemModal, setShowTimKiemModal] = React.useState(false);
    const [showTaoMoiScreen, setShowTaoMoiScreen] = React.useState(false);

    // State cho tìm kiếm TSDB
    const [timKiemLoai, setTimKiemLoai] = React.useState('ID tài sản bảo đảm');
    const [timKiemValue, setTimKiemValue] = React.useState('');
    const [ketQuaTimKiem, setKetQuaTimKiem] = React.useState([]);

    // State cho Tạo mới TSBD
    const [taoMoiActiveTab, setTaoMoiActiveTab] = React.useState('ben-bao-dam');
    const [taoMoiData, setTaoMoiData] = React.useState({
        loaiTSBD1: 'Bất động sản',
        loaiTSBD2: 'Căn hộ chung cư/ Officetel',
        loaiTSBD3: 'Toà',
        loaiTSBD4: 'Tầng',
        khoLuuHoSo: '',
        danhSachKhoQuyNoiBo: '',
        tenTSBD: '',
        moTaTaiSan: '',
        taiSanLienHop: false,
        // Bên bảo đảm
        chinhLaKhachHangVay: false,
        cifBenBaoDam: '',
        // Chi tiết tài sản
        soGCN: 'CH00123456',
        ngayCapGCN: '',
        soToThua: '123/456',
        soVaoSoCapGCN: '',
        donViCapSo: '',
        dienTichDat: '',
        dienTichDatUnit: 'm²',
        dienTichXayDung: '80',
        tinhTrangPhapLy: 'Đã có GCN',
        ngayHetHan: '',
        ngayMua: '',
        loaiHinhSoHuu: 'Sở hữu công',
        loaiHinhSuDung: '',
        mucDichSuDung: '',
        nguonGocDat: '',
        soHopDongChoThue: '',
        duKienGiaTriThiTruong: '',
        duKienGiaTriUnit: 'VND'
    });

    // State cho khối Đánh giá đáp ứng theo TSDB hiện có
    const [giaTriQuyDoiType, setGiaTriQuyDoiType] = React.useState('tu-dong'); // 'tu-dong' or 'tu-nhap'
    const [giaTriTuNhap, setGiaTriTuNhap] = React.useState('112345');
    const [lyDoTuNhap, setLyDoTuNhap] = React.useState('');

    // State cho TSDB dự kiến
    const [tsbdDuKienList, setTsbdDuKienList] = React.useState([
        { id: 1, tenTSDB: 'Nhà ở tại Q.7, TP.HCM', loaiCap1: 'Bất động sản', moTa: 'Căn hộ chung cư cao cấp, 85m2', giaTri: 3500, ghiChu: 'Dự kiến hoàn thành giấy tờ trong Q1/2025' },
        { id: 2, tenTSDB: 'Xe ô tô Toyota Camry', loaiCap1: 'Động sản', moTa: 'Xe mới mua năm 2024', giaTri: 1200, ghiChu: '' }
    ]);

    // State cho modal thêm mới TSDB dự kiến
    const [showThemMoiTSDBDuKienModal, setShowThemMoiTSDBDuKienModal] = React.useState(false);
    const [newTSDBDuKien, setNewTSDBDuKien] = React.useState({
        tenTSDB: '',
        loaiCap1: '',
        moTa: '',
        giaTri: '',
        ghiChu: ''
    });

    // State cho modal chỉnh sửa TSDB dự kiến
    const [showEditTSDBDuKienModal, setShowEditTSDBDuKienModal] = React.useState(false);
    const [editTSDBDuKien, setEditTSDBDuKien] = React.useState(null);
    const [editTSDBDuKienData, setEditTSDBDuKienData] = React.useState({
        tenTSDB: '',
        loaiCap1: '',
        moTa: '',
        giaTri: '',
        ghiChu: '',
        deXuat: 'Thêm mới'
    });

    // Handler mở modal chỉnh sửa TSDB dự kiến
    const handleOpenEditTSDBDuKien = (item) => {
        setEditTSDBDuKien(item);
        setEditTSDBDuKienData({
            tenTSDB: item.tenTSDB,
            loaiCap1: item.loaiCap1,
            moTa: item.moTa || '',
            giaTri: item.giaTri.toString(),
            ghiChu: item.ghiChu || '',
            deXuat: 'Thêm mới'
        });
        setShowEditTSDBDuKienModal(true);
    };

    // Handler cập nhật TSDB dự kiến
    const handleUpdateTSDBDuKien = () => {
        if (!editTSDBDuKienData.tenTSDB || !editTSDBDuKienData.loaiCap1 || !editTSDBDuKienData.giaTri) {
            return;
        }
        const updatedList = tsbdDuKienList.map(item => {
            if (item.id === editTSDBDuKien.id) {
                return {
                    ...item,
                    tenTSDB: editTSDBDuKienData.tenTSDB,
                    loaiCap1: editTSDBDuKienData.loaiCap1,
                    moTa: editTSDBDuKienData.moTa,
                    giaTri: parseInt(editTSDBDuKienData.giaTri) || 0,
                    ghiChu: editTSDBDuKienData.ghiChu
                };
            }
            return item;
        });
        setTsbdDuKienList(updatedList);
        setShowEditTSDBDuKienModal(false);
        setEditTSDBDuKien(null);
    };

    // State cho Ý kiến thẩm định rủi ro
    const [yKienTSBD, setYKienTSBD] = React.useState('y-kien-khac');
    const [yKienBoSung, setYKienBoSung] = React.useState('');

    // State cho Thiết lập chính sách TSDB
    const [policyOption1, setPolicyOption1] = React.useState(false); // Mức tỷ lệ GTCG
    const [policyOption2, setPolicyOption2] = React.useState(false); // Hệ số tối thiểu
    const [policyOption3, setPolicyOption3] = React.useState(false); // Bảng TSDB theo commitment
    const [policyOption4, setPolicyOption4] = React.useState(false); // Theo chi tiết điều khoản

    const [mucTyLeGTCGPolicy, setMucTyLeGTCGPolicy] = React.useState('');
    const [heSoToiThieuPolicy, setHeSoToiThieuPolicy] = React.useState('');

    // State cho bảng commitment
    const [commitmentList, setCommitmentList] = React.useState([
        { id: 'HD-001', stt: '1', ten: 'Hạn mức vốn lưu động', tyLe: '80', hienThi: true, tuyChinh: null },
        { id: 'KV-001-001', stt: '1.1', ten: 'Khoản vay vốn lưu động ngắn hạn', tyLe: '80', hienThi: true, tuyChinh: null },
        { id: 'KV-001-002', stt: '1.2', ten: 'Khoản vay vốn lưu động dài hạn', tyLe: '80', hienThi: true, tuyChinh: null }
    ]);

    // State cho modal tùy chỉnh thời gian/số dư
    const [showTuyChinhModal, setShowTuyChinhModal] = React.useState(false);
    const [selectedCommitmentForTuyChinh, setSelectedCommitmentForTuyChinh] = React.useState(null);
    const [tuyChinhType, setTuyChinhType] = React.useState('thoi-gian'); // 'thoi-gian' or 'so-du'
    const [tuyChinhMocList, setTuyChinhMocList] = React.useState([{ ngay: '', tyLe: '', soDu: '' }]);

    // Lấy thông tin selected items để hiển thị
    const getSelectedItems = () => {
        const allItems = [...tsbdData.batDongSan, ...tsbdData.dongSan, ...tsbdData.giayToCoGia];
        return allItems.filter(item => selectedTSBD.includes(item.ma));
    };

    // Handler khi tick chọn TSBD
    const handleSelectTSBD = (item) => {
        if (item.trangThai !== 'Hiệu lực') {
            setWarningMessage("Chỉ có thể giải chấp các tài sản có trạng thái 'Hiệu lực'");
            setTimeout(() => setWarningMessage(''), 3000);
            return;
        }

        if (selectedTSBD.includes(item.ma)) {
            setSelectedTSBD(selectedTSBD.filter(ma => ma !== item.ma));
        } else {
            setSelectedTSBD([...selectedTSBD, item.ma]);
        }
    };

    // Handler chọn tất cả (chỉ chọn các tài sản Hiệu lực)
    const handleSelectAll = () => {
        const allValidItems = [
            ...tsbdData.batDongSan.filter(item => item.trangThai === 'Hiệu lực'),
            ...tsbdData.dongSan.filter(item => item.trangThai === 'Hiệu lực'),
            ...tsbdData.giayToCoGia.filter(item => item.trangThai === 'Hiệu lực')
        ];
        const allMa = allValidItems.map(item => item.ma);

        if (selectedTSBD.length === allMa.length) {
            setSelectedTSBD([]);
        } else {
            setSelectedTSBD(allMa);
        }
    };

    // Handler xác nhận giải chấp
    const handleXacNhanGiaiChap = () => {
        if (!lyDoGiaiChap) return;
        // Logic xử lý giải chấp
        alert('Đã xác nhận giải chấp ' + selectedTSBD.length + ' tài sản!');
        setShowGiaiChapModal(false);
        setSelectedTSBD([]);
        setLyDoGiaiChap('');
        setMoTaChiTiet('');
    };

    // Handler mở modal giải chấp
    const handleOpenGiaiChapModal = () => {
        if (selectedTSBD.length === 0) {
            setWarningMessage('Vui lòng chọn ít nhất 1 tài sản để giải chấp');
            setTimeout(() => setWarningMessage(''), 3000);
            return;
        }
        setShowGiaiChapModal(true);
    };

    // Handler tìm kiếm TSDB
    const handleTimKiem = () => {
        // Simulate search - empty results for now
        setKetQuaTimKiem([]);
    };

    // Handler click vào mã TSDB để xem chi tiết
    const handleClickMaTSBD = (item) => {
        setTaoMoiData({
            ...taoMoiData,
            tenTSBD: item.ten,
            moTaTaiSan: item.moTa
        });
        setShowTaoMoiScreen(true);
    };

    // Sample data cho bảng TSBĐ hiện có
    const tsbdData = {
        batDongSan: [
            { ma: 'BDS-2024-001', ten: 'Nhà xưởng số 123 đường Nguyễn Văn..', moTa: 'Nhà xưởng 3 tầng, d...', giaNhan: 180000, heSo: '70%', giaTriSauHS: 126000, giaTriPhanBo: 126000, phamVi: ['HD-001', 'HD-002'], trangThai: 'Hiệu lực' },
            { ma: 'BDS-2024-002', ten: 'Quyền sử dụng đất tại phường 2, quậ...', moTa: 'Đất thổ cư 200m2, s...', giaNhan: 120000, heSo: '65%', giaTriSauHS: 78000, giaTriPhanBo: 78000, phamVi: ['HD-001'], trangThai: 'Hiệu lực' },
            { ma: 'BDS-2025-001', ten: 'Kho hàng dự kiến tại KCN Tân Thuận', moTa: 'Kho hàng mới xây d...', giaNhan: 95000, heSo: '70%', giaTriSauHS: 66500, giaTriPhanBo: 46550, phamVi: [], trangThai: 'Đề xuất' }
        ],
        dongSan: [
            { ma: 'DS-2024-001', ten: 'Máy móc thiết bị dây chuyền sản xuấ...', moTa: 'Dây chuyền sản xuấ...', giaNhan: 80000, heSo: '50%', giaTriSauHS: 40000, giaTriPhanBo: 32000, phamVi: ['HD-003'], trangThai: 'Hiệu lực' },
            { ma: 'DS-2024-002', ten: 'Xe tải Mercedes-Benz Actros 2019', moTa: 'Xe đầu kéo containe...', giaNhan: 45000, heSo: '60%', giaTriSauHS: 27000, giaTriPhanBo: 24300, phamVi: ['HD-001', 'HD-003'], trangThai: 'Hiệu lực' },
            { ma: 'DS-2024-003', ten: 'Máy móc thiết bị dây chuyền sản xuấ...', moTa: 'Dây chuyền sản xuấ...', giaNhan: 65000, heSo: '50%', giaTriSauHS: 32500, giaTriPhanBo: 26000, phamVi: ['HD-001', 'HD-004'], trangThai: 'Hiệu lực' }
        ],
        giayToCoGia: [
            { ma: 'GTO-2024-001', ten: 'Sổ tiết kiệm Vietcombank kỳ hạn 12 t...', moTa: 'STK số 0123456789...', giaNhan: 50000, heSo: '90%', giaTriSauHS: 45000, giaTriPhanBo: 36000, phamVi: ['HD-002'], trangThai: 'Hiệu lực' }
        ]
    };

    // Tính tổng
    const tongBDS = tsbdData.batDongSan.reduce((sum, item) => sum + item.giaNhan, 0);
    const tongDS = tsbdData.dongSan.reduce((sum, item) => sum + item.giaNhan, 0);
    const tongGTCG = tsbdData.giayToCoGia.reduce((sum, item) => sum + item.giaNhan, 0);
    const tongCong = tongBDS + tongDS + tongGTCG;

    // Render row for TSBĐ table
    const renderTSBDRow = (item, idx, isGroup = false) => {
        if (isGroup) {
            return e('tr', { key: 'group-' + idx, className: 'bg-gray-50 font-medium' },
                e('td', { className: 'px-3 py-2 text-gray-700', colSpan: 2 }, item.ten),
                e('td', { className: 'px-3 py-2 text-right text-gray-700' }, item.giaNhan.toLocaleString()),
                e('td', { className: 'px-3 py-2' }),
                e('td', { className: 'px-3 py-2 text-right text-gray-700' }, item.giaTriSauHS.toLocaleString()),
                e('td', { className: 'px-3 py-2 text-right text-gray-700' }, item.giaTriPhanBo.toLocaleString()),
                e('td', { className: 'px-3 py-2' }),
                e('td', { className: 'px-3 py-2' }),
                e('td', { className: 'px-3 py-2' }),
                e('td', { className: 'px-3 py-2' })
            );
        }
        return e('tr', { key: item.ma, className: 'border-t border-gray-100 hover:bg-gray-50' },
            e('td', { className: 'px-3 py-2' },
                e('div', null,
                    e('div', {
                        className: 'text-[#006B68] font-medium text-xs cursor-pointer hover:underline',
                        onClick: () => handleClickMaTSBD(item)
                    }, item.ma),
                    e('div', { className: 'text-gray-700 text-sm' }, item.ten)
                )
            ),
            e('td', { className: 'px-3 py-2 text-gray-600 text-sm' }, item.moTa),
            e('td', { className: 'px-3 py-2 text-right text-gray-700' }, item.giaNhan.toLocaleString()),
            e('td', { className: 'px-3 py-2 text-center text-gray-700' }, item.heSo),
            e('td', { className: 'px-3 py-2 text-right text-gray-700' }, item.giaTriSauHS.toLocaleString()),
            e('td', { className: 'px-3 py-2 text-right text-gray-700' }, item.giaTriPhanBo.toLocaleString()),
            e('td', { className: 'px-3 py-2' },
                e('div', { className: 'flex flex-wrap gap-1' },
                    item.phamVi.map((pv, i) =>
                        e('span', { key: i, className: 'bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs' }, pv)
                    )
                )
            ),
            e('td', { className: 'px-3 py-2' },
                e('span', {
                    className: 'px-2 py-0.5 rounded text-xs ' +
                        (item.trangThai === 'Hiệu lực' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')
                }, item.trangThai)
            ),
            // Cột đề xuất
            e('td', { className: 'px-3 py-2 text-center' },
                item.trangThai === 'Đề xuất' && e('span', { className: 'text-xs text-orange-600' }, 'Đề xuất')
            ),
            // Cột Action
            e('td', { className: 'px-3 py-2 text-center' },
                e('span', {
                    className: 'text-[#006B68] text-xs cursor-pointer hover:underline font-medium',
                    onClick: () => handleClickMaTSBD(item)
                }, 'Xem'),
                e('span', { className: 'text-gray-400 mx-1' }, '/'),
                e('span', {
                    className: 'text-[#006B68] text-xs cursor-pointer hover:underline font-medium',
                    onClick: () => handleClickMaTSBD(item)
                }, 'Chỉnh sửa')
            )
        );
    };

    return e('div', { className: 'credit-tab space-y-5' },
        // ===== SECTION: TÀI SẢN ĐẢM BẢO =====
        e('div', { className: 'content-card' },
            e('div', { className: 'p-6 space-y-6' },
                // ===== Khối: Danh sách TSĐB =====
                e('div', null,
                    e('h3', { className: 'text-base font-bold text-[#006B68] mb-4 flex items-center gap-2' },
                        e('i', { className: 'fas fa-list text-sm' }),
                        'Danh sách TSĐB hiện tại và TSĐB đề xuất'
                    ),

                    // Search bar và buttons
                    e('div', { className: 'flex items-center justify-between gap-4 mb-4' },
                        // Search
                        e('div', { className: 'relative flex-1 max-w-md' },
                            e('i', { className: 'fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' }),
                            e('input', {
                                type: 'text',
                                className: 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                placeholder: 'Tìm kiếm theo tên hoặc mã TSDB...',
                                value: searchTSBD,
                                onChange: (ev) => setSearchTSBD(ev.target.value)
                            })
                        )
                    ),

                    // Warning message
                    warningMessage && e('div', { className: 'flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 mb-4' },
                        e('i', { className: 'fas fa-exclamation-circle text-gray-600' }),
                        e('span', { className: 'text-sm text-gray-700' }, warningMessage)
                    ),

                    // Bảng TSĐB
                    e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                        e('div', { className: 'overflow-x-auto' },
                            e('table', { className: 'w-full text-sm', style: { minWidth: '1200px' } },
                                e('thead', null,
                                    e('tr', { className: 'bg-[#006B68] text-white' },
                                        e('th', { className: 'px-3 py-2 text-left font-medium w-56' }, 'MÃ & TÊN TSDB'),
                                        e('th', { className: 'px-3 py-2 text-left font-medium w-40' }, 'MÔ TẢ'),
                                        e('th', { className: 'px-3 py-2 text-center font-medium w-28' }, 'GIÁ TRỊ NHẬN TSDB', e('br'), '(triệu VND)'),
                                        e('th', { className: 'px-3 py-2 text-center font-medium w-16' }, 'HỆ', e('br'), 'SỐ'),
                                        e('th', { className: 'px-3 py-2 text-center font-medium w-28' }, 'GIÁ TRỊ SAU HỆ SỐ', e('br'), '(triệu VND)'),
                                        e('th', { className: 'px-3 py-2 text-center font-medium w-28' }, 'GIÁ TRỊ PHÂN BỔ', e('br'), '(triệu VND)'),
                                        e('th', { className: 'px-3 py-2 text-center font-medium w-28' }, 'PHẠM VI', e('br'), 'BẢO ĐẢM'),
                                        e('th', { className: 'px-3 py-2 text-center font-medium w-20' }, 'TRẠNG', e('br'), 'THÁI'),
                                        e('th', { className: 'px-3 py-2 text-center font-medium w-20' }, 'ĐỀ XUẤT'),
                                        e('th', { className: 'px-3 py-2 text-center font-medium w-28' }, 'ACTION')
                                    )
                                ),
                                e('tbody', null,
                                    // Tổng cộng toàn bảng
                                    e('tr', { className: 'bg-gray-100 font-bold' },
                                        e('td', { className: 'px-3 py-2 text-gray-800', colSpan: 2 }, 'TỔNG CỘNG TOÀN BẢNG:'),
                                        e('td', { className: 'px-3 py-2 text-right text-gray-800' }, '635,000'),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2 text-right text-gray-800' }, '415,000'),
                                        e('td', { className: 'px-3 py-2 text-right text-gray-800' }, '368,850'),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2' })
                                    ),
                                    // Bất động sản - Header có thể collapse
                                    e('tr', {
                                        className: 'bg-gray-50 font-semibold cursor-pointer hover:bg-gray-100 transition-colors',
                                        onClick: () => toggleGroup('batDongSan')
                                    },
                                        e('td', { className: 'px-3 py-2 text-gray-700', colSpan: 2 },
                                            e('div', { className: 'flex items-center gap-2' },
                                                e('i', { className: 'fas fa-chevron-' + (expandedGroups.includes('batDongSan') ? 'down' : 'right') + ' text-xs text-gray-500 w-3' }),
                                                e('span', null, 'Loại TSĐB cấp 1: Bất động sản')
                                            )
                                        ),
                                        e('td', { className: 'px-3 py-2 text-right text-gray-700' }, '395,000'),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2 text-right text-gray-700' }, '270,500'),
                                        e('td', { className: 'px-3 py-2 text-right text-gray-700' }, '250,550'),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2' })
                                    ),
                                    // Các item con - chỉ hiển thị khi expanded
                                    expandedGroups.includes('batDongSan') && tsbdData.batDongSan.map((item, idx) => renderTSBDRow(item, idx)),
                                    // Động sản - Header có thể collapse
                                    e('tr', {
                                        className: 'bg-gray-50 font-semibold cursor-pointer hover:bg-gray-100 transition-colors',
                                        onClick: () => toggleGroup('dongSan')
                                    },
                                        e('td', { className: 'px-3 py-2 text-gray-700', colSpan: 2 },
                                            e('div', { className: 'flex items-center gap-2' },
                                                e('i', { className: 'fas fa-chevron-' + (expandedGroups.includes('dongSan') ? 'down' : 'right') + ' text-xs text-gray-500 w-3' }),
                                                e('span', null, 'Loại TSĐB cấp 1: Động sản')
                                            )
                                        ),
                                        e('td', { className: 'px-3 py-2 text-right text-gray-700' }, '190,000'),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2 text-right text-gray-700' }, '99,500'),
                                        e('td', { className: 'px-3 py-2 text-right text-gray-700' }, '82,300'),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2' })
                                    ),
                                    // Các item con - chỉ hiển thị khi expanded
                                    expandedGroups.includes('dongSan') && tsbdData.dongSan.map((item, idx) => renderTSBDRow(item, idx)),
                                    // Giấy tờ có giá - Header có thể collapse
                                    e('tr', {
                                        className: 'bg-gray-50 font-semibold cursor-pointer hover:bg-gray-100 transition-colors',
                                        onClick: () => toggleGroup('giayToCoGia')
                                    },
                                        e('td', { className: 'px-3 py-2 text-gray-700', colSpan: 2 },
                                            e('div', { className: 'flex items-center gap-2' },
                                                e('i', { className: 'fas fa-chevron-' + (expandedGroups.includes('giayToCoGia') ? 'down' : 'right') + ' text-xs text-gray-500 w-3' }),
                                                e('span', null, 'Loại TSĐB cấp 1: Giấy tờ có giá')
                                            )
                                        ),
                                        e('td', { className: 'px-3 py-2 text-right text-gray-700' }, '50,000'),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2 text-right text-gray-700' }, '45,000'),
                                        e('td', { className: 'px-3 py-2 text-right text-gray-700' }, '36,000'),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2' }),
                                        e('td', { className: 'px-3 py-2' })
                                    ),
                                    // Các item con - chỉ hiển thị khi expanded
                                    expandedGroups.includes('giayToCoGia') && tsbdData.giayToCoGia.map((item, idx) => renderTSBDRow(item, idx))
                                )
                            )
                        )
                    )
                ),

                // Khối 2: Đánh giá đáp ứng theo tài sản bảo đảm hiện có
                e('div', null,
                    e('h3', { className: 'text-[#006B68] font-semibold mb-4' }, 'Đánh giá đáp ứng theo tài sản bảo đảm hiện có'),
                    e('div', { className: 'space-y-6' },
                        // Tổng giá trị tài sản được phân bổ đã nhân hệ số
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Tổng giá trị tài sản được phân bổ đã nhân hệ số'),
                            e('div', { className: 'flex items-center gap-3' },
                                e('input', {
                                    type: 'text',
                                    className: 'flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#1e88e5] text-lg font-semibold',
                                    value: '322,300',
                                    readOnly: true
                                }),
                                e('span', { className: 'px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600' }, 'triệu VND')
                            ),
                            e('p', { className: 'text-xs text-gray-500 mt-1' }, '* Tổng giá trị phân bổ của các tài sản có trạng thái "Hiệu lực"')
                        ),
                        // Tổng giá trị tài sản quy đổi đã dùng
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-3' }, 'Tổng giá trị tài sản quy đổi đã dùng'),
                            e('div', { className: 'grid grid-cols-2 gap-4' },
                                // Option: Giá trị tự động
                                e('div', {
                                    className: 'border rounded-lg p-4 cursor-pointer ' + (giaTriQuyDoiType === 'tu-dong' ? 'border-[#006B68] bg-white' : 'border-gray-200 bg-gray-50'),
                                    onClick: () => setGiaTriQuyDoiType('tu-dong')
                                },
                                    e('div', { className: 'flex items-center gap-2 mb-3' },
                                        e('input', {
                                            type: 'radio',
                                            name: 'giaTriQuyDoi',
                                            checked: giaTriQuyDoiType === 'tu-dong',
                                            onChange: () => setGiaTriQuyDoiType('tu-dong'),
                                            className: 'w-4 h-4 accent-[#006B68]'
                                        }),
                                        e('span', { className: 'text-sm font-medium text-gray-700' }, 'Giá trị tự động')
                                    ),
                                    e('div', { className: 'flex items-center gap-2' },
                                        e('input', {
                                            type: 'text',
                                            className: 'flex-1 px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm',
                                            value: '0',
                                            readOnly: true
                                        }),
                                        e('span', { className: 'px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600' }, 'triệu VND')
                                    ),
                                    e('p', { className: 'text-xs text-gray-500 mt-2' }, '* Mặc định: 0 (chưa sử dụng)')
                                ),
                                // Option: Giá trị tự nhập
                                e('div', {
                                    className: 'border rounded-lg p-4 cursor-pointer ' + (giaTriQuyDoiType === 'tu-nhap' ? 'border-[#006B68] bg-white' : 'border-gray-200 bg-gray-50'),
                                    onClick: () => setGiaTriQuyDoiType('tu-nhap')
                                },
                                    e('div', { className: 'flex items-center gap-2 mb-3' },
                                        e('input', {
                                            type: 'checkbox',
                                            checked: giaTriQuyDoiType === 'tu-nhap',
                                            onChange: () => setGiaTriQuyDoiType(giaTriQuyDoiType === 'tu-nhap' ? 'tu-dong' : 'tu-nhap'),
                                            className: 'w-4 h-4 accent-[#006B68] rounded'
                                        }),
                                        e('span', { className: 'text-sm font-medium text-gray-700' }, 'Giá trị tự nhập')
                                    ),
                                    e('div', { className: 'flex items-center gap-2' },
                                        e('input', {
                                            type: 'text',
                                            className: 'flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm ' + (giaTriQuyDoiType === 'tu-nhap' ? 'bg-white' : 'bg-gray-100'),
                                            value: giaTriTuNhap,
                                            onChange: (ev) => setGiaTriTuNhap(ev.target.value),
                                            disabled: giaTriQuyDoiType !== 'tu-nhap'
                                        }),
                                        e('span', { className: 'px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600' }, 'triệu VND')
                                    ),
                                    giaTriQuyDoiType === 'tu-nhap' && e('input', {
                                        type: 'text',
                                        className: 'w-full mt-2 px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                        placeholder: 'Nhập lý do...',
                                        value: lyDoTuNhap,
                                        onChange: (ev) => setLyDoTuNhap(ev.target.value)
                                    })
                                )
                            )
                        ),
                        // Giá trị tài sản quy đổi khả dụng
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-[#006B68] mb-2' }, 'Giá trị tài sản quy đổi khả dụng'),
                            e('div', { className: 'flex items-center gap-3' },
                                e('input', {
                                    type: 'text',
                                    className: 'flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#1e88e5] text-lg font-semibold',
                                    value: giaTriQuyDoiType === 'tu-nhap' ? (322300 - parseInt(giaTriTuNhap || 0)).toLocaleString() : '209,955',
                                    readOnly: true
                                }),
                                e('span', { className: 'px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600' }, 'triệu VND')
                            ),
                            e('p', { className: 'text-xs text-gray-500 mt-1' },
                                '* Tự động tính: Tổng giá trị tài sản được phân bổ đã nhân hệ số (322,300) - Tổng giá trị tài sản quy đổi đã dùng (' + (giaTriQuyDoiType === 'tu-nhap' ? giaTriTuNhap : '112,345') + ')'
                            )
                        )
                    )
                ),

                // Khối 3: Tài sản bảo đảm dự kiến (TEXTAREA ĐƠN GIẢN)
                e('div', null,
                    e('h3', { className: 'text-gray-800 font-semibold mb-3' }, 'Tài sản bảo đảm dự kiến'),
                    e('textarea', {
                        className: 'w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#006B68]/30 focus:border-[#006B68]',
                        rows: 4,
                        placeholder: 'Nhập mô tả tài sản bảo đảm dự kiến...'
                    })
                ),


                // Khối 5: Chính sách tài sản đảm bảo
                e('div', { className: 'space-y-6' },
                    e('h3', { className: 'text-[#006B68] font-semibold' }, 'Chính sách tài sản đảm bảo'),

                    // Box chính sách TSDB
                    e('div', { className: 'border border-gray-200 rounded-lg' },
                        e('div', { className: 'p-4 space-y-4' },
                            // Warning message
                            !(policyOption1 || policyOption2 || policyOption3 || policyOption4) && e('div', { className: 'flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3' },
                                e('i', { className: 'fas fa-exclamation-triangle text-yellow-500' }),
                                e('span', { className: 'text-sm text-yellow-700' }, 'Vui lòng chọn ít nhất một tùy chọn thiết lập chính sách TSDB')
                            ),

                            // Option 1: Thiết lập tỷ lệ GTCG
                            e('div', { className: 'border rounded-lg overflow-hidden ' + (policyOption1 ? 'border-[#006B68]' : 'border-gray-200') },
                                e('div', {
                                    className: 'flex items-center gap-3 px-4 py-3 cursor-pointer ' + (policyOption1 ? 'bg-[#e6f4f1]' : 'bg-gray-50'),
                                    onClick: () => setPolicyOption1(!policyOption1)
                                },
                                    e('input', {
                                        type: 'checkbox',
                                        checked: policyOption1,
                                        onChange: () => setPolicyOption1(!policyOption1),
                                        className: 'w-4 h-4 accent-[#006B68] rounded'
                                    }),
                                    e('span', { className: 'text-sm font-medium text-gray-800' }, '1. Thiết lập tỷ lệ tài sản đảm bảo riêng biệt cho dư tín dụng đảm bảo bằng giấy tờ có giá (GTCG)')
                                ),
                                policyOption1 && e('div', { className: 'px-4 py-4 bg-white border-t border-gray-200' },
                                    e('div', { className: 'flex items-center gap-2 text-[#006B68] text-sm mb-2' },
                                        e('i', { className: 'fas fa-info-circle' }),
                                        e('span', null, 'Mức tỷ lệ GTCG (%)')
                                    ),
                                    e('div', { className: 'flex items-center gap-2' },
                                        e('input', {
                                            type: 'text',
                                            className: 'flex-1 max-w-xs px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                            placeholder: 'Nhập tỷ lệ %, ví dụ: 75',
                                            value: mucTyLeGTCGPolicy,
                                            onChange: (ev) => setMucTyLeGTCGPolicy(ev.target.value)
                                        }),
                                        e('span', { className: 'text-gray-500' }, '%')
                                    )
                                )
                            ),

                            // Option 2: Hệ số tối thiểu
                            e('div', { className: 'border rounded-lg overflow-hidden ' + (policyOption2 ? 'border-[#006B68]' : 'border-gray-200') },
                                e('div', {
                                    className: 'flex items-center gap-3 px-4 py-3 cursor-pointer ' + (policyOption2 ? 'bg-[#e6f4f1]' : 'bg-gray-50'),
                                    onClick: () => setPolicyOption2(!policyOption2)
                                },
                                    e('input', {
                                        type: 'checkbox',
                                        checked: policyOption2,
                                        onChange: () => setPolicyOption2(!policyOption2),
                                        className: 'w-4 h-4 accent-[#006B68] rounded'
                                    }),
                                    e('span', { className: 'text-sm font-medium text-gray-800' }, '2. Chỉ áp dụng tính toán giá trị TSDB từ các tài sản có hệ số lớn hơn hoặc bằng một ngưỡng nhất định')
                                ),
                                policyOption2 && e('div', { className: 'px-4 py-4 bg-white border-t border-gray-200' },
                                    e('div', { className: 'flex items-center gap-2 text-[#006B68] text-sm mb-2' },
                                        e('i', { className: 'fas fa-info-circle' }),
                                        e('span', null, 'Hệ số tối thiểu (0-1)')
                                    ),
                                    e('input', {
                                        type: 'text',
                                        className: 'w-full max-w-xs px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                        placeholder: 'Nhập hệ số, ví dụ: 0.7',
                                        value: heSoToiThieuPolicy,
                                        onChange: (ev) => setHeSoToiThieuPolicy(ev.target.value)
                                    })
                                )
                            ),

                            // Option 3: Bảng TSDB theo commitment
                            e('div', { className: 'border rounded-lg overflow-hidden ' + (policyOption3 ? 'border-[#006B68]' : 'border-gray-200') },
                                e('div', {
                                    className: 'flex items-center gap-3 px-4 py-3 cursor-pointer ' + (policyOption3 ? 'bg-[#e6f4f1]' : 'bg-gray-50'),
                                    onClick: () => setPolicyOption3(!policyOption3)
                                },
                                    e('input', {
                                        type: 'checkbox',
                                        checked: policyOption3,
                                        onChange: () => setPolicyOption3(!policyOption3),
                                        className: 'w-4 h-4 accent-[#006B68] rounded'
                                    }),
                                    e('span', { className: 'text-sm font-medium text-gray-800' }, '3. Bảng TSDB theo commitment')
                                ),
                                policyOption3 && e('div', { className: 'bg-white border-t border-gray-200' },
                                    e('table', { className: 'w-full text-sm' },
                                        e('thead', null,
                                            e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                                                e('th', { className: 'px-4 py-3 text-left font-medium text-gray-700 w-16' }, 'STT'),
                                                e('th', { className: 'px-4 py-3 text-left font-medium text-gray-700' }, 'ID commitment'),
                                                e('th', { className: 'px-4 py-3 text-left font-medium text-gray-700' }, 'Tên commitment'),
                                                e('th', { className: 'px-4 py-3 text-center font-medium text-gray-700 w-28' }, 'Tỷ lệ bảo đảm'),
                                                e('th', { className: 'px-4 py-3 text-center font-medium text-gray-700 w-48' }, 'Tùy chỉnh theo thời gian hoặc số dư'),
                                                e('th', { className: 'px-4 py-3 text-center font-medium text-gray-700 w-20' }, 'Hiển thị')
                                            )
                                        ),
                                        e('tbody', null,
                                            commitmentList.map((item, idx) =>
                                                e('tr', { key: item.id, className: 'border-t border-gray-100' },
                                                    e('td', { className: 'px-4 py-3 text-gray-600' }, item.stt),
                                                    e('td', { className: 'px-4 py-3 text-[#006B68] font-medium' }, item.id),
                                                    e('td', { className: 'px-4 py-3 text-gray-800' }, item.ten),
                                                    e('td', { className: 'px-4 py-3 text-center' },
                                                        e('input', {
                                                            type: 'text',
                                                            className: 'w-20 px-2 py-1.5 border border-gray-300 rounded text-sm text-center',
                                                            value: item.tyLe,
                                                            onChange: (ev) => {
                                                                const updated = [...commitmentList];
                                                                updated[idx].tyLe = ev.target.value;
                                                                setCommitmentList(updated);
                                                            }
                                                        })
                                                    ),
                                                    e('td', { className: 'px-4 py-3 text-center' },
                                                        e('button', {
                                                            className: 'px-3 py-1.5 text-[#006B68] text-sm hover:bg-[#e6f4f1] rounded flex items-center gap-1 mx-auto',
                                                            onClick: () => {
                                                                setSelectedCommitmentForTuyChinh(item);
                                                                setTuyChinhType(item.tuyChinh?.type || 'thoi-gian');
                                                                setTuyChinhMocList(item.tuyChinh?.moc || [{ ngay: '', tyLe: '', soDu: '' }]);
                                                                setShowTuyChinhModal(true);
                                                            }
                                                        },
                                                            e('i', { className: 'fas fa-plus text-xs' }),
                                                            'Thêm'
                                                        )
                                                    ),
                                                    e('td', { className: 'px-4 py-3 text-center' },
                                                        e('input', {
                                                            type: 'checkbox',
                                                            checked: item.hienThi,
                                                            onChange: () => {
                                                                const updated = [...commitmentList];
                                                                updated[idx].hienThi = !updated[idx].hienThi;
                                                                setCommitmentList(updated);
                                                            },
                                                            className: 'w-4 h-4 accent-[#006B68] rounded'
                                                        })
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            ),

                            // Option 4: Theo chi tiết tại điều khoản điều kiện
                            e('div', { className: 'border rounded-lg overflow-hidden ' + (policyOption4 ? 'border-[#006B68]' : 'border-gray-200') },
                                e('div', {
                                    className: 'flex items-center gap-3 px-4 py-3 cursor-pointer ' + (policyOption4 ? 'bg-[#e6f4f1]' : 'bg-gray-50'),
                                    onClick: () => setPolicyOption4(!policyOption4)
                                },
                                    e('input', {
                                        type: 'checkbox',
                                        checked: policyOption4,
                                        onChange: () => setPolicyOption4(!policyOption4),
                                        className: 'w-4 h-4 accent-[#006B68] rounded'
                                    }),
                                    e('span', { className: 'text-sm font-medium text-gray-800' }, '4. Theo chi tiết tại điều khoản điều kiện')
                                ),
                                policyOption4 && e('div', { className: 'px-4 py-4 bg-white border-t border-gray-200 space-y-3' },
                                    e('div', { className: 'flex items-center gap-2 text-green-600 text-sm' },
                                        e('i', { className: 'fas fa-check-circle' }),
                                        e('span', null, 'Chính sách TSDB sẽ được quy định chi tiết trong phần điều khoản và điều kiện của hợp đồng')
                                    ),
                                    e('div', { className: 'flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2' },
                                        e('span', { className: 'text-red-600 font-medium text-xs' }, 'Lưu ý:'),
                                        e('span', { className: 'text-red-600 text-xs' }, 'Chỉ các chính sách không thuộc 3 trường hợp phía trên mới nên bổ sung tại phần điều khoản điều kiện')
                                    )
                                )
                            )
                        )
                    ),

                )
            )
        ),

        // ===== SECTION: Ý KIẾN THẨM ĐỊNH RỦI RO =====
        e('div', { className: 'content-card' },
            e('div', { className: 'section-header' },
                e('i', { className: 'fas fa-shield-alt section-icon' }),
                e('h2', { className: 'section-title' }, 'Ý kiến thẩm định rủi ro')
            ),
            e('div', { className: 'p-6 space-y-6' },
                // Đánh giá ý kiến của bộ phận đề xuất
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-3' }, 'Đánh giá ý kiến của bộ phận đề xuất'),
                    e('div', { className: 'bg-gray-50 px-4 py-3 rounded-lg border border-gray-200' },
                        e('div', { className: 'flex items-center gap-8' },
                            e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                e('input', {
                                    type: 'radio',
                                    name: 'danhGiaYKien',
                                    checked: danhGiaYKien === 'day-du',
                                    onChange: () => setDanhGiaYKien('day-du')
                                }),
                                e('span', { className: 'flex items-center gap-2 text-sm text-gray-700' },
                                    e('span', { className: 'w-2 h-2 bg-[#006B68] rounded-full' }),
                                    'Đã đánh giá đầy đủ'
                                )
                            ),
                            e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                e('input', {
                                    type: 'radio',
                                    name: 'danhGiaYKien',
                                    checked: danhGiaYKien === 'bo-sung',
                                    onChange: () => setDanhGiaYKien('bo-sung')
                                }),
                                e('span', { className: 'text-sm text-gray-700' }, 'Bổ sung ý kiến')
                            )
                        )
                    )
                ),

                // Nếu chọn bổ sung ý kiến thì hiện textarea
                danhGiaYKien === 'bo-sung' && e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Nội dung bổ sung'),
                    e('textarea', {
                        className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[100px]',
                        placeholder: 'Nhập nội dung bổ sung ý kiến...',
                        value: boSungYKien,
                        onChange: (ev) => setBoSungYKien(ev.target.value)
                    })
                ),

                // ===== Khối mới: Đề xuất chính sách bảo đảm theo ý kiến TĐRR =====
                // Chỉ hiện khi chọn "Bổ sung ý kiến"
                danhGiaYKien === 'bo-sung' && e('div', null,
                    e('h3', { className: 'text-[#006B68] font-semibold mb-4' }, 'Đề xuất chính sách tài sản đảm bảo'),

                    // Khung text tự động generate
                    e('div', { className: 'bg-[#e0f2f1] border border-[#006B68]/30 rounded-lg p-4 mb-6' },
                        e('p', { className: 'text-sm text-gray-700 mb-3' }, 'Tại mọi thời điểm, Khách hàng đáp ứng chính sách về TSDB của BIDV trong từng thời kỳ:'),
                        e('ul', { className: 'space-y-2 text-sm text-gray-700' },
                            // Hiển thị câu dựa trên chinhSachData
                            chinhSachData.filter(item => item.tyLeBaoDam && item.hienThi).map((item, idx) =>
                                e('li', { key: idx, className: 'flex items-start gap-2' },
                                    e('span', { className: 'text-[#006B68] mt-1' }, '•'),
                                    e('span', null,
                                        'Với ',
                                        e('span', { className: 'font-semibold text-[#006B68]' }, item.tenCommitment),
                                        ' tỷ lệ TSDB yêu cầu là ',
                                        e('span', { className: 'font-bold' }, item.tyLeBaoDam + '%'),
                                        '.',
                                        item.mocThoiGian.length > 0 && item.mocThoiGian.map((moc, mIdx) =>
                                            e('span', { key: mIdx },
                                                e('br'),
                                                'Từ ngày ' + moc.ngay + ', tỷ lệ TSDB yêu cầu là ',
                                                e('span', { className: 'font-bold' }, moc.tyLe + '%'),
                                                '.'
                                            )
                                        )
                                    )
                                )
                            ),
                            // Câu về GTCG
                            mucTyLeGTCG && e('li', { className: 'flex items-start gap-2' },
                                e('span', { className: 'text-[#006B68] mt-1' }, '•'),
                                e('span', null,
                                    'Đối với TSBD là tiền gửi, giấy tờ có giá: áp dụng tỷ lệ TSBDB tối thiểu là ',
                                    e('span', { className: 'font-bold' }, mucTyLeGTCG + '%')
                                )
                            )
                        )
                    ),

                    // Thiết lập chính sách TSDB
                    e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden mb-6' },
                        e('div', { className: 'bg-gray-50 px-4 py-3 border-b border-gray-200' },
                            e('h4', { className: 'font-medium text-gray-800' }, 'Thiết lập chính sách TSDB')
                        ),
                        e('div', { className: 'p-4 space-y-4' },
                            // Info box
                            e('div', { className: 'flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3' },
                                e('i', { className: 'fas fa-info-circle text-yellow-500 mt-0.5' }),
                                e('p', { className: 'text-sm text-gray-700' }, 'Thiết lập tỷ lệ tài sản đảm bảo riêng biệt cho dư tín dụng đảm bảo bằng giấy tờ có giá (GTCG).')
                            ),
                            // Mức tỷ lệ GTCG
                            e('div', null,
                                e('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Mức tỷ lệ GTCG (%)'),
                                e('div', { className: 'flex items-center gap-2' },
                                    e('input', {
                                        type: 'text',
                                        className: 'flex-1 max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-sm',
                                        placeholder: '100',
                                        value: mucTyLeGTCG,
                                        onChange: (ev) => setMucTyLeGTCG(ev.target.value)
                                    }),
                                    e('span', { className: 'text-gray-500' }, '%'),
                                    e('button', {
                                        className: 'text-red-500 hover:text-red-600 p-1',
                                        onClick: () => setMucTyLeGTCG('')
                                    },
                                        e('i', { className: 'fas fa-trash' })
                                    )
                                )
                            ),
                            // Xem trước
                            mucTyLeGTCG && e('div', { className: 'bg-green-50 border border-green-200 rounded-lg p-3' },
                                e('span', { className: 'text-sm font-medium text-green-700' }, 'Xem trước: '),
                                e('span', { className: 'text-sm text-gray-700' },
                                    'Đối với TSBD là tiền gửi, giấy tờ có giá: áp dụng tỷ lệ TSBDB tối thiểu là ',
                                    e('span', { className: 'font-bold' }, mucTyLeGTCG + '%')
                                )
                            )
                        )
                    ),

                    // Hệ số tối thiểu
                    e('div', { className: 'border border-blue-200 rounded-lg overflow-hidden mb-6' },
                        e('div', { className: 'flex items-start gap-2 bg-blue-50 px-4 py-3' },
                            e('i', { className: 'fas fa-info-circle text-blue-500 mt-0.5' }),
                            e('p', { className: 'text-sm text-gray-700' }, 'Chỉ áp dụng tính toán giá trị TSDB từ các tài sản có hệ số lớn hơn hoặc bằng một ngưỡng nhất định.')
                        ),
                        e('div', { className: 'p-4' },
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Hệ số tối thiểu (0-1)'),
                            e('input', {
                                type: 'text',
                                className: 'w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-sm',
                                placeholder: 'Nhập hệ số, ví dụ: 0.7',
                                value: heSoToiThieu,
                                onChange: (ev) => setHeSoToiThieu(ev.target.value)
                            })
                        )
                    ),

                    // Bảng chính sách theo commitment
                    e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                        e('div', { className: 'overflow-x-auto' },
                            e('table', { className: 'w-full text-sm' },
                                e('thead', null,
                                    e('tr', { className: 'bg-gray-100' },
                                        e('th', { className: 'px-3 py-2 text-left font-medium text-gray-700 w-16' }, 'STT'),
                                        e('th', { className: 'px-3 py-2 text-left font-medium text-gray-700 w-32' }, 'ID commitment'),
                                        e('th', { className: 'px-3 py-2 text-left font-medium text-gray-700' }, 'Tên commitment'),
                                        e('th', { className: 'px-3 py-2 text-center font-medium text-gray-700 w-28' }, 'Tỷ lệ bảo đảm'),
                                        e('th', { className: 'px-3 py-2 text-center font-medium text-gray-700 w-56' }, 'Tùy chỉnh theo thời gian hoặc số dư'),
                                        e('th', { className: 'px-3 py-2 text-center font-medium text-gray-700 w-20' }, 'Hiển thị')
                                    )
                                ),
                                e('tbody', null,
                                    chinhSachData.map((item, idx) =>
                                        e('tr', { key: idx, className: 'border-t border-gray-100 ' + (item.isChild ? 'bg-gray-50' : '') },
                                            e('td', { className: 'px-3 py-2 text-gray-700' }, item.stt),
                                            e('td', { className: 'px-3 py-2 text-[#006B68] font-medium' }, item.idCommitment),
                                            e('td', { className: 'px-3 py-2 text-gray-700 ' + (item.isChild ? 'pl-8' : '') }, item.tenCommitment),
                                            e('td', { className: 'px-3 py-2 text-center' },
                                                e('input', {
                                                    type: 'text',
                                                    className: 'w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm',
                                                    placeholder: '%',
                                                    value: item.tyLeBaoDam,
                                                    onChange: (ev) => updateChinhSach(idx, 'tyLeBaoDam', ev.target.value)
                                                })
                                            ),
                                            e('td', { className: 'px-3 py-2' },
                                                e('div', { className: 'space-y-1' },
                                                    item.mocThoiGian.map((moc, mIdx) =>
                                                        e('div', { key: mIdx, className: 'flex items-center gap-2 justify-center' },
                                                            e('span', { className: 'text-xs text-gray-600 bg-yellow-100 px-2 py-0.5 rounded' },
                                                                moc.ngay + ': ' + moc.tyLe + '%'
                                                            ),
                                                            e('button', {
                                                                className: 'text-red-500 hover:text-red-600',
                                                                onClick: () => removeMocThoiGian(idx, mIdx)
                                                            },
                                                                e('i', { className: 'fas fa-times text-xs' })
                                                            )
                                                        )
                                                    ),
                                                    e('button', {
                                                        className: 'text-[#006B68] hover:text-[#006657] text-xs flex items-center gap-1 mx-auto',
                                                        onClick: () => {
                                                            const ngay = prompt('Nhập ngày (VD: 2027-01-01):');
                                                            const tyLe = prompt('Nhập tỷ lệ (%):');
                                                            if (ngay && tyLe) addMocThoiGian(idx, ngay, tyLe);
                                                        }
                                                    },
                                                        e('i', { className: 'fas fa-plus' }),
                                                        item.isChild ? 'Thêm mốc' : 'Thêm'
                                                    )
                                                )
                                            ),
                                            e('td', { className: 'px-3 py-2 text-center' },
                                                e('input', {
                                                    type: 'checkbox',
                                                    checked: item.hienThi,
                                                    onChange: () => updateChinhSach(idx, 'hienThi', !item.hienThi),
                                                    className: 'w-4 h-4'
                                                })
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

        // ===== MODAL XÁC NHẬN GIẢI CHẤP =====
        showGiaiChapModal && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-lg shadow-xl w-[500px] max-h-[90vh] overflow-hidden' },
                // Header
                e('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-gray-200' },
                    e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Xác nhận giải chấp TSBĐ'),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: () => setShowGiaiChapModal(false)
                    },
                        e('i', { className: 'fas fa-times text-lg' })
                    )
                ),
                // Body
                e('div', { className: 'p-6 space-y-4' },
                    e('p', { className: 'text-sm text-gray-700' },
                        'Bạn có chắc chắn muốn giải chấp ',
                        e('span', { className: 'font-bold text-[#006B68]' }, selectedTSBD.length),
                        ' tài sản sau?'
                    ),
                    // Danh sách tài sản được chọn
                    e('div', { className: 'bg-gray-50 rounded-lg p-4 space-y-3 max-h-[200px] overflow-y-auto' },
                        getSelectedItems().map((item, idx) =>
                            e('div', { key: idx, className: 'flex items-start justify-between' },
                                e('div', null,
                                    e('div', { className: 'text-[#006B68] font-medium text-sm' }, item.ma),
                                    e('div', { className: 'text-gray-700 text-sm' }, item.ten),
                                    e('div', { className: 'text-gray-500 text-xs' }, item.moTa)
                                ),
                                e('span', { className: 'bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs' }, 'Hiệu lực')
                            )
                        )
                    ),
                    // Lý do giải chấp
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Lý do giải chấp ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('select', {
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            value: lyDoGiaiChap,
                            onChange: (ev) => setLyDoGiaiChap(ev.target.value)
                        },
                            e('option', { value: '' }, '-- Chọn lý do giải chấp --'),
                            e('option', { value: 'hoan-tat-khoan-vay' }, 'Hoàn tất khoản vay'),
                            e('option', { value: 'thay-the-tsbd' }, 'Thay thế TSBĐ khác'),
                            e('option', { value: 'giam-gia-tri' }, 'Giảm giá trị tài sản'),
                            e('option', { value: 'khac' }, 'Lý do khác')
                        )
                    ),
                    // Mô tả chi tiết
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Mô tả chi tiết'),
                        e('textarea', {
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            placeholder: 'Nhập mô tả chi tiết (tùy chọn)...',
                            value: moTaChiTiet,
                            onChange: (ev) => setMoTaChiTiet(ev.target.value)
                        })
                    )
                ),
                // Footer
                e('div', { className: 'flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50' },
                    e('button', {
                        className: 'px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100',
                        onClick: () => setShowGiaiChapModal(false)
                    }, 'Hủy'),
                    e('button', {
                        className: 'px-5 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700' + (!lyDoGiaiChap ? ' opacity-50 cursor-not-allowed' : ''),
                        onClick: handleXacNhanGiaiChap,
                        disabled: !lyDoGiaiChap
                    }, 'Xác nhận giải chấp')
                )
            )
        ),

        // ===== MODAL THÊM MỚI TSDB =====
        showThemMoiModal && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-lg shadow-xl w-[380px] overflow-hidden' },
                // Header
                e('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-gray-200' },
                    e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Thêm mới TSDB'),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: () => setShowThemMoiModal(false)
                    },
                        e('i', { className: 'fas fa-times text-lg' })
                    )
                ),
                // Body
                e('div', { className: 'p-6' },
                    e('p', { className: 'text-sm text-gray-700 mb-4' }, 'Tài sản đã tồn tại trên hệ thống?'),
                    e('div', { className: 'space-y-3' },
                        e('button', {
                            className: 'w-full px-4 py-3 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005a57]',
                            onClick: () => {
                                setShowThemMoiModal(false);
                                setShowTimKiemModal(true);
                            }
                        }, 'Đã tồn tại'),
                        e('button', {
                            className: 'w-full px-4 py-3 border border-[#006B68] text-[#006B68] rounded-lg text-sm font-medium hover:bg-[#e6f4f1]',
                            onClick: () => {
                                setShowThemMoiModal(false);
                                setShowTaoMoiScreen(true);
                            }
                        }, 'Chưa tồn tại')
                    )
                ),
                // Footer
                e('div', { className: 'flex items-center justify-end px-6 py-4 border-t border-gray-200 bg-gray-50' },
                    e('button', {
                        className: 'px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100',
                        onClick: () => setShowThemMoiModal(false)
                    }, 'Hủy')
                )
            )
        ),

        // ===== MODAL TÌM KIẾM TSDB =====
        showTimKiemModal && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-lg shadow-xl w-[600px] min-h-[400px] overflow-hidden' },
                // Header
                e('div', { className: 'px-6 py-4 border-b border-gray-200' },
                    e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Tìm kiếm Tài sản bảo đảm'),
                    e('p', { className: 'text-sm text-gray-500' }, 'Tìm kiếm tài sản hiện có')
                ),
                // Body
                e('div', { className: 'p-6' },
                    // Search form
                    e('div', { className: 'flex items-center gap-3 mb-6' },
                        e('select', {
                            className: 'px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            value: timKiemLoai,
                            onChange: (ev) => setTimKiemLoai(ev.target.value)
                        },
                            e('option', { value: 'ID tài sản bảo đảm' }, 'ID tài sản bảo đảm'),
                            e('option', { value: 'CIF khách hàng vay' }, 'CIF khách hàng vay'),
                            e('option', { value: 'CIF chủ sở hữu' }, 'CIF chủ sở hữu')
                        ),
                        e('input', {
                            type: 'text',
                            className: 'flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            placeholder: 'Nhập ID tài sản bảo đảm',
                            value: timKiemValue,
                            onChange: (ev) => setTimKiemValue(ev.target.value)
                        }),
                        e('button', {
                            className: 'px-4 py-2.5 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005a57] flex items-center gap-2',
                            onClick: handleTimKiem
                        },
                            e('i', { className: 'fas fa-search' }),
                            'Tìm kiếm'
                        )
                    ),
                    // Empty state
                    e('div', { className: 'flex flex-col items-center justify-center py-12' },
                        e('i', { className: 'fas fa-search text-6xl text-gray-300 mb-4' }),
                        e('p', { className: 'text-gray-500 text-sm' }, 'Nhập thông tin và bấm "Tìm kiếm" để tìm tài sản')
                    )
                ),
                // Footer
                e('div', { className: 'flex items-center justify-end px-6 py-4 border-t border-gray-200 bg-gray-50' },
                    e('button', {
                        className: 'px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100',
                        onClick: () => { setShowTimKiemModal(false); setTimKiemValue(''); }
                    }, 'Hủy')
                )
            )
        ),

        // ===== MÀN HÌNH TẠO MỚI TSBD (Full screen overlay) =====
        showTaoMoiScreen && e('div', { className: 'fixed inset-0 bg-gray-100 z-50 overflow-y-auto' },
            // Header
            e('div', { className: 'bg-white border-b border-gray-200 sticky top-0' },
                e('div', { className: 'max-w-7xl mx-auto px-6 py-4' },
                    e('button', {
                        className: 'text-[#006B68] text-sm flex items-center gap-1 mb-2 hover:underline',
                        onClick: () => setShowTaoMoiScreen(false)
                    },
                        e('i', { className: 'fas fa-chevron-left' }),
                        'Quay lại'
                    ),
                    e('h2', { className: 'text-xl font-bold text-gray-800' }, 'Tạo mới TSBD'),
                    e('p', { className: 'text-sm text-gray-500' }, 'Vui lòng điền đầy đủ thông tin tài sản bảo đảm')
                )
            ),
            // Content
            e('div', { className: 'max-w-5xl mx-auto px-6 py-6' },
                // Form: Thông tin chung
                e('div', { className: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6' },
                    e('div', { className: 'flex items-center justify-between mb-6' },
                        e('h3', { className: 'font-semibold text-gray-800' }, 'Thông tin chung'),
                        e('label', { className: 'flex items-center gap-2 text-sm text-gray-700' },
                            e('input', {
                                type: 'checkbox',
                                className: 'w-4 h-4 accent-[#006B68]',
                                checked: taoMoiData.taiSanLienHop,
                                onChange: (ev) => setTaoMoiData({ ...taoMoiData, taiSanLienHop: ev.target.checked })
                            }),
                            'Tài sản liên hợp'
                        )
                    ),
                    e('div', { className: 'grid grid-cols-2 gap-4' },
                        // Loại TSBD cấp 1
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                'Loại TSBD cấp 1 ',
                                e('span', { className: 'text-red-500' }, '*')
                            ),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm',
                                value: taoMoiData.loaiTSBD1,
                                readOnly: true
                            })
                        ),
                        // Loại TSBD cấp 2
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Loại TSBD cấp 2'),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 bg-[#006B68] text-white border border-gray-300 rounded-lg text-sm',
                                value: taoMoiData.loaiTSBD2,
                                readOnly: true
                            })
                        ),
                        // Loại TSBD cấp 3
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                'Loại TSBD cấp 3 ',
                                e('span', { className: 'text-red-500' }, '*')
                            ),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm',
                                value: taoMoiData.loaiTSBD3,
                                readOnly: true
                            })
                        ),
                        // Loại TSBD cấp 4
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                'Loại TSBD cấp 4 ',
                                e('span', { className: 'text-red-500' }, '*')
                            ),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 bg-[#006B68] text-white border border-gray-300 rounded-lg text-sm',
                                value: taoMoiData.loaiTSBD4,
                                readOnly: true
                            })
                        ),
                        // Kho lưu hồ sơ TSBĐ
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Kho lưu hồ sơ TSBĐ'),
                            e('select', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                value: taoMoiData.khoLuuHoSo,
                                onChange: (ev) => setTaoMoiData({ ...taoMoiData, khoLuuHoSo: ev.target.value })
                            },
                                e('option', { value: '' }, '--- Chọn ---')
                            )
                        ),
                        // Danh sách kho quỹ nội bộ
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Danh sách kho quỹ nội bộ'),
                            e('select', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                value: taoMoiData.danhSachKhoQuyNoiBo,
                                onChange: (ev) => setTaoMoiData({ ...taoMoiData, danhSachKhoQuyNoiBo: ev.target.value })
                            },
                                e('option', { value: '' }, '--- Chọn ---')
                            )
                        ),
                        // Tên tài sản bảo đảm
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                'Tên tài sản bảo đảm ',
                                e('span', { className: 'text-red-500' }, '*')
                            ),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                placeholder: 'VD: CIF KH vay+Mã Level 3',
                                value: taoMoiData.tenTSBD,
                                onChange: (ev) => setTaoMoiData({ ...taoMoiData, tenTSBD: ev.target.value })
                            })
                        ),
                        // Mô tả tài sản
                        e('div', null,
                            e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Mô tả tài sản'),
                            e('textarea', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm min-h-[80px]',
                                placeholder: 'Nhập mô tả tài sản',
                                value: taoMoiData.moTaTaiSan,
                                onChange: (ev) => setTaoMoiData({ ...taoMoiData, moTaTaiSan: ev.target.value })
                            })
                        )
                    )
                ),

                // Tabs nhỏ
                e('div', { className: 'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden' },
                    // Tab headers
                    e('div', { className: 'flex border-b border-gray-200' },
                        ['ben-bao-dam', 'chi-tiet-tai-san', 'phap-ly', 'lien-ket-dinh-gia', 'thong-tin-bo-sung', 'ho-so-dinh-kem'].map(tab =>
                            e('button', {
                                key: tab,
                                className: 'px-4 py-3 text-sm font-medium border-b-2 ' +
                                    (taoMoiActiveTab === tab
                                        ? 'border-[#006B68] text-[#006B68]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'),
                                onClick: () => setTaoMoiActiveTab(tab)
                            },
                                tab === 'ben-bao-dam' ? 'Bên bảo đảm' :
                                    tab === 'chi-tiet-tai-san' ? 'Chi tiết tài sản' :
                                        tab === 'phap-ly' ? 'Pháp lý' :
                                            tab === 'lien-ket-dinh-gia' ? 'Liên kết & Định giá' :
                                                tab === 'thong-tin-bo-sung' ? 'Thông tin bổ sung' :
                                                    'Hồ sơ đính kèm'
                            )
                        )
                    ),
                    // Tab content
                    e('div', { className: 'p-6' },
                        // Tab: Bên bảo đảm
                        taoMoiActiveTab === 'ben-bao-dam' && e('div', null,
                            e('h4', { className: 'font-semibold text-gray-800 mb-4' }, 'Thông tin bên bảo đảm'),
                            e('label', { className: 'flex items-center gap-2 mb-4 text-sm text-gray-700' },
                                e('input', {
                                    type: 'checkbox',
                                    className: 'w-4 h-4 accent-[#006B68]',
                                    checked: taoMoiData.chinhLaKhachHangVay,
                                    onChange: (ev) => setTaoMoiData({ ...taoMoiData, chinhLaKhachHangVay: ev.target.checked })
                                }),
                                'Chính là Khách hàng vay'
                            ),
                            e('div', { className: 'flex items-center gap-2' },
                                e('div', { className: 'flex-1' },
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                        'CIF bên bảo đảm ',
                                        e('span', { className: 'text-red-500' }, '*'),
                                        e('i', { className: 'fas fa-exclamation-circle text-red-500 ml-1' })
                                    ),
                                    e('input', {
                                        type: 'text',
                                        className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                        placeholder: 'Nhập CIF bên bảo đảm',
                                        value: taoMoiData.cifBenBaoDam,
                                        onChange: (ev) => setTaoMoiData({ ...taoMoiData, cifBenBaoDam: ev.target.value })
                                    })
                                ),
                                e('button', { className: 'w-10 h-10 bg-[#006B68] text-white rounded-lg flex items-center justify-center mt-5' },
                                    e('i', { className: 'fas fa-plus' })
                                ),
                                e('button', { className: 'w-10 h-10 bg-[#006B68] text-white rounded-lg flex items-center justify-center mt-5' },
                                    e('i', { className: 'fas fa-check' })
                                )
                            )
                        ),
                        // Tab: Chi tiết tài sản
                        taoMoiActiveTab === 'chi-tiet-tai-san' && e('div', null,
                            e('h4', { className: 'font-semibold text-gray-800 mb-4' }, 'Chi tiết tài sản'),
                            e('div', { className: 'grid grid-cols-3 gap-4' },
                                // Số GCN/Số Hợp đồng mua bán
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                        'Số GCN/Số Hợp đồng mua bán ',
                                        e('span', { className: 'text-red-500' }, '*')
                                    ),
                                    e('input', {
                                        type: 'text',
                                        className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                        value: taoMoiData.soGCN,
                                        onChange: (ev) => setTaoMoiData({ ...taoMoiData, soGCN: ev.target.value })
                                    })
                                ),
                                // Ngày cấp GCN
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày cấp GCN/Ngày ký hợp đồng'),
                                    e('input', {
                                        type: 'date',
                                        className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                        value: taoMoiData.ngayCapGCN,
                                        onChange: (ev) => setTaoMoiData({ ...taoMoiData, ngayCapGCN: ev.target.value })
                                    })
                                ),
                                // Số tờ/thửa
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Số tờ/thửa'),
                                    e('input', {
                                        type: 'text',
                                        className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                        value: taoMoiData.soToThua,
                                        onChange: (ev) => setTaoMoiData({ ...taoMoiData, soToThua: ev.target.value })
                                    })
                                ),
                                // Số vào sổ cấp GCN
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Số vào sổ cấp GCN'),
                                    e('input', {
                                        type: 'text',
                                        className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                        placeholder: 'Nhập Số vào sổ cấp GCN',
                                        value: taoMoiData.soVaoSoCapGCN,
                                        onChange: (ev) => setTaoMoiData({ ...taoMoiData, soVaoSoCapGCN: ev.target.value })
                                    })
                                ),
                                // Đơn vị cấp số
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Đơn vị cấp số'),
                                    e('input', {
                                        type: 'text',
                                        className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                        placeholder: 'Nhập đơn vị cấp số',
                                        value: taoMoiData.donViCapSo,
                                        onChange: (ev) => setTaoMoiData({ ...taoMoiData, donViCapSo: ev.target.value })
                                    })
                                ),
                                // Diện tích đất
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Diện tích đất'),
                                    e('div', { className: 'flex gap-2' },
                                        e('input', {
                                            type: 'text',
                                            className: 'flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                            placeholder: 'Nhập diện tích đất',
                                            value: taoMoiData.dienTichDat,
                                            onChange: (ev) => setTaoMoiData({ ...taoMoiData, dienTichDat: ev.target.value })
                                        }),
                                        e('select', {
                                            className: 'px-2 py-2.5 border border-gray-300 rounded-lg text-sm',
                                            value: taoMoiData.dienTichDatUnit,
                                            onChange: (ev) => setTaoMoiData({ ...taoMoiData, dienTichDatUnit: ev.target.value })
                                        },
                                            e('option', { value: 'm²' }, 'm²')
                                        )
                                    )
                                ),
                                // Diện tích đất xây dựng/căn hộ
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Diện tích đất xây dựng/căn hộ'),
                                    e('div', { className: 'flex gap-2' },
                                        e('input', {
                                            type: 'text',
                                            className: 'flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                            value: taoMoiData.dienTichXayDung,
                                            onChange: (ev) => setTaoMoiData({ ...taoMoiData, dienTichXayDung: ev.target.value })
                                        }),
                                        e('span', { className: 'px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm' }, 'm²')
                                    )
                                ),
                                // Tình trạng pháp lý
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                        'Tình trạng pháp lý của tài sản ',
                                        e('span', { className: 'text-red-500' }, '*')
                                    ),
                                    e('input', {
                                        type: 'text',
                                        className: 'w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm',
                                        value: taoMoiData.tinhTrangPhapLy,
                                        readOnly: true
                                    })
                                ),
                                // Ngày hết hạn
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày hết hạn của tài sản'),
                                    e('input', {
                                        type: 'date',
                                        className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                        value: taoMoiData.ngayHetHan,
                                        onChange: (ev) => setTaoMoiData({ ...taoMoiData, ngayHetHan: ev.target.value })
                                    })
                                ),
                                // Ngày mua
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày mua'),
                                    e('input', {
                                        type: 'date',
                                        className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                        value: taoMoiData.ngayMua,
                                        onChange: (ev) => setTaoMoiData({ ...taoMoiData, ngayMua: ev.target.value })
                                    })
                                ),
                                // Loại hình sở hữu đất
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                        'Loại hình sở hữu đất ',
                                        e('span', { className: 'text-red-500' }, '*')
                                    ),
                                    e('input', {
                                        type: 'text',
                                        className: 'w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm',
                                        value: taoMoiData.loaiHinhSoHuu,
                                        readOnly: true
                                    })
                                ),
                                // Loại hình sử dụng
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Loại hình sử dụng'),
                                    e('select', {
                                        className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                        value: taoMoiData.loaiHinhSuDung,
                                        onChange: (ev) => setTaoMoiData({ ...taoMoiData, loaiHinhSuDung: ev.target.value })
                                    },
                                        e('option', { value: '' }, '--- Chọn ---')
                                    )
                                ),
                                // Mục đích sử dụng đất
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Mục đích sử dụng đất'),
                                    e('select', {
                                        className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                        value: taoMoiData.mucDichSuDung,
                                        onChange: (ev) => setTaoMoiData({ ...taoMoiData, mucDichSuDung: ev.target.value })
                                    },
                                        e('option', { value: '' }, '--- Chọn ---')
                                    )
                                ),
                                // Nguồn gốc đất
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Nguồn gốc đất'),
                                    e('select', {
                                        className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                        value: taoMoiData.nguonGocDat,
                                        onChange: (ev) => setTaoMoiData({ ...taoMoiData, nguonGocDat: ev.target.value })
                                    },
                                        e('option', { value: '' }, '--- Chọn ---')
                                    )
                                ),
                                // Số hợp đồng cho thuê
                                e('div', null,
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Số hợp đồng cho thuê'),
                                    e('input', {
                                        type: 'text',
                                        className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                        placeholder: 'Nhập số hợp đồng cho thuê',
                                        value: taoMoiData.soHopDongChoThue,
                                        onChange: (ev) => setTaoMoiData({ ...taoMoiData, soHopDongChoThue: ev.target.value })
                                    })
                                ),
                                // Dự kiến giá trị thị trường
                                e('div', { className: 'col-span-2' },
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Dự kiến giá trị thị trường sau hoàn thiện'),
                                    e('div', { className: 'flex gap-2' },
                                        e('input', {
                                            type: 'text',
                                            className: 'flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                            placeholder: 'Nhập dự kiến giá trị thị trường sau h...',
                                            value: taoMoiData.duKienGiaTriThiTruong,
                                            onChange: (ev) => setTaoMoiData({ ...taoMoiData, duKienGiaTriThiTruong: ev.target.value })
                                        }),
                                        e('select', {
                                            className: 'px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                            value: taoMoiData.duKienGiaTriUnit,
                                            onChange: (ev) => setTaoMoiData({ ...taoMoiData, duKienGiaTriUnit: ev.target.value })
                                        },
                                            e('option', { value: 'VND' }, 'VND')
                                        )
                                    )
                                )
                            )
                        ),
                        // Tab: Pháp lý
                        taoMoiActiveTab === 'phap-ly' && e('div', null,
                            e('div', { className: 'flex items-center gap-2 mb-6' },
                                e('h4', { className: 'font-semibold text-[#006B68]' }, 'Pháp lý'),
                                e('i', { className: 'fas fa-edit text-gray-400 text-sm cursor-pointer' })
                            ),
                            e('div', { className: 'grid grid-cols-3 gap-6' },
                                // Cột 1
                                e('div', { className: 'space-y-4' },
                                    e('div', null,
                                        e('label', { className: 'block text-sm text-[#006B68] font-medium mb-1' }, 'Số đăng ký giao dịch bảo đảm'),
                                        e('div', { className: 'text-sm text-gray-700' }, 'SDK7811JH92880')
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm text-[#006B68] font-medium mb-1' }, 'Ngày hết hạn đăng ký giao dịch bảo đảm'),
                                        e('div', { className: 'text-sm text-gray-700' }, '09/12/2020')
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm text-[#006B68] font-medium mb-1' }, 'Ngày công chứng'),
                                        e('div', { className: 'text-sm text-gray-700' }, '09/12/2020')
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm text-[#006B68] font-medium mb-1' }, 'Ngày hợp đồng bảo đảm'),
                                        e('div', { className: 'text-sm text-gray-700' }, '09/12/2020')
                                    )
                                ),
                                // Cột 2
                                e('div', { className: 'space-y-4' },
                                    e('div', null,
                                        e('label', { className: 'block text-sm text-[#006B68] font-medium mb-1' }, 'Nơi đăng ký giao dịch bảo đảm'),
                                        e('div', { className: 'text-sm text-gray-700' }, 'Trụ sở chính')
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm text-[#006B68] font-medium mb-1' }, 'Thứ tự ưu tiên trong GDBĐ của BIDV'),
                                        e('div', { className: 'text-sm text-gray-700' }, 'Ưu tiên 1')
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm text-[#006B68] font-medium mb-1' }, 'Hiệu lực công chứng'),
                                        e('div', { className: 'text-sm text-gray-700' }, '09/12/2020 - 09/12/2025')
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm text-[#006B68] font-medium mb-1' }, 'Nghĩa vụ bảo đảm'),
                                        e('div', { className: 'text-sm text-gray-700' }, 'Toàn bộ')
                                    )
                                ),
                                // Cột 3
                                e('div', { className: 'space-y-4' },
                                    e('div', null,
                                        e('label', { className: 'block text-sm text-[#006B68] font-medium mb-1' }, 'Ngày đăng ký giao dịch bảo đảm'),
                                        e('div', { className: 'text-sm text-gray-700' }, '09/12/2020')
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm text-[#006B68] font-medium mb-1' }, 'Nơi công chứng'),
                                        e('div', { className: 'text-sm text-gray-700' }, 'Văn phòng công chứng số 1')
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm text-[#006B68] font-medium mb-1' }, 'Số hợp đồng bảo đảm'),
                                        e('div', { className: 'text-sm text-gray-700' }, 'HDTC9108')
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm text-[#006B68] font-medium mb-1' }, 'Phạm vi bảo đảm: HDTD ký kết trong khoảng thời gian'),
                                        e('div', { className: 'text-sm text-gray-700' }, '09/12/2020 - 09/12/2025')
                                    )
                                )
                            ),
                            e('button', { className: 'mt-6 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2' },
                                e('i', { className: 'fas fa-plus text-xs' }),
                                'Bổ sung pháp lý'
                            )
                        ),

                        // Tab: Liên kết & Định giá
                        taoMoiActiveTab === 'lien-ket-dinh-gia' && e('div', { className: 'space-y-6' },
                            // Section: Thông tin liên kết
                            e('div', null,
                                e('div', { className: 'flex items-center justify-between mb-4' },
                                    e('h4', { className: 'font-semibold text-gray-800' }, 'Thông tin liên kết'),
                                    e('div', { className: 'flex items-center gap-2' },
                                        e('button', { className: 'px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2' },
                                            e('i', { className: 'fas fa-edit text-xs' }),
                                            'Chỉnh sửa'
                                        ),
                                        e('button', { className: 'px-4 py-2 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005a57] flex items-center gap-2' },
                                            e('i', { className: 'fas fa-plus text-xs' }),
                                            'Thêm mới liên kết'
                                        )
                                    )
                                ),
                                // Cards thông tin
                                e('div', { className: 'grid grid-cols-3 gap-4 mb-6' },
                                    e('div', { className: 'border border-gray-200 rounded-lg p-4' },
                                        e('div', { className: 'text-sm text-gray-500 mb-1' }, 'Giá trị TSBD định giá (VND)'),
                                        e('div', { className: 'text-xl font-semibold text-[#006B68]' }, '10.000.000.000')
                                    ),
                                    e('div', { className: 'border border-gray-200 rounded-lg p-4' },
                                        e('div', { className: 'text-sm text-gray-500 mb-1' }, 'Tổng giá trị phân bổ (VND)'),
                                        e('div', { className: 'text-xl font-semibold text-gray-800' }, '10.000.000.000')
                                    ),
                                    e('div', { className: 'border border-gray-200 rounded-lg p-4' },
                                        e('div', { className: 'text-sm text-gray-500 mb-1' }, 'Số lượng khoản cấp tín dụng được bảo đảm'),
                                        e('div', { className: 'text-xl font-semibold text-gray-800' }, '3')
                                    )
                                ),
                                // Bảng commitment
                                e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                                    e('table', { className: 'w-full text-sm' },
                                        e('thead', null,
                                            e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                                                e('th', { className: 'px-4 py-3 text-left font-medium text-gray-700' }, 'Commitment'),
                                                e('th', { className: 'px-4 py-3 text-left font-medium text-gray-700' }, 'Trạng thái đẩy CORE'),
                                                e('th', { className: 'px-4 py-3 text-left font-medium text-gray-700' }, 'Giới hạn Commitment'),
                                                e('th', { className: 'px-4 py-3 text-left font-medium text-gray-700' }, 'Tỷ lệ phân bổ (%)'),
                                                e('th', { className: 'px-4 py-3 text-left font-medium text-gray-700' }, 'Giá trị phân bổ'),
                                                e('th', { className: 'px-4 py-3 text-center font-medium text-gray-700' }, 'Nguồn trả nợ')
                                            )
                                        ),
                                        e('tbody', null,
                                            // Header row
                                            e('tr', { className: 'bg-gray-50' },
                                                e('td', { className: 'px-4 py-3 font-medium text-gray-800', colSpan: 6 },
                                                    e('i', { className: 'fas fa-building mr-2 text-gray-500' }),
                                                    'Công ty TNHH CBA - CIF: 123456789'
                                                )
                                            ),
                                            e('tr', { className: 'border-t border-gray-100' },
                                                e('td', { className: 'px-4 py-3 text-[#006B68]' }, 'FAC972000'),
                                                e('td', { className: 'px-4 py-3' },
                                                    e('span', { className: 'flex items-center gap-1 text-green-600' },
                                                        e('span', { className: 'w-2 h-2 bg-green-500 rounded-full' }),
                                                        'Đã đẩy'
                                                    )
                                                ),
                                                e('td', { className: 'px-4 py-3' }, '5.000.000.000 VND'),
                                                e('td', { className: 'px-4 py-3' }, '80%'),
                                                e('td', { className: 'px-4 py-3' }, '8.000.000.000'),
                                                e('td', { className: 'px-4 py-3 text-center' },
                                                    e('i', { className: 'fas fa-check text-green-500' })
                                                )
                                            ),
                                            e('tr', { className: 'border-t border-gray-100' },
                                                e('td', { className: 'px-4 py-3 text-[#006B68]' }, 'FAC123012'),
                                                e('td', { className: 'px-4 py-3' },
                                                    e('span', { className: 'flex items-center gap-1 text-yellow-600' },
                                                        e('span', { className: 'w-2 h-2 bg-yellow-500 rounded-full' }),
                                                        'Chưa đẩy'
                                                    )
                                                ),
                                                e('td', { className: 'px-4 py-3' }, '3.000.000.000 VND'),
                                                e('td', { className: 'px-4 py-3' }, '20%'),
                                                e('td', { className: 'px-4 py-3' }, '2.000.000.000'),
                                                e('td', { className: 'px-4 py-3 text-center' },
                                                    e('i', { className: 'fas fa-times text-gray-400' })
                                                )
                                            ),
                                            e('tr', { className: 'border-t border-gray-100' },
                                                e('td', { className: 'px-4 py-3 text-[#006B68]' }, 'FAC456789'),
                                                e('td', { className: 'px-4 py-3' },
                                                    e('span', { className: 'flex items-center gap-1 text-red-600' },
                                                        e('span', { className: 'w-2 h-2 bg-red-500 rounded-full' }),
                                                        'Đẩy không thành công'
                                                    )
                                                ),
                                                e('td', { className: 'px-4 py-3' }, '2.000.000.000 VND'),
                                                e('td', { className: 'px-4 py-3' }, '0%'),
                                                e('td', { className: 'px-4 py-3' }, '0'),
                                                e('td', { className: 'px-4 py-3 text-center' },
                                                    e('i', { className: 'fas fa-times text-gray-400' })
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            // Section: Thông tin định giá
                            e('div', { className: 'border-t border-gray-200 pt-6' },
                                e('div', { className: 'flex items-center justify-between mb-4' },
                                    e('h4', { className: 'font-semibold text-gray-800' }, 'Thông tin định giá'),
                                    e('i', { className: 'fas fa-chevron-down text-gray-400 cursor-pointer' })
                                ),
                                e('div', { className: 'grid grid-cols-3 gap-4 mb-4' },
                                    e('div', { className: 'border border-gray-200 rounded-lg p-4' },
                                        e('div', { className: 'text-sm text-gray-500 mb-1' }, 'Giá trị TSBD định giá (VND)'),
                                        e('div', { className: 'text-xl font-semibold text-[#006B68]' }, '10.000.000.000')
                                    ),
                                    e('div', { className: 'border border-gray-200 rounded-lg p-4' },
                                        e('div', { className: 'text-sm text-gray-500 mb-1' }, 'Tần suất định giá'),
                                        e('div', { className: 'text-lg font-medium text-gray-800' }, 'Hằng tháng')
                                    ),
                                    e('div', { className: 'border border-gray-200 rounded-lg p-4' },
                                        e('div', { className: 'text-sm text-gray-500 mb-1' }, 'Ngày định giá tiếp theo'),
                                        e('div', { className: 'text-lg font-medium text-gray-800' }, '09/12/2025')
                                    )
                                ),
                                e('div', { className: 'border border-gray-200 rounded-lg p-4' },
                                    e('div', { className: 'text-sm text-gray-500 mb-1' }, 'Tổ chức định giá'),
                                    e('div', { className: 'text-lg font-medium text-gray-800' }, 'B-Value')
                                )
                            )
                        ),

                        // Tab: Thông tin bổ sung
                        taoMoiActiveTab === 'thong-tin-bo-sung' && e('div', { className: 'space-y-6' },
                            // Section: Phân loại tài sản
                            e('div', null,
                                e('h4', { className: 'font-semibold text-gray-800 mb-4' }, 'Phân loại tài sản'),
                                e('div', { className: 'grid grid-cols-3 gap-4' },
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                            'Phân loại bất động sản ',
                                            e('span', { className: 'text-red-500' }, '*')
                                        ),
                                        e('select', { className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm' },
                                            e('option', { value: '' }, '--- Chọn ---')
                                        )
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Mục đích sử dụng'),
                                        e('select', { className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm' },
                                            e('option', { value: '' }, '--- Chọn ---')
                                        )
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Trạng thái hoàn thành'),
                                        e('select', { className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm' },
                                            e('option', { value: '' }, '--- Chọn ---')
                                        )
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Dự án'),
                                        e('input', { type: 'text', className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm', placeholder: 'Nhập tên dự án' })
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Giai đoạn của dự án'),
                                        e('input', { type: 'text', className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm', placeholder: 'Nhập giai đoạn của dự án' })
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Dự án bị ngiững triển khai?'),
                                        e('div', { className: 'flex items-center gap-4 mt-2' },
                                            e('label', { className: 'flex items-center gap-2 text-sm' },
                                                e('input', { type: 'radio', name: 'duAnNgung' }),
                                                'Có'
                                            ),
                                            e('label', { className: 'flex items-center gap-2 text-sm' },
                                                e('input', { type: 'radio', name: 'duAnNgung', defaultChecked: true }),
                                                'Không'
                                            )
                                        )
                                    )
                                )
                            ),
                            // Section: Địa chỉ thực tế
                            e('div', { className: 'border-t border-gray-200 pt-6' },
                                e('div', { className: 'flex items-center gap-2 mb-4' },
                                    e('i', { className: 'fas fa-map-marker-alt text-red-500' }),
                                    e('h4', { className: 'font-semibold text-gray-800' }, 'Địa chỉ thực tế')
                                ),
                                e('div', { className: 'mb-4' },
                                    e('select', { className: 'px-3 py-2 border border-gray-300 rounded-lg text-sm' },
                                        e('option', { value: 'vietnam' }, 'Việt Nam'),
                                        e('option', { value: 'other' }, 'Khác')
                                    )
                                ),
                                e('div', { className: 'grid grid-cols-3 gap-4' },
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Tỉnh/thành phố'),
                                        e('select', { className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm' },
                                            e('option', { value: '' }, '--- Chọn ---')
                                        )
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Phường/Xã'),
                                        e('select', { className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm' },
                                            e('option', { value: '' }, '--- Chọn ---')
                                        )
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Đường'),
                                        e('input', { type: 'text', className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm', placeholder: '' })
                                    )
                                ),
                                e('div', { className: 'mt-4' },
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Địa chỉ chi tiết'),
                                    e('input', { type: 'text', className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm', placeholder: 'Số nhà/thôn/tổ/xóm, toà nhà' })
                                ),
                                e('div', { className: 'grid grid-cols-2 gap-4 mt-4' },
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Dự án/Khu đô thị/Khu phân lô'),
                                        e('select', { className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm' },
                                            e('option', { value: '' }, '--- Chọn ---')
                                        )
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Dự án/Khu đô thị/Khu phân lô'),
                                        e('select', { className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm' },
                                            e('option', { value: '' }, '--- Chọn ---')
                                        )
                                    )
                                )
                            ),
                            // Section: Thông tin 1
                            e('div', { className: 'border-t border-gray-200 pt-6' },
                                e('div', { className: 'flex items-center gap-2 mb-4' },
                                    e('i', { className: 'fas fa-plus-circle text-[#006B68]' }),
                                    e('h4', { className: 'font-semibold text-gray-800' }, 'Thông tin 1')
                                ),
                                e('div', { className: 'grid grid-cols-3 gap-4' },
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Kiểm tra thực tế?'),
                                        e('div', { className: 'flex items-center gap-4 mt-2' },
                                            e('label', { className: 'flex items-center gap-2 text-sm' },
                                                e('input', { type: 'radio', name: 'kiemTra', defaultChecked: true }),
                                                'Có'
                                            ),
                                            e('label', { className: 'flex items-center gap-2 text-sm' },
                                                e('input', { type: 'radio', name: 'kiemTra' }),
                                                'Không'
                                            )
                                        )
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                            'Tần suất kiểm tra ',
                                            e('span', { className: 'text-red-500' }, '*')
                                        ),
                                        e('div', { className: 'flex gap-2' },
                                            e('input', { type: 'text', className: 'flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm', placeholder: 'Nhập...' }),
                                            e('span', { className: 'px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm' }, '/Năm')
                                        )
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                            'Ngày kiểm tra gần nhất ',
                                            e('span', { className: 'text-red-500' }, '*')
                                        ),
                                        e('input', { type: 'date', className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm' })
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                            'Ngày kiểm tra tiếp theo ',
                                            e('span', { className: 'text-red-500' }, '*')
                                        ),
                                        e('input', { type: 'date', className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm' })
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Rủi ro môi trường?'),
                                        e('div', { className: 'flex items-center gap-4 mt-2' },
                                            e('label', { className: 'flex items-center gap-2 text-sm' },
                                                e('input', { type: 'radio', name: 'ruiRoMT', defaultChecked: true }),
                                                'Có'
                                            ),
                                            e('label', { className: 'flex items-center gap-2 text-sm' },
                                                e('input', { type: 'radio', name: 'ruiRoMT' }),
                                                'Không'
                                            )
                                        )
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày xác nhận'),
                                        e('input', { type: 'date', className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm' })
                                    )
                                ),
                                e('div', { className: 'mt-4' },
                                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ghi chú về rủi ro môi trường'),
                                    e('input', { type: 'text', className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm', placeholder: 'Nhập ghi chú về rủi ro môi trường' })
                                ),
                                e('div', { className: 'grid grid-cols-4 gap-4 mt-4' },
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'TSBD đầy có tính pháp lý?'),
                                        e('input', { type: 'text', className: 'w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm', value: 'Có', readOnly: true })
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                                            'Ngày hoàn thiện pháp lý ',
                                            e('span', { className: 'text-red-500' }, '*')
                                        ),
                                        e('input', { type: 'date', className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm' })
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Tỷ lệ cắt giờ'),
                                        e('input', { type: 'text', className: 'w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm', value: '4,65 %', readOnly: true })
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Giá trị sau cắt giảm (VND)'),
                                        e('input', { type: 'text', className: 'w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm', value: '2.000.000.000', readOnly: true })
                                    )
                                ),
                                e('div', { className: 'grid grid-cols-3 gap-4 mt-4' },
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Nguồn hình thành tài sản'),
                                        e('select', { className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm' },
                                            e('option', { value: '' }, '--- Chọn ---')
                                        )
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Người vay có làm việc vào TSBD?'),
                                        e('div', { className: 'flex items-center gap-4 mt-2' },
                                            e('label', { className: 'flex items-center gap-2 text-sm' },
                                                e('input', { type: 'radio', name: 'nguoiVay', defaultChecked: true }),
                                                'Có'
                                            ),
                                            e('label', { className: 'flex items-center gap-2 text-sm' },
                                                e('input', { type: 'radio', name: 'nguoiVay' }),
                                                'Không'
                                            )
                                        )
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Chủ đầu tư có liên quan đến người vay?'),
                                        e('div', { className: 'text-sm text-gray-700 mt-2' }, 'Không')
                                    )
                                ),
                                e('div', { className: 'grid grid-cols-3 gap-4 mt-4' },
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Tên chủ đầu tư'),
                                        e('input', { type: 'text', className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm', placeholder: 'Nhập tên chủ đầu tư' })
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Người ký hợp đồng'),
                                        e('input', { type: 'text', className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm', placeholder: 'Nhập người ký hợp đồng' })
                                    ),
                                    e('div', null,
                                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ngày ký hợp đồng'),
                                        e('input', { type: 'date', className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm' })
                                    )
                                )
                            )
                        ),

                        // Tab: Hồ sơ đính kèm
                        taoMoiActiveTab === 'ho-so-dinh-kem' && e('div', null,
                            e('h4', { className: 'font-semibold text-gray-800 mb-4' }, 'Hồ sơ đính kèm'),
                            e('div', { className: 'border-2 border-dashed border-gray-300 rounded-lg p-12 text-center' },
                                e('i', { className: 'fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4' }),
                                e('p', { className: 'text-gray-500 mb-2' }, 'Kéo thả file vào đây hoặc'),
                                e('button', { className: 'px-4 py-2 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005a57]' }, 'Chọn tệp tin')
                            ),
                            e('p', { className: 'text-sm text-gray-500 mt-4' }, 'Định dạng cho phép: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Tối đa 10MB)')
                        )
                    )
                )
            ),
            // Footer sticky
            e('div', { className: 'bg-white border-t border-gray-200 sticky bottom-0' },
                e('div', { className: 'max-w-5xl mx-auto px-6 py-4 flex items-center justify-between' },
                    e('button', {
                        className: 'px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100',
                        onClick: () => setShowTaoMoiScreen(false)
                    }, 'Hủy bỏ'),
                    e('div', { className: 'flex items-center gap-3' },
                        e('button', {
                            className: 'px-5 py-2 border border-[#006B68] text-[#006B68] rounded-lg text-sm hover:bg-[#e6f4f1]',
                            onClick: () => { alert('Đã lưu nháp thành công!'); }
                        }, 'Lưu nháp'),
                        e('button', {
                            className: 'px-5 py-2 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005a57]',
                            onClick: () => { alert('Đã lưu thông tin tài sản đảm bảo thành công!'); setShowTaoMoiScreen(false); }
                        }, 'Lưu')
                    )
                )
            )
        ),

        // ===== MODAL THÊM MỚI TSDB DỰ KIẾN =====
        showThemMoiTSDBDuKienModal && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-lg shadow-xl w-[450px] max-h-[90vh] overflow-hidden' },
                // Header
                e('div', { className: 'px-6 py-4 border-b border-gray-200' },
                    e('h3', { className: 'text-lg font-semibold text-[#006B68]' }, 'Thêm mới TSDB dự kiến'),
                    e('p', { className: 'text-sm text-gray-500 mt-1' }, 'Nhập thông tin tài sản bảo đảm dự kiến')
                ),
                // Body
                e('div', { className: 'p-6 space-y-4' },
                    // Tên TSDB
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Tên TSDB ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('input', {
                            type: 'text',
                            className: 'w-full px-3 py-2.5 border border-[#006B68] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            placeholder: 'Nhập tên tài sản',
                            value: newTSDBDuKien.tenTSDB,
                            onChange: (ev) => setNewTSDBDuKien({ ...newTSDBDuKien, tenTSDB: ev.target.value })
                        })
                    ),
                    // Loại TSDB cấp 1
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Loại TSDB cấp 1 ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('select', {
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            value: newTSDBDuKien.loaiCap1,
                            onChange: (ev) => setNewTSDBDuKien({ ...newTSDBDuKien, loaiCap1: ev.target.value })
                        },
                            e('option', { value: '' }, '-- Chọn loại cấp 1 --'),
                            e('option', { value: 'Bất động sản' }, 'Bất động sản'),
                            e('option', { value: 'Động sản' }, 'Động sản'),
                            e('option', { value: 'Giấy tờ có giá' }, 'Giấy tờ có giá'),
                            e('option', { value: 'Tài sản khác' }, 'Tài sản khác')
                        )
                    ),
                    // Mô tả TSDB
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Mô tả TSDB'),
                        e('input', {
                            type: 'text',
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            placeholder: 'Nhập mô tả chi tiết về tài sản',
                            value: newTSDBDuKien.moTa,
                            onChange: (ev) => setNewTSDBDuKien({ ...newTSDBDuKien, moTa: ev.target.value })
                        })
                    ),
                    // Giá trị dự kiến
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Giá trị dự kiến (triệu VND) ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('input', {
                            type: 'text',
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            placeholder: 'Nhập giá trị dự kiến',
                            value: newTSDBDuKien.giaTri,
                            onChange: (ev) => setNewTSDBDuKien({ ...newTSDBDuKien, giaTri: ev.target.value })
                        })
                    ),
                    // Ghi chú
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ghi chú'),
                        e('input', {
                            type: 'text',
                            className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            placeholder: 'Nhập ghi chú nếu cần',
                            value: newTSDBDuKien.ghiChu,
                            onChange: (ev) => setNewTSDBDuKien({ ...newTSDBDuKien, ghiChu: ev.target.value })
                        })
                    )
                ),
                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3' },
                    e('button', {
                        className: 'px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50',
                        onClick: () => {
                            setShowThemMoiTSDBDuKienModal(false);
                            setNewTSDBDuKien({ tenTSDB: '', loaiCap1: '', moTa: '', giaTri: '', ghiChu: '' });
                        }
                    }, 'Hủy'),
                    e('button', {
                        className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005a57] disabled:opacity-50 disabled:cursor-not-allowed',
                        disabled: !newTSDBDuKien.tenTSDB || !newTSDBDuKien.loaiCap1 || !newTSDBDuKien.giaTri,
                        onClick: () => {
                            const newItem = {
                                id: Date.now(),
                                tenTSDB: newTSDBDuKien.tenTSDB,
                                loaiCap1: newTSDBDuKien.loaiCap1,
                                moTa: newTSDBDuKien.moTa,
                                giaTri: parseInt(newTSDBDuKien.giaTri) || 0,
                                ghiChu: newTSDBDuKien.ghiChu
                            };
                            setTsbdDuKienList([...tsbdDuKienList, newItem]);
                            setShowThemMoiTSDBDuKienModal(false);
                            setNewTSDBDuKien({ tenTSDB: '', loaiCap1: '', moTa: '', giaTri: '', ghiChu: '' });
                        }
                    }, 'Thêm mới')
                )
            )
        ),

        // ===== MODAL THIẾT LẬP CHÍNH SÁCH TSĐB (TÙY CHỈNH THỜI GIAN/SỐ DƯ) =====
        showTuyChinhModal && selectedCommitmentForTuyChinh && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-lg shadow-xl w-[480px] max-h-[90vh] overflow-hidden' },
                // Header
                e('div', { className: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between' },
                    e('div', null,
                        e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Thiết lập chính sách TSĐB'),
                        e('p', { className: 'text-sm text-gray-500 mt-1' }, 'Commitment: ' + selectedCommitmentForTuyChinh.ten)
                    ),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: () => setShowTuyChinhModal(false)
                    },
                        e('i', { className: 'fas fa-times text-lg' })
                    )
                ),
                // Body
                e('div', { className: 'p-6 space-y-5' },
                    // Hướng dẫn
                    e('div', { className: 'bg-[#e6f4f1] border border-[#006B68]/20 rounded-lg px-4 py-3' },
                        e('p', { className: 'text-sm text-gray-700' },
                            e('span', { className: 'font-semibold text-[#006B68]' }, 'Hướng dẫn: '),
                            'Chọn một trong hai lựa chọn: áp dụng theo thời gian hoặc áp dụng theo số dư.'
                        )
                    ),

                    // Option: Áp dụng theo thời gian
                    e('div', { className: 'border rounded-lg overflow-hidden ' + (tuyChinhType === 'thoi-gian' ? 'border-[#006B68]' : 'border-gray-200') },
                        e('div', {
                            className: 'flex items-center gap-3 px-4 py-3 cursor-pointer',
                            onClick: () => setTuyChinhType('thoi-gian')
                        },
                            e('input', {
                                type: 'radio',
                                name: 'tuyChinhType',
                                checked: tuyChinhType === 'thoi-gian',
                                onChange: () => setTuyChinhType('thoi-gian'),
                                className: 'w-4 h-4 accent-[#006B68]'
                            }),
                            e('span', { className: 'text-sm font-medium text-gray-800' }, 'Áp dụng theo thời gian')
                        ),
                        tuyChinhType === 'thoi-gian' && e('div', { className: 'px-4 py-4 bg-white border-t border-gray-200 space-y-4' },
                            tuyChinhMocList.map((moc, idx) =>
                                e('div', { key: idx, className: 'space-y-2' },
                                    e('div', { className: 'text-sm text-gray-500' }, 'Mốc thời gian #' + (idx + 1)),
                                    e('div', { className: 'grid grid-cols-2 gap-4' },
                                        e('div', null,
                                            e('label', { className: 'block text-xs text-gray-500 mb-1' }, 'Ngày áp dụng từ'),
                                            e('input', {
                                                type: 'date',
                                                className: 'w-full px-3 py-2.5 border border-[#006B68] rounded-lg text-sm',
                                                value: moc.ngay,
                                                onChange: (ev) => {
                                                    const updated = [...tuyChinhMocList];
                                                    updated[idx].ngay = ev.target.value;
                                                    setTuyChinhMocList(updated);
                                                }
                                            })
                                        ),
                                        e('div', null,
                                            e('label', { className: 'block text-xs text-gray-500 mb-1' }, 'Mức tỷ lệ là (%)'),
                                            e('input', {
                                                type: 'text',
                                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                                placeholder: 'Ví dụ: 80',
                                                value: moc.tyLe,
                                                onChange: (ev) => {
                                                    const updated = [...tuyChinhMocList];
                                                    updated[idx].tyLe = ev.target.value;
                                                    setTuyChinhMocList(updated);
                                                }
                                            })
                                        )
                                    )
                                )
                            ),
                            e('button', {
                                className: 'w-full py-2.5 border border-[#006B68] text-[#006B68] rounded-lg text-sm hover:bg-[#e6f4f1] flex items-center justify-center gap-2',
                                onClick: () => setTuyChinhMocList([...tuyChinhMocList, { ngay: '', tyLe: '', soDu: '' }])
                            },
                                e('i', { className: 'fas fa-plus text-xs' }),
                                'Thêm mốc thời gian'
                            )
                        )
                    ),

                    // Option: Áp dụng theo số dư
                    e('div', { className: 'border rounded-lg overflow-hidden ' + (tuyChinhType === 'so-du' ? 'border-[#006B68]' : 'border-gray-200') },
                        e('div', {
                            className: 'flex items-center gap-3 px-4 py-3 cursor-pointer',
                            onClick: () => setTuyChinhType('so-du')
                        },
                            e('input', {
                                type: 'radio',
                                name: 'tuyChinhType',
                                checked: tuyChinhType === 'so-du',
                                onChange: () => setTuyChinhType('so-du'),
                                className: 'w-4 h-4 accent-[#006B68]'
                            }),
                            e('span', { className: 'text-sm font-medium text-gray-800' }, 'Áp dụng theo số dư')
                        ),
                        tuyChinhType === 'so-du' && e('div', { className: 'px-4 py-4 bg-white border-t border-gray-200 space-y-4' },
                            tuyChinhMocList.map((moc, idx) =>
                                e('div', { key: idx, className: 'space-y-2' },
                                    e('div', { className: 'text-sm text-gray-500' }, 'Mốc dư nợ #' + (idx + 1)),
                                    e('div', { className: 'grid grid-cols-2 gap-4' },
                                        e('div', null,
                                            e('label', { className: 'block text-xs text-gray-500 mb-1' }, 'Số dư từ (triệu VNĐ)'),
                                            e('input', {
                                                type: 'text',
                                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                                placeholder: 'Ví dụ: 5000',
                                                value: moc.soDu,
                                                onChange: (ev) => {
                                                    const updated = [...tuyChinhMocList];
                                                    updated[idx].soDu = ev.target.value;
                                                    setTuyChinhMocList(updated);
                                                }
                                            })
                                        ),
                                        e('div', null,
                                            e('label', { className: 'block text-xs text-gray-500 mb-1' }, 'Mức tỷ lệ là (%)'),
                                            e('input', {
                                                type: 'text',
                                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm',
                                                placeholder: 'Ví dụ: 80',
                                                value: moc.tyLe,
                                                onChange: (ev) => {
                                                    const updated = [...tuyChinhMocList];
                                                    updated[idx].tyLe = ev.target.value;
                                                    setTuyChinhMocList(updated);
                                                }
                                            })
                                        )
                                    )
                                )
                            ),
                            e('button', {
                                className: 'w-full py-2.5 border border-[#006B68] text-[#006B68] rounded-lg text-sm hover:bg-[#e6f4f1] flex items-center justify-center gap-2',
                                onClick: () => setTuyChinhMocList([...tuyChinhMocList, { ngay: '', tyLe: '', soDu: '' }])
                            },
                                e('i', { className: 'fas fa-plus text-xs' }),
                                'Thêm mốc dư nợ'
                            )
                        )
                    )
                ),
                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3' },
                    e('button', {
                        className: 'px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50',
                        onClick: () => {
                            setShowTuyChinhModal(false);
                            setTuyChinhMocList([{ ngay: '', tyLe: '', soDu: '' }]);
                        }
                    }, 'Hủy'),
                    e('button', {
                        className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005a57]',
                        onClick: () => {
                            // Cập nhật commitment với tùy chỉnh
                            const updatedList = commitmentList.map(c => {
                                if (c.id === selectedCommitmentForTuyChinh.id) {
                                    return {
                                        ...c,
                                        tuyChinh: {
                                            type: tuyChinhType,
                                            moc: tuyChinhMocList
                                        }
                                    };
                                }
                                return c;
                            });
                            setCommitmentList(updatedList);
                            setShowTuyChinhModal(false);
                            setTuyChinhMocList([{ ngay: '', tyLe: '', soDu: '' }]);
                        }
                    }, 'Lưu')
                )
            )
        ),

        // ===== MODAL CHỈNH SỬA TSĐB DỰ KIẾN =====
        showEditTSDBDuKienModal && e('div', { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
            e('div', { className: 'bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4' },
                // Header
                e('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-gray-200' },
                    e('div', null,
                        e('h3', { className: 'text-lg font-semibold text-gray-800' }, 'Chỉnh sửa TSĐB dự kiến'),
                        e('p', { className: 'text-sm text-gray-500 mt-1' }, 'Cập nhật thông tin tài sản bảo đảm dự kiến')
                    ),
                    e('button', {
                        className: 'p-1.5 text-gray-400 hover:text-gray-600',
                        onClick: () => setShowEditTSDBDuKienModal(false)
                    },
                        e('i', { className: 'fas fa-times' })
                    )
                ),
                // Body
                e('div', { className: 'px-6 py-5 space-y-4' },
                    // Tên TSĐB
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Tên TSĐB ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('input', {
                            type: 'text',
                            className: 'w-full px-4 py-2.5 border border-[#006B68] rounded-lg text-sm bg-[#fffbe6] focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            value: editTSDBDuKienData.tenTSDB,
                            onChange: (ev) => setEditTSDBDuKienData({ ...editTSDBDuKienData, tenTSDB: ev.target.value })
                        })
                    ),
                    // Loại TSĐB cấp 1
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Loại TSĐB cấp 1 ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('select', {
                            className: 'w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            value: editTSDBDuKienData.loaiCap1,
                            onChange: (ev) => setEditTSDBDuKienData({ ...editTSDBDuKienData, loaiCap1: ev.target.value })
                        },
                            e('option', { value: '' }, '-- Chọn loại TSĐB --'),
                            e('option', { value: 'Bất động sản' }, 'Bất động sản'),
                            e('option', { value: 'Động sản' }, 'Động sản'),
                            e('option', { value: 'Giấy tờ có giá' }, 'Giấy tờ có giá'),
                            e('option', { value: 'Phương tiện vận tải' }, 'Phương tiện vận tải'),
                            e('option', { value: 'Máy móc thiết bị' }, 'Máy móc thiết bị'),
                            e('option', { value: 'Quyền đòi nợ' }, 'Quyền đòi nợ')
                        )
                    ),
                    // Mô tả TSĐB
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Mô tả TSĐB'),
                        e('input', {
                            type: 'text',
                            className: 'w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            value: editTSDBDuKienData.moTa,
                            onChange: (ev) => setEditTSDBDuKienData({ ...editTSDBDuKienData, moTa: ev.target.value })
                        })
                    ),
                    // Giá trị dự kiến
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                            'Giá trị dự kiến (triệu VNĐ) ',
                            e('span', { className: 'text-red-500' }, '*')
                        ),
                        e('input', {
                            type: 'text',
                            className: 'w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            value: editTSDBDuKienData.giaTri,
                            onChange: (ev) => setEditTSDBDuKienData({ ...editTSDBDuKienData, giaTri: ev.target.value })
                        })
                    ),
                    // Ghi chú
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Ghi chú'),
                        e('input', {
                            type: 'text',
                            className: 'w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            value: editTSDBDuKienData.ghiChu,
                            onChange: (ev) => setEditTSDBDuKienData({ ...editTSDBDuKienData, ghiChu: ev.target.value })
                        })
                    ),
                    // Đề xuất
                    e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, 'Đề xuất'),
                        e('select', {
                            className: 'w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                            value: editTSDBDuKienData.deXuat,
                            onChange: (ev) => setEditTSDBDuKienData({ ...editTSDBDuKienData, deXuat: ev.target.value })
                        },
                            e('option', { value: 'Thêm mới' }, 'Thêm mới'),
                            e('option', { value: 'Giữ nguyên' }, 'Giữ nguyên'),
                            e('option', { value: 'Xóa bỏ' }, 'Xóa bỏ')
                        )
                    )
                ),
                // Footer
                e('div', { className: 'px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3' },
                    e('button', {
                        className: 'px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50',
                        onClick: () => setShowEditTSDBDuKienModal(false)
                    }, 'Hủy'),
                    e('button', {
                        className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005a57]',
                        onClick: handleUpdateTSDBDuKien
                    }, 'Cập nhật')
                )
            )
        )
    );
};
