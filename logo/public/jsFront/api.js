window.onload = function(){
    fetch('https://api.giphy.com/v1/gifs/random?api_key=kgDAJdmBzbsbSEHC8tb41s7YtIz4OYQq&tag=&rating=G')
    .then(function(respuesta){
        return respuesta.json();
    })
    .then(function(hola){
        console.log(hola)
        
        document.querySelector('img.imagen').src = hola.data.image_url
    })
}