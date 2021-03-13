import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import IconButton from '../../elements/IconButton';
import styles from './styles.scoped.css';

export default function WhiteCardPlain(props) {
  const { back, children, help, icon, size, subtitle, title, close } = props;
  const customClass = [styles.root, styles[size]].filter(Boolean).join(' ');
  const history = useHistory();

  const setContentBack = () => {
    if (back) {
      return <IconButton name="back_red" to={back} />;
    } else if (close) {
      return <IconButton name="close_red" to={close} />;
    }
    return <IconButton name="back_red" onClick={history.goBack} />;
  };

  return (
    <section className={customClass}>
      <header>
        {setContentBack()}
        {help && <IconButton name="help_red" to="/help" />}
      </header>
      {icon && <img alt={icon} className={styles.icon} src={`/assets/grfx_${icon}.svg`} />}
      <div className={styles.title}>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

WhiteCardPlain.defaultProps = {
  back: '',
  children: null,
  close: '',
  help: false,
  icon: '',
  size: 'large',
  subtitle: '',
  title: '',
};

WhiteCardPlain.propTypes = {
  back: PropTypes.string,
  children: PropTypes.node,
  close: PropTypes.string,
  help: PropTypes.bool,
  icon: PropTypes.string,
  size: PropTypes.oneOf(['large', 'medium']),
  subtitle: PropTypes.string,
  title: PropTypes.string,
};
