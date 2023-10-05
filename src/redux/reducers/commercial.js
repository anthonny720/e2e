import {
    GET_SALE_ORDER_FAIL,
    GET_SALE_ORDER_SUCCESS,
    GET_SALES_PROGRESS_FAIL,
    GET_SALES_PROGRESS_SUCCESS,
} from "../actions/types";

const initialState = {
    sales_progress: null, sale_order: null
}

export default function Commercial(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_SALES_PROGRESS_SUCCESS:
            return {
                ...state, sales_progress: payload.data
            }
        case GET_SALES_PROGRESS_FAIL:
            return {
                ...state, sales_progress: null
            }
        case GET_SALE_ORDER_SUCCESS:
            return {
                ...state, sale_order: payload.data
            }
        case GET_SALE_ORDER_FAIL:
            return {
                ...state, sale_order: null
            }
        default:
            return state
    }
}