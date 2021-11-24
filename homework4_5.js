// import { getData } from "./modul.js";

let images = [];
let imgName = document.querySelector("input[type='text']");
const form_elem = document.querySelector("form");
const image_container = document.querySelector("div.imgs");
let fullImgDiv = document.getElementById("fullsc");

const url = "https://api.unsplash.com/search/photos";
const clientID = "_HU0q3abjProh4CDRwtUYS3GOEMjLzjmx9xrOw9ddjU";

async function getData(search_val) {
    const perPage = 30
    const fetchData = await fetch(`${url}?query=${search_val}&per_page=${perPage}&client_id=${clientID}`)
    const res = await fetchData.json()

    images.push(...res.results)
    return res.results
}
form_elem.addEventListener("submit", (e) => {
    e.preventDefault();

    image_container.innerHTML = ""
    getData(imgName.value).then(val => val.forEach((val) => new Img(val)))

})


function Img(val) {

    this.url = val.urls.regular;
    let img_elem = document.createElement("img");
    img_elem.setAttribute("src", this.url);
    img_elem.setAttribute("onclick", `fullScreen("${val.urls.raw}")`);
    img_elem.classList.add("im_style");

    image_container.appendChild(img_elem);
}

function fullScreen(url) {
    let fimg = document.createElement("img");
    fimg.setAttribute("src", url);
    fullImgDiv.appendChild(fimg);
    fullImgDiv.style.display = "block";
    fimg.setAttribute("ondblclick", `closeFullScreen(this)`);
    fimg.classList.add("full-img");
}

function closeFullScreen(elem) {
    elem.remove();
    fullImgDiv.style.display = "none";
}