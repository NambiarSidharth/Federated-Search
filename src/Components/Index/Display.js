import React, { Component } from 'react';
import {Card} from "react-bootstrap";
import axios from "axios";
class Display extends Component {
    state={
        data:null,
        loading:false
    }
    componentDidMount(){
        let id=this.props.match.params.id
        let doc =this.props.match.params.doc
        console.log(id)
        axios.get(`http://127.0.0.1:5000/display/${id}/${doc}`)
            .then(obj=>{
               this.setState({data:obj.data,loading:false})
            })
            .catch(err=>{
                console.log(err)
            })
    }
  render() {
    const {loading,data} = this.state;
    let view;
    if(loading || data===null){
        view=<p>Loading ...</p>
    }else{
        view=<div><Card className="pa3">
       { data['name']}
        </Card>
        <Card className="mv3">
        <Card.Header>
        Content
        </Card.Header>
        <Card.Body>
        {data.data}
        </Card.Body>
        </Card>
        </div>
    }
    return (
      <div> {view} </div>
    );
  }
}

export default Display;
