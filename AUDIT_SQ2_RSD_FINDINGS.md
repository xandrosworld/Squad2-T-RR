# Audit Sq2/RSD - Noi dung va chuc nang con thieu

Ngay audit: 2026-06-04

## Pham vi da doi chieu

- `Sq2/Luong phe duyet`: 36 anh.
- `Sq2/Luong tham dinh`: 174 anh.
- `Sq2/Tao luong trinh`: 14 anh.
- `RSD`: Sprint 13, 14, 15, 16, gom ca file `14.4 Tab "Tai lieu tin dung" trong HSTD - TDRR & PDTD.docx`.
- Code hien tai: `main.js`, cac module trong `tabs/*`.

## Ket luan ngan

Du an hien tai da co kha nhieu man hinh va modal dang prototype, nhung chua du de goi la "chay that" theo Sq2/RSD. Phan thieu lon nhat khong nam o template giao dien ma nam o nen nghiep vu: workflow state, phan quyen/ownership, version, audit log, snapshot/freeze, validate bat buoc, dong bo he thong ngoai, Todo, ESign, sinh so van ban, va luu tru tai lieu.

Uoc tinh can sua/to chuc lai it nhat 33-38 nhom man hinh/module, tuong duong khoang 70+ state/modal/flow nho neu lam day du theo anh va RSD.

## Thieu nen chay that toan he thong

1. Workflow that:
   - Nut `Luu`, `Trinh duyet`, `Tra lai`, `Phe duyet`, `Tu choi`, `Phan bo lai` hien phan lon moi la alert/toast/local state.
   - Chua co trang thai ho so/buoc xu ly that, chua khoa/mo man theo buoc.
   - Chua co dieu kien "tat ca tab tick xanh moi duoc trinh duyet".

2. Phan quyen va ownership:
   - RSD yeu cau view/edit theo vai tro, don vi, buoc xu ly, nguoi upload, ownership ho so/tai lieu.
   - Code hien tai chua co ma tran quyen, chua co read-only/frozen package theo tung vai.

3. Version/audit/snapshot:
   - RSD Sprint 13 yeu cau version Active/Inactive/Voided, khong ghi de du lieu BPDE/BPTDRR/BPPD.
   - Khi tra lai/trinh lai ho so, moi khoi co cach ke thua/void rieng; hien code chua co.
   - Approval snapshot/freeze va session snapshot Hoi dong chua co nen du lieu cuoi khong co tinh phap ly.

4. Tich hop ngoai:
   - Chua thay API/fetch cho CIC, Sq4 Document, BCOLL/TSBD, financial source, Todo Service, ESign.
   - Chua co xu ly loi API, timeout, retry, dong bo latest, log request/response.

5. So van ban va chu ky ky:
   - RSD Sprint 16 yeu cau sinh so van ban cho BCDX, BCTDRR, QD, PYK, bien ban, nghi quyet; so la duy nhat, khong tai su dung, co version cau hinh.
   - Code hien tai moi hien so mau, chua co service cap so/giu so/huy so/doi so.

## Luong tham dinh - con thieu

1. Thong tin phi tai chinh:
   - Can du 3 khoi: Thong tin phap ly, Mo hinh quan ly, Tinh hinh SXKD.
   - Moi khoi phai co y kien BPDE read-only va danh gia BPTDRR doc lap.
   - Bat buoc chon `Da danh gia day du`/`Bo sung y kien`; neu bo sung thi bat buoc nhap noi dung.
   - Chua co so sanh version master KH, canh bao du lieu thay doi, luu version/log/tick xanh.

2. Thong tin tai chinh:
   - Can lay du lieu theo mau bao cao, loai bao cao, ky bao cao, don vi tinh; co nut `Lay du lieu`.
   - Can 3 subtab dung nghiep vu: Bao cao tai chinh, Chi tieu tai chinh, Danh gia tai chinh.
   - Can xuat Excel/bieu do, an/hien bieu do, xuat bieu do, luu danh gia BPTDRR.
   - Hien co UI va state mau, chua co nguon du lieu, validate, version/log.

3. Quan he TCTD/CIC/KHLQ:
   - Can day du Quan he tai BIDV, Quan he tai TCTD khac, KH lien quan, Thong tin CIC.
   - `Tra cuu CIC` phai goi du lieu/snapshot, hien ngay tra ket qua, lich su, chi tiet.
   - KH lien quan can checkbox `Them vao bao cao`, xoa co popup xac nhan, PDF viewer tai lieu lien quan.
   - Quan he BIDV can popup chi tiet tai san/commitment va du lieu phan bo TSBD.
   - Khoi `Tinh hinh thuc hien DKUN cua BIDV` chua du theo RSD 14.2.

4. Tinh hinh thuc hien DKUN:
   - Can hien toan bo dieu kien dang active gan voi commitment/TSBD.
   - BPTDRR phai danh gia tung dieu kien, upload/download file danh gia, xem log/lich su.
   - Can dong bo latest, canh bao vi pham, filter/sort/config cot, khoa du lieu khi frozen.

5. Phuong an cap tin dung:
   - Can du PA ngan han, PA trung dai han, PA to chuc tin dung.
   - Can cac khoi Thong tin phuong an, Ho so phuong an, Danh gia phuong an, Ket luan.
   - Can popup tai lieu dinh kem/upload progress/xoa file, `Xem tai lieu`, dinh kem BPTDRR.
   - Ket luan can dropdown dung RSD: Nhu cau tin dung, tinh kha thi, kha nang thuc hien nghia vu.
   - Hien co UI kha nhieu nhung chua co save/version/validate/dong bo tai lieu that.

6. Khoan tin dung:
   - Can bang so sanh `Da duyet` vs `De xuat`, trang thai Moi/Dieu chinh/Khong doi/Huy/Chia se.
   - Can toggle hien thi thay doi so voi lan duyet gan nhat.
   - Can `Chi tiet log commitment`: truong, gia tri cu/moi, ngay sua, buoc xu ly, nguoi sua.
   - Can wizard tao moi commitment 2 buoc: tim san pham, chi tiet commitment.
   - Can tinh GHTD theo he thong, cho phep BPTDRR nhap y kien khac/gia tri doc lap.
   - Code hien co modal tao/sua/xoa mau, nhung chua co diff/version/log/tinh toan that.

7. Bien phap bao dam/TSBD:
   - Can danh sach TSBD de xuat theo nhom, search ID/ten, pham vi bao dam, log, trang thai.
   - Can TSBD du kien, chinh sach TSBD, ty le TSBD theo commitment/thoi gian, dieu kien quan ly TSBD.
   - Can dong bo BCOLL, canh bao khi co workflow TSBD song song, cap nhat latest.
   - Can danh gia BPTDRR theo 3 lua chon: khong can bo sung, can bo sung/thay the, y kien khac.

8. Dieu kien tin dung/dieu kien quan ly TSBD:
   - UI co menu them tu bo khung/sao chep/them thu cong/upload lo, nhung can validate va luu that.
   - Can gan nguon dieu kien, commitment/TSBD ap dung, tan suat bao cao, dieu kien tien quyet.
   - Can add/edit/delete co log, dong bo sang quan ly sau cap tin dung va tinh hinh thuc hien DKTD.
   - Can ke thua co chon loc khi ho so bi tra lai/trinh lai.

9. Danh gia chung:
   - Can du 4 nhom: rui ro & bien phap kiem soat, tuan thu quy dinh/chinh sach TD, tuan thu chinh sach & gioi han QLRR, y kien chung.
   - Can popup them moi chi tieu QLRRTD voi day du truong bat buoc.
   - Can popup them moi danh gia van ban/quy dinh, validate dap ung/khong dap ung.
   - Can bang gioi han nganh, dong bo gioi han nganh, ghi chu inline, logic hien thi theo TSC/CN.
   - Hien code co mot phan modal, nhung chua co role-specific, validate day du, save version/log.

10. Tai lieu tin dung:
    - Can dung 1 tab tai lieu dung chung BPDE/BPTDRR/BPPDTD theo ownership.
    - Can day du cay thu muc: phap ly, tai chinh, XHTDNB, KHLQ, khoan CTD, tham dinh rui ro, phe duyet, giai ngan, tai tro thuong mai, sau giai ngan, BPBD, khac.
    - Can action bar: luu, xuat danh sach, tai xuong, gui nhac tai lieu, them moi, di chuyen, preview, tim kiem nang cao.
    - Can tim kiem nang cao theo trang thai tai lieu, tinh chat, QTTD, nguoi cap nhat, ngay het hieu luc, ngay tai.
    - Can wizard them moi: upload nhieu file, phan loai thu cong, chon ho so co san, nhap metadata, luu/day duyet/thoat/xoa co confirm.
    - Can di chuyen tai lieu theo rule duplicate/link/remove link voi tai lieu da duyet.
    - Can DocID, metadata, version tai lieu, S3/Sq4, audit log, realtime sync, matrix quyen.
    - Code hien moi co tree/list/detail/edit/move co ban va upload button, thieu phan lon flow.

## Luong phe duyet - con thieu

1. Chon role/entry:
   - Flow hien tai moi thay RM/TKHD ro; TVHD va cac vai phe duyet chua la duong chay ro rang.

2. Subtab `Thong tin De xuat va Tham dinh`:
   - Can compare BPDE/BPTDRR/BPPD theo tung nhom: Khoan CTD, BPBD, DKTD.
   - Can quyet dinh xu ly tung khac biet, y kien/condition phe duyet, validate bat buoc.
   - Can tu dong cap nhat sang `Quyet dinh phe duyet`.

3. `Quyet dinh phe duyet`:
   - Can la du lieu quyet dinh cuoi cung sinh tu latest BPPD, read-only, dung de tao QD/snapshot.

4. Phe duyet cuoi:
   - Can approval dataset, approval snapshot/freeze, cap so van ban, sinh/quy trinh ky.
   - Nut phe duyet/tra lai hien moi toast, chua chay workflow that.

5. TKHD/TVHD:
   - Can tao phien XYK, sinh so phien, chon hoi dong/thanh vien, gui PYK, nhac phan hoi.
   - Can phien van ban/hop/tron, trang thai du thao/dang xu ly/hoan tat/huy, ly do huy.
   - Can TVHD tra loi phieu, luu/gui lai nhieu lan truoc khi tong hop, version latest.
   - TKHD tong hop phai snapshot, khoa phan hoi, sinh bien ban/nghi quyet, lich su/log.
   - Code co UI TKHD kha nhieu nhung van static/local, chua co snapshot/khoa/esign/todo/service.

## Tao luong trinh - con thieu

1. Module `Phan bo tu dong`/`Quy tac phan bo tham dinh rui ro` chua co trong code:
   - Code khong co keyword `Phan bo tu dong`, `Quy tac phan bo`, `Tieu chi ho so`, `Nhom cong viec`, `workload`.
   - Man `TabLuongTrinhDuyet` hien tai la cau hinh buoc phe duyet theo tham quyen, khac voi module quy tac phan bo.

2. Can danh sach quy tac phan bo:
   - Search theo ma/ten quy tac.
   - Filter loai quy tac, don vi, buoc ap dung, trang thai.
   - Bang: STT, ten quy tac, loai quy tac, don vi, trang thai, buoc ap dung, ngay cap nhat, nguoi cap nhat.
   - Co empty/search empty state, pagination, sua/xoa, tooltip/hover.

3. Can chi tiet quy tac:
   - Header trang thai, ma quy tac, nguoi tao, ngay khoi tao.
   - Thong tin chung: loai quy tac, don vi, buoc ap dung, vai tro ap dung, so quyet dinh, ngay hieu luc, dien giai.
   - Quy tac xac dinh nguoi xu ly: lich su xu ly ho so, so luong dang xu ly/workload, chuc vu, ngau nhien, toggle hoat dong.
   - Quy tac xac dinh nhom: ho so dac biet, ho so du an, ho so con lai; tieu chi/danh sach gia tri/nhom xu ly ho so.
   - Can create/edit/delete/activate/deactivate, validate trung ma/thoi gian hieu luc, audit log.

## Uoc tinh so man hinh/module can sua

| Nhom | Uoc tinh nhom man hinh/module |
| --- | ---: |
| Nen workflow/role/version/audit/Todo/ESign/so van ban | 7-9 |
| Luong tham dinh | 15-18 |
| Tai lieu tin dung | 4-5 |
| Luong phe duyet/Hoi dong | 8-10 |
| Tao luong trinh/phan bo tu dong | 3-4 |
| Tong | 33-38 |

Neu tinh chi tiet theo state/modal nho, toi thieu khoang 70+ hang muc: popup upload tai lieu, search nang cao, move, chon ho so co san, confirmation, log commitment, QLRRTD, gioi han nganh, dieu kien thu cong, bo khung/sao chep/upload lo, TVHD tra loi phieu, TKHD tong hop/huy/nhac, ESign, cap so van ban, Todo update, snapshot/freeze.

## Muc uu tien de lam cho "chay that"

1. Nen workflow + RBAC + version/audit/snapshot.
2. Tai lieu tin dung vi anh/RSD yeu cau nhieu flow that va lien quan Sq4.
3. Khoan tin dung/TSBD/DKTD vi day la du lieu dau vao cho tham dinh va phe duyet.
4. Phe duyet/Hoi dong + ESign + so van ban + Todo.
5. Module Phan bo tu dong trong `Tao luong trinh`.
