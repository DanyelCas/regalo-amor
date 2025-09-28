// Efectos visuales mejorados y modularizados
class VisualEffects {
    constructor() {
        this.activeEffects = new Set();
    }

    // Crear partículas flotantes
    createParticles() {
        const particlesContainer = document.getElementById('particles');
        const config = CONFIG.EFFECTS.PARTICLES;

        for (let i = 0; i < config.COUNT; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * (config.MAX_SIZE - config.MIN_SIZE) + config.MIN_SIZE;
            const duration = Math.random() * (config.MAX_DURATION - config.MIN_DURATION) + config.MIN_DURATION;
            
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 107, 107, ${Math.random() * 0.5 + 0.3});
                border-radius: 50%;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    // Crear girasoles flotantes
    createFloatingSunflowers() {
        const container = this.createEffectContainer('sunflowers-container', 6);
        const config = CONFIG.EFFECTS.FLOWERS.SUNFLOWERS;

        for (let i = 0; i < config.COUNT; i++) {
            const sunflower = this.createFlower(config, 'sunflower');
            container.appendChild(sunflower);
        }
    }

    // Crear tulipanes flotantes
    createFloatingTulips() {
        const container = this.createEffectContainer('tulips-container', 5);
        const config = CONFIG.EFFECTS.FLOWERS.TULIPS;

        // Tulipanes normales flotantes
        for (let i = 0; i < config.COUNT; i++) {
            const tulip = this.createFlower(config, 'tulip');
            container.appendChild(tulip);
        }
        
        // Tulipanes grandes pegados a los costados
        this.createSideTulips(container);
    }
    
    // Crear tulipanes grandes en los costados
    createSideTulips(container) {
        const tulipImages = [CONFIG.IMAGES.TULIP1, CONFIG.IMAGES.TULIP2, CONFIG.IMAGES.TULIP3];
        
        // Tulipanes del lado izquierdo
        for (let i = 0; i < 3; i++) {
            const tulip = document.createElement('div');
            const randomTulip = tulipImages[Math.floor(Math.random() * tulipImages.length)];
            const size = 80 + Math.random() * 40; // 80-120px
            const top = i === 0 ? 10 : i === 1 ? 50 : 80; // Arriba, medio, abajo
            
            tulip.className = 'side-flower left';
            if (randomTulip.includes('tulipan1')) {
                tulip.classList.add('tulip-left');
            } else if (randomTulip.includes('tulipan2')) {
                tulip.classList.add('tulip-right');
            } else {
                tulip.classList.add('tulip-center');
            }
            
            tulip.style.cssText = `
                position: fixed;
                left: 20px;
                top: ${top}%;
                width: ${size}px;
                height: ${size}px;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                opacity: 0.9;
                z-index: 2;
                pointer-events: none;
            `;
            
            container.appendChild(tulip);
        }
        
        // Tulipanes del lado derecho
        for (let i = 0; i < 3; i++) {
            const tulip = document.createElement('div');
            const randomTulip = tulipImages[Math.floor(Math.random() * tulipImages.length)];
            const size = 80 + Math.random() * 40; // 80-120px
            const top = i === 0 ? 10 : i === 1 ? 50 : 80; // Arriba, medio, abajo
            
            tulip.className = 'side-flower right';
            if (randomTulip.includes('tulipan1')) {
                tulip.classList.add('tulip-left');
            } else if (randomTulip.includes('tulipan2')) {
                tulip.classList.add('tulip-right');
            } else {
                tulip.classList.add('tulip-center');
            }
            
            tulip.style.cssText = `
                position: fixed;
                right: 20px;
                top: ${top}%;
                width: ${size}px;
                height: ${size}px;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                opacity: 0.9;
                z-index: 2;
                pointer-events: none;
                transform: rotate(-15deg);
            `;
            
            container.appendChild(tulip);
        }
    }

    // Crear flor individual
    createFlower(config, className) {
        const flower = document.createElement('div');
        const size = Math.random() * (config.MAX_SIZE - config.MIN_SIZE) + config.MIN_SIZE;
        const duration = Math.random() * (config.MAX_DURATION - config.MIN_DURATION) + config.MIN_DURATION;
        
        flower.className = `floating-flower ${className}`;
        flower.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0.8;
            z-index: 1;
            pointer-events: none;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        return flower;
    }

    // Crear contenedor de efectos
    createEffectContainer(className, zIndex) {
        let container = document.getElementById(className);
        if (!container) {
            container = document.createElement('div');
            container.id = className;
            container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: ${zIndex};
            `;
            document.body.appendChild(container);
        }
        return container;
    }

    // Crear lluvia mejorada
    createEnhancedRain() {
        const container = this.createEffectContainer('rain-container', 3);
        
        const createRainElement = () => {
            const drop = document.createElement('div');
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 2 + 1;
            const left = Math.random() * 100;
            
            drop.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size * 10}px;
                background: linear-gradient(to bottom, rgba(255, 215, 0, 0.8), rgba(255, 193, 7, 0.4));
                left: ${left}%;
                top: -20px;
                animation: rain-fall ${duration}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            container.appendChild(drop);
            
            // Remover después de la animación
            setTimeout(() => {
                if (drop.parentNode) {
                    drop.parentNode.removeChild(drop);
                }
            }, duration * 1000);
        };
        
        // Crear gotas continuamente
        setInterval(createRainElement, 100);
        
        // Crear gotas iniciales
        for (let i = 0; i < 20; i++) {
            setTimeout(createRainElement, i * 50);
        }
    }

    // Crear confeti mejorado
    createEnhancedConfetti() {
        const container = this.createEffectContainer('confetti-container', 4);
        
        const createConfettiPiece = () => {
            const piece = document.createElement('div');
            const size = Math.random() * 8 + 4;
            const colors = ['#FFD700', '#FFED4E', '#FF6B6B', '#4CAF50', '#2196F3'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            
            piece.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                left: ${left}%;
                top: -10px;
                animation: confetti-fall ${duration}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            container.appendChild(piece);
            
            // Remover después de la animación
            setTimeout(() => {
                if (piece.parentNode) {
                    piece.parentNode.removeChild(piece);
                }
            }, duration * 1000);
        };
        
        // Crear piezas continuamente
        setInterval(createConfettiPiece, 200);
        
        // Crear piezas iniciales
        for (let i = 0; i < 30; i++) {
            setTimeout(createConfettiPiece, i * 100);
        }
    }

    // Crear explosión de corazones
    createHeartExplosion(x, y) {
        const container = this.createEffectContainer('heart-explosion-container', 10);
        
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            const angle = (i / 12) * 2 * Math.PI;
            const distance = 50 + Math.random() * 50;
            const size = Math.random() * 20 + 15;
            const duration = Math.random() * 1 + 1;
            
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                font-size: ${size}px;
                animation: heart-explosion ${duration}s ease-out forwards;
                animation-delay: ${Math.random() * 0.3}s;
                transform: translate(-50%, -50%);
                z-index: 1000;
            `;
            
            container.appendChild(heart);
            
            // Remover después de la animación
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, duration * 1000);
        }
    }

    // Limpiar todos los efectos
    clearAllEffects() {
        this.activeEffects.forEach(effect => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        });
        this.activeEffects.clear();
    }
}

// Instanciar efectos visuales
const visualEffects = new VisualEffects(); 