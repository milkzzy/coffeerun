import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SUBMIT_ORDER, COMPLETE_ORDER } from '../store';

function mapStateToProps(state) {
    return { pendingOrders: state.pendingOrders };
}

function PendingOrders({ dispatch, pendingOrders }) {
    return (
        <Card>
            <CardHeader>Pending Orders</CardHeader>
            <CardBody>
                <ul>
                    {pendingOrders.map((order) => (
                        <li key={order.emailAddress}>
                            <Input
                                type="checkbox"
                                onClick={() => dispatch({
                                    emailAddress: order.emailAddress,
                                    type: COMPLETE_ORDER,
                                })}
                            />
                            {order.size}
                            {' '}
                            {order.coffee}
                            {order.flavor ? ` with ${order.flavor}` : ''}
                            {' ['}
                            {order.emailAddress}
                            {'] ['}
                            {order.strength}
                            ]
                        </li>
                    ))}
                </ul>
            </CardBody>
        </Card>
    );
}

PendingOrders.propTypes = {
    dispatch: PropTypes.func.isRequired,
    pendingOrders: PropTypes.arrayOf(PropTypes.shape({
        coffee: PropTypes.string.isRequired,
        emailAddress: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        flavor: PropTypes.string.isRequired,
        strength: PropTypes.string.isRequired,
    })).isRequired,
};

export default connect(mapStateToProps)(PendingOrders);