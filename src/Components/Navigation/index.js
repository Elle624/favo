import React, { useState } from 'react';
import './Navigation.scss';
import descSortButton from '../../Assets/desc-sort-button.png';
import asceSortButton from '../../Assets/asce-sort-button.png';

const Navigation = ({
  isSorted,
  searchByKeyWord,
  categories,
  filterByCategory,
  sortByDate
}) => {
  const [keyWord, setKeyWord] = useState('');
  const [isReset, setReset] = useState(false);

  const searchPostings = (e) => {
    e.preventDefault();
    searchByKeyWord(keyWord);
    setKeyWord('');
    setReset(true);
  };

  const sortPostings = (e) => {
    e.preventDefault();
    sortByDate();
  };

  const filterPostings = (e) => {
    filterByCategory(e.target.value);
    setReset(true);
  };

  return (
    <section data-testid='navigation-element' className='navigation-bar'>
      <label htmlFor='search-input' className='label-input-search'></label>
      <input
        id='search-input'
        name='search-input'
        className='input-button-sort'
        type='text'
        value={keyWord}
        placeholder='i.e Boulder...'
        onChange={(e) => setKeyWord(e.target.value)}
      ></input>
      <button className='button-search' type='submit' onClick={searchPostings}>
        search
      </button>
      <div className='container-button-sort'>
        <button
          onClick={sortPostings}
          className='button-sort'
          value='sort'
          type='submit'
        >
          sort
          <span aria-hidden='true' className='glyphicon'>
            <img
              className='sort-icon'
              src={isSorted ? asceSortButton : descSortButton}
              alt='sort-icon'
            />
          </span>
        </button>
      </div>
      <article className='container-button-filter'>
        <select
          data-testid='select-input'
          className='filter-box'
          name='category'
          onChange={filterPostings}
        >
          <option className='filter-item' defaultValue>
            -- select category --
          </option>
          {categories.map((category) => (
            <option
              className='filter-item'
              value={category}
              key={`1-${category}`}
            >
              {category}
            </option>
          ))}
        </select>
      </article>
      <button
        className='button-search'
        type='submit'
        style={{ display: isReset ? 'block' : 'none' }}
      >
        reset
      </button>
    </section>
  );
};

export default Navigation;
