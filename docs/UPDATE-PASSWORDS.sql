-- Script para actualizar las contraseñas en la base de datos
-- Ejecutar este script en Supabase SQL Editor

-- El MD5 de "hello" es: 5d41402abc4b2a76b9719d911017c592
-- El MD5 de "foquito" es: 5d41402abc4b2a76b9719d911017c592 (si usas "hello" como contraseña)
-- El MD5 de "amuletito" es: 5d41402abc4b2a76b9719d911017c592 (si usas "hello" como contraseña)

-- Actualizar contraseñas para que coincidan con el MD5 de "hello"
UPDATE users 
SET password = '5d41402abc4b2a76b9719d911017c592' 
WHERE usuario = 'foquito';

UPDATE users 
SET password = '5d41402abc4b2a76b9719d911017c592' 
WHERE usuario = 'amuletito';

-- Verificar que se actualizaron correctamente
SELECT usuario, real_name, password FROM users;

-- Si quieres usar contraseñas diferentes, aquí están los hashes MD5:
-- "hello" = 5d41402abc4b2a76b9719d911017c592
-- "password" = 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
-- "123456" = e10adc3949ba59abbe56e057f20f883e
-- "admin" = 21232f297a57a5a743894a0e4a801fc3
-- "test" = 098f6bcd4621d373cade4e832627b4f6
