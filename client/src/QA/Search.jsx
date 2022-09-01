import React from "react";

const Search = (props) => (
  <div id='qa-search'>
    <input type="text" placeholder="Have a question? Search for answers…" onChange={(e) => {
      props.setSearch(e.target.value);
    }}></input>
  </div>
)

export default Search;