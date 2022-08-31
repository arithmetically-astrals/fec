import React from "react";
import {useState, useEffect, useRef} from "react";
import OutfitListItem from './OutfitListItem.jsx';
// import styled from 'styled-components';
// import {TiArrowRightOutline, TiArrowLeftOutline} from 'react/icons/md';

const OutfitList = ({defaultData, productList, itemId, starRating}) => {
  const [showRight, setShowRight] = useState(true);
  const [slideLeft, setSlideLeft] = useState(0);
  const [storageChange, setStorageChange] = useState(false);
  const storedOutfits = Object.keys(localStorage);
  // const scrollRef = useRef();


  // const handleScrollLeft = () => {
    // setShowRight(true);
    // if (slideLeft - 200 < 0) {
    //   var leftover = 200 - slideLeft;
    // } else {
    //   var leftover = 200;
    // }
    // scrollRef.current.scrollLeft -= leftover;
    // setSlideLeft((scrollRef.current.scrollLeft -= leftover));
  // }

  // const handleScrollRight = () => {
    // const width = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

    // if (slideLeft + 200 > width) {
    //   setShowRight(false);
    //   var leftover = slideLeft + 300 - width;
    // } else {
    //   var leftover = 200;
    // }
    // scrollRef.current.scrollLeft += leftover;
    // setSlideLeft((scrollRef.current.scrollLeft += leftover));
// }

  useEffect(() => {

  })
  return (
    <div id='related-card-container'>
      {/* {slideLeft <  0 ? (<div id='related-left-arrow' onClick={handleScrollLeft}>&#8592;</div>) : ('')} */}
      <div id='related-left-arrow'>&#8592;</div>

      <div id='related-card-list' /*ref={scrollRef}*/>
        {storedOutfits.map((outfit) => {
          return <OutfitListItem key={outfit} eachOutfit={outfit} setStorageChange={setStorageChange} storageChange={storageChange} /*colorScheme={colorScheme}*//>
        })}
      </div>

      {/* {showRight ? (<div id='related-right-arrow' onClick={handleScrollRight()}>&#8594;</div>) : ('')} */}
      <div id='related-right-arrow'>&#8594;</div>

    </div>

  );

}

export default OutfitList;
