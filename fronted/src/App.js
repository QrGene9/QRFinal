import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FileDownloadPage from './pages/FileDownloadPage'; // Importar la nueva página de descarga
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/download/:fileName" element={<FileDownloadPage />} /> {/* Nueva ruta para descarga */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
