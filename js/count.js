function countTotal(live,budding,dead,total){
      
let src = cv.imread('canvasInput');
// let clone = src.clone();
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
  // console.log(boxLength)
  
let areas=[]
let polys=[]
let centers = []
let perimeters = []

let inertias = []
let convexities = []
let circularities = []

let clusterCoordinates = []
let acceptedCircularities = []

let live_dots=[]
let budding_dots=[]
let dead_dots=[]
let total_dots=[]

let scMedianCircularity = 0.859758598773816
let scStdDevCircularity = 0.0473188976203336
let scMedianInertia = 0.697466400870031
let scStdDevInertia = 0.136547499641935
let scMedianConvexity = 0.964147198616966
let scstDevConvexity = 0.0280433776810446


// cv.medianBlur(dst, dst, 1);
toBlur = dst.clone()
// cv.medianBlur(toBlur,toBlur,7)
let ksize = new cv.Size(5, 5);
cv.GaussianBlur(toBlur, toBlur, ksize, 0, 0, cv.BORDER_DEFAULT);
  
//GrayScale Conversion
cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY);
  
//Histogram Equilization
// cv.equalizeHist (dst, dst)
// cv.medianBlur(dst, dst, 3);
let tileGridSize = new cv.Size(4, 4);
let clahe = new cv.CLAHE(1, tileGridSize);
clahe.apply(dst, dst);
  
//Morph Gradient
let M = cv.Mat.ones(3, 3, cv.CV_8U);
// cv.morphologyEx(dst, dst, cv.MORPH_GRADIENT, M);
// cv.morphologyEx(dst, dst, cv.MORPH_GRADIENT, M);
// cv.morphologyEx(dst, dst, cv.MORPH_GRADIENT, M);
//Canny Edges
cv.Canny(dst, dst, 0, 250, 3, true);

  
//First Contour Detection
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  // You can try more different parameters
  cv.findContours(dst, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_NONE);
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
cv.erode(dst, dst, M, anchor, 2, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

// cv.medianBlur(dst, dst, 3);

//Second Contour Detection
  let second_contours = new cv.MatVector();
  let second_hierarchy = new cv.Mat();
  cv.findContours(dst, second_contours, second_hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_NONE);
  
//First Segmentation Via Contours from Canny Edge
for (let i = 0; i < second_contours.size(); ++i) {
    let cnt = second_contours.get(i);
    area = cv.contourArea(cnt, false);
    let perimeter = cv.arcLength(cnt, true);

    if(perimeter==0) continue;
    // console.log(perimeter)

    M = cv.moments(cnt, false);
    let cx = M.m10/M.m00
    let cy = M.m01/M.m00    
    areas.push(area)
    let cntColor = toBlur.ucharPtr(cy, cx)[0]
    // console.log(cntColor)
    let poly = new cv.Mat();
    cv.approxPolyDP(cnt, poly, 0.01 * perimeter, true);
    // console.log(poly.rows)
  
    //Variables for Determining Ovular Shape
    let circularity = 4 * 3.14159265359 * area / (perimeter * perimeter);
    let inertia = myInertia(cnt)
    let convexity = myConvexity(cnt)

    if(circularity==0) continue;
    if(isNaN(convexity)) continue;
  
    areas.push(area)
    polys.push(poly.rows)
    centers.push(cntColor)
    perimeters.push(perimeter)
    circularities.push(circularity)

    inertias.push(inertia)
    convexities.push(convexity)

    var coordinate = [circularity,inertia,convexity]
    clusterCoordinates.push(coordinate)
    
}

//Get Median Area and Standard Deviation of Area
medianArea = myMedian(areas)
stDevArea = myStandardDeviation(areas)  

//Get Median Area and Standard Deviation of Area
medianPoly = myMedian(polys)
stDevPoly = myStandardDeviation(polys)  

//Seperate Contour Colours From Centers into Clusters. The first cluster has regions with highest blue color
colorClusters = ss.ckmeans(centers, 2)

//Get Median Perimeter and Standard Deviation of Perimeter
medianPerimeter = myMedian(perimeters)
stDevPerimeter = myStandardDeviation(perimeters)  

//Get Median Circularity and Standard Deviation of Circularity
medianCircularity = myMedian(circularities)
stDevCircularity = myStandardDeviation(circularities)  

//Seperate Contour Circularities into Clusters. The first cluster has regions that look like budding cells
circularityClusters = ss.ckmeans(circularities, 2)

//Get Median Inertia and Standard Deviation of Inertia
medianInertia = myMedian(inertias)
stDevInertia = myStandardDeviation(inertias)  

//Get Median Convexity and Standard Deviation of Convexity
medianConvexity = myMedian(convexities)
stDevConvexity = myStandardDeviation(convexities)  

blobKmeans = ss.kMeansCluster(clusterCoordinates,2)

// console.log(blobKmeans)

// for (var i = 0; i < clusterCoordinates.length; i++) {
//   kmeansResult = blobKmeans.labels[i]
//   // console.log(kmeansResult)
//   if(kmeansResult == 1)
//   acceptedCircularities.push(circularities[i])
// }

// console.log(acceptedCircularities)


for (let i = 0; i < second_contours.size(); ++i) {
    let cnt = second_contours.get(i)
    let color = new cv.Scalar(0,0,0);

    //Get Contour Area and Deviation from Median
    area = cv.contourArea(cnt, false);
    areaError = Math.abs(medianArea - area)

    //Get Contour Perimeter and Deviation from Median
    let perimeter = cv.arcLength(cnt, true);
    if(perimeter==0) continue;
    perimeterError = Math.abs(medianPerimeter - perimeter) 

    //Get Contour PolyGon and Deviation from Median
    let poly = new cv.Mat();
    cv.approxPolyDP(cnt, poly, 0.01 * perimeter, true);
    polyError = Math.abs(medianPoly - poly.rows)
    // (poly.rows > 8)

    //Get Contour Circularity and Deviation from Median
    circularity = 4 * 3.14159265359 * area / (perimeter * perimeter);
    circularityError = Math.abs(medianCircularity - circularity)

    inertia = myInertia(cnt)
    inertiaError = Math.abs(medianInertia - inertia)

    convexity = myConvexity(cnt)
    convexityError = Math.abs(medianConvexity - convexity)
 
    //Get Contour Center
    M = cv.moments(cnt, false);
    let cx = M.m10/M.m00
    let cy = M.m01/M.m00
     
    let cntColor = toBlur.ucharPtr(cy, cx)[0]
  
    if(
      // (circularity > 0.5) && 
      // (circularityError *24 >= stDevCircularity) && 
      // (convexity > 0.3) && 
      // (area > 0) && 
      // (areaError *3 >= stDevArea) && 
      (poly.rows > 8) &&

      // (acceptedCircularities.includes(circularity))
      
      (circularityClusters[1].includes(circularity))
       
      //  (medianCircularity-scStdDevCircularity*2 <= circularity <= medianCircularity+scStdDevCircularity*2) &&
      //  (medianInertia-scStdDevInertia*2 <= inertia <= medianInertia+scStdDevInertia*2) &&
      //  (medianConvexity-scstDevConvexity*2 <= convexity <= medianConvexity+scstDevConvexity*2)
    ){

      total_dots.push(area)

      if(colorClusters[0].includes(cntColor)){
        color = new cv.Scalar(0,0,255);
        dead_dots.push(area)
      }else{
        color = new cv.Scalar(0,255,0);
        live_dots.push(area)
        if(circularityClusters[0].includes(circularity)){
          color = new cv.Scalar(20, 140, 108);
          budding_dots.push(area)
        }
      }
      
      cv.drawContours(end, second_contours, i, color, -1, cv.LINE_8, second_hierarchy, 100);
    }
  else{
          let color = new cv.Scalar(255,0,0);
          cv.drawContours(end, second_contours, i, color, -1, cv.LINE_8, second_hierarchy, 100);
  }
}

live = live + live_dots.length
budding = budding + budding_dots.length
dead = dead + dead_dots.length
total = total + total_dots.length
  
cv.imshow('canvasOutput', end);
src.delete(); dst.delete(); second_contours.delete(); second_hierarchy.delete(); 

return [live,budding,dead,total]
}
