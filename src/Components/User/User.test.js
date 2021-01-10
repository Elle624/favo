import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _mockData from '../../TestData/_mockData';
import { MemoryRouter } from 'react-router-dom';

import User from '../User';

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

  it.skip("User side bar should toggle by ckicking", () => {
    render(<User info={_mockData.user}/>, { wrapper: MemoryRouter });

    //const sideBarButton = screen.getByAltText("sidebar-icon");
    const sideBarButton = document.querySelector('.user-toggle-button');
    userEvent.click(sideBarButton);
    //userEvent.click(sideBarButton);
    //screen.debug()
    expect(screen.queryByText("Peach Perfect")).toHaveStyle("display: none");
  })
})