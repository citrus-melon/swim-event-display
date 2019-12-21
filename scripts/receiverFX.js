let swipe2right = false,
othercolor = "teal",
timer,
currentlyAnimating = false;

const backgroundAnimate = () => {
  if (currentlyAnimating) { //reset the debounce timer to wait until pressing stops
    window.clearTimeout(timer);
    timer = window.setTimeout(() => { 
      currentlyAnimating = false;
      handleTTS();
    }, 1000);
  } else {
    currentlyAnimating = true;
    let newcolor = randomColor({luminosity:'bright'}); // generate new color
    document.body.style.backgroundImage = othercolor; // change both colors to be the same to hide reset
    document.body.classList.add("notransition"); // disable the animation effect for reset
    document.body.style.backgroundPosition = "left"; // reset position of background
    document.body.offsetHeight;
    document.body.classList.remove('notransition'); // enable animation effect
    // update background colors for next animation
    document.body.style.backgroundImage = 'linear-gradient(to right, ' + othercolor + ' 50%, ' + newcolor + ' 50% )';
    othercolor = newcolor; // update the othercolor
    handleSFX()
    document.body.style.backgroundPosition = "right"; // Animate (swipe) the background
    timer = window.setTimeout(() => { 
      currentlyAnimating = false; // set debounce timer
      handleTTS();
    }, 1000);
  }
}

const handleSFX = () => {
  document.getElementById("sound").play();
}

const handleTTS = () => {
  let utterThis = new SpeechSynthesisUtterance('event, ' + currentEvent);
  window.speechSynthesis.speak(utterThis)
}