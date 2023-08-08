import axios from "axios";
import {
    GET_ANALYSIS_FAIL,
    GET_ANALYSIS_SUCCESS,
    GET_STATUS_FAIL,
    GET_STATUS_SUCCESS,
    UPDATE_ANALYSIS_FAIL,
    UPDATE_ANALYSIS_SUCCESS,
    UPDATE_STATUS_FAIL,
    UPDATE_STATUS_SUCCESS
} from "./types";
import {setAlert} from "./alert";
import {get_products} from "./collection";

export const get_analysis = (product, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quality_assurance/${product}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_ANALYSIS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_ANALYSIS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_ANALYSIS_FAIL
        });
    }
}
export const update_analysis = (product, id, form, params) => async dispatch => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/quality_assurance/${product}/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_ANALYSIS_SUCCESS, payload: res.data
            });
            dispatch(get_products())
            dispatch(get_analysis(product, params));
            dispatch(setAlert('Lote actualizado', 'success'));
        } else {
            dispatch({
                type: UPDATE_ANALYSIS_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: UPDATE_ANALYSIS_FAIL
        });
        dispatch(setAlert('Ocurrió un error al actualizar el lote', 'error'));

    }
}


export const get_status = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/quality_assurance/status`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_STATUS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_STATUS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_STATUS_FAIL
        });
    }
}
export const update_status = (form, id, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }}

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/quality_assurance/status/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_STATUS_SUCCESS, payload: res.data
            });
            dispatch(setAlert('Lote actualizado', 'success'));
            dispatch(get_status(params));
        } else {
            dispatch({
                type: UPDATE_STATUS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_STATUS_FAIL
        });
        dispatch(setAlert('Ocurrió un error al actualizar el lote', 'error'));

    }
}