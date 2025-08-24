// Utilidades y funciones auxiliares
class Utils {

    static editando = false;
    // Calcular días entre dos fechas
    static calculateDaysDifference(startDate, endDate = new Date()) {
        const timeDiff = endDate.getTime() - startDate.getTime();
        return Math.floor(timeDiff / (1000 * 3600 * 24));
    }

    // Efecto de escritura automática
    static typeWriter(element, text, speed = CONFIG.ANIMATIONS.TYPING_SPEED) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Cambiar mensaje aleatorio
    static async changeRandomMessage() {
        try {
            const config = await dataManager.loadConfig();
            const messageElement = document.getElementById('randomMessage');
            if (messageElement && config.messages && config.messages.romantic) {
                const messages = config.messages.romantic;
                const randomIndex = Math.floor(Math.random() * messages.length);
                const newMessage = messages[randomIndex];
                
                messageElement.style.opacity = '0';
                messageElement.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    messageElement.textContent = newMessage;
                    messageElement.style.opacity = '1';
                    messageElement.style.transform = 'scale(1)';
                }, 300);
            }
        } catch (error) {
            console.error('Error cambiando mensaje aleatorio:', error);
            // Fallback a valores por defecto
            const messageElement = document.getElementById('randomMessage');
            if (messageElement) {
                const messages = CONFIG.MESSAGES.ROMANTIC;
                const randomIndex = Math.floor(Math.random() * messages.length);
                const newMessage = messages[randomIndex];
                
                messageElement.style.opacity = '0';
                messageElement.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    messageElement.textContent = newMessage;
                    messageElement.style.opacity = '1';
                    messageElement.style.transform = 'scale(1)';
                }, 300);
            }
        }
    }

    // Mostrar notificación especial
    static async showSpecialNotification(message = null) {
        try {
            const config = await dataManager.loadConfig();
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #ff6b6b, #f093fb);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideInRight 0.5s ease-out;
                font-family: 'Dancing Script', cursive;
                font-size: 1.1rem;
            `;
            notification.textContent = message || config.messages?.notification || CONFIG.MESSAGES.NOTIFICATION;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 3000);
        } catch (error) {
            console.error('Error mostrando notificación:', error);
            // Fallback a valor por defecto
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #ff6b6b, #f093fb);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideInRight 0.5s ease-out;
                font-family: 'Dancing Script', cursive;
                font-size: 1.1rem;
            `;
            notification.textContent = message || CONFIG.MESSAGES.NOTIFICATION;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 3000);
        }
    }

    // Animar elementos al hacer scroll
    static animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const elementsToAnimate = document.querySelectorAll('.timeline-item, .gallery-item, .letter-container');
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Agregar efectos de hover
    static addHoverEffects() {
        // Efectos de hover en galería
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-10px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Efectos mejorados en timeline
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            // Efecto de click con confeti (solo en el contenido, no en botones)
            item.addEventListener('click', (e) => {
                // No activar si se hace clic en botones de edición
                if (e.target.closest('.timeline-actions') || e.target.closest('.edit-btn')) {
                    return;
                }
                
                // Animación del item
                item.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 300);

                // Efecto de confeti desde el marcador
                const marker = item.querySelector('.marker-icon');
                if (marker) {
                    const rect = marker.getBoundingClientRect();
                    const x = rect.left + rect.width / 2;
                    const y = rect.top + rect.height / 2;
                    visualEffects.createHeartExplosion(x, y);
                }

                // Efecto de brillo en el marcador
                marker.style.animation = 'none';
                marker.offsetHeight; // Trigger reflow
                marker.style.animation = 'markerGlow 0.5s ease-in-out';
            });

            // Efecto de hover en el contenido
            const content = item.querySelector('.timeline-content');
            if (content) {
                content.addEventListener('mouseenter', () => {
                    const marker = item.querySelector('.marker-icon');
                    if (marker) {
                        marker.style.transform = 'scale(1.2)';
                        marker.style.boxShadow = '0 8px 30px rgba(255, 215, 0, 0.9)';
                    }
                });

                content.addEventListener('mouseleave', () => {
                    const marker = item.querySelector('.marker-icon');
                    if (marker) {
                        marker.style.transform = 'scale(1)';
                        marker.style.boxShadow = '';
                    }
                });
            }

            // Animación de entrada escalonada
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 200 + (index * 200));
        });
    }

    // Agregar efectos de click especiales
    static addSpecialClickEffects() {
        // Efecto especial al hacer clic en el corazón del header
        const heartElement = document.querySelector('.heart');
        if (heartElement) {
            heartElement.addEventListener('click', (e) => {
                heartElement.style.transform = 'rotate(45deg) scale(1.3)';
                setTimeout(() => {
                    heartElement.style.transform = 'rotate(45deg) scale(1)';
                }, 200);
                visualEffects.createEnhancedRain();
            });
        }
        
        // Efecto especial al hacer clic en los contadores
        const meetingCounterElement = document.getElementById('meetingCounter');
        const relationshipCounterElement = document.getElementById('relationshipCounter');
        
        if (meetingCounterElement) {
            meetingCounterElement.addEventListener('click', (e) => {
                meetingCounterElement.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    meetingCounterElement.style.transform = 'scale(1)';
                }, 200);
                visualEffects.createEnhancedConfetti();
            });
        }
        
        if (relationshipCounterElement) {
            relationshipCounterElement.addEventListener('click', (e) => {
                relationshipCounterElement.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    relationshipCounterElement.style.transform = 'scale(1)';
                }, 200);
                visualEffects.createEnhancedConfetti();
            });
        }

        // Efecto de explosión de corazones al hacer clic en cualquier lugar
        document.addEventListener('click', (e) => {
            // No crear corazones en botones, contadores, o elementos interactivos
            if (e.target.tagName !== 'BUTTON' && 
                !e.target.closest('.counter-item') && 
                !e.target.closest('.timeline-actions') &&
                !e.target.closest('.gallery-actions') &&
                !e.target.closest('.section-header') &&
                !e.target.closest('.admin-toggle') &&
                !e.target.closest('.admin-panel') &&
                !e.target.closest('.modal-overlay') &&
                !e.target.closest('.suggestion-actions') &&
                !e.target.closest('.reply-buttons')) {
                visualEffects.createHeartExplosion(e.clientX, e.clientY);
            }
        });
    }
    static relationshipDate = new Date('2025-05-16T20:30:00');

    // Actualizar contadores
    static async updateCounters() {
        const now = new Date();
        const duration = dateFns.intervalToDuration({ start: this.relationshipDate, end: now });

        const years = duration.years || 0;
        const months = duration.months || 0;
        const days = duration.days || 0;
        const hours = duration.hours || 0;

        // Total minutos y segundos desde start hasta ahora
        const totalMinutes = dateFns.differenceInMinutes(now, this.relationshipDate);
        const totalSeconds = dateFns.differenceInSeconds(now, this.relationshipDate);

        // Minutos "sobrantes" después de horas, días, etc, los calculamos con modulo 60
        const minutes = totalMinutes % 60;

        // Segundos "sobrantes" después de minutos
        const seconds = totalSeconds % 60;

        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    // Inicializar efectos de scroll suave
    static initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Agregar estilos CSS dinámicamente
    static addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes enhanced-rain-fall {
                0% {
                    transform: translateY(-50px) rotate(0deg) translateX(0);
                    opacity: 0.9;
                }
                50% {
                    transform: translateY(50vh) rotate(180deg) translateX(var(--sway, 0px));
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg) translateX(calc(var(--sway, 0px) * 2));
                    opacity: 0;
                }
            }
            
            @keyframes enhanced-confetti-fall {
                0% {
                    transform: translateY(-10px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
            
            @keyframes heart-explosion {
                0% {
                    transform: translate(0, 0) scale(0);
                    opacity: 1;
                }
                50% {
                    transform: translate(var(--end-x), var(--end-y)) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(calc(var(--end-x) * 1.5), calc(var(--end-y) * 1.5)) scale(0);
                    opacity: 0;
                }
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Funciones para manejar sugerencias
    static async initializeSuggestions() {
        // Cargar sugerencias existentes
        await this.loadSuggestions();
        
        // Configurar contadores de caracteres
        this.setupCharCounters();
        
        // Configurar eventos de teclado
        this.setupKeyboardEvents();
    }

    static setupCharCounters() {
        const danielTextarea = document.getElementById('danielSuggestion');
        const betziTextarea = document.getElementById('betziSuggestion');
        const danielCounter = document.getElementById('danielCharCount');
        const betziCounter = document.getElementById('betziCharCount');

        if (danielTextarea && danielCounter) {
            danielTextarea.addEventListener('input', () => {
                danielCounter.textContent = danielTextarea.value.length;
            });
        }

        if (betziTextarea && betziCounter) {
            betziTextarea.addEventListener('input', () => {
                betziCounter.textContent = betziTextarea.value.length;
            });
        }
    }

    static setupKeyboardEvents() {
        const danielTextarea = document.getElementById('danielSuggestion');
        const betziTextarea = document.getElementById('betziSuggestion');

        if (danielTextarea) {
            danielTextarea.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'Enter') {
                    this.sendSuggestion('daniel');
                }
            });
        }

        if (betziTextarea) {
            betziTextarea.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'Enter') {
                    this.sendSuggestion('betzi');
                }
            });
        }
    }

    static async sendSuggestion(person) {
        const textarea = document.getElementById(`${person}Suggestion`);
        const text = textarea.value.trim();

        if (!text) {
            await this.showSpecialNotification('Por favor, escribe algo antes de enviar 💕');
            return;
        }

        // Determinar el destinatario (el otro buzón)
        const recipient = person === 'daniel' ? 'Betzi' : 'Daniel';
        const senderName = person === 'daniel' ? 'Daniel' : 'Betzi';

        try {
            // Guardar en el sistema de datos
            const success = await dataManager.addSuggestion(senderName, recipient, text);

            if (success) {
                // Recargar sugerencias
                await this.loadSuggestions();
                
                // Limpiar textarea del remitente
                textarea.value = '';
                document.getElementById(`${person}CharCount`).textContent = '0';

                // Mostrar notificación
                await this.showSpecialNotification(`¡Mensaje de ${senderName} enviado con amor! 💌`);

                // Efecto visual
                visualEffects.createHeartExplosion(
                    textarea.getBoundingClientRect().left + textarea.offsetWidth / 2,
                    textarea.getBoundingClientRect().top + textarea.offsetHeight / 2
                );

                // Animación de envío de carta
                this.animateLetterSend(textarea);
            } else {
                await this.showSpecialNotification('Error al enviar el mensaje 💔');
            }
        } catch (error) {
            console.error('Error enviando sugerencia:', error);
            await this.showSpecialNotification('Error al enviar el mensaje 💔');
        }
    }

    static async loadSuggestions() {
        try {
            const data = await dataManager.loadData();
            
            // Limpiar contenedores
            const danielContainer = document.getElementById('danielSuggestions');
            const betziContainer = document.getElementById('betziSuggestions');
            
            if (danielContainer) danielContainer.innerHTML = '';
            if (betziContainer) betziContainer.innerHTML = '';
            
            // Cargar sugerencias para cada persona
            data.suggestions.forEach(suggestion => {
                if (suggestion.recipient === 'Daniel') {
                    this.addSuggestionToList('daniel', suggestion);
                } else if (suggestion.recipient === 'Betzi') {
                    this.addSuggestionToList('betzi', suggestion);
                }
            });
        } catch (error) {
            console.error('Error cargando sugerencias:', error);
        }
    }

    static addSuggestionToList(person, suggestion) {
        const container = document.getElementById(`${person}Suggestions`);
        if (!container) return;

        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'suggestion-item';
        suggestionElement.innerHTML = `
            <div class="suggestion-sender">💌 De: ${suggestion.sender}</div>
            <div class="suggestion-text">${this.escapeHtml(suggestion.text)}</div>
            <div class="suggestion-date">${new Date(suggestion.date).toLocaleString('es-ES')}</div>
            <div class="suggestion-actions">
                <button class="reply-btn" onclick="Utils.showReplyForm('${suggestion.id}', '${person}')">
                    💬 Responder
                </button>
            </div>
            <div class="replies-container" id="replies-${suggestion.id}"></div>
        `;

        container.insertBefore(suggestionElement, container.firstChild);
        
        // Cargar respuestas existentes
        this.loadReplies(suggestion.id, suggestion.replies || []);
    }

    static loadReplies(suggestionId, replies) {
        const repliesContainer = document.getElementById(`replies-${suggestionId}`);
        if (!repliesContainer) return;
        
        replies.forEach(reply => {
            const replyElement = document.createElement('div');
            replyElement.className = 'reply-item';
            replyElement.innerHTML = `
                <div class="reply-sender">💬 ${reply.sender}:</div>
                <div class="reply-text">${this.escapeHtml(reply.text)}</div>
                <div class="reply-date">${new Date(reply.date).toLocaleString('es-ES')}</div>
            `;
            repliesContainer.appendChild(replyElement);
        });
    }

    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    static animateLetterSend(textarea) {
        const letter = document.createElement('div');
        letter.innerHTML = '💌';
        letter.style.cssText = `
            position: fixed;
            font-size: 24px;
            z-index: 1000;
            pointer-events: none;
            animation: letterSend 1s ease-out forwards;
        `;
        
        const rect = textarea.getBoundingClientRect();
        letter.style.left = (rect.left + rect.width / 2) + 'px';
        letter.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(letter);
        
        setTimeout(() => {
            if (letter.parentNode) {
                letter.remove();
            }
        }, 1000);
    }

    // Funciones para manejar respuestas
    static showReplyForm(suggestionId, mailboxPerson) {
        const repliesContainer = document.getElementById(`replies-${suggestionId}`);
        if (!repliesContainer) return;

        // Verificar si ya existe un formulario de respuesta
        if (repliesContainer.querySelector('.reply-form')) {
            return;
        }

        const replyForm = document.createElement('div');
        replyForm.className = 'reply-form';
        replyForm.innerHTML = `
            <div class="reply-input-container">
                <textarea class="reply-textarea" placeholder="Escribe tu respuesta..." maxlength="200"></textarea>
                <div class="reply-char-counter">
                    <span class="reply-char-count">0</span>/200
                </div>
                <div class="reply-buttons">
                    <button class="send-reply-btn" onclick="Utils.sendReply('${suggestionId}', '${mailboxPerson}')">
                        💬 Enviar respuesta
                    </button>
                    <button class="cancel-reply-btn" onclick="Utils.cancelReply('${suggestionId}')">
                        ❌ Cancelar
                    </button>
                </div>
            </div>
        `;

        repliesContainer.appendChild(replyForm);

        // Configurar contador de caracteres para la respuesta
        const replyTextarea = replyForm.querySelector('.reply-textarea');
        const replyCharCount = replyForm.querySelector('.reply-char-count');
        
        replyTextarea.addEventListener('input', () => {
            replyCharCount.textContent = replyTextarea.value.length;
        });

        // Focus en el textarea
        replyTextarea.focus();
    }

    static async sendReply(suggestionId, mailboxPerson) {
        const repliesContainer = document.getElementById(`replies-${suggestionId}`);
        const replyForm = repliesContainer.querySelector('.reply-form');
        const replyTextarea = replyForm.querySelector('.reply-textarea');
        const replyText = replyTextarea.value.trim();

        if (!replyText) {
            await this.showSpecialNotification('Por favor, escribe una respuesta 💕');
            return;
        }

        // Determinar quién está respondiendo (el dueño del buzón)
        const responderName = mailboxPerson === 'daniel' ? 'Daniel' : 'Betzi';

        try {
            // Guardar respuesta en el sistema de datos
            const success = await dataManager.addReply(suggestionId, responderName, replyText);

            if (success) {
                // Crear elemento de respuesta
                const replyElement = document.createElement('div');
                replyElement.className = 'reply-item';
                replyElement.innerHTML = `
                    <div class="reply-sender">💬 ${responderName}:</div>
                    <div class="reply-text">${this.escapeHtml(replyText)}</div>
                    <div class="reply-date">${new Date().toLocaleString('es-ES')}</div>
                `;

                // Insertar antes del formulario
                replyForm.parentNode.insertBefore(replyElement, replyForm);

                // Remover el formulario
                replyForm.remove();

                // Mostrar notificación
                await this.showSpecialNotification(`¡Respuesta enviada! 💬`);

                // Efecto visual
                visualEffects.createHeartExplosion(
                    replyElement.getBoundingClientRect().left + replyElement.offsetWidth / 2,
                    replyElement.getBoundingClientRect().top + replyElement.offsetHeight / 2
                );
            } else {
                await this.showSpecialNotification('Error al enviar la respuesta 💔');
            }
        } catch (error) {
            console.error('Error enviando respuesta:', error);
            await this.showSpecialNotification('Error al enviar la respuesta 💔');
        }
    }

    static cancelReply(suggestionId) {
        const repliesContainer = document.getElementById(`replies-${suggestionId}`);
        const replyForm = repliesContainer.querySelector('.reply-form');
        if (replyForm) {
            replyForm.remove();
        }
    }

    // Funciones de administración
    static async toggleAdminPanel() {
        const panel = document.getElementById('adminPanel');
        if (panel.classList.contains('active')) {
            panel.classList.remove('active');
        } else {
            panel.classList.add('active');
            await this.updateAdminStats();
        }
    }

    static async updateAdminStats() {
        try {
            const stats = await dataManager.getStats();
            
            document.getElementById('suggestionsCount').textContent = stats.suggestions;
            document.getElementById('timelineCount').textContent = stats.timeline;
            document.getElementById('galleryCount').textContent = stats.gallery;
            document.getElementById('repliesCount').textContent = stats.totalReplies;
            
        } catch (error) {
            console.error('Error actualizando estadísticas:', error);
        }
    }

    static importData() {
        document.getElementById('importFile').click();
    }

    static async handleImport(event) {
        const file = event.target.files[0];
        if (file) {
            try {
                await dataManager.importData(file);
                await this.showSpecialNotification('Datos importados exitosamente! 📥');
                await this.loadSuggestions();
                await this.updateAdminStats();
                location.reload();
            } catch (error) {
                console.error('Error importando datos:', error);
                await this.showSpecialNotification('Error al importar datos: ' + error.message);
            }
        }
    }





    // Funciones para el timeline dinámico
    static showAddTimelineForm() {
        const modal = document.getElementById('timelineModal');
        modal.classList.add('active');
        
        // Solo establecer la fecha actual si el campo está vacío
        const timelineDateInput = document.getElementById('timelineDate');
        if (!timelineDateInput.value) {
            timelineDateInput.value = new Date().toISOString().split('T')[0];
        }
        
        // Enfocar el primer campo
        document.getElementById('timelineTitle').focus();
    }

    static closeTimelineModal() {
        const modal = document.getElementById('timelineModal');
        modal.classList.remove('active');
        
        // Limpiar formulario
        document.getElementById('addTimelineForm').reset();
        document.getElementById('timelineItemId').value = '';
        
        // Resetear título y botones
        document.getElementById('timelineModalTitle').textContent = '➕ Agregar Nuevo Momento';
        document.getElementById('timelineSaveBtn').textContent = '💾 Guardar Momento';
        document.getElementById('timelineDeleteBtn').style.display = 'none';
    }

    static async saveTimelineEvent(event) {
        event.preventDefault();
        
        // Obtener datos del formulario
        const formData = {
            date: document.getElementById('timelineDate').value,
            title: document.getElementById('timelineTitle').value,
            description: document.getElementById('timelineDescription').value,
            location: document.getElementById('timelineLocation').value,
            time: document.getElementById('timelineTime').value,
            icon: document.getElementById('timelineIcon').value
        };
        
        // Validar campos requeridos
        if (!formData.date || !formData.title || !formData.description) {
            await Utils.showSpecialNotification('Por favor, completa todos los campos requeridos 💕');
            return;
        }
        
        try {
            const itemId = document.getElementById('timelineItemId').value;
            let success;
            
            if (itemId) {
                // Actualizar item existente
                success = await dataManager.updateTimelineItem(itemId, formData);
            } else {
                // Agregar nuevo item
                success = await dataManager.addTimelineItem(formData);
            }
            
            if (success) {
                // Cerrar modal
                Utils.closeTimelineModal();
                
                // Recargar timeline
                const data = await dataManager.loadData();
                if (window.lovePage && typeof window.lovePage.loadTimeline === 'function') {
                    window.lovePage.loadTimeline(data.timeline);
                }
                
                // Mostrar notificación
                const message = itemId ? '¡Momento actualizado con amor! 💕' : '¡Nuevo momento agregado con amor! 💕';
                await Utils.showSpecialNotification(message);
                
                // Efecto visual
                visualEffects.createHeartExplosion(
                    window.innerWidth / 2,
                    window.innerHeight / 2
                );
            } else {
                await Utils.showSpecialNotification('Error al guardar el momento 💔');
            }
        } catch (error) {
            console.error('Error guardando timeline event:', error);
            await Utils.showSpecialNotification('Error al guardar el momento 💔');
        }
    }

    // Editar item del timeline
    static async editTimelineItem(itemId) {
        try {
            // Cargar datos del item
            const timeline = await dataManager.loadTimeline();
            const item = timeline.find(t => t.id == itemId);
            
            if (!item) {
                await Utils.showSpecialNotification('No se encontró el momento 💔');
                return;
            }
            
            // Llenar el formulario con los datos existentes
            document.getElementById('timelineItemId').value = item.id;
            document.getElementById('timelineDate').value = item.date;
            document.getElementById('timelineTitle').value = item.title;
            document.getElementById('timelineDescription').value = item.description;
            document.getElementById('timelineLocation').value = item.location || '';
            document.getElementById('timelineTime').value = item.time || '';
            document.getElementById('timelineIcon').value = item.icon || '💕';

            console.log('Item encontrado:', item);
            
            // Actualizar título del modal y botones
            document.getElementById('timelineModalTitle').textContent = '✏️ Editar Momento';
            document.getElementById('timelineSaveBtn').textContent = '💾 Actualizar Momento';
            document.getElementById('timelineDeleteBtn').style.display = 'inline-block';
            
            // Abrir modal
            Utils.showAddTimelineForm();
            
        } catch (error) {
            console.error('Error editando timeline item:', error);
            await Utils.showSpecialNotification('Error al cargar el momento 💔');
        }
    }

    // Eliminar item del timeline
    static async deleteTimelineItem() {
        const itemId = document.getElementById('timelineItemId').value;
        
        if (!itemId) {
            await Utils.showSpecialNotification('No se puede eliminar un item nuevo 💔');
            return;
        }
        
        if (!confirm('¿Estás seguro de que quieres eliminar este momento? Esta acción no se puede deshacer.')) {
            return;
        }
        
        try {
            const success = await dataManager.deleteTimelineItem(itemId);
            
            if (success) {
                // Cerrar modal
                Utils.closeTimelineModal();
                
                // Recargar timeline
                const data = await dataManager.loadData();
                if (window.lovePage && typeof window.lovePage.loadTimeline === 'function') {
                    window.lovePage.loadTimeline(data.timeline);
                }
                
                // Mostrar notificación
                await Utils.showSpecialNotification('¡Momento eliminado! 💔');
            } else {
                await Utils.showSpecialNotification('Error al eliminar el momento 💔');
            }
        } catch (error) {
            console.error('Error eliminando timeline item:', error);
            await Utils.showSpecialNotification('Error al eliminar el momento 💔');
        }
    }

    // Funciones para la galería
    static showAddGalleryForm() {
        console.log('Mostrando formulario para agregar foto a la galería');
        const modal = document.getElementById('galleryModal');
        modal.classList.add('active');
        
        setTimeout(() => {
            document.getElementById('galleryImagePreview').src = null;
            document.getElementById('currentImagePreview').style.display = 'none';
        }, 100);
        
        // Enfocar el primer campo
        document.getElementById('galleryTitle').focus();
    }

    static showAddGalleryFormEdit() {
        const modal = document.getElementById('galleryModal');
        modal.classList.add('active');
        
        // Enfocar el primer campo
        document.getElementById('galleryTitle').focus();
    }

    static closeGalleryModal() {
        const modal = document.getElementById('galleryModal');
        modal.classList.remove('active');
        
        // Limpiar formulario
        document.getElementById('addGalleryForm').reset();
        document.getElementById('galleryItemId').value = '';
        document.getElementById('galleryImageFile').value = "";
        
        // Resetear título y botones
        document.getElementById('galleryModalTitle').textContent = '📸 Agregar Nueva Foto';
        document.getElementById('gallerySaveBtn').textContent = '💾 Guardar Foto';
        document.getElementById('galleryDeleteBtn').style.display = 'none';
        document.getElementById('galleryImagePreview').src = null;
    }

    static async saveGalleryEvent(event) {
        event.preventDefault();

        const title = document.getElementById('galleryTitle').value;
        const description = document.getElementById('galleryDescription').value;
        const date = document.getElementById('galleryDate').value;
        const fileInput = document.getElementById('galleryImageFile');
        const file = fileInput.files[0];

        console.log('Guardando evento de galería:', { title, description, date, file });
        console.log('Archivo seleccionado:', file);

        // Validar campos requeridos
        if (!title || !description || !date) {
            await Utils.showSpecialNotification('Por favor, completa todos los campos requeridos 💕');
            return;
        }

        console.log('editando:', Utils.editando);
        console.log('file:', file);

        // Validar file, si es que es un registro nuevo
        if (!Utils.editando && file == undefined) {
            await Utils.showSpecialNotification('Por favor, selecciona una imagen 💕');
            return;
        }

        let imageUrl = document.getElementById('galleryImage').value || '';
        if (file) {
            // Subir imagen a Supabase Storage
            const fileName = `${Date.now()}_${file.name}`;
            const { data, error } = await dataManager.supabase.storage
                .from('gallery-images')
                .upload(fileName, file);

            if (error) {
                await Utils.showSpecialNotification('Error al subir la imagen 💔');
                return;
            }

            // Obtener URL pública
            imageUrl = dataManager.supabase.storage
                .from('gallery-images')
                .getPublicUrl(fileName).data.publicUrl;
        }

        const formData = {
            title,
            description,
            image: imageUrl,
            date
        };

        try {
            const itemId = document.getElementById('galleryItemId').value;
            let success;

            if (itemId) {
                success = await dataManager.updateGalleryPhoto(itemId, formData);
            } else {
                success = await dataManager.addGalleryPhoto(formData);
            }

            if (success) {
                Utils.closeGalleryModal();
                Utils.editando = false
                const data = await dataManager.loadData();
                window.lovePage.loadGallery(data.gallery);
                const message = itemId ? '¡Foto actualizada con amor! 💕' : '¡Nueva foto agregada con amor! 💕';
                await Utils.showSpecialNotification(message);
                const modal = document.getElementById('allGalleryModal');
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                }
                visualEffects.createHeartExplosion(window.innerWidth / 2, window.innerHeight / 2);
            } else {
                await Utils.showSpecialNotification('Error al guardar la foto 💔');
            }
        } catch (error) {
            console.error('Error guardando gallery event:', error);
            await Utils.showSpecialNotification('Error al guardar la foto 💔');
        }
    }

    // Editar item de la galería
    static async editGalleryItem(itemId) {
        console.log('Editando item de galería con ID:', itemId);
        try {
            // Cargar datos del item
            const gallery = await dataManager.loadGallery();
            const item = gallery.find(g => g.id == itemId);

            console.log('Item encontrado:', item);
            
            if (!item) {
                await Utils.showSpecialNotification('No se encontró la foto 💔');
                return;
            }
            
            // Llenar el formulario con los datos existentes
            document.getElementById('galleryItemId').value = item.id;
            document.getElementById('galleryTitle').value = item.title;
            document.getElementById('galleryDescription').value = item.description;
            document.getElementById('galleryImage').value = item.image || '';
            console.log(item.date.split('T')[0]);
            document.getElementById('galleryDate').value = item.date.split('T')[0];
            console.log('Fecha de la foto:', document.getElementById('galleryDate').value);

            // Mostrar imagen actual si existe
            if (item.image) {
                document.getElementById('currentImagePreview').style.display = 'block';
                document.getElementById('galleryImagePreview').src = item.image;
            } else {
                document.getElementById('currentImagePreview').style.display = 'none';
            }
            
            // Actualizar título del modal y botones
            document.getElementById('galleryModalTitle').textContent = '✏️ Editar Foto';
            document.getElementById('gallerySaveBtn').textContent = '💾 Actualizar Foto';
            document.getElementById('galleryDeleteBtn').style.display = 'inline-block';
            Utils.editando = true;

            console.log(item.id, item.title, item.description, item.image, item.date);
            
            // Abrir modal
            Utils.showAddGalleryFormEdit();
            
        } catch (error) {
            console.error('Error editando gallery item:', error);
            await Utils.showSpecialNotification('Error al cargar la foto 💔');
        }
    }

    // Eliminar item de la galería
    static async deleteGalleryItem() {
        const itemId = document.getElementById('galleryItemId').value;
        
        if (!itemId) {
            await Utils.showSpecialNotification('No se puede eliminar una foto nueva 💔');
            return;
        }
        
        if (!confirm('¿Estás seguro de que quieres eliminar esta foto? Esta acción no se puede deshacer.')) {
            return;
        }
        
        try {
            const success = await dataManager.deleteGalleryPhoto(itemId);
            
            if (success) {
                // Cerrar modal
                Utils.closeGalleryModal();
                
                // Recargar galería
                const data = await dataManager.loadData();
                window.lovePage.loadGallery(data.gallery);
                
                // Mostrar notificación
                await Utils.showSpecialNotification('¡Foto eliminada! 💔');
            } else {
                await Utils.showSpecialNotification('Error al eliminar la foto 💔');
            }
        } catch (error) {
            console.error('Error eliminando gallery item:', error);
            await Utils.showSpecialNotification('Error al eliminar la foto 💔');
        }
    }

    static refreshSuggestions() {
        this.loadSuggestions();
    }
}