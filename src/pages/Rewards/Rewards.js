import React, { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import useSlider from '../../hooks/useSlider';
import { remToPx } from '../../utils/unit';
import Button from '../../components/elements/Button';
import RewardsRedeem from '../../components/fragments/RewardsRedeem';
import RewardsSearch from '../../components/fragments/RewardsSearch';
import { thousand } from '../../utils/format';
import { fetchRewardsList, fetchRewardsListCategory, fetchStatusPoint } from './actions';
import styles from './styles.scoped.css';
import moment from 'moment';

const Context = createContext({});

export default function Rewards() {
  const { page, id } = useParams();

  if (id) {
    return <RewardsRedeem />;
  }

  return (p => {
    switch (p) {
      case 'browse' : return <BrowseRewards />;
      case 'detail' : return <RewardsRedeem />;
      case 'my-voucher': return <BrowseRewards />;
      case 'search' : return <RewardsSearch />;
      default: return <BrowseRewards />;
    }
  })(page);
}

export function BrowseRewards() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStatusPoint());
    dispatch(fetchRewardsList());
  }, []);

  return (
    <Context.Provider>
      <Header />
      <SliderBanner />
      <Filter />
      <ListRewards />
    </Context.Provider>
  );
}

export function Header() {
  const { page } = useParams();
  const { statusPoin } = useSelector(s => s.rewards);
  const links = [
    { page: 'browse', to: '/rewards/browse', text: 'Browse Rewards' },
    { page: 'my-voucher', to: '', text: 'My Voucher' },
  ];

  const className = c => {
    // eslint-disable-next-line max-statements-per-line
    if (!page && !c) { return styles.active; }
    return page === c ? styles.active : '';
  };

  return (
    <header className={styles.headerContent}>
      <section>
        <section className={styles.headerLeft}>
          <Link to="/">
            <img alt="" src="/assets/ic_back_white.svg" />
            <img alt="" src="/assets/ic_back_red.svg" />
            Home
          </Link>
          <p>INDIHOME POINTS</p>
          <h1>{thousand(statusPoin.poin_total)}</h1>
          <p>{thousand(statusPoin.poin_total)} pts will expire on 31 Dec {moment().year()}</p>
        </section>
        <section className={styles.headerRight}>
          <Link to="/rewards/search">
            <img alt="" src="/assets/ic_search_red.svg" />
            <img alt="" src="/assets/ic_search_white.svg" />
          </Link>
          <Link to="/">
            <img alt="" src="/assets/ic_history.svg" />
            <img alt="" src="/assets/ic_history_white.svg" />
          </Link>
          {(statusPoin.status !== 'ACTIVE') && <Button to="/activate-rewards">ACTIVATE</Button>}
        </section>
      </section>
      <nav className={styles.list}>
        {
          links && links.map((i, idx) => (
            <Link className={className(i.page)} key={idx} to={i.to}>{i.text}</Link>
          ))
        }
      </nav>
    </header>
  );
}

export function SliderBanner() {
  const { rewards, statusPoin } = useSelector(s => s.rewards);
  const margin = (window.innerWidth < 768) ? remToPx(0.75) : remToPx(1);
  const slider = useSlider(3000, margin);

  return (
    <section className={styles.sliderBanner}>
      <ul {...slider}>
        {rewards && rewards.map((i, idx) => {
          return (
            <Link
              key={idx}
              to={statusPoin.status === 'ACTIVE' ? `/rewards/detail/${i.id}` : '/activate-rewards'}
            >
              <img alt="recommended" src={i.image} />
            </Link>
          );}
        )}
      </ul>
    </section>
  );
}

export function Filter() {
  const dispatch = useDispatch();
  const { rewardCategory, statusPoin,
    recommendAction, selectedCategory } = useSelector(s => s.rewards);

  function filterRewards(cat) {
    switch (cat) {
      case 'RECOMMENDED' : dispatch(recommendAction());
        break;
      case '' : dispatch(fetchRewardsList());
        break;
      default: dispatch(fetchRewardsListCategory(cat));
        break;
    }
  }

  return (
    <section className={styles.filter}>
      <ul>
        <li>
          <div className={selectedCategory === '' ? styles.active : ''} onClick={() => {filterRewards('');}}>
            <img src="/assets/ic_voucher_all.svg" />
          </div>
          <h3>All</h3>
        </li>
        {
          statusPoin.status === 'ACTIVE' &&
          <li>
            <div
              className={selectedCategory === 'RECOMMENDED' ? styles.active : ''}
              onClick={() => {filterRewards('RECOMMENDED');}}
            >
              <img src="/assets/ic_voucher_recommended.svg" />
            </div>
            <h3>Recommended</h3>
          </li>
        }
        {
          rewardCategory && rewardCategory.map((i, idx) => {
            return (
              <li key={idx}>
                <div
                  className={selectedCategory === i.name ? styles.active : ''}
                  onClick={() => {filterRewards(i.name);}}
                >
                  <img src={i.icon} />
                </div>
                <h3>{i.name}</h3>
              </li>
            );
          })
        }
      </ul>
    </section>
  );
}

export function ListRewards() {
  const { selectedCategory, rewards, filteredRewards } = useSelector(s => s.rewards);

  return (
    <section className={styles.listRewards}>
      {
        selectedCategory ?
          filteredRewards.map((i, idx) => {
            return (
              <Link
                key={idx}
                to={`/rewards/detail/${i.id}`}
              >
                <img src={i.image} />
              </Link>
            );
          }) :
          rewards && rewards.map((i, idx) => {
            return (
              <Link
                key={idx}
                to={`/rewards/detail/${i.id}`}
              >
                <img src={i.image} />
              </Link>
            );
          })
      }
    </section>
  );
}
