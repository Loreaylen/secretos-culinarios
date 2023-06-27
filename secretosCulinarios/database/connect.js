const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('secretosCulinarios', 'root', '',{
dialect:'mysql',
port: 3306
})


module.exports = sequelize