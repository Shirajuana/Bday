// Get DOM elements
const envelopeScreen = document.getElementById('envelope-screen');
const cakeScreen = document.getElementById('cake-screen');
const openBtn = document.getElementById('open-btn');
const envelope = document.querySelector('.envelope');
const countdownText = document.getElementById('countdown-text');
const flames = document.querySelectorAll('.flame');
const backgroundContainer = document.querySelector('.background-container');
const starsContainer = document.getElementById('stars-container');
const firefliesContainer = document.getElementById('fireflies-container');
const birthdayMusic = document.getElementById('birthday-music');

// Open envelope button click handler
openBtn.addEventListener('click', () => {
    // Disable button
    openBtn.disabled = true;
    openBtn.style.cursor = 'default';
    
    // Add opening animation to envelope
    envelope.classList.add('opening');
    
    // Transition to cake screen after envelope opens
    setTimeout(() => {
        envelopeScreen.classList.remove('active');
        cakeScreen.classList.add('active');
        
        // Start countdown after cake appears
        setTimeout(() => {
            startCountdown();
        }, 2000);
    }, 1500);
});

// Countdown and candle blow effect
function startCountdown() {
    const countdownValues = ['Blow your candle in', '3', '2', '1', 'Make a wish!'];
    let index = 0;
    
    countdownText.classList.add('visible');
    countdownText.textContent = countdownValues[index];
    
    const countdownInterval = setInterval(() => {
        index++;
        if (index < countdownValues.length) {
            countdownText.textContent = countdownValues[index];
        } else {
            clearInterval(countdownInterval);
            
            // Blow out candles
            setTimeout(() => {
                blowCandles();
            }, 500);
        }
    }, 1000);
}

// Blow out candles effect
function blowCandles() {
    // Hide countdown text
    countdownText.classList.remove('visible');
    
    // Animate flames disappearing
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.classList.add('blown-out');
        }, index * 150);
    });
    
    // Show magical background
    setTimeout(() => {
        showMagicalBackground();
    }, 800);
    
    // Play background music after candles fade
    setTimeout(() => {
        birthdayMusic.play().catch((error) => {
            console.log('Audio playback failed:', error);
        });
    }, 1000);
}

// Show stars and fireflies background
function showMagicalBackground() {
    backgroundContainer.classList.add('visible');
    
    // Create stars
    createStars(50);
    
    // Create fireflies
    createFireflies(15);
}

// Create stars
function createStars(count) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        star.style.animationDelay = Math.random() * 3 + 's';
        
        // Random size variation
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        starsContainer.appendChild(star);
    }
}

// Create fireflies
function createFireflies(count) {
    for (let i = 0; i < count; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        
        // Random starting position
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        firefly.style.left = startX + '%';
        firefly.style.top = startY + '%';
        
        // Random movement
        const tx = (Math.random() - 0.5) * 400;
        const ty = (Math.random() - 0.5) * 400;
        firefly.style.setProperty('--tx', tx + 'px');
        firefly.style.setProperty('--ty', ty + 'px');
        
        // Random animation delay and duration
        firefly.style.animationDelay = Math.random() * 5 + 's';
        firefly.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        // Random size variation
        const size = Math.random() * 3 + 3;
        firefly.style.width = size + 'px';
        firefly.style.height = size + 'px';
        
        firefliesContainer.appendChild(firefly);
    }
}

// Initialize - make sure envelope screen is visible on load
window.addEventListener('load', () => {
    envelopeScreen.classList.add('active');
});
