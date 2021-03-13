import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../../contexts';
import styles from './styles.scoped.css';

export default function Modal(props) {
  const { modal, setModal } = useContext(AppContext);
  const { open, className, children, onClose } = props;

  useEffect(() => {
    open && setModal(<Content children={children} className={className} />);
    return () => setModal(null);
  }, []);

  useEffect(() => {
    setModal(open ? <Content children={children} className={className} /> : null);
  }, [open]);

  const [modalContent, setModalContent] = useState(modal);

  useEffect(() => {
    if (modalContent && !modal) {
      onClose();
      setModalContent(modal);
    } else if (!modalContent && modal) {
      setModalContent(modal);
    }
  }, [modal, modalContent]);

  useEffect(() => {
    open && setModal(<Content children={children} className={className} />);
  }, [children, className]);

  return null;
}

Modal.defaultProps = {
  children: null,
  className: '',
  onClose: () => { },
  open: false,
};

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export function Content({ className, children }) {
  const customClass = [styles.root, className].filter(Boolean).join(' ');
  return (
    <section className={customClass}>
      {children}
    </section>
  );
}

Content.defaultProps = {
  children: null,
  className: '',
};

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
