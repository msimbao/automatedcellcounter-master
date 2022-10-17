var live = 0
var budding = 0
var dead = 0
var total = 0
var boxes = 0
var viability = 0

var totalAccuracy = 0
var viabilityAccuracy = 0
var buddingAccuracy = 0

//================================================================
// Manual Values

var liveManual = 0
var buddingManual = 0
var deadManual = 0

var liveManualText = document.getElementById ( "liveManual" )
var buddingManualText = document.getElementById ( "buddingManual" )
var deadManualText = document.getElementById ( "deadManual" )
//================================================================

var liveText = document.getElementById ( "liveAuto" )
var buddingText = document.getElementById ( "buddingAuto" )
var deadText = document.getElementById ( "deadAuto" )
var totalText = document.getElementById ( "totalAuto" )
var boxesText = document.getElementById ( "boxesAuto" )
var viabilityText = document.getElementById ( "viabilityAuto" )

var totalAccuracyText = document.getElementById ( "totalAccuracy" )
var viabilityAccuracyText = document.getElementById ( "viabilityAccuracy" )
var buddingAccuracyText = document.getElementById ( "buddingAccuracy" )

function estimateCounts(){
  let predictions = countTotal(live,budding,dead,total)

  boxes = boxes + 1
  boxesText.innerText = boxes

  live = predictions[0]
  budding = predictions[1]
  dead = predictions[2]
  total = predictions[3]

  liveManual = liveManualText.innerText
  buddingManual = buddingManualText.innerText
  deadManual = deadManualText.innerText
  let totalManual = parseint(liveManual) + parseint(deadManual)

  let viabilityManual = (100 * (liveManual/totalManual)).toFixed(2)

  liveText.innerText = live
  buddingText.innerText = budding
  deadText.innerText = dead
  totalText.innerText = total

  console.log(live)

  viability = (100 * (live/total)).toFixed(2)
  viabilityText.innerText = viability

  totalAccuracy = (100 - 100*Math.abs(totalManual - total)/totalManual)
  buddingAccuracy = (100 - 100*Math.abs(buddingManual - budding)/buddingManual)
  viabilityAccuracy =  (100 - 100*Math.abs( viabilityManual- viability)/viabilityManual)

  totalAccuracyText.innerText = totalAccuracy
  buddingAccuracyText.innerText = buddingAccuracy
  viabilityAccuracyText.innerText = viabilityAccuracy
}

function resetCounts(){
  live = 0
  budding = 0
  dead = 0
  total = 0
  boxes = 0
  viability = 0

  totalAccuracy = 0
  viabilityAccuracy = 0
  buddingAccuracy = 0

  liveManual = 0
  buddingManual = 0
  deadManual = 0

  liveManualText = 0
  buddingManualText = 0
  deadManualText = 0

  viabilityText.innerText = 0
  boxesText.innerText = 0
  totalText.innerText = 0
  deadText.innerText = 0
  buddingText.innerText = 0
  liveText.innerText = 0

  totalAccuracyText = 0
  viabilityAccuracyText = 0
  buddingAccuracyText = 0

}