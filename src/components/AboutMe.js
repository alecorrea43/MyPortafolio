import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

import {
  faReact,
  faBootstrap,
  faJs,
  faHtml5,
  faCss3,
  faPhp,
  faNode,
} from "@fortawesome/free-brands-svg-icons";
import { faServer } from "@fortawesome/free-solid-svg-icons";

const buttonStyle = {
  backgroundColor: "#C84810",
  color: "#fff",
  padding: "1px 18px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#A53705",
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#C84810",
      contrastText: "#ffff",
    },
    mode: "light",
  },
});

const AboutMePaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#333" : "#f5f5f5",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
  margin: theme.spacing(2),
  marginTop: theme.spacing(20),
  marginBottom: theme.spacing(4),
  height: "auto",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  border: "none",
  boxShadow: "none",
  "& h2": {
    fontSize: "28px",
    marginBottom: "8px",
  },
  "& p": {
    marginBottom: "0",
  },
  "& .lastParagraphContainer": {
    marginBottom: theme.spacing(3),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  color: theme.palette.text.secondary,
  margin: theme.spacing(2),
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
  padding: 0,
  display: "flex",
  borderRadius: "0",
  boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.1)",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  maxHeight: "100%",

  "& .bottomButtonContainer": {
    marginTop: "6px",
  },
  "& .iconContainer": {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",

    "& svg": {
      margin: theme.spacing(3), // Aumenta el margen para separar más los íconos
      fontSize: "42px", // Ajusta el tamaño del ícono según tus preferencias
    },
  },

  "& .textContainer": {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap", // Ajusta la altura para asegurar que las tarjetas tengan la misma altura inicial
  },

  "& p": {
    marginTop: theme.spacing(2), // Agrega margen superior al párrafo
  },

  "& .cardTitleContainer": {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontSize: "20px",
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const AboutMe = () => {
  const [titleText] = useState("Titulos");
  const [skillsText] = useState("Habilidades");

  const [titleAnimationStyle, setTitleAnimationStyle] = useState({
    opacity: 0,
    transform: "translateX(-100%)",
    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
  });

  const [skillsAnimationStyle, setSkillsAnimationStyle] = useState({
    opacity: 0,
    transform: "translateX(-100%)",
    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
  });

  const handleScroll = () => {
    const titleElement = document.getElementById("aboutMeTitleCard");
    const skillsElement = document.getElementById("aboutMeSkillsCard");

    const handleAnimation = (element, setAnimation) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
          setAnimation({
            opacity: 1,
            transform: "translateX(0)",
            transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
          });
        }
      }
    };

    handleAnimation(titleElement, setTitleAnimationStyle);
    handleAnimation(skillsElement, setSkillsAnimationStyle);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AboutMePaper>
        <h2>Acerca de mí</h2>
        <p style={{ fontSize: "16px" }}>
          Soy un desarrollador full-stack junior con un enfoque destacado en el
          frontend y backend. Esta combinación integral me permite abordar
          proyectos desde ambas perspectivas, garantizando soluciones bien
          integradas. Estoy comprometido con el aprendizaje continuo y siempre
          estoy buscando oportunidades para mejorar mis habilidades y contribuir
          de manera significativa al éxito de los proyectos en los que
          participo.
        </p>
        <p style={{ fontSize: "16px" }}>
          Mi enfoque principal es el desarrollo web, y tengo experiencia en
          varias tecnologías y frameworks.
        </p>
        <div className="lastParagraphContainer">
          <p style={{ fontSize: "16px", marginBottom: "20px" }}>
            Siempre estoy abierto a nuevos desafíos y oportunidades.
          </p>
        </div>
        <h2>Formacion Academica</h2>
        <p style={{ fontSize: "16px", marginBottom: "40px" }}>
          Titulos y Habilidades.
        </p>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard id="aboutMeTitleCard">
              <CardContent>
                <div className="cardTitleContainer" style={titleAnimationStyle}>
                  {titleText}
                </div>
                <div className="textContainer">
                  <ul>
                    <li>Técnico en informática</li>
                    <li>Programación FrontEnd</li>
                    <li>Programación BackEnd</li>
                    <li>Full Stack Junior</li>
                  </ul>
                  <p>
                    Para saber mas de mis certificados y titulos presiona Ver
                    mas.
                  </p>
                </div>
                <div className="bottomButtonContainer">
                <Link to="/Titles" style={{ textDecoration: "none" }}>
            <button
              style={{
                ...buttonStyle,
                textAlign: "center",
                lineHeight: "28px",
              }}
            >
              Ver más
            </button>
          </Link>
                </div>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StyledCard id="aboutMeSkillsCard">
              <CardContent>
                <div
                  className="cardTitleContainer"
                  style={skillsAnimationStyle}
                >
                  {skillsText}
                </div>
                <div className="iconContainer">
                  <FontAwesomeIcon icon={faReact} />
                  <FontAwesomeIcon icon={faBootstrap} />
                  <FontAwesomeIcon icon={faJs} />
                  <FontAwesomeIcon icon={faHtml5} />
                  <FontAwesomeIcon icon={faCss3} />
                  <FontAwesomeIcon icon={faPhp} />
                  <FontAwesomeIcon icon={faNode} />
                  <FontAwesomeIcon icon={faServer} />
                </div>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </AboutMePaper>
    </ThemeProvider>
  );
};

export default AboutMe;
