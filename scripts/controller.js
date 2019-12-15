const eventDisplay = document.getElementById('currentEvent'),
hiddenInput = document.getElementById('hiddenNumber'),
eventBtn = document.getElementsByClassName('currentEvent')[0],
leftBtn = document.getElementsByClassName('leftBtn')[0],
rightBtn = document.getElementsByClassName('rightBtn')[0],
recordBtn = document.getElementsByClassName('recordBtn')[0],
msgBox = document.getElementsByClassName('msgBox')[0],
sfxBtn = document.getElementsByClassName('toggleSFX')[0],
ttsBtn = document.getElementsByClassName('toggleTTS')[0];

const localState = {
    eventNumber: 1,
    tts: true,
    sfx: true,
    msg: '',
    hideNumber: false
}

let nextEvent = () => {
    localState.eventNumber ++;
    eventDisplay.innerText = localState.eventNumber;
}
let prevEvent = () => {
    localState.eventNumber --;
    eventDisplay.innerText = localState.eventNumber;
}

let toggleSFX = () => {
    localState.sfx = !localState.sfx;
    if (localState.sfx) {
        sfxBtn.classList.add('activated')
    } else {
        sfxBtn.classList.remove('activated')
    }
}
let toggleTTS = () => {
    localState.tts = !localState.tts;
    if (localState.tts) {
        ttsBtn.classList.add('activated')
    } else {
        ttsBtn.classList.remove('activated')
    }
}

let handleNumberClick = (e) => {
if (e.target !== eventBtn) { // directly edit event number
    hiddenInput.value = localState.eventNumber;
    eventBtn.classList.add('active');
    hiddenInput.focus()
} else { // toggle show event number
    localState.hideNumber = !localState.hideNumber;
    if (localState.hideNumber) {
            eventBtn.classList.add('activated')
    } else {
        eventBtn.classList.remove('activated')
    }
} 
}
rightBtn.addEventListener('click', nextEvent);
leftBtn.addEventListener('click', prevEvent);
sfxBtn.addEventListener('click', toggleSFX);
ttsBtn.addEventListener('click', toggleTTS);
eventBtn.addEventListener('click', handleNumberClick);
// hidden input stuff
hiddenInput.addEventListener('input', () => {
    eventDisplay.innerText = hiddenInput.value;
}) 
hiddenInput.addEventListener('change', () => {
    hiddenInput.blur();
    localState.eventNumber = hiddenInput.value;
    if (hiddenInput.value == '') localState.eventNumber = 0;
    eventDisplay.innerText = localState.eventNumber;
})
hiddenInput.addEventListener('blur', () => {
    eventBtn.classList.remove('active');
})