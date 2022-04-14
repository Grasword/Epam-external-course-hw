const MIN_NUMBER = 0
const MAX_NUMBER = 4
const NUMBER_INCREMENT = 4

const MAX_NUMBER_OF_ATTEMPTS = 3
const ZERO_ATTEMPT_MADE = 0
const ONE_ATTEMPTS_MADE = 1
const TWO_ATTEMPTS_MADE = 2

const FIRST_PRIZE = 100
const SECOND_PRIZE = 50
const THIRD_PRIZE = 25

class Roulette {
  constructor() {
    this.number
    this.attemptsMade = 0
    this.minNumber = 0
    this.round = 1
    this.prizeWon = 0
  }
  get maxNumber() {
    return this.round * MAX_NUMBER + NUMBER_INCREMENT
  }
  get isAnyAttemptsLeft() {
    return MAX_NUMBER_OF_ATTEMPTS - this.attemptsMade > 0
  }

  get rewardMultiplier() {
    return Math.pow(2, this.round - 1)
  }

  get reward() {
    switch (this.attemptsMade) {
      case ZERO_ATTEMPT_MADE:
        return FIRST_PRIZE * this.rewardMultiplier
      case ONE_ATTEMPTS_MADE:
        return SECOND_PRIZE * this.rewardMultiplier
      case TWO_ATTEMPTS_MADE:
        return THIRD_PRIZE * this.rewardMultiplier
      default:
        return 0
    }
  }

  getRandomInt() {
    return Math.floor(Math.random() * (this.maxNumber - this.minNumber + 1)) + this.minNumber
  }

  setSecretNumber() {
    this.number = this.number = this.getRandomInt()
    console.log('Secret number is ', this.number)
  }

  init() {
    this.setSecretNumber()
    confirm('Do you want to play a game?') ? this.play() : this.cancel()
  }

  play() {
    if (this.isAnyAttemptsLeft) {
      const userChoice = this.showMessage()
      console.log('This is attempt #', this.attemptsMade)
      return this.guessNumber(userChoice) ? this.win() : this.play(++this.attemptsMade)
    } else {
      this.stop()
    }
  }

  guessNumber(guess) {
    return this.number === parseInt(guess)
  }

  showMessage() {
    return prompt(`Choose a roulette pocket number from ${this.minNumber} to ${this.maxNumber}\r\n
     Attempts left: ${MAX_NUMBER_OF_ATTEMPTS - this.attemptsMade}\r\n
     Total prize: ${this.prizeWon}$\r\n
     Possible prize on current attempt: ${this.reward}$`)
  }

  win() {
    this.prizeWon += this.reward
    const wantToContinue = confirm(
      `Congratulation, you won!   Your prize is: ${this.reward}$. Do you want to continue?`
    )
    wantToContinue ? this.increaseStakes() : this.stop()
  }

  increaseStakes() {
    this.reset(this.round + 1, this.prizeWon)
  }

  reset(round = 1, prizeWon = 0) {
    this.prizeWon = prizeWon
    this.round = round
    this.attemptsMade = 0
    this.setSecretNumber()
    this.play()
  }

  stop() {
    alert(`Thank you for your participation. Your prize is: ${this.prizeWon}$`)
    confirm('Do you want to play again?') ? this.restart() : this.cancel()
  }

  cancel() {
    alert('You did not become a billionaire, but can')
  }

  restart() {
    this.reset()
  }
}

const game = new Roulette()

game.init()
