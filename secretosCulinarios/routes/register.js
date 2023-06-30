const express = require('express')
const router = express.Router()
const { mostrarForm, submit} = require('../controllers/registerControl')
const { checkSchema, validationResult } = require('express-validator')
const registerValidators = require('../utils/registerValidators')

router.get('/', mostrarForm)

router.post('/', checkSchema(registerValidators), function(req, res){
const resultadosVal = validationResult(req).array()
console.log('FORM', req.body)
if(resultadosVal.length > 0){
  console.log(resultadosVal)
  res.render('register', {nombrePag: 'Registro', sesion: req.session.user || false, resultadosVal: resultadosVal})
  return
}
submit(req, res)
})

module.exports = router;