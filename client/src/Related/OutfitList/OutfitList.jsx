import React from "react";
import {useState, useRef, useEffect /*useContext*/} from "react";
import OutfitListItem from './OutfitListItem.jsx';
import AddOutfitCard from './AddOutfitCard.jsx';
import StarScale from '../../Shared/StarScale.jsx';

const axios = require('axios');

const OutfitList = ({defaultData}) => {
  const [showRight, setShowRight] = useState(true);
  const [slideLeft, setSlideLeft] = useState(0);
  const [outfitStarRating, setOutfitStarRating] = useState(null);
  const [storageChange, setStorageChange] = useState(false);
  const [productImage, setProductImage] = useState(null);

  const scrollRef = useRef();
  const storedOutfits = Object.keys(localStorage);

  // useEffect(() => {}, [storageChange]);

  useEffect(() => {
    axios.get(`/products/styles`, {
      params: {
        product_id: defaultData.id
      }
    })
      .then((imageData) => {
        if(!imageData.data.results[0].photos[0].url){
          setProductImage(`https://www.tallusridge.com/wp-content/uploads/2019/08/650x600.jpg`);
        } else {
          setProductImage(imageData.data.results[0].photos[0].url);
        }
        axios.get('/reviews/meta', {
            params: {
              product_id: defaultData.id
            }
          })
          .then(response => {
            var totalStar = 0
            var totalVal = 0
            for (var key in response.data.ratings) {
              totalStar += (Number(response.data.ratings[key]) * Number(key));
              totalVal += Number(response.data.ratings[key]);
            }
            if (totalVal === 0) {
              setOutfitStarRating(null);
            } else {
              setOutfitStarRating((totalStar / totalVal).toFixed(1));
            }
          })
      })
      .catch(err => {
        console.log(err);
      })
  }, [defaultData]);

  const handleScrollLeft = () => {
    setShowRight(true);
    if (slideLeft - 200 <= 0) {
      var leftover = 200 - slideLeft;
    } else {
      var leftover = 200;
    }
    scrollRef.current.scrollLeft -= leftover;
    setSlideLeft((scrollRef.current.scrollLeft -= leftover));
  }

  const handleScrollRight = () => {
    const width = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

    if (slideLeft + 200 >= width) {
      setShowRight(false);
      var leftover = slideLeft + 300 - width;
    } else {
      var leftover = 200;
    }
    scrollRef.current.scrollLeft += leftover;
    setSlideLeft((scrollRef.current.scrollLeft += leftover));
}

  return (
    <div id='outfitlist-container'>
      <div id='outfitlist-add-card-container'>
        <AddOutfitCard id='outfitlist-add-card' defaultData={defaultData} rating={outfitStarRating} setStorageChange={setStorageChange} storageChange={storageChange} productImage={productImage}/>
      </div>

      <div id='related-card-container'>
        {slideLeft >  0 ? (<div id='related-left-arrow' onClick={() => {handleScrollLeft();}}>&#8592;</div>) : ('')}

        <div id='related-card-list' ref={scrollRef}>
        {storedOutfits.map((eachOutfit) => {
          return <OutfitListItem key={eachOutfit} itemId={defaultData.id} defaultData={defaultData} storageChange={storageChange} setStorageChange={setStorageChange} eachOutfit={eachOutfit}/>
        })}
        </div>

        {showRight ? (<div id='related-right-arrow' onClick={() => {handleScrollRight()}}>&#8594;</div>) : ('')}

      </div>


    </div>


  );

}

export default OutfitList;
