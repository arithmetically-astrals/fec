import React, { useState, useEffect } from "react";

//renders the write new review form
const ReviewForm = ({setWriteReview, metaInfo}) => {

  const closeReview = () => {
    setWriteReview(false);
  }

  const submitReview = (e) => {
    e.preventDefault();




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
        Summary: <input type='text' maxLength='60'></input>
        <br/>
        Review: <textarea minLength='50' maxLength='1000' required></textarea>
        <br/>
        <span>PHOTO UPLOADS GO HERE</span>
        <br/>
        What is your nickname?: <input type='text' maxLength='60' required></input>
        <br/>
        <span>For privacy reasons, do not use your full name or email address</span>
        <br/>
        Email: <input type='email' maxLength='60' required></input>
        <br/>
        <span>For authentication reasons, you will not be emailed</span>
        <br/>
        <input type='submit'></input>
      </form>
      <span onClick={closeReview} style={{cursor: 'pointer'}}>
       X</span>
    </div>
  )
}

export default ReviewForm;