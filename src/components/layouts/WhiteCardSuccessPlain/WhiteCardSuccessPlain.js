import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';
import IconButton from '../../elements/IconButton';

export default function WhiteCardSuccessPlain(props) {
  const { children, icon, subtitle, title, close } = props;
  return (
    <section className={styles.root}>
      {close && <IconButton name="close_red" to={close} />}
      <img alt="check" src={`/assets/grfx_${icon}.svg`} />
      <div className={styles.title}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

WhiteCardSuccessPlain.defaultProps = {
  children: null,
  close: '',
  icon: '',
  subtitle: '',
  title: '',
};

WhiteCardSuccessPlain.propTypes = {
  children: PropTypes.node,
  close: PropTypes.string,
  icon: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};
