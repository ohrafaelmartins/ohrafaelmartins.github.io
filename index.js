document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    initScrollAnimations();
    initCTATracking();
    initUrgencyUpdates();
});



function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.benefit-card, .comparison-item, .preview-item');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

function initCTATracking() {
    const ctaButtons = document.querySelectorAll('.cta-button, .final-cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'begin_checkout', {
                    event_category: 'Ecommerce',
                    event_label: buttonText,
                    value: 49.00,
                    currency: 'BRL'
                });
            }
            
            if (typeof fbq !== 'undefined') {
                fbq('track', 'InitiateCheckout', {
                    value: 49.00,
                    currency: 'BRL',
                    content_name: 'Guia Atacama e Norte da Argentina',
                    content_category: 'ebook'
                });
            }
                
            console.log('CTA clicked - Redirecting to Hotmart:', buttonText);
        });
    });
}

function initUrgencyUpdates() {
    const urgencyElements = document.querySelectorAll('.proof-item strong');
    
    function updateUrgencyNumbers() {
        urgencyElements.forEach(element => {
            if (element.textContent.includes('847+')) {
                const currentNumber = parseInt(element.textContent.match(/\d+/)[0]);
                const newNumber = currentNumber + Math.floor(Math.random() * 3) + 1;
                element.innerHTML = element.innerHTML.replace(/\d+/, newNumber);
            }
        });
    }
    
    setInterval(updateUrgencyNumbers, 120000);
}

function trackCTAClick(buttonText) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'begin_checkout', {
            event_category: 'Ecommerce',
            event_label: buttonText,
            value: 49.00,
            currency: 'BRL'
        });
    }
    
    if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout', {
            value: 49.00,
            currency: 'BRL',
            content_name: 'Guia Atacama e Norte da Argentina',
            content_category: 'ebook'
        });
    }
    
    console.log('CTA clicked - Redirecting to Hotmart:', buttonText);
}



function addToCart() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'add_to_cart', {
            event_category: 'Ecommerce',
            value: 49.00,
            currency: 'BRL',
            items: [{
                item_id: 'guia_atacama_argentina',
                item_name: 'Guia Atacama e Norte da Argentina',
                category: 'ebook',
                price: 49.00,
                quantity: 1
            }]
        });
    }
    
    if (typeof fbq !== 'undefined') {
        fbq('track', 'AddToCart', {
            value: 49.00,
            currency: 'BRL',
            content_name: 'Guia Atacama e Norte da Argentina',
            content_category: 'ebook'
        });
    }
}

document.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercent > 25 && !sessionStorage.getItem('viewed_25')) {
        sessionStorage.setItem('viewed_25', 'true');
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
                event_category: 'User Engagement',
                event_label: '25% page viewed',
                value: 25
            });
        }
        if (typeof fbq !== 'undefined') {
            fbq('track', 'ViewContent', {
                content_name: '25% Page Viewed',
                content_category: 'User Engagement'
            });
        }
    }
    
    if (scrollPercent > 50 && !sessionStorage.getItem('viewed_50')) {
        sessionStorage.setItem('viewed_50', 'true');
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
                event_category: 'User Engagement',
                event_label: '50% page viewed',
                value: 50
            });
        }
    }
    
    if (scrollPercent > 75 && !sessionStorage.getItem('viewed_75')) {
        sessionStorage.setItem('viewed_75', 'true');
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
                event_category: 'User Engagement',
                event_label: '75% page viewed',
                value: 75
            });
        }
    }
});

window.addEventListener('beforeunload', function(e) {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercent > 30 && !sessionStorage.getItem('exit_intent_shown')) {
        e.preventDefault();
        e.returnValue = 'Espere! Você tem certeza que quer sair?\n\nSua aventura pelo Atacama está a apenas um clique de distância. Não perca esta oportunidade única de economizar 50%!';
        sessionStorage.setItem('exit_intent_shown', 'true');
        return e.returnValue;
    }
});

function createExitIntentPopup() {
    let exitIntentTriggered = false;
    
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentTriggered && !sessionStorage.getItem('exit_intent_popup_shown')) {
            exitIntentTriggered = true;
            sessionStorage.setItem('exit_intent_popup_shown', 'true');
            
            const popup = document.createElement('div');
            popup.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;" id="exit-popup">
                    <div style="background: white; padding: 40px; border-radius: 20px; max-width: 500px; text-align: center; position: relative;">
                        <button onclick="document.getElementById('exit-popup').remove()" style="position: absolute; top: 15px; right: 20px; background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
                        <h2 style="color: #ff4757; margin-bottom: 20px;">🔥 ÚLTIMA CHANCE!</h2>
                        <p style="font-size: 18px; margin-bottom: 20px; color: #333;">Não perca esta oferta exclusiva!</p>
                        <p style="font-size: 16px; margin-bottom: 30px; color: #666;">50% de desconto válido apenas HOJE</p>
                        <a href="https://pay.hotmart.com/A93381925H?off=r9v0vdc4" target="_blank" onclick="trackCTAClick('GARANTIR DESCONTO AGORA - Exit Intent'); document.getElementById('exit-popup').remove();" style="background: linear-gradient(45deg, #ff6b35, #f7931e); color: white; padding: 15px 30px; border: none; border-radius: 25px; font-size: 16px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-block;">GARANTIR DESCONTO AGORA</a>
                    </div>
                </div>
            `;
            document.body.appendChild(popup);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exit_intent', {
                    event_category: 'User Behavior',
                    value: 1
                });
            }
        }
    });
}

setTimeout(createExitIntentPopup, 3000);

function initStickyButton() {
    const stickyButton = document.createElement('div');
    stickyButton.innerHTML = `
        <a href="https://pay.hotmart.com/A93381925H?off=r9v0vdc4" target="_blank" onclick="trackCTAClick('GARANTIR OFERTA - Sticky')" style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff6b35, #f7931e);
            color: white;
            padding: 15px 25px;
            border: none;
            border-radius: 50px;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 5px 20px rgba(255, 107, 53, 0.4);
            z-index: 1000;
            transition: all 0.3s ease;
            display: none;
            text-decoration: none;
            text-align: center;
        " id="sticky-cta">
            GARANTIR OFERTA 🔥
        </a>
    `;
    document.body.appendChild(stickyButton);
    
    const stickyBtn = document.getElementById('sticky-cta');
    
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 20 && scrollPercent < 90) {
            stickyBtn.style.display = 'block';
        } else {
            stickyBtn.style.display = 'none';
        }
    });
    
    stickyBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    stickyBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

setTimeout(initStickyButton, 2000);

function initVideoModalIfExists() {
    const videoTriggers = document.querySelectorAll('[data-video]');
    
    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            
            const modal = document.createElement('div');
            modal.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center;" id="video-modal">
                    <div style="position: relative; width: 90%; max-width: 800px;">
                        <button onclick="document.getElementById('video-modal').remove()" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 30px; cursor: pointer;">&times;</button>
                        <iframe width="100%" height="450" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'video_play', {
                    event_category: 'Video',
                    event_label: videoId,
                    value: 1
                });
            }
        });
    });
}

initVideoModalIfExists();

function trackFormInteractions() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_start', {
                    event_category: 'Form',
                    event_label: 'Email input focused'
                });
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.value && this.value.includes('@')) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        event_category: 'Form',
                        event_label: 'Valid email entered'
                    });
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    initScrollAnimations();
    initCTATracking();
    initUrgencyUpdates();
    trackFormInteractions();
    
    console.log('Landing Page initialized successfully');
});

if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
        page_title: 'Guia Atacama Landing Page',
        page_location: window.location.href
    });
}

if (typeof fbq !== 'undefined') {
    fbq('track', 'ViewContent', {
        content_name: 'Guia Atacama Landing Page',
        content_category: 'ebook'
    });
}
