/*
global
Bookmark
 */ 
class Bookmark {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      text: 'Bookmarks',
      onClick: () => {
        let popup = document.getElementById('myPopup')
        popup.classList.toggle('show')
      }
    }
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.innerHTML = this.options.text
    }    
  }
  bookmarkThis () {
    console.log('testing booking click')
  }
  handleClick (event) {  
    if (this.options.onClick) {
      this.options.onClick(event)
      this.bookmarkThis()
    } 
  }
}
