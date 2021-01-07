import React, { useState } from "react";
import sortGlyphicon from "../../Assets/sort-button.png";

const Navigation = ({ searchByKeyWord,  sortByDate}) => {
  const [keyWord, setKeyWord] = useState('');

  const searchPostings = (e) => {
    e.preventDefault();
    searchByKeyWord(keyWord)
    setKeyWord('');
  }

  const sortPostings = (e) => {
    e.preventDefault();
    sortByDate();
  }
  
  return(
    <section>
      <input type="text" value={keyWord} placeholder="i.e Boulder..." onChange={(e) => setKeyWord(e.target.value)}></input>
      <input type="submit" value="search" onClick={(searchPostings)}></input>
      <div class="btn-group sort-button-group pull-right"> 
        <button 
          onClick={(sortPostings)}
          className ="button-sort"
          value="sort"
          type="submit">Sort<span aria-hidden="true" class="glyphicon"><img src={sortGlyphicon}/></span>
        </button> 
      </div>
    </section>
  )

}

export default Navigation