import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Navigation from './index.js';
import mockData from '../../TestData/_mockData';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe("Navigation", () => {

  let categories, 
      searchByKeyWord,
      filterByCategory,
      sortByDate;

  beforeEach(() => {
    categories = mockData.events.reduce((totalCategories, posting) => {
      totalCategories.push(posting.category)
      return totalCategories
  }, []);

    searchByKeyWord = jest.fn();
    filterByCategory = jest.fn();
    sortByDate = jest.fn();

    render(
      <Navigation 
        isSorted={false}
        searchByKeyWord={searchByKeyWord} 
        categories={categories}
        filterByCategory={filterByCategory}
        sortByDate={sortByDate}
      />, {wrapper: MemoryRouter} 
    )
  });

  it("Navigation bar is rendered correctly", () => {
    expect(screen.getByPlaceholderText("i.e Boulder...")).toBeInTheDocument();
    expect(screen.getByText("search")).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /sort/i})).toBeInTheDocument();
    expect(screen.getByText("Something")).toBeInTheDocument();
    expect(screen.getByText("Healthcare")).toBeInTheDocument();
    expect(screen.getByText("-- select category --")).toBeInTheDocument();
  })

  it("User types inside the search input area", () => {
    const userInput = screen.getByPlaceholderText("i.e Boulder...");
    userEvent.type(userInput, 'Colorado');

    expect(userInput).toHaveValue('Colorado')
  })

  it("Search button function being called once on click", () => {
    const searchbutton = screen.getByText("search");
    fireEvent.click(searchbutton);
    expect(searchByKeyWord).toHaveBeenCalledTimes(1);
  })

  it("Sort button function being called once on click", () => {
    const sortButton = screen.getByText("sort");
    fireEvent.click(sortButton);
    expect(sortByDate).toHaveBeenCalledTimes(1);
  })

  it("Filter button function being called once on click", () => {
    const filteredCategory = screen.getByTestId("select-input");
    fireEvent.change(filteredCategory, {
      target: { value: "Helthcare" },
    });
    expect(filterByCategory).toHaveBeenCalledTimes(1);
  })
})