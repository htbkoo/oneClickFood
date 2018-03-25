import {BrowserRouter, Link, Route} from 'react-router-dom'
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';

import './css/Router.css';

let tableInfo = {restaurantName: "One Click Food Cafe", tableNumber: 1};

const Home = () => (
    <MuiThemeProvider>
        <App table_id={JSON.stringify(tableInfo)}/>
    </MuiThemeProvider>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

const Topic = ({match}) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);

const Topics = ({match}) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.path}/:topicId`} component={Topic}/>
        <Route exact path={match.path} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
);

const Router = () => (
    <BrowserRouter>
        <div className="Router">
            {/*<ul>*/}
            {/*<li><Link to="/">Home</Link></li>*/}
            {/*<li><Link to="/about">About</Link></li>*/}
            {/*<li><Link to="/topics">Topics</Link></li>*/}
            {/*</ul>*/}
            <Route exact path="/" component={Home}/>
            {/*<Route path="/about" component={About}/>*/}
            {/*<Route path="/topics" component={Topics}/>*/}
        </div>
    </BrowserRouter>
);

export default Router;