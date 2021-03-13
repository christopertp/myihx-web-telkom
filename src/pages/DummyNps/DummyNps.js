import React, { useContext } from 'react';
import Button from '../../components/elements/Button';
import { NpsCodes, NpsContext } from '../../contexts';
import styles from './styles.scoped.css';

export default function DummyNps() {
  const { NPS_BUY_ADDON, NPS_BUY_IH, NPS_HELP_LOGIC,
    NPS_HELP_PHYSIC, NPS_PAY, NPS_TECH_INSTALL } = NpsCodes;
  const { showNps } = useContext(NpsContext);

  return (
    <div className={styles.root}>
      <Button onClick={() => showNps(NPS_BUY_ADDON)}>
        {NPS_BUY_ADDON}
      </Button>
      <Button onClick={() => showNps(NPS_BUY_IH)}>
        {NPS_BUY_IH}
      </Button>
      <Button onClick={() => showNps(NPS_HELP_LOGIC)}>
        {NPS_HELP_LOGIC}
      </Button>
      <Button onClick={() => showNps(NPS_HELP_PHYSIC)}>
        {NPS_HELP_PHYSIC}
      </Button>
      <Button onClick={() => showNps(NPS_PAY)}>
        {NPS_PAY}
      </Button>
      <Button onClick={() => showNps(NPS_TECH_INSTALL)}>
        {NPS_TECH_INSTALL}
      </Button>
    </div>
  );
}
