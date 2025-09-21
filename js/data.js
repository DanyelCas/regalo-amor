// Sistema de persistencia con Supabase para la página de amor
class DataManager {
    constructor() {
        // Configuración de Supabase
        try {
            const config = getSupabaseConfig();
            this.supabaseUrl = config.url;
            this.supabaseKey = config.anonKey;
        } catch (error) {
            console.error('Error cargando configuración de Supabase:', error);
            // Valores por defecto (se mostrará error)
            this.supabaseUrl = 'https://tu-proyecto.supabase.co';
            this.supabaseKey = 'tu-anon-key';
        }
        
        // Inicializar Supabase
        this.supabase = null;
        this.initSupabase();
        
        // Datos por defecto
        this.defaultData = {
            config: {
                names: {
                    person1: 'Daniel',
                    person2: 'Betzi'
                },
                dates: {
                    meeting: '2024-01-01',
                    relationship: '2025-05-16'
                },
                messages: {
                    romantic: [
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
                    notification: 'Te amo más cada día, Betzi ❤️🌻'
                }
            },
            suggestions: [],
            timeline: [
                {
                    id: '1',
                    date: '2024-01-15',
                    title: 'Nuestro primer café juntos',
                    description: 'Esa tarde perfecta donde Daniel y Betzi descubrimos que teníamos tanto en común. Fue el comienzo de algo hermoso.',
                    image: null,
                    location: 'Café favorito',
                    time: 'Tarde inolvidable',
                    icon: '☕'
                },
                {
                    id: '2',
                    date: '2024-02-01',
                    title: 'El momento mágico de Daniel y Betzi',
                    description: 'Cuando el tiempo se detuvo y solo existíamos tú y yo. Ese momento cambió todo para siempre.',
                    image: null,
                    location: 'Bajo las estrellas',
                    time: 'Eternidad en un instante',
                    icon: '💋'
                },
                {
                    id: '3',
                    date: '2024-03-01',
                    title: 'El futuro de Daniel y Betzi',
                    description: 'Cada día es una nueva aventura a tu lado, Betzi, y no puedo esperar por todos los momentos hermosos que nos esperan juntos.',
                    image: null,
                    location: 'En nuestro futuro',
                    time: 'Para toda la vida',
                    icon: '🌻'
                }
            ],
            gallery: [
                {
                    id: '1',
                    title: 'Nuestra primera foto juntos',
                    description: 'Agrega aquí tu primera foto juntos',
                    image: null,
                    date: new Date().toISOString()
                },
                {
                    id: '2',
                    title: 'Un momento especial',
                    description: 'Agrega aquí un momento especial',
                    image: null,
                    date: new Date().toISOString()
                },
                {
                    id: '3',
                    title: 'Una aventura juntos',
                    description: 'Agrega aquí una aventura juntos',
                    image: null,
                    date: new Date().toISOString()
                },
                {
                    id: '4',
                    title: 'Un momento romántico',
                    description: 'Agrega aquí un momento romántico',
                    image: null,
                    date: new Date().toISOString()
                },
                {
                    id: '5',
                    title: 'Una celebración',
                    description: 'Agrega aquí una celebración',
                    image: null,
                    date: new Date().toISOString()
                },
                {
                    id: '6',
                    title: 'El momento más reciente',
                    description: 'Agrega aquí el momento más reciente',
                    image: null,
                    date: new Date().toISOString()
                }
            ],
            lastUpdated: new Date().toISOString()
        };
    }

    // Inicializar Supabase
    async initSupabase() {
        try {
            // Cargar Supabase desde CDN
            await this.loadSupabaseCDN();
            
            // Verificar que supabase esté disponible
            if (typeof window.supabase === 'undefined') {
                throw new Error('Supabase no se cargó correctamente desde CDN');
            }
            
            this.supabase = window.supabase.createClient(this.supabaseUrl, this.supabaseKey);
            console.log('Supabase inicializado correctamente');
            
            // Configurar suscripción en tiempo real
            this.setupRealtimeSubscription();
            
        } catch (error) {
            console.error('Error inicializando Supabase:', error);
            this.showSupabaseError();
        }
    }

    // Cargar Supabase desde CDN
    async loadSupabaseCDN() {
        return new Promise((resolve, reject) => {
            // Verificar si ya está cargado
            if (window.supabase) {
                resolve();
                return;
            }

            // Esperar a que se cargue desde el script en HTML
            const checkSupabase = () => {
                if (window.supabase) {
                    resolve();
                } else {
                    setTimeout(checkSupabase, 100);
                }
            };
            checkSupabase();
        });
    }

    // Configurar suscripción en tiempo real
    setupRealtimeSubscription() {
        if (!this.supabase) return;

        // Suscribirse a cambios en config
        this.supabase
            .channel('config')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'config' }, 
                (payload) => {
                    this.handleConfigChange(payload);
                })
            .subscribe();

        // Suscribirse a cambios en timeline
        this.supabase
            .channel('timeline')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'timeline' }, 
                (payload) => {
                    this.handleTimelineChange(payload);
                })
            .subscribe();

        // Suscribirse a cambios en gallery
        this.supabase
            .channel('gallery')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery' }, 
                (payload) => {
                    this.handleGalleryChange(payload);
                })
            .subscribe();

        // Suscribirse a cambios en suggestions
        this.supabase
            .channel('suggestions')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'suggestions' }, 
                (payload) => {
                    this.handleSuggestionsChange(payload);
                })
            .subscribe();
    }

    // Manejadores de cambios en tiempo real
    handleConfigChange(payload) {
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            this.loadConfig();
        }
    }

    handleTimelineChange(payload) {
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT' || payload.eventType === 'DELETE') {
            this.loadTimeline().then(timeline => {
                if (window.lovePage && typeof window.lovePage.loadTimeline === 'function') {
                    window.lovePage.loadTimeline(timeline);
                }
            });
        }
    }

    handleGalleryChange(payload) {
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT' || payload.eventType === 'DELETE') {
            this.loadGallery();
        }
    }

    handleSuggestionsChange(payload) {
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT' || payload.eventType === 'DELETE') {
            this.loadSuggestions();
        }
    }

    // Mostrar error de Supabase
    showSupabaseError() {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            max-width: 300px;
        `;
        errorDiv.innerHTML = `
            <strong>⚠️ Error de conexión</strong><br>
            No se pudo conectar a la base de datos.<br>
            Verifica tu configuración de Supabase.
        `;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 10000);
    }

    // Cargar configuración
    async loadConfig() {
        try {
            const { data, error } = await this.supabase
                .from('config')
                .select('*')
                .single();

            if (error) {
                console.error('Error cargando config:', error);
                return this.defaultData.config;
            }

            return data || this.defaultData.config;
        } catch (error) {
            console.error('Error en loadConfig:', error);
            return this.defaultData.config;
        }
    }

    // Guardar configuración
    async saveConfig(config) {
        try {
            const { error } = await this.supabase
                .from('config')
                .upsert(config, { onConflict: 'id' });

            if (error) {
                console.error('Error guardando config:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error en saveConfig:', error);
            return false;
        }
    }

    // Cargar timeline
    async loadTimeline() {
        try {
            const { data, error } = await this.supabase
                .from('timeline')
                .select('*')
                .order('date', { ascending: false });

            if (error) {
                console.error('Error cargando timeline:', error);
                return this.defaultData.timeline;
            }

            return data || this.defaultData.timeline;
        } catch (error) {
            console.error('Error en loadTimeline:', error);
            return this.defaultData.timeline;
        }
    }

    // Cargar galería
    async loadGallery() {
        try {
            const { data, error } = await this.supabase
                .from('gallery')
                .select('*')
                .order('date', { ascending: false });

            if (error) {
                console.error('Error cargando gallery:', error);
                return this.defaultData.gallery;
            }

            return data || this.defaultData.gallery;
        } catch (error) {
            console.error('Error en loadGallery:', error);
            return this.defaultData.gallery;
        }
    }

    // Cargar sugerencias
    async loadSuggestions() {
        try {
            const { data, error } = await this.supabase
            .from('suggestions')
            .select(`
                *,
                replies(*)
            `)
            .order('date', { ascending: false });
          

            if (error) {
                console.error('Error cargando suggestions:', error);
                return [];
            }

            return data || [];
        } catch (error) {
            console.error('Error en loadSuggestions:', error);
            return [];
        }
    }

    // Cargar todos los datos
    async loadData() {
        try {
            const [config, timeline, gallery, suggestions] = await Promise.all([
                this.loadConfig(),
                this.loadTimeline(),
                this.loadGallery(),
                this.loadSuggestions()
            ]);

            return {
                config,
                timeline,
                gallery,
                suggestions,
                lastUpdated: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error cargando datos:', error);
            return this.defaultData;
        }
    }

    // Agregar sugerencia
    async addSuggestion(sender, recipient, text) {
        try {
            const suggestion = {
                sender: sender,
                recipient: recipient,
                text: text,
                date: new Date().toISOString(),
                replies: []
            };

            const { error } = await this.supabase
                .from('suggestions')
                .insert(suggestion);

            if (error) {
                console.error('Error agregando sugerencia:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error en addSuggestion:', error);
            return false;
        }
    }

    // Agregar respuesta a sugerencia
    async addReply(suggestionId, sender, text) {
        try {
            const reply = {
                suggestion_id: suggestionId,
                sender: sender,
                text: text,
                date: new Date().toISOString()
            };

            const { error } = await this.supabase
                .from('replies')
                .insert(reply);

            if (error) {
                console.error('Error agregando respuesta:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error en addReply:', error);
            return false;
        }
    }

    // Agregar item al timeline
    async addTimelineItem(item) {
        try {
            const timelineItem = {
                date: item.date || new Date().toISOString().split('T')[0],
                title: item.title,
                description: item.description,
                image: item.image,
                location: item.location,
                time: item.time,
                icon: item.icon || '💕'
            };

            const { error } = await this.supabase
                .from('timeline')
                .insert(timelineItem);

            if (error) {
                console.error('Error agregando timeline item:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error en addTimelineItem:', error);
            return false;
        }
    }

    // Actualizar item del timeline
    async updateTimelineItem(id, updates) {
        try {
            const { error } = await this.supabase
                .from('timeline')
                .update(updates)
                .eq('id', id);

            if (error) {
                console.error('Error actualizando timeline item:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error en updateTimelineItem:', error);
            return false;
        }
    }

    // Eliminar item del timeline
    async deleteTimelineItem(id) {
        try {
            const { error } = await this.supabase
                .from('timeline')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error eliminando timeline item:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error en deleteTimelineItem:', error);
            return false;
        }
    }

    // Agregar foto a la galería
    async addGalleryPhoto(photo) {
        try {
            const galleryItem = {
                title: photo.title,
                description: photo.description,
                image: photo.image,
                date: photo.date
            };

            const { error } = await this.supabase
                .from('gallery')
                .insert(galleryItem);

            if (error) {
                console.error('Error agregando foto:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error en addGalleryPhoto:', error);
            return false;
        }
    }

    // Actualizar foto de la galería
    async updateGalleryPhoto(id, updates) {
        try {
            const { error } = await this.supabase
                .from('gallery')
                .update(updates)
                .eq('id', id);

            if (error) {
                console.error('Error actualizando foto:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error en updateGalleryPhoto:', error);
            return false;
        }
    }

    // Eliminar foto de la galería
    async deleteGalleryPhoto(id) {
        try {
            const { error } = await this.supabase
                .from('gallery')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error eliminando foto:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error en deleteGalleryPhoto:', error);
            return false;
        }
    }

    // Exportar datos
    async exportData() {
        try {
            const data = await this.loadData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `love-page-data-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exportando datos:', error);
        }
    }

    // Importar datos
    async importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    
                    // Importar config
                    if (importedData.config) {
                        await this.saveConfig(importedData.config);
                    }
                    
                    // Importar timeline
                    if (importedData.timeline) {
                        for (const item of importedData.timeline) {
                            await this.addTimelineItem(item);
                        }
                    }
                    
                    // Importar gallery
                    if (importedData.gallery) {
                        for (const item of importedData.gallery) {
                            await this.addGalleryPhoto(item);
                        }
                    }
                    
                    resolve(true);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Error leyendo archivo'));
            reader.readAsText(file);
        });
    }

    // Obtener estadísticas
    async getStats() {
        try {
            const [timeline, gallery, suggestions] = await Promise.all([
                this.loadTimeline(),
                this.loadGallery(),
                this.loadSuggestions()
            ]);

            return {
                suggestions: suggestions.length,
                timeline: timeline.length,
                gallery: gallery.length,
                totalReplies: suggestions.reduce((sum, s) => sum + (s.replies?.length || 0), 0),
                lastUpdated: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error obteniendo estadísticas:', error);
            return {
                suggestions: 0,
                timeline: 0,
                gallery: 0,
                totalReplies: 0,
                lastUpdated: new Date().toISOString()
            };
        }
    }

    // Inicializar base de datos (ejecutar una vez)
    async initializeDatabase() {
        try {
            // Crear config por defecto
            await this.saveConfig(this.defaultData.config);
            
            // Crear timeline por defecto
            for (const item of this.defaultData.timeline) {
                await this.addTimelineItem(item);
            }
            
            // Crear gallery por defecto
            for (const item of this.defaultData.gallery) {
                await this.addGalleryPhoto(item);
            }
            
            console.log('Base de datos inicializada correctamente');
            return true;
        } catch (error) {
            console.error('Error inicializando base de datos:', error);
            return false;
        }
    }
}

// Instancia global del gestor de datos
const dataManager = new DataManager();