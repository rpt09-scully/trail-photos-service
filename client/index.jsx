import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from './styles/Index.css';
import Photos from './components/Photos.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrailId: 1,
      photos: []
    }
  }
  componentDidMount() {

  axios.get(`/${this.state.currentTrailId}/photos`)
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
        <div className = {styles.rprbarcontainer}>
            <div className = {styles.rprbaritem}><h1>Reviews(x)</h1></div>
            <div className = {styles.rprbaritem}><h1>Photos(y)</h1></div>
            <div className = {styles.rprbaritem}><h1>Recordings(z)</h1></div>
        </div>
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
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

window.NT = window.NT || {};
window.NT.TrailPhotosService = App;