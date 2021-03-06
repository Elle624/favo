import React from "react";
import { Link } from "react-router-dom";
import "./PostingCard.scss";

const PostingCard = ({ posting }) => {
  const { id, date, name, organization, openJobs } = posting;

  return (
    <Link data-testid="posting-card-element" className="posting-card" to={`/postings/${id}`}>
      <section data-testid="posting-card-container" key={id} className="posting-wrapper-cards">
        <div className="vertical">
          <div className="posting-data">
            <p className="posting-title left">Organization</p>
            <p className="posting-detail left">{organization}</p>
          </div>
          <div className="posting-data bottom">
            <p className="posting-title left">Event</p>
            <p className="posting-detail left">{name}</p>
          </div>
        </div>
        <div className="vertical">
          <div className="posting-data">
            <p className="posting-title right">Date</p>
            <p className="posting-detail right">{date}</p>
          </div>
          <div className="posting-data bottom">
            <p className="posting-title right">Open Position</p>
            <p className="posting-detail right">{openJobs.length}</p>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default PostingCard;
