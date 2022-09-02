import React from "react";
import {useEffect, useState, /*useContext*/} from 'react';
import StarScale from '../../Shared/StarScale.jsx';

const OutfitListItem = ({eachOutfit, setStorageChange, storageChange, outfitStarRating, productImage}) => {

  const storageOutfit = JSON.parse(localStorage.getItem(eachOutfit));

  // useEffect(() => {}, [eachOutfit, storageChange]);

  return (
    <div>
      <div id='outfitlist-card'>
        <div id='outfitlist-delete-button'
        onClick={() => {
          setStorageChange(!storageChange);
          localStorage.removeItem(eachOutfit);
        }}>
        {/* <img src={'https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/cross-24-1024.png'}
        style={{
        position: 'absolute',
        font-size: '2em',
        top: '8px',
        right: '8px'
        }}
        /> */}
        X
        </div>

        <img src={productImage}
        style={{
        objectFit: 'cover',
        overflow: 'hidden',
        width: '100%',
        display: 'block',
        height: '300px',
        aspectRation: '16 / 9'
        }}
        />
        <div id='related-product-name'>{storageOutfit[1]}</div>
        <div id='related-category'>{storageOutfit[0]}</div>
        <div id='related-product-price'>${storageOutfit[2]}</div>
        {!outfitStarRating ? <div></div> : <div id='related-product-rating'>{StarScale(outfitStarRating={outfitStarRating})} </div>}
      </div>
    </div>

  );

}

export default OutfitListItem;
