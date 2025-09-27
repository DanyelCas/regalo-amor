-- Script para actualizar la tabla gallery y agregar soporte para múltiples imágenes
-- Ejecutar este script en el SQL Editor de Supabase

-- Eliminar columna images si existe como JSONB (para limpiar instalaciones previas)
ALTER TABLE gallery DROP COLUMN IF EXISTS images;

-- Agregar columna images como array de texto
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Migrar datos existentes de 'image' a 'images' (solo si images está vacío)
UPDATE gallery 
SET images = CASE 
    WHEN image IS NOT NULL AND image != '' THEN ARRAY[image]
    ELSE '{}'
END
WHERE array_length(images, 1) IS NULL OR array_length(images, 1) = 0;

-- Crear índice para mejorar performance en búsquedas por imágenes
CREATE INDEX IF NOT EXISTS idx_gallery_images ON gallery USING GIN (images);

-- Verificar que la migración funcionó correctamente
SELECT 
    id, 
    title, 
    image, 
    images,
    array_length(images, 1) as image_count,
    CASE 
        WHEN array_length(images, 1) > 0 THEN 'OK - Tiene imágenes'
        ELSE 'Sin imágenes'
    END as status
FROM gallery 
ORDER BY id;
