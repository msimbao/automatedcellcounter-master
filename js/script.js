console.log("Hello World 🌎")

let video = document.querySelector('video');

//javascript
var canvas = document.getElementById('canvasInput');
canvas.width  = 1024;
canvas.height = 768;
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

function test(){
  let src = cv.imread('canvasInput');
  let clone = src.clone();
  let dst = new cv.Mat();


  //============================================================
  //Define Clipping Box
    var boxLength = parseInt(document.getElementById("boxLength").value);
    var canvas = document.querySelector('canvas');
    var xPos = parseInt(canvas.width/2 - boxLength/2);
    var yPos = parseInt(canvas.height/2 - boxLength/2);

    let rect = new cv.Rect(xPos, yPos, boxLength, boxLength);
    dst = src.roi(rect);  
    let end = cv.Mat.zeros(dst.cols, dst.rows, cv.CV_8UC3);


  let areas=[]
  let white_dots=[]
  
  //GrayScale Conversion
cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY);
  
//Histogram Equilization
// cv.equalizeHist (dst, dst)
let tileGridSize = new cv.Size(4, 4);
let clahe = new cv.CLAHE(4, tileGridSize);
clahe.apply(dst, dst);
  
//Morph Gradient
let M = cv.Mat.ones(3, 3, cv.CV_8U);
// cv.morphologyEx(dst, dst, cv.MORPH_GRADIENT, M);
// cv.morphologyEx(dst, dst, cv.MORPH_GRADIENT, M);
// cv.morphologyEx(dst, dst, cv.MORPH_GRADIENT, M);
//Canny Edges
cv.Canny(dst, dst, 0, 250, 3, true);

  
  cv.imshow('canvasOutput', dst);
// cv.imshow('canvasOutput', edge);
  src.delete(); dst.delete(); second_contours.delete(); second_hierarchy.delete(); 
}