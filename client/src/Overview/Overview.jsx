// the main component for the overview of the current product
// this component will contain Details and StylePicker as sub-components
import React from "react";
import Carousel from "./Carousel.jsx";
import InfoPanel from "./InfoPanel.jsx";
import LongDescription from "./LongDescription.jsx";

const Overview = () => {
  return <div id='overview' className='widget'>
    <div id='overview-carouselandinfopanel'>
      <Carousel />
      <InfoPanel />
    </div>
    <LongDescription />
  </div>
}

export default Overview;