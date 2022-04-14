const BY_REGION = 'By Region'
const BY_LANGUAGE = 'By Language'
const NAME = 'name'
const AREA = 'area'
const VALUE_IS_NOT_SELECTED = 'Select value'
const appRoot = document.getElementById('app-root')

const GLOBAL = {}

// Start of Layout block
const createTitle = () => {
  const title = document.createElement('h1')
  title.innerHTML = 'Countries Search'
  return title
}

const createLabel = (name) => {
  const label = document.createElement('label')
  label.for = name
  label.innerHTML = name
  return label
}

const createInput = (name) => {
  const input = document.createElement('input')
  input.id = name
  input.type = 'radio'
  input.value = name
  input.name = 'searchType'
  input.addEventListener('change', handleSearchTypeChange)
  return input
}

const createForm = () => {
  const form = document.createElement('form')
  const description = document.createElement('p')
  const fieldsContainer = document.createElement('div')
  fieldsContainer.className = 'fieldsContainer'
  description.innerHTML = 'Please choose the type of search:'

  const regionField = createField(BY_REGION)
  const languageField = createField(BY_LANGUAGE)

  fieldsContainer.append(regionField, languageField)
  form.append(description, fieldsContainer)

  return form
}

const createField = (type) => {
  const div = document.createElement('div')
  const labelElement = createLabel(type)
  const inputElement = createInput(type)

  div.append(inputElement, labelElement)
  return div
}

const createSelect = (dataArr) => {
  const select = document.createElement('select')
  select.id = 'select'
  select.disabled = true
  select.addEventListener('change', handleSelectChange)

  createSelectOptions(dataArr, select)

  return select
}

const createSelectOptions = (dataArr, el) => {
  const defaultOption = document.createElement('option')
  defaultOption.innerHTML = VALUE_IS_NOT_SELECTED
  el.appendChild(defaultOption)

  dataArr.forEach((element) => {
    const option = document.createElement('option')

    option.innerHTML = element
    el.appendChild(option)
  })
}

const createSearchQueryField = () => {
  const searchQueryField = document.createElement('div')
  const description = document.createElement('p')
  description.innerHTML = 'Please choose search query:'

  const select = createSelect(externalService.getRegionsList())

  searchQueryField.appendChild(description)
  searchQueryField.appendChild(select)

  return searchQueryField
}

const createTableDiv = () => {
  const div = document.createElement('div')
  div.id = 'tableDiv'
  return div
}

const createTable = () => {
  const tableDiv = document.getElementById('tableDiv')
  while (tableDiv.firstChild) {
    tableDiv.removeChild(tableDiv.firstChild)
  }
  const tableHeaders = ['Country Name', 'Capital', 'World Region', 'Language', 'Area', 'Flag']
  const sortableColumns = ['Country Name', 'Area']

  const countriesTable = document.createElement('table')
  countriesTable.className = 'countriesTable'

  const countriesTableHead = document.createElement('thead')
  countriesTableHead.className = 'countriesTableHead'

  const countriesTableHeaderRow = document.createElement('tr')
  countriesTableHeaderRow.className = 'countriesTableHeaderRow'

  tableHeaders.forEach((header) => {
    const countriesHeader = document.createElement('th')
    let className = header.charAt(0).toLowerCase() + header.slice(1).replace(' ', '')
    countriesHeader.innerText = header
    countriesHeader.className = className
    if (sortableColumns.includes(header)) {
      className = className === 'countryName' ? 'name' : className
      const arrowButton = document.createElement('button')
      arrowButton.type = 'button'
      arrowButton.className = 'arrowButton'
      const arrow = setArrow(className)
      arrowButton.innerText = arrow
      countriesHeader.appendChild(arrowButton)
    }
    countriesTableHeaderRow.append(countriesHeader)
  })

  countriesTableHead.append(countriesTableHeaderRow)
  countriesTable.append(countriesTableHead)

  const countriesTableBody = document.createElement('tbody')
  countriesTableBody.className = 'countriesTableBody'

  countriesTable.append(countriesTableBody)
  tableDiv.append(countriesTable)

  const nameHeader = document.querySelector('.countryName')
  const areaHeader = document.querySelector('.area')

  nameHeader.addEventListener('click', () => sortTableBy(NAME))
  areaHeader.addEventListener('click', () => sortTableBy(AREA))
}

const appendCountries = (country) => {
  const countriesTable = document.querySelector('.countriesTable')

  const countriesTableBodyRow = document.createElement('tr')
  countriesTableBodyRow.className = 'countriesTableBodyRow'

  const countryName = document.createElement('td')
  countryName.innerText = country.name
  const capital = document.createElement('td')
  capital.innerText = country.capital
  const region = document.createElement('td')
  region.innerText = country.region
  const languages = document.createElement('td')
  languages.innerText = formatLanguages(country.languages)
  const area = document.createElement('td')
  area.innerText = country.area
  const flagURL = document.createElement('td')
  const flagUrlImg = document.createElement('img')
  flagUrlImg.src = `https://flagcdn.com/h24/${extractCountryCode(country.flagURL)}.png`
  flagURL.appendChild(flagUrlImg)

  countriesTableBodyRow.append(countryName, capital, region, languages, area, flagURL)
  countriesTable.append(countriesTableBodyRow)
}

const createNoItemsLabel = () => {
  const label = document.createElement('label')
  label.className = 'noSelectLabel'
  label.innerHTML = 'No items, please choose search query'
  return label
}

const setArrow = (className) => {
  if (GLOBAL.sortedBy === className) {
    return GLOBAL.sortedAscending ? '↑' : '↓'
  } else {
    return '↕'
  }
}

// End of Layout block

// Start Layout Manipulation Logic block
const handleSearchTypeChange = (event) => {
  GLOBAL.selectedValue = VALUE_IS_NOT_SELECTED
  GLOBAL.searchType = event.target.value
  const select = document.getElementById('select')
  select.innerHTML = ''
  select.disabled = false
  const list = GLOBAL.searchType === BY_REGION ? externalService.getRegionsList() : externalService.getLanguagesList()
  createSelectOptions(list, select)
  resetCountryTableState()
}

const resetCountryTableState = () => {
  const noItemsLabel = createNoItemsLabel()
  const tableDiv = document.getElementById('tableDiv')
  tableDiv.innerHTML = ''
  tableDiv.appendChild(noItemsLabel)
}

const handleSelectChange = (event) => {
  GLOBAL.selectedValue = event.target.value
  GLOBAL.sortedAscending = false
  getData(event.target.value)
  sortTableBy(NAME)
}

const renderTable = () => {
  if (GLOBAL.selectedValue === VALUE_IS_NOT_SELECTED) {
    resetCountryTableState()
  } else {
    createTable()
    GLOBAL.countries.forEach((country) => {
      appendCountries(country)
    })
  }
}

const sortTableBy = (target) => {
  if (GLOBAL.sortedBy !== target) {
    GLOBAL.sortedBy = target
    GLOBAL.sortedAscending = true
  } else {
    GLOBAL.sortedAscending = !GLOBAL.sortedAscending
  }
  GLOBAL.countries = sort(GLOBAL.countries, GLOBAL.sortedAscending, GLOBAL.sortedBy)
  renderTable()
}
// End Layout Manipulation Logic block

// Start Data Manipulation block
const getData = (criteria) => {
  GLOBAL.countries =
    GLOBAL.searchType === BY_REGION
      ? externalService.getCountryListByRegion(criteria)
      : externalService.getCountryListByLanguage(criteria)
}

const sort = (arr, order, prop) => {
  let sorted = arr.sort((a, b) => a[prop].toString().localeCompare(b[prop], 'en', { numeric: true }))
  return order ? sorted : sorted.reverse()
}

const formatLanguages = (languages) => {
  let languagesArr = []
  for (language in languages) {
    if (languages.hasOwnProperty(language)) {
      languagesArr.push(languages[language])
    }
  }
  return languagesArr.join(', ')
}

const extractCountryCode = (url) => {
  let segments = url.split('/')
  // eslint-disable-next-line no-magic-numbers
  return segments[3]
}
// End Data Manipulation block

const show = () => {
  const title = createTitle()
  const form = createForm()
  const searchQueryField = createSearchQueryField()
  const countriesTable = createTableDiv()

  appRoot.append(title, form, searchQueryField, countriesTable)
}

show()
