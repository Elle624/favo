import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _mockData from '../../TestData/_mockData';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import User from '../User';

describe("User Comonent", () => {

  it("should render correctly", () => {    
    render(<User info={_mockData.users[0]}/>, { wrapper: MemoryRouter });

    expect(screen.getByText("Peach Perfect")).toBeInTheDocument();
    expect(screen.getAllByAltText("star-icon")).toHaveLength(5);
    expect(screen.getByText("Total Hours Volunteered")).toBeInTheDocument();
    expect(screen.getByText("8.2 Hours")).toBeInTheDocument();
    expect(screen.getByText("My Upcoming Jobs")).toBeInTheDocument();
    expect(screen.getByText("Something Crazy")).toBeInTheDocument();
    expect(screen.getByText("2021/03/01")).toBeInTheDocument();
    expect(screen.getByText("cook")).toBeInTheDocument();
    expect(screen.queryByText("Food Delivery")).not.toBeInTheDocument();
  })

  it("should redirect to new url once click on up coming job", async() => {
    const history = createMemoryHistory();
    render(<Router history={history}><User info={_mockData.users[0]}/></Router>);
    
    const jobName = screen.getByText("cook");
    userEvent.click(jobName);

    await waitFor(() => expect(history.location.pathname).toBe("/postings/event-20"));
  })
})