import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function ShopCategoryMenu(props) {
  const { page } = useParams();
  const { title, subtitle, links } = props;

  const className = c => {
    if (!page && !c) {
      return styles.active;
    }
    return page === c ? styles.active : '';
  };

  return (
    <header className={styles.root}>
      <section>
        <Link to="/shop">
          <img alt="back to shop" src="/assets/ic_back_white.svg" />
          <img alt="back to shop" src="/assets/ic_back_red.svg" />
          Shop
        </Link>
        <h1>{ title }</h1>
        <p>{ subtitle }</p>
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

ShopCategoryMenu.defaultProps = {
  links: [],
  subtitle: '',
  title: ''
};

ShopCategoryMenu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    page: PropTypes.string,
    to: PropTypes.string,
    text: PropTypes.string,
  })),
  subtitle: PropTypes.string,
  title: PropTypes.string
};
