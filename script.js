// ==========================================================================
// DYNAMIC TITLE SWAPPER (5 Seconds)
// ==========================================================================
const titles = [
    "Front-End Developer",
    "Research Specialist",
    "Content Manager"
];

let currentIndex = 0;
const titleElement = document.getElementById("dynamic-title");

if (titleElement) {
    setInterval(() => {
        titleElement.style.opacity = "0";
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % titles.length;
            titleElement.textContent = titles[currentIndex];
            titleElement.style.opacity = "1";
        }, 500);
    }, 5000);
}

// ==========================================================================
// SMOOTH SCROLL NAVBAR HIGHLIGHT
// ==========================================================================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });
    
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ==========================================================================
// MOBILE MENU TOGGLE
// ==========================================================================
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinksContainer = document.querySelector(".nav-links");

if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener("click", () => {
        navLinksContainer.classList.toggle("mobile-active");
        
        // Animate hamburger menu
        const spans = mobileMenuBtn.querySelectorAll("span");
        if (navLinksContainer.classList.contains("mobile-active")) {
            spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
        } else {
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navLinksContainer.classList.remove("mobile-active");
            const spans = mobileMenuBtn.querySelectorAll("span");
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        });
    });
}

// ==========================================================================
// SCROLL REVEAL ANIMATIONS
// ==========================================================================
const revealElements = document.querySelectorAll(
    ".service-card, .project-card, .about-text-card, .about-skills-card, .stat-item"
);

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
        }
    });
};

// Add reveal class to elements
revealElements.forEach((element) => {
    element.classList.add("reveal");
});

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Trigger once on load

// ==========================================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        
        if (href !== "#" && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
        }
    });
});

// ==========================================================================
// TYPING EFFECT FOR HERO TITLE (OPTIONAL ENHANCEMENT)
// ==========================================================================
// Uncomment to enable typing effect instead of fade transition
/*
const titleWrapper = document.querySelector(".title-wrapper");
if (titleWrapper) {
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function typeEffect() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            titleElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 75;
        } else {
            titleElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        
        if (!isDeleting && charIndex === currentTitle.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before new word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    typeEffect();
}
*/

// ==========================================================================
// INTERSECTION OBSERVER FOR BETTER PERFORMANCE
// ==========================================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach((element) => {
    observer.observe(element);
});

// ==========================================================================
// CONTACT FORM VALIDATION (FUTURE ENHANCEMENT)
// ==========================================================================
// Add form validation when you implement a contact form
/*
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log("Form submitted!");
    });
}
*/
// ==========================================================================
// PERFORMANCE MONITORING (Optional)
// ==========================================================================
// Track page load performance
if (window.performance && window.performance.mark) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    });
}

// ==========================================================================
// LAZY LOADING FOR IMAGES (Performance Optimization)
// ==========================================================================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach((img) => imageObserver.observe(img));

// ==========================================================================
// PRELOADER (Optional - Add HTML element for preloader)
// ==========================================================================
// Uncomment if you add a preloader div to your HTML
/*
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});
*/

// ==========================================================================
// SERVICE WORKER REGISTRATION (For PWA - Future Enhancement)
// ==========================================================================
// Uncomment to enable offline support
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}
*/

// ==========================================================================
// ANALYTICS (Optional - Add your analytics ID)
// ==========================================================================
// Google Analytics or other tracking
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
*/

// ==========================================================================
// ERROR HANDLING
// ==========================================================================
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Send to error tracking service if needed
});

// ==========================================================================
// CONSOLE WELCOME MESSAGE
// ==========================================================================
console.log(`
╔═══════════════════════════════════════════════╗
║                                               ║
║   Welcome to Rohit Ghure's Portfolio! 🚀     ║
║                                               ║
║   Built with ❤️ using HTML, CSS & JS        ║
║                                               ║
╚═══════════════════════════════════════════════╝
`);

// ==========================================================================
// ADDITIONAL INTERACTIONS (Optional Enhancements)
// ==========================================================================

// Copy email to clipboard on click
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        const email = link.getAttribute('href').replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            // Show toast notification
            showToast('Email copied to clipboard!');
        });
    });
});

// Copy phone to clipboard on click
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        const phone = link.getAttribute('href').replace('tel:', '');
        navigator.clipboard.writeText(phone).then(() => {
            showToast('Phone number copied to clipboard!');
        });
    });
});

// Toast notification function
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--gradient-primary);
        color: white;
        padding: 14px 28px;
        border-radius: 50px;
        font-weight: 600;
        font-size: 0.9rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: toastIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes toastIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes toastOut {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
`;
document.head.appendChild(style);

// ==========================================================================
// PARALLAX EFFECT FOR HERO BACKGROUND (Optional)
// ==========================================================================
const heroBg = document.querySelector('.hero-bg-gradient');
if (heroBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < 600) {
            heroBg.style.transform = `translateX(-50%) translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ==========================================================================
// CURSOR FOLLOWER EFFECT (Optional - Adds floating cursor)
// ==========================================================================
// Uncomment to enable custom cursor effect
/*
const cursor = document.createElement('div');
cursor.className = 'cursor-follower';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(139, 92, 246, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease;
    display: none;
`;
document.body.appendChild(cursor);

if (window.matchMedia('(pointer: fine)').matches) {
    cursor.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Scale cursor on hoverable elements
    const hoverableElements = document.querySelectorAll('a, button, .service-card, .project-card');
    hoverableElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}
*/

// ==========================================================================
// TILT EFFECT FOR CARDS (Optional 3D Effect)
// ==========================================================================
const tiltCards = document.querySelectorAll('.project-card, .service-card, .about-text-card, .about-skills-card');

tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==========================================================================
// NUMBER COUNTER ANIMATION FOR STATS (Optional)
// ==========================================================================
const statNumbers = document.querySelectorAll('.stat-number');
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.textContent;
            
            // Check if it's a number
            const numMatch = text.match(/(\d+)/);
            if (numMatch && !element.classList.contains('counted')) {
                element.classList.add('counted');
                const endValue = parseInt(numMatch[1]);
                animateValue(element, 0, endValue, 2000);
            }
        }
    });
});

statNumbers.forEach((stat) => statsObserver.observe(stat));


function openModal(imgElement) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("fullImage");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// ==========================================================================
// END OF SCRIPT
// ==========================================================================