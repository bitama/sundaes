// import logo from './logo.svg';

// import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
// import axios from "axios"
import Main from './components/Main'
import Update from './components/Update'
import {Router} from '@reach/router'


function App() {
  
  return (
    <div className="App container mt-4">
      <Router>
        <Main path="/" />
        <Update path="/api/sundaes/:id/find" />
      </Router>
    </div>
  );
}

export default App;
