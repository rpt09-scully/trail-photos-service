import React from 'react';
import styles from '../styles/PhotoPopUp.css';
import moment from 'moment';

const PhotoPopUp = (props) => {
  props.currentPhotoInfo.attributes.rel_upload_date = moment(props.currentPhotoInfo.attributes.upload_date).fromNow();

  return (
    <div className = {styles.container} onClick = { e => props.photoClickTransHandler(e.target)}>
      <div className = {styles.topContainer}>
        <div className = {styles.cancel}>X</div>
        <div className = {styles.prev}>PREV</div>
        <img className = {styles.image} src = {props.currentPhotoInfo.attributes.photo_url}></img>
        <div className = {styles.next}>NEXT</div>
      </div>

      <div className = {styles.bottomContainer}>
        <img className = {styles.profileImage} onError={(e) => e.target.src = 'https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/UlIqmHJn-SK.gif'} src = {props.currentProfileInfo.attributes.photo_url} ></img>
        <div className = {styles.descName}>
          {props.currentProfileInfo.attributes.first_name} {props.currentProfileInfo.attributes.last_name}<br/>
          {props.currentPhotoInfo.attributes.caption} <br />
        </div>
        <div className = {styles.date}>
          {props.currentPhotoInfo.attributes.rel_upload_date}
        </div>
      </div>

    </div>
  );
};

export default PhotoPopUp;