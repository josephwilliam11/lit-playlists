import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ScrollArea from 'react-scrollbar';
import { convertDuration } from './Utils.js';
import './Results.css'

const Results = props => (
  <div>
    <ul className="list-group search-results">
      {props.array.map((track, i) => (
        <li key={track.id + i} className="list-group-item">
          <p><img src={track.album.images[2].url} />{track.name}  {convertDuration(track.duration_ms)}</p>
        </li>
      ))}
    </ul>
  </div>
);


export default Results;
