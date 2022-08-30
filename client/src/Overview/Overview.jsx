// the main component for the overview of the current product
// this component will contain Details and StylePicker as sub-components
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Carousel from "./Carousel.jsx";
import InfoPanel from "./InfoPanel.jsx";
import LongDescription from "./LongDescription.jsx";

const Overview = ({itemId = 37311, starRating, setstarRating}) => {
  return (
    <div id='overview' className='widget'>
      <div id='overview-carouselandinfopanel'>
        <Carousel itemId={itemId} />
        <InfoPanel itemId={itemId} />
      </div>
      <LongDescription itemId={itemId} />
    </div>
  )
}

export default Overview;