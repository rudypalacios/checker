export default function Description() {
  return (
    <div>
      <strong>Verificador de textos:</strong>
      <br />
      Esta pequeña herramienta ha sido diseñada para validar que las directrices
      definidas por la{" "}
      <a href="https://www.umg.edu.gt/" target="_blank" rel="noreferrer">
        UMG
      </a>{" "}
      respecto al contenido de casa sección del trabajo de tesis sean cumplidas,
      aunque no supone ser una herramienta 100% precisa, espera ser de mucha
      utilidad para validar los errores de escritura más comunes en función del
      documento previsto, por el momento cuenta con:
      <ul>
        <li>
          <strong>Contador de caracteres:</strong> en la parte inferior tiene un
          pequeño contador que indica de cuántos caracteres está formado el
          párrafo, en el <em>tooltip</em> se puede leer más al respecto, se
          muestra{" "}
          <span className="text-warning">en amarillo si es menor a 610</span>,{" "}
          <span className="text-success"> verde si está entre 610 y 872</span> y{" "}
          <span className="text-danger">rojo si se excede</span>.
        </li>
        <li>
          <strong>Verificador de términos repetidos:</strong> indica cuántas
          palabras se encuentran repetidas en el párrafo, si se le da click a la
          palabra, buscará sinónimos y los mostrará en la sección de{" "}
          <em>Sinónimos de términos</em>.
        </li>
        <li>
          <strong>
            Listado de posibles{" "}
            <a
              href="https://dle.rae.es/participio"
              target="_blank"
              rel="noreferrer"
            >
              participios
            </a>
            :
          </strong>{" "}
          Lista los verbos terminados en <em>ado|ada|ido|ida</em> que, según la
          guía, no deben ser utilizados.{" "}
          <em>*No se consideran por esta guía "to|so|cho"</em>{" "}
        </li>
        <li>
          <strong>
            Listado de posibles{" "}
            <a
              href="https://dle.rae.es/gerundio"
              target="_blank"
              rel="noreferrer"
            >
              gerundios
            </a>
            :
          </strong>{" "}
          Lista los verbos terminados en <em>ando|endo</em> que, según la guía,
          no deben ser utilizados.{" "}
          <em>*No se consideran por esta guía "indo|ondo|undo"</em>
        </li>
        <li>
          <strong>Errores generales:</strong> Identifica una serie de
          limitaciones adicionales que deben considerarse al escribir un
          párrafo, se cargan una vez se empieza a escribir y se marcan con error
          al momento de detectar alguna de ellas, por defecto se encuentran en
          verde.
        </li>
      </ul>
    </div>
  );
}
