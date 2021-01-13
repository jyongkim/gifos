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