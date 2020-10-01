const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

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
    const uri = "https://opendata.imspdx.org/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20%2261cee891-7d0f-4ebe-b8ea-c0c8d6cb27e7%22'";
    const phoneResponse = await fetch(uri);
    const phoneJson = await phoneResponse.json();
    const phoneData = await phoneJson.result.records;

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
  const path = require("path");
  app.get("/", (req, res) => {
    console.log('this shit works');
  });
  app.get('/listings_node', (req, res) => {
    getNODEData()
    .then((data) => console.log(data))
    .catch(console.log('error'));
    // res.send(getNODEData('https://opendata.imspdx.org/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20%2261cee891-7d0f-4ebe-b8ea-c0c8d6cb27e7%22'));
  });

// }



// https://opendata.imspdx.org/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20%2261cee891-7d0f-4ebe-b8ea-c0c8d6cb27e7%22

//heroku dynamic port binding
const PORT = process.env.PORT || 5100;
app.listen(PORT);
