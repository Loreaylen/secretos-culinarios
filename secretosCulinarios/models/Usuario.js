const { Datatypes } = require('sequelize')
const { sequelize } = require('../database/connect.js')

const Usuario = sequelize.init('Usuario', {
  id: {
    type: Datatypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Datatypes.STRING,
    allowNull: false
  },
  apellido: {
    type: Datatypes.STRING,
    allowNull: false
  },
  usuario: {
    type: Datatypes.STRING,
    allowNull: false
  },
  contraseña: {
    type: Datatypes.STRING,
    allowNull: false
  },
  url_avatar: {
    type: Datatypes.STRING,
    default: null
  }
},
{
  sequelize,
  tableName:'usuarios'
})

module.exports = Usuario;