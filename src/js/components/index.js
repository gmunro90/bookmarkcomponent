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
      let html = `<div>
      <svg xmlns='http://www.w3.org/2000/svg' class='bookmarkBtn' viewBox='0 0 512 512'>
        <title>Bookmark</title>
        <path d='M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z' fill='none' stroke='currentColor'
          stroke-linecap='round' stroke-linejoin='round' stroke-width='32' />
        </svg>
        <div class='bookmarkPopup' id='bookmarkPopup'></div>
        <div class='bookmarkContainer' id='bookmarkContainer'>
          <div class='bookmark-topline'>
            <span>Bookmarks</span><button class='createNew'>Create new bookmark</button>
          </div>
          <div class='btn'>
          </div>
          <div>
            <input class='search' type='search' id="myInput" placeholder="Search" onkeyup">
          </div>
          <hr>
          <div class='public'>
            <svg class='caret' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>
              <title>Caret Down</title>
              <path
                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' />
            </svg>
            <span>Public bookmarks <span id="publicCount">(0)</span></span>
            <div id="public-placeholder"><p class='public-text'>You have no public bookmarks</p>
            <p class='public-text'>Right-click on a bookmark and select 'Make public'.</p>
            </div>
          </div>
          <div class='my-bookmarks'>
            <svg class='caret' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>
              <title>Caret Down</title>
              <path
                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' />
            </svg>
            <span>My bookmarks <span id="myBookmarksCount">(0)</span></span>
            <div id="mybookmarks-placeholder"><p class='public-text'>You have no public bookmarks</p>
            <p class='public-text'>Right-click on a bookmark and select 'Make public'.</p>
          
            </div>
          </div>
        </div>
      </div>
      <div class='createNewPopup' id='createForm'>
    <div class='createTopline'>
      <h2>Create bookmark</h2>
      <hr>
      <svg xmlns='http://www.w3.org/2000/svg' class='closeCreate' viewbox='0 0 512 512'>
        <title>Close</title>
        <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'
          d='M368 368L144 144M368 144L144 368' />
      </svg><br>
    </div>
    <div>
    <label for='bookmarkName'>Title</label><br>
      <input type='text' id='bookmarkName' name='bookmarkName'>
      <label for='bookmarkDescription'>Description <span class='optional'>(optional)</span></label><br>
      <input type='text' id='bookmarkDescription' name='bookmarkDescription'>
      <button class='createSubmit' id='createSubmit'>Create</button>
    </div>
  </div>
    `
      el.innerHTML = html
      this.render()
    }    
  }
  
  render () {
    const bookmarkTitle = document.getElementById('bookmarkName')
    const bookmarkDescription = document.getElementById('bookmarkDescription')
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
          console.log(layout)
          layout.qBookmarkList.qItems.forEach(d => {
            if (d.qMeta.published === true) {
              publicBookmarks.push(d)
            } 
            else {
              myBookmarks.push(d)
            }
          })
          let publicHtml = ''
          publicBookmarks.forEach(bookmark => {
            publicHtml += `
            <div>
            <ul id="myUL">
              <li class="public-li" id="public-li">${bookmark.qMeta.title}</li>
              <hr>
              </ul>
            </div>`
          })
          let bookmarkHtml = ''
          myBookmarks.forEach(bookmark => {
            bookmarkHtml += `
              <div>
              <ul>
               <li class="my-bookmarks-li">
               ${bookmarkTitle.value}
               </li>
               <p>${bookmarkDescription.value}</p>
              </div>
              `
          })
          const publicPlaceholder = document.getElementById('public-placeholder')
          publicPlaceholder.innerHTML = publicHtml
          const myBookmarksPlaceholder = document.getElementById('mybookmarks-placeholder')
          myBookmarksPlaceholder.innerHTML = bookmarkHtml 
          publicCount.textContent = `(` + publicBookmarks.length + `)`
          myBookmarksCount.textContent = `(` + myBookmarks.length + `)`
        })
      })
  }

  handleClick (event) {  
    const bookmarkTitle = document.getElementById('bookmarkName')
    const bookmarkDescription = document.getElementById('bookmarkDescription')

    if (event.target.classList.contains('bookmarkBtn')) {
      openForm() 
    } 
    if (event.target.classList.contains('bookmarkPopup')) {
      closeForm() 
    } 
    if (event.target.classList.contains('createNew')) {
      createNewBookmark()
    }
    if (event.target.classList.contains('closeCreate')) {
      closeBookmark()
    }
    if (event.target.classList.contains('caret')) {
      closeLi()
    }
    // if (event.target.classList.contains('caret')) {
    //   openLi()
    // }
    if (event.target.classList.contains('createSubmit')) {
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
      closeBookmark()
    }
  }
}

function openForm () {
  const myForm = document.getElementById('bookmarkPopup')
  if (myForm) { 
    myForm.style.display = 'block'
  }
  const bookmarkContainer = document.getElementById('bookmarkContainer')
  if (bookmarkContainer) { 
    bookmarkContainer.style.display = 'block'
  }
}
function closeForm () {
  const myForm = document.getElementById('bookmarkPopup')
  myForm.style.display = 'none'
  const bookmarkContainer = document.getElementById('bookmarkContainer')
  if (bookmarkContainer) { 
    bookmarkContainer.style.display = 'none'
  }
}

function createNewBookmark () {
  const createNew = document.getElementById('createForm')
  createNew.style.display = 'flex' 
}

function closeBookmark () {
  const createNew = document.getElementById('createForm')
  createNew.style.display = 'none'
}
// function openLi () {
//   const publicListItem = document.getElementById('public-li')
//   publicListItem.style.display = 'block'
// }
function closeLi () {
  const publicListItem = document.getElementsByClassName('public-li')
}
function searchFunction () {
  let input, filter, ul, li, a, i, txtValue
  input = document.getElementById('myInput')
  filter = input.value.toUpperCase()
  ul = document.getElementById('myUL')
  li = ul.getElementsByTagName('li')

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName('li')[0]
    txtValue = a.textContent || a.innerText
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = ''
    } 
    else {
      li[i].style.display = 'none'
    }
  }
}
