import React, { useState, useEffect } from "react";
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';

// Huzzah for jsx!
const ReviewList = ({itemId, starCount}) => {

  const [count, setCount] = useState(2);
  const [list, setList] = useState([]);

  useEffect( () => {
    setCount(2);
    axios.get('/reviews', {
      params: {
        product_id: itemId,
        count: 40,
        sort: 'relevant'
      }
    }).then(response => {
      setList(response.data.results);
    }).catch(err => {
      console.log('ReviewList err: ', err)
    })
  },[itemId])

  const moreReviews = () => {
    setCount(count + 2);
  }

  const selectSort = (e) => {
    axios.get('/reviews', {
      params: {
        product_id: itemId,
        count: 40,
        sort: e.target.value.toLowerCase()
      }
    }).then(response => {
      setList(response.data.results);
    }).catch(err => {
      console.log('ReviewList err: ', err)
    })
  }

  if (list.length === 0) {
    return (
    <div>Loading reviews...</div>
    )
  } else {
    return (
      <div id='review-tile-box'>
        <div>{starCount} total reviews, sort by
          <select style={{marginLeft: '5px'}} onChange={selectSort}>
            <option>Relevant</option>
            <option>Helpful</option>
            <option>Newest</option>
          </select>
        </div>
        {list.map((info, index) => {
          if (index < count) {
            return <ReviewTile info={info} itemId={itemId} count={count} setList={setList} key={info.review_id} />
          }
        })}
        <button onClick={moreReviews}>More reviews</button>
      </div>
      )
  }
}

export default ReviewList;