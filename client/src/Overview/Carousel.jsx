import React, { useState, useEffect } from "react";
import axios from 'axios';

const Carousel = (props) => {
  if (props.styleInfo.results === undefined) {
    return (<div>loading...</div>)
  } else {
    return (
      <div id='overview-carousel'>
        <img id='overview-carousel-featuredimage' src={props.photoUrl} />
        <div id='overview-carousel-thumbnails'>
          {props.styleInfo.results.find(result => result.style_id === props.styleId).photos.filter(photo => photo.thumbnail_url.substring(0, 4) === 'http').map(({ url, thumbnail_url }) => (
            <img className='overview-carousel-thumbnail' key={thumbnail_url} src={thumbnail_url} onClick={() => props.setPhotoUrl(url)} />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel;