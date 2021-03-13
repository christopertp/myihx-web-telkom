import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../Button';
import IconButton from '../IconButton';
import Modal from '../Modal';
import styles from './styles.scoped.css';

export default function ModalBillDownload(props) {
  const { onClose, open } = props;
  const [ checked, setChecked ] = useState([]);
  const { data, fetchBillDownload, notifMessage } = useSelector(s => s.history);
  const dispatch = useDispatch();
  const checkBox = p => {
    checked.includes(p)
      ? setChecked(checked.filter(i => i !== p))
      : setChecked([...checked, p]);
  };
  const isChecked = checked.length;
  const onSubmit = () => dispatch(fetchBillDownload(checked));

  useEffect(() => {
    onClose();
    setChecked([]);
  }, [notifMessage]);

  return (
    <Modal className={styles.root} onClose={onClose} open={open}>
      <header>
        <h1>Email bill history</h1>
        <IconButton name="close_red" onClick={onClose} />
      </header>
      <article>
        {
          data.map((i, idx) => (
            <label key={idx}>
              {moment(i.period).month(i.period.slice(-2)-1).year(i.period.slice(0,4)).format('MMMM YYYY')}
              <input checked={checked.includes(i.period)} onChange={() => checkBox(i.period)} type="checkbox" />
            </label>
          ))
        }
      </article>
      <Button disabled={!isChecked} onClick={onSubmit}>Send Email</Button>
    </Modal>
  );
}

ModalBillDownload.defaultProps = {
  onClose: () => {},
  open: false,
};

ModalBillDownload.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
