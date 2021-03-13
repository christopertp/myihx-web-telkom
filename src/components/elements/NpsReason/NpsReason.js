import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../Button';
import Modal from '../Modal';
import Spinner from '../Spinner';
import Text from '../../fields/Text';
import { NpsContext } from '../../../contexts';
import styles from './styles.scoped.css';

export default function NpsReason() {
  const [ values, setValues ] = useState([]);
  const [ other, setOther ] = useState('');

  const { isLoading, message, questionnaires } = useSelector(v => v.nps);
  const { code, dismissNps, rating, submitNps } = useContext(NpsContext);

  const options = rating > 7 ? questionnaires[code].positive : questionnaires[code].negative;

  const onSubmit = () => {
    const answers = options.values.filter((_, idx) => values.includes(idx));
    const result = other ? [ ...answers, { key: other, val: -1 } ] : answers;
    submitNps(result);
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

  return (
    <Modal onClose={dismissNps} open>
      <h3 className={styles.question}>{options.question}</h3>
      {options.values.map(renderList)}
      <Text
        inputProps={{
          label: 'Other Reason',
          onChange: (evt) => setOther(evt.target.value),
          placeholder: 'Please enter your reason',
          value: other,
        }}
      />
      {
        (message && !['OK', 'THANKS'].includes(message))
          && <small className={styles.error}>{message}</small>
      }
      <Button className={styles.button} disabled={isLoading} onClick={onSubmit}>
        {isLoading ? <Spinner /> : 'Submit'}
      </Button>
    </Modal>
  );
}
