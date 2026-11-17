/* Thể lệ chương trình giới thiệu. Số liệu lấy từ EP.referral khi có. */
(function (root) {
  'use strict';
  var EP = root.EP, esc = EP.esc;
  var DEF_RULES = { rewardReferrer: 30000, rewardNew: 30000, tier2Reward: 10000, maxPerMonth: 20 };
  var DEF_PRICES = [{ service: 'Hosting Mini', price: 99000 }, { service: 'Hosting Cơ bản', price: 149000 }, { service: 'Hosting Pro', price: 279000 }, { service: 'Domain .vn', price: 59000 }, { service: 'Domain .com', price: 420000 }];
  var DEF_STATUS = { converted: 'Đã chuyển đổi', pending: 'Đang chờ thanh toán', processing: 'Đang xử lý', cancelled: 'Đã hủy', invalid_self: 'Không hợp lệ – tự giới thiệu', rejected_dup: 'Từ chối – trùng', reviewing: 'Đang rà soát' };
  var MEANING = {
    converted: 'Khách đã thanh toán thành công. Ưu đãi được cộng.', pending: 'Đã ghi nhận đăng ký, chưa thanh toán. Chưa cộng ưu đãi.',
    processing: 'Giao dịch đang xử lý. Chưa cộng ưu đãi.', cancelled: 'Đăng ký bị hủy. Không cộng ưu đãi.',
    invalid_self: 'Người giới thiệu trùng khách. Không tính.', rejected_dup: 'Khách đã được ghi nhận trước đó. Chỉ tính 1 lần.', reviewing: 'Đội vận hành đang rà soát. Chưa cộng ưu đãi.'
  };
  function get() {
    var r = EP.referral || {};
    return { rules: Object.assign({}, DEF_RULES, r.RULES || {}), prices: r.PRICES || DEF_PRICES, status: r.STATUS_LABEL || DEF_STATUS };
  }
  function m(n) { return EP.fmt.money(n); }
  function sections() {
    var d = get(), R = d.rules, total = R.rewardReferrer + R.rewardNew;
    return [
      { id: 'two', title: 'Ưu đãi 2 phía', items: ['Người giới thiệu nhận ' + m(R.rewardReferrer) + ' cho mỗi khách mới thanh toán thành công.', 'Khách mới được giảm ' + m(R.rewardNew) + ' trên hóa đơn.', 'Tổng ưu đãi mỗi khách: ' + m(total) + '.'] },
      { id: 'tier2', title: 'Ưu đãi tầng 2', items: ['Khi khách mới thanh toán, người đã giới thiệu cho người giới thiệu (gián tiếp) nhận thêm ' + m(R.tier2Reward) + '.', 'Chỉ tính 1 tầng gián tiếp, giữ tổng chi phí thấp hơn quảng cáo.'] },
      { id: 'cond', title: 'Điều kiện nhận', items: ['Chỉ cộng ưu đãi khi thanh toán thành công (trạng thái Đã chuyển đổi).', 'Trạng thái chờ thanh toán, đang xử lý, đang rà soát, đã hủy: chưa cộng.'] },
      { id: 'fraud', title: 'Chống gian lận', items: ['Tự giới thiệu (cùng SĐT với người giới thiệu) không được tính.', 'Một khách chỉ được ghi nhận 1 lần.', 'Giới hạn ' + R.maxPerMonth + ' lượt giới thiệu mỗi tháng cho mỗi thành viên.', 'Ưu đãi trừ vào hóa đơn kỳ sau, không quy đổi thành tiền mặt.'] }
    ];
  }
  function feasibility() { return 'Tổng ưu đãi 60.000đ mỗi khách thấp hơn chi phí quảng cáo 90.000đ mỗi khách, tiết kiệm 30.000đ. Hòa vốn tháng đầu khi ưu đãi mỗi khách đạt 180.000đ. Số liệu giả định theo dữ liệu BTC.'; }
  function plain() {
    var d = get(), t = ['THỂ LỆ CHƯƠNG TRÌNH GIỚI THIỆU KHÁCH'];
    sections().forEach(function (s) { t.push('', s.title.toUpperCase()); s.items.forEach(function (i) { t.push('- ' + i); }); });
    t.push('', 'BẢNG GIÁ GÓI (GIẢ ĐỊNH)'); d.prices.forEach(function (p) { t.push('- ' + p.service + ': ' + m(p.price)); });
    t.push('', 'TÍNH KHẢ THI', feasibility(), '', 'TRẠNG THÁI');
    Object.keys(d.status).forEach(function (k) { t.push('- ' + d.status[k] + ': ' + (MEANING[k] || '')); });
    return t.join('\n');
  }
  var TONE = { converted: 'positive', pending: 'warning', processing: 'warning', reviewing: 'warning', cancelled: 'negative', invalid_self: 'negative', rejected_dup: 'negative' };
  var ADCOST = 90000, BREAKEVEN = 180000;
  function ic(n, s) { return EP.ui.icon(n, '', s || 20); }
  function chip(k, d) { return '<span class="badge ' + (TONE[k] || '') + '">' + esc(d.status[k] || k) + '</span>'; }
  function acc(id, icon, title, body, open, badge) {
    return '<details class="rl-acc card"' + (open ? ' open' : '') + ' data-acc="' + id + '"><summary><span class="rl-ico">' + ic(icon) + '</span><span class="rl-sum">' + esc(title) + '</span>' + (badge || '') + '<span class="rl-caret">' + ic('arrow-right', 16) + '</span></summary><div class="rl-body">' + body + '</div></details>';
  }
  function view(d) {
    var R = d.rules, total = R.rewardReferrer + R.rewardNew, h = '';
    h += '<section class="rl-hero card"><div class="rl-hero-top"><h2>Thể lệ chương trình</h2>' + EP.ui.badge('Áp dụng khi thanh toán thành công', 'positive') + '</div>' +
      '<div class="rl-stats">' +
      '<div class="rl-stat"><b>+' + esc(m(R.rewardReferrer)) + '</b><span>Người giới thiệu</span></div>' +
      '<div class="rl-stat"><b>−' + esc(m(R.rewardNew)) + '</b><span>Khách mới</span></div>' +
      '<div class="rl-stat"><b>+' + esc(m(R.tier2Reward)) + '</b><span>Tầng 2 (gián tiếp)</span></div></div>' +
      '<p class="rl-note">Tổng ưu đãi mỗi khách: ' + esc(m(total)) + '. Ưu đãi của khách mới trừ trực tiếp vào hóa đơn.</p></section>';
    var steps = [['share', 'Chia sẻ mã hoặc link', 'Thành viên gửi mã giới thiệu cho người quen.'], ['user', 'Khách nhập mã và chọn gói', 'Khách mới nhập mã khi đăng ký dịch vụ.'], ['wallet', 'Thanh toán thành công', 'Trạng thái chuyển sang Đã chuyển đổi.'], ['ticket', 'Ưu đãi được cộng', 'Tầng 1: ' + m(R.rewardReferrer) + ' cho người giới thiệu. Tầng 2: ' + m(R.tier2Reward) + ' cho người giới thiệu gián tiếp.']];
    h += acc('how', 'list', 'Cách nhận ưu đãi', '<ol class="rl-steps">' + steps.map(function (x, i) { return '<li><span class="rl-dot">' + ic(x[0], 18) + '</span><div><strong>' + (i + 1) + '. ' + esc(x[1]) + '</strong><p>' + esc(x[2]) + '</p></div></li>'; }).join('') + '</ol>', true);
    var no = ['pending', 'processing', 'reviewing', 'cancelled'];
    h += acc('cond', 'check', 'Điều kiện nhận', '<ul class="rl-check"><li class="ok"><span>' + ic('check', 18) + '</span>Thanh toán thành công (trạng thái Đã chuyển đổi).</li><li class="ok"><span>' + ic('check', 18) + '</span>Khách không trùng và không phải người giới thiệu.</li><li class="ok"><span>' + ic('check', 18) + '</span>Trong giới hạn ' + R.maxPerMonth + ' lượt mỗi tháng.</li></ul>' +
      '<h3 class="rl-sub">Chưa được cộng khi</h3><ul class="rl-check">' + no.map(function (k) { return '<li class="wait"><span>' + ic(k === 'cancelled' ? 'close' : 'clock', 18) + '</span><div>' + chip(k, d) + '<p>' + esc(MEANING[k] || '') + '</p></div></li>'; }).join('') + '</ul>', true);
    var fr = [['user', 'Tự giới thiệu: không tính', 'Ví dụ: cùng SĐT với người giới thiệu thì lượt ghi là Không hợp lệ.'], ['users', 'Khách trùng: ghi nhận 1 lần', 'Ví dụ: khách đã đăng ký qua mã A, nhập mã B sau đó sẽ bị Từ chối – trùng.'], ['alert', 'Giới hạn ' + R.maxPerMonth + ' lượt mỗi tháng', 'Ví dụ: lượt thứ ' + (R.maxPerMonth + 1) + ' trong tháng không được cộng.'], ['lock', 'Không quy đổi tiền mặt', 'Ví dụ: ưu đãi ' + m(R.rewardReferrer) + ' trừ vào hóa đơn kỳ sau.']];
    h += acc('fraud', 'lock', 'Chống gian lận', '<div class="rl-cards">' + fr.map(function (x) { return '<div class="rl-rule"><span class="rl-ico">' + ic(x[0]) + '</span><div><strong>' + esc(x[1]) + '</strong><p>' + esc(x[2]) + '</p></div></div>'; }).join('') + '</div>', false);
    h += acc('price', 'tag', 'Bảng giá gói (giả định)', '<div class="rl-pr-head">' + EP.ui.badge('Giả định – theo dữ liệu BTC', 'warning') + '</div><ul class="rl-prices">' + d.prices.map(function (p) {
      var cap = Math.floor(p.price / 2), over = total > p.price, disc = Math.min(R.rewardNew, cap), pct = Math.round(disc / p.price * 100);
      return '<li' + (over ? ' class="flag"' : '') + '><div class="rl-pr-main"><strong>' + esc(p.service) + '</strong><span class="num">' + esc(m(p.price)) + '/kỳ</span></div><div class="rl-pr-sub"><span>Ưu đãi khách mới: <b class="num">' + esc(m(disc)) + '</b></span><span class="badge ' + (over ? 'warning' : '') + '">' + pct + '% giá gói</span></div>' +
        (over ? '<p class="rl-flag">' + ic('alert', 16) + '<span>Tổng ưu đãi ' + esc(m(total)) + ' vượt giá gói ' + esc(m(p.price)) + '; ưu đãi khách mới tối đa 50% giá gói – giả định của đội.</span></p>' : '') + '</li>';
    }).join('') + '</ul>', false);
    h += '<section class="rl-feas card"><h2>' + ic('chart-line') + ' Tính khả thi</h2><p>Tổng ưu đãi <b class="num">' + esc(m(total)) + '</b> mỗi khách thấp hơn chi phí quảng cáo <b class="num">' + esc(m(ADCOST)) + '</b> mỗi khách, tiết kiệm <b class="num">' + esc(m(ADCOST - total)) + '</b>.</p><p>Hòa vốn tháng đầu khi ưu đãi mỗi khách đạt <b class="num">' + esc(m(BREAKEVEN)) + '</b>. Số liệu giả định theo dữ liệu BTC.</p></section>';
    h += acc('status', 'info', 'Trạng thái lượt giới thiệu', '<ul class="rl-legend">' + Object.keys(d.status).map(function (k) { return '<li>' + chip(k, d) + '<p>' + esc(MEANING[k] || '') + '</p></li>'; }).join('') + '</ul>', false);
    return h;
  }
  EP.register({
    id: 'rules', label: 'Thể lệ', icon: 'info', order: 40,
    title: 'Thể lệ chương trình', desc: 'Ưu đãi, điều kiện nhận và quy tắc chống gian lận.',
    render: function (el) {
      var d = get();
      el.innerHTML = '<div class="rl">' + view(d) + '</div>';
      EP.ui.actionBar(el, [{ label: 'Sao chép thể lệ', icon: 'copy', variant: 'primary', act: 'copy', onClick: function () { EP.ui.copy(plain(), 'Đã sao chép thể lệ.'); } }]);
    }
  });
})(window);
