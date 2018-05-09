import React from 'react';
import ReactDOM from 'react-dom';

const cStyle= {
    color: 'white',
   
    // textAlign: 'center',
    // padding: '10px'

    
}
const dStyle= {
    marginBottom: '100px',
    fontSize: '25px'

}

const pStyle= {
    padding: '50px',
    fontSize: '50px'
}
const  Text = () => (
    <center>
    <container style={cStyle}>
        <p style={pStyle}>Lit Playlists</p>
        <p style={dStyle}>Create a custom Spotify playlist</p>
    </container>
    </center>
)

export default Text;