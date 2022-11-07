const express = require('express')
const app = express()
const port = 3000
let COUNTER = 0;
app.get('/', (req, res) => {
    res.send('<h1>Main page</h1>')
})

app.use('/hello', function (req, res){
COUNTER+=1
res.send(COUNTER.toString())
})

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`) 
})