import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Exports from './utils/export';


const App  = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Exports.pages.Onboard />} />
        <Route path="/home" element={<Exports.pages.Home />} />
      </Routes>
    </Router>
  );
};

export default App;