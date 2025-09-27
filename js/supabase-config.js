// Configuración de Supabase para la página de amor
// INSTRUCCIONES DE SETUP:
// 1. Ve a https://supabase.com y crea una cuenta gratuita
// 2. Crea un nuevo proyecto
// 3. Ve a Settings -> API y copia la URL y anon key
// 4. Reemplaza los valores abajo con los tuyos
// 5. Ve a SQL Editor y ejecuta el script de setup

const SUPABASE_CONFIG = {
    // ⚠️ CAMBIAR ESTOS VALORES POR LOS TUYOS
    url: 'https://hhurkjhpiaiigqckauxo.supabase.co', // Tu URL de Supabase
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhodXJramhwaWFpaWdxY2thdXhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MjMzMTAsImV4cCI6MjA3MDA5OTMxMH0.U5i3LKj9618918PxY8dHYR77IVVF4-KfMILFFo-ZH-o', // Tu anon key de Supabase
    
    // Configuración de CORS (agregar en Supabase Dashboard)
    allowedOrigins: [
        'https://tu-usuario.github.io',
        'http://localhost:3000',
        'http://localhost:5000'
    ]
};

// Script SQL para crear las tablas (ejecutar en Supabase SQL Editor)
const SETUP_SQL = `
-- Crear tabla de configuración
CREATE TABLE IF NOT EXISTS config (
    id SERIAL PRIMARY KEY,
    names JSONB DEFAULT '{"person1": "Daniel", "person2": "Betzi"}',
    dates JSONB DEFAULT '{"meeting": "2024-01-01", "relationship": "2025-05-16"}',
    messages JSONB DEFAULT '{"romantic": ["Te amo más que ayer, pero menos que mañana, Betzi ❤️🌻"], "notification": "Te amo más cada día, Betzi ❤️🌻"}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de timeline
CREATE TABLE IF NOT EXISTS timeline (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image TEXT,
    location TEXT,
    time TEXT,
    icon TEXT DEFAULT '💕',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de galería
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image TEXT,
    images TEXT[] DEFAULT '{}',
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agregar columna images si no existe (para bases de datos existentes)
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Crear tabla de sugerencias
CREATE TABLE IF NOT EXISTS suggestions (
    id SERIAL PRIMARY KEY,
    sender TEXT NOT NULL,
    recipient TEXT NOT NULL,
    text TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de respuestas
CREATE TABLE IF NOT EXISTS replies (
    id SERIAL PRIMARY KEY,
    suggestion_id INTEGER REFERENCES suggestions(id) ON DELETE CASCADE,
    sender TEXT NOT NULL,
    text TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    usuario TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    real_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar configuración por defecto
INSERT INTO config (names, dates, messages) VALUES (
    '{"person1": "Daniel", "person2": "Betzi"}',
    '{"meeting": "2024-01-01", "relationship": "2025-05-16"}',
    '{"romantic": ["Te amo más que ayer, pero menos que mañana, Betzi ❤️🌻", "Eres el amor de mi vida y mi mejor amiga, Betzi 💕🌻", "Contigo cada día es una nueva aventura, mi amor 💖🌻", "Tu sonrisa ilumina mi mundo entero, Betzi ✨🌻", "Eres mi presente, mi futuro, mi todo, mi Betzi 💝🌻", "Gracias por ser exactamente como eres, mi amor 🌹🌻", "Contigo he encontrado el amor verdadero, Betzi 💑🌻", "Cada momento a tu lado es un regalo, mi vida 🎁🌻", "Eres la persona que siempre soñé encontrar, Betzi 💫🌻", "Te amo más de lo que las palabras pueden expresar, mi amor 💌🌻"], "notification": "Te amo más cada día, Betzi ❤️🌻"}'
) ON CONFLICT DO NOTHING;

-- Insertar timeline por defecto
INSERT INTO timeline (date, title, description, location, time, icon) VALUES
('2024-01-15', 'Nuestro primer café juntos', 'Esa tarde perfecta donde Daniel y Betzi descubrimos que teníamos tanto en común. Fue el comienzo de algo hermoso.', 'Café favorito', 'Tarde inolvidable', '☕'),
('2024-02-01', 'El momento mágico de Daniel y Betzi', 'Cuando el tiempo se detuvo y solo existíamos tú y yo. Ese momento cambió todo para siempre.', 'Bajo las estrellas', 'Eternidad en un instante', '💋'),
('2024-03-01', 'El futuro de Daniel y Betzi', 'Cada día es una nueva aventura a tu lado, Betzi, y no puedo esperar por todos los momentos hermosos que nos esperan juntos.', 'En nuestro futuro', 'Para toda la vida', '🌻');

-- Insertar galería por defecto
INSERT INTO gallery (title, description) VALUES
('Nuestra primera foto juntos', 'Agrega aquí tu primera foto juntos'),
('Un momento especial', 'Agrega aquí un momento especial'),
('Una aventura juntos', 'Agrega aquí una aventura juntos'),
('Un momento romántico', 'Agrega aquí un momento romántico'),
('Una celebración', 'Agrega aquí una celebración'),
('El momento más reciente', 'Agrega aquí el momento más reciente');

-- Insertar usuarios por defecto (contraseñas en MD5)
-- MD5 de "hello" = 5d41402abc4b2a76b9719d911017c592
INSERT INTO users (usuario, password, real_name) VALUES
('foquito', '5d41402abc4b2a76b9719d911017c592', 'Daniel'),  -- "hello" en MD5
('amuletito', '5d41402abc4b2a76b9719d911017c592', 'Betzi')  -- "hello" en MD5
ON CONFLICT (usuario) DO UPDATE SET 
    password = EXCLUDED.password,
    real_name = EXCLUDED.real_name;

-- Habilitar Row Level Security (RLS)
ALTER TABLE config ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Crear políticas para permitir lectura y escritura anónima
CREATE POLICY "Allow anonymous read" ON config FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert" ON config FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update" ON config FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous read" ON timeline FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert" ON timeline FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update" ON timeline FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete" ON timeline FOR DELETE USING (true);

CREATE POLICY "Allow anonymous read" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert" ON gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update" ON gallery FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete" ON gallery FOR DELETE USING (true);

CREATE POLICY "Allow anonymous read" ON suggestions FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert" ON suggestions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update" ON suggestions FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete" ON suggestions FOR DELETE USING (true);

CREATE POLICY "Allow anonymous read" ON replies FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert" ON replies FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update" ON replies FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete" ON replies FOR DELETE USING (true);

CREATE POLICY "Allow anonymous read" ON users FOR SELECT USING (true);
`;

// Función para validar configuración
function validateSupabaseConfig() {
    const config = SUPABASE_CONFIG;
    
    if (!config.url || config.url === 'https://tu-proyecto.supabase.co') {
        console.error('❌ ERROR: Debes configurar la URL de Supabase');
        return false;
    }
    
    if (!config.anonKey || config.anonKey === 'tu-anon-key-aqui') {
        console.error('❌ ERROR: Debes configurar la anon key de Supabase');
        return false;
    }
    
    console.log('✅ Configuración de Supabase válida');
    return true;
}

// Función para obtener configuración
function getSupabaseConfig() {
    if (!validateSupabaseConfig()) {
        throw new Error('Configuración de Supabase inválida. Revisa supabase-config.js');
    }
    
    return SUPABASE_CONFIG;
}

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUPABASE_CONFIG, SETUP_SQL, validateSupabaseConfig, getSupabaseConfig };
} else {
    window.SUPABASE_CONFIG = SUPABASE_CONFIG;
    window.SETUP_SQL = SETUP_SQL;
    window.validateSupabaseConfig = validateSupabaseConfig;
    window.getSupabaseConfig = getSupabaseConfig;
} 