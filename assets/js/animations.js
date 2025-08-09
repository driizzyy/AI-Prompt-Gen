// ===== ADVANCED ANIMATIONS AND VISUAL EFFECTS =====

class AnimationController {
    constructor() {
        this.init();
        this.setupAdvancedAnimations();
        this.setupInteractiveEffects();
    }

    init() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.setupRippleEffect();
        this.setupParallaxEffect();
        this.setupMouseTracker();
    }

    setupAdvancedAnimations() {
        if (this.isReducedMotion) return;

        this.setupTypingAnimation();
        this.setupMorphingShapes();
        this.setupFloatingElements();
        this.setupGradientAnimation();
    }

    setupRippleEffect() {
        const rippleElements = document.querySelectorAll('.generate-btn, .action-btn, .about-link');
        
        rippleElements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (this.isReducedMotion) return;
                
                const ripple = document.createElement('span');
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    setupParallaxEffect() {
        if (this.isReducedMotion) return;

        const parallaxElements = document.querySelectorAll('.orb');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach((element, index) => {
                const speed = (index + 1) * 0.2;
                element.style.transform = `translate3d(0, ${rate * speed}px, 0)`;
            });
        });
    }

    setupMouseTracker() {
        if (this.isReducedMotion) return;

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('button, a, input, textarea, select');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }

    setupTypingAnimation() {
        const typingElements = document.querySelectorAll('.typewriter-text');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid var(--primary-color)';
            
            let i = 0;
            const typeSpeed = 50;
            
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, typeSpeed);
                } else {
                    // Blinking cursor effect
                    setInterval(() => {
                        element.style.borderRightColor = 
                            element.style.borderRightColor === 'transparent' 
                                ? 'var(--primary-color)' 
                                : 'transparent';
                    }, 500);
                }
            };
            
            // Start typing when element comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeWriter, 500);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    setupMorphingShapes() {
        if (this.isReducedMotion) return;

        const morphingShapes = document.querySelectorAll('.morph-shape');
        
        morphingShapes.forEach(shape => {
            let morphState = 0;
            
            const morphAnimation = () => {
                morphState += 0.02;
                const x = Math.sin(morphState) * 20;
                const y = Math.cos(morphState * 1.5) * 15;
                const scale = 1 + Math.sin(morphState * 2) * 0.1;
                
                shape.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
                
                requestAnimationFrame(morphAnimation);
            };
            
            morphAnimation();
        });
    }

    setupFloatingElements() {
        if (this.isReducedMotion) return;

        const floatingElements = document.querySelectorAll('.float-element');
        
        floatingElements.forEach((element, index) => {
            let floatState = index * 0.5; // Offset for staggered animation
            
            const floatAnimation = () => {
                floatState += 0.01;
                const y = Math.sin(floatState) * 10;
                const rotation = Math.sin(floatState * 0.5) * 5;
                
                element.style.transform = `translateY(${y}px) rotate(${rotation}deg)`;
                
                requestAnimationFrame(floatAnimation);
            };
            
            floatAnimation();
        });
    }

    setupGradientAnimation() {
        if (this.isReducedMotion) return;

        const gradientElements = document.querySelectorAll('.animated-gradient');
        
        gradientElements.forEach(element => {
            let gradientState = 0;
            
            const animateGradient = () => {
                gradientState += 0.005;
                const hue1 = (gradientState * 60) % 360;
                const hue2 = (gradientState * 60 + 120) % 360;
                const hue3 = (gradientState * 60 + 240) % 360;
                
                element.style.background = `linear-gradient(45deg, 
                    hsl(${hue1}, 70%, 60%), 
                    hsl(${hue2}, 70%, 60%), 
                    hsl(${hue3}, 70%, 60%)
                )`;
                
                requestAnimationFrame(animateGradient);
            };
            
            animateGradient();
        });
    }

    setupInteractiveEffects() {
        this.setupHoverEffects();
        this.setupClickEffects();
        this.setupScrollEffects();
    }

    setupHoverEffects() {
        const hoverElements = document.querySelectorAll('.hover-effect');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                if (this.isReducedMotion) return;
                
                element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                element.style.transform = 'translateY(-5px) scale(1.02)';
                
                // Add glow effect
                element.style.boxShadow = '0 10px 40px rgba(99, 102, 241, 0.3)';
            });
            
            element.addEventListener('mouseleave', (e) => {
                element.style.transform = 'translateY(0) scale(1)';
                element.style.boxShadow = '';
            });
        });
    }

    setupClickEffects() {
        const clickElements = document.querySelectorAll('.click-effect');
        
        clickElements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (this.isReducedMotion) return;
                
                // Scale down effect
                element.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
                
                // Create particle burst
                this.createParticleBurst(e.clientX, e.clientY);
            });
        });
    }

    createParticleBurst(x, y) {
        const particleCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'burst-particle';
            
            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = 100 + Math.random() * 50;
            const size = 4 + Math.random() * 4;
            
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            document.body.appendChild(particle);
            
            // Animate particle
            const animateParticle = (startTime) => {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / 1000; // 1 second animation
                
                if (progress < 1) {
                    const currentX = x + Math.cos(angle) * velocity * progress;
                    const currentY = y + Math.sin(angle) * velocity * progress + (progress * progress * 200); // Gravity
                    const opacity = 1 - progress;
                    
                    particle.style.left = currentX + 'px';
                    particle.style.top = currentY + 'px';
                    particle.style.opacity = opacity;
                    
                    requestAnimationFrame(() => animateParticle(startTime));
                } else {
                    particle.remove();
                }
            };
            
            requestAnimationFrame(() => animateParticle(Date.now()));
        }
    }

    setupScrollEffects() {
        if (this.isReducedMotion) return;

        const scrollElements = document.querySelectorAll('.scroll-animate');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-in-view');
                    
                    // Stagger animation for child elements
                    const children = entry.target.querySelectorAll('.stagger-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        scrollElements.forEach(element => {
            scrollObserver.observe(element);
        });
    }

    // Performance monitoring
    setupPerformanceMonitoring() {
        let lastTime = performance.now();
        let frameCount = 0;
        
        const checkPerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // If FPS drops below 30, reduce animations
                if (fps < 30) {
                    document.body.classList.add('reduce-animations');
                } else {
                    document.body.classList.remove('reduce-animations');
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkPerformance);
        };
        
        requestAnimationFrame(checkPerformance);
    }

    // Utility methods
    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    addGlitchEffect(element, duration = 500) {
        if (this.isReducedMotion) return;
        
        element.classList.add('glitch-effect');
        
        setTimeout(() => {
            element.classList.remove('glitch-effect');
        }, duration);
    }

    // Breathing animation for elements
    addBreathingAnimation(element) {
        if (this.isReducedMotion) return;
        
        let breathState = 0;
        
        const breathe = () => {
            breathState += 0.02;
            const scale = 1 + Math.sin(breathState) * 0.05;
            element.style.transform = `scale(${scale})`;
            requestAnimationFrame(breathe);
        };
        
        breathe();
    }
}

// CSS for custom cursor and effects (injected dynamically)
const injectAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(99, 102, 241, 0.2) 70%, transparent 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        }
        
        .custom-cursor.cursor-hover {
            transform: scale(1.5);
            background: radial-gradient(circle, rgba(99, 102, 241, 1) 0%, rgba(99, 102, 241, 0.4) 70%, transparent 100%);
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .burst-particle {
            animation: particle-fade 1s ease-out forwards;
        }
        
        @keyframes particle-fade {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0);
            }
        }
        
        .sparkle {
            position: fixed;
            width: 6px;
            height: 6px;
            background: #fff;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkle-animation 1s ease-out forwards;
            z-index: 9999;
        }
        
        @keyframes sparkle-animation {
            0% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
        
        .glitch-effect {
            animation: glitch 0.5s ease-in-out;
        }
        
        @keyframes glitch {
            0%, 100% {
                transform: translate(0);
                filter: hue-rotate(0deg);
            }
            20% {
                transform: translate(-2px, 2px);
                filter: hue-rotate(90deg);
            }
            40% {
                transform: translate(-2px, -2px);
                filter: hue-rotate(180deg);
            }
            60% {
                transform: translate(2px, 2px);
                filter: hue-rotate(270deg);
            }
            80% {
                transform: translate(2px, -2px);
                filter: hue-rotate(360deg);
            }
        }
        
        .scroll-in-view {
            animation: scroll-reveal 0.6s ease-out forwards;
        }
        
        .stagger-child {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s ease;
        }
        
        .stagger-child.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .reduce-animations * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .custom-cursor {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(style);
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    injectAnimationStyles();
    new AnimationController();
});
