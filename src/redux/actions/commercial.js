import axios from "axios";
import {
    GET_SALE_ORDER_FAIL,
    GET_SALE_ORDER_SUCCESS,
    GET_SALES_PROGRESS_FAIL,
    GET_SALES_PROGRESS_SUCCESS
} from "./types";

export const get_sales_progress = (params) => async dispatch => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/sales`, config);

        if (res.status === 200) {
            dispatch({type: GET_SALES_PROGRESS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SALES_PROGRESS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_SALES_PROGRESS_FAIL});

    }
}
export const get_sales_order = (slug) => async dispatch => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/commercial/sales/${slug}`, config);

        if (res.status === 200) {
            dispatch({type: GET_SALE_ORDER_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SALE_ORDER_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_SALE_ORDER_FAIL});

    }
}



