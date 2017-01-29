function setCookie (key, value) {
  document.cookie = key + '=' + value
}

function getCookie (key) {
  var value = '; ' + document.cookie
  var parts = value.split('; ' + key + '=')
  if (parts.length >= 2) return parts.pop().split(';').shift()
}

function listen (event) {
  if (event.name !== 'cookie' || event.message == undefined) return

  setCookie('sess_id', event.message)
}

function isUS () {
  var us = new RegExp('United States of America')
  var location = document.getElementById('footer_country_flag')
  if (us.test(location.alt)) {
    return true
  }
}

function main () {
  var time = localStorage.getItem('LAST_UPDATED')
  var SECONDS_IN_HOUR = 3600

  // Don't update cookies if locale is still set to United States
  if ((time + (SECONDS_IN_HOUR * 3)) > (Date.now() || isUS())
    && getCookie('sess_id')) return

  NOW = Date.now()
  localStorage.setItem('LAST_UPDATED', NOW)

  // Request cookie from global page
  safari.self.tab.dispatchMessage('getCookie')
}

main()

// Listen for messages from global page
safari.self.addEventListener('message', listen, false)
