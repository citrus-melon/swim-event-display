var currentEvent = 1;
var eventDisplay = document.getElementsByClassName("eventNum")[0];
document.onkeydown = (e) => {
  if(e.key == "ArrowRight") {
    eventDisplay.innerText = ++currentEvent;
    backgroundanimate();
  } else if (e.key == "ArrowLeft") {
    eventDisplay.innerText = --currentEvent;
    backgroundanimate();
  }
}