import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
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
    apiCalls.getSinglePosting.mockResolvedValueOnce(_mockData.events[1]);
  })

  it('should call getSinglePosting', async() => {
    const history = createMemoryHistory();
     render(
      <Router history={history}>
        <PostingView 
          match={{params:_mockData.events[1].id}} 
          getUserInfo={jest.fn()}
        />
      </Router>
    )

    await waitFor(() => expect(apiCalls.getSinglePosting).toHaveBeenCalledTimes(1))
  })

  it('should call getSinglePosting', async() => {
    const history = createMemoryHistory();
     render(
      <Router history={history}>
        <PostingView 
          match={{params:_mockData.events[1].id}} 
          getUserInfo={jest.fn()}
        />
      </Router>
    )

    await waitFor(() => expect(apiCalls.getUser).toHaveBeenCalledTimes(1))
  })

  it("should render correctly", async() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <PostingView 
          match={{params:_mockData.events[1].id}} 
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
    await waitFor(() => expect(screen.getByText("cook")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Open Spots: 2")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Feb 05 2021")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Organization")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Individual")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Category")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Healthcare")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Location")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("123 Goose Blv., Denver, CO, 80208")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Duration")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(3)).toBeInTheDocument());
  })
})