import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import PostingCard from './index.js';
import mockData from '../../TestData/_mockData';
import '@testing-library/jest-dom';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe("PostingCard", () => {

  it("PostingCard should render correctly", () => {
    const postingData = mockData.events[0];

    render(
      <PostingCard 
          posting={postingData}
          key={postingData.id}
        />, {wrapper: MemoryRouter}
    )
    
    expect(screen.getByText("Event")).toBeInTheDocument();
    expect(screen.getByText("Something Crazy")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("2021/03/01")).toBeInTheDocument();
    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("Something Else, LLC")).toBeInTheDocument();
    expect(screen.getByText("Open Position")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  })

  it("It shouls redirect to the single event page on click", async() => {
    const history = createMemoryHistory();
    const postingData = mockData.events[0];

    render(
      <Router history={history}>
        <PostingCard 
          posting={postingData}
          key={postingData.id}
        />
      </Router>
    );
    
    const jobName = screen.getByText("Something Crazy");
    userEvent.click(jobName);

    await waitFor(() => expect(history.location.pathname).toBe("/postings/event-20"));
  })
})