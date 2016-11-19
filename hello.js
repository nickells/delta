console.log('hey it work')

console.log('moment', moment)

const cursorTimeElement = document.getElementsByClassName('ytp-tooltip-text')[0]
const currentTimeElement = document.getElementsByClassName('ytp-time-current')[0]
const progressBar = document.getElementsByClassName('ytp-progress-bar')[0]
const cursorTimeContainer = document.getElementsByClassName('ytp-tooltip-text-wrapper')[0]
console.log('cursor time container', cursorTimeContainer)
const timeSpan = document.createElement('span')
timeSpan.innerHTML = 'ASDF'
timeSpan.className = 'ytp-tooltip-text'
cursorTimeContainer.appendChild(timeSpan)

function formatDuration(duration){
  let totalSeconds = duration.asSeconds()
  const operator = totalSeconds > 0 ? '+' : '-'
  totalSeconds = Math.abs(totalSeconds)
  const minutes = (Math.floor(totalSeconds / 60)).toString()
  let seconds = (totalSeconds % 60).toString()
  if (seconds.length === 1) seconds = '0' + seconds
  return `${operator}${minutes}:${seconds}`
}

progressBar.onmousemove = function(e){
  const cursorTime = moment(cursorTimeElement.innerHTML, "mm:ss")
  const currentTime = moment(currentTimeElement.innerHTML, "mm:ss")
  const diff = moment.duration(cursorTime.diff(currentTime))
  timeSpan.innerHTML = formatDuration(diff)
}

progressBar.onmouseleave = function(){
  timeSpan.style.display = 'none'
}

progressBar.onmouseenter = function(){
  timeSpan.style.display = 'inline-block'
}

console.log(cursorTime.innerHTML)
console.log(currentTime.innerHTML)

