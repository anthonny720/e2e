import axios from "axios";
import {
    ADD_DATA_LOT_FAIL,
    ADD_DATA_LOT_SUCCESS,
    ADD_LOT_FAIL,
    ADD_LOT_SUCCESS,
    ADD_MOTION_BOX_FAIL,
    ADD_MOTION_BOX_SUCCESS,
    ADD_OUTPUT_ITEM_FAIL,
    ADD_OUTPUT_ITEM_SUCCESS,
    ADD_STOCK_LOT_FAIL,
    ADD_STOCK_LOT_SUCCESS,
    DELETE_DATA_LOT_FAIL,
    DELETE_DATA_LOT_SUCCESS,
    DELETE_MOTION_BOX_FAIL,
    DELETE_MOTION_BOX_SUCCESS,
    DELETE_STOCK_LOT_FAIL,
    DELETE_STOCK_LOT_SUCCESS,
    GET_DATA_LOT_FAIL,
    GET_DATA_LOT_SUCCESS,
    GET_LOT_FAIL,
    GET_LOT_SUCCESS,
    GET_LOTS_FAIL,
    GET_LOTS_STOCK_FAIL,
    GET_LOTS_STOCK_SUCCESS,
    GET_LOTS_SUCCESS,
    GET_MOTION_BOXES_FAIL,
    GET_MOTION_BOXES_SUCCESS,
    GET_OUTPUT_ITEMS_FAIL,
    GET_OUTPUT_ITEMS_SUCCESS,
    GET_PALLETS_FAIL,
    GET_PALLETS_SUCCESS,
    GET_STOCK_LOT_FAIL,
    GET_STOCK_LOT_SUCCESS,
    UPDATE_DATA_LOT_FAIL,
    UPDATE_DATA_LOT_SUCCESS,
    UPDATE_LOT_FAIL,
    UPDATE_LOT_SUCCESS,
} from "./types";
import {setAlert} from "./alert";
import {get_locations} from "./management";


export const add_lot = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/logistic/lots`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_LOT_SUCCESS, payload: res.data
            });
            dispatch(get_lots());
            dispatch(setAlert('Lote registrado', 'success'));
        } else {
            dispatch({
                type: ADD_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_LOT_FAIL
        });
        dispatch(setAlert('Ocurrió un error al registrar el lote', 'error'));
    }
}


export const get_lots = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }, params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/lots`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOTS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_LOTS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOTS_FAIL
        });
    }
}
export const get_lot = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/lots/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOT_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOT_FAIL
        });
    }
}

export const update_lot = (id, form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/logistic/lots/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_LOT_SUCCESS,
            });
            dispatch(setAlert(res.data.message, 'success'));
            dispatch(get_lot(id));
        } else {
            dispatch({
                type: UPDATE_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_LOT_FAIL
        });
        dispatch(setAlert(err.response.data.message, 'error'));

    }
}

export const get_pallets = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/pallets`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_PALLETS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_PALLETS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_PALLETS_FAIL
        });
    }
}
export const get_data = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/lots/${id}/data`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_DATA_LOT_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_DATA_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_DATA_LOT_FAIL
        });
    }
}
export const update_data = (form, lot, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/api/logistic/lots/${lot}/data/${id}`, form, config);
        if (res.status === 200) {
            dispatch({
                type: UPDATE_DATA_LOT_SUCCESS, payload: res.data
            });
            dispatch(get_data(lot));
            dispatch(get_lot(lot));
            dispatch(setAlert('Información actualizada', 'success'));
        } else {
            dispatch({
                type: UPDATE_DATA_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_DATA_LOT_FAIL
        });
        dispatch(setAlert("Ocurrió un error al actualizar la información", 'error'));
    }
}
export const delete_data = (lot, id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/logistic/lots/${lot}/data/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_DATA_LOT_SUCCESS
            });
            dispatch(get_data(lot));
            dispatch(get_lot(lot));
            dispatch(setAlert('Información eliminada', 'success'));
        } else {
            dispatch({
                type: DELETE_DATA_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_DATA_LOT_FAIL
        });
        dispatch(setAlert('Ocurrió un error al eliminar la información', 'error'));
    }
}
export const add_data = (form, lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/logistic/lots/${lot}/data`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_DATA_LOT_SUCCESS, payload: res.data
            });
            dispatch(get_data(lot));
            dispatch(get_lot(lot));
            dispatch(setAlert('Información registrada', 'success'));
        } else {
            dispatch({
                type: ADD_DATA_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_DATA_LOT_FAIL
        });
        dispatch(setAlert('Ocurrió un error al registrar la información', 'error'));

    }
}

export const get_stock = () => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },

    };


    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/stock`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_LOTS_STOCK_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_LOTS_STOCK_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_LOTS_STOCK_FAIL
        });
    }
}

export const get_output_stock = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/output`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_STOCK_LOT_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_STOCK_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_STOCK_LOT_FAIL
        });
    }
}
export const add_output_stock = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/logistic/output`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_STOCK_LOT_SUCCESS, payload: res.data
            });
            dispatch(get_output_stock());
            dispatch(get_stock());
            dispatch(setAlert('Salida registrada', 'success'));


        } else {
            dispatch({
                type: ADD_STOCK_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_STOCK_LOT_FAIL
        });
        dispatch(setAlert('Ocurrió un error al registrar la salida', 'error'));

    }
}
export const delete_output_stock = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },

    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/logistic/output/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_STOCK_LOT_SUCCESS, payload: res.data
            });
            dispatch(get_output_stock());
            dispatch(get_stock());
            dispatch(setAlert('Salida eliminada', 'success'));
        } else {
            dispatch({
                type: DELETE_STOCK_LOT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_STOCK_LOT_FAIL
        });
        dispatch(setAlert('Ocurrió un error al eliminar la salida', 'error'));

    }
}


export const get_motion_boxes = (params) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
        params: {...params}
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/motion`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_MOTION_BOXES_SUCCESS, payload: res.data
            });
            dispatch(get_locations());
        } else {
            dispatch({
                type: GET_MOTION_BOXES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_MOTION_BOXES_FAIL
        });
    }
}
export const add_motion_boxes = (form) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },

    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/logistic/motion`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_MOTION_BOX_SUCCESS, payload: res.data
            });
            dispatch(setAlert('Movimiento registrado', 'success'));
            dispatch(get_motion_boxes());
        } else {
            dispatch({
                type: ADD_MOTION_BOX_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_MOTION_BOX_FAIL
        });
        dispatch(setAlert('Ocurrió un error al registrar el movimiento', 'error'));

    }
}
export const delete_motion_boxes = (id) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/logistic/motion/${id}`, config);
        if (res.status === 200) {
            dispatch({
                type: DELETE_MOTION_BOX_SUCCESS, payload: res.data
            });
            dispatch(setAlert('Movimiento eliminado', 'success'));
            dispatch(get_motion_boxes());
        } else {
            dispatch({
                type: DELETE_MOTION_BOX_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_MOTION_BOX_FAIL
        });
        dispatch(setAlert('Ocurrió un error al eliminar el movimiento', 'error'));

    }
}


export const add_output_items = (form, lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        },
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/logistic/output-items`, form, config);
        if (res.status === 201) {
            dispatch({
                type: ADD_OUTPUT_ITEM_SUCCESS, payload: res.data
            });
            dispatch(get_output_items(lot));
            dispatch(setAlert('Salida registrada', 'success'));
        } else {
            dispatch({
                type: ADD_OUTPUT_ITEM_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: ADD_OUTPUT_ITEM_FAIL
        });
        dispatch(setAlert('Ocurrió un error al registrar la salida', 'error'));
    }
}

export const get_output_items = (lot) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`, 'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/logistic/output-items/${lot}`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_OUTPUT_ITEMS_SUCCESS, payload: res.data
            });
        } else {
            dispatch({
                type: GET_OUTPUT_ITEMS_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_OUTPUT_ITEMS_FAIL
        });
    }
}