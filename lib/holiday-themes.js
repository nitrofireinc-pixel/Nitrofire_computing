// @ts-nocheck
// Holiday theme pack (ported from Website Foreman's final reworked layout: top corners,
// glowing top-centre piece, top garland/lights, no bottom badge). Inline SVG/CSS only.
// Retuned for nitrofirecomputing.com: dark #010516 background, z-index 30 (below the z-40
// sticky header), starts under the header, pointer-events none, static under reduced motion,
// hidden <=340px and in print. No CMS/backend: the key comes from NEXT_PUBLIC_HOLIDAY_THEME.

const HT_INK = '#16202c';
const HT_BRASS = '#e3b341';
const HT_BRASS_D = '#a97a17';
const HT_SILVER = '#cfd6de';

// ---------- instruments (viewBox 0 0 120 120) ----------
const HT_INSTR = {
  snare: () => `<g stroke="${HT_INK}" stroke-width="2" stroke-linejoin="round">
    <path d="M22 50v34c0 7 17 12 38 12s38-5 38-12V50" fill="#f4f6f8"/>
    <path d="M22 54h76v6H22zM22 80h76v6H22z" fill="${HT_SILVER}"/>
    <ellipse cx="60" cy="50" rx="38" ry="11" fill="#fdfdfd"/>
    <path d="M30 60v20M45 62v20M60 62v20M75 62v20M90 60v20" stroke="${HT_SILVER}" stroke-width="2.5"/>
    <path d="M28 18l40 34M92 14L54 50" stroke="#8a5a2b" stroke-width="4" stroke-linecap="round"/></g>`,
  bassdrum: () => `<g stroke="${HT_INK}" stroke-width="2"><circle cx="60" cy="62" r="44" fill="#002142"/>
    <circle cx="60" cy="62" r="36" fill="#f4f6f8"/><circle cx="60" cy="62" r="44" fill="none" stroke="${HT_SILVER}" stroke-width="5"/>
    <path d="M86 8l-14 30" stroke="#8a5a2b" stroke-width="4" stroke-linecap="round"/><circle cx="70" cy="41" r="6" fill="#fff"/></g>`,
  trumpet: () => `<g stroke="${HT_INK}" stroke-width="2" stroke-linejoin="round" fill="${HT_BRASS}">
    <path d="M8 58h60v8H8z"/><path d="M68 54l40-18v52L68 70z"/><ellipse cx="108" cy="62" rx="5" ry="26" fill="${HT_BRASS_D}"/>
    <path d="M20 66v14c0 6 6 8 12 8h28c6 0 8-4 8-10v-12" fill="none" stroke="${HT_BRASS_D}" stroke-width="5"/>
    <rect x="34" y="40" width="6" height="18"/><rect x="44" y="40" width="6" height="18"/><rect x="54" y="40" width="6" height="18"/>
    <path d="M2 56h8v12H2z" fill="${HT_SILVER}"/></g>`,
  sax: () => `<g stroke="${HT_INK}" stroke-width="2" stroke-linejoin="round" fill="${HT_BRASS}">
    <path d="M40 10l10 4-4 10 8 0v60c0 14 8 20 18 20s16-8 16-18V72l12-6 4 10-6 4v14c0 18-12 30-28 30s-28-12-28-30V30z"/>
    <path d="M24 6l20 6-2 6-20-6z" fill="${HT_INK}"/>
    <g fill="${HT_BRASS_D}"><circle cx="48" cy="40" r="3.5"/><circle cx="48" cy="52" r="3.5"/><circle cx="48" cy="64" r="3.5"/><circle cx="48" cy="76" r="3.5"/></g></g>`,
  sousaphone: () => `<g stroke="${HT_INK}" stroke-width="2" stroke-linejoin="round">
    <circle cx="52" cy="70" r="36" fill="none" stroke="${HT_BRASS}" stroke-width="10"/>
    <circle cx="52" cy="70" r="36" fill="none" stroke="${HT_INK}" stroke-width="1"/>
    <path d="M70 40L88 8h28L104 54z" fill="${HT_BRASS}"/><ellipse cx="102" cy="10" rx="16" ry="5" fill="#f4f6f8"/>
    <rect x="44" y="60" width="5" height="16" fill="${HT_BRASS_D}"/><rect x="52" y="60" width="5" height="16" fill="${HT_BRASS_D}"/><rect x="60" y="60" width="5" height="16" fill="${HT_BRASS_D}"/></g>`,
  trombone: () => `<g stroke="${HT_INK}" stroke-width="2" stroke-linejoin="round" fill="${HT_BRASS}">
    <path d="M6 44h70v5H6zM6 70h70v5H6z"/><path d="M6 44v31" fill="none" stroke="${HT_BRASS}" stroke-width="5"/>
    <path d="M76 44h8v31h-8" fill="none" stroke="${HT_BRASS_D}" stroke-width="4"/>
    <path d="M40 58h44l26-20v48L84 66H40z"/><ellipse cx="110" cy="62" rx="5" ry="24" fill="${HT_BRASS_D}"/></g>`,
  clarinet: () => `<g stroke="${HT_INK}" stroke-width="2" transform="rotate(-35 60 60)">
    <rect x="54" y="4" width="12" height="96" rx="3" fill="#20262e"/><path d="M50 100h20l8 16H42z" fill="#20262e"/>
    <path d="M56 0h8l-1 8h-6z" fill="${HT_INK}"/><g fill="${HT_SILVER}"><circle cx="60" cy="28" r="2.5"/><circle cx="60" cy="42" r="2.5"/><circle cx="60" cy="56" r="2.5"/><circle cx="60" cy="70" r="2.5"/><circle cx="60" cy="84" r="2.5"/></g></g>`,
  horn: () => `<g stroke="${HT_INK}" stroke-width="2" fill="none"><circle cx="54" cy="62" r="34" stroke="${HT_BRASS}" stroke-width="8"/>
    <circle cx="54" cy="62" r="20" stroke="${HT_BRASS_D}" stroke-width="6"/>
    <path d="M78 86l24 18-4 12-30-16z" fill="${HT_BRASS}"/><ellipse cx="102" cy="112" rx="14" ry="6" fill="${HT_BRASS_D}" transform="rotate(-30 102 112)"/></g>`,
  bells: () => `<g stroke="${HT_INK}" stroke-width="2"><path d="M60 6L22 108h76z" fill="#002142"/>
    ${[0,1,2,3,4,5].map(i=>`<rect x="${36+i*2}" y="${36+i*12}" width="${48-i*4+i*8}" height="7" rx="2" fill="${HT_SILVER}" transform="translate(${-i*2} 0)"/>`).join('')}
    <path d="M60 6v-4" stroke="${HT_INK}"/><circle cx="60" cy="6" r="4" fill="${HT_BRASS}"/></g>`,
};

// ---------- motif pieces ----------
const htStar = (x, y, r, fill) => {
  let d = '';
  for (let i = 0; i < 10; i += 1) { const a = -Math.PI / 2 + i * Math.PI / 5; const rr = i % 2 ? r * 0.42 : r; d += `${i ? 'L' : 'M'}${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`; }
  return `<path d="${d}Z" fill="${fill}"/>`;
};
const htHeart = (x, y, s, fill) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 4C-2-2-10-1-10 5c0 5 6 8 10 12 4-4 10-7 10-12 0-6-8-7-10-1z" fill="${fill}"/>`;
const htShamrock = (x, y, s, fill = '#2e9e4f') => `<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}"><circle cx="0" cy="-6" r="5.5"/><circle cx="-6" cy="1" r="5.5"/><circle cx="6" cy="1" r="5.5"/><path d="M0 2q2 8-2 14" stroke="${fill}" stroke-width="2" fill="none"/></g>`;
const htBurst = (x, y, r, color) => `<g stroke="${color}" stroke-width="2.4" stroke-linecap="round">${[...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<path d="M${(x + r * .35 * Math.cos(a)).toFixed(1)} ${(y + r * .35 * Math.sin(a)).toFixed(1)}L${(x + r * Math.cos(a)).toFixed(1)} ${(y + r * Math.sin(a)).toFixed(1)}"/>`; }).join('')}</g>`;
const htLeaf = (x, y, s, fill, rot = 0) => `<path transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" d="M0-10C7-6 9 2 0 10-9 2-7-6 0-10zM0-10V12" fill="${fill}" stroke="${HT_INK}" stroke-width=".8"/>`;
const htFlake = (x, y, r, c = '#ffffff') => `<g stroke="${c}" stroke-width="1.8" stroke-linecap="round">${[0, 60, 120].map(a => `<path transform="rotate(${a} ${x} ${y})" d="M${x} ${y - r}V${y + r}M${x - r * .3} ${y - r * .7}L${x} ${y - r * .45}L${x + r * .3} ${y - r * .7}M${x - r * .3} ${y + r * .7}L${x} ${y + r * .45}L${x + r * .3} ${y + r * .7}"/>`).join('')}</g>`;
const htEgg = (x, y, s, fill, band) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0-12C7-12 10 0 10 4c0 6-4 9-10 9S-10 10-10 4C-10 0-7-12 0-12z" fill="${fill}" stroke="${HT_INK}" stroke-width="1"/><path d="M-9 0q4.5-4 9 0t9 0" stroke="${band}" stroke-width="2.5" fill="none"/></g>`;
const htPoppy = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="-4" cy="-3" r="6" fill="#c8102e"/><circle cx="4" cy="-3" r="6" fill="#c8102e"/><circle cx="-4" cy="4" r="6" fill="#b00d27"/><circle cx="4" cy="4" r="6" fill="#b00d27"/><circle r="3" fill="${HT_INK}"/></g>`;
const htBulbs = (pts) => {
  const cols = ['#e3342f', '#ffd400', '#2fb34a', '#3a8dde'];
  return `<path d="M${pts.map(p => p.join(' ')).join('Q')}" fill="none"/>` + pts.map(([x, y], i) => `<ellipse class="ht-bulb" style="animation-delay:${(i % 4) * .4}s" cx="${x}" cy="${y + 4}" rx="3.2" ry="4.6" fill="${cols[i % 4]}" stroke="${HT_INK}" stroke-width=".8"/>`).join('');
};

// ---------- the 17 themes ----------
// window: suggested on/off dates for the Foreman (overlay has no scheduler today; see README).
const HT_THEMES = {
  newyear: { label: "New Year's", instrument: 'trumpet', window: 'Dec 31 – Jan 2', garland: 'confetti', colors: ['#ffd400', '#ffffff', '#3a8dde', '#e3342f'], particle: 'confetti',
    motif: () => htBurst(86, 18, 16, '#ffd400') + htBurst(108, 34, 10, '#3a8dde') + htBurst(66, 6, 8, '#e3342f') },
  mlk: { label: 'Martin Luther King Jr. Day', instrument: 'horn', window: '3rd Mon of Jan (Fri–Mon)', garland: 'rays', colors: ['#f2b544'], particle: null, solemn: true,
    motif: () => `<circle cx="96" cy="22" r="14" fill="#f2b544" opacity=".9"/><path d="M78 30q10-8 18-2 8-10 20-4-8 2-12 10-12 6-26-4z" fill="#ffffff" stroke="${HT_INK}" stroke-width="1.4"/>` },
  presidents: { label: "Presidents' Day", instrument: 'snare', window: '3rd Mon of Feb (Fri–Mon)', garland: 'bunting', colors: ['#c8102e', '#ffffff', '#002868'], particle: 'star',
    motif: () => `<path d="M22 70q38 16 76 0v8q-38 16-76 0z" fill="#c8102e" stroke="${HT_INK}" stroke-width="1.4"/><path d="M22 74q38 16 76 0" stroke="#fff" stroke-width="2.5" fill="none"/>` + htStar(60, 40, 7, '#002868') },
  valentines: { label: "Valentine's Day", instrument: 'trombone', window: 'Feb 10 – Feb 14', garland: 'hearts', colors: ['#e0245e', '#ff7aa2', '#ffffff'], particle: 'heart',
    motif: () => htHeart(104, 26, 1.2, '#e0245e') + htHeart(88, 12, .8, '#ff7aa2') + htHeart(22, 30, .9, '#e0245e') },
  stpatricks: { label: "St. Patrick's Day", instrument: 'trumpet', window: 'Mar 14 – Mar 17', garland: 'shamrocks', colors: ['#2e9e4f', '#7bc96f', '#ffd400'], particle: 'shamrock',
    motif: () => htShamrock(100, 22, 1.3) + htShamrock(80, 12, .9, '#7bc96f') + htShamrock(24, 30, 1) },
  easter: { label: 'Easter / Spring', instrument: 'clarinet', window: 'Good Friday – Easter Monday', garland: 'pastel', colors: ['#f7b2d0', '#b8e1ff', '#fff3a6', '#c9f2c7'], particle: 'petal',
    motif: () => htEgg(92, 98, 1.3, '#f7b2d0', '#7a4fb8') + htEgg(108, 104, 1, '#b8e1ff', '#2fb34a') + htEgg(22, 104, 1.1, '#fff3a6', '#e0245e') },
  memorial: { label: 'Memorial Day', instrument: 'trumpet', window: 'Last Mon of May (Sat–Mon)', garland: 'bunting', colors: ['#c8102e', '#ffffff', '#002868'], particle: null, solemn: true,
    motif: () => htPoppy(96, 20, 1.2) + htPoppy(80, 30, .8) + `<path d="M98 26q-4 10 2 20" stroke="#2e7d32" stroke-width="2" fill="none"/>` },
  juneteenth: { label: 'Juneteenth', instrument: 'bassdrum', window: 'Jun 17 – Jun 19', garland: 'bunting', colors: ['#c8102e', '#ffffff', '#002868'], particle: 'star',
    motif: () => `<path d="M24 74q36-14 72 0" stroke="#c8102e" stroke-width="4" fill="none"/>` + htBurst(60, 62, 22, '#c8102e') + htStar(60, 62, 10, '#002868') },
  july4: { label: 'Independence Day', instrument: 'sax', window: 'Jul 1 – Jul 5', garland: 'bunting', colors: ['#c8102e', '#ffffff', '#002868', '#ffd400'], particle: 'spark',
    motif: () => htBurst(98, 18, 16, '#c8102e') + htBurst(20, 22, 12, '#3a8dde') + htBurst(104, 52, 9, '#ffd400') + htStar(98, 18, 4, '#fff') },
  labor: { label: 'Labor Day', instrument: 'sousaphone', window: '1st Mon of Sep (Fri–Mon)', garland: 'bunting', colors: ['#c8102e', '#ffffff', '#002868'], particle: null,
    motif: () => `<g stroke="${HT_INK}" stroke-width="1.6"><path d="M84 4c0-8 10-12 18-12s18 4 18 12z" fill="#ffd400" transform="translate(0 4)"/><rect x="80" y="6" width="44" height="4" rx="2" fill="#f2c200"/><path d="M102-6v12" stroke="#c99a00"/></g>` },
  indigenous: { label: "Columbus Day / Indigenous Peoples' Day", instrument: 'horn', window: '2nd Mon of Oct (Sat–Mon)', garland: 'leaves', colors: ['#c4511c', '#e0a030', '#7a3b12'], particle: 'leaf',
    motif: () => htLeaf(98, 20, 1.2, '#c4511c', 20) + htLeaf(84, 10, .9, '#e0a030', -30) + `<g transform="translate(22 22)" stroke="${HT_INK}" stroke-width="1.4"><circle r="12" fill="#f3e6c8"/><path d="M0-11L3 0 0 11-3 0z" fill="#c8102e"/></g>` },
  halloweendrum: { label: 'Halloween (band add-on)', instrument: 'bassdrum', window: 'Oct 24 – Oct 31', garland: 'none', colors: ['#ff7a1a', '#1f2630'], particle: null,
    motif: () => `<g transform="translate(60 62)"><circle r="34" fill="#ff7a1a" stroke="${HT_INK}" stroke-width="2"/><path d="M-18-8l8-8 6 8zM18-8l-8-8-6 8zM-20 10q20 16 40 0l-6 4-4-4-5 5-5-5-5 5-5-5z" fill="#1f2630"/><path d="M0-34q2-8 8-10" stroke="#2e7d32" stroke-width="4" fill="none"/></g>`,
    note: 'Pairs with (does not replace) the existing halloween webs/bat.' },
  veterans: { label: 'Veterans Day', instrument: 'snare', window: 'Nov 9 – Nov 11', garland: 'bunting', colors: ['#c8102e', '#ffffff', '#002868'], particle: null, solemn: true,
    motif: () => `<path d="M22 70q38 16 76 0v8q-38 16-76 0z" fill="#002868" stroke="${HT_INK}" stroke-width="1.4"/>` + htStar(42, 76, 4, '#fff') + htStar(60, 79, 4, '#fff') + htStar(78, 76, 4, '#fff') },
  thanksgiving: { label: 'Thanksgiving', instrument: 'sousaphone', window: 'Mon – Sun of Thanksgiving week', garland: 'leaves', colors: ['#c4511c', '#e0a030', '#7a3b12'], particle: 'leaf',
    motif: () => `<g stroke="${HT_INK}" stroke-width="1.6" transform="translate(0 2)"><path d="M88 -2h28l4 22H84z" fill="#1d1d1f"/><rect x="80" y="18" width="44" height="5" rx="2" fill="#1d1d1f"/><rect x="88" y="11" width="28" height="6" fill="#d8c08a"/><rect x="98" y="10" width="8" height="8" fill="none" stroke="${HT_BRASS}" stroke-width="2"/></g>` + htLeaf(30, 108, 1.1, '#c4511c', 30) },
  hanukkah: { label: 'Hanukkah', instrument: 'bells', window: '8 nights (2026: Dec 4–12 · 2027: Dec 24–Jan 1 · 2028: Dec 12–20)', garland: 'blue', colors: ['#2a6fdb', '#ffffff', '#cfd6de'], particle: 'flake',
    motif: () => `<g transform="translate(98 26)" stroke="${HT_INK}" stroke-width="1.6"><path d="M-10-10h20v14L0 16-10 4z" fill="#2a6fdb"/><rect x="-2" y="-18" width="4" height="8" fill="${HT_SILVER}"/></g>` + htStar(22, 24, 10, '#2a6fdb') },
  winter: { label: 'Winter (December, non-denominational)', instrument: 'bells', window: 'Dec 1 – Dec 20 (and Jan 3 – Jan 15 if wanted)', garland: 'blue', colors: ['#ffffff', '#b8e1ff'], particle: 'flake',
    motif: () => htFlake(98, 20, 12, '#b8e1ff') + htFlake(22, 28, 9, '#ffffff') + htFlake(104, 48, 6, '#ffffff') },
  christmas: { label: 'Christmas', instrument: 'snare', window: 'Dec 21 – Dec 26', garland: 'lights', colors: ['#e3342f', '#2fb34a', '#ffd400', '#ffffff'], particle: 'flake',
    motif: () => `<g stroke="#2e7d32" stroke-width="1.6">${htBulbs([[18, 56], [40, 70], [62, 66], [84, 74], [102, 60]])}</g><g stroke="#2e7d32" stroke-width="1.6">${htBulbs([[22, 88], [44, 96], [70, 94], [96, 86]])}</g><g transform="translate(62 46)"><path d="M-10 0q-6-8 0-8l10 6 10-6q6 0 0 8l-10-2z" fill="#e3342f" stroke="${HT_INK}" stroke-width="1"/></g>` },
};

// ---------- top garland strip ----------
function htGarland(kind, colors, w) {
  const n = Math.ceil(w / 40);
  const seg = (i) => i * 40;
  switch (kind) {
    case 'bunting': return [...Array(n)].map((_, i) => `<path d="M${seg(i)} 0h40l-20 ${i % 2 ? 16 : 18}z" fill="${colors[i % 3]}" stroke="rgba(0,0,0,.25)" stroke-width=".6"/>`).join('') + `<path d="M0 1H${w}" stroke="${HT_INK}" stroke-width="1.4"/>`;
    case 'lights': return `<path d="M0 2${[...Array(n)].map((_, i) => `Q${seg(i) + 20} 14 ${seg(i) + 40} 2`).join('')}" stroke="#2e7d32" stroke-width="1.6" fill="none"/>` + [...Array(n)].map((_, i) => `<ellipse class="ht-bulb" style="animation-delay:${(i % 4) * .4}s" cx="${seg(i) + 20}" cy="13" rx="3.4" ry="5" fill="${['#e3342f', '#ffd400', '#2fb34a', '#3a8dde'][i % 4]}"/>`).join('');
    case 'hearts': return [...Array(n)].map((_, i) => htHeart(seg(i) + 20, 2, .7, colors[i % 2])).join('');
    case 'shamrocks': return [...Array(n)].map((_, i) => htShamrock(seg(i) + 20, 8, .7, colors[i % 2])).join('');
    case 'leaves': return [...Array(n)].map((_, i) => htLeaf(seg(i) + 20, 8, .8, colors[i % 3], (i % 2 ? 40 : -40))).join('');
    case 'confetti': return [...Array(n * 2)].map((_, i) => `<rect x="${i * 20 + (i * 7) % 11}" y="${(i * 13) % 14}" width="5" height="3" transform="rotate(${(i * 37) % 90} ${i * 20} 6)" fill="${colors[i % colors.length]}"/>`).join('');
    case 'pastel': return [...Array(n)].map((_, i) => `<circle cx="${seg(i) + 20}" cy="6" r="5" fill="${colors[i % 4]}"/>`).join('');
    case 'blue': return [...Array(n)].map((_, i) => htFlake(seg(i) + 20, 9, 6, i % 2 ? '#b8e1ff' : '#ffffff')).join('');
    case 'rays': return `<path d="M0 0H${w}" stroke="#f2b544" stroke-width="3" opacity=".7"/>`;
    default: return '';
  }
}

const HT_PARTICLE = {
  confetti: (c) => `<rect width="8" height="5" fill="${c}"/>`,
  star: (c) => htStar(6, 6, 6, c === '#ffffff' ? '#c8102e' : c),
  heart: (c) => htHeart(10, 2, .9, c),
  shamrock: (c) => htShamrock(10, 10, .8, c),
  petal: (c) => `<ellipse cx="6" cy="4" rx="6" ry="3.5" fill="${c}"/>`,
  spark: (c) => `<circle cx="4" cy="4" r="3" fill="${c}"/>`,
  leaf: (c) => htLeaf(10, 10, .9, c, 0),
  flake: () => htFlake(10, 10, 8, '#ffffff'),
};

// ---------- top corner clusters (viewBox 0 0 200 200, drawn from the top-left corner; mirrored on the right) ----------
const htHexStar = (x, y, r, c) => `<g fill="none" stroke="${c}" stroke-width="2.2" stroke-linejoin="round"><path d="M${x} ${y - r}L${(x + r * .866).toFixed(1)} ${(y + r / 2).toFixed(1)}H${(x - r * .866).toFixed(1)}Z"/><path d="M${x} ${y + r}L${(x + r * .866).toFixed(1)} ${(y - r / 2).toFixed(1)}H${(x - r * .866).toFixed(1)}Z"/></g>`;
const htHolly = (x, y, s) => htLeaf(x - 6 * s, y, s, '#2e9e4f', -60) + htLeaf(x + 6 * s, y, s, '#2e9e4f', 60) + `<g fill="#e3342f" stroke="${HT_INK}" stroke-width=".6"><circle cx="${x}" cy="${y + 2 * s}" r="${3 * s}"/><circle cx="${x - 3 * s}" cy="${y + 6 * s}" r="${2.6 * s}"/><circle cx="${x + 3 * s}" cy="${y + 6 * s}" r="${2.6 * s}"/></g>`;
const htOrnament = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0-22V-10" stroke="#eef3f8" stroke-width="1"/><rect x="-3" y="-12" width="6" height="4" fill="${HT_SILVER}"/><circle r="8" fill="${c}" stroke="${HT_INK}" stroke-width=".8"/><path d="M-6-3q6 3 12 0" stroke="#fff" stroke-width="1.2" fill="none" opacity=".7"/></g>`;
// Each piece is drawn at (x, y) with scale s; i is the piece index (for colour cycling).
const HT_CORNER_PIECE = {
  newyear: (x, y, s, i) => htBurst(x, y, 12 * s, ['#ffd400', '#3a8dde', '#e3342f', '#ffffff'][i % 4]),
  mlk: (x, y, s) => htStar(x, y, 7 * s, '#f2b544'),
  presidents: (x, y, s, i) => htStar(x, y, 8 * s, ['#ffffff', '#c8102e', '#ffffff'][i % 3]),
  valentines: (x, y, s, i) => htHeart(x, y - 6 * s, s, ['#e0245e', '#ff7aa2'][i % 2]),
  stpatricks: (x, y, s, i) => htShamrock(x, y, s, ['#2e9e4f', '#7bc96f'][i % 2]),
  easter: (x, y, s, i) => htEgg(x, y, s * .9, ['#f7b2d0', '#b8e1ff', '#fff3a6', '#c9f2c7'][i % 4], ['#7a4fb8', '#2fb34a', '#e0245e', '#3a8dde'][i % 4]),
  memorial: (x, y, s) => htPoppy(x, y, s * .9),
  juneteenth: (x, y, s, i) => htStar(x, y, 8 * s, ['#ffffff', '#c8102e'][i % 2]),
  july4: (x, y, s, i) => htBurst(x, y, 12 * s, ['#c8102e', '#ffffff', '#3a8dde', '#ffd400'][i % 4]),
  labor: (x, y, s, i) => htStar(x, y, 8 * s, ['#ffd400', '#ffffff', '#c8102e'][i % 3]),
  indigenous: (x, y, s, i) => htLeaf(x, y, s * 1.1, ['#c4511c', '#e0a030', '#7a3b12'][i % 3], i * 50),
  halloweendrum: (x, y, s, i) => htLeaf(x, y, s * 1.1, ['#ff7a1a', '#e0a030'][i % 2], i * 50),
  veterans: (x, y, s, i) => htStar(x, y, 8 * s, ['#ffffff', '#c8102e'][i % 2]),
  thanksgiving: (x, y, s, i) => htLeaf(x, y, s * 1.1, ['#c4511c', '#e0a030', '#7a3b12'][i % 3], i * 50),
  hanukkah: (x, y, s) => htHexStar(x, y, 9 * s, '#8fc1ff'),
  winter: (x, y, s, i) => htFlake(x, y, 9 * s, ['#ffffff', '#b8e1ff'][i % 2]),
  christmas: (x, y, s, i) => (i % 2 ? htOrnament(x, y, s, ['#e3342f', '#ffd400', '#3a8dde'][i % 3]) : htHolly(x, y, s * .8)),
};
// Strands along the top edge, down the side and one diagonal, like the Halloween web spokes.
// Kept in the page gutter so pieces never sit on the logo, utility links, nav or phone header icons.
const HT_CORNER_SPOTS = [[18, 18, .95], [14, 64, .9], [13, 126, .85], [12, 178, .75]];
function htCornerSvg(key) {
  const piece = HT_CORNER_PIECE[key];
  const strands = '<path d="M0 4Q60 16 120 6M4 0Q22 100 10 196" fill="none" stroke="#eef3f8" stroke-width="1.4" stroke-linecap="round" opacity=".55" vector-effect="non-scaling-stroke"/>';
  return strands + HT_CORNER_SPOTS.map(([x, y, s], i) => `<g class="ht-s${i}">${piece(x, y, s, i)}</g>`).join('');
}

export const HOLIDAY_THEME_KEYS = Object.keys(HT_THEMES).filter((k) => HT_CORNER_PIECE[k]);

// Mounts the theme layer and returns a cleanup function (or null if the key is unknown).
export function mountHolidayTheme(key) {
  const t = HT_THEMES[key];
  const id = `nf-holiday-${key}`;
  if (!t || !HT_CORNER_PIECE[key] || document.getElementById(id)) return null;
  const glow = 'drop-shadow(0 0 2px rgba(255,255,255,.55)) drop-shadow(0 0 6px rgba(255,255,255,.25))';
  const style = document.createElement('style');
  style.textContent = `
#${id}{position:fixed;left:0;right:0;top:4.5rem;bottom:0;z-index:30;pointer-events:none;overflow:hidden;contain:strict}
@media (min-width:640px){#${id}{top:5rem}}
#${id} svg{position:absolute;display:block;overflow:visible}
#${id} .ht-garland{left:0;top:0;width:100%;height:12px;opacity:.95;filter:${glow}}
#${id} .ht-corner{top:0;width:var(--ht-corner,200px);height:var(--ht-corner,200px);opacity:.9;filter:${glow}}
#${id} .ht-corner.l{left:0}
#${id} .ht-corner.r{right:0;transform:scaleX(-1)}
#${id} .ht-center{left:50%;top:16px;width:var(--ht-cw,84px);height:var(--ht-cw,84px);margin-left:calc(var(--ht-cw,84px) / -2);opacity:.97;filter:drop-shadow(0 0 8px rgba(255,255,255,.75)) drop-shadow(0 0 20px rgba(255,255,255,.4));animation:ht-sway 6s ease-in-out infinite;transform-origin:50% 0}
#${id} .ht-p{top:-24px;width:20px;height:20px;opacity:.85;animation:ht-fall var(--d,14s) linear infinite;animation-delay:var(--dl,0s);will-change:transform}
#${id} .ht-bulb{animation:ht-twinkle 1.6s ease-in-out infinite alternate}
@keyframes ht-sway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
@keyframes ht-fall{from{transform:translate3d(0,0,0) rotate(0)}to{transform:translate3d(var(--dx,20px),110vh,0) rotate(300deg)}}
@keyframes ht-twinkle{from{opacity:1}to{opacity:.35}}
@media (max-width:640px){#${id}{--ht-corner:96px;--ht-cw:48px}#${id} .ht-p:nth-of-type(n+6){display:none}#${id} .ht-garland{height:9px}#${id} .ht-corner .ht-s0,#${id} .ht-corner .ht-s1{display:none}#${id} .ht-center{top:12px;filter:drop-shadow(0 0 4px rgba(255,255,255,.75)) drop-shadow(0 0 10px rgba(255,255,255,.4))}}
@media (max-width:340px){#${id}{display:none}}
@media (prefers-reduced-motion:reduce){#${id} *{animation:none!important}#${id} .ht-p{display:none}}
@media print{#${id}{display:none}}`;
  const wrap = document.createElement('div');
  wrap.id = id;
  wrap.className = 'nf-holiday-theme';
  wrap.setAttribute('aria-hidden', 'true');
  const W = 1600;
  const corner = htCornerSvg(key);
  let html = t.garland && t.garland !== 'none'
    ? `<svg class="ht-garland" viewBox="0 0 ${W} 20" preserveAspectRatio="xMinYMin slice" focusable="false">${htGarland(t.garland, t.colors, W)}</svg>` : '';
  html += `<svg class="ht-corner l" viewBox="0 0 200 200" focusable="false">${corner}</svg><svg class="ht-corner r" viewBox="0 0 200 200" focusable="false">${corner}</svg>`;
  html += `<svg class="ht-center" viewBox="-4 -12 128 132" focusable="false">${HT_INSTR[t.instrument]()}${t.motif()}</svg>`;
  if (t.particle && !t.solemn) {
    for (let i = 0; i < 10; i += 1) {
      const c = t.colors[i % t.colors.length];
      html += `<svg class="ht-p" style="left:${(i * 37 + 5) % 100}%;--d:${12 + (i * 5) % 9}s;--dl:${-(i * 2.3).toFixed(1)}s;--dx:${(i % 2 ? 1 : -1) * (20 + i * 4)}px" viewBox="0 0 20 20" focusable="false">${HT_PARTICLE[t.particle](c)}</svg>`;
    }
  }
  wrap.innerHTML = html;
  wrap.innerHTML = html;
  document.head.appendChild(style);
  document.body.appendChild(wrap);
  return () => { wrap.remove(); style.remove(); };
}
