import React from 'react';
import { screen, render } from '@testing-library/react';
import PostingCard from './index.js';
import mockData from '../../TestData/_mockData';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe("PostingCard", () => {

  it("PostingCard should render correctly", () => {
    const postingData = mockData.events[0];

    render(
      <MemoryRouter>
        <PostingCard 
          posting={postingData}
          key={postingData.id}
        />
      </MemoryRouter>
    )
    
    expect(screen.getByText("Event")).toBeInTheDocument();
    expect(screen.getByText("Something Crazy")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("2021/03/01")).toBeInTheDocument();
    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("Something Else, LLC")).toBeInTheDocument();
    expect(screen.getByText("Open Position")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  })
})