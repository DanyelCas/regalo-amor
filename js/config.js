// Configuración centralizada de la página de amor
const CONFIG = {
    // Configuración de fechas importantes
    DATES: {
        MEETING: new Date('2024-01-01'), // Cambia esta fecha por cuando se conocieron
        RELATIONSHIP: new Date('2025-05-16') // Cambia esta fecha por cuando empezaron a ser novios
    },

    // Configuración de imágenes
    IMAGES: {
        SUNFLOWER1: 'images/girasol_sin_fondo_1.png',
        SUNFLOWER2: 'images/girasoles1.webp',
        SUNFLOWER3: 'images/girasoles2.jpg',
        TULIP1: 'images/tulipan1.webp',
        TULIP2: 'images/tulipan2.webp',
        TULIP3: 'images/tulipan3.png'
    },

    // Configuración de mensajes románticos
    MESSAGES: {
        ROMANTIC: [
            "Te amo más que ayer, pero menos que mañana, Betzi ❤️🌻",
            "Eres el amor de mi vida y mi mejor amiga, Betzi 💕🌻",
            "Contigo cada día es una nueva aventura, mi amor 💖🌻",
            "Tu sonrisa ilumina mi mundo entero, Betzi ✨🌻",
            "Eres mi presente, mi futuro, mi todo, mi Betzi 💝🌻",
            "Gracias por ser exactamente como eres, mi amor 🌹🌻",
            "Contigo he encontrado el amor verdadero, Betzi 💑🌻",
            "Cada momento a tu lado es un regalo, mi vida 🎁🌻",
            "Eres la persona que siempre soñé encontrar, Betzi 💫🌻",
            "Te amo más de lo que las palabras pueden expresar, mi amor 💌🌻"
        ],
        NOTIFICATION: 'Te amo más cada día, Betzi ❤️🌻'
    },

    // Configuración de animaciones
    ANIMATIONS: {
        PARTICLE_COUNT: 50,
        FLOWER_COUNT: 15,
        TULIP_COUNT: 8,
        COUNTER_UPDATE_INTERVAL: 60000, // 1 minuto
        MESSAGE_CHANGE_INTERVAL: 8000, // 8 segundos
        NOTIFICATION_INTERVAL: 120000, // 2 minutos
        TYPING_SPEED: 50, // milisegundos por carácter
        RAIN_DURATION: 3000, // 3 segundos
        CONFETTI_DURATION: 5000 // 5 segundos
    },

    // Configuración de efectos visuales
    EFFECTS: {
        HEART_EXPLOSION_COUNT: 12,
        CONFETTI_COUNT: 50,
        RAIN_DURATION: 3000,
        FLOATING_ANIMATION_DURATION: 6,
        SIDE_TULIP_COUNT: 3,
        
        // Configuración de partículas
        PARTICLES: {
            COUNT: 30,
            MIN_SIZE: 3,
            MAX_SIZE: 8,
            MIN_DURATION: 4,
            MAX_DURATION: 8
        },
        
        // Configuración de flores flotantes
        FLOWERS: {
            SUNFLOWERS: {
                COUNT: 8,
                MIN_SIZE: 30,
                MAX_SIZE: 50,
                MIN_DURATION: 6,
                MAX_DURATION: 10,
                MIN_OPACITY: 0.6,
                MAX_OPACITY: 0.9
            },
            TULIPS: {
                COUNT: 6,
                MIN_SIZE: 25,
                MAX_SIZE: 40,
                MIN_DURATION: 5,
                MAX_DURATION: 9,
                MIN_OPACITY: 0.7,
                MAX_OPACITY: 0.95
            }
        },
        
        // Configuración de lluvia
        RAIN: {
            COUNT: 20,
            MIN_SIZE: 2,
            MAX_SIZE: 4,
            MIN_DURATION: 2,
            MAX_DURATION: 4,
            FLOWER_PROBABILITY: 0.3,
            INTERVAL: 100,
            FLOWERS: ['🌻', '🌹', '🌸'],
            HEARTS: ['❤️', '💖', '💕', '💗']
        },
        
        // Configuración de confeti
        CONFETTI: {
            COUNT: 40,
            MIN_SIZE: 4,
            MAX_SIZE: 10,
            MIN_DURATION: 3,
            MAX_DURATION: 6,
            COLORS: ['#FFD700', '#FFED4E', '#FF6B6B', '#4CAF50', '#2196F3']
        }
    },

    // Configuración de colores
    COLORS: {
        PRIMARY: '#FFD700',
        SECONDARY: '#FFED4E',
        ACCENT: '#8B4513',
        BACKGROUND: 'linear-gradient(135deg, #FFF8DC, #FFEFD5)',
        TEXT: '#8B4513'
    }
}; 