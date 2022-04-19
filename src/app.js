const express = require("express")
const app = express()

app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get("/", (req, res) => {
  res.render('index', {message: "Hello world"})
})

app.get("/upload-deck", (req, res) => {
  res.render('upload_deck')
})

module.exports = { app }
