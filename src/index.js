const { app } = require("./app")
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000

mongoose.connect('mongodb://root:root@mongo:27017/')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}...`)
})
