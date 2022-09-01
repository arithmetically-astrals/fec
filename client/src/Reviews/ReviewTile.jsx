import React, { useState, useEffect } from "react";
import StarScale from '../Shared/StarScale.jsx';
import axios from 'axios';

const ReviewTile = ({info, setList, itemId, count}) => {
  //count of yes votes
  const [yesCount, setYesCount] = useState(info.helpfulness)
  //flag to show photo modal
  const [showImg, setShowImg] = useState(null);
  //keeps user from spamming yes button
  const [clickedYes, setClickedYes] = useState(false);
  //flag to show or hide excess text
  const [showMore, setShowMore] = useState(false);

  //check if text is too long
  useEffect( () => {
    if (info.body.length > 250) {
      setShowMore(true);
    }
  }, [])

  //adds to yes vote count
  const clickYes = (e) => {
    axios.put('/reviews/helpful', {
      review_id: info.review_id
    }).then(response => {
      setYesCount(yesCount + 1);
      setClickedYes(true);
    }).catch(err => {
      console.log('Yes error: ', err)
    })
  }

  //reports review and removes from review list
  const clickReport = (e) => {
    if (window.confirm('Do you want to report this review?')) {
      axios.put('/reviews/report', {
        review_id: info.review_id
      }).then(reply => {
        axios.get('/reviews', {
          params: {
            product_id: itemId,
            count: count
          }
        }).then(response => {
          setList(response.data.results);
        }).catch(err => {
          console.log('Report error: ', err)
        })
      }).catch(err => {
        console.log('Report error: ', err)
      })
    } else {
      return;
    }
  }

  //shows img modal
  const clickImg = (photo) => {
     setShowImg(<div id='review-img-modal'><span onClick={closeImg} style={{cursor: 'pointer'}}>
       X</span><img src={photo.url} style={{maxWidth: '750px', maxHeight: '750px'}}/></div> )
  }

  //closes img modal
  const closeImg = () => {
    setShowImg(null)
  }

  //shows excess text
  const clickShowMore = () => {
    setShowMore(false)
  }

  return (
    <div id='review-tile' data-testid="review-tile">
      <div id='review-tile-name'>{info.reviewer_name}, {new Date(info.date).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"}) }</div>
      <div id='review-tile-stars'>
        <h5>{StarScale(info.rating)}</h5>
      </div>
      <h4>{info.summary}</h4>
      {!showMore ? <p>{info.body}</p> : <p>{info.body.slice(0, 250) + '...'}
      <span onClick={clickShowMore} style={{cursor: 'pointer', color: 'blue', fontSize: 'x-small'}}>(Show more)</span></p>}
      <div>{info.recommend ? <div>✓ I recommend this product</div>: null}</div>
      {info.photos.length > 0 ? <div id='review-tile-photobox'>
        {info.photos.map(photo => {
          return (
            <div key={photo.id} style={{display: 'inline', marginLeft: '5px'}}>
              <img  src={photo.url} style={{width: '40px', height: '40px', cursor: 'pointer'}} onClick={() => {clickImg(photo)}}/>
            </div>
            )
        })}
      </div>: null}
      <div>{showImg}</div>
      <div>Was this review helpful? {!clickedYes ? <span data-testid="yes-button" onClick={clickYes} style={{textDecoration: 'underline', cursor: 'pointer'}} >Yes</span> : <span style={{color: 'green'}}>Yes</span>} <span data-testid="yes-count">({yesCount})</span>
      | <span onClick={clickReport} style={{textDecoration: 'underline', cursor: 'pointer'}}>Report</span></div>
    </div>
  )
}


export default ReviewTile;