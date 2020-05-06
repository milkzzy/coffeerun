import axios from 'axios';
import {
    COMPLETE_ORDER,
    START_ORDER_FETCH,
    SUBMIT_ORDER,
    FINISH_ORDER_FETCH,
} from './store';

const coffeeOrderApi = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

export function completeOrder(emailAddress) {
    return async function action(dispatch) {
        dispatch({ type: COMPLETE_ORDER, emailAddress });
        return axios.delete(`${coffeeOrderApi}/${emailAddress}`);
    };
}

export function fetchOrders() {
    return async function action(dispatch, getState) {
        if (!getState().fetchingOrders) {
            dispatch({ type: START_ORDER_FETCH });

            try {
                const response = await axios.get(coffeeOrderApi);
                const orders = Object.values(response.data);

                dispatch({ type: FINISH_ORDER_FETCH, orders });
            } catch (error) {
                console.error('Error fetching orders', error);
            }
        }
    }
}

export function submitOrder(order) {
    return async function action(dispatch) {
        dispatch({ type: SUBMIT_ORDER, order });
        return axios.post(coffeeOrderApi, order);
    };
}