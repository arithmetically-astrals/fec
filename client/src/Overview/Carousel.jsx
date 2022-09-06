import React, { useState, useEffect } from "react";
import axios from 'axios';

const Carousel = (props) => {
  const [photoUrl, setPhotoUrl] = useState(0);

  useEffect( () => {
    axios.get('/products/styles', {
      params: {
        product_id: props.itemId
      }
    }).then(response => {
      setPhotoUrl(response.data.results[0].photos[0].url);
    }).catch(err => {
      console.log('err: ', err)
    })
  },[props.itemId])

  if (props.styleInfo.results === undefined) {
    return (<div>loading...</div>)
  } else {
    return (
      <div id='overview-carousel'>
        <img id='overview-carousel-featuredimage' src={props.styleInfo.results.find(result => result.style_id === props.styleId).photos.find(photo => photo.url === photoUrl).url} />
        <div id='overview-carousel-thumbnails'>
          {props.styleInfo.results.find(result => result.style_id === props.styleId).photos.map(({ url, thumbnail_url }) => (
            <img className='overview-carousel-thumbnail' key={thumbnail_url} src={thumbnail_url} onClick={() => setPhotoUrl(url)} />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel;