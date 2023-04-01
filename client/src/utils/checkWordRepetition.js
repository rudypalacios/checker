import { orderBy } from "lodash-es";

/**
 * The accents are not recognized by default, the regex needs to be
 * enhanced in a way that the search matches the words properly
 *
 * @param {Object|array} List of words to be searched
 * @returns {array} List of words including the proper regex pattern
 */
function enhanceRegex(list) {
  let enhancedRegex = [];
  const accents = ["á", "é", "í", "ó", "ú"];

  // Enhance regex
  for (const duplicate in list) {
    const word = list[duplicate].word || list[duplicate];
    for (let index = 0; index < accents.length; index++) {
      const accent = accents[index];
      const pos = word.indexOf(accent);
      if (pos > -1) {
        if (pos === 0) {
          enhancedRegex.push(`${word}\\b`);
        } else if (pos === word.length - 1) {
          enhancedRegex.push(`\\b${word}`);
        } else {
          enhancedRegex.push(`\\b${word}\\b`);
        }
        break;
      } else if (index === accents.length - 1) {
        enhancedRegex.push(`\\b${word}\\b`);
      }
    }
  }

  return enhancedRegex;
}

function prepareDuplicatesRegex(duplicatesList) {
  // Order alphabetically to avoid words like igual, igualdad, igualitario, to be partially selected
  // this will return igualitario, igualdad, igual, allowing the longest word to have priority
  const orderedDuplicatesList = orderBy(duplicatesList, ["word"], ["desc"]);

  // Enhance the regex pattern to properly match words with accents
  const enhancedRegex = enhanceRegex(orderedDuplicatesList);

  return enhancedRegex.length > 0
    ? new RegExp(enhancedRegex.join("|"), "gmi")
    : "";
}

export { prepareDuplicatesRegex, enhanceRegex };
