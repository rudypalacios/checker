const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const synonyms = require("./api/synonyms");
const verbForms = require("./api/verbForms");

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render("error", { error: err });
}
app.use(errorHandler);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/synonyms", synonyms);
app.use("/api/verb", verbForms);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);
