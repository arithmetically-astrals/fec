import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Overview from "./Overview/Overview.jsx";
import QA from "./QA/QA.jsx";
import Related from "./Related/Related.jsx";
import Reviews from "./Reviews/Reviews.jsx";
import DarkModeToggle from "./Shared/DarkModeToggle.jsx";

const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = () => {
  const [itemId, setitemId] = useState(37311);
  const [starRating, setstarRating] = useState(0);

  return <div id='appContainer'>
    <DarkModeToggle />
    <Overview id='overview' />
    <Related id='related' />
    <QA id='qa' />
    <Reviews itemId={itemId}  starRating={starRating} setstarRating={setstarRating} id='reviews' />
  </div>
}

root.render(<App />);