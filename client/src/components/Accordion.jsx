import Gerunds from "./Gerunds";
import { filter } from "lodash-es";
import Duplicates from "./Duplicates";
import Participles from "./Participles";
import GeneralRules from "./GeneralRules";
import useStore from "../store/zustand";

export default function Accordion() {
  const { duplicatesList, participleList, gerundList, generalRules, spinners } =
    useStore(
      ({
        duplicatesList,
        participleList,
        gerundList,
        generalRules,
        spinners,
      }) => ({
        duplicatesList,
        participleList,
        gerundList,
        generalRules,
        spinners,
      })
    );

  return (
    <div className="accordion mb-2" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button collapsed accordion-yellow"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            Términos repetidos&nbsp;
            {spinners.duplicates ? (
              <div
                className="spinner-border spinner-border-sm text-success"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <span className="badge rounded-pill bg-success">
                {duplicatesList.length}
              </span>
            )}
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body p-1 pt-2">
            <Duplicates />
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed accordion-blue"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Posibles participios&nbsp;
            {spinners.participle ? (
              <div
                className="spinner-border spinner-border-sm text-primary"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <span className="badge rounded-pill bg-primary">
                {participleList.length}
              </span>
            )}
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
              data-bs-toggle="popover"
              data-bs-trigger="hover focus"
              title="Tomar en cuenta"
              data-bs-html="true"
              data-bs-content='<u>No todas las palabras en la lista son participios</u>, esto depende del contexto.<br/><br/>Por ejemplo la palabra <b>RESULTADO</b>, es participio cuando se origina del verbo <b>resultar</b>.<br/><br/>En la oración <em><b>"Este es el <u>resultado</u> del marcador"</b></em>, NO es participio, mientras que en <em><b>"De seguir así hubiese <u>resultado</u> enfermo"</b></em>, sí lo es pero la herramienta no conoce la diferencia.'
            >
              info
            </span>
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body p-1 pt-2">
            <Participles />
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button
            className="accordion-button collapsed accordion-red"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Posibles gerundios&nbsp;
            {spinners.gerund ? (
              <div
                className="spinner-border spinner-border-sm text-danger"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <span className="badge rounded-pill bg-danger">
                {gerundList.length}
              </span>
            )}
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              data-bs-toggle="popover"
              data-bs-trigger="hover focus"
              title="Tomar en cuenta"
              data-bs-html="true"
              data-bs-content='<u>No todas las palabras en la lista son gerundios</u>, esto depende del contexto.<br/><br/>Por ejemplo la palabra <b>COMANDO</b>, es gerundio cuando se origina del verbo <b>comandar</b>.<br/><br/>En la oración <em><b>"Mi ropa es tipo <u>comando</u>."</b></em>, NO es participio, mientras que en <em><b>"Yo <u>comando</u> esta tropa"</b></em>, sí lo es pero la herramienta no conoce la diferencia.'
            >
              info
            </span>
          </button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body p-1 pt-2">
            <Gerunds />
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingFour">
          <button
            className="accordion-button accordion-purple collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
            Errores generales&nbsp;
            {spinners.generalErrors ? (
              <div
                className="spinner-border spinner-border-sm text-purple"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <span className="badge rounded-pill bg-purple">
                {filter(generalRules, { status: true }).length}
              </span>
            )}
          </button>
        </h2>
        <div
          id="collapseFour"
          className="accordion-collapse collapse"
          aria-labelledby="headingFour"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body p-2">
            <GeneralRules />
          </div>
        </div>
      </div>
    </div>
  );
}
