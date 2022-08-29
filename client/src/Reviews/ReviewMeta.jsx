import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarScale from '../shared/StarScale.jsx';

// Huzzah for jsx!
const ReviewMeta = ({itemId, starRating, setstarRating}) => {

  const [metaInfo, setmetaInfo] = useState(0)
  const [starCount, setstarCount] = useState(0)

  useEffect( () => {
    axios.get('/reviews/meta', {
      params: {
        product_id: itemId
      }
    }).then(response => {
      setmetaInfo(response.data);
      var totalStar = 0
      var totalVal = 0
      for (var key in response.data.ratings) {
        totalStar += (Number(response.data.ratings[key]) * Number(key));
        totalVal += Number(response.data.ratings[key]);
      }
      setstarRating((totalStar / totalVal).toFixed(1));
      setstarCount(totalVal);
    }).catch(err => {
      console.log('err: ', err)
    })
  },[])

  const barStyle  = (n) => {
    return {width: Math.round((n / starCount) * 100) + '%', height: '5px', backgroundColor: 'green', marginBottom: '5px'}
  }

  const triangleStyle = (n) => {
    return {
      position: 'relative',
      marginLeft: Math.round((n / 5) * 100) + '%',
      top: '-4px',
      width: 0,
      height: 0,
      borderLeft: '7px solid transparent',
      borderRight: '7px solid transparent',
      borderTop: '7px solid red',
    }
  }

  if (metaInfo === 0) {
    return (<div id='review-meta-box'>Loading reviews...</div>)
  } else {
    return (
      <div id='review-meta-box'>
        <a id='review-rating-number'>{starRating}</a>
        <div id='review-meta-stars'>{StarScale(starRating)}</div>
        <p>{Math.round(100 - (metaInfo.recommended.false / metaInfo.recommended.true) * 100)}% of reviews recommend this product.</p>
        <div>
          <div id='metaTextLeft'>5 stars:</div>
          <div id='review-rating-bar'>
            <div style={barStyle(metaInfo.ratings[5])} />
          </div>
          <div id='metaTextRight'>{metaInfo.ratings[5]}</div>
        </div>
        <div>
          <div id='metaTextLeft'>4 stars:</div>
          <div id='review-rating-bar'>
            <div style={barStyle(metaInfo.ratings[4])} />
          </div>
          <div id='metaTextRight'>{metaInfo.ratings[4]}</div>
        </div>
        <div>
          <div id='metaTextLeft'>3 stars:</div>
          <div id='review-rating-bar'>
            <div style={barStyle(metaInfo.ratings[3])} />
          </div>
          <div id='metaTextRight'>{metaInfo.ratings[3]}</div>
        </div>
        <div>
          <div id='metaTextLeft'>2 stars:</div>
          <div id='review-rating-bar'>
            <div style={barStyle(metaInfo.ratings[2])} />
          </div>
          <div id='metaTextRight'>{metaInfo.ratings[2]}</div>
        </div>
        <div>
          <div id='metaTextLeft'>1 stars:</div>
          <div id='review-rating-bar'>
            <div style={barStyle(metaInfo.ratings[1])} />
          </div>
          <div id='metaTextRight'>{metaInfo.ratings[1]}</div>
        </div>
        <div>{metaInfo.characteristics.Comfort ? <div>
            <a>Comfort</a>
            <div id='review-rating-char'>
              <div style={triangleStyle(metaInfo.characteristics.Comfort.value)} />
              <a id='meta-char-text'>Poor</a>
              <a id='meta-char-text'>Perfect</a>
            </div>
          </div> : null}
        </div>
        <div>{metaInfo.characteristics.Fit ? <div>
            <a>Fit</a>
            <div id='review-rating-char'>
              <div style={triangleStyle(metaInfo.characteristics.Fit.value)} />
              <a id='meta-char-text'>Small</a>
              <a id='meta-char-text'>Big</a>
            </div>
          </div> : null}
        </div>
        <div>{metaInfo.characteristics.Length ? <div>
            <a>Length</a>
            <div id='review-rating-char'>
              <div style={triangleStyle(metaInfo.characteristics.Length.value)} />
              <a id='meta-char-text'>Short</a>
              <a id='meta-char-text'>Long</a>
            </div>
          </div> : null}
        </div>
        <div>{metaInfo.characteristics.Quality ? <div>
            <a>Quality</a>
            <div id='review-rating-char'>
              <div style={triangleStyle(metaInfo.characteristics.Quality.value)} />
              <a id='meta-char-text'>Poor</a>
              <a id='meta-char-text'>Good</a>
            </div>
          </div> : null}
        </div>
      </div>
    )
  }
}

export default ReviewMeta;