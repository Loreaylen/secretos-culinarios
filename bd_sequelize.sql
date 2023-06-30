CREATE DATABASE secretosCulinarios;
USE secretosCulinarios;

CREATE TABLE usuarios (
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(100) NOT NULL,
mail VARCHAR(200) NOT NULL UNIQUE,
usuario VARCHAR(20) NOT NULL,
contraseña CHAR(60) NOT NULL,  -- Contraseña con hash
url_avatar VARCHAR(500) DEFAULT NULL,
createdAt DATE,
updatedAt DATE
);


INSERT INTO usuarios (nombre, mail, usuario, contraseña, url_avatar, createdAt, updatedAt)
VALUES
('Juan Pérez', 'juan.perez@example.com', 'jperez', '$2a$10$N1WUMpEeAMH3afLxnmK6OuqXh19zQJFA8p2olue7s9XoVlSMvlBMu', NULL, CURDATE(), CURDATE()),
('María López', 'maria.lopez@example.com', 'mlopez', '$2a$10$1bQmCAzK8zOcr0hOT.vh3ORdD6AeI8MclJ0epo6gajdEp1h2bjS.C', NULL, CURDATE(), CURDATE()),
('Pedro Gómez', 'pedro.gomez@example.com', 'pgomez', '$2a$10$7eMjtLpqYgkwwbRhkIjB2OtUfU6YfAwFyyltnftkKYzXMyXfrK1RC', NULL, CURDATE(), CURDATE()),
('Ana Rodríguez', 'ana.rodriguez@example.com', 'arodriguez', '$2a$10$Dpwe5oybBvSpv0PZS4lvm.VLbj02sudom25c64XK1ng/3h8CI9Zl2', NULL, CURDATE(), CURDATE()),
('Luisa Martínez', 'luisa.martinez@example.com', 'lmartinez', '$2a$10$UieFsyI3PmN7rczYmoZu6uWt.q0kl8S9hX51PfX9h8DHTq7GXvMXe', NULL, CURDATE(), CURDATE());

-- CREAR PROCEDIMIENTO QUE COMPRUEBE SI EL MAIL EXISTE, SI EXISTE QUE DEVUELVA ERROR
DELIMITER $$
CREATE PROCEDURE `comprobar_mail`(IN usermail VARCHAR(200))
BEGIN
IF EXISTS(SELECT mail FROM usuarios WHERE mail = usermail)
 THEN
  CALL login_usuario(usermail);
ELSE 
 SELECT 1 AS fallo;
END IF;
END $$

-- CREAR PROCEDIMIENTO QUE ME TRAIGA EL MAIL Y LA CONTRASEÑA
-- Si el mail existe, que traiga los dos, sino, que traiga false
DELIMITER //
CREATE PROCEDURE `login_usuario`(IN usermail VARCHAR(200))
BEGIN
CASE 
	WHEN EXISTS(SELECT mail FROM usuarios WHERE mail = usermail)
    THEN SELECT mail, contraseña FROM usuarios WHERE mail = usermail;
    ELSE SELECT 0;
END CASE;
END //

DELIMITER ;
-- Procedimiento para actualizar NOMBRE y NOMBRE DE USUARIO del perfil, nada más.
DELIMITER //
CREATE PROCEDURE `actualizar_perfil`(IN idCuenta INT, IN nuevoNombre VARCHAR(100), IN nuevoUsuario VARCHAR(20))
BEGIN
UPDATE usuarios
SET nombre = nuevoNombre, usuario = nuevoUsuario
WHERE id = idCuenta;
SELECT nombre AS nombre, usuario AS usuario FROM usuarios WHERE id = idCuenta ;
END //
DROP PROCEDURE actualizar_perfil;

-- Procedimiento para eliminar la cuenta
DELIMITER //
CREATE PROCEDURE `eliminar_cuenta`(IN idCuenta INT)
BEGIN
IF EXISTS(SELECT * FROM usuarios WHERE id = idCuenta)
THEN 
DELETE FROM usuarios WHERE id = idCuenta;
SELECT TRUE AS resultado;
ELSE 
SELECT FALSE AS resultado;
END IF;
END //

SELECT * FROM usuarios;
DELIMITER ;
