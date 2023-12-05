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
    GET_SALES_PLANNING_SUCCESS,
    GET_SCHEDULE_CALENDAR_FAIL,
    GET_SCHEDULE_CALENDAR_SUCCESS,
    GET_SKU_FAIL,
    GET_SKU_SUCCESS,
    GET_SKUS_FAIL,
    GET_SKUS_SUCCESS,
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
    UPDATE_SCHEDULE_MANUFACTURING_SUCCESS,
} from "../actions/types";

const initialState = {
    lots: null,
    summary: null,
    loading: false,
    materials: null,
    products: null,
    product: null,
    stocks: null,
    stock_entries: null,
    stock_reentries: null,
    stock_outputs: null,
    planning: null,
    calendar: null


}

export default function Operations(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_STOCK_REENTRIES_SUCCESS:
            return {
                ...state, stock_reentries: payload.data
            }
        case GET_STOCK_REENTRIES_FAIL:
            return {
                ...state, stock_reentries: null
            }
        case GET_STOCK_OUTPUTS_SUCCESS:
            return {
                ...state, stock_outputs: payload.data
            }
        case GET_STOCK_OUTPUTS_FAIL:
            return {
                ...state, stock_outputs: null
            }
        case GET_STOCK_ENTRIES_SUCCESS:
            return {
                ...state, stock_entries: payload.data
            }
        case GET_STOCK_ENTRIES_FAIL:
            return {
                ...state, stock_entries: null
            }
        case GET_STOCKS_SUCCESS:
            return {
                ...state, stocks: payload.data
            }
        case GET_STOCKS_FAIL:
            return {
                ...state, stocks: null
            }
        case GET_SKU_SUCCESS:
            return {
                ...state, product: payload.data
            }
        case GET_SKU_FAIL:
            return {
                ...state, product: null
            }
        case GET_MATERIALS_SUCCESS:
            return {
                ...state, materials: payload.data
            }
        case GET_MATERIALS_FAIL:
            return {
                ...state, materials: null
            }
        case GET_SKUS_SUCCESS:
            return {
                ...state, products: payload.data
            }
        case GET_SKUS_FAIL:
            return {
                ...state, products: null
            }
        case LOADING_RECORDS_MP_SUCCESS:
            return {
                ...state, loading: true
            }
        case LOADING_RECORDS_MP_FAIL:
            return {
                ...state, loading: false
            }
        case GET_RECORDS_MP_SUCCESS:
            return {
                ...state, lots: payload.data, summary: payload.summary
            }
        case GET_RECORDS_MP_FAIL:
            return {
                ...state, lots: null, summary: null
            }
        case GET_SALES_PLANNING_SUCCESS:
            return {
                ...state, planning: payload.data
            }
        case GET_SALES_PLANNING_FAIL:
            return {
                ...state, planning: null
            }
        case GET_SCHEDULE_CALENDAR_SUCCESS:
            return {
                ...state, calendar: payload
            }
        case GET_SCHEDULE_CALENDAR_FAIL:
            return {
                ...state, calendar: null
            }
        case ADD_SCHEDULE_MANUFACTURING_SUCCESS:
        case ADD_SCHEDULE_MANUFACTURING_FAIL:
        case UPDATE_SCHEDULE_MANUFACTURING_SUCCESS:
        case UPDATE_SCHEDULE_MANUFACTURING_FAIL:
        case DELETE_SCHEDULE_MANUFACTURING_SUCCESS:
        case DELETE_SCHEDULE_MANUFACTURING_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}