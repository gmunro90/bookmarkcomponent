/*
global
Bookmark
include
enigma
schema
app
*/

include('./components/index.js')

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
