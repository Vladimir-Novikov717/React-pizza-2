import React from 'react';
import debounce from 'lodash.debounce'
import { SearchContext } from '../../App';



import styles from './Search.module.scss';

const Search = () => {
  const [value, setValue] = React.useState('')
  const { searchValue, setSearchValue } = React.useContext(SearchContext); // ← это нужно добавить
  const inputRef = React.useRef();

  const onClickClear = () => {
    setValue('');
    setSearchValue('');
    inputRef.current.focus();
  }
  
  const updateSearchValue = React.useCallback(
    debounce((str)=> {
      setSearchValue(str);
    }),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };


  return (
    <div className={styles.root}>
      {/* 🔍 Иконка лупы */}
      <svg
        className={styles.searchIcon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
      </svg>

      {/* 🔤 Поле ввода */}
      <input
        ref = {inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />

      {/* ❌ Кнопка очистки */}
      {searchValue && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
