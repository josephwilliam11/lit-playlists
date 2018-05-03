import React, { Component } from 'react';
import 'reset-css/reset.css';
import './App.css';
import SearchBar from './components/SearchBar';
import queryString from 'query-string';
import Search from './pages/Search';

class App extends Component {


  state = {
    // serverData: {},
    // filterString: '',
    // songs: []
  }

  onUserInput(searchTerm) {

  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.hash);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => response.json())
      .then(data => this.setState({
        user: {
          name: data.email
        }
      }))
  }
  render() {

    return (
      <div className="App">
        {this.state.user ?
          <div>
            <h1>
          <Search />  
              {/* <SearchBar onUserInput={this.onUserInput} /> */}

              Welcome {this.state.user.name}
            </h1>
          </div> : <button onClick={() => {
            fetch('/login')
              .then(res => res.json())
                .then(({url}) => window.location = url)
          }
          }
          >Sign in with Spotify</button>
          // button component or landing button
        }
      </div>
    )
  }
}

export default App;