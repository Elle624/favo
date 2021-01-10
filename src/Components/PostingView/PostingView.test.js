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

  // it("should render correctly", async() => {
  //   const history = createMemoryHistory();
  //   render(
  //     <Router history={history}>
  //       <PostingView 
  //         match={{params:_mockData.events[1].id}} 
  //         getUserInfo={jest.fn()}
  //       />
  //     </Router>
  //   )

  //   await waitFor(() => expect(history.location.pathname).toBe("/postings/event-2"));
  // })
})