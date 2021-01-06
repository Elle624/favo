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
    <section>
      <div className="profile-picture">
        <img src={profilePicture} />
      </div>
      <h3 className="username">{name}</h3>
      <div className="rating-wrapper">{rating}</div>
      <div className="section-titles">
        <p>Total Hours Volunteered</p>
      </div>
      <div className="section-titles">
        <p>My Upcoming Jobs</p>
      </div>
    </section>
  );
};

export default User;
