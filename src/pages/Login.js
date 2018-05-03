import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';


class Login extends Component {
 
    state = {
        searchTerm: ""
    }

    handleInputChange(searchTerm) {
        this.setState({ searchTerm: searchTerm });
        this.props.runSearch(this.state.searchTerm)
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
  
  export default Login;