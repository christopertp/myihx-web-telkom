import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Card from '../../elements/Card';
import Heading from '../../elements/Heading';
import Modal from '../../elements/Modal';
import ContactForm from '../../forms/ScheduleAppointmentContact';
import styles from './styles.scoped.css';

export default function ScheduleAppointmentContact(props) {
  const { data, open, setModal, setPayload } = props;

  const onClick = () => {
    setModal('contact');
  };

  const onSubmit = v => {
    setPayload({ contactSecondary: v });
    setModal('');
  };

  return (
    <>
      <section className={styles.root}>
        <Heading>Secondary Contact (Optional)</Heading>
        {data ? <Edit data={data} onClick={onClick} /> : <Add onClick={onClick} />}
        <GoodToKnow />
      </section>
      <Modal className={styles.modal} onClose={() => setModal('')} open={open}>
        <h3>Add a second contact person</h3>
        <p>Our technician will contact this person if you’re not available.</p>
        <ContactForm data={data} onClose={() => setModal('')} onSubmit={onSubmit} />
      </Modal>
    </>
  );
}

ScheduleAppointmentContact.defaultProps = {
  data: null,
  open: false,
  setModal: () => { },
  setPayload: () => { },
};

ScheduleAppointmentContact.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool,
  setModal: PropTypes.func,
  setPayload: PropTypes.func,
};

export function Add(props) {
  const { onClick } = props;
  return (
    <button className={styles.add} onClick={onClick}>
      <img alt="address" src="/assets/ic_location_red.svg" />
      <span>
        <h4>Add Secondary Contact</h4>
        <p>Not home during the installation?</p>
        <p>Add a second contact person.</p>
      </span>
      <img alt="" src="/assets/ic_chevron_white.svg" />
    </button>
  );
}

Add.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export function Edit(props) {
  const { data, onClick } = props;
  return (
    <Card className={styles.edit} onClick={onClick}>
      <img alt="address" src="/assets/ic_location_red.svg" />
      <span>
        <h4>{data.fullName}</h4>
        <p>{data.mobileNumber}</p>
        <p>Edit Contact</p>
      </span>
      <img alt="" src="/assets/ic_chevron_red.svg" />
    </Card>
  );
}

Edit.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export function GoodToKnow() {
  const { type } = useParams();

  if (type === 'service') {
    return null;
  }

  return (
    <>
      <h3>Good to know</h3>
      <ul>
        <li>
          <span />
          <span>
            Installation will take at least 3 hours.
            Installation may take longer if there are complications.
            Make sure that you or a contact person is available during that time.
          </span>
        </li>
        <li>
          <span />
          <span>
            There may be additional charges once the installation begins.
            These charges will be confirmed to you beforehand.
          </span>
        </li>
        <li>
          <span />
          <span>
            If the installation is not successful, we will reschedule or issue a refund.
          </span>
        </li>
      </ul>
    </>
  );
}
