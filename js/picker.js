/* Bộ chọn dạng bottom sheet cho <select> trên điện thoại / cảm ứng (desktop dùng hộp chọn của lucian.js). */
(function (root) {
  'use strict';
  var doc = root.document, EP = root.EP;
  if (!doc || !EP || !EP.ui) return;
  function narrow() { return (root.matchMedia && (root.matchMedia('(max-width: 767px)').matches || root.matchMedia('(pointer: coarse)').matches)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var busy = false;
  function openSheet(sel) {
    if (busy) return;
    var opts = Array.prototype.filter.call(sel.options, function (o) { return !o.hidden && o.label !== ''; });
    if (!opts.length) return;
    busy = true;
    var wrap = doc.createElement('div'), label = sel.getAttribute('aria-label') || (sel.id && doc.querySelector('label[for="' + sel.id + '"]') && doc.querySelector('label[for="' + sel.id + '"]').textContent) || 'Chọn';
    var search = opts.length > 7;
    wrap.innerHTML = (search ? '<input class="input pk-search" type="search" placeholder="Tìm…" aria-label="Tìm" autocomplete="off">' : '') +
      '<ul class="pk-list" role="listbox">' + opts.map(function (o, i) { return '<li role="option" tabindex="-1" data-i="' + i + '" aria-selected="' + (o.value === sel.value) + '"' + (o.disabled ? ' aria-disabled="true"' : '') + '><span>' + esc(o.textContent) + '</span></li>'; }).join('') + '</ul>';
    var d = EP.ui.dialog({ title: label.trim(), body: wrap, onClose: function () { busy = false; try { sel.focus(); } catch (e) {} } });
    var ul = wrap.querySelector('ul');
    function pick(li) {
      if (!li || li.getAttribute('aria-disabled')) return;
      var o = opts[Number(li.getAttribute('data-i'))], changed = sel.value !== o.value;
      sel.value = o.value; d.close(o.value);
      if (changed) { sel.dispatchEvent(new Event('input', { bubbles: true })); sel.dispatchEvent(new Event('change', { bubbles: true })); }
    }
    ul.addEventListener('click', function (e) { pick(e.target.closest('li')); });
    ul.addEventListener('keydown', function (e) {
      var li = e.target.closest('li'); if (!li) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(li); }
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); var vis = Array.prototype.filter.call(ul.children, function (x) { return !x.hidden; }), k = vis.indexOf(li) + (e.key === 'ArrowDown' ? 1 : -1); if (vis[k]) vis[k].focus(); }
    });
    var s = wrap.querySelector('.pk-search');
    if (s) s.addEventListener('input', function () { var q = s.value.trim().toLowerCase(); Array.prototype.forEach.call(ul.children, function (li) { li.hidden = q && li.textContent.toLowerCase().indexOf(q) < 0; }); });
    var cur = ul.querySelector('[aria-selected="true"]');
    setTimeout(function () { if (cur) { cur.scrollIntoView({ block: 'center' }); if (!s) cur.focus({ preventScroll: true }); } }, 60);
  }
  function intercept(e) {
    var t = e.target && e.target.closest && e.target.closest('select.input');
    if (!t || t.multiple || t.disabled || t.hasAttribute('data-native') || !narrow()) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (e.type === 'mousedown') { t.focus(); openSheet(t); }
  }
  doc.addEventListener('mousedown', intercept, true);
  doc.addEventListener('keydown', function (e) {
    var t = e.target; if (!t || !t.matches || !t.matches('select.input') || !narrow() || t.hasAttribute('data-native')) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); e.stopImmediatePropagation(); openSheet(t); }
  }, true);
  EP.picker = { open: openSheet };
})(window);
