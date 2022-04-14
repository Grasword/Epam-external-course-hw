function visitLink(path) {
  let counter = localStorage.getItem(`counter_${path}`)
  counter === null ? counter = 1 : counter++
  localStorage.setItem(`counter_${path}`, counter)
}

function viewResults() {
  const pathList = ['Page1', 'Page2', 'Page3']
  const counterList = pathList.map((el) => {
    let value = localStorage.getItem(`counter_${el}`)
    value ? value : value = 0
    return `You visited ${el} ${value} time(s)`
  })

  const ul = document.createElement('ul')
  ul.setAttribute('id', 'counterList')
  if (!document.getElementById('counterList')) {
    document.getElementById('content').appendChild(ul)
  }

  counterList.forEach(renderCounterList)

  function renderCounterList(element) {
    const li = document.createElement('li')
    ul.appendChild(li)
    li.innerHTML += element
  }

  localStorage.clear()
}
