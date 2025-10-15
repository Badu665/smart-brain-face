import React from "react";
/* Some Comments */
const Rank = ({name, entries}) => {

  return (
    <div>
      <div className="white f3">
        <p> <span id='userName'>{`${name}` }{` your current entry count is: ${entries}`}  </span></p>
      </div>
     
    </div>
  );
};

export default Rank;
