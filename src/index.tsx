// src/index.tsx

import './index.css';

import Game from './Game'; // Import the Game component
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <Game /> {/* Render the Game component */}
  </React.StrictMode>,
  document.getElementById('root')
);
