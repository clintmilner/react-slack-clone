import React from 'react';
import Channels from './Channels';
import UserPanel from './UserPanel';
import {Menu} from 'semantic-ui-react';

class SidePanel extends React.Component {
    render() {
        const {currentUser} = this.props;
        return (
            <Menu inverted vertical
                size="large" fixed="left"
                style={{background: '#4c3c4c', fontSize: '1.2rem'}}>
                <UserPanel currentUser={currentUser}/>
                <Channels />
            </Menu>
        );
    }
}

export default SidePanel;
