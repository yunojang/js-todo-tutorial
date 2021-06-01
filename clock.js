const clockContainer = document.querySelector('.js-clock'),
      clockTitle = clockContainer.querySelector('.js-title')

function renderDate(){
    const date = new Date();

    const hours = date.getHours(),
          minitue = date.getMinutes(),
          seconds = date.getSeconds();

    const less10 = (time) => time<10;

    clockTitle.textContent = `
        ${less10(hours) ? `0${hours}` : hours} :
        ${less10(minitue) ? `0${minitue}` : minitue} :
        ${less10(seconds) ? `0${seconds}` : seconds} 
    `
}

function init(){
    renderDate();

    setInterval(renderDate, 1000)
}

init();