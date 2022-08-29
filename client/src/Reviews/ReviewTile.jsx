import React, { useState, useEffect } from "react";
import StarScale from '../Shared/StarScale.jsx';

const ReviewTile = ({info}) => {
  console.log(info)

  return (
    <div id='review-tile'>
      <div>User: {info.reviewer_name}</div>
      <div id='review-tile-stars'>
        <h5>Rating: {StarScale(info.rating)}</h5>
      </div>
      <h3>{info.summary}</h3>
      <p>{info.body}</p>
      <h6>Helpful: {info.helpfulness}</h6>
    </div>
  )
}


export default ReviewTile;