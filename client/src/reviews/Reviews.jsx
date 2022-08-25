// the main component for reviews. contains form, list, and menu components as subcomponents
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import ReviewList from './ReviewList.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewMenu from './ReviewMenu.jsx';
const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const Reviews = () => {
  return (
  <div>
    <ReviewMenu />
    <ReviewList />
    <ReviewForm />
  </div>
  )
}

export default Reviews;