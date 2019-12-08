var swipe2right = false;
var othercolor = "coral";
var timer;
var dontAnimate = false

var backgroundanimate = () => {
  if (dontAnimate) return;
  dontAnimate = true;
  var newcolor = randomColor({luminosity:'bright'});
  if (swipe2right) {
    document.body.style.backgroundPosition = "left";
    swipe2right = false;
    timer = window.setTimeout(function() {
      document.body.style.backgroundImage = 'linear-gradient(to left, ' + newcolor + ' 50%, ' + othercolor + ' 50% )';
      othercolor = newcolor;
      dontAnimate = false;
    }, 1000);
  } else {
    swipe2right = true;  
    document.body.style.backgroundPosition = "right";
    timer = window.setTimeout(function() {
      document.body.style.backgroundImage = 'linear-gradient(to left, ' + othercolor + ' 50%, ' + newcolor + ' 50% )';
      othercolor = newcolor;
      dontAnimate = false
    }, 1000);
  }
}