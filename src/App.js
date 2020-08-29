import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
