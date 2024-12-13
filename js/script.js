const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});


const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});


const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .about-card').forEach(element => {
    observer.observe(element);
});


const typingText = document.querySelector('.typing-text');
const text = typingText.textContent;
typingText.textContent = '';

let charIndex = 0;
function typeText() {
    if (charIndex < text.length) {
        typingText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 50);
    }
}


const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        setTimeout(typeText, 1000);
    }
});

heroObserver.observe(document.querySelector('.hero'));


const membersCount = document.querySelector('.members-count span');
const targetCount = 250;
let currentCount = 0;
const duration = 2000;
const updateInterval = 25; 

function animateCounter() {
    const increment = (targetCount / (duration / updateInterval));
    
    const updateCount = () => {
        currentCount = Math.min(currentCount + increment, targetCount);
        membersCount.textContent = Math.floor(currentCount) + '+ membres';
        
        if (currentCount < targetCount) {
            requestAnimationFrame(updateCount);
        }
    };

    updateCount();
}


const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateCounter();
    }
});

counterObserver.observe(membersCount);


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
