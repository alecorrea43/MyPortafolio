import React from 'react';
import { useSpring, animated } from 'react-spring';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const AnimatedPaper = styled(animated(Paper))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin: theme.spacing(2),
  height: '90%', // Hacer que ambos contenedores tengan la misma altura
  display: 'flex',
  alignItems: 'center', // Centrar verticalmente el contenid
  flexDirection:'column',
  justifyContent: 'center',
  border: 'none',
  boxShadow:'none',

}));



const CenteredText = () => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });
  const imageUrl1 = '/image/porta.png';

  return (
     <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <AnimatedPaper style={props}>
          <img src={imageUrl1} alt="Imagen 1" style={{ width: '95%', height: 'auto' }} />
        </AnimatedPaper>
      </Grid>
      <Grid item xs={12} md={6}>
        <AnimatedPaper style={props}>
        <h1 style={{ fontSize: '30px', alignSelf: 'center' }}>
            Mi nombre es Alejandro Correa
          </h1>
          <p style={{ fontSize: '18px', alignSelf: 'center' }}>
            Soy developer full stack junior
            manejo varias tecnologias
            y estoy en busca de un equipo de trabajo.
          </p>
        </AnimatedPaper>
      </Grid>
    </Grid>
  );
};

export default CenteredText;
