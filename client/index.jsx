import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from './styles/Index.css';
import Photos from './components/Photos.jsx';
import getTrailIdURL from './services/utilities';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrailId: getTrailIdURL(),
      photos: []
    };
  }

  componentDidMount() {
    axios.get(`http://trail-photos-service-dev.us-west-1.elasticbeanstalk.com/${this.state.currentTrailId}/photos`)
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

ReactDOM.render(<App />, document.getElementById('9Trails.TrailPhotosService.App'));

window.NT = window.NT || {};
window.NT.TrailPhotosService = window.NT.TrailPhotosService || {};
window.NT.TrailPhotosService.App = App;