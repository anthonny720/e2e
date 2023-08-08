import {ADD_COSTS_FINANCES_FAIL, ADD_COSTS_FINANCES_SUCCESS, GET_COSTS_FINANCES_FAIL, GET_COSTS_FINANCES_SUCCESS} from './types'

import axios from "axios";
import {setAlert} from "./alert";
import {get_packing_process} from "./production";


export const get_costs = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {
            ...params
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/finances/costs`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_COSTS_FINANCES_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_COSTS_FINANCES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_COSTS_FINANCES_FAIL
        });

    }
}


export const add_costs = (form, category,params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/finances/costs`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_COSTS_FINANCES_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_packing_process(category,params))
        } else {
            dispatch({
                type: ADD_COSTS_FINANCES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_COSTS_FINANCES_FAIL
        });
        dispatch(setAlert(err.response.data.message, 'error'));


    }
}
