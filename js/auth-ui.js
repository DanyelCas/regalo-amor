// Interfaz de usuario para el sistema de autenticación
class AuthUI {
    constructor() {
        this.loginModal = null;
        this.loginForm = null;
        this.logoutBtn = null;
        this.initialized = false;
        
        // Inicializar con un pequeño retraso para asegurar que todo esté cargado
        setTimeout(() => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.init());
            } else {
                this.init();
            }
        }, 500);
    }

    // Inicializar la interfaz
    async init() {
        if (this.initialized) return;
        
        this.loginModal = document.getElementById('loginModal');
        this.loginForm = document.getElementById('loginForm');
        this.logoutBtn = document.getElementById('logoutBtn');
        
        if (!this.loginModal || !this.loginForm) {
            console.log('Elementos del login no encontrados, reintentando...');
            setTimeout(() => this.init(), 100);
            return;
        }
        
        this.setupEventListeners();
        await this.loadUserInfo();
        this.checkAuthStatus();
        this.initialized = true;
    }

    // Cargar información de usuarios desde la base de datos (simplificado)
    async loadUserInfo() {
        // No necesitamos cargar usuarios, solo mostrar mensaje simple
        const loginInfo = document.querySelector('.login-info');
        if (loginInfo) {
            loginInfo.innerHTML = `
                <p><strong>Ingresa tus credenciales:</strong></p>
                <p>💫 <strong>foquito</strong> - Para Daniel</p>
                <p>✨ <strong>amuletito</strong> - Para Betzi</p>
            `;
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


    // Configurar event listeners
    setupEventListeners() {
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // NO cerrar modal al hacer clic fuera - solo con "Continuar como invitado"
    }

    // Verificar estado de autenticación
    checkAuthStatus() {
        if (authManager.isAuthenticated) {
            this.showAuthenticatedUI();
        } else {
            // Verificar si ya se cerró el modal (usuario eligió continuar como invitado)
            const loginModal = document.getElementById('loginModal');
            if (loginModal && loginModal.style.display === 'none') {
                this.showGuestUI();
            } else {
                this.showLoginModal();
            }
        }
    }

    // Mostrar modal de login
    showLoginModal() {
        if (this.loginModal) {
            this.loginModal.style.display = 'flex';
            // Enfocar el primer input
            const firstInput = this.loginModal.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    // Ocultar modal de login
    hideLoginModal() {
        if (this.loginModal) {
            this.loginModal.style.display = 'none';
        }
    }

    // Manejar el proceso de login
    async handleLogin() {
        const usuario = document.getElementById('loginUsuario').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!usuario || !password) {
            this.showMessage('Por favor, completa todos los campos', 'error');
            return;
        }

        // Mostrar loading
        const submitBtn = this.loginForm.querySelector('.login-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>⏳ Iniciando sesión...</span>';
        submitBtn.disabled = true;

        try {
            // Esperar a que Supabase esté disponible antes del login
            await this.waitForSupabase();
            
            const result = await authManager.login(usuario, password);
            
            if (result.success) {
                
                this.hideLoginModal();
                this.showAuthenticatedUI();
                this.showMessage(result.message, 'success');
                // Recargar la página para limpiar el estado
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                
            } else {
                this.showMessage(result.message, 'error');
            }
        } catch (error) {
            console.error('Error en login:', error);
            if (error.message.includes('API key')) {
                this.showMessage('Error de configuración. Verifica la configuración de Supabase.', 'error');
            } else {
                this.showMessage('Error de conexión. Intenta de nuevo.', 'error');
            }
        } finally {
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    // Login como invitado
    loginAsGuest() {
        // No establecer autenticación, solo ocultar modal y mostrar UI
        this.hideLoginModal();
        this.showGuestUI();
        this.showMessage('¡Bienvenido como invitado! Puedes ver todo el contenido, pero necesitas iniciar sesión para escribir mensajes 💕', 'success');
    }

    // Mostrar interfaz de invitado
    showGuestUI() {
        // Ocultar modal de login
        this.hideLoginModal();
        
        // Ocultar botón de logout (no está autenticado)
        if (this.logoutBtn) {
            this.logoutBtn.style.display = 'none';
        }

        // Actualizar todos los permisos (invitado)
        this.updateAllPermissions();
    }

    // Cerrar sesión
    logout() {
        if (confirm('¿Estás seguro de que quieres cerrar sesión? 💔')) {
            authManager.logout();
        }
    }

    // Mostrar interfaz autenticada
    showAuthenticatedUI() {
        // Ocultar modal de login
        this.hideLoginModal();
        
        // Mostrar botón de logout
        if (this.logoutBtn) {
            this.logoutBtn.style.display = 'block';
        }

        // Actualizar todos los permisos de la interfaz
        this.updateAllPermissions();
        
        // Mostrar mensaje de bienvenida si es usuario autenticado
        if (authManager.isAuthenticated) {
            const welcomeMsg = document.createElement('div');
            welcomeMsg.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #6bcf7f, #8dd3a0);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                z-index: 1000;
                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                box-shadow: 0 4px 15px rgba(107, 207, 127, 0.3);
                animation: slideInRight 0.5s ease-out;
            `;
            welcomeMsg.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 5px;">👋 ¡Hola mi ${authManager.getCurrentUserRealName()}!</div>
            `;

            // Agregar animación CSS
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);

            document.body.appendChild(welcomeMsg);
            
            setTimeout(() => {
                welcomeMsg.remove();
                style.remove();
            }, 4000);
        }
    }

    // Actualizar todos los permisos de la interfaz
    updateAllPermissions() {
        this.updateMailboxRestrictions();
        this.updateTimelinePermissions();
        this.updateGalleryPermissions();
        this.updateAdminPermissions();
    }

    // Actualizar permisos del timeline
    updateTimelinePermissions() {
        const addTimelineBtn = document.querySelector('.add-timeline-btn');
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        if (addTimelineBtn) {
            if (authManager.canManageTimeline()) {
                addTimelineBtn.style.display = 'block';
            } else {
                addTimelineBtn.style.display = 'none';
            }
        }

        // Ocultar botones de edición/eliminación en timeline
        timelineItems.forEach(item => {
            const editBtn = item.querySelector('.edit-btn');
            const deleteBtn = item.querySelector('.delete-btn');
            
            if (editBtn) {
                editBtn.style.display = authManager.canManageTimeline() ? 'block' : 'none';
            }
            if (deleteBtn) {
                deleteBtn.style.display = authManager.canManageTimeline() ? 'block' : 'none';
            }
        });
    }

    // Actualizar permisos de la galería
    updateGalleryPermissions() {
        const addGalleryBtn = document.querySelector('.add-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        if (addGalleryBtn) {
            if (authManager.canManageGallery()) {
                addGalleryBtn.style.display = 'block';
            } else {
                addGalleryBtn.style.display = 'none';
            }
        }

        // Ocultar botones de edición/eliminación en galería
        galleryItems.forEach(item => {
            const editBtn = item.querySelector('.edit-btn');
            const deleteBtn = item.querySelector('.delete-btn');
            
            if (editBtn) {
                editBtn.style.display = authManager.canManageGallery() ? 'block' : 'none';
            }
            if (deleteBtn) {
                deleteBtn.style.display = authManager.canManageGallery() ? 'block' : 'none';
            }
        });
    }

    // Actualizar permisos del panel de administración
    updateAdminPermissions() {
        const adminToggle = document.querySelector('.admin-toggle');
        
        if (adminToggle) {
            if (authManager.canAccessAdmin()) {
                adminToggle.style.display = 'block';
            } else {
                adminToggle.style.display = 'none';
            }
        }
    }

    // Actualizar restricciones de buzones
    updateMailboxRestrictions() {
        const danielTextarea = document.getElementById('danielSuggestion');
        const betziTextarea = document.getElementById('betziSuggestion');
        const loginPrompt = document.getElementById('loginPrompt');
        
        if (danielTextarea && betziTextarea) {
            const role = authManager.getCurrentUserRole();
            
            if (role === 'guest') {
                // Los invitados NO pueden escribir en ningún buzón
                danielTextarea.disabled = true;
                betziTextarea.disabled = true;
                danielTextarea.placeholder = '🔒 Inicia sesión para escribir mensajes de amor 💕';
                betziTextarea.placeholder = '🔒 Inicia sesión para escribir mensajes de amor 💕';
                
                // Mostrar prompt de login
                if (loginPrompt) {
                    loginPrompt.style.display = 'block';
                }
            } else {
                // Ocultar prompt de login
                if (loginPrompt) {
                    loginPrompt.style.display = 'none';
                }
                
                // Aplicar restricciones según permisos
                const canWriteDaniel = authManager.canWriteInMailbox('Daniel');
                const canWriteBetzi = authManager.canWriteInMailbox('Betzi');
                
                danielTextarea.disabled = !canWriteDaniel;
                betziTextarea.disabled = !canWriteBetzi;
                
                if (!canWriteDaniel) {
                    danielTextarea.placeholder = 'No puedes escribir en tu propio buzón, pero puedes responder a los mensajes de Betzi 💕';
                } else {
                    danielTextarea.placeholder = 'Escribe aquí tu sugerencia, pensamiento o mensaje para Betzi... 💕';
                }
                
                if (!canWriteBetzi) {
                    betziTextarea.placeholder = 'No puedes escribir en tu propio buzón, pero puedes responder a los mensajes de Daniel 💕';
                } else {
                    betziTextarea.placeholder = 'Escribe aquí tu sugerencia, pensamiento o mensaje para Daniel... 💕';
                }
            }
        }
    }

    // Mostrar mensaje
    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            font-weight: 500;
            max-width: 300px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.5s ease-out;
        `;

        // Colores según el tipo
        switch (type) {
            case 'success':
                messageDiv.style.background = 'linear-gradient(135deg, #6bcf7f, #8dd3a0)';
                messageDiv.style.color = 'white';
                break;
            case 'error':
                messageDiv.style.background = 'linear-gradient(135deg, #ff6b9d, #ff8fab)';
                messageDiv.style.color = 'white';
                break;
            case 'warning':
                messageDiv.style.background = 'linear-gradient(135deg, #ffd93d, #ffed4e)';
                messageDiv.style.color = '#8B4513';
                break;
            default:
                messageDiv.style.background = 'linear-gradient(135deg, #6bcf7f, #8dd3a0)';
                messageDiv.style.color = 'white';
        }

        messageDiv.innerHTML = message;

        // Agregar animación CSS si no existe
        if (!document.querySelector('#messageAnimation')) {
            const style = document.createElement('style');
            style.id = 'messageAnimation';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(messageDiv);
        
        // Auto-remover después de 4 segundos
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 500);
        }, 4000);
    }

    // Verificar si el usuario puede escribir en un buzón específico
    canWriteInMailbox(mailboxOwner) {
        return authManager.canWriteInMailbox(mailboxOwner);
    }

    // Obtener información del usuario actual
    getCurrentUserInfo() {
        if (authManager.isAuthenticated) {
            return {
                usuario: authManager.currentUser,
                realName: authManager.userData.usuario,
                isAuthenticated: true
            };
        }
        return {
            usuario: 'guest',
            realName: 'Invitado',
            isAuthenticated: false
        };
    }
}

// Instancia global de la interfaz de autenticación
const authUI = new AuthUI();
