let swipe2right = false,
othercolor = "coral",
timer,
currentlyAnimating = false;

const backgroundanimate = () => {
  if (currentlyAnimating) { //reset the debounce timer to wait until pressing stops
    
  } else {
    currentlyAnimating = true;
    let newcolor = randomColor({luminosity:'bright'}); // generate new color
    // change both colors to be the same to hide reset
    // disable the animation effect for reset
    document.body.style.backgroundPosition = "left"; // reset position of background
    // enable animation effect
    // update background colors for next animation
    // make notification sound
    document.body.style.backgroundPosition = "right"; // Animate/swipe the background
    timer = window.setTimeout(() => { 
      currentlyAnimating = false // set debounce timer
    }, 1000);
  }
}