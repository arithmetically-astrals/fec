import React from "react";
// import {useEffect, useContext, useState} from 'react';
import RelatedListItem from './RelatedListItem.jsx';
// import styled from 'styled-components';
// import {TiArrowRightOutline, TiArrowLeftOutline} from 'react/icons/md';

const RelatedList = ({defaultData, productList/*, colorScheme={colorScheme}*/}) => {


console.log('defaultData: ',defaultData, 'productList: ', productList);
  return (
    <div id='related-list-container'>
      <div>This is a left arrow</div>
      {/* <LeftArrow/> */}
      <div>
        {productList.map((product) => {
          return <RelatedListItem key={product.id} id={product.id} product={product} defaultData={defaultData} /*colorScheme={colorScheme}*//>
        })}
      </div>
      <div>This is a right arrow</div>
      {/* <RightArrow/> */}
    </div>

  )

}

export default RelatedList;
