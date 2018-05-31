// Declare/initialize some global variables
var fpsInterval, now, then, elapsed;
var fps = 60;

//keeps track of whether the mouse is up or down
var mouseDown = false;
document.body.onmousedown = function(){
  //console.log("mouse is down")
  mouseDown = true;
}
document.body.onmouseup = function(){
  //console.log("mouse is up")
  mouseDown = false;
}

//keeps track of mouse coordinates independent of other mouse events
var cursorX;
var cursorY;
document.onmousemove = function(e){
  cursorX = e.pageX - c.offsetLeft;
  cursorY = e.pageY - c.offsetTop;
}

var c = document.getElementById("drawbushka");
var ctx = c.getContext("2d");

ctx.fillStyle = "black";
var colorPicker = document.getElementsByTagName("td");

for(var i = 0; i < colorPicker.length; i++){
  colorPicker[i].addEventListener("click", 
    function(){
      console.log("color: " + this.getAttribute("clr"));
      ctx.fillStyle = this.getAttribute("clr"); //clr is a custom attribute containing a hex rgb value
    }
  ); 
}

document.getElementById("clear")
  .addEventListener("click", 
    function(){
      ctx.clearRect(0, 0, c.width, c.height);
    }
  );


var drawCircle = function(ctx, x, y, r){
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
};

var draw = function(id){
  //console.log(id)

  window.requestAnimationFrame(draw);

  //limit fps
  now = Date.now();
  elapsed = now - then;

  //if enough time elapsed draw stuff
  //console.log(elapsed, "\t", fpsInterval);
  if (elapsed > fpsInterval) {

    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % fpsInterval);

    if (mouseDown){
      drawCircle(ctx, cursorX, cursorY, 10)
    }
  }

}

//window.requestAnimationFrame(draw);
var start = function(fps){
  fpsInterval = 1000/fps;
  then = Date.now();
  draw();
}; start(fps);

