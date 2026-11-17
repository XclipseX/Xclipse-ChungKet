/* Bộ chọn tuỳ biến cho MỌI <select class="input"> (mô phỏng Lucian 031 select-listbox + 037 dropdown stagger + 034 combobox).
   Giữ <select> gốc làm nguồn giá trị (đồng bộ value + input/change); phủ một "trigger" hiển thị nhãn, giá trị 2 dòng, chevron xoay.
   Danh sách nổi ngay dưới trigger (hết chỗ thì mở lên), không dùng bottom sheet. > 7 mục có ô tìm. Tắt cho 1 select: data-native. */
(function (root) {
  'use strict';
  var doc = root.document, EP = root.EP;
  if (!doc || !EP) return;
  var SEARCH_MIN = 8, open = null, seq = 0;
  function reduced() { return EP.reduced ? EP.reduced() : (root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  function phone() { return root.matchMedia && root.matchMedia('(max-width: 767px)').matches; }
  function coarse() { return root.matchMedia && root.matchMedia('(pointer: coarse)').matches; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fold(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); }
  function split(t) { var i = t.indexOf(' · '); return i > 0 ? [t.slice(0, i).trim(), t.slice(i + 3).trim()] : [t.trim(), '']; }
  function initials(t) {
    var w = t.replace(/\(.*?\)/g, '').trim().split(/\s+/).filter(Boolean);
    if (!w.length) return '·';
    return (w.length === 1 ? w[0].slice(0, 2) : w[w.length - 2].charAt(0) + w[w.length - 1].charAt(0)).toUpperCase();
  }
  function hue(i) { return i % 3; }
  var CHECK = '<svg class="pk-ck" viewBox="0 0 18 18" aria-hidden="true"><path d="M4 9.5l3.5 3.5L14 6"/></svg>';
  var CARET = '<svg class="pk-car" viewBox="0 0 18 18" aria-hidden="true"><path d="M4.5 7l4.5 4.5L13.5 7"/></svg>';
  function optsOf(sel) { return Array.prototype.filter.call(sel.options, function (o) { return !o.hidden && o.label !== ''; }); }
  function fieldLabel(sel) {
    var l = sel.getAttribute('aria-label'); if (l) return l;
    var n = sel.nextElementSibling; if (n && n.classList.contains('label')) return n.textContent.trim();
    if (sel.id) { var f = doc.querySelector('label[for="' + sel.id + '"]'); if (f) return f.textContent.trim(); }
    return 'Chọn';
  }

  /* ---------- trigger phủ lên select ---------- */
  function paint(sel) {
    var t = sel._pk; if (!t) return;
    var o = sel.selectedIndex >= 0 ? sel.options[sel.selectedIndex] : null, txt = o && !o.hidden && o.label !== '' ? o.textContent : '';
    var p = split(txt);
    var idx = o ? optsOf(sel).indexOf(o) : 0;
    t.innerHTML = txt ? '<span class="pk-av pk-h' + hue(Math.max(idx, 0)) + '" aria-hidden="true">' + esc(initials(p[0])) + '</span><span class="pk-v"><b>' + esc(p[0]) + '</b>' + (p[1] ? '<small>' + esc(p[1]) + '</small>' : '') + '</span>' + CARET
      : '<span class="pk-v"></span>' + CARET;
    t.classList.toggle('has-label', !!(sel.nextElementSibling && sel.nextElementSibling.classList.contains('label')));
    t.classList.toggle('is-open', sel.getAttribute('aria-expanded') === 'true');
    place(sel);
  }
  function place(sel) {
    var t = sel._pk; if (!t) return;
    t.hidden = !sel.offsetWidth;
    t.style.cssText = 'left:' + sel.offsetLeft + 'px;top:' + sel.offsetTop + 'px;width:' + sel.offsetWidth + 'px;height:' + sel.offsetHeight + 'px';
  }
  function enhance(sel) {
    if (sel._pk || sel.multiple || sel.size > 1 || sel.hasAttribute('data-native')) return;
    var par = sel.parentNode; if (!par) return;
    if (root.getComputedStyle(par).position === 'static') par.style.position = 'relative';
    var t = doc.createElement('span'); t.className = 'pk-trig'; t.setAttribute('aria-hidden', 'true');
    sel.parentNode.insertBefore(t, sel); sel._pk = t; sel.classList.add('pk-sel');
    sel.setAttribute('role', 'combobox'); sel.setAttribute('aria-haspopup', 'listbox'); sel.setAttribute('aria-expanded', 'false');
    var proto = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
    if (proto && proto.set) Object.defineProperty(sel, 'value', { configurable: true, get: function () { return proto.get.call(sel); }, set: function (v) { proto.set.call(sel, v); paint(sel); } });
    sel.addEventListener('change', function () { paint(sel); });
    if (root.MutationObserver) new MutationObserver(function () { paint(sel); }).observe(sel, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled', 'hidden', 'selected'] });
    if (root.ResizeObserver) new ResizeObserver(function () { place(sel); }).observe(sel);
    paint(sel);
  }
  function scan(r) { Array.prototype.forEach.call((r || doc).querySelectorAll('select.input'), enhance); }

  /* ---------- menu nổi ---------- */
  function close(instant) {
    var b = open; if (!b) return; open = null;
    var sel = b.sel; sel.setAttribute('aria-expanded', 'false'); sel.removeAttribute('aria-activedescendant'); sel.removeAttribute('aria-controls');
    if (sel._pk) sel._pk.classList.remove('is-open');
    doc.removeEventListener('pointerdown', b.onDoc, true); doc.removeEventListener('keydown', b.onKey, true);
    root.removeEventListener('resize', b.onResize); doc.removeEventListener('scroll', b.onScroll, true);
    if (instant || reduced()) b.menu.remove(); else { b.menu.classList.add('is-out'); setTimeout(function () { b.menu.remove(); }, 170); }
  }
  function show(sel) {
    if (open && open.sel === sel) { close(); return; }
    close(true);
    var opts = optsOf(sel); if (!opts.length || sel.disabled) return;
    var uid = 'pk' + (++seq), withSearch = opts.length >= SEARCH_MIN;
    var menu = doc.createElement('div'); menu.className = 'pk-menu lx-listbox'; menu.id = uid;
    var title = fieldLabel(sel);
    menu.innerHTML = (withSearch ? '<div class="pk-sw"><input class="pk-search" type="search" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="' + uid + '-l" placeholder="Tìm…" aria-label="Tìm trong ' + esc(title) + '" autocomplete="off" enterkeyhint="search"></div>' : '') +
      '<ul class="pk-list" id="' + uid + '-l" role="listbox" aria-label="' + esc(title) + '"><li class="pk-hl" role="presentation" aria-hidden="true"></li>' +
      opts.map(function (o, i) {
        var p = split(o.textContent);
        return '<li class="pk-o" role="option" id="' + uid + '-' + i + '" data-i="' + i + '" style="--d:' + Math.min(i, 9) * 24 + 'ms" aria-selected="' + (o.value === sel.value) + '"' + (o.disabled ? ' aria-disabled="true"' : '') + '>' +
          '<span class="pk-av pk-h' + hue(i) + '" aria-hidden="true">' + esc(initials(p[0])) + '</span><span class="pk-v"><b>' + esc(p[0]) + '</b>' + (p[1] ? '<small>' + esc(p[1]) + '</small>' : '') + '</span>' + CHECK + '</li>';
      }).join('') + '</ul><p class="pk-empty" hidden>Không có kết quả</p>';
    doc.body.appendChild(menu);
    var ul = menu.querySelector('.pk-list'), hl = menu.querySelector('.pk-hl'), items = Array.prototype.slice.call(ul.querySelectorAll('.pk-o')), search = menu.querySelector('.pk-search'), empty = menu.querySelector('.pk-empty');
    var act = Math.max(0, opts.findIndex(function (o) { return o.value === sel.value; }));
    /* vị trí: ngay dưới trigger, hết chỗ thì mở lên */
    var r = sel.getBoundingClientRect(), vw = root.innerWidth, vh = root.innerHeight, ph = phone();
    var cap = ph ? Math.round(vh * 0.55) : 320, want = Math.min(cap, (withSearch ? 64 : 0) + opts.length * 48 + 14);
    var below = vh - r.bottom - 12, above = r.top - 12, up = below < Math.min(want, 220) && above > below, room = up ? above : below;
    var w = ph ? Math.min(r.width, vw - 16) : Math.max(r.width, 240), left = Math.max(8, Math.min(r.left, vw - w - 8));
    menu.style.width = w + 'px'; menu.style.left = left + 'px'; menu.style.maxHeight = Math.max(160, Math.min(cap, room)) + 'px';
    if (up) { menu.style.bottom = (vh - r.top + 8) + 'px'; menu.style.setProperty('--lx-origin', '50% 100%'); menu.classList.add('is-up'); } else menu.style.top = (r.bottom + 8) + 'px';
    sel.setAttribute('aria-expanded', 'true'); sel.setAttribute('aria-controls', uid + '-l'); if (sel._pk) sel._pk.classList.add('is-open');
    function vis() { return items.filter(function (li) { return !li.hidden && li.getAttribute('aria-disabled') !== 'true'; }); }
    function mark(i, scroll) {
      act = i; var li = items[act]; if (!li) return;
      items.forEach(function (x, k) { x.classList.toggle('is-active', k === act); });
      (search || sel).setAttribute('aria-activedescendant', li.id);
      hl.style.opacity = '1'; hl.style.height = li.offsetHeight + 'px'; hl.style.transform = 'translateY(' + li.offsetTop + 'px)';
      if (scroll !== false && li.scrollIntoView) li.scrollIntoView({ block: 'nearest' });
    }
    function step(d) { var v = vis(); if (!v.length) return; var k = v.indexOf(items[act]); k = k < 0 ? (d > 0 ? 0 : v.length - 1) : Math.max(0, Math.min(v.length - 1, k + d)); mark(items.indexOf(v[k])); }
    function choose(i) {
      var o = opts[i]; if (!o || o.disabled) return;
      var changed = sel.value !== o.value; sel.value = o.value; paint(sel); close(); try { sel.focus({ preventScroll: true }); } catch (e) {}
      if (changed) { sel.dispatchEvent(new Event('input', { bubbles: true })); sel.dispatchEvent(new Event('change', { bubbles: true })); if (sel._pk && sel._pk.animate && !reduced()) { var v = sel._pk.querySelector('.pk-v'); if (v) v.animate([{ transform: 'translateY(8px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 380, easing: 'cubic-bezier(.34,1.45,.64,1)' }); } }
    }
    var buf = '', bt = 0;
    function onKey(e) {
      if (e.target !== sel && e.target !== search) return;
      var k = e.key;
      if (k === 'ArrowDown') step(1); else if (k === 'ArrowUp') step(-1);
      else if (k === 'Home' && e.target === sel) { var v = vis(); if (v[0]) mark(items.indexOf(v[0])); }
      else if (k === 'End' && e.target === sel) { var w2 = vis(); if (w2.length) mark(items.indexOf(w2[w2.length - 1])); }
      else if (k === 'Enter' || (k === ' ' && e.target === sel)) choose(act);
      else if (k === 'Escape') { close(); try { sel.focus({ preventScroll: true }); } catch (x) {} }
      else if (k === 'Tab') { close(); return; }
      else if (e.target === sel && k.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        clearTimeout(bt); buf += fold(k); bt = setTimeout(function () { buf = ''; }, 700);
        var f = items.findIndex(function (li) { return !li.hidden && fold(li.textContent).indexOf(buf) === 0; }); if (f >= 0) mark(f); else return;
      } else return;
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    }
    open = {
      sel: sel, menu: menu, onKey: onKey,
      onDoc: function (e) { if (!menu.contains(e.target) && e.target !== sel) close(); },
      onResize: function () { if (root.innerWidth !== vw) close(true); },
      onScroll: function (e) { if (!menu.contains(e.target)) close(true); }
    };
    doc.addEventListener('keydown', onKey, true); doc.addEventListener('pointerdown', open.onDoc, true); root.addEventListener('resize', open.onResize); doc.addEventListener('scroll', open.onScroll, true);
    ul.addEventListener('pointermove', function (e) { var li = e.target.closest('.pk-o'); if (li && e.pointerType !== 'touch') { var i = Number(li.getAttribute('data-i')); if (i !== act) mark(i, false); } });
    ul.addEventListener('click', function (e) { var li = e.target.closest('.pk-o'); if (li && li.getAttribute('aria-disabled') !== 'true') choose(Number(li.getAttribute('data-i'))); });
    menu.addEventListener('pointerdown', function (e) { if (e.target !== search) e.preventDefault(); });
    if (search) search.addEventListener('input', function () {
      var q = fold(search.value.trim());
      items.forEach(function (li) { li.hidden = !!q && fold(li.textContent).indexOf(q) < 0; });
      var v = vis(); empty.hidden = !!v.length; hl.style.opacity = v.length ? '1' : '0';
      if (v.length) mark(items.indexOf(v[0]), false);
    });
    mark(act, false);
    var cur = items[act]; if (cur && ul.scrollTo) { var top = Math.max(0, cur.offsetTop - ul.clientHeight / 2 + 24); ul.scrollTop = top; }
    if (search && !coarse()) search.focus({ preventScroll: true });
    requestAnimationFrame(function () { menu.classList.add('is-open'); mark(act, false); });
  }

  /* ---------- chặn hộp chọn gốc và hộp chọn cũ của lucian.js ---------- */
  function mine(t) { return t && t.matches && t.matches('select.input') && t._pk && !t.disabled; }
  doc.addEventListener('mousedown', function (e) { var t = e.target; if (!mine(t) || e.button) return; e.preventDefault(); e.stopImmediatePropagation(); try { t.focus({ preventScroll: true }); } catch (x) {} show(t); }, true);
  doc.addEventListener('click', function (e) { var t = e.target; if (mine(t)) { e.preventDefault(); e.stopImmediatePropagation(); } }, true);
  doc.addEventListener('keydown', function (e) {
    var t = e.target; if (!mine(t) || open) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); e.stopImmediatePropagation(); show(t); }
  }, true);

  scan();
  if (root.MutationObserver) new MutationObserver(function (ms) {
    ms.forEach(function (m) { Array.prototype.forEach.call(m.addedNodes, function (n) { if (n.nodeType === 1) { if (n.matches && n.matches('select.input')) enhance(n); else if (n.querySelectorAll) scan(n); } }); });
  }).observe(doc.documentElement, { childList: true, subtree: true });
  root.addEventListener('resize', function () { Array.prototype.forEach.call(doc.querySelectorAll('select.pk-sel'), place); });
  EP.picker = { open: show, close: close, refresh: function () { scan(); Array.prototype.forEach.call(doc.querySelectorAll('select.pk-sel'), paint); } };
})(window);
