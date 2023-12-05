import axios from "axios";
import {
    ADD_PARCEL_FAIL,
    ADD_PARCEL_SUCCESS,
    GET_PARCELS_FAIL,
    GET_PARCELS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_SUCCESS,
    GET_PROVIDERS_CATEGORY_FAIL, GET_PROVIDERS_CATEGORY_SUCCESS,
    UPDATE_PARCEL_FAIL,
    UPDATE_PARCEL_SUCCESS
} from "./types";
import {setAlert} from "./alert";

export const get_providers_category = (category) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/collection/providers/${category}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PROVIDERS_CATEGORY_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PROVIDERS_CATEGORY_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PROVIDERS_CATEGORY_FAIL
        });
    }
}
export const get_parcels = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/collection/parcels`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PARCELS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PARCELS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PARCELS_FAIL
        });
    }
}
export const get_products = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/collection/products`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PRODUCTS_FAIL
        });
    }
}
export const update_parcels = (form, id, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/collection/parcels/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_PARCEL_SUCCESS, payload: res.data
            });
            dispatch(get_parcels(params));
            dispatch(setAlert('Parcela actualizada', 'success'));
        } else {
            dispatch({
                type: UPDATE_PARCEL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_PARCEL_FAIL
        });
        dispatch(setAlert('Ocurrió un error al actualizar la parcela', 'error'));

    }
}
export const add_parcels = (form, params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/collection/parcels`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_PARCEL_SUCCESS, payload: res.data
            });
            dispatch(get_parcels(params));
            dispatch(setAlert('Parcela registrada', 'success'));
        } else {
            dispatch({
                type: ADD_PARCEL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_PARCEL_FAIL
        });
        dispatch(setAlert('Ocurrió un error al registrar la parcela', 'error'));

    }
}