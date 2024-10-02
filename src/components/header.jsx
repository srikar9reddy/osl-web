import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-plain.png';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-900">
      <img 
        src={logo} 
        alt="Oversteer Lab Logo" 
        className="h-8 cursor-pointer bg-transparent" 
        onClick={() => navigate('/')}
      />
      <button className="p-2 rounded-full bg-transparent hover:bg-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      </button>
    </header>
  );
}

export default Header;