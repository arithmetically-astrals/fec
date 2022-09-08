import React from "react";
import {useState /*useContext*/} from "react";
// import AddItemCard from './additemimage.png';

const AddOutfitCard = ({defaultData, rating, setStorageChange, storageChange,productImage}) => {

  const savedData = [
    defaultData.category,
    defaultData.name,
    defaultData.default_price,
    rating,
    productImage,
  ];

  return (
    <div id='outfitlist-addcard'
      onClick={() => {
        localStorage.setItem(`${defaultData.id}`, JSON.stringify(savedData));
        setStorageChange(!storageChange);
      }}
    >
      <img src={`https://pic.onlinewebfonts.com/svg/img_514215.png`}
      {/*https://cdn.icon-icons.com/icons2/1875/PNG/512/additem_120286.png*/}
        style={{
        objectFit: 'cover',
        overflow: 'hidden',
        width: '100%',
        display: 'block',
        height: '300px',
        aspectRation: '16 / 9'
        }}
        />
        <div id='outfitlist-addcard-text'>Add to Outfit</div>
    </div>
  );

}

export default AddOutfitCard;