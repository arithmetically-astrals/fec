import React, { useState, useEffect } from "react";
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';

// Huzzah for jsx!
const ReviewList = ({itemId}) => {

  const [count, setCount] = useState(2);
  const [list, setList] = useState([]);

  useEffect( () => {
    axios.get('/reviews', {
      params: {
        product_id: itemId,
        count: 2
      }
    }).then(response => {
      setList(response.data.results);
    }).catch(err => {
      console.log('err: ', err)
    })
  },[itemId])

  const moreReviews = () => {

    axios.get('/reviews', {
      params: {
        product_id: itemId,
        count: count + 2
      }
    }).then(response => {
      setCount(count + 2)
      setList(response.data.results);
    }).catch(err => {
      console.log('err: ', err)
    })
  }
  if (list.length === 0) {
    return (
    <div>Loading reviews...</div>
    )
  } else {
    return (
      <div id='review-tile-box'>
        <div>Don't render me yet!</div>
        {list.map(info => {
          return <ReviewTile info={info} key={info.review_id} />
        })}
        <button onClick={moreReviews}>More reviews</button>
      </div>
      )
  }
}

export default ReviewList;