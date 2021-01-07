import React, { useState } from "react";

const Navigation = ({ searchByKeyWord }) => {
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
    </section>
  )

}

export default Navigation