CREATE DATABASE secretosCulinarios;
USE secretosCulinarios;

/*-------------------------- TABLAS  ------------------------------*/
 -- Tabla usuarios
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

-- Tabla recetas 
CREATE TABLE recetas (
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(150) NOT NULL,
url_imagen VARCHAR(500) DEFAULT NULL,
pasos TEXT NOT NULL,
id_usuario INT NOT NULL,
createdAt DATE,
updatedAt DATE,
CONSTRAINT pk_creador FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Tabla categorías
CREATE TABLE categorias (
id_categoria INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(50) NOT NULL
);

-- Tabla categorias_recetas
CREATE TABLE categorias_recetas (
id_cr INT PRIMARY KEY AUTO_INCREMENT,
id_receta INT NOT NULL,
id_categoria INT NOT NULL
);

/*-------------------------- DATOS  ------------------------------*/

-- Usuarios de prueba (NO UTILIZAR PARA INICIAR SESIÓN, HASH GENERADO ALEATORIAMENTE)
INSERT INTO usuarios (nombre, mail, usuario, contraseña, url_avatar, createdAt, updatedAt)
VALUES
('Juan Pérez', 'juancito.perez@example.com', 'jperez', '$2a$10$N1WUMpEeAMH3afLxxxK6OuqXh19zQJFA8p2olue7s9XoVlSMvlBMu', NULL, CURDATE(), CURDATE()),
('María López', 'maria.lopez@example.com', 'mlopez', '$2a$10$1bQmCAzK8zOcr0hOT.vh3ORdD6AeI8MclJ0epo6gajdEp1h2bjS.C', NULL, CURDATE(), CURDATE()),
('Pedro Gómez', 'pedro.gomez@example.com', 'pgomez', '$2a$10$7eMjtLpqYgkwwbRhkIjB2OtUfU6YfAwFyyltnftkKYzXMyXfrK1RC', NULL, CURDATE(), CURDATE()),
('Ana Rodríguez', 'ana.rodriguez@example.com', 'arodriguez', '$2a$10$Dpwe5oybBvSpv0PZS4lvm.VLbj02sudom25c64XK1ng/3h8CI9Zl2', NULL, CURDATE(), CURDATE()),
('Luisa Martínez', 'luisa.martinez@example.com', 'lmartinez', '$2a$10$UieFsyI3PmN7rczYmoZu6uWt.q0kl8S9hX51PfX9h8DHTq7GXvMXe', NULL, CURDATE(), CURDATE());

-- Categorías disponibles
INSERT INTO categorias (nombre)
VALUES ('Entrantes y Aperitivos'), ('Platos Principales'), ('Guarniciones y Ensaladas'), ('Sopas y Cremas'), ('Postres'), ('Bebidas y Cócteles'), ('Desayunos y Brunch'),
('Meriendas y Snacks'), ('Panes y Masas'), ('Apto para Celíacos'), ('Vegano y Vegetariano'), ('Sin Gluten'), ('Sin Lácteos'), ('Sin Azúcar'), ('Comida Rápida'),
('Comida Saludable'), ('Comida Tradicional'), ('Comida Internacional'), ('Platos a la Parrilla'), ('Comida para Niños');

SELECT * FROM usuarios;

-- Recetas 
INSERT INTO recetas (titulo, url_imagen, pasos, id_usuario, createdAt, updatedAt)
VALUES
('Crema de calabaza', NULL,
'Ingredientes 
1 cucharada de aceite de oliva virgen extra, opcional
4 dientes de ajo, troceados
1 cebolla, troceada
1 kilo de calabaza, 2 libras, pelada y troceada
2 tazas de caldo de verduras, 500 ml
1 taza de leche de coco de lata, 250 ml, puedes usar cualquier tipo de leche vegetal
½ cucharadita de sal
¼ cucharadita de pimienta negra molida

Instrucciones
1.Calienta el aceite en una olla y echa el ajo y la cebolla. Cocina a fuego medio-alto hasta que empiecen a dorarse.
2.Echa la calabaza y cocina durante unos 2-3 minutos, removiendo de vez en cuando.
3.Añade el resto de ingredientes y cuando rompa a hervir cocina fuego medio-alto durante unos 15 minutos o hasta que la calabaza esté tierna.
4.Bate con una batidora de vaso o una batidora de mano.
5.Sirve inmediatamente. A mí me gusta servirla con perejil fresco picado, leche de coco, semillas de calabaza tostadas y pimienta negra, además de acompañarla con seitán, tempeh o bacon de tempeh troceado por encima.
6.Guarda las sobras en la nevera en un recipiente hermético durante 5-7 días o en el congelador por unos 3 meses. Te recomiendo que la congeles en porciones individuales. Para descongelar, déjala en la nevera un día antes de comerla y recaliéntala en el microondas o en un cazo a fuego medio.',
2,
CURDATE(), 
CURDATE()),
( 'Mousse de chocolate', NULL,
'Ingredientes
Agua 50 c.c.
Azúcar 140 Gramos
Chocolate semiamargo o amargo 200 Gramos
Claras 3 Unidades
Crema doble 200 Gramos
Mantequilla 100 Gramos

Preparación
Fundir el chocolate y la mantequilla a baño María, integrar y retirar del calor.
Calentar la crema sin llegar a hervor y unir al chocolate. Hacer un  almíbar con el azúcar y el agua hasta 120° C.
Batir las claras e ir agregando el almíbar en forma de hilo sin dejar de batir hasta que llegue a temperatura ambiente.
Incorporar la mezcla de chocolate con espátula en movimientos envolventes.
Llevar a frío.
Servir con frutillas fileteadas, arándanos y menta.',
3,
CURDATE(), 
CURDATE()),
('Pan de ajo', NULL,
'Ingredientes
Para 25 unidades
1 Pan baguette o barra rústica de miga firme y buena corteza
65 g Mantequilla sin sal atemperada
30 ml Aceite de oliva virgen extra
1 g Ralladura de limón
4 g Ajo granulado
3 Diente de ajo
Pimienta negra molida
Queso Parmesano opcional
Sal gruesa o en escamas
Perejil fresco

Cómo hacerlo:

Precalentar el horno a 180ºC y preparar una bandeja cubriéndola con papel sulfurizado. Procurar que la mantequilla esté a temperatura ambiente, con una textura blanda. Lavar y secar bien el limón. Pelar los dientes de ajo y picarlos muy finos. Cortar la barra de pan en rebanadas de aproximadamente un dedo de grosor.

Disponer la mantequilla ablandada en un cuenco y añadir el aceite de oliva, la ralladura de limón, los dientes de ajo picados, un golpe de pimienta negra, el ajo granulado, una pizca de sal gruesa y una cucharada de queso parmesano, si lo usamos. Mezclar todo muy bien hasta dejar una textura cremosa.

Untar cada rebanada de pan con la pasta cremosa usando un pincel de cocina, o un cuchillo de mantequilla. Distribuirlas sobre la bandeja preparada y hornear durante unos 12-15 minutos, hasta que se haya derretido la mantequilla y el pan esté bien dorado. Picar perejil y añadirlo antes de servir.',
4,
CURDATE(), 
CURDATE())

SELECT * FROM recetas;

SELECT * FROM usuarios; 

-- Categorías para cada receta
INSERT INTO categorias_recetas (id_receta, id_categoria)
VALUES (1, 1), (1, 2), (1, 4), (1, 11), (1, 12), (1, 16),
(2, 5), (2, 12), (2, 17), (3, 1), (3, 3), (3, 17);

/*-------------------------- PROCEDIMIENTOS ALMACENADOS  ------------------------------*/

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

-- Procedimiento para traer todas las recetas o las recetas por usuario
DELIMITER //
CREATE PROCEDURE `traer_recetas`(IN idUsuario INT)
BEGIN
IF idUsuario IS NOT NULL
THEN
SELECT u.usuario, u.url_avatar, r.id, r.titulo, r.url_imagen, r.pasos, r.createdAt, GROUP_CONCAT(c.nombre) AS categorias
FROM recetas r
LEFT JOIN categorias_recetas cr ON cr.id_receta = r.id
LEFT JOIN categorias c ON cr.id_categoria = c.id_categoria
LEFT JOIN usuarios u ON u.id = r.id_usuario
WHERE u.id = idUsuario
GROUP BY r.id;
ELSE 
SELECT u.usuario, u.url_avatar, r.id, r.titulo, r.url_imagen, r.pasos, r.createdAt, GROUP_CONCAT(c.nombre) AS categorias
FROM recetas r
LEFT JOIN categorias_recetas cr ON cr.id_receta = r.id
LEFT JOIN categorias c ON cr.id_categoria = c.id_categoria
LEFT JOIN usuarios u ON u.id = r.id_usuario
GROUP BY r.id;
END IF;
END //

DELIMITER //
CALL traer_recetas(29);

-- Procedimiento para ACTUALIZAR RECETA
DELIMITER //
CREATE PROCEDURE `actualizar_receta`(IN idReceta INT, IN nuevoTitulo VARCHAR(150), IN nuevosPasos TEXT, IN nuevaImagen VARCHAR(500))
BEGIN
UPDATE recetas
SET titulo = nuevoTitulo, pasos = nuevosPasos, url_imagen = nuevaImagen, updatedAt = CURDATE()
WHERE id = idReceta;

DELETE FROM categorias_recetas WHERE id_receta = idReceta;
END //

DELIMITER ;
-- Procedimiento para actualizar NOMBRE,NOMBRE DE USUARIO del perfil y foto de perfil, nada más.
DELIMITER //
CREATE PROCEDURE `actualizar_perfil`(IN idCuenta INT, IN nuevoNombre VARCHAR(100), IN nuevoUsuario VARCHAR(20), IN nuevaUrl VARCHAR(500))
BEGIN
UPDATE usuarios
SET nombre = nuevoNombre, usuario = nuevoUsuario, url_avatar = nuevaUrl
WHERE id = idCuenta;
SELECT nombre AS nombre, usuario AS usuario FROM usuarios WHERE id = idCuenta ;
END //



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


DELIMITER //
CREATE PROCEDURE `traer_receta_detallada`(IN idReceta INT, IN idUser INT)
BEGIN
SELECT r.*, GROUP_CONCAT(c.nombre) AS categorias 
FROM recetas r
LEFT JOIN categorias_recetas cr ON cr.id_receta = r.id
LEFT JOIN categorias c ON cr.id_categoria = c.id_categoria
WHERE r.id = idReceta AND r.id_usuario = idUser
GROUP BY r.id;
END //


-- Trigger para eliminar las categorías de la receta eliminada
DELIMITER //
CREATE TRIGGER eliminar_categoria_de_receta AFTER DELETE ON recetas
FOR EACH ROW
BEGIN
	DELETE FROM categorias_recetas WHERE id_receta = OLD.id;
END //

-- Triger para eliminar las recetas del usuario
DELIMITER //
CREATE TRIGGER eliminar_recetas_usuario BEFORE DELETE ON usuarios
FOR EACH ROW
BEGIN 
	DELETE FROM recetas WHERE id_usuario = OLD.id;
END //


INSERT INTO categorias_recetas(id_receta, id_categoria) VALUES (29,1);