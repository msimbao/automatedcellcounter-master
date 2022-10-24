// Manual Cell Counts
//==================================================================
// Add event listener on keydown
document.addEventListener('keyup', (event) => {
    var name = event.key;
    var code = event.code;

    var liveText = document.getElementById ( "liveManual" )
    var buddingText = document.getElementById ( "buddingManual" )
    var deadText = document.getElementById ( "deadManual" )
    var totalText = document.getElementById ( "totalManual" )
    var viabilityText = document.getElementById ( "viabilityManual" )

    var medianCircularity = document.getElementById ( "medianCircularity" )
    var stdevCircularity = document.getElementById ( "stdevCircularity" )
    var medianInertia = document.getElementById ( "medianInertia" )
    var stdevInertia = document.getElementById ( "stdevInertia" )
    var medianConvexity = document.getElementById ( "medianConvexity" )
    var stdevConvexity = document.getElementById ( "stdevConvexity" )
    
    var live = liveText.innerText
    var budding = buddingText.innerText
    var dead =  deadText.innerText
    // alert(live)
    // Alert the key name and key code on keydown
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    if (name == 'j'){
      live++
      liveText.innerText = live
    }
    if (name == 'k'){
      budding++
      buddingText.innerText = budding
    }
    if (name == 'l'){
      dead++
      deadText.innerText = dead
    }
    if (name == 'r'){
      resetCounts()
    }

    if (name === 'Enter' ){
      estimateCounts()
    }

    if (name === 'b' ){
      blobData = getBlobData()
      medianCircularity.innerText = blobData[0]
      stdevCircularity.innerText = blobData[1]
      medianInertia.innerText = blobData[2]
      stdevInertia.innerText = blobData[3]
      medianConvexity.innerText = blobData[4]
      stdevConvexity.innerText = blobData[5]
    }

    var total = parseInt(live) + parseInt(dead)
    totalText.innerText = total

    var viability = (100 * (live/total)).toFixed(2)
    viabilityText.innerText = viability
    
  }, false);
  
 