import axios from "axios";
import {
    ADD_MATERIAL_FAIL,
    ADD_MATERIAL_SUCCESS,
    ADD_PURCHASE_FAIL,
    ADD_PURCHASE_ITEM_FAIL,
    ADD_PURCHASE_ITEM_SUCCESS,
    ADD_PURCHASE_SUCCESS,
    ADD_RECIPE_FAIL,
    ADD_RECIPE_SUCCESS,
    ADD_SALES_ORDER_FAIL,
    ADD_SALES_ORDER_SUCCESS,
    ADD_SCHEDULE_MANUFACTURING_FAIL,
    ADD_SCHEDULE_MANUFACTURING_SUCCESS,
    ADD_SKU_FAIL,
    ADD_SKU_SUCCESS,
    ADD_STOCK_OUTPUT_FAIL,
    ADD_STOCK_OUTPUT_SUCCESS,
    ADD_TRANSFER_STOCK_FAIL,
    ADD_TRANSFER_STOCK_SUCCESS,
    DELETE_MATERIAL_FAIL,
    DELETE_MATERIAL_SUCCESS,
    DELETE_PURCHASE_FAIL,
    DELETE_PURCHASE_ITEM_FAIL,
    DELETE_PURCHASE_ITEM_SUCCESS,
    DELETE_PURCHASE_SUCCESS,
    DELETE_RECIPE_FAIL,
    DELETE_RECIPE_SUCCESS,
    DELETE_SALES_ORDER_FAIL,
    DELETE_SALES_ORDER_SUCCESS,
    DELETE_SCHEDULE_MANUFACTURING_FAIL,
    DELETE_SCHEDULE_MANUFACTURING_SUCCESS,
    DELETE_SKU_FAIL,
    DELETE_SKU_SUCCESS,
    GET_MATERIALS_FAIL,
    GET_MATERIALS_SUCCESS,
    GET_PURCHASE_FAIL,
    GET_PURCHASE_SUCCESS,
    GET_PURCHASES_FAIL,
    GET_PURCHASES_SUCCESS,
    GET_RECORDS_MP_FAIL,
    GET_RECORDS_MP_SUCCESS,
    GET_SALES_ORDER_FAIL,
    GET_SALES_ORDER_SUCCESS,
    GET_SALES_ORDERS_FAIL,
    GET_SALES_ORDERS_SUCCESS,
    GET_SALES_PENDING_FAIL,
    GET_SALES_PENDING_SUCCESS,
    GET_SCHEDULE_CALENDAR_FAIL,
    GET_SCHEDULE_CALENDAR_SUCCESS,
    GET_SKU_FAIL,
    GET_SKU_SUCCESS,
    GET_SKUS_FAIL,
    GET_SKUS_SUCCESS,
    GET_STOCK_AVAILABLE_FAIL,
    GET_STOCK_AVAILABLE_SUCCESS,
    GET_STOCK_ENTRIES_FAIL,
    GET_STOCK_ENTRIES_SUCCESS,
    GET_STOCK_OUTPUTS_FAIL,
    GET_STOCK_OUTPUTS_SUCCESS, GET_STOCK_REENTRIES_FAIL, GET_STOCK_REENTRIES_SUCCESS,
    GET_STOCKS_FAIL,
    GET_STOCKS_SUCCESS,
    LOADING_MATERIALS_PRODUCTS_FAIL,
    LOADING_MATERIALS_PRODUCTS_SUCCESS,
    LOADING_PURCHASES_FAIL,
    LOADING_PURCHASES_SUCCESS,
    LOADING_RECORDS_MP_FAIL,
    LOADING_RECORDS_MP_SUCCESS,
    LOADING_STOCK_FAIL,
    LOADING_STOCK_SUCCESS,
    UPDATE_ADJUSTMENT_FAIL,
    UPDATE_ADJUSTMENT_SUCCESS,
    UPDATE_MATERIAL_FAIL,
    UPDATE_MATERIAL_SUCCESS,
    UPDATE_PURCHASE_FAIL,
    UPDATE_PURCHASE_ITEM_FAIL,
    UPDATE_PURCHASE_ITEM_SUCCESS,
    UPDATE_PURCHASE_SUCCESS,
    UPDATE_RECIPE_FAIL,
    UPDATE_RECIPE_SUCCESS,
    UPDATE_SALES_ORDER_FAIL,
    UPDATE_SALES_ORDER_SUCCESS,
    UPDATE_SCHEDULE_MANUFACTURING_FAIL,
    UPDATE_SCHEDULE_MANUFACTURING_SUCCESS,
    UPDATE_SKU_FAIL,
    UPDATE_SKU_SUCCESS
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
export const add_material = (form, params) => async dispatch => {
    dispatch({type: LOADING_MATERIALS_PRODUCTS_SUCCESS});

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/operations/materials`, form, config);

        if (res.status === 201) {
            dispatch({type: ADD_MATERIAL_SUCCESS});
            dispatch(get_materials(params))
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({type: ADD_MATERIAL_FAIL});
        }
    } catch (err) {
        dispatch({type: ADD_MATERIAL_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));

    } finally {
        dispatch({type: LOADING_MATERIALS_PRODUCTS_FAIL})
    }
}
export const update_material = (id, form, params) => async dispatch => {
    dispatch({type: LOADING_MATERIALS_PRODUCTS_SUCCESS});

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/operations/materials/${id}`, form, config);

        if (res.status === 200) {
            dispatch({type: UPDATE_MATERIAL_SUCCESS});
            dispatch(get_materials(params))
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({type: UPDATE_MATERIAL_FAIL});
        }
    } catch (err) {
        dispatch({type: UPDATE_MATERIAL_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));

    } finally {
        dispatch({type: LOADING_MATERIALS_PRODUCTS_FAIL})
    }
}
export const delete_material = (id, params) => async dispatch => {
    dispatch({type: LOADING_MATERIALS_PRODUCTS_SUCCESS});

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/operations/materials/${id}`, config);

        if (res.status === 200) {
            dispatch({type: DELETE_MATERIAL_SUCCESS});
            dispatch(get_materials(params))
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({type: DELETE_MATERIAL_FAIL});
        }
    } catch (err) {
        dispatch({type: DELETE_MATERIAL_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));

    } finally {
        dispatch({type: LOADING_MATERIALS_PRODUCTS_FAIL})
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
export const add_sku = (form, params) => async dispatch => {
    dispatch({type: LOADING_MATERIALS_PRODUCTS_SUCCESS});

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/operations/products`, form, config);

        if (res.status === 201) {
            dispatch({type: ADD_SKU_SUCCESS});
            dispatch(get_skus(params))
            dispatch(setAlert(res.data.message, 'success'));

        } else {
            dispatch({type: ADD_SKU_FAIL});
        }
    } catch (err) {
        dispatch({type: ADD_SKU_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    } finally {
        dispatch({type: LOADING_MATERIALS_PRODUCTS_FAIL})
    }
}

export const update_sku = (id, form, params) => async dispatch => {
    dispatch({type: LOADING_MATERIALS_PRODUCTS_SUCCESS});

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/operations/products/${id}`, form, config);

        if (res.status === 200) {
            dispatch({type: UPDATE_SKU_SUCCESS});
            dispatch(get_skus(params))
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({type: UPDATE_SKU_FAIL});
        }
    } catch (err) {
        dispatch({type: UPDATE_SKU_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));

    } finally {
        dispatch({type: LOADING_MATERIALS_PRODUCTS_FAIL})
    }
}
export const delete_sku = (id, params) => async dispatch => {
    dispatch({type: LOADING_MATERIALS_PRODUCTS_SUCCESS});

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/operations/products/${id}`, config);

        if (res.status === 200) {
            dispatch({type: DELETE_SKU_SUCCESS});
            dispatch(get_skus(params))
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({type: DELETE_SKU_FAIL});
        }
    } catch (err) {
        dispatch({type: DELETE_SKU_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));

    } finally {
        dispatch({type: LOADING_MATERIALS_PRODUCTS_FAIL})
    }
}

export const add_recipe = (form, id) => async dispatch => {
    dispatch({type: LOADING_MATERIALS_PRODUCTS_SUCCESS});

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/operations/recipe`, form, config);

        if (res.status === 201) {
            dispatch({type: ADD_RECIPE_SUCCESS});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_sku(id))

        } else {
            dispatch({type: ADD_RECIPE_FAIL});
        }
    } catch (err) {
        dispatch({type: ADD_RECIPE_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    } finally {
        dispatch({type: LOADING_MATERIALS_PRODUCTS_FAIL})
    }
}
export const update_recipe = (id, form, id_sku) => async dispatch => {
    dispatch({type: LOADING_MATERIALS_PRODUCTS_SUCCESS});

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/operations/recipe/${id}`, form, config);

        if (res.status === 200) {
            dispatch({type: UPDATE_RECIPE_SUCCESS});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_sku(id_sku))

        } else {
            dispatch({type: UPDATE_RECIPE_FAIL});
        }
    } catch (err) {
        dispatch({type: UPDATE_RECIPE_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    } finally {
        dispatch({type: LOADING_MATERIALS_PRODUCTS_FAIL})
    }
}
export const delete_recipe = (id, id_sku) => async dispatch => {
    dispatch({type: LOADING_MATERIALS_PRODUCTS_SUCCESS});

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/operations/recipe/${id}`, config);

        if (res.status === 200) {
            dispatch({type: DELETE_RECIPE_SUCCESS});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_sku(id_sku))

        } else {
            dispatch({type: DELETE_RECIPE_FAIL});
        }
    } catch (err) {
        dispatch({type: DELETE_RECIPE_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    } finally {
        dispatch({type: LOADING_MATERIALS_PRODUCTS_FAIL})
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

export const add_stock_output = (form) => async dispatch => {
    dispatch({type: LOADING_STOCK_SUCCESS})
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/operations/stock/output`, form, config);
        if (res.status === 201) {
            dispatch({type: ADD_STOCK_OUTPUT_SUCCESS, payload: res.data});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_stock_available());
            dispatch(get_stock_outputs());
        } else {
            dispatch({type: ADD_STOCK_OUTPUT_FAIL});
        }
    } catch (err) {
        dispatch({type: ADD_STOCK_OUTPUT_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    } finally {
        dispatch({type: LOADING_STOCK_FAIL})
    }
}

export const adjustment_stock_output = (form) => async dispatch => {
    dispatch({type: LOADING_STOCK_SUCCESS})
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/operations/stock/entry`, form, config);
        if (res.status === 200) {
            dispatch({type: UPDATE_ADJUSTMENT_SUCCESS, payload: res.data});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_stock_entries());
        } else {
            dispatch({type: UPDATE_ADJUSTMENT_FAIL});
        }
    } catch (err) {
        dispatch({type: UPDATE_ADJUSTMENT_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    } finally {
        dispatch({type: LOADING_STOCK_FAIL})
    }
}

export const get_purchases = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/purchases`, config);
        if (res.status === 200) {
            dispatch({type: GET_PURCHASES_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_PURCHASES_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_PURCHASES_FAIL});
    }
}

export const add_purchase = (form) => async dispatch => {
    dispatch({type: LOADING_PURCHASES_SUCCESS})
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/operations/purchases`, form, config);
        if (res.status === 201) {
            dispatch({type: ADD_PURCHASE_SUCCESS});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_purchases());
        } else {
            dispatch({type: ADD_PURCHASE_FAIL});
        }
    } catch (err) {
        dispatch({type: ADD_PURCHASE_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    } finally {
        dispatch({type: LOADING_PURCHASES_FAIL})
    }
}

export const update_purchase = (form, id) => async dispatch => {
    dispatch({type: LOADING_PURCHASES_SUCCESS})
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/operations/purchases/${id}`, form, config);
        if (res.status === 200) {
            dispatch({type: UPDATE_PURCHASE_SUCCESS});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_purchases());
        } else {
            dispatch({type: UPDATE_PURCHASE_FAIL});
        }
    } catch (err) {
        dispatch({type: UPDATE_PURCHASE_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    } finally {
        dispatch({type: LOADING_PURCHASES_FAIL})
    }
}
export const delete_purchase = (id) => async dispatch => {
    dispatch({type: LOADING_PURCHASES_SUCCESS})
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/operations/purchases/${id}`, config);
        if (res.status === 200) {
            dispatch({type: DELETE_PURCHASE_SUCCESS});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_purchases());
        } else {
            dispatch({type: DELETE_PURCHASE_FAIL});
        }
    } catch (err) {
        dispatch({type: DELETE_PURCHASE_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    } finally {
        dispatch({type: LOADING_PURCHASES_FAIL})
    }
}
export const get_purchase = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/purchases/${id}`, config);
        if (res.status === 200) {
            dispatch({type: GET_PURCHASE_SUCCESS, payload: res.data});
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch({type: GET_PURCHASE_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_PURCHASE_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    }
}
export const add_purchase_item = (form, id) => async dispatch => {
    dispatch({type: LOADING_PURCHASES_SUCCESS})
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/operations/purchases/items`, form, config);
        if (res.status === 201) {
            dispatch({type: ADD_PURCHASE_ITEM_SUCCESS, payload: res.data});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_purchase(id));
        } else {
            dispatch({type: ADD_PURCHASE_ITEM_FAIL});
        }
    } catch (err) {
        dispatch({type: ADD_PURCHASE_ITEM_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    } finally {
        dispatch({type: LOADING_PURCHASES_FAIL})
    }
}

export const update_purchase_item = (form, item_id, id) => async dispatch => {
    dispatch({type: LOADING_PURCHASES_SUCCESS})
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/operations/purchases/items/${item_id}`, form, config);
        if (res.status === 200) {
            dispatch({type: UPDATE_PURCHASE_ITEM_SUCCESS});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_purchase(id));
        } else {
            dispatch({type: UPDATE_PURCHASE_ITEM_FAIL});
        }
    } catch (err) {
        dispatch({type: UPDATE_PURCHASE_ITEM_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    } finally {
        dispatch({type: LOADING_PURCHASES_FAIL})
    }
}

export const delete_purchase_item = (item_id, id) => async dispatch => {
    dispatch({type: LOADING_PURCHASES_SUCCESS})
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/operations/purchases/items/${item_id}`, config);
        if (res.status === 200) {
            dispatch({type: DELETE_PURCHASE_ITEM_SUCCESS});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_purchase(id));
        } else {
            dispatch({type: DELETE_PURCHASE_ITEM_FAIL});
        }
    } catch (err) {
        dispatch({type: DELETE_PURCHASE_ITEM_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    } finally {
        dispatch({type: LOADING_PURCHASES_FAIL})
    }
}

export const add_transfer_stock = (form) => async dispatch => {
    dispatch({type: LOADING_PURCHASES_SUCCESS})
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/operations/stock/transfer`, form, config);
        if (res.status === 201) {
            dispatch({type: ADD_TRANSFER_STOCK_SUCCESS, payload: res.data});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_purchases());
        } else {
            dispatch({type: ADD_TRANSFER_STOCK_FAIL});
        }
    } catch (err) {
        dispatch({type: ADD_TRANSFER_STOCK_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    } finally {
        dispatch({type: LOADING_PURCHASES_FAIL})
    }
}

export const get_sales_orders = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
        },
        params: {...params}
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/sales`, config);
        if (res.status === 200) {
            dispatch({type: GET_SALES_ORDERS_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SALES_ORDERS_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_SALES_ORDERS_FAIL});
    }
}

export const add_sales_order = (form) => async dispatch => {
    const config = {headers: {'Authorization': `JWT ${localStorage.getItem('access')}`}};
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/operations/sales`, form, config);
        if (res.status === 201) {
            dispatch({type: ADD_SALES_ORDER_SUCCESS, payload: res.data});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_sales_orders());
        } else {
            dispatch({type: ADD_SALES_ORDER_FAIL});
        }
    } catch (err) {
        dispatch({type: ADD_SALES_ORDER_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    }
}
export const update_sales_order = (form, slug) => async dispatch => {
    const config = {headers: {'Authorization': `JWT ${localStorage.getItem('access')}`}};
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/operations/sales/${slug}`, form, config);
        if (res.status === 200) {
            dispatch({type: UPDATE_SALES_ORDER_SUCCESS, payload: res.data});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_sales_orders());
        } else {
            dispatch({type: UPDATE_SALES_ORDER_FAIL});
        }
    } catch (err) {
        dispatch({type: UPDATE_SALES_ORDER_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    }
}
export const delete_sales_order = (slug) => async dispatch => {
    const config = {headers: {'Authorization': `JWT ${localStorage.getItem('access')}`}};
    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/operations/sales/${slug}`, config);
        if (res.status === 200) {
            dispatch({type: DELETE_SALES_ORDER_SUCCESS, payload: res.data});
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_sales_orders());
        } else {
            dispatch({type: DELETE_SALES_ORDER_FAIL});
        }
    } catch (err) {
        dispatch({type: DELETE_SALES_ORDER_FAIL});
        dispatch(setAlert(err.response.data.message, 'error'));
    }
}

export const get_sales_order = (slug) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/sales/${slug}`, config);
        if (res.status === 200) {
            dispatch({type: GET_SALES_ORDER_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SALES_ORDER_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_SALES_ORDER_FAIL});
    }
}

export const get_sales_pending = () => async dispatch => {

    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/operations/manufacturing/sales`, config);
        if (res.status === 200) {
            dispatch({type: GET_SALES_PENDING_SUCCESS, payload: res.data});
        } else {
            dispatch({type: GET_SALES_PENDING_FAIL});
        }
    } catch (err) {
        dispatch({type: GET_SALES_PENDING_FAIL});
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
            dispatch(get_sales_pending())
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
            dispatch(get_sales_pending())
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
            dispatch(get_sales_pending())
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