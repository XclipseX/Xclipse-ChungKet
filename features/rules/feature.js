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
  function feasibility() { return 'Tổng ưu đãi 60.000đ tương đương khoảng 21–60% doanh thu tháng đầu của gói hosting (99.000đ–279.000đ), thấp hơn chi phí quảng cáo 90.000đ cho mỗi khách. Số liệu giả định theo dữ liệu BTC.'; }
  function plain() {
    var d = get(), t = ['THỂ LỆ CHƯƠNG TRÌNH GIỚI THIỆU KHÁCH'];
    sections().forEach(function (s) { t.push('', s.title.toUpperCase()); s.items.forEach(function (i) { t.push('- ' + i); }); });
    t.push('', 'BẢNG GIÁ GÓI (GIẢ ĐỊNH)'); d.prices.forEach(function (p) { t.push('- ' + p.service + ': ' + m(p.price)); });
    t.push('', 'TÍNH KHẢ THI', feasibility(), '', 'TRẠNG THÁI');
    Object.keys(d.status).forEach(function (k) { t.push('- ' + d.status[k] + ': ' + (MEANING[k] || '')); });
    return t.join('\n');
  }
  EP.register({
    id: 'rules', label: 'Thể lệ', icon: 'info', order: 40,
    title: 'Thể lệ chương trình', desc: 'Ưu đãi, điều kiện nhận và quy tắc chống gian lận.',
    render: function (el) {
      var d = get();
      var html = sections().map(function (s) {
        return '<div class="card"><h2 class="section-title">' + esc(s.title) + '</h2><ul>' + s.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></div>';
      }).join('');
      html += '<div class="card"><div class="row between"><h2 class="section-title">Bảng giá gói</h2>' + EP.ui.badge('Giả định – theo dữ liệu BTC', 'warning') + '</div><div data-slot="prices"></div>' +
        '<p class="muted mt-3">' + esc(feasibility()) + '</p></div>' +
        '<div class="card"><h2 class="section-title">Bảng trạng thái</h2><div data-slot="status"></div></div>';
      el.innerHTML = html;
      var ps = el.querySelector('[data-slot="prices"]'), ss = el.querySelector('[data-slot="status"]');
      EP.ui.table(ps, { caption: 'Bảng giá gói', columns: [{ key: 'service', label: 'Gói' }, { key: 'price', label: 'Giá', num: true, render: function (r) { return esc(m(r.price)); } }], rows: d.prices.map(function (p, i) { return { id: 'p' + i, service: p.service, price: p.price }; }) });
      EP.ui.table(ss, { caption: 'Bảng trạng thái', columns: [{ key: 'label', label: 'Trạng thái' }, { key: 'meaning', label: 'Ý nghĩa' }], rows: Object.keys(d.status).map(function (k) { return { id: k, label: d.status[k], meaning: MEANING[k] || '' }; }) });
      EP.ui.actionBar(el, [{ label: 'Sao chép thể lệ', icon: 'copy', variant: 'primary', act: 'copy', onClick: function () { EP.ui.copy(plain(), 'Đã sao chép thể lệ.'); } }]);
    }
  });
})(window);
