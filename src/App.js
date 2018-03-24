import React, {Component} from 'react';
import OrderPlacer from './components/OrderPlacer';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FooterBar from "./components/FooterBar";

import './css/App.css';

const appTitle = "One Click Food";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPage: 0,
            appTitle
        };

        this.onSelectPage = this.onSelectPage.bind(this);
    }

    onSelectPage(index) {
        this.setState({selectedPage: index});
    }

    render() {
        let appBody = (
            <OrderPlacer/>
        );

        return (
            <div className="App">
                <div className="app-bar">
                    <AppBar
                        title={this.state.appTitle}
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />
                </div>
                <div className="app-body">
                    {appBody}
                </div>
                <div className="app-footer">
                    <div className="payButton">
                        <RaisedButton label="Proceed to pay" primary={true} onClick={this.onPayClick}/>
                    </div>
                    <FooterBar onSelectPage={this.onSelectPage} selectedPage={this.state.selectedPage}/>
                </div>
            </div>
        );
    }
}

export default App;
