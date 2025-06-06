/**
 * WynnWar Token Website JavaScript
 * Animations and interactivity for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Prevent scrolling when menu is open
            body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contract Address Copy Functionality
    const copyButton = document.getElementById('copy-address');
    const contractAddress = document.getElementById('contract-address');
    const copyNotification = document.getElementById('copy-notification');
    
    if (copyButton && contractAddress) {
        copyButton.addEventListener('click', () => {
            const textArea = document.createElement('textarea');
            textArea.value = contractAddress.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            copyNotification.style.display = 'block';
            
            setTimeout(() => {
                copyNotification.style.display = 'none';
            }, 2000);
        });
    }

    // Animated Counter
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    };
    
    // Intersection Observer for counter animation
    const counterSection = document.querySelector('.community-counter');
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counterSection);
    }

    // Market Manipulation Chart
    const ctx = document.getElementById('manipulationChart');
    if (ctx) {
        const manipulationChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Market Price',
                        data: [10, 12, 11, 14, 22, 18, 20, 24, 16, 14, 18, 24],
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Whale Manipulation',
                        data: [null, null, null, null, null, 22, 15, null, null, null, null, null],
                        borderColor: '#e63946',
                        backgroundColor: 'rgba(230, 57, 70, 0.3)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        pointRadius: 6,
                        pointBackgroundColor: '#e63946'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#f1faee'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += '$' + context.parsed.y;
                                }
                                if (context.dataset.label === 'Whale Manipulation' && context.parsed.y !== null) {
                                    label += ' - Liquidation Event';
                                }
                                return label;
                            }
                        }
                    },
                    annotation: {
                        annotations: {
                            line1: {
                                type: 'line',
                                yMin: 22,
                                yMax: 22,
                                xMin: 5,
                                xMax: 6,
                                borderColor: '#e63946',
                                borderWidth: 2,
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a8b2d1'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a8b2d1'
                        }
                    }
                }
            }
        });
    }

    // Parallax Effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Hero section parallax
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
        
        // Animate elements on scroll
        const animateOnScroll = document.querySelectorAll('.fade-in');
        animateOnScroll.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (elementPosition < screenHeight - 100) {
                element.classList.add('active');
            }
        });
    });

    // Add fade-in class to elements
    const addFadeInClass = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionHeader = section.querySelector('.section-header');
            if (sectionHeader) {
                sectionHeader.classList.add('fade-in');
            }
            
            const contentElements = section.querySelectorAll('.about-content, .token-content, .battle-container, .community-content, .roadmap-container');
            contentElements.forEach(element => {
                element.classList.add('fade-in');
            });
        });
    };
    
    addFadeInClass();

    // Additional whale animations
    const addWhaleAnimations = () => {
        // Create additional whale elements dynamically
        const floatingWhales = document.querySelector('.floating-whales');
        if (floatingWhales) {
            // Add more whales with random positions and animations
            for (let i = 0; i < 3; i++) {
                const whaleIndex = Math.floor(Math.random() * 4) + 1;
                const whale = document.createElement('img');
                whale.src = `images/whale${whaleIndex}.jpg`;
                whale.alt = 'Crypto Whale';
                whale.classList.add('whale', `whale-extra-${i}`);
                
                // Random positioning and animation
                const topPosition = Math.random() * 80 + 10; // 10% to 90%
                const delay = Math.random() * 20; // 0 to 20s delay
                const duration = Math.random() * 20 + 30; // 30 to 50s duration
                const size = Math.random() * 100 + 100; // 100px to 200px
                
                whale.style.top = `${topPosition}%`;
                whale.style.width = `${size}px`;
                whale.style.opacity = '0.2';
                whale.style.zIndex = '1';
                whale.style.position = 'absolute';
                
                // Direction alternates based on index
                if (i % 2 === 0) {
                    whale.style.left = '-200px';
                    whale.style.animation = `floatWhaleRight ${duration}s linear ${delay}s infinite`;
                } else {
                    whale.style.right = '-200px';
                    whale.style.animation = `floatWhaleLeft ${duration}s linear ${delay}s infinite`;
                }
                
                floatingWhales.appendChild(whale);
            }
            
            // Add animation keyframes to the document
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes floatWhaleRight {
                    0% {
                        transform: translateX(0) translateY(0);
                    }
                    50% {
                        transform: translateX(calc(100vw + 400px)) translateY(30px);
                    }
                    100% {
                        transform: translateX(calc(200vw + 400px)) translateY(0);
                    }
                }
                
                @keyframes floatWhaleLeft {
                    0% {
                        transform: translateX(0) translateY(0);
                    }
                    50% {
                        transform: translateX(calc(-100vw - 400px)) translateY(-30px);
                    }
                    100% {
                        transform: translateX(calc(-200vw - 400px)) translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    addWhaleAnimations();

    // Add glowing effect to contract address
    const addGlowingEffect = () => {
        const addressContainer = document.querySelector('.address-container');
        if (addressContainer) {
            setInterval(() => {
                addressContainer.classList.add('glow');
                setTimeout(() => {
                    addressContainer.classList.remove('glow');
                }, 1000);
            }, 5000);
        }
    };
    
    // Add CSS for glowing effect
    const addGlowingCSS = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            .glow {
                box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color);
            }
        `;
        document.head.appendChild(style);
    };
    
    addGlowingCSS();
    addGlowingEffect();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(10, 14, 23, 0.95)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(10, 14, 23, 0.9)';
        }
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const addRippleCSS = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            .btn-primary, .btn-secondary {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    addRippleCSS();

    // Add fade-in animation CSS
    const addFadeInCSS = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            .fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .fade-in.active {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    };
    
    addFadeInCSS();

    // Initialize fade-in elements
    const initFadeIn = () => {
        const fadeElements = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    };
    
    initFadeIn();
});

