import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import Spinner from '../Spinner';
import styles from './styles.scoped.css';

export default function OtpRequest(props) {
  const { isLoading, message, mobile, onClick, type } = props;
  const options = [
    { icon: 'wa.png', type: 'Whatsapp' },
    { icon: 'sms.svg', type: 'SMS' },
  ];
  return (
    <>
      {options.map((i, idx) => (
        <Card className={styles['request-button']} disabled={isLoading} key={idx} onClick={onClick(i.type)}>
          <img alt={i.icon} src={`/assets/ic_form_${i.icon}`} />
          <span>Melalui {i.type} {mobile.slice(-4).padStart(mobile.length, '•')}</span>
          {isLoading && (type === i.type)
            ? <Spinner color="#ee3124" />
            : <img alt="send" src="/assets/ic_chevron_red.svg" />}
        </Card>
      ))}
      {message && <small className={styles.error}>{message}</small>}
    </>
  );
}

OtpRequest.defaultProps = {
  isLoading: false,
  message: '',
  mobile: '',
  onClick: () => {},
  type: '',
};

OtpRequest.propTypes = {
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  mobile: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};
