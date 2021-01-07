import React, { useState } from "react";

const Navigation = ({ postings }) => {
  const [keyWord, setKeyWord] = useState('');
  const [searchedPostings, setSearchedPostings] = useState([])

  return(
    <section>
      <input type="text" value={keyWord} placeholder="keyword"></input>
      <input type="submit" value="search"></input>
    </section>
  )

}

export default Navigation