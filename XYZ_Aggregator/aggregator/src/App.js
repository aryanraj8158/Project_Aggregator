import React, { useState } from 'react';
import { BrowserRouter , Routes ,Route } from 'react-router-dom';
import HomePage from './routes/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={ <HomePage/> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
