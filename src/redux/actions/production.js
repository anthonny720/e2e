import axios from "axios";
import {
    GET_CONDITIONING_PINEAPPLE_FAIL,
    GET_CONDITIONING_PINEAPPLE_SUCCESS, GET_MOD_FAIL, GET_MOD_SUCCESS,
    GET_PACKING_PINEAPPLE_FAIL,
    GET_PACKING_PINEAPPLE_SUCCESS
} from "./types";

export const get_conditioning_pineapple = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/production/pineapple_conditioning/`, config);
        if (res.status === 200) {

            dispatch({
                type: GET_CONDITIONING_PINEAPPLE_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_CONDITIONING_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CONDITIONING_PINEAPPLE_FAIL
        });
    }
};

export const get_packing_pineapple = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/production/pineapple_packing/`, config);
        if (res.status === 200) {

            dispatch({
                type: GET_PACKING_PINEAPPLE_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PACKING_PINEAPPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PACKING_PINEAPPLE_FAIL
        });
    }
};

export const get_mod = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/production/mod/`, config);
        if (res.status === 200) {

            dispatch({
                type: GET_MOD_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_MOD_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_MOD_FAIL
        });
    }
};