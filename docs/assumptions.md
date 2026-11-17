# Giả định và cách tính: Xclipse Referral

Đội: Xclipse (Diệu Anh, Vũ Trí Dũng, Nguyên – nhóm trưởng) · Bảng B – Kinh tế.
Loại giả định: **BTC** (file dữ liệu của ban tổ chức), **Đội đặt** (đội tự đặt, ghi lý do), **Mô phỏng** (chỉ dùng cho thanh toán giả lập).

## 1. Bảng giả định

| Giả định | Giá trị | Đơn vị | Nguồn / lý do | Loại |
|---|---|---|---|---|
| Thành viên hiện có | 1.200 | người | KD_GiaDinh (BTC) | BTC |
| Tỉ lệ tham gia | 15% | % thành viên | KD_GiaDinh (BTC) | BTC |
| Lượt giới thiệu mỗi người | 2 | lượt/người | KD_GiaDinh (BTC) | BTC |
| Tỉ lệ chuyển đổi | 25% | % lượt | KD_GiaDinh (BTC) | BTC |
| Doanh thu TB mỗi khách (tháng đầu) | 180.000 | đ/khách | KD_GiaDinh (BTC) | BTC |
| Chi phí quảng cáo mỗi khách (so sánh) | 90.000 | đ/khách | KD_GiaDinh (BTC) | BTC |
| Ưu đãi người giới thiệu | 30.000 | đ/khách chuyển đổi | KD_QuyDinh (BTC) | BTC |
| Ưu đãi khách mới | 30.000 | đ/khách chuyển đổi | KD_QuyDinh (BTC) | BTC |
| Ưu đãi tầng 2 (người giới thiệu của người giới thiệu) | 10.000 | đ/khách chuyển đổi | Đội đặt: khoảng 1/3 ưu đãi tầng 1; tổng ưu đãi tối đa 70.000đ, vẫn thấp hơn 90.000đ chi phí quảng cáo | Đội đặt |
| Tăng trưởng thành viên | 10% | %/tháng, 6 tháng | Đội đặt | Đội đặt |
| Giá gói Hosting Mini | 99.000 | đ/tháng | Giá trong KD_GioiThieu (BTC) | BTC |
| Giá gói Hosting Cơ bản | 149.000 | đ/tháng | Giá trong KD_GioiThieu (BTC) | BTC |
| Giá gói Hosting Pro | 279.000 | đ/tháng | Giá trong KD_GioiThieu (BTC) | BTC |
| Domain .vn (năm đầu khuyến mãi) | 59.000 | đ/năm | KD_GioiThieu (BTC) | BTC |
| Domain .com | 420.000 | đ/năm | KD_GioiThieu (BTC) | BTC |
| Trần ưu đãi domain .vn cho khách mới | 50% giá domain | % | Đội đặt, để ưu đãi không vượt giá bán (xem mục 3) | Đội đặt |

## 2. Công thức chính

Dự phóng (tab Dự phóng), với a là bộ giả định:

| Đại lượng | Công thức | Ví dụ (giá trị BTC) |
|---|---|---|
| Người tham gia | `members × participationRate` | 1.200 × 15% = 180 |
| Lượt tiếp cận | `participants × referralsPerMember` | 180 × 2 = 360 |
| Khách mới | `prospects × conversionRate` | 360 × 25% = 90 |
| Doanh thu | `newCustomers × revenuePerCustomer` | 90 × 180.000 = 16.200.000đ |
| Chi phí ưu đãi | `newCustomers × (rewardReferrer + rewardNew)` | 90 × 60.000 = 5.400.000đ |
| Tỉ lệ doanh thu/chi phí | `revenue ÷ rewardCost` | 16,2 ÷ 5,4 = 3,0 lần |
| Chi phí ưu đãi mỗi khách | `rewardCost ÷ newCustomers` | 60.000đ, so với 90.000đ quảng cáo |

Mẫu số bằng 0 thì app hiện "Không đủ dữ liệu", không hiện số 0 hay vô cùng.

Tăng trưởng: thành viên tháng sau bằng tháng trước × (1 + 10%). Dự phóng 6 tháng cộng dồn khách mới, doanh thu và chi phí.

## 3. Ưu đãi có đủ bù giá gói không

Ưu đãi hai phía là 60.000đ mỗi khách chuyển đổi. So với giá từng gói:

| Sản phẩm | Giá | Ưu đãi hai phía 60.000đ | Nhận xét |
|---|---|---|---|
| Hosting Mini | 99.000đ/tháng | 61% giá tháng đầu | Chấp nhận được |
| Hosting Cơ bản | 149.000đ/tháng | 40% | Chấp nhận được |
| Hosting Pro | 279.000đ/tháng | 22% | Chấp nhận được |
| Domain .vn | 59.000đ/năm | 102% giá năm đầu | **Vượt giá bán, lỗ** |
| Domain .com | 420.000đ/năm | 14% | Chấp nhận được |

**Quy tắc đội đề xuất (giả định của đội):** ưu đãi đầy đủ chỉ áp dụng cho gói hosting. Với domain .vn, ưu đãi khách mới tối đa bằng 50% giá (29.500đ), để ưu đãi không vượt giá bán. Đây là đề xuất của đội, chưa có trong KD_QuyDinh của BTC. Nếu app chưa áp dụng quy tắc này thì ghi rõ trong mục "Giới hạn" của README.

Với hosting, ưu đãi tính trên tháng đầu. Khách trả tiếp hàng tháng là lợi nhuận được giữ lại, không tính vào công thức dự phóng.

## 4. Kịch bản và độ nhạy

Ba kịch bản dưới đây là **đội đặt** (đề xuất, chưa chạy trong app).

- **Lạc quan:** tỉ lệ chuyển đổi 30%, tăng trưởng 15%/tháng.
- **Cơ sở:** giá trị BTC (25% chuyển đổi, 10% tăng trưởng).
- **Bi quan:** tỉ lệ chuyển đổi 15%, tăng trưởng 0%.
- **Giả định nhạy nhất:** tỉ lệ chuyển đổi và doanh thu TB mỗi khách. Mỗi điểm phần trăm chuyển đổi tương đương 3,6 khách mới mỗi tháng (1.200 × 15% × 2 × 1%), tức khoảng 0,65 triệu doanh thu.

## 5. Rủi ro

| Rủi ro | Tác động | Cách xử lý trong app |
|---|---|---|
| Ưu đãi domain .vn vượt giá bán | Lỗ trên từng khách | Đề xuất trần 50% cho domain; ghi vào giả định |
| Khách tự giới thiệu để nhận ưu đãi | Chi phí ưu đãi tăng ảo | Từ chối khi SĐT trùng người giới thiệu (`invalid_self`) |
| Khách trùng đăng ký lại | Đếm trùng khách mới | Từ chối khi SĐT đã có (`rejected_dup`) |
| Thành viên được cộng quá nhiều ưu đãi trong tháng | Chi phí vượt dự kiến | RULES.maxPerMonth = 20 (chưa xác nhận đã thực thi trong app) |
| Tầng 2 cộng dồn chi phí | Tổng ưu đãi tăng 10.000đ mỗi khách | Tổng 70.000đ vẫn thấp hơn 90.000đ quảng cáo |
| Số liệu mô phỏng bị hiểu là số thật | Giám khảo hiểu sai | Nhãn "Dữ liệu mẫu BTC", "Giả định", "Mô phỏng" trên giao diện và README |

## 6. Nhãn dữ liệu

- **Dữ liệu mẫu BTC:** số liệu nạp từ file BTC.
- **Giả định:** số dự phóng và giá gói, ghi nguồn ở mục 1.
- **Mô phỏng:** thanh toán và đăng ký qua mã giả lập.
