import React, { useState, useEffect } from "react";
import axios from 'axios';

//renders the write new review form
const ReviewForm = ({itemId, setWriteReview, metaInfo}) => {

  const closeReview = () => {
    setWriteReview(false);
  }

  const submitReview = (e) => {
    e.preventDefault();

    axios.post('/review/post', {
      product_id: itemId,
      rating: 5,
      summary: 'temp summary',
      body: 'temp body',
      reccomend: 'bool',
      name: 'temp username',
      email: 'temp@email.com',
      photos: ['array of photo urls'],
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


    closeReview();
  }


  return (
    <div id='review-write-form'>
      <h3>Write Your Review</h3>
      <h5>About the [Product Name Here]</h5>
      <form onSubmit={submitReview}>
        <span>Overall star rating goes here</span>
        <br/>
        <span>Do you reccomend this product?</span>
        <br/>
        Yes<input name='recommend' type='radio' required/>
        No <input name='recommend' type='radio' required/>
        <br/>
        <span>Size, Width, Comfort, Quality, Length, Fit ratings</span>
        <br/>
        Summary:
        <br/>
        <input type='text' maxLength='60' style={{width: '250px'}}></input>
        <br/>
        Review:
        <br/>
        <textarea minLength='50' maxLength='1000' style={{width: '400px', height: '250px', resize: 'none'}}required></textarea>
        <br/>
        <span>PHOTO UPLOADS GO HERE</span>
        <br/>
        What is your nickname?: <input type='text' maxLength='60' required></input>
        <br/>
        <span style={{fontSize: 'x-small'}}>For privacy reasons, do not use your full name or email address</span>
        <br/>
        Email: <input type='email' maxLength='60' required></input>
        <br/>
        <span style={{fontSize: 'x-small'}}>For authentication reasons, you will not be emailed</span>
        <br/>
        <input type='submit'></input>
      </form>
      <span onClick={closeReview} style={{cursor: 'pointer'}}>
       X</span>
    </div>
  )
}

export default ReviewForm;