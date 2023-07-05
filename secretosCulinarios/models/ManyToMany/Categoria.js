const { DataTypes} = require('sequelize')
const sequelize = require('../../database/connect.js')
const Receta = require('./Receta')
const CategoriaReceta = require('./CategoriaReceta')

const Categoria = sequelize.define('Categoria', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize,
  tableName: 'categorias',
  timestamps: false
})

// Categoria.belongsToMany(Receta,{
//   through: CategoriaReceta,
//   foreignKey: 'id_categoria',
//   otherKey: 'id_receta'
// })

module.exports = Categoria;