import React, { useState } from 'react';
import Globe from '../img/globe.png';

function Multi_Lang({Lang}) {
    const [open, setOpen] = React.useState(false);

    const handleOpen=() =>{
        setOpen(!open);
    };

    return (
      <div className="lang col-1 dropdown">
        <button className="multi-lang" onClick={handleOpen} type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img className="globe" src={Globe} alt="Globe" />
        </button>
        <span className="langbtn">
            EN
        </span> 
        {open? (
        <ul className="menu lang-item" >
            <li className="dropdown-item"><a  href="#">VI</a></li>
            <li className="dropdown-item"><a  href="#">EN</a></li>
        </ul>
        ):null}
      </div>
    );
}

export default Multi_Lang;
