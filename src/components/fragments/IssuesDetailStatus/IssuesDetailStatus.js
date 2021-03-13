import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Avatar from '../../elements/Avatar';
import Bullet from '../../elements/Bullet';
import Button from '../../elements/Button';
import Card from '../../elements/Card';
import Heading from '../../elements/Heading';
import IconButton from '../../elements/IconButton';
import styles from './styles.scoped.css';

const loading = <span className="loading" />;

export default function IssuesDetailStatus() {
  const { type } = useSelector(s => s.issues);
  const isLogic = type === 'logic';
  return (
    <>
      {!isLogic && <Appointment />}
      <Ticket />
      {!isLogic && <Address />}
      <Technician />
      <Steps />
    </>
  );
}

export function Appointment() {
  const { isLoading, schedule } = useSelector(s => s.issues);
  const { date, slot } = schedule;
  return (
    <section className={styles.appointment}>
      <Heading>Your Appointment</Heading>
      <Card variant="hover">
        <figure>
          {
            (!isLoading.d && date) ?
              (<>
                <small>{moment(date).format('ddd')}</small>
                <p>{moment(date).format('D')}</p>
                <small>{moment(date).format('MMMM')}</small>
              </>) : ''
          }
        </figure>
        <h4>Repair Request</h4>
        {isLoading.d ? loading : <p>Estimated arrival time {slot}</p>}
        <Button variant="text">Reschedule</Button>
      </Card>
    </section>
  );
}

export function Ticket() {
  const { isLoading, summary, type } = useSelector(s => s.issues);
  const { id } = useParams();
  const isLogic = type === 'logic';
  return (
    <section className={styles.ticket}>
      <Heading>Your {isLogic ? 'Report' : 'Ticket'}</Heading>
      <Card className={styles[type]} variant="hover">
        {(!isLoading.d && isLogic) && <h4>{id}</h4>}
        {isLoading.d ? loading : summary}
      </Card>
    </section>
  );
}

export function Address() {
  const { address, isLoading } = useSelector(s => s.issues);
  return (
    <section className={styles.address}>
      <Heading>Address</Heading>
      {isLoading.d ? loading : <p>{address}</p>}
    </section>
  );
}

export function Technician() {
  const { technician } = useSelector(s => s.issues);
  const { name, status, tel } = technician;

  if (!name) {
    return <Heading>Report Process</Heading>;
  }

  const onCall = url => () => {
    location.href = url;
  };

  return (
    <section className={styles.technician}>
      <Heading>Your Technician</Heading>
      <Card variant="hover">
        <Avatar src="/assets/av_blank.svg" />
        <h4>{name}</h4>
        <p>{status}</p>
        <IconButton name="chat" onClick={onCall(`https://api.whatsapp.com/send?phone=${tel}`)} />
        <IconButton name="call" onClick={onCall(`tel:${tel}`)} />
      </Card>
    </section>
  );
}

export function Steps() {
  const { step, type } = useSelector(s => s.issues);
  const STEPS = {
    fisik: [
      {
        title: 'Ticket Submitted',
        desc: 'Ticket has been submitted. Our team is currently processing your request',
      },
      {
        title: 'Ticket Assigned',
        desc: 'We have assigned a technician to your request',
      },
      {
        title: 'Repair In Progress',
        desc: 'Our technician is arriving to your location',
      },
      {
        title: 'Repair Complete',
        desc: 'Issue has been resolved!',
      },
    ],
    logic: [
      {
        title: 'Report Received',
        desc: 'We are trying to solve this issue',
      },
      {
        title: 'Repair In Progress',
        desc: 'We have assigned a special team to resolve this issue',
      },
      {
        title: 'Repair Complete',
        desc: 'Our team has finished repairing the issue!',
      },
      {
        title: 'Issue Solved',
        desc: 'Issue has been resolved!',
      },
    ],
  };
  const GREEN = '#0eb37e';
  const GREY = '#e5e6e6';

  const setColor = idx => {
    if (idx > step) {
      return [GREY, GREY];
    } else if (idx === step) {
      return [GREEN, GREY];
    }
    return [GREEN, GREEN];
  };

  return (
    <ul className={styles.steps}>
      {STEPS[type]?.map((i, idx) => (
        <li className={idx > step ? styles['step-inactive'] : ''} key={idx}>
          <Bullet color={setColor(idx)} connect={idx < STEPS[type].length - 1} />
          <h4>{i.title}</h4>
          <p>{i.desc}</p>
        </li>
      ))}
    </ul>
  );
}
