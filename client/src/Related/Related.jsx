// the main component for related items. contains OutfitList and RelatedList components
import React from "react";
import {useEffect, useContext, useState} from 'react';
import ItemComparison from "./RelatedList/ItemComparison.jsx";
import RelatedList from "./RelatedList/RelatedList.jsx";
// import Outfit from "./OutfitList/Outfit.jsx";
import OutfitList from "./OutfitList/OutfitList.jsx";
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
                setProductList(() => (prodList));
              })
              .catch(err => {
                console.log(err);
              });
          })
      })
    },[itemId]);

    if(!productList) {
      return null;
    }
    if(!defaultData) {
      return null;
    }

 return (

      <div id='related' className='widget'>
        {/* <ItemComparison />*/
        <RelatedList defaultData={defaultData} productList={productList} /*colorScheme={colorScheme}*//>
       /* <Outfit />
        <OutfitList defaultData={defaultData} colorScheme={colorScheme}/> */}
      </div>
    );

}

export default Related;
