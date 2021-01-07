import React, { useState, useEffect } from "react";
import { apiCalls } from "../../apiCalls";
import "./PostingView.scss";

const PostingView = ({ match }) => {
  const [chosenPosting, setChosenPosting] = useState(null);
  const { id } = match.params;

  const getSinglePostingInfo = (id) => {
    apiCalls.getSinglePosting(id).then((data) => setChosenPosting(data));
  };

  useEffect(() => getSinglePostingInfo(id), []);

  if (chosenPosting) {
    const {
      date,
      name,
      organization,
      location,
      description,
      duration,
      openJobs,
    } = chosenPosting;

    const reformedDate = new Date(date)
      .toDateString()
      .split(" ")
      .slice(1)
      .join(" ");

    return (
      <section className="postings-container">
        <div className="postings-title-wrapper">
          <h1 className="postings-title">Event Details</h1>
        </div>
        <div className="posting-info-wrapper">
          <div className="posting-left-info-wrapper">
            <h3 className="event-title">{name}</h3>
            <div className="section-titles">
              <strong>
                <p className="posting-info-title">Description</p>
              </strong>
              <hr className="section-line" />
            </div>
            <p className="event-description">{description}</p>
            <div className="section-titles">
              <strong>
                <p className="posting-info-title">Open Positions</p>
              </strong>
              <hr className="section-line" />
            </div>
            <div className="posting-position-cards-wrapper">
              {openJobs.map((job) => (
                <section key={job.id} className="posting-positions-card">
                  <h3>{job.name}</h3>
                  <p>Open Spots: {job.numberOfSpots}</p>
                </section>
              ))}
            </div>
          </div>
          <div className="posting-right-info-wrapper">
            <h3 className="event-title">{reformedDate}</h3>
            <div className="posting-organization-wrapper">
              <strong>
                <p className="posting-info-title">Organization</p>
              </strong>
              <p>{organization}</p>
            </div>
            <div className="posting-location-wrapper">
              <strong>
                <p className="posting-info-title">Location</p>
              </strong>
              <p>{location}</p>
            </div>
            <div className="posting-duration-wrapper">
              <strong>
                <p className="posting-info-title">Duration</p>
              </strong>
              <p>{duration}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default PostingView;
