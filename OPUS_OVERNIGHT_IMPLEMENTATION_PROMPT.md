# Prompt cho Opus - Overnight implementation Sq2/RSD

Ban dang lam trong repo `C:\Users\Admin\Desktop\TĐRR`.

Muc tieu: trong dem nay hoan thien toi da noi dung va chuc nang mock theo `Sq2` + `RSD`, giu nguyen template/giao dien hien tai cua du an. Khong redesign tong the. Uu tien lam cac flow hien duoc, bam RSD/Figma, co popup/state/validate/toast/log mock de demo nhu he thong chay that.

Doc truoc cac file audit:

- `AUDIT_FINAL_DEEP_RECHECK.md`
- `AUDIT_SQ2_RSD_FINDINGS.md`
- `AUDIT_HANDOFF_PLAN.md`

Quy tac chung:

1. Giu style hien tai, dung class/design pattern san co.
2. Khong lam landing page, khong doi layout lon.
3. Neu chua co API/backend thi dung mock state/local data ro rang, nhung UI phai the hien dung nghiep vu: save, tick xanh, validate, popup, log, status.
4. Khong xoa code cu neu khong can.
5. Khong phai lam production backend. Muc tieu la demo nghiep vu tot nhat trong thoi gian ngan.
6. Sau moi nhom sua, chay/test bang trinh duyet neu co the.

## Tong so dau viec dem nay

Lam theo 18 dau viec duoi day. Neu het thoi gian, uu tien theo thu tu.

## Dau viec 1 - Them tab Phan bo tu dong vao Luong trinh duyet

File lien quan:

- `tabs/luongtrinhduyet/luong-trinh-duyet.js`
- tao moi `tabs/luongtrinhduyet/phan-bo-tu-dong.js`
- `index.html` neu can nhung script moi.

Yeu cau:

- Trong `Luồng trình duyệt`, them segmented/tab switch:
  - `Thiết lập luồng trình`
  - `Phân bổ tự động`
- `Thiết lập luồng trình` giu man hien tai.
- `Phân bổ tự động` render component moi `window.TabPhanBoTuDong`.

## Dau viec 2 - Man danh sach Phan bo tu dong

Theo anh `Sq2/Tạo luồng trình/Quy tắc phân bổ thẩm định rủi ro/List Process`.

Can co:

- Breadcrumb/title `Phân bổ tự động`.
- Search placeholder `Tìm kiếm mã, tên quy tắc`.
- Filter dropdown/mock: `Tất cả loại quy tắc`, `Tất cả đơn vị`, `Tất cả bước áp dụng`, `Trạng thái`.
- Dropdown `Bước áp dụng` co checkbox + search + nut `Hủy`, `Xác nhận`.
- Bang:
  - STT
  - Tên quy tắc
  - Loại quy tắc
  - Đơn vị
  - Trạng thái
  - Bước áp dụng
  - Ngày cập nhật
  - Người cập nhật
  - action xem/sua/xoa
- Empty state va search empty state.
- Pagination va page size.
- Row click vao detail.

## Dau viec 3 - Man chi tiet Quy tac phan bo

Theo anh `Details-1..5`.

Can co:

- Back button `Xem chi tiết`.
- Header: ten quy tac, status `Hoạt động`, ma quy tac, nguoi tao, ngay khoi tao.
- Card `Thông tin chung`:
  - Loại quy tắc
  - Đơn vị
  - Bước áp dụng
  - Vai trò áp dụng
  - Số quyết định
  - Ngày hiệu lực
  - Diễn giải
- Card `Quy tắc xác định người xử lý`:
  - Lịch sử xử lý hồ sơ
  - Số lượng hồ sơ đang xử lý/workload
  - Chức vụ
  - Ngẫu nhiên
  - toggle hoạt động
- Card `Quy tắc xác định nhóm`:
  - Hồ sơ đặc biệt
  - Hồ sơ dự án
  - Hồ sơ còn lại
  - bảng `Thứ tự ưu tiên`, `Tiêu chí`, `Giá trị tiêu chí`, `Nhóm xử lý hồ sơ`
- Tag/chip gia tri tieu chi.

## Dau viec 4 - Quan he TCTD: them toolbar refresh nguon

File:

- `tabs/thongtinkhachhang/quan-he-tctd.js`

Them vao man Quan he TCTD:

- Nut `Refresh XHTD`
- Nut `Refresh QHTD BIDV`
- Nut `Refresh CIC`
- Khi click hien loading ngắn, toast `Đã đồng bộ dữ liệu latest...`, cap nhat `Thời điểm đồng bộ gần nhất`.
- Trong luc loading khoa section bang disabled/opacity mock.

## Dau viec 5 - Quan he TCTD: khoi CIC day du hon

Them/hoan thien khoi `Quan hệ tại TCTD khác / CIC`:

- `Ngày trả kết quả CIC`
- Button `Tra cứu CIC`
- Bang `Quan hệ tín dụng`:
  - TCTD
  - Loại quan hệ
  - Hạn mức
  - Dư nợ
  - Nhóm nợ
  - Trạng thái
  - Thêm vào báo cáo checkbox
- Bang `Lịch sử quan hệ tín dụng và thông tin khác`.
- Action `Xem chi tiết` mo popup chi tiet CIC.
- Toast khi tra cuu/thêm vào báo cáo.

## Dau viec 6 - Quan he TCTD: khoi DKUN

Them khoi `Tình hình thực hiện ĐKUN của BIDV`.

Can co:

- Tong quan:
  - Tổng điều kiện
  - Đã thực hiện
  - Vi phạm/quá hạn
  - Cần bổ sung ý kiến
- Bang danh gia DKUN:
  - STT
  - Điều kiện
  - Commitment/TSBĐ liên quan
  - Trạng thái BPĐX
  - Kết quả đánh giá BPTĐRR
  - Diễn giải đánh giá
  - File đánh giá
  - Trạng thái
  - Action log/upload/download
- Radio/dropdown BPTDRR: `Đã đánh giá đầy đủ`, `Bổ sung ý kiến`.
- Neu `Bổ sung ý kiến` bat buoc nhap dien giai.
- Popup `Lịch sử đánh giá điều kiện`.

## Dau viec 7 - Tai lieu tin dung: action bar day du

File:

- `tabs/hosokhachhang/ho-so-khach-hang.js`

Them action bar:

- `Lưu`
- `Xuất danh sách`
- `Tải xuống`
- `Gửi nhắc tài liệu`
- `Thêm mới`
- `Di chuyển`
- `Tìm kiếm nâng cao`
- `Preview`

Button disable/enable theo selected folder/selected files. Tooltip/text nho dung logic.

## Dau viec 8 - Tai lieu tin dung: popup tim kiem nang cao

Popup fields:

- Trạng thái tài liệu
- Tính chất tài liệu
- Trạng thái QTTD
- Người cập nhật
- Ngày hết hiệu lực từ/đến
- Ngày tải tài liệu từ/đến
- Button `Xóa bộ lọc`, `Tìm kiếm`

Filter mock bang documents hien tai.

## Dau viec 9 - Tai lieu tin dung: wizard them moi

Popup/wizard 2 buoc:

1. `Thêm tài liệu`
   - upload/mock choose files
   - danh sach file them moi
   - mapping Nhóm hồ sơ, Phân nhóm, Loại hồ sơ, Tên hồ sơ
   - button `Chọn hồ sơ có sẵn`
   - xoa row co confirm
2. `Nhập thông tin`
   - metadata: hình thức tài liệu, số văn bản, cơ quan ban hành, ngày ban hành, ngày hiệu lực, ngày hết hiệu lực, trạng thái bản.
   - validate bat buoc co toast.

Footer: `Thoát`, `Lưu`, `Đẩy duyệt`.

## Dau viec 10 - Tai lieu tin dung: chon ho so co san

Popup:

- Search `Số hồ sơ tín dụng`, `Tên hồ sơ`
- Tree folder tai lieu tham chieu
- Checkbox chon tai lieu
- Dem so da chon
- Button `Xem hồ sơ`, `Xác nhận`
- Khi xac nhan them row lien ket vao wizard.

## Dau viec 11 - Tai lieu tin dung: preview/delete/move rule mock

Them:

- Preview popup document viewer mock co toolbar zoom/download.
- Delete confirm:
  - neu `Đã phê duyệt`: thong bao xoa link, khong xoa tai lieu goc.
  - neu khac: xoa file khoi HSTD.
- Move modal hien rule:
  - da duyet => duplicate ban ghi/sinh ID moi/xoa link cu.
  - chua duyet => move truc tiep.

## Dau viec 12 - Phe duyet tin dung: subtab Quyet dinh phe duyet readonly

File:

- `tabs/Pheduyettindung/phe-duyet-tin-dung.js`

Them tab/subtab:

- `Thông tin Đề xuất và Thẩm định`
- `Quyết định phê duyệt`
- `Tổng hợp ý kiến`

Neu UI hien co chua phu hop, dung segmented/tab nho trong man.

`Quyết định phê duyệt`:

- readonly
- tong hop tu `diffDecisions`, `conditionDecisions`, `approvalNote`
- canh bao "Mọi chỉnh sửa thực hiện tại tab Thông tin Đề xuất và Thẩm định"
- khong co input/popup sua.

## Dau viec 13 - Phe duyet tin dung: popup phe duyet/tu choi + mock ESign

Khi click `Phê duyệt cấp tín dụng`:

- Hien popup xac nhan phe duyet kem danh sach file mau bieu sinh:
  - Quyết định cấp tín dụng
  - Báo cáo phê duyệt
- Button `Ký số`, `Phê duyệt không ký/mock`, `Hủy`
- Neu `Ký số`:
  - step loading tao giao dich ESign
  - hien ma giao dich, chung thu so
  - nut `Mô phỏng xác nhận ký`, `Mô phỏng timeout`, `Mô phỏng từ chối`
  - success cap nhat status `Đã ký số / Đã phê duyệt`
  - error toast dung RSD.

## Dau viec 14 - Thu ky hoi dong: bo sung snapshot/lock/huy phien ro hon

File:

- `tabs/ThuKyHoiDong/thu-ky-hoi-dong.js`

Bo sung neu thieu:

- Button/flow `Tổng hợp kết quả` co confirm.
- Sau tong hop:
  - snapshot timestamp
  - lock phản hồi TVHĐ
  - status read-only
- `Hủy phiên XYK`:
  - popup bat buoc ly do
  - status `Đã hủy`
  - log.
- `Lịch sử lấy ý kiến` popup/table.

## Dau viec 15 - Header/workflow mock chung

File:

- `main.js`

Lam nut `Lưu`/`Trình duyệt` bot alert don gian:

- Luu cap nhat mock tick xanh/current saved status.
- Trinh duyet neu chua du tick xanh thi show warning/list tab chua hoan tat.
- Neu du thi show popup confirm va cap nhat status ho so mock.

Khong can perfect toan app, nhung phai thuyet phuc demo.

## Dau viec 16 - Them audit/log mock dung chung

Neu nhanh:

- Tao helper/function hoac simple component local `AuditTimeline`.
- Dung trong Quan he TCTD DKUN, Tai lieu tin dung, Phe duyet/Hoi dong.
- Log fields: thời gian, người thao tác, hành động, bước xử lý, nội dung thay đổi.

## Dau viec 17 - Bo sung validate/tick xanh cuc bo

Uu tien:

- Quan he TCTD DKUN: bo sung y kien phai nhap dien giai.
- Tai lieu tin dung wizard: file + folder + metadata bat buoc.
- Phe duyet: y kien phe duyet bat buoc.
- Tong hop hoi dong: phai co phan hoi/du dieu kien hoac confirm override.

## Dau viec 18 - QA nhanh

Can check:

- App load khong loi console nghiem trong.
- Sidebar/tab van vao duoc.
- `Luồng trình duyệt > Phân bổ tự động` vao list/detail.
- `Thông tin khách hàng > Quan hệ TCTD` thay CIC/DKUN.
- `Tài liệu tín dụng` mo du popup search/add/existing/preview/move/delete.
- `Phê duyệt tín dụng` mo readonly QD va popup ESign.
- `Thu ký hội đồng` co tong hop/huy phien/log neu lam.

Ket qua mong muon:

- Commit khong bat buoc.
- Ghi lai file `OPUS_DONE_NOTES.md` gom:
  - da lam gi
  - chua lam gi
  - file da sua
  - cach test nhanh
