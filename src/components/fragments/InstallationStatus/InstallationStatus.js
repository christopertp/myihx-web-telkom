import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Bullet from '../../elements/Bullet';
import Button from '../../elements/Button';
import Modal from '../../elements/Modal';
import styles from './styles.scoped.css';
import { TEXT } from './constants';

const installationProcess = [
  'Measure ODP distance to installation point',
  'Installing cable & internet',
  'Installing UseeTV hybrid box',
];

export default function InstallationStatus() {
  const [open, setModal] = useState(false);
  const status = 2;  // hardcode

  const onClickOpen = () => {
    setModal(!open);
  };

  return (
    <>
      <ul className={styles.root}>
        {TEXT.map((i, idx) => {
          const subtitleStyle = i.action ? { paddingBottom: 0 } : {};
          const subtitleClassName = idx < status ? styles['subtitle-complete'] : styles.subtitle;
          const titleClassName = (() => {
            if (status === 3) {
              return styles['title-all-complete'];
            } else if (idx < status) {
              return styles['title-complete'];
            }
            return styles.title;
          })();

          const color = (() => {
            if (status === 3) {
              return ['#0eb37e', '#0eb37e'];
            } else if (idx + 1 < status) {
              return ['#ee3124', '#ee3124'];
            } else if (idx < status) {
              return ['#ee3124', '#e5e6e6'];
            }
            return ['#e5e6e6', '#e5e6e6'];
          })();

          return (
            <li key={idx}>
              <Bullet color={color} connect={TEXT.length !== idx + 1} />
              <h5 className={titleClassName} >{i.title}</h5>
              <p className={subtitleClassName} style={subtitleStyle} >{i.subtitle}</p>
              {i.action ? (
                <Button
                  onClick={onClickOpen}
                  variant="text"
                >
                  Learn more about the installation process
                </Button>
              ) : ''}
            </li>
          );
        })}
      </ul>
      <StatusModal onClose={() => setModal(false)} open={open} />
    </>
  );
}

export function StatusModal(props) {

  return (
    <Modal className={styles.modal} {...props} >
      <h2>Installation Process</h2>
      <p>Your technician will do all the following steps</p>
      <ul className={styles.process}>
        {installationProcess.map((item, idx) => {
          return (
            <li key={idx}>
              <Bullet
                color={['#cccdce', '#cccdce']}
                connect={installationProcess.length !== idx + 1}
              />
              <p>{item}</p>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}

StatusModal.defaultProps = {
  onClose: () => { },
  open: false,
};

StatusModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
