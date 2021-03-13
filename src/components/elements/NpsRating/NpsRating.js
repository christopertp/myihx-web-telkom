import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../Button';
import InputSlider from '../InputSlider';
import Modal from '../Modal';
import { NpsContext } from '../../../contexts';
import styles from './styles.scoped.css';

export default function NpsRating() {
  const [ value, setValue ] = useState(0);

  const { code, dismissNps, skipNps, submitRating } = useContext(NpsContext);
  const { rating } = useSelector(v => v.nps).questionnaires[code];

  return (
    <Modal onClose={dismissNps} open>
      <h3 className={styles.question}>{rating.question}</h3>

      <InputSlider
        className={styles.slider}
        inputProps={{ min: 1, max: 10, }}
        onChange={evt => setValue(parseInt(evt.target.value))}
        showTooltip={value > 0}
        value={value}
      />

      <div className={styles.label}>
        <span>{rating.values.minLabel}</span>
        <span className={styles.right}>{rating.values.maxLabel}</span>
      </div>

      <Button className={styles.button} disabled={!value} onClick={() => submitRating(value)}>
        Next
      </Button>

      <Button className={styles.button} onClick={skipNps} variant="bordered">
        Skip
      </Button>
    </Modal>
  );
}
