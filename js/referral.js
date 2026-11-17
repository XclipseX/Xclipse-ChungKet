/* referral.js - logic chương trình giới thiệu (mô phỏng, lưu local). window.EP.referral
   Tầng 2: khi pay() một lượt mà người giới thiệu R từng là khách đã chuyển đổi của thành viên P
   (referral converted có customerKey == R.phone), lượt này ghi tier2To = P.id và tier2Reward = RULES.tier2Reward.
   memberStats(P) cộng tier2Reward của các lượt có tier2To == P. */
(function (root) {
  'use strict';
  var EP = root.EP;
  var RULES = { rewardReferrer: 30000, rewardNew: 30000, tier2Reward: 10000, condition: 'converted', maxPerMonth: 20 };
  var PRICES = [
    { service: 'Hosting Mini', price: 99000 }, { service: 'Hosting Cơ bản', price: 149000 },
    { service: 'Hosting Pro', price: 279000 }, { service: 'Domain .vn', price: 59000 }, { service: 'Domain .com', price: 420000 }
  ];
  var STATUS_LABEL = { converted: 'Đã chuyển đổi', pending: 'Đang chờ thanh toán', processing: 'Đang xử lý', cancelled: 'Đã hủy',
    invalid_self: 'Không hợp lệ – tự giới thiệu', rejected_dup: 'Từ chối – trùng', reviewing: 'Đang rà soát' };
  var VN = { 'Đã chuyển đổi': 'converted', 'Đang chờ thanh toán': 'pending', 'Đang xử lý': 'processing', 'Đã hủy': 'cancelled',
    'Không hợp lệ': 'invalid_self', 'Từ chối - trùng': 'rejected_dup', 'Từ chối – trùng': 'rejected_dup', 'Đang rà soát': 'reviewing' };

  function members() { return EP.collection('members', { limit: 5000 }); }
  function referrals() { return EP.collection('referrals', { limit: 5000 }); }
  function norm(s) { return String(s == null ? '' : s).replace(/[\s.\-]/g, ''); }
  function today() { try { return new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }); } catch (e) { return new Date().toISOString().slice(0, 10); } }
  function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
  function nextId(list, prefix, w) {
    var max = 0; list.forEach(function (r) { var m = String(r.id).match(/(\d+)$/); if (m) max = Math.max(max, +m[1]); });
    return prefix + pad(max + 1, w);
  }
  function stripVN(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D'); }

  function statusFromVN(t) { t = String(t || '').trim(); return VN[t] || (STATUS_LABEL[t] ? t : 'pending'); }

  function loadSample() {
    var S = root.EP_SAMPLE; if (!S) return { members: 0, referrals: 0 };
    var m = members(), r = referrals();
    var keepM = m.list().filter(function (x) { return x.source !== 'btc'; });
    var keepR = r.list().filter(function (x) { return x.source !== 'btc'; });
    m.replace(S.members.map(function (x) { return Object.assign({}, x); }).concat(keepM));
    r.replace(S.referrals.map(function (x) { return Object.assign({}, x); }).concat(keepR));
    return { members: S.members.length, referrals: S.referrals.length };
  }

  function makeCode(name) {
    var w = stripVN(name).toUpperCase().replace(/[^A-Z ]/g, '').trim().split(/\s+/).filter(Boolean);
    var xx = ((w[0] || 'X')[0] + ((w.length > 1 ? w[w.length - 1] : w[0] || 'X')[0])).toUpperCase();
    var used = members().list().map(function (x) { return x.refCode; }), code, n = 1;
    do { code = 'REF-' + xx + pad(n++, 2); } while (used.indexOf(code) >= 0 && n < 1000);
    return code;
  }

  function registerMember(o) {
    o = o || {};
    var name = String(o.name || '').trim(), phone = norm(o.phone);
    if (name.length < 2) return { ok: false, error: 'Vui lòng nhập họ tên.' };
    if (!/^0\d{9}$/.test(phone)) return { ok: false, error: 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0).' };
    var c = members(), list = c.list();
    if (list.some(function (x) { return norm(x.phone) === phone; })) return { ok: false, error: 'Số điện thoại này đã đăng ký.' };
    var mem = c.add({ id: nextId(list, 'KD-', 3), name: name, phone: phone, refCode: makeCode(name), joinedAt: today(), status: 'Đang hoạt động', source: 'user' });
    return { ok: true, member: mem };
  }

  function priceOf(service) { var p = PRICES.filter(function (x) { return x.service === service; })[0]; return p ? p.price : 0; }

  function signup(o) {
    o = o || {};
    var code = String(o.refCode || '').trim().toUpperCase(), name = String(o.customerName || '').trim(), phone = norm(o.phone);
    var ref = members().list().filter(function (m) { return String(m.refCode).toUpperCase() === code; })[0];
    if (!ref) return { ok: false, reason: 'Mã giới thiệu không tồn tại.' };
    if (!name) return { ok: false, reason: 'Vui lòng nhập tên khách.' };
    if (!phone) return { ok: false, reason: 'Vui lòng nhập số điện thoại.' };
    var c = referrals(), list = c.list(), status = 'pending', reason = '';
    if (phone === norm(ref.phone)) { status = 'invalid_self'; reason = 'Tự giới thiệu chính mình – không hợp lệ.'; }
    else if (list.some(function (x) { return norm(x.customerKey) === phone && x.status !== 'rejected_dup' && x.status !== 'invalid_self'; })) {
      status = 'rejected_dup'; reason = 'Khách đã được ghi nhận trước đó – từ chối trùng.';
    }
    var row = c.add({ id: nextId(list, 'KD-R', 3), referrerId: ref.id, refCode: ref.refCode, customerName: name, customerKey: phone,
      service: o.service || '', date: today(), status: status, revenue: priceOf(o.service), rewardReferrer: 0, rewardNew: 0, rewardTotal: 0,
      tier: 1, parentReferrerId: null, note: reason || 'Chưa phát sinh thanh toán (mô phỏng)', source: 'user' });
    return { ok: status === 'pending', referral: row, status: status, reason: reason };
  }

  function pay(id) {
    var c = referrals(), r = c.get(id);
    if (!r) return null;
    if (['pending', 'processing', 'reviewing'].indexOf(r.status) < 0) return r;
    var patch = { status: 'converted', rewardReferrer: RULES.rewardReferrer, rewardNew: RULES.rewardNew,
      rewardTotal: RULES.rewardReferrer + RULES.rewardNew, note: 'Thanh toán thành công (mô phỏng)' };
    var rm = members().get(r.referrerId);
    if (rm) {
      var parent = c.list().filter(function (x) { return x.status === 'converted' && norm(x.customerKey) === norm(rm.phone); })[0];
      if (parent && parent.referrerId !== r.referrerId) {
        patch.tier2To = parent.referrerId; patch.tier2Reward = RULES.tier2Reward; patch.parentReferrerId = parent.referrerId;
      }
    }
    return c.update(id, patch);
  }

  function cancel(id) { return referrals().update(id, { status: 'cancelled', note: 'Đã hủy' }); }

  function memberStats(id) {
    var all = referrals().list(), mine = all.filter(function (x) { return x.referrerId === id; });
    var cnt = function (s) { return mine.filter(function (x) { return s.indexOf(x.status) >= 0; }).length; };
    var sum = function (k) { return mine.reduce(function (a, x) { return a + (x[k] || 0); }, 0); };
    var t2 = all.filter(function (x) { return x.tier2To === id; }).reduce(function (a, x) { return a + (x.tier2Reward || 0); }, 0);
    return { total: mine.length, converted: cnt(['converted']), pending: cnt(['pending', 'processing', 'reviewing']),
      rejected: cnt(['invalid_self', 'rejected_dup', 'cancelled']), rewardTotal: sum('rewardReferrer') + t2, tier2Reward: t2, referrals: mine };
  }

  function forecast(a) {
    a = a || {};
    var months = a.months || 6, g = a.monthlyGrowth == null ? 0.10 : a.monthlyGrowth;
    var participants = a.members * a.participationRate, prospects = participants * a.referralsPerMember;
    var newC = prospects * a.conversionRate, revenue = newC * a.revenuePerCustomer;
    var per = (a.rewardReferrer || 0) + (a.rewardNew || 0), rewardCost = newC * per;
    var ND = 'Không đủ dữ liệu';
    var ratio = rewardCost > 0 ? revenue / rewardCost : ND;
    var cpc = newC > 0 ? rewardCost / newC : ND;
    var saving = typeof cpc === 'number' ? (a.adCostPerCustomer || 0) - cpc : ND;
    var monthly = [], cum = 0, nc = newC;
    for (var i = 1; i <= months; i++) {
      var rev = nc * a.revenuePerCustomer; cum += nc;
      monthly.push({ month: i, newCustomers: Math.round(nc * 100) / 100, revenue: Math.round(rev), rewardCost: Math.round(nc * per), cumulative: Math.round(cum * 100) / 100 });
      nc = nc * (1 + g);
    }
    var formulas = [
      { label: 'Thành viên tham gia', formula: 'Số thành viên × tỉ lệ tham gia', value: participants },
      { label: 'Khách tiềm năng', formula: 'Thành viên tham gia × lượt giới thiệu mỗi người', value: prospects },
      { label: 'Khách hàng mới', formula: 'Khách tiềm năng × tỉ lệ chuyển đổi', value: newC },
      { label: 'Doanh thu dự kiến tháng đầu', formula: 'Khách hàng mới × doanh thu trung bình mỗi khách', value: revenue },
      { label: 'Tổng chi phí ưu đãi', formula: 'Khách hàng mới × (ưu đãi người giới thiệu + ưu đãi khách mới)', value: rewardCost },
      { label: 'Doanh thu / chi phí ưu đãi', formula: 'Doanh thu ÷ tổng chi phí ưu đãi', value: ratio },
      { label: 'Chi phí referral trên mỗi khách', formula: 'Tổng chi phí ưu đãi ÷ khách hàng mới', value: cpc },
      { label: 'Tiết kiệm trên mỗi khách', formula: 'Chi phí quảng cáo mỗi khách − chi phí referral mỗi khách', value: saving }
    ];
    return { participants: participants, prospects: prospects, newCustomers: newC, revenue: revenue, rewardCost: rewardCost, ratio: ratio,
      referralCostPerCustomer: cpc, saving: saving, monthly: monthly, formulas: formulas };
  }

  EP.referral = { RULES: RULES, PRICES: PRICES, STATUS_LABEL: STATUS_LABEL, statusFromVN: statusFromVN, loadSample: loadSample, makeCode: makeCode,
    registerMember: registerMember, signup: signup, pay: pay, cancel: cancel, memberStats: memberStats, forecast: forecast };
})(window);
