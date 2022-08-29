// the main component for related items. contains OutfitList and RelatedList components
import React from "react";
import {useEffect, useState} from 'react';
import ItemComparison from "./RelatedList/ItemComparison.jsx";
import RelatedList from "./RelatedList/RelatedList.jsx";
import Outfit from "./OutfitList/Outfit.jsx";
import OutfitList from "./OutfitList/OutfitList.jsx";

require("dotenv").config();

const API_KEY = process.env.AUTH_CODE;
const Axios = require('axios');

function Related = () => {
//global state variables
const [itemID] = useContext(ProductContext);
const [colorScheme] = useContext(ThemeContext);
const [productList, setProductList] = useState(null);
const [defaultData, setDefaultData] = useState(null);


  // get current product info
  Axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/$productId}`,
    headers: {
      Authorization: API_KEY
    },
  })
    .then((overviewData) => {
      //set default data as overviewData
      //axios 'get' call for 'related' to current product
    })
      .then((related) => {
        //PromiseAll
          //map related data with axios call for each
      })

  return (

    <div>
      <ItemComparison />
      <RelatedList defaultData={defaultData} productList={productList} colorScheme={colorScheme}/>
      <Outfit />
      <OutfitList defaultData={defaultData} colorScheme={colorScheme}/>
    </div>
  );

}

export default Related;