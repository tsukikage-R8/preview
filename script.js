const video = document.getElementById("introVideo");
const loading = document.getElementById("loading");

/* 概要表示 */
function showAbout(){
const about = document.querySelector(".about");
if(about){
about.classList.add("show");
}
}

/* ローディング終了 */
function hideLoading(){
loading.classList.add("fadeout");

setTimeout(()=>{
showAbout();

/* ★ここ追加 */
revealText(".revealText", 45);

}, 800);
}


/* スマホ / PC 動画切替 */
function setVideo(){
if(window.innerHeight > window.innerWidth){
video.src = "https://www.image2url.com/r2/default/videos/1776771959037-d68b8fdf-0754-44ec-8d35-d4472ca33093.mp4";
}else{
video.src = "https://www.image2url.com/r2/default/videos/1776772732955-496ea1a3-0eb0-4503-918a-63db47937027.mp4";
}
}

setVideo();


/* 再生終了検知（最重要・安定版） */
video.addEventListener("timeupdate", () => {
if(video.duration && video.currentTime >= video.duration - 0.2){
hideLoading();
}
});

video.onended = hideLoading;


/* ハンバーガー */
const menuBtn = document.getElementById("menuBtn")
const mobileMenu = document.getElementById("mobileMenu")

menuBtn.onclick = ()=>{
mobileMenu.classList.toggle("open")
menuBtn.innerText = mobileMenu.classList.contains("open") ? "×" : "☰"
}

/* メニュー閉じる */
document.querySelectorAll(".mobileMenu a").forEach(link=>{
link.addEventListener("click",()=>{
mobileMenu.classList.remove("open")
menuBtn.innerText="☰"
})
})


/* popup */
const popup = document.getElementById("popup")

function openPopup(card){

popup.style.display="block"


const popupImage =
    document.getElementById("popupImage")
popupImage.src = card.dataset.image || ""
popupImage.style.display =
card.dataset.image ? "block" : "none"


document.getElementById("popupTitle").innerText =
card.dataset.title || ""

document.getElementById("popupText").innerText =
card.dataset.text || ""

document.getElementById("popupPlace").innerText =
card.dataset.place ? "場所：" + card.dataset.place : ""

document.getElementById("popupTime").innerText =
card.dataset.time ? "時間：" + card.dataset.time : ""

}

function closePopup(){
popup.style.display="none"
}


/* 上へ */
const topBtn = document.getElementById("topBtn")

window.onscroll = ()=>{
if(window.scrollY > 300){
topBtn.style.display="block"
}else{
topBtn.style.display="none"
}
}

topBtn.onclick = ()=>{
window.scrollTo({top:0,behavior:"smooth"})
}


/* カード */
document.querySelectorAll(".card").forEach(card=>{
card.onclick = ()=>{
openPopup(card)
}
})

function revealText(selector, delay = 45){

const elements = document.querySelectorAll(selector);

elements.forEach(el=>{
const spans = el.querySelectorAll("span");

/* 念のため初期化（再実行対策） */
spans.forEach(s=>{
s.classList.remove("show");
});

spans.forEach((s,i)=>{
setTimeout(()=>{
s.classList.add("show");
}, i * delay);
});
});

}

/*マップボタン*/
function openMap(){

const google = "https://maps.app.goo.gl/4tktvTTyDE61Mg3N7";
const apple  = "https://maps.apple/p/LUo4cpuv1EvB3Q";

/* iPhone / iPad */
if(/iPhone|iPad|iPod/.test(navigator.userAgent)){
window.open(apple, "_blank");
}else{
window.open(google, "_blank");
}

}

/*フィルター*/
function toggleFilter(){
const box=document.getElementById("filterBox")
box.style.display=box.style.display==="block"?"none":"block"
}

function toggleSearch(){
const box=document.getElementById("searchBox")
box.style.display=box.style.display==="block"?"none":"block"
}

/* 絞り込み */
function filterProjects(type){

document.querySelectorAll(".card").forEach(card=>{

if(type === "all"){
card.style.display = "block";
return;
}

if(card.dataset.grade === type){
card.style.display = "block";
}else{
card.style.display = "none";
}

});

}

/* 検索 */
function searchProjects(text){

text=text.toLowerCase()

document.querySelectorAll(".card").forEach(card=>{

const title=card.innerText.toLowerCase()

if(title.includes(text)){
card.style.display="block"
}else{
card.style.display="none"
}

})

}


/*スライダー*/
const slides = document.getElementById("slides");
const dots =
document.querySelectorAll(".paginationButton");

let current = 0;
const total = dots.length;

/* スライド更新 */
function updateSlide(){

slides.style.transform =
`translateX(-${current * 100}%)`;

dots.forEach(dot=>{
dot.classList.remove("isActive");
});

dots[current].classList.add("isActive");
}

/* 矢印 */
function moveSlide(dir){

current += dir;

if(current < 0){
current = total - 1;
}

if(current >= total){
current = 0;
}

updateSlide();
}

/* 自動スライド */
setInterval(()=>{
moveSlide(1);
},5000);

/* スワイプ対応 */

let startX = 0;
let endX = 0;

const carousel =
document.querySelector(".carousel");

carousel.addEventListener("touchstart",(e)=>{

startX = e.touches[0].clientX;

});

carousel.addEventListener("touchmove",(e)=>{

endX = e.touches[0].clientX;

});

carousel.addEventListener("touchend",()=>{

const diff = startX - endX;

/* 左スワイプ */
if(diff > 50){
moveSlide(1);
}

/* 右スワイプ */
if(diff < -50){
moveSlide(-1);
}

});

