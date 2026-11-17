/* Theo dõi: chọn thành viên -> KPI, danh sách lượt giới thiệu, ưu đãi (tầng 1 + tầng 2). Dùng EP.referral. */
(function (root) {
  'use strict';
  var EP = root.EP, esc = EP.esc;
  var members = EP.collection('members'), referrals = EP.collection('referrals');
  var TONE = { converted: 'positive', pending: 'warning', processing: 'warning', reviewing: 'warning', cancelled: 'negative', invalid_self: 'negative', rejected_dup: 'negative' };
  var FALLBACK_LABEL = { converted: 'Đã chuyển đổi', pending: 'Đang chờ thanh toán', processing: 'Đang xử lý', cancelled: 'Đã hủy', invalid_self: 'Không hợp lệ – tự giới thiệu', rejected_dup: 'Từ chối – trùng', reviewing: 'Đang rà soát' };
  function label(s) { return (EP.referral && EP.referral.STATUS_LABEL && EP.referral.STATUS_LABEL[s]) || FALLBACK_LABEL[s] || s; }
  var OPEN = { pending: 1, processing: 1, reviewing: 1 }, REJ = { cancelled: 1, invalid_self: 1, rejected_dup: 1 };

  function stats(id) {
    if (EP.referral && EP.referral.memberStats) return EP.referral.memberStats(id);
    var rows = referrals.list().filter(function (r) { return r.referrerId === id; });
    return { total: rows.length, converted: rows.filter(function (r) { return r.status === 'converted'; }).length, pending: rows.filter(function (r) { return OPEN[r.status]; }).length,
      rejected: rows.filter(function (r) { return REJ[r.status]; }).length, rewardTotal: 0, tier2Reward: 0, referrals: rows };
  }
  function queryId() { var m = /[?&]m=([^&]+)/.exec(root.location.hash); return m ? decodeURIComponent(m[1]) : root.EP_TRACK_MEMBER || ''; }

  EP.register({
    id: 'tracking', label: 'Theo dõi', icon: 'chart-bar', order: 30,
    title: 'Theo dõi giới thiệu', desc: 'Xem khách đã giới thiệu, trạng thái và ưu đãi của từng thành viên.',
    render: function (el) { build(el); }
  });

  function build(el) {
    var cur = queryId(), table;
    el.innerHTML = '<div class="card"><div class="field"><select class="input" id="tr-pick" aria-label="Chọn thành viên"></select></div></div>' +
      '<div class="grid kpis" data-slot="kpi"></div>' +
      '<div class="card"><div class="card-head"><h2 class="section-title">Theo trạng thái</h2></div><div data-slot="donut"></div></div>' +
      '<div class="card pad-0 flat"><div data-slot="table"></div></div>';
    var $s = function (n) { return el.querySelector('[data-slot="' + n + '"]'); };
    var pick = el.querySelector('#tr-pick');
    table = EP.ui.table($s('table'), {
      caption: 'Khách đã giới thiệu', rows: [], sort: { key: 'date', dir: 'desc' },
      columns: [
        { key: 'customerName', label: 'Khách', sort: true, render: function (r) { return '<div class="cell-main">' + esc(r.customerName) + '</div><div class="cell-sub">' + esc(r.service || '') + (r.tier === 2 ? ' · Tầng 2' : '') + '</div>'; } },
        { key: 'date', label: 'Ngày', sort: true, type: 'date', render: function (r) { return esc(EP.fmt.date(r.date)); } },
        { key: 'status', label: 'Trạng thái', render: function (r) { return EP.ui.badge(label(r.status), TONE[r.status]); } },
        { key: 'reward', label: 'Ưu đãi', num: true, render: function (r) { return r.status === 'converted' ? EP.fmt.money(r.tier === 2 ? 10000 : (r.rewardReferrer || 0)) : '—'; } }
      ],
      actions: function (r) { return OPEN[r.status] ? '<button type="button" class="btn btn-sm" data-act="pay">Mô phỏng thanh toán</button>' : ''; },
      empty: { title: 'Chưa có lượt giới thiệu', text: 'Thành viên này chưa giới thiệu khách nào.' },
      onAction: function (act, id) {
        if (act !== 'pay') return;
        if (!EP.referral) { EP.ui.toast('Chưa có mô-đun giới thiệu.', { type: 'warn' }); return; }
        EP.referral.pay(id);
        EP.ui.toast('Đã mô phỏng thanh toán. (Mô phỏng)', { type: 'success' });
      }
    });
    function fillPicker() {
      var ms = members.list();
      pick.innerHTML = ms.length ? ms.map(function (m) { return '<option value="' + esc(m.id) + '">' + esc(m.name + ' · ' + m.refCode) + '</option>'; }).join('') : '<option value="">Chưa có thành viên</option>';
      if (!ms.some(function (m) { return m.id === cur; })) cur = ms.length ? ms[0].id : '';
      pick.value = cur;
    }
    function refresh() {
      fillPicker();
      var s = cur ? stats(cur) : { total: 0, converted: 0, pending: 0, rejected: 0, rewardTotal: 0, tier2Reward: 0, referrals: [] };
      var tier1 = (s.rewardTotal || 0) - (s.tier2Reward || 0);
      $s('kpi').innerHTML = [
        { label: 'Khách đã giới thiệu', value: EP.fmt.number(s.total) },
        { label: 'Đã chuyển đổi', value: EP.fmt.number(s.converted) },
        { label: 'Đang chờ / xử lý', value: EP.fmt.number(s.pending) },
        { label: 'Bị từ chối', value: EP.fmt.number(s.rejected) },
        { label: 'Tổng ưu đãi đã nhận', value: EP.fmt.money(s.rewardTotal || 0), hint: 'Tầng 1: ' + EP.fmt.money(tier1) + ' · Tầng 2: ' + EP.fmt.money(s.tier2Reward || 0) }
      ].map(EP.ui.kpi).join('');
      var rows = s.referrals || [];
      table.setRows(rows);
      var counts = {};
      rows.forEach(function (r) { counts[r.status] = (counts[r.status] || 0) + 1; });
      var data = Object.keys(counts).map(function (k) { return { label: label(k), value: counts[k] }; });
      if (EP.charts && EP.charts.donut) EP.charts.donut($s('donut'), data, { unit: 'lượt', centerLabel: 'Tổng lượt' });
    }
    pick.addEventListener('change', function () { cur = pick.value; root.EP_TRACK_MEMBER = cur; refresh(); });
    function onChange() { if (root.document.body.contains(el)) refresh(); }
    members.onChange(onChange); referrals.onChange(onChange);
    EP.bus.on('demo:reset', refresh); EP.bus.on('restore', refresh);
    refresh();
  }
})(window);
