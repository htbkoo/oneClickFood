import React from 'react';

import {Card, CardMedia, CardText, CardTitle} from 'material-ui/Card';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

import '../css/OrderPlacer.css';

// Image served from /public
// noinspection HtmlUnknownTarget
const RestaurantInfoHeader = props => (
    <div className="RestaurantInfoHeader">
        <Card>
            <CardMedia
                overlay={<CardTitle title={props.restaurantName} subtitle={`Table #${props.tableNumber}`}/>}
            >
                <img src="images/tam_son.jpeg" alt=""/>
            </CardMedia>
            <CardTitle title="Your order:" subtitle=""/>
            <CardText>
                <Orders orders={props.orders} confirmed={props.confirmed}/>
                <Divider/>
                <TotalAmount orders={props.orders}/>
            </CardText>
        </Card>
    </div>
);

/*
{
    'food_id': x,
    'qty': x,
    'price': x,
    'remark': x
}
*/
const Order = ({order}) => (
    <ListItem secondaryText={order.food_id} primaryText={`Quantity: ${order.qty}, Price: ${order.price}`}
              leftIcon={<ActionInfo/>}/>
);
const ConfirmedOrder = ({order}) => (
    <ListItem primaryText={order.food_id} secondaryText={`Quantity: ${order.qty}, Price: ${order.price}`}
              leftIcon={<ActionInfo/>}/>
);

const Orders = ({orders, confirmed}) => {
    let orderComponents = orders.map(order =>
        confirmed ? <ConfirmedOrder order={order}/> : <Order order={order}/>
    );
    return (
        <List>
            {orderComponents}
        </List>
    );
};

const TotalAmount = ({orders}) => {
    let totalAmount = orders.reduce((amount, order) => amount + order.qty * order.price, 0);
    return (
        <List>
            <ListItem primaryText={`\$${totalAmount}`} secondaryText="Total" rightIcon={<ActionInfo/>}/>
        </List>
    );
};

const OrderPlacer = ({tableInfo, orders, confirmed}) => (
    <div className="OrderPlacer">
        <RestaurantInfoHeader restaurantName={tableInfo.restaurantName} tableNumber={tableInfo.tableNumber}
                              orders={orders}
                              confirmed={confirmed}/>
    </div>
);

export default OrderPlacer;
