import React, { useState, useEffect } from "react";
import axios from 'axios';

const LongDescription = ({itemId}) => {
  const [metaInfo, setmetaInfo] = useState(0)

  useEffect( () => {
    axios.get('/products/item', {
      params: {
        product_id: itemId
      }
    }).then(response => {
      setmetaInfo(response.data);
    }).catch(err => {
      console.log('err: ', err)
    })
  },[itemId])

  return (
    <div id='overview-longdescription'>{metaInfo.description}</div>
)}

export default LongDescription;