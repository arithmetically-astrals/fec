import React, { useState, useEffect } from "react";
import axios from 'axios';
import ReviewSelector from './ReviewRatingSelectors.jsx';

//renders the write new review form
const ReviewForm = ({itemId, setWriteReview, metaInfo}) => {

  const [reccomend, setReccommend] = useState(false);
  const [mainRating, setMainRating] = useState(0);
  const [photoUpload, setPhotoUpload] = useState([]);
  const [charRatings, setCharRatings] = useState({});
  const [reviewBody, setReviewBody] = useState('');

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
      characteristics: charRatings
    }).then(response => {
      console.log('Recieved :', response.data)
    }).catch(err => console.log('post review error:', err))
    //closeReview();
  }

  const addPhoto = (e) => {
    e.preventDefault();
    var photoCopy = photoUpload.slice();
    photoCopy.push('https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg');
    setPhotoUpload(photoCopy)
  }

  const clickCharRating = (e) => {
    var charsCopy = Object.assign({}, charRatings);
    charsCopy[e.target.name] = e.target.value;
    setCharRatings(charsCopy)
  }

  const bodyChange = (e) => {
    setReviewBody(e.target.value);
  }

  return (
    <div id='review-write-form'>
      <span onClick={() => setWriteReview(false)} style={{cursor: 'pointer', float: 'right'}}>X</span>
      <h3>Write Your Review</h3>
      <h5>About the [Product Name Here]</h5>
      <ReviewSelector metaInfo={metaInfo} mainRating={mainRating} setMainRating={setMainRating} setReccommend={setReccommend} clickCharRating={clickCharRating}/>
      <form onSubmit={submitReview}>
        Summary:
        <br/>
        <input type='text' name='summary' maxLength='60' style={{width: '400px'}} />
        <br/>
        Review:
        <br/>
        <textarea name='body' minLength='50' maxLength='1000' style={{width: '400px', height: '250px', resize: 'none'}} required onChange={bodyChange}/>
        <br/>
        {reviewBody.length < 50 ? <p style={{fontSize: 'x-small'}}>Minimum required characters left: {50 - reviewBody.length}</p> : <p style={{fontSize: 'x-small'}}>Minimum reached</p>}
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
        <input type='submit' style={{cursor: 'pointer'}}></input>
      </form>
    </div>
  )
}

export default ReviewForm;