const keys = require("../config/nodeKeys")
const fetch = require("node-fetch");

module.exports = (app) => {
  app.get("/api/phone-resource", (req, res) => {
    const uri = `/phone_node`;

    fetch(uri)
      .then((phoneResponse) => phoneResponse.json())
      .then((phoneJson) => {
        res.json(phoneJson);
      })
      .catch((err) => {
        res.send(err);
      });

  });
};