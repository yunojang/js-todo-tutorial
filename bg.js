const IMG_NUMBER = 3;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add('bgImage');
    document.body.append(image);

}
function getRandomNumber() {
    return Math.floor(Math.random()*IMG_NUMBER)+1
}

function init() {
    const RandomNumber = getRandomNumber();
    paintImage(RandomNumber)
}
init(); 