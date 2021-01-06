import React from 'react';
import './postingCard.scss';

const PostingCard = ({ posting }) => {
  const { id, date, name, organization, openJobs } = posting; 

  return (
    <section key={id}>
      <div className="horizontal">
        <div className="posting-data">
          <p className="posting-title">Organization</p>
          <p>{organization}</p>
        </div>
        <div className="posting-data">
          <p className="posting-title">Date</p>
          <p>{date}</p>
        </div>
      </div>
      <div className="horizontal">
        <div className="posting-data">
          <p className="posting-title">Event</p>
          <p>{name}</p>
        </div>
        <div className="posting-data">
          <p className="posting-title">Open Position</p>
          <p>{openJobs.length}</p>
        </div>
      </div>
    </section>
  )

}

export default PostingCard;
