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
  url: 'wss://ec2-3-86-99-193.compute-1.amazonaws.com/app//d077bbca-1fa2-4564-83d5-88f801899a5c'
})

session.open().then(global => {
  console.log(global)
  global.openDoc('d077bbca-1fa2-4564-83d5-88f801899a5c').then(app => {
    console.log(app)
    const bookmark = new Bookmark('websy-bookmark', {app})
  })
})
