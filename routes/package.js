const keys = require("../config/nodeKeys")
const fetch = require("node-fetch");

module.exports = (app) => {
  app.get("/api/package", (req, res) => {
    const uri = `/package_node`;

    fetch(uri)
      .then((packageResponse) => packageResponse.json())
      .then((packageJson) => {
        res.json(packageJson);
      })
      .catch((err) => {
        res.send(err);
      });

  });
};
