# Spec nhanh — Xclipse Referral (Đề chính thức Bảng B – Kinh tế)

**Đề:** Chương trình thành viên giới thiệu khách (Referral) cho doanh nghiệp hosting/domain. App mô phỏng 100%, dữ liệu lưu local. Dữ liệu BTC: `docs/du-lieu-mau-btc.xlsx` (sheets KD_ThanhVien, KD_GioiThieu, KD_QuyDinh, KD_GiaDinh, KD_DuPhong).

## 0. SCHEMA CONTRACT (mọi agent chép nguyên văn, KHÔNG tự đặt tên khác)
```
Collections (EP.collection):
 'members'   { id:'KD-001', name, phone, refCode:'REF-MA01', joinedAt:'YYYY-MM-DD', status:'Đang hoạt động', source:'btc'|'user' }
 'referrals' { id:'KD-R001', referrerId:'KD-001', refCode, customerName, customerKey (SĐT/mã KH), service, date:'YYYY-MM-DD',
               status: 'converted'|'pending'|'processing'|'cancelled'|'invalid_self'|'rejected_dup'|'reviewing',
               revenue (VND, tháng đầu), rewardReferrer, rewardNew, rewardTotal, tier: 1|2, parentReferrerId (tầng 2) | null,
               note, source:'btc'|'user' }
Module js/referral.js → window.EP.referral:
 RULES = { rewardReferrer:30000, rewardNew:30000, tier2Reward:10000, condition:'converted', maxPerMonth:20 }
 PRICES = [{service:'Hosting Mini',price:99000},{'Hosting Cơ bản',149000},{'Hosting Pro',279000},{'Domain .vn',59000 (năm đầu khuyến mãi)},{'Domain .com',420000 (năm)}]
 STATUS_LABEL = { converted:'Đã chuyển đổi', pending:'Đang chờ thanh toán', processing:'Đang xử lý', cancelled:'Đã hủy',
                  invalid_self:'Không hợp lệ – tự giới thiệu', rejected_dup:'Từ chối – trùng', reviewing:'Đang rà soát' }
 statusFromVN(text) -> status code     // map trạng thái tiếng Việt trong file BTC
 loadSample() -> {members:n, referrals:n}   // nạp từ window.EP_SAMPLE (js/sample-data.js), ghi đè dữ liệu nguồn 'btc'
 makeCode(name) -> 'REF-XX99' (duy nhất)
 registerMember({name, phone}) -> {ok, member, error}
 signup({refCode, customerName, phone, service}) -> {ok, referral, status, reason}
    // tự giới thiệu (SĐT trùng SĐT người giới thiệu) -> invalid_self; khách (SĐT/customerKey) đã có -> rejected_dup;
    // mã không tồn tại -> {ok:false, reason}; hợp lệ -> pending (chưa cộng ưu đãi)
 pay(referralId) -> referral   // pending/processing/reviewing -> converted, cộng rewardReferrer/rewardNew (+ tier2 cho người giới thiệu của người giới thiệu nếu có)
 cancel(referralId)
 memberStats(memberId) -> { total, converted, pending, rejected, rewardTotal, tier2Reward, referrals:[...] }
 forecast(a) where a = { members, participationRate, referralsPerMember, conversionRate, revenuePerCustomer,
                         rewardReferrer, rewardNew, adCostPerCustomer, months, monthlyGrowth }
   -> { participants, prospects, newCustomers, revenue, rewardCost, ratio, referralCostPerCustomer, saving, monthly:[{month, newCustomers, revenue, rewardCost, cumulative}] , formulas:[{label, formula, value}] }
   // mẫu số = 0 -> 'Không đủ dữ liệu'
Tabs (EP.register id): 'home' (Tổng quan), 'members' (Thành viên), 'signup' (Đăng ký qua mã), 'tracking' (Theo dõi), 'rules' (Thể lệ), 'forecast' (Dự phóng)
Ưu đãi: số tiền là VND, hiển thị vi-VN.
```

## 1. Người dùng & giá trị
- Chủ doanh nghiệp hosting/domain + thành viên (khách hiện tại). Biến khách hiện tại thành kênh bán: chi phí referral 60.000đ/khách so với quảng cáo 90.000đ/khách (giả định BTC).

## 2. 5 tính năng lõi + tiêu chí nghiệm thu
1. **Thành viên**: đăng ký (tên, SĐT), sinh mã REF + link `?ref=CODE`, sao chép link. ✔ mã duy nhất, SĐT hợp lệ, không trùng SĐT.
2. **Đăng ký qua mã (mô phỏng)**: form khách mới nhập mã (tự điền từ `?ref=`), chọn gói; ghi nhận "Đang chờ thanh toán"; nút "Mô phỏng thanh toán thành công" → chuyển đổi, cộng ưu đãi 2 phía. ✔ tự giới thiệu bị từ chối, trùng khách bị từ chối, mã sai báo lỗi.
3. **Theo dõi thành viên**: chọn thành viên → số khách đã giới thiệu, danh sách + trạng thái (chip màu), tổng ưu đãi đã nhận (tầng 1 + tầng 2).
4. **Thể lệ**: ưu đãi 2 phía, điều kiện (thanh toán thành công), chống gian lận (tự giới thiệu, trùng), bảng giá gói giả định, ưu đãi tầng 2.
5. **Dự phóng**: bảng giả định nhập được (mặc định = KD_GiaDinh) → khách mới, doanh thu, chi phí ưu đãi, tỉ lệ doanh thu/chi phí; công thức + giả định hiển thị cạnh bảng; 3 kịch bản + độ nhạy (EP.scenario); biểu đồ theo tháng; copy tóm tắt chương trình.
- **Nút "Nạp dữ liệu mẫu"** (BTC) ở Tổng quan và Cài đặt: 8 thành viên, 12 lượt với đủ trạng thái. Kiểm: KD_DuPhong khớp (90 khách mới, 16,2 tr, 5,4 tr, tỉ lệ 3).
- **Mở rộng:** ưu đãi tầng 2 (gián tiếp 10.000đ), biểu đồ tháng, copy tóm tắt.

## 3. Giả định (nguồn)
| Giả định | Giá trị | Nguồn |
|---|---|---|
| Thành viên hiện có | 1.200 | KD_GiaDinh (BTC) |
| Tỉ lệ tham gia | 15% | KD_GiaDinh |
| Lượt giới thiệu/người | 2 | KD_GiaDinh |
| Tỉ lệ chuyển đổi | 25% | KD_GiaDinh |
| Doanh thu TB/khách (tháng đầu) | 180.000đ | KD_GiaDinh |
| Ưu đãi người giới thiệu / khách mới | 30.000đ / 30.000đ | KD_QuyDinh |
| Chi phí quảng cáo/khách | 90.000đ | KD_GiaDinh |
| Ưu đãi tầng 2 | 10.000đ | Giả định của đội (≈1/3 ưu đãi tầng 1, giữ tổng ≤ 70.000đ < 90.000đ CPA quảng cáo) |
| Giá gói | Mini 99k, Cơ bản 149k, Pro 279k /tháng; .vn 59k, .com 420k /năm | Giá trong KD_GioiThieu (BTC), phù hợp mặt bằng thị trường phổ thông — giả định |
| Tăng trưởng tháng | 10%/tháng, 6 tháng | Giả định của đội |

## 4. Nhãn dữ liệu
"Dữ liệu mẫu (BTC)" cho dữ liệu nạp từ file; "Giả định" cho số dự phóng; "Mô phỏng" cho thanh toán/đăng ký giả lập.
