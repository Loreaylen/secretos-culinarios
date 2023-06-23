const express = require('express')
const router = express.Router()
const { mostrarTodas, buscar, mostrarDetalle } = require('../controllers/recetasControl')

router.get('/', mostrarTodas)
router.get('/:nombreDato', buscar)
router.get('/:idReceta', mostrarDetalle)
router.get('/:nombreDato/:idReceta', mostrarDetalle)





module.exports = router