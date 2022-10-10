var live = 0
var dead = 0
var total = 0
var boxes = 0
var viability = 0

var liveText = document.getElementById ( "liveAuto" )
var deadText = document.getElementById ( "deadAuto" )
var totalText = document.getElementById ( "totalAuto" )
var boxesText = document.getElementById ( "boxesAuto" )
var viabilityText = document.getElementById ( "viabilityAuto" )

function estimateCounts(){
  let predictions = countTotal(live,dead,total)
  // countLive(live,liveText)
  // countDead(live,dead,total,deadText)
  boxes = boxes + 1
  boxesText.innerText = boxes

  live = predictions[0]
  dead = predictions[1]
  total = predictions[2]

  liveText.innerText = live
  deadText.innerText = dead
  totalText.innerText = total

  console.log(live)

  viability = (100 * (live/total)).toFixed(2)
  viabilityText.innerText = viability
}

function resetCounts(){
  live = 0
  dead = 0
  total = 0
  boxes = 0
  viability = 0

  viabilityText.innerText = 0
  boxesText.innerText = 0
  totalText.innerText = 0
  deadText.innerText = 0
  liveText.innerText = 0

}