import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Login extends Component {

    render() {
        const { errorMessage } = this.props

        return (
            <MuiThemeProvider>
                <div>
                    <TextField type='text' ref='username' hintText='Username' errorText={errorMessage}/>
                    <TextField type='password' ref='password' hintText='Password'/>
                    <FlatButton onClick={ (event) => this.handleClick(event) } >
                        Login
                    </FlatButton>
                </div>
            </MuiThemeProvider>
        )
    }

    handleClick(event) {
        const username = this.refs.username;
        const password = this.refs.password;
        const credentials = { username: username.input.value.trim(), password: password.input.value.trim() };
        this.props.onLoginClick(credentials);
    }
}

Login.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};
