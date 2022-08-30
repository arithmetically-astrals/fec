import React from "react";
// import {useEffect, useContext, useState} from 'react';
import RelatedListItem from './RelatedListItem.jsx';
// import styled from 'styled-components';
// import {TiArrowRightOutline, TiArrowLeftOutline} from 'react/icons/md';

const RelatedList = ({defaultData, productList/*, colorScheme={colorScheme}*/}) => {


console.log('defaultData: ',defaultData, 'productList: ', productList);
  return (
    <div>
      {/* <LeftArrow/> */}
      <div>
        {productList.map((product) => {
          <RelatedListItem key={product.id} product={product} defaultData={defaultData} /*colorScheme={colorScheme}*//>
        })}
      </div>

      {/* <LeftArrow/> */}
    </div>

  )

}

export default RelatedList;
