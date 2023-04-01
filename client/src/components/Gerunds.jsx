import { uniq, intersection } from "lodash-es";
import { useEffect } from "react";
import useStore from "../store/zustand";

export default function Gerunds() {
  const { lowerCaseWords, gerundList, setGerundList, setSpinners } = useStore(
    ({ lowerCaseWords, gerundList, setGerundList, setSpinners }) => ({
      lowerCaseWords,
      gerundList,
      setGerundList,
      setSpinners,
    })
  );

  // Remove duplicates
  const uniqueWords = uniq(lowerCaseWords);

  // Find gerunds
  var filteredWords = uniqueWords.filter((word) => {
    const pattern = /(ando|endo)$/;
    return pattern.test(word);
  });

  useEffect(() => {
    setSpinners({ gerund: true });
    fetch("api/verb/gerunds/", {
      method: "POST",
      body: JSON.stringify(filteredWords),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        const gerundsArray = intersection(JSON.parse(data), filteredWords);
        setGerundList(gerundsArray);
        setSpinners({ gerund: false });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredWords.length]);

  const wordList = gerundList.map((word) => (
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
