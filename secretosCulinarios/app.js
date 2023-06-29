var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')


const sequelize = require('./database/connect.js')
const conexionDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Conexión exitosa a la BD.')
  } catch (err) {
    console.log(err)
  }
}
conexionDB()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const recetasRouter = require('./routes/recetas')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')

var app = express();

//Configurar sesión
app.use(session({
  secret: 'asdjgesougbjnsdf123',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 100000}
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recetas', recetasRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
