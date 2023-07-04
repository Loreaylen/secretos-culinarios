const bcrypt = require('bcrypt')
const sequelize = require('../database/connect.js')
const Receta = require('../models/ManyToMany/Receta.js')
const Categoria = require('../models/ManyToMany/Categoria.js')

const usuarioControl = {
  'cargarError': function(req, res){
    res.render('errorPersonalizado', {nombrePag: Error, status: '404', message: 'No se encontró la página solicitada'})
  },
  'cargarPerfil': function(req,res){
    res.render('perfil', {nombrePag: 'Mi perfil', sesion: req.session.user, success: req.query.success})
  },
  'editarPerfil': async function (req, res) {
   
    const datosBody = req.body
    const sessionUser = req.session.user
    const id = req.session.user.id

    try{
      const [data, metadat] = await sequelize.query(`CALL actualizar_perfil(${id}, '${datosBody.nombre}', '${datosBody.usuario}')`)
      sessionUser.nombre = data.nombre;
      sessionUser.usuario = data.usuario;
      res.render('perfil', {nombrePag: 'Mi perfil', sesion: req.session.user, success: true})
    }
    catch(err){
      res.render('perfil', {nombrePag: 'Mi perfil', sesion: req.session.user, success: false})
    }
    
     
   
  },
  'eliminarCuenta': async function(req, res){
    console.log('SESION USER', req.session.user)
    try{
      const [data, metadata] = await sequelize.query(`CALL eliminar_cuenta(${req.session.user.id})`)
      if(data.resultado){
        req.session.destroy(err => {
          if(err){
            console.log('ERROR: no se pudo destruir la sesión')
            return
          }
          console.log('SESION DESTRUIDA')
        })
      return true
      }
      else throw Error('El procedimiento falló')

    }
    catch (err){
      console.log('no se pudo eliminar el usuario, ', err)
    }
  },
  'cargarRecetasUsuario': async function(req,res){
    const idUser = req.session.user.id
    try {
      const [data, metadata] = await sequelize.query(`CALL traer_recetas(${idUser})`, {
        nest: true
      })
     res.render('recetasUsuario', {nombrePag: 'Mis recetas', sesion: req.session.user, recetas: Object.values(data)})
    }
    catch (err){
      console.log(err)
    }
   
  
  },
  'mostrarVistaAgregarReceta': async function(req, res){
    try{
      const [categorias, metadata] = await sequelize.query(`SELECT * FROM categorias;`)
      res.render('agregarReceta', {nombrePag: 'Agregar Receta', sesion: req.session.user, categorias: categorias, success: false})
    }
   catch(err){
      res.render('errorPersonalizado', {nombrePag: Error, status: '404', message: 'Ocurrió un error inesperado'})
   }
  },
  'agregarReceta': async function(req, res){
    const idUser = req.session.user.id
    const datosReceta = req.body

    const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1;
const anio = fecha.getFullYear();

const fechaFormateada = `${anio}-${mes}-${dia}`;
   
      sequelize.query(`
      INSERT INTO recetas (titulo, url_imagen, pasos, id_usuario, createdAt, updatedAt)
      VALUES('${datosReceta.titulo}', '${datosReceta.url_imagen}', '${datosReceta.pasos}', ${idUser}, '${fechaFormateada}', '${fechaFormateada}')
      `)
      .then(resultado => { console.log('RESULTADO', resultado[0], resultado[1])
        const id = resultado[0]
        let text = ''
        const categorias = req.body.categorias

        for (let c of categorias){
          text += `(${id}, ${c}),`
        }
        sequelize.query(`INSERT INTO categorias_recetas(id_receta, id_categoria) VALUES ${text.substring(0, text.length -1)};`)
        })
      .then(() => {
        res.redirect('/usuario/recetas')
      })
      .catch(err => console.log(err)) 
  },
  'eliminarReceta': async function(req, res){
    const idReceta = req.params.id
    
      await sequelize.query(`DELETE FROM recetas WHERE id = ${idReceta}`,
      (err, results) => {
        if(err){
          console.log(err)
        }
        else {
          res.redirect('usuario/recetas')
        }
      }
      )
      
      res.redirect('/usuario/recetas')
    
   
  }
}

module.exports = usuarioControl;