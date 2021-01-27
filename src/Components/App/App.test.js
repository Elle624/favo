import React from "react";
import { screen, render, act, waitFor } from "@testing-library/react";
import App from "./index.js";
import "@testing-library/jest-dom";
import { MemoryRouter, Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { apiCalls } from "../../apiCalls.js";
import _mockData from "../../TestData/_mockData";
jest.mock("../../apiCalls");

describe("App", () => {
  beforeEach(() => {
    apiCalls.getUser.mockResolvedValue(_mockData.users[0]);
    apiCalls.getPostings.mockResolvedValue(_mockData.events);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render correct url", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    await waitFor(() => expect(history.location.pathname).toBe("/"));
  });

  it("postings should be rendered on a spcific page load and display loading before all data is fetched, with correct url change", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    userEvent.click(screen.getByRole("img"));

    expect(screen.getByTestId("loading-animation")).toBeInTheDocument();
    expect(history.location.pathname).toBe("/postings");

    await act(() => Promise.resolve());
  });

  it("Should render user sidebar, postings, and navigation on postings page load", async () => {
    render(
      <MemoryRouter initialEntries={["/postings"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => expect(apiCalls.getUser).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.getByTestId("user-sidebar-element")).toBeInTheDocument()
    );

    await waitFor(() => expect(apiCalls.getPostings).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.getByTestId("postings-element")).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(screen.getByTestId("navigation-element")).toBeInTheDocument()
    );

    await act(() => Promise.resolve());
  });

  it("When user click on an upcoming position he is redirected to a single event page", async () => {
    apiCalls.getSinglePosting.mockResolvedValue(_mockData.events[0]);
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    userEvent.click(screen.getByRole("img"));

    const upcomingJob = await waitFor(() => screen.getByText("cook"));
    userEvent.click(upcomingJob);

    await waitFor(() =>
      expect(history.location.pathname).toBe("/postings/event-20")
    );
    await waitFor(() =>
      expect(apiCalls.getSinglePosting).toHaveBeenCalledTimes(1)
    );
    await waitFor(() =>
      expect(screen.getByTestId("posting-view-element")).toBeInTheDocument()
    );

    await act(() => Promise.resolve());
  });

  it("should redirect user to a single event detail page, then sign up for one job, and return to home page", async () => {
    apiCalls.getUser.mockResolvedValue(_mockData.updatedUser[0]);
    apiCalls.getSinglePosting.mockResolvedValue(_mockData.events[1]);
    apiCalls.patchEventPosting.mockResolvedValue("event-2", {
      jobId: "posting-4"
    });
    apiCalls.postJobPosting.mockResolvedValue("event-2", _mockData.postJobBody);

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    userEvent.click(screen.getByRole("img"));

    const mockEvent = await waitFor(() =>
      screen.getAllByTestId("posting-card-element")
    );
    userEvent.click(mockEvent[1]);

    await waitFor(() =>
      expect(screen.getByTestId("posting-view-element")).toBeInTheDocument()
    );
    await waitFor(() => screen.getByText("driver").click());
    await waitFor(() => screen.getByText("Sign me up!").click());

    await waitFor(() =>
      expect(screen.getByTestId("upcoming-1-posting-4")).toBeInTheDocument()
    );
    await waitFor(() => screen.getByAltText("return-home-button").click());

    await waitFor(() =>
      expect(
        screen.queryByTestId("posting-view-element")
      ).not.toBeInTheDocument()
    );
    await waitFor(() => expect(history.location.pathname).toBe("/postings"));
  });

  it("When enters keyword in search it finds all events with this keyword", async () => {
    render(
      <MemoryRouter initialEntries={["/postings"]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => expect(apiCalls.getUser).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(apiCalls.getPostings).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.getByTestId("navigation-element")).toBeInTheDocument()
    );

    const userInput = screen.getByPlaceholderText("i.e Boulder...");
    userEvent.type(userInput, "Food Delivery");

    const searchbutton = screen.getByText("search");
    userEvent.click(searchbutton);

    await waitFor(() =>
      expect(screen.getByText("Food Delivery")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryByText("Something Else, LLC")).not.toBeInTheDocument()
    );
  });

  it("When user clicks on a sort button it shows events in desc order by date, by clicking again it shows in asce", async () => {
    render(
      <MemoryRouter initialEntries={["/postings"]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => expect(apiCalls.getUser).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(apiCalls.getPostings).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.getByTestId("navigation-element")).toBeInTheDocument()
    );

    const sortButton = screen.getByText("sort");
    userEvent.click(sortButton);

    const allEventCards = await waitFor(() =>
      screen.getAllByTestId("posting-card-element")
    );
    expect(allEventCards[0].href === "http://localhost/postings/event-20");
    expect(allEventCards[1].href === "http://localhost/postings/event-2");

    userEvent.click(sortButton);
    expect(allEventCards[0].href === "http://localhost/postings/event-2");
    expect(allEventCards[1].href === "http://localhost/postings/event-20");
  });

  it("When user chooses a category the page displays the events of that category only", async () => {
    render(
      <MemoryRouter initialEntries={["/postings"]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => expect(apiCalls.getUser).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(apiCalls.getPostings).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.getByTestId("navigation-element")).toBeInTheDocument()
    );

    const filteredCategory = screen.getByTestId("select-input");
    userEvent.selectOptions(filteredCategory, [screen.getByText("Healthcare")]);

    await waitFor(() =>
      expect(screen.getByText("Individual")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryByText("Something Else, LLC")).not.toBeInTheDocument()
    );
  });

  it("When user click reset button, all queries should be cleared out", async () => {
    render(
      <MemoryRouter initialEntries={["/postings"]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => expect(apiCalls.getUser).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(apiCalls.getPostings).toHaveBeenCalledTimes(1));

    const filteredCategory = screen.getByTestId("select-input");
    userEvent.selectOptions(filteredCategory, [screen.getByText("Healthcare")]);

    expect(filteredCategory).toHaveValue("Healthcare");
    userEvent.click(screen.getByText("reset"));

    expect(filteredCategory).toHaveValue("-- select category --");
  });
});
