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
                <List>
                    <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                    <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
                    <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                    <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                    <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                </List>
                <Divider />
                <List>
                    <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
                    <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
                    <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
                    <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
                </List>
            </CardText>
        </Card>
    </div>
);

const Topic = ({match}) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);

const Topics = ({match}) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.path}/:topicId`} component={Topic}/>
        <Route exact path={match.path} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
);

const OrderPlacer = ({tableInfo, orders}) => (
    <div className="OrderPlacer">
        <RestaurantInfoHeader restaurantName={tableInfo.restaurantName} tableNumber={tableInfo.tableNumber}/>
    </div>
);

export default OrderPlacer;
