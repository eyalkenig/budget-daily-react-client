import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import Summary from '../components/Summary'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {



    render() {
        const { dispatch, isAuthenticated, username, errorMessage, summaryContent, summaryRetrieved } = this.props;

        return (
            <MuiThemeProvider>
            <div>
                <Navbar
                    isAuthenticated={isAuthenticated}
                    username={username}
                    errorMessage={errorMessage}
                    dispatch={dispatch}>
                </Navbar>
                { isAuthenticated &&
                    <div className='container'>
                        <Summary
                            dispatch={dispatch}
                            summaryRetrieved={summaryRetrieved}
                            today={summaryContent}/>
                    </div> }
            </div>
            </MuiThemeProvider>
        )
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    summary: PropTypes.number
}

function mapStateToProps(state) {

    const { auth, summary } = state;
    const { isAuthenticated, username, errorMessage } = auth;
    const { summaryRetrieved, summaryContent } = summary;

    return {
        isAuthenticated,
        username,
        errorMessage,
        summaryRetrieved,
        summaryContent
    }
}

export default connect(mapStateToProps)(App);
