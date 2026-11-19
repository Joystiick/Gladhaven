/* ============ illustration: Merry, the farm, the products ============ */
let svgUid = 0;
function merrySVG({ truth = false, wave = true, rot = false } = {}) {
  const u = 'm' + (++svgUid);
  const eyeCute = (cx) => `
    <ellipse cx="${cx}" cy="92" rx="11.5" ry="13.5" fill="#fff" stroke="#5a2633" stroke-width="2.5"/>
    <g class="pupil-g"><circle class="mpupil" cx="${cx}" cy="94" r="6.5" fill="#1b1016"/><circle cx="${cx - 2.5}" cy="91" r="2.2" fill="#fff"/></g>`;
  const eyeTrue = (cx) => `
    <clipPath id="${u}c${cx}"><path d="M${cx - 15} 93 Q${cx} 78 ${cx + 15} 93 Q${cx} 104 ${cx - 15} 93Z"/></clipPath>
    <path d="M${cx - 18} 84 Q${cx} 72 ${cx + 18} 84" fill="none" stroke="#b9707d" stroke-width="2"/>
    <g clip-path="url(#${u}c${cx})">
      <rect x="${cx - 16}" y="76" width="32" height="30" fill="url(#${u}scl)"/>
      <path d="M${cx - 15} 92 l6 1 l3 -2 M${cx + 15} 93 l-5 -1 l-3 2 M${cx - 13} 96 l5 -1" stroke="#c0283a" stroke-width=".7" fill="none" opacity=".8"/>
      <g class="pupil-g"><circle class="mpupil" cx="${cx}" cy="91.5" r="6.8" fill="url(#${u}iris)"/><circle cx="${cx}" cy="91.5" r="2.6" fill="#050304"/><circle cx="${cx - 2.4}" cy="89.2" r="1.3" fill="#fff" opacity=".95"/></g>
      <path d="M${cx - 16} 86 Q${cx} 79 ${cx + 16} 86 L${cx + 16} 76 L${cx - 16} 76Z" fill="#000" opacity=".28"/>
    </g>
    <path d="M${cx - 15} 93 Q${cx} 78 ${cx + 15} 93" fill="none" stroke="#3d1820" stroke-width="1.6"/>
    <path d="M${cx - 13} 96 Q${cx} 103 ${cx + 13} 96" fill="none" stroke="#c97f8c" stroke-width="1.4"/>`;
  const mouthCute = `<path d="M80 141 Q100 158 120 141" fill="none" stroke="#6b2232" stroke-width="4" stroke-linecap="round"/><path d="M94 149 Q100 156 106 149" fill="#e0607a"/>`;
  let teeth = '';
  for (let i = 0; i < 12; i++) { const x = 64 + i * 6.1, y = 137 + Math.pow((i - 5.5) / 5.5, 2) * -6 + 2; teeth += `<rect x="${x}" y="${y}" width="5.6" height="${8 + (i % 3)}" rx="1.6" fill="#efe6cf" stroke="#a89878" stroke-width=".6"/>`; }
  for (let i = 0; i < 10; i++) { const x = 70 + i * 6.1, y = 156 - Math.pow((i - 4.5) / 4.5, 2) * 4; teeth += `<rect x="${x}" y="${y - 7}" width="5.4" height="7.5" rx="1.4" fill="#ddd2b6" stroke="#8f8064" stroke-width=".6"/>`; }
  const mouthTrue = `<path d="M60 135 Q100 128 140 135 Q132 168 100 170 Q68 168 60 135Z" fill="#1a0507"/>
    <path d="M60 135 Q100 128 140 135 L140 140 Q100 133 60 140Z" fill="#9c3040"/>${teeth}
    <path d="M60 135 Q100 128 140 135 Q132 168 100 170 Q68 168 60 135Z" fill="none" stroke="#5a1520" stroke-width="2.2"/>
    ${truth === 'blood' ? '<path d="M136 146 q3 14 1 30 q-2 4 -3 0 q-1 -14 -2 -26z" fill="#6a0606"/><path d="M66 150 q-2 10 0 18 q2 3 3 -1 q0 -9 -1 -16z" fill="#6a0606"/>' : ''}`;
  return `<svg class="merry ${truth ? 'merry-true' : ''}" viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Merry the Gladhaven pig">
  <defs>
    <radialGradient id="${u}head" cx="45%" cy="38%" r="70%"><stop offset="0" stop-color="${truth ? '#f3b3bd' : '#FFC2CD'}"/><stop offset=".7" stop-color="${truth ? '#d98d9b' : '#F7A1B3'}"/><stop offset="1" stop-color="${truth ? '#a85d6c' : '#E38399'}"/></radialGradient>
    <radialGradient id="${u}scl" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#f6f1ea"/><stop offset=".7" stop-color="#e6d6cf"/><stop offset="1" stop-color="#c79a98"/></radialGradient>
    <radialGradient id="${u}iris" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#6b5a2a"/><stop offset=".55" stop-color="#7d6a3a"/><stop offset=".85" stop-color="#4a3c1a"/><stop offset="1" stop-color="#1e1608"/></radialGradient>
    <linearGradient id="${u}denim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A7CC2"/><stop offset="1" stop-color="#2F5C9A"/></linearGradient>
  </defs>
  <g class="m-arm-l"><path d="M52 176 Q30 190 34 214" stroke="#F49AAE" stroke-width="15" stroke-linecap="round" fill="none"/></g>
  <g class="${wave ? 'm-wave' : ''}" style="transform-origin:146px 172px"><path d="M148 174 Q176 156 178 128" stroke="#F49AAE" stroke-width="15" stroke-linecap="round" fill="none"/><circle cx="178" cy="124" r="11" fill="#F7A8B8" stroke="#E38399" stroke-width="2"/></g>
  <path d="M50 250 L54 172 Q100 150 146 172 L150 250Z" fill="url(#${u}denim)"/>
  <path d="M60 168 L66 196 M140 168 L134 196" stroke="#2A5288" stroke-width="7" stroke-linecap="round"/>
  <rect x="78" y="196" width="44" height="30" rx="6" fill="#3A6CB2" stroke="#2A5288" stroke-width="2.5"/>
  <circle cx="68" cy="196" r="4" fill="#FFD66B"/><circle cx="132" cy="196" r="4" fill="#FFD66B"/>
  ${truth ? '<path d="M70 214 q10 -6 18 2 q-4 10 -14 6z M120 232 q8 -4 14 3 q-6 6 -13 2z" fill="#5a2a1c" opacity=".55"/>' : ''}
  <path d="M44 66 L36 22 L78 50Z" fill="#F49AAE" stroke="#E38399" stroke-width="3" stroke-linejoin="round"/><path d="M46 56 L42 32 L64 48Z" fill="#E77F96"/>
  <path d="M156 66 L164 22 L122 50Z" fill="#F49AAE" stroke="#E38399" stroke-width="3" stroke-linejoin="round"/><path d="M154 56 L158 32 L136 48Z" fill="#E77F96"/>
  <ellipse cx="100" cy="104" rx="68" ry="60" fill="url(#${u}head)"/>
  <ellipse cx="62" cy="122" rx="11" ry="7" fill="#F27D98" opacity="${truth ? .25 : .55}"/><ellipse cx="138" cy="122" rx="11" ry="7" fill="#F27D98" opacity="${truth ? .25 : .55}"/>
  ${truth ? eyeTrue(72) + eyeTrue(128) : eyeCute(72) + eyeCute(128)}
  <ellipse cx="100" cy="117" rx="25" ry="16.5" fill="${truth ? '#e6919f' : '#F48FA4'}" stroke="#D86E86" stroke-width="2.5"/>
  <ellipse cx="91" cy="117" rx="4.5" ry="6.5" fill="#9a3e55"/><ellipse cx="109" cy="117" rx="4.5" ry="6.5" fill="#9a3e55"/>
  ${truth ? mouthTrue : mouthCute}
  <g class="m-hat">
    <path d="M62 50 Q60 14 100 12 Q140 14 138 50Z" fill="#EDC768" stroke="#C9A24A" stroke-width="2"/>
    <path d="M70 22 L130 22 M66 32 L134 32 M64 42 L136 42" stroke="#D3AE55" stroke-width="1.5"/>
    <path d="M62 44 Q100 50 138 44 L138 52 Q100 58 62 52Z" fill="#C8362B"/>
    <ellipse cx="100" cy="54" rx="84" ry="14" fill="#F2CF74" stroke="#C9A24A" stroke-width="2"/>
    <path d="M24 54 Q100 62 176 54" stroke="#D3AE55" stroke-width="1.5" fill="none"/>
  </g>
</svg>`;
}
function svgToImage(svg) {
  const img = new Image();
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.replace('<svg ', '<svg width="800" height="1000" '));
  return img;
}

function heroSVG() {
  let barns = '';
  for (let i = 0; i < 7; i++) {
    const x = 905 + i * 40, y = 221 + Math.sin(i * .9) * 3;
    const dark = i === 6;
    barns += `<g ${dark ? 'id="far7" class="far7" role="button" aria-label="Barn"' : ''} transform="translate(${x} ${y})"><path d="M0 18 L0 6 L9 0 L18 6 L18 18Z" fill="${dark ? '#111' : '#B8453B'}"/><rect x="6" y="10" width="6" height="8" fill="${dark ? '#000' : '#7d2a22'}"/></g>`;
  }
  let fence = '';
  for (let x = -10; x < 1220; x += 64) fence += `<rect x="${x}" y="486" width="12" height="70" rx="3" fill="#F6EFE2" stroke="#C9B89A" stroke-width="2"/>`;
  let flowers = '';
  const R = rng(42);
  for (let i = 0; i < 46; i++) { const x = R() * 1200, y = 560 + R() * 70, c = ['#fff', '#FFD66B', '#F7A8B8'][i % 3]; flowers += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(3 + R() * 3).toFixed(1)}" fill="${c}"/>`; }
  return `<svg class="hero-svg" viewBox="0 0 1200 640" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop class="sky-a" offset="0" stop-color="#8FD0F2"/><stop class="sky-b" offset="1" stop-color="#E4F6FF"/></linearGradient>
    <radialGradient id="sunG"><stop offset="0" stop-color="#FFF4B8"/><stop offset=".6" stop-color="#FFD66B"/><stop offset="1" stop-color="#FFC94A"/></radialGradient>
    <linearGradient id="h1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ED67E"/><stop offset="1" stop-color="#7DBF5F"/></linearGradient>
    <linearGradient id="h2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#76BE55"/><stop offset="1" stop-color="#58A242"/></linearGradient>
    <linearGradient id="h3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5BAA45"/><stop offset="1" stop-color="#3F8634"/></linearGradient>
    <linearGradient id="barnG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#D2433A"/><stop offset="1" stop-color="#B2342C"/></linearGradient>
  </defs>
  <rect width="1200" height="640" fill="url(#sky)"/>
  <g class="stars-n">${Array.from({ length: 40 }, (_, i) => `<circle cx="${(hash2(i, 1, 3) * 1200).toFixed(0)}" cy="${(hash2(i, 2, 3) * 260).toFixed(0)}" r="${(1 + hash2(i, 3, 3) * 1.4).toFixed(1)}" fill="#fff"/>`).join('')}</g>
  <g class="sun" transform="translate(980 120)"><g class="rays">${Array.from({ length: 12 }, (_, i) => `<rect x="-5" y="-118" width="10" height="34" rx="5" fill="#FFE08A" transform="rotate(${i * 30})"/>`).join('')}</g><circle r="66" fill="url(#sunG)"/></g>
  <g class="moon" transform="translate(980 120)"><circle r="50" fill="#EDEAD8"/><circle r="50" cx="18" cy="-10" fill="#1a2440"/></g>
  <g class="clouds"><g class="cloud c1"><ellipse cx="200" cy="110" rx="70" ry="26" fill="#fff"/><ellipse cx="240" cy="94" rx="44" ry="30" fill="#fff"/><ellipse cx="170" cy="98" rx="34" ry="22" fill="#fff"/></g>
  <g class="cloud c2"><ellipse cx="660" cy="70" rx="56" ry="20" fill="#fff"/><ellipse cx="690" cy="58" rx="34" ry="24" fill="#fff"/></g></g>
  <path d="M0 260 Q180 200 380 236 T780 226 T1200 240 L1200 640 L0 640Z" fill="url(#h1)"/>
  ${barns}
  <path d="M0 330 Q240 270 520 312 T1200 300 L1200 640 L0 640Z" fill="url(#h2)"/>
  <g opacity=".35" stroke="#4E9A3F" stroke-width="3">${Array.from({ length: 9 }, (_, i) => `<path d="M${-40 + i * 150} 360 Q${200 + i * 120} 330 ${600 + i * 80} 380" fill="none"/>`).join('')}</g>
  <g class="barn">
    <rect x="828" y="196" width="66" height="266" fill="#D9D2C4"/><path d="M828 196 Q861 160 894 196Z" fill="#BDB4A3"/>
    <path d="M828 236 H894 M828 286 H894 M828 336 H894 M828 386 H894" stroke="#BFB6A5" stroke-width="3"/>
    <path d="M520 300 L556 236 L660 196 L764 236 L800 300 L800 470 L520 470Z" fill="url(#barnG)"/>
    <path d="M506 306 L552 228 L660 184 L768 228 L814 306" fill="none" stroke="#F6EFE2" stroke-width="12" stroke-linejoin="round"/>
    <rect x="606" y="232" width="108" height="26" rx="4" fill="#F6EFE2"/>
    <text x="660" y="251" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-weight="700" font-size="16" fill="#B2342C" letter-spacing="2">GLADHAVEN</text>
    <g class="loft"><rect x="636" y="272" width="48" height="40" rx="3" fill="#2A1A18" stroke="#F6EFE2" stroke-width="6"/>
      <g id="loftface" opacity="0"><ellipse cx="660" cy="294" rx="11" ry="14" fill="#d9d0c0"/><circle cx="655.5" cy="291" r="2.4" fill="#000"/><circle cx="664.5" cy="291" r="2.4" fill="#000"/><path d="M653 300 Q660 306 667 300" stroke="#000" stroke-width="1.8" fill="none"/></g></g>
    <rect x="590" y="350" width="140" height="120" fill="#A82E27" stroke="#F6EFE2" stroke-width="8"/>
    <path d="M590 350 L730 470 M730 350 L590 470" stroke="#F6EFE2" stroke-width="8"/>
  </g>
  <path d="M0 470 Q300 430 640 460 T1200 450 L1200 640 L0 640Z" fill="url(#h3)"/>
  ${fence}<rect x="-10" y="500" width="1230" height="12" rx="4" fill="#F6EFE2" stroke="#C9B89A" stroke-width="2"/><rect x="-10" y="530" width="1230" height="12" rx="4" fill="#F6EFE2" stroke="#C9B89A" stroke-width="2"/>
  <path d="M0 556 Q300 540 600 556 T1200 550 L1200 640 L0 640Z" fill="#4C9A3C"/>
  ${flowers}
  <svg x="930" y="300" width="250" height="320" viewBox="0 0 200 250" id="hero-merry" class="hero-merry">${merrySVG().replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}</svg>
</svg>`;
}

function productSVG(kind) {
  const u = 'p' + (++svgUid);
  let meat = '';
  if (kind === 'bacon') for (let i = 0; i < 4; i++) { const y = 70 + i * 26; meat += `<path d="M60 ${y} q30 -10 60 0 t60 0 t60 0 l0 18 q-30 10 -60 0 t-60 0 t-60 0z" fill="#D9646E"/><path d="M60 ${y + 7} q30 -10 60 0 t60 0 t60 0" stroke="#F8DCD3" stroke-width="4" fill="none"/><path d="M60 ${y + 14} q30 -10 60 0 t60 0 t60 0" stroke="#F3C6BC" stroke-width="2" fill="none"/>`; }
  if (kind === 'links') for (let i = 0; i < 5; i++) { const x = 62 + i * 38; meat += `<rect x="${x}" y="72" width="30" height="92" rx="15" fill="#C46B55"/><rect x="${x + 6}" y="80" width="7" height="60" rx="4" fill="#E39A84" opacity=".7"/>`; }
  if (kind === 'roast') meat = `<ellipse cx="150" cy="118" rx="86" ry="52" fill="url(#${u}r)"/>${[96, 124, 152, 180, 206].map(x => `<path d="M${x} 70 q-8 48 0 96" stroke="#EED9A8" stroke-width="4" fill="none"/>`).join('')}`;
  if (kind === 'ham') meat = `<path d="M70 150 Q60 80 130 70 Q210 62 228 112 Q236 150 190 166 Q120 182 70 150Z" fill="url(#${u}r)"/><circle cx="214" cy="114" r="16" fill="#F3EBDD" stroke="#D8CBB4" stroke-width="3"/><circle cx="214" cy="114" r="6" fill="#E2D3B8"/>${[100, 130, 160].map(x => `<path d="M${x} 84 l26 70" stroke="#8E3B22" stroke-width="2" opacity=".45"/>`).join('')}`;
  if (kind === 'sticks') for (let i = 0; i < 7; i++) { const x = 66 + i * 26; meat += `<rect x="${x}" y="62" width="14" height="110" rx="7" fill="#8E3B2E"/><rect x="${x + 3}" y="68" width="3" height="90" rx="2" fill="#B5604C"/>`; }
  if (kind === 'mince') meat = `<path d="M58 160 Q60 92 108 82 Q150 60 196 84 Q244 96 242 160Z" fill="#D9707A" filter="url(#${u}t)"/><path d="M58 160 Q60 92 108 82 Q150 60 196 84 Q244 96 242 160Z" fill="#000" opacity=".06"/>
    <g transform="translate(176 112) rotate(18)"><path d="M0 0 q5 -3 10 0 q2 7 -1 13 q-2 5 -3 0 q-1 4 -3 0 q-3 -6 -3 -13z" fill="#F1EADA" stroke="#C9BDA2" stroke-width=".8"/></g>`;
  const bgc = { bacon: '#FDE3C4', links: '#FFE6A8', roast: '#E4F0D0', ham: '#F9D9D3', sticks: '#D9ECF7', mince: '#EDE4F4' }[kind];
  return `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs><radialGradient id="${u}r" cx="45%" cy="35%" r="70%"><stop offset="0" stop-color="#D9775E"/><stop offset=".7" stop-color="#A84A33"/><stop offset="1" stop-color="#6E2A1A"/></radialGradient>
  <filter id="${u}t"><feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .85  0 0 0 0 .42  0 0 0 0 .45  0 0 0 1.4 -.3"/><feComposite in2="SourceGraphic" operator="in"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode/></feMerge></filter></defs>
  <rect width="300" height="220" fill="${bgc}"/>
  <rect x="34" y="40" width="232" height="150" rx="18" fill="#000" opacity=".08" transform="translate(4 6)"/>
  <rect x="34" y="40" width="232" height="150" rx="18" fill="#FAFAF6" stroke="#E2E0D6" stroke-width="2"/>
  <rect x="46" y="52" width="208" height="126" rx="12" fill="#F0EEE6"/>
  ${meat}
  <path d="M46 60 L120 52 L60 170Z" fill="#fff" opacity=".22"/>
  <g transform="translate(40 150)"><rect width="118" height="34" rx="8" fill="#C8362B"/><circle cx="17" cy="17" r="11" fill="#F7A8B8"/><ellipse cx="17" cy="20" rx="5" ry="3.4" fill="#E77F96"/><text x="34" y="22" font-family="Fredoka, Nunito, sans-serif" font-weight="700" font-size="11.5" fill="#fff" letter-spacing=".6">GLADHAVEN</text></g>
</svg>`;
}

/* sepia photograph of Barn 7, 1988: look closely at the doorway */
function renderBarnPhoto(w = 480, h = 320) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#d9c7a4'); g.addColorStop(1, '#a8916c');
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  x.fillStyle = '#8f7a58'; x.fillRect(0, h * .72, w, h);
  // barn
  const bx = w * .26, bw = w * .48, by = h * .3;
  x.fillStyle = '#5d4a33'; x.beginPath(); x.moveTo(bx, by + 40); x.lineTo(bx + bw * .12, by); x.lineTo(bx + bw / 2, by - 30); x.lineTo(bx + bw * .88, by); x.lineTo(bx + bw, by + 40); x.lineTo(bx + bw, h * .75); x.lineTo(bx, h * .75); x.fill();
  x.fillStyle = '#e8dcc2'; x.font = `bold ${h * .06}px Georgia, serif`; x.textAlign = 'center'; x.fillText('7', bx + bw / 2, by + 30);
  const dx = bx + bw * .3, dw = bw * .4, dy = by + 55, dh = h * .75 - dy;
  x.fillStyle = '#0c0906'; x.fillRect(dx, dy, dw, dh);
  // the faces in the doorway
  const R = rng(1988);
  for (let i = 0; i < 70; i++) {
    const fx = dx + 6 + R() * (dw - 12), fy = dy + 10 + Math.pow(R(), .7) * (dh - 20), r = 2 + (fy - dy) / dh * 3.2;
    x.fillStyle = `rgba(210,196,168,${.25 + R() * .45})`; x.beginPath(); x.ellipse(fx, fy, r, r * 1.25, 0, 0, 7); x.fill();
    x.fillStyle = 'rgba(0,0,0,.8)'; x.fillRect(fx - r * .5, fy - r * .25, r * .32, r * .32); x.fillRect(fx + r * .2, fy - r * .25, r * .32, r * .32);
    x.fillRect(fx - r * .45, fy + r * .45, r * .9, r * .18);
  }
  // ribbon + people in front
  x.strokeStyle = '#3a2c1c'; x.lineWidth = 2; x.beginPath(); x.moveTo(bx - 20, h * .7); x.lineTo(bx + bw + 20, h * .7); x.stroke();
  for (let i = 0; i < 9; i++) {
    const px = w * .14 + i * w * .085, py = h * .78;
    x.fillStyle = '#2e2418'; x.fillRect(px - 9, py - 34, 18, 46);
    x.fillStyle = '#cdb994'; x.beginPath(); x.arc(px, py - 42, 8, 0, 7); x.fill();
    x.fillStyle = '#2e2418'; x.fillRect(px - 3, py - 44, 2, 2); x.fillRect(px + 2, py - 44, 2, 2);
  }
  grainify(x, w, h, .2, 1988, true);
  return c;
}
function grainify(x, w, h, amt, seed, old) {
  const d = x.getImageData(0, 0, w, h), D = d.data;
  for (let py = 0; py < h; py++) for (let px = 0; px < w; px++) {
    const i = (py * w + px) * 4, n = (hash2(px, py, seed) - .5) * 255 * amt;
    const sx = px / w - .5, sy = py / h - .5, v = old ? 1 - (sx * sx + sy * sy) * 1.6 : 1;
    for (let k = 0; k < 3; k++) D[i + k] = clamp((D[i + k] + n) * v / 255) * 255;
  }
  x.putImageData(d, 0, 0);
  if (old) { x.strokeStyle = 'rgba(255,250,235,.35)'; x.lineWidth = 1; const R = rng(seed); for (let i = 0; i < 9; i++) { const sx = R() * w; x.beginPath(); x.moveTo(sx, 0); x.lineTo(sx + (R() - .5) * 30, h); x.stroke(); } }
}

/* shared animated noise */
const NOISE = (() => { const c = document.createElement('canvas'); c.width = 256; c.height = 144; const x = c.getContext('2d'); const id = x.createImageData(256, 144);
  return { c, tick() { const a = id.data; for (let i = 0; i < a.length; i += 4) { const v = Math.random() * 255 | 0; a[i] = a[i + 1] = a[i + 2] = v; a[i + 3] = 255; } x.putImageData(id, 0, 0); } }; })();

/* scrawled handwriting onto a canvas */
function scrawl(x, text, cx, cy, size, color = '#7a0b0b', seed = 1) {
  const R = rng(seed);
  x.save(); x.font = `italic ${size}px "IM Fell English", Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle';
  for (let k = 0; k < 3; k++) { x.globalAlpha = .55; x.fillStyle = color; x.fillText(text, cx + (R() - .5) * 2.5, cy + (R() - .5) * 2.5); }
  x.restore();
}
