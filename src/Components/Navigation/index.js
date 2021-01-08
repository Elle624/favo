import React, { useState } from "react";
import sortGlyphicon from "../../Assets/sort-button.png";




const Navigation = ({ searchByKeyWord, categories, filterByCategory, sortByDate}) => {
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
    <section className="navigation-bar">
      <input class="input-button-sort" type="text" value={keyWord} placeholder="i.e Boulder..." onChange={(e) => setKeyWord(e.target.value)}></input>
      <input class="button-search" type="submit" value="search" onClick={(searchPostings)}></input>
      <div class="container-button-sort"> 
        <button 
          onClick={sortPostings}
          className ="button-sort"
          value="sort"
          type="submit">Sort<span aria-hidden="true" class="glyphicon"><img src={sortGlyphicon}/></span>
        </button> 
      </div>
      <article className="container-button-filter">
        <select className="filter-box" name="category" onChange={(e) => filterByCategory(e.target.value)}>
          <option className="filter-item" defaultValue>-- select category --</option>
          {categories.map(category => (
            <option 
              className="filter-item"
              value={category} 
              key={`1-${category}`}
            >{category}</option>
          ))}
          </select>
      </article>
    </section>
  )

}

export default Navigation