/* features/forecast: Dự phóng chương trình Referral (giả định sửa được, KPI, công thức sống, kịch bản, độ nhạy, theo tháng, hòa vốn, sao chép tóm tắt).
   Công thức khớp EP.referral.forecast trong hợp đồng; tính qua compute của EP.scenario. Mọi số là GIẢ ĐỊNH / DỮ LIỆU MẪU (BTC). */
(function (root) {
  'use strict';
  var EP = root.EP, esc = EP.esc, M = EP.metrics, NO = 'Không đủ dữ liệu';
  function isNum(v) { return typeof v === 'number' && isFinite(v); }
  function money(n) { return isNum(n) ? M.vnd(n) : NO; }
  function num(n, d) { return isNum(n) ? EP.fmt.number(n, d == null ? (Math.abs(n) < 100 && n % 1 ? 1 : 0) : d) : NO; }
  function rx(n) { return isNum(n) ? EP.fmt.number(n, 1).replace(/^(\d+)$/, '$1,0') + 'x' : NO; }
  function pct(n) { return EP.fmt.number(n, n % 1 ? 1 : 0) + '%'; }

  var BTC = 'sample', GD = 'assumption';
  var CFG = {
    id: 'referral-forecast', title: 'Giả định dự phóng', tag: 'sample', unitLabel: 'khách', kpi: 'revenue', spread: 20,
    note: 'Giả định · Dữ liệu mẫu (BTC): số mặc định lấy từ bảng KD_GiaDinh / KD_QuyDinh của BTC, các dòng "Giả định" là do đội đặt. Không phải số liệu thật.',
    assumptions: [
      { key: 'members', label: 'Thành viên hiện có', unit: 'người', value: 1200, min: 100, max: 20000, step: 50, better: 'up', source: BTC, why: 'Dữ liệu mẫu BTC (KD_GiaDinh): số thành viên hiện tại.' },
      { key: 'participationRate', label: 'Tỉ lệ tham gia giới thiệu', unit: '%', value: 15, min: 1, max: 60, step: 1, better: 'up', source: BTC, why: 'Dữ liệu mẫu BTC: 15% thành viên chủ động giới thiệu.' },
      { key: 'referralsPerMember', label: 'Lượt giới thiệu mỗi người', unit: 'lượt', value: 2, min: 1, max: 10, step: 1, better: 'up', source: BTC, why: 'Dữ liệu mẫu BTC: mỗi người tham gia giới thiệu 2 khách.' },
      { key: 'conversionRate', label: 'Tỉ lệ chuyển đổi', unit: '%', value: 25, min: 5, max: 70, step: 1, better: 'up', source: BTC, why: 'Dữ liệu mẫu BTC: 25% khách được giới thiệu thanh toán thành công.' },
      { key: 'revenuePerCustomer', label: 'Doanh thu TB mỗi khách (tháng đầu)', unit: '₫', value: 180000, min: 50000, max: 600000, step: 5000, better: 'up', source: BTC, why: 'Dữ liệu mẫu BTC: doanh thu tháng đầu mỗi khách mới.' },
      { key: 'rewardReferrer', label: 'Ưu đãi cho người giới thiệu', unit: '₫', value: 30000, min: 0, max: 150000, step: 5000, better: 'down', source: BTC, why: 'Dữ liệu mẫu BTC (KD_QuyDinh): 30.000đ.' },
      { key: 'rewardNew', label: 'Ưu đãi cho khách mới', unit: '₫', value: 30000, min: 0, max: 150000, step: 5000, better: 'down', source: BTC, why: 'Dữ liệu mẫu BTC (KD_QuyDinh): 30.000đ.' },
      { key: 'adCostPerCustomer', label: 'Chi phí quảng cáo mỗi khách', unit: '₫', value: 90000, min: 20000, max: 300000, step: 5000, sens: false, source: BTC, why: 'Dữ liệu mẫu BTC: chi phí quảng cáo trả phí để có 1 khách, dùng để so sánh.' },
      { key: 'months', label: 'Số tháng dự phóng', unit: 'tháng', value: 6, min: 1, max: 24, step: 1, sens: false, source: GD, why: 'Giả định của đội: nhìn 6 tháng đầu của chương trình.' },
      { key: 'monthlyGrowth', label: 'Tăng trưởng khách mới mỗi tháng', unit: '%', value: 10, min: 0, max: 50, step: 1, better: 'up', source: GD, why: 'Giả định của đội: lượng khách mới tháng sau cao hơn tháng trước 10%, vì truyền miệng.' }
    ],
    compute: forecast,
    outputs: [
      { key: 'participants', label: 'Thành viên tham gia', format: 'number' },
      { key: 'prospects', label: 'Khách tiềm năng', format: 'number' },
      { key: 'newCustomers', label: 'Khách mới', format: 'number' },
      { key: 'revenue', label: 'Doanh thu dự kiến (tháng đầu)', format: 'money', kpi: true },
      { key: 'rewardCost', label: 'Tổng chi phí ưu đãi', format: 'money' },
      { key: 'ratio', label: 'Tỉ lệ doanh thu / chi phí', format: 'ratio', kpi: true, good: 'up' },
      { key: 'referralCostPerCustomer', label: 'Chi phí referral mỗi khách', format: 'money' },
      { key: 'saving', label: 'Tiết kiệm mỗi khách so với quảng cáo', format: 'money' },
      { key: 'beUnits', label: 'Số khách cần để hòa vốn ưu đãi', format: 'number' }
    ],
    explain: []
  };

  /* Hàm thuần: a theo đơn vị của bảng (tỉ lệ là số phần trăm, 15 = 15%). Mẫu số = 0 -> null (hiện "Không đủ dữ liệu"). */
  function forecast(a) {
    var participants = a.members * a.participationRate / 100;
    var prospects = participants * a.referralsPerMember;
    var newCustomers = prospects * a.conversionRate / 100;
    var revenue = newCustomers * a.revenuePerCustomer;
    var per = a.rewardReferrer + a.rewardNew;
    var rewardCost = newCustomers * per;
    var months = Math.max(1, Math.round(a.months || 1)), g = (a.monthlyGrowth || 0) / 100, monthly = [], cum = 0, i;
    for (i = 0; i < months; i++) {
      var nc = newCustomers * Math.pow(1 + g, i), rv = nc * a.revenuePerCustomer, rc = nc * per;
      cum += rv - rc;
      monthly.push({ month: i + 1, newCustomers: nc, revenue: rv, rewardCost: rc, cumulative: cum });
    }
    return {
      participants: participants, prospects: prospects, newCustomers: newCustomers, revenue: revenue, rewardCost: rewardCost,
      ratio: rewardCost > 0 ? revenue / rewardCost : null,
      referralCostPerCustomer: newCustomers > 0 ? rewardCost / newCustomers : null,
      saving: newCustomers > 0 ? a.adCostPerCustomer - rewardCost / newCustomers : null,
      monthly: monthly, per: per,
      fixed: 0, unitContribution: a.revenuePerCustomer - per, unitPrice: a.revenuePerCustomer
    };
  }

  function formulas(a, r) {
    var ok = isNum(r.newCustomers) && r.newCustomers > 0;
    return [
      ['Thành viên tham gia = Thành viên hiện có × Tỉ lệ tham gia', num(a.members) + ' × ' + pct(a.participationRate) + ' = ' + num(r.participants)],
      ['Khách tiềm năng = Thành viên tham gia × Lượt giới thiệu/người', num(r.participants) + ' × ' + num(a.referralsPerMember) + ' = ' + num(r.prospects)],
      ['Khách mới = Khách tiềm năng × Tỉ lệ chuyển đổi', num(r.prospects) + ' × ' + pct(a.conversionRate) + ' = ' + num(r.newCustomers)],
      ['Doanh thu = Khách mới × Doanh thu TB/khách', num(r.newCustomers) + ' × ' + money(a.revenuePerCustomer) + ' = ' + money(r.revenue)],
      ['Chi phí ưu đãi = Khách mới × (Ưu đãi người giới thiệu + Ưu đãi khách mới)', num(r.newCustomers) + ' × (' + money(a.rewardReferrer) + ' + ' + money(a.rewardNew) + ') = ' + money(r.rewardCost)],
      ['Tỉ lệ = Doanh thu ÷ Chi phí ưu đãi', r.ratio == null ? NO + ' (chi phí ưu đãi = 0)' : money(r.revenue) + ' ÷ ' + money(r.rewardCost) + ' = ' + rx(r.ratio)],
      ['Chi phí referral/khách = Chi phí ưu đãi ÷ Khách mới', ok ? money(r.rewardCost) + ' ÷ ' + num(r.newCustomers) + ' = ' + money(r.referralCostPerCustomer) : NO],
      ['Tiết kiệm/khách = Chi phí quảng cáo/khách − Chi phí referral/khách', ok ? money(a.adCostPerCustomer) + ' − ' + money(r.referralCostPerCustomer) + ' = ' + money(r.saving) : NO],
      ['Tăng trưởng tháng: khách mới tháng n = Khách mới × (1 + tăng trưởng)^(n−1); Lũy kế = Σ (Doanh thu − Chi phí ưu đãi)', 'Tháng 2: ' + num(r.newCustomers) + ' × ' + (1 + a.monthlyGrowth / 100).toFixed(2).replace('.', ',') + ' = ' + num(r.newCustomers * (1 + a.monthlyGrowth / 100))]
    ];
  }

  function summaryText(a, r) {
    var L = [], per = a.rewardReferrer + a.rewardNew;
    L.push('CHƯƠNG TRÌNH GIỚI THIỆU KHÁCH (REFERRAL) - Giả định · Dữ liệu mẫu (BTC), không phải số liệu thật');
    L.push('', 'MỤC TIÊU: biến ' + num(a.members) + ' thành viên hiện có thành kênh bán hàng, rẻ hơn quảng cáo ' + (isNum(r.saving) ? '(tiết kiệm ' + money(r.saving) + ' mỗi khách)' : '') + '.');
    L.push('', 'ƯU ĐÃI:', '- Người giới thiệu: ' + money(a.rewardReferrer) + ' mỗi khách chuyển đổi.', '- Khách mới: ' + money(a.rewardNew) + ' cho đơn đầu.',
      '- Tầng 2 (giới thiệu gián tiếp): ' + money((root.EP.referral && EP.referral.RULES && EP.referral.RULES.tier2Reward) || 10000) + ' cho người giới thiệu của người giới thiệu (giả định của đội).');
    L.push('', 'ĐIỀU KIỆN: chỉ tính ưu đãi khi khách mới thanh toán thành công.');
    L.push('CHỐNG GIAN LẬN: từ chối tự giới thiệu (trùng SĐT người giới thiệu), từ chối khách đã có, mã sai báo lỗi.');
    L.push('', 'GIẢ ĐỊNH CHÍNH: tham gia ' + pct(a.participationRate) + ', ' + num(a.referralsPerMember) + ' lượt/người, chuyển đổi ' + pct(a.conversionRate) + ', doanh thu ' + money(a.revenuePerCustomer) + '/khách, quảng cáo ' + money(a.adCostPerCustomer) + '/khách, tăng trưởng ' + pct(a.monthlyGrowth) + '/tháng.');
    L.push('', 'KẾT QUẢ DỰ PHÓNG (tháng đầu):', '- Thành viên tham gia: ' + num(r.participants), '- Khách tiềm năng: ' + num(r.prospects), '- Khách mới: ' + num(r.newCustomers),
      '- Doanh thu: ' + money(r.revenue), '- Chi phí ưu đãi: ' + money(r.rewardCost), '- Tỉ lệ doanh thu/chi phí: ' + (r.ratio == null ? NO : rx(r.ratio)),
      '- Chi phí referral/khách: ' + money(r.referralCostPerCustomer) + ' so với quảng cáo ' + money(a.adCostPerCustomer));
    L.push('', 'CÔNG THỨC:');
    formulas(a, r).forEach(function (f) { L.push('- ' + f[0] + ': ' + f[1]); });
    return L.join('\n');
  }

  var DEF = {}; CFG.assumptions.forEach(function (x) { DEF[x.key] = x.value; });
  function tagOf(a, key) { return a[key] !== DEF[key] ? ['Giả định', 'fc-t-as'] : ['Dữ liệu mẫu (BTC)', 'fc-t-btc']; }
  function sgn(v) { return (v > 0 ? '+' : v < 0 ? '−' : '±') + num(Math.abs(v), 2) + 'x'; }

  function funnelHtml(a, r) {
    var per = a.rewardReferrer + a.rewardNew;
    function tag(key, short) { var t = Array.isArray(key) ? (key.some(function (k) { return a[k] !== DEF[k]; }) ? ['Giả định', 'fc-t-as'] : ['Dữ liệu mẫu (BTC)', 'fc-t-btc']) : tagOf(a, key); return '<span class="fc-tag ' + t[1] + '">' + (short && t[2] !== 0 && t[0].indexOf('BTC') > 0 ? 'Mẫu BTC' : t[0]) + '</span>'; }
    function row(v, l, opText, key, cls) {
      return '<div class="fc-row ' + (cls || '') + '"><div class="fc-blk"><span class="fc-v">' + esc(v) + '</span></div><div class="fc-txt"><span class="fc-l">' + esc(l) + '</span>' +
        (opText ? '<span class="fc-o"><b>' + esc(opText[0]) + '</b> ' + esc(opText[1]) + ' ' + tag(key) + '</span>' : '') + '</div></div>';
    }
    function br(v, l, opText, key, cls) {
      return '<div class="fc-br ' + cls + '"><span class="fc-v">' + esc(v) + '</span><span class="fc-l">' + esc(l) + '</span><span class="fc-o"><b>' + esc(opText[0]) + '</b> ' + esc(opText[1]) + '</span>' + tag(key, true) + '</div>';
    }
    return '<div class="fc-funnel">' +
      row(num(a.members), 'thành viên hiện có', null, null) +
      row(num(r.participants), 'người tham gia', ['× ' + pct(a.participationRate), 'tỉ lệ tham gia'], 'participationRate') +
      row(num(r.prospects), 'khách tiềm năng', ['× ' + num(a.referralsPerMember), 'lượt giới thiệu/người'], 'referralsPerMember') +
      row(num(r.newCustomers), 'khách mới', ['× ' + pct(a.conversionRate), 'tỉ lệ chuyển đổi'], 'conversionRate', 'fc-key') +
      '<div class="fc-split">' +
      br(M.vndShort(r.revenue), 'doanh thu', ['× ' + money(a.revenuePerCustomer), 'mỗi khách'], 'revenuePerCustomer', 'fc-rev-n') +
      br(M.vndShort(r.rewardCost), 'chi phí ưu đãi', ['× ' + money(per), 'mỗi khách'], ['rewardReferrer', 'rewardNew'], 'fc-cost-n') +
      '</div>' +
      '<div class="fc-result"><span class="fc-rl">Doanh thu ÷ chi phí</span><span class="fc-rv">' + esc(r.ratio == null ? NO : rx(r.ratio)) + '</span></div></div>';
  }

  function breakevenHtml(a) {
    var p = a.rewardReferrer + a.rewardNew, R = a.revenuePerCustomer, ad = a.adCostPerCustomer, max = Math.max(R * 1.08, p * 1.08, ad * 1.08, 1);
    function at(v) { return Math.min(100, v / max * 100).toFixed(1); }
    var ok = p < R, head = R - p;
    var msg = !ok ? 'Ưu đãi đang cao hơn doanh thu mỗi khách: chương trình lỗ ở mức này.'
      : 'Còn dư ' + money(head) + ' mỗi khách trước khi ưu đãi ăn hết doanh thu (ưu đãi hiện bằng ' + pct(Math.round(p / R * 100)) + ' doanh thu mỗi khách).';
    return '<div class="card-head"><h2 class="section-title">Ngưỡng hòa vốn</h2>' + EP.ui.badge(ok ? 'Còn dư địa' : 'Đang lỗ', ok ? 'success' : 'danger') + '</div>' +
      '<p class="fc-p">Hòa vốn khi ưu đãi mỗi khách bằng doanh thu mỗi khách, lúc đó doanh thu / chi phí = 1x.</p>' +
      '<div class="fc-meter" role="img" aria-label="Ưu đãi ' + esc(money(p)) + ', quảng cáo ' + esc(money(ad)) + ', hòa vốn ' + esc(money(R)) + '">' +
      '<div class="fc-fill' + (ok ? '' : ' is-bad') + '" style="width:' + at(p) + '%"></div>' +
      '<i class="fc-mk fc-mk-ad" style="left:' + at(ad) + '%"></i><i class="fc-mk fc-mk-be" style="left:' + at(R) + '%"></i></div>' +
      '<ul class="fc-leg"><li><i class="fc-dot fc-d-now"></i><span>Ưu đãi hiện tại</span><b>' + esc(money(p)) + '</b></li>' +
      '<li><i class="fc-dot fc-d-ad"></i><span>Chi phí quảng cáo</span><b>' + esc(money(ad)) + '</b></li>' +
      '<li><i class="fc-dot fc-d-be"></i><span>Điểm hòa vốn</span><b>' + esc(money(R)) + '</b></li></ul>' +
      '<p class="fc-p fc-note">' + esc(msg) + '</p>';
  }

  function scenariosHtml(sc, rs, a) {
    return '<div class="fc-scs">' + sc.map(function (s) {
      var x = rs[s.id], base = s.id === 'base';
      return '<div class="fc-sc' + (base ? ' is-base' : '') + '"><div class="fc-sc-h">' + esc(s.label) + '</div><div class="fc-sc-r">' + (x.ratio == null ? NO : rx(x.ratio)) + '</div><div class="fc-sc-s">doanh thu / chi phí</div>' +
        '<dl><dt>Khách mới</dt><dd>' + num(x.newCustomers) + '</dd><dt>Doanh thu</dt><dd>' + esc(M.vndShort(x.revenue)) + '</dd><dt>Chi phí ưu đãi</dt><dd>' + esc(M.vndShort(x.rewardCost)) + '</dd></dl></div>';
    }).join('') + '</div>';
  }

  function tornadoHtml(rows) {
    if (!rows.length) return '<p class="fc-p">Chưa đo được độ nhạy.</p>';
    var max = Math.max.apply(null, rows.map(function (r) { return r.swing; })) || 1;
    var top = rows[0], topName = top.label.replace(/\s*\(.*\)/, '');
    return '<p class="fc-insight">' + EP.ui.icon('ai-sparkle') + '<span>' + esc(topName) + ' tác động lớn nhất (±' + num(top.swing, 1) + 'x)</span></p>' +
      '<div class="fc-tor">' + rows.map(function (r) {
        var neg = Math.min(r.low, r.high), pos = Math.max(r.low, r.high);
        return '<div class="fc-tr"><div class="fc-tl">' + esc(r.label) + '</div><div class="fc-bars"><div class="fc-half fc-left"><i style="width:' + (Math.abs(neg) / max * 100).toFixed(1) + '%"></i></div><div class="fc-half fc-right"><i style="width:' + (Math.abs(pos) / max * 100).toFixed(1) + '%"></i></div></div>' +
          '<div class="fc-pills"><span class="fc-pill fc-pn">' + sgn(neg) + '</span><span class="fc-pill fc-pp">' + sgn(pos) + '</span></div></div>';
      }).join('') + '</div>' +
      '<div class="fc-lg"><span><i class="fc-dot fc-d-neg"></i>Làm kết quả xấu đi</span><span><i class="fc-dot fc-d-pos"></i>Làm kết quả tốt lên</span></div>';
  }

  /* Biểu đồ riêng của Dự phóng: một màu, nhãn gọn, trục khớp số tháng */
  function niceMax(mx) {
    if (!(mx > 0)) return { max: 1, step: .25 };
    var p = Math.pow(10, Math.floor(Math.log10(mx / 4))), c = [1, 2, 2.5, 5, 10], i, st;
    for (i = 0; i < c.length; i++) { st = c[i] * p; if (Math.ceil(mx / st - 1e-9) <= 4) break; }
    return { max: Math.ceil(mx / st - 1e-9) * st, step: st };
  }
  function mFmt(v) { return EP.fmt.number(v / 1e6, 1); }
  function chartSvg(kind, rows, w, title) {
    var h = 190, m = { l: 46, r: 8, t: 16, b: 26 }, cw = w - m.l - m.r, ch = h - m.t - m.b, n = rows.length;
    var R = niceMax(Math.max.apply(null, rows.map(function (d) { return d.value; }))), k = Math.round(R.max / R.step), i, s = '';
    for (i = 0; i <= k; i++) { var y = m.t + ch - ch * i / k; s += '<line class="fc-grid" x1="' + m.l + '" x2="' + (w - m.r) + '" y1="' + y + '" y2="' + y + '"/><text class="fc-ax" x="' + (m.l - 6) + '" y="' + (y + 4) + '" text-anchor="end">' + esc(M.vndShort(R.step * i)) + '</text>'; }
    var band = cw / n, every = Math.ceil(n / Math.max(2, Math.floor(cw / 36)));
    function Y(v) { return m.t + ch - ch * v / R.max; }
    if (kind === 'bar') {
      var bw = Math.min(40, band * .66), showAll = band >= 36;
      rows.forEach(function (d, j) {
        var x = m.l + band * j + (band - bw) / 2, y = Y(d.value), last = j === n - 1;
        s += '<rect class="fc-bar' + (last ? ' is-last' : '') + '" x="' + x + '" y="' + y + '" width="' + bw + '" height="' + (m.t + ch - y) + '" rx="5"><title>' + esc(d.label + ': ' + M.vndShort(d.value)) + '</title></rect>';
        if (showAll || j === 0 || last) s += '<text class="fc-val" x="' + (x + bw / 2) + '" y="' + (y - 5) + '" text-anchor="middle">' + esc(mFmt(d.value)) + '</text>';
        if (j % every === 0 || last && every === 1) s += '<text class="fc-ax" x="' + (x + bw / 2) + '" y="' + (h - 8) + '" text-anchor="middle">' + esc(d.label) + '</text>';
      });
    } else {
      function X(j) { return m.l + band * j + band / 2; }
      var pts = rows.map(function (d, j) { return X(j) + ',' + Y(d.value); });
      s += '<path class="fc-area" d="M' + X(0) + ',' + Y(0) + ' L' + pts.join(' L') + ' L' + X(n - 1) + ',' + Y(0) + 'Z"/><polyline class="fc-line" points="' + pts.join(' ') + '"/>';
      rows.forEach(function (d, j) {
        var last = j === n - 1;
        s += '<circle class="fc-dot2' + (last ? ' is-last' : '') + '" cx="' + X(j) + '" cy="' + Y(d.value) + '" r="' + (last ? 5 : 3.5) + '"><title>' + esc(d.label + ': ' + M.vndShort(d.value)) + '</title></circle>';
        if (j % every === 0 || last && every === 1) s += '<text class="fc-ax" x="' + X(j) + '" y="' + (h - 8) + '" text-anchor="middle">' + esc(d.label) + '</text>';
      });
      s += '<text class="fc-val" x="' + Math.min(w - m.r, X(n - 1) + 2) + '" y="' + (Y(rows[n - 1].value) - 10) + '" text-anchor="end">' + esc(mFmt(rows[n - 1].value)) + '</text>';
    }
    return '<svg class="fc-svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" role="img" aria-label="' + esc(title) + '">' + s + '</svg>';
  }
  function drawChart(slot, kind, rows, title) {
    function go() { slot.innerHTML = chartSvg(kind, rows, Math.max(240, slot.clientWidth || 300), title); }
    slot._fc = go; go();
    if (root.ResizeObserver && !slot._ro) { slot._ro = new ResizeObserver(function () { if (slot._w !== slot.clientWidth) { slot._w = slot.clientWidth; slot._fc(); } }); slot._ro.observe(slot); }
  }

  function mount(el) {
    el.classList.add('fc');
    el.innerHTML =
      '<div class="card fc-card"><div class="card-head"><h2 class="section-title">Kết quả dự phóng</h2><div class="row">' + EP.ui.badge('Giả định · Dữ liệu mẫu (BTC)', 'warning') + '</div></div>' +
      '<p class="fc-p">Kịch bản Cơ sở. Sửa giả định ở bảng bên dưới, mọi số cập nhật ngay.</p>' +
      '<div class="grid kpis" data-slot="fc-kpis"></div>' +
      '<div class="row mt-3"><button type="button" class="btn btn-primary" data-act="copy">' + EP.ui.icon('copy') + 'Sao chép tóm tắt chương trình</button><button type="button" class="btn" data-act="csv">' + EP.ui.icon('download') + 'Xuất CSV</button></div></div>' +
      '<div class="card fc-card"><div class="card-head"><h2 class="section-title">Từ thành viên đến doanh thu</h2></div><p class="fc-p">Mỗi bước nhân một giả định. Sửa giả định, các khối đổi theo.</p><div data-slot="fc-funnel"></div></div>' +
      '<div class="card fc-card" data-slot="fc-breakeven"></div>' +
      '<div data-slot="sc" class="fc-sc-host"></div>' +
      '<div class="card fc-card"><div class="card-head"><h2 class="section-title">Ba kịch bản</h2></div><div data-slot="fc-scn"></div></div>' +
      '<div class="card fc-card"><div class="card-head"><h2 class="section-title">Giả định nào ảnh hưởng nhiều nhất</h2></div><p class="fc-p">Đổi từng giả định ±10%, các giả định khác giữ nguyên. Đo trên tỉ lệ doanh thu / chi phí.</p><div data-slot="fc-tornado"></div></div>' +
      '<div class="card fc-card"><div class="card-head"><h2 class="section-title">Dự phóng theo tháng</h2></div>' +
      '<div class="fc-chips"><span class="fc-chip"><i class="fc-dot fc-d-be"></i>Doanh thu (tr = triệu đồng)</span></div><div data-slot="fc-chart" style="position:relative;overflow:hidden"></div>' +
      '<div class="fc-chips mt-3"><span class="fc-chip"><i class="fc-dot fc-d-now"></i>Lũy kế sau ưu đãi</span></div><div data-slot="fc-chart2" style="position:relative;overflow:hidden"></div><div class="mt-3" data-slot="fc-table"></div></div>';
    var $ = function (s) { return el.querySelector('[data-slot="' + s + '"]'); };
    var sc = EP.scenario.mount($('sc'), CFG);
    /* Ẩn khối kết quả, độ nhạy, cách tính chung của EP.scenario (đã có bản riêng ở trên/dưới), chỉ trong màn Dự phóng */
    Array.prototype.slice.call($('sc').children).forEach(function (c, i) { if (i >= 2) c.hidden = true; });

    function draw() {
      var a = sc.values(), r = forecast(a);
      var ok = r.newCustomers > 0;
      $('fc-kpis').innerHTML = [
        ['Khách mới', num(r.newCustomers), 'Sau chuyển đổi', ''],
        ['Doanh thu dự kiến (tháng đầu)', ok ? money(r.revenue) : NO, '', ''],
        ['Tổng chi phí ưu đãi', ok ? money(r.rewardCost) : NO, '', ''],
        ['Tỉ lệ doanh thu/chi phí', r.ratio == null ? NO : rx(r.ratio), 'Lần', ''],
        ['Referral/khách vs quảng cáo', ok ? money(r.referralCostPerCustomer) : NO, 'Quảng cáo: ' + money(a.adCostPerCustomer), ''],
        ['Tiết kiệm mỗi khách', ok ? money(r.saving) : NO, r.saving < 0 ? 'Referral đắt hơn quảng cáo' : '', r.saving < 0 ? 'negative' : '']
      ].map(function (k) { return EP.ui.kpi({ label: k[0], value: k[1], hint: k[2], tone: k[3] }); }).join('');

      $('fc-funnel').innerHTML = funnelHtml(a, r);
      $('fc-breakeven').innerHTML = breakevenHtml(a);
      $('fc-scn').innerHTML = scenariosHtml(sc.scenarios(), sc.results(), a);
      $('fc-tornado').innerHTML = tornadoHtml(sc.sensitivity('ratio', 10));

      drawChart($('fc-chart'), 'bar', r.monthly.map(function (m) { return { label: 'T' + m.month, value: m.revenue }; }), 'Doanh thu theo tháng (dữ liệu mô phỏng)');
      drawChart($('fc-chart2'), 'line', r.monthly.map(function (m) { return { label: 'T' + m.month, value: m.cumulative }; }), 'Lũy kế theo tháng');
      $('fc-table').innerHTML = '<div class="fc-mt" role="table" aria-label="Dự phóng theo tháng"><div class="fc-mr fc-mh" role="row"><span role="columnheader">Tháng</span><span role="columnheader">Khách</span><span role="columnheader">Doanh thu</span><span role="columnheader">Ưu đãi</span><span role="columnheader">Lũy kế</span></div>' +
        r.monthly.map(function (m) { return '<div class="fc-mr" role="row"><span class="fc-mm" role="rowheader">T' + m.month + '</span><span role="cell">' + num(m.newCustomers) + '</span><span role="cell">' + esc(M.vndShort(m.revenue)) + '</span><span role="cell">' + esc(M.vndShort(m.rewardCost)) + '</span><span role="cell">' + esc(M.vndShort(m.cumulative)) + '</span></div>'; }).join('') + '</div>';
    }
    EP.bus.on('scenario:change', function (d) { if (d && d.id === CFG.id && el.isConnected) draw(); });
    draw();

    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act="copy"],[data-act="csv"]'); if (!b || b.closest('[data-slot="sc"]')) return;
      var a = sc.values(), r = forecast(a);
      if (b.getAttribute('data-act') === 'copy') EP.ui.copy(summaryText(a, r), 'Đã sao chép tóm tắt chương trình.');
      else EP.export.csv((EP.config.prefix + 'du-phong-theo-thang.csv').replace(/^_+/, ''), r.monthly.map(function (m) { return { month: 'Tháng ' + m.month, nc: Math.round(m.newCustomers * 100) / 100, rv: Math.round(m.revenue), rc: Math.round(m.rewardCost), cum: Math.round(m.cumulative), tag: 'Giả định · Dữ liệu mẫu (BTC)' }; }),
        [{ key: 'month', label: 'Tháng' }, { key: 'nc', label: 'Khách mới' }, { key: 'rv', label: 'Doanh thu (₫)' }, { key: 'rc', label: 'Chi phí ưu đãi (₫)' }, { key: 'cum', label: 'Lũy kế (₫)' }, { key: 'tag', label: 'Nhãn' }]);
    });
  }

  EP.register({
    id: 'forecast', label: 'Dự phóng', icon: 'chart-line', order: 50,
    title: 'Dự phóng chương trình', desc: 'Giả định sửa được, kết quả, công thức, 3 kịch bản và độ nhạy. Giả định · Dữ liệu mẫu (BTC).',
    render: mount
  });
  EP.forecastFeature = { forecast: forecast, summaryText: summaryText };
})(window);
