import React from 'react';
import { screen, render, fireEvent, act, waitFor, getByText, waitForElement, getByTestId } from '@testing-library/react';
import App from './index.js';
import mockData from '../../TestData/_mockData';
import '@testing-library/jest-dom';
import { MemoryRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { apiCalls } from '../../apiCalls.js';
import _mockData from '../../TestData/_mockData';
jest.mock('../../apiCalls');

describe("App", () => {

  beforeEach(() => {
    apiCalls.getUser.mockResolvedValueOnce(_mockData.users[0]);
    apiCalls.getPostings.mockResolvedValueOnce(_mockData.events);
    apiCalls.getSinglePosting.mockResolvedValue(_mockData.events[1]);
    apiCalls.patchEventPosting.mockResolvedValueOnce("event-2", {jobId: "posting-4"});
    apiCalls.postJobPosting.mockResolvedValueOnce("event-2", _mockData.postJobBody);
  })

  it("App should be rendered on load and display loading before all data is fetched", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText("LOADIN\'...")).toBeInTheDocument()

    await act(() => Promise.resolve());
  })

  it("Should render User sidebar on load", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    await waitFor(() => expect(apiCalls.getUser).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByTestId("user-sidebar-element")).toBeInTheDocument());

    await act(() => Promise.resolve());
  })

  it("Should render Postings component on load", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    await waitFor(() => expect(apiCalls.getPostings).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByTestId("postings-element")).toBeInTheDocument());

    await act(() => Promise.resolve());
  })

  it("Should render Navigation component on load of the homepage", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByTestId("navigation-element")).toBeInTheDocument());

    await act(() => Promise.resolve());
  })

  it("When user click on an upcoming position he is redirected to a single event page", async () => {
    // apiCalls.getSinglePosting.mockResolvedValue(_mockData.events[1]);
    const history = createMemoryHistory();
    // history.push = jest.fn();

    render(
      <Router history={history}>
        <App />
      </Router>
    )
    
    const upcomingJob = await waitFor(() => screen.getByText("cook"));

    fireEvent.click(upcomingJob)

    await waitFor(() => expect(history.location.pathname).toBe("/postings/event-20"));
    await waitFor(() => expect(apiCalls.getSinglePosting).toHaveBeenCalledTimes(1));
    // screen.debug()
    await waitFor(() => expect(screen.getByTestId('posting-view-element')).toBeInTheDocument());
    // expect(history.push).toHaveBeenCalledWith('/postings/event-20')
    // await waitFor(() => {
    //   expect(history.location.pathname).toBe("/postings/event-20")
    //   expect(history.push).toHaveBeenCalledWith('/postings/event-2')
    //   expect(screen.getByTestId('posting-view-element')).toBeInTheDocument();
    // });

    // screen.debug()


    // await waitFor(() => {
      // expect(screen.getByTestId('posting-view-element')).toBeInTheDocument();
    // });

    await act(() => Promise.resolve());
  })

  it.only("When enters keyword in search it finds all events with this keyword", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => expect(apiCalls.getUser).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(apiCalls.getPostings).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByTestId("navigation-element")).toBeInTheDocument());

    const userInput = screen.getByPlaceholderText("i.e Boulder...");
    userEvent.type(userInput, 'Food Delivery');

    const searchbutton = screen.getByText("search");
    fireEvent.click(searchbutton);

    await waitFor(() => expect(screen.getByText("Food Delivery")).toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText("Something Else, LLC")).not.toBeInTheDocument())
  })
})
