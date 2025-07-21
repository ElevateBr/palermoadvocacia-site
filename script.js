// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const header = document.querySelector('.header');

// Mobile Navigation Toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Header Background on Scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        contactForm.classList.add('loading');
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            contactForm.reset();
            
            // Track conversion
            trackConversion('contact_form_submit');
            
        } catch (error) {
            showMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            contactForm.classList.remove('loading');
        }
    });
}

// Message Display Function
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert before form
    const form = document.querySelector('.form');
    if (form) {
        form.insertBefore(messageDiv, form.firstChild);
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Conversion Tracking
function trackConversion(action) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'engagement',
            'event_label': 'palermo_advocacia'
        });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead');
    }
    
    // Custom conversion tracking
    console.log(`Conversion tracked: ${action}`);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .team-member, .contact-item');
    animateElements.forEach(el => observer.observe(el));
});

// Phone Number Click Tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        trackConversion('phone_click');
    });
});

// WhatsApp Click Tracking
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        trackConversion('whatsapp_click');
    });
});

// Service Card Click Tracking
document.querySelectorAll('.service-cta').forEach(link => {
    link.addEventListener('click', () => {
        trackConversion('service_click');
    });
});

// CTA Button Click Tracking
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackConversion('cta_click');
    });
});

// Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #1a365d, #e53e3e);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Lazy Loading for Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Form Validation Enhancement
function enhanceFormValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\D/g, ''))) {
            field.classList.add('error');
            return false;
        }
    }
    
    return true;
}

function clearFieldError(e) {
    e.target.classList.remove('error');
}

// Initialize form validation
enhanceFormValidation();

// Performance Optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Header background change
    if (window.pageYOffset > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    // Back to top button
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics and Tracking Setup
function initializeAnalytics() {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: 'Palermo Advocacia - Escritório de Advocacia Profissional',
            page_location: window.location.href
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('init', 'FB_PIXEL_ID');
        fbq('track', 'PageView');
    }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAnalytics);

// Enhanced Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You can send error reports to your analytics service here
});

// Performance Monitoring
window.addEventListener('load', () => {
    // Measure page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
    
    // Track page load performance
    if (typeof gtag !== 'undefined') {
        gtag('event', 'timing_complete', {
            name: 'load',
            value: loadTime
        });
    }
});

// Export functions for potential external use
window.PalermoAdvocacia = {
    trackConversion,
    showMessage,
    validateField
}; 

// Traduções multi-idioma
const translations = {
  pt: {
    hero_title: 'Áreas de Atuação Jurídica Especializadas',
    hero_subtitle: 'Mais de 20 anos de experiência em Direito de Família, Sucessões, Blindagem Patrimonial, Imobiliário, Contratual e Responsabilidade Civil. Atendimento personalizado e soluções jurídicas eficazes para proteger seus direitos.',
    menu_home: 'Início',
    menu_about: 'Sobre',
    menu_services: 'Áreas de Atuação',
    menu_team: 'Equipe',
    menu_contact: 'Contato',
    cta_schedule: 'Agende uma Consulta',
    cta_know_specialties: 'Conheça Nossas Especialidades',
    stat_cases: 'Casos Resolvidos',
    stat_years: 'Anos de Experiência',
    stat_success: 'Taxa de Sucesso',
    about_title: 'Sobre a Palermo Advocacia',
    about_subtitle: 'Compromisso com a excelência e resultados',
    about_mission_title: 'Nossa Missão',
    about_mission_text: 'A Palermo Advocacia nasceu da paixão pelo direito e do compromisso em oferecer soluções jurídicas eficazes e personalizadas. Com mais de 20 anos de experiência, nossa equipe de advogados especializados está dedicada a proteger seus direitos e buscar os melhores resultados para seus clientes.',
    about_values_title: 'Nossos Valores',
    about_value_ethics: 'Ética e transparência em todas as relações',
    about_value_excellence: 'Excelência técnica e profissional',
    about_value_personalized: 'Atendimento personalizado e humanizado',
    about_value_results: 'Compromisso com resultados',
    about_value_innovation: 'Inovação e atualização constante',
    services_title: 'Áreas de Atuação',
    services_subtitle: 'Especialidades jurídicas para atender suas necessidades',
    service_family_title: 'Direito de Família',
    service_family_desc: 'Soluções ágeis e humanizadas para divórcios, guarda, pensão alimentícia, visitas, união estável, partilhas e pactos antenupciais. Proteja seus direitos e garanta segurança para sua família.',
    service_family_divorce: 'Divórcios',
    service_family_guard: 'Guarda e alimentos',
    service_family_visits: 'Visitas',
    service_family_union: 'União estável',
    service_family_sharing: 'Partilhas',
    service_family_pact: 'Pactos antenupciais',
    service_succession_title: 'Direito das Sucessões',
    service_succession_desc: 'Atendimento completo em inventários, testamentos, planejamento sucessório e disputas hereditárias. Traga tranquilidade e segurança para o futuro da sua família.',
    service_succession_inventory: 'Inventários',
    service_succession_testament: 'Testamentos',
    service_succession_planning: 'Planejamento sucessório',
    service_succession_disputes: 'Disputas hereditárias',
    service_protection_title: 'Blindagem Patrimonial',
    service_protection_desc: 'Estruture seu patrimônio de forma segura e estratégica. Criamos soluções jurídicas para proteger bens pessoais e empresariais contra riscos e imprevistos.',
    service_protection_structures: 'Estruturas jurídicas protetivas',
    service_protection_personal: 'Blindagem de bens pessoais',
    service_protection_business: 'Blindagem de bens empresariais',
    service_realestate_title: 'Direito Imobiliário',
    service_realestate_desc: 'Assessoria completa em compra e venda de imóveis, regularização, usucapião, contratos de locação, ações possessórias e questões condominiais. Segurança e agilidade em todas as etapas.',
    service_realestate_buy: 'Compra e venda de imóveis',
    service_realestate_regularization: 'Regularização registral',
    service_realestate_usucapion: 'Usucapião',
    service_realestate_rent: 'Contratos de locação',
    service_realestate_possessory: 'Ações possessórias',
    service_realestate_condo: 'Questões condominiais',
    service_contract_title: 'Direito Contratual',
    service_contract_desc: 'Elaboração, revisão e análise de contratos civis e empresariais, garantindo segurança jurídica e prevenindo litígios. Conte com especialistas para proteger seus interesses.',
    service_contract_civil: 'Contratos civis',
    service_contract_business: 'Contratos empresariais',
    service_contract_review: 'Revisão e análise contratual',
    service_contract_safety: 'Segurança jurídica',
    service_liability_title: 'Responsabilidade Civil',
    service_liability_desc: 'Atuação estratégica em casos de indenização por danos materiais e morais, em relações familiares, contratuais, de consumo, acidentes e outras situações. Busque sua reparação com quem entende do assunto.',
    service_liability_material: 'Indenização por danos materiais',
    service_liability_moral: 'Indenização por danos morais',
    service_liability_family: 'Relações familiares e contratuais',
    service_liability_accidents: 'Acidentes e consumo',
    team_title: 'Nossa Equipe',
    team_subtitle: 'Advogados especializados e experientes',
    team_camila_title: 'Sócia Fundadora',
    team_camila_specialty: 'Direito Civil e Empresarial',
    team_camila_desc: 'Especialista em direito civil e empresarial com mais de 20 anos de experiência. Formada pela Universidade de São Paulo e pós-graduada em Direito Empresarial. Comprometida em oferecer soluções jurídicas eficazes e personalizadas.',
    team_daniel_title: 'Sócio',
    team_daniel_specialty: 'Direito Trabalhista e Civil',
    team_daniel_desc: 'Especialista em direito trabalhista e civil com vasta experiência em defesa dos direitos. Mestrado em Direito do Trabalho e pós-graduado em Direito Civil.',
    cta_title: 'Precisa de Ajuda Jurídica?',
    cta_desc: 'Nossa equipe de advogados especializados está pronta para defender seus direitos e oferecer as melhores soluções jurídicas para seu caso.',
    cta_schedule2: 'Agende sua Consulta',
    contact_title: 'Entre em Contato',
    contact_subtitle: 'Agende sua consulta e tire suas dúvidas com nossos especialistas',
    contact_address_title: 'Endereço',
    contact_address: 'Rua Vinte e Nove de Setembro, 53, 2 andar, Campos Elíseos Resende RJ',
    contact_phone_title: 'Telefone / WhatsApp',
    contact_email_title: 'E-mail',
    contact_email: 'escritorio@palermoadvocacia.adv.br',
    contact_hours_title: 'Horário de Atendimento',
    contact_hours: 'Segunda a Sexta: 8h às 18h',
    footer_areas_title: 'Áreas de Atuação',
    footer_areas_business: 'Direito Empresarial',
    footer_areas_labor: 'Direito Trabalhista',
    footer_areas_civil: 'Direito Civil',
    footer_areas_realestate: 'Direito Imobiliário',
    footer_links_title: 'Links Úteis',
    footer_links_about: 'Sobre Nós',
    footer_links_team: 'Nossa Equipe',
    footer_links_contact: 'Contato',
    footer_links_privacy: 'Política de Privacidade',
    footer_contact_title: 'Contato',
    footer_contact_address: 'Rua Vinte e Nove de Setembro, 53, 2 andar, Campos Elíseos Resende RJ',
    footer_contact_phone: '+55 24 99265-5618',
    footer_contact_email: 'escritorio@palermoadvocacia.adv.br',
    footer_rights: '© 2024 Palermo Advocacia. Todos os direitos reservados.',
    footer_oab: 'OAB/SP 123.456'
  },
  en: {
    hero_title: 'Specialized Legal Practice Areas',
    hero_subtitle: 'Over 20 years of experience in Family Law, Succession, Asset Protection, Real Estate, Contract, and Civil Liability. Personalized service and effective legal solutions to protect your rights.',
    menu_home: 'Home',
    menu_about: 'About',
    menu_services: 'Practice Areas',
    menu_team: 'Team',
    menu_contact: 'Contact',
    cta_schedule: 'Book a Consultation',
    cta_know_specialties: 'See Our Specialties',
    stat_cases: 'Cases Resolved',
    stat_years: 'Years of Experience',
    stat_success: 'Success Rate',
    about_title: 'About Palermo Law Firm',
    about_subtitle: 'Commitment to excellence and results',
    about_mission_title: 'Our Mission',
    about_mission_text: 'Palermo Law Firm was born from a passion for law and a commitment to providing effective and personalized legal solutions. With over 20 years of experience, our team of specialized lawyers is dedicated to protecting your rights and achieving the best results for our clients.',
    about_values_title: 'Our Values',
    about_value_ethics: 'Ethics and transparency in all relationships',
    about_value_excellence: 'Technical and professional excellence',
    about_value_personalized: 'Personalized and humanized service',
    about_value_results: 'Commitment to results',
    about_value_innovation: 'Innovation and continuous improvement',
    services_title: 'Practice Areas',
    services_subtitle: 'Legal specialties to meet your needs',
    service_family_title: 'Family Law',
    service_family_desc: 'Agile and humanized solutions for divorces, custody, alimony, visitation, stable unions, asset division, and prenuptial agreements. Protect your rights and ensure your family’s security.',
    service_family_divorce: 'Divorces',
    service_family_guard: 'Custody and alimony',
    service_family_visits: 'Visitation',
    service_family_union: 'Stable union',
    service_family_sharing: 'Asset division',
    service_family_pact: 'Prenuptial agreements',
    service_succession_title: 'Succession Law',
    service_succession_desc: 'Comprehensive assistance in probate, wills, succession planning, and inheritance disputes. Bring peace of mind and security to your family’s future.',
    service_succession_inventory: 'Probate',
    service_succession_testament: 'Wills',
    service_succession_planning: 'Succession planning',
    service_succession_disputes: 'Inheritance disputes',
    service_protection_title: 'Asset Protection',
    service_protection_desc: 'Structure your assets securely and strategically. We create legal solutions to protect personal and business assets from risks and unforeseen events.',
    service_protection_structures: 'Protective legal structures',
    service_protection_personal: 'Personal asset protection',
    service_protection_business: 'Business asset protection',
    service_realestate_title: 'Real Estate Law',
    service_realestate_desc: 'Comprehensive assistance in real estate purchase and sale, regularization, adverse possession, lease agreements, possessory actions, and condominium matters. Security and agility at every stage.',
    service_realestate_buy: 'Purchase and sale of real estate',
    service_realestate_regularization: 'Registry regularization',
    service_realestate_usucapion: 'Adverse possession',
    service_realestate_rent: 'Lease agreements',
    service_realestate_possessory: 'Possessory actions',
    service_realestate_condo: 'Condominium matters',
    service_contract_title: 'Contract Law',
    service_contract_desc: 'Drafting, reviewing, and analyzing civil and business contracts, ensuring legal security and preventing disputes. Rely on specialists to protect your interests.',
    service_contract_civil: 'Civil contracts',
    service_contract_business: 'Business contracts',
    service_contract_review: 'Contract review and analysis',
    service_contract_safety: 'Legal security',
    service_liability_title: 'Civil Liability',
    service_liability_desc: 'Strategic action in cases of compensation for material and moral damages, in family, contractual, consumer, accident, and other situations. Seek your compensation with those who understand the subject.',
    service_liability_material: 'Compensation for material damages',
    service_liability_moral: 'Compensation for moral damages',
    service_liability_family: 'Family and contractual relations',
    service_liability_accidents: 'Accidents and consumer',
    team_title: 'Our Team',
    team_subtitle: 'Specialized and experienced lawyers',
    team_camila_title: 'Founding Partner',
    team_camila_specialty: 'Civil and Business Law',
    team_camila_desc: 'Specialist in civil and business law with over 20 years of experience. Graduated from the University of São Paulo and post-graduated in Business Law. Committed to providing effective and personalized legal solutions.',
    team_daniel_title: 'Partner',
    team_daniel_specialty: 'Labor and Civil Law',
    team_daniel_desc: 'Specialist in labor and civil law with extensive experience in defending rights. Master’s in Labor Law and post-graduate in Civil Law.',
    cta_title: 'Need Legal Help?',
    cta_desc: 'Our team of specialized lawyers is ready to defend your rights and offer the best legal solutions for your case.',
    cta_schedule2: 'Book Your Consultation',
    contact_title: 'Contact Us',
    contact_subtitle: 'Schedule your consultation and clear your doubts with our specialists',
    contact_address_title: 'Address',
    contact_address: 'Rua Vinte e Nove de Setembro, 53, 2 andar, Campos Elíseos Resende RJ',
    contact_phone_title: 'Phone / WhatsApp',
    contact_email_title: 'Email',
    contact_email: 'escritorio@palermoadvocacia.adv.br',
    contact_hours_title: 'Business Hours',
    contact_hours: 'Monday to Friday: 8am to 6pm',
    footer_areas_title: 'Practice Areas',
    footer_areas_business: 'Business Law',
    footer_areas_labor: 'Labor Law',
    footer_areas_civil: 'Civil Law',
    footer_areas_realestate: 'Real Estate Law',
    footer_links_title: 'Useful Links',
    footer_links_about: 'About Us',
    footer_links_team: 'Our Team',
    footer_links_contact: 'Contact',
    footer_links_privacy: 'Privacy Policy',
    footer_contact_title: 'Contact',
    footer_contact_address: 'Rua Vinte e Nove de Setembro, 53, 2 andar, Campos Elíseos Resende RJ',
    footer_contact_phone: '+55 24 99265-5618',
    footer_contact_email: 'escritorio@palermoadvocacia.adv.br',
    footer_rights: '© 2024 Palermo Law Firm. All rights reserved.',
    footer_oab: 'OAB/SP 123.456'
  },
  es: {
    hero_title: 'Áreas Jurídicas Especializadas',
    hero_subtitle: 'Más de 20 años de experiencia en Derecho de Familia, Sucesiones, Protección Patrimonial, Inmobiliario, Contractual y Responsabilidad Civil. Atención personalizada y soluciones legales eficaces para proteger sus derechos.',
    menu_home: 'Inicio',
    menu_about: 'Sobre',
    menu_services: 'Áreas de Práctica',
    menu_team: 'Equipo',
    menu_contact: 'Contacto',
    cta_schedule: 'Agende una Consulta',
    cta_know_specialties: 'Conozca Nuestras Especialidades',
    stat_cases: 'Casos Resueltos',
    stat_years: 'Años de Experiencia',
    stat_success: 'Tasa de Éxito',
    about_title: 'Sobre Palermo Abogados',
    about_subtitle: 'Compromiso con la excelencia y los resultados',
    about_mission_title: 'Nuestra Misión',
    about_mission_text: 'Palermo Abogados nació de la pasión por el derecho y el compromiso de ofrecer soluciones legales eficaces y personalizadas. Con más de 20 años de experiencia, nuestro equipo de abogados especializados está dedicado a proteger sus derechos y buscar los mejores resultados para nuestros clientes.',
    about_values_title: 'Nuestros Valores',
    about_value_ethics: 'Ética y transparencia en todas las relaciones',
    about_value_excellence: 'Excelencia técnica y profesional',
    about_value_personalized: 'Atención personalizada y humanizada',
    about_value_results: 'Compromiso con los resultados',
    about_value_innovation: 'Innovación y actualización constante',
    services_title: 'Áreas de Práctica',
    services_subtitle: 'Especialidades legales para satisfacer sus necesidades',
    service_family_title: 'Derecho de Familia',
    service_family_desc: 'Soluciones ágiles y humanizadas para divorcios, custodia, alimentos, visitas, uniones estables, particiones y pactos prenupciales. Proteja sus derechos y garantice la seguridad de su familia.',
    service_family_divorce: 'Divorcios',
    service_family_guard: 'Custodia y alimentos',
    service_family_visits: 'Visitas',
    service_family_union: 'Unión estable',
    service_family_sharing: 'Particiones',
    service_family_pact: 'Pactos prenupciales',
    service_succession_title: 'Derecho de Sucesiones',
    service_succession_desc: 'Asistencia integral en inventarios, testamentos, planificación sucesoria y disputas hereditarias. Brinde tranquilidad y seguridad al futuro de su familia.',
    service_succession_inventory: 'Inventarios',
    service_succession_testament: 'Testamentos',
    service_succession_planning: 'Planificación sucesoria',
    service_succession_disputes: 'Disputas hereditarias',
    service_protection_title: 'Protección Patrimonial',
    service_protection_desc: 'Estructure su patrimonio de forma segura y estratégica. Creamos soluciones legales para proteger bienes personales y empresariales contra riesgos e imprevistos.',
    service_protection_structures: 'Estructuras legales protectoras',
    service_protection_personal: 'Protección de bienes personales',
    service_protection_business: 'Protección de bienes empresariales',
    service_realestate_title: 'Derecho Inmobiliario',
    service_realestate_desc: 'Asesoría integral en compra y venta de inmuebles, regularización, usucapión, contratos de alquiler, acciones posesorias y cuestiones de condominio. Seguridad y agilidad en todas las etapas.',
    service_realestate_buy: 'Compra y venta de inmuebles',
    service_realestate_regularization: 'Regularización registral',
    service_realestate_usucapion: 'Usucapión',
    service_realestate_rent: 'Contratos de alquiler',
    service_realestate_possessory: 'Acciones posesorias',
    service_realestate_condo: 'Cuestiones de condominio',
    service_contract_title: 'Derecho Contractual',
    service_contract_desc: 'Elaboración, revisión y análisis de contratos civiles y empresariales, garantizando seguridad jurídica y previniendo litigios. Cuente con especialistas para proteger sus intereses.',
    service_contract_civil: 'Contratos civiles',
    service_contract_business: 'Contratos empresariales',
    service_contract_review: 'Revisión y análisis contractual',
    service_contract_safety: 'Seguridad jurídica',
    service_liability_title: 'Responsabilidad Civil',
    service_liability_desc: 'Actuación estratégica en casos de indemnización por daños materiales y morales, en relaciones familiares, contractuales, de consumo, accidentes y otras situaciones. Busque su reparación con quien entiende del tema.',
    service_liability_material: 'Indemnización por daños materiales',
    service_liability_moral: 'Indemnización por daños morales',
    service_liability_family: 'Relaciones familiares y contractuales',
    service_liability_accidents: 'Accidentes y consumo',
    team_title: 'Nuestro Equipo',
    team_subtitle: 'Abogados especializados y experimentados',
    team_camila_title: 'Socia Fundadora',
    team_camila_specialty: 'Derecho Civil y Empresarial',
    team_camila_desc: 'Especialista en derecho civil y empresarial con más de 20 años de experiencia. Graduada por la Universidad de São Paulo y posgraduada en Derecho Empresarial. Comprometida en ofrecer soluciones legales eficaces y personalizadas.',
    team_daniel_title: 'Socio',
    team_daniel_specialty: 'Derecho Laboral y Civil',
    team_daniel_desc: 'Especialista en derecho laboral y civil con amplia experiencia en la defensa de derechos. Maestría en Derecho Laboral y posgrado en Derecho Civil.',
    cta_title: '¿Necesita Ayuda Legal?',
    cta_desc: 'Nuestro equipo de abogados especializados está listo para defender sus derechos y ofrecer las mejores soluciones legales para su caso.',
    cta_schedule2: 'Agende su Consulta',
    contact_title: 'Contáctenos',
    contact_subtitle: 'Agende su consulta y resuelva sus dudas con nuestros especialistas',
    contact_address_title: 'Dirección',
    contact_address: 'Rua Vinte e Nove de Setembro, 53, 2 andar, Campos Elíseos Resende RJ',
    contact_phone_title: 'Teléfono / WhatsApp',
    contact_email_title: 'Correo electrónico',
    contact_email: 'escritorio@palermoadvocacia.adv.br',
    contact_hours_title: 'Horario de Atención',
    contact_hours: 'Lunes a Viernes: 8h a 18h',
    footer_areas_title: 'Áreas de Práctica',
    footer_areas_business: 'Derecho Empresarial',
    footer_areas_labor: 'Derecho Laboral',
    footer_areas_civil: 'Derecho Civil',
    footer_areas_realestate: 'Derecho Inmobiliario',
    footer_links_title: 'Enlaces Útiles',
    footer_links_about: 'Sobre Nosotros',
    footer_links_team: 'Nuestro Equipo',
    footer_links_contact: 'Contacto',
    footer_links_privacy: 'Política de Privacidad',
    footer_contact_title: 'Contacto',
    footer_contact_address: 'Rua Vinte e Nove de Setembro, 53, 2 andar, Campos Elíseos Resende RJ',
    footer_contact_phone: '+55 24 99265-5618',
    footer_contact_email: 'escritorio@palermoadvocacia.adv.br',
    footer_rights: '© 2024 Palermo Abogados. Todos los derechos reservados.',
    footer_oab: 'OAB/SP 123.456'
  },
  it: {
    hero_title: 'Aree di Attività Giuridica Specializzate',
    hero_subtitle: 'Oltre 20 anni di esperienza in Diritto di Famiglia, Successioni, Protezione Patrimoniale, Immobiliare, Contrattuale e Responsabilità Civile. Servizio personalizzato e soluzioni legali efficaci per proteggere i tuoi diritti.',
    menu_home: 'Home',
    menu_about: 'Chi Siamo',
    menu_services: 'Aree di Attività',
    menu_team: 'Team',
    menu_contact: 'Contatto',
    cta_schedule: 'Prenota una Consulenza',
    cta_know_specialties: 'Scopri le Nostre Specialità',
    stat_cases: 'Casi Risolti',
    stat_years: 'Anni di Esperienza',
    stat_success: 'Tasso di Successo',
    about_title: 'Chi è Palermo Avvocati',
    about_subtitle: 'Impegno per l’eccellenza e i risultati',
    about_mission_title: 'La Nostra Missione',
    about_mission_text: 'Palermo Avvocati nasce dalla passione per il diritto e dall’impegno a offrire soluzioni legali efficaci e personalizzate. Con oltre 20 anni di esperienza, il nostro team di avvocati specializzati è dedicato a proteggere i tuoi diritti e a ottenere i migliori risultati per i nostri clienti.',
    about_values_title: 'I Nostri Valori',
    about_value_ethics: 'Etica e trasparenza in tutte le relazioni',
    about_value_excellence: 'Eccellenza tecnica e professionale',
    about_value_personalized: 'Assistenza personalizzata e umanizzata',
    about_value_results: 'Impegno per i risultati',
    about_value_innovation: 'Innovazione e aggiornamento costante',
    services_title: 'Aree di Attività',
    services_subtitle: 'Specialità legali per soddisfare le tue esigenze',
    service_family_title: 'Diritto di Famiglia',
    service_family_desc: 'Soluzioni rapide e umanizzate per divorzi, affidamento, alimenti, visite, unioni di fatto, divisioni patrimoniali e patti prematrimoniali. Proteggi i tuoi diritti e garantisci la sicurezza della tua famiglia.',
    service_family_divorce: 'Divorzi',
    service_family_guard: 'Affidamento e alimenti',
    service_family_visits: 'Visite',
    service_family_union: 'Unione di fatto',
    service_family_sharing: 'Divisioni patrimoniali',
    service_family_pact: 'Patti prematrimoniali',
    service_succession_title: 'Diritto delle Successioni',
    service_succession_desc: 'Assistenza completa in successioni, testamenti, pianificazione successoria e controversie ereditarie. Porta tranquillità e sicurezza al futuro della tua famiglia.',
    service_succession_inventory: 'Successioni',
    service_succession_testament: 'Testamenti',
    service_succession_planning: 'Pianificazione successoria',
    service_succession_disputes: 'Controversie ereditarie',
    service_protection_title: 'Protezione Patrimoniale',
    service_protection_desc: 'Struttura il tuo patrimonio in modo sicuro e strategico. Creiamo soluzioni legali per proteggere i beni personali e aziendali da rischi e imprevisti.',
    service_protection_structures: 'Strutture legali protettive',
    service_protection_personal: 'Protezione dei beni personali',
    service_protection_business: 'Protezione dei beni aziendali',
    service_realestate_title: 'Diritto Immobiliare',
    service_realestate_desc: 'Assistenza completa nell’acquisto e vendita di immobili, regolarizzazione, usucapione, contratti di locazione, azioni possessorie e questioni condominiali. Sicurezza e rapidità in ogni fase.',
    service_realestate_buy: 'Acquisto e vendita di immobili',
    service_realestate_regularization: 'Regolarizzazione catastale',
    service_realestate_usucapion: 'Usucapione',
    service_realestate_rent: 'Contratti di locazione',
    service_realestate_possessory: 'Azioni possessorie',
    service_realestate_condo: 'Questioni condominiali',
    service_contract_title: 'Diritto Contrattuale',
    service_contract_desc: 'Redazione, revisione e analisi di contratti civili e aziendali, garantendo sicurezza giuridica e prevenendo controversie. Affidati a specialisti per proteggere i tuoi interessi.',
    service_contract_civil: 'Contratti civili',
    service_contract_business: 'Contratti aziendali',
    service_contract_review: 'Revisione e analisi contrattuale',
    service_contract_safety: 'Sicurezza giuridica',
    service_liability_title: 'Responsabilità Civile',
    service_liability_desc: 'Azione strategica nei casi di risarcimento per danni materiali e morali, in ambito familiare, contrattuale, del consumo, incidenti e altre situazioni. Ottieni il tuo risarcimento con chi conosce la materia.',
    service_liability_material: 'Risarcimento per danni materiali',
    service_liability_moral: 'Risarcimento per danni morali',
    service_liability_family: 'Rapporti familiari e contrattuali',
    service_liability_accidents: 'Incidenti e consumo',
    team_title: 'Il Nostro Team',
    team_subtitle: 'Avvocati specializzati ed esperti',
    team_camila_title: 'Socio Fondatore',
    team_camila_specialty: 'Diritto Civile e Aziendale',
    team_camila_desc: 'Specialista in diritto civile e aziendale con oltre 20 anni di esperienza. Laureata all’Università di San Paolo e specializzata in Diritto Aziendale. Impegnata a offrire soluzioni legali efficaci e personalizzate.',
    team_daniel_title: 'Socio',
    team_daniel_specialty: 'Diritto del Lavoro e Civile',
    team_daniel_desc: 'Specialista in diritto del lavoro e civile con ampia esperienza nella difesa dei diritti. Master in Diritto del Lavoro e specializzazione in Diritto Civile.',
    cta_title: 'Hai Bisogno di Assistenza Legale?',
    cta_desc: 'Il nostro team di avvocati specializzati è pronto a difendere i tuoi diritti e offrire le migliori soluzioni legali per il tuo caso.',
    cta_schedule2: 'Prenota la Tua Consulenza',
    contact_title: 'Contattaci',
    contact_subtitle: 'Prenota la tua consulenza e chiarisci i tuoi dubbi con i nostri specialisti',
    contact_address_title: 'Indirizzo',
    contact_address: 'Rua Vinte e Nove de Setembro, 53, 2 andar, Campos Elíseos Resende RJ',
    contact_phone_title: 'Telefono / WhatsApp',
    contact_email_title: 'Email',
    contact_email: 'escritorio@palermoadvocacia.adv.br',
    contact_hours_title: 'Orari di Apertura',
    contact_hours: 'Dal lunedì al venerdì: 8:00 - 18:00',
    footer_areas_title: 'Aree di Attività',
    footer_areas_business: 'Diritto Aziendale',
    footer_areas_labor: 'Diritto del Lavoro',
    footer_areas_civil: 'Diritto Civile',
    footer_areas_realestate: 'Diritto Immobiliare',
    footer_links_title: 'Link Utili',
    footer_links_about: 'Chi Siamo',
    footer_links_team: 'Il Nostro Team',
    footer_links_contact: 'Contatto',
    footer_links_privacy: 'Politica sulla Privacy',
    footer_contact_title: 'Contatto',
    footer_contact_address: 'Rua Vinte e Nove de Setembro, 53, 2 andar, Campos Elíseos Resende RJ',
    footer_contact_phone: '+55 24 99265-5618',
    footer_contact_email: 'escritorio@palermoadvocacia.adv.br',
    footer_rights: '© 2024 Palermo Avvocati. Tutti i diritti riservati.',
    footer_oab: 'OAB/SP 123.456'
  }
};

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

document.getElementById('langSelect').addEventListener('change', function() {
  setLanguage(this.value);
});

// Definir idioma padrão
setLanguage('pt'); 