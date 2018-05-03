import React, { Component } from 'react';
import { Form, FormGroup, Input,Button } from 'reactstrap';


class SearchBar extends Component {
    state = {
        searchString: ""    
    }

    handleInputChange = (sTerm) => {
        let str = this.state.searchString;
        str = str+ sTerm;
        console.log("The search Term:",sTerm);
        this.setState({ searchString: sTerm });
        // this.props.search(this.state.searchTerm)
    }
   
    getresults = () => {
        let str = this.state.searchString;
        this.props.getsearch(str);
    }
 
    render() {
        return (    
          <Form>
              <FormGroup>
                  <Input 
                    type="text"
                    placeholder="Type in search term"
                    value={this.state.searchString}
                    onChange={(event) => this.handleInputChange(event.target.value)}
                  />
                  <button type="submit" onClick={this.getresults}></button>
        
              </FormGroup>    
          </Form>    
        ) 
    }
}

export default SearchBar;