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
// require("./routes/package")(app);
require("./routes/listings")(app);
// require("./routes/phone")(app);

/*---- kent and winter's test logic 9.20.20 ----*/
// const fetch = require("node-fetch");
// export async function getNODEData(uri) {
//   try {
//     const response = await fetch(uri);
//     const jsonData = await response.json();
//     const data = await jsonData;
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// export const nodeListingsUri = `https://opendata.imspdx.org/api/3/action/datastore_search_sql?sql=SELECT * from "61cee891-7d0f-4ebe-b8ea-c0c8d6cb27e7"`;

// export const nodePackageUri = `https://opendata.imspdx.org/api/3/action/package_show?id=592c18db-efa6-44c6-8477-4ffa4103ba94`

// export const nodePhoneUri = `https://opendata.imspdx.org/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20%224407461b-e99d-4d8e-8a44-18483aa8d13c%22`
/*----------------------------------------------------*/

// if (process.env.NODE_ENV === "production") {

  //make sure express serves up the corret assests
  //like main.js
  app.use(express.static("client/build"));

  //serve up index.html
  //this is the catch all code
  
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  // app.get('/listings_node', (req, res) => {
  //   getNODEData(nodeListingsUri)
  //   .catch(console.log('error'))
  //   .then((data) => res.send(data));  
  // });
  // app.get('/package_node', (req, res) => {
  //   getNODEData(nodePackageUri)
  //   .catch(console.log('error'))
  //   .then((data) => res.send(data));  
  // });
  // app.get('/phone_node', (req, res) => {
  //   getNODEData(nodePhoneUri)
  //   .catch(console.log('error'))
  //   .then((data) => res.send(data));  
  // });

// }

//heroku dynamic port binding
const PORT = process.env.PORT || 5100;
app.listen(PORT);
