import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import Button from '../Button';
import Card from '../Card';
import Modal from '../Modal';
import Spinner from '../Spinner';
import Rate from '../../icons/Rate';
import styles from './styles.scoped.css';

export default function ModalTechRating(props) {
  const { code, isLoading, message, onClose, onSubmit,
    open, questionnaires, technicianInfo } = props;
  const { technician } = technicianInfo;
  const [options, setOptions] = useState('');
  const [rating, setRating] = useState(0);
  const [values, setValues] = useState([]);

  const onClickSubmit = () => {
    const result = options.values.filter((_, idx) => values.includes(idx));
    const feedback = {
      code,
      deviceType: 'web',
      feedback: [
        {
          statementId: questionnaires.rating.statementId,
          type: 'star',
          value: rating,
        },
        {
          statementId: questionnaires[rating > 3 ? 'positive' : 'negative'].statementId,
          type: 'checkbox',
          value: result,
        },
      ],
      questionnaireId: questionnaires.questionnaireId,
    };

    onSubmit(feedback, rating);
  };

  const onValueChange = (evt) => {
    const val = parseInt(evt.target.value);
    const checked = evt.target.checked;
    const newValues = checked ?  [...values, val] : values.filter(v => v !== val);
    setValues(newValues);
  };

  const renderList = (v, idx) => {
    const cardChecked = [styles.card, styles['checked']].filter(Boolean).join(' ');
    const checked = values.includes(idx);
    return (
      <label className={checked ? cardChecked : styles.card} key={v.val + v.key}>
        {v.key}
        <input
          checked={checked}
          onChange={onValueChange}
          type="checkbox"
          value={idx}
        />
      </label>
    );
  };

  const rateFunc = (rate) => {
    const { negative, positive } = questionnaires;
    setValues([]);
    setOptions(rate > 3 ? positive : negative);
    setRating(rate);
  };
  return (
    <Modal className={styles['modal-rating']} onClose={onClose} open={open}>
      <img alt="" src="/assets/grfx_rate.svg" />
      <h3>Installation Complete!</h3>
      <p>Enjoy your new IndiHome service! Please take a few seconds to rate your technician</p>
      <Card variant="hover">
        <Avatar src="/assets/av_blank.svg" />
        <h3>{technician}</h3>
        <div>
          {[...Array.from({ length: 5 }).keys()].map(i => (
            <Rate fill={rating < ((i-(i-(4-i)))+1) ? '#e5e6e6' : '#ff9733'} key={i} onClick={() => rateFunc((i-(i-(4-i)))+1)} size={60}/>
          ))}
        </div>
      </Card>
      {options && (isLoading.n ? <div className="loading" /> : <>
        <h5 className={styles.question}>{options.question}</h5>
        {options.values.map(renderList)}
      </>)
      }
      {
        (message && !['OK', 'THANKS'].includes(message))
      && <small className={styles.error}>{message}</small>
      }
      <Button disabled={isLoading.s} onClick={onClickSubmit}>
        {isLoading.s ? <Spinner /> : 'Submit'}
      </Button>
    </Modal>
  );
}

ModalTechRating.defaultProps = {
  code: '',
  isLoading: {},
  message: '',
  onClose: () => {},
  onSubmit: null,
  open: false,
  questionnaires: {},
  technicianInfo: {},
};

ModalTechRating.propTypes = {
  code: PropTypes.string,
  isLoading: PropTypes.shape({
    n: PropTypes.bool,
    s: PropTypes.bool,
  }),
  message: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  questionnaires: PropTypes.object,
  technicianInfo: PropTypes.object
};
