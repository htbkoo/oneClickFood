import React from 'react';

import {Card, CardMedia, CardText, CardTitle} from 'material-ui/Card';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import RemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import IconButton from 'material-ui/IconButton';

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
                <Orders orders={props.orders} confirmed={props.confirmed} onSubtract={props.onSubtract} onAdd={props.onAdd}/>
                <Divider/>
                <TotalAmount orders={props.orders}/>
            </CardText>
        </Card>
    </div>
);

const SubtractButton = ({onClick}) => (
    <IconButton touch={true} onClick={onClick}>
        <RemoveCircleOutline/>
    </IconButton>
);

const AddButton = ({onClick}) => (
    <IconButton touch={true} onClick={onClick}>
        <AddCircleOutline/>
    </IconButton>
);

/*
{
    'food_id': x,
    'qty': x,
    'price': x,
    'remark': x
}
*/

const Order = ({order, onSubtract, onAdd}) => (
    <div className="OrderItem">
        <SubtractButton onClick={() => onSubtract(order.food_id)}/>
        <ListItem primaryText={order.food_id} secondaryText={`Quantity: ${order.qty}, Price: ${order.price}`}/>
        <AddButton onClick={() => onAdd(order.food_id)}/>
    </div>
);
const ConfirmedOrder = ({order}) => (
    <ListItem primaryText={order.food_id} secondaryText={`Quantity: ${order.qty}, Price: ${order.price}`}
              leftIcon={<ActionInfo/>}/>
);

const Orders = ({orders, confirmed, onSubtract, onAdd}) => {
    let orderComponents = orders.map(order =>
        confirmed ? <ConfirmedOrder order={order}/> : <Order order={order} onSubtract={onSubtract} onAdd={onAdd}/>
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

const OrderPlacer = ({tableInfo, orders, confirmed, onSubtract, onAdd}) => (
    <div className="OrderPlacer">
        <RestaurantInfoHeader restaurantName={tableInfo.restaurantName} tableNumber={tableInfo.tableNumber}
                              orders={orders}
                              confirmed={confirmed}
                              onSubtract={onSubtract}
                              onAdd={onAdd}/>
    </div>
);

export default OrderPlacer;
