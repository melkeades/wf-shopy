const PROD_URL = ['https://cdn.jsdelivr.net/gh/melkeades/wf-shopy/dist/main.js']
const LOCAL_URL = ['http://localhost:5173/@vite/client', 'http://localhost:5173/main.js']
let devMode = document.devMode === true
if (devMode) console.log('%cdevMode is ON', 'font-size: 1.5rem; background: midnightblue;')
let blob

fetch(devMode ? LOCAL_URL[0] : PROD_URL[0], {})
  .then((response) => {
    if (!response.ok) {
      console.log('Prod scripts failed, trying local')
      devMode = true
    }
  })
  .then((scriptText) => {
    blob = new Blob([scriptText], { type: 'text/javascript' })
  })
  .catch((error) => {
    devMode = false
    console.log(error)
  })
  .finally(() => {
    const scriptsUrls = devMode ? LOCAL_URL : [URL.createObjectURL(blob)]
    const scripts = scriptsUrls.map((url) => {
      const s = document.createElement('script')
      s.src = url
      //s.defer = true
      if (devMode) s.type = 'module'
      return s
    })

    scripts.forEach((script) => document.body.appendChild(script))
  })

fetch('url-to-your-script.js')
  .then((response) => response.text())
  .then((scriptText) => {
    const blob = new Blob([scriptText], { type: 'text/javascript' })
    const scriptURL = URL.createObjectURL(blob)
    const scriptElement = document.createElement('script')
    scriptElement.src = scriptURL
    document.body.appendChild(scriptElement)
  })
  .catch((error) => console.error('Error loading script:', error))
