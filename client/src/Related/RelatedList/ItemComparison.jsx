import React from "react";

const ItemComparison = ({product, defaultData, show, setShow}) => {

  const allFeatures = product.features.concat(defaultData.features)

  if(!show) {
    return null;
  }

  return (
    <div onClick={() => {setShow(!show);}}>
      <div id='related-background-modal' show={show}>
        <div id='related-modal'>
          <table>
            <thead>
              <tr>
                <th>Comparison</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>{defaultData.name}</th>
                <th>Features</th>
                <th>{product.name}</th>
              </tr>
            </thead>
            <tbody>
              {allFeatures.map((feature) => {
                return (
                  <tr>
                    <th>
                      {defaultData.features.some((each) => each === feature) ? <div id='related-checkmark'>&#x2714;</div> : ''}
                    </th>
                    <th>
                      {feature.feature}
                      {feature.value ? `: ${feature.value}` : ''}
                    </th>
                    <th>
                      {product.features.some((each) => each === feature) ? <div id='related-checkmark'>&#x2714;</div> : ''}
                    </th>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}
export default ItemComparison;