// import React, { Component } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  const handleClose = () => {
    window.removeEventListener('keydown', handleKeyDown);
    onClose();
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      handleClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      handleClose();
    }
  };

  return createPortal(
    <div className={styles.Modal__overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal__content}>{children}</div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export { Modal };

// class Modal extends Component {
//   state = {};

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={styles.Modal__overlay} onClick={this.handleBackdropClick}>
//         <div className={styles.Modal__content}>{this.props.children}</div>
//       </div>,
//       modalRoot,
//     );
//   }
// }
