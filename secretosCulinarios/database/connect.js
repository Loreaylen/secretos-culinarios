const {Sequelize} = require('sequelize')

// Recordar cambiar la contraseña

const sequelize = new Sequelize('secretosCulinarios', 'root', 'root',{
dialect: 'mysql',
port: 3306
})

module.exports = sequelize