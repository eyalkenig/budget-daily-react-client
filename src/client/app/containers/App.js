import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import Summary from '../components/Summary'

class App extends Component {



    render() {
        const { dispatch, isAuthenticated, errorMessage, summaryContent, summaryRetrieved } = this.props;

        return (
            <div>
                <Navbar
                    isAuthenticated={isAuthenticated}
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
    const { isAuthenticated, errorMessage } = auth;
    const { summaryRetrieved, summaryContent } = summary;

    return {
        isAuthenticated,
        errorMessage,
        summaryRetrieved,
        summaryContent
    }
}

export default connect(mapStateToProps)(App);
