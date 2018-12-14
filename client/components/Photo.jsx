import React from 'react';
import styles from '../styles/Photo.css';

const Photo = (props) => {
  return(
    <div>
      <div className = {styles.container}>
      <img className = {styles.image} src = {props.photoItem.attributes.photo_url}></img>
      </div>
    </div>
  )
}

export default Photo;