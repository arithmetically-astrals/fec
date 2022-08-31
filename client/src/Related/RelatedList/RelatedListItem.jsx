import React from "react";
import {useEffect, useState, /*useContext*/} from 'react';

const axios = require('axios');

const RelatedListItem = ({itemId, product, defaultData, starRating}) => {
  // const [productId, setProductId] = useContext(ProductContext);
  const [showing, setShowing] = useState(null);
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    axios.get(`/products/styles`, {
      params: {
        product_id: itemId
      }
    })
      .then((imageData) => {
        setProductImage(imageData.data.results[0].photos[0].url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id='related-card'>
      <div id='related-star-button'>
        <div id='related-comparison'>
          </div>
      </div>
      <div onClick={() => {
        // setProductId(itemId);
      }}>
        <img src={productImage}
        style={{
        display: 'block',
        height: '300px',
        objectFit: 'cover',
        overflow: 'hidden',
        width: '100%',
        aspectRation: '16 / 9',
        }}
        />
        <div id='related-category'>{product.category}</div>
        <div id='related-product-name'>{product.name}</div>
        <div id='related-product-price'>{product.default_price}</div>
        <div id='related-product-rating'>{starRating} Stars</div>
      </div>
    </div>
  )

}
export default RelatedListItem;
