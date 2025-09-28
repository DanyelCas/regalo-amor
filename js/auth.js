// Sistema de autenticación romántico para la página de amor
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.userData = null;
        
        // Cargar usuario desde localStorage si existe
        this.loadStoredUser();
    }

    // Función MD5 para encriptar contraseñas
    md5(string) {
        function md5cycle(x, k) {
            var a = x[0], b = x[1], c = x[2], d = x[3];
            a = ff(a, b, c, d, k[0], 7, -680876936);
            d = ff(d, a, b, c, k[1], 12, -389564586);
            c = ff(c, d, a, b, k[2], 17, 606105819);
            b = ff(b, c, d, a, k[3], 22, -1044525330);
            a = ff(a, b, c, d, k[4], 7, -176418897);
            d = ff(d, a, b, c, k[5], 12, 1200080426);
            c = ff(c, d, a, b, k[6], 17, -1473231341);
            b = ff(b, c, d, a, k[7], 22, -45705983);
            a = ff(a, b, c, d, k[8], 7, 1770035416);
            d = ff(d, a, b, c, k[9], 12, -1958414417);
            c = ff(c, d, a, b, k[10], 17, -42063);
            b = ff(b, c, d, a, k[11], 22, -1990404162);
            a = ff(a, b, c, d, k[12], 7, 1804603682);
            d = ff(d, a, b, c, k[13], 12, -40341101);
            c = ff(c, d, a, b, k[14], 17, -1502002290);
            b = ff(b, c, d, a, k[15], 22, 1236535329);
            a = gg(a, b, c, d, k[1], 5, -165796510);
            d = gg(d, a, b, c, k[6], 9, -1069501632);
            c = gg(c, d, a, b, k[11], 14, 643717713);
            b = gg(b, c, d, a, k[0], 20, -373897302);
            a = gg(a, b, c, d, k[5], 5, -701558691);
            d = gg(d, a, b, c, k[10], 9, 38016083);
            c = gg(c, d, a, b, k[15], 14, -660478335);
            b = gg(b, c, d, a, k[4], 20, -405537848);
            a = gg(a, b, c, d, k[9], 5, 568446438);
            d = gg(d, a, b, c, k[14], 9, -1019803690);
            c = gg(c, d, a, b, k[3], 14, -187363961);
            b = gg(b, c, d, a, k[8], 20, 1163531501);
            a = gg(a, b, c, d, k[13], 5, -1444681467);
            d = gg(d, a, b, c, k[2], 9, -51403784);
            c = gg(c, d, a, b, k[7], 14, 1735328473);
            b = gg(b, c, d, a, k[12], 20, -1926607734);
            a = hh(a, b, c, d, k[5], 4, -378558);
            d = hh(d, a, b, c, k[8], 11, -2022574463);
            c = hh(c, d, a, b, k[11], 16, 1839030562);
            b = hh(b, c, d, a, k[14], 23, -35309556);
            a = hh(a, b, c, d, k[1], 4, -1530992060);
            d = hh(d, a, b, c, k[4], 11, 1272893353);
            c = hh(c, d, a, b, k[7], 16, -155497632);
            b = hh(b, c, d, a, k[10], 23, -1094730640);
            a = hh(a, b, c, d, k[13], 4, 681279174);
            d = hh(d, a, b, c, k[0], 11, -358537222);
            c = hh(c, d, a, b, k[3], 16, -722521979);
            b = hh(b, c, d, a, k[6], 23, 76029189);
            a = hh(a, b, c, d, k[9], 4, -640364487);
            d = hh(d, a, b, c, k[12], 11, -421815835);
            c = hh(c, d, a, b, k[15], 16, 530742520);
            b = hh(b, c, d, a, k[2], 23, -995338651);
            a = ii(a, b, c, d, k[0], 6, -198630844);
            d = ii(d, a, b, c, k[7], 10, 1126891415);
            c = ii(c, d, a, b, k[14], 15, -1416354905);
            b = ii(b, c, d, a, k[5], 21, -57434055);
            a = ii(a, b, c, d, k[12], 6, 1700485571);
            d = ii(d, a, b, c, k[3], 10, -1894986606);
            c = ii(c, d, a, b, k[10], 15, -1051523);
            b = ii(b, c, d, a, k[1], 21, -2054922799);
            a = ii(a, b, c, d, k[8], 6, 1873313359);
            d = ii(d, a, b, c, k[15], 10, -30611744);
            c = ii(c, d, a, b, k[6], 15, -1560198380);
            b = ii(b, c, d, a, k[13], 21, 1309151649);
            a = ii(a, b, c, d, k[4], 6, -145523070);
            d = ii(d, a, b, c, k[11], 10, -1120210379);
            c = ii(c, d, a, b, k[2], 15, 718787259);
            b = ii(b, c, d, a, k[9], 21, -343485551);
            x[0] = add32(a, x[0]);
            x[1] = add32(b, x[1]);
            x[2] = add32(c, x[2]);
            x[3] = add32(d, x[3]);
        }

        function cmn(q, a, b, x, s, t) {
            a = add32(add32(a, q), add32(x, t));
            return add32((a << s) | (a >>> (32 - s)), b);
        }

        function ff(a, b, c, d, x, s, t) {
            return cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }

        function gg(a, b, c, d, x, s, t) {
            return cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }

        function hh(a, b, c, d, x, s, t) {
            return cmn(b ^ c ^ d, a, b, x, s, t);
        }

        function ii(a, b, c, d, x, s, t) {
            return cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

        function md5blk(s) {
            var md5blks = [], i;
            for (i = 0; i < 64; i += 4) {
                md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
            }
            return md5blks;
        }

        var hex_chr = '0123456789abcdef'.split('');

        function rhex(n) {
            var s = '', j = 0;
            for (; j < 4; j++) {
                s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
            }
            return s;
        }

        function hex(x) {
            for (var i = 0; i < x.length; i++) {
                x[i] = rhex(x[i]);
            }
            return x.join('');
        }

        function add32(a, b) {
            return (a + b) & 0xFFFFFFFF;
        }

        if (string.length > 0) {
            var n = string.length, msg = string, i;
            var msg8 = new Array(1 + ((n + 8) >> 6));
            for (i = 0; i < msg8.length; i++) {
                msg8[i] = 0;
            }
            for (i = 0; i < n; i++) {
                msg8[i >> 2] |= string.charCodeAt(i) << ((i % 4) * 8);
            }
            msg8[i >> 2] |= 0x80 << ((i % 4) * 8);
            msg8[msg8.length - 2] = n << 3;
            msg8[msg8.length - 1] = n >>> 29;
            var x = [1732584193, -271733879, -1732584194, 271733878];
            for (i = 0; i < msg8.length; i += 16) {
                md5cycle(x, msg8.slice(i, i + 16));
            }
            return hex(x);
        } else {
            return '';
        }
    }

    // Cargar usuario almacenado
    loadStoredUser() {
        try {
            const stored = localStorage.getItem('lovePageUser');
            if (stored) {
                const userData = JSON.parse(stored);
                this.currentUser = userData.usuario;
                this.userData = userData;
                this.isAuthenticated = true;
            }
        } catch (error) {
            console.error('Error cargando usuario:', error);
            this.logout();
        }
    }

    // Guardar usuario en localStorage
    saveUser(userData) {
        try {
            localStorage.setItem('lovePageUser', JSON.stringify(userData));
            this.currentUser = userData.usuario;
            this.userData = userData;
            this.isAuthenticated = true;
        } catch (error) {
            console.error('Error guardando usuario:', error);
        }
    }

    // Limpiar datos de usuario
    clearUser() {
        localStorage.removeItem('lovePageUser');
        this.currentUser = null;
        this.userData = null;
        this.isAuthenticated = false;
    }

    // Cargar usuarios disponibles desde la base de datos (simplificado)
    async loadAvailableUsers() {
        try {
            await this.waitForSupabase();

            const { data, error } = await dataManager.supabase
                .from('users')
                .select('usuario, real_name');

            if (error) {
                console.error('Error cargando usuarios:', error);
                return [];
            }

            return data || [];
        } catch (error) {
            console.error('Error en loadAvailableUsers:', error);
            return [];
        }
    }

    // Esperar a que Supabase esté disponible
    async waitForSupabase() {
        let attempts = 0;
        const maxAttempts = 50; // 5 segundos máximo
        
        while ((!dataManager || !dataManager.supabase) && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (!dataManager || !dataManager.supabase) {
            throw new Error('Supabase no está disponible');
        }

        // Verificar que la API key esté configurada
        if (!dataManager.supabaseKey || dataManager.supabaseKey === 'tu-anon-key') {
            throw new Error('API key de Supabase no configurada correctamente');
        }

        console.log('Supabase verificado y listo para usar');
    }

    // Iniciar sesión (simplificado)
    async login(usuario, password) {
        try {
            await this.waitForSupabase();

            // Hashear contraseña con MD5
            const hashedPassword = this.md5(password);

            // Verificar usuario y contraseña en la base de datos
            const { data, error } = await dataManager.supabase
                .from('users')
                .select('*')
                .eq('usuario', usuario)
                .eq('password', hashedPassword)
                .single();


            if (error || !data) {
                return { success: false, message: 'Usuario o contraseña incorrectos' };
            }

            // Guardar usuario y autenticar
            this.saveUser(data);
            this.showWelcomeMessage(data.usuario);

            let message = "";
            if(data.usuario === 'foquito'){
                message = "Bienvenido Daniel, no olvides amar a tu amorcito y demostrárselo todos los días 💕";
            }
            if(data.usuario === 'amuletito'){
                message = "Bienvenida Betzi, no olvides amar a tu amorcito y demostrárselo todos los días 💕";
            }

            return { success: true, message: message };

        } catch (error) {
            console.error('Error en login:', error);
            return { success: false, message: 'Error de conexión. Intenta de nuevo.' };
        }
    }

    // Cerrar sesión
    logout() {
        this.clearUser();
        this.showLogoutMessage();
        // Recargar la página para limpiar el estado
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    // Verificar si el usuario puede escribir en un buzón específico (método legacy)
    canWriteInMailboxLegacy(mailboxOwner) {
        return this.canWriteInMailbox(mailboxOwner);
    }

    // Obtener nombre real del usuario actual
    getCurrentUserRealName() {
        return this.userData ? this.userData.usuario : 'Invitado';
    }

    // Obtener rol del usuario actual
    getCurrentUserRole() {
        if (!this.isAuthenticated) return 'guest';
        if (this.currentUser === 'foquito') return 'daniel';
        if (this.currentUser === 'amuletito') return 'betzi';
        return 'guest';
    }

    // Verificar permisos específicos
    hasPermission(action, resource = null) {
        const role = this.getCurrentUserRole();
        
        // Definir permisos por rol
        const permissions = {
            guest: {
                // Solo puede ver
                view: true,
                create: false,
                edit: false,
                delete: false,
                admin: false,
                config: false
            },
            betzi: {
                // Control total excepto configuraciones
                view: true,
                create: true,
                edit: true,
                delete: true,
                admin: false,
                config: false
            },
            daniel: {
                // Control total incluyendo configuraciones
                view: true,
                create: true,
                edit: true,
                delete: true,
                admin: true,
                config: true
            }
        };

        // Verificar permisos específicos
        if (resource === 'mailbox') {
            if (action === 'write') {
                // Restricción especial: no pueden escribir en su propio buzón
                if (role === 'daniel' && this.currentUser === 'foquito') return false;
                if (role === 'betzi' && this.currentUser === 'amuletito') return false;
                return permissions[role].create;
            }
            if (action === 'reply') {
                // Pueden responder en cualquier buzón
                return permissions[role].create;
            }
        }

        return permissions[role][action] || false;
    }

    // Verificar si puede ver el panel de administración
    canAccessAdmin() {
        return this.hasPermission('admin');
    }

    // Verificar si puede ver configuraciones
    canAccessConfig() {
        return this.hasPermission('config');
    }

    // Verificar si puede crear/editar/eliminar timeline
    canManageTimeline() {
        return this.hasPermission('create') && this.hasPermission('edit') && this.hasPermission('delete');
    }

    // Verificar si puede crear/editar/eliminar galería
    canManageGallery() {
        return this.hasPermission('create') && this.hasPermission('edit') && this.hasPermission('delete');
    }

    // Verificar si puede escribir en buzón específico
    canWriteInMailbox(mailboxOwner) {
        if (!this.isAuthenticated) return false; // Invitados no pueden escribir
        
        // Los usuarios autenticados no pueden escribir en su propio buzón
        if (this.currentUser === 'foquito' && mailboxOwner === 'Daniel') return false;
        if (this.currentUser === 'amuletito' && mailboxOwner === 'Betzi') return false;
        
        return this.hasPermission('create');
    }

    // Mostrar mensaje de bienvenida
    showWelcomeMessage(realName) {
        let message = "";
        if(realName === 'foquito') {
            message = "¡Bienvenido, Daniel!";
        } else if(realName === 'amuletito') {
            message = "¡Bienvenida, mi Betzi!";
        } else {
            message = "¡Bienvenido/a!";
        }
        const welcomeDiv = document.createElement('div');
        welcomeDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff6b9d, #ffd93d);
            color: white;
            padding: 30px;
            border-radius: 20px;
            z-index: 10000;
            font-family: 'Dancing Script', cursive;
            font-size: 24px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(255, 107, 157, 0.3);
            animation: welcomePulse 2s ease-in-out;
        `;
        
        welcomeDiv.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 15px;">💕</div>
            <div>${message}</div>
            <div style="font-size: 35px; margin-top: 10px; opacity: 0.9;">
                Nuestra página de amor te espera 🌻
            </div>
        `;

        // Agregar animación CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes welcomePulse {
                0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(welcomeDiv);
        
        setTimeout(() => {
            welcomeDiv.remove();
            style.remove();
        }, 3000);
    }

    // Mostrar mensaje de despedida
    showLogoutMessage() {
        const logoutDiv = document.createElement('div');
        logoutDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg,rgb(13, 112, 30),rgb(187, 164, 71));
            color: #fff;
            padding: 35px 40px;
            border-radius: 20px;
            z-index: 10000;
            font-family: 'Dancing Script', cursive;
            font-size: 24px;
            text-align: center;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
            animation: fadeInScale 0.5s ease forwards;
        `;

        logoutDiv.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 15px;">👋</div>
            <div style="font-weight: bold;">¡Hasta pronto!</div>
            <div style="font-size: 30px; margin-top: 10px; opacity: 0.95;">
                No olvides volver prontito💕
            </div>
        `;

        // Animación CSS para aparecer y escalar suavemente
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeInScale {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);


        document.body.appendChild(logoutDiv);
        
        setTimeout(() => {
            logoutDiv.remove();
        }, 2000);
    }
}

// Instancia global del gestor de autenticación
const authManager = new AuthManager();
