import React, { useState, useEffect } from "react";
import axios from 'axios';
import StarScale from "../shared/StarScale.jsx";

// This function returns a DOM element with the key details of the product listed
const Details = ({itemId = 37311}) => {
  const [metaInfo, setmetaInfo] = useState(0)
  const [starCount, setstarCount] = useState(0)

  useEffect( () => {
    axios.get('/products/item', {
      params: {
        product_id: itemId
      }
    }).then(response => {
      setmetaInfo(response.data);
      var totalStar = 0
      var totalVal = 0
      for (var key in response.data.ratings) {
        totalStar += (Number(response.data.ratings[key]) * Number(key));
        totalVal += Number(response.data.ratings[key]);
      }
      setstarRating((totalStar / totalVal).toFixed(1));
      setstarCount(totalVal);
    }).catch(err => {
      console.log('err: ', err)
    })
  },[itemId])

  return (
    <div id='overview-infopanel-details'>
      <StarScale />
      <div id='overview-infopanel-details-name'>
        {metaInfo.name}
      </div>
      <div id='overview-infopanel-details-price'>
        ${metaInfo.default_price}
      </div>
    </div>
  )
}

export default Details;