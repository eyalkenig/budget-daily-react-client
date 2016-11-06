import React, {Component, PropTypes } from 'react';
import { fetchSummaryAsync } from '../actions'
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class Summary extends Component {

    componentWillMount() {
        this.props.dispatch(fetchSummaryAsync());
    }

    render() {

        function getBudgetStyle(budget) {
            if (budget > 0) {
                // green
                return {
                    backgroundColor: '#B9F6CA'
                };
            }
            // red
            return {
                backgroundColor: '#FF8A80'
            };
        }

        const style = {
            height: 380,
            width: 260,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
        };

        const todayStyle = {
            fontSize: 40
        };

        const { today, summaryRetrieved } = this.props;

        const budgetTitle = "Today's budget";

        return (
            <div style={{textAlign: 'center'}}>
                <Paper style={style} zDepth={2}>
                    <div style={{position: 'relative', height: '100%'}}>

                        { summaryRetrieved &&
                            <div>
                                <Subheader style={{paddingLeft: 0}}>{budgetTitle}</Subheader>
                                <div className="todays-budget" style={Object.assign({}, todayStyle, getBudgetStyle(today))}>
                                    {today}
                                </div>
                            </div>
                        }

                        <div style={{ position: 'absolute', bottom:0, width: '100%' }}>
                            <TextField style={{width: 184}} inputStyle={{textAlign: 'center'}} type="number" ref="quick-expense" hintText="How Much did you spent?"/>
                            <FlatButton label="Add Expense" style={{width: '100%'}} labelStyle={{ color: '#C62828'}} />
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}

Summary.propTypes = {
    dispatch: PropTypes.func.isRequired,
    summaryRetrieved: PropTypes.bool,
    today: PropTypes.number
}
