import React, { useState } from "react";

const Navigation = ({ searchByKeyWord, categories }) => {
  const [keyWord, setKeyWord] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  
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
        <select name="category" >
          <option selected value>-- select type --</option>
          {categories.map(category => (
            <option value={category}>{category}</option>
          ))}
          </select>
      </article>
    </section>
  )

}

export default Navigation