const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('secretosCulinarios', 'root', '',{
dialect: 'mysql',
port: 3306
})
console.log(sequelize.config)
module.exports = sequelize