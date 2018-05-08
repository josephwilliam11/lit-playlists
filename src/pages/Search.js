import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import _ from 'lodash';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import ScrollArea from 'react-scrollbar';
import CustomizeSlider from '../components/Slider';
import { Container, Row, Col } from 'reactstrap';
import './Style.css';

const spotifyApi = new SpotifyWebApi();

class Search extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.state = {
      loggedIn: token,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      searchTerm: "",
      array: [],
      analysis: [],
      value: 0,
      username: ''
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    console.log("get now playing");
    spotifyApi.getMyCurrentPlaybackState()

      .then((response) => {
        console.log(spotifyApi)
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        });
      })
  }

  playTrack = () => {
    spotifyApi.createPlaylist(this.state.array)
      .then((response) => {
        console.log(response);

      })
  }


  getsearch = (searchTerm) => {
    function handleClick(e) {
      e.preventDefault()
    }
    //search by artist 50 tracks
    // var prev = null;
    // // abort previous request, if any
    // if (prev !== null) {
    //   prev.abort();
    // }
    // store the current promise in case we need to abort it
   spotifyApi.searchTracks(searchTerm, { limit: 50 })
    

    .then((data) => {

      // clean the promise so it doesn't call abort
      // prev = null;

      const items = data.tracks.items;
      console.log(items)
      items.forEach(function (item) {

        let ms = item.duration_ms;
        let min = Math.floor((ms / 1000 / 60) << 0);
        let sec = Math.floor((ms / 1000) % 60);
      })
      this.setState({ array: items })
    },
      function (err) {
        console.error(err);
      });
  }

  sliderChange = (val) => {
    console.log("cans")
    this.state.array.forEach((item) => {
      //analysis getting dancebility value           
      const analysis = spotifyApi.getAudioFeaturesForTrack(item.id)
      analysis.then((res) => {
        // console.log(this.state.analysis)
        const { analysis } = this.state;

        this.setState({
          // dance: [...dance, res.danceability]
          analysis: [...analysis, res]
        })
        // const val = this.state.value;
        const trackAnalysis = this.state.analysis;
        let sorted = '';
        console.log(val)
        switch (val) {
          case 1.0:
             sorted = _.sortBy(trackAnalysis, ['danceability', 'desc'])
            console.log('1.0' , sorted.reverse())
            break;
          case 0.25:
             sorted = _.sortBy(trackAnalysis, ['danceability', 'ASC'])
            console.log('0.25' , sorted)
            break;
          case 0.50:
              sorted = _.filter(trackAnalysis, function(track) {
              return track.danceability <= val           
            })
            sorted = _.sortBy(sorted, ['danceability', 'ASC'])
            console.log('0.50' , sorted)
            break;
          case 0.75:
            sorted = _.filter(trackAnalysis, function(track) {
            return track.danceability <= val 

          })
          sorted = _.sortBy(sorted, ['danceability', 'DESC'])
          console.log('0.75' , sorted.reverse())
          break;
        }
        this.setState({sorted})
        console.log(this.state.sorted);
        // this.showPlaylist();
      })

    })
  
}

// showPlaylist() {
//   this.state.sorted.forEach((item) => {
//     // console.log(item.id)
//     spotifyApi.getTrack(item.id)
//      .then((res) => {
//       console.log(res)
//      })
//   })  
// }

  componentDidMount() {

    spotifyApi.getMe()
      .then((response) => {
        console.log(response.display_name);
        this.setState({
          username: response.display_name
        })
      })
  }


  render() {
    return (
      <div className="App">
       <Row>
            <Col md="12">
            <p className= "welcome">Welcome! {this.state.username}</p>
            </Col>
          </Row>
          <Row>
            <Col md="3">
            </Col>
            <Col md="9">
        <Container>  
          <Row>
            <Col md="8">
            <p className="desc">To Create A Playlist Seach by Artist</p>
            </Col>
          </Row>
          {this.state.loggedIn &&
          
            <Row>
              <Col md="8">
                <div>
                  <SearchBar className="search"
                    getsearch={this.getsearch}
                  />
                </div>
              </Col>
      
            </Row>           
          }
          <Row>
            <Col md="8">
              {/* <CustomizeSlider sliderChange={this.sliderChange(this.state.value)} /> */}
              <CustomizeSlider sliderChange={this.sliderChange}/>
            </Col>
          </Row>
          <Row>
          <Col md="12">
            {/* <Save /> */}
            <button> save</button>
            </Col>
          </Row>
          <Row>
            <Col md="8">
              <Results className="resultsContainer" array={this.state.array} />
            </Col>
          </Row>
          
        </Container>
        </Col>
        </Row>
      </div>
    );
  }
}

export default Search;