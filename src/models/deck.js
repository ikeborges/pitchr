const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DeckSchema = new Schema({
  title: String,
  author: String,
  pages: [String]
})

const Deck = mongoose.model('Deck', DeckSchema)

module.exports = Deck
