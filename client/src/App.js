import "./App.css";
import Accordion from "./components/Accordion";
import RightBarAd from "./components/ads/RightBar";
import RightLongBar from "./components/ads/RightLongBar";
import Description from "./components/Description";
import Synonyms from "./components/Synonyms";
import Textbox from "./components/Textbox";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Verificador de textos
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {/*  <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Acerca de
                </a>
              </li>
            </ul>
             <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 mb-2">
            <div className="row">
              <div className="col">
                <Textbox />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Synonyms />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <Accordion />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8 mb-2">
            <Description />
          </div>
          <div className="col-12 col-md-4">
            <div className="mb-2">
              <RightBarAd />
            </div>
            <div className="mb-2">
              <RightLongBar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
