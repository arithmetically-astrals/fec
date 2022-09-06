import React, { useState, useEffect } from "react";
import axios from 'axios';

const StylePicker = ({itemId, styleInfo}) => {
  const [productInfo, setProductInfo] = useState(0)

  useEffect( () => {
    axios.get('/products/item', {
      params: {
        product_id: itemId
      }
    }).then(response => {
      setProductInfo(response.data);
      console.log('styles', response.data.results[0].name)
    }).catch(err => {
      console.log('err: ', err)
    })
  },[itemId])

  console.log('styleInfo', styleInfo)
  if (styleInfo.results === undefined ) {
    return <div>loading styles</div>
  } else {
    return (
      <div id='overview-infopanel-stylepicker'>
        <div id='overview-infopanel-stylepicker-styles'>
          {styleInfo.results.map(({ name, photos }) => (
            <img className='overview-infopanel-stylepicker-style' key={name} src={photos[0].thumbnail_url} />
          ))}
        </div>
        <select id='overview-infopanel-stylepicker-sizes'>
          {/* the skus data structure is an object, not an array, so we must needs get an array of the values of the skus object */}
          {Object.values(styleInfo.results[0].skus).map(({ size }) => (
            <option className='overview-infopanel-stylepicker-size' key={size}>{size}</option>
          ))}
        </select>
        <select id='overview-infopanel-stylepicker-quantities'>
          <option className='overview-infopanel-stylepicker-quantity'>1</option>
          <option className='overview-infopanel-stylepicker-quantity'>2</option>
          <option className='overview-infopanel-stylepicker-quantity'>3</option>
          <option className='overview-infopanel-stylepicker-quantity'>4</option>
          <option className='overview-infopanel-stylepicker-quantity'>5</option>
          <option className='overview-infopanel-stylepicker-quantity'>6</option>
          <option className='overview-infopanel-stylepicker-quantity'>7</option>
          <option className='overview-infopanel-stylepicker-quantity'>8</option>
          <option className='overview-infopanel-stylepicker-quantity'>9</option>
        </select>
      </div>
    )
}
}

export default StylePicker;