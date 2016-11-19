const cursorTimeElement = document.getElementsByClassName('ytp-tooltip-text')[0]
const currentTimeElement = document.getElementsByClassName('ytp-time-current')[0]
const progressBar = document.getElementsByClassName('ytp-progress-bar')[0]
const cursorTimeContainer = document.getElementsByClassName('ytp-tooltip-text-wrapper')[0]
const timeSpan = document.createElement('span')

cursorTimeElement.style.textAlign = 'center'

timeSpan.className = 'ytp-tooltip-text'

cursorTimeContainer.appendChild(timeSpan)

function formatDuration(duration){
  let totalSeconds = duration.asSeconds()
  let operator

  if (totalSeconds > 0) operator = '+'
  else if (totalSeconds < 0) operator = '-'
  else operator = ''

  totalSeconds = Math.abs(totalSeconds)
  const minutes = (Math.floor(totalSeconds / 60)).toString()
  let seconds = (totalSeconds % 60).toString()
  if (seconds.length === 1) seconds = '0' + seconds
  return `
    <span>${cursorTimeElement.innerHTML}</span>
    <span id='delta-time'>
      (${operator}${minutes}:${seconds})
    </span>`
}

let int

function setTimeSpan(){
  const cursorTime = moment(cursorTimeElement.innerHTML, "mm:ss")
  const currentTime = moment(currentTimeElement.innerHTML, "mm:ss")
  const diff = moment.duration(cursorTime.diff(currentTime))
  timeSpan.innerHTML = formatDuration(diff)
}

progressBar.onmousemove = function(e){
  setTimeSpan()
  int = setInterval(setTimeSpan, 1000)
}

progressBar.onmouseleave = function(){
  cursorTimeElement.style.display = 'block'
  timeSpan.style.display = 'none'
  clearInterval(int)
}

progressBar.onmouseenter = function(){
  cursorTimeElement.style.display = 'none'  
  timeSpan.style.display = 'inline'
}