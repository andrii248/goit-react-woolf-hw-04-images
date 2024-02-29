import { useState } from 'react';
import css from './Searchbar.module.css';
import { SiSearxng } from 'react-icons/si';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit(value);
  };

  const onChangeInput = e => {
    setValue(e.target.value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onFormSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <SiSearxng />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus={true}
          value={value}
          onChange={onChangeInput}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
