const express = require('express')
const router = express.Router()
const { cerrarSesion } = require('../controllers/logoutControl')

router.get('/', cerrarSesion )

module.exports = router;