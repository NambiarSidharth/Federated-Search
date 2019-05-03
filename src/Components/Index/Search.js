import React, { Component } from 'react'
import {Button,Card} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import axios from "axios";
export class Search extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         search:"",
         suggestions:[]
      }
      this.onChangeHandler=this.onChangeHandler.bind(this)
      this.onSubmitHandler=this.onSubmitHandler.bind(this)
      this.suggestionsHandler=this.suggestionsHandler.bind(this)
    }
    onChangeHandler(e){
        this.setState({[e.target.name]:e.target.value})
        setTimeout(()=>{
          this.suggestionsHandler(this.state.search)
        },1000);
        
    }
    suggestionsHandler(query){
      console.log(query)
      axios.get("http://127.0.0.1:5000/suggest/"+query)
          .then(obj=>{
            console.log(typeof obj.data)
            this.setState({suggestions:obj.data})
          }).catch(err=>{
            this.setState({suggestions:[]})
          })
    }
    onSubmitHandler(e){
        e.preventDefault()
        this.props.history.push("/"+this.state.search+"/results")
    }
    
  render() {
    const {suggestions} = this.state;
    let show
    console.log(suggestions)
    
    show=suggestions.slice(0,7).map((obj,i)=>{
      return <option key={i} value={obj}/>
    });
    return (
      <div className="row center">
      <div className="col-md-12 center mt5">
      <Card style={{width:"50rem"}} className="center">
      <Card.Body>
        <form onSubmit={this.onSubmitHandler}>
        <div className="form-group">
        <input list="search" onChange={this.onChangeHandler} value={this.state.search} name="search"/>
        <datalist id="search" >
        {show}
      </datalist>
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
