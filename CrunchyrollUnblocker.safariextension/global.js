function getCookie (callback) {
  var xhr = new XMLHttpRequest()
  xhr.timeout = 5000
  xhr.ontimeout = timeoutError
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return
    callback(xhr.responseText)
  }
  xhr.open('GET', 'http://www.crunblocker.com/sess_id.php', true)
  xhr.send(null)
}

function timeoutError () {
  var n = new Notification(
    'Request timed out', {
      body: 'Crunchyroll Unblocker has encounted an error'
    }
  )
}

function listen (event) {
  if (event.name !== 'getCookie') return

  getCookie(function (data) {
    event.target.page.dispatchMessage('cookie', data)
  })
}

// Listen for messages from background script
safari.application.addEventListener('message', listen, false)
