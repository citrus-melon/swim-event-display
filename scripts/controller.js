const numberDisplay = document.getElementById('currentNumber'),
hiddenInput = document.getElementById('hiddenNumber'),
numberBtn = document.getElementsByClassName('currentNumber')[0],
leftBtn = document.getElementsByClassName('leftBtn')[0],
rightBtn = document.getElementsByClassName('rightBtn')[0],
recordBtn = document.getElementsByClassName('recordBtn')[0],
msgBox = document.getElementsByClassName('msgBox')[0],
sfxBtn = document.getElementsByClassName('toggleSFX')[0],
ttsBtn = document.getElementsByClassName('toggleTTS')[0];
const socket = new WebSocket ('wss://connect.websocket.in/v2/1?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkyNjg3ZDY1YWVjNDI3ZmRlYjA0ZDFkN2U2MzM5YWZlN2ExNGU2OTgwMTE1ODI3N2NlNGEzMTBkMTY4ZmVmZjEwZWI0MDgyNDU4YzhhOWY0In0.eyJhdWQiOiI2IiwianRpIjoiOTI2ODdkNjVhZWM0MjdmZGViMDRkMWQ3ZTYzMzlhZmU3YTE0ZTY5ODAxMTU4Mjc3Y2U0YTMxMGQxNjhmZWZmMTBlYjQwODI0NThjOGE5ZjQiLCJpYXQiOjE1NzQ1MzgyNzYsIm5iZiI6MTU3NDUzODI3NiwiZXhwIjoxNjA2MTYwNjc2LCJzdWIiOiI2MSIsInNjb3BlcyI6W119.KA5SpcvyKBsTyrEOGbd0B6iSh9YptKb3uo_-n2uUErZJL617fm5zXvyRw_oiwQnzbP_TCSiqgkUWl-OKeycGDHb2UW_Fn2TFDbJ6ePQuKIsZOFQ7kccQqidWi4nDgVnIS-xkl8iQrVeCtTZdj_v8i8tG_6WU_Zfdbq4xyFmb3lbsECngxhc9yKa7wq-kB-_asQ4t1sCqO5R59ZIiKIyWiY759SN9Ji3dYTsV6RARhQ4bV18KDV1gkk_wuQS098-0zahWhlzy0uJX4c4sMjVbHCqd6Pu219pYEphV0esUKoolNUc6s6ZDEkDmHVoaUiwb1MPZB-0fpFe5RNKAz3g-ebRl-qGQWjTy_NhkqW5wFa_bdMQ7SeGUh6N6azZELjV2-4jkUlI2GIM1eJruuvZRjPwukqtFYCYDdwvpR6JY012slzBLmA7WUHPYUm0UxqqzEN0TqaJuHU8eUVp4djRgYCqiKQPPM2u5HMxlpJNKyo_cLehJFd50Ko1-UlZj9x5N5az8_QK-UP5-6B6HpGfyEcX1XzwndXwhK3jJM46dyqOV6O1uvOvKcl5o96nPdHvqo81JNK5OHejRkkiFWNTNcgh1GkHu4vMiD3KBJMZnX8TXj2I50b0_HP5Vkry2MU2kNA2elO-Jfis9fGaaoVv-ExbkZDVc42WgXxQVWI22Bn8');

const localState = {
    number: 1,
    tts: true,
    sfx: true,
    msg: '',
    hideNumber: false
}

let nextNumber = () => {
    localState.number ++;
    numberDisplay.innerText = localState.number;
    socket.send(localState.number)
}
let prevNumber = () => {
    localState.number --;
    numberDisplay.innerText = localState.number;
    socket.send(localState.number)
}

let updateNumber = () => {

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
if (e.target !== numberBtn) { // directly edit event number
    hiddenInput.value = localState.number;
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
})
hiddenInput.addEventListener('blur', () => {
    numberBtn.classList.remove('active');
})