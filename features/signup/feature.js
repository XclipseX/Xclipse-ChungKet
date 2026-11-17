/* Đăng ký qua mã giới thiệu (mô phỏng). Dùng EP.referral (js/referral.js). */
(function (root) {
  'use strict';
  var EP = root.EP, esc = EP.esc;
  var members = EP.collection('members');

  function R() { return EP.referral; }
  function money(n) { return EP.fmt.money(n); }
  function qsRef() {
    try {
      var p = new URLSearchParams(root.location.search).get('ref');
      if (!p) { var h = String(root.location.hash || ''), i = h.indexOf('?'); if (i >= 0) p = new URLSearchParams(h.slice(i + 1)).get('ref'); }
      return p ? String(p).trim().toUpperCase() : '';
    } catch (e) { return ''; }
  }
  function findMember(code) {
    code = String(code || '').trim().toUpperCase();
    if (!code) return null;
    return members.list().filter(function (m) { return String(m.refCode).toUpperCase() === code; })[0] || null;
  }
  function priceOptions() {
    return ((R() && R().PRICES) || []).map(function (p) { return { value: p.service, label: p.service + ' · ' + money(p.price) }; });
  }
  var SCHEMA = {
    refCode: { label: 'Mã giới thiệu', type: 'text', rules: { required: true, maxLength: 20 }, autocomplete: 'off', span2: true, hint: 'Ví dụ REF-MA01' },
    customerName: { label: 'Họ tên khách', type: 'text', rules: { required: true, maxLength: 80 }, autocomplete: 'name', span2: true },
    phone: { label: 'Số điện thoại', type: 'tel', rules: { required: true, phone: true }, autocomplete: 'tel', span2: true },
    service: { label: 'Gói dịch vụ', type: 'select', rules: { required: true }, span2: true, options: [] }
  };

  EP.register({
    id: 'signup', label: 'Đăng ký qua mã', icon: 'ticket', order: 20,
    title: 'Đăng ký qua mã giới thiệu', desc: 'Khách mới nhập mã, chọn gói; ưu đãi chỉ cộng khi thanh toán thành công.',
    render: function (el) { build(el); }
  });

  function build(el) {
    if (!R()) { el.innerHTML = EP.ui.error({ title: 'Chưa sẵn sàng', text: 'Mô-đun giới thiệu chưa được nạp.' }); return; }
    var schema = JSON.parse(JSON.stringify(SCHEMA)); schema.service.options = priceOptions();
    var current = null, form;
    el.innerHTML =
      '<div class="card"><p class="muted" style="margin:0">Mô phỏng: khách mới đăng ký dịch vụ bằng mã giới thiệu (form giả lập, dữ liệu lưu trên máy).</p></div>' +
      '<div class="card"><div class="chips" data-slot="quick" style="gap:8px"></div>' +
      '<form class="form mt-3" id="su-form" novalidate>' + EP.form.render(schema, { refCode: qsRef(), service: (schema.service.options[0] || {}).value || '' }) + '</form>' +
      '<div data-slot="live" aria-live="polite" class="mt-3"></div>' +
      '<div data-slot="preview" class="mt-3"></div></div>' +
      '<div data-slot="result" class="mt-3" aria-live="polite"></div>';
    var $ = function (n) { return el.querySelector('[data-slot="' + n + '"]'); };
    var formEl = el.querySelector('#su-form');
    function field(n) { return formEl.querySelector('[name="' + n + '"]'); }

    function live() {
      var code = (field('refCode') || {}).value || '', box = $('live');
      if (!String(code).trim()) { box.innerHTML = ''; return; }
      var m = findMember(code);
      box.innerHTML = m ? '<div class="badge positive">Mã hợp lệ · Người giới thiệu: ' + esc(m.name) + '</div>'
        : '<div class="badge negative">Mã không tồn tại. Kiểm tra lại hoặc nạp dữ liệu mẫu.</div>';
    }
    function preview() {
      var sv = (field('service') || {}).value, p = (R().PRICES || []).filter(function (x) { return x.service === sv; })[0];
      $('preview').innerHTML = p ? '<div class="card flat"><strong>' + esc(p.service) + '</strong> · ' + money(p.price) +
        '<div class="muted">Giảm ' + money(R().RULES.rewardNew) + ' cho khách mới khi thanh toán thành công</div></div>' : '';
    }
    formEl.addEventListener('input', function (e) { if (e.target.name === 'refCode') live(); });
    formEl.addEventListener('change', function (e) { if (e.target.name === 'service') preview(); });
    live(); preview();

    function quick() {
      var has = members.list().length > 0, q = $('quick');
      q.innerHTML = has ? '<button type="button" class="chip" data-q="self">Thử tự giới thiệu</button><button type="button" class="chip" data-q="dup">Thử khách trùng</button>'
        : '<span class="muted">Nạp dữ liệu mẫu ở Tổng quan để dùng nút thử nhanh.</span>';
    }
    function setVal(n, v) { var f = field(n); if (f) { f.value = v; f.dispatchEvent(new Event('input', { bubbles: true })); f.dispatchEvent(new Event('change', { bubbles: true })); } }
    $('quick').addEventListener('click', function (e) {
      var b = e.target.closest('[data-q]'); if (!b) return;
      var ms = members.list(); if (!ms.length) return;
      var submit = function () { if (formEl.requestSubmit) formEl.requestSubmit(); else formEl.dispatchEvent(new Event('submit', { cancelable: true })); };
      var svc = (R().PRICES[1] || R().PRICES[0] || {}).service;
      if (b.getAttribute('data-q') === 'self') {
        // Ca 1: thành viên dùng chính mã của mình + SĐT của mình -> Không hợp lệ (tự giới thiệu)
        var m = ms.filter(function (x) { return x.refCode === 'REF-LM06'; })[0] || ms[0];
        setVal('refCode', m.refCode); setVal('customerName', m.name); setVal('phone', m.phone); if (svc) setVal('service', svc);
        EP.ui.toast('Ca thử: ' + m.name + ' dùng mã của chính mình (' + m.refCode + ').', { type: 'info' });
      } else {
        // Ca 2: một SĐT khách đã được ghi nhận qua người A, nay đăng ký lại qua người B -> Từ chối – trùng
        var isPhone = function (k) { return /^0\d{9}$/.test(String(k || '')); };
        var ok = EP.collection('referrals').list().filter(function (r) { return isPhone(r.customerKey) && r.status !== 'rejected_dup' && r.status !== 'invalid_self'; })[0];
        if (!ok) { R().signup({ refCode: ms[0].refCode, customerName: 'Khách thử trùng', phone: '0911000111', service: svc }); ok = EP.collection('referrals').list().filter(function (r) { return r.customerKey === '0911000111'; })[0]; }
        var other = ms.filter(function (x) { return x.id !== ok.referrerId; })[0] || ms[0];
        setVal('refCode', other.refCode); setVal('customerName', ok.customerName); setVal('phone', ok.customerKey); if (svc) setVal('service', svc);
        EP.ui.toast('Ca thử: khách ' + ok.customerName + ' (' + ok.customerKey + ') đã có, đăng ký lại qua mã ' + other.refCode + '.', { type: 'info' });
      }
      setTimeout(submit, 350);
      return;
      EP.ui.toast('Đã điền ca thử.', { type: 'info' });
    });
    quick(); EP.collection('members').onChange(function () { if (root.document.body.contains(el)) { quick(); live(); } });

    function renderResult(res) {
      var out = $('result'), rf = res.referral || current;
      if (!res.ok) { out.innerHTML = '<div class="card"><h3>' + EP.ui.badge('Bị từ chối', 'negative') + '</h3><p>' + esc(res.reason || 'Mã không tồn tại.') + '</p></div>'; return; }
      if (rf && (rf.status === 'invalid_self' || rf.status === 'rejected_dup')) {
        out.innerHTML = '<div class="card"><h3>' + EP.ui.badge(R().STATUS_LABEL[rf.status], 'negative') + '</h3><p>' + esc(res.reason || (rf.status === 'invalid_self' ? 'Tự giới thiệu không được tính ưu đãi.' : 'Khách này đã được ghi nhận trước đó.')) + '</p><p class="muted">Không cộng ưu đãi.</p></div>'; return;
      }
      if (rf.status === 'converted') {
        out.innerHTML = '<div class="card"><h3>' + EP.ui.badge('Thanh toán thành công', 'positive') + '</h3><ul>' +
          '<li>Người giới thiệu: +' + money(rf.rewardReferrer) + '</li><li>Khách mới ' + esc(rf.customerName) + ': -' + money(rf.rewardNew) + ' trên hóa đơn</li>' +
          (rf.parentReferrerId ? '<li>Tầng 2 (người giới thiệu gián tiếp): +' + money(R().RULES.tier2Reward) + '</li>' : '<li class="muted">Không có ưu đãi tầng 2.</li>') +
          '</ul><div class="muted">Tổng chi phí ưu đãi: ' + money(rf.rewardTotal) + '</div><div class="muted">Mô phỏng · Dữ liệu mẫu</div></div>'; return;
      }
      out.innerHTML = '<div class="card"><h3>' + EP.ui.badge('Đã ghi nhận – Đang chờ thanh toán', 'warning') + '</h3><p>Khách ' + esc(rf.customerName) + ' · ' + esc(rf.service) + '. Ưu đãi chưa được cộng.</p>' +
        '<button type="button" class="btn btn-primary btn-block" data-act="pay">' + EP.ui.icon('check') + 'Mô phỏng thanh toán thành công</button></div>';
    }
    $('result').addEventListener('click', function (e) {
      var b = e.target.closest('[data-act="pay"]'); if (!b || !current) return;
      var rf = R().pay(current.id); current = rf || current;
      renderResult({ ok: true, referral: current });
      EP.ui.toast('Đã mô phỏng thanh toán thành công.', { type: 'success' });
    });

    form = EP.form.bind(formEl, schema, { onSubmit: function (v) {
      var res = R().signup({ refCode: String(v.refCode).trim().toUpperCase(), customerName: v.customerName, phone: EP.form.normalizePhone(v.phone), service: v.service });
      current = res.referral || null; renderResult(res);
      if (res.ok && current && current.status === 'pending') EP.ui.toast('Đã ghi nhận đăng ký.', { type: 'success' });
    } });
    EP.ui.actionBar(el, [{ label: 'Đăng ký', icon: 'check', variant: 'primary', act: 'submit', onClick: function () { if (formEl.requestSubmit) formEl.requestSubmit(); else formEl.dispatchEvent(new Event('submit', { cancelable: true })); } }]);
  }
})(window);
