const { DataTypes } = require('sequelize')
const sequelize = require('../../database/connect.js')

const Receta = sequelize.define('Receta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url_imagen: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  pasos: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
{
  sequelize,
  tableName: 'recetas'
})

module.exports = Receta;