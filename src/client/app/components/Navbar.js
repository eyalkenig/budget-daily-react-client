import React, { Component, PropTypes } from 'react'
import Login from './Login'
import Logout from './Logout'
import { loginUser, logoutUser } from '../actions'
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Navbar extends Component {

    render() {
        const { dispatch, isAuthenticated, username, errorMessage } = this.props;

        return (
            <MuiThemeProvider>
                <AppBar
                    title="Budget Daily"
                    iconElementRight={
                        isAuthenticated ?
                            <Logout
                                username={username}
                                onLogoutClick={ () => dispatch(logoutUser()) }
                            /> :
                            <Login
                                errorMessage={errorMessage}
                                onLoginClick={ credentials => {
                                        dispatch(loginUser(credentials));
                                    }
                                }
                            />
                    }
                />
            </MuiThemeProvider>
        )
    }
}

Navbar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    username: PropTypes.string
};
