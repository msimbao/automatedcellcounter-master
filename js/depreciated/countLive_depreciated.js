function countLive(live,liveText){

let src = cv.imread('canvasInput');
let total = cv.imread('canvasTotal');
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

//GrayScale Conversion
cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY);

cv.adaptiveThreshold(dst, dst, 200, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 37, 5);

let M = cv.Mat.ones(2, 2, cv.CV_8U);
let anchor = new cv.Point(-1, -1);
// You can try more different parameters
cv.morphologyEx(dst, dst, cv.MORPH_OPEN, M, anchor, 1,cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
  
let centers = findBlobs(clone,dst,defaultParams)

console.log(centers)
for  (let i = 0; i < centers.length; ++i) {
let circleColor = new cv.Scalar(0, 0, 255);
cv.circle(total, centers[i].location, centers[i].radius, circleColor);
}
  
live = live + centers.length
liveText.innerText = live

cv.imshow('canvasLive', total);
// cv.imshow('canvasOutput', edge);
src.delete(); dst.delete();
}