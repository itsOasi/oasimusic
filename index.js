let get_latest = (data) => {
	let hero = document.getElementById("hero")
	let title = document.getElementById("song-title")
	let vid = sortLatest(data, "latest")
	let download_url = get_download_url(vid.item.description);
	let watch_url = `https://www.youtube.com/watch?v=${vid.key}`;
	console.log(vid)
	title.innerHTML = vid.item.title;
	if (vid.item.thumbnails.maxres)
		hero.style.backgroundImage = `url(${vid.item.thumbnails.maxres.url})`
	else
		hero.style.backgroundImage = `url(${vid.item.thumbnails.high.url})`
	hero.style.backgroundSize = "cover"
	hero.style.backgroundPosition = "center"
	document.getElementById("download-latest").href = download_url
	document.getElementById("watch-latest").href = watch_url
	
}


function get_popular(data) {
	sortPopular(data, "releases")
}

function sortLatest(data, el_id) {
	data_el = document.getElementById(el_id)
	console.log(data)
	videos = []
	for (item in data) {
		videos.push({"item":data[item], "key":item})
	}
	// videos.sort((a, b)=> b.publishedAt - a.publishedAt)
	videos.sort((a, b)=> b.item.viewCount - a.item.viewCount)
	return videos[0]

}

function sortPopular(data, el_id) {
	data_el = document.getElementById(el_id)
	console.log(data)
	videos = []
	for (item in data) {
		videos.push({"item":data[item], "key":item})
	}
	videos.sort((a, b)=> b.item.viewCount - a.item.viewCount)
	let count = 0;
	videos.forEach(v => {
		if (count < 3) {
			data_el.innerHTML += `<div class="song"><img src="${v.item.thumbnails.default.url}"><div class="song-details"><h1>${v.item.title}</h1><a href="${get_download_url(v.item.description)}" class="btn btn-lg btn-primary">Download Now > </a><a href="https://www.youtube.com/watch?v=${v.key}" class="btn btn-secondary">Watch Now</a></div></div>`
			count++
		}
	});
}

function get_download_url(desc){
	let url = ""
	let lines = desc.split("\n")
	for (line in lines) {
		if (lines[line].includes("Download: ")) {
			url = lines[line].split(" ")[1]
		}
	}
	console.log(url)
	return url
}

window.onload = () => {
	document.querySelector("nav").style.backgroundColor = `rgba(30, 30, 30, ${(window.scrollY / 100)})`
	fetch("https://oasimusic-server-633278362352.us-central1.run.app/get_yt_data")
		.then((response) => response.json())
		.then((data) => {
			get_latest(data)
			get_popular(data)
		})
}
window.onscroll = () => {
	if (window.scrollY < 100) {
		console.log("scrolling")
		document.querySelector("nav").style.backgroundColor = `rgba(30, 30, 30, ${(window.scrollY / 100)})`
	} else {
		document.querySelector("nav").style.opacity = "1"
		document.querySelector("nav").style.backgroundColor = "var(--background)"
	}
}
