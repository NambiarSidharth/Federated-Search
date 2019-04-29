import React, { Component } from 'react'
import {Button,Card} from "react-bootstrap";
import {withRouter} from "react-router-dom";
export class Search extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         search:""
      }
      this.onChangeHandler=this.onChangeHandler.bind(this)
      this.onSubmitHandler=this.onSubmitHandler.bind(this)
    }
    onChangeHandler(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmitHandler(e){
        e.preventDefault()
        this.props.history.push("/"+this.state.search+"/results")
    }
    
  render() {
    return (
      <div className="row center">
      <div className="col-md-12 center mt5">
      <Card style={{width:"50rem"}} className="center">
      <Card.Body>
        <form onSubmit={this.onSubmitHandler}>
        <div className="form-group">
        <input type="text" name="search" className="form-control center" placeholder="query please?"  onChange={this.onChangeHandler} value={this.state.search} />
        </div>
        <Button variant="outline-info" type="submit" >
        Search
        </Button>
        </form>
        </Card.Body>
    </Card>
    </div>
      </div>
    )
  }
}

export default withRouter(Search);
