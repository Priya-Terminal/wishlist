import React from 'react';
import { useDarkMode } from '@/contexts/DarkModContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';


function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button onClick={toggleDarkMode}
    style={{ paddingLeft: '15px' }}
    className="focus:outline-none ml-2 mr-4" 
    >
      <FontAwesomeIcon 
      icon={faMoon} 
      style={{ fontSize: '1.5rem',
      transform: 'scaleX(-1)',
      }}/>
    </button>
  );
}

export default DarkModeToggle;