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
    const imgs = [
        { src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=60', alt: 'Çocuk Ergoterapi Seansı' },
        { src: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=400&q=60', alt: 'Motor Beceri Aktivitesi' },
        { src: 'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?auto=format&fit=crop&w=400&q=60', alt: 'Duyu Bütünleme Terapisi' },
        { src: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=400&q=60', alt: 'Çocuk Gelişim Aktivitesi' },
        { src: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=400&q=60', alt: 'Terapi Merkezi' },
        { src: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&w=400&q=60', alt: 'Çocuk Oyun Terapisi' },
        { src: 'https://images.unsplash.com/photo-1516627145497-ae4b46fa11d0?auto=format&fit=crop&w=400&q=60', alt: 'İnce Motor Beceri Çalışması' }
    ];

    // 2 kopya - sonsuz döngü için
    for (let i = 0; i < 2; i++) {
        imgs.forEach(img => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `
                <img src="${img.src}" alt="${img.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <h4>Terapi Merkezi</h4>
                    <p>Terapi sürecimizden bir kare</p>
                </div>`;
            galleryTrack.appendChild(div);
        });
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
