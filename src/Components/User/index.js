import React from "react";
import "./User.scss";
import starImage from "../../Assets/star.png";
const User = ({ info }) => {
  const {
    id,
    name,
    profilePicture,
    volunteeredHours,
    upcomingJobs,
  } = info;
  return (
    <section className="user-wrapper" id={id}>
      <div
        className="profile-picture"
        style={{
          backgroundImage: `url(${profilePicture})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-reapeat",
        }}
      ></div>
      <h3 className="username">{name}</h3>
      <div className="rating-wrapper">
        <img className="star-image" src={starImage} alt="star-icon"/>
        <img className="star-image" src={starImage} alt="star-icon"/>
        <img className="star-image" src={starImage} alt="star-icon"/>
        <img className="star-image" src={starImage} alt="star-icon"/>
        <img className="star-image" src={starImage} alt="star-icon"/>
      </div>
      <div className="section-titles">
        <p>Total Hours Volunteered</p>
        <hr className="section-line" />
      </div>
      <div className="hours-bar">
        <p>{volunteeredHours} Hours</p>
      </div>
      <div className="section-titles">
        <p>My Upcoming Jobs</p>
        <hr className="section-line" />
      </div>
      <div className="upcoming-job-cards-wrapper">
        {upcomingJobs.map((job) => {
          return (
            <section key={job.id} className="upcoming-job-card">
              <div className="event-info-wrapper">
                <h3>{job.positionName}</h3>
                <h4>{job.date}</h4>
              </div>
              <h4>{job.eventName}</h4>
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default User;
