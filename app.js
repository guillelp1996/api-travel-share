require("dotenv").config()
const express = require("express")
const cors = require('cors')
const morgan = require("morgan")

const port = process.env.PORT || 8081;
const host = process.env.HOST || "localhost";

const app = express()

app.disable("x-powered-by")
app.use(cors()) // enable all CORS  request
app.use(morgan("combined")) 

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port,host, () => {
    console.log(`Server is runnig on http://${host}:${port}`)
  })