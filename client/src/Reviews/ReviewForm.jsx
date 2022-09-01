import React, { useState, useEffect } from "react";
import axios from 'axios';

//renders the write new review form
const ReviewForm = ({itemId, setWriteReview, metaInfo}) => {

  const [reccomend, setReccommend] = useState(false);
  const [mainRating, setMainRating] = useState(0);
  const [photoUpload, setPhotoUpload] = useState([]);

  const closeReview = () => {
    setWriteReview(false);
  }

  const submitReview = (e) => {
    e.preventDefault();
    console.log(e.target)
    console.log(e.target.summary.value)
    console.log(e.target.body.value)

    axios.post('/review/post', {
      product_id: itemId,
      rating: mainRating,
      summary: e.target.summary.value,
      body: e.target.body.value,
      reccomend: reccomend,
      name: e.target.username.value,
      email: e.target.email.value,
      photos: photoUpload,
      characteristics: {
        Comfort: 5,
        Fit: 4,
        Length: 3,
        Quality: 2,
        Size: 1,
        Width: 0
      }
    }).then(response => {
      console.log('Recieved :', response.data)
    })
    //closeReview();
  }

  const addPhoto = (e) => {
    e.preventDefault();
    var photoCopy = photoUpload.slice();
    photoCopy.push('https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg');
    setPhotoUpload(photoCopy)
  }

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
        <span>{textRating}</span>
      </div>
    )
  }

  return (
    <div id='review-write-form'>
      <span onClick={closeReview} style={{cursor: 'pointer', float: 'right'}}>X</span>
      <h3>Write Your Review</h3>
      <h5>About the [Product Name Here]</h5>
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
      </div>
      <form onSubmit={submitReview}>
        <span>Size, Width, Comfort, Quality, Length, Fit ratings</span>
        <br/>
        Summary:
        <br/>
        <input type='text' name='summary' maxLength='60' style={{width: '400px'}} />
        <br/>
        Review:
        <br/>
        <textarea name='body' minLength='50' maxLength='1000' style={{width: '400px', height: '250px', resize: 'none'}} required />
        <br/>
        {photoUpload.map(photo => {
          return (
            <div key={photo} style={{display: 'inline', marginLeft: '5px'}}>
              <img  src={photo} style={{width: '40px', height: '40px'}}/>
            </div>
            )}
        )} {photoUpload.length < 5 ? <button onClick={addPhoto}>Add a photo!</button> : null }
        <br/>
        <span style={{fontSize: 'x-small'}}>For privacy reasons, do not use your full name or email address</span>
        <br/>
        What is your nickname?: <input type='text' name='username' maxLength='60' placeholder='Example: jackson11!'required></input>
        <br/>
        <span style={{fontSize: 'x-small'}}>For authentication reasons, you will not be emailed</span>
        <br/>
        Email: <input type='email' name='email' maxLength='60' placeholder='Example: jackson11@email.com' required style={{width: '250px'}}></input>
        <br/>
        <input type='submit' style={{float: 'right'}}></input>
      </form>
    </div>
  )
}

export default ReviewForm;