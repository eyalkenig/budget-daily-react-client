import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions'
import Login from '../components/Login'
import Navbar from '../components/Navbar'

class App extends Component {
    render() {
        const { dispatch, isAuthenticated, errorMessage } = this.props;
        return (
            <div>
                <Navbar
                    isAuthenticated={isAuthenticated}
                    errorMessage={errorMessage}
                    dispatch={dispatch}
                />
                <div className='container'>

                </div>
            </div>
        )
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
}

function mapStateToProps(state) {

    const { auth } = state;
    const { isAuthenticated, errorMessage } = auth;

    return {
        isAuthenticated,
        errorMessage
    }
}

export default connect(mapStateToProps)(App);
