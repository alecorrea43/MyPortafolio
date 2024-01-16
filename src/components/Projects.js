import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OuterContainer = styled("div")({
  width: "60%",
  margin: "auto",
  height: "100%",
  marginTop: "100px",
});

const InnerBox1 = styled("div")({
  backgroundColor: "#1A2027",
  color: "#fff",
  padding: "10px",
  flex: "0.8",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const InnerBox2Container = styled("div")({
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

const InnerBox2Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "fill",
  transition: "object-fit 0.5s ease-in-out",
});

const IconContainer = styled("div")({
  display: "flex",
  marginTop: "10px",
  justifyContent: "center",
});

const OuterBox = styled("div")({
  boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.5)",
});

const Icon = styled("span")({
  fontSize: "26px",
  margin: "0 12px",
});

const Projects = () => {
  const [projectsTitleAnimationStyle, setProjectsTitleAnimationStyle] = useState({
    opacity: 0,
    transform: "translateX(-100%)",
    transition: "opacity 1.5s ease-in-out, transform 1.5s ease-in-out",
  });

  const [applyLeftBorder, setApplyLeftBorder] = useState(false);
  const [applyRightBorder, setApplyRightBorder] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const projects = [
    {
      title: "Tienda",
      description:
        "Pagina web de una tienda de muebles con varias funcionalidades. Incluye carrito de compras, autenticación, gestión de usuarios y base de datos. Para ver mis proyectos entra a mi github.",
      technologies: [
        <FaJs key="js" />,
        <FaReact key="react" />,
        <FaNodeJs key="node" />,
      ],
      image: "/image/fotodelatienda.png",
    },
    {
      title: "Posteo",
      description:
        "Pagina web para hacer posteos con gestion de usuarios, ingresar o registrarse, edit de posteos, usuario admin para gestionar otros usuarios. Para ver mis proyectos entra a mi github.",
      technologies: [
        <FaJs key="js" />,
        <FaReact key="react" />,
        <FaNodeJs key="node" />,
      ],
      image: "/image/pagina_publicaciones.png",
    },
   
    // Agrega más proyectos según sea necesario
  ];

  const handleScroll = () => {
    const projectsTitleElement = document.getElementById("projectsTitle");

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

          setTimeout(() => {
            setApplyLeftBorder(true);
          }, 500);

          setTimeout(() => {
            setApplyRightBorder(true);
          }, 1000);
        }
      }
    };

    handleAnimation(projectsTitleElement, setProjectsTitleAnimationStyle);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    prevArrow: null,
    nextArrow: null,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
  };

  return (
    <div>
      <OuterContainer>
        <div id="projectsTitle" style={projectsTitleAnimationStyle}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              marginTop: "180px",
              letterSpacing: "4px",
              borderLeft: applyLeftBorder ? "2px solid orange" : "none",
              borderRight: applyRightBorder ? "2px solid orange" : "none",
              fontSize: {
                xs: "18px",
                sm: "30px",
              },
            }}
          >
            Mis Proyectos
          </Typography>
        </div>
      </OuterContainer>

      <OuterContainer>
        <OuterBox>
          <Slider {...settings}>
            {projects.map((project, index) => (
              <div key={index}>
                <InnerBox1>
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{ textAlign: "center" }}
                  >
                    {project.title}
                  </Typography>
                  <Typography variant="body1" style={{ textAlign: "center" }}>
                    {project.description}
                  </Typography>
                  <IconContainer>
                    {project.technologies.map((icon, index) => (
                      <Icon key={index}>{icon}</Icon>
                    ))}
                  </IconContainer>
                </InnerBox1>
                <InnerBox2Container>
                  <InnerBox2Image
                    src={project.image}
                    alt={`Proyecto ${index + 1}`}
                    style={{
                      objectFit: windowWidth < 600 ? "contain" : "fill",
                    }}
                  />
                </InnerBox2Container>
              </div>
            ))}
          </Slider>
        </OuterBox>
      </OuterContainer>
    </div>
  );
};

export default Projects;