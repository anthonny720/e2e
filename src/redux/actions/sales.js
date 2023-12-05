import axios from "axios";
import {
    ADD_SAMPLE_FAIL,
    ADD_SAMPLE_SUCCESS,
    GET_CALENDAR_SAMPLES_FAIL,
    GET_CALENDAR_SAMPLES_SUCCESS,
    GET_SAMPLES_FAIL,
    GET_SAMPLES_SUCCESS,
    UPDATE_SAMPLE_FAIL,
    UPDATE_SAMPLE_SUCCESS,
} from "./types";
import {setAlert} from "./alert";


export const get_samples = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/sales/samples`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_SAMPLES_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_SAMPLES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_SAMPLES_FAIL
        });
    }
}
export const add_samples = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },

    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/sales/samples/create`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_SAMPLE_SUCCESS
            });
            dispatch(setAlert('Muestra registrada', 'success'));
        } else {
            dispatch({
                type: ADD_SAMPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_SAMPLE_FAIL
        });
        dispatch(setAlert('Ocurrió un error al registrar la muestra', 'error'));

    }
}
export const update_samples = (form, id, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },

    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/sales/samples/update/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_SAMPLE_SUCCESS
            });
            dispatch(get_samples(params));
            dispatch(setAlert('Muestra actualizada', 'success'));
        } else {
            dispatch({
                type: UPDATE_SAMPLE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_SAMPLE_FAIL
        });
        dispatch(setAlert('Ocurrió un error al actualizar la muestra', 'error'));

    }
}


export const get_calendar_samples = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/sales/calendar`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CALENDAR_SAMPLES_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_CALENDAR_SAMPLES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_CALENDAR_SAMPLES_FAIL
        });
    }
}

