import React from 'react';
import './postings.scss';
import PostingCard from '../PostingCard';

const Postings = ({ postings }) => {
  const postingCards = postings.map(posting => (
    <PostingCard posting={posting}/>
  ))
return (
  <section className="postings-container">
    <div className="postings-title-wrapper">
      <h1 className="postings-title">Open Volunteer Positions</h1>
    </div>
    <section className="postings-wrapper">
      {postingCards}
    </section>
  </section>
)
}

export default Postings