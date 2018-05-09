import React, { Component } from 'react';
import 'reset-css/reset.css';
import './App.css';
import { footer } from 'reactstrap';
import queryString from 'query-string';
import Search from './pages/Search';
import Text from './components/Text';
import { Link } from 'react-router-dom';

class App extends Component {


  state = {
    // serverData: {},
    // filterString: '',
    // songs: []
  }
  gitcansu() {
    window.open("https://github.com/cansu2", '_blank');
  }

  gitjoes() {
    window.open("https://github.com/josephwilliam11", '_blank');
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
            <Search />
          </div> :
          <div>
            <Text />
            <center>
              <button className="loginButton loginButton1" onClick={() => {
                fetch('/login')
                  .then(res => res.json())
                  .then(({ url }) => window.location = url)
              }
              }
              >Sign in with Spotify <i className="fab fa-spotify"></i>

              </button>
            </center>
            <br></br>

          </div>

        }
        <center>
              <i className="fab fa-github-alt fa-3x git" onClick={this.gitcansu}></i>
              <i className="fab fa-github-alt fa-3x git"onClick={this.gitjoes}></i>
        </center>
      </div>
    )
  }
}

export default App;