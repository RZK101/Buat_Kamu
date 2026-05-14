// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const cakeBtn = document.getElementById('cake-btn');
const blowBtn = document.getElementById('blow-btn');
const restartBtn = document.getElementById('restart-btn');
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');

// Sections
const heroSection = document.querySelector('.hero');
const messageSection = document.getElementById('message-section');
const gallerySection = document.getElementById('gallery-section');
const cakeSection = document.getElementById('cake-section');
const wishesSection = document.getElementById('wishes-section');

// Set canvas size
function setCanvasSize() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// Confetti particles
let confettiParticles = [];
let animationId = null;

class ConfettiParticle {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > confettiCanvas.height) {
            this.y = -10;
            this.x = Math.random() * confettiCanvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function createConfetti(amount = 150) {
    confettiParticles = [];
    for (let i = 0; i < amount; i++) {
        confettiParticles.push(new ConfettiParticle());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    animationId = requestAnimationFrame(animateConfetti);
}

function stopConfetti() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

// Loading screen click handler
loadingScreen.addEventListener('click', () => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        createConfetti(150);
        animateConfetti();
    }, 800);
});

// Navigation between sections
function showSection(section) {
    heroSection.classList.add('hidden');
    messageSection.classList.add('hidden');
    gallerySection.classList.add('hidden');
    cakeSection.classList.add('hidden');
    wishesSection.classList.add('hidden');
    
    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth' });
}

startBtn.addEventListener('click', () => {
    showSection(messageSection);
    createConfetti(100);
    animateConfetti();
});

nextBtn.addEventListener('click', () => {
    showSection(gallerySection);
    createConfetti(100);
    animateConfetti();
});

cakeBtn.addEventListener('click', () => {
    showSection(cakeSection);
});

// Blow candle functionality
blowBtn.addEventListener('click', () => {
    const flame = document.querySelector('.flame');
    flame.classList.add('out');
    
    // Create explosion of confetti
    createConfetti(300);
    animateConfetti();
    
    // Show wishes after 2 seconds
    setTimeout(() => {
        showSection(wishesSection);
    }, 2000);
});

// Restart button
restartBtn.addEventListener('click', () => {
    const flame = document.querySelector('.flame');
    flame.classList.remove('out');
    stopConfetti();
    showSection(heroSection);
});

// Add floating hearts animation on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const heart = document.createElement('div');
        heart.innerHTML = ['💕', '💖', '💗', '💓', '💞'][Math.floor(Math.random() * 5)];
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = 'floatHeart 2s ease-out forwards';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
});

// Add keyframes for floating hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes floatHeart {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(1.5);
        }
    }
`;
document.head.appendChild(style);

// Add background music (optional - uncomment to use)
/*
const audio = new Audio('path-to-your-music.mp3');
audio.loop = true;
loadingScreen.addEventListener('click', () => {
    audio.play().catch(e => console.log('Audio play failed:', e));
});
*/

// Add typing effect for the letter
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize when message section is shown
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (!messageSection.classList.contains('hidden')) {
            const messageContent = document.querySelector('.message-content');
            // You can add typing effect here if desired
        }
    });
});

observer.observe(messageSection, { attributes: true, attributeFilter: ['class'] });

console.log('🎉 Website ucapan ulang tahun siap digunakan!');
console.log('💡 Tips: Ganti foto dan teks dengan pesan personal kamu untuk membuatnya lebih spesial!');
