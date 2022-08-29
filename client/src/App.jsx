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
    <div id='topNav'>
      logo and search
      <DarkModeToggle />
    </div>
    <div id='topMessage'>special message</div>

    <Overview />
    <Related itemId={itemId} setitemId={setitemId} starRating={starRating}/>
    <QA />
    <Reviews itemId={itemId}  starRating={starRating} setstarRating={setstarRating} />
    <div>
      REMOVE THESE BUTTONS WHEN YOU CAN CLICK ON OTHER ITEMS!
      <button onClick={() => {setitemId(37311)}}>37311</button>
      <button onClick={() => {setitemId(37312)}}>37312</button>
      <button onClick={() => {setitemId(37313)}}>37313</button>
      <button onClick={() => {setitemId(37314)}}>37314</button>
      <button onClick={() => {setitemId(37315)}}>37315</button>
      THEY ARE JUST TO TEST SWAPPING BETWEEN ITEM IDS!
    </div>
  </div>
}

root.render(<App />);