// import gsap from 'gsap'
// import Flip from 'gsap/Flip'
//
// gsap.registerPlugin(Flip)
//
// import * as BABYLON from 'babylonjs'
// Select the element to animate using the correct class nam
//
function main() {
  'use strict'

  if (!document.startViewTransition) {
    console.error('View Transitions API is not supported in this browser.')
    return
  }

  window.addEventListener('load', () => {
    // Determine if we're on the source page by checking for the transition button.
    const btn = document.getElementById('transitionBtn')
    let container = document.querySelector('.vt__container')

    if (btn) {
      // Source page: if container isn't found, fallback to document.body.
      if (!container) {
        console.warn('Container with class "vt__container" not found on source page. Using document.body as fallback.')
        container = document.body
      }
    } else {
      // Destination page: container must exist.
      if (!container) {
        console.error('On destination page, container with class "vt__container" not found.')
        return
      }
    }

    let box

    // On destination page, check sessionStorage for stored box HTML.
    const storedBoxHTML = sessionStorage.getItem('sharedBoxHTML')
    if (storedBoxHTML) {
      const temp = document.createElement('div')
      temp.innerHTML = storedBoxHTML.trim()
      box = temp.firstChild
      container.appendChild(box)
      sessionStorage.removeItem('sharedBoxHTML')
      console.log('Box recreated from stored HTML and appended to container:', box)
    } else {
      // Otherwise, look for an existing box.
      box = document.querySelector('.vt__box')
      if (!box) {
        // If not found, create it.
        box = document.createElement('div')
        box.className = 'vt__box'
        box.textContent = 'Shared Box'
        container.appendChild(box)
        console.log('New box created and appended:', box)
      } else {
        console.log('Existing box found:', box)
      }
    }
    // Set the shared view transition name so the browser can match the element.
    box.style.setProperty('view-transition-name', 'shared-box')

    // Source page logic: attach the click handler if the transition button exists.
    if (btn) {
      console.log('Transition button found (source page).')
      btn.addEventListener('click', () => {
        // On the source page, before transitioning, store the box's outerHTML.
        const sourceBox = document.querySelector('.vt__box')
        if (sourceBox) {
          sessionStorage.setItem('sharedBoxHTML', sourceBox.outerHTML)
          console.log('Stored box HTML for transition.')
        }
        // Start the view transition and navigate to the destination page.
        document.startViewTransition(() => {
          window.location.href = 'https://buffer-631024.webflow.io/view-transition-api/page-b'
        })
      })
    } else {
      console.log('No transition button found. Assuming destination page.')
    }
  })
}
main()
