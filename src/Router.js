import {BrowserRouter, Route} from 'react-router-dom'
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';

import './css/Router.css';

let tableInfo = {restaurantName: "譚仔 (數碼港)", tableNumber: 1};

const Home = () => (
    <MuiThemeProvider>
        <App tableInfo={tableInfo}/>
    </MuiThemeProvider>
);

const Router = () => (
    <BrowserRouter>
        <div className="Router">
            <Route exact path="/" component={Home}/>
        </div>
    </BrowserRouter>
);

export default Router;