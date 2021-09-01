// import React, { Component } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';

const Searchbar = ({ onSubmit }) => {
  const [searchRequest, setSearchRequest] = useState('');

  const onChangeInput = e => {
    setSearchRequest(e.currentTarget.value);
  };

  const onSearchSubmit = event => {
    event.preventDefault();

    if (!searchRequest) {
      toast.error('Ввдите данные в строку поиска');
      return;
    }
    setSearchRequest('');

    onSubmit(searchRequest);
  };

  return (
    <header className={styles.Searchbar}>
      <form onSubmit={onSearchSubmit} className={styles.SearchForm}>
        <button type="submit" className={styles.SearchForm__button}>
          <span className={styles.SearchForm__button__label}>Search</span>
        </button>

        <input
          className={styles.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangeInput}
          value={searchRequest}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export { Searchbar };
