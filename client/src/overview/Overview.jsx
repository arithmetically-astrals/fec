// the main component for the overview of the current product
// this component will contain Details and StylePicker as sub-components
import React from "react";
import Carousel from "./Carousel.jsx";
import Details from "./Details.jsx";
import StylePicker from "./StylePicker.jsx";
import LongDescription from "./LongDescription.jsx";

const Overview = () => {
  return <div>
    <Carousel />
    <Details />
    <StylePicker />
    <div id='overview-details-cart'>
      add to cart
    </div>
    <div id='overview-details-favorite'>
      add to favorites
    </div>
    <LongDescription />
  </div>
}

export default Overview;