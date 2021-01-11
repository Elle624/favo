import React from 'react';
import { screen, render } from '@testing-library/react';
import mockData from '../../TestData/_mockData';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Postings from './index.js';

describe("Postings", () => {
  it("Postings are rendered correctly", () => {

    const postingsData = mockData.events;

    render(
      <Postings 
          isSorted={false}
          postings={postingsData}
          searchByKeyWord={jest.fn()}
          sortPostingsByDate={jest.fn()}
          filterByCategory={jest.fn()}
        />, {wrapper: MemoryRouter}
    )

    expect(screen.getByText("Something Crazy")).toBeInTheDocument();
    expect(screen.getByText("Food Delivery")).toBeInTheDocument();
  })
})