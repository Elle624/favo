import React from "react";

const User = ({ info }) => {
  const {
    id,
    name,
    rating,
    profilePicture,
    volunteeredHours,
    upcomingJobs,
  } = info;
  return (
    <section id={id}>
      <div className="profile-picture">
        <img src={profilePicture} />
      </div>
      <h3 className="username">{name}</h3>
      <div className="rating-wrapper">{rating}</div>
      <div className="section-titles">
        <p>Total Hours Volunteered</p>
        <span className="section-line"></span>
      </div>
      <div className="hours-bar">
        <p>{volunteeredHours}</p>
      </div>
      <div className="section-titles">
        <p>My Upcoming Jobs</p>
        <span className="section-line"></span>
      </div>
      {upcomingJobs.map((job) => {
        return (
          <section key={job.id} className="upcoming-job-card">
            <h3>{job.eventName}</h3>
            <h4>{job.positionName}</h4>
          </section>
        );
      })}
    </section>
  );
};

export default User;
