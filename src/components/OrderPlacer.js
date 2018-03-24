import React, {Component} from 'react';
import QRCode from 'qrcode';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

class OrderPlacer extends Component {
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
                <div className="app-bar">
                    <AppBar
                        title="Place your order! :)"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />
                </div>

                <form>
                    <div className="input-text">
                        <TextField
                            value={this.state.text}
                            onChange={this.onTextChange}
                            floatingLabelText="Text to transform"
                        />
                    </div>
                    <div>
                        <RaisedButton label="Proceed to pay" primary={true}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default OrderPlacer;
