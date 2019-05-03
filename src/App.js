import React from 'react';
import { BrowserRouter as Router ,Route} from "react-router-dom";
import Search from "./Components/Index/Search";
import './App.css';
import "tachyons";
import Display from "./Components/Index/Display";
import Results from "./Components/Index/Results";
function App() {
  return (
    <Router>
    <div className="App">
      <div>
       <Route exact path="/" component={Search} />
       <Route exact path="/:query/results" component={Results} />
       <Route exact path="/display/:id/:doc/:query" component={Display} />
      </div>
    </div>
    </Router>
  );
}

export default App;
