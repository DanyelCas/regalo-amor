# 💕 Sistema de Login Romántico

## 🌟 Características del Sistema de Autenticación

El sistema de login romántico permite a Daniel y Betzi acceder a funciones especiales mientras mantiene la privacidad de sus buzones de amor.

### 👥 Usuarios del Sistema

| Usuario | Nombre Real | Contraseña | Descripción |
|---------|-------------|------------|-------------|
| `foquito` | Daniel | `hello` | Acceso completo para Daniel |
| `amuletito` | Betzi | `hello` | Acceso completo para Betzi |

### 🔐 Funcionalidades de Autenticación

#### ✅ **Acceso Completo (Usuarios Autenticados)**
- Ver todo el contenido de la página
- Agregar momentos al timeline
- Subir fotos a la galería
- Responder a mensajes en cualquier buzón
- Acceso al panel de administración
- Exportar/importar datos

#### 🚫 **Restricciones Especiales**
- **No pueden escribir en su propio buzón**: Daniel no puede escribir en el buzón de Daniel, Betzi no puede escribir en el buzón de Betzi
- **Sí pueden responder**: Ambos pueden responder a mensajes en cualquier buzón
- **Sí pueden ver**: Pueden ver todos los mensajes de ambos buzones

#### 👋 **Acceso de Invitado**
- Ver todo el contenido público
- Escribir en cualquier buzón (sin restricciones)
- No pueden acceder al panel de administración
- No pueden exportar/importar datos

## 🎨 Interfaz de Login

### 💫 **Modal de Login Romántico**
- Diseño con gradientes románticos (rosa, amarillo, verde)
- Animación de corazón latiente
- Formulario elegante con efectos de focus
- Información de usuarios disponibles
- Opción de continuar como invitado

### 🔄 **Estados de la Interfaz**

#### **No Autenticado**
- Modal de login visible al cargar la página
- Botón de logout oculto
- Buzones sin restricciones

#### **Autenticado**
- Modal de login oculto
- Botón de logout visible (esquina inferior derecha)
- Buzones con restricciones aplicadas
- Mensaje de bienvenida personalizado

## 🛠️ Implementación Técnica

### 📁 **Archivos del Sistema**

```
js/
├── auth.js          # Lógica de autenticación y MD5
├── auth-ui.js       # Interfaz de usuario del login
└── supabase-config.js # Configuración de tabla users
```

### 🗄️ **Base de Datos**

#### **Tabla `users`**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    usuario TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,  -- MD5 hash
    real_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **Usuarios por Defecto**
```sql
INSERT INTO users (usuario, password, real_name) VALUES
('foquito', '5d41402abc4b2a76b9719d911017c592', 'Daniel'),  -- "hello" en MD5
('amuletito', '5d41402abc4b2a76b9719d911017c592', 'Betzi');  -- "hello" en MD5
```

### 🔒 **Seguridad**

#### **Encriptación MD5**
- Las contraseñas se almacenan como hash MD5
- Función MD5 implementada en JavaScript
- Contraseña por defecto: `hello` (hash: `5d41402abc4b2a76b9719d911017c592`)

#### **Validaciones**
- Verificación de usuario y contraseña en Supabase
- Restricciones de buzones en tiempo real
- Persistencia de sesión en localStorage

## 🚀 **Cómo Usar el Sistema**

### 1. **Primer Acceso**
1. Abre la página web
2. Aparecerá el modal de login automáticamente
3. Ingresa las credenciales:
   - **Para Daniel**: `foquito` / `hello`
   - **Para Betzi**: `amuletito` / `hello`
   - **Como invitado**: Haz clic en "Continuar como Invitado"

### 2. **Cambiar Contraseñas**
Para cambiar las contraseñas, actualiza la tabla `users` en Supabase:

```sql
-- Cambiar contraseña de Daniel a "nuevapassword"
UPDATE users 
SET password = MD5('nuevapassword') 
WHERE usuario = 'foquito';

-- Cambiar contraseña de Betzi a "miramor"
UPDATE users 
SET password = MD5('miramor') 
WHERE usuario = 'amuletito';
```

### 3. **Agregar Nuevos Usuarios**
```sql
INSERT INTO users (usuario, password, real_name) VALUES
('nuevousuario', MD5('contraseña'), 'Nombre Real');
```

## 🎯 **Flujo de Usuario**

### **Daniel (foquito)**
1. Inicia sesión con `foquito` / `hello`
2. Ve mensaje de bienvenida personalizado
3. Puede escribir en el buzón de Betzi
4. **No puede** escribir en su propio buzón (Daniel)
5. Puede responder a cualquier mensaje
6. Acceso completo a todas las funciones

### **Betzi (amuletito)**
1. Inicia sesión con `amuletito` / `hello`
2. Ve mensaje de bienvenida personalizado
3. Puede escribir en el buzón de Daniel
4. **No puede** escribir en su propio buzón (Betzi)
5. Puede responder a cualquier mensaje
6. Acceso completo a todas las funciones

### **Invitado**
1. Hace clic en "Continuar como Invitado"
2. Ve todo el contenido público
3. Puede escribir en cualquier buzón
4. No tiene restricciones de buzones
5. Acceso limitado a funciones administrativas

## 🔧 **Personalización**

### **Cambiar Colores del Login**
Edita `css/components.css` en la sección `LOGIN ROMÁNTICO`:

```css
.login-modal {
    background: linear-gradient(135deg, #tu-color-1, #tu-color-2, #tu-color-3);
}
```

### **Modificar Mensajes**
Edita `js/auth.js` en las funciones de mensajes:

```javascript
showWelcomeMessage(realName) {
    // Personaliza el mensaje de bienvenida
}
```

### **Agregar Validaciones**
Extiende `js/auth.js` para agregar validaciones personalizadas:

```javascript
async login(usuario, password) {
    // Agregar validaciones personalizadas aquí
}
```

## 🐛 **Solución de Problemas**

### **Error: "Usuario o contraseña incorrectos"**
1. Verifica que el usuario existe en la tabla `users`
2. Confirma que la contraseña está encriptada con MD5
3. Revisa la conexión a Supabase

### **Error: "Supabase no está inicializado"**
1. Verifica la configuración en `js/supabase-config.js`
2. Confirma que la URL y anon key son correctas
3. Revisa la consola del navegador para errores

### **Restricciones no funcionan**
1. Verifica que `authManager` esté disponible globalmente
2. Confirma que `canWriteInMailbox()` se está llamando correctamente
3. Revisa que el usuario esté autenticado

## 📱 **Compatibilidad**

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Móviles y tablets
- ✅ GitHub Pages
- ✅ Dominios personalizados
- ✅ Modo offline (con datos en localStorage)

## 🎉 **¡Listo!**

Tu página de amor ahora tiene un sistema de login romántico completo que:

- ✅ Protege la privacidad de los buzones
- ✅ Permite acceso personalizado
- ✅ Mantiene la experiencia romántica
- ✅ Es fácil de usar y personalizar
- ✅ Funciona en todos los dispositivos

¡Disfruta tu página de amor con el nuevo sistema de autenticación! 💕🌻
