import React from 'react';
import axios from 'axios';
import styles from './styles/Index.css';
import Photos from './components/Photos.jsx';
import PhotoPopUp from './components/PhotoPopUp.jsx';
import { getTrailIdURL, detectEnvironment } from './services/utilities';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrailId: getTrailIdURL(),
      environment: detectEnvironment(),
      photos: [],
      currentPhotoCounter: undefined,
      currentPhotoInfo: {},
      currentProfileInfo: {},
      currentSortType: "nineTrailsSort"
    };
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
    this.handlePhotoClickTrans = this.handlePhotoClickTrans.bind(this);
    this.handleSortTypeClick = this.handleSortTypeClick.bind(this);
  }

  handlePhotoClick(photoCounter) {
    this.setState({currentPhotoInfo: this.state.photos[photoCounter]}, () => {
      let photoUserId = this.state.currentPhotoInfo.attributes.user_id;
      let profilesEndpoint = this.state.environment.profile + `/user/${photoUserId}`;
      axios.get(profilesEndpoint)
        .then((response) => {
          this.setState({currentProfileInfo: response.data.data});
          this.setState({currentPhotoCounter: photoCounter});
        })
        .catch(function (error) {
          console.log('err', error);
        });
    });


  }

  handleSortTypeClick(sortType) {
    this.setState({currentSortType: sortType}, () => {

    let photosEndpoint = this.state.environment.photos + `/${this.state.currentTrailId}/photos`
    if(this.state.currentSortType.includes("newSort")){
      photosEndpoint += `?sort=desc`;
    } else if (this.state.currentSortType.includes("oldSort")){
      photosEndpoint += `?sort=asc`;
    }

    axios.get(photosEndpoint)
      .then((response) => {
        let photoData = response.data.data;
        this.setState({photos: photoData});
        var clickedSort = document.getElementsByClassName(`${this.state.currentSortType}`);
        console.log("hi", clickedSort);
      })
      .catch(function (error) {
        console.log('err', error);
      });
    });
  }

  handlePhotoClickTrans(e) {
    let newCounter;
    let currentPhotoCounter = this.state.currentPhotoCounter;
    let keyWords = {
      cancel: () => {
        this.setState({currentPhotoCounter: undefined});
      },
      next: () => {
        return currentPhotoCounter + 1;
      },
      prev: () => {
        return currentPhotoCounter - 1;
      }
    };

    for(var key in keyWords){
      if(e.className.includes(key)){
        newCounter = keyWords[key]();
        key !== "cancel" && this.handlePhotoClick(newCounter);
      }
    }
  }
  componentDidMount() {
    this.handleSortTypeClick("nineTrailsSort");
  }

  render() {
    return (
      <div className = {styles.container}>
        <h2>
          Share your experience to help other people learn about this trail:
        </h2>
        <div onClick = { (e) => { this.handleSortTypeClick(e.target.className)}} >
          <span className = {`nineTrailsSort ${styles.sortText}`}>NineTrails Sort</span> | <span className = {`newSort ${styles.sortText}`}>Newest First</span> | <span className = {`oldSort ${styles.sortText}`}>Oldest First</span>
        </div>
        <Photos photos = {this.state.photos} photoClickHandler = {this.handlePhotoClick}/>
        {this.state.currentPhotoCounter !== undefined && <PhotoPopUp currentPhotoInfo = {this.state.currentPhotoInfo} currentProfileInfo = {this.state.currentProfileInfo} photoClickTransHandler = {this.handlePhotoClickTrans}/>}
      </div>
    );
  }
}

window.NT = window.NT || {};
window.NT.TrailPhotosService = window.NT.TrailPhotosService || {};
window.NT.TrailPhotosService.App = App;