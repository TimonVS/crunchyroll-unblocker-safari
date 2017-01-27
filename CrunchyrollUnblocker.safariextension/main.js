function setCookie(key, value) {
	document.cookie = key + '=' + value
}

function listen (event) {
  if (event.name !== 'cookie' || event.message == undefined) return

  setCookie('sess_id', event.message)
}

// Listen for messages from global page
safari.self.addEventListener('message', listen, false)

// Request cookie from global page
safari.self.tab.dispatchMessage('getCookie')
