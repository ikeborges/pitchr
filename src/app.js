const express = require("express")
const fileupload = require("express-fileupload")
const { fromBuffer } = require("pdf2pic")
const ImageKit = require('imagekit')

const imagekit = new ImageKit({
  publicKey: "public_+RGZRmY9ls6q31O7mEFody74UGY=",
  privateKey: "private_X3k6uOPieFnhASseGSWfh77r6XI=", // Since it's not production code I'll leave it here
  urlEndpoint: "https://ik.imagekit.io/ucmcr6ikh"
})

const authParams = imagekit.getAuthenticationParameters()

const app = express()

app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(fileupload({
  createParentPath: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  const deck = {
    id: 1,
    title: "WeFund",
    author: "Kaique Borges",
    uploadedAt: "Dec 15, 2022",
    pages: ["https://ucarecdn.com/30f6ddbb-73e1-4c33-ae67-9fa139a49e03/-/format/auto/-/quality/smart_retina/-/preview/"]
  }

  res.render('index', { deck })
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

  const imageUrls = []

  for (let i = 0; i < images.length; i++) {
    const image = await imagekit.upload({
      fileName: `Image${i}.png`,
      file: images[i].base64
    })

    imageUrls.push(image.url)
  }

  res.send(imageUrls)
})

module.exports = { app }
