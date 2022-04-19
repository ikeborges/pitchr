const express = require("express")
const app = express()

app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'ejs')

app.use(express.static('public'))

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

module.exports = { app }
