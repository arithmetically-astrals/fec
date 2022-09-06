import React, { useState, useEffect } from "react";
import axios from 'axios';
import Details from "./Details.jsx";
import StylePicker from "./StylePicker.jsx";

// This function returns a DOM element with the key details of the product listed
const InfoPanel = ({itemId, styleInfo}) => {

  return (
    <div id='overview-infopanel'>
      <Details itemId={itemId} />
      <StylePicker styleInfo={styleInfo} itemId={itemId} r/>
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