import axios from "axios";
import {
    ADD_SCHEDULE_MANUFACTURING_FAIL,
    ADD_SCHEDULE_MANUFACTURING_SUCCESS,
    DELETE_SCHEDULE_MANUFACTURING_FAIL,
    DELETE_SCHEDULE_MANUFACTURING_SUCCESS,
    GET_MATERIALS_FAIL,
    GET_MATERIALS_SUCCESS,
    GET_RECORDS_MP_FAIL,
    GET_RECORDS_MP_SUCCESS,
    GET_SALES_PLANNING_FAIL,
<<<<<<< HEAD
    GET_SALES_PLANNING_SUCCESS,
    GET_SCHEDULE_CALENDAR_FAIL,
    GET_SCHEDULE_CALENDAR_SUCCESS,
=======
    GET_SALES_PLANNING_SUCCESS, GET_SCHEDULE_CALENDAR_FAIL, GET_SCHEDULE_CALENDAR_SUCCESS,
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
    GET_SKU_FAIL,
    GET_SKU_SUCCESS,
    GET_SKUS_FAIL,
    GET_SKUS_SUCCESS,
<<<<<<< HEAD
=======
    GET_STOCK_AVAILABLE_FAIL,
    GET_STOCK_AVAILABLE_SUCCESS,
>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977
    GET_STOCK_ENTRIES_FAIL,
    GET_STOCK_ENTRIES_SUCCESS,
    GET_STOCK_OUTPUTS_FAIL,
    GET_STOCK_OUTPUTS_SUCCESS,
    GET_STOCK_REENTRIES_FAIL,
    GET_STOCK_REENTRIES_SUCCESS,
    GET_STOCKS_FAIL,
    GET_STOCKS_SUCCESS,
    LOADING_RECORDS_MP_FAIL,
    LOADING_RECORDS_MP_SUCCESS,
    UPDATE_SCHEDULE_MANUFACTURING_FAIL,
    UPDATE_SCHEDULE_MANUFACTURING_SUCCESS
} from "./types";
import {setAlert} from "./alert";

export const get_records_mp = (category, params) => async dispatch => {
    dispatch({type: LOADING_RECORDS_MP_SUCCESS});

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/records/${category}`, config);

        if (res.status === 200) {
            dispatch({type: GET_RECORDS_MP_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_RECORDS_MP_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_RECORDS_MP_FAIL});

    } finally {
        dispatch({type: LOADING_RECORDS_MP_FAIL})
    }
}


export const get_materials = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/materials`, config);

        if (res.status === 200) {
            dispatch({type: GET_MATERIALS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_MATERIALS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_MATERIALS_FAIL});
    }
}


export const get_skus = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/products`, config);

        if (res.status === 200) {
            dispatch({type: GET_SKUS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SKUS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_SKUS_FAIL});
    }
}
export const get_sku = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/products/${id}`, config);

        if (res.status === 200) {
            dispatch({type: GET_SKU_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SKU_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_SKU_FAIL});
    }
}


export const get_stocks = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/stock`, config);
        if (res.status === 200) {
            dispatch({type: GET_STOCKS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_STOCKS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_STOCKS_FAIL});
    }
}

export const get_stock_entries = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/stock/entry`, config);
        if (res.status === 200) {
            dispatch({type: GET_STOCK_ENTRIES_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_STOCK_ENTRIES_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_STOCK_ENTRIES_FAIL});
    }
}
export const get_stock_reentries = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/stock/reentry`, config);
        if (res.status === 200) {
            dispatch({type: GET_STOCK_REENTRIES_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_STOCK_REENTRIES_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_STOCK_REENTRIES_FAIL});
    }
}
export const get_stock_outputs = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/stock/output`, config);
        if (res.status === 200) {
            dispatch({type: GET_STOCK_OUTPUTS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_STOCK_OUTPUTS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_STOCK_OUTPUTS_FAIL});
    }
}

<<<<<<< HEAD
=======
export const get_stock_available = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/stock/available`, config);
        if (res.status === 200) {
            dispatch({type: GET_STOCK_AVAILABLE_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_STOCK_AVAILABLE_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_STOCK_AVAILABLE_FAIL});
    }
}

>>>>>>> dfddcd8ad380cc5d989c2b899a9b83231f76d977

export const get_planning_sales = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/manufacturing/sales`, config);
        if (res.status === 200) {
            dispatch({type: GET_SALES_PLANNING_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SALES_PLANNING_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_SALES_PLANNING_FAIL});
    }
}

export const add_schedule_manufacturing = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/operations/manufacturing`, form, config);
        if (res.status === 201) {
            dispatch({type: ADD_SCHEDULE_MANUFACTURING_SUCCESS, payload: res.data});
            dispatch(get_planning_sales())
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({type: ADD_SCHEDULE_MANUFACTURING_FAIL});

        }
    } catch (err) {
        dispatch({type: ADD_SCHEDULE_MANUFACTURING_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    }
}

export const update_schedule_manufacturing = (form, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/operations/manufacturing/${id}`, form, config);
        if (res.status === 200) {
            dispatch({type: UPDATE_SCHEDULE_MANUFACTURING_SUCCESS, payload: res.data});
            dispatch(get_planning_sales())
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({type: UPDATE_SCHEDULE_MANUFACTURING_FAIL});

        }
    } catch (err) {
        dispatch({type: UPDATE_SCHEDULE_MANUFACTURING_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    }
}
export const delete_schedule_manufacturing = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/operations/manufacturing/${id}`, config);
        if (res.status === 200) {
            dispatch({type: DELETE_SCHEDULE_MANUFACTURING_SUCCESS, payload: res.data});
            dispatch(get_planning_sales())
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({type: DELETE_SCHEDULE_MANUFACTURING_FAIL});

        }
    } catch (err) {
        dispatch({type: DELETE_SCHEDULE_MANUFACTURING_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    }
}

export const get_schedule_calendar = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/manufacturing/calendar`, config);
        if (res.status === 200) {
            dispatch({type: GET_SCHEDULE_CALENDAR_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SCHEDULE_CALENDAR_FAIL});

        }
    } catch (err) {
        dispatch({type: GET_SCHEDULE_CALENDAR_FAIL});
    }
}