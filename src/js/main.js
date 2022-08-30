/*
global
Bookmark
include
enigma
schema
*/

include('./components/index.js')

const bookmarkTest = new Bookmark('websy-bookmark')

const session = enigma.create({
  schema, 
  url: ''
})

session.open().then(global => {
  console.log(global)
  //   global.getDocList().then(response => {
  //     console.log(response)
  // })
  global.openDoc('').then(app => {
    console.log(app)
  })
})
