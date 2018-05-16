import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Col, Container, Row} from 'reactstrap';
import './SearchBar.css';


class SearchBar extends Component {
    state = {
        searchString: ""    
    }

    handleInputChange = (sTerm) => {
        let str = this.state.searchString;
        str = str+ sTerm;
        // console.log("The search Term:",sTerm);
        this.setState({ searchString: sTerm });
        // this.props.search(this.state.searchTerm)
    }
   
    getresults = () => {
        let str = this.state.searchString;
        this.props.getsearch(str);
    }

    reload(){
        document.location.reload(true)
    }
 
    render() {
        return (  

          <Form>
              <Row>
                  <Col md="8">
              <FormGroup>
                  <Input 
                    type="text"
                    placeholder="Artist Name"
                    value={this.state.searchString}
                    onChange={(event) => this.handleInputChange(event.target.value)}
                  />
              </FormGroup> 
              </Col>
              <Col md ="2">
                 <Button className="searchBtn searchBtn1" type="submit" onClick={this.getresults}>Search</Button>
               </Col> 
               <Col md ="2">
                 <Button className="searchBtn searchBtn1"  onClick={this.reload}>Clear</Button>
               </Col> 
                </Row>
          </Form>    
        ) 
    }
}

export default SearchBar;