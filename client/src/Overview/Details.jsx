import React from "react";
import StarScale from "../Shared/StarScale.jsx";

// This function returns a DOM element with the key details of the product listed
const Details = () => {
  return (
    <div id='overview-infopanel-details'>
      Product Details
      <StarScale />
      <div id='overview-infopanel-details-name'>
        Product Name
      </div>
      <div id='overview-infopanel-details-price'>
        Product Price
      </div>
    </div>
)}

export default Details;