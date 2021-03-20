const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
const selectAll = document.getElementById("select-all");
const pause = document.getElementById("pause");
// selected image 
let sliders = [];
let _hide = 1;
let _p = 1;


pause.addEventListener("click", () => {
	if (_p === 1) {
		_p = 2
	} else {
		_p = 1
	}
	console.log(_p)
})

selectAll.addEventListener("click", () => {
	let _m = document.getElementsByClassName("col-lg-3 col-md-4 col-xs-6 img-item mb-2");
	if (_hide === 1) {
		for (let i =0; i<_m.length; i++) {
			_m[i].children[0].click()
		}
		_hide = 2
	} else {
		for (let i =0; i<_m.length; i++) {
			_m[i].children[0].classList.remove('added');
			sliders.splice(sliders.indexOf(_m[i].children[0].src), 1);
		}
		_hide = 1
	}
})

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
	imagesArea.style.display = 'block';
	gallery.innerHTML = '';
	// show gallery title
	galleryHeader.style.display = 'flex';
	images.forEach(image => {
		let div = document.createElement('div');
		div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
		div.innerHTML = `<img class="img-fluid img-thumbnail" onclick=selectItem1(event,"${image.webformatURL}") ondblclick=selectItem2(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;// ---- largeImageURL
		gallery.appendChild(div)
	})
}
const getImages = (query) => {
	fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
		.then(response => response.json())
		.then(data => showImages(data.hits))
		.catch(err => console.log(err))
}

let slideIndex = 0;
const selectItem1 = (event, img) => {
	let element = event.target;
	element.classList.add('added');
	
	let item = sliders.indexOf(img);
	if (item === -1) {
		sliders.push(img);
	}
}
const selectItem2 = (event, img) => {
	let element = event.target;
	
	let item = sliders.indexOf(img);
	if (item !== -1) {
		element.classList.remove('added');
		sliders.splice(sliders.indexOf(img), 1);
	}
}
// const selectItem1 = (event, img) => {
// 	let element = event.target;
// 	element.classList.add('added');
	
// 	let item = sliders.indexOf(img);
// 	if (item === -1) {
// 		sliders.push(img);
// 	} else {
// 		element.classList.remove('added');
// 		sliders.splice(sliders.indexOf(img), 1);
// 	}
// }

var timer
const createSlider = () => {
	// check slider image length
	if (sliders.length < 2) {
		alert('Select at least 2 image.')
		return;
	}
	let _duration_ = parseInt(document.getElementById('duration').value);
	if (_duration_ <= 0) {
		alert('Enter a positive(+) Duration.')
		return;
	}
	const duration = (_duration_ || 1000);
		// const duration = document.getElementById('duration').value || 1000;
		// const _duration_ = (parseInt(.value) || 1000);
    	// const duration = _duration_ <= 0 ? 1000: _duration_;
	// crate slider previous next area
	sliderContainer.innerHTML = '';
	const prevNext = document.createElement('div');
	prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
	prevNext.innerHTML = ` 
	<span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
	<span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
	`;

	sliderContainer.appendChild(prevNext)
	document.querySelector('.main').style.display = 'block';
	// hide image aria
	imagesArea.style.display = 'none';
	// ///////// Duration Was Here
	sliders.forEach(slide => {
		let item = document.createElement('div')
		item.className = "slider-item";
		item.innerHTML = `<img class="w-100" src="${slide}" alt="">`;
		sliderContainer.appendChild(item)
	})
	changeSlide(0)
	timer = setInterval(function () {
		slideIndex++;
		changeSlide(slideIndex);
	}, duration);
}

// change slider index 
const changeItem = index => {
	changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {
	if (_p === 1) {
		const items = document.querySelectorAll('.slider-item');
		if (index < 0) {
			slideIndex = items.length - 1
			index = slideIndex;
		};

		if (index >= items.length) {
			index = 0;
			slideIndex = 0;
		}

		items.forEach(item => {
			item.style.display = "none"
		})

		items[index].style.display = "block"
	}
}

searchBtn.addEventListener('click', function () {
	document.querySelector('.main').style.display = 'none';
	clearInterval(timer);
	/////////////////// Search Was Here
	getImages(search.value)
	sliders.length = 0;
})
search.addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		searchBtn.click();
	}
})

sliderBtn.addEventListener('click', function () {
  	createSlider()
})
