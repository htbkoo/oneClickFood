import React from 'react';
import {Link, Route} from 'react-router-dom'

import {Card, CardMedia, CardText, CardTitle} from 'material-ui/Card';

import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
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
                <img src="images/coffee.jpg" alt=""/>
            </CardMedia>
            <CardTitle title="Your order:" subtitle=""/>
            <CardText>
                <Orders orders={props.orders}/>
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
    <ListItem primaryText={order.food_id} secondaryText={`Quantity: ${order.qty}, Price: ${order.price}`}
              leftIcon={<ActionInfo/>}/>
);

const Orders = ({orders}) => {
    let orderComponents = orders.map(order => (
        <Order order={order}/>
    ));
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

const OrderPlacer = ({tableInfo, orders}) => (
    <div className="OrderPlacer">
        <RestaurantInfoHeader restaurantName={tableInfo.restaurantName} tableNumber={tableInfo.tableNumber}
                              orders={orders}/>
    </div>
);

export default OrderPlacer;
