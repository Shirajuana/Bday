'use strict';

// ── DOM refs ──────────────────────────────────────────────────────────────────
const envelopeScreen = document.getElementById('envelope-screen');
const cakeScreen     = document.getElementById('cake-screen');
const openBtn        = document.getElementById('open-btn');
const envelope       = document.querySelector('.envelope');
const cakeScene      = document.getElementById('cake-scene');
const spotlight      = document.getElementById('spotlight');
const countdownWrap  = document.getElementById('countdown-wrap');
const countdownNum   = document.getElementById('countdown-number');
const wishText       = document.getElementById('wish-text');
const finalReveal    = document.getElementById('final-reveal');
const starsLayer     = document.getElementById('stars-layer');
const particlesLayer = document.getElementById('particles-layer');
const confettiLayer  = document.getElementById('confetti-layer');
const musicBtn       = document.getElementById('music-btn');
const musicIcon      = document.getElementById('music-icon');
const birthdayMusic  = document.getElementById('birthday-music');
const ribbonBills    = document.getElementById('ribbon-bills');
const moneyRibbon    = document.querySelector('.money-ribbon');
const slotButton     = document.getElementById('slot-button');

const flames  = document.querySelectorAll('.flame');
const smokes  = document.querySelectorAll('.smoke');
const envParticles = document.getElementById('env-particles');

// ── State ─────────────────────────────────────────────────────────────────────
let musicPlaying = false;
let currentStrip = 0;

// ── Envelope ambient particles ────────────────────────────────────────────────
function spawnEnvParticles() {
    for (let i = 0; i < 28; i++) {
        const p = document.createElement('div');
        p.className = 'env-particle';
        p.style.cssText = `
            left: ${Math.random() * 100}%;
            bottom: ${Math.random() * 40}%;
            --dur: ${5 + Math.random() * 7}s;
            --delay: ${Math.random() * 6}s;
            --dx: ${(Math.random() - 0.5) * 80}px;
            width: ${1 + Math.random() * 2}px;
            height: ${1 + Math.random() * 2}px;
        `;
        envParticles.appendChild(p);
    }
}

// ── Open button ───────────────────────────────────────────────────────────────
openBtn.addEventListener('click', () => {
    openBtn.disabled = true;

    // Step 1: open flap
    envelope.classList.add('open');

    // Step 2: after flap fully opens, crossfade screens
    setTimeout(() => {
        envelopeScreen.classList.add('exiting');
        envelopeScreen.classList.remove('active');

        setTimeout(() => {
            cakeScreen.classList.add('active');
            spotlight.classList.add('on');

            // Animate cake in
            setTimeout(() => {
                cakeScene.classList.add('appear');
            }, 300);

            // Start countdown after cake is visible
            setTimeout(startCountdown, 2000);

            // Music button appears
            setTimeout(() => musicBtn.classList.add('show'), 2500);

        }, 200);
    }, 1300);
});

// ── Countdown ─────────────────────────────────────────────────────────────────
function startCountdown() {
    const steps = ['3', '2', '1'];
    let i = 0;

    countdownWrap.classList.add('show');
    countdownNum.textContent = steps[i];
    pulseTick();

    const timer = setInterval(() => {
        i++;
        if (i < steps.length) {
            countdownNum.textContent = steps[i];
            pulseTick();
        } else {
            clearInterval(timer);
            // Show "Make a wish" for a beat, then blow
            countdownWrap.classList.remove('show');
            wishText.classList.add('show');

            setTimeout(() => {
                wishText.classList.remove('show');
                setTimeout(blowCandles, 400);
            }, 1800);
        }
    }, 1000);
}

function pulseTick() {
    countdownNum.classList.remove('pulse');
    void countdownNum.offsetWidth; // reflow
    countdownNum.classList.add('pulse');
}

// ── Blow candles ──────────────────────────────────────────────────────────────
function blowCandles() {
    flames.forEach((flame, idx) => {
        setTimeout(() => {
            flame.classList.add('out');
        }, idx * 120);
    });

    smokes.forEach((smoke, idx) => {
        setTimeout(() => {
            smoke.classList.add('show');
        }, idx * 120 + 200);
    });

    setTimeout(postBlowSequence, 900);
}

// ── Post-blow celebration ─────────────────────────────────────────────────────
function postBlowSequence() {
    playMusic();
    spawnStars(60);
    spawnFireflies(18);
    buildMoneyRibbon();

    setTimeout(() => {
        spawnConfetti(80);
    }, 600);

    setTimeout(() => {
        finalReveal.classList.add('show');
    }, 1400);
}

// ── Stars ─────────────────────────────────────────────────────────────────────
function spawnStars(count) {
    for (let i = 0; i < count; i++) {
        const s = document.createElement('div');
        s.className = 'star-dot';
        const size = 1 + Math.random() * 2.5;
        s.style.cssText = `
            left: ${Math.random() * 100}%;
            top:  ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            --dur: ${2 + Math.random() * 3}s;
            --delay: ${Math.random() * 4}s;
        `;
        starsLayer.appendChild(s);
    }
}

// ── Fireflies ─────────────────────────────────────────────────────────────────
function spawnFireflies(count) {
    for (let i = 0; i < count; i++) {
        const f = document.createElement('div');
        f.className = 'firefly';
        const size = 3 + Math.random() * 4;
        const tx = (Math.random() - 0.5) * 500;
        const ty = -(50 + Math.random() * 400);
        f.style.cssText = `
            left: ${5 + Math.random() * 90}%;
            top:  ${20 + Math.random() * 70}%;
            width: ${size}px;
            height: ${size}px;
            --tx: ${tx}px;
            --ty: ${ty}px;
            --dur: ${6 + Math.random() * 6}s;
            --delay: ${Math.random() * 5}s;
        `;
        particlesLayer.appendChild(f);
    }
}

// ── Confetti ──────────────────────────────────────────────────────────────────
const confettiColors = [
    '#d4af37', '#f5e27a', '#f9f0c8', '#fff8dc',
    '#b8960f', '#ffd700', '#fffacd', '#e8c84a'
];

function spawnConfetti(count) {
    for (let i = 0; i < count; i++) {
        const c = document.createElement('div');
        c.className = 'confetti-piece';
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const w = 4 + Math.random() * 6;
        const h = 8 + Math.random() * 8;
        c.style.cssText = `
            left: ${Math.random() * 100}%;
            top: 0;
            width: ${w}px;
            height: ${h}px;
            background: ${color};
            --dur: ${2 + Math.random() * 3}s;
            --delay: ${Math.random() * 2}s;
            --rot: ${360 + Math.random() * 720}deg;
        `;
        confettiLayer.appendChild(c);
    }

    // Clean up after animation
    setTimeout(() => confettiLayer.innerHTML = '', 7000);
}

// ── Money ribbon ──────────────────────────────────────────────────────────────
const TOTAL_STRIPS = 6;

function buildMoneyRibbon() {
    ribbonBills.innerHTML = '';
    currentStrip = 0;

    for (let i = 0; i < TOTAL_STRIPS; i++) {
        const strip = document.createElement('div');
        strip.className = 'bill';
        strip.setAttribute('aria-hidden', 'true');
        ribbonBills.appendChild(strip);
    }

    ribbonBills.classList.add('show');
    if (slotButton) {
        slotButton.textContent = '✦ CLICK ✦';
        slotButton.disabled = false;
        slotButton.classList.remove('done');
    }
}

function revealNextStrip() {
    const strips = ribbonBills.querySelectorAll('.bill');
    if (!strips.length || currentStrip >= strips.length) {
        return;
    }

    const nextStrip = strips[currentStrip];
    nextStrip.classList.add('visible');
    nextStrip.setAttribute('aria-hidden', 'false');
    currentStrip += 1;

    if (currentStrip >= strips.length && slotButton) {
        slotButton.textContent = '✦ COMPLETE ✦';
        slotButton.disabled = true;
        slotButton.classList.add('done');
    }
}

if (moneyRibbon) {
    moneyRibbon.addEventListener('click', revealNextStrip);
}

// ── Music control ─────────────────────────────────────────────────────────────
function playMusic() {
    birthdayMusic.volume = 0.75;
    birthdayMusic.play().then(() => {
        musicPlaying = true;
        musicIcon.textContent = '♪';
    }).catch(() => {
        // Autoplay blocked — button still works on user gesture
    });
}

musicBtn.addEventListener('click', () => {
    if (musicPlaying) {
        birthdayMusic.pause();
        musicPlaying = false;
        musicIcon.textContent = '⏸';
        musicBtn.style.opacity = '0.5';
    } else {
        birthdayMusic.play().then(() => {
            musicPlaying = true;
            musicIcon.textContent = '♪';
            musicBtn.style.opacity = '';
        }).catch(() => {});
    }
});

// ── Init ──────────────────────────────────────────────────────────────────────
window.addEventListener('load', () => {
    spawnEnvParticles();
});
