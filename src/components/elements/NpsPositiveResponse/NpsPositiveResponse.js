import React, { useContext } from 'react';
import Button from '../Button';
import IconButton from '../IconButton';
import Modal from '../Modal';
import { NpsContext } from '../../../contexts';
import styles from './styles.scoped.css';

export default function NpsPositiveResponse() {
  const { dismissNps } = useContext(NpsContext);

  return (
    <Modal onClose={dismissNps} open>
      <div className={styles.root}>
        <header>
          <img alt="Rating" src="/assets/grfx_after_rating.svg" />
          <IconButton name="close_red" onClick={dismissNps} />
        </header>
        <h1>Thanks for the rating!</h1>
        <p>
          Please consider trying our app at the&nbsp;
          <a
            href="https://play.google.com/store/apps/details?id=com.telkom.indihome.external"
            target="_blank"
          >
            Play Store
          </a> or&nbsp;
          <a
            href="https://apps.apple.com/id/app/myindihome/id1119407221"
            target="_blank"
          >
            App Store
          </a>!
        </p>
        <footer>
          <Button onClick={dismissNps} variant="bordered">OK</Button>
        </footer>
      </div>
    </Modal>
  );
}
