import React, { useState } from "react";

const Navigation = ({ postings }) => {
  const [keyWord, setKeyWord] = useState('');
  const [searchedPostings, setSearchedPostings] = useState([]);

  const searchPostings = (e) => {
    e.preventDefault();
    const lowerCaseKeyword = keyWord.toLowerCase();
    const filteredPostings = postings.filter(posting => posting.name.toLowerCase().includes(keyWord) || posting.organization.toLowerCase().includes(keyWord));
    setSearchedPostings(filteredPostings);
    setKeyWord('');
  }
  
  return(
    <section>
      <input type="text" value={keyWord} placeholder="keyword" onChange={(e) => setKeyWord(e.target.value)}></input>
      <input type="submit" value="search" onClick={searchPostings}></input>
    </section>
  )

}

export default Navigation