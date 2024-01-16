import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutMe from "./components/AboutMe";
import NavBar from "./components/NavBar";
import CenteredText from "./components/CenteredText";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Titles from "./components/Titles";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NavBar /> {/* NavBar en la ruta raíz */}
                  <CenteredText />
                  <AboutMe />
                  <Projects />
                  <Contact />
                </>
              }
            />
            <Route
              path="/Titles"
              element={<Titles />} // Sin NavBar en la ruta Titles
            />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
