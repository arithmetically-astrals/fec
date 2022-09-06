import React, { useState, useEffect } from "react";
import axios from 'axios';

const Carousel = (props) => {
  console.log(props.styleInfo)

  if (props.styleInfo.results === undefined) {
    return (<div>loading...</div>)
  } else {
    return (
      <div id='overview-carousel'>
        <img id='overview-carousel-featuredimage' src={props.styleInfo.results[0].photos[0].url} />
        <div id='overview-carousel-thumbnails'>
          {props.styleInfo.results[0].photos.map(({ thumbnail_url }) => (
            <img className='overview-carousel-thumbnail' key={thumbnail_url} src={thumbnail_url} />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel;