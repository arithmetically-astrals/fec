import React, { useState, useEffect } from "react";

const ReviewSelector = ({metaInfo, mainRating, setMainRating, setRecommend, clickCharRating}) => {

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
    <div id='review-input-rating'>
      <span>Overall rating</span>
        <div>
        {reviewStarScale(mainRating)}
        </div>
      <br/>
      <span>Do you recommend this product?</span>
      <br/>
      Yes<input name='recommend' type='radio' onClick={() => setRecommend(true)} required/>
      No <input name='recommend' type='radio' onClick={() => setRecommend(false)} required/>
      <br/>
      <div>
        {metaInfo.characteristics.Size ? <div>
          <span>Size: </span>
          <div>
            <input type='radio' name={metaInfo.characteristics.Size.id + ''} value='1' onClick={clickCharRating} required/>
            <span> - A size too small</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Size.id + ''} value='2' onClick={clickCharRating} required/>
            <span> - ½ a size too small</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Size.id + ''} value='3' onClick={clickCharRating} required/>
            <span> - Perfect</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Size.id + ''} value='4' onClick={clickCharRating} required/>
            <span> - ½ a size too big</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Size.id + ''} value='5' onClick={clickCharRating} required/>
            <span> - A size too big</span>
          </div>
        </div> : null}
        {metaInfo.characteristics.Width ? <div>
          <span>Width: </span>
          <div>
            <input type='radio' name={metaInfo.characteristics.Width.id + ''} value='1' onClick={clickCharRating} required/>
            <span> - Too narrow</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Width.id + ''} value='2' onClick={clickCharRating} required/>
            <span> - Slightly narrow</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Width.id + ''} value='3' onClick={clickCharRating} required/>
            <span> - Perfect</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Width.id + ''} value='4' onClick={clickCharRating} required/>
            <span> - Slightly wide</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Width.id + ''} value='5' onClick={clickCharRating} required/>
            <span> - Too wide</span>
          </div>
        </div> : null}
        {metaInfo.characteristics.Comfort ? <div>
          <span>Comfort: </span>
          <div>
            <input type='radio' name={metaInfo.characteristics.Comfort.id + ''} value='1' onClick={clickCharRating} required/>
            <span> - Uncomfortable</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Comfort.id + ''} value='2' onClick={clickCharRating} required/>
            <span> - Slightly uncomfortable</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Comfort.id + ''} value='3' onClick={clickCharRating} required/>
            <span> - Ok</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Comfort.id + ''} value='4' onClick={clickCharRating} required/>
            <span> - Comfortable</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Comfort.id + ''} value='5' onClick={clickCharRating} required/>
            <span> - Perfect</span>
          </div>
        </div> : null}
        {metaInfo.characteristics.Quality ? <div>
          <span>Quality: </span>
          <div>
            <input type='radio' name={metaInfo.characteristics.Quality.id + ''} value='1' onClick={clickCharRating} required/>
            <span> - Poor</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Quality.id + ''} value='2' onClick={clickCharRating} required/>
            <span> - Below average</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Quality.id + ''} value='3' onClick={clickCharRating} required/>
            <span> - What I expected</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Quality.id + ''} value='4' onClick={clickCharRating} required/>
            <span> - Pretty great</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Quality.id + ''} value='5' onClick={clickCharRating} required/>
            <span> - Perfect</span>
          </div>
        </div> : null}
        {metaInfo.characteristics.Length ? <div>
          <span>Length: </span>
          <div>
            <input type='radio' name={metaInfo.characteristics.Length.id + ''} value='1' onClick={clickCharRating} required/>
            <span> - Runs Short</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Length.id + ''} value='2' onClick={clickCharRating} required/>
            <span> - Runs slightly short</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Length.id + ''} value='3' onClick={clickCharRating} required/>
            <span> - Perfect</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Length.id + ''} value='4' onClick={clickCharRating} required/>
            <span> - Runs slightly long</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Length.id + ''} value='5' onClick={clickCharRating} required/>
            <span> - Runs long</span>
          </div>
        </div> : null}
        {metaInfo.characteristics.Fit ? <div>
          <span>Fit: </span>
          <div>
            <input type='radio' name={metaInfo.characteristics.Fit.id + ''} value='1' onClick={clickCharRating} required/>
            <span> - Runs tight</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Fit.id + ''} value='2' onClick={clickCharRating} required/>
            <span> - Runs slightly tight</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Fit.id + ''} value='3' onClick={clickCharRating} required/>
            <span> - Perfect</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Fit.id + ''} value='4' onClick={clickCharRating} required/>
            <span> - Runs slightly long</span>
          </div>
          <div>
            <input type='radio' name={metaInfo.characteristics.Fit.id + ''} value='5' onClick={clickCharRating} required/>
            <span> - Runs long</span>
          </div>
        </div> : null}
      </div>
    </div>
  )
}

export default ReviewSelector;