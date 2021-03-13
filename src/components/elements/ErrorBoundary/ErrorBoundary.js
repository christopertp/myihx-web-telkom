import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import WhiteCard from '../../layouts/WhiteCard';
import styles from './styles.scoped.css';

export default class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (!error) {
      return children;
    }

    return (
      <WhiteCard icon="status_failed" subtitle="Try reload the page" title="Ooops.. Something went wrong.">
        <Button className={styles.button} onClick={() => location.reload()}>Reload</Button>
      </WhiteCard>
    );
  }
}

ErrorBoundary.defaultProps = {
  children: null,
};

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};
