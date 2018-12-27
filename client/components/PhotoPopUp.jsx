import React from 'react';
import styles from '../styles/PhotoPopUp.css';

const PhotoPopUp = (props) => {
  return (
    <div className = {styles.container} onClick = { e => props.photoClickTransHandler(e.target)}>
      <div className = {styles.topContainer}>
        <div className = {styles.prev}>PREV</div>
        <div>
        <img className = {styles.image} src = {props.currentPhotoInfo.attributes.photo_url}></img>
        </div>
        <div className = {styles.next}>NEXT</div>
      </div>

      <div className = {styles.titleBar}>
        <img className = {styles.profileImage} src = {props.currentProfileInfo.attributes.photo_url}></img>
        {props.currentProfileInfo.attributes.first_name} {props.currentProfileInfo.attributes.last_name}<br/>
        {props.currentPhotoInfo.attributes.caption} <br />
        {props.currentPhotoInfo.attributes.upload_date}
      <div className = "cancel">CANCEL</div>
      </div>
    </div>
  );
};

export default PhotoPopUp;