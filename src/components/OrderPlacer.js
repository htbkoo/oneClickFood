import React, {Component} from 'react';
import QRCode from 'qrcode';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

import '../css/OrderPlacer.css';
import FooterBar from "./FooterBar";
import QrCodeScanner from "./QrCodeScanner";

const orderEndPoint = "order";
const appTitle = "One Click Food";

class OrderPlacer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            qrcode: "",
            appTitle,
            // payUrl: `${hostname}${colonPortNumber}/${endpoint}`
            payUrl: `${orderEndPoint}`,

            order: {
                'table_id': "",
                'foods': [
                    {
                        'food_id': "",
                        'qty': 0,
                        'price': 0,
                        'remark': ""
                    }
                ]
            }
        };

        this.onTextChange = this.onTextChange.bind(this);
        this.onPayClick = this.onPayClick.bind(this);
        this.promisePostOrder = this.promisePostOrder.bind(this);
        this.mockPromisePostOrder = this.mockPromisePostOrder.bind(this);
        this.setTableId = this.setTableId.bind(this);
    }

    onPayClick() {
        this.setTableId("1234");
        // this.promisePostOrder()
        this.mockPromisePostOrder()
            .then(value => {
                console.log(value);
            })
            .catch(reason => {
                console.log(`Error caught: ${reason}`);
            });
    }

    // noinspection JSMethodCanBeStatic
    mockPromisePostOrder() {
        return Promise.resolve("done");
    }

    promisePostOrder() {
        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: this.state.order,
            cache: 'default'
        };
        return fetch(orderEndPoint, options);
    }

    onTextChange(e) {
        let text = e.target.value;
        this.setState({text});
        QRCode.toDataURL(text, (err, url) => {
            this.setState({qrcode: url});
        });
    }

    setTableId(table_id) {
        this.setState({order: Object.assign({}, this.state.order, {table_id})});
    }

    render() {
        return (
            <div className="OrderPlacer">
                <div className="app-bar">
                    <AppBar
                        title={this.state.appTitle}
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />
                </div>
                <div className="app-body">
                    <form>
                        <div className="input-text">
                            <QrCodeScanner text={this.state.text} onTextChange={this.onTextChange}/>
                        </div>
                    </form>
                </div>
                <div className="app-footer">
                    <div className="payButton">
                        <RaisedButton label="Proceed to pay" primary={true} onClick={this.onPayClick}/>
                    </div>
                    <FooterBar/>
                </div>
            </div>
        );
    }
}

export default OrderPlacer;
