import React from "react";
// import {useEffect, useContext, useState} from 'react';
import RelatedListItem from './RelatedListItem.jsx';
// import styled from 'styled-components';
// import {TiArrowRightOutline, TiArrowLeftOutline} from 'react/icons/md';

const RelatedList = ({defaultData, productList/*, colorScheme={colorScheme}*/}) => {


// console.log('defaultData: ',defaultData, 'productList: ', productList);

  return (
    <div id='related-card-container'>
      <div id='related-left-arrow'>&#8592;</div>
      <div id='related-card-list'>
        {productList.map((product) => {
          return <RelatedListItem key={product.id} itemId={product.id} product={product} defaultData={defaultData} /*colorScheme={colorScheme}*//>
        })}
      </div>
      <div id='related-right-arrow'>&#8594;</div>
    </div>

  )

}

export default RelatedList;
