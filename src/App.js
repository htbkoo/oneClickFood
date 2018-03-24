import React, {Component} from 'react';
import OrderPlacer from './components/OrderPlacer';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FooterBar from "./components/FooterBar";

import './css/App.css';
import QrCodeScanner from "./components/QrCodeScanner";

const appTitle = "One Click Food";
const orderEndPoint = "order";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPage: 1,
            text: "",
            appTitle
        };

        this.order = {
            table_id: "",
            foods: {
                all_food_ids: [],
                foods_details: {}
            }
        };

        this.onTextChange = this.onTextChange.bind(this);
        this.onPayClick = this.onPayClick.bind(this);
        this.promisePostOrder = this.promisePostOrder.bind(this);
        this.mockPromisePostOrder = this.mockPromisePostOrder.bind(this);
        this.setTableId = this.setTableId.bind(this);
        this.addFood = this.addFood.bind(this);
        this.onSelectPage = this.onSelectPage.bind(this);
        this.onQrScan = this.onQrScan.bind(this);
        this.onQrError = this.onQrError.bind(this);
    }

    onSelectPage(index) {
        this.setState({selectedPage: index});
    }

    onPayClick() {
        this.promisePostOrder()
        // this.mockPromisePostOrder()
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
            body: JSON.stringify(this.order),
            cache: 'default'
        };
        return fetch(orderEndPoint, options);
    }

    onTextChange(e) {
        let text = e.target.value;
        this.setState({text});
        this.setTableId(text);
    }

    setTableId(table_id) {
        this.order.table_id = table_id;
    }

    addFood(food_id, price, remark) {
        if (food_id in this.order.foods.foods_details) {
            this.order.foods.foods_details.qty++;
            if (typeof remark !== "undefined") {
                this.order.foods.foods_details.remark = remark;
            }
        } else {
            this.order.foods.foods_details[food_id] = {
                food_id,
                qty: 1,
                price,
                remark
            };
            this.order.foods.all_food_ids.push(food_id);
        }
    }

    onQrScan(data) {
        if (data) {
            this.setState({selectedPage: 0});
            console.log(data);
        }
    }

    onQrError(err) {
        console.error(err);
    }

    render() {
        let appBody;

        switch (this.state.selectedPage) {
            case 1:
                appBody = <QrCodeScanner onQrScan={this.onQrScan} onQrError={this.onQrError}/>;
                break;
            default:
                appBody = <OrderPlacer/>;
        }

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
