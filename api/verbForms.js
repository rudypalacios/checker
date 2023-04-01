const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const uniq = require("lodash/uniq");

router.post("/gerunds/", async function (req, res) {
  const words = req.body;
  const promises = [];
  const data = [];

  for (const property in words) {
    const word = words[property];
    promises.push(
      axios
        .get(
          `https://conjugator.reverso.net/conjugation-spanish-verb-${word}.html`
        )
        .then((response) => {
          const $ = cheerio.load(response.data);
          const options = $("h4:contains(Gerundio)")
            .closest(".wrap-three-col")
            .find("i")
            .html();
          return options;
        })
        .catch((e) => {})
    );
  }

  Promise.all(promises).then(function (results) {
    results.forEach(function (response) {
      if (response) {
        data.push(response);
      }
    });
    res.send(data);
  });
});

router.post("/participles/", async function (req, res) {
  const words = req.body;
  const promises = [];
  const data = [];

  for (const property in words) {
    const word = words[property];
    promises.push(
      axios
        .get(
          `https://conjugator.reverso.net/conjugation-spanish-verb-${word}.html`
        )
        .then((response) => {
          const $ = cheerio.load(response.data);
          const options = $("h4:contains(Participio)")
            .closest(".wrap-three-col")
            .find("i")
            .html();
          return options;
        })
        .catch((e) => {})
    );
  }

  Promise.all(promises).then(function (results) {
    results.forEach(function (response) {
      if (response) {
        const pattern = /.*(ado|ada|ido|ida|ádo|áda|ído|ída|ando|endo)$/;
        const array = response.split("/").filter((str) => pattern.test(str));

        array.forEach((el) => {
          data.push(el);
        });
      }
    });

    res.send(uniq(data));
  });
});

module.exports = router;
