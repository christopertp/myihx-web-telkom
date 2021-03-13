import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.scoped.css';

export default function NotificationCards(props) {
  const { isLoading, notif } = props;
  const { description, status, title } = notif;

  const iconWarning = 'warning';

  const icons = {
    OUTSTANDING: iconWarning,
    ISOLIR: iconWarning,
  };

  const tos = {
    OUTSTANDING: '/bill',
    ISOLIR: '/bill',
  };

  if (!tos[status]) {
    return null;
  }

  const Content = (() => {
    if (isLoading) {
      return <div className="loading" />;
    }

    return (
      <Link to={tos[status]}>
        <img alt="" src={`/assets/grfx_${icons[status]}.svg`} />
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
        <img alt="" src="/assets/ic_chevron_white.svg" />
      </Link>
    );
  })();

  return (
    <section className={styles.root}>
      {Content}
    </section>
  );
}

NotificationCards.defaultProps = {
  isLoading: false,
  notif: {},
};

NotificationCards.propTypes = {
  isLoading: PropTypes.bool,
  notif: PropTypes.shape({
    description: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string,
  }),
};
