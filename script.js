// Mock data - baseado no conteúdo do PDF enviado
const newsData = [
    {
        id: 1,
        title: "Brasil atinge 35 mil drones agrícolas e crescimento de 1000%",
        excerpt: "Frota nacional saltou de 3 mil em 2021 para 35 mil equipamentos em 2025, consolidando o agro 4.0.",
        tag: "Mercado",
        date: "Maio 2026",
        source: "MAPA / Times Brasil"
    },
    {
        id: 2,
        title: "Embrapa: Drones aumentam deposição de gotas em até 1.9x na soja",
        excerpt: "Tecnologia atinge terço inferior das plantas, superando tratores convencionais e reduzindo desperdício.",
        tag: "Ciência",
        date: "Abril 2026",
        source: "Embrapa"
    },
    {
        id: 3,
        title: "UFES testa drones em café conilon e pimenta-do-reino",
        excerpt: "Pesquisas mostram viabilidade em relevo acidentado, única solução para áreas de morro no ES.",
        tag: "Inovação",
        date: "Março 2026",
        source: "Globo Rural"
    },
    {
        id: 4,
        title: "Controle biológico: drones soltam inimigos naturais contra pragas",
        excerpt: "Pesquisas da Embrapa utilizam drones para liberar fungos e insetos que atacam pestes sem químicos.",
        tag: "Sustentabilidade",
        date: "Fevereiro 2026",
        source: "Diário de Minas"
    },
    {
        id: 5,
        title: "DJI Agriculture prevê drones autônomos com docking stations até 2030",
        excerpt: "Mercado global deve ultrapassar US$ 20 bilhões; equipamentos autônomos e conectados serão realidade.",
        tag: "Futuro",
        date: "Jan 2026",
        source: "Agrishow 2026"
    },
    {
        id: 6,
        title: "Jovens do mundo todo vêm ao Brasil aprender pilotagem de drones",
        excerpt: "FAEMG/SENAR oferece cursos de mapeamento agronômico que lotam rapidamente; intercâmbio tecnológico.",
        tag: "Educação",
        date: "Dez 2025",
        source: "Sistema FAEMG"
    },
    {
        id: 7,
        title: "Redução de até 7% de perda por amassamento com pulverização aérea",
        excerpt: "Drones eliminam o tráfego pesado sobre as lavouras e preservam a produtividade da soja.",
        tag: "Eficiência",
        date: "Out 2025",
        source: "Portal do Agronegócio"
    },
    {
        id: 8,
        title: "Fatec Shunji Nishimura: TCC comprova redução de custos com ARP",
        excerpt: "Agricultura de precisão com drones diminui impacto ambiental e otimiza insumos.",
        tag: "Academia",
        date: "Set 2025",
        source: "Fatec"
    }
];

// Renderizar notícias dinamicamente
function renderNews() {
    const container = document.getElementById('newsContainer');
    if (!container) return;

    const newsHTML = newsData.slice(0, 6).map(news => `
        <article class="news-card">
            <div class="card-content">
                <span class="news-tag">${news.tag}</span>
                <h3>${news.title}</h3>
                <p class="news-excerpt">${news.excerpt}</p>
                <div class="news-meta">
                    <span><i class="far fa-calendar-alt"></i> ${news.date}</span>
                    <span><i class="fas fa-database"></i> ${news.source}</span>
                </div>
            </div>
        </article>
    `).join('');

    container.innerHTML = newsHTML;
}

// Animação de contagem dos stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        let current = 0;
        const increment = target / 40;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                el.innerText = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                el.innerText = target.toLocaleString();
            }
        };
        updateCounter();
    });
}

// Dark mode + localStorage
function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark');
    }
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const darkEnabled = document.body.classList.contains('dark');
        localStorage.setItem('darkMode', darkEnabled);
    });
}

// Menu Hamburguer lógica
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeMobileMenu');

    function openMenu() {
        mobileNav.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileNav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle?.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

    // Fechar ao clicar nos links
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderNews();
    animateStats();
    initDarkMode();
    initMobileMenu();

    // Re-animar stats quando a página carregar completamente
    window.addEventListener('load', () => {
        const numbers = document.querySelectorAll('.stat-number');
        numbers.forEach(el => {
            const val = parseInt(el.getAttribute('data-count'), 10);
            el.innerText = '0';
        });
        animateStats();
    });
});