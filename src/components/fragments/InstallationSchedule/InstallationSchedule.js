import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Button from '../../elements/Button';
import Heading from '../../elements/Heading';
import styles from './styles.scoped.css';

export default function InstallationSchedule(props) {
  const { isLoading, schedule } = useSelector(s => s.installation);
  const setContent = (value) => {
    if (!isLoading.d && !schedule) {
      return '';
    }
    return isLoading.d ? <span className="loading" /> : value;
  };

  return (
    <section className={styles.root}>
      <Heading>Your Appointment</Heading>
      <header>
        {setContent(
          <figure>
            <p>{moment(schedule.date).format('ddd')}</p>
            <h2>{new Date(schedule.date).getDate()}</h2>
            <p>{moment(schedule.date).format('MMM')}</p>
          </figure>
        )}
        {setContent(<h3>New Installation</h3>)}
        {setContent(<p>Estimated arrival time {schedule.slot}</p>)}
        {setContent(
          <Button className={styles['reschedule-link']} onClick={props.onClick} variant="text">
            Reschedule
          </Button>
        )}
      </header>
    </section>
  );
}

InstallationSchedule.defaultProps = {
  onClick: null,
};

InstallationSchedule.propTypes = {
  onClick: PropTypes.func,
};
