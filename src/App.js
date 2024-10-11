import React from 'react';
import Homepage from './HomePage';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Joc1 from './Joc1';
import Joc2 from './Joc2';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/top10" element={<Joc1 />} />
          <Route path="/primul11" element={<Joc2 />} />
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;
