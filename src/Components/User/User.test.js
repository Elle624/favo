import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import _mockData from '../../TestData/_mockData';
import User from '../User';
import { MemoryRouter } from 'react-router-dom';

describe("User Comonent", () => {

  it("should render correctly", () => {    
    render(<User info={_mockData.user}/>, { wrapper: MemoryRouter });

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
})