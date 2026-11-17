/* features/forecast: Dự phóng chương trình Referral (giả định sửa được, KPI, công thức sống, kịch bản, độ nhạy, theo tháng, hòa vốn, sao chép tóm tắt).
   Công thức khớp EP.referral.forecast trong hợp đồng; tính qua compute của EP.scenario. Mọi số là GIẢ ĐỊNH / DỮ LIỆU MẪU (BTC). */
(function (root) {
  'use strict';
  var EP = root.EP, esc = EP.esc, M = EP.metrics, NO = 'Không đủ dữ liệu';
  function isNum(v) { return typeof v === 'number' && isFinite(v); }
  function money(n) { return isNum(n) ? M.vnd(n) : NO; }
  function num(n, d) { return isNum(n) ? EP.fmt.number(n, d == null ? (Math.abs(n) < 100 && n % 1 ? 1 : 0) : d) : NO; }
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
      ['Tỉ lệ = Doanh thu ÷ Chi phí ưu đãi', r.ratio == null ? NO + ' (chi phí ưu đãi = 0)' : money(r.revenue) + ' ÷ ' + money(r.rewardCost) + ' = ' + num(r.ratio, 1) + 'x'],
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
      '- Doanh thu: ' + money(r.revenue), '- Chi phí ưu đãi: ' + money(r.rewardCost), '- Tỉ lệ doanh thu/chi phí: ' + (r.ratio == null ? NO : num(r.ratio, 1) + 'x'),
      '- Chi phí referral/khách: ' + money(r.referralCostPerCustomer) + ' so với quảng cáo ' + money(a.adCostPerCustomer));
    L.push('', 'CÔNG THỨC:');
    formulas(a, r).forEach(function (f) { L.push('- ' + f[0] + ': ' + f[1]); });
    return L.join('\n');
  }

  function mount(el) {
    el.innerHTML =
      '<div class="card"><div class="card-head"><h2 class="section-title">Kết quả dự phóng</h2><div class="row">' + EP.ui.badge('Giả định · Dữ liệu mẫu (BTC)', 'warning') + '</div></div>' +
      '<p class="muted">Kịch bản Cơ sở. Sửa giả định ở bảng bên dưới, mọi số cập nhật ngay.</p>' +
      '<div class="grid kpis" data-slot="kpis"></div>' +
      '<div class="mt-3" data-slot="breakeven"></div>' +
      '<div class="row mt-3"><button type="button" class="btn btn-primary" data-act="copy">' + EP.ui.icon('copy') + 'Sao chép tóm tắt chương trình</button><button type="button" class="btn" data-act="csv">' + EP.ui.icon('download') + 'Xuất CSV</button></div></div>' +
      '<div class="card"><details open><summary class="section-title">Công thức (số liệu hiện tại)</summary><dl class="sc-dl" data-slot="formulas"></dl></details></div>' +
      '<div class="card"><div class="card-head"><h2 class="section-title">Dự phóng theo tháng</h2></div><div data-slot="chart" style="position:relative;overflow:hidden"></div><h3 class="sc-sub mt-3">Lũy kế (doanh thu trừ chi phí ưu đãi)</h3><div data-slot="chart2" style="position:relative;overflow:hidden"></div><div class="mt-3" data-slot="table"></div></div>' +
      '<div data-slot="sc"></div>';
    var $ = function (s) { return el.querySelector('[data-slot="' + s + '"]'); };
    var sc = EP.scenario.mount($('sc'), CFG);

    function draw() {
      var a = sc.values(), r = forecast(a);
      var ok = r.newCustomers > 0;
      $('kpis').innerHTML = [
        ['Thành viên tham gia', num(r.participants), ''],
        ['Khách tiềm năng', num(r.prospects), ''],
        ['Khách mới', num(r.newCustomers), 'Sau chuyển đổi'],
        ['Doanh thu dự kiến (tháng đầu)', ok ? money(r.revenue) : NO, ''],
        ['Tổng chi phí ưu đãi', ok ? money(r.rewardCost) : NO, ''],
        ['Tỉ lệ doanh thu/chi phí', r.ratio == null ? NO : num(r.ratio, 1) + 'x', 'Lần'],
        ['Referral/khách vs quảng cáo', ok ? money(r.referralCostPerCustomer) : NO, 'Quảng cáo: ' + money(a.adCostPerCustomer)],
        ['Tiết kiệm mỗi khách', ok ? money(r.saving) : NO, r.saving < 0 ? 'Referral đắt hơn quảng cáo' : '']
      ].map(function (k) { return EP.ui.kpi({ label: k[0], value: k[1], hint: k[2], tone: k[0] === 'Tiết kiệm mỗi khách' && r.saving < 0 ? 'negative' : '' }); }).join('');

      var maxTotal = a.revenuePerCustomer, maxAd = a.adCostPerCustomer;
      $('breakeven').innerHTML = '<div class="card-flat"><b>Điểm hòa vốn ưu đãi:</b> tỉ lệ doanh thu/chi phí = 1 khi tổng ưu đãi mỗi khách đạt <b>' + money(maxTotal) + '</b> (mỗi bên ' + money(maxTotal / 2) + ' nếu chia đều). ' +
        'Hiện tại đang là ' + money(a.rewardReferrer + a.rewardNew) + ' (' + (a.rewardReferrer + a.rewardNew <= maxAd ? 'thấp hơn' : 'CAO hơn') + ' chi phí quảng cáo ' + money(maxAd) + '/khách). Nên giữ tổng ưu đãi dưới ' + money(Math.min(maxTotal, maxAd)) + '.</div>';

      $('formulas').innerHTML = formulas(a, r).map(function (f) {
        return '<div class="sc-ex"><dt>' + esc(f[0]) + '</dt><dd><span class="sc-live">' + esc(f[1]) + '</span></dd></div>';
      }).join('');

      EP.charts.bar($('chart'), r.monthly.map(function (m) { return { label: 'T' + m.month, value: m.revenue }; }), { height: 200, format: M.vndShort, title: 'Doanh thu theo tháng (dữ liệu mô phỏng)' });
      EP.charts.line($('chart2'), r.monthly.map(function (m) { return { label: 'T' + m.month, value: m.cumulative }; }), { height: 200, area: true, format: M.vndShort, title: 'Lũy kế theo tháng' });
      $('table').innerHTML = '<div class="table-wrap"><table class="sc-table"><caption class="sr-only">Dự phóng theo tháng</caption><thead><tr><th scope="col">Tháng</th><th scope="col" class="num">Khách mới</th><th scope="col" class="num">Doanh thu</th><th scope="col" class="num">Chi phí ưu đãi</th><th scope="col" class="num">Lũy kế</th></tr></thead><tbody>' +
        r.monthly.map(function (m) { return '<tr><th scope="row">T' + m.month + '</th><td class="num">' + num(m.newCustomers) + '</td><td class="num">' + esc(M.vndShort(m.revenue)) + '</td><td class="num">' + esc(M.vndShort(m.rewardCost)) + '</td><td class="num">' + esc(M.vndShort(m.cumulative)) + '</td></tr>'; }).join('') +
        '</tbody></table></div>';
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
