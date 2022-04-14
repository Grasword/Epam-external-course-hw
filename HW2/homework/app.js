const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const data = [
  {
    _id: '5b5e3168c6bf40f2c1235cd6',
    index: 0,
    age: 39,
    eyeColor: 'green',
    name: 'Stein',
    favoriteFruit: 'apple'
  },
  {
    _id: '5b5e3168e328c0d72e4f27d8',
    index: 1,
    age: 38,
    eyeColor: 'blue',
    name: 'Cortez',
    favoriteFruit: 'strawberry'
  },
  {
    _id: '5b5e3168cc79132b631c666a',
    index: 2,
    age: 2,
    eyeColor: 'blue',
    name: 'Suzette',
    favoriteFruit: 'apple'
  },
  {
    _id: '5b5e31682093adcc6cd0dde5',
    index: 3,
    age: 17,
    eyeColor: 'green',
    name: 'Weiss',
    favoriteFruit: 'banana'
  }
]

function reverseNumber(num) {
  return num > 0 ? reverse(num) : reverse(-num) * -1
}
function reverse(num) {
  let reverse = 0
  let lastDigit
  while (num !== 0) {
    lastDigit = num % 10
    reverse = reverse * 10 + lastDigit
    num = Math.floor(num / 10)
  }
  return reverse
}

function forEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr)
  }
}

function map(arr, callback) {
  const transformedArray = []
  forEach(arr, (el, i, arr) => transformedArray.push(callback(el, i, arr)))
  return transformedArray
}

function filter(arr, callback) {
  const filteredArr = []
  forEach(arr, (el, i, arr) => callback(el, i, arr) ? filteredArr.push(el) : false)
  return filteredArr
}

function getAdultAppleLovers(data) {
  // requirements
  const age = 18
  const favoriteFruit = 'apple'

  let filteredArr = filter(data, (el) => {
    return el.age > age && el.favoriteFruit === favoriteFruit
  })
  return map(filteredArr, (el) => el.name)
}

function getKeys(obj) {
  let keysArr = []
  for (let item in obj) {
    if (obj.hasOwnProperty(item)) {
      keysArr.push(item)
    }
  }
  return keysArr
}

function getValues(obj) {
  let valuesArr = []
  for (let item in obj) {
    if (obj.hasOwnProperty(item)) {
      valuesArr.push(obj[item])
    }
  }
  return valuesArr
}

function showFormattedDate(dateObj) {
  const year = dateObj.getFullYear()
  const date = dateObj.getDate()
  const monthName = months[dateObj.getMonth()]
  return `It is ${date} of ${monthName}, ${year}`
}

// function reduce(arr, callback, initialValue) {
//   if (arr.length === 1) {
//     return arr[0]
//   } else {
//     let accumulator = initialValue || 0

//     forEach(arr, (el, i, arr) => {
//       accumulator = callback(accumulator, el, i, arr)
//     })
//     return accumulator
//   }
// }

// reduce([1, 2, 3], (a, v) => a + v) // returns 6
// reduce([1, 2, 3], (a, v) => a + v, 3) // returns 9
// reduce([], (a, v) => a + v, 7) // returns 7
