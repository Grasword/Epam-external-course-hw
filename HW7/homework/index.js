/* START TASK 1: Your code goes here */
const table = document.getElementById('table')

const clickHandler = (event) => {
  const targetCell = event.target
  const targetCellClass = event.target.classList[0]

  if (targetCellClass === 'specialCell') {
    specialCellClickHandler()
  } else if (targetCellClass === 'firstColumnCell') {
    firstColumnCellClickHandler(targetCell)
  } else {
    cellClickHandler(targetCell)
  }
}

const specialCellClickHandler = () => {
  table.classList.toggle('green')
}

const cellClickHandler = (targetCell) => {
  targetCell.classList.toggle('yellow')
}

const firstColumnCellClickHandler = (targetCell) => {
  const targetRow = targetCell.parentElement
  targetRow.classList.toggle('blue')
}

const initTask1 = () => {
  table.addEventListener('click', clickHandler)
}

initTask1()
// /* END TASK 1 */

// /* START TASK 2: Your code goes here */
const messageDiv = document.querySelector('.container__item--top')
const button = document.querySelector('.btn')
const input = document.querySelector('.form__input')

const inputChangeHandler = (event) => {
  const input = event.target.value
  if (input.length === 0) {
    applyDefault()
  } else {
    const regex = /^[+380][0-9]{12}$/g
    const isValid = regex.test(input)
    isValid ? applyValidInput() : applyInvalidInput()
  }
}

const applyDefault = () => {
  messageDiv.className = 'container__item--top'
  messageDiv.innerHTML = 'Type phone number in format +380*********'
  input.className = 'form__input'
}

const applyValidInput = () => {
  messageDiv.className = 'validDiv'
  input.className = 'form__input'
  button.disabled = false
  messageDiv.innerHTML = 'Number is valid'
}

const applyInvalidInput = () => {
  messageDiv.className = 'invalidDiv'
  input.className = 'invalidInput'
  button.disabled = true
  messageDiv.innerHTML = 'Type number does not follow format +380*********'
}

const sendData = () => {
  messageDiv.innerHTML = 'Data was successfully sent'
}

const initTask2 = () => {
  input.addEventListener('input', inputChangeHandler)
  button.addEventListener('click', sendData)
  button.disabled = true
}

initTask2()
/* END TASK 2 */

/* START TASK 3: Your code goes here */
const SECONDS = 3000

const field = document.querySelector('.field')
const scoreZoneTeamA = document.querySelector('.field__scoreZoneA')
const scoreZoneTeamB = document.querySelector('.field__scoreZoneB')
const scoreAlert = document.querySelector('.scoreAlert')
const teamASpan = document.querySelector('.scoreboard__teamAScore')
const teamBSpan = document.querySelector('.scoreboard__teamBScore')

let timeoutID
let scoreA = 0
let scoreB = 0

const ballMovementHandler = (event) => {
  const scrollY = window.scrollY
  const scrollX = window.scrollX
  const radiusOfTheBall = 20
  let x = event.clientX - radiusOfTheBall + scrollX
  let y = event.clientY - radiusOfTheBall + scrollY
  let ball = document.querySelector('.field__ball')
  ball.style.position = 'absolute'
  ball.style.left = `${x}px`
  ball.style.top = `${y}px`
}

const goalHandler = (team) => (event) => {
  const scoredTeam = event.target
  scoredTeam.dispatchEvent(
    new CustomEvent('teamScored', {
      detail: {
        team
      }
    })
  )
}

const scoreHandler = (team) => {
  if (team === 'A') {
    scoreA += 1
    teamASpan.innerHTML = `Team A:${scoreA}`
  } else {
    scoreB += 1
    teamBSpan.innerHTML = `Team B:${scoreB}`
  }
}

const alertHandler = (team) => {
  team === 'A' ? scoreAlert.style.color = 'blue' : scoreAlert.style.color = 'red'
  scoreAlert.innerHTML = `Team ${team} score!`
  timeoutID = setTimeout(clearAlert, SECONDS)
}

const clearAlert = () => {
  scoreAlert.innerHTML = ''
}

const initTask3 = () => {
  field.addEventListener('click', ballMovementHandler)
  scoreZoneTeamA.addEventListener('click', goalHandler('A'))
  scoreZoneTeamB.addEventListener('click', goalHandler('B'))
  document.addEventListener(
    'teamScored',
    (e) => {
      clearTimeout(timeoutID)
      scoreHandler(e.detail.team)
      alertHandler(e.detail.team)
    },
    true
  )

  teamASpan.innerHTML = `Team A:${scoreA}`
  teamBSpan.innerHTML = `Team B:${scoreB}`
}

initTask3()
/* END TASK 3 */
