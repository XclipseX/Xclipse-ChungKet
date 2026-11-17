# Prompt dán cho Claude Design — Xclipse Referral (12 slide, 10 phút)

> Điều phối viên: dán **Phần 1** ở T+10 (dự án mới `Xclipse Referral · Slide chung kết`; đính kèm `sprite.svg`, `logo-light.jpg`, `logo-dark.jpg`). Dán **Phần 2** ở T+50 sau khi tải ZIP ảnh + `00-demo-video.mp4` + `00-demo-video-poster.png`. Bản cắt 8 và 6 slide ở mục 7B, 7C (yêu cầu Claude Design dựng thêm trong cùng dự án). Chưa chạy kiểm thử xong thì giữ `[SỐ: …]`, không bịa. Không đưa khóa API vào prompt.

## PHẦN 1 — DỰNG KHUNG SLIDE (CHƯA CÓ ẢNH)

`````markdown
# PHẦN 1 — DỰNG KHUNG SLIDE (CHƯA CÓ ẢNH)

Bạn là **Chuyên gia thiết kế trình chiếu** làm việc với đội **Xclipse** (`{{TRUONG}}`) tại Chung kết **VIBE-CODING 2026 · Bảng `B – Kinh tế`**. Hãy dựng **bộ slide có thể chỉnh sửa** (editable) cho sản phẩm **`Xclipse Referral`**, tỉ lệ **16:9 · 1920×1080px**, bản **12 slide** (10 phút: 11 slide nội dung + 1 slide video; không dựng bản khác).

**Đây là KHUNG, chưa có ảnh app.** Mọi chỗ cần ảnh chụp app phải là **ô điện thoại dọc trống** ghi rõ `[ẢNH: tên-file.png]` (tên file đúng bảng slot ở mục 6, không tự đặt tên khác). Mọi số chưa có thật phải hiện `[SỐ: mô tả ngắn]` trong một chip viền nét đứt màu coral để không ai quên thay. Ảnh sẽ được gửi sau dưới dạng ZIP trong **Phần 2**.

Tuân thủ **nguyên văn** bộ theme, mã CSS và quy tắc dưới đây. Không tự chế màu, font, bố cục khác.

## 1. BỐI CẢNH TRÌNH BÀY (ảnh hưởng thiết kế)

- Đội 3 người, **vai cố định:** **Diệu Anh** (mở: bối cảnh, người dùng, UI/UX) · **Vũ Trí Dũng** (giữa: tính năng, nghiệp vụ, demo) · **Nguyên** (cuối: kỹ thuật, giả định và mô hình kinh doanh, tổng kết, phản biện).
- **Không ai trong đội bấm slide.** File slide được giao cho **bộ phận kỹ thuật của Ban tổ chức**; kỹ thuật viên đổi slide khi **nghe câu hiệu lệnh** của người nói. Vì vậy: (a) mỗi slide phải có **ghi chú người nói** theo khuôn ở mục 8, kèm dòng **Cue kỹ thuật**; (b) slide **không** dựa vào hiệu ứng vào/ra hay bấm nhiều lần để hiện từng ý (mỗi slide hiện **đủ nội dung ngay khi vào**, chỉ cho phép fade ≤ 300 ms); (c) file phải mở được và hiển thị đúng ở **PDF** và **PPTX**.
- Slide là **gợi ý nhắc cho người đang căng thẳng:** liếc vào là thấy ý chính và 1 con số. Vì vậy chữ phải **đủ để nhắc, không đủ để đọc thay** (mục 3).
- Demo trước giám khảo do **kỹ thuật viên chiếu ảnh/video hoặc mở link** theo hiệu lệnh; đội **không** cầm điện thoại. Slide demo cần hiển thị rõ ảnh điện thoại dọc, QR/link và nhãn dữ liệu mô phỏng.

## 2. QUY TẮC CỨNG (vi phạm là làm lại)

1. **Khổ 16:9, 1920×1080.** Lề an toàn **≥ 72px** mọi cạnh (khung chuẩn: trái/phải 120px, trên 88px, dưới 118px chừa chân trang). Khoảng trắng ≥ 30% diện tích.
2. **Ảnh app chỉ là ảnh điện thoại DỌC, tỉ lệ 9:19,5** (390×844 @3x = 1170×2532; có bản 360×780 cũng 9:19,5), đặt **trong khung điện thoại** (mục 4). **Không bao giờ** cắt ngang/vuông, kéo giãn, đặt vào khung trình duyệt/laptop, hay dùng ảnh desktop làm ảnh slide. Ảnh phải hiện **đủ chiều dọc** (thấy cả thanh tab dưới).
3. **Tối đa 3 điện thoại mỗi slide.** Cách dùng: 1 máy + 3 ghim đánh số · 2 máy (Sáng/Tối) · 3 máy cạnh nhau (ca thường/ca sai/ca biên) · luồng 3 bước 1 → 2 → 3 có mũi tên.
4. **Mỗi slide có đúng 1 điểm tựa thị giác:** **1 con số lớn** (≥ 120px, `tabular-nums`) hoặc **ảnh điện thoại dọc**. Slide có điện thoại: con số S hiện dạng "số nhấn" 56–72px trong một thẻ cạnh ảnh. Không có hai con số to cạnh tranh nhau.
5. **Cỡ chữ (trên khung 1920×1080):** nội dung ≥ **24px**, chú thích/chân trang ≥ **22px**, tiêu đề 52–70px, số lớn ≥ 120px. Không chữ nào nhỏ hơn 22px.
6. **Tương phản AA:** chữ thường ≥ 4,5:1, chữ lớn (≥ 24px) ≥ 3:1. **Cấm chữ hồng `#FD6E88` nhỏ/mảnh trên nền sáng** — chữ hồng dùng `#C93252`. Không chữ xám nhạt dưới 4,5:1.
7. **Tiếng Việt có dấu chuẩn 100%**, font Be Vietnam Pro đủ dấu. Không font trang trí thiếu dấu. Kiểm lại: `ệ ữ ặ ẫ ợ ũ` hiển thị đúng, không bị đè dòng (line-height ≥ 1,3 cho tiêu đề, 1,45 cho thân).
8. **Không đặt tên người nói lên slide** (không name tag). Tên người chỉ nằm trong ghi chú người nói. Chân trang: tên sản phẩm + số trang `NN / NN`.
9. **Nhãn minh bạch:** số mô phỏng/giả định/dữ liệu mẫu BTC gắn nhãn nhỏ ngay cạnh (`Dữ liệu mẫu (BTC)` · `Giả định` · `Mô phỏng`). Slide có kết quả AI/demo mô phỏng ghi `Dữ liệu mô phỏng AI · Dữ liệu mẫu` **nguyên văn**. Slide kiến trúc/kết ghi công cụ AI đội dùng: **Claude (Opus, Sonnet, Haiku, Claude Design) và Gemini Antigravity**.
10. **Không emoji, không ảnh stock, không ảnh người thật, không logo bên thứ ba.** Chỉ dùng logo Xclipse và hệ icon Xclipse (mục 4.4).
11. **Màu bị cấm:** tím neon, đen tuyền `#000000`, xanh lá/cam ngoài bảng màu, phong cách gaming/cyberpunk, gradient cầu vồng.
12. **Danh sách từ cấm (khoa trương) trong tiêu đề, phụ đề, gạch đầu dòng:** đột phá · cách mạng · siêu · tuyệt đối · hoàn hảo · số 1 · tốt nhất · vượt trội · đỉnh cao · bùng nổ · thay đổi cuộc chơi · chưa từng có · thần kỳ · "mọi thứ" · "luôn luôn" · "100%" (trừ khi là kết quả kiểm thử đã đo) · "wow" · game changer · "tối ưu" (trừ khi có số đo) · dấu chấm than ở tiêu đề.
13. **Không bịa số.** Số nào chưa có nguồn thì để `[SỐ: …]`. Số giả định ghi nguồn hoặc nhãn `Giả định`.
14. **Xuất được:** deck chỉnh sửa trong dự án + **PDF 1 trang/slide** + **PPTX** (mỗi slide giữ ghi chú). Không phụ thuộc hiệu ứng hay font ngoài (nhúng/đổi sang font dự phòng đủ dấu).

## 3. PHONG CÁCH VIẾT SLIDE (quan trọng nhất sau bố cục)

### 3.1. Tiêu đề và phụ đề là TÊN GỌI, không phải tuyên bố

- **Tiêu đề = đặt tên cho nội dung của slide** ("Bối cảnh các SME hiện nay"), không phải câu cảm xúc, khẳng định hay khẩu hiệu. **Phụ đề** (1 dòng ≤ 12 từ) **xác định phạm vi** ("Chân dung người dùng và cách họ làm việc hiện nay"). Cả hai đều là cụm danh từ, không dấu chấm than, không "vì sao… / hãy…".
- Tiêu đề ≤ 8 từ; mỗi slide **1–2 từ nhấn** bằng Playfair Display italic (`<em>`), chọn từ **chỉ nội dung** chứ không phải tính từ khen ("Giả định và *cách tính*", không phải "Giả định *siêu* chắc").
- Nội dung mang cảm xúc/lập luận đi vào **gạch đầu dòng và lời nói**, không vào tiêu đề.

**15 cặp trước/sau (làm mẫu cảm giác, áp dụng cho nội dung của đề):**

| # | Tránh (khẳng định/cảm xúc/khoa trương) | Dùng (đặt tên/nhận diện) |
|---|---|---|
| 1 | Nỗi đau của các SME hiện nay: tay ngang | Bối cảnh các SME hiện nay |
| 2 | Giải pháp đột phá thay đổi cuộc chơi | Giải pháp của `Xclipse Referral` |
| 3 | AI làm hết mọi việc cho bạn | Vai trò của AI trong sản phẩm |
| 4 | Chỉ 3 giây có kết quả siêu nhanh | Thời gian từ nhập liệu đến kết quả |
| 5 | Chúng tôi đạt 100% bài kiểm thử! | Kết quả kiểm thử |
| 6 | Tuyệt đối an toàn, không thể bị hack | Cách giữ khóa API và dữ liệu |
| 7 | Lợi nhuận bùng nổ nhờ ưu đãi | Ưu đãi và điểm hòa vốn |
| 8 | Cuộc cách mạng quản lý tồn kho | Quản lý tồn kho hiện nay |
| 9 | Người dùng sẽ phải thốt lên "wow" | Màn hình chính và ba điểm cần nhìn |
| 10 | Đừng để khách hàng rời đi! | Các điểm khách rời khỏi quy trình |
| 11 | Số liệu không biết nói dối | Giả định và nguồn số liệu |
| 12 | Thử ngay, bạn sẽ bất ngờ | Bản chạy thật: ca thông thường |
| 13 | Cùng chúng tôi chinh phục thị trường | Tổng kết và bước tiếp theo |
| 14 | Ca lỗi? Không có chuyện đó! | Ca nhập sai và ca biên |
| 15 | Công nghệ tiên tiến nhất hiện nay | Công nghệ sử dụng |

### 3.2. Mật độ chữ: vừa đủ để nhắc

- **Mỗi slide nội dung: 3–5 gạch đầu dòng, mỗi gạch ≤ 14 từ, cộng 1 con số chính.** Không đoạn văn. Không quá 5, không dưới 3 (trừ slide bìa/kết/chỉ ảnh).
- Gạch đầu dòng là **cụm có thông tin cụ thể** (ai · làm gì · bao nhiêu · nguồn), đọc một mình vẫn hiểu. Ví dụ tốt: "Chủ quán nhập doanh thu bằng Zalo và sổ tay, 40 phút mỗi tối." Ví dụ không dùng: "Quy trình thủ công còn nhiều bất cập."
- Mỗi gạch bắt đầu bằng **danh từ/động từ chính**, bỏ từ đệm ("việc", "sự", "các", "những" khi không cần). Dùng chữ đời thường; thuật ngữ kỹ thuật chỉ ở phần Nguyên và có giải nghĩa ngắn.
- Con số chính: **số + đơn vị + nhãn nguồn** ("40 phút/ngày · Giả định"). Có ba loại nhãn: `Dữ liệu mẫu (BTC)`, `Giả định`, `Mô phỏng`.
- Người nói nhìn slide phải nhận ra **thứ tự ý** (đánh số 1–2–3 hoặc gạch có icon), vì họ dùng slide như prompter.

### 3.3. Chiều sâu theo phần của từng người (chữ đơn giản nhưng thể hiện hiểu biết thật)

- **Diệu Anh — bối cảnh, người dùng, UI/UX.** Slide của bạn phải cho thấy: *ai* (vai trò, quy mô, thiết bị), *làm gì hằng ngày* (tần suất, công cụ hiện dùng), *cái giá của cách làm hiện nay* (thời gian/tiền/sai sót, có nguồn), và *quyết định giao diện gắn với ràng buộc người dùng* (một tay trên điện thoại, 360–390px, vùng ngón cái, thanh tab dưới, tương phản, Sáng/Tối, tiếng Việt có dấu). Mỗi quyết định UI = **ràng buộc → cách xử lý**, không phải "giao diện đẹp, thân thiện".
- **Vũ Trí Dũng — tính năng, nghiệp vụ, demo.** Mỗi tính năng viết theo **đầu vào → quy tắc → kết quả** và gắn với **việc của người dùng** nó giải quyết. Có ít nhất **1 quy tắc nghiệp vụ nêu số cụ thể** (ví dụ ngưỡng, công thức, điều kiện từ chối) và **ca nhập sai/ca biên** ứng xử ra sao. Slide demo cho thấy **thứ tự thao tác** bằng ảnh dọc có ghim số.
- **Nguyên — kỹ thuật, giả định và mô hình kinh doanh, tổng kết.** Kiến trúc nói bằng **4 khối** (giao diện → logic tính → AI qua proxy/mô phỏng → lưu trữ) và chỉ rõ **cái gì chạy thật, cái gì mô phỏng, khóa API nằm ở đâu**. Giả định luôn có **giá trị + nguồn + nhãn**; có **3 kịch bản**, **điểm hòa vốn kèm công thức chữ**, **điều kiện ưu đãi gây lỗ**, và **1 giới hạn nói thẳng** cùng cách kiểm tra tiếp. Tổng kết chỉ lặp lại kết quả đã đo.

## 4. HỆ THỐNG THIẾT KẾ XCLIPSE (NHÚNG ĐỦ — KHÔNG ĐOÁN)

Bảng màu **chốt**: Ice Sky `#DBF2FC` · Deep Navy `#072D59` · Coral `#FD6E88`, kèm biến thể `#F5FBFF` (nền), `#EAF6FD`, `#0E4A8A` (navy giữa), `#041A36` (navy sâu), `#C93252`/`#D93656` (hồng đậm cho chữ), `#0B7A70` (xanh đạt). Font: **Be Vietnam Pro** (tiêu đề đậm 700–800, tracking `-0.025em`; thân 400–500) + **Playfair Display Italic 700** cho 1–2 từ nhấn; số/mã dùng `tabular-nums` / **IBM Plex Mono**. Thêm vào `<head>`:

```html
<!-- Chỉ dùng trong dự án Claude Design (bản chiếu cần font đủ dấu). App/starter KHÔNG dùng Google Fonts: font tự host trong starter/fonts/ -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600;1,700&family=Playfair+Display:ital,wght@1,600;1,700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

Mã dưới đây lấy từ bộ slide `deck.html` của skill (đã dùng thật) và từ giao diện chốt `xclipse-ui-ux-tam-nhin.html`. **Khối 4.1 (token Xclipse) ghi đè giá trị mặc định tím của deck.** Khối 4.2 là CSS thành phần chép nguyên từ deck. Khối 4.3 là phần ghi đè Xclipse và thành phần mới (bìa kính sọc, giả định, kịch bản, hòa vốn, trích dẫn). Dán cả ba vào `<style>` theo đúng thứ tự.

### 4.1. Token Xclipse (đặt TRƯỚC khối 4.2)

```css
:root{
  /* Bảng màu chốt Xclipse */
  --ice:#DBF2FC; --ice-2:#EAF6FD; --ice-white:#F5FBFF;
  --navy:#072D59; --navy-mid:#0E4A8A; --navy-deep:#041A36;
  --coral:#FD6E88; --coral-ink:#C93252; --coral-deep:#D93656;

  /* Tên biến giữ như deck.html để CSS 4.2 chạy nguyên */
  --bg:#F5FBFF; --ink:#072D59; --muted:#36567A; --faint:#647F9E;
  --card:#FFFFFF; --line:rgba(7,45,89,.10); --soft:rgba(7,45,89,.04);
  --accent:#0E4A8A; --accent2:#FD6E88;
  --grad:linear-gradient(120deg,var(--navy-mid) 0%,var(--coral) 100%);   /* nền chip, ghim số, vòng tròn bước */
  --grad-text:linear-gradient(120deg,#072D59 0%,#D93656 100%);           /* chữ nhấn: đủ tương phản */
  --ok:#0B7A70; --ok-bg:#DDF3F0; --warn:#9A5A07; --warn-bg:#FBEBD2; --bad:#C0304F; --bad-bg:#FBE3E8;

  --font:'Be Vietnam Pro','Inter','Segoe UI',system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;
  --serif:'Playfair Display',Georgia,serif;
  --mono:'IBM Plex Mono',ui-monospace,'SF Mono',Menlo,Consolas,monospace;
  --ease:cubic-bezier(.22,.8,.24,1);

  /* Quy ước khoảng cách / bo góc / bóng (đã dùng trong 4.2) */
  --r-card:30px; --r-chip:999px; --r-phone:58px;
  --shadow-card:0 1px 0 rgba(255,255,255,.7) inset,0 22px 44px -28px rgba(7,45,89,.22);
  --shadow-phone:0 60px 80px -40px rgba(7,45,89,.55),0 22px 40px -22px rgba(253,110,136,.45);
}
```

### 4.2. CSS thành phần (chép nguyên từ `deck.html`)

```css
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{background:#E7E4DE;color:var(--ink);font-family:var(--font);overflow:hidden;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
a{color:inherit}
button{font:inherit;color:inherit}

/* ---------- Sân khấu ---------- */
#viewport{position:fixed;inset:0;overflow:hidden}
#stage{position:absolute;left:50%;top:50%;width:1920px;height:1080px;transform-origin:center center;background:var(--bg);box-shadow:0 30px 80px -30px rgba(22,21,27,.35);overflow:hidden}
.slide{position:absolute;inset:0;width:1920px;height:1080px;overflow:hidden;background:var(--bg);opacity:0;visibility:hidden;pointer-events:none;
  transition:opacity .45s var(--ease),transform .55s var(--ease),visibility 0s linear .55s}
.slide::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;
  background:radial-gradient(900px 600px at 92% -8%,color-mix(in srgb,var(--accent) 14%,transparent),transparent 70%),
             radial-gradient(800px 560px at -6% 108%,color-mix(in srgb,var(--accent2) 12%,transparent),transparent 70%)}
.slide.is-active{opacity:1;visibility:visible;pointer-events:auto;transform:none;transition-delay:0s}
.slide.pre-next{transform:translateX(36px)}
.slide.pre-prev{transform:translateX(-36px)}
.slide .inner{position:absolute;inset:0;padding:88px 120px 118px;display:flex;flex-direction:column;z-index:1}
.foot{position:absolute;left:120px;right:120px;bottom:42px;display:flex;justify-content:space-between;align-items:center;font-size:22px;color:var(--faint);z-index:2;letter-spacing:.01em}
.foot .num{font-family:var(--mono);font-variant-numeric:tabular-nums}
.foot b{color:var(--ink);font-weight:600}
.slide.nofoot .foot{display:none}


/* ---------- Chữ ---------- */
.eyebrow{display:inline-flex;align-items:center;gap:12px;font-family:var(--mono);font-size:22px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.eyebrow::before{content:"";width:34px;height:3px;border-radius:3px;background:var(--grad)}
h2.title{font-size:70px;line-height:1.08;font-weight:800;letter-spacing:-.025em;margin-top:18px;max-width:1500px;text-wrap:balance}
.hl{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}
.head{flex:none;margin-bottom:44px}
.lead{font-size:34px;line-height:1.45;color:var(--muted)}
strong,b{font-weight:700}
h2.title strong,.s-solution .one strong{font-weight:800;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}
.mono{font-family:var(--mono)}

/* ---------- Thành phần chung ---------- */
.card{background:var(--card);border:1px solid var(--line);border-radius:30px;box-shadow:0 1px 0 rgba(255,255,255,.7) inset,0 22px 44px -28px rgba(22,21,27,.22)}
.chip{display:inline-flex;align-items:center;gap:10px;padding:10px 22px;border-radius:999px;background:#fff;border:1px solid var(--line);font-size:24px;font-weight:600}
.chip.grad{background:var(--grad);color:#fff;border-color:transparent}
.badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:999px;font-size:22px;font-weight:700;white-space:nowrap}
.badge.pass{background:var(--ok-bg);color:var(--ok)}
.badge.warn{background:var(--warn-bg);color:var(--warn)}
.badge.fail{background:var(--bad-bg);color:var(--bad)}
.badge.kind{background:var(--soft);color:var(--muted);font-weight:600}
.ico{width:1em;height:1em;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}
.ibox{width:76px;height:76px;border-radius:22px;background:var(--grad);color:#fff;display:grid;place-items:center;font-size:40px;box-shadow:0 14px 28px -14px var(--accent)}
.ibox.soft{background:color-mix(in srgb,var(--accent) 11%,#fff);color:var(--accent);box-shadow:none}

/* ---------- Khung điện thoại (ảnh chụp DỌC 9:19,5 — 390x844@3x hoặc 1170x2532) ----------
   Đặt chiều cao ngoài bằng --ph; chiều rộng tự suy ra để vùng màn hình đúng tỉ lệ 9:19,5, ảnh object-fit:cover, bám mép trên. */
.pf{--bz:12px;position:relative;flex:none;height:var(--ph,800px);width:calc((var(--ph,800px) - 2*var(--bz)) * 9 / 19.5 + 2*var(--bz));padding:var(--bz);border-radius:58px;
  background:linear-gradient(155deg,#34313F 0%,#16151B 38%,#0E0D12 100%);
  box-shadow:0 0 0 2px color-mix(in srgb,var(--accent) 38%,#16151B),0 1px 0 1px rgba(255,255,255,.14) inset,0 60px 80px -40px rgba(22,21,27,.55),0 22px 40px -22px color-mix(in srgb,var(--accent) 45%,transparent)}
.pf::before,.pf::after{content:"";position:absolute;width:5px;border-radius:3px;background:#2A2833}
.pf::before{left:-5px;top:19%;height:52px;box-shadow:0 78px 0 #2A2833}
.pf::after{right:-5px;top:26%;height:96px}
.pf-screen{position:relative;width:100%;height:100%;border-radius:calc(58px - var(--bz));overflow:hidden;background:linear-gradient(160deg,#ECE9FD,#DCEBFA)}
.pf-screen{--sb:46px;--sbg:#F6F5FB;--sbf:#16151B}
.pf-screen.dk{--sbg:#0E0D12;--sbf:#E9E7F2}
.pf-screen::before{content:"";position:absolute;left:0;right:0;top:0;height:var(--sb);background:var(--sbg);z-index:1}
.pf-sb{position:absolute;left:0;right:0;top:0;height:var(--sb);z-index:2;display:flex;align-items:center;justify-content:space-between;padding:6px 8% 0;font:700 17px/1 var(--font);color:var(--sbf)}
.pf-sb i{display:inline-block;width:26px;height:12px;border-radius:4px;border:2px solid var(--sbf);position:relative;opacity:.8}
.pf-sb i::after{content:"";position:absolute;inset:1px 5px 1px 1px;background:var(--sbf);border-radius:1px}
.pf-screen img{position:absolute;left:0;right:0;bottom:0;top:var(--sb);width:100%;height:calc(100% - var(--sb));object-fit:cover;object-position:top center;display:block}
.pf-screen iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff}
.pf-screen.missing::after{content:attr(data-missing);position:absolute;inset:0;display:grid;place-items:center;font:600 22px/1.4 var(--mono);color:var(--muted);text-align:center;padding:36px}
.pf-island{position:absolute;top:10px;left:50%;width:27%;height:28px;transform:translateX(-50%);border-radius:20px;background:#0A090D;z-index:3;box-shadow:0 0 0 1px rgba(255,255,255,.06)}
.pf-home{position:absolute;bottom:9px;left:50%;width:34%;height:6px;transform:translateX(-50%);border-radius:4px;background:rgba(22,21,27,.55);z-index:2}
.pf-pin{position:absolute;left:-26px;transform:translateY(-50%);width:52px;height:52px;border-radius:50%;background:var(--grad);color:#fff;display:grid;place-items:center;font:700 26px/1 var(--mono);z-index:3;border:4px solid var(--bg);box-shadow:0 14px 24px -10px var(--accent)}
.pcap{margin-top:20px;text-align:center;font-size:28px;font-weight:700;line-height:1.25}
.pcap small{display:block;margin-top:4px;font-size:22px;font-weight:500;color:var(--muted)}
.pcol{display:flex;flex-direction:column;align-items:center;flex:none}

/* ---------- Slide phone (1 điện thoại + 3 chú thích) ---------- */
.s-phone .inner,.s-phones-2 .inner,.s-phones-3 .inner,.s-demo .inner.dp{flex-direction:row;align-items:center;gap:72px;padding-top:64px;padding-bottom:118px}
.s-phone .left,.s-phones-2 .left,.s-phones-3 .left,.s-demo .dp .left{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center}
.s-phone .right,.s-phones-2 .right,.s-phones-3 .right,.s-demo .dp .right{flex:none;display:flex;align-items:center;justify-content:center}
.s-phone h2.title,.s-phones-2 h2.title,.s-phones-3 h2.title{font-size:60px;max-width:none}
.s-phone .head,.s-phones-2 .head,.s-phones-3 .head{margin-bottom:40px}
.callouts{list-style:none;display:flex;flex-direction:column;gap:22px}
.callouts li{display:flex;gap:22px;align-items:flex-start;padding:24px 28px}
.callouts .n{flex:none;width:52px;height:52px;border-radius:50%;background:var(--grad);color:#fff;display:grid;place-items:center;font:700 26px/1 var(--mono);box-shadow:0 12px 22px -10px var(--accent)}
.callouts h3{font-size:34px;line-height:1.15;font-weight:700}
.callouts p{font-size:25px;line-height:1.4;color:var(--muted);margin-top:6px}
.s-phone .right{padding:0 40px 0 30px}
.s-phone .pf{--ph:890px}
.s-phones-2 .pf{--ph:800px}
.s-phones-2 .right{gap:56px;align-items:flex-start}
.s-phones-3 .pf{--ph:690px}
.s-phones-3 .right{gap:36px;align-items:flex-start}
.s-phones-3 h2.title{font-size:52px}
.s-phones-3 .pcap{font-size:25px}.s-phones-3 .pcap small{font-size:20px}
.plist{list-style:none;display:flex;flex-direction:column;gap:14px;margin-top:6px}
.plist li{display:flex;gap:14px;align-items:flex-start;font-size:28px;line-height:1.4;font-weight:500}
.s-phones-3 .plist li{font-size:25px}
.plist .ico{color:var(--accent);font-size:32px;margin-top:3px}
.pnote{margin-top:30px;padding:20px 26px;font-size:24px;line-height:1.45;color:var(--muted);display:flex;gap:14px;align-items:flex-start}
.pnote .ico{color:var(--accent);font-size:30px;margin-top:2px}

/* ---------- Slide phone-steps (luồng 1 → 2 → 3) ---------- */
.s-phone-steps .inner{padding-top:60px;padding-bottom:112px}
.s-phone-steps .head{margin-bottom:22px}
.s-phone-steps h2.title{font-size:56px;margin-top:10px;max-width:none}
.s-phone-steps .row{flex:1;display:flex;justify-content:center;align-items:flex-start;min-height:0}
.s-phone-steps .pf{--ph:590px}
.s-phone-steps .st{display:flex;flex-direction:column;align-items:center;width:420px;text-align:center;position:relative}
.s-phone-steps .st h3{margin-top:20px;font-size:32px;line-height:1.15;font-weight:700}
.s-phone-steps .st p{margin-top:6px;font-size:24px;line-height:1.35;color:var(--muted)}
.s-phone-steps .st .badge-n{position:absolute;left:calc(50% - 176px);top:-6px;width:56px;height:56px;border-radius:50%;background:var(--grad);color:#fff;display:grid;place-items:center;font:700 28px/1 var(--mono);z-index:4;border:4px solid var(--bg);box-shadow:0 14px 24px -10px var(--accent)}
.s-phone-steps .arr{flex:none;width:110px;height:590px;display:grid;place-items:center;color:var(--accent);font-size:64px}
.s-phone-steps .arr .ico{stroke-width:2.2}
.s-phone-steps .note{margin-top:8px;padding:16px 26px;font-size:24px;display:flex;gap:14px;align-items:center}
.s-phone-steps .note .ico{color:var(--accent);font-size:30px}

/* ---------- Cover / Demo bản điện thoại ---------- */
.s-cover .right .pf{--ph:880px;transform:rotate(1.5deg)}
.s-demo .dp .head{margin-bottom:34px}
.s-demo .dp h2.title{font-size:62px;margin-top:14px}
.s-demo .dp .pf{--ph:890px}
.s-demo .dp .side{display:grid;grid-template-columns:auto 1fr;gap:26px;align-items:start}
.s-demo .dp .qrcard{width:330px}
.s-demo .dp .qrbox{width:230px;height:230px}
.s-demo .dp .sidenote{font-size:26px}

/* ---------- Cover ---------- */
.s-cover .inner{padding:96px 120px 96px;flex-direction:row;align-items:stretch;gap:60px}
.s-cover .left{flex:.95;display:flex;flex-direction:column;justify-content:center;min-width:0}
.s-cover .right{flex:1.05;display:flex;align-items:center;justify-content:center;min-width:0}
.s-cover .tag{display:flex;gap:14px;flex-wrap:wrap}
.s-cover h1{font-size:196px;line-height:.98;font-weight:800;letter-spacing:-.045em;margin:34px 0 26px;padding-bottom:10px;white-space:nowrap}
.s-cover .tagline{font-size:48px;line-height:1.28;font-weight:500;color:var(--ink);max-width:880px;text-wrap:balance}
.s-cover .team{margin-top:52px;display:flex;align-items:center;flex-wrap:wrap;gap:10px 20px;font-size:27px;line-height:1.35;color:var(--muted)}
.s-cover .team .ml{flex:0 0 100%;font-size:25px}.s-cover .team .ml i{font-style:normal;white-space:nowrap;margin-right:1.3em}
.s-cover .team b{color:var(--ink)}
.s-cover .team .dot{width:6px;height:6px;border-radius:50%;background:var(--faint)}
.s-cover .frame{width:100%;height:570px;transform:rotate(1deg)}
.orb{width:560px;height:560px;border-radius:50%;background:var(--grad);filter:blur(2px);opacity:.9}

/* ---------- Problem ---------- */
.s-problem .body{flex:1;display:grid;grid-template-columns:.9fr 1.1fr;gap:48px;min-height:0}
.persona{padding:44px;display:flex;flex-direction:column;gap:30px}
.persona .who{display:flex;align-items:center;gap:26px}
.avatar{width:112px;height:112px;border-radius:50%;background:var(--grad);color:#fff;display:grid;place-items:center;font-size:44px;font-weight:700;flex:none;overflow:hidden}
.avatar img{width:100%;height:100%;object-fit:cover}
.persona .who h3{font-size:42px;font-weight:700;line-height:1.15}
.persona .who p{font-size:26px;color:var(--muted);margin-top:6px}
.pains{list-style:none;display:flex;flex-direction:column;gap:20px}
.pains li{display:flex;gap:18px;align-items:flex-start;font-size:31px;line-height:1.35;font-weight:500}
.pains li .ico{margin-top:5px;font-size:34px;color:var(--bad);background:var(--bad-bg);padding:7px;border-radius:12px;width:46px;height:46px}
.scenario{padding:52px 56px;display:flex;flex-direction:column;justify-content:center;gap:28px;background:var(--ink);color:#fff;border:none;position:relative;overflow:hidden}
.scenario::after{content:"";position:absolute;right:-120px;top:-120px;width:420px;height:420px;border-radius:50%;background:var(--grad);opacity:.35;filter:blur(30px)}
.scenario .lab{font-family:var(--mono);font-size:21px;letter-spacing:.14em;text-transform:uppercase;color:#B9B4FF;font-weight:600;position:relative;z-index:1}
.scenario q{display:block;font-size:40px;line-height:1.42;font-weight:500;quotes:none;position:relative;z-index:1;text-wrap:pretty}
.scenario .stat{position:relative;z-index:1;display:flex;align-items:center;gap:18px;padding-top:26px;border-top:1px solid rgba(255,255,255,.18)}
.scenario .stat b{white-space:nowrap;font-size:64px;font-weight:800;line-height:1;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;background-image:linear-gradient(120deg,#A99FFF,#6FC0FF)}
.scenario .stat span{font-size:27px;color:#CFCCD8;line-height:1.35}


/* ---------- Features ---------- */
.s-features h2.title{font-size:62px}.s-features .head{margin-bottom:30px}
.s-features .grid{flex:1;display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:1fr 1fr;gap:28px;min-height:0}
.fcard{grid-column:span 2;padding:34px 38px;display:flex;flex-direction:column;gap:14px;position:relative;overflow:hidden}
.fcard:nth-child(n+4){grid-column:span 3}
.fcard .top{display:flex;justify-content:space-between;align-items:flex-start}
.fcard .n{font-family:var(--mono);font-size:26px;font-weight:700;color:var(--faint)}
.fcard h3{font-size:37px;line-height:1.15;font-weight:700;letter-spacing:-.01em;margin-top:6px}
.fcard p{font-size:25px;line-height:1.4;color:var(--muted)}
.fcard .ibox{width:68px;height:68px;font-size:36px}

/* ---------- Demo ---------- */
.s-demo .inner{padding-top:72px}
.s-demo .head{margin-bottom:30px}
.s-demo h2.title{font-size:58px;margin-top:12px}
.s-demo .body{flex:1;display:grid;grid-template-columns:minmax(0,1fr) 420px;gap:40px;min-height:0}
.s-demo .frame{height:100%;width:100%;min-height:0}
.s-demo .side{display:flex;flex-direction:column;gap:22px;min-height:0}
.qrcard{padding:24px 26px;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center}
.qrbox{width:250px;height:250px;padding:12px;background:#fff;border-radius:22px;border:1px solid var(--line)}
.qrbox svg{width:100%;height:100%;display:block}
.qrcard .scan{font-size:30px;font-weight:700}
.qrcard .link{font:600 19px/1.3 var(--mono);color:var(--accent);word-break:break-all}
.sidenote{padding:22px 28px;font-size:24px;line-height:1.45;color:var(--muted);flex:1;min-height:0;display:flex;flex-direction:column;gap:12px;justify-content:center;overflow:hidden}
.sidenote b{color:var(--ink)}
.livebtn{position:absolute;right:22px;bottom:22px;z-index:3;display:inline-flex;gap:10px;align-items:center;padding:14px 26px;border:0;border-radius:999px;background:var(--ink);color:#fff;font-size:24px;font-weight:700;cursor:pointer;box-shadow:0 14px 30px -12px rgba(0,0,0,.5)}
.livebtn:hover{background:var(--accent)}

/* ---------- Flow ---------- */
.s-flow .steps{flex:1;display:flex;align-items:center;gap:0;min-height:0}
.step{flex:1;position:relative;padding:0 14px;display:flex;flex-direction:column;gap:22px;align-items:flex-start;min-width:0}
.step .node{display:flex;align-items:center;width:100%;gap:0}
.step .circle{width:112px;height:112px;border-radius:50%;background:var(--grad);color:#fff;display:grid;place-items:center;font-size:54px;flex:none;box-shadow:0 20px 36px -16px var(--accent);position:relative}
.step .circle sup{position:absolute;top:-6px;right:-6px;width:42px;height:42px;border-radius:50%;background:var(--ink);font:700 22px/42px var(--mono);text-align:center;vertical-align:baseline}
.step .rail{flex:1;height:4px;margin:0 14px;border-radius:4px;background:repeating-linear-gradient(90deg,var(--accent2) 0 14px,transparent 14px 26px);opacity:.55;position:relative}
.step .rail::after{content:"";position:absolute;right:-4px;top:-9px;border-left:16px solid var(--accent2);border-top:11px solid transparent;border-bottom:11px solid transparent}
.step:last-child .rail{visibility:hidden}
.step h3{font-size:38px;line-height:1.15;font-weight:700}
.step p{font-size:27px;line-height:1.45;color:var(--muted)}
.s-flow .note{flex:none;margin-top:10px;padding:24px 34px;font-size:28px;display:flex;align-items:center;gap:18px}
.s-flow .note .ico{color:var(--accent);font-size:36px}

/* ---------- AI ---------- */
.s-ai .inner{padding-top:72px}
.s-ai .head{margin-bottom:26px}
.s-ai h2.title{font-size:58px;margin-top:12px}
.s-ai .top{display:grid;grid-template-columns:1fr 1fr 1.15fr;gap:24px;flex:none}
.acard{padding:26px 30px 28px;display:flex;flex-direction:column;gap:14px}
.acard h3{display:flex;align-items:center;gap:12px;font-size:28px;font-weight:700}
.acard ul{list-style:none;display:flex;flex-direction:column;gap:10px}
.acard li{font-size:24px;line-height:1.35;padding-left:30px;position:relative;color:var(--ink)}
.acard li::before{content:"";position:absolute;left:3px;top:.5em;width:12px;height:12px;border-radius:50%;background:var(--faint)}
.acard.real li::before{background:var(--ok)} .acard.mock li::before{background:#D98A1F} .acard.ctrl li::before{background:var(--accent)}
.acard.real h3 .badge{background:var(--ok-bg);color:var(--ok)} .acard.mock h3 .badge{background:var(--warn-bg);color:var(--warn)}
.acard.ctrl{background:var(--ink);color:#fff;border:none}
.acard.ctrl li{color:#ECEAF5}
.acard.ctrl h3 .badge{background:rgba(255,255,255,.14);color:#fff}
.pipe{flex:1;margin-top:20px;display:flex;align-items:center;min-height:0}
.pgrid{width:100%;display:grid;row-gap:0;align-items:stretch}
.pstep{padding:20px 24px;border-radius:24px;background:#fff;border:2px solid var(--line);text-align:center;display:flex;flex-direction:column;gap:6px;justify-content:center;min-height:128px}
.pstep b{font-size:30px;font-weight:700;line-height:1.2}
.pstep span{font-size:23px;color:var(--muted);line-height:1.3}
.pstep.key{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 8%,#fff)}
.pstep.ok{border-color:var(--ok);background:var(--ok-bg)} .pstep.ok b{color:var(--ok)}
.parrow{display:grid;place-items:center;color:var(--accent);font-size:40px}
.pfall{display:flex;flex-direction:column;align-items:stretch}
.pfall .conn{align-self:center;width:0;height:40px;border-left:3px dashed var(--warn);position:relative}
.pfall .conn::after{content:attr(data-label);position:absolute;left:18px;top:8px;font:600 21px var(--mono);color:var(--warn);white-space:nowrap}
.pstep.fall{border-style:dashed;border-color:var(--warn);background:var(--warn-bg)}
.pstep.fall b{color:var(--warn)}

/* ---------- Quality ---------- */
.s-quality .inner{padding-top:72px}
.s-quality .head{margin-bottom:28px}
.s-quality h2.title{font-size:58px;margin-top:12px}
.s-quality .body{flex:1;display:grid;grid-template-columns:1fr 400px;gap:34px;min-height:0}
.ttable{padding:10px 8px;display:flex;flex-direction:column;min-height:0}
.trow{display:grid;grid-template-columns:96px 190px 1fr 190px;align-items:center;gap:20px;padding:0 28px;flex:1;border-bottom:1px solid var(--line);min-height:0}
.trow:last-child{border-bottom:0}
.trow.th{flex:none;height:62px;font:600 20px var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--faint)}
.trow .id{font:700 24px var(--mono);color:var(--accent)}
.trow .what{font-size:25px;line-height:1.28;min-width:0}
.trow .what b{display:block;font-weight:700}
.trow .what span{color:var(--muted);font-size:23px;display:block;margin-top:2px}
.tsum{display:flex;flex-direction:column;gap:22px}
.tsum .big{padding:36px 36px;flex:none}
.tsum .big b{display:block;font-size:112px;line-height:1;font-weight:800;letter-spacing:-.04em}
.tsum .big span{display:block;font-size:26px;color:var(--muted);margin-top:12px;line-height:1.35}
.tsum .legend{padding:28px 32px;font-size:24px;line-height:1.5;color:var(--muted);display:flex;flex-direction:column;gap:14px;flex:1;justify-content:center}
.tsum .legend div{display:flex;gap:12px;align-items:flex-start}
.tsum .legend .ico{margin-top:5px;font-size:26px;color:var(--ok)}

/* ---------- Metrics ---------- */
.s-metrics .grid{flex:1;display:grid;gap:28px;min-height:0;align-content:center}
.s-metrics .grid.c2{grid-template-columns:repeat(2,1fr)} .s-metrics .grid.c3{grid-template-columns:repeat(3,1fr)} .s-metrics .grid.c4{grid-template-columns:repeat(4,1fr)}
.mcard{padding:42px 40px;display:flex;flex-direction:column;gap:10px;min-height:320px;justify-content:flex-start;position:relative;overflow:hidden}
.mcard::before{content:"";position:absolute;left:0;top:0;width:100%;height:8px;background:var(--grad)}
.mcard .v{font-size:132px;line-height:1;font-weight:800;letter-spacing:-.045em;display:flex;align-items:baseline;gap:6px;font-variant-numeric:tabular-nums}
.mcard .v small{font-size:.42em;font-weight:700;letter-spacing:-.01em}
.mcard h3{font-size:31px;font-weight:700;line-height:1.2;margin-top:8px}
.mcard p{font-size:25px;color:var(--muted);line-height:1.4}
.s-metrics .note{flex:none;margin-top:26px;font-size:26px;color:var(--muted)}


/* ---------- Thanks ---------- */
.s-thanks .inner{flex-direction:row;align-items:center;gap:80px;padding:96px 130px}
.s-thanks .left{flex:1.1;display:flex;flex-direction:column;gap:36px;min-width:0}
.s-thanks h2{font-size:150px;line-height:1;font-weight:800;letter-spacing:-.04em;padding-bottom:8px}
.s-thanks .sub{font-size:42px;line-height:1.3;color:var(--muted);max-width:820px;text-wrap:balance}
.s-thanks .qa{display:inline-flex;align-self:flex-start;align-items:center;gap:18px;padding:20px 42px;border-radius:999px;background:var(--grad);color:#fff;font-size:50px;font-weight:700;box-shadow:0 26px 50px -22px var(--accent)}
.s-thanks .links{display:flex;flex-direction:column;gap:12px;font-size:28px}
.s-thanks .links div{display:flex;gap:14px;align-items:center}
.s-thanks .links .ico{color:var(--accent);font-size:32px}
.s-thanks .links b{font-family:var(--mono);font-weight:600;font-size:26px}
.s-thanks .right{flex:.62;display:flex;justify-content:center}
.s-thanks .qrcard{padding:40px;gap:22px}
.s-thanks .qrbox{width:460px;height:460px;padding:22px}
.s-thanks .qrcard .scan{font-size:34px}

/* ---------- Chế độ xuất / in: mỗi slide một trang 1920x1080 ---------- */
html.export,html.export body{height:auto;overflow:visible;background:#fff}
html.export #viewport{position:static;overflow:visible}
html.export #stage{position:static;transform:none!important;width:1920px;height:auto;box-shadow:none;overflow:visible}
html.export .slide{position:relative;opacity:1;visibility:visible;transform:none;transition:none;break-after:page;page-break-after:always;break-inside:avoid}
html.export .slide:last-child{break-after:auto;page-break-after:auto}
html.export .rv{animation:none!important;opacity:1;transform:none}
html.export #progress,html.export #hud,html.export #help,html.export #notes,html.export .livebtn{display:none!important}
@page{size:1920px 1080px;margin:0}
@media print{
  html,body{height:auto;overflow:visible;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  #viewport{position:static;overflow:visible}
  #stage{position:static;transform:none!important;width:1920px;height:auto;box-shadow:none;overflow:visible}
  .slide{position:relative;opacity:1;visibility:visible;transform:none;transition:none;break-after:page;page-break-after:always;break-inside:avoid}
  .slide:last-child{break-after:auto;page-break-after:auto}
  .rv{animation:none!important;opacity:1;transform:none}
  #progress,#hud,#help,#notes,.livebtn{display:none!important}
  .hl,h2.title strong,.s-solution .one strong,.scenario .stat b,.mcard .v{background:none!important;-webkit-text-fill-color:var(--accent)!important;color:var(--accent)!important}
  .scenario .stat b{-webkit-text-fill-color:#A99FFF!important;color:#A99FFF!important}
}
```

### 4.3. Ghi đè Xclipse và thành phần mới (đặt SAU khối 4.2)

```css
/* ===== GHI ĐÈ XCLIPSE (đặt sau CSS chép từ deck) ===== */
body{background:#DCE8F2}
.foot,.foot .num{color:var(--muted)}                       /* chân trang đủ tương phản */
em{font-family:var(--serif);font-style:italic;font-weight:700;letter-spacing:-.01em}   /* từ nhấn: Playfair Display Italic */
h2.title em{color:var(--navy-mid)}
.eyebrow{color:var(--navy-mid)}
.head .sub{margin-top:16px;font-size:30px;line-height:1.35;color:var(--muted);font-weight:500;max-width:1300px}   /* phụ đề: 1 dòng ≤ 12 từ */
.hl,h2.title strong,.s-solution .one strong{background:var(--grad-text);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}
.scenario,.acard.ctrl{background:var(--navy)}
.scenario .lab{color:#9FD4F5}
.scenario .stat b{background-image:linear-gradient(120deg,#9FD4F5,#FF9DB0)}
.scenario .stat span{color:#DCEAF6}
.todo{display:inline-block;padding:2px 14px;border:2px dashed var(--coral-ink);border-radius:12px;color:var(--coral-ink);font:600 .8em var(--mono)}  /* [SỐ: …] / [LINK: …] chưa có */

/* Khung điện thoại Xclipse: viền navy; chiều cao màn = ảnh 9:19,5 + thanh trạng thái 46px -> ảnh KHÔNG bị cắt đáy (thấy trọn thanh tab dưới) */
.pf{--bz:12px;--sb:46px;
  width:calc((var(--ph,800px) - 2*var(--bz) - var(--sb)) * 9 / 19.5 + 2*var(--bz));
  background:linear-gradient(155deg,#244A78 0%,#072D59 40%,#041A36 100%);
  box-shadow:0 0 0 2px rgba(253,110,136,.55),0 1px 0 1px rgba(255,255,255,.18) inset,var(--shadow-phone)}
.pf::before,.pf::after{background:#0E4A8A}
.pf::before{box-shadow:0 78px 0 #0E4A8A}
.pf-screen{--sb:46px;--sbg:#F5FBFF;--sbf:#072D59;background:linear-gradient(160deg,var(--ice-2),var(--ice))}
.pf-screen.dk{--sbg:#041226;--sbf:#E9F1FA}                  /* ảnh -dark: thêm class dk cho .pf-screen */
.pf-island{background:#02101F}
.pf-home{background:rgba(7,45,89,.55)}
.pf-screen.dk .pf-home{background:rgba(233,241,250,.6)}
.pf-screen.missing{background:repeating-linear-gradient(135deg,#EAF6FD 0 18px,#DBF2FC 18px 36px);outline:3px dashed var(--coral-ink);outline-offset:-10px}
.pf-screen.missing::after{color:var(--navy)}                /* hiện [ẢNH: tên-file] */

/* BÌA kính sọc dọc + quả cầu 3D hồng-xanh (lấy từ xclipse-ui-ux-tam-nhin.html). Chữ nằm vùng sáng bên trái, không đè lên cầu */
.s-cover.fl{background:
  radial-gradient(70% 34% at 14% 112%,#072D59 0%,#0C4B8E 42%,rgba(33,124,224,0) 82%),
  linear-gradient(125deg,#FFFFFF 0%,#EDF8FE 34%,#DBF2FC 66%,#BBE5FA 100%)}
.s-cover.fl::before{display:none}
.s-cover.fl .inner{z-index:5;padding:96px 120px 150px}
.s-cover.fl h1{color:var(--navy);-webkit-text-fill-color:var(--navy)}   /* tên dài: ≤10 ký tự 196px · 11–16 ký tự 140px · dài hơn cho 2 dòng 110px */
.s-cover.fl .tagline{color:var(--navy)}
.s-cover.fl .right{position:relative;z-index:5}
.cv-pane{position:absolute;top:0;right:0;bottom:0;width:50%;overflow:hidden;z-index:1;
  background:radial-gradient(560px 520px at 30% 48%,rgba(253,110,136,.35),transparent 68%),radial-gradient(760px 700px at 70% 52%,#0E4D92 0%,#072D59 55%,#041A36 100%)}
.cv-pane::before{content:"";position:absolute;inset:0 auto 0 0;width:150px;background:linear-gradient(90deg,rgba(219,242,252,.72) 0%,rgba(219,242,252,0) 100%);z-index:4;pointer-events:none}
.cv-orb{position:absolute;width:560px;height:560px;right:-60px;top:50%;transform:translateY(-48%);border-radius:50%;z-index:2;
  background:radial-gradient(circle at 28% 36%,#FFA8BA 0%,#FD6E88 26%,rgba(253,110,136,.25) 52%,transparent 72%),radial-gradient(circle at 68% 68%,#2C8DF5 0%,#0A3A75 55%,#03152B 100%);
  box-shadow:inset -28px -32px 60px rgba(3,21,43,.85),inset 18px 18px 46px rgba(253,110,136,.55),0 0 90px rgba(253,110,136,.28),-30px 20px 80px rgba(14,77,146,.55)}
.cv-streak{position:absolute;width:360px;height:560px;left:12%;top:50%;transform:translateY(-50%);z-index:2;pointer-events:none;filter:blur(22px);
  background:radial-gradient(ellipse at center,rgba(253,110,136,.82) 0%,rgba(253,110,136,.35) 45%,transparent 75%)}
.cv-flutes{position:absolute;inset:0 auto 0 0;width:58%;display:grid;grid-template-columns:repeat(8,1fr);z-index:3;pointer-events:none}
.flute-bar{display:block;height:100%;backdrop-filter:blur(16px) saturate(135%);-webkit-backdrop-filter:blur(16px) saturate(135%);
  background:linear-gradient(90deg,rgba(255,255,255,.22) 0%,rgba(219,242,252,.06) 28%,rgba(7,45,89,.16) 76%,rgba(255,255,255,.10) 100%);
  border-right:1px solid rgba(255,255,255,.16);box-shadow:inset 2px 0 6px rgba(255,255,255,.14)}

/* KẾT: nền navy + kính sọc, chữ trắng */
.s-thanks.nv{background:radial-gradient(900px 700px at 82% 50%,#0E4D92 0%,#072D59 55%,#041A36 100%)}
.s-thanks.nv::before{display:none}
.s-thanks.nv .cv-flutes{width:44%;left:auto;right:0}
.s-thanks.nv .inner{z-index:5}
.s-thanks.nv h2,.s-thanks.nv h2.title{color:#fff;-webkit-text-fill-color:#fff;background:none}
.s-thanks.nv .sub,.s-thanks.nv .links{color:#DCEAF6}
.s-thanks.nv .links .ico{color:#FF9DB0}
.s-thanks.nv .eyebrow{color:#9FD4F5}

/* GIẢ ĐỊNH · KỊCH BẢN · HÒA VỐN (thành phần mới, cùng token) */
.s-assume .inner{padding-top:60px}
.s-assume .head{margin-bottom:26px}
.s-assume h2.title{font-size:58px;margin-top:12px}
.s-assume .body{flex:1;display:grid;grid-template-columns:1.1fr 1fr;grid-template-rows:1fr 1fr;gap:26px;min-height:0}
.atable{grid-row:1/3;padding:14px 10px;display:flex;flex-direction:column;min-height:0}
.arow{display:grid;grid-template-columns:1fr 190px 230px;align-items:center;gap:18px;padding:0 26px;flex:1;border-bottom:1px solid var(--line);min-height:0}
.arow:last-child{border-bottom:0}
.arow.th{flex:none;height:58px;font:600 20px var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.arow .k{font-size:27px;line-height:1.3;font-weight:600}
.arow .v{font:700 40px/1 var(--font);font-variant-numeric:tabular-nums;color:var(--navy)}
.badge.src-btc{background:var(--ice);color:var(--navy)}
.badge.src-team{background:var(--warn-bg);color:var(--warn)}
.badge.src-mock{background:var(--soft);color:var(--muted)}
.scen{padding:26px 32px;display:flex;flex-direction:column;gap:16px;justify-content:center}
.scen h3{font-size:28px;font-weight:700}
.sbar{display:grid;grid-template-columns:150px 1fr 170px;align-items:center;gap:18px;font-size:26px}
.sbar .nm{font-weight:600}
.sbar .track{display:block;height:26px;border-radius:13px;background:var(--soft);overflow:hidden}
.sbar .fill{display:block;height:100%;border-radius:13px;background:var(--grad)}
.sbar.neg .fill{background:linear-gradient(90deg,var(--bad),var(--coral))}
.sbar .val{font:700 30px var(--font);font-variant-numeric:tabular-nums;text-align:right}
.be{padding:26px 34px;display:flex;flex-direction:column;justify-content:center;gap:8px;background:var(--navy);color:#fff;border:none}
.be .lab{font:600 21px var(--mono);letter-spacing:.14em;text-transform:uppercase;color:#9FD4F5}
.be .bigno{font-size:120px;font-weight:800;line-height:1;letter-spacing:-.04em;font-variant-numeric:tabular-nums;
  background:linear-gradient(120deg,#9FD4F5,#FF9DB0);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}
.be .formula{font:500 24px/1.4 var(--mono);color:#DCEAF6}
.be .promo{font-size:26px;font-weight:600;color:#FFD0D9}
/* Bảng 3 kịch bản dạng bảng (thay cho thanh): dùng lại .ttable/.trow, đổi cột */
.stable .trow{grid-template-columns:200px 1fr 1fr 1fr 220px}
.stable .trow .num{font:700 34px var(--font);font-variant-numeric:tabular-nums}
/* TRÍCH DẪN: 1 câu lớn Playfair italic */
.s-quote .inner{justify-content:center;align-items:flex-start;gap:36px}
.s-quote q{font:italic 700 74px/1.25 var(--serif);color:var(--navy);quotes:none;max-width:1400px;text-wrap:balance}
.s-quote .who{font-size:28px;color:var(--muted)}
/* Không dùng thanh cuộn/ô điều khiển khi xuất */
html.export .todo{display:inline-block}
```

### 4.4. Hệ icon Xclipse (54 icon nét 1,75, bo tròn, dấu nhật thực kín đáo)

Dùng `sprite.svg` đã đính kèm: chèn nguyên nội dung file vào đầu `<body>` (thẻ `<svg style="display:none">…</svg>`), rồi gọi icon bằng:

```html
<svg class="ico" aria-hidden="true"><use href="#xc-ticket"/></svg>       <!-- nét thường, màu = currentColor -->
<svg class="ico" aria-hidden="true"><use href="#xc-ticket-duo"/></svg>   <!-- duotone: nền 18% + 1 chấm coral -->
```

Tên icon có sẵn: `home dashboard chart-bar chart-line chart-pie calendar clock ticket wallet cart tag megaphone map-pin users user phone mail chat share link qr search filter sort list grid menu settings lock eye edit copy trash plus check close alert info help import export download upload file image moon sun refresh arrow-left arrow-right more ai-sparkle eclipse x-mark`. Quy tắc: icon cùng bộ trên cùng một slide (cùng nét, cùng cỡ), ≥ 28px trong thẻ, ≥ 36px trong ô `.ibox`; màu `currentColor` (navy hoặc `--accent`), chấm nhấn coral chỉ ở biến thể `-duo`. **Không** tự vẽ icon khác phong cách; nếu sprite chưa đính kèm, dùng nét 1,75 bo tròn trên lưới 24×24 và báo lại.

### 4.5. Mã HTML mẫu của từng bố cục (dùng đúng tên lớp)

Tên lớp slide: `s-cover` · `s-problem` (bối cảnh) · `s-phone` · `s-phones-2` · `s-phones-3` · `s-phone-steps` · `s-features` · `s-demo` · `s-flow`/`s-ai` (kiến trúc) · `s-quality` · `s-assume` (giả định) · `s-metrics` (kpi) · `s-quote` · `s-thanks` (kết). Mọi `<section class="slide …">` rộng 1920, cao 1080, chứa `<div class="inner">` và (trừ bìa/kết) `<footer class="foot">`.

```html
<!-- BÌA: chữ trái, ô phải navy + kính sọc + quả cầu 3D, điện thoại đặt đè lên -->
<section class="slide s-cover fl">
  <div class="cv-pane" aria-hidden="true"><div class="cv-streak"></div><div class="cv-orb"></div>
    <div class="cv-flutes"><i class="flute-bar"></i><i class="flute-bar"></i><i class="flute-bar"></i><i class="flute-bar"></i><i class="flute-bar"></i><i class="flute-bar"></i><i class="flute-bar"></i><i class="flute-bar"></i></div></div>
  <div class="inner">
    <div class="left">
      <div class="tag"><span class="chip grad">Đề Referral</span><span class="chip">Bảng B – Kinh tế</span><span class="chip">Chung kết 60 phút</span></div>
      <h1>Xclipse Referral</h1>
      <p class="tagline">Ứng dụng Referral cho doanh nghiệp hosting và domain</p>
      <div class="team">Đội <b>Xclipse</b> · {{TRUONG}} · VIBE-CODING 2026</div>
    </div>
    <div class="right"><div class="pf" style="--ph:880px"><div class="pf-screen missing" data-slot="01-tong-quan-mobile-light.png" data-missing="[ẢNH: 01-tong-quan-mobile-light.png]"><i class="pf-island"></i><div class="pf-sb"><span>9:41</span><i></i></div><i class="pf-home"></i></div></div></div>
  </div>
</section>

<!-- BỐI CẢNH: thẻ persona + gạch đầu dòng, thẻ tối bên phải chứa 1 số lớn -->
<section class="slide s-problem"><div class="inner">
  <header class="head"><div class="eyebrow">Bối cảnh</div><h2 class="title">Bối cảnh của <em>doanh nghiệp hosting/domain</em></h2><p class="sub">Chân dung người dùng và cách họ làm việc hiện nay</p></header>
  <div class="body">
    <div class="card persona"><div class="who"><div class="avatar">AB</div><div><h3>Chủ doanh nghiệp hosting/domain nhỏ</h3><p>Chủ doanh nghiệp, mở chương trình giới thiệu cho khách hiện tại</p></div></div>
      <ul class="pains"><li><svg class="ico"><use href="#xc-info"/></svg><span>B1 ≤ 14 từ</span></li><!-- 3–4 dòng --></ul></div>
    <div class="card scenario"><div class="lab">Con số chính · Giả định</div><q>Một câu mô tả tình huống có giờ/số</q>
      <div class="stat"><b>90.000đ</b><span>nhãn số + nguồn</span></div></div>
  </div>
  <footer class="foot"><span><b>Xclipse Referral</b></span><span class="num">02 / 11</span></footer>
</div></section>

<!-- ĐIỆN THOẠI + 3 GHIM: chữ trái (tiêu đề + 3 chú thích đánh số), 1 điện thoại phải -->
<section class="slide s-phone"><div class="inner">
  <div class="left"><header class="head"><div class="eyebrow">Giải pháp</div><h2 class="title">Giải pháp và <em>giao diện chính</em></h2></header>
    <ul class="callouts"><li class="card"><span class="n">1</span><div><h3>Chú thích 1 (≤ 8 từ)</h3><p>Ràng buộc → cách xử lý (≤ 14 từ)</p></div></li><!-- 2, 3 --></ul></div>
  <div class="right"><div class="pf"><span class="pf-pin" style="top:22%">1</span><span class="pf-pin" style="top:50%">2</span><span class="pf-pin" style="top:78%">3</span>
    <div class="pf-screen missing" data-slot="04-dang-ky-da-thanh-toan-mobile-light.png" data-missing="[ẢNH: 04-dang-ky-da-thanh-toan-mobile-light.png]"><i class="pf-island"></i><div class="pf-sb"><span>9:41</span><i></i></div><i class="pf-home"></i></div></div></div>
</div><footer class="foot"><span><b>Xclipse Referral</b></span><span class="num">03 / 11</span></footer></section>

<!-- 3 ĐIỆN THOẠI (ca thường / ca sai / ca biên) — dùng .s-phones-2 cho 2 máy; mỗi máy kèm chú thích .pcap -->
<section class="slide s-phones-3"><div class="inner">
  <div class="left"><header class="head"><div class="eyebrow">Demo</div><h2 class="title">Ca nhập sai, ca biên và <em>giao diện tối</em></h2></header>
    <ul class="plist"><li><svg class="ico"><use href="#xc-check"/></svg><span>Gạch ≤ 14 từ</span></li></ul></div>
  <div class="right">
    <div class="pcol"><div class="pf"><div class="pf-screen missing" data-slot="10-ca-sai-mobile-light.png" data-missing="[ẢNH: 10-ca-sai-mobile-light.png]"><i class="pf-island"></i><div class="pf-sb"><span>9:41</span><i></i></div><i class="pf-home"></i></div></div><div class="pcap">Ca nhập sai<small>Tự giới thiệu (trùng SĐT người giới thiệu) bị từ chối</small></div></div>
    <!-- máy 2 (11-ca-bien, light) và máy 3 (01-tong-quan, dark: thêm class "dk" cho .pf-screen) -->
  </div>
</div><footer class="foot"><span><b>Xclipse Referral</b></span><span class="num">07 / 11</span></footer></section>

<!-- LUỒNG 3 BƯỚC: 3 điện thoại + mũi tên (icon xc-arrow-right) + số bước -->
<section class="slide s-phone-steps"><div class="inner">
  <header class="head"><div class="eyebrow">Luồng sử dụng</div><h2 class="title">Luồng sử dụng <em>ba bước</em></h2></header>
  <div class="row">
    <div class="st"><span class="badge-n">1</span><div class="pf"><div class="pf-screen missing" data-slot="03-dang-ky-cho-mobile-light.png" data-missing="[ẢNH: 03-dang-ky-cho-mobile-light.png]"><i class="pf-island"></i><div class="pf-sb"><span>9:41</span><i></i></div><i class="pf-home"></i></div></div><h3>Tên bước 1</h3><p>≤ 10 từ</p></div>
    <div class="arr"><svg class="ico"><use href="#xc-arrow-right"/></svg></div>
    <!-- .st bước 2 (04-dang-ky-da-thanh-toan) · .arr · .st bước 3 (05-theo-doi) -->
  </div>
  <div class="card note"><svg class="ico"><use href="#xc-info"/></svg><span>Dòng ghi chú ≤ 14 từ (ví dụ nơi lưu dữ liệu)</span></div>
</div><footer class="foot"><span><b>Xclipse Referral</b></span><span class="num">05 / 11</span></footer></section>

<!-- TÍNH NĂNG: lưới 5 thẻ cùng một bộ icon -->
<section class="slide s-features"><div class="inner">
  <header class="head"><div class="eyebrow">Tính năng</div><h2 class="title">Năm tính năng của <em>Xclipse Referral</em></h2></header>
  <div class="grid">
    <article class="card fcard"><div class="top"><div class="ibox"><svg class="ico"><use href="#xc-ticket-duo"/></svg></div><span class="n">01</span></div><h3>Tên tính năng</h3><p>Đầu vào → quy tắc → kết quả (≤ 15 từ)</p></article>
    <!-- 02–05 tương tự (hàng 1: 3 thẻ span 2; hàng 2: 2 thẻ span 3) -->
  </div>
</div><footer class="foot"><span><b>Xclipse Referral</b></span><span class="num">04 / 11</span></footer></section>

<!-- DEMO TRÊN ĐIỆN THOẠI + QR: điện thoại phải, QR và ghi chú trái (class .dp trên .inner) -->
<section class="slide s-demo"><div class="inner dp">
  <div class="left"><header class="head"><div class="eyebrow">Bản chạy thật</div><h2 class="title">Bản chạy thật: <em>ca thông thường</em></h2></header>
    <div class="side"><div class="card qrcard"><div class="qrbox">[QR: https://xclipsex.github.io/Xclipse-ChungKet/]</div><div class="scan">Quét để dùng thử</div><div class="link">https://xclipsex.github.io/Xclipse-ChungKet/</div></div>
      <div class="card sidenote"><div>Thao tác 1 → 2 → 3 (mỗi cái ≤ 12 từ)</div><div>Dữ liệu mô phỏng AI · Dữ liệu mẫu</div></div></div></div>
  <div class="right"><div class="pf"><div class="pf-screen missing" data-slot="04-dang-ky-da-thanh-toan-mobile-light.png" data-missing="[ẢNH: 04-dang-ky-da-thanh-toan-mobile-light.png]"><i class="pf-island"></i><div class="pf-sb"><span>9:41</span><i></i></div><i class="pf-home"></i></div></div></div>
</div><footer class="foot"><span><b>Xclipse Referral</b></span><span class="num">06 / 11</span></footer></section>

<!-- KIẾN TRÚC (s-ai): 3 thẻ Thật / Mô phỏng / Kiểm soát + hàng 4 khối nối mũi tên; hoặc s-flow (4 vòng tròn nối nhau) -->

<!-- GIẢ ĐỊNH (s-assume, mới): bảng giả định trái; kịch bản phải trên; hòa vốn phải dưới -->
<section class="slide s-assume"><div class="inner">
  <header class="head"><div class="eyebrow">Giả định</div><h2 class="title">Giả định và <em>cách tính</em></h2><p class="sub">Bảng giá trị, nguồn và ba kịch bản</p></header>
  <div class="body">
    <div class="card atable">
      <div class="arow th"><span>Giả định</span><span>Giá trị</span><span>Nguồn</span></div>
      <div class="arow"><span class="k">Thành viên hiện có</span><span class="v">[SỐ: giá trị]</span><span><span class="badge src-btc">Dữ liệu mẫu (BTC)</span></span></div>
      <div class="arow"><span class="k">Tỉ lệ chuyển đổi</span><span class="v">[SỐ: giá trị]</span><span><span class="badge src-team">Giả định</span></span></div>
      <!-- tối đa 4 dòng -->
    </div>
    <div class="card scen"><h3>Ba kịch bản</h3>
      <div class="sbar"><span class="nm">Lạc quan</span><span class="track"><i class="fill" style="width:90%"></i></span><b class="val">[SỐ: lãi]</b></div>
      <div class="sbar"><span class="nm">Cơ sở</span><span class="track"><i class="fill" style="width:60%"></i></span><b class="val">[SỐ: lãi]</b></div>
      <div class="sbar neg"><span class="nm">Bi quan</span><span class="track"><i class="fill" style="width:25%"></i></span><b class="val">[SỐ: lãi/lỗ]</b></div></div>
    <div class="card be"><div class="lab">Điểm hòa vốn</div><div class="bigno hl">60.000đ/khách</div>
      <p class="formula">Hòa vốn = Chi phí cố định / (Giá − Biến phí)</p><p class="promo">Ưu đãi lỗ khi tổng ưu đãi mỗi khách vượt 90.000đ (chi phí quảng cáo)</p></div>
  </div>
</div><footer class="foot"><span><b>Xclipse Referral</b></span><span class="num">10 / 11</span></footer></section>

<!-- KIỂM THỬ (s-quality), KPI (s-metrics: 3–4 thẻ số lớn có nhãn nguồn), TRÍCH DẪN (s-quote: 1 câu, Playfair italic), KẾT (s-thanks nv: nền navy kính sọc, QR + liên hệ + chip công cụ AI) -->
```


## 5. DỮ LIỆU CỦA SẢN PHẨM (đã điền)

- Tên: **Xclipse Referral** · Tagline: Ứng dụng Referral cho doanh nghiệp hosting và domain · Đề: Xclipse Referral – Chương trình thành viên giới thiệu khách cho doanh nghiệp hosting/domain · Bảng B – Kinh tế · Trường {{TRUONG}}
- Người dùng: chủ doanh nghiệp hosting/domain và thành viên (khách hiện tại). Việc hằng ngày: tìm khách mới bằng quảng cáo trả phí. Chi phí hiện tại: 90.000đ cho mỗi khách mới (nguồn: Giả định BTC, nhãn `Dữ liệu mẫu (BTC)`).
- Năm tính năng: 1) Thành viên: đăng ký tên + SĐT, sinh mã REF và link `?ref=`, sao chép link 2) Đăng ký qua mã (mô phỏng): khách nhập mã, chọn gói, "Đang chờ thanh toán", bấm "Mô phỏng thanh toán thành công" thì cộng ưu đãi hai phía 3) Theo dõi thành viên: số khách đã giới thiệu, trạng thái từng khách, tổng ưu đãi tầng 1 và tầng 2 4) Thể lệ: ưu đãi hai phía, điều kiện thanh toán thành công, chống gian lận, bảng giá, tầng 2 5) Dự phóng: bảng giả định nhập được, 3 kịch bản, biểu đồ theo tháng, công thức hiển thị cạnh bảng.
- Quy tắc nghiệp vụ nổi bật: ưu đãi chỉ cộng khi khách thanh toán thành công: 30.000đ cho người giới thiệu + 30.000đ cho khách mới (BTC), thêm 10.000đ tầng 2 (giả định của đội). Ca sai demo: tự giới thiệu (SĐT trùng người giới thiệu) bị từ chối, trạng thái "Không hợp lệ – tự giới thiệu". Ca biên demo: khách đã có (SĐT trùng) bị từ chối, trạng thái "Từ chối – trùng"; mã sai thì báo lỗi.
- Số BTC (nhãn `Dữ liệu mẫu (BTC)`): 1.200 thành viên · 15% tham gia · 2 lượt giới thiệu/người · 25% chuyển đổi · 180.000đ doanh thu TB/khách tháng đầu · ưu đãi 30.000đ + 30.000đ · quảng cáo 90.000đ/khách.
- Kết quả tính (đúng như dán, không làm tròn khác): 180 người tham gia → 360 lượt khách tiềm năng → **90 khách mới** → doanh thu tháng đầu **16,2 triệu đồng** → chi phí ưu đãi **5,4 triệu đồng** → tỉ lệ doanh thu/chi phí **3,0x**. Chi phí referral **60.000đ/khách** so với quảng cáo 90.000đ/khách → **tiết kiệm 30.000đ/khách**.
- Giả định của đội (nhãn `Giả định`): ưu đãi tầng 2 = 10.000đ (khoảng 1/3 tầng 1; tổng 70.000đ vẫn dưới 90.000đ quảng cáo) · tăng trưởng 10%/tháng, dự phóng 6 tháng.
- Bảng giá gói (nhãn `Dữ liệu mẫu (BTC)`): Hosting Mini 99.000đ · Cơ bản 149.000đ · Pro 279.000đ mỗi tháng · Domain .vn 59.000đ · Domain .com 420.000đ mỗi năm.
- Kịch bản (3): Cơ sở = số BTC ở trên; Lạc quan và Bi quan = `[SỐ: lãi lạc quan]`, `[SỐ: lãi bi quan]` (đội chưa chốt, không bịa). Hòa vốn: mỗi khách referral chi 60.000đ, doanh thu tháng đầu 180.000đ, công thức chữ "Doanh thu tháng đầu mỗi khách − Ưu đãi mỗi khách". Ưu đãi lỗ khi: tổng ưu đãi mỗi khách vượt 90.000đ (không còn rẻ hơn quảng cáo) hoặc vượt doanh thu tháng đầu.
- Dự phóng 6 tháng: số theo tháng `[SỐ: khách mới từng tháng]`, `[SỐ: doanh thu lũy kế 6 tháng]` (nhãn `Giả định`, không bịa).
- Nhãn mô phỏng (nguyên văn): `Dữ liệu mô phỏng AI · Dữ liệu mẫu` · Link demo: https://xclipsex.github.io/Xclipse-ChungKet/ · Mã nguồn: [LINK: mã nguồn]
- Công cụ AI đội dùng: Claude (Opus, Sonnet, Haiku, Claude Design) và Gemini Antigravity. Trong sản phẩm: đăng ký, thanh toán và dữ liệu là **mô phỏng 100%, lưu cục bộ trong trình duyệt**; không dùng AI thật, không có khóa API trong mã. Không ghi "AI thật" ở bất kỳ slide nào.
- Kiểm thử: số ca đạt/tổng chưa đo xong, để `[SỐ: ca đạt]` / `[SỐ: tổng ca]` / `[SỐ: ca lỗi được chặn]`.
- Số chưa có: để `[SỐ: mô tả]`. Số đã có: dùng đúng như dán ở đây, **không làm tròn khác, không thêm số mới**.

## 6. BẢNG SLOT ẢNH (TÊN FILE CỐ ĐỊNH — Claude Design chỉ dùng đúng các tên này)

**Quy ước tên:** `NN-ten-slot-mobile-light.png` / `NN-ten-slot-mobile-dark.png` (390×844 @3x = 1170×2532, ảnh điện thoại DỌC 9:19,5). **`NN` là số thứ tự slot trong bảng này, không phải số slide.** Bản 360px: `NN-ten-slot-mobile360-light.png`.

| NN | Tên slot (màn hình) | Màn hình / trạng thái chụp | Dùng ở slide (12) |
|---|---|---|---|
| 00 | `00-demo-video` | Video dọc `00-demo-video.mp4` (≤ 2:00) + ảnh bìa `00-demo-video-poster.png` (1080×1920) | slide 4 `video-demo` |
| 01 | `01-tong-quan` (home) | Tab Tổng quan, đã nạp dữ liệu mẫu BTC | bìa (1) |
| 02 | `02-thanh-vien` (members) | Tab Thành viên: đã đăng ký, mã REF + nút sao chép link | giải pháp (3), tính năng 1 |
| 03 | `03-dang-ky-cho` (signup-pending) | Tab Đăng ký qua mã: trạng thái "Đang chờ thanh toán" | luồng bước 1 (6) |
| 04 | `04-dang-ky-da-thanh-toan` (signup-paid) | Sau "Mô phỏng thanh toán thành công": "Đã chuyển đổi", ưu đãi hai phía | luồng bước 2 (6), demo (7) |
| 05 | `05-theo-doi` (tracking) | Tab Theo dõi: chọn thành viên, danh sách khách, chip trạng thái, tổng ưu đãi | luồng bước 3 (6) |
| 06 | `06-the-le` (rules) | Tab Thể lệ: ưu đãi, điều kiện, chống gian lận, bảng giá | thể lệ (8) |
| 07 | `07-du-phong` (forecast) | Tab Dự phóng: bảng giả định mặc định BTC và kết quả 90 khách / 16,2 tr / 5,4 tr / 3,0x | dự phóng (11) |
| 08 | `08-du-phong-cong-thuc` (forecast-formula) | Dự phóng: khối công thức + giả định cạnh bảng, 3 kịch bản | dự phóng (11) |
| 09 | `09-du-phong-bieu-do` (chart) | Dự phóng: biểu đồ theo tháng (6 tháng) | dự phóng (11) |
| 10 | `10-ca-sai` | Ca sai: tự giới thiệu bị từ chối, thông báo dưới ô, không lưu | thể lệ (8) |
| 11 | `11-ca-bien` | Ca biên: khách trùng bị từ chối ("Từ chối – trùng") | thể lệ (8) |

Mỗi slot có bản sáng; bản tối (`-mobile-dark.png`) chỉ khi đội chụp. Tất cả là ô điện thoại dọc 9:19,5. Không tạo tên slot khác.

## 7. SPEC TỪNG SLIDE (BẢN 12 SLIDE, 10 PHÚT; có ghi chú bản 8 và 6 slide ở cuối)

**Ký hiệu:** `DA` Diệu Anh · `Dũng` Vũ Trí Dũng · `Ng` Nguyên. Chỗ có `*từ*` là từ nhấn Playfair italic. **Số** là điểm tựa; slide có điện thoại thì số hiện dạng "số nhấn" 56–72px. Mọi tiêu đề theo kiểu đặt tên (mục 3.1). Phần vai trò: DA = bối cảnh, người dùng, UI/UX; Dũng = video demo, 5 tính năng, nghiệp vụ; Ng = giả định và mô hình kinh doanh, kỹ thuật, tổng kết.

### 7.0. SLIDE VIDEO (`s-video`, slide 4, đặt NGAY TRƯỚC slide tính năng)

- **Bố cục:** khung video dọc 9:16 (cao ≈ 800px, bo 34px) bên phải; tiêu đề + 2–3 chú thích đánh số bên trái (dùng `.callouts`, lớp `.vbox` như `deck/deck.html`).
- **Khi trình chiếu:** video tự phát khi tới slide, tắt tiếng, lặp, không thanh điều khiển; ảnh bìa `00-demo-video-poster.png` làm poster.
- **Khi xuất PDF/PNG:** ảnh bìa + biểu tượng play + dòng "Xem video: docs/minh-chung/demo-xclipse-referral.mp4". **Khi xuất PPTX:** nhúng `00-demo-video.mp4` vào khung (nếu không được thì ảnh bìa + liên kết).
- Thiếu file thì để ô trống có chữ nhắc, không bịa ảnh. Chú thích ≤ 12 từ, kiểu định danh, có nhãn `Dữ liệu mô phỏng AI · Dữ liệu mẫu`.

### 7A. Bản 12 slide (10 phút)

| # | Id | Người | Bố cục | Tiêu đề | Phụ đề | Gạch đầu dòng (số gạch · ≤ 14 từ) | Số | Ảnh | Giờ (cứng) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `bia` | DA | `s-cover fl` | `Xclipse Referral` | Ứng dụng Referral cho doanh nghiệp hosting và domain | 0 gạch; chip: Đề Referral · Bảng B – Kinh tế · Chung kết 60 phút | không (ảnh là điểm tựa) | `01-tong-quan-mobile-light.png` | 00:00–00:35 |
| 2 | `boi-canh` | DA | `s-problem` | Bối cảnh *doanh nghiệp hosting* | Chân dung chủ doanh nghiệp và cách tìm khách hiện nay | 4 gạch: Chủ doanh nghiệp hosting/domain nhỏ, khách dùng điện thoại · Khách hiện tại là kênh bán chưa khai thác · Tìm khách mới chủ yếu bằng quảng cáo trả phí · Mỗi khách mới tốn 90.000đ quảng cáo | `90.000đ`/khách quảng cáo (≥ 120px) · nhãn `Dữ liệu mẫu (BTC)`; câu tình huống: "Mỗi khách mới từ quảng cáo tốn 90.000đ trước khi họ trả đồng nào." | — | 00:35–01:30 |
| 3 | `giai-phap` | DA | `s-phone` | Giải pháp và *giao diện chính* | Xclipse Referral giúp chủ doanh nghiệp biến khách hiện tại thành kênh bán | 3 chú thích ràng buộc → xử lý: "Một tay trên điện thoại → nút chính dính đáy màn hình" · "Nhiều việc, màn nhỏ → sáu tab ở thanh tab dưới" · "Số tiền dễ nhầm → hiển thị vi-VN, chip trạng thái màu" | `60.000đ`/khách referral (số nhấn) · nhãn `Giả định` | `02-thanh-vien-mobile-light.png` | 01:30–02:20 |
| 4 | `video-demo` | Dũng | `s-video` | Xem app *chạy thật* | Video dọc trên điện thoại, dữ liệu mẫu | 3 gạch ≤ 12: Đăng ký thành viên, nhận mã REF · Khách nhập mã, thanh toán mô phỏng · Theo dõi ưu đãi hai phía | `[SỐ: giây video]` giây | `00-demo-video.mp4` + `00-demo-video-poster.png` | 02:20–03:05 |
| 5 | `tinh-nang` | Dũng | `s-features` | Năm tính năng của *Xclipse Referral* | Việc từng tính năng đảm nhận | 5 thẻ (tên ≤ 4 từ + ≤ 15 từ theo đầu vào → quy tắc → kết quả): 01 Thành viên · 02 Đăng ký qua mã · 03 Theo dõi · 04 Thể lệ · 05 Dự phóng; thêm 1 dòng quy tắc: ưu đãi chỉ cộng khi thanh toán thành công, 30.000đ + 30.000đ | `5` tính năng chạy thật (≥ 120px) | — | 03:05–03:50 |
| 6 | `luong` | Dũng | `s-phone-steps` | Luồng *giới thiệu khách* | Từ nhập mã đến ưu đãi được ghi nhận | 3 bước (tên ≤ 4 từ + ≤ 10 từ): 1 Nhập mã, chờ thanh toán · 2 Thanh toán thành công (mô phỏng) · 3 Theo dõi ưu đãi; ghi chú: dữ liệu lưu cục bộ trong trình duyệt | `[SỐ: giây cả luồng]` (số nhấn) | `03-dang-ky-cho` · `04-dang-ky-da-thanh-toan` · `05-theo-doi` (-mobile-light.png) | 03:50–04:25 |
| 7 | `demo-thuong` | Dũng | `s-demo` | Bản chạy thật: *ca thông thường* | Ba thao tác trên điện thoại | 3 thao tác ≤ 12: Nhập mã REF, chọn gói · Bấm "Mô phỏng thanh toán thành công" · Mở Theo dõi, xem ưu đãi; QR + `https://xclipsex.github.io/Xclipse-ChungKet/`; nhãn `Dữ liệu mô phỏng AI · Dữ liệu mẫu` | `[SỐ: giây phản hồi]` giây (số nhấn) | `04-dang-ky-da-thanh-toan-mobile-light.png` | 04:25–05:25 |
| 8 | `the-le` | Dũng | `s-phones-3` | Thể lệ và *chống gian lận* | Quy định ưu đãi và ba trạng thái từ chối | 3 chú thích dưới máy ≤ 10: Thể lệ · Ca sai: tự giới thiệu bị từ chối · Ca biên: khách trùng bị từ chối; 2 gạch ≤ 14: ưu đãi 30.000đ + 30.000đ, tầng 2 10.000đ; mã sai báo lỗi, không lưu dữ liệu sai | `[SỐ: ca lỗi được chặn]` ca lỗi được chặn (số nhấn) | `06-the-le` · `10-ca-sai` · `11-ca-bien` (-mobile-light.png) | 05:25–06:15 |
| 9 | `kien-truc` | Ng | `s-ai` | Kiến trúc và *kiểm thử* | Bốn khối, ranh giới thật/mô phỏng và kết quả kiểm thử | 3 thẻ **Thật · Mô phỏng · Kiểm soát** (2–3 gạch ≤ 12): Thật = logic referral.js, tính dự phóng, lưu cục bộ · Mô phỏng = thanh toán, đăng ký, dữ liệu BTC · Kiểm soát = quét khóa, test luồng chính; hàng 4 khối: Giao diện → Logic referral → Mô phỏng thanh toán → Lưu trong trình duyệt; không có khóa API trong mã; nhãn `Dữ liệu mô phỏng AI · Dữ liệu mẫu`; chip công cụ AI: Claude (Opus, Sonnet, Haiku, Design), Gemini Antigravity | `[SỐ: ca đạt]/[SỐ: tổng ca]` ca đạt (≥ 120px) | — | 06:15–07:05 |
| 10 | `gia-dinh` | Ng | `s-assume` | Giả định và *cách tính* | Bảng giá trị, nguồn và ba kịch bản | Bảng 4 giả định: Thành viên hiện có 1.200 (`Dữ liệu mẫu (BTC)`) · Tỉ lệ chuyển đổi 25% (`Dữ liệu mẫu (BTC)`) · Doanh thu TB/khách tháng đầu 180.000đ (`Dữ liệu mẫu (BTC)`) · Ưu đãi tầng 2 10.000đ (`Giả định`); 3 thanh kịch bản: Cơ sở 90 khách mới, 16,2 tr; Lạc quan `[SỐ: …]`; Bi quan `[SỐ: …]`; hòa vốn bằng chữ; "Ưu đãi lỗ khi tổng ưu đãi mỗi khách vượt 90.000đ"; 1 giới hạn nói thẳng ≤ 14 từ: số liệu là giả định, chưa đo khách thật | `60.000đ`/khách referral so với `90.000đ` quảng cáo, tiết kiệm `30.000đ`/khách (≥ 120px ở thẻ hòa vốn) | — | 07:05–08:05 |
| 11 | `du-phong` | Ng | `s-phones-3` | Dự phóng *6 tháng* | Kết quả, công thức và biểu đồ theo tháng | 3 chú thích dưới máy ≤ 10: Kết quả tháng đầu · Công thức và giả định · Biểu đồ 6 tháng; 3 gạch ≤ 14: 180 tham gia → 360 tiềm năng → 90 khách mới · doanh thu 16,2 tr, ưu đãi 5,4 tr · tỉ lệ 3,0x, tăng trưởng 10%/tháng (`Giả định`) | `3,0x` doanh thu/chi phí ưu đãi (số nhấn) · nhãn `Dữ liệu mẫu (BTC)` | `07-du-phong` · `08-du-phong-cong-thuc` · `09-du-phong-bieu-do` (-mobile-light.png) | 08:05–09:00 |
| 12 | `ket` | Ng | `s-thanks nv` | Tổng kết và *bước tiếp theo* | Kết quả, giới hạn, hướng làm tiếp | 3 gạch ≤ 14: kết quả đã đo (ca đạt `[SỐ: ca đạt]`/`[SỐ: tổng ca]`; 3,0x) · giới hạn: số liệu mô phỏng/giả định, chưa có khách thật · bước tiếp theo: thử với khách thật, đo lại tỉ lệ chuyển đổi; QR + `https://xclipsex.github.io/Xclipse-ChungKet/`; `[LINK: mã nguồn]`; chip "Hỏi đáp" | `3,0x` | — | 09:00–09:45 |
| P1 | `bang-cue` | — | thẻ bảng, **ẩn khi trình chiếu** | Bảng hiệu lệnh cho kỹ thuật viên | Câu nói → thao tác | Bảng: "Mời chuyển slide" = sang slide kế · "Mời lùi một slide" = lùi · "Mời phát video demo" = bật video · "Mời quay lại slide" = tắt video · "Mời chuyển đến slide N" = nhảy; liệt kê slide cuối của từng người (DA: 3 · Dũng: 8 · Ng: 12) | — | — | phụ lục |
| P2 | `du-phong-a` | — | `s-phones-3` | Dự phòng: thành viên và đăng ký | Ảnh màn hình còn lại | 3 máy, chú thích ≤ 8 từ | — | `01-tong-quan` · `02-thanh-vien` · `03-dang-ky-cho` (-mobile-light.png) | phụ lục |
| P3 | `du-phong-b` | — | `s-phones-3` | Dự phòng: theo dõi và thể lệ | Ảnh màn hình còn lại | 3 máy, chú thích ≤ 8 từ | — | `05-theo-doi` · `06-the-le` · `04-dang-ky-da-thanh-toan` (-mobile-light.png) | phụ lục |

### 7B. Bản cắt 8 slide (khoảng 7 phút) — dựng sau, trong cùng dự án, nếu được yêu cầu

1 `bia-boi-canh` (DA, `s-cover fl`, gộp slide 1+2, số 90.000đ) · 2 `giai-phap` (DA, như slide 3) · 3 `video-demo` (Dũng) · 4 `tinh-nang-luong` (Dũng, `s-phone-steps`, gộp 5+6, ghi chú liệt kê 5 tính năng) · 5 `the-le-demo` (Dũng, `s-phones-3`: `04-dang-ky-da-thanh-toan` · `10-ca-sai` · `11-ca-bien`, QR + link) · 6 `gia-dinh` (Ng, như slide 10; **không bỏ**) · 7 `du-phong` (Ng, như slide 11) · 8 `ket-ky-thuat` (Ng, `s-thanks nv`, gộp 9+12: 2 gạch kiến trúc/kiểm thử + nhãn mô phỏng). Mốc giờ phân lại cho vừa 7 phút, giữ mốc cứng của run-sheet.

### 7C. Bản cắt 6 slide (khoảng 5 phút) — dựng sau, nếu được yêu cầu

1 `bia-boi-canh-giai-phap` (DA, `s-cover fl`, 90.000đ → 60.000đ) · 2 `video-demo` (Dũng) · 3 `tinh-nang-demo` (Dũng, `s-phones-3`: `04-dang-ky-da-thanh-toan` · `10-ca-sai` · `06-the-le`, QR + link) · 4 `gia-dinh` (Ng, như slide 10; **không bao giờ bỏ**) · 5 `du-phong` (Ng, một máy `07-du-phong` + số 3,0x) · 6 `ket-kiem-thu` (Ng, `s-thanks nv`: ca đạt `[SỐ: ca đạt]`/`[SỐ: tổng ca]`, nhãn mô phỏng, QR, "Hỏi đáp"). Phụ lục P1–P3 giữ nguyên.

## 8. GHI CHÚ NGƯỜI NÓI (BẮT BUỘC MỖI SLIDE, 5 DÒNG)

Đặt trong **speaker notes** của từng slide (và đưa vào PPTX), đúng khuôn:

```
1. Người nói: <Diệu Anh | Vũ Trí Dũng | Nguyên>
2. Mốc giờ: <mm:ss–mm:ss> (cứng <mm:ss>)
3. 3 neo: V <1 câu vấn đề, ≤ 12 từ> · T <1 thao tác/điểm nhấn, ≤ 12 từ> · S <1 con số, đã in to trên slide>
4. Cue kỹ thuật: <câu hiệu lệnh nói to khi xong slide>
5. Chuyền mic: <1 câu cố định> (chỉ ở slide cuối của mỗi người; còn lại ghi "—")
```

**Câu hiệu lệnh chuẩn (người nói nói to, rõ, ngay sau con số S, rồi dừng 1 giây chờ slide đổi):**
- Chuyển tiếp: **"Mời chuyển slide."** (dùng cho hầu hết slide).
- Lùi: **"Mời lùi một slide."** · Nhảy: **"Mời chuyển đến slide 10."** (khi Nguyên chọn bản rút gọn 8 hoặc 6 slide).
- Demo: **"Mời phát video demo."** (bắt đầu) và **"Mời quay lại slide."** (kết thúc); bản chạy thật: **"Mời mở bản chạy thật."**
- Slide cuối mỗi người: câu chuyền mic **rồi** "Mời chuyển slide." để slide của người kế đã sẵn khi họ mở lời.

Ví dụ ghi chú slide 3 (Diệu Anh): `Người nói: Diệu Anh` / `Mốc giờ: 01:30–02:30 (cứng 02:35)` / `3 neo: V giải pháp một câu · T chỉ ba ghim số trên điện thoại · S [SỐ: số thao tác từ nhập mã đến chuyển đổi]` / `Cue kỹ thuật: Mời chuyển slide.` / `Chuyền mic: Em xin gửi Dũng đi vào đăng ký qua mã và mô phỏng thanh toán và làm thử ngay cho mọi người xem.`

## 9. ĐẦU RA VÀ TỰ KIỂM (làm trước khi trả lời)

1. Trả về **deck chỉnh sửa được** trong dự án (HTML hoặc định dạng slide gốc của Claude Design), đúng số slide của bản đã chọn, **cộng** phụ lục P1–P3. Mỗi ô ảnh là điện thoại dọc trống ghi `[ẢNH: tên-file]` với `data-slot="tên-file"`; mỗi số chưa có là `[SỐ: …]`.
2. Cuối trả lời, in **bảng kiểm** (đạt/không đạt kèm chỗ sửa): đủ số slide · mọi slide có ghi chú 5 dòng · tiêu đề theo kiểu đặt tên (liệt kê tiêu đề) · không từ cấm · số gạch 3–5 và ≤ 14 từ · mỗi slide 1 điểm tựa · ≤ 3 điện thoại · không ảnh ngang · tương phản AA · dấu tiếng Việt · lề ≥ 72px · danh sách slot ảnh (tên file) khớp mục 6 · danh sách `[SỐ: …]` còn trống.
3. Không thêm slide, tính năng, số liệu ngoài dữ liệu mục 5. Thiếu thông tin thì để ô `[SỐ: …]`/`[LINK: …]`, không bịa.
`````

## PHẦN 2 — CHÈN ẢNH VÀ CẬP NHẬT SỐ (gửi ở T+50, cùng dự án)

`````markdown
# PHẦN 2 — CHÈN ẢNH VÀ CẬP NHẬT SỐ (cùng dự án, sau khi tải ZIP lên)

Tôi cũng tải lên **`00-demo-video.mp4`** và **`00-demo-video-poster.png`**: hãy chèn video vào slide `video-demo` (chèn media, tự phát khi chiếu, tắt tiếng, lặp; ảnh bìa làm poster); xuất PDF/PNG phải có ảnh bìa + nút play + dòng "Xem video: docs/minh-chung/demo-xclipse-referral.mp4"; PPTX nhúng mp4.

Tôi đã tải lên tệp **`xclipse-referral-slide-anh.zip`** (ảnh chụp thật của app, **chỉ ảnh điện thoại dọc**) và `manifest.txt`. Hãy **chèn ảnh vào đúng ô trong bộ slide hiện có**, theo các quy tắc sau:

1. **Ghép theo TÊN FILE, không theo thứ tự.** Mỗi ô `[ẢNH: tên-file.png]` nhận đúng file trùng tên (so khớp chính xác, kể cả `-light`/`-dark`/`mobile360`). Chỉ dùng ảnh ở **thư mục gốc của ZIP** (ảnh 390px); thư mục `360/` chỉ dùng cho các ô ghi `mobile360`; thư mục `desktop/` **không** đưa vào slide.
2. **Giữ nguyên bố cục, kích thước khung, font, chữ.** Không cắt ảnh, không kéo giãn, không đổi tỉ lệ. Ảnh đặt đủ chiều dọc trong khung điện thoại (khung đã đúng tỉ lệ 9:19,5). Ảnh `-dark` đặt vào khung có class `dk` (thanh trạng thái tối).
3. **Kiểm từng ảnh:** tỉ lệ rộng/cao nằm trong 0,458–0,466 (≈ 9:19,5) — sai tỉ lệ thì **không chèn**, để ô trống đánh dấu viền đỏ và báo lại. Ảnh lộ khóa API, email, tên người thật hoặc thông báo lỗi lạ thì không chèn và báo.
4. **Báo cáo thiếu:** lập bảng `slot | tên file mong đợi | trạng thái (đã chèn / thiếu trong ZIP / sai tỉ lệ / nghi ngờ nội dung) | slide bị ảnh hưởng`. **Không bịa ảnh, không dùng ảnh thay thế khác slot.**
5. **Cập nhật số (nếu tôi dán thêm bên dưới):** thay các `[SỐ: …]` bằng giá trị tôi cung cấp, giữ nguyên nhãn nguồn; số nào tôi không cung cấp thì để nguyên `[SỐ: …]` và liệt kê lại.
6. **Chạy lại bảng kiểm Phần 1 mục 9**, cộng: không còn chuỗi `[ẢNH:` (trừ ô thiếu đã báo), không còn `{{`, ghi chú người nói còn đủ 5 dòng ở mọi slide.
7. **Xuất:** (a) PDF 1 trang/slide 1920×1080 gồm phụ lục, (b) PPTX giữ ghi chú, (c) PNG từng slide. Báo số trang PDF = số slide + phụ lục.

Số cập nhật (điền nếu có): `[SỐ: ca đạt] = … · [SỐ: tổng ca] = … · [SỐ: ca lỗi được chặn] = … · [SỐ: giây video] = … · [SỐ: giây cả luồng] = … · [SỐ: giây phản hồi] = … · [SỐ: lãi lạc quan] = … · [SỐ: lãi bi quan] = … (điền số đã đo từ docs/BANG-KIEM-THU.md)`
`````
