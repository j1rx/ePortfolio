/* ============ CONTENT CONFIG (edit freely) ============ */
const IMG = 'assets/img/', TXT = 'assets/txt/', ZIP = 'assets/projects/', CV = 'assets/cv/';

/* Titles and tags of your 10 projects */
const PROJECTS = [
    ['Forbidden Island — Board Game', ['Java', 'Swing', 'MVC']],
    ['Ant Colony Simulation', ['C++', 'SFML', 'Simulation']],
    ['Descent into the Pyramid 3D', ['Java', 'Processing', 'GLSL']],
    ['Huffman Data Compression', ['OCaml', 'Algorithms']],
    ['Interactive ePortfolio v1', ['HTML/CSS', 'JavaScript', 'Web']],
    ['TCP & UDP Client-Server', ['C', 'Sockets', 'Networking']],
    ['NutriCoach Desktop App', ['Java', 'Swing', 'Architecture']],
    ['IPv4 Network Router', ['Ada', 'Networking', 'Data Structures']],
    ['Dijkstra Pathfinding Visualizer', ['C', 'SDL2', 'Multithreading']],
    ['Site Studio — Modular Web Builder', ['Node.js', 'Express', 'JavaScript']]
];

/* Home cards: icon + title here, text loaded from assets/txt/carte_<page>.txt */
const NAV_CARDS = [
    ['careers', 'fa-graduation-cap', 'Careers'],
    ['projects', 'fa-code', 'Projects'],
    ['interests', 'fa-heart', 'Interests'],
    ['mobility', 'fa-earth-europe', 'Mobility'],
    ['civic-engagement', 'fa-hands-holding-circle', 'Civic Engagement']
];

/* Interests / Mobility / Civic Engagement: 3 blocks each (file stems follow your naming) */
const BLOCKS = {
    interests: {
        icon: 'fa-heart',
        title: 'Interests',
        intro: 'What keeps me balanced outside of engineering: team sports, good food and quiet time by the water.',
        stem: 'interet',
        heads: ['Handball', 'Cooking', 'Programming']
    },
    mobility: {
        icon: 'fa-earth-europe',
        title: 'Mobility',
        intro: 'Travelling and working abroad has shaped how I communicate, adapt and collaborate.',
        stem: 'mobilite',
        heads: ['Summer Camp in Italy & Slovenia', 'European Internship Search', 'Germany: Returning to My Roots']
    },
    'civic-engagement': {
        icon: 'fa-hands-holding-circle',
        title: 'Civic Engagement',
        intro: 'Giving time to others, through student consulting and youth supervision.',
        stem: 'engagement',
        heads: ['Holiday Camp Counselor', 'Volunteer Tutoring & Maraudes', 'Why Civic Engagement Matters to Me']
    }
};

/* ============ HELPERS ============ */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const img = (f, alt, cls = 'img') => `<div class="${cls}"><img src="${IMG}${f}" alt="${esc(alt)}" loading="lazy" onerror="this.parentNode.classList.add('empty');this.remove()"></div>`;
const txt = f => `<div class="txt" data-txt="${f}">Loading…</div>`;
const sh = (i, t) => `<h2 class="sh"><i class="fa-solid ${i}"></i>${t}</h2>`;

/* Load every [data-txt] element from assets/txt/ with a clear fallback */
/* Load every [data-txt] element from assets/txt/ with a clear fallback */
async function loadTexts(root) {
    root.querySelectorAll('[data-txt]').forEach(async el => {
        const f = el.dataset.txt;
        try {
            const r = await fetch(TXT + f, { cache: 'no-cache' });
            if (!r.ok) throw 0;
            const t = (await r.text()).trim();
            if (!t) throw 0;
            el.innerHTML = esc(t).replace(/\*\*(.+?)\*\*/g, '<span class="hl">$1</span>');
        } catch (e) {
            el.classList.add('ph');
            el.textContent = `Text coming soon. Add your content in ${TXT}${f} (this also appears when the site is opened locally without a server).`;
        }
    });
}

/* ============ PAGES ============ */
const pages = {
    home: () => `
        <section class="glass hero">
            ${img('photo_accueil.png', 'Portrait of Justin Roux', 'photo')}
            <div>
                <h1 class="grad" style="color: white !important; -webkit-text-fill-color: white !important;">JUSTIN ROUX</h1>
                <p class="role">Second-year Digital Sciences Engineering Student — Embedded Systems</p>
                ${txt('description_accueil.txt')}
            </div>
        </section>
        <div class="cards">${NAV_CARDS.map(c => `<a class="glass hov nc" href="#${c[0]}"><i class="fa-solid ${c[1]}"></i><h3>${c[2]}</h3>${txt(`carte_${c[0]}.txt`)}</a>`).join('')}</div>`,

    careers: () => {
        const bars = [['C / C++', 'Advanced', 85], ['Python', 'Advanced', 82], ['Java', 'Proficient', 78], ['OCaml', 'Proficient', 72], ['Web (HTML/CSS/JS)', 'Proficient', 75]];
        const edu = [
            ['Engineering Degree in Digital Sciences', '2025 – In Progress', 'ENSEEIHT — Toulouse', 'Computer science, software architecture, networks…', 'logo_enseeiht.jpg'],
            ['Double Degree in Mathematics & Computer Science', '2025', 'Université Paris-Saclay', '', 'logo_paris_saclay.jpg'],
            ['French Baccalaureate — Highest Honors (Euro-German)', '2023', 'Lycée Jean Perrin — Lyon', 'German Section, Mathematics, Physics-Chemistry, Advanced Mathematics option', 'logo_lycee.jpg']
        ];
        return `
            <section class="glass hero">
                ${img('photo_careers.png', 'Justin Roux', 'photo')}
                <div>
                    <h1 class="grad" style="color: white !important; -webkit-text-fill-color: white !important;">JUSTIN ROUX</h1>
                    <p class="role">Aiming to become an Embedded Systems Engineer</p>
                    ${txt('description_careers.txt')}
                    <div class="row" style="margin-top:18px">
                        <a class="btn main" href="${CV}CV_Justin_Roux_FR.pdf" download><i class="fa-solid fa-download"></i>Download CV (French)</a>
                        <a class="btn main" href="${CV}CV_Justin_Roux_EN.pdf" download><i class="fa-solid fa-download"></i>Download CV (English)</a>
                    </div>
                </div>
            </section>
            <section class="glass intern hov" style="margin-bottom:20px">
                <i class="fa-solid fa-magnifying-glass"></i>
                <div>
                    <b>Looking for a 14-week paid IT internship</b>
                    <p class="txt">June – September 2027 · C/C++, Java, Python and Web development.</p>
                </div>
            </section>
            <div class="two">
                <section class="glass pad hov">
                    ${sh('fa-graduation-cap', 'Education')}
                    <div class="tl">
                        ${edu.map(e => `<div class="tli"><div class="r2"><div class="circ"><img src="${IMG}${e[4]}" alt="${esc(e[2])}" loading="lazy" onerror="this.parentNode.classList.add('empty');this.remove()"></div><div><b>${e[0]}</b><span class="d">${e[1]}</span><div class="p">${e[2]}</div>${e[3] ? `<p>${e[3]}</p>` : ''}</div></div></div>`).join('')}
                    </div>
                </section>
                <section class="glass pad hov">
                    ${sh('fa-sliders', 'Technical skills')}
                    ${bars.map(b => `<div class="bar"><div class="m"><span>${b[0]}</span><span>${b[1]}</span></div><div class="track"><div class="fill" data-w="${b[2]}"></div></div></div>`).join('')}
                </section>
            </div>
            <div class="two r">
                <section class="glass pad hov">
                    ${sh('fa-language', 'Languages')}
                    <p class="lang"><b>French:</b> Native</p>
                    <p class="lang"><b>German:</b> B2 &amp; Certified B1<small>Bescheinigung Deutsches Sprachdiplom</small></p>
                    <p class="lang"><b>English:</b> B1–B2 (daily work experience)</p>
                </section>
                <section class="glass pad hov">
                    ${sh('fa-award', 'Qualifications')}
                    <span class="pill">BAFA</span><span class="pill">PSC1 (First Aid)</span><span class="pill">Driving Licence B</span>
                </section>
            </div>`;
    },

    projects: () => `
        <h1 class="title grad">Projects</h1>
        <p class="intro txt">Ten projects from my engineering studies. Select the centre card to see the full details and download the source archive.</p>
        <div class="cf">
            <div class="stage" id="stage">
                ${PROJECTS.map((p, i) => `<button class="cfc" data-i="${i}" aria-label="Project ${i + 1}: ${esc(p[0])}"><span class="badge">${i + 1}</span>${img(`photo_projet_${i + 1}.jpg`, p[0])}</button>`).join('')}
            </div>
            <div class="cap"><h2 id="cft"></h2><span class="cnt" id="cnt"></span></div>
            <div class="cap-tags">
                <div class="tags" id="cftags"></div>
                <div class="arrows">
                    <button class="arr" id="prev" aria-label="Previous project"><i class="fa-solid fa-chevron-left"></i></button>
                    <button class="arr" id="next" aria-label="Next project"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
            <p class="hint">Click the centre card for details · swipe or use the arrow keys to browse</p>
        </div>`
};

Object.entries(BLOCKS).forEach(([k, b]) => {
    pages[k] = () => `
        <h1 class="title grad"><i class="fa-solid ${b.icon}"></i> ${b.title}</h1>
        <div class="intro">${txt(`intro_${b.stem}.txt`)}</div>
        <div>${[1, 2, 3].map(n => `<section class="glass hov blk">${img(`photo_${b.stem}_${n}.jpg`, b.heads[n - 1])}<div><h3 style="margin-bottom:10px">${b.heads[n - 1]}</h3>${txt(`description_${b.stem}_${n}.txt`)}</div></section>`).join('')}</div>`;
});

/* ============ ROUTER ============ */
const app = $('#app');
let current = null;

function route() {
    let id = location.hash.replace('#', '') || 'home';
    if (!pages[id]) id = 'home';
    if (id === current) return;
    const old = $('.page', app);
    const render = () => {
        current = id;
        app.innerHTML = `<div class="page">${pages[id]()}</div>`;
        window.scrollTo(0, 0);
        document.querySelectorAll('.links a').forEach(a => a.classList.toggle('active', a.dataset.p === id));
        document.title = (id === 'home' ? 'Justin Roux' : id.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()) + ' — Justin Roux') + ' | ePortfolio';
        loadTexts(app);
        if (id === 'projects') cfInit();
        setTimeout(() => app.querySelectorAll('.fill').forEach(f => f.style.width = f.dataset.w + '%'), 150);
    };
    if (old) {
        old.classList.add('out');
        setTimeout(render, 200);
    } else {
        render();
    }
    closeMenu();
}
window.addEventListener('hashchange', route);

/* projects carousel + detail modal */
function closeModal() {
    const m = $('#modal');
    if (m) {
        m.remove();
        document.body.style.overflow = '';
    }
}

function openModal(i) {
    const p = PROJECTS[i];
    const m = document.createElement('div');
    m.className = 'modal';
    m.id = 'modal';
    m.innerHTML = `
        <div class="glass mbox" role="dialog" aria-modal="true" aria-label="${esc(p[0])}">
            <button class="mx" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
            ${img(`photo_projet_${i + 1}.jpg`, p[0])}
            <div>
                <h2 class="grad">${i + 1}. ${esc(p[0])}</h2>
                <div class="tags">${p[1].map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
                ${txt(`description_projet_${i + 1}.txt`)}
                <a class="btn main" href="${ZIP}projet_${i + 1}.zip" download><i class="fa-solid fa-file-zipper"></i>Download project (.zip)</a>
            </div>
        </div>`;
    document.body.appendChild(m);
    document.body.style.overflow = 'hidden';
    loadTexts(m);
    $('.mx', m).focus();
}

/* coverflow (infinite loop) */
let cfIdx = 0, cfMoved = false;

function cfRender() {
    const cards = app.querySelectorAll('.cfc'), n = cards.length;
    if (!n) return;
    cards.forEach((c, i) => {
        let d = ((i - cfIdx) % n + n) % n;
        if (d > n / 2) d -= n;
        const a = Math.abs(d);
        c.style.setProperty('--d', d);
        c.style.setProperty('--a', a);
        c.style.opacity = a > 3 ? 0 : 1 - a * .22;
        c.style.visibility = a > 3 ? 'hidden' : 'visible';
        c.style.pointerEvents = a > 3 ? 'none' : 'auto';
        c.style.zIndex = 10 - a;
        c.classList.toggle('on', d === 0);
        c.tabIndex = d === 0 ? 0 : -1;
    });
    const p = PROJECTS[cfIdx];
    $('#cft').textContent = p[0];
    $('#cnt').textContent = `${cfIdx + 1}/${n}`;
    $('#cftags').innerHTML = p[1].map(t => `<span class="tag">${esc(t)}</span>`).join('');
    $('.cap').style.setProperty('--p', ((cfIdx + 1) / n * 100) + '%');
}

function cfGo(i) {
    const n = PROJECTS.length;
    cfIdx = ((i % n) + n) % n;
    cfRender();
}

function cfInit() {
    cfIdx = 0;
    cfRender();
}

app.addEventListener('click', e => {
    if (cfMoved) {
        cfMoved = false;
        return;
    }
    const c = e.target.closest('.cfc');
    if (c) {
        const i = +c.dataset.i;
        return i === cfIdx ? openModal(i) : cfGo(i);
    }
    if (e.target.closest('#next')) cfGo(cfIdx + 1);
    if (e.target.closest('#prev')) cfGo(cfIdx - 1);
});

let sx = null;
app.addEventListener('pointerdown', e => {
    sx = e.target.closest('#stage') ? e.clientX : null;
});

window.addEventListener('pointerup', e => {
    if (sx === null) return;
    const dx = e.clientX - sx;
    sx = null;
    if (Math.abs(dx) > 45) {
        cfMoved = true;
        setTimeout(() => cfMoved = false, 50);
        cfGo(cfIdx + (dx < 0 ? 1 : -1));
    }
});

document.addEventListener('keydown', e => {
    if (current !== 'projects' || $('#modal')) return;
    if (e.key === 'ArrowRight') cfGo(cfIdx + 1);
    if (e.key === 'ArrowLeft') cfGo(cfIdx - 1);
});

document.addEventListener('click', e => {
    if (e.target.id === 'modal' || e.target.closest('.mx')) closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

window.addEventListener('hashchange', closeModal);

/* burger menu */
const burger = $('#burger'), links = $('#links');

function closeMenu() {
    links.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.firstElementChild.className = 'fa-solid fa-bars';
}

burger.addEventListener('click', () => {
    const o = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', o);
    burger.firstElementChild.className = 'fa-solid ' + (o ? 'fa-xmark' : 'fa-bars');
});

document.addEventListener('click', e => {
    if (!e.target.closest('nav')) closeMenu();
});

/* orbs follow the mouse */
const orbs = document.querySelectorAll('.orb');
if (matchMedia('(hover:hover)').matches) {
    document.addEventListener('mousemove', e => {
        const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
        orbs.forEach((o, i) => {
            const f = (i + 1) * 40;
            o.style.transform = `translate(${x * f}px,${y * f}px)`;
        });
    });
}

$('#yr').textContent = new Date().getFullYear();
route();
