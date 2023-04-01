import classNames from "classnames";
import { useEffect } from "react";
import useStore from "../store/zustand";
import { enhanceRegex } from "../utils/checkWordRepetition";

export default function GeneralRules() {
  const { content, generalRules, setGeneralRules } = useStore(
    ({ content, generalRules, setGeneralRules }) => ({
      content,
      generalRules,
      setGeneralRules,
    })
  );

  useEffect(() => {
    const rulesStatus = generalRules.map((rule) => {
      const expression =
        rule.regex ||
        enhanceRegex(rule.array).join("|") ||
        rule.match.pattern ||
        "";
      const pattern = new RegExp(expression, "gmi");

      if (rule.match?.condition) {
        const response = content.match(rule.match.pattern);
        return Object.assign(rule, { status: rule.match.condition(response) });
      }
      return Object.assign(rule, { status: pattern.test(content) });
    });

    setGeneralRules(rulesStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const rulesStatus = generalRules.map((rule) => (
    <tr
      key={rule.text}
      className={classNames({
        "table-danger": rule.status,
      })}
    >
      <td
        dangerouslySetInnerHTML={{
          __html: rule.status
            ? '<i class="bi bi-x-circle-fill text-danger"></i>'
            : '<i class="bi bi-check-circle-fill text-success"></i>',
        }}
      />
      <td dangerouslySetInnerHTML={{ __html: rule.text }} />
    </tr>
  ));

  return (
    <table className="table table-striped table-sm table-hover">
      <tbody>{rulesStatus}</tbody>
    </table>
  );
}
