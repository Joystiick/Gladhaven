/* ============ routing, the gate, and site-wide secrets ============ */
const ROUTES = {
  home: { r: pageHome, m: mountHome, amb: 'farm', title: 'Gladhaven Farms · Happy animals. Honest meat.' },
  story: { r: pageStory, m: mountStory, amb: 'farm', title: 'Our Story · Gladhaven Farms' },
  products: { r: pageProducts, m: mountProducts, amb: 'farm', title: 'Products · Gladhaven Farms' },
  recipes: { r: pageRecipes, m: mountRecipes, amb: 'farm', title: 'Recipes · Gladhaven Farms' },
  careers: { r: pageCareers, m: mountCareers, amb: 'farm', title: 'Careers · Gladhaven Farms' },
  contact: { r: pageContact, m: mountContact, amb: 'farm', title: 'Contact · Gladhaven Farms' },
  login: { r: pageLogin, m: mountLogin, amb: 'portal', title: 'Staff Access · Gladhaven' },
  portal: { r: pagePortal, m: mountPortal, amb: 'portal', gated: true, title: 'GH Internal · Dashboard' },
  registry: { r: pageRegistry, m: mountRegistry, amb: 'portal', gated: true, title: 'GH Internal · Stock registry' },
  cameras: { r: pageCameras, m: mountCameras, amb: 'portal', gated: true, title: 'GH Internal · Cameras' },
  memos: { r: pageMemos, m: mountMemos, amb: 'portal', gated: true, title: 'GH Internal · Memos' },
  tapes: { r: pageTapes, m: mountTapes, amb: 'portal', gated: true, title: 'GH Internal · Tape 0446-C' },
  barn7: { r: pageBarn, m: mountBarn, amb: 'none', gated: true, title: 'BARN 7' },
  stock: { r: pageStock, m: mountStock, amb: 'barn', title: 'GH-H-1205', need: () => isStock() }
};
let currentRoute = 'home';
function route() {
  const name = (location.hash.slice(1) || 'home').toLowerCase();
  CLEAN.forEach(f => { try { f(); } catch (e) {} }); CLEAN = [];
  $('#modal').hidden = true; $('#toast').hidden = true; closeModal.after = null;
  try { speechSynthesis.cancel(); } catch (e) {}
  const R = ROUTES[name];
  if (R && R.gated && !isUnlocked()) { location.replace('#login'); return; }
  if (R && R.need && !R.need()) { location.replace('#home'); return; }
  currentRoute = name;
  const app = $('#app');
  document.body.dataset.zone = !R ? 'pub' : R.gated || name === 'login' || name === 'stock' ? (name === 'barn7' || name === 'stock' ? 'barn' : 'portal') : 'pub';
  if (R) { app.innerHTML = R.r(); document.title = R.title; R.m(); AU.setAmbient(R.amb); }
  else { app.innerHTML = page404(name); document.title = 'Page not found · Gladhaven Farms'; mount404(); AU.setAmbient('farm'); }
  scrollTo(0, 0);
  const h = $('h1', app); if (h) { h.setAttribute('tabindex', '-1'); }
}
addEventListener('hashchange', route);

/* modal + toast wiring */
$('#modal-x').addEventListener('click', closeModal);
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#modal').hidden) closeModal(); });

/* mute */
const muteBtn = $('#mute');
function syncMute() { muteBtn.setAttribute('aria-pressed', SETTINGS.sound); muteBtn.querySelector('span').textContent = SETTINGS.sound ? 'Sound on' : 'Sound off'; }
muteBtn.addEventListener('click', () => { AU.init(); AU.mute(!SETTINGS.sound); syncMute(); });

/* secrets that live everywhere */
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let kIdx = 0, typed = '';
addEventListener('keydown', e => {
  if (!$('#gate').hidden) return;
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  kIdx = k === KONAMI[kIdx] ? kIdx + 1 : (k === KONAMI[0] ? 1 : 0);
  if (kIdx === KONAMI.length) { kIdx = 0; jumpscare('merry', { line: 'NO CHEATING' }); }
  const tag = (e.target.tagName || '').toLowerCase(); if (tag === 'input' || tag === 'textarea') return;
  if (e.key.length === 1) { typed = (typed + e.key.toLowerCase()).slice(-12); }
  if (typed.endsWith('help')) { typed = ''; const o = $('#whisper'); o.textContent = 'WE CAN\'T HELP YOU EITHER'; o.hidden = false; AU.breath(2); AU.speak('we cant help you either', { rate: .5, pitch: .05, volume: .7 }); setTimeout(() => { o.hidden = true; }, 1800); }
  if (typed.endsWith('merry')) { typed = ''; toast('Merry is right behind you, friend!'); AU.tone(880, .2, { type: 'triangle', gain: .1 }); }
});
document.addEventListener('copy', e => {
  const sel = String(getSelection()); if (!sel || !e.clipboardData) return;
  e.clipboardData.setData('text/plain', sel + '\n\n(they are not pigs)'); e.preventDefault();
});
const baseTitle = () => (ROUTES[currentRoute] || {}).title || 'Gladhaven Farms';
document.addEventListener('visibilitychange', () => {
  if (document.hidden) document.title = isStock() ? 'we miss you, GH-H-1205' : document.body.dataset.zone === 'pub' ? 'Come back to the farm!' : 'SHEPHERD, RETURN TO YOUR POST';
  else document.title = baseTitle();
});

/* the gate */
const gate = $('#gate');
$('#g-intense').checked = SETTINGS.intense;
$('#g-enter').addEventListener('click', () => {
  SETTINGS.intense = $('#g-intense').checked; SETTINGS.sound = $('#g-sound').checked;
  AU.init(); AU.mute(SETTINGS.sound); syncMute();
  gate.hidden = true; document.body.classList.remove('gated');
  if (currentRoute === 'home') AU.setAmbient('farm', true);
  const h = $('h1', $('#app')); if (h) h.focus({ preventScroll: true });
});
$('#g-leave').addEventListener('click', () => { $('#g-card').innerHTML = '<h2>Good call.</h2><p>Close this tab whenever you like. The farm will still be here.</p>'; });
$('#g-reset').addEventListener('click', () => { ['gh-unlocked', 'gh-stock', 'gh-yard', 'gh-cart'].forEach(k => store.del(k)); cartN = 0; CAMSTATE.yard = 0; $('#g-reset').textContent = 'Progress reset'; location.hash = '#home'; route(); });
if (isUnlocked() || isStock()) $('#g-reset').hidden = false;
syncMute();
route();

/* test hook: only active with ?ghdebug in the URL */
if (/[?&]ghdebug/.test(location.search)) window.__gh = { jumpscare, scareSource, subliminal };
