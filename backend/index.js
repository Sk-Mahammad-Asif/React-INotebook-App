const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

app.use(cors())

// app.get('/', (req, res) => {
//   res.send('Hello ASif!')
// })

app.use(express.json())

//Availaable Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`INotebook Backend listening on port ${port}`)
})