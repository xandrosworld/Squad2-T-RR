// ===== CKEditor-like Rich Text Editor (Functional) =====
window._CKEditorWidget = React.memo(function _CKEditorWidget(props) {
    const e = React.createElement;
    const editorRef = React.useRef(null);
    const initializedRef = React.useRef(false);

    // Set initial content once
    React.useEffect(() => {
        if (editorRef.current && !initializedRef.current) {
            if (props.initialValue) {
                editorRef.current.innerHTML = props.initialValue;
            }
            initializedRef.current = true;
        }
    }, []);

    const execCmd = (cmd, val) => {
        if (editorRef.current) editorRef.current.focus();
        document.execCommand(cmd, false, val || null);
    };

    const handleInput = () => {
        if (props.onChange && editorRef.current) {
            props.onChange({ target: { value: editorRef.current.innerHTML } });
        }
    };

    // Toolbar button - onMouseDown prevents losing selection
    const tbBtn = (icon, title, cmd, cmdVal) => e('button', {
        type: 'button',
        className: 'w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors',
        title: title,
        onMouseDown: (ev) => {
            ev.preventDefault();
            if (cmd === '_insertLink') {
                const url = prompt('Nhập URL:', 'https://');
                if (url) execCmd('createLink', url);
            } else if (cmd === '_insertImage') {
                const url = prompt('Nhập URL hình ảnh:', 'https://');
                if (url) execCmd('insertImage', url);
            } else if (cmd === '_insertTable') {
                const html = '<table style="border-collapse:collapse;width:100%;margin:8px 0"><tr><td style="border:1px solid #ccc;padding:8px">Ô 1</td><td style="border:1px solid #ccc;padding:8px">Ô 2</td><td style="border:1px solid #ccc;padding:8px">Ô 3</td></tr><tr><td style="border:1px solid #ccc;padding:8px">Ô 4</td><td style="border:1px solid #ccc;padding:8px">Ô 5</td><td style="border:1px solid #ccc;padding:8px">Ô 6</td></tr></table>';
                execCmd('insertHTML', html);
            } else if (cmd) {
                execCmd(cmd, cmdVal);
            }
        }
    }, e('i', { className: icon + ' text-sm' }));

    const tbSep = () => e('div', { className: 'w-px h-6 bg-gray-300 mx-0.5' });

    const h = props.minHeight || '180px';

    return e('div', { className: 'border border-gray-300 rounded-lg overflow-hidden bg-white' },
        // Toolbar
        e('div', { className: 'flex items-center flex-wrap gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-300' },
            // Undo / Redo
            tbBtn('fas fa-undo', 'Undo (Ctrl+Z)', 'undo'),
            tbBtn('fas fa-redo', 'Redo (Ctrl+Y)', 'redo'),
            tbSep(),
            // Heading dropdown
            e('select', {
                className: 'h-8 px-2 text-sm bg-white border border-gray-300 rounded text-gray-700 cursor-pointer hover:bg-gray-50 min-w-[110px]',
                onChange: (ev) => {
                    ev.preventDefault();
                    const val = ev.target.value;
                    if (editorRef.current) editorRef.current.focus();
                    if (val === 'p') {
                        document.execCommand('formatBlock', false, 'p');
                    } else {
                        document.execCommand('formatBlock', false, val);
                    }
                },
                onMouseDown: (ev) => { /* allow default for select */ }
            },
                e('option', { value: 'h3' }, 'Heading 3'),
                e('option', { value: 'h1' }, 'Heading 1'),
                e('option', { value: 'h2' }, 'Heading 2'),
                e('option', { value: 'h4' }, 'Heading 4'),
                e('option', { value: 'p' }, 'Normal')
            ),
            tbSep(),
            // B / I / U / Strikethrough
            tbBtn('fas fa-bold', 'Bold (Ctrl+B)', 'bold'),
            tbBtn('fas fa-italic', 'Italic (Ctrl+I)', 'italic'),
            tbBtn('fas fa-underline', 'Underline (Ctrl+U)', 'underline'),
            tbBtn('fas fa-strikethrough', 'Strikethrough', 'strikeThrough'),
            tbSep(),
            // Text color
            e('label', { className: 'w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors cursor-pointer relative', title: 'Text Color' },
                e('i', { className: 'fas fa-palette text-sm' }),
                e('input', {
                    type: 'color',
                    className: 'absolute inset-0 opacity-0 cursor-pointer w-full h-full',
                    defaultValue: '#000000',
                    onChange: (ev) => {
                        if (editorRef.current) editorRef.current.focus();
                        document.execCommand('foreColor', false, ev.target.value);
                    }
                })
            ),
            tbSep(),
            // Link / Image / Table
            tbBtn('fas fa-link', 'Insert Link', '_insertLink'),
            tbBtn('far fa-image', 'Insert Image', '_insertImage'),
            tbBtn('fas fa-table', 'Insert Table', '_insertTable'),
            tbSep(),
            // Blockquote
            tbBtn('fas fa-quote-right', 'Blockquote', 'formatBlock', 'blockquote'),
            // Horizontal Rule
            tbBtn('fas fa-minus', 'Horizontal Line', 'insertHorizontalRule'),
            tbSep(),
            // Lists
            tbBtn('fas fa-list-ul', 'Bullet List', 'insertUnorderedList'),
            tbBtn('fas fa-list-ol', 'Numbered List', 'insertOrderedList'),
            tbSep(),
            // Indent
            tbBtn('fas fa-indent', 'Indent', 'indent'),
            tbBtn('fas fa-outdent', 'Outdent', 'outdent'),
            tbSep(),
            // Alignment
            tbBtn('fas fa-align-left', 'Align Left', 'justifyLeft'),
            tbBtn('fas fa-align-center', 'Align Center', 'justifyCenter'),
            tbBtn('fas fa-align-right', 'Align Right', 'justifyRight'),
            tbSep(),
            // Clear formatting
            tbBtn('fas fa-eraser', 'Clear Formatting', 'removeFormat')
        ),
        // Content area - contentEditable div
        e('div', {
            ref: editorRef,
            contentEditable: true,
            className: 'w-full px-4 py-3 text-sm leading-relaxed focus:outline-none overflow-y-auto',
            style: { minHeight: h },
            'data-placeholder': props.placeholder || 'Nhập nội dung...',
            onInput: handleInput,
            onBlur: handleInput
        })
    );
});

window.TabThongTinPhiTaiChinh = function () {
    const e = React.createElement;

    // Collapsible state for all sections

    // Section validation state - tracks which sections are completed
    const [sectionValidation, setSectionValidation] = React.useState({
        dkkd: false,
        quanLy: false,
        niemYet: false,
        congTyCon: false,
        lichSuHD: false,
        nangLucPL: false,
        coCauCoDong: false,
        soDoToChuc: false,
        quanTriDieuHanh: false,
        tinhHinhSXKD: false
    });

    // Validation error highlights
    const [validationErrors, setValidationErrors] = React.useState({});

    // Handle save with validation
    const handleSave = () => {
        var errors = {};
        var newValidation = {};

        // Validate section: Thông tin ĐKKD
        var dkkdOk = formData.tenCongTy && formData.tenCongTy !== '' && formData.maSoDN && formData.maSoDN !== '';
        newValidation.dkkd = dkkdOk;

        // Validate section: Thông tin quản lý
        var quanLyOk = thongTinQuanLy.length > 0;
        newValidation.quanLy = quanLyOk;

        // Validate section: Thông tin niêm yết
        var niemYetOk = !formData.daNiemYet || (formData.maCoPhieu && formData.maCoPhieu !== '' && formData.maCoPhieu !== '--');
        newValidation.niemYet = niemYetOk;

        // Validate section: Công ty con/liên kết
        newValidation.congTyCon = danhSachCongTy.length > 0;

        // Validate section: Lịch sử hoạt động
        var lichSuOk = danhGiaLichSu && danhGiaLichSu !== '';
        newValidation.lichSuHD = lichSuOk;

        // Validate section: Năng lực pháp luật dân sự
        var nangLucOk = thanhLapHopLe && thanhLapHopLe !== '' && nangLucKyKet && nangLucKyKet !== '' && tinhTrangPhapLy && tinhTrangPhapLy !== '' && tranhChapViPham && tranhChapViPham !== '';
        newValidation.nangLucPL = nangLucOk;
        if (!nangLucOk) {
            if (!thanhLapHopLe || thanhLapHopLe === '') errors.thanhLapHopLe = true;
            if (!nangLucKyKet || nangLucKyKet === '') errors.nangLucKyKet = true;
        }

        // Validate section: Cơ cấu cổ đông
        newValidation.coCauCoDong = coCauCoDongText && coCauCoDongText !== '';

        // Validate section: Sơ đồ tổ chức
        var soDoOk = coCauToChuc && coCauToChuc !== '' && toChucQuanTri && toChucQuanTri !== '' && toChucSXKD && toChucSXKD !== '' && kiemSoatNoiBo && kiemSoatNoiBo !== '';
        newValidation.soDoToChuc = soDoOk;

        // Validate section: Quản trị điều hành
        var quanTriOk = nangLucBanLanhDao && nangLucBanLanhDao !== '' && nangLucDoiNgu && nangLucDoiNgu !== '' && coChePhánQuyen && coChePhánQuyen !== '';
        newValidation.quanTriDieuHanh = quanTriOk;

        // Validate section: Tình hình SXKD
        var sxkdOk = sxkdBlocks.length > 0;
        newValidation.tinhHinhSXKD = sxkdOk;

        setSectionValidation(newValidation);
        setValidationErrors(errors);

        // Count completed sections
        var totalSections = Object.keys(newValidation).length;
        var completedSections = Object.values(newValidation).filter(function(v) { return v; }).length;

        if (completedSections === totalSections) {
            if (window.AuditHelpers && window.AuditHelpers.showToast) {
                window.AuditHelpers.showToast('Đã lưu đánh giá thành công! Tất cả các mục đã hoàn thành.', 'success');
            } else {
                alert('Đã lưu đánh giá thành công! Tất cả các mục đã hoàn thành.');
            }
        } else {
            if (window.AuditHelpers && window.AuditHelpers.showToast) {
                window.AuditHelpers.showToast('Đã lưu! ' + completedSections + '/' + totalSections + ' mục hoàn thành.', 'success');
            } else {
                alert('Đã lưu! ' + completedSections + '/' + totalSections + ' mục hoàn thành.');
            }
        }
    };

    // Helper: render section completion badge
    var renderSectionBadge = function(sectionKey) {
        return e('span', {
            className: sectionValidation[sectionKey] ? 'ml-2 inline-flex items-center gap-1 text-xs font-medium text-green-100 bg-green-600/40 px-2 py-0.5 rounded-full' : 'hidden'
        }, e('i', { className: 'fas fa-check-circle text-[10px]' }), ' Hoàn thành');
    };

    // ===== CKEditor wrapper =====
    const renderCKEditor = (value, onChange, placeholder, minHeight) => {
        return e(window._CKEditorWidget, {
            initialValue: value,
            onChange: onChange,
            placeholder: placeholder,
            minHeight: minHeight
        });
    };
    const [ptcOpen, setPtcOpen] = React.useState({});
    const togglePtc = (key) => setPtcOpen(prev => ({ ...prev, [key]: !prev[key] }));
    const isPtcOpen = (key) => !!ptcOpen[key];

    // States cho form data - Thông tin pháp lý
    const [formData, setFormData] = React.useState({
        // Thông tin đăng ký kinh doanh
        tenCongTy: 'Công ty Cổ phần Vingroup',
        tenTiengAnh: 'Vingroup Joint Stock Company',
        tenVietTat: 'Vingroup',
        quocGiaThanhLap: 'Việt Nam',
        loaiHinhDN: 'Công ty Cổ phần',
        maSoDN: '0104831030',
        ngayDangKyLanDau: '15/01/2010',
        ngayCapNhatGanNhat: 'Lần thứ 5 - Ngày 20/08/2024',
        diaChiDKKD: 'Tầng 48-52 Tòa nhà Viettel, 285 Cách Mạng Tháng 8, P.12, Q.10, TP. Hồ Chí Minh',
        diaChiThucTe: 'Tầng 48-52 Tòa nhà Viettel, 285 Cách Mạng Tháng 8, P.12, Q.10',
        tinhThanhPho: 'TP. Hồ Chí Minh',
        dienThoai: '(+84) 28 3910 8888',
        email: 'info@vingroup.net',
        website: 'www.vingroup.net',
        fax: '(+84) 28 3910 8899',
        nganhNgheCore: '6810 - Kinh doanh bất động sản, quyền sử dụng đất thuộc chủ sở hữu, chủ sử dụng hoặc đi thuê',
        // Thông tin niêm yết
        daNiemYet: true,
        maCoPhieu: 'VIC',
        sanNiemYet: 'Sở Giao dịch Chứng khoán TP. Hồ Chí Minh (HOSE)',
        thoiDiemNiemYet: '17/01/2007',
        quyMoVonHoa: '320.000 tỷ VND',
        // Vốn điều lệ
        vonDieuLe: '34.302.650.740.000 VND',
        vonThucGop: '34.302.650.740.000 VND'
    });

    // State cho ngành nghề hoạt động
    const [nganhNgheList, setNganhNgheList] = React.useState([
        { id: 1, maCap1: 'L', maCap1Name: '0101681000', maCap2: '68100', tenNganh: 'Kinh doanh bất động sản, quyền sử dụng đất thuộc chủ sở hữu, chủ sử dụng hoặc đi thuê' },
        { id: 2, maCap1: 'F', maCap1Name: '0101410000', maCap2: '41000', tenNganh: 'Xây dựng nhà các loại' },
        { id: 3, maCap1: 'G', maCap1Name: '0101471100', maCap2: '47110', tenNganh: 'Bán lẻ trong các cửa hàng tổng hợp' },
        { id: 4, maCap1: 'I', maCap1Name: '0101551000', maCap2: '55100', tenNganh: 'Hoạt động khách sạn và các cơ sở lưu trú tương tự' },
        { id: 5, maCap1: 'C', maCap1Name: '0101291000', maCap2: '29100', tenNganh: 'Sản xuất xe có động cơ' }
    ]);

    // State cho thông tin quản lý
    const [thongTinQuanLy, setThongTinQuanLy] = React.useState([
        { id: 1, canBo: 'CB12345 - Nguyễn Văn Hoài An', chiNhanh: 'CN001 - Chi nhánh Hà Nội', vaiTro: 'Cán bộ đầu mối' },
        { id: 2, canBo: 'CB12346 - Trần Thị Bình', chiNhanh: 'CN001 - Chi nhánh Đồng Bằng Sông Cửu Long', vaiTro: 'Cán bộ QLKH' }
    ]);

    // State cho danh sách công ty con/liên kết
    const [danhSachCongTy, setDanhSachCongTy] = React.useState([
        { id: 1, ten: 'Vinhomes', loai: 'Công ty con', maSo: '0108181813', tyLeSoHuu: '100%', von: '35.000 tỷ VND', linhVuc: 'Bất động sản' },
        { id: 2, ten: 'Vinpearl', loai: 'Công ty con', maSo: '0108195721', tyLeSoHuu: '100%', von: '18.000 tỷ VND', linhVuc: 'Du lịch, khách sạn' },
        { id: 3, ten: 'VinFast', loai: 'Công ty con', maSo: '0108276206', tyLeSoHuu: '100%', von: '45.000 tỷ VND', linhVuc: 'Sản xuất ô tô' }
    ]);

    // State cho lịch sử hoạt động
    const [lichSuHoatDong, setLichSuHoatDong] = React.useState([
        { id: 1, mocThoiGian: '15/11/2024', thongTin: 'Tiếp tục mở rộng hoạt động và duy trì vị trí tập đoàn kinh tế tư nhân lớn nhất Việt Nam' },
        { id: 2, mocThoiGian: '10/08/2023', thongTin: 'Khánh thành nhà máy sản xuất pin và xe máy điện VinFast tại Hà Tĩnh' },
        { id: 3, mocThoiGian: '22/03/2023', thongTin: 'VinFast chính thức niêm yết trên sàn NASDAQ (Mỹ) với mã VFS' }
    ]);

    // State cho đánh giá lịch sử hoạt động
    const [danhGiaLichSu, setDanhGiaLichSu] = React.useState('- 15/11/2024: Tiếp tục mở rộng hoạt động và duy trì vị trí tập đoàn kinh tế tư nhân lớn nhất Việt Nam\n- 10/08/2023: Khánh thành nhà máy sản xuất pin và xe máy điện VinFast tại Hà Tĩnh\n- 22/03/2023: VinFast chính thức niêm yết trên sàn NASDAQ (Mỹ) với mã VFS');
    const [danhGiaText, setDanhGiaText] = React.useState('Vingroup là tập đoàn kinh tế tư nhân đa ngành lớn nhất Việt Nam, có vị thế vững chắc trên thị trường. Công ty hoạt động đúng quy định pháp luật, có lịch sử hoạt động lâu dài và uy tín. Cơ cấu cổ đông minh bạch với sự tham gia của các quỹ đầu tư uy tín quốc tế. Vingroup đang mở rộng mạnh sang các lĩnh vực công nghệ cao như ô tô điện, điện tử thông minh.');
    const [nangLucPhapLuatText, setNangLucPhapLuatText] = React.useState('');

    // State cho tiêu chí đánh giá năng lực pháp luật dân sự
    const [thanhLapHopLe, setThanhLapHopLe] = React.useState('hop-le');
    const [nangLucKyKet, setNangLucKyKet] = React.useState('du-nang-luc');
    const [tinhTrangPhapLy, setTinhTrangPhapLy] = React.useState('binh-thuong');
    const [tranhChapViPham, setTranhChapViPham] = React.useState('khong-co');

    // Handle cancel
    const handleCancel = () => {
        if (confirm('Bạn có chắc muốn hủy các thay đổi?')) {
            // Reset form
        }
    };

    // Thêm công ty con
    const handleAddCongTy = () => {
        const newId = danhSachCongTy.length + 1;
        setDanhSachCongTy([...danhSachCongTy, {
            id: newId,
            tenCongTy: '',
            soDKKD: '',
            loaiHinh: 'Công ty con',
            nganhNghe: ''
        }]);
    };

    // Xóa công ty con
    const handleRemoveCongTy = (id) => {
        setDanhSachCongTy(danhSachCongTy.filter(ct => ct.id !== id));
    };

    // Thêm lịch sử hoạt động
    const handleAddLichSu = () => {
        const newId = lichSuHoatDong.length + 1;
        setLichSuHoatDong([...lichSuHoatDong, {
            id: newId,
            mocThoiGian: '',
            thongTin: ''
        }]);
    };

    // Xóa lịch sử hoạt động
    const handleRemoveLichSu = (id) => {
        setLichSuHoatDong(lichSuHoatDong.filter(ls => ls.id !== id));
    };

    // Render Thông tin pháp lý
    const renderThongTinPhapLy = () => {
        return e('div', { className: 'space-y-6' },

            // ===== KHỐI 1: THÔNG TIN ĐĂNG KÝ KINH DOANH =====
            e('div', { className: 'bg-white rounded-lg border border-gray-200 overflow-hidden' },
                e('div', {
                    className: 'bg-[#006B68] px-4 py-3 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity',
                    onClick: () => togglePtc('dkkd')
                },
                    e('div', { className: 'flex items-center gap-2' },
                        e('i', { className: 'fas fa-building text-white' }),
                        e('h4', { className: 'font-semibold text-white' }, 'Thông tin đăng ký kinh doanh'),
                        renderSectionBadge('dkkd')
                    ),
                    e('i', { className: 'fas fa-chevron-' + (isPtcOpen('dkkd') ? 'up' : 'down') + ' text-white text-sm' })
                ),
                isPtcOpen('dkkd') && e('div', { className: 'p-5 space-y-4' },
                    // Row 1: Tên Công ty | Tên bằng tiếng nước ngoài
                    e('div', { className: 'grid grid-cols-2 gap-6' },
                        e('div', null,
                            e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Tên Công ty'),
                            e('div', { className: 'text-sm font-medium text-gray-800' }, formData.tenCongTy)
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Tên bằng tiếng nước ngoài'),
                            e('div', { className: 'text-sm text-gray-800' }, formData.tenTiengAnh)
                        )
                    ),
                    // Row 2-4: Basic info
                    e('div', { className: 'grid grid-cols-2 gap-6' },
                        e('div', null,
                            e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Tên viết tắt'),
                            e('div', { className: 'text-sm text-gray-800' }, formData.tenVietTat)
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Quốc gia thành lập'),
                            e('div', { className: 'text-sm text-gray-800' }, formData.quocGiaThanhLap)
                        )
                    ),
                    e('div', { className: 'grid grid-cols-2 gap-6' },
                        e('div', null,
                            e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Loại hình doanh nghiệp'),
                            e('div', { className: 'text-sm text-gray-800' }, formData.loaiHinhDN)
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Mã số doanh nghiệp'),
                            e('div', { className: 'text-sm text-gray-800' }, formData.maSoDN)
                        )
                    ),
                    e('div', { className: 'grid grid-cols-2 gap-6' },
                        e('div', null,
                            e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Đăng ký lần đầu'),
                            e('div', { className: 'text-sm text-gray-800' }, formData.ngayDangKyLanDau)
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Đăng ký cập nhật gần nhất'),
                            e('div', { className: 'text-sm text-gray-800' }, formData.ngayCapNhatGanNhat)
                        )
                    ),
                    // Địa chỉ
                    e('div', null,
                        e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Địa chỉ trên ĐKKD'),
                        e('div', { className: 'text-sm text-gray-800' }, formData.diaChiDKKD)
                    ),
                    e('div', { className: 'grid grid-cols-2 gap-6' },
                        e('div', null,
                            e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Địa chỉ thực tế'),
                            e('div', { className: 'text-sm text-gray-800' }, formData.diaChiThucTe)
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Tỉnh/Thành phố'),
                            e('div', { className: 'text-sm text-gray-800' }, formData.tinhThanhPho)
                        )
                    ),
                    // Contact info
                    e('div', { className: 'grid grid-cols-2 gap-6' },
                        e('div', null,
                            e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Điện thoại'),
                            e('div', { className: 'text-sm text-gray-800' }, formData.dienThoai)
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Email'),
                            e('div', { className: 'text-sm text-gray-800' }, formData.email)
                        )
                    ),
                    e('div', { className: 'grid grid-cols-2 gap-6' },
                        e('div', null,
                            e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Website'),
                            e('div', { className: 'text-sm text-gray-800' }, formData.website)
                        ),
                        e('div', null,
                            e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Fax'),
                            e('div', { className: 'text-sm text-gray-800' }, formData.fax)
                        )
                    ),
                    // Ngành nghề
                    e('div', null,
                        e('label', { className: 'block text-sm text-[#006B68] mb-1' }, 'Ngành nghề kinh doanh trên Core'),
                        e('div', { className: 'text-sm text-gray-800' }, formData.nganhNgheCore)
                    ),
                    // Bảng ngành nghề
                    e('div', { className: 'mt-4' },
                        e('label', { className: 'block text-sm text-[#006B68] mb-2' }, 'Ngành nghề hoạt động kinh doanh'),
                        e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                            e('table', { className: 'w-full text-sm' },
                                e('thead', null,
                                    e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                                        e('th', { className: 'px-4 py-2.5 text-center font-medium text-gray-700 w-12' }, 'STT'),
                                        e('th', { className: 'px-4 py-2.5 text-left font-medium text-gray-700 w-44' }, 'Mã ngành nghề cấp 1'),
                                        e('th', { className: 'px-4 py-2.5 text-left font-medium text-gray-700 w-44' }, 'Mã ngành nghề cấp 2'),
                                        e('th', { className: 'px-4 py-2.5 text-left font-medium text-gray-700' }, 'Tên ngành nghề')
                                    )
                                ),
                                e('tbody', null,
                                    nganhNgheList.map((nn, idx) =>
                                        e('tr', { key: nn.id, className: 'border-t border-gray-100' },
                                            e('td', { className: 'px-4 py-2.5 text-center text-gray-600' }, idx + 1),
                                            e('td', { className: 'px-4 py-2.5 text-gray-700 font-mono text-xs' }, nn.maCap1Name),
                                            e('td', { className: 'px-4 py-2.5 text-gray-700 font-mono text-xs' }, nn.maCap2),
                                            e('td', { className: 'px-4 py-2.5 text-gray-800' }, nn.tenNganh)
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),

            // ===== KHỐI 1b: THÔNG TIN QUẢN LÝ =====
            e('div', { className: 'bg-white rounded-lg border border-gray-200 overflow-hidden' },
                e('div', {
                    className: 'bg-[#006B68] px-4 py-3 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity',
                    onClick: () => togglePtc('quanLy')
                },
                    e('div', { className: 'flex items-center gap-2' },
                        e('i', { className: 'fas fa-user-tie text-white' }),
                        e('h4', { className: 'font-semibold text-white' }, 'Thông tin quản lý'),
                        renderSectionBadge('quanLy')
                    ),
                    e('i', { className: 'fas fa-chevron-' + (isPtcOpen('quanLy') ? 'up' : 'down') + ' text-white text-sm' })
                ),
                isPtcOpen('quanLy') && e('div', { className: 'p-5' },
                    e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                        e('table', { className: 'w-full text-sm' },
                            e('thead', null,
                                e('tr', { className: 'bg-gray-50 border-b border-gray-200' },
                                    e('th', { className: 'px-4 py-2.5 text-center font-medium text-gray-700 w-12' }, 'STT'),
                                    e('th', { className: 'px-4 py-2.5 text-left font-medium text-gray-700' }, 'Thông tin cán bộ'),
                                    e('th', { className: 'px-4 py-2.5 text-left font-medium text-gray-700 w-64' }, 'Chi nhánh'),
                                    e('th', { className: 'px-4 py-2.5 text-left font-medium text-gray-700 w-44' }, 'Vai trò')
                                )
                            ),
                            e('tbody', null,
                                thongTinQuanLy.map((ql, idx) =>
                                    e('tr', { key: ql.id, className: 'border-t border-gray-100' },
                                        e('td', { className: 'px-4 py-2.5 text-center text-gray-600' }, idx + 1),
                                        e('td', { className: 'px-4 py-2.5 text-[#006B68] font-medium' }, ql.canBo),
                                        e('td', { className: 'px-4 py-2.5 text-gray-700' }, ql.chiNhanh),
                                        e('td', { className: 'px-4 py-2.5' },
                                            e('span', { className: 'px-2.5 py-1 text-xs rounded-full bg-[#006B68]/10 text-[#006B68] font-medium' }, ql.vaiTro)
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    e('button', {
                        onClick: () => {
                            const newId = thongTinQuanLy.length + 1;
                            setThongTinQuanLy([...thongTinQuanLy, { id: newId, canBo: '', chiNhanh: '', vaiTro: '' }]);
                        },
                        className: 'mt-3 text-sm text-[#006B68] hover:text-[#005a57] flex items-center gap-1'
                    },
                        e('i', { className: 'fas fa-plus' }),
                        ' Thêm mới'
                    )
                )
            ),

            // ===== KHỐI 2: THÔNG TIN NIÊM YẾT =====
            e('div', { className: 'bg-white rounded-lg border border-gray-200 overflow-hidden' },
                e('div', {
                    className: 'bg-[#006B68] px-4 py-3 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity',
                    onClick: () => togglePtc('niemYet')
                },
                    e('div', { className: 'flex items-center gap-2' },
                        e('i', { className: 'fas fa-chart-line text-white' }),
                        e('h4', { className: 'font-semibold text-white' }, 'Thông tin niêm yết'),
                        renderSectionBadge('niemYet')
                    ),
                    e('i', { className: 'fas fa-chevron-' + (isPtcOpen('niemYet') ? 'up' : 'down') + ' text-white text-sm' })
                ),
                isPtcOpen('niemYet') && e('div', { className: 'p-5 space-y-4' },
                    // Checkbox đã có thông tin niêm yết
                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                        e('input', {
                            type: 'checkbox',
                            checked: formData.daNiemYet,
                            onChange: (ev) => setFormData({ ...formData, daNiemYet: ev.target.checked }),
                            className: 'w-4 h-4 text-[#006B68] rounded'
                        }),
                        e('span', { className: 'text-sm text-gray-700' }, 'Đã có thông tin niêm yết')
                    ),

                    formData.daNiemYet && e(React.Fragment, null,
                        // Mã cổ phiếu | Sàn niêm yết
                        e('div', { className: 'grid grid-cols-2 gap-4' },
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-1' },
                                    'Mã cổ phiếu ',
                                    e('span', { className: 'text-red-500' }, '*')
                                ),
                                e('select', {
                                    className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                    value: formData.maCoPhieu,
                                    onChange: (ev) => setFormData({ ...formData, maCoPhieu: ev.target.value })
                                },
                                    e('option', { value: 'VIC' }, 'VIC'),
                                    e('option', { value: 'VHM' }, 'VHM'),
                                    e('option', { value: 'VRE' }, 'VRE')
                                )
                            ),
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-1' },
                                    'Sàn niêm yết ',
                                    e('span', { className: 'text-red-500' }, '*')
                                ),
                                e('select', {
                                    className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                    value: formData.sanNiemYet,
                                    onChange: (ev) => setFormData({ ...formData, sanNiemYet: ev.target.value })
                                },
                                    e('option', { value: 'HOSE' }, 'HOSE'),
                                    e('option', { value: 'HNX' }, 'HNX'),
                                    e('option', { value: 'UPCOM' }, 'UPCOM')
                                )
                            )
                        ),

                        // Quy mô vốn hóa | Thời điểm niêm yết
                        e('div', { className: 'grid grid-cols-2 gap-4' },
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-1' }, 'Quy mô vốn hóa'),
                                e('div', { className: 'flex items-center gap-2' },
                                    e('input', {
                                        type: 'text',
                                        className: 'flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                        value: formData.quyMoVonHoa,
                                        onChange: (ev) => setFormData({ ...formData, quyMoVonHoa: ev.target.value })
                                    }),
                                    e('span', { className: 'text-sm text-gray-500' }, 'VND')
                                )
                            ),
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-1' }, 'Thời điểm niêm yết'),
                                e('input', {
                                    type: 'text',
                                    className: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#006B68]/30',
                                    value: formData.thoiDiemNiemYet,
                                    onChange: (ev) => setFormData({ ...formData, thoiDiemNiemYet: ev.target.value }),
                                    placeholder: 'DD/MM/YYYY'
                                })
                            )
                        )
                    )
                )
            ),

            // ===== KHỐI 4: DANH SÁCH CÔNG TY CON/LIÊN KẾT =====
            e('div', { className: 'bg-white rounded-lg border border-gray-200 overflow-hidden' },
                e('div', {
                    className: 'bg-[#006B68] px-4 py-3 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity',
                    onClick: () => togglePtc('congTyCon')
                },
                    e('div', { className: 'flex items-center gap-2' },
                        e('i', { className: 'fas fa-sitemap text-white' }),
                        e('h4', { className: 'font-semibold text-white' }, 'Danh sách công ty con/liên kết'),
                        renderSectionBadge('congTyCon')
                    ),
                    e('i', { className: 'fas fa-chevron-' + (isPtcOpen('congTyCon') ? 'up' : 'down') + ' text-white text-sm' })
                ),
                isPtcOpen('congTyCon') && e('div', { className: 'p-5' },
                    e('table', { className: 'w-full text-sm' },
                        e('thead', null,
                            e('tr', { className: 'border-b border-gray-200' },
                                e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600 w-12' }, 'STT'),
                                e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600' }, 'Tên công ty'),
                                e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600 w-40' }, 'Số ĐKKD/MST'),
                                e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600 w-40' }, 'Loại hình'),
                                e('th', { className: 'px-3 py-2 text-left font-medium text-gray-600' }, 'Ngành nghề chính'),
                                e('th', { className: 'px-3 py-2 text-center font-medium text-gray-600 w-12' }, '')
                            )
                        ),
                        e('tbody', null,
                            danhSachCongTy.map((ct, idx) =>
                                e('tr', { key: ct.id, className: 'border-b border-gray-100' },
                                    e('td', { className: 'px-3 py-2 text-gray-600' }, idx + 1),
                                    e('td', { className: 'px-3 py-2' },
                                        e('input', {
                                            type: 'text',
                                            className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#006B68]',
                                            value: ct.tenCongTy,
                                            onChange: (ev) => {
                                                const updated = danhSachCongTy.map(c =>
                                                    c.id === ct.id ? { ...c, tenCongTy: ev.target.value } : c
                                                );
                                                setDanhSachCongTy(updated);
                                            }
                                        })
                                    ),
                                    e('td', { className: 'px-3 py-2' },
                                        e('input', {
                                            type: 'text',
                                            className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#006B68]',
                                            value: ct.soDKKD || ct.maSo || '',
                                            onChange: (ev) => {
                                                const updated = danhSachCongTy.map(c =>
                                                    c.id === ct.id ? { ...c, soDKKD: ev.target.value } : c
                                                );
                                                setDanhSachCongTy(updated);
                                            }
                                        })
                                    ),
                                    e('td', { className: 'px-3 py-2' },
                                        e('select', {
                                            className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-white',
                                            value: ct.loaiHinh,
                                            onChange: (ev) => {
                                                const updated = danhSachCongTy.map(c =>
                                                    c.id === ct.id ? { ...c, loaiHinh: ev.target.value } : c
                                                );
                                                setDanhSachCongTy(updated);
                                            }
                                        },
                                            e('option', { value: 'Góp vốn khác' }, 'Góp vốn khác'),
                                            e('option', { value: 'Công ty con' }, 'Công ty con'),
                                            e('option', { value: 'Liên kết' }, 'Liên kết')
                                        )
                                    ),
                                    e('td', { className: 'px-3 py-2' },
                                        e('input', {
                                            type: 'text',
                                            className: 'w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#006B68]',
                                            value: ct.nganhNghe,
                                            onChange: (ev) => {
                                                const updated = danhSachCongTy.map(c =>
                                                    c.id === ct.id ? { ...c, nganhNghe: ev.target.value } : c
                                                );
                                                setDanhSachCongTy(updated);
                                            }
                                        })
                                    ),
                                    e('td', { className: 'px-3 py-2 text-center' },
                                        e('button', {
                                            onClick: () => handleRemoveCongTy(ct.id),
                                            className: 'text-gray-400 hover:text-red-500'
                                        },
                                            e('i', { className: 'fas fa-minus-circle' })
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    e('button', {
                        onClick: handleAddCongTy,
                        className: 'mt-3 text-sm text-[#006B68] hover:text-[#005a57] flex items-center gap-1'
                    },
                        e('i', { className: 'fas fa-plus' }),
                        ' Thêm mới'
                    )
                )
            ),

            // ===== KHỐI 5: LỊCH SỬ HOẠT ĐỘNG =====
            e('div', { className: 'bg-white rounded-lg border border-gray-200 overflow-hidden' },
                e('div', {
                    className: 'bg-[#006B68] px-4 py-3 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity',
                    onClick: () => togglePtc('lichSuHD')
                },
                    e('div', { className: 'flex items-center gap-2' },
                        e('i', { className: 'fas fa-history text-white' }),
                        e('h4', { className: 'font-semibold text-white' }, 'Lịch sử hoạt động'),
                        renderSectionBadge('lichSuHD')
                    ),
                    e('i', { className: 'fas fa-chevron-' + (isPtcOpen('lichSuHD') ? 'up' : 'down') + ' text-white text-sm' })
                ),
                isPtcOpen('lichSuHD') && e('div', { className: 'p-5' },
                    renderCKEditor(danhGiaLichSu, (ev) => setDanhGiaLichSu(ev.target.value), 'Nhập lịch sử hoạt động của doanh nghiệp...', '180px')
                )
            ),

            // ===== KHỐI 6: ĐÁNH GIÁ NĂNG LỰC PHÁP LUẬT DÂN SỰ =====
            e('div', { className: 'bg-white rounded-lg border border-gray-200 overflow-hidden' },
                e('div', {
                    className: 'bg-[#006B68] px-4 py-3 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity',
                    onClick: () => togglePtc('nangLucPL')
                },
                    e('div', { className: 'flex items-center gap-2' },
                        e('i', { className: 'fas fa-balance-scale text-white' }),
                        e('h4', { className: 'font-semibold text-white' }, 'Đánh giá năng lực pháp luật dân sự'),
                        renderSectionBadge('nangLucPL')
                    ),
                    e('i', { className: 'fas fa-chevron-' + (isPtcOpen('nangLucPL') ? 'up' : 'down') + ' text-white text-sm' })
                ),
                isPtcOpen('nangLucPL') && e('div', { className: 'p-5 space-y-5' },
                    // CKEditor nhập tự do
                    renderCKEditor(nangLucPhapLuatText, (ev) => setNangLucPhapLuatText(ev.target.value), 'Nhập đánh giá năng lực pháp luật dân sự của khách hàng...', '180px'),

                    // Đánh giá theo tiêu chí
                    e('div', { className: 'border border-gray-200 rounded-lg overflow-hidden' },
                        e('div', { className: 'bg-gray-50 px-4 py-2.5 border-b border-gray-200' },
                            e('span', { className: 'text-sm font-semibold text-gray-700' }, 'Đánh giá theo tiêu chí')
                        ),
                        e('div', { className: 'p-4 grid grid-cols-2 gap-x-8 gap-y-4' },
                            // 1. Thành lập và đăng ký hợp lệ
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-2 font-medium' }, '1. Thành lập và đăng ký hợp lệ'),
                                e('div', { className: 'flex items-center gap-4' },
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'thanhLapHopLe', checked: thanhLapHopLe === 'hop-le', onChange: () => setThanhLapHopLe('hop-le'), className: 'w-4 h-4 accent-[#006B68]' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Hợp lệ')
                                    ),
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'thanhLapHopLe', checked: thanhLapHopLe === 'chua-hop-le', onChange: () => setThanhLapHopLe('chua-hop-le'), className: 'w-4 h-4' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Chưa hợp lệ')
                                    )
                                )
                            ),
                            // 2. Năng lực ký kết hợp đồng
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-2 font-medium' }, '2. Năng lực ký kết hợp đồng'),
                                e('div', { className: 'flex items-center gap-4' },
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'nangLucKyKet', checked: nangLucKyKet === 'du-nang-luc', onChange: () => setNangLucKyKet('du-nang-luc'), className: 'w-4 h-4 accent-[#006B68]' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Đủ năng lực')
                                    ),
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'nangLucKyKet', checked: nangLucKyKet === 'khong-du', onChange: () => setNangLucKyKet('khong-du'), className: 'w-4 h-4' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Không đủ')
                                    )
                                )
                            ),
                            // 3. Tình trạng pháp lý
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-2 font-medium' }, '3. Tình trạng pháp lý hiện tại'),
                                e('div', { className: 'flex items-center gap-4' },
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'tinhTrangPhapLy', checked: tinhTrangPhapLy === 'binh-thuong', onChange: () => setTinhTrangPhapLy('binh-thuong'), className: 'w-4 h-4 accent-[#006B68]' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Bình thường')
                                    ),
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'tinhTrangPhapLy', checked: tinhTrangPhapLy === 'co-van-de', onChange: () => setTinhTrangPhapLy('co-van-de'), className: 'w-4 h-4' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Có vấn đề')
                                    )
                                )
                            ),
                            // 4. Tranh chấp / vi phạm pháp luật
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-2 font-medium' }, '4. Tranh chấp / vi phạm pháp luật'),
                                e('div', { className: 'flex items-center gap-4' },
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'tranhChapViPham', checked: tranhChapViPham === 'khong-co', onChange: () => setTranhChapViPham('khong-co'), className: 'w-4 h-4 accent-[#006B68]' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Không có')
                                    ),
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'tranhChapViPham', checked: tranhChapViPham === 'co', onChange: () => setTranhChapViPham('co'), className: 'w-4 h-4' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Có')
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    };

    // ===== STATE CHO MÔ HÌNH QUẢN LÝ =====
    // Cơ cấu cổ đông
    const [danhSachCoDong, setDanhSachCoDong] = React.useState([
        { id: 1, tenToChuc: 'Phạm Nhật Vượng', vonDangKy: '13,721,060', tyTrongDK: '40.0', vonThucGop: '13,721,060', tyTrongTG: '40.0', moiQuanHe: 'Cổ đông sáng lập, Chủ tịch HĐQT' },
        { id: 2, tenToChuc: 'Công ty TNHH MTV Quản lý quỹ đầu tư Dragon Capital', vonDangKy: '4,802,371', tyTrongDK: '14.0', vonThucGop: '4,802,371', tyTrongTG: '14.0', moiQuanHe: 'Nhà đầu tư tài chính chiến lược' },
        { id: 3, tenToChuc: 'VinaCapital Vietnam Opportunity Fund Limited', vonDangKy: '2,401,186', tyTrongDK: '7.0', vonThucGop: '2,401,186', tyTrongTG: '7.0', moiQuanHe: 'Nhà đầu tư nước ngoài' },
        { id: 4, tenToChuc: 'BlackRock Investment Management', vonDangKy: '1,715,133', tyTrongDK: '5.0', vonThucGop: '1,715,133', tyTrongTG: '5.0', moiQuanHe: 'Quỹ đầu tư quốc tế' },
        { id: 5, tenToChuc: 'Cổ đông khác', vonDangKy: '11,662,901', tyTrongDK: '34.0', vonThucGop: '11,662,901', tyTrongTG: '34.0', moiQuanHe: 'Cổ đông công chúng' }
    ]);

    // State cho nội dung cơ cấu cổ đông dạng free-text
    const [coCauCoDongText, setCoCauCoDongText] = React.useState('1. Phạm Nhật Vượng - Vốn đăng ký: 13,721,060 triệu đồng (40.0%) - Vốn thực góp: 13,721,060 triệu đồng (40.0%) - Cổ đông sáng lập, Chủ tịch HĐQT\n2. Công ty TNHH MTV Quản lý quỹ đầu tư Dragon Capital - Vốn đăng ký: 4,802,371 triệu đồng (14.0%) - Vốn thực góp: 4,802,371 triệu đồng (14.0%) - Nhà đầu tư tài chính chiến lược\n3. VinaCapital Vietnam Opportunity Fund Limited - Vốn đăng ký: 2,401,186 triệu đồng (7.0%) - Vốn thực góp: 2,401,186 triệu đồng (7.0%) - Nhà đầu tư nước ngoài\n4. BlackRock Investment Management - Vốn đăng ký: 1,715,133 triệu đồng (5.0%) - Vốn thực góp: 1,715,133 triệu đồng (5.0%) - Quỹ đầu tư quốc tế\n5. Cổ đông khác - Vốn đăng ký: 11,662,901 triệu đồng (34.0%) - Vốn thực góp: 11,662,901 triệu đồng (34.0%) - Cổ đông công chúng');

    // Sơ đồ tổ chức - CKEditor textarea
    const [soDoToChucText, setSoDoToChucText] = React.useState('');
    const [danhGiaSoDoToChuc, setDanhGiaSoDoToChuc] = React.useState('Sơ đồ tổ chức của Vingroup được cấu trúc rõ ràng, phân cấp hợp lý từ Đại hội đồng cổ đông đến các đơn vị kinh doanh. Hệ thống quản trị được phân tách rõ ràng giữa Hội đồng quản trị và Ban điều hành, đảm bảo tính độc lập và hiệu quả trong giám sát. Các đơn vị kinh doanh được tổ chức theo ngành nghề, tạo sự linh hoạt và chuyên môn hóa cao.');

    // Tiêu chí đánh giá mô hình tổ chức (4 tiêu chí)
    const [coCauToChuc, setCoCauToChuc] = React.useState('ro-rang');
    const [toChucQuanTri, setToChucQuanTri] = React.useState('dam-bao');
    const [toChucSXKD, setToChucSXKD] = React.useState('chuyen-mon');
    const [kiemSoatNoiBo, setKiemSoatNoiBo] = React.useState('dam-bao');

    // Cơ chế quản trị, phân quyền
    const [danhSachLanhDao, setDanhSachLanhDao] = React.useState([
        { id: 1, hoTen: 'Phạm Nhật Vượng', namSinh: '1968', hocVan: 'Thạc sĩ Địa chất', chucVu: 'Chủ tịch HĐQT', loaiChucVu: 'chu-tich' },
        { id: 2, hoTen: 'Nguyễn Việt Quang', namSinh: '1975', hocVan: 'Thạc sĩ Quản trị Kinh doanh', chucVu: 'Phó Chủ tịch HĐQT', loaiChucVu: 'pho-chu-tich' },
        { id: 3, hoTen: 'Lê Thị Thu Thủy', namSinh: '1982', hocVan: 'Thạc sĩ Tài chính', chucVu: 'Thành viên HĐQT', loaiChucVu: 'thanh-vien' },
        { id: 4, hoTen: 'Nguyễn Thanh Hùng', namSinh: '1973', hocVan: 'Tiến sĩ Kinh tế', chucVu: 'Thành viên HĐQT', loaiChucVu: 'thanh-vien' },
        { id: 5, hoTen: 'Phạm Việt Anh', namSinh: '1980', hocVan: 'Cử nhân Quản trị Kinh doanh', chucVu: 'Thành viên HĐQT', loaiChucVu: 'thanh-vien' },
        { id: 6, hoTen: 'Trần Đức Long', namSinh: '1965', hocVan: 'Tiến sĩ Luật', chucVu: 'Thành viên HĐQT độc lập', loaiChucVu: 'doc-lap' },
        { id: 7, hoTen: 'Bùi Thị Thanh Hương', namSinh: '1972', hocVan: 'Thạc sĩ Tài chính', chucVu: 'Thành viên HĐQT độc lập', loaiChucVu: 'doc-lap' },
        { id: 8, hoTen: 'Nguyễn Việt Quang', namSinh: '1975', hocVan: 'Thạc sĩ Quản trị Kinh doanh', chucVu: 'Tổng Giám đốc', loaiChucVu: 'tgd' },
        { id: 9, hoTen: 'Hồ Xuân Năng', namSinh: '1970', hocVan: 'Thạc sĩ Tài chính', chucVu: 'Phó TGĐ Tài chính', loaiChucVu: 'pho-tgd' },
        { id: 10, hoTen: 'Nguyễn Hồng Hạnh', namSinh: '1978', hocVan: 'MBA', chucVu: 'Phó TGĐ Kinh doanh', loaiChucVu: 'pho-tgd' },
        { id: 11, hoTen: 'Trần Mạnh Hùng', namSinh: '1976', hocVan: 'Kỹ sư Xây dựng', chucVu: 'Phó TGĐ Vận hành', loaiChucVu: 'pho-tgd' }
    ]);
    const [danhGiaLanhDao, setDanhGiaLanhDao] = React.useState('Vingroup sở hữu đội ngũ lãnh đạo dày dặn kinh nghiệm với tầm nhìn chiến lược rõ ràng. Ban lãnh đạo có năng lực điều hành xuất sắc, đã thành công trong việc chuyển đổi từ bất động sản sang đa ngành nghề. Hệ thống quản trị minh bạch, tuân thủ chuẩn mực quốc tế.');

    // Đánh giá năng lực quản trị
    const [nangLucBanLanhDao, setNangLucBanLanhDao] = React.useState('co-trinh-do');
    const [nangLucDoiNgu, setNangLucDoiNgu] = React.useState('dap-ung');
    const [coChePhánQuyen, setCoChePhánQuyen] = React.useState('ro-rang');
    const [danhGiaQuanTriText, setDanhGiaQuanTriText] = React.useState('');

    // Handlers cho Mô hình quản lý
    const handleAddCoDong = () => {
        const newId = danhSachCoDong.length + 1;
        setDanhSachCoDong([...danhSachCoDong, {
            id: newId, tenToChuc: '', vonDangKy: '', tyTrongDK: '', vonThucGop: '', tyTrongTG: '', moiQuanHe: 'Cá nhân'
        }]);
    };

    const handleRemoveCoDong = (id) => {
        setDanhSachCoDong(danhSachCoDong.filter(cd => cd.id !== id));
    };

    const handleAddLanhDao = () => {
        const newId = danhSachLanhDao.length + 1;
        setDanhSachLanhDao([...danhSachLanhDao, {
            id: newId, hoTen: 'Nhập tên', namSinh: 'Nhập', hocVan: 'Chọn', chucVu: 'Chọn', ngayBoNhiem: 'dd/mm/yyyy', quaTrinhCongTac: 'Nhập nội dung', daiDienPhapLuat: false
        }]);
    };

    const handleRemoveLanhDao = (id) => {
        setDanhSachLanhDao(danhSachLanhDao.filter(ld => ld.id !== id));
    };

    const handleSetDaiDienPhapLuat = (id) => {
        setDanhSachLanhDao(danhSachLanhDao.map(ld => ({
            ...ld,
            daiDienPhapLuat: ld.id === id
        })));
    };

    // Render Mô hình quản lý
    const renderMoHinhQuanLy = () => {
        // Helper function cho màu chức vụ
        const getChucVuBadge = (loai) => {
            switch (loai) {
                case 'chu-tich': return 'bg-[#006B68] text-white';
                case 'pho-chu-tich': return 'bg-blue-500 text-white';
                case 'thanh-vien': return 'bg-teal-500 text-white';
                case 'doc-lap': return 'bg-purple-500 text-white';
                case 'tgd': return 'bg-red-500 text-white';
                case 'pho-tgd': return 'bg-orange-500 text-white';
                default: return 'bg-gray-500 text-white';
            }
        };

        return e('div', { className: 'space-y-6' },

            // ===== KHỐI 1: CƠ CẤU CỔ ĐÔNG/THÀNH VIÊN GÓP VỐN =====
            e('div', { className: 'bg-white rounded-lg border border-gray-200 overflow-hidden' },
                e('div', {
                    className: 'bg-[#006B68] px-4 py-3 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity',
                    onClick: () => togglePtc('coCauCoDong')
                },
                    e('h4', { className: 'font-semibold text-white' }, 'Cơ cấu cổ đông/ thành viên góp vốn'),
                    renderSectionBadge('coCauCoDong'),
                    e('i', { className: 'fas fa-chevron-' + (isPtcOpen('coCauCoDong') ? 'up' : 'down') + ' text-white text-sm' })
                ),
                isPtcOpen('coCauCoDong') && e('div', { className: 'p-5' },
                    renderCKEditor(coCauCoDongText, (ev) => setCoCauCoDongText(ev.target.value), 'Nhập thông tin cơ cấu cổ đông / thành viên góp vốn...', '200px')
                )
            ),

            // ===== KHỐI 2: SƠ ĐỒ TỔ CHỨC =====
            e('div', { className: 'bg-white rounded-lg border border-gray-200 overflow-hidden' },
                e('div', {
                    className: 'bg-[#006B68] px-4 py-3 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity',
                    onClick: () => togglePtc('soDoToChuc')
                },
                    e('div', { className: 'flex items-center gap-2' },
                        e('i', { className: 'fas fa-sitemap text-white' }),
                        e('h4', { className: 'font-semibold text-white' }, 'Sơ đồ tổ chức'),
                        renderSectionBadge('soDoToChuc')
                    ),
                    e('i', { className: 'fas fa-chevron-' + (isPtcOpen('soDoToChuc') ? 'up' : 'down') + ' text-white text-sm' })
                ),
                isPtcOpen('soDoToChuc') && e('div', { className: 'p-5 space-y-5' },
                    // CKEditor rich text editor
                    renderCKEditor(soDoToChucText, (ev) => setSoDoToChucText(ev.target.value), 'Nhập mô tả sơ đồ tổ chức của doanh nghiệp...', '200px'),
                    // Đánh giá mô hình tổ chức - 4 tiêu chí
                    e('div', { className: 'border-t border-gray-200 pt-4 space-y-4' },
                        e('div', { className: 'mb-2' },
                            e('span', { className: 'text-sm font-medium text-gray-700' }, 'Đánh giá')
                        ),
                        e('div', { className: 'grid grid-cols-2 gap-x-8 gap-y-4' },
                            // 1. Cơ cấu tổ chức
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-2' }, 'Cơ cấu tổ chức'),
                                e('div', { className: 'flex items-center gap-4' },
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'coCauToChuc', checked: coCauToChuc === 'ro-rang', onChange: () => setCoCauToChuc('ro-rang'), className: 'w-4 h-4 text-[#006B68]' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Rõ ràng')
                                    ),
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'coCauToChuc', checked: coCauToChuc === 'chua-ro-rang', onChange: () => setCoCauToChuc('chua-ro-rang'), className: 'w-4 h-4' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Chưa rõ ràng')
                                    )
                                )
                            ),
                            // 2. Tổ chức bộ máy quản trị
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-2' }, 'Tổ chức bộ máy quản trị'),
                                e('div', { className: 'flex items-center gap-4' },
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'toChucQuanTri', checked: toChucQuanTri === 'dam-bao', onChange: () => setToChucQuanTri('dam-bao'), className: 'w-4 h-4 text-[#006B68]' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Đảm bảo')
                                    ),
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'toChucQuanTri', checked: toChucQuanTri === 'chua-dam-bao', onChange: () => setToChucQuanTri('chua-dam-bao'), className: 'w-4 h-4' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Chưa đảm bảo')
                                    )
                                )
                            ),
                            // 3. Tổ chức SXKD
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-2' }, 'Tổ chức SXKD'),
                                e('div', { className: 'flex items-center gap-4' },
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'toChucSXKD', checked: toChucSXKD === 'chuyen-mon', onChange: () => setToChucSXKD('chuyen-mon'), className: 'w-4 h-4 text-[#006B68]' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Chuyên môn hóa')
                                    ),
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'toChucSXKD', checked: toChucSXKD === 'chua-chuyen-mon', onChange: () => setToChucSXKD('chua-chuyen-mon'), className: 'w-4 h-4' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Chưa chuyên môn hóa')
                                    )
                                )
                            ),
                            // 4. Hệ thống kiểm soát nội bộ
                            e('div', null,
                                e('label', { className: 'block text-sm text-gray-600 mb-2' }, 'Hệ thống kiểm soát nội bộ'),
                                e('div', { className: 'flex items-center gap-4' },
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'kiemSoatNoiBo', checked: kiemSoatNoiBo === 'dam-bao', onChange: () => setKiemSoatNoiBo('dam-bao'), className: 'w-4 h-4 text-[#006B68]' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Đảm bảo')
                                    ),
                                    e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                        e('input', { type: 'radio', name: 'kiemSoatNoiBo', checked: kiemSoatNoiBo === 'chua-dam-bao', onChange: () => setKiemSoatNoiBo('chua-dam-bao'), className: 'w-4 h-4' }),
                                        e('span', { className: 'text-sm text-gray-700' }, 'Chưa đảm bảo')
                                    )
                                )
                            )
                        ),
                        // Đánh giá text
                        e('div', { className: 'p-3 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 mt-3' }, danhGiaSoDoToChuc)
                    )
                )
            ),

            // ===== KHỐI 3: CƠ CHẾ QUẢN TRỊ ĐIỀU HÀNH =====
            e('div', { className: 'bg-white rounded-lg border border-gray-200 overflow-hidden' },
                e('div', {
                    className: 'bg-[#006B68] px-4 py-3 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity',
                    onClick: () => togglePtc('quanTriDieuHanh')
                },
                    e('div', { className: 'flex items-center gap-2' },
                        e('i', { className: 'fas fa-user-tie text-white' }),
                        e('h4', { className: 'font-semibold text-white' }, 'Cơ chế quản trị điều hành, phân quyền, ủy nhiệm'),
                        renderSectionBadge('quanTriDieuHanh')
                    ),
                    e('i', { className: 'fas fa-chevron-' + (isPtcOpen('quanTriDieuHanh') ? 'up' : 'down') + ' text-white text-sm' })
                ),
                // CKEditor cho mô tả cơ chế quản trị
                isPtcOpen('quanTriDieuHanh') && e('div', { className: 'p-5' },
                    renderCKEditor(danhGiaQuanTriText, (ev) => setDanhGiaQuanTriText(ev.target.value), 'Nhập mô tả cơ chế quản trị điều hành, phân quyền, ủy nhiệm, danh sách ban lãnh đạo...', '250px')
                ),
                // Đánh giá cơ chế quản trị - Lựa chọn đánh giá + Textarea
                e('div', { className: 'border-t border-gray-200 p-4 space-y-4' },
                    e('div', { className: 'mb-2' },
                        e('span', { className: 'text-sm font-medium text-gray-700' }, 'Đánh giá')
                    ),
                    // 3 tiêu chí đánh giá
                    e('div', { className: 'grid grid-cols-3 gap-6' },
                        // 1. Năng lực ban lãnh đạo
                        e('div', null,
                            e('label', { className: 'block text-sm text-gray-600 mb-2' }, 'Năng lực ban lãnh đạo'),
                            e('div', { className: 'flex items-center gap-4' },
                                e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                    e('input', { type: 'radio', name: 'nangLucBanLanhDao', checked: nangLucBanLanhDao === 'co-trinh-do', onChange: () => setNangLucBanLanhDao('co-trinh-do'), className: 'w-4 h-4 text-[#006B68]' }),
                                    e('span', { className: 'text-sm text-gray-700' }, 'Có trình độ')
                                ),
                                e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                    e('input', { type: 'radio', name: 'nangLucBanLanhDao', checked: nangLucBanLanhDao === 'chua-co', onChange: () => setNangLucBanLanhDao('chua-co'), className: 'w-4 h-4' }),
                                    e('span', { className: 'text-sm text-gray-700' }, 'Chưa đáp ứng')
                                )
                            )
                        ),
                        // 2. Năng lực đội ngũ
                        e('div', null,
                            e('label', { className: 'block text-sm text-gray-600 mb-2' }, 'Năng lực đội ngũ'),
                            e('div', { className: 'flex items-center gap-4' },
                                e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                    e('input', { type: 'radio', name: 'nangLucDoiNgu', checked: nangLucDoiNgu === 'dap-ung', onChange: () => setNangLucDoiNgu('dap-ung'), className: 'w-4 h-4 text-[#006B68]' }),
                                    e('span', { className: 'text-sm text-gray-700' }, 'Đáp ứng')
                                ),
                                e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                    e('input', { type: 'radio', name: 'nangLucDoiNgu', checked: nangLucDoiNgu === 'chua-dap-ung', onChange: () => setNangLucDoiNgu('chua-dap-ung'), className: 'w-4 h-4' }),
                                    e('span', { className: 'text-sm text-gray-700' }, 'Chưa đáp ứng')
                                )
                            )
                        ),
                        // 3. Cơ chế phân quyền
                        e('div', null,
                            e('label', { className: 'block text-sm text-gray-600 mb-2' }, 'Cơ chế phân quyền'),
                            e('div', { className: 'flex items-center gap-4' },
                                e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                    e('input', { type: 'radio', name: 'coChePhánQuyen', checked: coChePhánQuyen === 'ro-rang', onChange: () => setCoChePhánQuyen('ro-rang'), className: 'w-4 h-4 text-[#006B68]' }),
                                    e('span', { className: 'text-sm text-gray-700' }, 'Rõ ràng')
                                ),
                                e('label', { className: 'flex items-center gap-2 cursor-pointer' },
                                    e('input', { type: 'radio', name: 'coChePhánQuyen', checked: coChePhánQuyen === 'chua-ro-rang', onChange: () => setCoChePhánQuyen('chua-ro-rang'), className: 'w-4 h-4' }),
                                    e('span', { className: 'text-sm text-gray-700' }, 'Chưa rõ ràng')
                                )
                            )
                        )
                    ),
                    // CKEditor đánh giá
                    e('div', { className: 'mt-3' },
                        renderCKEditor(danhGiaQuanTriText, (ev) => setDanhGiaQuanTriText(ev.target.value), 'Nhập đánh giá cơ chế quản trị điều hành, phân quyền, ủy nhiệm...', '120px')
                    )
                )
            )
        );
    };

    // ===== STATE CHO TÌNH HÌNH HOẠT ĐỘNG SXKD =====
    const [expandedSections, setExpandedSections] = React.useState({
        sanPham: false,
        nenKhachHang: false,
        cungUng: false,
        coSoVatChat: false,
        swot: false
    });

    // State cho dynamic khối Tình hình hoạt động SXKD
    const defaultSxkdIcons = ['fa-boxes-stacked', 'fa-users', 'fa-truck-field', 'fa-building', 'fa-chart-bar', 'fa-lightbulb', 'fa-cogs', 'fa-handshake'];
    const [sxkdBlocks, setSxkdBlocks] = React.useState([
        { id: 1, title: 'Sản phẩm, dịch vụ và triển vọng ngành', placeholder: 'Nhập thông tin về sản phẩm, dịch vụ chính của doanh nghiệp và triển vọng phát triển của ngành...', value: '' },
        { id: 2, title: 'Nền khách hàng, quy mô kinh doanh, cơ cấu doanh thu', placeholder: 'Nhập thông tin về nền khách hàng mục tiêu, quy mô hoạt động và cơ cấu doanh thu...', value: '' },
        { id: 3, title: 'Cung ứng nguyên vật liệu/hàng hóa, dịch vụ đầu vào', placeholder: 'Nhập thông tin về chuỗi cung ứng, nguồn nguyên vật liệu, nhà cung cấp chính...', value: '' },
        { id: 4, title: 'Cơ sở vật chất, kỹ thuật, marketing, bán hàng, kênh phân phối', placeholder: 'Nhập thông tin về cơ sở vật chất, năng lực kỹ thuật, chiến lược marketing và kênh phân phối...', value: '' }
    ]);

    const handleAddSxkdBlock = () => {
        const newId = sxkdBlocks.length > 0 ? Math.max(...sxkdBlocks.map(b => b.id)) + 1 : 1;
        setSxkdBlocks([...sxkdBlocks, {
            id: newId,
            title: 'Khối thông tin mới',
            placeholder: 'Nhập nội dung...',
            value: ''
        }]);
    };

    const handleRemoveSxkdBlock = (id) => {
        if (sxkdBlocks.length <= 1) return;
        setSxkdBlocks(sxkdBlocks.filter(b => b.id !== id));
    };

    // State cho ảnh minh họa SXKD
    const [sxkdImages, setSxkdImages] = React.useState([]);

    const handleUpdateSxkdBlock = (id, value) => {
        setSxkdBlocks(sxkdBlocks.map(b => b.id === id ? { ...b, value } : b));
    };

    const handleUpdateSxkdTitle = (id, title) => {
        setSxkdBlocks(sxkdBlocks.map(b => b.id === id ? { ...b, title } : b));
    };

    // Render Tình hình hoạt động SXKD - Dynamic BLOCKS
    const renderTinhHinhKD = () => {
        return e('div', { className: 'space-y-4' },
            sxkdBlocks.map((block, idx) =>
                e('div', {
                    key: block.id,
                    className: 'border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'
                },
                    // Block Header
                    e('div', {
                        className: 'px-5 py-3.5 flex items-center justify-between',
                        style: { background: 'linear-gradient(135deg, #006B68 0%, #008B87 100%)' }
                    },
                        e('div', { className: 'flex items-center gap-3 flex-1' },
                            e('div', {
                                className: 'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                                style: { background: 'rgba(255,255,255,0.2)' }
                            },
                                e('i', { className: 'fas ' + (defaultSxkdIcons[idx] || 'fa-file-alt') + ' text-white text-sm' })
                            ),
                            e('h4', { className: 'font-semibold text-white text-sm' },
                                (idx + 1) + '. ' + block.title
                            )
                        ),
                        sxkdBlocks.length > 1 && e('button', {
                            onClick: () => handleRemoveSxkdBlock(block.id),
                            className: 'ml-2 text-white/70 hover:text-white transition-colors',
                            title: 'Xóa khối thông tin'
                        },
                            e('i', { className: 'fas fa-times' })
                        )
                    ),
                    // Block Content - CKEditor
                    e('div', { className: 'p-4 bg-white' },
                        renderCKEditor(block.value, (ev) => handleUpdateSxkdBlock(block.id, ev.target.value), block.placeholder, '160px')
                    )
                )
            ),
            // Thêm mới khối thông tin button
            e('button', {
                onClick: handleAddSxkdBlock,
                className: 'w-full py-3 border-2 border-dashed border-[#006B68]/30 rounded-xl text-sm text-[#006B68] hover:bg-[#006B68]/5 hover:border-[#006B68]/50 transition-all flex items-center justify-center gap-2 font-medium'
            },
                e('i', { className: 'fas fa-plus' }),
                'Thêm mới khối thông tin'
            ),

            // ===== UPLOAD ẢNH MINH HỌA =====
            e('div', { className: 'border border-gray-200 rounded-xl overflow-hidden bg-white' },
                e('div', { className: 'px-5 py-3.5 flex items-center gap-3 border-b border-gray-200 bg-gray-50' },
                    e('div', {
                        className: 'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#006B68]'
                    },
                        e('i', { className: 'fas fa-images text-white text-sm' })
                    ),
                    e('h4', { className: 'font-semibold text-gray-800 text-sm' }, 'Ảnh minh họa')
                ),
                e('div', { className: 'p-5 space-y-4' },
                    // Upload area
                    e('div', {
                        className: 'border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#006B68]/50 hover:bg-[#006B68]/5 transition-all cursor-pointer',
                        onClick: () => { const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*'; inp.multiple = true; inp.onchange = (ev) => { const files = Array.from(ev.target.files); files.forEach(f => { const reader = new FileReader(); reader.onload = (e2) => setSxkdImages(prev => [...prev, { id: Date.now() + Math.random(), name: f.name, url: e2.target.result }]); reader.readAsDataURL(f); }); }; inp.click(); }
                    },
                        e('div', { className: 'flex flex-col items-center gap-3' },
                            e('div', { className: 'w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center' },
                                e('i', { className: 'fas fa-cloud-upload-alt text-2xl text-gray-400' })
                            ),
                            e('div', null,
                                e('p', { className: 'text-sm font-medium text-gray-700' }, 'Kéo thả ảnh vào đây hoặc nhấn để chọn'),
                                e('p', { className: 'text-xs text-gray-400 mt-1' }, 'Hỗ trợ: JPG, PNG, GIF. Tối đa 10MB/ảnh')
                            )
                        )
                    ),
                    // Image preview grid
                    sxkdImages.length > 0 && e('div', { className: 'grid grid-cols-4 gap-3' },
                        sxkdImages.map(img =>
                            e('div', { key: img.id, className: 'relative group rounded-lg overflow-hidden border border-gray-200 aspect-square' },
                                e('img', { src: img.url, alt: img.name, className: 'w-full h-full object-cover' }),
                                // Overlay with delete
                                e('div', { className: 'absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center' },
                                    e('button', {
                                        className: 'w-8 h-8 rounded-full bg-white/90 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center',
                                        onClick: (ev) => { ev.stopPropagation(); setSxkdImages(prev => prev.filter(i => i.id !== img.id)); }
                                    },
                                        e('i', { className: 'fas fa-trash text-xs' })
                                    )
                                ),
                                // Filename
                                e('div', { className: 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5' },
                                    e('span', { className: 'text-[10px] text-white truncate block' }, img.name)
                                )
                            )
                        )
                    )
                )
            )
        );
    };


    return e('div', { className: 'space-y-4' },
        // I. Thông tin pháp lý
        e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
            e('div', {
                className: 'px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-200',
                onClick: () => togglePtc('mainPhapLy')
            },
                e('div', { className: 'flex items-center gap-2' },
                    e('i', { className: 'fas fa-gavel text-[#006B68]' }),
                    e('span', { className: 'font-semibold text-gray-800 text-base' }, 'I. Thông tin pháp lý')
                ),
                e('i', { className: 'fas fa-chevron-' + (isPtcOpen('mainPhapLy') ? 'up' : 'down') + ' text-gray-400 text-sm' })
            ),
            isPtcOpen('mainPhapLy') && e('div', { className: 'p-5' }, renderThongTinPhapLy())
        ),

        // II. Mô hình quản lý
        e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
            e('div', {
                className: 'px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-200',
                onClick: () => togglePtc('mainMoHinh')
            },
                e('div', { className: 'flex items-center gap-2' },
                    e('i', { className: 'fas fa-users-cog text-[#006B68]' }),
                    e('span', { className: 'font-semibold text-gray-800 text-base' }, 'II. Mô hình quản lý')
                ),
                e('i', { className: 'fas fa-chevron-' + (isPtcOpen('mainMoHinh') ? 'up' : 'down') + ' text-gray-400 text-sm' })
            ),
            isPtcOpen('mainMoHinh') && e('div', { className: 'p-5' }, renderMoHinhQuanLy())
        ),

        // III. Tình hình hoạt động SXKD
        e('div', { className: 'bg-white border border-gray-200 rounded-lg overflow-hidden' },
            e('div', {
                className: 'px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-200',
                onClick: () => togglePtc('mainTinhHinh')
            },
                e('div', { className: 'flex items-center gap-2' },
                    e('i', { className: 'fas fa-industry text-[#006B68]' }),
                    e('span', { className: 'font-semibold text-gray-800 text-base' }, 'III. Tình hình hoạt động SXKD')
                ),
                e('i', { className: 'fas fa-chevron-' + (isPtcOpen('mainTinhHinh') ? 'up' : 'down') + ' text-gray-400 text-sm' })
            ),
            isPtcOpen('mainTinhHinh') && e('div', { className: 'p-5' }, renderTinhHinhKD())
        ),

        // ===== VALIDATION SUMMARY + LƯU ĐÁNH GIÁ BUTTON =====
        e('div', { className: 'bg-white border border-gray-200 rounded-lg p-5' },
            // Progress summary
            e('div', { className: 'flex items-center justify-between mb-4' },
                e('div', { className: 'flex items-center gap-3' },
                    e('h3', { className: 'font-semibold text-gray-800' }, 'Trạng thái hoàn thành'),
                    e('span', { className: 'text-sm text-gray-500' },
                        Object.values(sectionValidation).filter(function(v) { return v; }).length + '/' + Object.keys(sectionValidation).length + ' mục đã hoàn thành'
                    )
                ),
                // Progress bar
                e('div', { className: 'w-48 h-2 bg-gray-200 rounded-full overflow-hidden' },
                    e('div', {
                        className: 'h-full bg-[#006B68] rounded-full transition-all duration-500',
                        style: { width: (Object.values(sectionValidation).filter(function(v) { return v; }).length / Object.keys(sectionValidation).length * 100) + '%' }
                    })
                )
            ),
            // Button row
            e('div', { className: 'flex items-center justify-end gap-3' },
                e('button', {
                    onClick: handleCancel,
                    className: 'px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors'
                }, 'Hủy'),
                e('button', {
                    onClick: handleSave,
                    className: 'px-5 py-2.5 bg-[#006B68] text-white rounded-lg text-sm hover:bg-[#005a57] transition-colors flex items-center gap-2 font-medium'
                },
                    e('i', { className: 'fas fa-check-circle' }),
                    'Lưu đánh giá'
                )
            )
        )
    );
};
