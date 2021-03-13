import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Heading from '../../components/elements/Heading';
import IconButton from '../../components/elements/IconButton';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function SearchProduct() {

  const history = useHistory();
  const [ value, setValue ] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (value) => {
    setValue(value);
    window.scrollTo(0, 0);
  };

  const contextValue = { handleClick, };

  const icon = value ? 'clear_red' : 'search_red';

  return (
    <Context.Provider value={contextValue}>
      <section className={styles.cardroot}>
        <header>
          <IconButton name="back_red" onClick={history.goBack} />
          <form className={styles.search}>
            <input autoFocus={true} onChange={handleChange} placeholder="Search" type="text" value={value}/>
            <IconButton name={icon} onClick={() => { setValue(''); }}/>
          </form>
        </header>
        <BlankState />
        <Popular />
      </section>
    </Context.Provider>
  );
}

export function BlankState() {
  return (
    <article className={styles.blank}>
      <img alt="blank_search" src="assets/grfx_blank_search.svg"/>
      <p>Sorry, there’s no product with that keyword</p>
    </article>
  );
}

export function Popular() {

  const { handleClick } = useContext(Context);

  const data = [
    'Paket BUMN',
    'Semarak Kebahagiaan',
    'IndiKorea',
    'IndiGamer'
  ];

  return (
    <article className={styles.popular}>
      <hr/>
      <Heading>Popular Searches</Heading>
      <ul>
        {
          data.map((item, i) => (
            <li key={i} onClick={() => { handleClick(item); }}>{ item }</li>
          ))
        }
      </ul>
    </article>
  );
}
