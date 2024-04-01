import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
// import 'primereact/resources/themes/md-light-deeppurple/theme.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'
import * as serviceWorkerRegistration from './assets/serviceWorkerRegistration.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

serviceWorkerRegistration.register({
  onUpdate: async (registration) => {
    alert('New version available!  Ready to update?')
    if (registration && registration.waiting) {
      await registration.unregister()
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
    window.location.reload()
  }
})



