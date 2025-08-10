# 💕 Página de Amor - Sistema de Persistencia JSON

Una hermosa página web romántica con sistema de persistencia de datos usando JSON y localStorage.

## 🌟 Características

### 💾 Sistema de Persistencia
- **Almacenamiento local**: Todos los datos se guardan en el navegador
- **Exportar/Importar**: Puedes respaldar y restaurar todos los datos
- **Panel de administración**: Gestión completa de datos desde la interfaz
- **Estadísticas en tiempo real**: Ve cuántos elementos tienes guardados

### 📱 Funcionalidades Dinámicas
- **Sugerencias con respuestas**: Sistema de mensajes entre Daniel y Betzi
- **Timeline dinámico**: Agregar/quitar momentos especiales
- **Galería de fotos**: Subir y gestionar fotos juntos
- **Contadores personalizables**: Días desde que se conocieron y como novios

### 🎨 Efectos Visuales
- **Flores animadas**: Girasoles y tulipanes flotantes
- **Partículas y confeti**: Efectos especiales románticos
- **Animaciones suaves**: Transiciones elegantes en toda la página

## 🚀 Cómo Usar

### 1. **Panel de Administración**
- Haz clic en el botón ⚙️ (esquina inferior derecha)
- Ve estadísticas de tus datos
- Exporta/importa datos
- Limpia todo si es necesario

### 2. **Sugerencias**
- Escribe mensajes en tu buzón
- Envíalos a tu pareja
- Responde a los mensajes recibidos
- Todos se guardan automáticamente

### 3. **Timeline**
- Los momentos se cargan dinámicamente
- Próximamente: agregar nuevos momentos
- Próximamente: subir fotos a cada momento

### 4. **Galería**
- Las fotos se cargan dinámicamente
- Próximamente: subir nuevas fotos
- Próximamente: editar descripciones

## 📁 Estructura de Datos

### Archivo JSON Exportado
```json
{
  "config": {
    "names": {
      "person1": "Daniel",
      "person2": "Betzi"
    },
    "dates": {
      "meeting": "2024-01-01",
      "relationship": "2024-02-01"
    }
  },
  "suggestions": [
    {
      "id": "1234567890",
      "sender": "Daniel",
      "recipient": "Betzi",
      "text": "Te amo más cada día",
      "date": "2025-08-15T14:30:00Z",
      "replies": [
        {
          "id": "1234567891",
          "sender": "Betzi",
          "text": "Yo también te amo",
          "date": "2025-08-15T14:35:00Z"
        }
      ]
    }
  ],
  "timeline": [
    {
      "id": "1",
      "date": "2024-01-15",
      "title": "Nuestro primer café",
      "description": "Esa tarde perfecta...",
      "image": null,
      "location": "Café favorito",
      "time": "Tarde inolvidable",
      "icon": "☕"
    }
  ],
  "gallery": [
    {
      "id": "1",
      "title": "Nuestra primera foto",
      "description": "Un momento especial",
      "image": null,
      "date": "2025-08-15T10:00:00Z"
    }
  ],
  "lastUpdated": "2025-08-15T14:30:00Z"
}
```

## 🔧 Funciones Principales

### DataManager (data.js)
- `loadData()`: Cargar datos del localStorage
- `saveData(data)`: Guardar datos en localStorage
- `exportData()`: Descargar archivo JSON
- `importData(file)`: Importar archivo JSON
- `addSuggestion()`: Agregar nueva sugerencia
- `addReply()`: Agregar respuesta a sugerencia
- `addTimelineItem()`: Agregar momento al timeline
- `addGalleryPhoto()`: Agregar foto a la galería

### Utils (utils.js)
- `loadSuggestions()`: Cargar sugerencias en la interfaz
- `sendSuggestion()`: Enviar nueva sugerencia
- `sendReply()`: Enviar respuesta
- `toggleAdminPanel()`: Mostrar/ocultar panel de administración

## 📊 Estadísticas Disponibles

El panel de administración muestra:
- **Sugerencias**: Total de mensajes enviados
- **Timeline**: Total de momentos guardados
- **Fotos**: Total de fotos en la galería
- **Respuestas**: Total de respuestas a sugerencias
- **Última actualización**: Cuándo se modificaron los datos por última vez

## 🔄 Respaldo y Restauración

### Exportar Datos
1. Abre el panel de administración (⚙️)
2. Haz clic en "📤 Exportar Datos"
3. Se descargará un archivo JSON con todos tus datos

### Importar Datos
1. Abre el panel de administración (⚙️)
2. Haz clic en "📥 Importar Datos"
3. Selecciona el archivo JSON que quieres restaurar
4. Los datos se cargarán automáticamente

### Limpiar Datos
1. Abre el panel de administración (⚙️)
2. Haz clic en "🗑️ Limpiar Todo"
3. Confirma la acción
4. Todos los datos se eliminarán

## 🎯 Próximas Funcionalidades

### Timeline Dinámico
- [ ] Agregar nuevos momentos desde la interfaz
- [ ] Subir fotos a cada momento
- [ ] Editar momentos existentes
- [ ] Eliminar momentos

### Galería Dinámica
- [ ] Subir nuevas fotos
- [ ] Editar títulos y descripciones
- [ ] Organizar fotos por fecha
- [ ] Vista de carrusel

### Configuración Avanzada
- [ ] Cambiar nombres desde la interfaz
- [ ] Modificar fechas importantes
- [ ] Personalizar mensajes románticos
- [ ] Cambiar colores y temas

## 💡 Consejos de Uso

1. **Respalda regularmente**: Exporta tus datos cada semana
2. **Usa el panel de administración**: Para gestionar todo fácilmente
3. **Personaliza las fechas**: En el archivo `data.js` puedes cambiar las fechas importantes
4. **Agrega fotos**: Próximamente podrás subir fotos reales
5. **Comparte la página**: Puedes subirla a GitHub Pages para acceso online

## 🛠️ Tecnologías Usadas

- **HTML5**: Estructura semántica
- **CSS3**: Animaciones y efectos visuales
- **JavaScript ES6+**: Lógica modular y persistencia
- **localStorage**: Almacenamiento local
- **File API**: Importar/exportar datos

## 📝 Notas Técnicas

- Los datos se guardan en el navegador del usuario
- El archivo JSON es portable entre dispositivos
- No se requiere servidor ni base de datos
- Funciona completamente offline
- Compatible con todos los navegadores modernos

---

💕 **Hecho con amor para Daniel y Betzi** 💕 