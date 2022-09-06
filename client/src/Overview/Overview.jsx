// the main component for the overview of the current product
// this component will contain Details and StylePicker as sub-components
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Carousel from "./Carousel.jsx";
import InfoPanel from "./InfoPanel.jsx";
import LongDescription from "./LongDescription.jsx";

const Overview = ({itemId, starRating, setstarRating}) => {

  const [styleInfo, setStyleInfo] = useState(0);

  useEffect( () => {
    axios.get('/products/styles', {
      params: {
        product_id: itemId
      }
    }).then(response => {
      setStyleInfo(response.data);
      console.log('styles', response.data.results[0].name)
    }).catch(err => {
      console.log('err: ', err)
    })
  },[itemId])

  return (
    <div id='overview' className='widget'>
      <div id='overview-carouselandinfopanel'>
        <Carousel itemId={itemId} styleInfo={styleInfo} />
        <InfoPanel itemId={itemId} styleInfo={styleInfo} setStyleInfo={setStyleInfo} starRating={starRating} />
      </div>
      <LongDescription itemId={itemId} />
    </div>
  )
}

export default Overview;