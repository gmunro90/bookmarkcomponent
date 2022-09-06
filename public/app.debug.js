/*
global
Bookmark
include
enigma
schema
app
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
      el.addEventListener('keyup', this.handleKeyUp.bind(this))
      el.addEventListener('change', this.handleChange.bind(this))
      let html = `<div>
      <svg xmlns='http://www.w3.org/2000/svg' class='bookmarkBtn' viewBox='0 0 512 512'>
        <title>Bookmark</title>
        <path d='M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z' fill='none' stroke='currentColor'
          stroke-linecap='round' stroke-linejoin='round' stroke-width='32' />
        </svg>
        <div class='bookmarkPopup' id='bookmarkPopup'></div>
        <div class='bookmarkContainer' id='bookmarkContainer'>
          <div class='bookmark-topline'>
            <span class="heading">Bookmarks</span><button class='createNew'>Create new bookmark</button>
          </div>
          <div class='btn'>
          </div>
          <div>
            <input class='search' type='text' id="myInput" placeholder="Search" onkeyup"searchFunction()">
            <div><svg class="close" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <title>Close</title><path fill='none' stroke='currentColor' stroke-linecap='round' 
            stroke-linejoin='round' stroke-width='32' d='M368 368L144 144M368 144L144 368'/>
            </svg></div>
            
          </div>
          <hr>
          <div class='public'>
          <div class="public-heading-caret">
              <svg class='public-caret caret' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>
                <title>Caret Down</title>
                <path d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' />
              </svg>

              <span class="heading">Public bookmarks <span id="publicCount">(0)</span></span>
              </div>
              <div id="public-placeholder" class="active"><p class='public-text'>You have no public bookmarks</p>
              <p class='public-text'>Right-click on a bookmark and select 'Make public'.</p>
            
          </div>
        </div>
          <div class='my-bookmarks'>

          <div class="heading-caret">
            <svg class='myBookmarks-caret caret' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>
              <title>Caret Down</title>
              <path
                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' />
            </svg>
            <span class="heading">My bookmarks <span id="myBookmarksCount">(0)</span></span>
            </div>

            <div id="myBookmarks-placeholder" class="active">
            </div>
          </div>
        </div>
      </div>

      <div class='createNewPopup' id='createForm'>
    <div class='createTopline'>
    <span class="heading">Create bookmark</span>
    <span class='closeCreate'><svg xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>
    <title>Close</title>
    <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'
      d='M368 368L144 144M368 144L144 368' />
  </svg></span></br>

    </div>
    <hr>
    <div class="create-input">
    <label for='bookmarkName' class="title">Title</label>
      <input type='text' id='bookmarkName' name='bookmarkName'>
      <label for='bookmarkDescription' class="description">Description <span class='optional'>(optional)</span></label><br>
      <input type='text' id='bookmarkDescription' name='bookmarkDescription'>
      <div class="create-flex"><button class='createSubmit' id='createSubmit'>Create</button>
      </div>
    </div>
  </div>
    `
      el.innerHTML = html
      this.render()
    }    
  }
  
  render (searchText) {
    let publicCount = document.getElementById('publicCount')
    let publicBookmarks = []
    let myBookmarksCount = document.getElementById('myBookmarksCount')
    let myBookmarks = []
    this.options.app.createSessionObject(
      {
        'qInfo': {
          'qId': 'BookmarkList',
          'qType': 'BookmarkList'
        },
        'qBookmarkListDef': {
          'qType': 'bookmark',
          'qData': {
            'title': '/qMetaDef/title',
            'description': '/qMetaDef/description',
            'sheetId': '/sheetId',
            'selectionFields': '/selectionFields',
            'creationDate': '/creationDate'
          }
        }
      }
    )
      .then((model) => {
        model.getLayout().then(layout => {
          layout.qBookmarkList.qItems.forEach(d => {
            if (d.qMeta.published === true) {
              if (searchText) {
                if (d.qMeta.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                  publicBookmarks.push(d)
                }
              } 
              else {
                publicBookmarks.push(d)
              }
            } 
            else {
              if (searchText) {
                if (d.qMeta.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                  myBookmarks.push(d)
                }
              } 
              else {
                myBookmarks.push(d)
              }
            }
          })
          let publicHtml = ''
          publicBookmarks.forEach(bookmark => {
            publicHtml += `
              <div class="public-li" id="public-li">
              <span class="bookmarkText">${bookmark.qMeta.title}</span>
              <div class="date-and-i">
              <span class="bookmarkText">${new Date(bookmark.qMeta.createdDate).toLocaleString().slice(0, 10)}</span>
              <span class="infoBtn">
              <svg xmlns="http://www.w3.org/2000/svg" class="i-icon-public" id="i-icon-public" viewBox="0 0 512 512">
              <title>Information Circle</title>
              <path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z"
               fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M220 220h32v116"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10"
               stroke-width="32" d="M208 340h88"/><path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"/>
               </svg>
               </span>
               </div>
              </div>
             
              <div class="info-popup-public" id="info-popup-public">
              <h5 class="description-heading">${bookmark.qMeta.description}</h5>
              <h5>Selections: </h5>
              </div>
              `
          })
          let bookmarkHtml = ''
          myBookmarks.forEach(bookmark => {
            console.log(bookmark)
            bookmarkHtml += `
              <div class="myBookmarks-li">
                  <span class="bookmarkText">${bookmark.qMeta.title}</span>
                  <div class="date-and-i">
                  <div class="date">
                  <span class="bookmarkText">${new Date(bookmark.qMeta.createdDate).toLocaleString().slice(0, 10)}</span>
                  <span class="infoBtn">
                  </div>
                  
            `
            if (bookmark.qMeta.privileges.indexOf('delete') !== -1) {
              bookmarkHtml += ` <svg id=${bookmark.qInfo.qId} xmlns='http://www.w3.org/2000/svg' class='delete-icon'
              viewBox='0 0 512 512'><title>Close</title><path fill='none'
              stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'
                stroke-width='32' d='M368 368L144 144M368 144L144 368'/>
                </svg>
                
                `
            }
            bookmarkHtml += `<svg xmlns="http://www.w3.org/2000/svg" class="i-icon-my" id="i-icon-my" viewBox="0 0 512 512">
            <title>Information Circle</title>
            <path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z"
             fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none"
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M220 220h32v116"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10"
             stroke-width="32" d="M208 340h88"/><path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"/>
             </svg>
             </span>
             </div>
            
             <div class="info-popup-my" id="info-popup-my">
             <h5 class="description-heading">${bookmark.qMeta.description}</h5>
             <h5>Selections: </h5>
             </div>
             </div>
             `
          })
          const publicPlaceholder = document.getElementById('public-placeholder')
          publicPlaceholder.innerHTML = publicHtml
          const myBookmarksPlaceholder = document.getElementById('myBookmarks-placeholder')
          myBookmarksPlaceholder.innerHTML = bookmarkHtml 
          publicCount.textContent = `(` + publicBookmarks.length + `)`
          myBookmarksCount.textContent = `(` + myBookmarks.length + `)`
        })
      })
  }
  handleKeyUp () {
    this.searchFunction()
  }
  handleClick (event) {  
    const bookmarkTitle = document.getElementById('bookmarkName')
    const bookmarkDescription = document.getElementById('bookmarkDescription')
    if (event.target.classList.contains('bookmarkBtn')) {
      this.openForm() 
    } 
    if (event.target.classList.contains('bookmarkPopup')) {
      this.closeForm()
      this.closeBookmark()
    } 
    if (event.target.classList.contains('createNew')) {
      this.createNewBookmark()
    }
    if (event.target.classList.contains('closeCreate')) {
      const bookmarkBackground = document.getElementById('bookmarkPopup')
      bookmarkBackground.style.backgroundColor = 'white'
      this.closeBookmark()
    }
    if (event.target.classList.contains('public-heading-caret')) {
      this.closePublicUL()
    }
    if (event.target.classList.contains('heading-caret')) {
      this.closeMyBookmarksUL()
    }
    if (event.target.classList.contains('createSubmit')) {
      const bookmarkBackground = document.getElementById('bookmarkPopup')
      this.options.app.createBookmark(
        {
          qInfo: {
            qType: 'bookmark'
          },
          qMetaDef: {
            title: `${bookmarkTitle.value}`,
            description: `${bookmarkDescription.value}`
          }
        }
      )
        .then(() => {
          this.render()
        })
      this.closeBookmark()
      bookmarkBackground.style.backgroundColor = 'white'
    }
    if (event.target.classList.contains('delete-icon')) {
      this.options.app.destroyBookmark(event.target.id)
        .then(() => {
          this.render()
        })
    }
    if (event.target.classList.contains('i-icon-public')) {
      this.openInfoPublic()
    }
    if (event.target.classList.contains('i-icon-my')) {
      this.openInfoMy()
    }
  }
  handleChange (event) {
    if (event.target.classList.contains('search')) {
      this.render(event.target.value)
    }
  }
  searchFunction () {
    let input, filter
    input = document.getElementById('myInput')
    filter = input.value.toLowerCase()
    this.render(filter)
  }
  openForm () {
    const myForm = document.getElementById('bookmarkPopup')
    if (myForm) { 
      myForm.style.display = 'block'
    }
    const bookmarkContainer = document.getElementById('bookmarkContainer')
    if (bookmarkContainer) { 
      bookmarkContainer.style.display = 'block'
    }
  }
  openInfoPublic () {
    const infoPopup = document.getElementById('info-popup-public')
    infoPopup.style.display = 'block'
    const infoMyPopup = document.getElementById('info-popup-my')
    infoMyPopup.style.display = 'none'
  }
  closeInfoPublic () {
    const infoPopup = document.getElementById('info-popup-public')
    infoPopup.style.display = 'none'
  }
  openInfoMy () {
    const infoMyPopup = document.getElementById('info-popup-my')
    infoMyPopup.style.display = 'block'
    const infoPopup = document.getElementById('info-popup-public')
    infoPopup.style.display = 'none'
  }
  closeInfoMy () {
    const infoMyPopup = document.getElementById('info-popup-my')
    infoMyPopup.style.display = 'none'
  }
  closeForm () {
    const myForm = document.getElementById('bookmarkPopup')
    myForm.style.display = 'none'
    const bookmarkContainer = document.getElementById('bookmarkContainer')
    if (bookmarkContainer) { 
      bookmarkContainer.style.display = 'none'
    }
  }
  createNewBookmark () {
    const createNew = document.getElementById('createForm')
    const bookmarkBackground = document.getElementById('bookmarkPopup')
    const bookmarkContainer = document.getElementById('bookmarkContainer')
    createNew.style.display = 'flex'
    bookmarkBackground.style.backgroundColor = '#bdbdbd'
    bookmarkContainer.style.opacity = '.4'
  }
  closeBookmark () {
    const createNew = document.getElementById('createForm')
    createNew.style.display = 'none'
    const bookmarkContainer = document.getElementById('bookmarkContainer')
    bookmarkContainer.style.opacity = '1'
  }
  closePublicUL () {
    const publicItem = document.getElementById('public-placeholder')
    publicItem.classList.toggle('active')
  }
  closeMyBookmarksUL () {
    const myBookmarksItem = document.getElementById('myBookmarks-placeholder')
    myBookmarksItem.classList.toggle('active')
  }
}


const session = enigma.create({
  schema, 
  url: 'wss://ec2-3-86-99-193.compute-1.amazonaws.com/app/cee97e28-59cf-411f-acb5-c3a7f40ee7ac'
})

session.open().then(global => {
  console.log(global)
  global.openDoc('cee97e28-59cf-411f-acb5-c3a7f40ee7ac').then(app => {
    console.log(app)
    const bookmark = new Bookmark('websy-bookmark', {app})
  })
})
