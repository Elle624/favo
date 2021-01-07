import React, { useState } from "react";

const Navigation = ({ searchByKeyWord, categories, filterByCategory }) => {
  const [keyWord, setKeyWord] = useState('');

  const searchPostings = (e) => {
    e.preventDefault();
    searchByKeyWord(keyWord)
    setKeyWord('');
  }

  return(
    <section>
      <input type="text" value={keyWord} placeholder="i.e Boulder..." onChange={(e) => setKeyWord(e.target.value)}></input>
      <input type="submit" value="search" onClick={(searchPostings)}></input>
      <article>
        <select name="category" onChange={(e) => filterByCategory(e.target.value)}>
          <option defaultValue>-- select category --</option>
          {categories.map(category => (
            <option 
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