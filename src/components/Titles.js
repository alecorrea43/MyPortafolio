import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import Slider from "react-slick";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OuterContainer = styled("div")({
  width: "60%",
  margin: "auto",
  height: "100%",
  marginTop: "20px",
 
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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  transition: "height 0.5s ease-in-out",
  
});
const Image = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "fill",
});
const ImageContainer = styled("div")({
  width: "100%",
  overflow: "hidden",
});
 



const OuterBox = styled("div")({
  boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.5)",
});

const Titles = () => {
  const [titlesAnimationStyle, setTitlesAnimationStyle] = useState({
    opacity: 0,
    transform: "translateX(-100%)",
    transition: "opacity 1.5s ease-in-out, transform 1.5s ease-in-out",
  });

  const [applyLeftBorder, setApplyLeftBorder] = useState(false);
  const [applyRightBorder, setApplyRightBorder] = useState(false);
  
  const titlesRef = useRef();

  useEffect(() => {
    // Agregar la clase al cuerpo
    document.body.classList.add("black-background");

    // Retornar una función de limpieza para quitar la clase cuando el componente se desmonte
    return () => {
      document.body.classList.remove("black-background");
    };
  }, []);

  
  useEffect(() => {
    // Marcamos la animación como no completada cuando se carga la página
    localStorage.removeItem("animationCompleted");
  }, []);

  useEffect(() => {
    const animationCompleted = localStorage.getItem("animationCompleted");

    if (!animationCompleted) {
      // Si la animación aún no ha ocurrido, reproducir la animación
      setTitlesAnimationStyle({
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 1.5s ease-in-out, transform 1.5s ease-in-out",
      });

      setApplyLeftBorder(true);
      setApplyRightBorder(true);

      // Marcar la animación como completada en el almacenamiento local
      localStorage.setItem("animationCompleted", "true");
    }
  }, []);

  const titles = [
    {
      title: "Universidad Nacional De La Pampa - Argentina Programa 4.0",
      description: "En el tramo | aprendi habilidades basicas de Frontend y cree paginas con limitadas funciones. Trabaje con HTML5, CSS, JAVA SCRIPT Y BOOSTRAP.",
      image: "/image/titulo-1paint.png",
    },
    {
      title: "Universidad Nacional De La Pampa - Argentina Programa 4.0",
      description: "En el tramo || aprendi habilidades basicas de Base de Datos. Creandolas y ejecutandolas con estas herramientas con MariaDB, MySQL, SQLite,",
      image: "/image/titulo-2paint.png",
    },
    {
      title: "Universidad Nacional De La Pampa - Argentina Programa 4.0",
      description: "En el tramo ||| aprendi habilidades basicas de Desarrollo de Software. Implementamos lo aprendido para crear paginas web simples",
      image: "/image/titulo-3paint.png",
    },
    {
      title: "Universidad Nacional De La Pampa - Argentina Programa 4.0",
      description: "En el tramo |||| aprendi habilidades basicas de Backend. Aprendi a crear servidores y conectarlos la base de datos con PHP, Apache y Utilizamos APIS ",
      image: "/image/titulo-4paint.png",
    },
    {
      title: "Universidad Nacional De La Pampa - Argentina Programa 4.0",
      description: "Ultimo Tramo Implementamos todo lo aprendido y hice una web de noticias. Donde hay login y register, manejo de errores, validacion de usuarios, publicar noticias, editar nocias, eliminar noticias y usuario admin ",
      image: "/image/titulo-5paint.png",
    },
    {
      title: "Campus Virtual EPICA SAPEM- Argentina Programa 4.0",
      description: "En el tramo || Lenguaje de Programacion | aprendi y trabaje con maquetacion de aplicaciones web, desarrollo web con java script y programacion del lado del servidor.",
      image: "/image/tituloepica1.png",
    },
    {
      title: "Campus Virtual EPICA SAPEM- Argentina Programa 4.0",
      description: "En el tramo ||| Lenguaje de Programacion || aprendi y trabaje con el desarrollo colaborativo (Github), profundice y desarrolle con Nodejs, utilze Express.js para servidores, desarrollo con React.js y programacion orientada a objetos.",
      image: "/image/tituloepica3.png",
    },
  
    // Agrega más títulos según sea necesario
  ];

  const handleScroll = () => {
    const titlesElement = titlesRef.current;

    const handleAnimation = (element) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
          setTitlesAnimationStyle({
            opacity: 1,
            transform: "translateX(0)",
            transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
          });

          setApplyLeftBorder(true);
          setApplyRightBorder(true);

          // Marcar la animación como completada en el almacenamiento local
          localStorage.setItem("animationCompleted", "true");
        }
      }
    };

    handleAnimation(titlesElement);
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
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div style={{
      maxWidth: '100%',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', // Ajusta la altura mínima al 100% de la altura visible de la pantalla
    }}>
      <OuterContainer>
        <div ref={titlesRef} style={titlesAnimationStyle}>
          <Typography
            variant="h4"
            gutterBottom
            marginBottom={'40px'}
            color={'black'}
            sx={{
              letterSpacing: "4px",
              borderLeft: applyLeftBorder ? "2px solid orange" : "none",
              borderRight: applyRightBorder ? "2px solid orange" : "none",
              fontSize: {
                xs: "24px",
                sm: "30px",
              },
            }}
          >
            "Titulos y Certificados"
          </Typography>
        </div>
      </OuterContainer>

      <OuterContainer>
        <OuterBox>
          <Slider {...settings}>
            {titles.map((title, index) => (
              <div key={index}>
                <InnerBox1>
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{ textAlign: "center" }}
                  >
                    {title.title}
                  </Typography>
                  <Typography variant="body1" style={{ textAlign: "center" }}>
                    {title.description}
                  </Typography>
                </InnerBox1>
                <InnerBox2Container>
                <ImageContainer>
                <Image src={title.image} alt={`Title ${index + 1}`} />
              </ImageContainer>
                </InnerBox2Container>
              </div>
            ))}
          </Slider>
        </OuterBox>
      </OuterContainer>
    </div>
  );
};

export default Titles;
