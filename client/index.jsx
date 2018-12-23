import React from 'react';
import axios from 'axios';
import styles from './styles/Index.css';
import Photos from './components/Photos.jsx';
import { getTrailIdURL, detectEnvironment } from './services/utilities';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrailId: getTrailIdURL(),
      environment: detectEnvironment(),
      photos: []
    };
  }

  componentDidMount() {
    let photosEndpoint = this.state.environment.photos + `/${this.state.currentTrailId}/photos`;
    axios.get(photosEndpoint)
      .then((response) => {
        let photoData = response.data.data;
        this.setState({photos: photoData});
      })
      .catch(function (error) {
        console.log('err', error);
      });
  }

  render() {
    return (
      <div className = {styles.container}>
        <h2>
          Share your experience to help other people learn about this trail:
        </h2>
        <div>
          Button Bar Placeholder
        </div>
        <div>
          Sort Bar Placeholder
        </div>
        <Photos photos = {this.state.photos}/>
      </div>
    );
  }
}

window.NT = window.NT || {};
window.NT.TrailPhotosService = window.NT.TrailPhotosService || {};
window.NT.TrailPhotosService.App = App;