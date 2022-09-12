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
            <input class='search' type='text' id="myInput" placeholder="Search">
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
  </svg></span>

    </div>
    <hr>
    <div class="create-input">
    <label for='bookmarkName' class="title">Title</label>
      <input type='text' id='bookmarkName' name='bookmarkName'>
      <label for='bookmarkDescription' class="description">Description <span class='optional'>(optional)</span></label><br>
      <input type='text' id='bookmarkDescription' name='bookmarkDescription'>
      <div class="create-flex"><button type="button" disabled class='createSubmit' id='createSubmit'>Create</button>
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
          let publicHtml = `<div id="info-popup-mask" class="info-popup-mask"></div>`
          publicBookmarks.forEach(bookmark => {
            console.log('bookmark', bookmark)
            publicHtml += `
              <div class="public-li" id="public-li">
              <span class="bookmarkText">${bookmark.qMeta.title}</span>
              <div class="date-and-i">
              <span class="bookmarkText">${new Date(bookmark.qMeta.createdDate).toLocaleString().slice(0, 10)}</span>
              <span class="infoBtn">
               <svg data-bookmark="${bookmark.qInfo.qId}" class="i-icon-public" id="i-icon-public" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
               <title>Information Circle</title><path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 
               56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm48 226h-88a16 16 0 010-32h28v-88h-16a16 16 0 010-32h32a16 16 0 0116 
               16v104h28a16 16 0 010 32z"/>
               </svg>
               </span>
               </div>
              </div>
             
              <div class="info-popup" id="info-popup-${bookmark.qInfo.qId}">
              <div class="info-topline" id="info-topline">
              <span class="description-heading" id="description-heading">${bookmark.qMeta.description}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="edit-info" viewBox="0 0 512 512">
              <title>Create</title><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48"
               fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
               <path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34
                0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91
                 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"/>
                 </svg>
                 </div>
                 <div class="edit-topline">
                 <svg xmlns="http://www.w3.org/2000/svg" class="tick-icon" id="tick-icon" viewBox="0 0 512 512">
                 <title>Checkmark Circle</title><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" 
                  stroke-width="32" d="M352 176L217.6 336 160 272"/>
                  </svg>
                  </div>
                 <div id="edit-inputs" class="edit-inputs">
                 <input type="text" id="edit-title"  value="${bookmark.qMeta.title}"/>
                 <input type="text" id="edit-description" value="${bookmark.qMeta.description}"  />
                 </div>
              <span class="selections"><b>Selections:</b> ${bookmark.qData.selectionFields} </span>
              <div class="info-copy">
              <span class="set-expression">Set expression</span>
              <input type="text" READONLY class="info-input" value="${bookmark.qData.selectionFields}" />
              <div class="flex">
              <button class="copy">Copy</button>
              </div>
              </div>
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
          })
          let bookmarkHtml = ''
          myBookmarks.forEach(bookmark => {
            console.log('new bookmark', bookmark)
            let createDate = new Date()
            if (bookmark.qMeta.createdDate) {
              createDate = new Date(bookmark.qMeta.createdDate)
            }
            bookmarkHtml += `
              <div class="myBookmarks-li">
                  <span class="bookmarkText">${bookmark.qMeta.title}</span>
                  <div class="date-and-i">
                  <div class="date">
                  <span class="bookmarkText">${createDate.toLocaleString().slice(0, 10)}</span>
                  <span class="infoBtn">
                  </div>
                  
            `
            if (bookmark.qMeta.privileges.indexOf('delete') !== -1) {
              bookmarkHtml += 
              `
              <svg id=${bookmark.qInfo.qId} xmlns='http://www.w3.org/2000/svg' class='delete-icon'
              viewBox='0 0 512 512'><title>Close</title><path fill='none'
              stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'
                stroke-width='32' d='M368 368L144 144M368 144L144 368'/>
                </svg>
              `
            }
            bookmarkHtml += `
             <span class="infoBtn">
             <svg data-bookmark="${bookmark.qInfo.qId}" class="i-icon-my" id="i-icon-my" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
             <title>Information Circle</title><path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 
             56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm48 226h-88a16 16 0 010-32h28v-88h-16a16 16 0 010-32h32a16 16 0 0116 
             16v104h28a16 16 0 010 32z"/>
             </svg>
             </span>
             </div>
            
             <div class="info-popup" id="info-popup-${bookmark.qInfo.qId}">
             <div class="info-topline">
             <span class="description-heading">${bookmark.qMeta.description}</span>
             <svg xmlns="http://www.w3.org/2000/svg" class="edit-info" viewBox="0 0 512 512">
             <title>Create</title><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48"
              fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
              <path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34
               0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91
                0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"/>
                </svg>
             
                </div>
                <span class="selections"><b>Selections:</b> ${bookmark.qData.selectionFields} </span>
                <div class="info-copy">
                <span class=""set-expression>Set expression</span>

                <input type="text" READONLY class="info-input" ${bookmark.qData.selectionFields} />
                
                <button class="copy">Copy</button>
              
                </div>
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
    const bookmarkName = document.getElementById('bookmarkName').value
    this.searchFunction()
    if (bookmarkName.length === 0) {
      this.disableCreate()
    }
    else {
      this.enableCreate()
    }
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
      const infoList = Array.from(document.getElementsByClassName('info-popup'))
      infoList.forEach(e => {
        e.classList.remove('active')
      })
      const mask = document.getElementById('info-popup-mask')
      mask.classList.remove('active')
    } 
    if (event.target.classList.contains('createNew')) {
      this.createNewBookmark()
    }
    if (event.target.classList.contains('closeCreate')) {
      const bookmarkBackground = document.getElementById('bookmarkPopup')
      bookmarkBackground.style.backgroundColor = 'transparent'
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
      bookmarkBackground.style.backgroundColor = 'transparent'
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
          document.getElementById('bookmarkName').value = ''
          this.render()
        })
      this.closeBookmark()
    }
    if (event.target.classList.contains('delete-icon')) {
      this.options.app.destroyBookmark(event.target.id)
        .then(() => {
          this.render()
        })
    }
    if (event.target.classList.contains('i-icon-public')) {
      this.toggleInfo(event)
    }
    if (event.target.classList.contains('i-icon-my')) {
      this.toggleInfo(event)
    }
    if (event.target.classList.contains('info-popup-mask')) {
      const infoList = Array.from(document.getElementsByClassName('info-popup'))
      infoList.forEach(e => {
        e.classList.remove('active')
      })
      const mask = document.getElementById('info-popup-mask')
      mask.classList.remove('active')
    }
    if (event.target.classList.contains('edit-info')) {
      this.editInfo()
      this.hideInfoTopline()
      this.showTickIcon()
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
  toggleInfo (event) {
    const infoList = Array.from(document.getElementsByClassName('info-popup'))
    infoList.forEach(e => {
      e.classList.remove('active')
    })
    const bookmarkId = event.target.getAttribute('data-bookmark')
    const toggleInfo = document.getElementById(`info-popup-${bookmarkId}`)
    const mask = document.getElementById('info-popup-mask')
    toggleInfo.classList.add('active')
    mask.classList.add('active')
  }
  enableCreate () {
    document.getElementById('createSubmit').disabled = false
  }
  disableCreate () {
    document.getElementById('createSubmit').disabled = true
  }
  editInfo () {
    const editInputs = document.getElementById('edit-inputs')
    editInputs.classList.toggle('active')
  }
  hideInfoTopline () {
    const hideInfoTop = document.getElementById('info-topline')
    hideInfoTop.classList.toggle('active')
  }
  showTickIcon () {
    const showTick = document.getElementById('tick-icon')
    showTick.classList.add('active')
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
