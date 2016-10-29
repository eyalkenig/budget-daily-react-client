import React, {Component, PropTypes } from 'react';
import { fetchSummaryAsync } from '../actions'

export default class Summary extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(fetchSummaryAsync());
    }
    render() {
        const { today, summaryRetrieved } = this.props;

        return (
            <div>
                { !summaryRetrieved &&
                    <span className="label label-warning">
                        Loading...
                    </span>
                }

                { summaryRetrieved &&
                        <div>
                            Today budget:
                            <span className="label label-success">
                                {today}
                            </span>
                        </div>
                }
            </div>
        )
    }
}

Summary.propTypes = {
    dispatch: PropTypes.func.isRequired,
    summaryRetrieved: PropTypes.bool,
    today: PropTypes.number
}
