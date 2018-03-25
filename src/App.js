import React, {Component} from 'react';
import OrderPlacer from './components/OrderPlacer';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FooterBar from "./components/FooterBar";

import './css/App.css';
import QrCodeScanner from "./components/QrCodeScanner";

const appTitles = [
    "One Click Food",
    "Scan Your Food"
];
const orderEndPoint = "order";

const parseScanData = rawData => {
    try {
        let data = JSON.parse(rawData);
        if (hasMandatoryData(data)) {
            return {
                isValid: true,
                data
            };
        } else {
            return {isValid: false, data};
        }
    } catch (error) {
        console.log(error);
        return {isValid: false};
    }

    function hasMandatoryData(data) {
        return [
            "food_id",
            "price"
        ].every(field => (field in data));
    }
};

class App extends Component {
    constructor(props) {
        super(props);

        /*
		{
			'food_id': x,
			'qty': x,
			'price': x,
			'remark': x
		}
		*/
        this.tableInfo = props.tableInfo;

        this.state = {
            selectedPage: 0,
            text: "",
            appTitle,
            order: {
                table_id: JSON.stringify(this.tableInfo),
                foods: {
                    all_food_ids: [],
                    foods_details: {}
                }
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
            body: JSON.stringify(this.state.order),
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
        let order = this.state.order;
        order.table_id = table_id;
        this.setState({order});
    }

    addFood(food_id, price, remark) {
        let order = this.state.order;
        if (food_id in order.foods.foods_details) {
            order.foods.foods_details.qty++;
            if (typeof remark !== "undefined") {
                order.foods.foods_details.remark = remark;
            }
        } else {
            order.foods.foods_details[food_id] = {
                food_id,
                qty: 1,
                price,
                remark
            };
            order.foods.all_food_ids.push(food_id);
        }
        this.setState({order});
    }

    onQrScan(data) {
        if (data) {
            let parsedData = parseScanData(data);
            if (parsedData.isValid) {
                this.addFood(parsedData.data.food_id, parsedData.data.price, "");
                this.setState({selectedPage: 0});
            }
            console.log(data);
        }
    }

    // noinspection JSMethodCanBeStatic
    onQrError(err) {
        console.error(err);
    }

    render() {
        let appBody;
        let orders = this.state.order.foods.all_food_ids.map(id => this.state.order.foods.foods_details[id]);

        switch (this.state.selectedPage) {
            case 1:
                appBody = <QrCodeScanner onQrScan={this.onQrScan} onQrError={this.onQrError}/>;
                break;
            default:
                appBody = <OrderPlacer orders={orders} tableInfo={this.tableInfo}/>;
        }

        return (
            <div className="App">
                <div className="app-bar">
                    <AppBar
                        title={appTitles[this.state.selectedPage]}
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
