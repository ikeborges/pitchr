const express = require("express")
const fileupload = require("express-fileupload")
const { fromBuffer } = require("pdf2pic")
const ImageKit = require('imagekit')
const Deck = require('./models/deck')

const imagekit = new ImageKit({
  publicKey: "public_+RGZRmY9ls6q31O7mEFody74UGY=",
  privateKey: "private_X3k6uOPieFnhASseGSWfh77r6XI=", // Since it's not production code I'll leave it here
  urlEndpoint: "https://ik.imagekit.io/ucmcr6ikh"
})

const app = express()

app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(fileupload({
  createParentPath: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", async (req, res) => {
  const decks = await Deck.find().exec()
  res.render('index', { decks })
})

app.get("/upload-deck", (req, res) => {
  res.render('upload_deck')
})

app.post("/upload-deck", async (req, res) => {
  const { username, title } = req.body
  const { deck: deckFile } = req.files

  const options = {
    density: 100,
    format: "png"
  }

  const images = await fromBuffer(deckFile.data, options).bulk(-1, true)
  const uploadedImages = []
  for (let i = 0; i < images.length; i++) {
    const image = imagekit.upload({
      fileName: `Image${i}.png`,
      file: images[i].base64
    })

    uploadedImages.push(image)
  }

  const imageUrls = await Promise.all(uploadedImages)

  const deck = new Deck({ title, author: username, pages: imageUrls.map(item => item.url) })
  await deck.save()

  res.redirect(`/decks/${deck._id}`)
})

app.get("/decks/:id", async (req, res) => {
  const deck = await Deck.findById(req.params.id).exec()

  res.render('deck', {deck})
})

module.exports = { app }
