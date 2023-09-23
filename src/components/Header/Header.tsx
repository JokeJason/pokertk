import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

import logo from 'assets/images/pokedex.png';
import './Header.css';

const Header = () => {
  const openGithub = () => {
    window.open('https://github.com/JokeJason/pokertk');
  };

  return (
    <>
      <div className="app__header">
        <div className={'switch'}>
          <div className={'toggle'}>
            <input
              type="checkbox"
              name="swich-theme"
              id="themeSwitch"
              defaultChecked
            />
            <div className={'toggle-bg'}></div>
            <div className={'toggle-thumb'}>
              <i className={'fas fa-sun'}></i>
              <i className={'fas fa-moon'}></i>
            </div>
          </div>
        </div>
        <div className="poke__logo noselect">
          <img src={logo} alt="Poke Logo" className={'poke__logo'} />
        </div>
        <div className="pokeball__box github__icon" onClick={openGithub}>
          <GitHubIcon></GitHubIcon>
        </div>
      </div>
    </>
  );
};

export default Header;
