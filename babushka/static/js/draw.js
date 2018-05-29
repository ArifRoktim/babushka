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
  colorPicker[i].addEventListener("click", function(){ console.log(this.getAttribute("clr")); ctx.fillStyle = this.getAttribute("clr"); }); //clr is a custom attribute
}

var drawCircle = function(ctx, x, y, r){
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
};

var draw = function(id){
  //console.log(id)
  if (mouseDown){
    drawCircle(ctx, cursorX, cursorY, 10)
  }
  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);