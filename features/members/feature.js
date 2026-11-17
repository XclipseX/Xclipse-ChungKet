/* Thành viên: danh sách, đăng ký (sinh mã REF), sao chép mã/link, xem theo dõi. Dùng EP.referral (js/referral.js). */
(function (root) {
  'use strict';
  var EP = root.EP, esc = EP.esc;
  var members = EP.collection('members');
  var SCHEMA = {
    name: { label: 'Họ tên', type: 'text', rules: { required: true, maxLength: 80 }, autocomplete: 'name', span2: true },
    phone: { label: 'Số điện thoại', type: 'tel', rules: { required: true, phone: true }, autocomplete: 'tel', hint: 'Ví dụ 0912345678', span2: true }
  };
  function maskPhone(p) { var s = String(p || ''); return s.length < 7 ? s : s.slice(0, 4) + '***' + s.slice(-3); }
  function link(code) { return root.location.origin + root.location.pathname + '?ref=' + code + '#/signup'; }

  EP.register({
    id: 'members', label: 'Thành viên', icon: 'users', order: 10,
    title: 'Thành viên', desc: 'Đăng ký thành viên, nhận mã giới thiệu và chia sẻ link.',
    summary: function () { return [{ label: 'Thành viên', value: String(members.list().length) }]; },
    render: function (el) { build(el); }
  });

  function build(el) {
    var q = '', table;
    el.innerHTML = '<div class="card pad-0 flat"><div class="row between" style="padding:14px 16px;border-bottom:1px solid var(--rule)">' +
      '<div class="field" style="min-width:min(100%,260px)"><input class="input input-inline" id="mb-search" type="search" placeholder=" " autocomplete="off" aria-label="Tìm thành viên"><label class="label" for="mb-search" style="top:10px">Tìm theo tên, SĐT hoặc mã...</label></div></div>' +
      '<div data-slot="table"></div></div>';
    var slot = el.querySelector('[data-slot="table"]');
    var cols = [
      { key: 'name', label: 'Thành viên', sort: true, render: function (r) { return '<div class="cell-main">' + esc(r.name) + '</div><div class="cell-sub">' + esc(maskPhone(r.phone)) + '</div>'; } },
      { key: 'refCode', label: 'Mã REF', sort: true, render: function (r) { return '<strong>' + esc(r.refCode) + '</strong>'; } },
      { key: 'joinedAt', label: 'Ngày tham gia', sort: true, type: 'date', render: function (r) { return esc(EP.fmt.date(r.joinedAt)); } },
      { key: 'status', label: 'Trạng thái', render: function (r) { return EP.ui.badge(r.status || 'Đang hoạt động', 'positive'); } },
      { key: 'source', label: 'Nguồn', render: function (r) { return r.source === 'btc' ? EP.ui.badge('Dữ liệu mẫu (BTC)', 'warning') : EP.ui.badge('Mới', 'positive'); } }
    ];
    table = EP.ui.table(slot, {
      caption: 'Danh sách thành viên', columns: cols, rows: [], sort: { key: 'joinedAt', dir: 'desc' },
      actions: function (r) {
        return '<button type="button" class="btn btn-sm" data-act="code">' + EP.ui.icon('copy') + 'Sao chép mã</button>' +
          '<button type="button" class="btn btn-sm" data-act="link">' + EP.ui.icon('copy') + 'Sao chép link</button>' +
          '<button type="button" class="btn btn-sm" data-act="track">' + EP.ui.icon('chart-bar') + 'Xem theo dõi</button>';
      },
      empty: { title: 'Chưa có thành viên', text: 'Đăng ký thành viên mới hoặc nạp dữ liệu mẫu của BTC.', action: { label: 'Nạp dữ liệu mẫu', act: 'sample' } },
      onAction: function (act, id) {
        var m = members.get(id);
        if (act === 'sample') { loadSample(); return; }
        if (!m) return;
        if (act === 'code') EP.ui.copy(m.refCode, 'Đã sao chép mã ' + m.refCode);
        else if (act === 'link') EP.ui.copy(link(m.refCode), 'Đã sao chép link giới thiệu');
        else if (act === 'track') { root.EP_TRACK_MEMBER = id; try { root.sessionStorage.setItem('EP_TRACK_MEMBER', id); } catch (e) { /* bỏ qua */ } root.location.hash = '#/tracking?m=' + encodeURIComponent(id); }
      }
    });
    function loadSample() {
      if (!EP.referral) { EP.ui.toast('Chưa có mô-đun giới thiệu.', { type: 'warn' }); return; }
      var r = EP.referral.loadSample();
      EP.ui.toast('Đã nạp dữ liệu mẫu: ' + r.members + ' thành viên, ' + r.referrals + ' lượt giới thiệu. (Dữ liệu mẫu)', { type: 'success' });
    }
    function refresh() {
      var rows = members.list().filter(function (m) {
        return !q || (m.name + ' ' + m.phone + ' ' + m.refCode).toLowerCase().indexOf(q) >= 0;
      });
      table.setRows(rows);
    }
    el.querySelector('#mb-search').addEventListener('input', EP.debounce(function (e) { q = e.target.value.trim().toLowerCase(); refresh(); }, 120));

    function openForm() {
      var fid = 'mb-form-' + EP.uid();
      var d = EP.ui.dialog({
        title: 'Đăng ký thành viên', size: 'wide',
        body: '<form class="form" id="' + fid + '" novalidate>' + EP.form.render(SCHEMA, {}) + '</form>',
        actions: [{ label: 'Hủy', value: null }, { label: 'Đăng ký', variant: 'primary', type: 'submit', form: fid, id: 'mb-save' }]
      });
      EP.form.bind(d.body.querySelector('form'), SCHEMA, { onSubmit: function (v) {
        if (!EP.referral) { EP.ui.toast('Chưa có mô-đun giới thiệu.', { type: 'warn' }); return; }
        var res = EP.referral.registerMember({ name: v.name, phone: EP.form.normalizePhone(v.phone) });
        if (!res.ok) { EP.ui.toast(res.error || 'Không đăng ký được.', { type: 'error' }); return; }
        d.close(true);
        EP.ui.toast('Đã đăng ký. Mã giới thiệu của bạn: ' + res.member.refCode, { type: 'success' });
      } });
    }
    EP.ui.actionBar(el, [{ label: 'Đăng ký thành viên', icon: 'plus', variant: 'primary', act: 'add', onClick: openForm }]);

    members.onChange(function () { if (root.document.body.contains(el)) refresh(); });
    EP.bus.on('demo:reset', refresh); EP.bus.on('restore', refresh);
    refresh();
  }
})(window);
