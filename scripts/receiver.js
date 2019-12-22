var currentNumber = 1;
var numberDisplay = document.getElementsByClassName("eventNum")[0];
document.onkeydown = (e) => {
  if(e.key == "ArrowRight") {
    numberDisplay.innerText = ++currentNumber;
    backgroundAnimate();
  } else if (e.key == "ArrowLeft") {
    numberDisplay.innerText = --currentNumber;
    backgroundAnimate();
  }
}