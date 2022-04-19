const { app } = require("./app")
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000

mongoose.connect('mongodb+srv://admin:admin@cluster0.ysu1k.mongodb.net/pitchr?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}) // Also not production

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}...`)
})
