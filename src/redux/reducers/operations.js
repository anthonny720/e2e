import {
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
    GET_STOCK_OUTPUTS_SUCCESS,
    GET_STOCK_REENTRIES_FAIL,
    GET_STOCK_REENTRIES_SUCCESS,
    GET_STOCKS_FAIL,
    GET_STOCKS_SUCCESS,
    LOADING_MATERIALS_PRODUCTS_FAIL,
    LOADING_MATERIALS_PRODUCTS_SUCCESS,
    LOADING_PURCHASES_FAIL,
    LOADING_PURCHASES_SUCCESS,
    LOADING_RECORDS_MP_FAIL,
    LOADING_RECORDS_MP_SUCCESS,
    LOADING_SALES_FAIL,
    LOADING_SALES_SUCCESS,
    LOADING_SCHEDULE_MANUFACTURING_FAIL,
    LOADING_SCHEDULE_MANUFACTURING_SUCCESS,
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
    UPDATE_SAMPLE_FAIL,
    UPDATE_SCHEDULE_MANUFACTURING_FAIL,
    UPDATE_SCHEDULE_MANUFACTURING_SUCCESS,
} from "../actions/types";

const initialState = {
    purchases: null,
    lots: null,
    summary: null,
    kpi: null,
    loading: false,
    loading_products: false,
    materials: null,
    products: null,
    product: null,
    stocks: null,
    stock_entries: null,
    stock_reentries: null,
    stock_outputs: null,
    stock_available: null,
    loading_stock: false,
    loading_purchase: false,
    purchase: null,
    sales: null,
    loading_sales: false,
    sales_order: null,
    sales_pending: null,
    loading_schedule: false,
    calendar: null,
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
        case GET_SCHEDULE_CALENDAR_SUCCESS:
            return {
                ...state, calendar: payload
            }
        case GET_SCHEDULE_CALENDAR_FAIL:
            return {
                ...state, calendar: null
            }
        case LOADING_SCHEDULE_MANUFACTURING_SUCCESS:
            return {
                ...state, loading_schedule: true
            }
        case LOADING_SCHEDULE_MANUFACTURING_FAIL:
            return {
                ...state, loading_schedule: false
            }
        case GET_SALES_PENDING_SUCCESS:
            return {
                ...state, sales_pending: payload.data
            }
        case GET_SALES_PENDING_FAIL:
            return {
                ...state, sales_pending: null
            }
        case GET_SALES_ORDER_SUCCESS:
            return {
                ...state, sales_order: payload.data
            }
        case GET_SALES_ORDER_FAIL:
            return {
                ...state, sales_order: null
            }
        case LOADING_SALES_SUCCESS:
            return {
                ...state,
                loading_sales: true
            }
        case LOADING_SALES_FAIL:
            return {
                ...state,
                loading_sales: false
            }
        case GET_SALES_ORDERS_SUCCESS:
            return {
                ...state, sales: payload.data
            }
        case GET_SALES_ORDERS_FAIL:
            return {
                ...state, sales: null
            }

        case GET_PURCHASE_SUCCESS:
            return {
                ...state, purchase: payload.data
            }
        case GET_PURCHASE_FAIL:
            return {
                ...state, purchase: null
            }
        case LOADING_PURCHASES_SUCCESS:
            return {
                ...state,
                loading_purchase: true
            }
        case LOADING_PURCHASES_FAIL:
            return {
                ...state,
                loading_purchase: false
            }
        case GET_PURCHASES_SUCCESS:
            return {
                ...state, purchases: payload.data
            }
        case GET_PURCHASES_FAIL:
            return {
                ...state, purchases: null
            }
        case LOADING_STOCK_FAIL:
            return {
                ...state,
                loading_stock: false
            }
        case LOADING_STOCK_SUCCESS:
            return {
                ...state,
                loading_stock: true
            }
        case GET_STOCK_AVAILABLE_SUCCESS:
            return {
                ...state, stock_available: payload.data
            }
        case GET_STOCK_AVAILABLE_FAIL:
            return {
                ...state, stock_available: null
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
        case LOADING_MATERIALS_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading_products: true
            }
        case LOADING_MATERIALS_PRODUCTS_FAIL:
            return {
                ...state,
                loading_products: false
            }
        case LOADING_RECORDS_MP_SUCCESS:
            return {
                ...state,
                loading: true
            }
        case LOADING_RECORDS_MP_FAIL:
            return {
                ...state,
                loading: false
            }
        case GET_RECORDS_MP_SUCCESS:
            return {
                ...state, lots: payload.data, summary: payload.summary
            }
        case GET_RECORDS_MP_FAIL:
            return {
                ...state, lots: null, summary: null
            }

        case UPDATE_SAMPLE_FAIL:
        case UPDATE_MATERIAL_SUCCESS:
        case UPDATE_MATERIAL_FAIL:
        case DELETE_MATERIAL_SUCCESS:
        case DELETE_MATERIAL_FAIL:
        case ADD_RECIPE_SUCCESS:
        case ADD_RECIPE_FAIL:
        case UPDATE_RECIPE_SUCCESS:
        case UPDATE_RECIPE_FAIL:
        case DELETE_RECIPE_SUCCESS:
        case DELETE_RECIPE_FAIL:
        case ADD_STOCK_OUTPUT_SUCCESS:
        case ADD_STOCK_OUTPUT_FAIL:
        case UPDATE_ADJUSTMENT_SUCCESS:
        case UPDATE_ADJUSTMENT_FAIL:
        case ADD_PURCHASE_SUCCESS:
        case ADD_PURCHASE_FAIL:
        case UPDATE_PURCHASE_SUCCESS:
        case UPDATE_PURCHASE_FAIL:
        case DELETE_PURCHASE_SUCCESS:
        case DELETE_PURCHASE_FAIL:
        case ADD_PURCHASE_ITEM_SUCCESS:
        case ADD_PURCHASE_ITEM_FAIL:
        case UPDATE_PURCHASE_ITEM_SUCCESS:
        case UPDATE_PURCHASE_ITEM_FAIL:
        case DELETE_PURCHASE_ITEM_SUCCESS:
        case DELETE_PURCHASE_ITEM_FAIL:
        case ADD_TRANSFER_STOCK_SUCCESS:
        case ADD_TRANSFER_STOCK_FAIL:
        case ADD_SALES_ORDER_SUCCESS:
        case ADD_SALES_ORDER_FAIL:
        case UPDATE_SALES_ORDER_SUCCESS:
        case UPDATE_SALES_ORDER_FAIL:
        case DELETE_SALES_ORDER_SUCCESS:
        case DELETE_SALES_ORDER_FAIL:
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