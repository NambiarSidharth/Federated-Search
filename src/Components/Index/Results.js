import React, { Component } from 'react'
import {Card, Button} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
export class Results extends Component {
    state={
        loading:false,
        result:null,
        search:""
    }
    componentDidMount(){
        this.setState({loading:true})
        let query=this.props.match.params.query
        console.log(query)
        axios.post("http://127.0.0.1:5000/search",{query:query})
            .then(obj=>{
               this.setState({result:obj.data,loading:false})
            })
            .catch(err=>{
                console.log(err)
            })
    }
   
    onChangeHandler(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmitHandler(e){
        e.preventDefault()
        axios.post("http://127.0.0.1:5000/search",{query:this.state.search})
            .then(obj=>{
                this.setState({result:obj.data,loading:false})            
            })
            .catch(err=>{
                console.log(err)
            })
    }
  render() {
      const {loading,result} = this.state;
      let view;
      if(loading || result===null){
          view=<p>Loading ...</p>
      }else{
          view=result.map((obj,i)=>{
              return <Card key={i} className="ma3">
              <Card.Body>
              <Link to={`/display/${21}/${"sidharth"}`}>{obj}</Link>
              </Card.Body>
              </Card>
          })
      }
    return (
      <div>
      <div>
      <form onSubmit={this.onSubmitHandler.bind(this)}>
      <div className="form-group ma3 pa4">
      <input className="text" name="search" className="form-control" value={this.state.search} onChange={this.onChangeHandler.bind(this)}/>
      </div>
      <Button type="submit">Search</Button>
      </form>
      <div className="mv3">
      <h4>Results</h4>
      </div>
      </div>
      {view}
      </div>
    )
  }
}

export default Results
