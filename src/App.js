import React from 'react';
import Homepage from './HomePage';
import Header from './Header';
 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 
function App() {
  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/" element={<Homepage />} />
           
        </Routes>
      
      </Router>
  );
}

export default App;
