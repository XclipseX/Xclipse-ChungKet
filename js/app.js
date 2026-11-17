/* app.js - khởi động: dựng thương hiệu/chân trang, nút giao diện, nạp demo, view Tổng quan & Cài đặt, bật router.
   Nạp CUỐI CÙNG (sau mọi features/*). Không cần sửa khi thêm feature mới. */
(function (root) {
  'use strict';
  var EP = root.EP, cfg = EP.config, esc = EP.esc, doc = root.document;

  /* ---------- Hero "Tầm nhìn Thông minh": dải hình (quả cầu 3D + vệt hồng + 8 thanh kính sọc) dựng sẵn trong HTML để không nhảy bố cục ---------- */
  function heroVisual() {
    var bars = ''; for (var i = 0; i < 8; i++) bars += '<i class="hero-flute"></i>';
    return '<div class="hero-visual" aria-hidden="true"><div class="hero-streak"></div><div class="hero-orb-wrap"><div class="hero-orb"></div></div><div class="hero-flutes">' + bars + '</div></div>';
  }
  function heroTools() {
    var t = cfg.heroTools; if (!t || !t.length) return '';
    return '<div class="hero-tools"><p class="hero-tools-label">' + esc(cfg.heroToolsLabel || '') + '</p><ul class="hero-tools-row">' + t.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
  }

  /* ---------- Tổng quan: KPI gộp từ summary() của các feature + thẻ lối tắt + hướng dẫn 3 bước ---------- */
  EP.register({
    id: 'home', label: 'Tổng quan', icon: 'home', order: 0, always: true,
    title: cfg.appName, desc: cfg.tagline,
    render: function (el) {
      var feats = EP.router.list().filter(function (v) { return v.id !== 'home' && v.id !== 'settings'; });
      var ms = EP.collection('members').list(), rs = EP.collection('referrals').list();
      var conv = rs.filter(function (r) { return r.status === 'converted'; });
      var spent = conv.reduce(function (t, r) { return t + (Number(r.rewardTotal) || 0); }, 0);
      var kpis = [
        { label: 'Thành viên', value: EP.fmt ? EP.fmt.number(ms.length) : String(ms.length) },
        { label: 'Lượt giới thiệu', value: String(rs.length) },
        { label: 'Đã chuyển đổi', value: String(conv.length), hint: rs.length ? Math.round(conv.length * 100 / rs.length) + '% lượt giới thiệu' : '' },
        { label: 'Tổng ưu đãi đã chi', value: EP.fmt && EP.fmt.money ? EP.fmt.money(spent) : spent + ' đ', hint: 'Dữ liệu mẫu' }
      ];
      var links = feats.map(function (v) {
        return '<a class="card" href="#/' + esc(v.id) + '"><div class="row" style="gap:12px;flex-wrap:nowrap;align-items:flex-start"><span style="flex:none;color:var(--accent-ink)">' + EP.ui.icon(v.icon || 'list') + '</span><div><h2 class="section-title">' + esc(v.label) + '</h2><p class="muted">' + esc(v.desc || '') + '</p></div></div></a>';
      }).join('');
      var sample = '<div class="card sample-card"><div class="card-head"><h2 class="section-title">Dữ liệu mẫu từ BTC</h2></div><p class="muted">Nạp 8 thành viên và 12 lượt giới thiệu do ban tổ chức cung cấp để thử luồng đăng ký, theo dõi và dự phóng.</p><div class="row mt-3"><button class="btn btn-primary" type="button" data-act="load-sample">' + EP.ui.icon('refresh') + 'Nạp dữ liệu mẫu</button></div></div>';
      el.innerHTML =
        '<section class="hero" aria-label="Giới thiệu">' + heroVisual() + '<div class="hero-copy"><span class="hero-eyebrow"><span class="hero-dot" aria-hidden="true"></span>' + esc(cfg.appName) + '</span><p class="hero-title" role="presentation">' + esc(cfg.heroLead || 'Giải pháp') + ' <em>' + esc(cfg.heroEm || 'thông minh') + '</em></p><p class="hero-desc">' + esc(cfg.tagline) + '</p>' +
        '<a class="btn btn-cta" href="#/members">Đăng ký thành viên ' + EP.ui.icon('arrow-right') + '</a>' + '</div>' + heroTools() + '</section>' +
        sample + '<div class="grid kpis">' + kpis.map(EP.ui.kpi).join('') + '</div>' +
        (links ? '<div class="grid cols-2">' + links + '</div>' : EP.ui.empty({ title: 'Chưa có tính năng nào', text: 'Thêm file vào features/ và nạp trong index.html.' }));
      el.addEventListener('click', function (e) {
        if (!e.target.closest('[data-act="load-sample"]')) return;
        if (!EP.referral || !EP.referral.loadSample) { EP.ui.toast('Chưa có mô-đun dữ liệu mẫu.', { type: 'warn' }); return; }
        EP.referral.loadSample(); EP.ui.toast('Đã nạp 8 thành viên, 12 lượt giới thiệu', { type: 'success' }); EP.router.refresh();
      });
    }
  });

  /* ---------- Cài đặt: giao diện, AI, dữ liệu ---------- */
  EP.register({
    id: 'settings', label: 'Cài đặt', icon: 'settings', order: 99,
    title: 'Cài đặt', desc: 'Giao diện, trợ lý AI và dữ liệu của bạn.',
    render: function (el) {
      el.innerHTML =
        '<div class="card"><div class="card-head"><h2 class="section-title">Giao diện</h2></div><div id="set-theme"></div></div>' +
        '<div class="card"><div class="card-head"><h2 class="section-title">Trợ lý AI</h2></div><div id="set-ai"></div></div>' +
        '<div class="card"><div class="card-head"><h2 class="section-title">Dữ liệu</h2></div><p class="muted">Dữ liệu nằm trong trình duyệt này (localStorage). Hãy sao lưu trước khi xóa hoặc đổi máy.</p>' +
        '<div class="mt-3" style="display:grid;grid-template-columns:minmax(0,1fr);gap:8px"><button class="btn" type="button" style="width:100%;justify-content:center;white-space:nowrap" data-act="backup">' + EP.ui.icon('download') + 'Sao lưu (JSON)</button><button class="btn" type="button" style="width:100%;justify-content:center;white-space:nowrap" data-act="restore">' + EP.ui.icon('upload') + 'Khôi phục từ file</button>' +
        '<button class="btn" type="button" style="width:100%;justify-content:center;white-space:nowrap" data-act="sample">' + EP.ui.icon('refresh') + 'Nạp lại dữ liệu mẫu (BTC)</button><button class="btn btn-danger" type="button" style="width:100%;justify-content:center;white-space:nowrap" data-act="wipe">' + EP.ui.icon('trash') + 'Xóa toàn bộ dữ liệu</button></div></div>' +
        '<p class="muted center">' + esc(cfg.appName) + ' · phiên bản ' + esc(EP.version.version) + ' (' + esc(EP.version.date) + ')</p>';
      var seg = EP.ui.segmented(el.querySelector('#set-theme'), {
        label: 'Giao diện', name: 'set-theme', value: EP.theme.get(),
        options: [{ value: 'system', label: 'Theo hệ thống' }, { value: 'light', label: 'Sáng' }, { value: 'dark', label: 'Tối' }],
        onChange: function (v) { EP.theme.set(v, el.querySelector('#set-theme input:checked')); }
      });
      EP.bus.on('theme', function (m) { if (seg) seg.set(m); });
      EP.ai.mountSettings(el.querySelector('#set-ai'));
      el.addEventListener('click', function (e) {
        var b = e.target.closest('[data-act]'); if (!b) return;
        var act = b.getAttribute('data-act');
        if (act === 'backup') EP.export.backup();
        else if (act === 'restore') EP.export.pickFile('.json,application/json').then(function (f) { return EP.export.restore(f); }).then(function (n) { EP.ui.toast('Đã khôi phục ' + n + ' mục dữ liệu.', { type: 'success' }); EP.router.refresh(); }, function (err) { EP.ui.toast(err.message, { type: 'error' }); });
        else if (act === 'sample') { if (EP.referral && EP.referral.loadSample) { EP.referral.loadSample(); EP.ui.toast('Đã nạp 8 thành viên, 12 lượt giới thiệu', { type: 'success' }); } else EP.ui.toast('Chưa có mô-đun dữ liệu mẫu.', { type: 'warn' }); }
        else if (act === 'demo') EP.ui.confirm({ title: 'Nạp lại dữ liệu demo?', message: 'Dữ liệu hiện tại của các mục có demo sẽ bị thay bằng dữ liệu mẫu.', confirmLabel: 'Nạp lại', danger: true }).then(function (ok) { if (ok) { EP.demo.reset(); EP.ui.toast('Đã nạp lại dữ liệu demo.', { type: 'success' }); } });
        else if (act === 'wipe') EP.ui.confirm({ title: 'Xóa toàn bộ dữ liệu?', message: 'Mọi dữ liệu của ứng dụng trong trình duyệt này sẽ mất, không hoàn tác được.', confirmLabel: 'Xóa hết', danger: true }).then(function (ok) { if (ok) { EP.store.clear(); EP.ui.toast('Đã xóa. Đang tải lại...', { type: 'success' }); setTimeout(function () { root.location.reload(); }, 600); } });
      });
    }
  });

  /* ---------- Khởi động ---------- */
  function boot() {
    var $ = EP.$, set = function (id, t) { var n = doc.getElementById(id); if (n) n.textContent = t; };
    set('brand-name', cfg.appName); set('brand-mark', cfg.brandMark || cfg.appName.charAt(0));
    set('ft-app', cfg.appName); set('ft-version', 'v' + EP.version.version);
    var nt = doc.getElementById('ft-notice'); if (nt) nt.textContent = EP.ai.MOCK_NOTICE;
    function syncNotice() { if (nt) nt.hidden = EP.ai.getMode() !== 'mock'; }
    syncNotice(); EP.bus.on('ai:mode', syncNotice);

    var tb = $('#btn-theme');
    if (tb) { EP.theme.apply(EP.theme.get()); tb.addEventListener('click', function () { EP.theme.cycle(tb); }); }
    EP.bus.on('store:error', function () { EP.ui.toast('Bộ nhớ trình duyệt đầy hoặc bị chặn, dữ liệu có thể không được lưu.', { type: 'warn' }); });

    EP.demo.run();
    EP.router.mount();
    doc.documentElement.setAttribute('data-ready', '1');
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
})(window);
