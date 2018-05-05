
import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import SearchBar from '../components/SearchBar';
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
      idArray: []
    }
  }


  // handleInputChange(searchTerm) {
  //     this.setState({ searchTerm: searchTerm });
  //     this.props.onUserInput(this.state.searchTerm)
  // }

  

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
    let token = 
  console.log(spotifyApi);
  console.log(token)
    spotifyApi.getMyDevices()
    spotifyApi.getMe()
    spotifyApi.getUserPlaylists()
    spotifyApi.pause()
    // spotifyApi.play('1223418399')
    
    
      .then((response) => {
        console.log(response);

      })
  }


  getsearch = (searchTerm) => {
    //search by artist 50 tracks
    console.log("In search");
    var prev = null;
    let items = [];
    let ids = [];
    // abort previous request, if any
    if (prev !== null) {
      prev.abort();
    }

    // store the current promise in case we need to abort it
    prev = spotifyApi.searchTracks(searchTerm, { limit: 50 });
    // console.log(prev);
    prev.then(function (data) {
      // clean the promise so it doesn't call abort
      prev = null;

      items = data.tracks.items;

      items.forEach(function (item) {
        ids.push(item.id)
      })
      console.log("ID ARRAY", ids);
      let analysis = "";
      ids.forEach(function (item) {
        //analysis getting dancebility value
        analysis = spotifyApi.getAudioFeaturesForTrack(item)
        analysis.then(function (res) {
          console.log(res);
        })
      })


    }, function (err) {
      console.error(err);
    });
  }



  render() {
    console.log("what is it", this.getHashParams(), this.state)
    return (
      <div className="App">
        <div>
          Now Playing: {this.state.nowPlaying.name}
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        {this.state.loggedIn &&
          <div>
            <button onClick={() => this.playTrack()}>
              Check Now Playing
          </button>
            <SearchBar
              getsearch={this.getsearch}
              />

          </div>
        }

      </div>
    );
  }
}

export default Search;