import React from "react";
import spinner from "../img/spinner.gif";
const Spinner = () => {
  return (
    <React.Fragment>
      <div style={{marginTop:"30px"}}>
        <img
          src={spinner}
          alt="Loading..."
          style={{ width: "200px", margin: "auto", display: "block" }}
        />
      </div>
    </React.Fragment>
  );
};

export default Spinner;
