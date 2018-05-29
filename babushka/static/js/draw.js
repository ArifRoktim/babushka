var mouseDown = false;
document.body.onmousedown = function(){
  console.log("mouse is down")
  mouseDown = true;
}
document.body.onmouseup = function(){
  console.log("mouse is up")
  mouseDown = false;
}

var cursorX;
var cursorY;
document.onmousemove = function(e){
    cursorX = e.pageX - c.offsetLeft;
    cursorY = e.pageY - c.offsetTop;
}

var drawCircle = function(ctx, x, y, r){
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillstyle = "black"
  ctx.fill();
};

var c = document.getElementById("drawbushka");
var ctx = c.getContext("2d");

var draw = function(id){
  //console.log(id)
  if (mouseDown){
    drawCircle(ctx, cursorX, cursorY, 10)
  }
  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);