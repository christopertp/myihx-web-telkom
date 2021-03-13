import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function HistoryInboxMenu(props) {
  const { page } = useParams();
  const { links } = props;

  const classActive = c => page === c ? styles.active : '';

  return (
    <nav className={styles.root}>
      {
        links.map((i, idx) => (
          <Link className={classActive(i.page)} key={idx} to={i.to}>
            <span>{i.text}</span>
            <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
          </Link>
        ))
      }
    </nav>
  );
}

HistoryInboxMenu.defaultProps = {
  links: [],
};

HistoryInboxMenu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    page: PropTypes.string,
    to: PropTypes.string,
    text: PropTypes.string,
  })),
};
