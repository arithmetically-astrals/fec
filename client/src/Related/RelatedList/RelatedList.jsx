import React from "react";
import {useState, useRef} from "react";
import RelatedListItem from './RelatedListItem.jsx';
// import styled from 'styled-components';
// import {TiArrowRightOutline, TiArrowLeftOutline} from 'react/icons/md';

const RelatedList = ({defaultData, productList}) => {
  const [showRight, setShowRight] = useState(true);
  const [slideLeft, setSlideLeft] = useState(0);

  const scrollRef = useRef();


  const handleScrollLeft = () => {
    setShowRight(true);
    if (slideLeft - 200 <= 0) {
      var leftover = 200 - slideLeft;
    } else {
      var leftover = 200;
    }
    scrollRef.current.scrollLeft -= leftover;
    setSlideLeft((scrollRef.current.scrollLeft -= leftover));
  }

  const handleScrollRight = () => {
    const width = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

    if (slideLeft + 200 >= width) {
      setShowRight(false);
      var leftover = slideLeft + 300 - width;
    } else {
      var leftover = 200;
    }
    scrollRef.current.scrollLeft += leftover;
    setSlideLeft((scrollRef.current.scrollLeft += leftover));
}

  return (
    <div id='related-card-container'>
      {slideLeft >  0 ? (<div id='related-left-arrow' onClick={() => {handleScrollLeft();}}>&#8592;</div>) : ('')}

      <div id='related-card-list' ref={scrollRef}>
        {productList.map((product) => {
          return <RelatedListItem key={product.id} itemId={product.id} product={product} defaultData={defaultData} />
        })}
      </div>

      {showRight ? (<div id='related-right-arrow' onClick={() => {handleScrollRight()}}>&#8594;</div>) : ('')}

    </div>

  );

}

export default RelatedList;
