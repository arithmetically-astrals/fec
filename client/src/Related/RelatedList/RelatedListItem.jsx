import React from "react";


const RelatedListItem = ({id, product, defaultData}) => {

  return (
    <div>
      {product.name} {product.default_price}
    </div>
  )

}
export default RelatedListItem;
