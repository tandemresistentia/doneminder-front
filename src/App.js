import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home'; // Correct import path

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<Home />} /> {/* Use 'element' */}
          {/* Add more routes for other pages */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
