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
    localState.number ++;
    numberDisplay.innerText = localState.number;
    socket.sendNumber()
}
const prevNumber = () => {
    localState.number --;
    numberDisplay.innerText = localState.number;
    socket.sendNumber(localState.number)
}

const toggleSFX = () => {
    localState.sfx = !localState.sfx;
    if (localState.sfx) {
        sfxBtn.classList.add('activated')
    } else {
        sfxBtn.classList.remove('activated')
    }
}
const toggleTTS = () => {
    localState.tts = !localState.tts;
    if (localState.tts) {
        ttsBtn.classList.add('activated')
    } else {
        ttsBtn.classList.remove('activated')
    }
}

const handleNumberClick = (e) => {
if (e.target !== numberBtn) { // directly edit event number
    hiddenInput.value = localState.number;
    hiddenInput.select()
    numberBtn.classList.add('active');
    hiddenInput.focus()
} else { // toggle show event number
    localState.hideNumber = !localState.hideNumber;
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

// hidden input stuff
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