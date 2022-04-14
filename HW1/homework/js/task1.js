const AMOUNT_TYPE = 'amount'
const YEARS_TYPE = 'years'
const RATE_TYPE = 'rate'
const MIN_AMOUNT = 1000
const MIN_RATE = 0
const MAX_RATE = 100

const initialAmount = input('Enter initial amount of money', AMOUNT_TYPE)
const years = input('Enter number of years', YEARS_TYPE)
const rate = input('Enter percentage of a year', RATE_TYPE)

const totalAmount = calculateTotalAmount(initialAmount, years, rate)
const totalProfit = calculateTotalProfit(initialAmount, totalAmount)

const newLine = '\r\n'
const alertMessage = `Initial amount: ${initialAmount}${newLine}
  Number of years: ${years}${newLine}
  Percentage of year: ${rate}${newLine}
  Total profit: ${totalProfit}${newLine}
  Total amount: ${totalAmount}
  `

alert(alertMessage)

function input(message, type) {
  const value = prompt(message)
  const formattedValue = format(value, type)
  return isValid(formattedValue, type) ? formattedValue : input(message, type)
}

function isValid(value, type) {
  switch (type) {
    case AMOUNT_TYPE:
      if (value === '' || value < MIN_AMOUNT || isNaN(value)) {
        alert('Invalid input data, value should be number bigger than 1000')
        return false
      } else {
        return true
      }
    case YEARS_TYPE:
      if (value === '' || value < 1 || isNaN(value)) {
        alert('Invalid input data, value should be number not less than 1')
        return false
      } else {
        return true
      }
    case RATE_TYPE:
      if (value === '' || value < MIN_RATE || value > MAX_RATE || isNaN(value)) {
        alert('Invalid input data, value can`t be less then 0 or bigger than 100')
        return false
      } else {
        return true
      }
    default:
      return false
  }
}

function format(value, type) {
  if (type === YEARS_TYPE) {
    return parseInt(value)
  } else {
    return parseFloat(parseFloat(value).toFixed(2))
  }
}

function calculateTotalAmount(initialAmount, years, rate) {
  let currentAmount = initialAmount
  while (years >= 1) {
    currentAmount += currentAmount * (rate / 100)
    years--
  }
  return format(currentAmount)
}

function calculateTotalProfit(initialAmount, totalAmount) {
  return format(totalAmount - initialAmount)
}
