import React from 'react';

export function Filters() {
  return (
    <>
      <div className="filter__container">
        <div className="filter__items">
          <div>
            <div>REGION</div>
            <select name="regionSelect">
              <option value="Johto (152-251)">Johto (152-251)</option>
            </select>
          </div>
        </div>
        <div className="filter__items">
          <div>
            <div>TYPE</div>
            <select name="typeSelect">
              <option value="all">all types</option>
            </select>
          </div>
        </div>
        <div className="filter__items">
          <div>
            <div>SORT BY</div>
            <select name="sortSelect">
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export {};
