import API_Key from 'apikey.js'

let photosArray = [];
const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


//Unsplash API
const count = 15;
const apiKey = API_Key;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`


function setAttributes(element, attributes){
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function imageLoaded(){
    imageLoaded++
    if(imageLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
    };
};

//Create Elements for links and photos, add to DOM
function displayPhotos(){
    imageLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((phot)=> {
        const item = document.createElement('a')

        setAttributes(item,{
            href: photo.link.html,
            target: '_blank'
        })
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        img.addEventListener('load', imageLoaded())
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}


window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})


//Get Photos from Unsplash
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json()
        displayPhotos();
    } catch (error){

    }
}

// OnLoad 
getPhotos()