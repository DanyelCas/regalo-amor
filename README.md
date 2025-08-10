# 💕 Página de Amor con Supabase

Una hermosa página web personalizada para expresar tu amor, con base de datos en la nube y sincronización en tiempo real.

## ✨ Características

- 🌻 **Diseño romántico** con animaciones suaves
- 📅 **Timeline interactivo** de momentos especiales
- 📸 **Galería de fotos** para recuerdos
- 💌 **Sistema de sugerencias** para mensajes
- ⏰ **Contadores automáticos** de días importantes
- 🔄 **Sincronización en tiempo real** con Supabase
- 📱 **Responsive** - funciona en cualquier dispositivo
- 🚀 **Hosting gratuito** en GitHub Pages

## 🚀 Configuración rápida

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/page.git
cd page
```

### 2. Configurar Supabase
1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita
2. Crea un nuevo proyecto
3. Sigue las instrucciones detalladas en [docs/SUPABASE-SETUP.md](docs/SUPABASE-SETUP.md)

### 3. Personalizar
1. Edita `js/supabase-config.js` con tus credenciales
2. Modifica los nombres y fechas en la configuración
3. Personaliza los colores y estilos en `css/`

### 4. Subir a GitHub
```bash
git add .
git commit -m "Mi página de amor personalizada"
git push origin main
```

### 5. Activar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Settings → Pages → Deploy from branch
3. Selecciona `main` y guarda

## 📁 Estructura del proyecto

```
page/
├── css/                    # Estilos organizados
│   ├── base.css           # Variables y reset
│   ├── header.css         # Header y contadores
│   ├── sections.css       # Secciones principales
│   ├── timeline.css       # Timeline y animaciones
│   ├── suggestions.css    # Sistema de sugerencias
│   ├── components.css     # Modales y formularios
│   └── styles.css         # Archivo principal
├── js/                    # JavaScript modular
│   ├── config.js          # Configuración general
│   ├── supabase-config.js # Configuración de Supabase
│   ├── data.js            # Gestión de datos con Supabase
│   ├── utils.js           # Utilidades y helpers
│   ├── effects.js         # Efectos visuales
│   └── script.js          # Script principal
├── images/                # Imágenes y assets
├── docs/                  # Documentación
│   └── SUPABASE-SETUP.md  # Guía de configuración
└── index.html             # Página principal
```

## 🎯 Tecnologías utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Base de datos**: Supabase (PostgreSQL)
- **Hosting**: GitHub Pages
- **Efectos**: CSS Animations, Particles.js
- **Iconos**: Emojis nativos

## 🔧 Configuración avanzada

### Personalizar colores
Edita las variables CSS en `css/base.css`:
```css
:root {
    --primary-color: #ff6b9d;
    --secondary-color: #ffd93d;
    --accent-color: #6bcf7f;
    --text-color: #333333;
    --background-color: #ffffff;
}
```

### Agregar nuevas secciones
1. Crea el HTML en `index.html`
2. Agrega estilos en `css/sections.css`
3. Agrega funcionalidad en `js/script.js`

### Modificar la base de datos
1. Ve a Supabase Dashboard → SQL Editor
2. Ejecuta comandos SQL para modificar tablas
3. Actualiza `js/data.js` si es necesario

## 🌟 Características de Supabase

### ✅ Ventajas
- **Gratis**: 500MB de base de datos, 50,000 filas
- **Tiempo real**: Sincronización automática
- **Seguro**: HTTPS, políticas de seguridad
- **Escalable**: Migración fácil a planes pagados
- **Fácil**: Dashboard web intuitivo

### 🔄 Sincronización en tiempo real
- Los cambios se reflejan automáticamente
- No necesitas refrescar la página
- Perfecto para uso compartido

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Móviles y tablets
- ✅ GitHub Pages
- ✅ Dominios personalizados

## 🚀 Despliegue

### GitHub Pages (Recomendado)
1. Sube tu código a GitHub
2. Activa GitHub Pages en Settings
3. Tu sitio estará en: `https://tu-usuario.github.io/page`

### Otros hosts
- Netlify
- Vercel
- Firebase Hosting
- Cualquier hosting estático

## 🔒 Seguridad

- ✅ HTTPS automático
- ✅ Políticas de seguridad configuradas
- ✅ Solo lectura/escritura anónima permitida
- ✅ Datos respaldados en la nube

## 📞 Soporte

Si tienes problemas:

1. **Revisa la consola** del navegador (F12)
2. **Verifica la configuración** de Supabase
3. **Consulta** [docs/SUPABASE-SETUP.md](docs/SUPABASE-SETUP.md)
4. **Abre un issue** en GitHub

## 🎉 ¡Listo!

Tu página de amor ahora tiene:
- ✅ Base de datos profesional
- ✅ Sincronización en tiempo real
- ✅ Datos seguros y respaldados
- ✅ Funciona desde cualquier dispositivo
- ✅ Completamente gratis

¡Disfruta tu página de amor! ❤️🌻

---

**Hecho con ❤️ para expresar el amor de la manera más especial** 