import React from 'react';
import styles from '../styles/Photo.css';
import $ from 'jquery';

const Photo = (props) => {
  return (
    <div>
      <div className = {styles.container} onClick = {() => props.photoClickHandler(props.pagePhotoCounter)} >
        <img className = {styles.image} src = {props.photoItem.attributes.thumb_photo_url}></img>
      </div>
    </div>
  );
};

export default Photo;