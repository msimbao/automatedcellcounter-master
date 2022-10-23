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

    // var img = new Image();
    // img.src = 'https://cdn.glitch.global/5fbfde84-4f5e-46c9-b02b-7de045bf80b7/6.PNG?v=1662690142863';
    // img.crossOrigin = "Anonymous";

// context.drawImage(img,0,0, canvas.width, canvas.height);


// var Module = {
//   // https://emscripten.org/docs/api_reference/module.html#Module.onRuntimeInitialized
//   onRuntimeInitialized() {
//     document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
//   }
// };

