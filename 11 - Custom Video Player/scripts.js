/* Get the elements */
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

/* Build the functions */
const togglePlay = () => {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
  // if (video.paused) {
  //   video.play()
  // } else {
  //   video.pause()
  // }
}

const updateButton = () => {
  const icon = video.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
}

// function skip () { // this.dataset does not seem to work with fat arrow :(
//   video.currentTime += parseFloat(this.dataset.skip)
// }

const skip = (event) => { // fat arrow version, used event.srcElement in place of 'this'
  video.currentTime += parseFloat(event.srcElement.dataset.skip)
}

const handleRangeUpdate = (event) => {
  video[event.srcElement.name] = event.srcElement.value
}

const handleProgress = (event) => {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

const scrub = (event) => {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

/* Add the event listeners */
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress) // 'progress' event also exists

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(button => button.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))

let mouseDown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (event) => mouseDown && scrub(event))
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)
