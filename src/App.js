
import './App.css';
import './styles/line_loader.css'
import React, { useState, useEffect } from 'react';
import {DashBoard} from './components/DashBoard';
import {LoadingPage} from './components/LoadingPage';


function App() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className='App'>
      {showLogo && (
        <>
        <LoadingPage/>
        </>
      )}
      {!showLogo && (
        <>
          <DashBoard/>
        </>
      )}
    </div>
  );
}


export default App;
