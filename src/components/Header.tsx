import React from 'react';
import logo from 'assets/poke_logo.png';

const Header = () => {
  return (
    <div>
      <div className="poke__logos">
        <img src={logo} alt="Poke Logo" />
      </div>
    </div>
  );
};

export default Header;
