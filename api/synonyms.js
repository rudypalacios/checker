const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/:word", async function (req, res) {
  let { word } = req.params;
  // Clean accents and diacritics
  word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // http://sesat.fdi.ucm.es:8080/Web/sinonimos.html
  const data = await axios
    .get(`https://www.sinonimosonline.com/${word}/`)
    .then((response) => {
      const $ = cheerio.load(response.data);
      let options = "";
      // Wrap all reference with a STRONG tag
      $(".sentido").wrap("<strong></strong");
      // Remove all examples
      $(".ejemplo").remove();
      // Remove all <a> tags preserving text
      $("a").contents().unwrap();
      // Get only the synonyms to return
      $(".synonim").each(function (index, element) {
        options += $(element).html();
      });
      return options;
    })
    .catch((e) => {});
  res.send(data);
});

module.exports = router;
