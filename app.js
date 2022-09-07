require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const {getEntries} = require("./services")

const port = process.env.PORT || 8081;
const host = process.env.HOST || "localhost";

const app = express();

app.disable("x-powered-by");//disble server info in headers respons
app.use(cors()); // enable all CORS  request
app.use(morgan("dev")); // enable require logs
/**
 * feed page, not need Auth
 * respond all entries
 */
app
  //get all entries
  .get("/",async (req, res) => {
    let entries = await getEntries();

    if(entries == []) {
      res.status(501).json({message : "server issues", data: " no data"})
    }

    res.status(200).json({status: "ok", data: entries})
  })
  //post entry
  .post("/entry", (req, res) => {

  })
  //get only a entry by id
  .all("/entry/:id", (req,res)=>{
    const typeMethod = req.method
    console.log(typeMethod)
    res.status(200).send(`you are in ${typeMethod} method`)
  })

  

app.listen(port, host, () => {
  console.log(`Server is runnig on http://${host}:${port}`);
});
