// Declare/initialize some global variables
var fpsInterval, now, then, elapsed;
var fps = 60;
var pointA = null;
var pointB = null;
var width = 10;

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
      ctx.strokeStyle = this.getAttribute("clr");
    }
  ); 
}

document.getElementById("clear")
  .addEventListener("click", 
    function(){
      ctx.clearRect(0, 0, c.width, c.height);
    }
  );


var draw = function(id){
  //console.log(id)

  //Some private helper functions
  var helper = function(ctx, point){
    var drawCircle = function(ctx, x, y, r){
      console.log("x: ", x, "\ty: ", y)
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
    };

    var drawLine = function(ctx, x1, y1, x2, y2){
        ctx.lineWidth=width;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };

    //console.log("help!")
    //if point is null, then we don't need to draw anything
    if( point == null ){
      return;
    }
    pointB = pointA;
    pointA = point;
    if(pointB == null){
      //drawCircle(ctx, pointA[0], pointA[1], width);
      drawLine(ctx, pointA[0], pointA[1], pointA[0]+1, pointA[1]+1);
    }

    if(pointB !== null){
      drawLine(ctx, pointA[0], pointA[1], pointB[0], pointB[1]);
    }

  };
  //end private helper functions

  window.requestAnimationFrame(draw);

  //limit fps: from https://stackoverflow.com/a/19772220
  now = Date.now();
  elapsed = now - then;

  //if enough time elapsed draw stuff
  //console.log(elapsed, "\t", fpsInterval);
  if (elapsed > fpsInterval) {

    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % fpsInterval);

    if (mouseDown){
      //console.log("down");
      //drawCircle(ctx, cursorX, cursorY, 10)
      helper(ctx, [cursorX, cursorY]);
    } else {
      //console.log("up");
      helper(ctx, null);
      pointA = null; pointB = null;
    }
  }


}

//window.requestAnimationFrame(draw);
var start = function(fps){
  fpsInterval = 1000/fps;
  then = Date.now();
  draw();
}; start(fps);

