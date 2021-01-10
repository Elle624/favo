import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { _mockData } from '../../TestData/_ mockData';
import User from '../User';

describe("User Comonent", () => {

  it("should render correctly", () => {
    render(<User />);

    expect(screen.getByText("Peach Perfect")).toBeInTheDocument;

  })
})