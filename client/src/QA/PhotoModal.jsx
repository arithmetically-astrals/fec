import React, {useEffect, useRef} from 'react';
import axios from 'axios';

const PhotoModal = (props) => {

  const modal = useRef(null);

  useEffect(() => {
    const delta = 6;
    let startX;
    let startY;
    const handleOutsideClick = (e) => {
      if (modal.current && !modal.current.contains(e.target)) {
        props.setPhotoModal(false);
      }
    };
    const handleMouseDown = (e) => {
      startX = e.pageX;
      startY = e.pageY;
    };
    const handleMouseUp = (e) => {
      const diffX = Math.abs(e.pageX - startX);
      const diffY = Math.abs(e.pageY - startY);
      if (diffX < delta && diffY < delta) {
        handleOutsideClick(e);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [modal]);

  return (
    <div className='qa-modal-background'>
      <div className={document.getElementsByClassName('bodyDark').length
      ? 'qa-close-dark'
      : 'qa-close'
      }/>
      <img id='qa-photo-modal' src={props.clickedPhoto} ref={modal}/>
    </div>
  )
}

export default PhotoModal;