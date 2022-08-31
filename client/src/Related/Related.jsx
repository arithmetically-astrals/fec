// the main component for related items. contains OutfitList and RelatedList components
import React from "react";
import {useEffect, useContext, useState} from 'react';
import RelatedTitle from './RelatedList/RelatedTitle.jsx';
// import ItemComparison from "./RelatedList/ItemComparison.jsx";
import RelatedList from "./RelatedList/RelatedList.jsx";
import OutfitTitle from './OutfitList/OutfitTitle.jsx';
// import Outfit from "./OutfitList/Outfit.jsx";
// import OutfitList from "./OutfitList/OutfitList.jsx";
import App from '../App.jsx';

import axios from 'axios';

function Related({itemId, starRating}) {
  //global state variables
  // const [itemID] = useContext(App);
  // const [colorScheme] = useContext(ThemeContext);

  const [productList, setProductList] = useState(null);
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {

    // get current product information
    axios.get(`/products/item`, {
      params: {
        product_id: itemId
      }
    })  //...then set default data state with response data
      .then(overviewData => {
        setDefaultData(overviewData.data);
        //get related items to current product
        axios.get(`/products/relatedlist`, {
          params: {
            product_id: itemId
          }
        })//...then map relatedList items, converting relatedItems array into Promise
          .then((relatedList) => {
            Promise.all(
              relatedList.data.map((relatedListItem) =>
                axios.get(`/products/item`, {
                  params: {
                    product_id: relatedListItem
                  }
                })
                  .then((relatedListItemResponse) => relatedListItemResponse.data)),//end mapping
            )//end of Promise.all, now set state of ProductList with relatedList
              .then((prodList) => {
                setProductList(prodList);
              })
              .catch(err => {
                console.log(err);
              });
          })
      })
    },[itemId]);

    if(!productList) {
      return (
        <div>Loading reviews...</div>
      )
    } else {
      return (

        <div id='related' className='widget'>
          <RelatedTitle/>
          {/* <ItemComparison />*/}
          <RelatedList defaultData={defaultData} productList={productList} itemId={itemId} /*colorScheme={colorScheme}*//>
          <OutfitTitle />
          {/*<OutfitList defaultData={defaultData} colorScheme={colorScheme}/> */}
        </div>
      );
    }




}

export default Related;
