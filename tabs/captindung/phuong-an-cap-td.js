// =====================================================
// Tab: Phương án cấp tín dụng
// =====================================================

window.TabPhuongAnCapTD = function () {
    const e = React.createElement;

    // States
    const [showModal, setShowModal] = React.useState(false);
    const [showHoSoModal, setShowHoSoModal] = React.useState(false);
    const [showPDFViewer, setShowPDFViewer] = React.useState(false);
    const [showRRMTPDFViewer, setShowRRMTPDFViewer] = React.useState(false);
    const [showTomTatModal, setShowTomTatModal] = React.useState(false);
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [phuongAnList, setPhuongAnList] = React.useState([]);
    const [activePhuongAn, setActivePhuongAn] = React.useState(null);
    const [expandedSections, setExpandedSections] = React.useState([
        'thongTin_nganHan', 'danhGiaHoSo_nganHan', 'danhGiaPhuongAn_nganHan',
        'thongTin_trungDaiHan', 'danhGiaHoSo_trungDaiHan', 'danhGiaPhuongAn_trungDaiHan', 'ketLuan_trungDaiHan',
        'thongTin_toChucTinDung', 'danhGiaHoSo_toChucTinDung', 'danhGiaPhuongAn_toChucTinDung'
    ]);

    // Collapsible state for merged sections
    const [ctdOpen, setCtdOpen] = React.useState({});
    const toggleCtd = (key) => setCtdOpen(prev => ({ ...prev, [key]: !prev[key] }));
    const isCtdOpen = (key) => !!ctdOpen[key];
    const [expandedHoSoCategories, setExpandedHoSoCategories] = React.useState(['phapLy', 'khachHang']);
    const [selectedHoSo, setSelectedHoSo] = React.useState([]);
    const [confirmedHoSo, setConfirmedHoSo] = React.useState([]);
    const [activePDFIndex, setActivePDFIndex] = React.useState(0);
    const [activeTomTatId, setActiveTomTatId] = React.useState(null);
    const [tomTatTexts, setTomTatTexts] = React.useState({});
    const [showToast, setShowToast] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState('');
    const [isEditMode, setIsEditMode] = React.useState(true);
    const [attachedFiles, setAttachedFiles] = React.useState([]);
    const fileInputRef = React.useRef(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const [duAnQlrrMt, setDuAnQlrrMt] = React.useState('khong');
    const rrmtReportName = 'Bao cao danh gia RRMT & XH.pdf';
    const rrmtReportUrl = './' + encodeURIComponent(rrmtReportName);

    // Handle file upload
    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        const maxSize = 10 * 1024 * 1024; // 10MB
        const validFiles = files.filter(file => file.size <= maxSize);

        if (validFiles.length < files.length) {
            setToastMessage('Một số file vượt quá 10MB đã bị bỏ qua');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }

        const newFiles = validFiles.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
            url: URL.createObjectURL(file)
        }));

        setAttachedFiles(prev => [...prev, ...newFiles]);
        event.target.value = ''; // Reset input
    };

    // Remove attached file
    const removeAttachedFile = (fileId) => {
        setAttachedFiles(prev => prev.filter(f => f.id !== fileId));
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    // Get file icon based on type
    const getFileIcon = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase();
        if (['pdf'].includes(ext)) return 'fa-file-pdf text-red-500';
        if (['doc', 'docx'].includes(ext)) return 'fa-file-word text-blue-600';
        if (['xls', 'xlsx'].includes(ext)) return 'fa-file-excel text-green-600';
        if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'fa-file-image text-purple-500';
        return 'fa-file text-gray-500';
    };

    // Form states
    const [formData, setFormData] = React.useState({
        tenPhuongAn: '',
        thongTinChung: '',
        danhGiaNhuCau: '',
        yKienDanhGia: 'day-du',
        ghiChu: '',
        nhuCauTinDung: 'hop-phap',
        tinhKhaThi: 'kha-thi',
        khaNangThucHien: 'dam-bao'
    });

    // ========== COMPONENT: THÔNG TIN PHƯƠNG ÁN NGẮN HẠN (PRE-FILLED, LOCKED) ==========
    function ThongTinPhuongAnNganHan() {
        const [xemThem, setXemThem] = React.useState(false);

        const tenPA = 'Tài trợ vốn thi công gói thầu EPC – Dự án phát triển mỏ dầu khí ngoài khơi (ONGC, Ấn Độ) (gói thầu: thiết kế, mua sắm, chế tạo, lắp đặt Topside & Jacket)';

        return e('div', { className: 'space-y-4' },
            // Tên phương án – locked
            e('div', null,
                e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1' },
                    'Tên phương án ', e('span', { className: 'text-red-500' }, '*')
                ),
                e('div', {
                    className: 'w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 flex items-start gap-2',
                    style: { cursor: 'not-allowed' }
                },
                    e('i', { className: 'fas fa-lock text-gray-300 text-xs mt-0.5 flex-shrink-0' }),
                    e('span', null, tenPA)
                )
            ),

            // Thông tin chung – locked với rich content + Xem thêm
            e('div', null,
                e('label', { className: 'block text-sm font-semibold text-gray-700 mb-2' }, 'Thông tin chung'),
                e('div', {
                    className: 'bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 space-y-2',
                    style: { cursor: 'not-allowed' }
                },
                    // Mục đích sử dụng vốn (luôn hiện)
                    e('div', { className: 'flex items-start gap-2' },
                        e('span', { className: 'text-[#006B68] font-bold mt-0.5 flex-shrink-0' }, '•'),
                        e('span', null,
                            e('strong', null, 'Mục đích sử dụng vốn:'),
                            ' Tài trợ chi phí chế tạo, mua sắm vật tư, thiết bị phục vụ thi công gói thầu EPC, bao gồm các hạng mục: thiết kế, gia công, vận chuyển, lắp đặt kết cấu ngoài khơi.'
                        )
                    ),

                    // Mô tả phương án (luôn hiện – đến đây mới bấm Xem thêm)
                    e('div', { className: 'flex items-start gap-2' },
                        e('span', { className: 'text-[#006B68] font-bold mt-0.5 flex-shrink-0' }, '•'),
                        e('div', null,
                            e('strong', null, 'Mô tả phương án'),
                            e('div', { className: 'ml-2 mt-1 space-y-1' },
                                e('div', { className: 'flex items-start gap-2' },
                                    e('span', { className: 'text-gray-400 flex-shrink-0' }, 'o'),
                                    e('span', null, 'Khách hàng thực hiện ',
                                        e('strong', null, 'hợp đồng EPC'),
                                        ' với đối tác nước ngoài (ONGC – Ấn Độ)'
                                    )
                                ),
                                e('div', { className: 'flex items-start gap-2' },
                                    e('span', { className: 'text-gray-400 flex-shrink-0' }, 'o'),
                                    e('span', null, 'Phạm vi:')
                                ),
                                e('div', { className: 'ml-6 space-y-0.5' },
                                    e('div', { className: 'flex items-center gap-2' },
                                        e('span', { className: 'text-gray-500 text-xs' }, '▪'),
                                        'Thiết kế, mua sắm vật tư'
                                    ),
                                    e('div', { className: 'flex items-center gap-2' },
                                        e('span', { className: 'text-gray-500 text-xs' }, '▪'),
                                        'Chế tạo, lắp dựng Topside & Jacket'
                                    )
                                ),
                                e('div', { className: 'flex items-start gap-2' },
                                    e('span', { className: 'text-gray-400 flex-shrink-0' }, 'o'),
                                    e('span', null,
                                        'Tổng giá trị hợp đồng: khoảng ',
                                        e('strong', null, '115,76 triệu USD (~3.068 tỷ VND)')
                                    )
                                )
                            )
                        )
                    ),

                    // NÚT XEM THÊM / THU GỌN
                    e('div', { className: 'pt-1' },
                        e('button', {
                            className: 'flex items-center gap-1.5 text-xs font-semibold text-[#006B68] hover:text-[#004e4b] transition-colors',
                            onClick: () => setXemThem(!xemThem)
                        },
                            e('i', { className: 'fas fa-' + (xemThem ? 'chevron-up' : 'chevron-down') + ' text-[10px]' }),
                            xemThem ? 'Thu gọn' : 'Xem thêm'
                        )
                    ),

                    // NỘI DUNG MỞ RỘNG (chỉ hiện khi xemThem = true)
                    xemThem && e('div', { className: 'space-y-2 pt-1 border-t border-dashed border-gray-200 mt-1' },

                        // Tiến độ dự án
                        e('div', { className: 'flex items-start gap-2' },
                            e('span', { className: 'text-[#006B68] font-bold mt-0.5 flex-shrink-0' }, '•'),
                            e('div', null,
                                e('strong', null, 'Tiến độ dự án'),
                                e('div', { className: 'ml-2 mt-1 space-y-1' },
                                    e('div', { className: 'flex items-start gap-2' },
                                        e('span', { className: 'text-gray-400 flex-shrink-0' }, 'o'),
                                        e('span', null,
                                            'Thời gian thực hiện: đến ',
                                            e('strong', null, '31/05/2026')
                                        )
                                    ),
                                    e('div', { className: 'flex items-start gap-2' },
                                        e('span', { className: 'text-gray-400 flex-shrink-0' }, 'o'),
                                        'Giải ngân theo tiến độ/milestone hợp đồng'
                                    ),
                                    e('div', { className: 'flex items-start gap-2' },
                                        e('span', { className: 'text-gray-400 flex-shrink-0' }, 'o'),
                                        e('span', null, 'Thời hạn vay tối đa: ~ ', e('strong', null, '06 tháng/khoản vay'))
                                    )
                                )
                            )
                        ),

                        // Nguồn trả nợ chính
                        e('div', { className: 'flex items-start gap-2' },
                            e('span', { className: 'text-[#006B68] font-bold mt-0.5 flex-shrink-0' }, '•'),
                            e('span', null,
                                e('strong', null, 'Nguồn trả nợ chính:'),
                                ' Dòng tiền từ hợp đồng'
                            )
                        ),

                        // Nguồn trả nợ khác
                        e('div', { className: 'flex items-start gap-2' },
                            e('span', { className: 'text-[#006B68] font-bold mt-0.5 flex-shrink-0' }, '•'),
                            e('div', null,
                                e('strong', null, 'Nguồn trả nợ khác:'),
                                e('div', { className: 'ml-2 mt-1 space-y-1' },
                                    e('div', { className: 'flex items-start gap-2' },
                                        e('span', { className: 'text-gray-400 flex-shrink-0' }, 'o'),
                                        'Dòng tiền từ hoạt động SXKD khác'
                                    ),
                                    e('div', { className: 'flex items-start gap-2' },
                                        e('span', { className: 'text-gray-400 flex-shrink-0' }, 'o'),
                                        'Vốn tự có/tích lũy'
                                    )
                                )
                            )
                        ),

                        // Dòng cuối
                        e('div', { className: 'text-gray-600 text-xs pl-1' },
                            'Nguồn thu từ các hợp đồng khác'
                        )
                    )
                )
            )
        );
    }

    // ========== COMPONENT: THÔNG TIN PHƯƠNG ÁN TRUNG DÀI HẠN ==========
    function ThongTinPhuongAnTrungDaiHan(props) {
        const tenPA = 'Khu dân cư Bắc Thị trấn Cao Thượng, huyện Tân Yên, tỉnh Bắc Giang';
        const [xemThem, setXemThem] = React.useState(false);
        const duAnQlrrMt = props && props.duAnQlrrMt ? props.duAnQlrrMt : 'khong';
        const setDuAnQlrrMt = props && props.setDuAnQlrrMt ? props.setDuAnQlrrMt : function () {};
        const shouldShowQlrrMtFiles = duAnQlrrMt !== 'khong';

        return e('div', { className: 'space-y-4' },
            e('div', null,
                e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1' },
                    'Tên phương án ', e('span', { className: 'text-red-500' }, '*')
                ),
                e('div', {
                    className: 'w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 flex items-start gap-2',
                    style: { cursor: 'not-allowed' }
                },
                    e('i', { className: 'fas fa-lock text-gray-300 text-xs mt-0.5 flex-shrink-0' }),
                    e('span', null, tenPA)
                )
            ),

            e('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
                e('div', null,
                    e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1' }, 'Địa điểm thực hiện'),
                    e('div', { className: 'px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800' },
                        'Xã Liên Sơn và thị trấn Cao Thượng'
                    )
                ),
                e('div', null,
                    e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1' }, 'Địa chỉ chi tiết'),
                    e('div', { className: 'px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800' },
                        'huyện Tân Yên, tỉnh Bắc Giang'
                    )
                )
            ),

            e('div', null,
                e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1' },
                    'Dự án QLRR môi trường ', e('span', { className: 'text-red-500' }, '*')
                ),
                e('div', {
                    className: 'flex flex-wrap items-center gap-3 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm'
                },
                    e('select', {
                        className: 'px-3 py-1.5 bg-white border border-gray-200 rounded-md text-[#8a1f1f] font-semibold focus:outline-none focus:border-[#006B68]',
                        value: duAnQlrrMt,
                        onChange: ev => setDuAnQlrrMt(ev.target.value)
                    },
                        e('option', { value: 'khong' }, 'Không'),
                        e('option', { value: 'nhom-i' }, 'Nhóm I'),
                        e('option', { value: 'nhom-ii' }, 'Nhóm II'),
                        e('option', { value: 'nhom-iii' }, 'Nhóm III'),
                        e('option', { value: 'nhom-iv' }, 'Nhóm IV')
                    ),
                    shouldShowQlrrMtFiles && e('div', { className: 'flex flex-wrap items-center gap-2' },
                        e('button', {
                            type: 'button',
                            className: 'inline-flex min-w-0 max-w-[340px] items-center gap-2 px-3 py-1.5 bg-white border border-[#b8d7d4] rounded-md text-xs font-semibold text-[#006B68] hover:bg-[#f3fbfa] hover:border-[#006B68] transition-colors',
                            title: rrmtReportName,
                            onClick: () => setShowRRMTPDFViewer(true)
                        },
                            e('i', { className: 'fas fa-file-pdf text-red-500 text-sm flex-shrink-0' }),
                            e('span', { className: 'truncate' }, rrmtReportName),
                            e('i', { className: 'fas fa-eye text-[#006B68] text-xs flex-shrink-0' })
                        ),
                        e('a', {
                            href: rrmtReportUrl,
                            download: rrmtReportName,
                            className: 'inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-semibold text-[#64748b] hover:text-[#006B68] hover:border-[#006B68] transition-colors'
                        },
                            e('i', { className: 'fas fa-download' }),
                            'Tải xuống'
                        )
                    )
                )
            ),

            e('div', null,
                e('label', { className: 'block text-sm font-semibold text-gray-700 mb-2' }, 'Thông tin chung'),
                e('div', {
                    className: 'bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 space-y-3',
                    style: { cursor: 'not-allowed' }
                },
                    e('p', { className: 'leading-relaxed' },
                        'Dự án đầu tư xây dựng khu dân cư với quy mô ~11,17 ha, phát triển các sản phẩm đất ở liền kề, đất nhà ở kết hợp thương mại dịch vụ, đất công cộng và hạ tầng kỹ thuật đồng bộ. Chủ đầu tư là Công ty Cổ phần Hawee Bất động sản - doanh nghiệp hoạt động trong lĩnh vực phát triển dự án bất động sản, có kinh nghiệm triển khai các dự án nhà ở và hạ tầng.'
                    ),
                    e('div', { className: 'flex items-start gap-2' },
                        e('span', { className: 'text-[#006B68] font-bold mt-0.5 flex-shrink-0' }, '•'),
                        e('span', null,
                            e('strong', null, 'Mục đích sử dụng vốn: '),
                            'Thanh toán các chi phí hợp pháp phục vụ thực hiện dự án (bao gồm chi phí đầu tư xây dựng, hạ tầng, chi phí liên quan trong quá trình thi công; không bao gồm chi phí giải phóng mặt bằng).'
                        )
                    ),
                    e('div', { className: 'flex items-start gap-2' },
                        e('span', { className: 'text-[#006B68] font-bold mt-0.5 flex-shrink-0' }, '•'),
                        e('span', null,
                            e('strong', null, 'Mô tả phương án: '),
                            'Phương án cấp tín dụng nhằm tài trợ dự án khu dân cư Bắc Thị trấn Cao Thượng với tổng mức đầu tư ~449 tỷ đồng; BIDV tham gia tài trợ tối đa 290 tỷ đồng (~64,6% TMĐT). Dự án phát triển quỹ đất ở thương mại có tính thanh khoản cao, phục vụ nhu cầu nhà ở khu vực Tân Yên - Bắc Giang, đồng thời tận dụng xu hướng phát triển đô thị và hạ tầng khu vực Đông Bắc.'
                        )
                    ),
                    xemThem && e(React.Fragment, null,
                    e('div', { className: 'flex items-start gap-2' },
                        e('span', { className: 'text-[#006B68] font-bold mt-0.5 flex-shrink-0' }, '•'),
                        e('div', null,
                            e('strong', null, 'Tiến độ thực hiện:'),
                            e('div', { className: 'ml-2 mt-1 space-y-1' },
                                ['Hoàn thành GPMB: ~6/2024', 'Hoàn thành hạ tầng kỹ thuật: dự kiến 10/2025', 'Bắt đầu khai thác/bán hàng: từ 2025', 'Dự kiến hoàn thành & vận hành: 2026-2027'].map((text, idx) =>
                                    e('div', { key: idx, className: 'flex items-start gap-2' },
                                        e('span', { className: 'text-gray-400 flex-shrink-0' }, 'o'),
                                        e('span', null, text)
                                    )
                                )
                            )
                        )
                    ),
                    e('div', { className: 'flex items-start gap-2' },
                        e('span', { className: 'text-[#006B68] font-bold mt-0.5 flex-shrink-0' }, '•'),
                        e('span', null,
                            e('strong', null, 'Nguồn trả nợ chính: '),
                            'Dòng tiền từ bán sản phẩm bất động sản của dự án (đất ở liền kề, đất thương mại dịch vụ) theo tiến độ bán hàng.'
                        )
                    ),
                    e('div', { className: 'flex items-start gap-2' },
                        e('span', { className: 'text-[#006B68] font-bold mt-0.5 flex-shrink-0' }, '•'),
                        e('div', null,
                            e('strong', null, 'Nguồn trả nợ khác:'),
                            e('div', { className: 'ml-2 mt-1 space-y-1' },
                                ['Dòng tiền từ hoạt động kinh doanh khác của khách hàng', 'Nguồn thu từ các dự án/hoạt động khác trong hệ sinh thái doanh nghiệp', 'Khả năng hỗ trợ tài chính từ cổ đông/chủ sở hữu khi cần thiết'].map((text, idx) =>
                                    e('div', { key: idx, className: 'flex items-start gap-2' },
                                        e('span', { className: 'text-gray-400 flex-shrink-0' }, 'o'),
                                        e('span', null, text)
                                    )
                                )
                            )
                        )
                    )
                    ),
                    e('button', {
                        type: 'button',
                        onClick: () => setXemThem(!xemThem),
                        className: 'inline-flex items-center gap-1.5 text-xs font-semibold text-[#006B68] hover:text-[#004f4d] transition-colors'
                    },
                        e('i', { className: `fas fa-chevron-${xemThem ? 'up' : 'down'} text-[10px]` }),
                        xemThem ? 'Thu gọn' : 'Xem thêm'
                    )
                )
            )
        );
    }

    // ========== COMPONENT: HỒ SƠ PHƯƠNG ÁN NGẮN HẠN ==========
    function HoSoPhuongAnNganHan() {
        // Sub-panel collapse states
        const [bpdxOpen, setBpdxOpen] = React.useState(false);
        const [tdrrOpen, setTdrrOpen] = React.useState(true);

        // BPTĐRR state
        const [danhGiaHS, setDanhGiaHS] = React.useState(null); // 'day-du' | 'can-bo-sung'
        const [nhanXet, setNhanXet] = React.useState('');
        const [boSungRows, setBoSungRows] = React.useState([
            { id: 1, tenTaiLieu: '', hinhThuc: '', thoiDiem: '' }
        ]);

        const addBoSungRow = () => setBoSungRows(prev => [...prev, { id: Date.now(), tenTaiLieu: '', hinhThuc: '', thoiDiem: '' }]);
        const removeBoSungRow = (id) => boSungRows.length > 1 && setBoSungRows(prev => prev.filter(r => r.id !== id));
        const updateBoSungRow = (id, field, val) => setBoSungRows(prev => prev.map(r => r.id === id ? { ...r, [field]: val } : r));

        // Pre-filled data for BP Đề xuất (LOCKED)
        const bpdxDocs = [
            { id: 1, tenVanBan: 'Báo cáo khả thi phương án sản xuất linh kiện điện tử', icon: true, soVanBan: '11212123', ngayBanHanh: '20/11/2022', donViBanHanh: 'BIDV CN Đồng Đô - Hà Nội', noiDungLuuY: 'Phương án cấp tín dụng dài hạn là kế hoạch vay vốn trung...' },
            { id: 2, tenVanBan: 'Đề nghị vay vốn mở rộng nhà máy', icon: true, soVanBan: '12334343', ngayBanHanh: '20/11/2023', donViBanHanh: 'Trụ sở chính - Hà Nội', noiDungLuuY: '-' }
        ];
        const bpdxYKienBoSung = 'Phương án cấp tín dụng dài hạn là kế hoạch vay vốn trung dài hạn từ ACB (trên 5 năm) hoặc trung hạn (1-5 năm) để tài trợ dự án lớn, mở rộng sản xuất,...';

        return e('div', { className: 'space-y-0 rounded-lg overflow-hidden border border-gray-200' },

            // ── Sub-panel 1: Ý kiến Bộ phận đề xuất (LOCKED) ──
            e('div', { className: 'border-b border-gray-200' },
                // Header
                e('div', {
                    className: 'pa-subtitle cursor-pointer select-none',
                    onClick: () => setBpdxOpen(!bpdxOpen)
                },
                    e('div', { className: 'pa-subtitle-main' },
                        e('span', { className: 'subpanel-title-icon subpanel-icon-opinion' },
                            e('i', { className: 'fas fa-lightbulb' })
                        ),
                        e('span', null, 'Ý kiến Bộ phận đề xuất'),
                        e('span', { className: 'pa-status-badge flex items-center gap-1' },
                            e('i', { className: 'fas fa-check text-emerald-500 text-[10px]' }),
                            'Đầy đủ, hợp lệ'
                        )
                    ),
                    e('div', { className: 'flex items-center gap-2' },
                        e('i', { className: 'fas fa-lock text-gray-300 text-xs' }),
                        e('i', { className: 'fas fa-chevron-' + (bpdxOpen ? 'up' : 'down') + ' text-gray-400 text-xs' })
                    )
                ),
                // Content (expanded)
                bpdxOpen && e('div', { className: 'px-4 pb-4 pt-3 bg-white space-y-3 border-t border-gray-100' },
                    // Bảng hồ sơ
                    e('div', null,
                        e('p', { className: 'text-sm font-medium text-gray-700 mb-2' }, 'Nội dung lưu ý trong hồ sơ PA'),
                        e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                            e('table', { className: 'w-full text-sm' },
                                e('thead', null,
                                    e('tr', { className: 'bg-gray-100 text-left' },
                                        e('th', { className: 'px-3 py-2 text-gray-500 font-medium w-10 border-r border-gray-200' }, 'STT'),
                                        e('th', { className: 'px-3 py-2 text-gray-500 font-medium border-r border-gray-200' }, 'Tên văn bản'),
                                        e('th', { className: 'px-3 py-2 text-gray-500 font-medium w-28 border-r border-gray-200' }, 'Số văn bản'),
                                        e('th', { className: 'px-3 py-2 text-gray-500 font-medium w-28 border-r border-gray-200' }, 'Ngày ban hành'),
                                        e('th', { className: 'px-3 py-2 text-gray-500 font-medium w-40 border-r border-gray-200' }, 'Đơn vị ban hành'),
                                        e('th', { className: 'px-3 py-2 text-gray-500 font-medium' }, 'Nội dung lưu ý')
                                    )
                                ),
                                e('tbody', null,
                                    bpdxDocs.map((doc, idx) =>
                                        e('tr', { key: doc.id, className: 'border-t border-gray-200 hover:bg-white/80' },
                                            e('td', { className: 'px-3 py-2.5 text-center text-gray-600 border-r border-gray-200' }, idx + 1),
                                            e('td', { className: 'px-3 py-2.5 border-r border-gray-200' },
                                                e('div', { className: 'flex items-center gap-1.5' },
                                                    e('span', { className: 'text-gray-800' }, doc.tenVanBan),
                                                    doc.icon && e('i', { className: 'fas fa-external-link-alt text-[#006B68] text-xs cursor-pointer hover:opacity-70', title: 'Xem tài liệu' })
                                                )
                                            ),
                                            e('td', { className: 'px-3 py-2.5 text-gray-600 border-r border-gray-200' }, doc.soVanBan),
                                            e('td', { className: 'px-3 py-2.5 text-gray-600 border-r border-gray-200' }, doc.ngayBanHanh),
                                            e('td', { className: 'px-3 py-2.5 text-gray-600 border-r border-gray-200' }, doc.donViBanHanh),
                                            e('td', { className: 'px-3 py-2.5 text-gray-500 text-xs italic' }, doc.noiDungLuuY)
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    // Ý kiến bổ sung (locked)
                    e('div', null,
                        e('p', { className: 'text-sm font-medium text-gray-700 mb-1.5' }, 'Ý kiến bổ sung'),
                        e('div', {
                            className: 'px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 italic',
                            style: { cursor: 'not-allowed' }
                        },
                            e('i', { className: 'fas fa-lock text-gray-300 text-xs mr-1.5' }),
                            bpdxYKienBoSung
                        )
                    )
                )
            ),

            // ── Sub-panel 2: Ý kiến Bộ phận Thẩm định rủi ro (EDITABLE) ──
            e('div', null,
                // Header
                e('div', {
                    className: 'pa-subtitle cursor-pointer select-none',
                    onClick: () => setTdrrOpen(!tdrrOpen)
                },
                    e('div', { className: 'pa-subtitle-main' },
                        e('span', { className: 'subpanel-title-icon subpanel-icon-review' },
                            e('i', { className: 'fas fa-clipboard-check' })
                        ),
                        e('span', null, 'Ý kiến Bộ phận Thẩm định rủi ro')
                    ),
                    e('i', { className: 'fas fa-chevron-' + (tdrrOpen ? 'up' : 'down') + ' text-gray-400 text-xs' })
                ),
                // Content
                tdrrOpen && e('div', { className: 'px-4 pb-4 pt-3 space-y-4 border-t border-gray-100 bg-white' },

                    // Đánh giá hồ sơ phương án – checkbox group
                    e('div', { className: 'pa-assessment-row' },
                        e('span', { className: 'pa-assessment-title' },
                            e('i', { className: 'fas fa-clipboard-check' }),
                            'Đánh giá hồ sơ phương án ', e('span', { className: 'text-red-500' }, '*')
                        ),
                        // Đầy đủ, hợp lệ
                        e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                            e('input', {
                                type: 'checkbox',
                                className: 'w-4 h-4 rounded border-gray-300',
                                checked: danhGiaHS === 'day-du',
                                onChange: () => setDanhGiaHS('day-du')
                            }),
                            e('span', { className: 'text-sm text-gray-700' }, 'Đầy đủ, hợp lệ')
                        ),
                        // Cần bổ sung
                        e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                            e('input', {
                                type: 'checkbox',
                                className: 'w-4 h-4 rounded border-gray-300',
                                checked: danhGiaHS === 'can-bo-sung',
                                onChange: () => setDanhGiaHS('can-bo-sung')
                            }),
                            e('span', { className: 'text-sm text-gray-700' }, 'Cần bổ sung')
                        )
                    ),

                    // Ý kiến bổ sung (chỉ hiện khi Cần bổ sung)
                    danhGiaHS === 'can-bo-sung' && e('div', { className: 'space-y-3 p-3 bg-amber-50/60 rounded-lg border border-amber-200' },
                        e('div', { className: 'flex items-center gap-2 text-xs text-amber-700 font-semibold' },
                            e('i', { className: 'fas fa-exclamation-triangle text-amber-500' }),
                            'Hồ sơ cần bổ sung'
                        ),
                        // Bảng hồ sơ cần bổ sung
                        e('div', { className: 'border border-amber-200 rounded-lg overflow-hidden bg-white' },
                            e('table', { className: 'w-full text-sm' },
                                e('thead', null,
                                    e('tr', { className: 'bg-amber-50 text-left' },
                                        e('th', { className: 'px-3 py-2 text-amber-700 font-medium w-10 border-r border-amber-200' }, 'STT'),
                                        e('th', { className: 'px-3 py-2 text-amber-700 font-medium border-r border-amber-200' }, 'Tên tài liệu'),
                                        e('th', { className: 'px-3 py-2 text-amber-700 font-medium w-36 border-r border-amber-200' }, 'Hình thức tài liệu'),
                                        e('th', { className: 'px-3 py-2 text-amber-700 font-medium w-44' }, 'Thời điểm bổ sung'),
                                        e('th', { className: 'px-3 py-2 w-10' })
                                    )
                                ),
                                e('tbody', null,
                                    boSungRows.map((row, idx) =>
                                        e('tr', { key: row.id, className: 'border-t border-amber-100' },
                                            e('td', { className: 'px-3 py-2 text-center text-gray-500 border-r border-amber-100' }, idx + 1),
                                            e('td', { className: 'px-3 py-2 border-r border-amber-100' },
                                                e('input', {
                                                    type: 'text',
                                                    className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#006B68] placeholder-gray-300 italic',
                                                    placeholder: '[Tài liệu cần bổ sung]',
                                                    value: row.tenTaiLieu,
                                                    onChange: ev => updateBoSungRow(row.id, 'tenTaiLieu', ev.target.value)
                                                })
                                            ),
                                            e('td', { className: 'px-3 py-2 border-r border-amber-100' },
                                                e('select', {
                                                    className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#006B68]',
                                                    value: row.hinhThuc,
                                                    onChange: ev => updateBoSungRow(row.id, 'hinhThuc', ev.target.value)
                                                },
                                                    e('option', { value: '' }, 'Chọn...'),
                                                    e('option', { value: 'ban-chinh' }, 'Bản chính'),
                                                    e('option', { value: 'ban-sao' }, 'Bản sao'),
                                                    e('option', { value: 'ban-scan' }, 'Bản scan')
                                                )
                                            ),
                                            e('td', { className: 'px-3 py-2' },
                                                e('select', {
                                                    className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#006B68]',
                                                    value: row.thoiDiem,
                                                    onChange: ev => updateBoSungRow(row.id, 'thoiDiem', ev.target.value)
                                                },
                                                    e('option', { value: '' }, 'Chọn thời điểm...'),
                                                    e('option', { value: 'truoc-ky-hdtd' }, 'Trước khi ký HĐTD'),
                                                    e('option', { value: 'truoc-giai-ngan' }, 'Trước lần giải ngân đầu tiên'),
                                                    e('option', { value: 'truoc-ngay-cu-the' }, 'Trước Ngày cụ thể...')
                                                )
                                            ),
                                            e('td', { className: 'px-3 py-2 text-center' },
                                                e('button', {
                                                    className: 'w-6 h-6 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors mx-auto',
                                                    onClick: () => removeBoSungRow(row.id)
                                                }, e('i', { className: 'fas fa-times text-xs' }))
                                            )
                                        )
                                    )
                                )
                            ),
                            e('div', { className: 'px-3 py-2 border-t border-amber-100' },
                                e('button', {
                                    className: 'text-amber-600 text-xs font-medium hover:text-amber-800 flex items-center gap-1',
                                    onClick: addBoSungRow
                                },
                                    e('i', { className: 'fas fa-plus text-[10px]' }), 'Thêm dòng'
                                )
                            )
                        )
                    ),

                    // Nhận xét, đánh giá (chỉ hiện khi Cần bổ sung)
                    danhGiaHS === 'can-bo-sung' && e('div', null,
                        e('label', { className: 'block text-sm font-medium text-gray-700 mb-1.5' }, 'Nhận xét, đánh giá'),
                        e('textarea', {
                            className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-[#006B68] resize-none',
                            rows: 3,
                            placeholder: 'Nhập nhận xét và đánh giá về hồ sơ phương án...',
                            value: nhanXet,
                            onChange: ev => setNhanXet(ev.target.value)
                        })
                    )
                )
            )
        );
    }

    // ========== COMPONENT: ĐÁNH GIÁ PHƯƠNG ÁN ==========
    function DanhGiaPhuongAnComponent(props) {
        const [bpdxOpen, setBpdxOpen] = React.useState(false);
        const [tdrrOpen, setTdrrOpen] = React.useState(true);

        // BP Thẩm định: 3 tiêu chí
        const criteria = [
            {
                key: 'nhuCau',
                title: 'Đánh giá ý kiến BP đề xuất về nhu cầu tín dụng',
                guide: '(1) Mục đích sử dụng vốn\n(2) Sự cần thiết của việc cấp tín dụng\n(3) Quy mô nhu cầu vốn\n(4) Mức độ phù hợp giữa nhu cầu tín dụng và phương án\n(5) Rủi ro liên quan đến nhu cầu tín dụng\n(6) Kết luận: Đưa ra nhận định tổng thể về tính hợp lý của nhu cầu tín dụng'
            },
            {
                key: 'khaThi',
                title: 'Đánh giá ý kiến BP đề xuất về tính khả thi phương án',
                guide: '(1) Thị trường đầu ra và khả năng tiêu thụ\n(2) Khả năng cung cấp đầu vào\n(3) Phương diện kỹ thuật\n(4) Phương diện tổ chức và quản lý\n(5) Rủi ro triển khai\n(6) Kết luận: Đưa ra nhận định tổng thể về tính khả thi của phương án'
            },
            {
                key: 'traNо',
                title: 'Đánh giá ý kiến BP đề xuất về hiệu quả, khả năng trả nợ',
                guide: '(1) Tổng mức đầu tư:\n(2) Phương án nguồn vốn:\n(3) Hiệu quả tài chính:\n(4) Dòng tiền và khả năng trả nợ:\n(5) Rủi ro tài chính: Nhận diện các rủi ro:\n(6) Kết luận:'
            }
        ];
        const financeCriterionKey = criteria[2].key;

        const initEval = () => Object.fromEntries(criteria.map(c => [c.key, { radio: null, text: '' }]));
        const [tdrrEvals, setTdrrEvals] = React.useState(initEval());
        const updateEval = (key, field, val) => setTdrrEvals(prev => ({ ...prev, [key]: { ...prev[key], [field]: val } }));
        const showMoiTruongXaHoi = props && props.showMoiTruongXaHoi;
        const selectBoSungEval = (criterion) => setTdrrEvals(prev => ({
            ...prev,
            [criterion.key]: {
                ...prev[criterion.key],
                radio: 'bo-sung',
                text: prev[criterion.key].text || criterion.guide
            }
        }));

        // File upload (tài liệu đánh giá)
        const defaultFileName = props && props.defaultFileName ? props.defaultFileName : 'Bảng tính Nhu cầu VLD.xlsx';
        const [tdrrFiles, setTdrrFiles] = React.useState([{ id: 1, name: defaultFileName, type: 'excel' }]);
        const tdrrFileRef = React.useRef(null);
        const financeCapitalRows = [
            ['Vốn chủ sở hữu', '159.000.000.000', '35,4%'],
            ['Vốn vay', '290.000.000.000', '64,6%'],
            ['Vốn khác', '-', '-'],
            ['Tổng nguồn vốn', '449.000.000.000', '100%']
        ];
        const financeMetricColumns = [
            [
                ['NPV-TIP', '128,4 tỷ'],
                ['IRR-TIP', '18,6%']
            ],
            [
                ['NPV-EPV', '74,2 tỷ'],
                ['IRR-EPV', '21,3%']
            ],
            [
                ['DSCR', '1,42x']
            ]
        ];
        const getTdrrFileType = (fileName) => {
            const ext = (fileName.split('.').pop() || '').toLowerCase();
            if (['xls', 'xlsx', 'csv'].includes(ext)) return 'excel';
            if (ext === 'pdf') return 'pdf';
            if (['doc', 'docx'].includes(ext)) return 'word';
            return 'file';
        };
        const getTdrrFileIconClass = (type) => {
            if (type === 'excel') return 'fas fa-file-excel text-green-600';
            if (type === 'pdf') return 'fas fa-file-pdf text-red-500';
            if (type === 'word') return 'fas fa-file-word text-blue-600';
            return 'fas fa-file text-gray-500';
        };
        const handleTdrrFileUpload = (event) => {
            const files = Array.from(event.target.files || []);
            if (!files.length) return;

            const newFiles = files.map(file => ({
                id: Date.now() + Math.random(),
                name: file.name,
                type: getTdrrFileType(file.name)
            }));

            setTdrrFiles(prev => [...prev, ...newFiles]);
            event.target.value = '';
        };
        // Pre-filled text for BP Đề xuất
        const sampleText = 'Phương án cấp tín dụng dài hạn là kế hoạch vay vốn trung dài hạn từ ACB (trên 5 năm) hoặc trung hạn (1-5 năm) để tài trợ dự án lớn, mở rộng sản xuất, mua sắm tài sản cố định, với đặc điểm thời gian trả nợ kéo dài, giảm áp lực tài chính, lãi suất thường thấp hơn, giải ngân linh hoạt và hỗ trợ phát triển kinh doanh lâu dài, yêu cầu khách hàng phải có phương án kinh doanh khả thi, tài chính lành mạnh và tuân thủ giới hạn cấp tín dụng theo quy định của pháp luật pháp luật ( Luật các tổ chức...';

        const bpdxCriteria = [
            { label: 'Đánh giá nhu cầu tín dụng' },
            { label: 'Đánh giá tính khả thi của phương án' },
            { label: 'Đánh giá hiệu quả và khả năng trả nợ của phương án' }
        ];

        return e('div', { className: 'space-y-0 rounded-lg overflow-hidden border border-gray-200' },

            // ── Sub-panel 1: Ý kiến Bộ phận đề xuất (LOCKED) ──
            e('div', { className: 'border-b border-gray-200' },
                e('div', {
                    className: 'pa-subtitle cursor-pointer select-none',
                    onClick: () => setBpdxOpen(!bpdxOpen)
                },
                    e('div', { className: 'pa-subtitle-main' },
                        e('span', { className: 'subpanel-title-icon subpanel-icon-opinion' },
                            e('i', { className: 'fas fa-lightbulb' })
                        ),
                        e('span', null, 'Ý kiến Bộ phận đề xuất')
                    ),
                    e('div', { className: 'flex items-center gap-2' },
                        e('i', { className: 'fas fa-lock text-gray-300 text-xs' }),
                        e('i', { className: 'fas fa-chevron-' + (bpdxOpen ? 'up' : 'down') + ' text-gray-400 text-xs' })
                    )
                ),
                bpdxOpen && e('div', { className: 'px-4 pb-4 pt-3 bg-white space-y-3 border-t border-gray-100' },
                    // 3 text blocks
                    bpdxCriteria.map((c, i) =>
                        e(XemThemBlock, { key: i, label: c.label, text: sampleText })
                    ),
                    // File row
                    e('div', { className: 'flex items-center gap-3 py-2 border-t border-dashed border-gray-200' },
                        e('i', { className: 'fas fa-file-pdf text-red-500 text-sm' }),
                        e('span', { className: 'text-sm text-gray-700 flex-1' }, 'Đề nghị vay vốn mở rộng nhà...'),
                        e('i', { className: 'fas fa-download text-gray-400 text-xs cursor-pointer hover:text-[#006B68]' }),
                        e('span', { className: 'text-sm text-[#006B68] cursor-pointer hover:underline' }, 'Xem thêm 12 tệp tin...')
                    ),
                    // RoRWA
                    e('div', { className: 'py-1 border-t border-dashed border-gray-200' },
                        e('span', { className: 'text-xs text-gray-500' }, 'RoRWA'),
                        e('div', { className: 'text-sm font-medium text-gray-800 mt-0.5' }, '1,298309')
                    ),
                    // 3 locked fields
                    e('div', { className: 'grid grid-cols-3 gap-4 border-t border-dashed border-gray-200 pt-3' },
                        e('div', null,
                            e('p', { className: 'text-xs text-gray-500 mb-0.5' }, 'Nhu cầu tín dụng'),
                            e('p', { className: 'text-sm font-medium text-gray-800' }, 'Hợp pháp')
                        ),
                        e('div', null,
                            e('p', { className: 'text-xs text-gray-500 mb-0.5' }, 'Tính khả thi của phương án tín dụng'),
                            e('p', { className: 'text-sm font-medium text-gray-800' }, 'Khả thi')
                        ),
                        e('div', null,
                            e('p', { className: 'text-xs text-gray-500 mb-0.5' }, 'Khả năng thực hiện nghĩa vụ của KH với BIDV'),
                            e('p', { className: 'text-sm font-bold text-gray-800' }, 'Đảm bảo')
                        )
                    )
                )
            ),

            // ── Sub-panel 2: Ý kiến Bộ phận Thẩm định (EDITABLE) ──
            e('div', null,
                e('div', {
                    className: 'pa-subtitle cursor-pointer select-none',
                    onClick: () => setTdrrOpen(!tdrrOpen)
                },
                    e('div', { className: 'pa-subtitle-main' },
                        e('span', { className: 'subpanel-title-icon subpanel-icon-review' },
                            e('i', { className: 'fas fa-clipboard-check' })
                        ),
                        e('span', null, 'Ý kiến Bộ phận thẩm định')
                    ),
                    e('i', { className: 'fas fa-chevron-' + (tdrrOpen ? 'up' : 'down') + ' text-gray-400 text-xs' })
                ),
                tdrrOpen && e('div', { className: 'px-4 pb-5 pt-3 space-y-5 border-t border-gray-100 bg-white' },

                    // 3 tiêu chí đánh giá
                    criteria.map(c =>
                        e(React.Fragment, { key: c.key },
                            e('div', { className: 'space-y-2 pb-4 border-b border-dashed border-gray-200 last:border-0 last:pb-0' },
                                e('div', { className: 'pa-criterion-title' },
                                    e('i', { className: 'fas fa-clipboard-check' }),
                                    e('span', null, c.title)
                                ),
                                // Radio group
                                e('div', { className: 'flex items-center gap-6' },
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', {
                                            type: 'checkbox',
                                            className: 'w-4 h-4 rounded border-gray-300 accent-[#006B68]',
                                            checked: tdrrEvals[c.key].radio === 'da-danh-gia',
                                            onChange: () => updateEval(c.key, 'radio', tdrrEvals[c.key].radio === 'da-danh-gia' ? null : 'da-danh-gia')
                                        }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Đã đánh giá đầy đủ')
                                    ),
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', {
                                            type: 'checkbox',
                                            className: 'w-4 h-4 rounded border-gray-300 accent-[#006B68]',
                                            checked: tdrrEvals[c.key].radio === 'bo-sung',
                                            onChange: () => {
                                                if (tdrrEvals[c.key].radio === 'bo-sung') {
                                                    updateEval(c.key, 'radio', null);
                                                } else {
                                                    selectBoSungEval(c);
                                                }
                                            }
                                        }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Bổ sung ý kiến')
                                    )
                                ),
                                tdrrEvals[c.key].radio === 'bo-sung' && c.key !== financeCriterionKey && e(window._CKEditorWidget, {
                                    initialValue: tdrrEvals[c.key].text,
                                    onChange: val => updateEval(c.key, 'text', val),
                                    placeholder: 'Nhập nội dung đánh giá...',
                                    minHeight: '140px'
                                })
                            ),
                            showMoiTruongXaHoi && c.key === 'khaThi' && e(DanhGiaMoiTruongXaHoiComponent)
                        )

                    ),

                    showMoiTruongXaHoi && tdrrEvals[financeCriterionKey].radio === 'bo-sung' && e('div', { className: 'pa-finance-panel' },
                        e('div', { className: 'pa-finance-panel-head pa-finance-panel-head-legacy' },
                            e('h4', { className: 'pa-finance-panel-title pa-finance-panel-title-legacy' }, 'Kết quả tính toán hiệu quả tài chính như sau:'),
                            e('button', { type: 'button', className: 'pa-finance-refresh' },
                                e('i', { className: 'fas fa-sync-alt' }),
                                'Đồng bộ dữ liệu'
                            )
                        ),
                        e('div', { className: 'pa-finance-legacy-body' },
                            e('div', { className: 'pa-finance-legacy-row pa-finance-legacy-row-single' },
                                e('label', { className: 'pa-finance-legacy-field pa-finance-legacy-field-project' },
                                    e('span', { className: 'pa-finance-legacy-label' }, 'Phân loại dự án'),
                                    e('select', { className: 'pa-finance-legacy-select' },
                                        e('option', null, 'Bất động sản'),
                                        e('option', null, 'Sản xuất kinh doanh'),
                                        e('option', null, 'Hạ tầng')
                                    )
                                )
                            ),
                            e('div', { className: 'pa-finance-legacy-row' },
                                e('label', { className: 'pa-finance-legacy-field pa-finance-legacy-field-wide' },
                                    e('span', { className: 'pa-finance-legacy-label' }, 'Tổng mức đầu tư'),
                                    e('div', { className: 'pa-finance-legacy-inputs pa-finance-legacy-inputs-two' },
                                        e('input', { className: 'pa-finance-legacy-input', type: 'text', defaultValue: '449.000.000.000' }),
                                        e('select', { className: 'pa-finance-legacy-select pa-finance-legacy-select-small' },
                                            e('option', null, 'VND'),
                                            e('option', null, 'USD')
                                        )
                                    )
                                ),
                                e('label', { className: 'pa-finance-legacy-field pa-finance-legacy-field-wide' },
                                    e('span', { className: 'pa-finance-legacy-label' }, 'Suất đầu tư ', e('span', { className: 'text-red-500' }, '*')),
                                    e('div', { className: 'pa-finance-legacy-inputs pa-finance-legacy-inputs-three' },
                                        e('input', { className: 'pa-finance-legacy-input', type: 'text', placeholder: 'Nhập giá trị' }),
                                        e('select', { className: 'pa-finance-legacy-select' },
                                            e('option', null, 'Chọn loại tiền'),
                                            e('option', null, 'VND'),
                                            e('option', null, 'USD')
                                        ),
                                        e('select', { className: 'pa-finance-legacy-select' },
                                            e('option', null, 'Chọn đơn vị'),
                                            e('option', null, 'm2'),
                                            e('option', null, 'ha')
                                        )
                                    )
                                )
                            ),
                            e('div', { className: 'pa-finance-legacy-section' },
                                e('div', { className: 'pa-card-title pa-card-title-legacy' }, 'Cơ cấu vốn'),
                                e('div', { className: 'pa-finance-legacy-table-wrap' },
                                    e('table', { className: 'pa-capital-table pa-capital-table-legacy' },
                                        e('thead', null,
                                            e('tr', null,
                                                e('th', null, 'Nguồn vốn'),
                                                e('th', null, 'Giá trị'),
                                                e('th', null, 'Tỷ lệ')
                                            )
                                        ),
                                        e('tbody', null,
                                            financeCapitalRows.map((row, idx) =>
                                                e('tr', { key: row[0], className: idx === financeCapitalRows.length - 1 ? 'is-total' : '' },
                                                    e('td', null, row[0]),
                                                    e('td', null, row[1]),
                                                    e('td', null, row[2])
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            e('div', { className: 'pa-finance-legacy-metrics' },
                                financeMetricColumns.map((column, idx) =>
                                    e('div', { key: idx, className: 'pa-finance-legacy-metric-col' },
                                        column.map(metric =>
                                            e('div', { key: metric[0], className: 'pa-finance-legacy-metric-row' },
                                                e('span', { className: 'pa-finance-legacy-metric-label' }, metric[0]),
                                                e('div', { className: 'pa-finance-legacy-metric-value' },
                                                    e('span', null, metric[1]),
                                                    e('i', { className: 'fas fa-caret-down text-[10px]' })
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            e('div', { className: 'pa-finance-legacy-upload-row' },
                                e('div', { className: 'pa-card-title pa-card-title-legacy' }, 'Dòng tiền dự án'),
                                e('button', {
                                    type: 'button',
                                    className: 'pa-upload-mini pa-upload-mini-legacy',
                                    onClick: () => tdrrFileRef.current && tdrrFileRef.current.click()
                                },
                                    e('i', { className: 'fas fa-upload text-[10px]' }),
                                    'Tải lên'
                                )
                            ),
                            e('div', { className: 'pa-finance-files pa-finance-files-legacy' },
                                e('div', { className: 'pa-finance-files-label-row pa-finance-files-label-row-legacy' },
                                    e('span', { className: 'pa-finance-files-label' }, 'Tài liệu đánh giá'),
                                    e('button', {
                                        type: 'button',
                                        className: 'pa-upload-link',
                                        onClick: () => tdrrFileRef.current && tdrrFileRef.current.click()
                                    },
                                        e('i', { className: 'fas fa-upload text-[10px]' }),
                                        'Tải lên'
                                    ),
                                    e('input', {
                                        ref: tdrrFileRef,
                                        type: 'file',
                                        className: 'hidden',
                                        multiple: true,
                                        onChange: handleTdrrFileUpload
                                    })
                                ),
                                e('div', { className: 'pa-finance-file-list pa-finance-file-list-legacy' },
                                    tdrrFiles.length
                                        ? tdrrFiles.map(f =>
                                            e('div', { key: f.id, className: 'pa-finance-file-chip pa-finance-file-chip-legacy' },
                                                e('i', { className: getTdrrFileIconClass(f.type) + ' text-xs' }),
                                                e('span', { className: 'truncate' }, f.name),
                                                e('button', {
                                                    type: 'button',
                                                    className: 'pa-finance-file-remove',
                                                    onClick: () => setTdrrFiles(prev => prev.filter(x => x.id !== f.id))
                                                },
                                                    e('i', { className: 'fas fa-times text-[10px]' })
                                                )
                                            )
                                        )
                                        : e('span', { className: 'pa-finance-empty-files' }, 'Chưa có tài liệu')
                                )
                            )
                        )
                    )
                )
            )
        );
    }

    // Helper: block text với Xem thêm (dùng cho BP Đề xuất)
    function XemThemBlock({ label, text }) {
        const [open, setOpen] = React.useState(false);
        return e('div', { className: 'py-2 border-b border-dashed border-gray-100 last:border-0' },
            e('p', { className: 'text-xs font-medium text-gray-600 mb-1' }, label),
            e('p', {
                className: 'text-sm text-gray-700 leading-relaxed',
                style: open ? {} : {
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                }
            }, text),
            e('button', {
                className: 'text-xs font-medium mt-1',
                style: { color: '#006B68' },
                onClick: () => setOpen(!open)
            }, open ? '▲ Thu gọn' : '▼ Xem thêm')
        );
    }

    // ========== COMPONENT: KẾT LUẬN PHƯƠNG ÁN ==========
    function KetLuanPhuongAnComponent(props) {
        const [nhuCau, setNhuCau] = React.useState('hop-phap');
        const [khaThi, setKhaThi] = React.useState('kha-thi');
        const [khaNang, setKhaNang] = React.useState('dam-bao');
        const [danhGiaChung, setDanhGiaChung] = React.useState('');
        const statusSelectClass = (value) => {
            const isOk = ['hop-phap', 'kha-thi', 'dam-bao'].includes(value);
            return 'ket-luan-status-select ' + (isOk ? 'ket-luan-status-ok' : 'ket-luan-status-bad');
        };


        return e('div', { className: 'space-y-4' },
            // Hàng dropdown inline
            e('div', { className: 'flex flex-wrap items-center gap-x-6 gap-y-3' },
                // Nhu cầu tín dụng
                e('div', { className: 'flex items-center gap-2' },
                    e('span', { className: 'text-sm text-gray-600' }, 'Nhu cầu tín dụng ', e('span', { className: 'text-red-500' }, '*')),
                    e('select', {
                        className: statusSelectClass(nhuCau),
                        value: nhuCau,
                        onChange: ev => setNhuCau(ev.target.value)
                    },
                        e('option', { value: 'hop-phap' }, 'Hợp pháp'),
                        e('option', { value: 'khong-hop-phap' }, 'Không hợp pháp')
                    )
                ),
                e('div', { className: 'w-px h-5 bg-gray-200 hidden sm:block' }),
                // Tính khả thi
                e('div', { className: 'flex items-center gap-2' },
                    e('span', { className: 'text-sm text-gray-600' }, 'Tính khả thi của phương án ', e('span', { className: 'text-red-500' }, '*')),
                    e('select', {
                        className: statusSelectClass(khaThi),
                        value: khaThi,
                        onChange: ev => setKhaThi(ev.target.value)
                    },
                        e('option', { value: 'kha-thi' }, 'Khả thi'),
                        e('option', { value: 'khong-kha-thi' }, 'Không khả thi')
                    )
                ),
                e('div', { className: 'w-px h-5 bg-gray-200 hidden sm:block' }),
                // Khả năng thực hiện
                e('div', { className: 'flex items-center gap-2' },
                    e('span', { className: 'text-sm text-gray-600' }, 'Khả năng thực hiện nghĩa vụ KH với BIDV ', e('span', { className: 'text-red-500' }, '*')),
                    e('select', {
                        className: statusSelectClass(khaNang),
                        value: khaNang,
                        onChange: ev => setKhaNang(ev.target.value)
                    },
                        e('option', { value: 'dam-bao' }, 'Đảm bảo'),
                        e('option', { value: 'khong-dam-bao' }, 'Không đảm bảo')
                    )
                )
            ),
            // Đánh giá chung
            e('div', null,
                e('label', { className: 'block text-sm font-medium text-gray-700 mb-1.5' }, 'Đánh giá chung'),
                e(window._CKEditorWidget, {
                    initialValue: danhGiaChung,
                    onChange: val => setDanhGiaChung(val),
                    placeholder: 'Nhập đánh giá chung về phương án...',
                    minHeight: '120px'
                })
            )
        );
    }

    function DanhGiaMoiTruongXaHoiComponent() {
        const [dayDu, setDayDu] = React.useState(false);
        const [boSung, setBoSung] = React.useState(false);
        const [noiDung, setNoiDung] = React.useState('');

        return e('div', { className: 'space-y-4' },
            e('div', { className: 'space-y-2 pb-4 border-b border-dashed border-gray-200' },
                e('div', { className: 'pa-criterion-title' },
                    e('i', { className: 'fas fa-leaf' }),
                    e('span', null, 'Đánh giá về rủi ro môi trường và xã hội')
                ),
                e('div', { className: 'flex items-center gap-6' },
                    e('label', { className: 'inline-flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer' },
                        e('input', {
                            type: 'checkbox',
                            className: 'w-4 h-4 rounded border-gray-300 accent-[#006B68]',
                            checked: dayDu,
                            onChange: () => {
                                const nextValue = !dayDu;
                                setDayDu(nextValue);
                                if (nextValue) setBoSung(false);
                            }
                        }),
                        'Đã đánh giá đầy đủ'
                    ),
                    e('label', { className: 'inline-flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer' },
                        e('input', {
                            type: 'checkbox',
                            className: 'w-4 h-4 rounded border-gray-300 accent-[#006B68]',
                            checked: boSung,
                            onChange: () => {
                                const nextValue = !boSung;
                                setBoSung(nextValue);
                                if (nextValue) setDayDu(false);
                            }
                        }),
                        'Bổ sung ý kiến'
                    )
                ),
                boSung && e(window._CKEditorWidget, {
                    initialValue: noiDung,
                    onChange: val => setNoiDung(val),
                    placeholder: 'Nhập đánh giá về rủi ro môi trường và xã hội...',
                    minHeight: '140px'
                })
            ),
        );
    }

    // ========== COMPONENT: ĐÁNH GIÁ CHUNG ==========
    function DanhGiaChungComponent() {
        // Colors
        const C_AMBER = '#D97706';
        const C_TEAL  = '#006B68';
        const C_LIGHT = '#E0F2F1';

        // Section 1 - Rủi ro
        const [rr_bpdxOpen, setRr_bpdxOpen] = React.useState(false);
        const [rr_radio, setRr_radio] = React.useState(null);
        const RR_BPDX_TEXT = 'Khả năng thanh khoán của ngân hàng duy trì so với thời điểm cuối năm trước và ở mức tốt. Dư kiến khả năng thanh khoản duy trì trong thời gian tới. Tỷ lệ TS thanh khoán/TTS tại 31/03/2024 là 17,4% thấp hơn so với cùng kỳ năm 2023 (18,4%). Tỷ lệ nợ của CCB ở mức thấp so với các ngân hàng đồng hạng. Tỷ lệ cho vay/huy động tại điểm 31/03/2024 là mức 82%, 5,8 mức tốt so với các ngân hàng cùng nhóm. Kết quả kinh doanh tăng trưởng ổn định qua các năm. Danh mục cho vay đa dạng, tập trung vào phân khúc bán lẻ và doanh nghiệp vừa và nhỏ.';
        const [rr_bpdxShowMore, setRr_bpdxShowMore] = React.useState(false);

        // Section 2 - Tuân thủ quy định
        const [tt_bpdxOpen, setTt_bpdxOpen] = React.useState(false);
        const [tt_radio, setTt_radio] = React.useState(null);
        const TT_BPDX_ROWS = [
            { id: 1, tenVB: 'Chính sách cấp tín dụng (Quy định số 1234/QĐ-BIDV ngày 15/01/2024 và Chính sách cấp tín dụng)', status: 'dap-ung', chiTiet: 'Yêu cầu bảo đảm bằng bất động sản với tỷ lệ 70%, giảm sát chặt chẽ dòng tiền từ các hợp đồng' },
            { id: 2, tenVB: 'Chính hướng cấp tín dụng đối với ngành Xây dựng (Quyết định số 567/QĐ-BIDV ngày 30/02/2024)', status: 'dap-ung', chiTiet: 'Đảm giá định kỳ 6 tháng/lần về tình hình tài chính, yêu cầu duy trì tỷ lệ thanh toán tối thiểu' },
            { id: 3, tenVB: 'Quản lý quan hệ khách hàng', status: 'khong-dap-ung', chiTiet: 'Yêu cầu bảo đảm bằng bất động sản với tỷ lệ 70%, giảm sát chặt chẽ dòng tiền từ các hợp đồng' },
            { id: 4, tenVB: 'Quy định về hạn mức tín dụng và thẩm quyền phê duyệt (Quy định số 254/QĐ-BIDV ngày 05/04/2024)', status: 'dap-ung', chiTiet: 'Yêu cầu báo hiểm tài sản bảo đảm, định giá lại định kỳ' },
            { id: 5, tenVB: 'Tạo dải thương mại điện tử', status: 'dap-ung', chiTiet: 'Đảm giá định kỳ 6 tháng/lần về tình hình tài chính, yêu cầu duy trì tỷ lệ thanh toán tối thiểu' },
        ];
        const [tt_rows, setTt_rows] = React.useState(TT_BPDX_ROWS.map(r => ({ ...r })));

        // Section 3 - QLRR
        const [qlrr_rows, setQlrr_rows] = React.useState([
            { id: 1, chiTieu: 'Giới hạn TSRTD giao Ban KH&HN/CN', noiDung: 'Yêu cầu bảo đảm bằng bất động sản với tỷ lệ 70%, giảm sát chặt chẽ dòng tiền từ các hợp đồng', status: 'dap-ung' },
            { id: 2, chiTieu: 'Giới hạn tín dụng ngành', noiDung: 'Đảm giá định kỳ 6 tháng/lần về tình hình tài chính, yêu cầu duy trì tỷ lệ thanh toán tối thiểu', status: 'dap-ung' },
            { id: 3, chiTieu: 'Tổng mức dư cấp TD đối với 1 KH/VTC', noiDung: 'Yêu cầu bảo đảm bằng bất động sản với tỷ lệ 70%, giảm sát chặt chẽ dòng tiền từ các hợp đồng', status: 'khong-dap-ung' },
            { id: 4, chiTieu: 'Giới hạn tín dụng ngành', noiDung: 'Yêu cầu báo hiểm tài sản bảo đảm, định giá lại định kỳ', status: 'dap-ung' },
            { id: 5, chiTieu: 'Giới hạn TSRTD giao Ban KH&HN/CN', noiDung: 'Đảm giá định kỳ 6 tháng/lần về tình hình tài chính, yêu cầu duy trì tỷ lệ thanh toán tối thiểu', status: 'dap-ung' },
        ]);
        const [nganh_rows, setNganh_rows] = React.useState([
            { id: 1, n1: 'Kinh doanh', n2: 'Kinh doanh bất động sản', n3: 'Kinh doanh bất động sản cho sở hữu', ghanDuNo: '1.000.000.000', duNoTH: '550.000.000', ghanCK: '', duCK: '', ghiChu: '' },
            { id: 2, n1: 'Kinh doanh', n2: 'Kinh doanh bất động sản', n3: 'Kinh doanh bất động sản cho sở hữu', ghanDuNo: '2.000.000.000', duNoTH: '92.000.000.000', ghanCK: '', duCK: '', ghiChu: '' },
            { id: 3, n1: 'Kinh doanh', n2: 'Kinh doanh bất động sản', n3: 'Kinh doanh bất động sản cho sở hữu', ghanDuNo: '250.000.000', duNoTH: '700.000.000', ghanCK: '1.000.000.000', duCK: '', ghiChu: '' },
        ]);

        // Kết luận
        const [kl_bpdxOpen, setKl_bpdxOpen] = React.useState(false);
        const [kl, setKl] = React.useState({ dongY: false, dongYBS: false, khongDongY: false, yKienKhac: false });

        // ── Helper: sub-panel header ──
        const SubHeader = (label, open, setOpen, locked) =>
            e('div', {
                className: 'credit-subheader flex items-center justify-between px-4 py-2.5 cursor-pointer select-none',
                style: { background: C_LIGHT },
                onClick: () => setOpen(!open)
            },
                e('div', { className: 'flex items-center gap-2' },
                    e('span', { className: 'subpanel-title-icon subpanel-icon-opinion' },
                        e('i', { className: 'fas fa-lightbulb' })
                    ),
                    e('span', { className: 'text-sm font-medium', style: { color: C_TEAL } }, label)
                ),
                e('div', { className: 'flex items-center gap-2' },
                    locked && e('i', { className: 'fas fa-lock text-gray-300 text-xs' }),
                    open
                        ? e('i', { className: 'fas fa-chevron-up text-gray-400 text-xs' })
                        : e('i', { className: 'fas fa-chevron-down text-gray-400 text-xs' })
                )
            );

        // ── Helper: section header (amber icon) ──
        const SectionHeader = (iconClass, label) =>
            e('div', {
                className: 'credit-section-header flex items-center gap-3 px-4 py-3',
                style: { background: C_TEAL }
            },
                e('span', { className: 'section-pill-icon' }, e('i', { className: iconClass })),
                e('span', { className: 'font-semibold text-white text-sm' }, label)
            );

        // ── Helper: action icons ──
        const ActionIcons = ({ onDel }) =>
            e('div', { className: 'flex items-center gap-2 justify-center' },
                e('i', { className: 'fas fa-circle text-green-500 text-xs cursor-pointer' }),
                e('i', { className: 'fas fa-pencil-alt text-gray-400 text-xs cursor-pointer hover:text-[#006B68]' }),
                e('i', { className: 'fas fa-trash-alt text-red-400 text-xs cursor-pointer hover:text-red-600', onClick: onDel })
            );

        // ── Helper: radio row ──
        const RadioRow = (radio, setRadio) =>
            e('div', { className: 'flex items-center gap-8 px-4 py-3' },
                e('span', { className: 'text-sm font-medium text-gray-700 mr-4' }, 'Đánh giá ý kiến Bộ phận đề xuất'),
                e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                    e('input', { type: 'checkbox', className: 'w-4 h-4 accent-[#006B68]', checked: radio === 'day-du', onChange: () => setRadio('day-du') }),
                    e('span', { className: 'text-sm' }, 'Đã đánh giá đầy đủ')
                ),
                e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                    e('input', { type: 'checkbox', className: 'w-4 h-4 accent-[#006B68]', checked: radio === 'bo-sung', onChange: () => setRadio('bo-sung') }),
                    e('span', { className: 'text-sm' }, 'Bổ sung ý kiến')
                )
            );

        const thStyle = { background: '#B2DFDB', fontSize: '13px', fontWeight: '600', color: '#004D40', padding: '8px 10px', border: '1px solid #80CBC4', whiteSpace: 'nowrap' };
        const tdStyle = { padding: '6px 10px', border: '1px solid #E0F2F1', fontSize: '13px', verticalAlign: 'middle' };

        return e('div', { className: 'space-y-0 border border-gray-200 rounded-lg overflow-hidden' },

            // ════ SECTION 1: Rủi ro & biện pháp kiểm soát ════
            SectionHeader('fas fa-shield-halved', 'Đánh giá rủi ro & biện pháp kiểm soát'),

            // BP Đề xuất - collapsed text
            SubHeader('Ý kiến Bộ phận đề xuất', rr_bpdxOpen, setRr_bpdxOpen, true),
            rr_bpdxOpen && e('div', { className: 'px-4 py-3 bg-white' },
                e('p', {
                    className: 'text-sm text-gray-700 leading-relaxed',
                    style: rr_bpdxShowMore ? {} : { overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }
                }, RR_BPDX_TEXT),
                e('button', {
                    className: 'text-xs font-medium mt-1',
                    style: { color: C_TEAL },
                    onClick: () => setRr_bpdxShowMore(!rr_bpdxShowMore)
                }, rr_bpdxShowMore ? '▲ Thu gọn' : '▼ Xem thêm')
            ),

            // BP Thẩm định
            e('div', {
                className: 'flex items-center gap-2 px-4 py-2.5',
                style: { background: C_LIGHT }
            },
                e('span', { className: 'subpanel-title-icon subpanel-icon-review' },
                    e('i', { className: 'fas fa-clipboard-check' })
                ),
                e('span', { className: 'text-sm font-medium', style: { color: C_TEAL } }, 'Ý kiến Bộ phận Thẩm định rủi ro')
            ),
            e('div', { className: 'bg-white px-4 pb-4' },
                RadioRow(rr_radio, setRr_radio),
                e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden mt-2' },
                    // Toolbar
                    e('div', { className: 'flex items-center gap-1 px-3 py-2 bg-gray-50 border-b border-gray-200' },
                        e('select', { className: 'text-xs border border-gray-200 rounded px-1 py-0.5 bg-white text-gray-600 mr-2' }, e('option', null, 'Normal text')),
                        e('button', { className: 'w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 text-xs font-bold' }, 'B'),
                        e('button', { className: 'w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 text-xs italic' }, 'I'),
                        e('button', { className: 'w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 text-xs underline' }, 'U'),
                        e('button', { className: 'w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 text-xs line-through' }, 'S'),
                        e('span', { className: 'text-gray-300 mx-1' }, '|'),
                        e('button', { className: 'w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500' }, e('i', { className: 'fas fa-list-ol text-xs' })),
                        e('button', { className: 'w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500' }, e('i', { className: 'fas fa-list text-xs' }))
                    ),
                    // Editor content (numbered list)
                    e('div', { className: 'px-4 py-3 min-h-[140px] text-sm text-gray-700', contentEditable: true, suppressContentEditableWarning: true },
                        e('ol', { style: { paddingLeft: '20px', lineHeight: '2' } },
                            e('li', null, e('strong', null, 'Rủi ro ngành:'), ' Mức độ rủi ro: Nhỏ — Giải pháp kiểm soát: Giám sát định kỳ hàng quý'),
                            e('li', null, e('strong', null, 'Rủi ro tài chính:'), ' Giải pháp kiểm soát: Yêu cầu duy trì tỷ lệ thanh khoản tối thiểu'),
                            e('li', null, e('strong', null, 'Rủi ro vận hành:'), ' Giải pháp kiểm soát: Áp dụng quy trình kiểm soát nội bộ'),
                            e('li', null, e('strong', null, 'Rủi ro thị trường:'), ' Giải pháp kiểm soát: Theo dõi biến động lãi suất'),
                            e('li', null, e('strong', null, 'Rủi ro khác:'), ' Giải pháp kiểm soát: Đánh giá định kỳ 6 tháng/lần')
                        )
                    ),
                    e('div', { className: 'text-right text-xs text-gray-400 px-3 py-1 border-t border-gray-100' }, '0/2000')
                )
            ),


            // ════ SECTION 2: Tuân thủ quy định ════
            SectionHeader('fas fa-clipboard-check', 'Đánh giá tuân thủ quy định, chính sách tín dụng'),

            // BP Đề xuất – locked table with real data
            SubHeader('Ý kiến Bộ phận đề xuất', tt_bpdxOpen, setTt_bpdxOpen, true),
            tt_bpdxOpen && e('div', { className: 'px-4 pb-3 bg-white' },
                e('div', { className: 'overflow-x-auto' },
                    e('table', { style: { width: '100%', borderCollapse: 'collapse' } },
                        e('thead', null,
                            e('tr', null,
                                e('th', { style: { ...thStyle, width: '40px' } }, 'STT'),
                                e('th', { style: thStyle }, 'Tên văn bản/quy định'),
                                e('th', { style: { ...thStyle, width: '140px' } }, 'Ý kiến đánh giá của BP đề xuất'),
                                e('th', { style: thStyle }, 'Chi tiết đánh giá')
                            )
                        ),
                        e('tbody', null,
                            TT_BPDX_ROWS.map((row, idx) =>
                                e('tr', { key: row.id, style: { background: idx % 2 === 0 ? '#fff' : '#f9fafb' } },
                                    e('td', { style: { ...tdStyle, textAlign: 'center', color: '#666' } }, idx + 1),
                                    e('td', { style: { ...tdStyle, color: '#374151' } }, row.tenVB),
                                    e('td', { style: { ...tdStyle, textAlign: 'center' } },
                                        e('span', {
                                            style: {
                                                display: 'inline-flex', alignItems: 'center', gap: '4px',
                                                padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap',
                                                background: row.status === 'dap-ung' ? '#D1FAE5' : '#FEE2E2',
                                                color: row.status === 'dap-ung' ? '#065F46' : '#991B1B'
                                            }
                                        },
                                            e('i', { className: row.status === 'dap-ung' ? 'fas fa-check-circle' : 'fas fa-times-circle', style: { fontSize: '11px' } }),
                                            row.status === 'dap-ung' ? 'Đáp ứng' : 'Không đáp ứng'
                                        )
                                    ),
                                    e('td', { style: { ...tdStyle, color: '#374151', fontSize: '12px' } }, row.chiTiet)
                                )
                            )
                        )
                    )
                )
            ),

            // BP Thẩm định – editable table
            e('div', { className: 'flex items-center gap-2 px-4 py-2.5', style: { background: C_LIGHT } },
                e('span', { className: 'subpanel-title-icon subpanel-icon-review' },
                    e('i', { className: 'fas fa-clipboard-check' })
                ),
                e('span', { className: 'text-sm font-medium', style: { color: C_TEAL } }, 'Ý kiến Bộ phận Thẩm định rủi ro')
            ),
            e('div', { className: 'bg-white px-4 pb-4' },
                RadioRow(tt_radio, setTt_radio),
                e('div', { className: 'overflow-x-auto mt-2' },
                    e('table', { style: { width: '100%', borderCollapse: 'collapse' } },
                        e('thead', null,
                            e('tr', null,
                                e('th', { style: { ...thStyle, width: '40px' } }, 'STT'),
                                e('th', { style: thStyle }, 'Tên văn bản/quy định'),
                                e('th', { style: { ...thStyle, width: '140px' } }, 'Ý kiến đánh giá của TBRR'),
                                e('th', { style: thStyle }, 'Chi tiết đánh giá'),
                                e('th', { style: { ...thStyle, width: '70px' } }, 'Tác vụ')
                            )
                        ),
                        e('tbody', null,
                            tt_rows.map((row, idx) =>
                                e('tr', { key: row.id, style: { background: idx % 2 === 0 ? '#fff' : '#f9fafb' } },
                                    e('td', { style: { ...tdStyle, textAlign: 'center', color: '#666' } }, idx + 1),
                                    e('td', { style: tdStyle },
                                        e('input', { type: 'text', style: { width: '100%', border: 'none', outline: 'none', fontSize: '13px', background: 'transparent' }, value: row.tenVB, onChange: ev => setTt_rows(prev => prev.map(r => r.id === row.id ? { ...r, tenVB: ev.target.value } : r)) })
                                    ),
                                    e('td', { style: { ...tdStyle, textAlign: 'center' } },
                                        e('span', {
                                            style: {
                                                display: 'inline-flex', alignItems: 'center', gap: '4px',
                                                padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap',
                                                background: row.status === 'dap-ung' ? '#D1FAE5' : '#FEE2E2',
                                                color: row.status === 'dap-ung' ? '#065F46' : '#991B1B',
                                                cursor: 'pointer'
                                            },
                                            onClick: () => setTt_rows(prev => prev.map(r => r.id === row.id ? { ...r, status: r.status === 'dap-ung' ? 'khong-dap-ung' : 'dap-ung' } : r))
                                        },
                                            e('i', { className: row.status === 'dap-ung' ? 'fas fa-check-circle' : 'fas fa-times-circle', style: { fontSize: '11px' } }),
                                            row.status === 'dap-ung' ? 'Đáp ứng' : 'Không đáp ứng'
                                        )
                                    ),
                                    e('td', { style: tdStyle },
                                        e('input', { type: 'text', style: { width: '100%', border: 'none', outline: 'none', fontSize: '13px', background: 'transparent' }, value: row.chiTiet, onChange: ev => setTt_rows(prev => prev.map(r => r.id === row.id ? { ...r, chiTiet: ev.target.value } : r)) })
                                    ),
                                    e('td', { style: { ...tdStyle, textAlign: 'center' } },
                                        e('div', { className: 'flex items-center gap-2 justify-center' },
                                            e('i', { className: 'fas fa-pencil-alt text-gray-400 text-xs cursor-pointer hover:text-[#006B68]' }),
                                            e('i', { className: 'fas fa-trash-alt text-red-400 text-xs cursor-pointer', onClick: () => setTt_rows(prev => prev.filter(r => r.id !== row.id)) })
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                e('div', { className: 'flex justify-end mt-2' },
                    e('button', {
                        className: 'px-3 py-1.5 text-xs text-white rounded flex items-center gap-1',
                        style: { background: C_TEAL },
                        onClick: () => setTt_rows(prev => [...prev, { id: Date.now(), tenVB: '', status: 'dap-ung', chiTiet: '' }])
                    }, e('i', { className: 'fas fa-plus text-[10px]' }), 'Thêm mới')
                )
            ),

            // ════ SECTION 3: Tuân thủ chính sách & QLRR ════
            SectionHeader('fas fa-scale-balanced', 'Đánh giá tuân thủ chính sách & giới hạn QLRR'),
            e('div', { className: 'bg-white px-4 pb-4 pt-3 space-y-4' },
                // 3a: Chỉ tiêu QLRR
                e('div', { className: 'font-medium text-sm text-gray-700 mt-1' }, 'Các chỉ tiêu QLRRTD tập trung'),
                e('div', { className: 'overflow-x-auto mt-2' },
                    e('table', { style: { width: '100%', borderCollapse: 'collapse' } },
                        e('thead', null,
                            e('tr', null,
                                e('th', { style: { ...thStyle, width: '40px' } }, 'STT'),
                                e('th', { style: thStyle }, 'Chỉ tiêu'),
                                e('th', { style: thStyle }, 'Nội dung đánh giá'),
                                e('th', { style: { ...thStyle, width: '130px' } }, 'Ý kiến TBRR'),
                                e('th', { style: { ...thStyle, width: '70px' } }, 'Tác vụ')
                            )
                        ),
                        e('tbody', null,
                            qlrr_rows.map((row, idx) =>
                                e('tr', { key: row.id, style: { background: idx % 2 === 0 ? '#fff' : '#f9fafb' } },
                                    e('td', { style: { ...tdStyle, textAlign: 'center', color: '#666' } }, idx + 1),
                                    e('td', { style: tdStyle }, row.chiTieu),
                                    e('td', { style: { ...tdStyle, fontSize: '12px' } }, row.noiDung),
                                    e('td', { style: { ...tdStyle, textAlign: 'center' } },
                                        e('span', {
                                            style: {
                                                display: 'inline-flex', alignItems: 'center', gap: '4px',
                                                padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap',
                                                background: row.status === 'dap-ung' ? '#D1FAE5' : '#FEE2E2',
                                                color: row.status === 'dap-ung' ? '#065F46' : '#991B1B',
                                                cursor: 'pointer'
                                            },
                                            onClick: () => setQlrr_rows(prev => prev.map(r => r.id === row.id ? { ...r, status: r.status === 'dap-ung' ? 'khong-dap-ung' : 'dap-ung' } : r))
                                        },
                                            e('i', { className: row.status === 'dap-ung' ? 'fas fa-check-circle' : 'fas fa-times-circle', style: { fontSize: '11px' } }),
                                            row.status === 'dap-ung' ? 'Đáp ứng' : 'Không đáp ứng'
                                        )
                                    ),
                                    e('td', { style: { ...tdStyle, textAlign: 'center' } },
                                        e('div', { className: 'flex items-center gap-2 justify-center' },
                                            e('i', { className: 'fas fa-pencil-alt text-gray-400 text-xs cursor-pointer hover:text-[#006B68]' }),
                                            e('i', { className: 'fas fa-minus text-gray-400 text-xs cursor-pointer hover:text-red-500' })
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                e('div', { className: 'flex justify-end mt-1' },
                    e('button', {
                        className: 'px-3 py-1.5 text-xs text-white rounded flex items-center gap-1',
                        style: { background: C_TEAL },
                        onClick: () => setQlrr_rows(prev => [...prev, { id: Date.now(), chiTieu: '', noiDung: '', status: 'dap-ung' }])
                    }, e('i', { className: 'fas fa-plus text-[10px]' }), 'Thêm mới')
                ),

                // 3b: Giới hạn ngành
                e('div', { className: 'flex items-center justify-between mt-3 mb-2' },
                    e('div', { className: 'flex items-center gap-2' },
                        e('span', { className: 'font-medium text-sm text-gray-700' }, 'Giới hạn tín dụng ngành'),
                        e('span', { className: 'text-xs text-gray-400' }, '(VND)')
                    ),
                    e('button', {
                        className: 'px-3 py-1.5 text-xs text-white rounded flex items-center gap-1.5',
                        style: { background: C_TEAL }
                    }, e('i', { className: 'fas fa-download text-[10px]' }), 'Lấy TT giới hạn ngành')
                ),
                e('div', { className: 'overflow-x-auto' },
                    e('table', { style: { width: '100%', borderCollapse: 'collapse' } },
                        e('thead', null,
                            e('tr', null,
                                e('th', { style: { ...thStyle, width: '40px' } }, 'STT'),
                                e('th', { style: thStyle }, 'Ngành cấp 1'),
                                e('th', { style: thStyle }, 'Ngành cấp 2'),
                                e('th', { style: thStyle }, 'Ngành cấp 3'),
                                e('th', { style: thStyle }, '3 theo cam kết'),
                                e('th', { style: thStyle }, 'Tổng cộng'),
                                e('th', { style: thStyle }, 'GHTS theo cam kết'),
                                e('th', { style: { ...thStyle, width: '70px' } }, 'Ghi chú'),
                                e('th', { style: { ...thStyle, width: '70px' } }, 'Tác vụ')
                            )
                        ),
                        e('tbody', null,
                            nganh_rows.map((row, idx) =>
                                e('tr', { key: row.id, style: { background: idx % 2 === 0 ? '#fff' : '#f9fafb' } },
                                    e('td', { style: { ...tdStyle, textAlign: 'center', color: '#666' } }, idx + 1),
                                    e('td', { style: tdStyle }, row.n1),
                                    e('td', { style: tdStyle }, row.n2),
                                    e('td', { style: { ...tdStyle, fontSize: '12px' } }, row.n3),
                                    e('td', { style: { ...tdStyle, textAlign: 'right', fontFamily: 'monospace' } }, row.ghanDuNo),
                                    e('td', { style: { ...tdStyle, textAlign: 'right', fontFamily: 'monospace' } }, row.duNoTH),
                                    e('td', { style: { ...tdStyle, textAlign: 'right', fontFamily: 'monospace' } }, row.ghanCK),
                                    e('td', { style: tdStyle },
                                        e('input', { type: 'text', placeholder: 'Nhập ghi chú', style: { width: '100%', border: 'none', outline: 'none', fontSize: '12px', background: 'transparent', color: '#6b7280' }, value: row.ghiChu, onChange: ev => setNganh_rows(prev => prev.map(r => r.id === row.id ? { ...r, ghiChu: ev.target.value } : r)) })
                                    ),
                                    e('td', { style: { ...tdStyle, textAlign: 'center' } },
                                        e('div', { className: 'flex items-center gap-2 justify-center' },
                                            e('i', { className: 'fas fa-pencil-alt text-gray-400 text-xs cursor-pointer hover:text-[#006B68]' }),
                                            e('i', { className: 'fas fa-trash-alt text-red-400 text-xs cursor-pointer hover:text-red-600', onClick: () => setNganh_rows(prev => prev.filter(r => r.id !== row.id)) })
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),

            // ════ Ý KIẾN CHUNG ════
            e('div', { className: 'flex items-center gap-2 px-4 py-2.5', style: { background: C_LIGHT } },
                e('i', { className: 'fas fa-comment-alt text-xs', style: { color: C_TEAL } }),
                e('span', { className: 'text-sm font-medium', style: { color: C_TEAL } }, 'Ý kiến chung')
            ),
            e('div', { className: 'bg-white px-4 pb-4 pt-2' },
                e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                    e('div', { className: 'flex items-center gap-1 px-3 py-2 bg-gray-50 border-b border-gray-200' },
                        e('select', { className: 'text-xs border border-gray-200 rounded px-1 py-0.5 bg-white text-gray-600 mr-2' }, e('option', null, 'Normal text')),
                        e('button', { className: 'w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 text-xs font-bold' }, 'B'),
                        e('button', { className: 'w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 text-xs italic' }, 'I'),
                        e('button', { className: 'w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 text-xs underline' }, 'U'),
                        e('button', { className: 'w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 text-xs line-through' }, 'S'),
                        e('span', { className: 'text-gray-300 mx-1' }, '|'),
                        e('button', { className: 'w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500' }, e('i', { className: 'fas fa-list-ol text-xs' })),
                        e('button', { className: 'w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500' }, e('i', { className: 'fas fa-list text-xs' }))
                    ),
                    e('div', { className: 'px-4 py-3 min-h-[80px] text-sm text-gray-400 italic', contentEditable: true, suppressContentEditableWarning: true }, 'Thông tin được nhập'),
                    e('div', { className: 'text-right text-xs text-gray-400 px-3 py-1 border-t border-gray-100' }, '0/2000')
                )
            ),

            // ════ SECTION 4: Kết luận ════
            e('div', {
                className: 'flex items-center gap-2 px-4 py-3',
                style: { background: C_TEAL }
            },
                e('i', { className: 'fas fa-check-square text-white text-sm' }),
                e('span', { className: 'font-semibold text-white text-sm' }, 'Kết luận')
            ),

            SubHeader('Ý kiến Bộ phận đề xuất', kl_bpdxOpen, setKl_bpdxOpen, true),
            kl_bpdxOpen && e('div', { className: 'px-4 py-3 bg-white text-sm text-gray-400 italic' }, '(Nội dung BP đề xuất đã điền)'),

            e('div', {
                className: 'flex items-center gap-2 px-4 py-2.5',
                style: { background: C_LIGHT }
            },
                e('span', { className: 'subpanel-title-icon subpanel-icon-review' },
                    e('i', { className: 'fas fa-clipboard-check' })
                ),
                e('span', { className: 'text-sm font-medium', style: { color: C_TEAL } }, 'Ý kiến Bộ phận Thẩm định rủi ro')
            ),
            e('div', { className: 'bg-white px-4 py-4 flex flex-wrap items-center gap-8' },
                e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                    e('input', { type: 'checkbox', className: 'w-4 h-4 accent-[#006B68]', checked: kl.dongY, onChange: () => setKl(p => ({ ...p, dongY: !p.dongY })) }),
                    e('span', { className: 'text-sm' }, 'Đồng ý')
                ),
                e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                    e('input', { type: 'checkbox', className: 'w-4 h-4 accent-[#006B68]', checked: kl.dongYBS, onChange: () => setKl(p => ({ ...p, dongYBS: !p.dongYBS })) }),
                    e('span', { className: 'text-sm' }, 'Đồng ý và bổ sung điều kiện')
                ),
                e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                    e('input', { type: 'checkbox', className: 'w-4 h-4 accent-[#006B68]', checked: kl.khongDongY, onChange: () => setKl(p => ({ ...p, khongDongY: !p.khongDongY })) }),
                    e('span', { className: 'text-sm' }, 'Không đồng ý')
                ),
                e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                    e('input', { type: 'checkbox', className: 'w-4 h-4 accent-[#006B68]', checked: kl.yKienKhac, onChange: () => setKl(p => ({ ...p, yKienKhac: !p.yKienKhac })) }),
                    e('span', { className: 'text-sm' }, 'Ý kiến khác')
                )
            )
        );
    }

    function DanhGiaChungModernComponent() {
        const [riskAssessment, setRiskAssessment] = React.useState(null);
        const [policyAssessment, setPolicyAssessment] = React.useState(null);
        const [generalAssessment, setGeneralAssessment] = React.useState(null);
        const [riskBpdxOpen, setRiskBpdxOpen] = React.useState(false);
        const [policyBpdxOpen, setPolicyBpdxOpen] = React.useState(false);
        const [generalBpdxOpen, setGeneralBpdxOpen] = React.useState(false);
        const [showRiskModal, setShowRiskModal] = React.useState(false);
        const [showPolicyModal, setShowPolicyModal] = React.useState(false);
        const [editingRiskIndex, setEditingRiskIndex] = React.useState(null);
        const [confirmDeleteRiskIndex, setConfirmDeleteRiskIndex] = React.useState(null);
        const [editingPolicyIndex, setEditingPolicyIndex] = React.useState(null);
        const [confirmDeletePolicyIndex, setConfirmDeletePolicyIndex] = React.useState(null);
        const [showQlrrModal, setShowQlrrModal] = React.useState(false);
        const [editingQlrrIndex, setEditingQlrrIndex] = React.useState(null);
        const [confirmDeleteQlrrIndex, setConfirmDeleteQlrrIndex] = React.useState(null);
        const [showSectorModal, setShowSectorModal] = React.useState(false);
        const [viewSectorIndex, setViewSectorIndex] = React.useState(null);
        const [editingSectorIndex, setEditingSectorIndex] = React.useState(null);
        const [confirmDeleteSectorIndex, setConfirmDeleteSectorIndex] = React.useState(null);
        const [riskSaved, setRiskSaved] = React.useState(false);
        const [policySaved, setPolicySaved] = React.useState(false);
        const [riskForm, setRiskForm] = React.useState({
            loai: 'Rủi ro tín dụng',
            ruiRo: '',
            bienPhapKH: '',
            bienPhapNH: ''
        });
        const [policyForm, setPolicyForm] = React.useState({
            vanBan: 'Chính sách cấp tín dụng',
            ketQua: 'Đáp ứng',
            chiTiet: '',
            dieuKien: ''
        });
        const [qlrrForm, setQlrrForm] = React.useState(['', '', '', '', '', 'Trong giới hạn', '']);
        const [sectorForm, setSectorForm] = React.useState(['', '', '', '', '', '', '']);
        const syncButton = (label) =>
            e('button', {
                type: 'button',
                className: 'dg-sync-btn',
                onClick: () => {
                    setToastMessage('Đã đồng bộ ' + label);
                    setShowToast(true);
                }
            },
                e('i', { className: 'fas fa-sync-alt' }),
                'Đồng bộ'
            );

        const riskBpdxRows = [
            ['Rủi ro thanh toán', 'Chủ đầu tư thanh toán chậm/không đúng tiến độ', 'Hợp đồng quy định điều khoản thanh toán rõ; theo dõi công nợ chặt chẽ', 'Kiểm soát dòng tiền về BIDV; yêu cầu chuyển doanh thu về tài khoản BIDV'],
            ['Rủi ro pháp lý', 'Chủ đầu tư thanh toán chậm/không đúng tiến độ', 'Hợp đồng quy định điều khoản thanh toán rõ; theo dõi công nợ chặt chẽ', 'Kiểm soát dòng tiền về BIDV; yêu cầu chuyển doanh thu về tài khoản BIDV'],
            ['Rủi ro TSBĐ', 'Giá trị/khả năng xử lý TSBĐ không đảm bảo', 'Cung cấp TSBĐ đầy đủ, hợp pháp', 'Nhận TSBĐ 100%; định giá, kiểm soát pháp lý TSBĐ']
        ];

        const [riskTdrrRows, setRiskTdrrRows] = React.useState([]);

        const policyBpdxRows = [
            ['Chính sách cấp tín dụng', 'Đáp ứng', 'Yêu cầu bảo đảm bằng BĐS tỷ lệ 70%, giám sát dòng tiền hợp đồng'],
            ['Định hướng cấp tín dụng ngành Xây dựng', 'Đáp ứng', 'Đánh giá tài chính định kỳ 6 tháng/lần; duy trì tỷ lệ thanh toán tối thiểu'],
            ['Quản lý danh sách khách hàng', 'Không đáp ứng', 'Khách hàng thuộc/tiệm cận danh sách hạn chế/cảnh báo'],
            ['Quy định hạn mức tín dụng & thẩm quyền', 'Đáp ứng', 'Yêu cầu bảo hiểm TSBĐ, giám sát giải ngân'],
            ['Tạo nội dung thương mại điện tử', 'Đáp ứng', 'Đánh giá định kỳ 6 tháng/lần; duy trì tỷ lệ thanh toán tối thiểu']
        ];

        const [policyTdrrRows, setPolicyTdrrRows] = React.useState([]);

        const [qlrrRows, setQlrrRows] = React.useState([
            ['Dư nợ 1 KH / VTC', '< 14%', '292', '182,848', '0.16%', 'Trong giới hạn', ''],
            ['Dư nợ KH + người liên quan/VTC', '< 23%', '832', '182,848', '0.46%', 'Trong giới hạn', ''],
            ['Top 20 KH / Vốn cấp 1', '< 100 %', '104,000', '137,000', '75.91%', 'Trong giới hạn', '']
        ]);

        const [sectorRows, setSectorRows] = React.useState([
            ['Xây dựng KĐT', '', '', '', '', '', ''],
            ['Xây dựng/sửa chữa', '', '', '', '', '', '']
        ]);
        const sectorLabels = ['Ngành cấp 2', 'Dư nợ cuối kỳ', 'Dư nợ tối đa trong kỳ', 'Dư nợ thực hiện', 'Cam kết cuối kỳ', 'Cam kết tối đa trong kỳ', 'Cam kết thực hiện'];

        const StatusPill = ({ value }) => {
            const ok = value !== 'Không đáp ứng';
            return e('span', { className: `dg-pill ${ok ? 'ok' : 'bad'}` },
                e('i', { className: ok ? 'fas fa-check-circle' : 'fas fa-times-circle' }),
                value
            );
        };

        const Actions = (props) => {
            const disabled = props && props.disabled;
            return e('div', { className: 'dg-actions' + (disabled ? ' disabled' : '') },
                e('button', { type: 'button', className: 'dg-action-btn dg-action-view', title: 'Xem', disabled: disabled || !(props && props.onView), onClick: props && props.onView },
                    e('i', { className: 'fas fa-eye' })
                ),
                e('button', { type: 'button', className: 'dg-action-btn dg-action-edit', title: 'Sửa', disabled: disabled || !(props && props.onEdit), onClick: props && props.onEdit },
                    e('i', { className: 'fas fa-pen' })
                ),
                e('button', { type: 'button', className: 'dg-action-btn dg-action-delete', title: 'Xóa', disabled: disabled || !(props && props.onDelete), onClick: props && props.onDelete },
                    e('i', { className: 'fas fa-trash-alt' })
                )
            );
        };

        const Table = ({ headers, rows, renderCell, minWidth }) => {
            const tableRef = React.useRef(null);
            const startResize = (colIdx, ev) => {
                ev.preventDefault();
                const table = tableRef.current;
                if (!table) return;
                const th = table.querySelectorAll('thead th')[colIdx];
                if (!th) return;
                const startX = ev.clientX;
                const startW = th.offsetWidth;
                const handle = ev.target;
                handle.classList.add('dragging');
                const onMove = (moveEv) => {
                    const diff = moveEv.clientX - startX;
                    th.style.width = Math.max(50, startW + diff) + 'px';
                    th.style.minWidth = Math.max(50, startW + diff) + 'px';
                };
                const onUp = () => {
                    handle.classList.remove('dragging');
                    document.removeEventListener('mousemove', onMove);
                    document.removeEventListener('mouseup', onUp);
                };
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onUp);
            };
            return e('div', { className: 'dg-modern-table-wrap' },
                e('table', { ref: tableRef, className: 'dg-modern-table', style: Object.assign({ tableLayout: 'auto' }, minWidth ? { minWidth } : {}) },
                    e('thead', null,
                        e('tr', null,
                            headers.map((header, idx) =>
                                e('th', { key: idx, className: idx === headers.length - 1 ? 'text-center' : '' },
                                    header,
                                    idx < headers.length - 1 && e('div', {
                                        className: 'dg-resize-handle',
                                        onMouseDown: (ev) => startResize(idx, ev)
                                    })
                                )
                            )
                        )
                    ),
                    e('tbody', null,
                        rows.map((row, rIdx) =>
                            e('tr', { key: rIdx },
                                row.map((cell, cIdx) =>
                                    e('td', { key: cIdx, className: cIdx === 0 ? 'text-center' : '' },
                                        renderCell ? renderCell(cell, cIdx, row, rIdx) : cell
                                    )
                                )
                            )
                        )
                    )
                )
            );
        };

        const SectorLimitTable = () =>
            e('div', { className: 'dg-modern-table-wrap' },
                e('table', { className: 'dg-modern-table dg-sector-table', style: { minWidth: 1040 } },
                    e('colgroup', null,
                        e('col', { className: 'dg-sector-col-stt' }),
                        e('col', { className: 'dg-sector-col-industry' }),
                        e('col', { className: 'dg-sector-col-value' }),
                        e('col', { className: 'dg-sector-col-value' }),
                        e('col', { className: 'dg-sector-col-value' }),
                        e('col', { className: 'dg-sector-col-value' }),
                        e('col', { className: 'dg-sector-col-value' }),
                        e('col', { className: 'dg-sector-col-value' }),
                        e('col', { className: 'dg-sector-col-actions' })
                    ),
                    e('thead', null,
                        e('tr', null,
                            e('th', { rowSpan: 2, className: 'text-center' }, 'STT'),
                            e('th', { rowSpan: 2 }, 'Ngành cấp 2'),
                            e('th', { colSpan: 3, className: 'text-center dg-group-header' }, 'GHTD ngành theo dư nợ'),
                            e('th', { colSpan: 3, className: 'text-center dg-group-header' }, 'GHTD ngành theo cam kết'),
                            e('th', { rowSpan: 2, className: 'text-center' }, 'Tác vụ')
                        ),
                        e('tr', null,
                            ['Cuối kỳ', 'Tối đa trong kỳ', 'Thực hiện', 'Cuối kỳ', 'Tối đa trong kỳ', 'Thực hiện'].map((header, idx) =>
                                e('th', { key: idx, className: 'text-center' }, header)
                            )
                        )
                    ),
                    e('tbody', null,
                        sectorRows.map((row, rIdx) =>
                            e('tr', { key: rIdx },
                                e('td', { className: 'text-center' }, rIdx + 1),
                                row.map((cell, cIdx) => e('td', { key: cIdx, className: cIdx > 0 ? 'text-center' : '' }, cell)),
                                e('td', { className: 'text-center' },
                                    e(Actions, {
                                        onView: () => setViewSectorIndex(rIdx),
                                        onEdit: () => openSectorModal(rIdx),
                                        onDelete: () => setConfirmDeleteSectorIndex(rIdx)
                                    })
                                )
                            )
                        )
                    )
                )
            );

        const Section = ({ icon, title, children }) =>
            e('section', { className: 'dg-modern-section' },
                e('div', { className: 'dg-modern-title' },
                    e('i', { className: icon }),
                    e('span', null, title)
                ),
                children
            );

        const SubBlock = ({ icon, title, children, action, locked, collapsed, onToggle }) =>
            e(React.Fragment, null,
                e('div', {
                    className: 'dg-modern-subtitle',
                    onClick: onToggle || undefined,
                    style: onToggle ? { cursor: 'pointer' } : null
                },
                    e('div', { className: 'dg-modern-subtitle-main' },
                        e('i', { className: icon }),
                        e('span', null, title)
                    ),
                    e('div', { className: 'flex items-center gap-3' },
                        action,
                        locked && e('i', { className: 'fas fa-lock text-gray-300 text-xs' }),
                        locked && e('i', { className: 'fas fa-chevron-' + (collapsed ? 'down' : 'up') + ' text-gray-400 text-xs' })
                    )
                ),
                !collapsed && e('div', { className: 'dg-modern-body' }, children)
            );

        const AssessmentRow = ({ value, onChange }) =>
            e('div', { className: 'dg-check-row' },
                e('span', { className: 'text-sm font-bold text-[#005f5b] mr-2' }, 'Đánh giá ý kiến Bộ phận đề xuất'),
                e('label', null,
                    e('input', { type: 'checkbox', checked: value === 'day-du', onChange: () => onChange('day-du') }),
                    'Đã đánh giá đầy đủ'
                ),
                e('label', null,
                    e('input', { type: 'checkbox', checked: value === 'bo-sung', onChange: () => onChange('bo-sung') }),
                    'Bổ sung ý kiến'
                )
            );

        const Editor = ({ placeholder, children, readOnly }) =>
            e('div', { className: 'dg-editor' + (readOnly ? ' dg-editor-readonly' : '') },
                e('div', { className: 'dg-editor-toolbar' },
                    e('select', null, e('option', null, 'Normal text')),
                    e('button', { type: 'button', className: 'font-bold' }, 'B'),
                    e('button', { type: 'button', className: 'italic' }, 'I'),
                    e('button', { type: 'button', className: 'underline' }, 'U'),
                    e('button', { type: 'button' }, e('i', { className: 'fas fa-list-ol' })),
                    e('button', { type: 'button' }, e('i', { className: 'fas fa-list-ul' }))
                ),
                e('div', { className: 'dg-editor-content', contentEditable: !readOnly, suppressContentEditableWarning: true },
                    children || e('span', { className: 'text-slate-400 italic' }, placeholder || 'Nhập nội dung đánh giá...')
                ),
                e('div', { className: 'dg-editor-count' }, '0/2000')
            );

        const riskHeaders = ['STT', 'Loại rủi ro', 'Rủi ro cụ thể', 'Biện pháp kiểm soát của Khách hàng', 'Biện pháp kiểm soát của Ngân hàng', 'Tác vụ'];
        const policyHeaders = ['STT', 'Văn bản/quy định', 'Kết quả đánh giá', 'Chi tiết đánh giá', 'Tác vụ'];
        const updateRiskForm = (field, value) => setRiskForm(prev => ({ ...prev, [field]: value }));
        const updatePolicyForm = (field, value) => setPolicyForm(prev => ({ ...prev, [field]: value }));
        const saveRiskForm = () => {
            const nextRow = [
                    riskForm.loai || 'Rủi ro tín dụng',
                    riskForm.ruiRo || 'Rủi ro cần bổ sung',
                    riskForm.bienPhapKH || 'Biện pháp kiểm soát của Khách hàng',
                    riskForm.bienPhapNH || 'Biện pháp kiểm soát của Ngân hàng'
                ];
            setRiskTdrrRows(prev => editingRiskIndex === null
                ? [...prev, nextRow]
                : prev.map((row, idx) => idx === editingRiskIndex ? nextRow : row)
            );
            setRiskForm({ loai: 'Rủi ro tín dụng', ruiRo: '', bienPhapKH: '', bienPhapNH: '' });
            setEditingRiskIndex(null);
            setRiskSaved(true);
            setShowRiskModal(false);
        };
        const openEditRisk = (rowIndex) => {
            const row = riskTdrrRows[rowIndex];
            setEditingRiskIndex(rowIndex);
            setRiskForm({
                loai: row[0] || 'Rủi ro tín dụng',
                ruiRo: row[1] || '',
                bienPhapKH: row[2] || '',
                bienPhapNH: row[3] || ''
            });
            setShowRiskModal(true);
        };
        const closeRiskModal = () => {
            setShowRiskModal(false);
            setEditingRiskIndex(null);
            setRiskForm({ loai: 'Rủi ro tín dụng', ruiRo: '', bienPhapKH: '', bienPhapNH: '' });
        };
        const deleteRisk = () => {
            setRiskTdrrRows(prev => prev.filter((_, idx) => idx !== confirmDeleteRiskIndex));
            setConfirmDeleteRiskIndex(null);
        };
        const RiskModal = () =>
            showRiskModal && e('div', { className: 'fixed inset-0 bg-black/30 flex items-center justify-center z-[9999] p-4' },
                e('div', { className: 'bg-white rounded-lg shadow-2xl w-full max-w-[520px] border border-gray-200 overflow-hidden' },
                    e('div', { className: 'flex items-start justify-between px-5 py-4 border-b border-gray-100' },
                        e('div', null,
                            e('h3', { className: 'text-base font-bold text-[#005f5b]' }, editingRiskIndex === null ? 'Thêm mới rủi ro và biện pháp kiểm soát' : 'Chỉnh sửa rủi ro và biện pháp kiểm soát')
                        ),
                        e('button', { type: 'button', className: 'text-gray-400 hover:text-gray-600', onClick: closeRiskModal },
                            e('i', { className: 'fas fa-times' })
                        )
                    ),
                    e('div', { className: 'p-5 space-y-4' },
                        e('div', null,
                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1.5' }, 'Loại rủi ro ', e('span', { className: 'text-red-500' }, '*')),
                            e('select', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-[#006B68]',
                                value: riskForm.loai,
                                onChange: ev => updateRiskForm('loai', ev.target.value)
                            },
                                ['Rủi ro tín dụng', 'Rủi ro thanh toán', 'Rủi ro pháp lý', 'Rủi ro TSBĐ', 'Rủi ro tiến độ', 'Rủi ro dòng tiền', 'Rủi ro chi phí'].map(item =>
                                    e('option', { key: item, value: item }, item)
                                )
                            )
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1.5' }, 'Rủi ro cụ thể ', e('span', { className: 'text-red-500' }, '*')),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#006B68]',
                                value: riskForm.ruiRo,
                                onChange: ev => updateRiskForm('ruiRo', ev.target.value),
                                placeholder: 'Nhập rủi ro cụ thể...'
                            })
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1.5' }, 'Biện pháp kiểm soát của Khách hàng ', e('span', { className: 'text-red-500' }, '*')),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#006B68]',
                                value: riskForm.bienPhapKH,
                                onChange: ev => updateRiskForm('bienPhapKH', ev.target.value),
                                placeholder: 'Nhập biện pháp kiểm soát rủi ro của Khách hàng...'
                            })
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1.5' }, 'Biện pháp kiểm soát của Ngân hàng ', e('span', { className: 'text-red-500' }, '*')),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#006B68]',
                                value: riskForm.bienPhapNH,
                                onChange: ev => updateRiskForm('bienPhapNH', ev.target.value),
                                placeholder: 'Nhập biện pháp kiểm soát rủi ro của Ngân hàng...'
                            })
                        )
                    ),
                    e('div', { className: 'flex justify-end gap-3 px-5 py-4 bg-gray-50 border-t border-gray-100' },
                        e('button', {
                            type: 'button',
                            className: 'px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100',
                            onClick: closeRiskModal
                        }, 'Hủy'),
                        e('button', {
                            type: 'button',
                            className: 'px-4 py-2 bg-[#006B68] rounded-lg text-sm font-semibold text-white hover:bg-[#005a57]',
                            onClick: saveRiskForm
                        }, 'Lưu')
                    )
                )
            );
        const ConfirmDeleteRiskModal = () =>
            confirmDeleteRiskIndex !== null && e('div', { className: 'fixed inset-0 bg-black/30 flex items-center justify-center z-[9999] p-4' },
                e('div', { className: 'bg-white rounded-lg shadow-2xl w-full max-w-[420px] border border-gray-200 overflow-hidden' },
                    e('div', { className: 'px-5 py-4 border-b border-gray-100' },
                        e('h3', { className: 'text-base font-bold text-gray-800' }, 'Thông báo xác nhận')
                    ),
                    e('div', { className: 'px-5 py-5 text-sm text-gray-700 italic' }, 'Bạn có chắc chắn muốn xóa bản ghi đánh giá này?'),
                    e('div', { className: 'flex justify-end gap-3 px-5 py-4 bg-gray-50 border-t border-gray-100' },
                        e('button', {
                            type: 'button',
                            className: 'px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100',
                            onClick: () => setConfirmDeleteRiskIndex(null)
                        }, 'Hủy'),
                        e('button', {
                            type: 'button',
                            className: 'px-4 py-2 bg-red-600 rounded-lg text-sm font-semibold text-white hover:bg-red-700',
                            onClick: deleteRisk
                        }, 'Xóa')
                    )
                )
            );
        const savePolicyForm = () => {
            const nextRow = [
                policyForm.vanBan || 'Chính sách cấp tín dụng',
                policyForm.ketQua || 'Đáp ứng',
                policyForm.chiTiet || 'Chi tiết đánh giá',
                policyForm.dieuKien || 'Điều kiện/biện pháp kiểm soát'
            ];
            setPolicyTdrrRows(prev => editingPolicyIndex === null
                ? [...prev, nextRow]
                : prev.map((row, idx) => idx === editingPolicyIndex ? nextRow : row)
            );
            setPolicyForm({ vanBan: 'Chính sách cấp tín dụng', ketQua: 'Đáp ứng', chiTiet: '', dieuKien: '' });
            setEditingPolicyIndex(null);
            setPolicySaved(true);
            setShowPolicyModal(false);
        };
        const openEditPolicy = (rowIndex) => {
            const row = policyTdrrRows[rowIndex];
            setEditingPolicyIndex(rowIndex);
            setPolicyForm({ vanBan: row[0] || '', ketQua: row[1] || 'Đáp ứng', chiTiet: row[2] || '', dieuKien: row[3] || '' });
            setShowPolicyModal(true);
        };
        const closePolicyModal = () => {
            setShowPolicyModal(false);
            setEditingPolicyIndex(null);
            setPolicyForm({ vanBan: 'Chính sách cấp tín dụng', ketQua: 'Đáp ứng', chiTiet: '', dieuKien: '' });
        };
        const deletePolicy = () => {
            setPolicyTdrrRows(prev => prev.filter((_, idx) => idx !== confirmDeletePolicyIndex));
            setConfirmDeletePolicyIndex(null);
        };
        const updateArrayForm = (setter, idx, value) => setter(prev => prev.map((item, itemIdx) => itemIdx === idx ? value : item));
        const openQlrrModal = (rowIndex) => {
            if (rowIndex === null) {
                setEditingQlrrIndex(null);
                setQlrrForm(['', '', '', '', '', 'Trong giới hạn', '']);
            } else {
                setEditingQlrrIndex(rowIndex);
                setQlrrForm([...(qlrrRows[rowIndex] || ['', '', '', '', '', 'Trong giới hạn', ''])]);
            }
            setShowQlrrModal(true);
        };
        const saveQlrrForm = () => {
            setQlrrRows(prev => editingQlrrIndex === null
                ? [...prev, qlrrForm]
                : prev.map((row, idx) => idx === editingQlrrIndex ? qlrrForm : row)
            );
            setShowQlrrModal(false);
            setEditingQlrrIndex(null);
        };
        const openSectorModal = (rowIndex) => {
            if (rowIndex === null) {
                setEditingSectorIndex(null);
                setSectorForm(['', '', '', '', '', '', '']);
            } else {
                setEditingSectorIndex(rowIndex);
                setSectorForm([...(sectorRows[rowIndex] || ['', '', '', '', '', '', ''])]);
            }
            setShowSectorModal(true);
        };
        const saveSectorForm = () => {
            setSectorRows(prev => editingSectorIndex === null
                ? [...prev, sectorForm]
                : prev.map((row, idx) => idx === editingSectorIndex ? sectorForm : row)
            );
            setShowSectorModal(false);
            setEditingSectorIndex(null);
        };
        const PolicyModal = () =>
            showPolicyModal && e('div', { className: 'fixed inset-0 bg-black/30 flex items-center justify-center z-[9999] p-4' },
                e('div', { className: 'bg-white rounded-lg shadow-2xl w-full max-w-[520px] border border-gray-200 overflow-hidden' },
                    e('div', { className: 'flex items-start justify-between px-5 py-4 border-b border-gray-100' },
                        e('h3', { className: 'text-base font-bold text-[#005f5b]' }, editingPolicyIndex === null ? 'Thêm mới đánh giá tuân thủ quy định, chính sách tín dụng' : 'Chỉnh sửa đánh giá tuân thủ quy định, chính sách tín dụng'),
                        e('button', { type: 'button', className: 'text-gray-400 hover:text-gray-600', onClick: closePolicyModal },
                            e('i', { className: 'fas fa-times' })
                        )
                    ),
                    e('div', { className: 'p-5 space-y-4' },
                        e('div', null,
                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1.5' }, 'Văn bản/quy định ', e('span', { className: 'text-red-500' }, '*')),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#006B68]',
                                value: policyForm.vanBan,
                                onChange: ev => updatePolicyForm('vanBan', ev.target.value),
                                placeholder: 'Nhập văn bản/quy định...'
                            })
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1.5' }, 'Kết quả đánh giá ', e('span', { className: 'text-red-500' }, '*')),
                            e('select', {
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-[#006B68]',
                                value: policyForm.ketQua,
                                onChange: ev => updatePolicyForm('ketQua', ev.target.value)
                            },
                                e('option', { value: 'Đáp ứng' }, 'Đáp ứng'),
                                e('option', { value: 'Không đáp ứng' }, 'Không đáp ứng')
                            )
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1.5' }, 'Chi tiết đánh giá ', e('span', { className: 'text-red-500' }, '*')),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#006B68]',
                                value: policyForm.chiTiet,
                                onChange: ev => updatePolicyForm('chiTiet', ev.target.value),
                                placeholder: 'Nhập chi tiết đánh giá...'
                            })
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1.5' }, 'Điều kiện/biện pháp kiểm soát ', e('span', { className: 'text-red-500' }, '*')),
                            e('input', {
                                type: 'text',
                                className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#006B68]',
                                value: policyForm.dieuKien,
                                onChange: ev => updatePolicyForm('dieuKien', ev.target.value),
                                placeholder: 'Nhập điều kiện/biện pháp kiểm soát...'
                            })
                        )
                    ),
                    e('div', { className: 'flex justify-end gap-3 px-5 py-4 bg-gray-50 border-t border-gray-100' },
                        e('button', {
                            type: 'button',
                            className: 'px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100',
                            onClick: closePolicyModal
                        }, 'Hủy'),
                        e('button', {
                            type: 'button',
                            className: 'px-4 py-2 bg-[#006B68] rounded-lg text-sm font-semibold text-white hover:bg-[#005a57]',
                            onClick: savePolicyForm
                        }, 'Lưu')
                    )
                )
            );
        const SimpleConfirmModal = ({ show, title, message, onCancel, onConfirm }) =>
            show && e('div', { className: 'fixed inset-0 bg-black/30 flex items-center justify-center z-[9999] p-4' },
                e('div', { className: 'bg-white rounded-lg shadow-2xl w-full max-w-[420px] border border-gray-200 overflow-hidden' },
                    e('div', { className: 'px-5 py-4 border-b border-gray-100' }, e('h3', { className: 'text-base font-bold text-gray-800' }, title)),
                    e('div', { className: 'px-5 py-5 text-sm text-gray-700 italic' }, message),
                    e('div', { className: 'flex justify-end gap-3 px-5 py-4 bg-gray-50 border-t border-gray-100' },
                        e('button', { type: 'button', className: 'px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100', onClick: onCancel }, 'Hủy'),
                        e('button', { type: 'button', className: 'px-4 py-2 bg-red-600 rounded-lg text-sm font-semibold text-white hover:bg-red-700', onClick: onConfirm }, 'Xóa')
                    )
                )
            );
        const ArrayFormModal = ({ show, title, labels, values, setValues, onCancel, onSave }) =>
            show && e('div', { className: 'fixed inset-0 bg-black/30 flex items-center justify-center z-[9999] p-4' },
                e('div', { className: 'bg-white rounded-lg shadow-2xl w-full max-w-[620px] border border-gray-200 overflow-hidden' },
                    e('div', { className: 'flex items-center justify-between px-5 py-4 border-b border-gray-100' },
                        e('h3', { className: 'text-base font-bold text-[#005f5b]' }, title),
                        e('button', { type: 'button', className: 'text-gray-400 hover:text-gray-600', onClick: onCancel }, e('i', { className: 'fas fa-times' }))
                    ),
                    e('div', { className: 'p-5 grid grid-cols-1 md:grid-cols-2 gap-4' },
                        labels.map((label, idx) =>
                            e('div', { key: idx },
                                e('label', { className: 'block text-sm font-semibold text-gray-700 mb-1.5' }, label),
                                e('input', {
                                    type: 'text',
                                    className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#006B68]',
                                    value: values[idx] || '',
                                    onChange: ev => updateArrayForm(setValues, idx, ev.target.value),
                                    placeholder: 'Nhập ' + label.toLowerCase() + '...'
                                })
                            )
                        )
                    ),
                    e('div', { className: 'flex justify-end gap-3 px-5 py-4 bg-gray-50 border-t border-gray-100' },
                        e('button', { type: 'button', className: 'px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100', onClick: onCancel }, 'Hủy'),
                        e('button', { type: 'button', className: 'px-4 py-2 bg-[#006B68] rounded-lg text-sm font-semibold text-white hover:bg-[#005a57]', onClick: onSave }, 'Lưu')
                    )
                )
            );
        const SectorViewModal = () => {
            const row = viewSectorIndex !== null ? sectorRows[viewSectorIndex] : null;
            return row && e('div', { className: 'fixed inset-0 bg-black/30 flex items-center justify-center z-[9999] p-4' },
                e('div', { className: 'bg-white rounded-lg shadow-2xl w-full max-w-[620px] border border-gray-200 overflow-hidden' },
                    e('div', { className: 'flex items-center justify-between px-5 py-4 border-b border-gray-100' },
                        e('h3', { className: 'text-base font-bold text-[#005f5b]' }, 'Chi tiết giới hạn tín dụng ngành'),
                        e('button', { type: 'button', className: 'text-gray-400 hover:text-gray-600', onClick: () => setViewSectorIndex(null) }, e('i', { className: 'fas fa-times' }))
                    ),
                    e('div', { className: 'p-5 grid grid-cols-1 md:grid-cols-2 gap-3' },
                        sectorLabels.map((label, idx) =>
                            e('div', { key: label, className: 'dg-detail-field' },
                                e('div', { className: 'dg-detail-label' }, label),
                                e('div', { className: 'dg-detail-value' }, row[idx] || '-')
                            )
                        )
                    ),
                    e('div', { className: 'flex justify-end gap-3 px-5 py-4 bg-gray-50 border-t border-gray-100' },
                        e('button', { type: 'button', className: 'px-4 py-2 bg-[#006B68] rounded-lg text-sm font-semibold text-white hover:bg-[#005a57]', onClick: () => setViewSectorIndex(null) }, 'Đóng')
                    )
                )
            );
        };

        return e('div', { className: 'dg-modern space-y-4' },
            Section({ icon: 'fas fa-shield-halved', title: 'Đánh giá rủi ro & biện pháp kiểm soát',
                children: e(React.Fragment, null,
                    SubBlock({
                        icon: 'fas fa-lightbulb',
                        title: 'Ý kiến Bộ phận đề xuất',
                        locked: true,
                        collapsed: !riskBpdxOpen,
                        onToggle: () => setRiskBpdxOpen(prev => !prev),
                        children: e(Editor, { readOnly: true },
                            e('ol', { className: 'dg-editor-list' },
                                riskBpdxRows.map((row, idx) =>
                                    e('li', { key: idx },
                                        e('p', null, e('strong', null, row[0]), ': ', row[1]),
                                        e('p', null, e('strong', null, 'Biện pháp kiểm soát của Khách hàng: '), row[2]),
                                        e('p', null, e('strong', null, 'Biện pháp kiểm soát của Ngân hàng: '), row[3])
                                    )
                                )
                            )
                        )
                    }),
                    SubBlock({
                        icon: 'fas fa-clipboard-check',
                        title: 'Ý kiến Bộ phận Thẩm định rủi ro',
                        children: e(React.Fragment, null,
                            e(AssessmentRow, { value: riskAssessment, onChange: setRiskAssessment }),
                            riskAssessment === 'bo-sung' && e(Editor, { placeholder: 'Nhập ý kiến thẩm định rủi ro bổ sung...' })
                        )
                    })
                )
            }),

            Section({ icon: 'fas fa-clipboard-check', title: 'Đánh giá tuân thủ quy định, chính sách tín dụng',
                children: e(React.Fragment, null,
                    SubBlock({
                        icon: 'fas fa-lightbulb',
                        title: 'Ý kiến Bộ phận đề xuất',
                        locked: true,
                        collapsed: !policyBpdxOpen,
                        onToggle: () => setPolicyBpdxOpen(prev => !prev),
                        children: Table({
                            headers: policyHeaders,
                            rows: policyBpdxRows.map((row, idx) => [idx + 1, ...row, 'actions']),
                            renderCell: (cell, cIdx) => cIdx === 2 ? e(StatusPill, { value: cell }) : cIdx === 4 ? e(Actions, { disabled: true }) : cell
                        })
                    }),
                    SubBlock({
                        icon: 'fas fa-clipboard-check',
                        title: 'Ý kiến Bộ phận Thẩm định rủi ro',
                        children: e(React.Fragment, null,
                            e(AssessmentRow, { value: policyAssessment, onChange: setPolicyAssessment }),
                            policyAssessment === 'bo-sung' && e('div', { className: 'flex justify-end mb-3' },
                                e('button', {
                                    type: 'button',
                                    className: 'dg-add-btn',
                                    onClick: () => setShowPolicyModal(true)
                                }, e('i', { className: 'fas fa-plus' }), 'Thêm mới')
                            ),
                            policyAssessment === 'bo-sung' && policySaved && Table({
                                headers: ['STT', 'Văn bản/quy định', 'Kết quả đánh giá', 'Chi tiết đánh giá', 'Điều kiện/biện pháp kiểm soát', 'Tác vụ'],
                                rows: policyTdrrRows.map((row, idx) => [idx + 1, ...row, 'actions']),
                                minWidth: 1040,
                                renderCell: (cell, cIdx, row, rIdx) => cIdx === 2
                                    ? e(StatusPill, { value: cell })
                                    : cIdx === 5
                                        ? e(Actions, { onEdit: () => openEditPolicy(rIdx), onDelete: () => setConfirmDeletePolicyIndex(rIdx) })
                                        : String(cell).split('\n').map((line, idx) => e('div', { key: idx }, line))
                            })
                        )
                    })
                )
            }),

            Section({ icon: 'fas fa-scale-balanced', title: 'Đánh giá tuân thủ chính sách & giới hạn QLRR',
                children: e(React.Fragment, null,
                    SubBlock({
                        icon: 'fas fa-chart-line',
                        title: 'Chỉ tiêu QLRR tín dụng tập trung',
                        action: e('div', { className: 'flex items-center gap-2' },
                            e('button', { type: 'button', className: 'dg-add-btn', onClick: () => openQlrrModal(null) }, e('i', { className: 'fas fa-plus' }), 'Thêm mới')
                        ),
                        children: e(React.Fragment, null,
                            e('div', { className: 'flex items-center gap-2 mb-2 px-1' },
                                e('span', { className: 'text-xs italic text-[#006B68]' },
                                    'Kéo các cột vào để giãn cột ghi chú. Cột "Ghi chú" có định dạng textbox để nhập giải trình'
                                )
                            ),
                            Table({
                                headers: ['STT', 'Chỉ tiêu', 'Quy định', 'Tổng dư nợ (tỷ đồng)', 'Chỉ tiêu vốn (tỷ đồng)', 'Giá trị thực tế (%)', 'Kết quả đánh giá', 'Ghi chú', 'Tác vụ'],
                                rows: qlrrRows.map((row, idx) => [idx + 1, ...row, 'actions']),
                                minWidth: 1040,
                                renderCell: (cell, cIdx, row, rIdx) => cIdx === 6
                                    ? e(StatusPill, { value: cell })
                                    : cIdx === 7
                                        ? e('input', {
                                            type: 'text',
                                            className: 'dg-ghichu-input',
                                            placeholder: 'Nhập...',
                                            value: cell || '',
                                            onChange: (ev) => setQlrrRows(prev => prev.map((r, i) => i === rIdx ? [...r.slice(0, 6), ev.target.value] : r))
                                        })
                                        : cIdx === 8
                                            ? e(Actions, { onEdit: () => openQlrrModal(rIdx), onDelete: () => setConfirmDeleteQlrrIndex(rIdx) })
                                            : cell
                            })
                        )
                    }),
                    SubBlock({
                        icon: 'fas fa-industry',
                        title: 'Giới hạn tín dụng ngành',
                        action: e('div', { className: 'flex items-center gap-2' },
                            syncButton('giới hạn tín dụng ngành'),
                            e('button', { type: 'button', className: 'dg-add-btn', onClick: () => openSectorModal(null) }, e('i', { className: 'fas fa-plus' }), 'Thêm mới')
                        ),
                        children: e(SectorLimitTable)
                    })
                )
            }),

            Section({ icon: 'fas fa-chart-simple', title: 'Đánh giá chung',
                children: e(React.Fragment, null,
                    SubBlock({
                        icon: 'fas fa-lightbulb',
                        title: 'Ý kiến Bộ phận đề xuất',
                        locked: true,
                        collapsed: !generalBpdxOpen,
                        onToggle: () => setGeneralBpdxOpen(prev => !prev),
                        children: e('div', { className: 'text-sm text-slate-500 italic' }, 'Nội dung được tổng hợp từ bộ phận đề xuất.')
                    }),
                    SubBlock({
                        icon: 'fas fa-clipboard-check',
                        title: 'Ý kiến Bộ phận Thẩm định rủi ro',
                        children: e(React.Fragment, null,
                            e(AssessmentRow, { value: generalAssessment, onChange: setGeneralAssessment }),
                            generalAssessment === 'bo-sung' && e(Editor, null)
                        )
                    })
                )
            }),
            RiskModal(),
            ConfirmDeleteRiskModal(),
            PolicyModal(),
            SimpleConfirmModal({
                show: confirmDeletePolicyIndex !== null,
                title: 'Thông báo xác nhận',
                message: 'Bạn có chắc chắn muốn xóa bản ghi đánh giá này?',
                onCancel: () => setConfirmDeletePolicyIndex(null),
                onConfirm: deletePolicy
            }),
            ArrayFormModal({
                show: showQlrrModal,
                title: editingQlrrIndex === null ? 'Thêm mới chỉ tiêu QLRR tín dụng tập trung' : 'Chỉnh sửa chỉ tiêu QLRR tín dụng tập trung',
                labels: ['Chỉ tiêu', 'Quy định', 'Tổng dư nợ (tỷ đồng)', 'Chỉ tiêu vốn (tỷ đồng)', 'Giá trị thực tế (%)', 'Kết quả đánh giá', 'Ghi chú'],
                values: qlrrForm,
                setValues: setQlrrForm,
                onCancel: () => { setShowQlrrModal(false); setEditingQlrrIndex(null); },
                onSave: saveQlrrForm
            }),
            SimpleConfirmModal({
                show: confirmDeleteQlrrIndex !== null,
                title: 'Thông báo xác nhận',
                message: 'Bạn có chắc chắn muốn xóa bản ghi đánh giá này?',
                onCancel: () => setConfirmDeleteQlrrIndex(null),
                onConfirm: () => { setQlrrRows(prev => prev.filter((_, idx) => idx !== confirmDeleteQlrrIndex)); setConfirmDeleteQlrrIndex(null); }
            }),
            ArrayFormModal({
                show: showSectorModal,
                title: editingSectorIndex === null ? 'Thêm mới giới hạn tín dụng ngành' : 'Chỉnh sửa giới hạn tín dụng ngành',
                labels: sectorLabels,
                values: sectorForm,
                setValues: setSectorForm,
                onCancel: () => { setShowSectorModal(false); setEditingSectorIndex(null); },
                onSave: saveSectorForm
            }),
            SectorViewModal(),
            SimpleConfirmModal({
                show: confirmDeleteSectorIndex !== null,
                title: 'Thông báo xác nhận',
                message: 'Bạn có chắc chắn muốn xóa bản ghi đánh giá này?',
                onCancel: () => setConfirmDeleteSectorIndex(null),
                onConfirm: () => { setSectorRows(prev => prev.filter((_, idx) => idx !== confirmDeleteSectorIndex)); setConfirmDeleteSectorIndex(null); }
            })
        );
    }

    // Hồ sơ categories với đầy đủ thông tin
    const hoSoCategories = [
        {
            id: 'phapLy',
            label: 'Hồ sơ pháp lý doanh nghiệp',
            count: 3,
            items: [
                { id: 'pl1', label: 'Giấy tờ thành lập và đăng ký hoạt động', code: 'QĐ-20192', ngayBanHanh: '20/11/2022', donVi: 'Trụ sở chính' },
                { id: 'pl2', label: 'Quyết định thành lập doanh nghiệp/Giấy chứng nhận đăng ký doanh nghiệp/Giấy chứng nhận đăng ký đầu tư', code: 'QĐ-20192', ngayBanHanh: '20/11/2022', donVi: 'Trụ sở chính' },
                { id: 'pl3', label: 'Giấy chứng nhận đăng ký mã số thuế', code: 'QĐ-20192', ngayBanHanh: '20/11/2022', donVi: 'Trụ sở chính' }
            ]
        },
        {
            id: 'taiChinh',
            label: 'Hồ sơ tài chính',
            count: 6,
            items: []
        },
        {
            id: 'khachHang',
            label: 'Hồ sơ Khách hàng liên quan',
            count: 18,
            items: [
                { id: 'kh1', label: 'Giấy tờ thành lập và đăng ký hoạt động', code: 'QĐ-20192', ngayBanHanh: '20/11/2022', donVi: 'Trụ sở chính' },
                { id: 'kh2', label: 'Giấy tờ thành lập và đăng ký hoạt động', code: 'QĐ-20192', ngayBanHanh: '20/11/2022', donVi: 'Trụ sở chính' }
            ]
        },
        {
            id: 'taiSan',
            label: 'Hồ sơ Tài sản đảm bảo',
            count: 18,
            items: []
        },
        {
            id: 'khac',
            label: 'Hồ sơ khác',
            count: 38,
            items: []
        }
    ];

    // Handlers
    const handleCheckboxChange = (value) => {
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter(v => v !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    const handleConfirm = () => {
        if (selectedOptions.length > 0) {
            const labels = {
                'nganHan': 'Ngắn hạn',
                'trungDaiHan': 'Trung dài hạn',
                'toChucTinDung': 'Tổ chức tín dụng'
            };
            const newItems = selectedOptions.map(opt => ({
                id: opt,
                label: labels[opt]
            }));
            const updatedList = [...phuongAnList, ...newItems];
            setPhuongAnList(updatedList);
            if (!activePhuongAn && newItems.length > 0) {
                setActivePhuongAn(newItems[0].id);
            }
            setSelectedOptions([]);
            setShowModal(false);
        }
    };

    const handleSave = () => {
        setIsEditMode(false);
        setToastMessage('Đã lưu thông tin phương án');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Delete phương án
    const handleDeletePA = (paId) => {
        if (confirm('Bạn có chắc muốn xóa phương án này?')) {
            setPhuongAnList(prev => prev.filter(pa => pa.id !== paId));
            if (activePhuongAn === paId) setActivePhuongAn(null);
            setToastMessage('Đã xóa phương án thành công');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    // Reset form
    const handleResetForm = () => {
        setFormData({
            tenPhuongAn: '',
            thongTinChung: '',
            danhGiaNhuCau: '',
            yKienDanhGia: 'day-du',
            ghiChu: '',
            nhuCauTinDung: 'hop-phap',
            tinhKhaThi: 'kha-thi',
            khaNangThucHien: 'dam-bao'
        });
        setToastMessage('Đã đặt lại form');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const toggleSection = (sectionId) => {
        if (expandedSections.includes(sectionId)) {
            setExpandedSections(expandedSections.filter(id => id !== sectionId));
        } else {
            setExpandedSections([...expandedSections, sectionId]);
        }
    };

    const toggleHoSoCategory = (catId) => {
        if (expandedHoSoCategories.includes(catId)) {
            setExpandedHoSoCategories(expandedHoSoCategories.filter(id => id !== catId));
        } else {
            setExpandedHoSoCategories([...expandedHoSoCategories, catId]);
        }
    };

    const toggleHoSoItem = (itemId) => {
        if (selectedHoSo.includes(itemId)) {
            setSelectedHoSo(selectedHoSo.filter(id => id !== itemId));
        } else {
            setSelectedHoSo([...selectedHoSo, itemId]);
        }
    };

    // Get selected ho so details
    const getSelectedHoSoDetails = () => {
        return hoSoCategories.flatMap(cat => cat.items).filter(item => selectedHoSo.includes(item.id));
    };

    // Render Section với collapse (hỗ trợ headerExtra cho button inline)
    const renderSection = (id, title, content, headerExtra) => {
        const isExpanded = expandedSections.includes(id);
        const plainTitle = title.includes(' ') ? title.substring(title.indexOf(' ') + 1) : title;
        const sectionMeta = plainTitle.includes('Hồ sơ')
            ? { icon: 'fas fa-folder', cls: 'section-icon-folder' }
            : plainTitle.includes('Thông tin')
                ? { icon: 'fas fa-file-alt', cls: 'section-icon-document' }
                : plainTitle.includes('Kết luận')
                    ? { icon: 'fas fa-check-circle', cls: 'section-icon-success' }
                    : { icon: 'fas fa-chart-line', cls: 'section-icon-assessment' };
        return e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
            e('div', {
                className: 'section-row-header flex items-center justify-between px-4 py-3 cursor-pointer',
                onClick: () => toggleSection(id)
            },
                e('div', { className: 'flex items-center gap-2' },
                    e('span', { className: 'section-heading-icon ' + sectionMeta.cls },
                        e('i', { className: sectionMeta.icon })
                    ),
                    e('span', { className: 'font-semibold text-gray-800' }, plainTitle)
                ),
                e('div', { className: 'flex items-center gap-3' },
                    headerExtra || null,
                    e('i', { className: 'fas fa-chevron-' + (isExpanded ? 'up' : 'down') + ' text-gray-400' })
                )
            ),
            isExpanded && e('div', { className: 'p-4 border-t border-gray-200' }, content())
        );
    };

    // ========== EMPTY STATE ==========
    if (phuongAnList.length === 0) {
        return e('div', { className: 'credit-workspace space-y-5' },
            // Empty state card
            e('div', { className: 'content-card' },
                e('div', { className: 'flex flex-col items-center justify-center py-24' },
                    e('div', { className: 'w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center mb-5' },
                        e('i', { className: 'fas fa-cloud text-gray-300 text-4xl' })
                    ),
                    e('h3', { className: 'text-lg font-bold text-gray-800 mb-2' }, 'Chưa có dữ liệu'),
                    e('p', { className: 'text-sm text-gray-500 mb-6' }, 'Thêm mới phương án để hoàn thành Báo cáo'),
                    e('button', {
                        className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005a57] flex items-center gap-2',
                        onClick: () => setShowModal(true)
                    },
                        e('i', { className: 'fas fa-plus text-xs' }),
                        'Thêm phương án'
                    )
                ),
                showModal && renderPhuongAnModal()
            )
        );
    }

    // ========== MODAL CHỌN PHƯƠNG ÁN ==========
    function renderPhuongAnModal() {
        return e('div', {
            className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50',
            onClick: () => { setSelectedOptions([]); setShowModal(false); }
        },
            e('div', {
                className: 'bg-white rounded-lg shadow-xl w-full max-w-md mx-4',
                onClick: (ev) => ev.stopPropagation()
            },
                e('div', { className: 'flex items-center justify-between p-5 border-b border-gray-200' },
                    e('h3', { className: 'text-base font-semibold text-gray-800' }, 'Chọn phương án cấp tín dụng'),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: () => { setSelectedOptions([]); setShowModal(false); }
                    }, e('i', { className: 'fas fa-times' }))
                ),
                e('div', { className: 'p-5 space-y-3' },
                    ['nganHan', 'trungDaiHan', 'toChucTinDung'].map(opt => {
                        const labels = { nganHan: 'Ngắn hạn', trungDaiHan: 'Trung dài hạn', toChucTinDung: 'Tổ chức tín dụng' };
                        const isAlreadyAdded = phuongAnList.some(pa => pa.id === opt);
                        return e('label', {
                            key: opt,
                            className: 'flex items-center gap-3 cursor-pointer p-3 rounded hover:bg-gray-50 transition-colors ' + (isAlreadyAdded ? 'opacity-50 cursor-not-allowed' : '')
                        },
                            e('input', {
                                type: 'checkbox',
                                className: 'w-4 h-4 text-[#006B68] rounded border-gray-300 focus:ring-[#006B68]',
                                checked: selectedOptions.includes(opt),
                                onChange: () => !isAlreadyAdded && handleCheckboxChange(opt),
                                disabled: isAlreadyAdded
                            }),
                            e('span', { className: 'text-sm text-gray-700 font-medium' }, labels[opt])
                        );
                    })
                ),
                e('div', { className: 'flex items-center justify-end gap-2 p-5 border-t border-gray-200' },
                    e('button', {
                        className: 'px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50',
                        onClick: () => { setSelectedOptions([]); setShowModal(false); }
                    }, 'Hủy'),
                    e('button', {
                        className: 'px-4 py-2 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005a57] disabled:opacity-50',
                        onClick: handleConfirm,
                        disabled: selectedOptions.length === 0
                    }, 'Xác nhận')
                )
            )
        );
    }

    // ========== MODAL CHỌN HỒ SƠ ==========
    function renderHoSoModal() {
        return e('div', {
            className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50',
            onClick: () => { setSelectedHoSo([]); setShowHoSoModal(false); }
        },
            e('div', {
                className: 'bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4',
                onClick: (ev) => ev.stopPropagation()
            },
                // Header
                e('div', { className: 'flex items-center justify-between p-5 border-b border-gray-200' },
                    e('h3', { className: 'text-base font-semibold text-gray-800' }, 'Chọn hồ sơ từ danh mục'),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: () => { setSelectedHoSo([]); setShowHoSoModal(false); }
                    }, e('i', { className: 'fas fa-times' }))
                ),
                // Search
                e('div', { className: 'px-5 py-3 border-b border-gray-200' },
                    e('div', { className: 'relative' },
                        e('i', { className: 'fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm' }),
                        e('input', {
                            type: 'text',
                            className: 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm',
                            placeholder: 'Tìm kiếm tên hồ sơ'
                        })
                    )
                ),
                // Tree
                e('div', { className: 'p-5 max-h-96 overflow-y-auto' },
                    hoSoCategories.map(cat =>
                        e('div', { key: cat.id, className: 'mb-2' },
                            // Category header
                            e('div', {
                                className: 'flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer',
                                onClick: () => toggleHoSoCategory(cat.id)
                            },
                                e('i', { className: 'fas fa-chevron-' + (expandedHoSoCategories.includes(cat.id) ? 'down' : 'right') + ' text-gray-400 text-xs w-4' }),
                                e('input', {
                                    type: 'checkbox',
                                    className: 'w-4 h-4 text-[#006B68] rounded border-gray-300',
                                    onClick: (ev) => ev.stopPropagation()
                                }),
                                e('span', { className: 'text-sm font-medium text-gray-700' }, cat.label),
                                e('span', { className: 'text-xs text-[#006B68] font-medium' }, cat.count)
                            ),
                            // Category items
                            expandedHoSoCategories.includes(cat.id) && cat.items.length > 0 && e('div', { className: 'ml-8 space-y-1' },
                                cat.items.map(item =>
                                    e('label', {
                                        key: item.id,
                                        className: 'flex items-center gap-2 p-2 hover:bg-[#e6f4f1] rounded cursor-pointer ' + (selectedHoSo.includes(item.id) ? 'bg-[#e6f4f1]' : '')
                                    },
                                        e('input', {
                                            type: 'checkbox',
                                            className: 'w-4 h-4 text-[#006B68] rounded border-gray-300',
                                            checked: selectedHoSo.includes(item.id),
                                            onChange: () => toggleHoSoItem(item.id)
                                        }),
                                        e('div', { className: 'flex-1' },
                                            e('div', { className: 'text-sm text-gray-700' }, item.label),
                                            e('div', { className: 'text-xs text-gray-400' }, 'Số văn bản: ' + item.code)
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                // Footer
                e('div', { className: 'flex items-center justify-end gap-3 p-5 border-t border-gray-200' },
                    e('button', {
                        className: 'px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50',
                        onClick: () => {
                            if (selectedHoSo.length > 0) {
                                setActivePDFIndex(0);
                                setShowPDFViewer(true);
                            }
                        },
                        disabled: selectedHoSo.length === 0
                    }, 'Xem hồ sơ'),
                    e('button', {
                        className: 'px-4 py-2 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005a57] disabled:opacity-50',
                        onClick: () => {
                            const newConfirmed = hoSoCategories
                                .flatMap(cat => cat.items)
                                .filter(item => selectedHoSo.includes(item.id));
                            setConfirmedHoSo([...confirmedHoSo, ...newConfirmed]);
                            setToastMessage('Đã thêm ' + newConfirmed.length + ' hồ sơ');
                            setShowToast(true);
                            setTimeout(() => setShowToast(false), 3000);
                            setSelectedHoSo([]);
                            setShowHoSoModal(false);
                        },
                        disabled: selectedHoSo.length === 0
                    }, 'Xác nhận')
                )
            )
        );
    }

    // ========== MODAL XEM BÁO CÁO ĐÁNH GIÁ RRMT & XH ==========
    function renderRRMTPDFViewer() {
        const viewer = e('div', {
            className: 'rrmt-pdf-viewer fixed inset-0 bg-slate-950/70 flex flex-col',
            style: { zIndex: 2147483647 }
        },
            e('div', { className: 'h-14 px-5 bg-white border-b border-gray-200 flex items-center justify-between flex-shrink-0 shadow-sm' },
                e('div', { className: 'flex items-center gap-3 min-w-0' },
                    e('button', {
                        type: 'button',
                        className: 'w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500',
                        onClick: () => setShowRRMTPDFViewer(false),
                        title: 'Quay lại'
                    }, e('i', { className: 'fas fa-arrow-left' })),
                    e('i', { className: 'fas fa-file-pdf text-red-500 text-lg' }),
                    e('div', { className: 'min-w-0' },
                        e('div', { className: 'text-sm font-bold text-gray-800 truncate' }, rrmtReportName),
                        e('div', { className: 'text-xs text-gray-500' }, 'Báo cáo đánh giá rủi ro môi trường và xã hội')
                    )
                ),
                e('div', { className: 'flex items-center gap-2' },
                    e('a', {
                        href: rrmtReportUrl,
                        download: rrmtReportName,
                        className: 'inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:text-[#006B68] hover:border-[#006B68]'
                    },
                        e('i', { className: 'fas fa-download' }),
                        'Tải xuống'
                    ),
                    e('button', {
                        type: 'button',
                        className: 'w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500',
                        onClick: () => setShowRRMTPDFViewer(false),
                        title: 'Đóng'
                    }, e('i', { className: 'fas fa-times' }))
                )
            ),
            e('div', { className: 'flex-1 min-h-0 p-4' },
                e('div', { className: 'w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden' },
                    e('iframe', {
                        src: rrmtReportUrl,
                        title: rrmtReportName,
                        className: 'w-full h-full border-0'
                    })
                )
            )
        );

        return ReactDOM && ReactDOM.createPortal
            ? ReactDOM.createPortal(viewer, document.body)
            : viewer;
    }

    // ========== MODAL XEM HỒ SƠ (PDF VIEWER) ==========
    function renderPDFViewer() {
        const selectedDocs = getSelectedHoSoDetails();
        if (selectedDocs.length === 0) return null;
        const currentDoc = selectedDocs[activePDFIndex];

        return e('div', { className: 'fixed inset-0 bg-white z-50 flex flex-col' },
            // Header
            e('div', { className: 'h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5' },
                e('div', { className: 'flex items-center gap-3' },
                    e('i', { className: 'fas fa-arrow-left text-gray-600' }),
                    e('span', { className: 'font-semibold text-gray-800' }, 'Xem hồ sơ')
                ),
                e('div', { className: 'flex items-center gap-4' },
                    e('span', { className: 'text-sm text-gray-700 font-medium' }, currentDoc.label),
                    e('div', { className: 'flex items-center gap-2 text-sm text-gray-500' },
                        e('span', null, 'Trang'),
                        e('button', {
                            className: 'w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded',
                            onClick: () => setActivePDFIndex(Math.max(0, activePDFIndex - 1)),
                            disabled: activePDFIndex === 0
                        }, e('i', { className: 'fas fa-chevron-left text-xs' })),
                        e('span', null, '1 / 2'),
                        e('button', {
                            className: 'w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded'
                        }, e('i', { className: 'fas fa-chevron-right text-xs' }))
                    ),
                    e('div', { className: 'flex items-center gap-2' },
                        e('button', { className: 'w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded' },
                            e('i', { className: 'fas fa-search-plus text-gray-600' })),
                        e('button', { className: 'w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded' },
                            e('i', { className: 'fas fa-expand text-gray-600' })),
                        e('button', { className: 'w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded' },
                            e('i', { className: 'fas fa-print text-gray-600' })),
                        e('button', { className: 'w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded' },
                            e('i', { className: 'fas fa-download text-gray-600' }))
                    ),
                    e('button', {
                        className: 'px-4 py-1.5 border border-[#006B68] text-[#006B68] rounded-lg text-sm hover:bg-[#e6f4f1]',
                        onClick: () => setShowPDFViewer(false)
                    }, 'Đóng')
                )
            ),
            // Body
            e('div', { className: 'flex-1 flex' },
                // Sidebar - Danh sách hồ sơ
                e('div', { className: 'w-72 border-r border-gray-200 bg-gray-50 overflow-y-auto' },
                    e('div', { className: 'p-3 space-y-2' },
                        selectedDocs.map((doc, idx) =>
                            e('div', {
                                key: doc.id,
                                className: 'p-2 rounded cursor-pointer flex items-center gap-2 ' +
                                    (activePDFIndex === idx ? 'bg-[#006B68] text-white' : 'hover:bg-gray-100 text-gray-700'),
                                onClick: () => setActivePDFIndex(idx)
                            },
                                e('i', { className: 'fas fa-file-alt text-sm ' + (activePDFIndex === idx ? 'text-white' : 'text-gray-400') }),
                                e('span', { className: 'text-xs flex-1 truncate' }, doc.label)
                            )
                        )
                    )
                ),
                // Main content - PDF preview
                e('div', { className: 'flex-1 bg-gray-700 p-4 flex gap-4 overflow-auto' },
                    // Page thumbnails
                    e('div', { className: 'w-24 space-y-3 flex-shrink-0' },
                        [1, 2].map(page =>
                            e('div', {
                                key: page,
                                className: 'bg-white rounded shadow cursor-pointer hover:ring-2 hover:ring-[#006B68] ' + (page === 1 ? 'ring-2 ring-[#006B68]' : '')
                            },
                                e('div', { className: 'h-32 bg-gray-100 flex items-center justify-center text-gray-400' },
                                    e('i', { className: 'fas fa-file-alt text-2xl' })
                                ),
                                e('div', { className: 'text-center text-xs py-1 text-gray-600' }, page)
                            )
                        )
                    ),
                    // Main document view
                    e('div', { className: 'flex-1 flex justify-center' },
                        e('div', { className: 'bg-white rounded-lg shadow-lg max-w-3xl w-full p-8' },
                            e('div', { className: 'text-center mb-6' },
                                e('h2', { className: 'text-lg font-bold text-gray-800 mb-2' }, 'BAN CÔNG NGHỆ'),
                                e('p', { className: 'text-sm text-gray-600' }, 'Số: /CV-CN'),
                                e('p', { className: 'text-sm text-gray-500' }, 'Hà Nội, ngày ... tháng ... năm 2024')
                            ),
                            e('div', { className: 'text-sm text-gray-700 space-y-3' },
                                e('p', null, e('strong', null, 'Kính gửi:'), ' Ban Quản lý dự án Chuyển đổi số quản trị nội bộ toàn hàng (B.One)'),
                                e('p', null, '- Trung tâm CNTT'),
                                e('p', null, '- Trung tâm PT NHS.'),
                                e('p', { className: 'mt-4' }, 'Căn cứ phê duyệt của PTGĐ Phan Thanh Hải tại tờ trình số 1091/TTr-CN ngày 27/10/2023 V/v "Báo cáo một số dạng nghiệp căn tầng nhỏ, mở rộng yêu cầu giấy phép về thiết bị người dùng cuối...'),
                                e('p', { className: 'mt-4' }, 'Trân trọng!')
                            )
                        )
                    )
                )
            )
        );
    }

    // ========== MODAL TÓM TẮT VĂN BẢN ==========
    function renderTomTatModal() {
        const [tempText, setTempText] = React.useState(tomTatTexts[activeTomTatId] || '');

        return e('div', {
            className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50',
            onClick: () => setShowTomTatModal(false)
        },
            e('div', {
                className: 'bg-white rounded-lg shadow-xl w-full max-w-lg mx-4',
                onClick: (ev) => ev.stopPropagation()
            },
                e('div', { className: 'flex items-center justify-between p-5 border-b border-gray-200' },
                    e('h3', { className: 'text-base font-semibold text-gray-800' }, 'Tóm tắt văn bản'),
                    e('button', {
                        className: 'text-gray-400 hover:text-gray-600',
                        onClick: () => setShowTomTatModal(false)
                    }, e('i', { className: 'fas fa-times' }))
                ),
                e('div', { className: 'p-5' },
                    e('textarea', {
                        className: 'w-full px-3 py-2 border-2 border-[#006B68] rounded-lg text-sm resize-none focus:outline-none',
                        rows: 6,
                        placeholder: 'Nhập nội dung tóm tắt...',
                        value: tempText,
                        onChange: (ev) => setTempText(ev.target.value),
                        autoFocus: true
                    }),
                    e('div', { className: 'text-right text-xs text-gray-400 mt-1' }, tempText.length + '/1000')
                ),
                e('div', { className: 'flex items-center justify-end gap-2 p-5 border-t border-gray-200' },
                    e('button', {
                        className: 'px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50',
                        onClick: () => setShowTomTatModal(false)
                    }, 'Đóng'),
                    e('button', {
                        className: 'px-4 py-2 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005a57]',
                        onClick: () => {
                            setTomTatTexts({ ...tomTatTexts, [activeTomTatId]: tempText });
                            setShowTomTatModal(false);
                        }
                    }, 'Xác nhận')
                )
            )
        );
    }

    // ========== STEPPER CONFIG ==========
    const steps = [
        { key: 'phuongAn',  label: 'Phương án cấp tín dụng', icon: 'fas fa-file-alt' },
        { key: 'khoanTD',   label: 'Khoản tín dụng',         icon: 'fas fa-file-invoice-dollar' },
        { key: 'tsbd',      label: 'TSBĐ',                   icon: 'fas fa-shield-alt' },
        { key: 'dieuKhoan', label: 'Điều khoản điều kiện',   icon: 'fas fa-clipboard-list' },
        { key: 'danhGia',   label: 'Đánh giá chung',         icon: 'fas fa-tasks' }
    ];

    // ========== MAIN LAYOUT - STEPPER ==========
    return e('div', { className: 'credit-workspace space-y-4' },

        // ── Title + stepper + nav actions ──
        e('div', { className: 'credit-stepper-card' },
            e('div', { className: 'credit-tab-title' }, 'Phương án cấp tín dụng'),

            e('div', { className: 'credit-stepper-actions' },
                e('button', {
                    className: 'credit-nav-button',
                    disabled: activeStep === 0,
                    onClick: () => setActiveStep(s => Math.max(0, s - 1))
                },
                    e('i', { className: 'fas fa-chevron-left text-xs' }), 'Quay lại'
                ),
                e('button', {
                    className: 'credit-next-button',
                    disabled: activeStep === steps.length - 1,
                    onClick: () => setActiveStep(s => Math.min(steps.length - 1, s + 1))
                },
                    'Lưu và tiếp tục', e('i', { className: 'fas fa-chevron-right text-xs' })
                )
            ),

            // Stepper dots
            e('div', { className: 'credit-stepper-track' },
                steps.map((step, idx) =>
                    e('div', { key: step.key, className: 'credit-step-wrap' },
                        // Step circle + label
                        e('button', {
                            className: 'credit-step ' + (idx < activeStep ? 'is-done' : idx === activeStep ? 'is-active' : ''),
                            onClick: () => setActiveStep(idx)
                        },
                            e('div', {
                                className: 'credit-step-dot'
                            },
                                idx < activeStep
                                    ? e('i', { className: 'fas fa-check text-[11px]' })
                                    : idx === activeStep
                                        ? e('i', { className: step.icon + ' text-[13px]' })
                                        : e('span', null, idx + 1)
                            ),
                            e('span', {
                                className: 'credit-step-label'
                            }, step.label)
                        ),
                        // Connector line
                        idx < steps.length - 1 && e('div', {
                            className: 'credit-step-connector ' + (idx < activeStep ? 'is-done' : '')
                        })
                    )
                )
            )
        ),

        // ── Content area ──
        activeStep === 0 && e('div', { className: 'space-y-4' },
            // Header phương án
            e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
                e('div', {
                    className: 'px-5 py-3 flex items-center justify-between',
                    style: { background: '#006B68' }
                },
                    e('div', { className: 'flex items-center gap-3' },
                        e('i', { className: 'fas fa-file-alt text-white' }),
                        e('span', { className: 'font-semibold text-white' }, 'Phương án cấp tín dụng'),
                        e('span', { className: 'px-2 py-0.5 bg-white/20 text-white rounded-full text-xs' }, phuongAnList.length + ' phương án')
                    ),
                    e('button', {
                        className: 'px-3 py-1.5 bg-white/20 text-white rounded text-xs font-medium hover:bg-white/30 flex items-center gap-1',
                        onClick: () => setShowModal(true)
                    },
                        e('i', { className: 'fas fa-plus text-xs' }), 'Thêm phương án'
                    )
                )
            ),
            phuongAnList.length === 0
                ? e('div', { className: 'bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center py-20' },
                    e('i', { className: 'fas fa-cloud text-gray-200 text-5xl mb-4' }),
                    e('p', { className: 'text-gray-500 text-sm mb-4' }, 'Chưa có phương án. Nhấn "Thêm phương án" để bắt đầu.'),
                    e('button', {
                        className: 'px-4 py-2 bg-[#006B68] text-white rounded-lg text-sm font-medium hover:bg-[#005a57] flex items-center gap-2',
                        onClick: () => setShowModal(true)
                    }, e('i', { className: 'fas fa-plus text-xs' }), 'Thêm phương án')
                )
                : phuongAnList.map(pa =>
                    e('div', { key: pa.id, className: 'bg-white rounded-lg border border-gray-200 overflow-hidden' },
                        e('div', {
                            className: 'px-5 py-4 flex items-center justify-between',
                            style: { background: 'linear-gradient(135deg, #006B68 0%, #008B87 50%, #00A59E 100%)' }
                        },
                            e('div', { className: 'flex items-center gap-3' },
                                e('div', { className: 'w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center' },
                                    e('i', { className: 'fas fa-file-invoice text-white text-sm' })
                                ),
                                e('div', null,
                                    e('h3', { className: 'font-bold text-white text-base' }, 'Phương án ' + pa.label),
                                    e('p', { className: 'text-white/60 text-xs mt-0.5' }, 'Mã PA: PA-' + pa.id.substring(0, 4).toUpperCase() + '-2026')
                                )
                            ),
                            e('div', { className: 'flex items-center gap-2' },
                                e('button', {
                                    className: 'px-4 py-2 bg-white text-[#006B68] rounded-lg text-xs font-semibold hover:bg-gray-100 flex items-center gap-2 shadow-sm',
                                    onClick: () => handleSave()
                                }, e('i', { className: 'far fa-save text-xs' }), 'Lưu'),
                                e('button', {
                                    className: 'w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-red-500/80 text-white transition-colors',
                                    onClick: () => handleDeletePA(pa.id),
                                    title: 'Xóa'
                                }, e('i', { className: 'fas fa-trash-alt text-xs' }))
                            )
                        ),
                        pa.id === 'trungDaiHan'
                        ? e('div', { className: 'p-5 space-y-5' },
                            renderSection('thongTin_' + pa.id, '📋 Thông tin phương án', () => e(ThongTinPhuongAnTrungDaiHan, { duAnQlrrMt, setDuAnQlrrMt })),
                            renderSection('danhGiaHoSo_' + pa.id, '📁 Hồ sơ phương án', () => e(HoSoPhuongAnNganHan),
                                e('button', { className: 'px-3 py-1.5 bg-[#006B68] text-white rounded-lg text-xs font-semibold hover:bg-[#005a57] transition-all flex items-center gap-1.5 min-w-[108px] justify-center', onClick: (ev) => { ev.stopPropagation(); setShowHoSoModal(true); } },
                                    e('i', { className: 'fas fa-eye text-xs' }), 'Xem tài liệu'
                                )
                            ),
                            renderSection('danhGiaPhuongAn_' + pa.id, '📁 Đánh giá phương án', () => e(DanhGiaPhuongAnComponent, { defaultFileName: 'Bảng tính dòng tiền dự án.xlsx', showMoiTruongXaHoi: duAnQlrrMt !== 'khong' })),
                            renderSection('ketLuan_' + pa.id, '📋 Kết luận', () => e(KetLuanPhuongAnComponent))
                          )
                        : e('div', { className: 'p-5 space-y-4' },
                            renderSection('thongTin_' + pa.id, '📋 Thông tin phương án', () => e(ThongTinPhuongAnNganHan)),
                            renderSection('danhGiaHoSo_' + pa.id, '📁 Hồ sơ phương án', () => e(HoSoPhuongAnNganHan),
                                e('button', { className: 'px-3 py-1.5 bg-[#006B68] text-white rounded-lg text-xs font-semibold hover:bg-[#005a57] transition-all flex items-center gap-1.5 min-w-[108px] justify-center', onClick: (ev) => { ev.stopPropagation(); setShowHoSoModal(true); } },
                                    e('i', { className: 'fas fa-eye text-xs' }), 'Xem tài liệu'
                                )
                            ),
                            renderSection('danhGiaPhuongAn_' + pa.id, '📁 Đánh giá phương án', () => e(DanhGiaPhuongAnComponent)),
                            renderSection('ketLuan_' + pa.id, '📋 Kết luận', () => e(KetLuanPhuongAnComponent))
                          )
                    )
                )
        ),

        activeStep === 1 && window.TabKhoangTinDung && e('div', { className: 'credit-panel' },
            e(window.TabKhoangTinDung)
        ),

        activeStep === 2 && window.TabTaiSanDamBao && e('div', { className: 'credit-panel' },
            e(window.TabTaiSanDamBao)
        ),

        activeStep === 3 && window.TabDieuKienTinDung && e('div', { className: 'credit-panel' },
            e(window.TabDieuKienTinDung)
        ),

        activeStep === 4 && e('div', { className: 'credit-panel' },
            e(DanhGiaChungModernComponent)
        ),

        // Modals
        showModal && renderPhuongAnModal(),
        showHoSoModal && renderHoSoModal(),
        showPDFViewer && renderPDFViewer(),
        showRRMTPDFViewer && renderRRMTPDFViewer(),
        showTomTatModal && renderTomTatModal(),

        // Toast
        showToast && e('div', {
            className: 'fixed bottom-6 left-6 bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-3 flex items-center gap-3 z-50'
        },
            e('div', { className: 'w-6 h-6 bg-green-500 rounded-full flex items-center justify-center' },
                e('i', { className: 'fas fa-check text-white text-xs' })
            ),
            e('span', { className: 'text-sm text-gray-700' }, toastMessage),
            e('button', { className: 'ml-4 text-gray-400 hover:text-gray-600', onClick: () => setShowToast(false) },
                e('i', { className: 'fas fa-times text-xs' })
            )
        )
    );
};
