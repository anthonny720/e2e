import axios from "axios";
import {
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    GET_COSTS_PRODUCTION_FAIL,
    GET_COSTS_PRODUCTION_SUCCESS,
    GET_CUSTOMER_FAIL,
    GET_CUSTOMER_SUCCESS,
    GET_CUSTOMERS_FAIL,
    GET_CUSTOMERS_SUCCESS,
    GET_LOCATIONS_FAIL,
    GET_LOCATIONS_SUCCESS,
    GET_OUTSOURCING_FAIL,
    GET_OUTSOURCING_SUCCESS,
    GET_OUTSOURCINGS_FAIL,
    GET_OUTSOURCINGS_SUCCESS,
    GET_STORAGE_AREAS_FAIL,
    GET_STORAGE_AREAS_SUCCESS,
    GET_SUPPLIER_FAIL,
    GET_SUPPLIER_RM_FAIL,
    GET_SUPPLIER_RM_SUCCESS,
    GET_SUPPLIER_SUCCESS,
    GET_SUPPLIERS_FAIL,
    GET_SUPPLIERS_RM_FAIL,
    GET_SUPPLIERS_RM_SUCCESS,
    GET_SUPPLIERS_SUCCESS,
    GET_TRANSPORT_FAIL,
    GET_TRANSPORT_SUCCESS,
    GET_TRANSPORTS_FAIL,
    GET_TRANSPORTS_SUCCESS,
    GET_UNITS_FAIL,
    GET_UNITS_SUCCESS
} from "./types";


export const get_customers = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/customers`, config);
        if (res.status === 200) {
            dispatch({type: GET_CUSTOMERS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_CUSTOMERS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_CUSTOMERS_FAIL});
    }
}

export const get_customer = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/customers/${slug}`, config);
        if (res.status === 200) {
            dispatch({type: GET_CUSTOMER_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_CUSTOMER_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_CUSTOMER_FAIL});
    }
}

export const get_suppliers = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/suppliers`, config);
        if (res.status === 200) {
            dispatch({type: GET_SUPPLIERS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SUPPLIERS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_SUPPLIERS_FAIL});
    }
}
export const get_supplier = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/suppliers/${slug}`, config);
        if (res.status === 200) {
            dispatch({type: GET_SUPPLIER_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SUPPLIER_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_SUPPLIER_FAIL});
    }
}

export const get_suppliers_rm = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/suppliers_rm`, config);
        if (res.status === 200) {
            dispatch({type: GET_SUPPLIERS_RM_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SUPPLIERS_RM_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_SUPPLIERS_RM_FAIL});
    }
}

export const get_supplier_rm = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/suppliers_rm/${slug}`, config);
        if (res.status === 200) {
            dispatch({type: GET_SUPPLIER_RM_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SUPPLIER_RM_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_SUPPLIER_RM_FAIL});
    }
}
export const get_transports = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/transports`, config);
        if (res.status === 200) {
            dispatch({type: GET_TRANSPORTS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_TRANSPORTS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_TRANSPORTS_FAIL});
    }
}

export const get_transport = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/transports/${slug}`, config);
        if (res.status === 200) {
            dispatch({type: GET_TRANSPORT_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_TRANSPORT_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_TRANSPORT_FAIL});
    }
}
export const get_outsourcings = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/outsourcings`, config);
        if (res.status === 200) {
            dispatch({type: GET_OUTSOURCINGS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_OUTSOURCINGS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_OUTSOURCINGS_FAIL});
    }
}
export const get_outsourcing = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/outsourcings/${slug}`, config);
        if (res.status === 200) {
            dispatch({type: GET_OUTSOURCING_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_OUTSOURCING_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_OUTSOURCING_FAIL});
    }
}


export const get_storage_areas = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/storage-areas`, config);
        if (res.status === 200) {
            dispatch({type: GET_STORAGE_AREAS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_STORAGE_AREAS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_STORAGE_AREAS_FAIL});
    }
}

export const get_locations = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/locations`, config);
        if (res.status === 200) {
            dispatch({type: GET_LOCATIONS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_LOCATIONS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_LOCATIONS_FAIL});
    }
}
export const get_costs = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/costs`, config);
        if (res.status === 200) {
            dispatch({type: GET_COSTS_PRODUCTION_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_COSTS_PRODUCTION_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_COSTS_PRODUCTION_FAIL});
    }
}

export const get_units = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/units`, config);
        if (res.status === 200) {
            dispatch({type: GET_UNITS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_UNITS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_UNITS_FAIL});
    }
}
export const get_categories = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/management/categories`, config);
        if (res.status === 200) {
            dispatch({type: GET_CATEGORIES_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_CATEGORIES_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_CATEGORIES_FAIL});
    }
}

