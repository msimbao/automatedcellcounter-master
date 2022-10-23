const PI = 3.14159265358979323846

/**
 * 
 */
// Javascript To Start Webcam
        navigator.mediaDevices.getUserMedia({
          video: {
          frameRate: 60
          }
      }
      ).then(function(stream) {
      let video = document.querySelector('video');
      video.srcObject = stream;
      video.onloadedmetadata = function(e) {
          video.play();
      };
      }).catch(function(err) {
      // deal with an error (such as no webcam)
      });




/**
 * 
 * @param {*} video 
 * @param {*} canvas 
 * @param {*} context 
 * @param {*} frameRate 
 */
function draw(video, canvas, context, frameRate) {

  context.scale(-1, -1);
    context.drawImage(video, 0, 0, canvas.width *-1, canvas.height*-1);
  
    var boxLength = document.getElementById("boxLength").value;
    var xPos = canvas.width/2 - boxLength/2
    var yPos = canvas.height/2 - boxLength/2
  

    context.lineWidth = 5;
    context.setLineDash([20, 20]);
    context.strokeStyle = "#0000ff";
    context.beginPath();
    context.rect(xPos, yPos, boxLength, boxLength);
    context.stroke();
  
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    // var filtered = ImageFilters.Sharpen (imageData, factor)
    var filtered = ImageFilters.Gamma (imageData, 1)
    context.putImageData(filtered, 0, 0);
  
    setTimeout(draw, 1/frameRate, video, canvas, context, frameRate);
  }

  var copyBtn = document.querySelector('#copy_btn');
  copyBtn.addEventListener('click', function () {
  var urlField = document.querySelector('tr');
   
  // create a Range object
  var range = document.createRange();  
  // set the Node to select the "range"
  range.selectNode(urlField);
  // add the Range to the set of window selections
  window.getSelection().addRange(range);
   
  // execute 'copy', can't 'cut' in this case
  document.execCommand('copy');
}, false);

/**
 * 
 * @param {*} contour 
 * @returns 
 */
  function myInertia(contour){

    moms = cv.moments(contour);
    center = {
      confidence: 1,
      location: { x: moms.m10 / moms.m00, y: moms.m01 / moms.m00 },
    };

    const denominator = Math.sqrt(
      Math.pow(2 * moms.mu11, 2) + Math.pow(moms.mu20 - moms.mu02, 2)
    );
    let ratio;
    if (denominator > 0.01) {
      const cosmin = (moms.mu20 - moms.mu02) / denominator;
      const sinmin = 2 * moms.mu11 / denominator;
      const cosmax = -cosmin;
      const sinmax = -sinmin;

      const imin =
        0.5 * (moms.mu20 + moms.mu02) -
        0.5 * (moms.mu20 - moms.mu02) * cosmin -
        moms.mu11 * sinmin;
      const imax =
        0.5 * (moms.mu20 + moms.mu02) -
        0.5 * (moms.mu20 - moms.mu02) * cosmax -
        moms.mu11 * sinmax;
      ratio = imin / imax;
    } else {
      ratio = 1;
    }

    return ratio 
  }

/**
 * 
 * @param {*} contour 
 * @returns 
 */
  function myConvexity (contour) {
    area = cv.contourArea(contour, false);
    const hull = new cv.Mat();
    cv.convexHull(contour, hull);
    const hullArea = cv.contourArea(hull);
    const ratio = area / hullArea;
    hull.delete();
    return ratio
  }
  
  /**
 * 
 * @param {*} values 
 * @returns 
 */
function myMedian(values){
  if(values.length ===0) throw new Error("No inputs");

  values.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(values.length / 2);
  
  if (values.length % 2)
    return values[half];
  
  return (values[half - 1] + values[half]) / 2.0;
}

function myStandardDeviation (array) {
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

