# Final deep recheck Sq2 + RSD

Ngay recheck: 2026-06-04

## Pham vi recheck lan cuoi

- Sq2:
  - `Luong phe duyet`: 36 anh.
  - `Luong tham dinh`: 174 anh.
  - `Tao luong trinh`: 14 anh.
- RSD:
  - Sprint 13: 8 file markdown.
  - Sprint 14: 3 file markdown + 1 file docx.
  - Sprint 15: 5 file markdown + 1 file docx duplicate/bo sung.
  - Sprint 16: 5 file markdown + 3 file docx.
- Code doi chieu:
  - `main.js`
  - `tabs/thongtinkhachhang/*`
  - `tabs/captindung/*`
  - `tabs/hosokhachhang/ho-so-khach-hang.js`
  - `tabs/Pheduyettindung/phe-duyet-tin-dung.js`
  - `tabs/ThuKyHoiDong/thu-ky-hoi-dong.js`
  - `tabs/luongtrinhduyet/luong-trinh-duyet.js`

## Ket luan sau recheck

Ban `AUDIT_SQ2_RSD_FINDINGS.md` dung huong, nhung neu yeu cau la toan bo folder RSD thi can bo sung them cac mang sau vao scope bat buoc:

1. `Luồng trình TSBĐ` theo Sprint 16.
2. Admin `Quản lý số văn bản tín dụng`.
3. `Tích hợp Todolist` day du API create/update/update due date.
4. `Tích hợp ESign` voi popup, giao dich ky, polling/callback, timeout, tu choi ky, file da ky.
5. Cac rule tai lieu tin dung sau phe duyet/tu choi/huy, HSTD tham chieu, duplicate/link/remove link tai lieu da duyet.

Do do estimate cu `33-38` nhom man hinh/module chi dung khi tinh theo 3 folder anh + RSD truc tiep lien quan. Neu tinh day du toan bo RSD local, estimate hop ly hon la:

- Toi thieu: `45-52` nhom man hinh/module phai sua hoac xay them.
- Chi tiet state/modal/flow nho: `90-120+`.

## Bang doi chieu theo RSD

### Sprint 13

#### 13.1 Nguyen tac xu ly chung y kien BPTDRR

Can co:
- Phan quyen theo buoc xu ly, vai tro, nguoi xu ly, don vi.
- View/Edit theo khoi du lieu.
- Hien thi version Active latest, khong hien Inactive/Voided.
- Version Active/Inactive/Voided, khong ghi de du lieu cu.
- Xu ly tra lai/trinh lai: khoi cau truc void theo rule, khoi danh gia giu latest active, DKTD ke thua co chon loc.
- Luu: validate, luu nhap/hoan thanh, log nguoi/thoi gian/version, tick xanh, chuyen view mode.
- Chuyen tab khi chua luu, refresh browser, mat du lieu nhap chua luu.

Tinh trang code:
- Chua co state machine workflow, RBAC, version/audit, tick xanh that.
- `Luu/Trinh duyet` nhieu noi dang toast/alert/local state.

#### 13.2 Tab Thong tin khach hang

Can co:
- Danh sach subtab dung RSD: thong tin phi tai chinh, thong tin tai chinh, quan he TCTD va cac subtab lien quan.
- Quyen edit chi cho can bo dang duoc phan giao xu ly buoc hien tai.
- Nguoi dung TDRR/PDTD chi xem o cac phan khong thuoc pham vi sua.
- Thong tin/ykien la dau vao cho danh gia tong hop va quyet dinh phe duyet.

Tinh trang code:
- `SUB_TABS_TTKH` moi co 3 subtab chinh.
- Co cac file con nhu quan he BIDV/TCTD khac/KHLQ/XHTD nhung khong duoc map ro thanh flow RSD.
- Chua co quyen edit/read-only theo buoc.

#### 13.2.1 Thong tin phi tai chinh

Can co:
- 3 khoi: Thong tin phap ly, Mo hinh quan ly, Tinh hinh hoat dong SXKD.
- BPDX read-only, BPTDRR danh gia doc lap.
- Bat buoc chon `Da danh gia day du`/`Bo sung y kien` cho tat ca khoi.
- Neu `Bo sung y kien` thi bat buoc nhap CKEditor/rich text.
- Canh bao/so sanh version du lieu master KH voi y kien BPDX.
- Luu version, log, tick xanh.

Tinh trang code:
- Co UI rich text va nhieu data mau.
- Chua co master compare, validation/tick xanh/version/log.

#### 13.2.2 Thong tin tai chinh

Can co:
- Subtab Bao cao tai chinh, Chi tieu tai chinh, Danh gia tai chinh.
- Filter mau bao cao, loai bao cao, ky bao cao, don vi, nut `Lay du lieu`.
- Bang BCTC expandable, chi tieu tai chinh, xuat Excel.
- Danh gia tai chinh: chart, an/hien bieu do, xuat bieu do, lay mau, luu.
- BPDX read-only, BPTDRR danh gia doc lap, validate, version/log.

Tinh trang code:
- Co UI filters/chart/state mau.
- Chua co load du lieu that, export/save/version/log.

#### 13.3 Tab Khoan cap tin dung master

Can co:
- Tong quan khoan cap tin dung.
- Phuong an cap tin dung.
- Khoan tin dung.
- Bien phap bao dam.
- Dieu kien tin dung.
- Dap ung chinh sach/quy dinh/Danh gia chung.
- Tu dong luu nhap va kiem soat tick xanh tab.

Tinh trang code:
- Cac khoi nam trong stepper noi bo cua `TabPhuongAnCapTD`.
- Thieu tong quan cap tab va workflow completion that.

#### 13.3.1 Phuong an cap tin dung

Can co:
- PA ngan han, PA trung dai han, PA to chuc tin dung.
- Thong tin phuong an BPDX read-only.
- Ho so phuong an: popup xem tai lieu, danh sach ho so can bo sung, nhan xet bo sung.
- Danh gia phuong an: nhu cau tin dung, tinh kha thi, QLRR moi truong xa hoi, hieu qua/kha nang tra no.
- PACTD TDH co du lieu dong tien, IRR, NPV, DSCR, upload/thay the file dong tien.
- Neu du an thuoc dien QLRR moi truong thi hien tai lieu va danh gia MT-XH dung rule.
- Ket luan: dropdown/textarea, luu doc lap.
- Doi trang thai danh gia khong clear du lieu da luu truoc do.

Tinh trang code:
- Co UI PACTD va popup tai lieu/CKEditor-like.
- Chua co dong tien/chi tieu hieu qua that, version/log, validate bat buoc, upload storage.

#### 13.3.2 Khoan tin dung

Can co:
- Compare `Da duyet` vs `De xuat`.
- Trang thai row: Moi/Dieu chinh/Khong doi/Huy/Chia se.
- Detail commitment day du, tao moi 2 buoc: tim san pham va chi tiet commitment.
- Log commitment: truong, gia tri cu/moi, ngay sua, buoc xu ly, nguoi sua.
- Toggle hien thay doi so voi lan duyet gan nhat.
- He thong goi y/tinh GHTD, BPTDRR nhap gia tri/y kien doc lap neu khac.
- Luu version/log.

Tinh trang code:
- Co modal commitment mau, create/edit/delete mau, tinh GHTD random/local.
- Chua co diff/log/version/nguon du lieu/Core/API.

#### 13.3.3 Danh gia chung

Can co:
- Rui ro va bien phap kiem soat.
- Tuan thu quy dinh/chinh sach tin dung.
- Tuan thu chinh sach va gioi han QLRR.
- Y kien chung.
- Popup them/sua van ban quy dinh.
- Popup them/sua chi tieu QLRRTD voi validate theo don vi %, ty.
- Dong bo gioi han nganh, ghi chu inline, logic TSC/CN.
- Role-specific visibility, save nhap/hoan thanh, version/log.

Tinh trang code:
- Co mot phan modal va bang.
- Chua co validate day du, role-specific, dong bo Sq1/Sq7, version/log.

### Sprint 14

#### 14.1 Quan he TCTD

Can co:
- Du 5 khoi thong tin QHTD theo RSD: Quan he tai BIDV, QH tai TCTD khac/CIC, KHLQ, XHTD/du lieu lien quan, tinh hinh thuc hien dieu kien.
- Refresh XHTD, Refresh QHTD BIDV, Refresh CIC.
- Khi refresh: khoa thao tac section/subtab dang refresh, giu/invalid danh gia BPTDRR theo rule.
- CIC: quan he tin dung, lich su vay/tra no, nhom no, du no, ngay tra ket qua.
- KHLQ: them moi/cap nhat nhom KHLQ, lay tu GSTD, chon dua vao bao cao.
- Popup chi tiet TSBĐ/commitment, thong tin phi tin dung/tong hoa loi ich.
- BPTDRR khong sua truc tiep du lieu tich hop.

Tinh trang code:
- Co UI quan he TCTD/KHLQ/CIC label va modal mau.
- Chua co refresh source/API, invalidation, permission, snapshot, add-to-report persistence.

#### 14.2 BPBD/TSBD

Can co:
- Danh sach TSBĐ de xuat theo nhom, search, pham vi bao dam, trang thai, log.
- Tooltip pham vi bao dam theo commitment.
- Chinh sach TSBĐ, ty le TSBĐ theo commitment/thoi gian/so du.
- Dieu kien quan ly TSBĐ: them thu cong, tu bo khung, sao chep commitment/TSBD, upload lo.
- Dong bo dieu kien sang quan ly sau cap tin dung, sinh du lieu van ban tin dung.
- Cap nhat du lieu TSBD latest tu BCOLL.
- Canh bao khi TSBĐ dang nam trong luong CAS song song.
- Luu version/log/tick xanh.

Tinh trang code:
- Co UI TSBĐ va dieu kien kha nhieu.
- Chua co BCOLL, CAS parallel warning, sync, source/version/log/validate that.

#### 14.2 DKUN BIDV

Can co:
- Tong quan tuan thu DKTD.
- Danh gia dieu khoan dieu kien.
- Tu dong phat hien vi pham/canh bao.
- Danh gia tung DKUN/DKTD, ket qua/dien giai BPDE va BPTDRR.
- Tu dong copy ket qua BPDE sang BPTDRR khi khoi tao theo rule.
- Upload/download file danh gia, lich su/log, sort/filter/config cot.
- Dong bo/cap nhat canh bao khi trang thai DKTD thay doi.

Tinh trang code:
- Khong thay module `DKUN`/`Dieu kien uy nhiem` trong code.

#### 14.4 Tai lieu tin dung

Can co:
- Duy nhat 1 tab tai lieu dung chung BPDE/BPTDRR/BPPDTD.
- Cay folder: phap ly, tai chinh, XHTDNB, KHLQ, khoan CTD, tham dinh, phe duyet, giai ngan, tai tro thuong mai, sau giai ngan, BPBD, khac.
- Action bar: xuat danh sach, tai xuong, gui nhac, them moi, di chuyen, tim kiem nang cao, preview.
- Them moi: phan loai thu cong/upload nhieu file; chon ho so co san voi HSTD tham chieu; validate dinh dang/dung luong; sinh DocID; luu S3; gan CIF/CAS/AssetID/folder.
- Di chuyen: tai lieu da duyet thi duplicate ban ghi, sinh ID moi, xoa link cu; tai lieu chua duyet thi move truc tiep.
- Xoa: da duyet thi xoa link, khong xoa tai lieu goc; chua duyet thi xoa file theo rule.
- Chinh sua metadata: chi user/bo phan co ownership, khong sua file goc, validate so VB/co quan/ngay hieu luc.
- Preview PDF/DOC/DOCX/XLS/XLSX/JPG/PNG toi da 50MB, zoom/scroll, khong edit.
- Sau phe duyet/tu choi/huy: frozen/read-only, khong ghi de, tu dong day ve ho so khach hang/ho so tin dung/ho so TSBĐ ngoai HSTD theo rule.
- Audit log moi thao tac, sync realtime Sq4.
- Matrix quyen V/D/C/U/M/X/RO/No access.

Tinh trang code:
- Co tree/list/detail/edit/move co ban.
- Thieu add wizard, advanced search, send reminder, existing hồ sơ, DocID/S3/Sq4, preview engine, export, delete/link rule, ownership matrix, freeze.

### Sprint 15

#### 15.1 Todolist

Can co:
- Goi Todo Service khi co thay doi trang thai ho so/nguoi xu ly: Trinh duyet, Huy, Tra lai, Phe duyet, Tu choi, Phan bo tu dong, Phan bo lai, tick xanh luong trinh.
- TODO_002 create, TODO_003 update, TODO_005 update SLA/due date.
- Luu taskId Todo de update tiep.
- Gui currentStep/nextStep/currentAssignee/dueDate/warningDate/status.
- Todo hien thi dung Cong viec ca nhan/Cong viec don vi theo quyen.

Tinh trang code:
- Khong co Todo/Todolist/todo-service.

#### 15.2 Tab Phe duyet cap tin dung

Can co:
- Nhom luong phe duyet ca nhan.
- Nhom luong hoi dong thong thuong.
- Nhom HĐTDTW/HĐQT/TVHD/TKHD/Chu tich/pho chu tich.
- Load tong hop du lieu ho so tu cac nguon nghiep vu.
- Approval Dataset va Approval Snapshot khi phe duyet.
- Luu vet lich su thao tac/quyet dinh.

Tinh trang code:
- Co man phe duyet va TKHD prototype.
- Chua co role/flow engine, dataset, snapshot, approval legal state.

#### 15.2.1 Thong tin De xuat va Tham dinh

Can co:
- Auto compare BPDE vs BPTDRR theo latest version.
- Danh dau khac biet Khoan CTD, BPBD, DKTD.
- BPPD nhap quyet dinh xu ly tung noi dung khac biet.
- Neu chon phuong an khac/khong chap thuan phai nhap y kien/dieu kien phe duyet.
- Tu dong cap nhat sang `Quyet dinh phe duyet`.

Tinh trang code:
- Co bang khac biet va input quyet dinh trong `phe-duyet-tin-dung.js`.
- Chua co auto compare/version/latest/update sang subtab QD.

#### 15.2.2 Quyet dinh phe duyet

Can co:
- Read-only.
- Tu dong tong hop latest BPPD tu subtab Thong tin De xuat va Tham dinh.
- Sau phe duyet cho BPDE/nguoi co quyen xem tra cuu.
- Khong popup nhap/sua tai subtab nay.

Tinh trang code:
- Chua co subtab readonly dung RSD; current approval screen van cho nhap y kien chung.

#### 15.2.3 / 15.2.3.1 Hoi dong

Can co:
- PYK la nguon du lieu chinh thuc, dong thoi la thong bao hop.
- Phuong thuc: van ban, hop, ket hop.
- Tao phien XYK: sinh so phien, chon loai y kien, thoi han, cau hoi, hinh thuc tra loi, thanh vien, tai lieu.
- Xoa tai lieu khoi phien truoc khi gui.
- Gui PYK, nhac phan hoi, lich su lay y kien.
- TVHD tra loi phieu: xem/download tai lieu, dong y/khong dong y theo nhom, nhap y kien bo sung, luu, gui, gui lai nhieu lan truoc tong hop.
- TKHD tong hop: dieu kien du/khong du tong hop, chot ket qua, snapshot phan hoi latest, khoa phan hoi, khoa danh sach TVHD.
- Huy phien: popup xac nhan, bat buoc ly do, dong popup/reload/log.
- Sinh bien ban, nghi quyet, quyet dinh cap tin dung.
- Hop hoi dong: attendance, thong bao hop, y kien tai cuoc hop, quorum, ket luan thao luan.

Tinh trang code:
- `thu-ky-hoi-dong.js` co UI kha rong va nhieu state mau.
- Chua co persistence/session/snapshot/lock/version/signing/Todo/doc numbering.

### Sprint 16

#### 16.0 Luong trinh TSBD

Can co:
- Luong nghiep vu TSBĐ: them moi, thay doi, giai chap, thay the, rut bot, muon ho so TSBĐ.
- Flow theo thẩm quyền CN/TSC/HĐTD/HĐQT.
- Role/buoc/trang thai ho so/ma tran tac vu theo tung buoc.
- Phan bo ho so: thu cong/tu dong.
- Lich su xu ly/phe duyet: buoc, nguoi xu ly, hanh dong, thoi gian, y kien.
- Ma tran tra lai.
- Tab luong trinh TSBĐ cho phep them/bot buoc theo cau hinh.

Tinh trang code:
- `TabLuongTrinhDuyet` chi la luong trinh cap tin dung chung theo tham quyen.
- Khong co module/flow TSBĐ rieng, khong co ma tran trang thai/tac vu/tra lai.

#### 16.1 Tong quan luong trinh TSBD - BPTDRR

Can co:
- TDRR tiep nhan ho so TSBĐ, xem thong tin TSBĐ, nhap y kien tham dinh.
- Khoi Y kien bo phan tham dinh + Y kien BPDE.
- Ket luan/khuyen nghi rich text theo format guideline.
- Chinh sua du lieu TDRR theo rule chung Sprint 13.

Tinh trang code:
- Chua co man TSBĐ flow BPTDRR rieng.

#### 16.2 Tong quan luong trinh TSBD - BPPDTD

Can co:
- PDTD xem thong tin TSBĐ, tai lieu lien quan, dieu kien tin dung co trang thai Moi/Chinh sua/Khong ap dung/Ket thuc theo doi.
- Phe duyet/hoi dong/TVHD/TKHD cho luong TSBĐ ke thua luong cap tin dung nhung noi dung PYK la thong tin TSBĐ.
- BPPDTD phan lon read-only voi du lieu BPTDRR.

Tinh trang code:
- Chua co flow phe duyet TSBĐ rieng.

#### 16.3 Quan ly so van ban tin dung

Can co:
- Admin `Quan ly so van ban tin dung`.
- Danh sach cau hinh/rule sinh so: filter loai van ban, don vi/cap quan ly, trang thai; card tong so/hieu luc/het hieu luc.
- Them moi cau hinh: loai van ban, cap quan ly, mau so, chu ky, preview, validate.
- Chinh sua cau hinh: khong sua ma quy tac/loai van ban, sinh version moi neu dang hoat dong.
- Xem cau hinh read-only.
- Thay the cau hinh: khong xoa cau hinh, copy du lieu, tang version, ly do bat buoc, chi 1 cau hinh hieu luc.
- So van ban: cap theo BCDX, BCTDRR, QD, PYK, Bien ban, Nghi quyet; unique, khong tai su dung, concurrent-safe.
- So van ban gan voi chu ky so va audit trail.

Tinh trang code:
- Khong co `Quan ly so van ban`, `sinh so`, admin rule.

#### Tich hop ESign

Can co:
- Popup xac nhan Phe duyet/Tu choi kem file mau bieu da sinh.
- Chon Ky so.
- Goi ESign tao giao dich, check chung thu so.
- Neu chua co chung thu: hien loi dung text RSD.
- Chuan bi hash/vung ky/anh/text hien thi vung ky.
- Xu ly TIMEOUT/EXPIRED, tu choi ky, retry/thoat.
- Polling/callback nhan ket qua.
- Nhung chu ky vao file goc, cap nhat trang thai ho so va trang thai ky.

Tinh trang code:
- Khong co ESign/Ky so.

### Sq2/Tao luong trinh - Quy tac phan bo tham dinh rui ro

Can co theo anh:
- Danh sach phan bo tu dong: search ma/ten, filter loai quy tac, don vi, buoc ap dung, trang thai, pagination, empty/search empty.
- Row action: xem/sua/xoa, hover tooltip.
- Chi tiet quy tac: thong tin chung, ma quy tac, nguoi tao, ngay tao, trang thai.
- Quy tac xac dinh nguoi xu ly: lich su xu ly ho so, workload/so luong ho so dang xu ly, chuc vu, ngau nhien, toggle hoat dong.
- Quy tac xac dinh nhom: ho so dac biet, ho so du an, ho so con lai; thu tu uu tien, tieu chi, gia tri tieu chi, nhom xu ly.
- Create/edit/delete/activate/deactivate, validate trung/hieu luc, audit.

Tinh trang code:
- Khong co keyword/module `Phan bo tu dong`, `Quy tac phan bo`, `workload`, `nhom xu ly`.

## Danh sach thieu cot loi theo muc do nghiem trong

1. Workflow engine va trang thai ho so that.
2. RBAC/ownership/read-only/frozen theo buoc.
3. Version Active/Inactive/Voided va audit log.
4. Snapshot/freeze approval va snapshot phien Hoi dong.
5. Todo Service integration.
6. ESign integration.
7. Quan ly/sinh so van ban.
8. Document service/Sq4/DocID/S3/preview/permission matrix.
9. CIC/BCOLL/XHTD/source refresh va invalidation.
10. Auto compare BPDE/BPTDRR/BPPD.
11. Luong trinh TSBĐ.
12. Quy tac phan bo tu dong TDRR.
13. Validate/tick xanh/save nhap/hoan thanh tren tung tab.
14. Popup/confirm nho: xoa, huy phien, upload, di chuyen, chon ho so co san, gui nhac, ky so, timeout, tu choi ky.

## Uoc tinh cap nhat

| Nhom | Uoc tinh module/man hinh |
| --- | ---: |
| Nen workflow/RBAC/version/audit/snapshot | 7-9 |
| Thong tin khach hang/TDRR | 5-7 |
| Khoan cap tin dung/TDRR | 8-10 |
| Tai lieu tin dung | 6-8 |
| Phe duyet/Hoi dong | 9-11 |
| Luong trinh + phan bo tu dong | 5-7 |
| Luong trinh TSBĐ | 4-6 |
| Quan ly so van ban | 4-5 |
| Todo + ESign | 2-3 |
| Tong | 45-52 |

## Ghi chu chac chan

- Code hien tai co kha nhieu UI prototype, nen khong phai "trang nao cung trang trang".
- Nhung cac yeu cau co tinh "he thong chay that" trong RSD hau nhu chua co: API, DB, luu version, log, ownership, snapshot, dong bo, ky so, cap so, Todo.
- Neu dua len sếp, nen noi theo hướng: "UI dang co mot phan, nhung nghiep vu run-time con thieu nhieu; can phase implementation theo nen workflow truoc, sau do moi hoan thien tung tab."
