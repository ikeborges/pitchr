const express = require("express")
const fileupload = require("express-fileupload")

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
  const decks = [{
    id: 1,
    title: "WeFund",
    author: "Kaique Borges",
    uploadedAt: "Dec 15, 2022",
    coverUrl: "https://ucarecdn.com/30f6ddbb-73e1-4c33-ae67-9fa139a49e03/-/format/auto/-/quality/smart_retina/-/preview/"
  },
  {
    id: 2,
    title: "WeFund",
    author: "Kaique Borges",
    uploadedAt: "Dec 15, 2022",
    coverUrl: "https://ucarecdn.com/30f6ddbb-73e1-4c33-ae67-9fa139a49e03/-/format/auto/-/quality/smart_retina/-/preview/"
    }]

  res.render('index', { decks })
})

app.get("/upload-deck", (req, res) => {
  res.render('upload_deck')
})

app.post("/upload-deck", (req, res) => {
  const { username, title } = req.body
  const { deck: deckFile } = req.files

  res.send(JSON.stringify(deckFile))
})

module.exports = { app }
