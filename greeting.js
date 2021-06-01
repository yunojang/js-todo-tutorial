const form = document.querySelector('.js-form'),
    input = form.querySelector('input');

const greetingContainer = document.querySelector('.js-greeting'),
    title = greetingContainer.querySelector('.js-title'),
    resetButton = greetingContainer.querySelector('button');

const USER_LS = 'currentUser';

function removeName() {
    localStorage.removeItem(USER_LS);
}

function resetName() {
    removeName();
    askForName();
}

function saveName(text) {
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){
    event.preventDefault();

    const currentValue = input.value;
    if(!currentValue) return;

    saveName(currentValue);
    paintGreeting(currentValue)
}

function askForName() {
    greetingContainer.hidden = true;

    form.hidden = false;
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text) {
    form.hidden = true;

    greetingContainer.hidden = false;
    title.textContent = `Hello ${text}`;

    resetButton.addEventListener('click', resetName)
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();