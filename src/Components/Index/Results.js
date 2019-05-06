import React, { Component } from 'react'
import {Card, Button, Badge} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
export class Results extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        loading:false,
        result:null,
        search:"",
        suggestions:[]
      }
      this.suggestionsHandler=this.suggestionsHandler.bind(this)
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
        this.setState({loading:true})
        axios.post("http://127.0.0.1:5000/search",{query:this.state.search})
            .then(obj=>{
                this.setState({result:obj.data,loading:false})  
                this.props.history.push(`/${this.state.search}/results`)          
            })
            .catch(err=>{
                console.log(err)
            })
    }
  render() {
      const {loading,result} = this.state;
      let view;
      const {suggestions} = this.state;
    let show
    console.log(suggestions)
    
    show=suggestions.slice(0,7).map((obj,i)=>{
      return <option key={i} value={obj}/>
    });
      if(loading || result===null){
          view=<p>Loading ...</p>
      }else{
          view=result.map((obj,i)=>{
              let db=obj[0].split("_")[0]
              let name=obj[0].split("_")[1]
              return <Card key={i} className="ma3">
              <Card.Body>
              <div className="row">
              <Link to={`/display/${db}/${name}/${this.props.match.params.query}`} className="f4">{obj[2]}</Link>
              </div>
              <div className="row">
              <Link to={`/display/${db}/${name}/${this.props.match.params.query}`} className="gray hover-gray dim">{obj[0]}</Link>
              </div>
              <div className="row">
              {Object.keys(obj[1]).map(word=>{
                  return <Badge variant="success" className="ml4">{word} : {obj[1][word]}</Badge>

              })
            }
              </div>
              </Card.Body>
              </Card>
          })
      }
    return (
      <div>
      <div>
      <form onSubmit={this.onSubmitHandler.bind(this)}>
      <div className="form-group ma3 pa4">
      <input list="search" className="form-control" onChange={this.onChangeHandler.bind(this)} value={this.state.search} name="search"/>
      <datalist id="search" >
      {show}
    </datalist>     
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

export default withRouter(Results);
