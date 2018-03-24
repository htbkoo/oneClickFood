import React, {Component} from 'react';

import '../css/OrderPlacer.css';
import QrCodeScanner from "./QrCodeScanner";

const orderEndPoint = "order";

class OrderPlacer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            qrcode: "",
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

    render() {
        return (
            <div className="OrderPlacer">
                <form>
                    <div className="input-text">
                        <QrCodeScanner text={this.state.text} onTextChange={this.onTextChange}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default OrderPlacer;
