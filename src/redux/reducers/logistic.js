import {
    ADD_DATA_LOT_FAIL,
    ADD_DATA_LOT_SUCCESS,
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
} from "../actions/types";

const initialState = {
    lots: null,
    lot: null,
    pallets: null,
    data: null,
    stocks: null,
    output: null,
    motion: null,
    output_items: null,
    summary_items: null
}

export default function Logistic(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_OUTPUT_ITEMS_SUCCESS:
            return {
                ...state, output_items: payload.data, summary_items: payload.summary
            }
        case GET_OUTPUT_ITEMS_FAIL:
            return {
                ...state, output_items: null
            }
        case GET_LOTS_SUCCESS:
            return {
                ...state, lots: payload.data
            }
        case GET_LOTS_FAIL:
            return {
                ...state, lots: null
            }
        case GET_LOT_SUCCESS:
            return {
                ...state, lot: payload.data
            }
        case GET_LOT_FAIL:
            return {
                ...state, lot: null
            }
        case GET_PALLETS_SUCCESS:
            return {
                ...state, pallets: payload.data
            }
        case GET_PALLETS_FAIL:
            return {
                ...state, pallets: null
            }
        case GET_DATA_LOT_SUCCESS:
            return {
                ...state, data: payload.data
            }
        case GET_DATA_LOT_FAIL:
            return {
                ...state, data: null
            }
        case GET_LOTS_STOCK_SUCCESS:
            return {
                ...state, stocks: payload.data
            }
        case GET_LOTS_STOCK_FAIL:
            return {
                ...state, stocks: null
            }
        case GET_STOCK_LOT_SUCCESS:
            return {
                ...state, output: payload.data
            }
        case GET_STOCK_LOT_FAIL:
            return {
                ...state, output: null
            }
        case GET_MOTION_BOXES_SUCCESS:
            return {
                ...state, motion: payload.data
            }
        case GET_MOTION_BOXES_FAIL:
            return {
                ...state, motion: null
            }

        case ADD_DATA_LOT_SUCCESS:
        case ADD_DATA_LOT_FAIL:
        case ADD_OUTPUT_ITEM_SUCCESS:
        case ADD_OUTPUT_ITEM_FAIL:
        case UPDATE_DATA_LOT_SUCCESS:
        case UPDATE_DATA_LOT_FAIL:
        case DELETE_DATA_LOT_SUCCESS:
        case DELETE_DATA_LOT_FAIL:
        case ADD_STOCK_LOT_SUCCESS:
        case ADD_STOCK_LOT_FAIL:
        case DELETE_STOCK_LOT_SUCCESS:
        case DELETE_STOCK_LOT_FAIL:
        case ADD_MOTION_BOX_SUCCESS:
        case ADD_MOTION_BOX_FAIL:
        case DELETE_MOTION_BOX_SUCCESS:
        case DELETE_MOTION_BOX_FAIL:
        case UPDATE_LOT_SUCCESS:
        case UPDATE_LOT_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}