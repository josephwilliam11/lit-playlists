import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ListGroup, ListGroupItem} from 'reactstrap';
import ScrollArea from 'react-scrollbar';
import './Results.css'

const Results = props => (
    <ul className="list-group search-results">
      {props.array.map(track => (
        <li key={track.id} className="list-group-item">
          <p><img src={track.album.images[2].url} />{track.name}  {track.duration_ms}</p>
        </li>
      ))}
    </ul>
  );

// fix time
 
  export default Results;
  