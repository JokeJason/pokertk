import React from 'react';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__container">
        <div className="loading__text">Loading...</div>
        <div className="gif_container">
          <img
            src="http://i.gifer.com/VgI.gif"
            alt="loading gif"
            className="loading__gif noselect"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
