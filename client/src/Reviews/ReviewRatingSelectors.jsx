import React, { useState, useEffect } from "react";

const ReviewSelector = ({metaInfo, mainRating, setMainRating, setReccommend, clickCharRating}) => {

  const reviewStarScale = (num) => {
    var textRating = ' - Choose a star'
    if (mainRating === 1) {
      textRating = ' - Poor'
    } else if (mainRating === 2) {
      textRating = ' - Fair'
    } else if (mainRating === 3) {
      textRating = ' - Average'
    } else if (mainRating === 4) {
      textRating = ' - Good'
    } else if (mainRating === 5) {
      textRating = ' - Great'
    }
    var rating = {
      float: 'left',
      unicodeBidi: 'bidi-override',
      color: '#c5c5c5',
      fontSize: '15px',
      height: '15px',
      width: '75px',
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
      overflow: 'hidden',
      cursor: 'pointer'
    }

    var ratingLower = {
      padding: 0,
      display: 'flex',
      zIndex: 0,
      cursor: 'pointer'
    }
    return (
      <div>
        <div style={rating}>
          <div style={ratingUpper}>
              <span onClick={() => setMainRating(1)}>★</span>
              <span onClick={() => setMainRating(2)}>★</span>
              <span onClick={() => setMainRating(3)}>★</span>
              <span onClick={() => setMainRating(4)}>★</span>
              <span onClick={() => setMainRating(5)}>★</span>
          </div>
          <div style={ratingLower}>
              <span onClick={() => setMainRating(1)}>★</span>
              <span onClick={() => setMainRating(2)}>★</span>
              <span onClick={() => setMainRating(3)}>★</span>
              <span onClick={() => setMainRating(4)}>★</span>
              <span onClick={() => setMainRating(5)}>★</span>
          </div>
        </div>
        <span style={{fontSize: 'small'}}>{textRating}</span>
      </div>
    )
  }

  return (
    <div style={{float: 'right'}}>
      <span>Overall rating</span>
        <div>
        {reviewStarScale(mainRating)}
        </div>
      <br/>
      <span>Do you reccomend this product?</span>
      <br/>
      Yes<input name='recommend' type='radio' onClick={() => setReccommend(true)} required/>
      No <input name='recommend' type='radio' onClick={() => setReccommend(false)} required/>
      <br/>
      <div style={{display: 'table'}}>
        {metaInfo.characteristics.Size ? <div>
          <span>Size: </span>
          <div>
            <input type='radio' name='Size' value='1' onClick={clickCharRating} required/>
            <span> - A size too small</span>
          </div>
          <div>
            <input type='radio' name='Size' value='2' onClick={clickCharRating} required/>
            <span> - ½ a size too small</span>
          </div>
          <div>
            <input type='radio' name='Size' value='3' onClick={clickCharRating} required/>
            <span> - Perfect</span>
          </div>
          <div>
            <input type='radio' name='Size' value='4' onClick={clickCharRating} required/>
            <span> - ½ a size too big</span>
          </div>
          <div>
            <input type='radio' name='Size' value='5' onClick={clickCharRating} required/>
            <span> - A size too big</span>
          </div>
        </div> : null}
        {metaInfo.characteristics.Width ? <div>
          <span>Width: </span>
          <div>
            <input type='radio' name='Width' value='1' onClick={clickCharRating} required/>
            <span> - Too narrow</span>
          </div>
          <div>
            <input type='radio' name='Width' value='2' onClick={clickCharRating} required/>
            <span> - Slightly narrow</span>
          </div>
          <div>
            <input type='radio' name='Width' value='3' onClick={clickCharRating} required/>
            <span> - Perfect</span>
          </div>
          <div>
            <input type='radio' name='Width' value='4' onClick={clickCharRating} required/>
            <span> - Slightly wide</span>
          </div>
          <div>
            <input type='radio' name='Width' value='5' onClick={clickCharRating} required/>
            <span> - Too wide</span>
          </div>
        </div> : null}
        {metaInfo.characteristics.Comfort ? <div>
          <span>Comfort: </span>
          <div>
            <input type='radio' name='Comfort' value='1' onClick={clickCharRating} required/>
            <span> - Uncomfortable</span>
          </div>
          <div>
            <input type='radio' name='Comfort' value='2' onClick={clickCharRating} required/>
            <span> - Slightly uncomfortable</span>
          </div>
          <div>
            <input type='radio' name='Comfort' value='3' onClick={clickCharRating} required/>
            <span> - Ok</span>
          </div>
          <div>
            <input type='radio' name='Comfort' value='4' onClick={clickCharRating} required/>
            <span> - Comfortable</span>
          </div>
          <div>
            <input type='radio' name='Comfort' value='5' onClick={clickCharRating} required/>
            <span> - Perfect</span>
          </div>
        </div> : null}
        {metaInfo.characteristics.Quality ? <div>
          <span>Quality: </span>
          <div>
            <input type='radio' name='Quality' value='1' onClick={clickCharRating} required/>
            <span> - Poor</span>
          </div>
          <div>
            <input type='radio' name='Quality' value='2' onClick={clickCharRating} required/>
            <span> - Below average</span>
          </div>
          <div>
            <input type='radio' name='Quality' value='3' onClick={clickCharRating} required/>
            <span> - What I expected</span>
          </div>
          <div>
            <input type='radio' name='Quality' value='4' onClick={clickCharRating} required/>
            <span> - Pretty great</span>
          </div>
          <div>
            <input type='radio' name='Quality' value='5' onClick={clickCharRating} required/>
            <span> - Perfect</span>
          </div>
        </div> : null}
        {metaInfo.characteristics.Length ? <div>
          <span>Length: </span>
          <div>
            <input type='radio' name='Length' value='1' onClick={clickCharRating} required/>
            <span> - Runs Short</span>
          </div>
          <div>
            <input type='radio' name='Length' value='2' onClick={clickCharRating} required/>
            <span> - Runs slightly short</span>
          </div>
          <div>
            <input type='radio' name='Length' value='3' onClick={clickCharRating} required/>
            <span> - Perfect</span>
          </div>
          <div>
            <input type='radio' name='Length' value='4' onClick={clickCharRating} required/>
            <span> - Runs slightly long</span>
          </div>
          <div>
            <input type='radio' name='Length' value='5' onClick={clickCharRating} required/>
            <span> - Runs long</span>
          </div>
        </div> : null}
        {metaInfo.characteristics.Fit ? <div>
          <span>Fit: </span>
          <div>
            <input type='radio' name='Fit' value='1' onClick={clickCharRating} required/>
            <span> - Runs tight</span>
          </div>
          <div>
            <input type='radio' name='Fit' value='2' onClick={clickCharRating} required/>
            <span> - Runs slightly tight</span>
          </div>
          <div>
            <input type='radio' name='Fit' value='3' onClick={clickCharRating} required/>
            <span> - Perfect</span>
          </div>
          <div>
            <input type='radio' name='Fit' value='4' onClick={clickCharRating} required/>
            <span> - Runs slightly long</span>
          </div>
          <div>
            <input type='radio' name='Fit' value='5' onClick={clickCharRating} required/>
            <span> - Runs long</span>
          </div>
        </div> : null}
      </div>
    </div>
  )
}

export default ReviewSelector;