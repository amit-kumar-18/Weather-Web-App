import axios from 'axios'

// DOM imports
const weatherImg = document.getElementById('weather-img')
const weatherIcon = document.getElementById('weather-icon')
const weatherCondition = document.getElementById('weather-conditon')
const cityName = document.querySelector('.title')
const temperature = document.querySelector('.subtitle')
const dateTime = document.getElementById('date-time')
const minTemp = document.getElementById('min-temp')
const maxTemp = document.getElementById('max-temp')
const description = document.getElementById('description')
const searchBox = document.getElementById('search-box')
const searchBtn = document.getElementById('search-btn')
const timezone = document.getElementById('timezone')
const dew = document.getElementById('dew')
const humidity = document.getElementById('humidity')
const feelsLike = document.getElementById('feels-like')
const nextDays = document.querySelectorAll('.next-day')
const nextIcon = document.querySelectorAll('.next-icon')
const nextTemp = document.querySelectorAll('.next-temp')
const notification = document.querySelector('.invalid')
const deleteNotification = document.querySelector('.delete')

// Utility functions
const getWeather = async (city = 'delhi') => {
  try {
    const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${
      import.meta.env.VITE_API_KEY
    }`
    const response = await axios.get(URL)
    const data = response.data
    setDetails(data)
  } catch (error) {
    if (error.response.status === 400) {
      invalidLocation()
    }
  }
}

function setDetails(data) {
  const iconImg = data.days[0].icon
  cityName.textContent = data.resolvedAddress
  temperature.textContent = `${data.days[0].temp} ℃`
  dateTime.textContent = new Date(data.days[0].datetime).toDateString()
  minTemp.textContent = `Min : ${data.days[0].tempmin} ℃`
  maxTemp.textContent = `Max : ${data.days[0].tempmax} ℃`
  description.textContent = data.days[0].description
  weatherImg.src = `/assets/images/${iconImg}.jpg`
  weatherImg.alt = data.days[0].conditions
  weatherIcon.src = `/assets/weather-icons/${iconImg}.svg`
  weatherIcon.alt = data.days[0].conditions
  weatherCondition.textContent = data.days[0].conditions
  timezone.textContent = data.timezone
  dew.textContent = `${data.days[0].dew} ℃`
  humidity.textContent = `${data.days[0].humidity} g.m-3`
  feelsLike.textContent = `${data.days[0].feelslike} ℃`

  nextDays.forEach((day, num) => {
    day.textContent = new Date(data.days[num + 1].datetime).toLocaleDateString()
  })

  nextIcon.forEach((day, num) => {
    day.src = `/assets/weather-icons/${data.days[num + 1].icon}.svg`
    day.alt = data.days[num + 1].conditions
  })

  nextTemp.forEach((day, num) => {
    day.textContent = `${data.days[num + 1].temp} ℃`
  })
}

function invalidLocation() {
  notification.classList.add('active')
  setTimeout(() => {
    notification.classList.remove('active')
  }, 1000)
}

// Event Listeners
searchBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const city = searchBox.value
  if (city) getWeather(city)
  setTimeout(() => {
    searchBox.value = ''
  }, 2000)
})

deleteNotification.addEventListener('click', () => {
  notification.classList.remove('active')
})

getWeather()
