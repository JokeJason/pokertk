import React from 'react';
import logo from './assets/poke_logo.png';

export function Header() {
  return (
    <div>
      <div className="poke__logos">
        <img src={logo} />
      </div>
    </div>
  );
}
