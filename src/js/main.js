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
  url: 'wss://ec2-3-92-185-52.compute-1.amazonaws.com/anon/app/af650d53-f31b-476d-b28b-7db3bd2f620f'
})

session.open().then(global => {
  console.log(global)
  global.openDoc('af650d53-f31b-476d-b28b-7db3bd2f620f').then(app => {
    console.log(app)
    const bookmark = new Bookmark('websy-bookmark', {app})
  })
})
