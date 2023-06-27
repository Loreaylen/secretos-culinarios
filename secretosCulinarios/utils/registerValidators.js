const registerValidators = {
nombre: {
  isEmpty: {
    errorMessage: 'Campo obligatorio'
  },
  matches: { 
    options: /^[A-Za-z\s]*$/,
    errorMessage: 'El nombre no debe contener números'
  }
},
nombreUsuario: {
  isEmpty: {
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
    options: /\s/,
    errorMessage: 'El nombre de usuario debe contener entre 8 y 20 caracteres, sin espacios.'
  }
},
email: {
  isEmpty: {
    errorMessage: 'Campo obligatorio'
   },
  isEmail: {
    errorMessage: 'Email inválido'
  }
},
contraseña: {
  isEmpty: {
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
  isEmpty: {
    errorMessage: 'Campo obligatorio'
   },
   equals: {
    options: this.contraseña,
    errorMessage: 'La contraseña no coincide'
   }
}
}

module.exports = registerValidators