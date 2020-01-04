const numberDisplay = document.getElementsByClassName("eventNum")[0],
msgBox = document.getElementsByClassName("customMsg")[0],
numberBox = document.getElementsByClassName("bigText")[0],
recordedVoice = document.getElementById("recordedVoice");

document.onkeydown = (e) => {
  if(e.key == "ArrowRight") {
    numberDisplay.innerText = ++localState.number;
    socket.sendNumber();
    backgroundAnimate();
  } else if (e.key == "ArrowLeft") {
    numberDisplay.innerText = --localState.number;
    socket.sendNumber();
    backgroundAnimate();
  }
}

const updateDOM = () => {
  numberDisplay.innerText = localState.number;
  msgBox.innerHTML = localState.msg;
  if (localState.hideNumber) {
    numberBox.style.display = "none"
  } else {
    numberBox.style.display = "block"
  }
}

const playRecorded = (e) => {
  let audioURL = URL.createObjectURL(e.data);
  recordedVoice.src = audioURL;
  recordedVoice.play();
}