const express = require('express')
const router = express.Router()
const {mostrarLogin, iniciarSesion} = require('../controllers/loginControl')

router.get('/', mostrarLogin)
router.post('/', iniciarSesion)

module.exports = router