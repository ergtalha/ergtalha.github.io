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
        { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=500&q=80', alt: 'Pediatrik Ergoterapi 1' },
        { src: 'https://images.unsplash.com/photo-1516627145497-ae4b46fa11d0?auto=format&fit=crop&w=500&q=80', alt: 'Pediatrik Ergoterapi 2' },
        { src: 'https://images.unsplash.com/photo-1541692641319-981cc79ee10a?auto=format&fit=crop&w=500&q=80', alt: 'Pediatrik Ergoterapi 3' },
        { src: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=500&q=80', alt: 'Pediatrik Ergoterapi 4' },
        { src: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b5d70?auto=format&fit=crop&w=500&q=80', alt: 'Pediatrik Ergoterapi 5' },
        { src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=500&q=80', alt: 'Pediatrik Ergoterapi 6' },
        { src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=500&q=80', alt: 'Pediatrik Ergoterapi 7' }
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
