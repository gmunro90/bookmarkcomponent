/*
global
Bookmark
*/

const options = {
  text: 'websy designs bookmark',
  onClick: () => {
    console.log('success')
  }
}

const bookmarkTest = new Bookmark('websy-bookmark', options)
