/* ============ the public website ============ */
const CODE = '47193';
const isStock = () => store.get('gh-stock') === '1';
const isUnlocked = () => store.get('gh-unlocked') === '1';
let CLEAN = [];
const onClean = fn => CLEAN.push(fn);
function every(ms, fn) { const id = setInterval(fn, ms); onClean(() => clearInterval(id)); return id; }
function later(ms, fn) { const id = setTimeout(fn, ms); onClean(() => clearTimeout(id)); return id; }
function loop(fn) { let on = true, id; const f = t => { if (!on) return; fn(t); id = requestAnimationFrame(f); }; id = requestAnimationFrame(f); onClean(() => { on = false; cancelAnimationFrame(id); }); }
function listen(el, ev, fn, opt) { el.addEventListener(ev, fn, opt); onClean(() => el.removeEventListener(ev, fn, opt)); }

function toast(msg, ms = 3200) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.id); toast.id = setTimeout(() => { t.hidden = true; }, ms); }
function openModal(html, cls = '') {
  const m = $('#modal'); m.className = 'modal ' + cls; $('#modal-body').innerHTML = html; m.hidden = false;
  $('#modal-x').focus();
}
function closeModal() { const m = $('#modal'); m.hidden = true; $('#modal-body').innerHTML = ''; if (closeModal.after) { const f = closeModal.after; closeModal.after = null; f(); } }

const PIG_MINI = `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 12 L6 3 L15 9Z M32 12 L34 3 L25 9Z" fill="#F49AAE"/><circle cx="20" cy="22" r="15" fill="#F7A8B8"/><ellipse cx="20" cy="26" rx="7" ry="5" fill="#F48FA4" stroke="#D86E86"/><circle cx="17.5" cy="26" r="1.4" fill="#9a3e55"/><circle cx="22.5" cy="26" r="1.4" fill="#9a3e55"/><circle cx="14" cy="18" r="2" fill="#1b1016"/><circle cx="26" cy="18" r="2" fill="#1b1016"/></svg>`;

const NAV = [['home', 'Home'], ['story', 'Our Story'], ['products', 'Products'], ['recipes', 'Recipes'], ['careers', 'Careers'], ['contact', 'Contact']];
let cartN = +(store.get('gh-cart') || 0);
function publicShell(route, inner) {
  return `<div class="pub ${isStock() ? 'is-stock' : ''}">
  <header class="pub-nav"><div class="wrap nav-in">
    <a class="logo" href="#home" aria-label="Gladhaven Farms home"><span class="logo-pig">${PIG_MINI}</span><span class="logo-word">Gladhaven<small>Farms · est. 1962</small></span></a>
    <nav class="nav-links" aria-label="Main">${NAV.map(([k, l]) => `<a href="#${k}" ${k === route ? 'aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
    <a class="cart" href="#products" aria-label="Cart"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6"/></svg><span id="cart-n">${cartN}</span></a>
  </div></header>
  <main id="main">${inner}</main>
  <footer class="pub-foot"><div class="wrap foot-in">
    <div class="foot-brand"><span class="logo-pig">${PIG_MINI}</span><div><b>Gladhaven Farms</b><p>1 Harrow Lane, Harlow County<br>Happy animals. Honest meat.</p></div></div>
    <div class="foot-cols">
      <div><b>Shop</b><a href="#products">All products</a><a href="#recipes">Recipes</a><a href="#products">Where to buy</a></div>
      <div><b>Company</b><a href="#story">Our story</a><a href="#careers">Careers</a><a href="#contact">Contact</a></div>
      <div><b>Help</b><a href="#contact">FAQ</a><a href="#contact">Product recalls</a><a href="#login" class="staff-link">Employee login</a></div>
    </div>
  </div>
  <div class="wrap foot-legal"><span>© 1962–2026 Gladhaven Farms, Inc. All stock reserved${isStock() ? '. Including you, GH-H-1205' : ''}.</span><span>A fictional company. This site is satire.</span></div></footer>
</div>`;
}

/* ---------- HOME ---------- */
function pageHome() {
  const night = new Date().getHours() < 4;
  const stock = isStock();
  return publicShell('home', `
  <section class="hero ${night ? 'night' : ''}">
    <div class="hero-art">${heroSVG()}</div>
    <div class="wrap hero-copy">
      <span class="kicker">${stock ? 'Welcome home, GH-H-1205' : 'Family farmed since 1962'}</span>
      <h1>${night ? "We're closed.<br>Go to sleep." : 'Happy animals.<br>Honest meat.'}</h1>
      <p>${night ? 'The farm is resting. Everyone is in their stall. Please do not come looking.' : 'For over sixty years the Gladwell family has raised livestock the old-fashioned way, with patience, kindness and a whole lot of love. Our animals are happy to be here. Just ask them.'}</p>
      <div class="ctas"><a class="btn btn-red" href="#products">Shop Willing Cuts™</a><a class="btn btn-white" href="#story">Our story</a></div>
    </div>
  </section>
  <div class="band"><div class="wrap band-in"><span>Family-owned since 1962</span><span>100% contented stock</span><span>No cages. No fear.</span><span>On 11 million tables</span><span class="hid">they are not pigs ① 4</span></div></div>

  <section class="sec"><div class="wrap">
    <div class="sec-head"><span class="kicker">The Gladhaven difference</span><h2>Raised right. Raised willing.</h2></div>
    <div class="values">
      <article class="value"><div class="v-ico v-red"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.5-9.3C1.1 8.3 3.3 5 6.6 5c2 0 3.4 1.1 4.4 2.5C12 6.1 13.4 5 15.4 5c3.3 0 5.5 3.3 4.1 6.7C19.5 16.4 12 21 12 21z"/></svg></div><h3>Raised with love</h3><p>Every animal on our farm is named, known and cared for by hand, from the day it arrives to the day it's ready.</p></article>
      <article class="value"><div class="v-ico v-yellow"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9.5h.01M15 9.5h.01"/></svg></div><h3>Content to the very end</h3><p>Our stock are calm and smiling at every stage of life. Merry reminds them every morning how lucky they are.</p></article>
      <article class="value"><div class="v-ico v-green"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg></div><h3>From our family to yours</h3><p>Every Gladhaven product carries a little piece of the farm. Some carry a little more than others.</p></article>
    </div>
  </div></section>

  <section class="sec merry-sec"><div class="wrap merry-in">
    <div class="merry-stage"><button class="merry-btn" id="home-merry" type="button" aria-label="Merry the pig">${merrySVG({ truth: false })}</button><div class="speech" id="merry-speech">Hi friend! I'm Merry!</div></div>
    <div class="merry-copy"><span class="kicker">Meet our mascot</span><h2>Say hello to Merry.</h2>
      <p>Merry has been the smiling face of Gladhaven since 1974. Kids adore him, parents trust him, and every morning at six our stock hear his voice over the barn speakers telling them they're happy.</p>
      <p>Merry is always smiling. Merry has never once stopped smiling.</p>
      <button class="btn btn-red" id="sing" type="button"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>Sing the Gladhaven song</button>
    </div>
  </div></section>

  <section class="sec sec-tint"><div class="wrap">
    <div class="sec-head row"><div><span class="kicker">Bestsellers</span><h2>Straight from the farm.</h2></div><a class="link-arrow" href="#products">See all products →</a></div>
    <div class="prod-grid">${PRODUCTS.slice(0, 3).map(prodCard).join('')}</div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="sec-head"><span class="kicker">Reviews</span><h2>Families love Gladhaven.</h2></div>
    <div class="reviews">
      ${[['Carla M.', 'Topeka, KS', 'The bacon tastes exactly like Sunday mornings at my grandma\'s. I honestly don\'t know how they do it.', 31],
         ['Ben & Tasha O.', 'Fresno, CA', 'Our kids won\'t eat anything else. They ask for Little Helpers every single night and get upset when we run out.', 32],
         ['Greg L.', 'Akron, OH', 'So tender. It almost tastes like it wanted to be eaten. Five stars, would visit the farm again.', 33]]
        .map(([n, c, q, s]) => `<figure class="review"><div class="stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“${q}”</blockquote><figcaption><canvas class="rev-face" data-seed="${s}" width="56" height="56" aria-hidden="true"></canvas><span><b>${n}</b>${c}</span></figcaption></figure>`).join('')}
    </div>
  </div></section>

  <section class="sec news"><div class="wrap news-in">
    <div><h2>Join the Gladhaven family</h2><p>Recipes, farm news and coupons, once a month. We'll never share your address.</p></div>
    <form id="news-form" class="news-form"><label class="sr" for="news-email">Email address</label><input id="news-email" type="email" required placeholder="you@example.com"><button class="btn btn-red" type="submit">Sign me up</button></form>
    <p id="news-msg" class="news-msg" role="status"></p>
  </div></section>`);
}
function mountHome() {
  $$('.rev-face').forEach(c => { const f = renderFace({ w: 112, h: 112, seed: +c.dataset.seed, smile: .75, scale: .85, cy: .12, hair: .8, tone: [[.86, .66, .54], [.6, .42, .3], [.9, .72, .6]][c.dataset.seed % 3], bg: [.98, .85, .55], grain: .03 }); c.width = 112; c.height = 112; c.getContext('2d').drawImage(f, 0, 0); });
  const svg = $('.hero-svg');
  if (isStock()) $$('#hero-merry .mpupil, #home-merry .mpupil').forEach(p => p.setAttribute('fill', '#5a4a1a'));
  // eyes follow you (they're only cartoon eyes)
  const pupils = $$('.mpupil');
  listen(window, 'pointermove', e => {
    for (const p of pupils) {
      const r = p.ownerSVGElement.getBoundingClientRect(); const cx = r.left + r.width / 2, cy = r.top + r.height * .37;
      const dx = e.clientX - cx, dy = e.clientY - cy, d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 400) * 3.5;
      p.parentNode.setAttribute('transform', `translate(${(dx / d * k).toFixed(2)} ${(dy / d * k).toFixed(2)})`);
    }
    idle = performance.now(); const lf = $('#loftface'); if (lf && lf.getAttribute('opacity') !== '0') { lf.setAttribute('opacity', '0'); }
  }, { passive: true });
  // idle: someone in the loft window
  let idle = performance.now();
  listen(window, 'scroll', () => { idle = performance.now(); }, { passive: true });
  every(1000, () => { if (performance.now() - idle > 30000) { const lf = $('#loftface'); if (lf && lf.getAttribute('opacity') === '0') { lf.setAttribute('opacity', '1'); AU.breath(2); } } });
  // the seventh barn
  const f7 = $('#far7'); if (f7) listen(f7, 'click', () => { AU.knock(0); AU.knock(.3); AU.knock(.6); toast('Barn 7 is closed.'); });
  // Merry
  let clicks = 0, clickT = 0;
  const lines = ['Hi friend! I\'m Merry!', 'Everybody here is happy!', 'Oink oink! Hee hee!', 'Please stop poking me, friend.', ''];
  listen($('#home-merry'), 'click', async () => {
    const now = performance.now(); if (now - clickT > 2500) clicks = 0; clickT = now; clicks++;
    AU.tone(520 + clicks * 80, .12, { type: 'triangle', gain: .1 });
    $('#merry-speech').textContent = lines[Math.min(clicks - 1, 3)];
    if (clicks >= 5) {
      clicks = 0; const btn = $('#home-merry');
      btn.innerHTML = merrySVG({ truth: true, wave: false }); $('#merry-speech').textContent = 'help us';
      AU.glitch(); AU.speak('help us', { rate: .55, pitch: .1, volume: .6 }); subliminal('stare', 90, .25);
      await wait(1400); if (!btn.isConnected) return;
      btn.innerHTML = merrySVG({ truth: false }); $('#merry-speech').textContent = 'Hee hee! Just kidding, friend!';
    }
  });
  listen($('#sing'), 'click', () => { AU.init(); AU.jingle('happy'); $('#merry-speech').textContent = '♪ Gladhaven Farms, happy and true ♪'; });
  listen($('#news-form'), 'submit', e => { e.preventDefault(); $('#news-msg').textContent = "Thanks for signing up! We'll be in touch. We already had your address, but it's nice that you offered."; });
  bindProductButtons();
}

/* ---------- STORY ---------- */
function pageStory() {
  const tl = [
    ['1962', 'Three sows and a dream', 'Harold "Grandpa Glad" Gladwell buys forty acres in Harlow County and builds the first barn with his own two hands.'],
    ['1974', 'The Heritage breed', 'After years of careful selection, Harold introduces the Gladhaven Heritage breed: our calmest, most willing stock ever. Merry joins the family the same year.'],
    ['1981', 'Gladhaven goes national', 'Willing Cuts™ bacon arrives in grocery stores across the country. Families can finally taste the difference contentment makes.'],
    ['1988', 'Barn 7 opens', 'Our seventh and largest barn opens with a ribbon-cutting for the whole town.', true],
    ['1989', 'Barn 7 closes', ''],
    ['2003', 'Grandpa Glad retires', 'Harold steps back from the business and retires to the farm. He is still there.'],
    ['2026', 'Still family-run', 'Today Gladhaven feeds more than 11 million families. Our family keeps growing every year.']
  ];
  return publicShell('story', `
  <section class="page-head"><div class="wrap"><span class="kicker">Our story</span><h1>Sixty years of happy.</h1><p class="lead">Gladhaven began with one man who believed a calm animal makes better meat. He was right. He was more right than anybody expected.</p></div></section>
  <section class="sec"><div class="wrap founder">
    <figure class="photo-frame" id="founder" tabindex="0" aria-label="Portrait of Harold Gladwell, 1962"><canvas id="founder-a" width="240" height="300"></canvas><canvas id="founder-b" width="240" height="300" aria-hidden="true"></canvas><figcaption>Harold Gladwell, 1962</figcaption></figure>
    <div class="founder-copy"><span class="kicker">Our founder</span><h2>Harold "Grandpa Glad" Gladwell</h2>
      <p>Harold grew up poor, the son of a slaughterman. He never forgot the sounds of his father's work, and he swore that one day he'd raise animals that never made those sounds at all.</p>
      <p>"A happy animal is a willing animal," he liked to say. "And a willing animal never fights." He spent the rest of his life making sure every animal at Gladhaven was both.</p>
      <blockquote class="pull">“If you tell them they're happy enough times, they believe you. Then you can tell them anything.”<cite>Harold Gladwell, 1974</cite></blockquote>
    </div>
  </div></section>
  <section class="sec sec-tint"><div class="wrap">
    <div class="sec-head"><span class="kicker">Timeline</span><h2>How we got here.</h2></div>
    <ol class="timeline">${tl.map(([y, t, d, photo]) => `<li><span class="tl-year">${y}</span><div class="tl-body"><h3>${t}</h3>${d ? `<p>${d}</p>` : ''}${photo ? '<figure class="tl-photo"><canvas id="barn-photo" width="480" height="320" aria-label="Old photograph of the Barn 7 ribbon cutting"></canvas><figcaption>Barn 7 ribbon-cutting, June 1988. Everyone came.</figcaption></figure>' : ''}</div></li>`).join('')}</ol>
  </div></section>`);
}
function mountStory() {
  const a = renderFace({ w: 240, h: 300, seed: 1962, smile: .32, age: 1, hair: 0, hairCol: [.78, .77, .74], mode: 'sepia', bg: [.72, .7, .66], clothes: [.18, .15, .12], grain: .1, look: [.1, 0] });
  const b = renderFace({ w: 240, h: 300, seed: 1962, smile: 1, open: .35, teeth: true, eyes: 'hollow', age: 1, hair: 0, hairCol: [.78, .77, .74], mode: 'sepia', bg: [.6, .58, .54], clothes: [.18, .15, .12], grain: .14, blood: .6, contrast: 1.25 });
  $('#founder-a').getContext('2d').drawImage(a, 0, 0);
  const bx = $('#founder-b').getContext('2d'); bx.drawImage(b, 0, 0); grainify(bx, 240, 300, .05, 3, true); scrawl(bx, '② 7', 182, 262, 40, '#5a0505', 2);
  const fr = $('#founder'); let timer = null, shown = false;
  const start = () => { clearTimeout(timer); timer = setTimeout(() => { fr.classList.add('reveal'); shown = true; AU.breath(1.6); AU.tone(1400, .8, { type: 'sine', gain: .03, wet: .6 }); }, 2500); };
  const stop = () => { clearTimeout(timer); if (shown) timer = setTimeout(() => { fr.classList.remove('reveal'); shown = false; }, 1600); };
  ['pointerenter', 'pointerdown', 'focus'].forEach(e => listen(fr, e, start));
  ['pointerleave', 'pointerup', 'pointercancel', 'blur'].forEach(e => listen(fr, e, stop));
  onClean(() => clearTimeout(timer));
  const bp = $('#barn-photo'); if (bp) bp.getContext('2d').drawImage(renderBarnPhoto(480, 320), 0, 0);
}

/* ---------- PRODUCTS ---------- */
const STD_ING = 'Pork, water, salt, cane sugar, natural smoke flavor, sodium nitrite.';
const PRODUCTS = [
  { id: 'bacon', kind: 'bacon', cat: 'bacon', name: 'Willing Cuts™ Thick-Cut Bacon', price: 7.49, blurb: 'Slow-smoked over applewood. Every strip from a calm, contented animal.', ing: STD_ING, cal: 90 },
  { id: 'links', kind: 'links', cat: 'sausage', name: 'Merry Mornings Breakfast Links', price: 5.99, blurb: 'Mild, sweet and perfect with pancakes. Merry\'s personal favorite.', ing: STD_ING, cal: 170 },
  { id: 'roast', kind: 'roast', cat: 'roast', name: 'Sunday Heritage Roast', price: 18.99, blurb: 'Our Heritage breed, raised in Barn 3 and hand-tied by the family.', ing: 'Gladhaven Heritage Breed, salt, rosemary, gratitude.', cal: 210 },
  { id: 'ham', kind: 'ham', cat: 'roast', name: "Grandpa Glad's Smoked Ham", price: 24.99, blurb: 'The recipe Harold made every Christmas. Bone-in, honey glazed.', ing: STD_ING + ' Honey.', cal: 140 },
  { id: 'sticks', kind: 'sticks', cat: 'kids', name: 'Little Helpers Snack Sticks', price: 3.99, blurb: 'A lunchbox favorite. Made by little helpers, for little helpers.', ing: 'Gladhaven Heritage Breed (junior), salt, smoke, sugar.', cal: 80 },
  { id: 'mince', kind: 'mince', cat: 'roast', name: 'Heritage Mince (Limited)', price: 9.99, blurb: 'Small batch. Supply varies with intake. Rich, sweet and unusually tender.', ing: 'Gladhaven Heritage Breed, salt, smoke, gratitude.', cal: 260, limited: true }
];
function prodCard(p) {
  return `<article class="prod" data-cat="${p.cat}"><button class="prod-img" type="button" data-detail="${p.id}" aria-label="Details for ${esc(p.name)}">${productSVG(p.kind)}</button>
  <div class="prod-body"><h3>${p.name}</h3><p>${p.blurb}</p><div class="prod-foot"><span class="price">$${p.price.toFixed(2)}</span><button class="btn btn-sm btn-red" type="button" data-add="${p.id}">Add to cart</button></div></div></article>`;
}
function pageProducts() {
  return publicShell('products', `
  <section class="page-head"><div class="wrap"><span class="kicker">Products</span><h1>Willing Cuts™ and family favorites.</h1><p class="lead">Every Gladhaven product is raised, packed and shipped by the same family that started it all.</p></div></section>
  <section class="sec"><div class="wrap">
    <div class="chips" role="group" aria-label="Filter products">${[['all', 'All'], ['bacon', 'Bacon'], ['sausage', 'Sausages'], ['roast', 'Roasts & more'], ['kids', 'For kids']].map(([k, l], i) => `<button class="chip" type="button" data-f="${k}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div>
    <div class="prod-grid" id="prod-grid">${PRODUCTS.map(prodCard).join('')}</div>
  </div></section>`);
}
function nutrition(p) {
  return `<div class="nf"><div class="nf-h">Nutrition Facts</div><div class="nf-s">8 servings per package · Serving size 2 oz (56g)</div>
  <div class="nf-cal"><span>Calories</span><b>${p.cal}</b></div>
  <table><tbody><tr><th>Total Fat</th><td>${Math.round(p.cal / 14)}g</td></tr><tr><th>Sodium</th><td>${Math.round(p.cal * 2.6)}mg</td></tr><tr><th>Protein</th><td>${Math.round(p.cal / 18)}g</td></tr>${p.limited ? '<tr><th>Iron</th><td>140%</td></tr><tr><th>Regret</th><td>0%</td></tr>' : ''}</tbody></table>
  <p class="nf-ing"><b>Ingredients:</b> ${p.ing}</p>
  ${p.limited ? '<p class="nf-fine">Lot no. ③ 1 · Packed in Barn 7 · May contain fragments of bone, tooth or personal effects. If you find something personal, please return it to Gladhaven. Someone is looking for it.</p>' : '<p class="nf-fine">Keep refrigerated. Cook to an internal temperature of 145°F.</p>'}</div>`;
}
function bindProductButtons() {
  $$('[data-add]').forEach(b => listen(b, 'click', () => {
    const p = PRODUCTS.find(x => x.id === b.dataset.add);
    if (p.limited) { toast('Sold out. Supply is replenished as new stock arrives. We are always looking for new stock.'); AU.buzz(); return; }
    cartN++; store.set('gh-cart', cartN); const n = $('#cart-n'); if (n) n.textContent = cartN; AU.beep(1320); toast(`Added ${p.name} to your cart.`);
  }));
  $$('[data-detail]').forEach(b => listen(b, 'click', () => {
    const p = PRODUCTS.find(x => x.id === b.dataset.detail);
    openModal(`<div class="pd"><div class="pd-img">${productSVG(p.kind)}</div><div class="pd-copy"><h2 id="modal-title">${p.name}</h2><p class="price">$${p.price.toFixed(2)}</p><p>${p.blurb}</p>${nutrition(p)}</div></div>`, 'm-light');
  }));
}
function mountProducts() {
  $$('.chip').forEach(c => listen(c, 'click', () => {
    $$('.chip').forEach(x => x.setAttribute('aria-pressed', x === c)); const f = c.dataset.f;
    $$('#prod-grid .prod').forEach(p => { p.hidden = !(f === 'all' || p.dataset.cat === f); });
  }));
  bindProductButtons();
}

/* ---------- RECIPES + farm tour video ---------- */
function pageRecipes() {
  const R = [
    ['Sticky Maple Bacon', '15 min', ['1 pack Willing Cuts™ bacon', '3 tbsp maple syrup', 'Black pepper'], ['Heat the oven to 400°F.', 'Lay the strips flat on a rack. Give them room. They don\'t like to be crowded.', 'Brush with maple syrup and bake 15 minutes until glossy.']],
    ["Grandpa's Sunday Roast", '2 hr', ['1 Sunday Heritage Roast', '6 potatoes', '2 sprigs rosemary', 'Butter'], ['Rest the roast at room temperature for an hour. It will be calmer.', 'Roast at 350°F for 90 minutes with the potatoes underneath.', 'Carve at the table so everyone can watch. That\'s how Harold did it.']],
    ["Merry's Pigs in Blankets", '25 min', ['1 pack Merry Mornings links', '1 sheet puff pastry', '1 egg'], ['Cut the pastry into strips.', 'Tuck each link in snugly so it feels safe. They like to feel safe.', 'Bake at 375°F for 20 minutes. Don\'t listen to them.']]
  ];
  return publicShell('recipes', `
  <section class="page-head"><div class="wrap"><span class="kicker">Recipes</span><h1>Cook like a Gladwell.</h1><p class="lead">Simple, hearty recipes from our family kitchen. Start with a visit to the farm.</p></div></section>
  <section class="sec"><div class="wrap">
    <div class="video"><div class="video-screen"><canvas id="tour" width="640" height="360" aria-label="Gladhaven farm tour video"></canvas><button class="v-big" id="v-big" type="button" aria-label="Play the farm tour"><svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg></button></div>
      <div class="v-bar"><button id="v-play" type="button" class="v-btn" aria-label="Play">▶</button><label class="sr" for="v-seek">Seek</label><input id="v-seek" type="range" min="0" max="2400" value="0" step="1"><span id="v-time" class="v-time">0:00 / 0:24</span></div>
      <p class="v-cap">Take the Gladhaven farm tour (1994). Our stock are shy, so we kept them off camera.</p></div>
    <div class="recipes">${R.map(([n, t, ing, st]) => `<article class="recipe"><div class="r-head"><h3>${n}</h3><span class="pill-time">${t}</span></div><h4>You'll need</h4><ul>${ing.map(i => `<li>${i}</li>`).join('')}</ul><h4>Method</h4><ol>${st.map(i => `<li>${i}</li>`).join('')}</ol></article>`).join('')}</div>
  </div></section>`);
}
const MERRY_IMG = svgToImage(merrySVG({ wave: false }));
function mountRecipes() {
  const cv = $('#tour'), x = cv.getContext('2d'), W = 640, H = 360, DUR = 24;
  let t = 0, playing = false, last = 0, flashed = false, startedSong = false;
  const stare = scareSource('face');
  const seek = $('#v-seek'), play = $('#v-play'), big = $('#v-big'), lab = $('#v-time');
  const fmt = s => `0:${String(Math.floor(s)).padStart(2, '0')}`;
  function sky() { const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#8FD0F2'); g.addColorStop(1, '#E4F6FF'); x.fillStyle = g; x.fillRect(0, 0, W, H); }
  function hills(off = 0) { x.fillStyle = '#7DBF5F'; x.beginPath(); x.moveTo(0, 230); for (let i = 0; i <= W; i += 20) x.lineTo(i, 220 + Math.sin((i + off) / 90) * 18); x.lineTo(W, H); x.lineTo(0, H); x.fill(); x.fillStyle = '#58A242'; x.beginPath(); x.moveTo(0, 280); for (let i = 0; i <= W; i += 20) x.lineTo(i, 276 + Math.sin((i + off * 1.6) / 70) * 12); x.lineTo(W, H); x.lineTo(0, H); x.fill(); }
  function caption(s, a = 1) { x.globalAlpha = a; x.fillStyle = 'rgba(0,0,0,.55)'; x.fillRect(0, H - 52, W, 52); x.fillStyle = '#fff'; x.font = '600 22px Fredoka, Nunito, sans-serif'; x.textAlign = 'center'; x.fillText(s, W / 2, H - 19); x.globalAlpha = 1; }
  function merry(cx, cy, s, bob = 0) { if (MERRY_IMG.complete && MERRY_IMG.naturalWidth) x.drawImage(MERRY_IMG, cx - 80 * s, cy - 100 * s + bob, 160 * s, 200 * s); }
  function barn(cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = '#C8362B'; x.beginPath(); x.moveTo(-120, -20); x.lineTo(-90, -80); x.lineTo(0, -120); x.lineTo(90, -80); x.lineTo(120, -20); x.lineTo(120, 120); x.lineTo(-120, 120); x.fill(); x.fillStyle = '#F6EFE2'; x.fillRect(-60, 20, 120, 100); x.fillStyle = '#A82E27'; x.fillRect(-54, 26, 108, 94); x.strokeStyle = '#F6EFE2'; x.lineWidth = 7; x.beginPath(); x.moveTo(-54, 26); x.lineTo(54, 120); x.moveTo(54, 26); x.lineTo(-54, 120); x.stroke(); x.restore(); }
  function draw() {
    x.save();
    if (t < 5) { sky(); hills(t * 20); merry(W / 2, 200, 1, Math.abs(Math.sin(t * 4)) * -16); x.fillStyle = '#C8362B'; x.font = '700 40px Fredoka, Nunito, sans-serif'; x.textAlign = 'center'; x.globalAlpha = clamp(t / 1.2); x.fillText('Welcome to Gladhaven Farms!', W / 2, 70); x.globalAlpha = 1; }
    else if (t < 10) { const k = (t - 5) / 5; sky(); hills(100); barn(W / 2, 220, 1 + k * .35); caption('Our stock live happy, peaceful lives.'); x.fillStyle = 'rgba(255,255,255,.85)'; x.font = '14px Nunito, sans-serif'; x.textAlign = 'center'; x.fillText('(our stock are shy)', W / 2, 40); }
    else if (t < 14.5) { x.fillStyle = '#e9e4d8'; x.fillRect(0, 0, W, H); x.fillStyle = '#6b6f78'; x.fillRect(0, 210, W, 40); x.fillStyle = '#4a4e57'; for (let i = -1; i < 14; i++) x.fillRect(((i * 60 + t * 80) % (W + 60)) - 60, 210, 6, 40); for (let i = 0; i < 6; i++) { const px = ((i * 130 + t * 80) % (W + 130)) - 130; x.fillStyle = '#FAFAF6'; x.fillRect(px, 170, 96, 42); x.fillStyle = '#D9646E'; x.fillRect(px + 10, 180, 76, 22); x.fillStyle = '#C8362B'; x.fillRect(px + 6, 196, 40, 12); } caption('Every pack is made with love.'); }
    else if (t < 17) { sky(); hills(300); merry(W / 2, 250, 1.8, Math.sin(t * 6) * 6); caption('See you soon, friend!'); }
    else if (t < 17.22) {
      x.fillStyle = '#000'; x.fillRect(0, 0, W, H); x.globalAlpha = .95; x.drawImage(stare, W / 2 - 165, -40, 330, 440); x.globalAlpha = 1;
      x.fillStyle = 'rgba(0,0,0,.4)'; for (let y = 0; y < H; y += 3) x.fillRect(0, y, W, 1); scrawl(x, '④ 9', W - 100, H - 110, 64, '#d01818', 4);
      x.fillStyle = '#d0d0d0'; x.font = '16px "VT323", monospace'; x.textAlign = 'left'; x.fillText('BARN 7  02:14:09', 18, 28);
    }
    else { const k = clamp((t - 17.22) / 1.5); x.fillStyle = '#FFF8EC'; x.fillRect(0, 0, W, H); x.globalAlpha = k; x.fillStyle = '#C8362B'; x.font = '700 46px Fredoka, Nunito, sans-serif'; x.textAlign = 'center'; x.fillText('Gladhaven Farms', W / 2, 150); x.fillStyle = '#2A1E17'; x.font = '22px Nunito, sans-serif'; x.fillText('Happy animals. Honest meat.', W / 2, 190); x.globalAlpha = 1;
      if (t > 21) { x.globalAlpha = clamp((t - 21) / 1.5) * .9; merry(W / 2, 290, .55, 0); x.globalAlpha = 1; x.fillStyle = '#7a7a7a'; x.font = '14px Nunito, sans-serif'; x.fillText('see you soon', W / 2, 345); } }
    // VHS dressing
    x.globalAlpha = .07; x.drawImage(NOISE.c, 0, 0, W, H); x.globalAlpha = 1;
    x.fillStyle = 'rgba(255,255,255,.75)'; x.font = '18px "VT323", monospace'; x.textAlign = 'right'; x.fillText('GLADHAVEN TOUR \'94', W - 14, 24);
    x.restore();
  }
  function setT(v) { t = clamp(v, 0, DUR); seek.value = Math.round(t * 100); lab.textContent = `${fmt(t)} / 0:24`; }
  function toggle() { AU.init(); playing = !playing; if (t >= DUR - .05) { setT(0); flashed = false; } play.textContent = playing ? '❚❚' : '▶'; play.setAttribute('aria-label', playing ? 'Pause' : 'Play'); big.hidden = true; last = performance.now(); if (playing && t < .5 && !startedSong) { startedSong = true; AU.jingle('happy'); } }
  listen(play, 'click', toggle); listen(big, 'click', toggle); listen(cv, 'click', toggle);
  listen(seek, 'input', () => { big.hidden = true; setT(seek.value / 100); draw(); });
  loop(now => {
    if (playing) { const prev = t; setT(t + (now - last) / 1000); if (prev < 17 && t >= 17 && !flashed) { flashed = true; AU.glitch(); } if (t >= DUR) { playing = false; play.textContent = '▶'; big.hidden = false; } }
    last = now; NOISE.tick(); draw();
  });
}

/* ---------- CAREERS ---------- */
function pageCareers() {
  const jobs = [
    ['Farmhand (Day Shift)', 'Full time · Harlow County', ['Feed and water stock on a fixed schedule', 'Keep pens clean, quiet and orderly', 'Smile at the stock. They copy you.']],
    ['Packing Associate', 'Full time · Plant 2', ['Operate wrapping and labelling machines', 'Check every pack for foreign objects', 'Report any packs that are warm']],
    ['Night Shepherd: Barn 7', 'Overnight · Barn 7 observation booth', ['Remain in the observation booth until dawn', 'Under no circumstances open the Barn 7 doors', 'Note any singing in the logbook', 'Never answer when you are called by name', 'Only feed stock through the slot', 'Wear the provided earplugs at all times'], true],
    ['Stock Intake Coordinator', 'Full time · Visitor center', ['Welcome tour groups and new arrivals', 'Make sure every visitor feels at home', 'Make sure every visitor stays']]
  ];
  return publicShell('careers', `
  <section class="page-head"><div class="wrap"><span class="kicker">Careers</span><h1>Join the herd.</h1><p class="lead">At Gladhaven you're not just an employee, you're family. Once you're part of the Gladhaven family, you're part of it for life.</p></div></section>
  <section class="sec"><div class="wrap">
    <div class="perks">${[['Free meals', 'Gladhaven products in the canteen, every shift, forever.'], ['On-site housing', 'Comfortable stalls, sorry, rooms, right on the farm.'], ['Lifetime security', 'Nobody has ever been let go from Gladhaven.'], ['Family culture', 'Everyone here is smiling. You will be too.']].map(([a, b]) => `<div class="perk"><b>${a}</b><span>${b}</span></div>`).join('')}</div>
    <h2 class="h-open">Open positions</h2>
    <div class="jobs">${jobs.map(([t, m, d, filled], i) => `<details class="job" ${i === 2 ? 'id="night-shepherd"' : ''}><summary><span><b>${t}</b><small>${m}</small></span><span class="job-x" aria-hidden="true">+</span></summary><div class="job-body"><h4>Responsibilities</h4><ul>${d.map(l => `<li>${l}</li>`).join('')}</ul>${filled ? '<button class="btn btn-sm btn-white" type="button" id="ns-apply">Apply for this role</button><p class="filled" id="ns-msg" role="status"></p>' : '<button class="btn btn-sm btn-red" type="button" data-jump="apply-form">Apply below</button>'}</div></details>`).join('')}</div>
    <form class="apply" id="apply-form" aria-labelledby="apply-h"><h2 id="apply-h">Apply now</h2>
      <div class="f-row"><label for="a-name">Full name</label><input id="a-name" required autocomplete="name"></div>
      <div class="f-row"><label for="a-email">Email</label><input id="a-email" type="email" required autocomplete="email"></div>
      <div class="f-row"><label for="a-role">Position</label><select id="a-role"><option>Farmhand (Day Shift)</option><option>Packing Associate</option><option>Stock Intake Coordinator</option></select></div>
      <div class="f-row"><label for="a-why">Why do you want to join the herd?</label><textarea id="a-why" rows="4" required></textarea></div>
      <button class="btn btn-red" type="submit">Submit application</button>
      <div class="apply-result" id="apply-result" role="status" hidden></div>
    </form>
  </div></section>`);
}
function mountCareers() {
  $$('[data-jump]').forEach(b => listen(b, 'click', () => { const f = document.getElementById(b.dataset.jump); f.scrollIntoView({ behavior: 'smooth', block: 'start' }); later(500, () => $('#a-name').focus({ preventScroll: true })); }));
  const ns = $('#ns-apply');
  if (ns) listen(ns, 'click', async () => { const m = $('#ns-msg'); ns.disabled = true; let s = ''; for (let i = 0; i < 7; i++) { s += 'Position filled. '; m.textContent = s; AU.click(); await wait(260); if (!m.isConnected) return; } m.textContent = s + 'Position fi'; });
  listen($('#apply-form'), 'submit', async e => {
    e.preventDefault(); const name = ($('#a-name').value.trim().split(' ')[0] || 'friend');
    const r = $('#apply-result'); r.hidden = false; r.className = 'apply-result'; r.textContent = 'Reviewing your application…';
    await wait(2200); if (!r.isConnected) return;
    r.classList.add('done');
    r.innerHTML = `<b>Congratulations, ${esc(name)}. You're a perfect fit.</b><p>We've reviewed your application, your photos and your address. A driver will collect you. Please don't bring anything with you. You won't need it.</p><p>Your family can visit any time. They can stay, too.</p><p class="sig">— Gladhaven Intake · ref ⑤ 3</p>`;
    AU.knock(.4, .4);
  });
}

/* ---------- CONTACT ---------- */
function pageContact() {
  return publicShell('contact', `
  <section class="page-head"><div class="wrap"><span class="kicker">Contact</span><h1>We'd love to hear from you.</h1><p class="lead">Questions about a product, a recall or a farm tour? The Gladhaven family is here to help.</p></div></section>
  <section class="sec"><div class="wrap contact">
    <div class="contact-info">
      <div class="ci"><b>Visit the farm</b><span>1 Harrow Lane, Harlow County</span><span>Tours leave daily at 10:00. Tours return daily.</span></div>
      <div class="ci"><b>Call us</b><span>1-800-GLAD-HVN</span><span>Mon–Fri, 8am–6pm. After 6pm, someone else answers.</span></div>
      <div class="ci"><b>Product recalls</b><span>There are no active recalls. There have never been any recalls.</span></div>
      <details class="faq-mini"><summary>Can I see the animals on a tour?</summary><p>Our stock are very shy around strangers. Most visitors only meet them on their second visit.</p></details>
      <details class="faq-mini"><summary>Why is Barn 7 boarded up?</summary><p>Barn 7 is closed for renovation.</p></details>
      <details class="faq-mini"><summary>I found something in my Heritage Mince.</summary><p>Please don't throw it away. Mail it to the farm in the envelope provided, along with your name and address.</p></details>
    </div>
    <form class="apply" id="contact-form"><h2>Send a message</h2>
      <div class="f-row"><label for="c-name">Your name</label><input id="c-name" required autocomplete="name"></div>
      <div class="f-row"><label for="c-email">Email</label><input id="c-email" type="email" required autocomplete="email"></div>
      <div class="f-row"><label for="c-msg">Message</label><textarea id="c-msg" rows="5" required></textarea></div>
      <button class="btn btn-red" type="submit">Send message</button>
      <div class="apply-result" id="contact-result" role="status" hidden></div>
    </form>
  </div></section>`);
}
function mountContact() {
  listen($('#contact-form'), 'submit', e => {
    e.preventDefault(); const r = $('#contact-result'); r.hidden = false; r.className = 'apply-result done';
    r.innerHTML = `<b>Thanks, ${esc($('#c-name').value.trim().split(' ')[0] || 'friend')}!</b><p>Someone from the Gladhaven family will visit you to discuss your message in person. Please leave the porch light on.</p>`;
    later(7000, () => { toast("They're on their way."); AU.knock(0, .5); AU.knock(.35, .5); });
  });
}

/* ---------- EMPLOYEE LOGIN ---------- */
function pageLogin() {
  return `<div class="login-wrap crt"><div class="login-card" id="login-card">
    <div class="login-head"><span class="gh-badge">GH</span><div><b>Gladhaven Staff Access</b><small>Authorized personnel only. All access is logged and kept forever.</small></div></div>
    <label for="code" class="login-label">Enter your 5-digit shepherd code</label>
    <div class="code-boxes" id="code-boxes" aria-hidden="true">${'<span></span>'.repeat(5)}</div>
    <input id="code" class="code-input" inputmode="numeric" pattern="[0-9]*" maxlength="5" autocomplete="off" aria-describedby="login-msg">
    <div class="keypad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'CLR', 0, '⏎'].map(k => `<button type="button" data-k="${k}" ${k === 'CLR' ? 'aria-label="Clear"' : k === '⏎' ? 'aria-label="Enter"' : ''}>${k}</button>`).join('')}</div>
    <p id="login-msg" class="login-msg" role="status">${isUnlocked() ? 'This terminal remembers you.' : '&nbsp;'}</p>
    <a href="#home" class="login-back">← Back to gladhaven.com</a>
  </div></div>`;
}
let loginFails = 0;
function mountLogin() {
  const input = $('#code'), boxes = $$('#code-boxes span'), msg = $('#login-msg'), card = $('#login-card');
  const show = () => boxes.forEach((b, i) => { b.textContent = input.value[i] ? '•' : ''; b.classList.toggle('on', i === input.value.length); });
  later(50, () => input.focus());
  let busy = false;
  async function submit() {
    if (busy || input.value.length < 5) return; busy = true;
    if (input.value === CODE) {
      AU.init(); [660, 880, 990].forEach((f, i) => AU.tone(f, .1, { type: 'square', gain: .05, when: i * .12 }));
      for (const line of ['VERIFYING SHEPHERD…', 'CHECKING PULSE… 112 BPM', 'PULSE ACCEPTABLE', 'WELCOME BACK, SHEPHERD #0447']) { msg.textContent = line; msg.className = 'login-msg ok'; await wait(650); if (!msg.isConnected) return; }
      store.set('gh-unlocked', '1'); location.hash = '#portal'; return;
    }
    loginFails++; AU.buzz(); card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
    const lines = ['Incorrect code.', "That isn't your number.", 'Are you staff, or are you stock?', 'Stop guessing.'];
    msg.textContent = lines[Math.min(loginFails - 1, 3)]; msg.className = 'login-msg bad';
    if (loginFails === 4) { await wait(500); await jumpscare('face2', { line: 'STOP GUESSING' }); }
    if (loginFails > 4) msg.textContent = ['We know which house is yours.', 'Find the numbers.', 'They are on the website. They have always been on the website.'][(loginFails - 5) % 3];
    input.value = ''; show(); busy = false;
  }
  listen(input, 'input', () => { input.value = input.value.replace(/\D/g, '').slice(0, 5); AU.beep(700 + input.value.length * 60); show(); if (input.value.length === 5) submit(); });
  listen(input, 'keydown', e => { if (e.key === 'Enter') submit(); });
  $$('.keypad button').forEach(b => listen(b, 'click', () => {
    AU.init(); const k = b.dataset.k;
    if (k === 'CLR') input.value = ''; else if (k === '⏎') { submit(); return; } else if (input.value.length < 5) input.value += k;
    AU.beep(700 + input.value.length * 60); show(); if (input.value.length === 5) submit();
  }));
  show();
}

/* ---------- 404 ---------- */
function page404(name) {
  return publicShell('', `<section class="page-head p404"><div class="wrap"><span class="kicker">Error 404</span><h1>This page has been harvested.</h1><p class="lead">We couldn't find <b>#${esc(name)}</b>. It was here a moment ago. It was making a noise.</p><canvas id="c404" width="200" height="250" aria-hidden="true"></canvas><p><a class="btn btn-red" href="#home">Go home</a></p></div></section>`);
}
function mount404() { const c = $('#c404'); c.getContext('2d').drawImage(renderFace({ w: 200, h: 250, seed: 404, smile: 1, open: .2, teeth: true, eyes: 'closed', mode: 'gray', bg: [.92, .9, .86], hair: 0, grain: .08 }), 0, 0); later(4000, () => { if (!c.isConnected) return; c.getContext('2d').drawImage(renderFace({ w: 200, h: 250, seed: 404, smile: 1, open: .2, teeth: true, eyeOpen: 1.5, irisR: .025, mode: 'gray', bg: [.92, .9, .86], hair: 0, grain: .08 }), 0, 0); AU.sting(); }); }
