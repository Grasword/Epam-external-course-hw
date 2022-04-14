const getAge = (date) => {
  const birthDate = new Date(date)
  const today = new Date()
  const month = today.getMonth() - birthDate.getMonth()
  let age = today.getFullYear() - birthDate.getFullYear()

  if (month < 0 || month === 0 && today.getDate() < birthDate.getDate()) {
    age--
  }
  return age
}

const getWeekDay = (date) => new Date(date).toLocaleString('en-us', { weekday: 'long' })

const isLeapYear = (year) => new Date(year, 1, 29).getMonth() === 1

const getAmountDaysToNewYear = () => {
  const today = new Date()
  const days = new Date(today.getFullYear(), 11, 31)

  const diff = today - days
  const oneDay = 1000 * 60 * 60 * 24
  const daysLeft = Math.floor(diff / oneDay) * -1

  return daysLeft + 1
}

const getProgrammersDay = (year) => {
  let dateString
  isLeapYear(year) ? dateString = `${year}, 9, 12` : dateString = `${year}, 9, 13`

  const programmersDay = new Date(dateString)
  const weekDay = getWeekDay(programmersDay)

  return `${programmersDay.getDate()} Sep, ${year} (${weekDay})`
}

const howFarIs = (day) => {
  const specifiedWeekday = day.toLowerCase().charAt(0).toUpperCase() + day.toLowerCase().slice(1)
  const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const targetDayIndex = daysInWeek.findIndex((el) => el === specifiedWeekday)
  const today = new Date()
  const todayIndex = today.getDay()
  const numberOfDaysInWeek = 7

  let daysLeft = targetDayIndex - todayIndex
  daysLeft < 0 ? daysLeft = daysLeft + numberOfDaysInWeek : daysLeft

  return daysLeft === 0
    ? `Hey, today is ${specifiedWeekday} =)`
    : `It's ${daysLeft} day(s) left till ${specifiedWeekday}`
}

const isValidIdentifier = (name) => {
  const regExp = /[a-zA-Z_$]+([a-zA-Z0-9_$]*)/g
  const match = name.match(regExp)
  return name === match[0]
}

const capitalize = (str) => {
  const regExp = /(^\w{1})|(\s+\w{1})/g
  return str.replace(regExp, (letter) => letter.toUpperCase())
}

const isValidAudioFile = (fileName) => {
  const regExp = /^[a-z]+\.(mp3|flac|alac|aac)/i
  return regExp.test(fileName)
}

const getHexadecimalColors = (str) => {
  const regExp = /#(?:[\da-f]{3}){1,2}?\b/gi
  return str.match(regExp) || []
}

const isValidPassword = (str) => {
  const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  return regExp.test(str)
}

const addThousandsSeparators = (input) => {
  if (typeof input === 'number') {
    input = input.toString()
  }
  const regExp = /(\d)(?=(\d{3})+$)/g
  return input.replace(regExp, '$1,')
}

const getAllUrlsFromText = (text) => {
  const regExp = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/gi
  const result = text.match(regExp)
  return result === null ? [] : result
}
