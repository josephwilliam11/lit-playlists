import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import _ from 'lodash';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import ScrollArea from 'react-scrollbar';
import CustomizeSlider from '../components/Slider';
import { Container, Row, Col } from 'reactstrap';
import './Style.css';
import axios from 'axios';

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
      username: '',
      sorted: [],
      items: [],
      filteredArray: []
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
  
  this.saveSearchterm(searchTerm);
    
   spotifyApi.searchTracks(searchTerm, { limit: 50 })
    

    .then((data) => {

      // clean the promise so it doesn't call abort
      // prev = null;

      const items = data.tracks.items;
      items.forEach(item => {
        spotifyApi.getAudioFeaturesForTrack(item.id).then(res => {
          item.danceability = res.danceability;
          const { items } = this.state;
        this.setState({
          items: [...items, item]
        })
        });

      });


      this.setState({ array: items })
    },
      function (err) {
        console.error(err);
      });
  }

  sliderChange = (val) => {
    this.setState({value: val});
    const filteredArray = this.state.items.filter(item => item.danceability >= this.state.value);
    this.setState({filteredArray: filteredArray});
}

showPlaylist() {
  this.state.sorted.forEach((item) => {
    // console.log(item.id)
    spotifyApi.getTrack(item.id)
     .then((res) => {
      console.log(res)
     })
  })  
}

  componentDidMount() {

    spotifyApi.getMe()
      .then((response) => {
        console.log(response.display_name);
        console.log("RESPONS" ,response);
        this.setState({
          username: response.email
        })
      this.getUserInfo(response.email)
      })
    }

    getUserInfo = (user) => {
      console.log(user)

      axios.post(`/login/search`, { user })
      .then(res => {
        console.log(res);
      })
    
    }

    saveSearchterm = (term) => {
      axios.post(`/login/searchterm`, { term })
      .then(res => {
        console.log(res);
      })
    } 

  render() {
 

    // const filteredArray = this.state.items.filter(item => item.danceability >= this.state.value);
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
              <Results className="resultsContainer" array={this.state.filteredArray} />
              {/* <Results className="resultsContainer" array={this.state.array} /> */}
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