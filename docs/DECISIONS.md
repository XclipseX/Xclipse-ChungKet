# Các quyết định đã chốt

Mỗi quyết định một mục, đánh số tăng dần, không sửa số cũ. Đổi quyết định cũ thì thêm mục mới ghi "thay một phần Dxx".
Ghi ngay khi quyết định, không đợi cuối sprint. Viết ngắn, tối đa 4 dòng mỗi mục.

---

## D01: App mở ở trạng thái rỗng, có nút "Nạp dữ liệu mẫu" (đề BTC yêu cầu)

- Bối cảnh: đề yêu cầu có nút nạp dữ liệu mẫu BTC (8 thành viên, 12 lượt, đủ các trạng thái) để giám khảo demo lặp lại được.
- Cách làm: app mở ra không có dữ liệu. Nút "Nạp dữ liệu mẫu" ở Tổng quan và Cài đặt nạp file BTC, gắn nhãn "Dữ liệu mẫu BTC".
- Ảnh hưởng / chưa làm: không có tài khoản demo, không tự nạp khi mở app. Dữ liệu nằm trong trình duyệt.

---

## D02: Ưu đãi tầng 2 là 10.000đ (đội đặt)

- Bối cảnh: cần thêm lớp giới thiệu gián tiếp (mở rộng). Tổng ưu đãi phải nhỏ hơn 90.000đ chi phí quảng cáo mỗi khách.
- Cách làm: người giới thiệu của người giới thiệu nhận 10.000đ khi lượt của khách cấp dưới chuyển đổi. Tổng ưu đãi tối đa 70.000đ.
- Ảnh hưởng / chưa làm: chỉ một tầng gián tiếp. Chưa kiểm chứng trong app; xem `docs/assumptions.md` mục 1.

---

## D03: Ánh xạ trạng thái tiếng Việt trong file BTC sang mã trạng thái

- Bối cảnh: file BTC ghi trạng thái bằng tiếng Việt; app dùng mã trạng thái ngắn.
- Cách làm: `statusFromVN(text)` đổi trạng thái tiếng Việt sang mã: Đã chuyển đổi → `converted`, Đang chờ thanh toán → `pending`, Đang xử lý → `processing`, Đã hủy → `cancelled`, Không hợp lệ – tự giới thiệu → `invalid_self`, Từ chối – trùng → `rejected_dup`, Đang rà soát → `reviewing`.
- Ảnh hưởng / chưa làm: trạng thái lạ trong file sẽ không khớp mã nào; cần kiểm lại khi nạp file mới.

---

## D04: Bỏ tính năng ví dụ (`features/_example`) khỏi bài nộp

- Bối cảnh: thư mục mẫu của khung kỹ thuật chung không phải tính năng của đề.
- Cách làm: `features/_example` và `features/_playground` là khung chung. Chế độ `showPlayground` đặt `false` trước khi nộp, nên hai view thử nghiệm không hiện trên app.
- Ảnh hưởng / chưa làm: mã khung vẫn có trong repo, không có nội dung riêng của đề.
