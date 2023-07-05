const { DataTypes}   = require('sequelize')
const  sequelize  = require('../../database/connect.js')
const Receta = require('../ManyToMany/Receta')

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url_avatar: {
    type: DataTypes.STRING,
    default: null
  }
},
{
  sequelize,
  tableName:'usuarios'
})

Usuario.hasMany(Receta, {
  foreignKey: 'id_usuario'
})

module.exports = Usuario;