import React, { useState } from 'react';
import LandingPage from './LandingPage'; // Import the Landing Page component
import MainPage from './MainPage'; // The existing main page component
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      {isAuthenticated ? <MainPage /> : <LandingPage onAuthSuccess={handleAuthSuccess} />}
    </div>
  );
}

export default App;
