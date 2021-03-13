import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Heading from '../../elements/Heading';
import IconButton from '../../elements/IconButton';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function RewardsSearch() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { fetchSearchRewards } = useSelector(s => s.rewards);
  const [value, setValue] = useState('');
  const query = new URLSearchParams(useLocation().search);
  const keyword = query.get('value');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (value) => {
    setValue(value);
    window.scrollTo(0, 0);
    dispatch(fetchSearchRewards(value));
  };

  const enterPressed = e => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      history.replace(`/rewards/search?value=${encodeURIComponent(value.trim())}`);
    }
  };

  const handleClear = () => {
    setValue('');
    dispatch(fetchSearchRewards(''));
  };

  useEffect(() => {
    dispatch(fetchSearchRewards(''));
  }, []);

  useEffect(() => {
    keyword && dispatch(fetchSearchRewards(encodeURIComponent(keyword.trim())));
  }, [keyword]);

  const contextValue = { handleClick, };

  const icon = value ? 'clear_red' : 'search_red';

  return (
    <Context.Provider value={contextValue}>
      <section className={styles.cardroot}>
        <header>
          <IconButton name="back_red" onClick={() => { history.replace('/rewards/browse'); }} />
          <div className={styles.search}>
            <input autoFocus={true} onChange={handleChange} onKeyPress={enterPressed} placeholder="Search" type="text" value={value} />
            <IconButton name={icon} onClick={handleClear} />
          </div>
        </header>
        <Result />
        <Popular />
      </section>
    </Context.Provider>
  );
}

export function BlankState() {
  return (
    <article className={styles.blank}>
      <img alt="blank_search" src="assets/grfx_blank_search.svg" />
      <p>Sorry, there’s no reward with that keyword</p>
    </article>
  );
}

export function Result() {
  const { dataSearch } = useSelector(s => s.rewards);

  if (!dataSearch) {
    return <BlankState />;
  }

  return (
    <section className={styles.result}>
      {dataSearch && dataSearch.map((v) => (
        <Link key={v.id} to={`/rewards/detail/${v.id}`}>
          <img src={v.picture} />
        </Link>
      ))
      }
    </section>
  );
}

export function Popular() {
  const dispatch = useDispatch();
  const { handleClick } = useContext(Context);
  const { dataPopular, fetchPopularSearch } = useSelector(s => s.rewards);

  useEffect(() => {
    dispatch(fetchPopularSearch());
  }, []);

  return (
    <article className={styles.popular}>
      <hr />
      <Heading>Popular Searches</Heading>
      <ul>
        {
          dataPopular && dataPopular.map((item, i) => (
            <li key={i} onClick={() => { handleClick(item); }}>{item}</li>
          ))
        }
      </ul>
    </article>
  );
}
