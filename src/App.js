import React, {Component} from 'react';
import QRCode from 'qrcode';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            qrcode: ""
        };

        this.onTextChange = this.onTextChange.bind(this);
    }

    onTextChange(e) {
        let text = e.target.value;
        this.setState({text});
        QRCode.toDataURL(text, (err, url) => {
            this.setState({qrcode: url});
        });
    }

    render() {
        return (
            <div className="App">
                <div className="input-text">
                    <form>
                        <label>
                            Text to transform:
                            <input type="text" name="text" value={this.state.text}
                                   onChange={this.onTextChange}/>
                        </label>
                    </form>
                </div>
                <div className="qrcode">
                    <img src={this.state.qrcode}/>
                </div>
            </div>
        );
    }
}

export default App;
