const isEquals = (a, b) => a === b

const isBigger = (a, b) => Number(a) > Number(b)

const storeNames = (...names) => names

const getDifference = (a, b) => isBigger(a, b) ? a - b : b - a

const negativeCount = (arr) => arr.filter((value) => value < 0).length

const letterCount = (str, letter) => str.split(letter).length - 1

const countPoints = (arr) => {
  const results = arr.map((element) => {
    let a = element.split(':')
    return a.map(Number)
  })
  return results.reduce((a, c) => {
    if (c[0] > c[1]) {
      return a + 3
    }
    if (c[0] < c[1]) {
      return a
    }
    return a + 1
  }, 0)
}
