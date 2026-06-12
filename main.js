// ===== HAMBURGEr MENÜ =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        nav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Dışarı tıklayınca kapat
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
            hamburger.classList.remove('open');
            nav.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Nav linkine tıklayınca kapat
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            nav.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// ===== GALERİ =====
const galleryTrack = document.getElementById('gallery-track');
if (galleryTrack) {
    // Fotoğraflar ileride yüklenecek - şimdilik logo gösteriyor
    const placeholderCount = 7;

    // 2 kopya - sonsuz döngü için
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < placeholderCount; j++) {
            const div = document.createElement('div');
            div.className = 'gallery-item gallery-item-empty';
            div.innerHTML = '<img src="logo1.png" alt="Bursa Ergoterapi Merkezi" loading="lazy">';
            galleryTrack.appendChild(div);
        }
    }

    galleryTrack.addEventListener('mouseenter', () => galleryTrack.style.animationPlayState = 'paused');
    galleryTrack.addEventListener('mouseleave', () => galleryTrack.style.animationPlayState = 'running');
}

// ===== SLIDER HOVER DURDUR =====
const sliderTrack = document.querySelector('.slider-track');
if (sliderTrack) {
    sliderTrack.addEventListener('mouseenter', () => sliderTrack.style.animationPlayState = 'paused');
    sliderTrack.addEventListener('mouseleave', () => sliderTrack.style.animationPlayState = 'running');
}

// ===== HASH SCROLL (index.html#hizmetler gibi linkler için) =====
window.addEventListener('load', () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                window.scrollTo({ top: target.offsetTop - 90, behavior: 'smooth' });
            }, 200);
        }
    }
});

// ===== MOBİL HİZMET ACCORDION =====
function initServiceAccordion() {
    if (window.innerWidth > 768) return;

    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        const heading = card.querySelector('h3') || card.querySelector('h2');
        const p = card.querySelector('p');
        const ul = card.querySelector('.service-features');
        const detailBtn = card.querySelector('.btn');

        if (!icon || !heading) return;

        // Header oluştur
        const header = document.createElement('div');
        header.className = 'service-card-header';
        const iconClone = icon.cloneNode(true);
        const headingClone = document.createElement('h3');
        headingClone.textContent = heading.textContent;
        const chevron = document.createElement('i');
        chevron.className = 'fas fa-chevron-down service-card-chevron';
        header.appendChild(iconClone);
        header.appendChild(headingClone);
        header.appendChild(chevron);

        // Body oluştur
        const body = document.createElement('div');
        body.className = 'service-card-body';
        if (p) body.appendChild(p.cloneNode(true));
        if (ul) body.appendChild(ul.cloneNode(true));
        if (detailBtn) body.appendChild(detailBtn.cloneNode(true));

        // Orijinal içeriği gizle
        [icon, heading, p, ul, detailBtn].forEach(el => { if (el) el.style.display = 'none'; });

        // Kartın başına ekle
        card.insertBefore(body, card.firstChild);
        card.insertBefore(header, card.firstChild);

        // Tıklama
        header.addEventListener('click', () => {
            const isOpen = card.classList.contains('open');
            cards.forEach(c => c.classList.remove('open'));
            if (!isOpen) card.classList.add('open');
        });
    });
}

// Sayfa yüklenince çalıştır
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceAccordion);
} else {
    initServiceAccordion();
}

// ===== SLIDER MANUEL KONTROL =====
(function(){
    const track = document.querySelector('.slider-track');
    if (!track) return;

    let current = 0;
    const total = 3;
    let autoTimer;
    const dots = document.querySelectorAll('.slider-dot');

    function goTo(index) {
        current = (index + total) % total;
        track.style.transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1)';
        track.style.transform = `translateX(-${current * 100}vw)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => goTo(current + 1), 6000);
    }

    // Dokunmatik sürükleme - gerçek zamanlı hareket
    let touchStartX = 0;
    let touchDiff = 0;
    let isDragging = false;

    track.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        touchDiff = 0;
        isDragging = true;
        track.style.transition = 'none';
        clearInterval(autoTimer);
    }, {passive:true});

    track.addEventListener('touchmove', e => {
        if (!isDragging) return;
        touchDiff = e.touches[0].clientX - touchStartX;
        track.style.transform = `translateX(calc(-${current * 100}vw + ${touchDiff}px))`;
    }, {passive:true});

    track.addEventListener('touchend', () => {
        isDragging = false;
        if (Math.abs(touchDiff) > 60) {
            goTo(touchDiff < 0 ? current + 1 : current - 1);
        } else {
            goTo(current); // geri döndür
        }
        startAuto();
    });

    // Masaüstü ok butonları
    document.querySelector('.slider-prev')?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    document.querySelector('.slider-next')?.addEventListener('click', () => { goTo(current + 1); startAuto(); });

    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAuto(); }));

    startAuto();
})();
