import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<xx />} />
        <Route path="/x" element={<xx />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
