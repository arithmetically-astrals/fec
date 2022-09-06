import React, { useState, useEffect } from "react";
import axios from 'axios';

const LongDescription = (props) => {
  const [productInfo, setProductInfo] = useState(0)

  useEffect( () => {
    axios.get('/products/item', {
      params: {
        product_id: props.itemId
      }
    }).then(response => {
      setProductInfo(response.data);
    }).catch(err => {
      console.log('err: ', err)
    })
  },[props.itemId])

  return (
    <div id='overview-longdescription'>{productInfo.description}</div>
)}

export default LongDescription;