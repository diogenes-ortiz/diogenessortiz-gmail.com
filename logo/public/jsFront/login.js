window.addEventListener ('load', function(){
    let formulario = document.querySelector('form.login')
    formulario.addEventListener('submit', function(e){
        let errores = []
        let campoEmail = document.querySelector('input[name=email]')
        if (campoEmail.value.length < 2){
            errores.push('Email es obligatorio')
        }
        let contraseña = document.querySelector("label.password")
        let campoContraseña = document.querySelector('input[name=password]')
        if (campoContraseña.value.length < 2){
            
            errores.push('Contraseña es obligatoria')
        }
        if (errores.length > 0){
            e.preventDefault();
            let allErrors = document.querySelector('div.col-12.errores')
            for(let i = 0; i < errores.length; i++){
                allErrors.innerHTML += '<li>' + errores[i] + '</li>'
            }
        }
    })

})
