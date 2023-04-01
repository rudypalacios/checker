import { useEffect } from "react";
import useStore from "../store/zustand";
import BLACKLIST from "../utils/data/wordBlacklist";
import { forEach, filter, orderBy } from "lodash-es";

export default function Duplicates() {
  const { lowerCaseWords, setDuplicatesList, setSearchWord } = useStore(
    ({ lowerCaseWords, setDuplicatesList, setSearchWord }) => ({
      lowerCaseWords,
      setSearchWord,
      setDuplicatesList,
    })
  );

  // Remove blacklisted words
  const cleanWordsList = lowerCaseWords.filter(
    (element) => !BLACKLIST.includes(element)
  );

  const counts = {};
  // Count words
  forEach(cleanWordsList, (word) => {
    counts[word] = { word, count: (counts[word]?.count || 0) + 1 };
  });

  // Keep only duplicates
  const duplicates = filter(counts, function (element) {
    return element.count > 1;
  });

  // Order from higher to lower
  const orderedCount = orderBy(duplicates, ["count"], ["desc"]);

  useEffect(() => {
    setDuplicatesList(duplicates);
  }, [duplicates.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSynonymClick = (event) => {
    const word = event.target.innerText;
    setSearchWord(word);
  };

  // Display list
  const listItems = [];
  forEach(orderedCount, ({ word, count }) => {
    let warning;
    if (word === "y" && count > 2) {
      warning = <i class="bi bi-exclamation-triangle"></i>;
    }
    listItems.push(
      <tr key={word + count + Math.random()}>
        <td>
          {warning}&nbsp;
          <button className="word" onClick={handleSynonymClick}>
            {word}
          </button>
        </td>
        <td>{count}</td>
      </tr>
    );
  });

  return (
    <table className="table table-striped table-sm table-hover">
      <tbody>{listItems}</tbody>
    </table>
  );
}
