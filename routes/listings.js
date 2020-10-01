const keys = require("../config/nodeKeys")
const fetch = require("node-fetch");

module.exports = (app) => {
  app.get("/api/listings-resource", (req, res) => {
    const uri = `/listings_node`;

    fetch(uri)
      .then((listingsResponse) => listingsResponse.json())
      .then((listingsJson) => {
        res.json(listingsJson);
      })
      .catch((err) => {
        res.send(err);
      });

  });
};