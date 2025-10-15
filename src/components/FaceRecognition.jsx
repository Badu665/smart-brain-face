import React from "react";
import "./FaceRecognition.css";
// To ensure this gets flagged as changed

const FaceRecognition = ({ imageurl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          alt=""
          src={imageurl}
          width={"500px"}
          height={"auto"}
        />
        <div
          className="bounding-box"
          style={{
            top: box.calcTopRow,
            right: box.calcRightCol,
            bottom: box.calcBottomRow,
            left: box.calcLeft,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
