/*
global
Bookmark
include
*/

/*
global
Bookmark
 */ 
class Bookmark {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
      text: 'Bookmarks'
    }
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      let html =
      `
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
        <title>Bookmark</title>
        <path d="M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z" fill="none" stroke="currentColor"
          stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
          <h5>${this.options.text}</h5>
        </svg>

      `
      el.innerHTML = html
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

function openForm () {
  document.getElementById('myForm').style.display = 'block'
}

function closeForm () {
  document.getElementById('myForm').style.display = 'none'
}


const bookmarkTest = new Bookmark('websy-bookmark')
