import React, {Component} from 'react';
import OrderPlacer from './components/OrderPlacer';

import './css/App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <OrderPlacer/>
            </div>
        );
    }
}

export default App;
