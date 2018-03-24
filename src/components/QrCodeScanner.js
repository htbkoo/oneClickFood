import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import QrReader from 'react-qr-scanner';

class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 100,
            result: 'No result',
        }

        this.handleScan = this.handleScan.bind(this)
    }

    handleScan(data) {
        this.setState({
            result: data,
        })
    }

    handleError(err) {
        console.error(err)
    }

    render() {
        const previewStyle = {
            height: 240,
            width: 320,
        }

        return (
            <div>
                <QrReader
                    delay={this.state.delay}
                    style={previewStyle}
                    onError={this.handleError}
                    onScan={this.handleScan}
                />
                <p>{this.state.result}</p>
            </div>
        )
    }
}

const QrCodeScanner = props => (
    <div>
        <TextField
            value={props.text}
            onChange={props.onTextChange}
            floatingLabelText="Text to transform"
        />
    </div>
);

export default QrCodeScanner;