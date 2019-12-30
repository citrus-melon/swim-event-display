const numberDisplay = document.getElementById('currentNumber'),
hiddenInput = document.getElementById('hiddenNumber'),
numberBtn = document.getElementsByClassName('currentNumber')[0],
leftBtn = document.getElementsByClassName('leftBtn')[0],
rightBtn = document.getElementsByClassName('rightBtn')[0],
recordBtn = document.getElementsByClassName('recordBtn')[0],
msgBox = document.getElementsByClassName('msgBox')[0],
sfxBtn = document.getElementsByClassName('toggleSFX')[0],
ttsBtn = document.getElementsByClassName('toggleTTS')[0];

const nextNumber = () => {
    numberDisplay.innerText = ++localState.number;
    socket.sendNumber()
}
const prevNumber = () => {
    numberDisplay.innerText = --localState.number;
    socket.sendNumber(localState.number)
}

const updateDOM = () => {
    if (localState.hideNumber) {
        numberBtn.classList.add('activated')
    } else {
    numberBtn.classList.remove('activated')
    }
    if (localState.sfx) {
        sfxBtn.classList.add('activated')
    } else {
        sfxBtn.classList.remove('activated')
    }
    if (localState.tts) {
        ttsBtn.classList.add('activated')
    } else {
        ttsBtn.classList.remove('activated')
    }
    numberDisplay.innerText = localState.number;
    msgBox.value = localState.msg;
}

const toggleSFX = () => {
    localState.sfx = !localState.sfx;
    socket.sendGeneric();
    if (localState.sfx) {
        sfxBtn.classList.add('activated')
    } else {
        sfxBtn.classList.remove('activated')
    }
}
const toggleTTS = () => {
    localState.tts = !localState.tts;
    socket.sendGeneric();
    if (localState.tts) {
        ttsBtn.classList.add('activated')
    } else {
        ttsBtn.classList.remove('activated')
    }
}

const handleNumberClick = (e) => {
if (e.target == numberDisplay) { // directly edit event number
    hiddenInput.value = localState.number;
    hiddenInput.select()
    numberBtn.classList.add('active');
    hiddenInput.focus()
} else { // toggle show event number
    localState.hideNumber = !localState.hideNumber;
    socket.sendGeneric();
    if (localState.hideNumber) {
            numberBtn.classList.add('activated')
    } else {
        numberBtn.classList.remove('activated')
    }
} 
}
rightBtn.addEventListener('click', nextNumber);
leftBtn.addEventListener('click', prevNumber);
sfxBtn.addEventListener('click', toggleSFX);
ttsBtn.addEventListener('click', toggleTTS);
numberBtn.addEventListener('click', handleNumberClick);
msgBox.addEventListener('input', () => {
    localState.msg = msgBox.value;
    socket.sendGeneric()
})

// hidden input event listeners
hiddenInput.addEventListener('input', () => {
    numberDisplay.innerText = hiddenInput.value;
})

hiddenInput.addEventListener('change', () => {
    hiddenInput.blur();
    localState.number = hiddenInput.value;
    if (hiddenInput.value == '') localState.number = 0;
    numberDisplay.innerText = localState.number;
    socket.sendNumber(localState.number)
})

hiddenInput.addEventListener('blur', () => {
    numberBtn.classList.remove('active');
})