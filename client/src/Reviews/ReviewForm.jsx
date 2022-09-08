import React, { useState, useEffect } from "react";
import axios from 'axios';
import ReviewSelector from './ReviewRatingSelectors.jsx';

//renders the write new review form
const ReviewForm = ({itemId, setWriteReview, metaInfo, setDefaultList}) => {

  const [recommend, setRecommend] = useState(false);
  const [mainRating, setMainRating] = useState(0);
  const [photoUpload, setPhotoUpload] = useState([]);
  const [charRatings, setCharRatings] = useState({});
  const [reviewBody, setReviewBody] = useState('');
  const [imageForm, setImageForm] = useState(null);
  const [productName, setProductName] = useState('Loading..');

  useEffect(() => {
    axios.get(`/products/item`, {
      params: {
        product_id: itemId
      }
    })
      .then((response) => {
        setProductName(response.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  const submitReview = (e) => {
    e.preventDefault();

    axios.post('/review/post', {
      product_id: itemId,
      rating: mainRating,
      summary: e.target.summary.value,
      body: e.target.body.value,
      recommend: recommend,
      name: e.target.username.value,
      email: e.target.email.value,
      photos: photoUpload,
      characteristics: charRatings
    }).then(response => {
      setWriteReview(null)
      axios.get('/reviews', {
        params: {
          product_id: itemId,
          count: 40,
          sort: 'newest'
        }
      }).then(response => {
        setDefaultList(response.data.results);
      }).catch(err => {
        console.log('ReviewList err: ', err)
      })
    }).catch(err => console.log('post review error:', err))
  }

  const addImageForm = (e) => {
    e.preventDefault();
    setImageForm(
      <div id='review-image-form'>
        <span onClick={() => setImageForm(null)} style={{cursor: 'pointer', float: 'right'}}>X</span>
        Insert image link below:
        <br/>
        <form onSubmit={addPhoto}>
          <input type='text' name='imgUrl' style={{width: '400px'}} required data-testid="reviewImgInput"/>
          <input type='submit' value='Add image' style={{cursor: 'pointer'}}/>
        </form>
      </div>
    )
  }

  const addPhoto = (e) => {
    e.preventDefault();
    var photoCopy = photoUpload.slice();
    photoCopy.push(e.target.imgUrl.value);
    setPhotoUpload(photoCopy)
    setImageForm(null)
  }

  const clickCharRating = (e) => {
    var num = Number(e.target.value)
    var charsCopy = Object.assign({}, charRatings);
    charsCopy[e.target.name] = num;
    setCharRatings(charsCopy)
  }

  const bodyChange = (e) => {
    setReviewBody(e.target.value);
  }

  return (
    <div className='modal-background'>
      <div id='review-write-form'>
        <span onClick={() => setWriteReview(null)} style={{cursor: 'pointer', float: 'right'}}>X</span>
        <h3>Write Your Review</h3>
        <h5>About the {productName}</h5>
        <ReviewSelector metaInfo={metaInfo} mainRating={mainRating} setMainRating={setMainRating} setRecommend={setRecommend} clickCharRating={clickCharRating}/>
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
              <div key={photo} style={{display: 'inline', marginLeft: '5px'}} data-testid="reviewImage">
                <img  src={photo} style={{width: '40px', height: '40px', borderRadius: '15px', cursor: 'pointer'}}/>
              </div>
              )}
              )} {photoUpload.length < 5 ? <button onClick={addImageForm}>Add a photo!</button> : null }
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
        <div>{imageForm}</div>
      </div>
    </div>
  )
}

export default ReviewForm;