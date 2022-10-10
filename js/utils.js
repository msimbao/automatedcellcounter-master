const PI = 3.14159265358979323846


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



function draw(video, canvas, context, frameRate) {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
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

  