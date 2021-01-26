/*	Aplication data	*/
	//	URLs Connection.
		const idURL		= `https://api.giphy.com/v1/`
		const searchURL	= `${idURL}gifs/search`
		const tagsURL	= `${idURL}tags/related/`
		const trendURL 	= `${idURL}gifs/trending`
		const uploadURL = `https://upload.giphy.com/v1/gifs`
		const gifURL	= `https://media.giphy.com/media/`
		const apiKey 	= `fpBZRb3C0HvYFqFbRomc6lxA2SUObxu7`
		// 	Parameters.
		let url, limit  = 3, offset = 0, phase;
		let total, pages, msg = 'favs';
		let m = 0, s = 0;
		let likeHit = [], binHit = [], openHit = [], nowItem;
		let totalGifs = [], totalFavs = []
/*	Event areas	*/
	//	Navigation elements.
		const menuBtn	= document.querySelector('nav #menu') // Botón para abrir el menú.
		const menuList	= document.querySelector('nav .menu') // Lista con los hipervículos.
		const menuItem	= document.querySelectorAll('nav li') // Array de los ítems de la lista. Para marcarlos como activos.
		const modeItem	= document.querySelector('#mode') // Botón anterior de la navegación del área trending.
		const modeLabel	= document.querySelector('label[for="mode"]') // Botón siguiente de la navegación del área trending.
		const prevItem	= document.querySelector('section:last-child > .prev') // El input oculto de tipo checkbox.
		const nextItem	= document.querySelector('section:last-child > .next') // Etiqueta vinculada al input anterior.
	//	Search form.
		const frmSearch	= document.querySelector('#search') // Formulario ('submit').
		const textField = document.querySelector('#search input') // Campo de búsqueda ('input').
		const dataList 	= document.querySelector('#suggestion') // Lista desplegable ('click')
	//	Results area.
		const titleArea = document.querySelector('section .title') // Área de las palabras buscadas.
		const hitsArea 	= document.querySelector('#results div') // Área donde se cargan los gifs.
		const pageArea 	= document.querySelector('#pagination') // Área de los totales y la cantidad de páginas.
		const trendArea = document.querySelector('#trending div') // Área trending topic.
	//	Recording section.
		const stageArea	= document.querySelectorAll('#crear_gifo .menu li') // Etapas de la grabación.
		const gifBtn 	= document.querySelector('#crear_gifo button') // Botón que cambia de texto.
		const gifMedia 	= document.querySelector('#crear_gifo article video') // Video.
		const gifView	= document.querySelector('#crear_gifo article img') // Imágen.
		const recAgain	= document.querySelector('#crear_gifo .menu a') // El hipervículo que vuelve a la etapa 1.
		const recMsg	= document.querySelector('#crear_gifo .message') // El mensaje que aparece en las etapas de grabación.
	//	Favorites section.
		const favArea 	= document.querySelector('#favoritos div') // Área de favoritos.
		const noFavs 	= document.querySelector('#favoritos .noItems') // Área sin favoritos.
	//	Mis Gifos section.
		const gifArea	= document.querySelector('#mis_gifos div') // Área de Mis Gifos.
		const noGifs	= document.querySelector('#mis_gifos .noItems') // Área sin Mis Gifos.
/*	Functions and methods	*/
	//	Giphy API query.
		const fetchAPI = (url, editArea, buildArea, type = 'result') => { 
			fetch(url).then( response => response.json()
				.then( async giphy => { 
					giphy.pagination ? total = giphy.pagination.total_count : null
					giphy.data.forEach( item => editArea.innerHTML += buildArea(item, type) )
					showPages(url, total)
					loadStorage()
		}	)	)	};
	/*Components. Partes que se van a insentar dentro del HTML.*/
		//	Search results.
			const showGifs = (item, type) => (
				`<article id="${type == 'result' ? item.id : type + item.id}" 
					class="${type == 'fav_' ? 'favorite' : type == 'gif_' ? 'mygifo' : 'result'}">
					<img src="${ item.images.fixed_height_downsampled.url }" alt="${ item.title }" ismap />
					${showActions(item, type)}
				</article>`
			)
			const showActions = (item, type, isGif) => (
				`<div class="hidden">
					<p>	
						${item.username ? item.username : 'anonymous'}<br />
						<strong>${item.title ? item.title : 'untitled'}</strong>
					</p>
					<div class="social">
						${isGif ? '' : `<button class="icon ${ type == 'gif_' ? 'trash' : 
							type == 'fav_' ? ' fav active' : 'fav'}"></button>`}
						<button class="icon download"></button>
						<button class="icon ${ isGif ? 'link' : 'max' }"></button>
					</div>
				</div>`
			)
		//	Total pages.
			const showPages = (url, total) => {
				if (url.includes('search') && total >= 1) { 
					pageArea.innerHTML =
						`<ul>
							<li><strong>Resultados</strong>${total}</li>
							<li><strong>Paginas</strong> ${ ( actual = (offset / 12) + 1 ) <= (pages = Math.ceil(total / 12)) ?actual : pages } / ${ pages }</li>
						</ul>
						<button class="button">
							${ offset + limit <= total ? "Ver más...": "¡No hay más resultados!" }
						</button>`
				} else if (url.includes('search')){
					noResults(pageArea, 'results')
				}
			}
		//	Tips and suggestions.
			const showOptions = (item) => (
				`<option value="${item.name}">
					${item.name}
				</option>`
			)	
			const noResults = (editArea, icon) => {
				switch(icon){
					case 'favs': 
						msg = `"¡Guarda tu primer GIFO en favoritos <br/> para que se muestre aquí!"` 
					break;
					case 'results': 
						msg = `"Intenta con otra búsqueda."`
					break; 
					case 'gifs': 
						msg = `"¡Animate a crear tu primer GIFO!"`
					break;
				}
				editArea.innerHTML = `
					<img src="assets/icons/section_no_${icon}.svg" alt="ouch">
					<p class="notFound special">${msg}</p>`
			}
		//	Recording stopwatch.
			const timeStart = () => {
				clock(); recTime = setInterval( clock , 999 )
			}
			const clock = () => {
			    var mAux, sAux;
			    s++; if(s > 59){ m++; s=0 }
			    s < 10 ? sAux = "0" + s : sAux = s
			    m < 10 ? mAux = "0" + m : mAux = m
			    recAgain.innerHTML = `${mAux}:${sAux}`
			}
			const timeStop = () => {
				clearInterval(recTime)
				m = 0; s = 0; recAgain.innerHTML = `Repetir Captura`
			}
		//	Gifs creation.
			// Stage message.
				const showPhase = (phase) => {
					switch (phase) {
						case 1:
							msgTitle = `Aquí podrás<br/>crear tus propios <span class="special".>GIFOS</span>`
							msg = `¡Crea tu GIFO en sólo 3 pasos!<br/>(Sólo necesitas una cámara para grabar un video.)`
						break;
						case 2:
							msgTitle = `¿Nos das acceso <br/>a tu cámara?`
							msg = `El acceso a tu cámara será valido sólo<br/>por el tiempo en el que estés creando el GIFO`
						break;
						case 3:
							msgTitle = `class="loader"`
							msg = `Estamos subiendo tu GIFO...`
						break;
						case 4:
							msgTitle = `class="check"`
							msg = `¡GIFO subido con éxito!`
						break; 
					}
					// Evalúa la etapa y coloca el texto o la clase en consecuencia.
					phase >= 3 ? recMsg.classList.add('active') : recMsg.classList.remove('active')
					recMsg.innerHTML = ` 
						<h1 ${phase >= 3 ? msgTitle + '>' : '>' + msgTitle }</h1>
						<p>${msg}</p> 
						${phase == 4 ? showActions(item, 'gif_', true) : ''}`
				}
			const setPhase = (type) => {
			//	Recording stages.
				switch(phase){
					case 1:
						showPhase(2)
						gifBtn.innerHTML = 'Grabar'
						startGif()
						gifMedia.classList.add('show'); gifView.classList.remove('show')
						break
					case 2:
						timeStart()
						gifBtn.innerHTML = 'Finalizar'
						recGif()
						break;
					case 3:
						timeStop()
						gifBtn.innerHTML = 'Subir'
						stopGif()
						gifMedia.classList.toggle('show'); gifView.classList.toggle('show') 
						break;
					case 4:
						uploadGif()
						gifBtn.innerHTML = 'Comenzar'
						recMsg.classList.toggle('show')
					break;
					default:
						phase = 1; type = false
					break;
				}
			//	Class assignment.
				switch (type){
					case true:
						phase > 1 ? 
							stageArea[phase - 2].classList.remove('active') : null
						break;
					case false:
						for(i = 0 ; i < stageArea.length; i++){ stageArea[i].classList.remove('active') }
						break;
				}	phase < 4 ? stageArea[phase - 1].classList.add('active') : null
			}
	/*Navigation bar.*/
		//	Hamburger menu.
			menuBtn.addEventListener( 'click', () => { 
				menuList.classList.toggle('open') ? menuBtn.innerHTML = '&times;' : menuBtn.innerHTML = '&equiv;'
			}	)
		//	Active item.
			menuItem.forEach( (item, I) => item.addEventListener(
				'click', () => {
					for(i = 1 ; i < menuItem.length; i++){
						i === I ? menuItem[i].classList.toggle('active') : menuItem[i].classList.remove('active')
			}	}	)	)
		//	Mode record.
			modeLabel.addEventListener( 'click', () => {
				window.localStorage.setItem('mode', modeItem.checked )
			}	)	
	/* Data storage */
		//	Trending elements.
			window.addEventListener( 'load', () => { 
				localStorage.getItem('mode') == 'false' ? 
					modeItem.checked = true : modeItem.checked = false
				url = `${trendURL}?api_key=${apiKey}&limit=${limit}&rating=g`
				showPhase(1)
				fetchAPI(url, trendArea, showGifs)
			}	)
		// 	Saved elements.
			const loadStorage = () => {
				favArea.innerHTML = ``;	gifArea.innerHTML = ``
			//	Analisis de Storage
				if(localStorage.length != 0){
					totalGifs = [];	totalFavs = []
					for ( i = 0; i < localStorage.length; i++ ){  
				  		id = localStorage.key(i); item = JSON.parse(localStorage.getItem(id))
				  		if (id.includes('gif_')) {
				  			totalGifs.push(id); gifArea.innerHTML += showGifs(item, 'gif_')
				  		}
				  		if (id.includes('fav_')){
				  			totalFavs.push(id); favArea.innerHTML += showGifs(item, 'fav_')
				}	}	} 	 
				totalGifs.length == 0 ? noResults(noGifs, 'gifs') : noGifs.innerHTML = ``
				totalFavs.length == 0 ? noResults(noFavs, 'favs') : noFavs.innerHTML = ``
				for (i = 0; i < totalFavs.length ; i ++){
					isFav = totalFavs[i].slice(4)
					document.getElementById(isFav) ? document.getElementById(isFav).querySelector('.fav').classList.add('active'): null 
				}	userActions()
			}
		//	Add item.
			const addStorage = async (id, type) => {
				const response = await fetchURL(`${idURL}gifs/${id}?api_key=${apiKey}`)
				const data = JSON.stringify(response.data)
				localStorage.setItem(type + id, data)
				loadStorage()
			} 
		//	Remove item.
			const remStorage = (id) => {
				window.localStorage.removeItem( id )
				notFav = id.slice(4)
				document.getElementById(notFav) ? document.getElementById(notFav).querySelector('.fav').classList.remove('active') : null
				loadStorage()
			}
	/* Form */
		//	Search suggestions.
			textField.addEventListener( 'input', () => {
				if(textField.checkValidity()){
					dataList.innerHTML = ``; termino = textField.value
					url = `${tagsURL+termino}?api_key=${apiKey}&lang=es`
					fetchAPI(url, dataList, showOptions)
			}	}	)
			dataList.addEventListener( 'click', () => {
				textField.value = dataList.value 
				frmSearch.querySelector('button').click(); textField.focus()
			}	)
		//	Search results.
			frmSearch.addEventListener( 'submit', (e) => {
				e.preventDefault();	hitsArea.innerHTML = ``
				limit = 12;	offset = 0;	termino = textField.value
				url = `${searchURL}?api_key=${apiKey}&q=${termino}&limit=${limit}&offset=${offset}&rating=g&lang=es`
				titleArea.innerHTML = termino
				fetchAPI(url, hitsArea, showGifs)
			}	)
		//	Load pages.
			pageArea.onsubmit = (e) => {
				e.preventDefault();	offset += 12
				url = `${searchURL}?api_key=${apiKey}&q=${termino}&limit=${limit}&offset=${offset}&rating=g&lang=es`
				fetchAPI(url, hitsArea, showGifs)
			}
	/*Gifs creation*/
		// 	Recording process.
			recAgain.addEventListener( 'click', () => {
				phase = 1; setPhase(false)
			}	)
			gifBtn.addEventListener( 'click', () => {
				phase < 4 ? phase++ : phase = 1; setPhase(true)
			}	)
		// 	Check the webcam.
			const startGif = async() => {
				try{
					const stream = await navigator.mediaDevices.getUserMedia({
					audio: false, video: { max: 480 }
					}	)
					gifMedia.srcObject = stream;
					await gifMedia.play()
					recMsg.classList.toggle('show')
				} catch(error){
					alert('El dispositivo no está listo \n error:' + error)
				}
			}
		//	Start recording.
			const recGif = async() => {
				try{
					const stream = gifMedia.srcObject;
					videoRecorder = new RecordRTCPromisesHandler(stream, {
						type: "video",
						mimeType: "video/webm; codecs=vp8",
						disableLogs: true,
						videoBitsPerSecond: 128000,
						frameRate: 30,
						quality: 10,
						width: 480,
						hidden: 240
					}	)
					gifRecorder = new RecordRTCPromisesHandler(stream, {
						disableLogs: true,
						type: "gif",
						frameRate: 1,
						quality: 10,
						width: 480,
						hidden: 240
					}	)
					await videoRecorder.startRecording()
					await gifRecorder.startRecording()
					videoRecorder.stream = stream;
				}catch(error){
					alert('El dispositivo no está listo \n error:' + error)
				}
			}
			// 	Stop Recording
			const stopGif = async() => {
				try{
				// Content upload.
					await videoRecorder.stopRecording()
					await gifRecorder.stopRecording()
					const videoBlob = await videoRecorder.getBlob()
					const gifBlob = await gifRecorder.getBlob()
				// 	Output format.
					gifMedia.src = URL.createObjectURL(videoBlob)
					videoRecorder.stream.getTracks().forEach(t => t.stop())
					gifMedia.srcObject = null;
				// 	Reset parameters.
					await videoRecorder.reset(); await videoRecorder.destroy()
					await gifRecorder.reset(); await gifRecorder.destroy()
				//	Limpieza de contenido
					gifSrc = await gifBlob;
					gifView.src = URL.createObjectURL(await gifBlob)
					gifRecorder = null;	videoRecorder = null
				} catch(error){
					alert('El dispositivo no está listo \n error:' + error)
				}
			}
		//	Upload recording.
			const uploadGif = async() => {
				try{
				//	Starting the upload.
					showPhase(3)
					const formData = new FormData()
					formData.append("file", gifSrc, "api_Gifo.gif")
						const params = { method: "POST", body: formData, json: true }
				// 	Query upload URL.
					const response = await fetchURL(`${uploadURL}?api_key=${apiKey}`, params)	
					showPhase(4)
					id = response.data.id; item = response.data
					addStorage(id, 'gif_', true)
					recMsg.id = id;
					gifMedia.classList.toggle('show')
					gifView.classList.toggle('show')
				}catch(error){
					alert('El dispositivo no está listo \n error:' + error) 
				}
			}
		//	API query - Gif_Id.
			const fetchURL = async(url, params = null) => {
				const fetchData = await fetch(url, params)
				const response = await fetchData.json()	
				return response
			};
/* 	User actions */
	//	Action buttons.
		const userActions = () => {	
		//	Elements query.
				likeHit = document.querySelectorAll('.fav'); 
				binHit	= document.querySelectorAll('.trash');
				linkHit = document.querySelector('.link');
				downHit = document.querySelectorAll('.download');
				openHit = document.querySelectorAll('.max');
		//	Add and remove "like".
				likeHit.forEach( like => like.onclick = () => { 
					keyNodes(like)
					box.classList.contains('favorite') ? remStorage(box.id) : like.classList.toggle('active') ?	addStorage(box.id, 'fav_') : remStorage('fav_' + box.id)
				}	)
		//	Remove GIF.
				binHit.forEach( bin => bin.onclick = () => {
					keyNodes(bin)
					remStorage(box.id)
				}	)
		//	GIFs URL.
				if(linkHit){
					linkHit.onclick = () => {
					keyNodes(linkHit)
					Object.assign( link = document.createElement('a'), { 
							href: `${gifURL + box.id}/giphy.gif`, 
							target: `_blank` 
						}	)
					document.body.appendChild(link)
					link.click()
					document.body.removeChild(link)
					}
				}
		//	GIF Download.
				downHit.forEach( down => down.onclick = () => {
					keyNodes(down)
					linkURL = `${box.classList.contains('result') ? box.id : box.id.slice(4)}`
					url = `${gifURL + linkURL}/giphy.gif`;
					fetch(url).then(response => response.blob().then( giphy =>{
						saveURL = URL.createObjectURL(giphy)
						Object.assign( link = document.createElement('a'), { 
							href: saveURL, 
							download: `${item ? item.alt : 'mygif'}.gif` 
						}	)
					document.body.appendChild(link)
					link.click()
					document.body.removeChild(link)
					} 	)	)
				}	)
		//	Open GIF.	
			openHit.forEach( open  => open.onclick = () => {	
				keyNodes(open)
				box.classList.toggle('active')
				open.classList.toggle('max'); open.classList.toggle('close')
				prevItem.classList.toggle('selected'); nextItem.classList.toggle('selected')
			}	)	
		}
	//	Containers.
		const keyNodes = (param) => { 
			box = param.parentNode.parentNode.parentNode
			item = param.parentNode.parentNode.parentNode.querySelector('img')
		}
	//	Change view.
		nextItem.addEventListener('click', () => changeItem(nextItem,true))
		prevItem.addEventListener('click', () => changeItem(prevItem,false))
	//	Class exchange.
		const changeItem = (item, type) => {
		//	Action definition and query.
			(nowItem = document.querySelector('article.active')) ? null : (nowItem = document.querySelector('article.selected')) ? null : (nowItem = document.querySelector('section:last-child article'))
			firstItem = nowItem.parentNode.firstElementChild; lastItem  = nowItem.parentNode.lastElementChild
		//	Next element.
			switch(type){
				case true:
					nowItem == lastItem ? newItem = firstItem : newItem = nowItem.nextElementSibling;
				break;
				case false:
					nowItem == firstItem ? newItem = lastItem : newItem = nowItem.previousElementSibling;
				break;
			}	
		//	Minimize and maximize.
			if(item.classList.contains('selected')){
				nowItem.querySelector('.close').classList.replace('close','max')
				newItem.querySelector('.max').classList.replace('max','close')
				nowItem.classList.remove('active')
				newItem.classList.add('active')
			} else {
				nowItem.classList.contains('selected') ? newItem.classList.toggle('selected') : nowItem.classList.toggle('selected')
				newItem.classList.contains('selected') ? nowItem.classList.remove('selected') : null
			}
		}