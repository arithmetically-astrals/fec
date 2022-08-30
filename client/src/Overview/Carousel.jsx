import React, { useState, useEffect } from "react";
import axios from 'axios';

const Carousel = ({itemId = 37311}) => {
  const [metaInfo, setmetaInfo] = useState(0)

  useEffect( () => {
    axios.get('/products/item', {
      params: {
        product_id: itemId
      }
    }).then(response => {
      setmetaInfo(response.data);
      console.log(response.data)
    }).catch(err => {
      console.log('err: ', err)
    })
  },[itemId])

  return (
    <div id='overview-carousel'>
      <img id='overview-carousel-featuredimage' src='https://i.imgur.com/EPHb3G6.jpeg' />
      
      <div className='overview-carousel-thumbnailimage'>
        Thumbnail
      </div>
    </div>
)}

export default Carousel;