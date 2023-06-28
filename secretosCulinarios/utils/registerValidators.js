// Comparar password
const compararPass = (val, {req}) => {
  if(val !== req.body.contraseña){
    throw new Error('La contraseña no coincide')
  }
  return true
}

const registerValidators = {
nombre: {
  notEmpty: {
    errorMessage: 'Campo obligatorio'
  },
  matches: { 
    options: /^[A-Za-z\s]+.*$/,
    errorMessage: 'El nombre no debe contener números ni caracteres especiales'
  }
},
nombreUsuario: {
  notEmpty: {
    errorMessage: 'Campo obligatorio'
  },
  isLength: {
    options: {
      min: 6,
      max: 20
    },
    errorMessage: 'El nombre de usuario debe contener entre 8 y 20 caracteres, sin espacios.'
   },
  matches: {
    options: /^\S*$/,
    errorMessage: 'El nombre de usuario debe contener entre 8 y 20 caracteres, sin espacios.'
  }
},
email: {
  notEmpty: {
    errorMessage: 'Campo obligatorio'
   },
  isEmail: {
    errorMessage: 'Email inválido'
  }
},
contraseña: {
  notEmpty: {
    errorMessage: 'Campo obligatorio'
   },
   isStrongPassword: {
    options: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un caracter especial y un número'
  }
},
contraseña2: {
  notEmpty: {
    errorMessage: 'Campo obligatorio'
   },
   custom: {
    options: compararPass
   }
}
}

module.exports = registerValidators