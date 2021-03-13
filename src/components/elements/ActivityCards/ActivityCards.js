import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.scoped.css';

export default function ActivityCards(props) {
  const { cards, fullWidth, heading, isLoading } = props;
  const { description, issueId, orderId, status, title } = cards;
  const style = fullWidth ? { width: '100%' } : {};

  const iconGear = 'action_technician';
  const iconSchedule = 'action_schedule';
  const iconExclamation = 'help';

  const icons = {
    ASSURANCE_ASSIGNMENT: iconGear,
    ASSURANCE_COMPLETED: iconGear,
    ASSURANCE_IN_PROGRESS: iconGear,
    CONTINUE_DEPOSIT: 'action_warning',
    NEW_INSTALLATION: iconGear,
    REUPLOAD_KYC: iconExclamation,
    SCHEDULE_INSTALLATION: iconSchedule,
    UPLOAD_KYC: iconExclamation,
    VERIFYING_KYC: 'action_waiting',
    CONTINUE_ORDER: 'action_profile',
    ON_THE_WAY: iconGear,
    INSTALLATION_IN_PROGRESS: iconGear,
    INSTALLATION_COMPLETED: iconGear,
    PROFILE_IN_PROGRESS: 'action_profile',
    VERIFYING_EMAIL: 'action_email',
    PAYMENT_SUCCESS: '',
    PAYMENT_FAILED: 'iconExclamation',
    PAYMENT_PENDING: 'action_waiting',
  };

  const routeInstallation = '/installation';

  const tos = {
    ASSURANCE_ASSIGNMENT: `/issues/${issueId}`,
    ASSURANCE_COMPLETED: `/issues/${issueId}`,
    ASSURANCE_IN_PROGRESS: `/issues/${issueId}`,
    CONTINUE_DEPOSIT: `/order/package?transactionId=${orderId}`,
    NEW_INSTALLATION: routeInstallation,
    REUPLOAD_KYC: '/personal-data',
    SCHEDULE_INSTALLATION: '/schedule-installation',
    UPLOAD_KYC: '/personal-data',
    VERIFYING_KYC: '/personal-data/verify',
    CONTINUE_ORDER: '/draft-contract',
    ON_THE_WAY: routeInstallation,
    INSTALLATION_IN_PROGRESS: routeInstallation,
    INSTALLATION_COMPLETED: routeInstallation,
    PROFILE_IN_PROGRESS: '/profile/edit',
    VERIFYING_EMAIL: '/personal-data/verify',
    PAYMENT_SUCCESS: `/payment/success?invoice=${orderId}`,
    PAYMENT_FAILED: `/payment/failed?invoice=${orderId}`,
    PAYMENT_PENDING: '',
  };

  if (!tos[status]) {
    return null;
  }

  const Content = (() => {
    if (isLoading) {
      return <div className="loading" />;
    }
    return (
      <Link style={style} to={tos[status]}>
        <img alt="" src={`/assets/grfx_${icons[status]}.svg`} />
        <div>
          {orderId && <small>Order ID {orderId}</small>}
          {issueId && <small>Ticket ID {issueId}</small>}
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
        <img alt="" src="/assets/ic_chevron_white.svg" />
      </Link>
    );
  })();

  return (
    <section className={styles.root}>
      <h4>{heading}</h4>
      {Content}
    </section>
  );
}

ActivityCards.defaultProps = {
  cards: {},
  fullWidth: false,
  heading: '',
  isLoading: false,
};

ActivityCards.propTypes = {
  cards: PropTypes.shape({
    description: PropTypes.string,
    issueId: PropTypes.string,
    orderId: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string,
  }),
  fullWidth: PropTypes.bool,
  heading: PropTypes.string,
  isLoading: PropTypes.bool,
};
