import React from 'react';
import './postings.scss';
import PostingCard from '../PostingCard';

const Postings = ({ postings }) => {
  const postingCards = postings.map(posting => (
    <PostingCard posting={posting}/>
  ))
return <section>{postingCards}</section>
}

export default Postings