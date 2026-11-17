# Xclipse Referral: chương trình thành viên giới thiệu khách

> Đề chính thức Bảng B – Kinh tế · VIBE-CODING 2026 Chung kết · Đội **Xclipse**

> **Nhãn dữ liệu:** toàn bộ số liệu trong app là **Dữ liệu mẫu BTC**, **Giả định** của đội hoặc **Mô phỏng** (thanh toán, đăng ký giả lập). Không có dữ liệu khách hàng thật, không có giao dịch thật.

## 1. Thông tin bài nộp

| Hạng mục | Nội dung |
|---|---|
| Tên đội thi | Xclipse |
| Thành viên | Diệu Anh · Vũ Trí Dũng · Nguyên (nhóm trưởng) |
| Trường | {{TRUONG}} |
| Đề bài | Chương trình thành viên giới thiệu khách (Referral) cho doanh nghiệp hosting/domain |
| Demo trực tuyến | https://xclipsex.github.io/Xclipse-ChungKet/ |
| Mã nguồn (GitHub) | https://github.com/XclipseX/Xclipse-ChungKet |
| Minh chứng dùng AI | `docs/MINH-CHUNG-AI.md` |
| Bảng kiểm thử | `docs/BANG-KIEM-THU.md` |
| Giả định và cách tính | `docs/assumptions.md` |
| Quyết định đã chốt | `docs/DECISIONS.md` |

## 2. Cách dùng ngay (không cần đăng nhập, không cần API key)

Giám khảo mở link demo là dùng được. App mở ở trạng thái rỗng; bấm **"Nạp dữ liệu mẫu"** ở Tổng quan hoặc Cài đặt để nạp file BTC (8 thành viên, 12 lượt giới thiệu đủ các trạng thái).

Chạy local:

```bash
# 1. Lấy mã nguồn
git clone https://github.com/XclipseX/Xclipse-ChungKet.git && cd Xclipse-ChungKet

# 2. Không cần cài thư viện, không cần file cấu hình, không cần key

# 3. Chạy
python3 -m http.server 8211   # rồi mở http://localhost:8211/
```

Hoặc mở trực tiếp link demo ở trên.

Kiểm thử tự động (cần Playwright):

```bash
node tests/smoke.cjs http://localhost:8211/
```

## 3. Công nghệ

| Lớp | Công nghệ |
|---|---|
| Giao diện | HTML, CSS, JavaScript thuần (không framework) |
| Thư viện | Vi tương tác chuyển thể từ Lucian Lab UI (MIT, (c) 2026 Seokwoooo; giấy phép ở `vendor/lucian/LICENSE`), tự viết trong `css/lucian.css` + `js/lucian.js`; không CDN |
| Lưu trữ | localStorage của trình duyệt. Không có backend, không có cơ sở dữ liệu từ xa |
| Đăng nhập | Không |
| Triển khai | GitHub Pages |
| Kiểm thử | Playwright (Chromium) qua `tests/smoke.cjs` |

## 4. Tính năng

Đúng 5 tính năng theo đề, theo thứ tự đề bài:

1. **Thành viên**: đăng ký (tên, SĐT), sinh mã REF duy nhất và link `?ref=CODE`, sao chép link. Kiểm: SĐT hợp lệ, không trùng SĐT.
2. **Đăng ký qua mã (mô phỏng)**: khách nhập mã (tự điền từ `?ref=`), chọn gói, ghi nhận "Đang chờ thanh toán". Nút "Mô phỏng thanh toán thành công" chuyển sang "Đã chuyển đổi" và cộng ưu đãi hai phía. Tự giới thiệu, khách trùng và mã sai đều bị báo lỗi.
3. **Theo dõi thành viên**: chọn thành viên để xem số khách đã giới thiệu, danh sách kèm trạng thái (chip màu), tổng ưu đãi đã nhận (tầng 1 + tầng 2).
4. **Thể lệ**: ưu đãi hai phía, điều kiện (thanh toán thành công), chống gian lận (tự giới thiệu, trùng), bảng giá gói giả định, ưu đãi tầng 2.
5. **Dự phóng**: bảng giả định nhập được (mặc định lấy từ KD_GiaDinh) cho ra khách mới, doanh thu, chi phí ưu đãi và tỉ lệ doanh thu/chi phí. Công thức và giả định hiển thị ngay cạnh bảng. Có 3 kịch bản, bảng độ nhạy và biểu đồ theo tháng.

**Mở rộng** (ngoài 5 tính năng gốc): ưu đãi tầng 2 (gián tiếp 10.000đ), biểu đồ theo tháng, nút copy tóm tắt chương trình.

## 5. Dữ liệu mẫu

- **Nguồn:** file BTC `docs/du-lieu-mau-btc.xlsx`, các sheet KD_ThanhVien, KD_GioiThieu, KD_QuyDinh, KD_GiaDinh, KD_DuPhong.
- **Nạp:** nút "Nạp dữ liệu mẫu" ở Tổng quan và Cài đặt. Nạp 8 thành viên và 12 lượt giới thiệu, đủ các trạng thái: Đã chuyển đổi, Đang chờ thanh toán, Đang xử lý, Đã hủy, Không hợp lệ (tự giới thiệu), Từ chối (trùng), Đang rà soát.
- **Nhãn:** dữ liệu nạp từ file BTC được gắn nhãn "Dữ liệu mẫu BTC".

## 6. Giả định và cách tính

Chi tiết và nguồn từng giả định ở `docs/assumptions.md`. Tóm tắt:

| Đại lượng | Công thức | Giá trị BTC (KD_DuPhong) |
|---|---|---|
| Người tham gia | thành viên × tỉ lệ tham gia | 1.200 × 15% = 180 |
| Lượt tiếp cận | người tham gia × lượt giới thiệu/người | 180 × 2 = 360 |
| Khách mới | lượt tiếp cận × tỉ lệ chuyển đổi | 360 × 25% = **90 khách** |
| Doanh thu | khách mới × doanh thu TB/khách | 90 × 180.000đ = **16,2 triệu** |
| Chi phí ưu đãi | khách mới × (30.000 + 30.000) | 90 × 60.000đ = **5,4 triệu** |
| Tỉ lệ doanh thu/chi phí | doanh thu ÷ chi phí ưu đãi | 16,2 ÷ 5,4 = **3,0 lần** |

Mẫu số bằng 0 thì app hiện "Không đủ dữ liệu". Số trên phải khớp với KD_DuPhong của BTC.

## 7. Khung chuẩn bị trước

- Trước giờ thi, đội chỉ chuẩn bị khung kỹ thuật chung `vibe-sprint`: token giao diện, hàm form/bảng/biểu đồ, `EP.ai` (một cửa AI kèm chế độ mô phỏng), `EP.scenario`, `EP.importer`, công cụ kiểm thử và quét key. Khung không chứa công thức, dữ liệu, giả định hay giao diện riêng cho đề.
- Toàn bộ tính năng, dữ liệu mẫu và giao diện theo đề được làm trong 60 phút thi (13:15–14:15). Lịch sử commit và `docs/MINH-CHUNG-AI.md` thể hiện quá trình.
- Chế độ thử nghiệm nội bộ `showPlayground` được đặt `false` trước khi nộp bài. Thư mục mẫu `features/_example` và `features/_playground` thuộc khung kỹ thuật chung, không chứa nội dung riêng cho đề.

## 8. Công cụ AI

- **Claude** (Opus, Sonnet, Haiku): lập kế hoạch, viết mã, kiểm thử, chụp minh chứng.
- **Claude Design** và **Claude in Chrome**: thiết kế giao diện và kiểm tra trên trình duyệt.
- **Gemini Antigravity**: công cụ AI bổ trợ của đội.
- Mọi phần AI viết đều do đội kiểm tra lại. Minh chứng ở `docs/MINH-CHUNG-AI.md`.

## 9. Giới hạn hiện tại

- **Mô phỏng:** thanh toán, đăng ký qua mã và mọi số liệu dự phóng đều là mô phỏng hoặc giả định. Không có cổng thanh toán thật, không gửi tin nhắn, không gọi AI thật.
- **Lưu trữ:** dữ liệu nằm trong localStorage của trình duyệt. Xoá dữ liệu trình duyệt hoặc mở cửa sổ ẩn danh thì dữ liệu mất. Dữ liệu không đồng bộ giữa các máy.
- **Chưa làm:** đăng nhập thành viên thật, xuất file Excel, nhiều kênh gửi link.
- **Chưa kiểm chứng:** kiểm thử trên điện thoại thật mới chạy bằng cỡ màn hình 360px và 390px trong trình duyệt.

## 10. Nguồn tham khảo và khai báo sử dụng

- Thư viện vi tương tác: Lucian Lab UI (MIT), giấy phép ở `vendor/lucian/LICENSE`.
- Số liệu đầu vào: file BTC `docs/du-lieu-mau-btc.xlsx`.
- Công cụ AI đã dùng để xây dựng: Claude (Opus, Sonnet, Haiku), Claude Design, Claude in Chrome, Gemini Antigravity.
- Ảnh demo: chụp từ bản chạy thật trên GitHub Pages hoặc local, theo `docs/BANG-KIEM-THU.md`.
