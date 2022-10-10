function countTotal(total,totalText){
      
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

// cv.medianBlur(dst, dst, 1);

//GrayScale Conversion
cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY);
  
//Histogram Equilization
// cv.equalizeHist (dst, dst)
let tileGridSize = new cv.Size(4, 4);
let clahe = new cv.CLAHE(1, tileGridSize);
clahe.apply(dst, dst);
  
//Morph Gradient
let M = cv.Mat.ones(3, 3, cv.CV_8U);
cv.morphologyEx(dst, dst, cv.MORPH_GRADIENT, M);
// cv.morphologyEx(dst, dst, cv.MORPH_GRADIENT, M);
// cv.morphologyEx(dst, dst, cv.MORPH_GRADIENT, M);
//Canny Edges
cv.Canny(dst, dst, 0, 250, 3, true);

  
//First Contour Detection
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  // You can try more different parameters
  cv.findContours(dst, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
//First Segmentation Via Contours from Canny Edge
for (let i = 0; i < contours.size(); ++i) {
    let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
                              Math.round(Math.random() * 255));
    cv.drawContours(dst, contours, i, color, -1, cv.LINE_8, hierarchy, 100);
}
  contours.delete(); hierarchy.delete();

//Erode After Segmentation
M = cv.Mat.ones(2, 2, cv.CV_8U);
let anchor = new cv.Point(-1, -1);
cv.erode(dst, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

//Second Contour Detection
  let second_contours = new cv.MatVector();
  let second_hierarchy = new cv.Mat();
  cv.findContours(dst, second_contours, second_hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
  
//First Segmentation Via Contours from Canny Edge
for (let i = 0; i < second_contours.size(); ++i) {
    area = cv.contourArea(second_contours.get(i), false);
    areas.push(area)
}

medianArea = myMedian(areas)
stDev = myStandardDeviation(areas)  
  
for (let i = 0; i < second_contours.size(); ++i) {
  // let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
  //                             Math.round(Math.random() * 255));
    let cnt = second_contours.get(i)
    
    area = cv.contourArea(cnt, false);
    areas.push(area)
    areaError = Math.abs(medianArea - area)
  
    let perimeter = cv.arcLength(cnt, true);
    let poly = new cv.Mat();
    cv.approxPolyDP(cnt, poly, 0.01 * perimeter, true);
  
    if((area > 0) && (areaError *3 >= stDev) && (poly.rows > 8)){
      // console.log("accepted")
      let color = new cv.Scalar(0,255,0);
      white_dots.push(area)
      cv.drawContours(end, second_contours, i, color, -1, cv.LINE_8, second_hierarchy, 100);
    }
  else{
          let color = new cv.Scalar(255,0,0);
          cv.drawContours(end, second_contours, i, color, -1, cv.LINE_8, second_hierarchy, 100);
  }
    // let color = new cv.Scalar(255,255,255);
}

total = total + white_dots.length
totalText.innerText = total
  

cv.imshow('canvasTotal', end);
// cv.imshow('canvasOutput', edge);
src.delete(); dst.delete(); second_contours.delete(); second_hierarchy.delete(); 
}
