# Secretos culinarios :stew:
Este proyecto simula un blog de recetas en el que un usuario se puede registrar y cargar recetas propias o guardarlas en favoritos. El usuario no registrado también puede visualizar todas las recetas.

## Tecnologías 

* HTML
* CSS
* JavaScript
* NodeJs
* Express
* Sequelize
* Mysql

## Dependencias
Este proyecto utiliza las siguientes dependencias:
* bcrypt 5.1.0
* cookie-parser 1.4.4
* debug 2.6.9
* ejs 2.6.1
* express 4.16.1
* express-session 1.17.3
* express-validator 7.0.1
* http-errors 1.6.3
* morgan 1.9.1
* mysql2 3.4.0
* nodemon 2.0.22
* sequelize 6.32.1
* sequelize-cli 6.6.1

## Configuración y creación de Base de Datos

### Script SQL

Antes de montar el servidor con nodemon, hay que crear la base de datos y los procedimientos almacenados. Para esto hay que dirigirse al archivo `bd_sequelize.sql`, abrirlo en workbench y ejecutar las querys.

En este archivo se encuentra:
* La query para crear y usar la base de datos.
* La query para crear la tabla `usuarios`
* Procedimientos almacenados que conforman el CRUD para el manejo de la cuenta del usuario.

### Conexión a la Base de datos.

Dentro de la carpeta `database` del proyecto se encuentra el archivo `connect.js` que contiene la configuración para conectarse a la base de datos creada anteriormente. 

```
const sequelize = new Sequelize('secretosCulinarios', 'root', '',{
dialect: 'mysql',
port: 3306
})
```
El primer parámetro de la función es el nombre de la base de datos. Adaptar el segundo y el tercero (el usuario y la contraseña respectivamente) para asegurarse de que no haya fallas en la conexión.

## Instalar dependencias
Abrir la terminal de git o cmd y dirigirse a la ubicación del repositorio local. Estando sobre la carpeta `secretosCulinarios`, ejecutar el comando:

```
npm i
```
## Montar el servidor
Para montar el servidor, ya ubicados en la carpeta `secretosCulinarios`, ejecutar:

```
npm start
```
también funciona 

```
nodemon bin/www
```

> **Nota:** Cambié el script para npm start para que ejecute el comando de nodemon. Por defecto estaba como `nodemon app.js`

En el navegador, dirigirse a `http://localhost:3000/` para ver el proyecto.
