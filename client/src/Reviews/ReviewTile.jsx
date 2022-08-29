import React, { useState, useEffect } from "react";
import StarScale from '../shared/StarScale.jsx';

const ReviewTile = ({info}) => {
  console.log(info)

  const clickYes = (e) => {
    console.log(e)
  }

  const clickReport = (e) => {

  }

  return (
    <div id='review-tile'>
      <div id='review-tile-name'>{info.reviewer_name}, {new Date(info.date).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"}) }</div>
      <div id='review-tile-stars'>
        <h5>{StarScale(info.rating)}</h5>
      </div>
      <h4>{info.summary}</h4>
      <p>{info.body}</p>
      <div>Was this review helpful? <span onClick={clickYes} style={{textDecoration: 'underline', cursor: 'pointer'}} >Yes</span> ({info.helpfulness})
      | <span onClick={clickReport} style={{textDecoration: 'underline', cursor: 'pointer'}}>Report</span></div>
    </div>
  )
}


export default ReviewTile;