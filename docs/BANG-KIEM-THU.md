# Bảng kiểm thử: Xclipse

**Đội:** Xclipse (Diệu Anh, Vũ Trí Dũng, Nguyên – nhóm trưởng) · **Bảng:** B – Kinh tế · **Thử ngày:** <dd/mm/yyyy>, <giờ> · **Môi trường:** <bản online GitHub Pages / local>, <trình duyệt, cỡ màn hình>

Chỉ ghi kết quả đã chạy thật. Cột "Kết quả" để "Chưa chạy" cho đến khi người phụ trách kiểm thử chạy ca đó. Ca nào là test tự động, ca nào thử tay, ca nào dùng dữ liệu mô phỏng: ghi rõ ở cột "Dữ liệu và bước thử".

## Yêu cầu tối thiểu

| Bảng | Tổng | Bắt buộc |
|---|---|---|
| **B** (Kinh tế) | ≥ 3 ca | 1 ca bình thường · 1 ca thiếu hoặc sai · 1 ca biên |

Các ca dưới đây đáp ứng Bảng B. Ca có "(A, B)" cũng đáp ứng Bảng A nếu đội nộp bảng A.

## Bảng ca kiểm thử

| Mã ca | Loại ca | Dữ liệu và bước thử | Kỳ vọng | Kết quả thực tế | Đạt/Chưa đạt |
|---|---|---|---|---|---|
| TC01 | Bình thường (B) | Mở app rỗng, bấm "Nạp dữ liệu mẫu" ở Tổng quan. Dữ liệu BTC: 8 thành viên, 12 lượt. | Hiện đủ 8 thành viên, 12 lượt, đủ 7 trạng thái; nhãn "Dữ liệu mẫu BTC" | Chưa chạy | Chưa chạy |
| TC02 | Bình thường (B) | Khách nhập mã `REF-…` hợp lệ của một thành viên, tên và SĐT mới, chọn gói Hosting Cơ bản, bấm "Đăng ký". Bấm "Mô phỏng thanh toán thành công". | Trạng thái chuyển "Đang chờ thanh toán" → "Đã chuyển đổi". Người giới thiệu và khách mới đều được cộng 30.000đ | Chưa chạy | Chưa chạy |
| TC03 | Đầu vào sai (B) | Đăng ký với SĐT của chính người giới thiệu. | Báo "Không hợp lệ – tự giới thiệu". Không tạo lượt chuyển đổi, không cộng ưu đãi | Chưa chạy | Chưa chạy |
| TC04 | Đầu vào sai (B) | Đăng ký lại cùng SĐT khách đã có. | Báo "Từ chối – trùng". Không ghi thêm lượt | Chưa chạy | Chưa chạy |
| TC05 | Đầu vào sai (B) | Nhập mã không tồn tại, ví dụ `REF-XX00`. | Báo lỗi "Mã giới thiệu không tồn tại" ngay dưới ô mã. Không tạo lượt | Chưa chạy | Chưa chạy |
| TC06 | Đầu vào sai (B) | Bỏ trống tên hoặc SĐT, hoặc nhập SĐT "12345". | Báo lỗi từng ô. Không tạo thành viên hay lượt | Chưa chạy | Chưa chạy |
| TC07 | Biên (B) | Thành viên đã bị trùng SĐT với thành viên khác khi đăng ký. Hoặc mẫu số dự phóng bằng 0 (thành viên = 0). | SĐT trùng báo lỗi. Dự phóng hiện "Không đủ dữ liệu", không hiện số lạ | Chưa chạy | Chưa chạy |
| TC08 | Bình thường (B) | Tab Dự phóng sau khi nạp dữ liệu mẫu, giữ giả định mặc định (= KD_GiaDinh). | Khách mới = 90; doanh thu = 16,2 triệu; chi phí ưu đãi = 5,4 triệu; tỉ lệ = 3,0. Khớp KD_DuPhong | Chưa chạy | Chưa chạy |
| TC09 | Bình thường (B) | Thành viên có lượt chuyển đổi ở tầng 2 (người giới thiệu của người giới thiệu). Chọn thành viên ở tab Theo dõi. | Tổng ưu đãi gồm tầng 1 và tầng 2 (10.000đ). Số khách và danh sách khớp | Chưa chạy | Chưa chạy |
| TC10 | Bình thường (B) | Bấm nút copy tóm tắt ở tab Thể lệ. Dán vào ô văn bản. | Nội dung có ưu đãi hai phía, điều kiện, giá gói; không có số liệu lạ | Chưa chạy | Chưa chạy |

Ca kiểm thử giao diện điện thoại (360px và 390px, không tràn ngang) chạy bằng `tests/mobile-suite.cjs` qua `tests/smoke.cjs`. Ghi kết quả khi chạy.

## Kiểm thử tự động (nếu có)

- Lệnh: `node tests/smoke.cjs http://localhost:8211/`: <số ca đạt>/<tổng số ca>, không lỗi console. Chưa chạy.
- File test: `tests/smoke.cjs`, `tests/mobile-suite.cjs`.

## Chưa kiểm chứng

- Thanh toán thật, đăng ký thật, gửi tin nhắn: không có, mọi thanh toán là mô phỏng.
- Điện thoại thật chưa thử, mới thử bằng giả lập 360px và 390px.
- Quy tắc trần 50% cho domain .vn (xem `docs/assumptions.md`): chưa kiểm chứng trong app.

## Kết quả test tự động đã chạy (17/11/2026, local 8211, Chromium, 360×780 và 390×844)

- `node tests/smoke.cjs http://localhost:8211/`: **330 kiểm tra đạt, 0 lỗi** ("TẤT CẢ ĐẠT"), gồm bộ điện thoại 360/390: không tràn ngang, nút ≥ 48px.
- `node tests/referral.cjs`: **OK** (nạp dữ liệu mẫu, đăng ký, thanh toán, tự giới thiệu, khách trùng, dự phóng khớp KD_DuPhong).
- `node scripts/scan-secrets.mjs .`: 108 tệp, **0 lộ khóa**.
- Các ca TC01–TC10 thử tay: điền cột kết quả khi người phụ trách chạy xong.
