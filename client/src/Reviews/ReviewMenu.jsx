import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Huzzah for jsx!
const ReviewMenu = () => {
  const [stuff, setStuff] = useState(0)
  useEffect( () => {
    axios.get('/reviews/meta', {
      params: {
        product_id: 37312
      }
    }).then(response => {
      setStuff(response.data);
    }).catch(err => {
      console.log('err: ', err)
    })
  },[])
  if (stuff === 0) {
    return (<h1>Loading...</h1>)
  } else {
    console.log(stuff)
    var totalStar = 0
    var totalVal = 0
    for (var key in stuff.ratings) {
      totalStar += (Number(stuff.ratings[key]) * Number(key));
      totalVal += Number(stuff.ratings[key]);
    }
    console.log(totalStar, totalVal)
    return (
      <div>
        <h1>{Math.round(totalStar / totalVal)}</h1>
        <p>{Math.round(100 - (stuff.recommended.false / stuff.recommended.true) * 100)}% of reviews recommend this product.</p>
        <ul>
          <li>5 stars: {stuff.ratings[5]}</li>
          <li>4 stars: {stuff.ratings[4]}</li>
          <li>3 stars: {stuff.ratings[3]}</li>
          <li>2 stars: {stuff.ratings[2]}</li>
          <li>1 stars: {stuff.ratings[1]}</li>
        </ul>
      </div>
    )
  }
}

export default ReviewMenu;