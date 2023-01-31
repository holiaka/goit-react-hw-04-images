import React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ReactComponent as ReactSVG2 } from '../../image/svg/circle_close_icon.svg';
import { ModalOverlay, ImageBox, ModalButton, ModalImg } from './Modal.style';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ bigImg, switchModal }) => {
  const handleBackdrop = evt => {
    if (evt.target === evt.currentTarget) {
      switchModal('');
    }
  };

  useEffect(() => {
    const handleEsc = evt => {
      if (evt.code === 'Escape') {
        switchModal('');
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [switchModal]);

  return createPortal(
    <>
      <ModalOverlay onClick={handleBackdrop}>
        <ModalButton type="button" onClick={() => switchModal('')}>
          <ReactSVG2 width={50} height={50} />
        </ModalButton>
        <ImageBox>
          <ModalImg
            onerror="src='../../image/no_internet.webp'"
            src={bigImg}
            alt="There should have been a big picture here!!!"
          />
        </ImageBox>
      </ModalOverlay>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  bigImg: PropTypes.string.isRequired,
  switchModal: PropTypes.func.isRequired,
};
