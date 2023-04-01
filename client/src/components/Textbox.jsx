import v from "voca";
import classNames from "classnames";
import { throttle } from "lodash-es";
import useStore from "../store/zustand";
import { useEffect, useRef, useState } from "react";
import {
  prepareDuplicatesRegex,
  enhanceRegex,
} from "../utils/checkWordRepetition";

const updateTextbox = throttle(function (
  duplicatesRegex,
  gerundRegex,
  participleRegex,
  verbRegex
) {
  window.initHighlight(
    duplicatesRegex,
    gerundRegex,
    participleRegex,
    verbRegex
  );
},
1000);

export default function Textbox() {
  const textRef = useRef();
  const [chars, setChars] = useState(0);
  const {
    setWords,
    setContent,
    duplicatesList,
    participleList,
    gerundList,
    generalRules,
  } = useStore(
    ({
      setWords,
      setContent,
      duplicatesList,
      participleList,
      gerundList,
      generalRules,
    }) => ({
      setWords,
      setContent,
      duplicatesList,
      participleList,
      gerundList,
      generalRules,
    })
  );

  const onChange = (event) => {
    const content = event.target.value;
    setContent(content);
    setChars(content.length);
    setWords(v.words(content));
    textRef.current.focus();
  };

  useEffect(() => {
    window.initTooltips();
  }, []);

  useEffect(() => {
    const duplicatesRegex = prepareDuplicatesRegex(duplicatesList);
    const participleRegex = participleList.join("|");
    const gerundRegex = gerundList.join("|");
    const verbRegex = enhanceRegex(generalRules[4].array).join("|");
    updateTextbox(duplicatesRegex, gerundRegex, participleRegex, verbRegex);
  }, [duplicatesList, gerundList, participleList, generalRules]);

  return (
    <>
      <div className="highlight mb-2">
        <textarea
          ref={textRef}
          className="textToValidate"
          onChange={onChange}
        ></textarea>
      </div>
      <button
        type="button"
        className={classNames("btn", "position-relative", "float-end", "mb-2", {
          "btn-warning": chars < 610,
          "btn-success": chars < 872,
          "btn-danger": chars > 872,
        })}
      >
        <span id="charCount">{chars}</span> / <span id="charMax">872</span>
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Un párrafo de 8 a 10 líneas en Arial 11 con márgenes de 3 y 2.5 cm,tiene entre 610 y 872 caracteres aproximadamente"
        >
          ?
        </span>
      </button>
    </>
  );
}
