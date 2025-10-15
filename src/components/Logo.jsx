import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import brain from './brain.jpg';
/* Some Comments */

const Logo = () => {
  return (
    <div className="ma4 mt0 ml15">
      <Tilt className="Tilt br2 shadow-2 pa5">
        <div style={{ height: "150px", width: "50px" }}>
                   <img src={brain} alt='logo' />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
