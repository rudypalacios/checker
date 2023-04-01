import { useEffect, useState } from "react";
import useStore from "../store/zustand";

export default function Synonyms() {
  const [isLoading, setLoading] = useState(false);
  const { searchWord, synonymsList, setSynonymsList } = useStore(
    ({ searchWord, synonymsList, setSynonymsList }) => ({
      searchWord,
      synonymsList,
      setSynonymsList,
    })
  );

  useEffect(() => {
    setLoading(true);

    fetch(`/api/synonyms/${searchWord}`)
      .then((response) => response.text())
      .then((data) => {
        setLoading(false);
        setSynonymsList(data);
      });
  }, [searchWord, setSynonymsList]);

  return (
    <div className="card mt-2 w-100">
      <div className="card-header">
        Sinónimos de <strong>{searchWord}</strong>
      </div>
      <div className="card-body">
        {isLoading ? (
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "100%" }}
            ></div>
          </div>
        ) : (
          <span dangerouslySetInnerHTML={{ __html: synonymsList }} />
        )}
      </div>
    </div>
  );
}
