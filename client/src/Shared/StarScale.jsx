import React from "react";
import { createRoot } from "react-dom/client";

// Huzzah for jsx!
const StarScale = (num) => {

  var rating = {
    unicodeBidi: 'bidi-override',
    color: '#c5c5c5',
    fontSize: '10px',
    height: '10p',
    width: '50px',
    margin: '0 auto',
    position: 'relative',
    padding: 0,
    textShadow: '0px 1px 0 #a2a2a2'
  }

  var ratingUpper = {
    width: Math.round((num / 5) * 100) + '%',
    color: '#e7711b',
    padding: 0,
    position: 'absolute',
    zIndex: 1,
    display: 'flex',
    top: 0,
    left: 0,
    overflow: 'hidden'
  }

  var ratingLower = {
    padding: 0,
    display: 'flex',
    zIndex: 0,
  }
  return (
    <div className="rating" style={rating}>
      <div className="rating-upper" style={ratingUpper}>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
      </div>
      <div className="rating-lower" style={ratingLower}>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
      </div>
    </div>
  )
}

export default StarScale;