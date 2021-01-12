import { render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import WelcomePage from '../WelcomePage';

describe("WelcomePage Component", () => {

  it("should render correctly", () => {
    render(<WelcomePage />, { wrapper: MemoryRouter });

    const welcomeMessage = screen.getByText("Welcome to FaVo!");
    const tagLine = screen.getByText("toBee or not toBee, it’s your choice…");
    const directToProfile = screen.getByText("go to your profile");
    const directIcon = screen.getByRole("img");

    expect(welcomeMessage).toBeInTheDocument();
    expect(tagLine).toBeInTheDocument();
    expect(directToProfile).toBeInTheDocument();
    expect(directIcon).toBeInTheDocument();
  })

  it("should direct user to postings page upon click", async() => {
    const history = createMemoryHistory();
    render(<Router history={history}><WelcomePage /></Router>);
    
    userEvent.click(screen.getByRole("img"));

    await waitFor(() => expect(history.location.pathname).toBe("/postings"));
  })

})