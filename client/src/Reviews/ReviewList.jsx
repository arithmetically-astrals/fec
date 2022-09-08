import React, { useState, useEffect } from "react";
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';

//renders the reviews for the product
const ReviewList = ({itemId, starCount, list, setList, defaultList, setDefaultList, clickWriteReview}) => {
  //the current number of reviews to render
  const [count, setCount] = useState(2);

  //gets all reviews for current item
  useEffect( () => {
    setCount(2);
    axios.get('/reviews', {
      params: {
        product_id: itemId,
        count: 40,
        sort: 'relevant'
      }
    }).then(response => {
      setDefaultList(response.data.results);
    }).catch(err => {
      console.log('ReviewList err: ', err)
    })
  },[itemId])

  //increases the amount of rendered reviews
  const moreReviews = () => {
    setCount(count + 2);
  }

  //grabs a new list of reviews sorted by the chosen option
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

  var mapList = list;
  if (list.length === 0) {
    mapList = defaultList;
  }

  if (mapList.length === 0) {
    return (
      <div>
        <div>Be the first to write a review!</div>
        <button onClick={clickWriteReview}>Write a review</button>
      </div>
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
        <div id='review-tile-container'>
        {mapList.map((info, index) => {
          if (index < count) {
            return <ReviewTile info={info} itemId={itemId} count={count} setList={setList} key={info.review_id} />
          }
        })}
        </div>
        <button onClick={moreReviews}>More reviews</button>
        <button onClick={clickWriteReview}>Write a review</button>
      </div>
      )
  }
}

export default ReviewList;