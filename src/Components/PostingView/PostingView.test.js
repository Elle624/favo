import '@testing-library/jest-dom';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _mockData from '../../TestData/_mockData';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import PostingView from '../PostingView';
import { apiCalls } from '../../apiCalls';
jest.mock('../../apiCalls');

describe("PostingView Comonent", () => {

  beforeEach(() => {
    apiCalls.getUser.mockResolvedValueOnce(_mockData.users[0]);
    apiCalls.getSinglePosting.mockResolvedValue(_mockData.events[1])
    apiCalls.patchEventPosting.mockResolvedValueOnce("event-2", {jobId: "posting-4"});
    apiCalls.postJobPosting.mockResolvedValueOnce("event-2", _mockData.postJobBody);
  })

  it('should call getSinglePosting', async() => {
    const history = createMemoryHistory();
     render(
      <Router history={history}>
        <PostingView 
          match={_mockData.eventId} 
          getUserInfo={jest.fn()}
        />
      </Router>
    )

    await waitFor(() => expect(apiCalls.getSinglePosting).toHaveBeenCalledTimes(1));
    await act(() => Promise.resolve());
  })

  it('should call getSinglePosting', async() => {
    const history = createMemoryHistory();
     render(
      <Router history={history}>
        <PostingView 
          match={_mockData.eventId} 
          getUserInfo={jest.fn()}
        />
      </Router>
    )

    await waitFor(() => expect(apiCalls.getUser).toHaveBeenCalledTimes(1));
    await act(() => Promise.resolve());
  })

  it("should render correctly", async() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <PostingView 
          match={_mockData.eventId} 
          getUserInfo={jest.fn()}
        />
      </Router>
    )

    await waitFor(() => expect(screen.getByText("Event Details")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Food Delivery")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Description")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Deliver food for a memorial hospital")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Open Positions")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("driver")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Open Spots: 2")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("cook")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Open Spots: 3")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Sign me up!")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Feb 05 2021")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Organization")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Individual")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Category")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Healthcare")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Location")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("123 Goose Blv., Denver, CO, 80208")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Duration")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(3)).toBeInTheDocument());
    await act(() => Promise.resolve());
  })

  it("should be able to sign up for one job per event", async() => {
    apiCalls.getSinglePosting.mockResolvedValue(_mockData.updatedEvent);
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <PostingView 
          match={_mockData.eventId}
          getUserInfo={jest.fn()}
        />
      </Router>
    )
    await waitFor(() => screen.getByText("driver").click());
    await waitFor(() => screen.getByRole("button", {name: "Sign me up!"}).click());
    
    await waitFor(() => expect(screen.getByText("Open Spots: 1")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Sign me up!")).toHaveAttribute("disabled"));

    await waitFor(() => expect(screen.queryByRole("button", {name: "Sign me up!"})).not.toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("You have already signed up for this event!")).toBeInTheDocument());

    await act(() => Promise.resolve());
  })
})