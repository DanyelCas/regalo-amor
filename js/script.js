// Script principal modularizado
// Dependencias: config.js, effects.js, utils.js

// Clase principal para manejar la aplicación
class LovePage {
    constructor() {
        this.isInitialized = false;
    }

    // Inicializar la página
    async init() {
        if (this.isInitialized) return;
        
        // Agregar estilos dinámicos
        Utils.addDynamicStyles();
        
        // Inicializar sistema de autenticación
        await this.initializeAuthSystem();
        
        // Inicializar efectos visuales
        this.initializeVisualEffects();
        
        // Inicializar interactividad
        await this.initializeInteractivity();
        
        // Inicializar sistema de datos
        await this.initializeDataSystem();
        
        // Inicializar animaciones
        this.initializeAnimations();
        
        // Configurar intervalos
        this.setupIntervals();

        
        this.isInitialized = true;
    }

    // Inicializar sistema de autenticación
    async initializeAuthSystem() {
        // El sistema de auth se inicializa automáticamente
        // Solo verificamos que esté disponible
        if (typeof authManager === 'undefined') {
            console.error('Sistema de autenticación no disponible');
            return;
        }
        
        // Esperar a que Supabase esté disponible para cargar usuarios
        await this.waitForSupabase();
        
        // Aplicar permisos iniciales
        this.applyInitialPermissions();
        
        console.log('Sistema de autenticación inicializado');
    }

    // Aplicar permisos iniciales
    applyInitialPermissions() {
        // Esperar un poco para que la UI esté lista
        setTimeout(() => {
            if (typeof authUI !== 'undefined' && authUI.updateAllPermissions) {
                authUI.updateAllPermissions();
            }
        }, 1000);
    }

    // Inicializar efectos visuales
    initializeVisualEffects() {
        // Crear partículas
        visualEffects.createParticles();
        
        // Crear flores flotantes
        visualEffects.createFloatingSunflowers();
        visualEffects.createFloatingTulips();
        
        // Actualizar contadores
        setInterval(() => {
            Utils.updateCounters();
        }, 1000);
        
        
        // Iniciar efecto de escritura
        this.startTypewriterEffect();
    }

    // Inicializar interactividad
    async initializeInteractivity() {
        // Efectos de scroll
        Utils.animateOnScroll();
        
        // Efectos de hover
        Utils.addHoverEffects();
        
        // Efectos de click especiales
        Utils.addSpecialClickEffects();
        
        // Scroll suave
        Utils.initSmoothScroll();
        
        // Inicializar sugerencias
        await Utils.initializeSuggestions();
        
        // Inicializar formulario del timeline
        this.initializeTimelineForm();

        this.initializeNameData();
    }

    // Inicializar formulario del timeline
    initializeTimelineForm() {
        // Mostrar el nombre al cargar la página
        const timelineForm = document.getElementById('addTimelineForm');
        const galleryForm = document.getElementById('addGalleryForm');
        
        if (timelineForm) {
            timelineForm.addEventListener('submit', Utils.saveTimelineEvent);
        }
        
        if (galleryForm) {
            galleryForm.addEventListener('submit', Utils.saveGalleryEvent);
        }
    }

    initializeNameData() {
        let name = authManager.getCurrentUserRealName();
        let message = "";
        if(name === 'foquito') {
            message = 'Daniel, dale mucho amor';
        } else if(name === 'amuletito') {
            message = 'Betzi, recuerda que te amo mucho';
        } else {
            message = 'Invitado';
        }

        document.getElementById('userNameDisplay').textContent = message;
    }

    // Inicializar sistema de datos
    async initializeDataSystem() {
        try {
            // Esperar a que Supabase esté inicializado
            await this.waitForSupabase();
            
            // Cargar datos iniciales
            const data = await dataManager.loadData();
            
            // Actualizar nombres si es necesario
            this.updateNames(data.config.names);
            
            // Actualizar fechas si es necesario
            this.updateDates(data.config.dates);
            
            // Cargar timeline dinámico
            await this.loadTimeline(data.timeline);
            
            // Cargar galería dinámica
            await this.loadGallery(data.gallery);
                        
        } catch (error) {
            console.error('Error inicializando sistema de datos:', error);
            this.showDataError();
        }
    }

    // Esperar a que Supabase esté inicializado
    async waitForSupabase() {
        let attempts = 0;
        const maxAttempts = 50; // 5 segundos máximo
        
        while (!dataManager.supabase && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (!dataManager.supabase) {
            throw new Error('Supabase no se inicializó correctamente');
        }
    }

    // Mostrar error de datos
    showDataError() {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: #ff8800;
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            max-width: 300px;
        `;
        errorDiv.innerHTML = `
            <strong>⚠️ Error de datos</strong><br>
            No se pudieron cargar los datos.<br>
            Verifica tu conexión a internet.
        `;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 10000);
    }

    // Actualizar nombres en la página
    updateNames(names) {
        // Actualizar título principal
        const title = document.querySelector('.title');
        if (title && names.person1 && names.person2) {
            title.textContent = `Para ${names.person2}, el amor de mi vida`;
        }
        
        // Actualizar subtítulos
        const subtitles = document.querySelectorAll('.subtitle');
        subtitles.forEach(subtitle => {
            if (subtitle && names.person1 && names.person2) {
                subtitle.textContent = `Cada día a tu lado es un regalo, mi amor 🌻❤️`;
            }
        });
        
        // Actualizar contadores
        const meetingCounter = document.getElementById('meetingCounter');
        const relationshipCounter = document.getElementById('relationshipCounter');
        
        if (meetingCounter) {
            meetingCounter.nextElementSibling.textContent = `... desde que ${names.person1} y ${names.person2} se conocieron`;
        }
        
        if (relationshipCounter) {
            relationshipCounter.nextElementSibling.textContent = `... desde que ${names.person1} y ${names.person2} son novios`;
        }
    }

    // Actualizar fechas en la página
    updateDates(dates) {
        // Las fechas se actualizan automáticamente en los contadores
        setInterval(() => {
            Utils.updateCounters();
        }, 1000);
        
    }

    // Cargar timeline dinámico
    async loadTimeline(timeline) {
        const timelineContainer = document.querySelector('.timeline');
        if (!timelineContainer) return;

        // Limpiar TODO el contenido del timeline
        timelineContainer.innerHTML = '';

        // Ordenar timeline por fecha (más reciente primero)
        const sortedTimeline = [...timeline].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA; // Orden descendente (más reciente primero)
        });

        // Agregar items dinámicos ordenados
        for (const item of sortedTimeline) {
            await this.addTimelineItem(item);
        }
    }

    // Agregar item al timeline
    async addTimelineItem(item) {
        const timelineContainer = document.querySelector('.timeline');
        if (!timelineContainer) return;

        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.setAttribute('data-date', item.date);
        timelineItem.setAttribute('data-id', item.id);

        timelineItem.innerHTML = `
            <div class="timeline-marker">
                <div class="marker-icon">${'💕'}</div>
                <div class="marker-pulse"></div>
            </div>
            <div class="timeline-content">
                <div class="timeline-date">
                    ${item.date.split('-').reverse().join('/')}
                </div>
                <div class="content-header">
                    <h3>${item.title}</h3>
                    <div class="content-icon">${item.icon || '💕'}</div>
                </div>
                <p>${item.description}</p>
                <div class="content-footer">
                    <span class="location">📍 ${item.location}</span>
                    <span class="time">⏰ ${item.time}</span>
                    <div class="timeline-actions">
                        <button class="edit-btn" onclick="Utils.editTimelineItem('${item.id}')" title="Editar">
                            ✏️
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Agregar efectos de animación
        timelineItem.style.opacity = '0';
        timelineItem.style.transform = 'translateY(20px)';
        
        timelineContainer.appendChild(timelineItem);
        
        // Animar entrada
        setTimeout(() => {
            timelineItem.style.transition = 'all 0.6s ease';
            timelineItem.style.opacity = '1';
            timelineItem.style.transform = 'translateY(0)';
        }, 100);
    }

    galleryIndex = 0;
    galleryItems = [];

    // Cargar galería dinámica
    async loadGallery(gallery) {
        this.galleryItems = (gallery || []).sort((a, b) => 
            new Date(b.date) - new Date(a.date) // más recientes primero
        );
        const wrapper = document.getElementById('gallerySwiperWrapper');
        if (!wrapper) return;
        wrapper.innerHTML = '';

        if (this.galleryItems.length === 0) {
            wrapper.innerHTML = '<div class="swiper-slide"><div class="gallery-item"><p>No hay recuerdos aún.</p></div></div>';
        } else {
            this.galleryItems.forEach(item => {
                const rawDate = item.date.split('T')[0];
                const [year, month, day] = rawDate.split('-');
                const formattedDate = `${day}/${month}/${year}`;
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `
                    <div class="gallery-item">
                        <div class="gallery-image">
                            ${item.image ? `<img src="${item.image}" alt="${item.title}">` : 
                            `<div class="image-placeholder"><span>📸</span><p>Agregar foto</p></div>`}
                        </div>
                        <div class="gallery-info">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <span class="gallery-date">${formattedDate}</span>
                            <div class="gallery-actions">
                                <button class="edit-btn" onclick="Utils.editGalleryItem('${item.id}')" title="Editar">✏️</button>
                            </div>
                        </div>
                    </div>
                `;
                wrapper.appendChild(slide);
            });
        }

        // Inicializar o actualizar Swiper
        if (window.gallerySwiper) {
            window.gallerySwiper.update();
        } else {
            window.gallerySwiper = new Swiper('.gallery-swiper', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
                loop: false,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                // 🔹 Esto asegura que las flechas sigan la dirección esperada
                rtl: false
            });
        }
    }

    static showPrevGallery() {
        if (window.lovePage.galleryItems.length === 0) return;
        window.lovePage.galleryIndex = (window.lovePage.galleryIndex - 1 + window.lovePage.galleryItems.length) % window.lovePage.galleryItems.length;
        window.lovePage.renderGalleryCarousel();
    }

    static showNextGallery() {
        if (window.lovePage.galleryItems.length === 0) return;
        window.lovePage.galleryIndex = (window.lovePage.galleryIndex + 1) % window.lovePage.galleryItems.length;
        window.lovePage.renderGalleryCarousel();
    }

    static showAllGalleryModal() {
        const modal = document.getElementById('allGalleryModal');
        modal.classList.add('active');
        const list = modal.querySelector('.all-gallery-list');
        list.innerHTML = '';
        window.lovePage.galleryItems.forEach(item => {
            const rawDate = item.date.split('T')[0];
            const [year, month, day] = rawDate.split('-');
            const formattedDate = `${day}/${month}/${year}`;

            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item-all';
            galleryItem.innerHTML = `
                <div class="gallery-image-all">
                    ${item.image ? `<img src="${item.image}" alt="${item.title}">` : 
                    `<div class="image-placeholder-all"><span>📸</span><p>Agregar foto</p></div>`}
                </div>
                <div class="gallery-info-all">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span class="gallery-date-all">${formattedDate}</span>
                    <div class="gallery-actions">
                        <button class="edit-btn" onclick="Utils.editGalleryItem('${item.id}')" title="Editar">✏️</button>
                    </div>
                </div>
            `;
            list.appendChild(galleryItem);
        });
    }

    static closeAllGalleryModal() {
        document.getElementById('allGalleryModal').classList.remove('active');
    }

    // Inicializar animaciones
    initializeAnimations() {
        // Animaciones de entrada
        Utils.animateOnScroll();
        
        // Efectos de partículas
        visualEffects.startParticleAnimation();
        
        // Efectos de flores flotantes
        visualEffects.startFloatingAnimation();
    }

    // Configurar intervalos
    setupIntervals() {
        // Actualizar contadores cada minuto
        setInterval(() => {
            Utils.updateCounters();
        }, 1000);
        
        // Actualizar mensajes románticos cada 30 segundos
        setInterval(() => {
            Utils.updateRomanticMessages();
        }, 30000);
        
        // Verificar conexión cada 5 minutos
        setInterval(() => {
            this.checkConnection();
        }, 300000);
    }

    // Verificar conexión
    async checkConnection() {
        try {
            await dataManager.loadConfig();
            console.log('Conexión a Supabase OK');
        } catch (error) {
            console.warn('Problema de conexión detectado:', error);
            this.showConnectionWarning();
        }
    }

    // Mostrar advertencia de conexión
    showConnectionWarning() {
        const warningDiv = document.createElement('div');
        warningDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #ffaa00;
            color: white;
            padding: 10px;
            border-radius: 8px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 12px;
        `;
        warningDiv.innerHTML = '⚠️ Problema de conexión';
        document.body.appendChild(warningDiv);
        
        setTimeout(() => {
            warningDiv.remove();
        }, 5000);
    }

    // Iniciar efecto de escritura
    startTypewriterEffect() {
        const loveLetter = document.getElementById('loveLetter');
        if (!loveLetter) return;

        const text = loveLetter.textContent;
        loveLetter.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                loveLetter.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Iniciar después de 2 segundos
        setTimeout(typeWriter, 2000);
    }

    // Limpiar recursos
    cleanup() {
        // Limpiar intervalos
        if (this.countersInterval) {
            clearInterval(this.countersInterval);
        }
        if (this.messagesInterval) {
            clearInterval(this.messagesInterval);
        }
        if (this.connectionInterval) {
            clearInterval(this.connectionInterval);
        }
        
        // Limpiar efectos visuales
        visualEffects.cleanup();     
    }
}

// Función para enviar sugerencias (mantener compatibilidad)
async function sendSuggestion(person) {
    const identifier = person === 'daniel' ? 'danielSuggestion' : 'betziSuggestion';
    const textarea = document.getElementById(identifier);
    const text = textarea.value.trim();
    
    if (!text) {
        alert('Por favor escribe un mensaje antes de enviar.');
        return;
    }
    
    // Verificar restricciones de autenticación
    const mailboxOwner = person === 'daniel' ? 'Daniel' : 'Betzi';
    if (authManager && !authManager.canWriteInMailbox(mailboxOwner)) {
        const role = authManager.getCurrentUserRole();
        if (role === 'guest') {
            alert('🔒 Debes iniciar sesión para escribir mensajitos 💕');
        } else {
            alert(`No puedes escribir en tu propio buzón, pero puedes responder a los mensajes de ${person === 'daniel' ? 'Betzi' : 'Daniel'} 💕`);
        }
        return;
    }

    const envia = authManager.getCurrentUserRealName();
    const sender = envia === 'foquito' ? 'Daniel' : 'Betzi';
    const recipient = envia === 'foquito' ? 'Betzi' : 'Daniel';
    
    try {
        const success = await dataManager.addSuggestion(sender, recipient, text);
        
        if (success) {
            textarea.value = '';
            alert('¡Mensaje enviado con amor! ❤️');
            
            // Actualizar la interfaz
            Utils.refreshSuggestions();
        } else {
            alert('Error enviando el mensaje. Intenta de nuevo.');
        }
    } catch (error) {
        console.error('Error enviando sugerencia:', error);
        alert('Error enviando el mensaje. Verifica tu conexión.');
    }
}

// Inicializar la página cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    const lovePage = new LovePage();
    window.lovePage = lovePage;
    await lovePage.init();

    // Inicializar Supabase y suscripciones después de que window.lovePage existe
    await dataManager.initSupabase();
});

// Manejar limpieza al cerrar la página
window.addEventListener('beforeunload', () => {
    if (window.lovePage) {
        window.lovePage.cleanup();
    }
});