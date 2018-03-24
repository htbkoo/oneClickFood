import React, {Component} from 'react';
import QRCode from 'qrcode';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';

import '../css/OrderPlacer.css';
import FooterBar from "./FooterBar";

const QrCodeScanner = props => (
    <div>
        <TextField
            value={props.text}
            onChange={props.onTextChange}
            floatingLabelText="Text to transform"
        />
    </div>
);

class OrderPlacer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            qrcode: ""
        };

        this.onPayClick = this.onPayClick.bind(this);
    }

    onPayClick(e) {
        let text = e.target.value;
        this.setState({text});
        QRCode.toDataURL(text, (err, url) => {
            this.setState({qrcode: url});
        });
    }

    render() {
        return (
            <div className="OrderPlacer">
                <div className="app-bar">
                    <AppBar
                        title="Food Chain Menu"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />
                </div>
                <div className="app-body">
                    <form>
                        <div className="input-text">
                            <QrCodeScanner text="" onTextChange={() => {
                            }}/>
                        </div>
                    </form>
                </div>
                <div className="app-footer">
                    <div className="payButton">
                        <RaisedButton label="Proceed to pay" primary={true} onClick={this.onPayClick}/>
                    </div>
                    <FooterBar />
                </div>
            </div>
        );
    }
}

export default OrderPlacer;
