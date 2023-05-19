import React from 'react';

import logo from 'assets/images/pokedex.png';
import './Header.css';

const Header = () => {
  return (
    <div>
      <div className="app__header">
        <div className="poke__logo noselect">
          <img src={logo} alt="Poke Logo" />
        </div>
      </div>
    </div>
  );
};

export default Header;
