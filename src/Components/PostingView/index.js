import React, { useState, useEffect } from "react";
import { apiCalls } from "../../apiCalls";
import "./PostingView.scss";

const PostingView = ({ match }) => {
  const eventId = match.params.id;
  const [chosenPosting, setChosenPosting] = useState(null);
  const [chosenJob, setChosenJob] = useState(null);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const getDetails = () => {
    Promise.all([apiCalls.getUser(), apiCalls.getSinglePosting(eventId)]).then(
      (data) => {
        let signedUpEvent;
        setUserInfo(data[0]);
        setChosenPosting(data[1]);
        if (userInfo) {
          signedUpEvent = userInfo.upcomingJobs.find(
            (job) => job.eventName === data[1].name
          );
        }
        if (signedUpEvent) {
          setHasSignedUp(true);
        }
      }
    );
  };

  const substractOpenPosition = () => {
    apiCalls.patchEventPosting(eventId, { jobId: chosenJob.id }).then(() => {
      postPositionToUser();
      setHasSignedUp(true);
      getDetails();
    });
  };

  const postPositionToUser = () => {
    const newUpcomingJob = {
      id: `1-${chosenJob.id}`,
      eventName: chosenPosting.name,
      positionName: chosenJob.name,
      date: chosenPosting.date,
    };
    apiCalls.postJobPosting(newUpcomingJob).then(() => {
      getDetails();
    });
  };

  useEffect(() => getDetails(eventId), userInfo);

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
                <section
                  onClick={() => setChosenJob(job)}
                  key={job.id}
                  className="posting-positions-card"
                >
                  <h3>{job.name}</h3>
                  <p>Open Spots: {job.numberOfSpots}</p>
                </section>
              ))}
            </div>
            <div className="submit-button-wrapper">
              <button
                onClick={substractOpenPosition}
                disabled={hasSignedUp ? true : false}
                className="submit-button"
              >
                SUBMIT
              </button>
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
