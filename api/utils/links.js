function removeLinks(string) {
  const parserRules = [
    {
      pattern: /<a [a-z="\/\s]+>/gim,
      replacement: "",
    },
    { pattern: /<\/a>/gm, replacement: "" },
  ];

  parserRules.forEach(function (rule) {
    string = string.replace(rule.pattern, rule.replacement);
  });

  return string;
}

module.exports = { removeLinks };
