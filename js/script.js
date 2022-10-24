console.log("Hello World 🌎")

let video = document.querySelector('video');

//javascript
var canvas = document.getElementById('canvasInput');
// canvas.width  = 1024;
// canvas.height = 768;
canvas.width  = 800;
canvas.height = 640;

var context = canvas.getContext('2d');

video.addEventListener('play', function() {
  context.drawImage(this, 0, 0, canvas.width, canvas.height);
  draw(video,canvas,context,60)
}, false);

