/*Constantes y variables */
//	URLs Conexión.
    const searchURL	= 'https://api.giphy.com/v1/gifs/search';
    const tagsURL	= 'https://api.giphy.com/v1/tags/related/'
    const trendURL 	= 'https://api.giphy.com/v1/gifs/trending';
    const uploadURL = 'https://upload.giphy.com/v1/gifs';

// Parámetros de Giphy.
    var apiKey = 'fpBZRb3C0HvYFqFbRomc6lxA2SUObxu7';
    var trendCount = 3;
    var url = `${trendURL}?api_key=${apiKey}&limit=${trendCount}&rating=g`;

// Elementos del formulario.
    const searchInput = document.querySelector('#header input');
    const searchSelect = document.querySelector('#header select');
    const searchForm = document.querySelector('#header form');
    
// Áreas de la página.
    const results = document.querySelector('#results')

/* Área de búsqueda. */
    // Autocompletado.
        // Escuchador de eventos.
            searchInput.addEventListener('input', () => {
                if(searchInput.checkValidity()) {
                    searchWord = searchInput.value;
                    url = `${tagsURL}${searchWord}?api_key=${apiKey}&lang=es`;
                    searchSelect.innerHTML = '';

                // Consulta a API.
                    fetch(url).then(result => result.json()
                        .then(items => items.data.forEach(
                            item => { item != '' ? 
                                searchSelect.innerHTML += `<option value="${item.name}">${item.name}</option>`:
                                null
            }   )   )   )   }   }   )

        //Selección de sugerencia.
            searchSelect.addEventListener(
                'click', () => {
                    searchInput.value = searchSelect.value;
                    searchInput.focus();
                }
            )
        
        // Envío del formulario.
            searchForm.addEventListener(
                'submit', (e) => {
                    e.preventDefault();
                    searchWord = searchInput.value
                    limit = 12
                    offSet = 0
                    results.innerHTML = ''
                    url = `${searchURL}?api_key=${apiKey}&q=${searchWord}&limit=${limit}&offset=${offSet}&rating=g&lang=es`;
                    fetchGiphy(url, results, resultArea);
                }
            )
        
        // Función de la consulta.
            async function fetchGiphy(url, edit, build) {
                await fetch(url).then(result => result.json())
                    .then(items => items.data.forEach(
                        item => item != '' ? edit.innerHTML += build(item): null
                    ))
            }
        
        // Área de resultados.
            function resultArea(item) {
                return(
                    `<article>
                        <img src="${item.images.fixed_height_small.url}" alt="${item.title}"/>
                        <div class="hidden">
                            <p>
                                <strong>${item.title}</strong>
                                ${item.username}
                            </p>  
                        </div>
                    </article>
                    `
                )
            }
    

/* Manera larga del fetch*/
// window.addEventListener(
//                     //Solicitar  =>   Manipulación datos => Interpretación
//     'load', () => fetch(url).then( respuesta => respuesta.json().then(gif => {
//         gif.data.forEach(item =>  {
//             document.querySelector('.trend').innerHTML += `
//             <img src="${item.images.original.url}">
//             `
//         });
//     }))
// )

window.addEventListener(
    'load', () => fetchGiphy(url, document.querySelector('.trend'), resultArea)
)