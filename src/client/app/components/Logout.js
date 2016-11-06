import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Logout extends Component {

    render() {
        const { username, onLogoutClick } = this.props

        return (
            <MuiThemeProvider>
                <div>
                    <Avatar>{username && username.length > 0 ? username[0].toUpperCase(): ''}</Avatar>
                    <FlatButton onClick={ () => onLogoutClick() }>
                        Logout
                    </FlatButton>
                </div>
            </MuiThemeProvider>
        )
    }

}

Logout.propTypes = {
    onLogoutClick: PropTypes.func.isRequired,
    username: PropTypes.string
}
