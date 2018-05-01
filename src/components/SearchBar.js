import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';


class SearchBar extends Component {
    state = {
        searchTerm: ""
    }

    handleInputChange(searchTerm) {
        this.setState({ searchTerm: searchTerm });
        this.props.onUserInput(this.state.searchTerm)
    }


    render() {
        return (    
          <Form>
              <FormGroup>
                  <Input 
                    type="text"
                    placeholder="Type in search term"
                    value={this.state.searchTerm}
                    onChange={(event) => this.handleInputChange(event.target.value)}
                  />
              </FormGroup>    
          </Form>    
        ) 
    }
}

export default SearchBar;