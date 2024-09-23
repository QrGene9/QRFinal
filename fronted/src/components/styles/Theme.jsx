import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // color azul claro para botones y enlaces importantes
    },
    secondary: {
      main: '#f50057', // color secundario para acciones destacadas
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    button: {
      textTransform: 'none', // Botones con texto normal, sin mayúsculas automáticas
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Botones con bordes redondeados
        },
      },
    },
  },
});

export default theme;
