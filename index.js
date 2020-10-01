const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

// app and middleware
const app = express();
app.use(cors());
app.use(helmet())
app.use(helmet.hidePoweredBy({ setTo: 'Blood, Sweat and Tears' }));


//routes
require("./routes/package")(app);
require("./routes/listings")(app);
require("./routes/phone")(app);

// API REQUESTS
const fetch = require('node-fetch');

async function getNODEData() {
  try {
    console.log('getNODEData');
    const uri = `https://opendata.imspdx.org/api/3/action/datastore_search_sql?sql=SELECT * from "61cee891-7d0f-4ebe-b8ea-c0c8d6cb27e7"`;
    console.log(uri);
    const phoneResponse = await fetch(uri);
    console.log('ph:' + phoneResponse);
    const phoneJson = await phoneResponse.json();
    const phoneData = await phoneJson;
    return phoneData;
  } catch (err) {
    console.log(err);
  }
}
    

//production boilerplate
// if (process.env.NODE_ENV === "production") {

  //make sure express serves up the corret assests
  //like main.js
  app.use(express.static("client/build"));

  //serve up index.html
  //this is the catch all code
  
  app.get("/", (req, res) => {
    res.send('hello world');
  });
  
  app.get('/listings_node', (req, res) => {
    console.log('/listings_node');
    getNODEData()
    .catch(console.log('error'))
    .then((data) => res.send(data));
  });

// }



// https://opendata.imspdx.org/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20%2261cee891-7d0f-4ebe-b8ea-c0c8d6cb27e7%22

//heroku dynamic port binding
const PORT = process.env.PORT || 5100;
app.listen(PORT);
