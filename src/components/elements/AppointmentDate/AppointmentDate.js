import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Heading from '../Heading';
import styles from './styles.scoped.css';

export default function AppointmentDate(props) {
  const { className, date, isLoading, mini, setPayload } = props;
  const [arrival, setArrival] = useState('0');
  const [selected, setSelected] = useState('0');
  const customClass = [styles.root, className].filter(Boolean).join(' ');

  const setCleanPayload = p => {
    setPayload({
      bookingId: p.bookingId,
      crewId: p.crewId,
      information: p.information,
      timeSlot: p.timeSlot,
    });
  };

  const onChangeArrival = e => {
    setArrival(e.target.value);
    setCleanPayload({ ...date[selected].arrival[e.target.value].data });
  };

  const onChangeDate = e => {
    const arv = date[e.target.value].arrival[0] ? '0' : '1';
    setArrival(arv);
    setSelected(e.target.value);
    setCleanPayload({ ...date[e.target.value].arrival[arv].data });
  };

  useEffect(() => {
    if (date[0]) {
      const arv = `${date[selected].arrival.findIndex(i => i.availability)}`;
      setCleanPayload({ ...date[0].arrival[arv].data });
      setArrival(arv);
    }
  }, [date, selected]);

  const DateItem = (() => {
    if (isLoading) {
      return [...Array.from({ length: 3 }).keys()].map(i => <div className="loading" key={i} />);
    }
    if (!date.length) {
      return ['No date available'];
    }
    return date.map((i, idx) => (
      <label className={selected === `${idx}` ? styles.selected : ''} key={idx}>
        <input name="date" onChange={onChangeDate} type="checkbox" value={`${idx}`} />
        <span>{moment(i.date).format('ddd')}</span>
        <h4>{moment(i.date).format('D')}</h4>
        <span>{moment(i.date).format('MMM')}</span>
      </label>
    ));
  })();

  const ArrivalItem = (() => {
    if (isLoading) {
      return [...Array.from({ length: 2 }).keys()].map(i => <div className="loading" key={i} />);
    }
    if (!date.length) {
      return [];
    }

    const items = date[selected].arrival;
    const names = mini ? ['08:00 - 10:00', '10:00 - 12:00', '13:00-15:00', '15:00-17:00'] : ['Morning', 'Afternoon'];

    return items.map((i, idx) => (
      <label className={arrival === `${idx}` ? styles.selected : ''} disabled={!i || !i.availability} key={idx}>
        {i && <input checked={arrival === `${idx}`} name="arrival" onChange={onChangeArrival} type="radio" value={`${idx}`} />}
        <h4>{names[idx]}</h4>
        {(items[1] && !mini) && <p>Technician will come around {items[1].slot}</p>}
      </label>
    ));
  })();

  return (
    <section className={customClass}>
      <Heading>Available Dates</Heading>
      <div className={styles.date}>{DateItem}</div>
      <Heading>Estimated Arrival</Heading>
      <div className={[styles.arrival, mini && styles.mini].filter(Boolean).join(' ')}>{ArrivalItem}</div>
      <p>
        Time range is the estimated arrival time.
        You will receive a notification when the technician is heading to your location.
      </p>
    </section>
  );
}

AppointmentDate.defaultProps = {
  className: '',
  date: [],
  isLoading: false,
  mini: false,
  setPayload: () => {},
};

AppointmentDate.propTypes = {
  className: PropTypes.string,
  date: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    arrival: PropTypes.array,
  })),
  isLoading: PropTypes.bool,
  mini: PropTypes.bool,
  setPayload: PropTypes.func,
};
