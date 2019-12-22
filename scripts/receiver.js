const numberDisplay = document.getElementsByClassName("eventNum")[0],
msgBox = document.getElementsByClassName("customMsg")[0]
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
}