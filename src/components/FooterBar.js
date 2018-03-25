import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
// const cameraIcon = <FontIcon className="material-icons">camera enhance</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn/>;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
const FooterBar = props => (
    <Paper zDepth={1}>
        <BottomNavigation selectedIndex={props.selectedPage}>
            <BottomNavigationItem
                label="Your Orders"
                icon={recentsIcon}
                onClick={() => props.confirmed ? "" : props.onSelectPage(0)}
            />
            <BottomNavigationItem
                label="Scan New"
                icon={nearbyIcon}
                onClick={() => props.confirmed ? "" : props.onSelectPage(1)}
            />
            <BottomNavigationItem
                label="Confirmation"
                icon={favoritesIcon}
                disabled
            />
        </BottomNavigation>
    </Paper>
);

export default FooterBar;