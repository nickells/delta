function formatDuration (duration) {
  let totalSeconds = duration.asSeconds()
  let operator

  if (totalSeconds > 0) operator = '+'
  else if (totalSeconds < 0) operator = '-'
  else operator = ''

  totalSeconds = Math.abs(totalSeconds)
  const minutes = (Math.floor(totalSeconds / 60)).toString()
  let seconds = (totalSeconds % 60).toString()
  if (seconds.length === 1) seconds = '0' + seconds
  return `${operator}${minutes}:${seconds}`
}

function waitForElement (selectorFunc) {
  return new Promise((resolve, reject) => {
    try {
      let int
      const checkIfExists = () => {
        if (!selectorFunc()) return
        else {
          if (int !== undefined) clearInterval(int)
          resolve(selectorFunc())
        }
      }
      checkIfExists()
      int = setInterval(checkIfExists, 50)
    } catch (e) {
      reject(new Error('problem with waitForElement function', e))
    }
  })
}

function formatOutput (duration, element) {
  return `
    <span>${element.innerHTML}</span>
    <span id='delta-time'>
      (${duration})
    </span>`
}

function startScript (returnedElement) {
  const cursorTimeElement = returnedElement
  const currentTimeElement = document.getElementsByClassName('ytp-time-current')[0]
  const progressBar = document.getElementsByClassName('ytp-progress-bar')[0]
  const cursorTimeContainer = document.getElementsByClassName('ytp-tooltip-text-wrapper')[0]
  const timeSpan = document.createElement('span')

  timeSpan.className = 'ytp-tooltip-text'

  cursorTimeContainer.appendChild(timeSpan)

  function setTimeSpan () {
    const formatCursorTime = cursorTimeElement.innerHTML.length > 5 ? 'hh:mm:ss' : 'mm:ss'
    const formatCurrentTime = currentTimeElement.innerHTML.length > 5 ? 'hh:mm:ss' : 'mm:ss'
    const cursorTime = moment(cursorTimeElement.innerHTML, formatCursorTime)
    const currentTime = moment(currentTimeElement.innerHTML, formatCurrentTime)
    const diff = moment.duration(cursorTime.diff(currentTime))
    timeSpan.innerHTML = formatOutput(formatDuration(diff), cursorTimeElement)
  }

  let updateWithSeconds

  progressBar.onmouseenter = function () {
    updateWithSeconds = setInterval(setTimeSpan, 1000)
    cursorTimeElement.style.display = 'none'
    timeSpan.style.display = 'inline'
  }

  progressBar.onmousemove = function () {
    setTimeSpan()
  }

  progressBar.onmouseleave = function () {
    cursorTimeElement.style.display = 'inline'
    timeSpan.style.display = 'none'
    clearInterval(updateWithSeconds)
  }
}

const cursorFunc = () => document.getElementsByClassName('ytp-tooltip-text')[0]

waitForElement(cursorFunc)
.then((elem) => startScript(elem))
.catch(console.warn)
