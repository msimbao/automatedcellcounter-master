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
    var boxesText = document.getElementById ( "boxesManual" )
    var viabilityText = document.getElementById ( "viabilityManual" )
    
    var live = liveText.innerText
    var budding = buddingText.innerText
    var dead =  deadText.innerText
    var boxes = boxesText.innerText
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
      liveText.innerText = 0
      buddingText.innerText = 0
      deadText.innerText = 0
    }

    if (name === 'Enter' ){
      estimateCounts()
      boxes++
      boxesText.innerText = boxes
    }

    var total = parseInt(live) + parseInt(dead)
    totalText.innerText = total

    var viability = (100 * (live/total)).toFixed(2)
    viabilityText.innerText = viability
    
  }, false);
  
 