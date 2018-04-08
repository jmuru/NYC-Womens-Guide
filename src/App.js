import React  from 'react';
import Home from './pages/home';
import Organization from './pages/organization';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={Home}></Route>
            <Route path="/organization/:orgname" component={Organization}></Route>
        </div>
    </Router>
)

export default App;