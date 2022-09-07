import React, { useState, useEffect } from "react";
import axios from 'axios';

const StylePicker = (props) => {

  if (props.styleInfo.results === undefined ) {
    return <div>loading styles</div>
  } else {
    
    // array to hold quantity options
    let quantity = [];

    // get all SKUs for the currently selected style
    let currentSKUs = props.styleInfo.results.find(result => result.style_id === props.styleId).skus;

    // get the currently selected SKU
    let currentSKU = Object.entries(currentSKUs).find(entry => entry[1].size === props.currentSize);

    // get the quantity for the currently selected SKU
    let currentQuantity = currentSKU[1].quantity

    // build an array for all the quantity options from 1 to quantity
    for (let i = 0; i < currentQuantity; i++) {
      quantity.push(i + 1)
    }

    // handle changes to which of the SKU options is selected
    let changeHandler = (e) => {
      props.setCurrentSize(e.target.value);
    }

    return (
      <div id='overview-infopanel-stylepicker'>
        <div id='overview-infopanel-stylepicker-styles'>
          {props.styleInfo.results.map(({ style_id, photos }) => (
            <img className='overview-infopanel-stylepicker-style' key={style_id} src={photos[0].thumbnail_url} onClick={() => {
              props.setPhotoUrl(photos[0].url);
              props.setStyleId(style_id);
            }} />
          ))}
        </div>
        <select id='overview-infopanel-stylepicker-sizes' value={props.currentSize} onChange={changeHandler}>
          {/* the skus data structure is an object, not an array, so we must needs get an array of the values of the skus object */}
          {Object.values(props.styleInfo.results.find(result => result.style_id === props.styleId).skus).map(({ size }) => (
            <option className='overview-infopanel-stylepicker-size' key={size}>{size}</option>
          ))}
        </select>
        <select id='overview-infopanel-stylepicker-quantities'>
          {quantity.map(i => <option key={i} className='overview-infopanel-stylepicker-quantity'>{i}</option>)}
        </select>
      </div>
    )
}
}

export default StylePicker;