import React from 'react';
import styles from '../styles/Photo.css';
import $ from 'jquery';

const Photo = (props) => {
  function handlePhotoClick(e) {
    console.log(e.target);
    $('popuptext').css('display', 'block');
  }

  return (
    <div>
      <div className = {styles.container} onClick = {handlePhotoClick} >
        <img className = {styles.image} src = {props.photoItem.attributes.photo_url}></img>
        <span className={styles.popuptext}>
          <img className = {styles.origImage} src = {props.photoItem.attributes.photo_url}></img>
        </span>
      </div>
    </div>
  );
};

export default Photo;