const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3333
app.use(express.static(path.join(__dirname, 'dist')))
app.listen(PORT, function () {
  console.log('Listen at http://localhost:3333')
})
