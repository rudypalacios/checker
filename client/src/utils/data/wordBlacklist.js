const prepositions = [
  "a",
  "ante",
  "bajo",
  "cabe",
  "con",
  "contra",
  "de",
  "desde",
  "durante",
  "en",
  "entre",
  "hacia",
  "hasta",
  "mediante",
  "para",
  "por",
  "según",
  "sin",
  "so",
  "sobre",
  "tras",
  "versus",
  "vía",
];

const articles = ["un", "una", "unos", "unas", "el", "los", "la", "las", "lo"];

const customWords = ["que"];

const BLACKLIST = [...prepositions, ...articles, ...customWords];

export default BLACKLIST;
