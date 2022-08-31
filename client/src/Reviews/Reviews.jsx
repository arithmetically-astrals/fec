// the main component for reviews. contains form, list, and menu components as subcomponents
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import ReviewList from './ReviewList.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewMeta from './ReviewMeta.jsx';

// Huzzah for jsx!
const Reviews = ({itemId, starRating, setstarRating}) => {
  const [starCount, setstarCount] = useState(0);
  const [list, setList] = useState([]);
  const [defaultList, setDefaultList] = useState([]);
  const [filterNum, setFilterNum] = useState([false, false, false, false, false]);

  const clickFilterStar = (e) => {
    var num = Number(e.target.innerText.slice(0, 1))
    var copy = filterNum.slice()
    if (!filterNum[num - 1]) {
      copy[num - 1] = true
      setFilterNum(copy);
      setList(list.concat(defaultList.filter((item) => {
        return item.rating === num
      })))
    } else {
      copy[num - 1] = false
      setFilterNum(copy);
      setList(list.filter((item) => {
        return item.rating !== num
      }))
    }
  }

  return (
  <div id='reviews' className='widget'>
    <h5>Ratings and Reviews</h5>
    <ReviewMeta itemId={itemId}  starRating={starRating} setstarRating={setstarRating} setstarCount={setstarCount}
    starCount={starCount} clickFilterStar={clickFilterStar} />
    <ReviewList itemId={itemId} starCount={starCount} list={list} setList={setList} defaultList={defaultList} setDefaultList={setDefaultList}/>
    <ReviewForm />

  </div>
  )
}

export default Reviews;