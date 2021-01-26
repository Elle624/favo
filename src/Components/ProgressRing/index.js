import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProgressRing.scss";
import { Chart } from "react-google-charts";

const ProgressRing = ({ volunteeredHours, completedJobs }) => {

  const completedJobDuplicateChecker = completedJobs.reduce((cleanArrayOfJobs, job) => {
    if(!cleanArrayOfJobs[job.positionName]) {
      cleanArrayOfJobs[job.positionName] = job.duration;
    } else {
      cleanArrayOfJobs[job.positionName] += job.duration;
    }
    return cleanArrayOfJobs;
  }, {})

  const createJobsDataForChart = Object.entries(completedJobDuplicateChecker);

  let postingsHoursChartData = [['Task', 'Hours per posting'], ...createJobsDataForChart];

  return (
    <section className="donut_single">
      <Chart
        className="progress-ring"
        width={'280px'}
        height={'280px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={postingsHoursChartData}
        options={{
          pieHole: 0.7,
          legend: 'none',
          pieSliceText: 'none',
        }}
        rootProps={{ 'data-testid': 'progress-ring' }}
      />
      <text className="progress-ring-text" id="percentage">{volunteeredHours}hr</text>
    </section>
  )
}

export default ProgressRing;