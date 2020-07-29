window.addEventListener('load', function(){
    let formulario = document.querySelector('form.formulario')
    formulario.addEventListener('submit', function(e){
        let errores = []
        let campoNombre = document.querySelector('input.formularionombre')
        let nombre = document.querySelector('h3.nombrecito')
        if (campoNombre.value.length < 2 ){
            nombre.className = 'incorrecto'
            errores.push('El nombre debe tener mínimo 2 caracteres')
        } else{
            nombre.className = 'correcto'
        }

        let campoApellido = document.querySelector('input.formularioapellido')
        let apellido = document.querySelector('h3.apellidito')
        if (campoApellido.value.length < 2 ){
            apellido.className = 'incorrecto'
            errores.push('El apellido debe tener mínimo 2 caracteres')
        } else{
            apellido.className = 'correcto'
        }
        
        let campoContraseña = document.querySelector('input.formulariocontraseña')
        let password = document.querySelector('h3.contraseña')
        if (campoContraseña.value.length < 8){
            password.className = 'incorrecto'
            errores.push('La contraseña debe tener un mínimo de 8 caracteres')
        } else{
            password.className = 'correcto'
        }
        let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        let campoEmail = document.querySelector('input.formularioemail')
        let correo = document.querySelector('h3.email')
        if (!regexEmail.test(campoEmail.value)){
            correo.className = 'incorrecto'
            errores.push('El email no es válido')
        } else{
            correo.className = 'correcto'
        }
        let avatar = document.querySelector('input.avatarr')
        let h3imagen = document.querySelector('h3.imagen')
        if(avatar.value == ''){
            h3imagen.className = 'incorrecto'
            errores.push('Debe seleccionar una foto')
        } else{
            h3imagen.className = 'correcto'
        }
        function validar() {
            // Obtener nombre de archivo
            let archivo = document.getElementById('archivo').value,
            // Obtener extensión del archivo
                extension = archivo.substring(archivo.lastIndexOf('.'),archivo.length);
            // Si la extensión obtenida no está incluida en la lista de valores
            // del atributo "accept", mostrar un error.
            if(document.getElementById('archivo').getAttribute('accept').split(',').indexOf(extension) < 0) {
              alert('Archivo inválido. No se permite la extensión ' + extension);
            }
          }

        if (errores.length > 0){
            e.preventDefault();
            let allErrors = document.querySelector('div.errores')
            for(let i = 0; i < errores.length; i++){
                allErrors.innerHTML += '<li>' + errores[i] +'</li>' 
              
            }
        }
    })
})