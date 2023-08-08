import axios from "axios";
import {
    ADD_PACKING_PROCESS_FAIL,
    ADD_PACKING_PROCESS_SUCCESS,
    GET_MOD_FAIL,
    GET_MOD_SUCCESS,
    GET_PACKING_PROCESS_FAIL,
    GET_PACKING_PROCESS_SUCCESS,
    GET_PROCESS_FAIL,
    GET_PROCESS_SUCCESS,
    UPDATE_MOD_FAIL,
    UPDATE_MOD_SUCCESS,
    UPDATE_PACKING_PROCESS_FAIL,
    UPDATE_PACKING_PROCESS_SUCCESS,
    UPDATE_PROCESS_FAIL,
    UPDATE_PROCESS_SUCCESS
} from "./types";
import {setAlert} from "./alert";

export const get_process = (product, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/production/process/${product}`, config);
        if (res.status === 200) {

            dispatch({
                type: GET_PROCESS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROCESS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROCESS_FAIL
        });
    }
};
export const update_process = (id, product, form, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/production/process/${product}/${id}`, form, config);
        if (res.status === 200) {

            dispatch({
                type: UPDATE_PROCESS_SUCCESS, payload: res.data
            });
            dispatch(setAlert('Información de proceso actualizado', 'success'));
            dispatch(get_process(product, params));
        } else {
            dispatch({
                type: UPDATE_PROCESS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_PROCESS_FAIL
        });
        dispatch(setAlert('Ocurrió un error al actualizar el proceso', 'error'));

    }
};

export const get_packing_process = (product, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/production/process/packing/${product}`, config);
        if (res.status === 200) {

            dispatch({
                type: GET_PACKING_PROCESS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PACKING_PROCESS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PACKING_PROCESS_FAIL
        });
    }
};


export const update_packing_process = (id, product, form, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/production/process/packing/${product}/${id}`, form, config);
        if (res.status === 200) {

            dispatch({
                type: UPDATE_PACKING_PROCESS_SUCCESS, payload: res.data
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_packing_process(product, params));
            dispatch(get_process(product, params));
        } else {
            dispatch({
                type: UPDATE_PACKING_PROCESS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_PACKING_PROCESS_FAIL
        });
        dispatch(setAlert(err.response.data.message, 'error'));

    }
};

export const add_packing_process = (product, form, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/production/process/packing/${product}`, form, config);
        if (res.status === 201) {

            dispatch({
                type: ADD_PACKING_PROCESS_SUCCESS, payload: res.data
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_packing_process(product, params));
        } else {
            dispatch({
                type: ADD_PACKING_PROCESS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_PACKING_PROCESS_FAIL
        });
        dispatch(setAlert(err.response.data.message, 'error'));

    }
};
export const get_mod = (product, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/production/mod/${product}`, config);
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
export const update_mod = (id, product, form, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/production/mod/${product}/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_MOD_SUCCESS, payload: res.data
            });
            dispatch(setAlert('MOD actualizado', 'success'));
            dispatch(get_mod(product, params));
        } else {
            dispatch({
                type: UPDATE_MOD_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_MOD_FAIL
        });
        dispatch(setAlert('Ocurrió un error al actualizar la información MOD', 'error'));

    }
};