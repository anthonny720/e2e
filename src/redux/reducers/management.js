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
    GET_UNITS_SUCCESS,
    LOADING_MANAGEMENT_FAIL,
    LOADING_MANAGEMENT_SUCCESS
} from "../actions/types";

const initialState = {
    customers: null,
    suppliers: null,
    suppliers_rm: null,
    transports: null,
    outsourcings: null,
    loading: false,
    storage: null,
    locations: null,
    costs: null,
    units: null,
    categories: null,
    contact: null,

}

export default function Management(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {

        case GET_OUTSOURCING_SUCCESS:
        case GET_TRANSPORT_SUCCESS:
        case GET_SUPPLIER_RM_SUCCESS:
        case GET_SUPPLIER_SUCCESS:
        case GET_CUSTOMER_SUCCESS:
            return {
                ...state, contact: payload.data
            }
        case GET_OUTSOURCING_FAIL:
        case GET_TRANSPORT_FAIL:
        case GET_SUPPLIER_RM_FAIL:
        case GET_SUPPLIER_FAIL:
        case GET_CUSTOMER_FAIL:
            return {
                ...state, contact: null
            }

        case GET_SUPPLIERS_RM_SUCCESS:
            return {
                ...state, suppliers_rm: payload.data
            }
        case GET_SUPPLIERS_RM_FAIL:
            return {
                ...state, suppliers_rm: null
            }
        case GET_OUTSOURCINGS_SUCCESS:
            return {
                ...state, outsourcings: payload.data
            }
        case GET_OUTSOURCINGS_FAIL:
            return {
                ...state, outsourcings: null
            }
        case GET_TRANSPORTS_SUCCESS:
            return {
                ...state, transports: payload.data
            }
        case GET_TRANSPORTS_FAIL:
            return {
                ...state, transports: null
            }
        case GET_SUPPLIERS_SUCCESS:
            return {
                ...state, suppliers: payload.data
            }
        case GET_SUPPLIERS_FAIL:
            return {
                ...state, suppliers: null
            }
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state, categories: payload.data
            }
        case GET_CATEGORIES_FAIL:
            return {
                ...state, categories: null
            }
        case GET_UNITS_SUCCESS:
            return {
                ...state, units: payload.data
            }
        case GET_UNITS_FAIL:
            return {
                ...state, units: null
            }
        case GET_COSTS_PRODUCTION_SUCCESS:
            return {
                ...state, costs: payload.data
            }
        case GET_COSTS_PRODUCTION_FAIL:
            return {
                ...state, costs: null
            }
        case GET_CUSTOMERS_SUCCESS:
            return {...state, customers: payload.data}
        case GET_CUSTOMERS_FAIL:
            return {
                ...state, customers: null
            }
        case GET_STORAGE_AREAS_SUCCESS:
            return {
                ...state, storage: payload.data
            }
        case GET_STORAGE_AREAS_FAIL:
            return {
                ...state, storage: null
            }
        case GET_LOCATIONS_SUCCESS:
            return {
                ...state, locations: payload.data
            }
        case GET_LOCATIONS_FAIL:
            return {
                ...state, locations: null
            }
        case LOADING_MANAGEMENT_SUCCESS:
            return {
                ...state, loading: true
            }
        case LOADING_MANAGEMENT_FAIL:
            return {
                ...state, loading: false
            }
        default:
            return state
    }
}