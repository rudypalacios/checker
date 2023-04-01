import { uniq } from "lodash-es";
import { useEffect } from "react";
import useStore from "../store/zustand";

export default function Participles() {
  const { lowerCaseWords, participleList, setParticipleList, setSpinners } =
    useStore(
      ({ lowerCaseWords, participleList, setParticipleList, setSpinners }) => ({
        lowerCaseWords,
        participleList,
        setParticipleList,
        setSpinners,
      })
    );

  // Remove duplicates
  const uniqueWords = uniq(lowerCaseWords);

  // Find participles
  var filteredWords = uniqueWords.filter((word) => {
    const pattern = /(ado|ada|ido|ida|ádo|áda|ído|ída)$/;
    return pattern.test(word);
  });

  useEffect(() => {
    setSpinners({ participle: true });
    fetch("api/verb/participles/", {
      method: "POST",
      body: JSON.stringify(filteredWords),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        setParticipleList(JSON.parse(data));
        setSpinners({ participle: false });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredWords.length]);

  const wordList = participleList.map((word) => (
    <tr key={word}>
      <td>{word}</td>
    </tr>
  ));

  return (
    <table className="table table-striped table-sm table-hover">
      <tbody>{wordList}</tbody>
    </table>
  );
}
