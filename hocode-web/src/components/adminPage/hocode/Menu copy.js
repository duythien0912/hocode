/**
 * Generated Menu.js code. Edit at own risk.
 * When regenerated the changes will be lost.
**/
import React from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources, Responsive } from 'react-admin';
import ListIcon from '@material-ui/icons/ViewList';
import { titleCase } from './utils';

const ICONS = {
    books: <ListIcon />,
    courses: <ListIcon />,
    events: <ListIcon />,
    minitasks: <ListIcon />,
    tasks: <ListIcon />,
};

const Menu = ({ resources, onMenuClick, logout }) => (
    <div>
        {resources
            ? resources.map(resource => resource.hasList ? (
                    <MenuItemLink
                        key={resource.name}
                        to={`/profile/admin/${resource.name}`}
                        primaryText={`${titleCase(resource.name)}`}
                        onClick={onMenuClick}
                        leftIcon={ICONS[resource.name]}
                    />
                ) : null)
            : ''}
        <Responsive small={logout} medium={null} />
    </div>
);

const mapStateToProps = state => ({
    resources: getResources(state)
});

export default connect(mapStateToProps)(Menu);
/** End of Generated Menu.js Code **/