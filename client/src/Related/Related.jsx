// the main component for related items. contains OutfitList and RelatedList components
import React from "react";
import {useEffect, useContext, useState} from 'react';
import RelatedTitle from './RelatedList/RelatedTitle.jsx';
import RelatedList from "./RelatedList/RelatedList.jsx";
import OutfitTitle from './OutfitList/OutfitTitle.jsx';
import OutfitList from "./OutfitList/OutfitList.jsx";
import App from '../App.jsx';

import axios from 'axios';

function Related({itemId, starRating, setitemId}) {

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
              //   //filtering duplicates from the productList
              //   const uniqueList = [];
              //   const uniqueProducts = prodList.filter(eachProduct => {
              //     const isDuplicate = uniqueList.includes(eachProduct.id);
              //     if(!isDuplicate) {uniqueList.push(eachProduct);
              //     return true;
              //     }
              // })
              // setProductList(uniqueList);
              setProductList(prodList);
            })
                setProductList(prodList);
              })
              .catch(err => {
                console.log(err);
              });
          })
      })
    },[itemId]);

    if(!productList || !defaultData) {
      return (
        <div>Loading reviews...</div>
      )
    } else {
      return (

        <div id='related' className='widget'>
          <RelatedTitle/>
          <RelatedList defaultData={defaultData} productList={productList} setitemId={setitemId} />
          <OutfitTitle />
          <OutfitList defaultData={defaultData} />
        </div>
      );
    }




}

export default Related;
