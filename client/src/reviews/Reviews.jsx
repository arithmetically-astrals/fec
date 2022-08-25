// the main component for reviews. contains form, list, and menu components as subcomponents
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import ReviewMenu from './ReviewMenu';
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

root.render(<Reviews />);