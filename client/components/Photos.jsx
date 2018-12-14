import React from 'react';
import Photo from './Photo.jsx'
import styles from '../styles/Photos.css';

const Photos = (props) => {
  return(
    <div className = {styles.container}>
      {props.photos.map(photo => <Photo photoItem = {photo}/>)}
    </div>
  )
}

export default Photos;