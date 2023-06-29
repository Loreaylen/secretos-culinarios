var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { nombrePag: 'Inicio', sesion: req.session.user || false });
});

module.exports = router;
