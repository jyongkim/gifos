var apiKey = 'fpBZRb3C0HvYFqFbRomc6lxA2SUObxu7';
var url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${trendCount}&rating=g`;
var trendCount = 3;


window.addEventListener(
                    //Solicitar  =>   Manipulación datos => Interpretación
    'load', () => fetch(url).then( respuesta => respuesta.json().then(gif => {
        gif.data.forEach(item =>  {
            document.querySelector('.trend').innerHTML += `
            <img src="${item.images.original.url}">
            `
            
        });
    }))
)