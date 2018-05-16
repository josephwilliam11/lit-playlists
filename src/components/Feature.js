import React from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import './SearchBar.css';


export default class Feature extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.select = this.select.bind(this);
        this.state = {
            dropdownOpen: false,
            value: "",
            text:"danceability"
        };

    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        }); 

    }

   

    select(event) {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen,
          value: event.target.innerText,
          text: event.target.innerText
        });
        console.log("feature", event.target.innerText)
        let str = event.target.innerText;
        this.props.getselect(str)
      }

    render() {
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="dropbtn">
                <DropdownToggle
                    tag="span"
                    onClick={this.toggle}
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                    className="feature"
                >
                   {this.state.text}
        </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <div onClick={this.select} >danceability</div>
                    </DropdownItem>
                    <DropdownItem>
                        <div onClick={this.select} >energy</div>
                    </DropdownItem>
                    <DropdownItem>
                        <div onClick={this.select} >instrumentalness</div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }
}
