/*
global
Bookmark
include
*/

/* global Bookmark */ 
class Bookmark {
  constructor (elementId, options) {
    this.elementId = elementId
    const DEFAULTS = {
    }
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      let html =
      `<div>
      <svg xmlns="http://www.w3.org/2000/svg" class="bookmarkTest" viewBox="0 0 512 512">
        <title>Bookmark</title>
        <path d="M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z" fill="none" stroke="currentColor"
          stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
        </svg>
        <div class="bookmarkPopup" id="myForm"></div>
        <div class="bookmark-container" id="bookmark-container">
          <div class="bookmark-topline">
            <span>Bookmarks</span><button class="createNew">Create new bookmark</button>
          </div>
          <div class="btn">
          </div>
          <div>
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512">
              <title>Search</title>
              <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none"
                stroke="currentColor" stroke-miterlimit="10" stroke-width="32" />
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"
                d="M338.29 338.29L448 448" />
            </svg>
            <input class="search" type="search">
          </div>
    
          <hr>
          <div class="public">
            <svg class="caret" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512">
              <title>Caret Down</title>
              <path
                d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z" />
            </svg>
            <span>Public bookmarks (0)</span>
            <h4 class="public-text">You have no public bookmarks</h4>
            <p class="public-text">Right-click on a bookmark and select 'Make public'.</p>
          </div>
          <div class="my-bookmarks">
            <svg class="caret" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512">
              <title>Caret Down</title>
              <path
                d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z" />
            </svg>
            <span>My bookmarks (0)</span>
          </div>
        
        </div>
      </div>
    
      <div class="createNewPopup" id="createForm">
       <h1>hello testing popup</h1>
          </div>
        </div>`
      el.innerHTML = html
    }    
  }
  handleClick (event) {  
    if (event.target.classList.contains('bookmarkTest')) {
      openForm() 
    } 
    if (event.target.classList.contains('bookmarkPopup')) {
      closeForm() 
    } 
    if (event.target.classList.contains('createNew')) {
      createNewBookmark()
    }
    if (event.target.classList.contains('createNewPopup')) {
      closeBookmark()
    }
  }
}

function openForm () {
  const myForm = document.getElementById('myForm')
  if (myForm) { 
    myForm.style.display = 'block'
  }
  const bookmarkContainer = document.getElementById('bookmark-container')
  if (bookmarkContainer) { 
    bookmarkContainer.style.display = 'block'
  }
}
function closeForm () {
  const myForm = document.getElementById('myForm')
  myForm.style.display = 'none'
  const bookmarkContainer = document.getElementById('bookmark-container')
  if (bookmarkContainer) { 
    bookmarkContainer.style.display = 'none'
  }
}

function createNewBookmark () {
  const createNew = document.getElementById('createForm')
  createNew.style.display = 'block'
}

function closeBookmark () {
  const createNew = document.getElementById('createForm')
  createNew.style.display = 'none'
}


const bookmarkTest = new Bookmark('websy-bookmark')
