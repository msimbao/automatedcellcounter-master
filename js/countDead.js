function countDead(live,dead,total,deadText){
    var result
    if(live > total){
    result = 0
 }else{
    result = total - live
 }
    dead = dead + result
    deadText.innerText = dead

}