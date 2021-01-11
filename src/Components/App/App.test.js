import React from 'react';
import { screen, render, fireEvent, act, waitFor, getByText, waitForElement, simulate } from '@testing-library/react';
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
    apiCalls.getUser.mockResolvedValue(_mockData.users[0]);
    apiCalls.getPostings.mockResolvedValue(_mockData.events);
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("App should be rendered on load and display loading before all data is fetched", async() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText("LOADIN\'...")).toBeInTheDocument()

    await act(() => Promise.resolve());
  })

  it("Should render User sidebar on load", async() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    await waitFor(() => expect(apiCalls.getUser).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByTestId("user-sidebar-element")).toBeInTheDocument());

    await act(() => Promise.resolve());
  })

  it("Should render Postings component on load", async() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    await waitFor(() => expect(apiCalls.getPostings).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByTestId("postings-element")).toBeInTheDocument());

    await act(() => Promise.resolve());
  })

  it("Should render Navigation component on load of the homepage", async() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByTestId("navigation-element")).toBeInTheDocument());

    await act(() => Promise.resolve());
  })

  it("When user click on an upcoming position he is redirected to a single event page", async() => {
    apiCalls.getSinglePosting.mockResolvedValue(_mockData.events[0]);
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    )
    
    const upcomingJob = await waitFor(() => screen.getByText("cook"));
    fireEvent.click(upcomingJob)

    await waitFor(() => expect(history.location.pathname).toBe("/postings/event-20"));
    await waitFor(() => expect(apiCalls.getSinglePosting).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(screen.getByTestId('posting-view-element')).toBeInTheDocument());
    
    await act(() => Promise.resolve());
  })

  it("should redirect user to a single event detail page, then sign up for one job, and return to home page", async() => {
    apiCalls.getSinglePosting.mockResolvedValue(_mockData.events[1]);
    apiCalls.patchEventPosting.mockResolvedValue("event-2", {jobId: "posting-4"});
    apiCalls.postJobPosting.mockResolvedValue("event-2", _mockData.postJobBody);
    apiCalls.getUser.mockResolvedValue(_mockData.updatedUser[0]);

    const history = createMemoryHistory();
    render(
      <Router history={history}>
          <App />
        </Router>
      )
      
    const mockEvent = await waitFor(() => screen.getAllByTestId("posting-card-element"));
    userEvent.click(mockEvent[1])
    
    await waitFor(() => expect(screen.getByTestId('posting-view-element')).toBeInTheDocument());
    await waitFor(() => screen.getByText('driver').click());
    await waitFor(() => screen.getByText("Sign me up!").click());

    await waitFor(() => expect(screen.getByTestId('upcoming-1-posting-4')).toBeInTheDocument());
    await waitFor(() => screen.getByAltText('return-home-button').click())

    await waitFor(() => expect(screen.queryByTestId('posting-view-element')).not.toBeInTheDocument());
    await waitFor(() => expect(history.location.pathname).toBe("/"));
  })

  it("When enters keyword in search it finds all events with this keyword", async() => {
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

  it("When user clicks on a sort button it shows events in desc order by date, by clicking again it shows in asce", async() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => expect(apiCalls.getUser).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(apiCalls.getPostings).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByTestId("navigation-element")).toBeInTheDocument());

    const sortButton = screen.getByText("sort");
    fireEvent.click(sortButton);

    const allEventCards = await waitFor(() => screen.getAllByTestId("posting-card-element"))
    expect(allEventCards[0].href === 'http://localhost/postings/event-20')
    expect(allEventCards[1].href === 'http://localhost/postings/event-2')

    fireEvent.click(sortButton);
    expect(allEventCards[0].href === 'http://localhost/postings/event-2')
    expect(allEventCards[1].href === 'http://localhost/postings/event-20')
  })

  it("When user chooses a category the page displays the events of that category only", async() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => expect(apiCalls.getUser).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(apiCalls.getPostings).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByTestId("navigation-element")).toBeInTheDocument());

    const filteredCategory = screen.getByTestId("select-input");
    fireEvent.change(filteredCategory, {
      target: { value: "Healthcare" },
    });

    await waitFor(() => expect(screen.getByText("Individual")).toBeInTheDocument())
    await waitFor(() => expect(screen.queryByText("Something Else, LLC")).not.toBeInTheDocument())
  })
})
