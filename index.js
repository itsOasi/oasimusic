let get_latest = (data) => {
	let hero = document.getElementById("hero")
	let title = document.getElementById("song-title")
	let vid = sortPopular(data, "latest")
	console.log(vid)
	title.innerHTML = vid.title;
	if (vid.thumbnails.maxres)
		hero.style.backgroundImage = `url(${vid.thumbnails.maxres.url})`
	else
		hero.style.backgroundImage = `url(${vid.thumbnails.high.url})`
	hero.style.backgroundSize = "cover"
	hero.style.backgroundPosition = "center"
	
}


function get_popular(data) {
	sortLatest(data, "releases")
}

function sortPopular(data, el_id) {
	data_el = document.getElementById(el_id)
	console.log(data)
	videos = []
	for (item in data) {
		videos.push(data[item])
	}
	// videos.sort((a, b)=> b.publishedAt - a.publishedAt)
	videos.sort((a, b)=> b.viewCount - a.viewCount)
	return videos[0]

}

function sortLatest(data, el_id) {
	data_el = document.getElementById(el_id)
	console.log(data)
	videos = []
	for (item in data) {
		videos.push(data[item])
	}
	videos.sort((a, b)=> b.viewCount - a.viewCount)
	let count = 0;
	videos.forEach(v => {
		if (count < 3) {
			data_el.innerHTML += `<div class="song"><img src="${v.thumbnails.default.url}"><div class="song-details"><p>${v.title}</p><p>${v.viewCount}</p></div></div>`
			count++
		}
	});
}

window.onload = () => {
	fetch("http://localhost:8000/get_yt_data")
		.then((response) => response.json())
		.then((data) => {
			get_latest(data)
			get_popular(data)
		})
}