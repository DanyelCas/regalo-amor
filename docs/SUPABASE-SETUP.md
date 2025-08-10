# 🚀 Configuración de Supabase para tu Página de Amor

## 📋 Pasos para configurar Supabase

### 1. Crear cuenta en Supabase
1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en "Start your project"
3. Crea una cuenta gratuita (puedes usar GitHub)
4. Confirma tu email

### 2. Crear un nuevo proyecto
1. Haz clic en "New Project"
2. Selecciona tu organización
3. Elige un nombre para tu proyecto (ej: "love-page")
4. Elige una contraseña para la base de datos
5. Selecciona la región más cercana a ti
6. Haz clic en "Create new project"

### 3. Obtener las credenciales
1. Ve a **Settings** → **API**
2. Copia la **Project URL** (ej: `https://abcdefghijklmnop.supabase.co`)
3. Copia la **anon public** key (empieza con `eyJ...`)

### 4. Configurar el proyecto
1. Abre el archivo `js/supabase-config.js`
2. Reemplaza estos valores:
   ```javascript
   url: 'https://tu-proyecto.supabase.co', // ← Tu Project URL
   anonKey: 'tu-anon-key-aqui', // ← Tu anon public key
   ```

### 5. Crear las tablas en Supabase
1. Ve a **SQL Editor** en tu dashboard de Supabase
2. Crea un nuevo query
3. Copia y pega todo el contenido de `SETUP_SQL` del archivo `js/supabase-config.js`
4. Ejecuta el script (botón "Run")

### 6. Configurar CORS
1. Ve a **Settings** → **API**
2. En "Additional Allowed Origins" agrega:
   ```
   https://tu-usuario.github.io
   http://localhost:3000
   http://localhost:5000
   ```
3. Reemplaza `tu-usuario` con tu nombre de usuario de GitHub

### 7. Probar la conexión
1. Abre tu página en el navegador
2. Abre las herramientas de desarrollador (F12)
3. Ve a la pestaña **Console**
4. Deberías ver: "✅ Configuración de Supabase válida"
5. Si hay errores, revisa los pasos anteriores

## 🔧 Solución de problemas

### Error: "Configuración de Supabase inválida"
- Verifica que hayas reemplazado la URL y anon key en `supabase-config.js`
- Asegúrate de que las credenciales sean correctas

### Error: "No se pudo conectar a la base de datos"
- Verifica que hayas ejecutado el script SQL
- Revisa que las políticas de seguridad estén configuradas
- Verifica tu conexión a internet

### Error: "CORS policy"
- Asegúrate de haber agregado tu dominio a "Additional Allowed Origins"
- Si usas GitHub Pages, agrega: `https://tu-usuario.github.io`

### Los datos no se guardan
- Verifica que las tablas se hayan creado correctamente
- Revisa que las políticas de seguridad permitan inserción
- Verifica la consola del navegador para errores

## 📊 Verificar que todo funciona

### 1. Verificar tablas creadas
1. Ve a **Table Editor** en Supabase
2. Deberías ver estas tablas:
   - `config`
   - `timeline`
   - `gallery`
   - `suggestions`
   - `replies`

### 2. Verificar datos por defecto
1. Haz clic en la tabla `config`
2. Deberías ver una fila con los datos por defecto
3. Haz clic en `timeline` - deberías ver 3 eventos
4. Haz clic en `gallery` - deberías ver 6 fotos

### 3. Probar funcionalidad
1. Agrega un nuevo evento en el timeline
2. Envía una sugerencia
3. Verifica que aparezca en Supabase

## 🎯 Características de Supabase

### ✅ Ventajas
- **Gratis**: 500MB de base de datos, 50,000 filas
- **Tiempo real**: Los cambios se sincronizan automáticamente
- **Seguro**: HTTPS automático, políticas de seguridad
- **Escalable**: Puedes migrar a planes pagados después
- **Fácil**: Dashboard web intuitivo

### 🔄 Sincronización en tiempo real
- Los cambios se reflejan automáticamente en todos los dispositivos
- No necesitas refrescar la página
- Perfecto para uso compartido

### 📱 Compatibilidad
- Funciona en cualquier dispositivo
- Compatible con GitHub Pages
- Funciona con dominios personalizados

## 🚀 Subir a GitHub

### 1. Subir el código
```bash
git add .
git commit -m "Integración con Supabase completada"
git push origin main
```

### 2. Activar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Ve a **Settings** → **Pages**
3. En "Source" selecciona "Deploy from a branch"
4. Selecciona la rama `main`
5. Haz clic en "Save"

### 3. Tu sitio estará disponible en:
```
https://tu-usuario.github.io/page
```

## 🎉 ¡Listo!

Tu página de amor ahora tiene:
- ✅ Base de datos en la nube
- ✅ Sincronización en tiempo real
- ✅ Datos seguros y respaldados
- ✅ Funciona desde cualquier dispositivo
- ✅ Completamente gratis

¡Disfruta tu página de amor con Supabase! ❤️🌻 