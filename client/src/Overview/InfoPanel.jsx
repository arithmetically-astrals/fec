import React from "react";
import Details from "./Details.jsx";
import StylePicker from "./StylePicker.jsx";

// This function returns a DOM element with the key details of the product listed
const InfoPanel = () => {
  return (
    <div id='overview-infopanel'>
      <Details />
      <StylePicker />
      <div id='overview-infopanel-actions'>
        <div id='overview-infopanel-actions-cart'>
          add to cart
        </div>
        <div id='overview-infopanel-actions-favorite'>
          add to favorites
        </div>
      </div>
    </div>
)}

export default InfoPanel;