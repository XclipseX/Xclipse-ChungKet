// Unit test EP.referral bằng node vm. Chạy: node tests/referral.cjs
const fs = require('fs'), path = require('path'), vm = require('vm'), assert = require('assert');
const ROOT = path.resolve(__dirname, '..');
const stores = {};
function coll(name) {
  const g = () => stores[name] || (stores[name] = []);
  return { list: () => g().slice(), get: id => g().find(r => r.id === id) || null,
    add: o => { const r = Object.assign({ id: 'x' + g().length }, o); g().unshift(r); return r; },
    update: (id, p) => { let h = null; stores[name] = g().map(r => r.id === id ? (h = Object.assign({}, r, p)) : r); return h; },
    remove: id => { stores[name] = g().filter(r => r.id !== id); }, replace: rows => { stores[name] = rows.slice(); return rows; } };
}
const sb = { console, EP: { collection: coll } }; sb.window = sb; sb.globalThis = sb; vm.createContext(sb);
for (const f of ['js/sample-data.js', 'js/referral.js']) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), sb, { filename: f });
const R = sb.EP.referral, S = sb.EP_SAMPLE;
assert.deepStrictEqual(JSON.parse(JSON.stringify(R.loadSample())), { members: 8, referrals: 12 });
const f = R.forecast(S.assumptions), e = S.expected;
['participants', 'prospects', 'newCustomers', 'revenue', 'rewardCost', 'ratio', 'referralCostPerCustomer', 'saving'].forEach(k => assert.strictEqual(f[k], e[k], k));
assert.strictEqual(f.monthly.length, 6);
assert.strictEqual(R.forecast(Object.assign({}, S.assumptions, { members: 0 })).ratio, 'Không đủ dữ liệu');
assert.strictEqual(R.statusFromVN('Từ chối - trùng'), 'rejected_dup');
// user data kept on reload
const u = R.registerMember({ name: 'Nguyễn Văn An', phone: '0911111111' });
assert.ok(u.ok); assert.ok(!R.registerMember({ name: 'Trùng', phone: '0911111111' }).ok);
assert.ok(!R.registerMember({ name: 'Sai', phone: '123' }).ok);
R.loadSample(); assert.strictEqual(sb.EP.collection('members').list().length, 9);
// self / dup / bad code
let r = R.signup({ refCode: u.member.refCode, customerName: 'An', phone: '0911111111', service: 'Hosting Mini' });
assert.strictEqual(r.status, 'invalid_self');
r = R.signup({ refCode: 'REF-MA01', customerName: 'Khách mẫu 01', phone: 'KH-DEMO-001', service: 'Hosting Mini' });
assert.strictEqual(r.status, 'rejected_dup');
assert.strictEqual(R.signup({ refCode: 'REF-NOPE', customerName: 'x', phone: '0922222222' }).ok, false);
// pay + tier2: An refers Bình (pay) ; Bình refers Chi (pay) -> An gets tier2
const b = R.signup({ refCode: u.member.refCode, customerName: 'Bình', phone: '0933333333', service: 'Hosting Pro' });
assert.strictEqual(b.status, 'pending'); assert.strictEqual(b.referral.rewardTotal, 0);
const pb = R.pay(b.referral.id); assert.strictEqual(pb.status, 'converted'); assert.strictEqual(pb.rewardTotal, 60000);
const bm = R.registerMember({ name: 'Bình', phone: '0933333333' }).member;
const c = R.signup({ refCode: bm.refCode, customerName: 'Chi', phone: '0944444444', service: 'Domain .vn' });
const pc = R.pay(c.referral.id); assert.strictEqual(pc.tier2To, u.member.id);
const st = R.memberStats(u.member.id);
assert.strictEqual(st.tier2Reward, 10000); assert.strictEqual(st.rewardTotal, 40000); assert.strictEqual(st.converted, 1);
console.log('referral.cjs OK');
