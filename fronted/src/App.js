import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header visible en todas las páginas */}
        <Header />
        
        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={<MainPage />} />  {/* Página principal */}
        </Routes>

        {/* Footer visible en todas las páginas */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
