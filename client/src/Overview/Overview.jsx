// the main component for the overview of the current product
// this component will contain Details and StylePicker as sub-components
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Carousel from "./Carousel.jsx";
import InfoPanel from "./InfoPanel.jsx";
import LongDescription from "./LongDescription.jsx";

const Overview = (props) => {
  const [styleInfo, setStyleInfo] = useState(0);
  const [styleId, setStyleId] = useState(0);
  const [photoUrl, setPhotoUrl] = useState(0);

  useEffect( () => {
    axios.get('/products/styles', {
      params: {
        product_id: props.itemId
      }
    }).then(response => {
      setStyleInfo(response.data);
      setStyleId(response.data.results[0].style_id);
      setPhotoUrl(response.data.results[0].photos[0].url);
    }).catch(err => {
      console.log('err: ', err)
    })
  },[props.itemId])

  return (
    <div id='overview' className='widget'>
      <div id='overview-carouselandinfopanel'>
        <Carousel itemId={props.itemId} styleId={styleId} styleInfo={styleInfo} photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} />
        <InfoPanel itemId={props.itemId} styleId={styleId} setStyleId={setStyleId} styleInfo={styleInfo} setStyleInfo={setStyleInfo} starRating={props.starRating} />
      </div>
      <LongDescription itemId={props.itemId} />
    </div>
  )
}

export default Overview;