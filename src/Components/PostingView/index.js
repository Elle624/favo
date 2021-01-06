import React, { useState, useEffect } from "react";
import { apiCalls } from "../../apiCalls";

const PostingView = ({ match }) => {
  const [chosenPosting, setChosenPosting] = useState(null);
  const { id } = match.params;
  
  const getSinglePostingInfo = (id) => {
    apiCalls.getSinglePosting(id).then((data) => setChosenPosting(data))
  }

  useEffect(() => getSinglePostingInfo(id), []);

  if( chosenPosting ) {
    const { date, name, organization, location, description, duration, openJobs } = chosenPosting;

    return (
      <section className="postings-container">
        <div className="postings-title-wrapper">
          <h1 className="postings-title">Event Details</h1>
        </div>
        <div> 
          <h3>{name}</h3> 
          <p>{description}</p>
          <div>
            {openJobs.map(job => (
              <section key={job.id}>
                <h3>{job.name}</h3>
                <p>Open Spots: {job.numberOfSpots}</p>
              </section>
            ))}
          </div>
        </div>
        <div> 
          <h3>{date}</h3>
          <p>Organization: {organization}</p>
          <p>Location:</p>
          <p>{location}</p>
          <p>{duration}</p>
        </div>
      </section>
    )
  } 
  return null
  
}

export default PostingView