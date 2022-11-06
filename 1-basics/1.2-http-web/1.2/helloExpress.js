const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/about',function (req, res){
let a = req.query.a
let b = req.query.b
res.send(+a+b)
} )
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})