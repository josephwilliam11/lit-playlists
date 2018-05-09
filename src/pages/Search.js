import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import _ from 'lodash';
import ReactPlayer from 'react-player'
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import ScrollArea from 'react-scrollbar';
import CustomizeSlider from '../components/Slider';
import { Container, Row, Col, Button } from 'reactstrap';
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
      username: '',
      sorted: [],
      items: [],
      filteredArray: [],
      userId: ''
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

      items.forEach(item => {
        spotifyApi.getAudioFeaturesForTrack(item.id).then(res => {
          item.danceability = res.danceability;
          const { items } = this.state;
        this.setState({
          items: [...items, item]
        })
        });
        this.setState(
          {filteredArray: items}
        )
      });


      this.setState({ array: items })
    },
      function (err) {
        console.error(err);
      });
  }

  sliderChange = (val) => {
    this.setState({value: val});
    const filteredArray = this.state.items.filter(item => item.danceability <= val);
    this.setState(
      {filteredArray: filteredArray}
    )  
    console.log(this.state.filteredArray)
}

savePlaylist = () => {
  console.log('joe')
  console.log(this.state.userId)
  const id = this.state.userId;
  console.log(spotifyApi)
  const playlistTracks = this.state.filteredArray;
  const playlistName = "My Playlist "+ new Date();
  spotifyApi.createPlaylist(id, {name: playlistName}, (err,res)=> {
    console.log(res, err) 
    if(err) return;
    if( res && !!res.id ){
      console.log("playlist created now adding tracks")
      const uris = playlistTracks.map((track,index)=>{
        return track.uri
      } )
      //uris = uris.join(',');
      console.log(res.id, uris)
      spotifyApi.addTracksToPlaylist(this.state.userId,res.id, uris, (err,res)=> {
        console.log(res, err) 
        if(err) return;
        if(res){
          console.log('created snapshot and all tracks are in the playlist')
          alert('Playlist added to Spotify!')
        }
      })
    }
})
}

  componentDidMount() {

    spotifyApi.getMe()
      .then((response) => {
        console.log(response.display_name);
        console.log(response)
        this.setState({
          username: response.display_name,
          userId: response.id
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
          
            </Col>
          </Row>
          {this.state.loggedIn &&
          
            <Row>
              <Col md="8">
            
                  <SearchBar className="search"
                    getsearch={this.getsearch}
                  />
                  
              
              </Col>
              <Col md="8">
            <p className="desc">Adjust Playlist Based on Tempo, Rythm, Beat, and Regularity</p>
            </Col>
      
            </Row>  
                     
          }
          <Row>
            <Col md="8">
              {/* <CustomizeSlider sliderChange={this.sliderChange(this.state.value)} /> */}
              <CustomizeSlider sliderChange={this.sliderChange}/>
              <Row>
                <Col md='10'>
              <span><i className="fas fa-fire fa-1x fire"></i></span>
              </Col>
              <Col md="2">
              <span><i className="fas fa-fire fa-1x fire fire1"></i></span>
        
              <span><i className="fas fa-fire fa-1x fire fire1"></i></span>
              </Col>
              </Row>
            </Col>
          </Row>
          <Row>
          <Col md="8">
            {/* <Save /> */}
            <Button className="savebtn savebtn1" onClick={this.savePlaylist}>Save to Spotify</Button>

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