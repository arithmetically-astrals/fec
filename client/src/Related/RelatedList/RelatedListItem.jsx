import React from "react";
import {useEffect, useState, /*useContext*/} from 'react';
import StarScale from '../../Shared/StarScale.jsx';

const axios = require('axios');

const RelatedListItem = ({itemId, product, defaultData}) => {
  // const [productId, setProductId] = useContext(ProductContext);
  const [showing, setShowing] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [relatedStarRating, setRelatedStarRating] = useState(0);

  useEffect(() => {
    axios.get(`/products/styles`, {
      params: {
        product_id: itemId
      }
    })
      .then((imageData) => {
        setProductImage(imageData.data.results[0].photos[0].url);
        axios.get('/reviews/meta', {
            params: {
              product_id: itemId
            }
          })
          .then(response => {
            var totalStar = 0
            var totalVal = 0
            for (var key in response.data.ratings) {
              totalStar += (Number(response.data.ratings[key]) * Number(key));
              totalVal += Number(response.data.ratings[key]);
            }
            setRelatedStarRating((totalStar / totalVal).toFixed(1));
          })
      })
          .catch(err => {
            console.log(err);
          })
  }, [itemId]);

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
        <div id='related-product-rating'>{StarScale(relatedStarRating)} </div>
      </div>
    </div>
  )

}
export default RelatedListItem;
