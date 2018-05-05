import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import ScrollArea from 'react-scrollbar';
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
      array: []
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
    // console.log("In search");
    var prev = null;
    // abort previous request, if any
    if (prev !== null) {
      prev.abort();
    }

    // store the current promise in case we need to abort it
    prev = spotifyApi.searchTracks(searchTerm, { limit: 50 });
    console.log(spotifyApi);

    prev.then((data) => {

        // clean the promise so it doesn't call abort
        prev = null;
  
        const items = data.tracks.items;
        console.log(items);
        items.forEach(function (item) {
    
          let ms = item.duration_ms;
          let min = Math.floor((ms/1000/60) << 0);
          let sec = Math.floor((ms/1000) % 60);
          
          // times.push(min + ':' + sec);
        })
        
        // console.log("ID ARRAY", ids);
        this.setState({array: items}) 
      
        console.log("names", this.state.array[1].name)
        // let analysis = "";
        // this.state.array.id.forEach(function (item) {
        //   //analysis getting dancebility value
        //   analysis = spotifyApi.getAudioFeaturesForTrack(item)
        //   analysis.then(function (res) {
        //     // console.log(res);
        //   })
        // })
      },
       function (err) {
        console.error(err);
      });
  }


  render() {
    // console.log("what is it", this.getHashParams(), this.state)
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
       <Results array={this.state.array} />

      </div>
    ); 
  }
}

export default Search;