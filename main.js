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
        { src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=500&q=80', alt: 'Çocuk Ergoterapi Seansı' },
        { src: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=500&q=80', alt: 'Motor Beceri Aktivitesi' },
        { src: 'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?auto=format&fit=crop&w=500&q=80', alt: 'Duyu Bütünleme Terapisi' },
        { src: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=500&q=80', alt: 'Çocuk Gelişim Aktivitesi' },
        { src: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=500&q=80', alt: 'Terapi Merkezi' },
        { src: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&w=500&q=80', alt: 'Çocuk Oyun Terapisi' },
        { src: 'https://images.unsplash.com/photo-1516627145497-ae4b46fa11d0?auto=format&fit=crop&w=500&q=80', alt: 'İnce Motor Beceri Çalışması' }
    ];

    // 4 kopya - sonsuz döngü için
    for (let i = 0; i < 4; i++) {
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
