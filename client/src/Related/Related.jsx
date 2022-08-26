// the main component for related items. contains OutfitList and RelatedList components
import React from "react";
import RelatedList from "./RelatedList/RelatedList.jsx";
// import Outfit from "./OutfitList/Outfit.jsx";
import OutfitList from "./OutfitList/OutfitList.jsx";

const Related = () => {

  return (
    <div>
      <RelatedList />
      {/* <Outfit /> */}
      <OutfitList />
    </div>
  )

}

export default Related;