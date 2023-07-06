const toggleMenu = $('.toggleMenu')
const toggleUsuario = $('.toggleUsuario')
const menuPrincipal = $('.menuPrincipal')
const menuUsuarioCtn = $('.menuUsuarioCtn')

$(toggleMenu).on('click', ()=> {
  $(menuPrincipal).toggleClass('invisible')
})

console.log(menuUsuarioCtn)
console.log($(menuUsuarioCtn).css('display'))
$(toggleUsuario).on('click', () => {
 if($(menuUsuarioCtn).css('display') == 'none'){
  $(menuUsuarioCtn).css('display', 'flex')
  return
 }
 $(menuUsuarioCtn).css('display', 'none')
})