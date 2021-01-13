/*	Constants and variables	*/
	//	URLs Connection.
    const searchURL	= 'https://api.giphy.com/v1/gifs/search';
    const tagsURL	= 'https://api.giphy.com/v1/tags/related/'
    const trendURL 	= 'https://api.giphy.com/v1/gifs/trending';
    const uploadURL = 'https://upload.giphy.com/v1/gifs';
    const idURL		= 'https://api.giphy.com/v1/gifs/'
    const apiKey 	= 'fpBZRb3C0HvYFqFbRomc6lxA2SUObxu7';
    // 	Parameters.
    let url, limit  = 3, offset = 0, phase;
    let total, pages, msg = 'favs';
    let m = 0, s = 0;
    let likeHit = [], openHit = [], nowItem;
    let totalGifs = [], totalFavs = []

/*	Event areas	*/
	//	Navigation elements.
    const menuBtn	= document.querySelector('#menu');
    const menuList	= document.querySelector('.menu');
    const menuItem	= document.querySelectorAll('.menu li');
    const prevItem	= document.querySelector('section:last-child > .prev');
    const nextItem	= document.querySelector('section:last-child > .next');
    //	Search form.
    const frmSearch	= document.querySelector('#search')
    const textField = document.querySelector('#search input')
    const dataList 	= document.querySelector('#suggestion')
    //	Results area.
    const titleArea = document.querySelector('section h1')
    const gifsArea 	= document.querySelector('#results')
    const pageArea 	= document.querySelector('#pagination')
    const trendArea = document.querySelector('#trending');
    //	Recording section.
    const stageArea	= document.querySelectorAll('#crear_gifo .menu li');
    const gifBtn 	= document.querySelector('#crear_gifo button');
    const gifMedia 	= document.querySelector('#crear_gifo article video');
    const gifView	= document.querySelector('#crear_gifo article img');
    const recAgain	= document.querySelector('#crear_gifo .menu a');
    //	Favorites section.
    const favArea 	= document.querySelector('#favoritos div');
    const noFavs 	= document.querySelector('#favoritos .noItems');
    //	Mis Gifos section.
    const myGifs	= document.querySelector('#mis_gifos div')
    const noGifs	= document.querySelector('#mis_gifos .noItems')