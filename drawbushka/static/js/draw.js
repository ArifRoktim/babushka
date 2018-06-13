// Declare/initialize some global variables
var fpsInterval, now, then, elapsed;
var fps = 60;
var pointA = null;
var pointB = null;
var width = 10;
var step = 0.75;

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

    //console.log("help!")
    //if point is null, then we don't need to draw anything
    if( point == null ){
      return;
    }
    pointB = pointA;
    pointA = point;
    if(pointB == null){
      drawCircle(ctx, pointA[0], pointA[1], width);
    }

    var drawLine = function(ctx, x1, y1, x2, y2){
      var x, y;

      //if 2nd point is to left of first one, switch the points
      if( x2 < x1 ){
        console.log("switch");
        x = x2; y = y2;
        x2 = x1; y2 = y1;
        x1 = x; y1 = y;
      } else {
        console.log("no");
        x = x1; y = y1;
      }
      //either way, (x,y) becomes the point thats closer to the left
      xRange = x2-x1; //100
      yRange = y2-y1; //100
      while( x < x2 ){ //150, 200
        y = y1 + yRange * ((x-x1) / xRange)
        drawCircle(ctx, x, y, width);
        x += step;
      }
    };

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

