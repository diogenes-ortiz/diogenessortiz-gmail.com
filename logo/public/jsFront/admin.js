window.addEventListener('load', function(){
    let formulario = document.querySelector('form.formulario')
    formulario.addEventListener('submit', function(e){
        let errores = []
        
        
        let foto = document.querySelector('input.foto')
        let photo = document.querySelector('label.photo')
        if (foto.value == ''){
            errores.push("Debe seleccionar una imagen")

        }
        let nombre = document.querySelector('input.nombre')
            if(nombre.value.length < 5){
                errores.push('El nombre debe tener al menos 5 caracteres')
            }
        let descripcion = document.querySelector('input.descripcion')
         if(descripcion.value.length < 20){
            errores.push('La descripción debe tener al menos 20 caracteres')
        }
        let categoria = document.querySelector('input.categoria')
        if(categoria.value.length < 1){
            errores.push('Debe asignarle una categoria al producto')
        }
        let precio = document.querySelector('input.precio')
        if(precio.value == "" ){
            errores.push('Debe asignarle un precio al producto')
        }
        let sale1 = document.querySelector('input.sale1')


        if (errores.length > 0){
            e.preventDefault();
            let errors = document.querySelector('div.errores')
            for(let i = 0; i < errores.length; i++){
                errors.innerHTML += '<li>' + errores[i] +'</li>' 
              
            }
        }
    })
})