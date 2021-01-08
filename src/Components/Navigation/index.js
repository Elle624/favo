import React, { useState } from "react";
import sortGlyphicon from "../../Assets/desc-sort-button.png";
import './Navigation.scss';



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
      <label htmlFor="search-input"class="label-input-search"></label>
      <input id="search-input" name="search-input" class="input-button-sort" type="text" value={keyWord} placeholder="i.e Boulder..." onChange={(e) => setKeyWord(e.target.value)}></input>
      <button class="button-search" type="submit" onClick={(searchPostings)}>search</button>

      <div class="container-button-sort"> 
        <button 
          onClick={sortPostings}
          className ="button-sort"
          value="sort"
          type="submit">sort<span aria-hidden="true" class="glyphicon"><img src={sortGlyphicon}/></span>
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