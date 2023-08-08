import {
    ADD_CONTACT_FAIL,
    ADD_CONTACT_SUCCESS,
    ADD_CUSTOMER_FAIL,
    ADD_CUSTOMER_SUCCESS,
    ADD_OUTSOURCING_FAIL,
    ADD_OUTSOURCING_SUCCESS,
    ADD_SUPPLIER_FAIL,
    ADD_SUPPLIER_RM_FAIL,
    ADD_SUPPLIER_RM_SUCCESS,
    ADD_SUPPLIER_SUCCESS,
    ADD_TRANSPORT_FAIL,
    ADD_TRANSPORT_SUCCESS,
    DELETE_CONTACT_FAIL,
    DELETE_CONTACT_SUCCESS,
    DELETE_CUSTOMER_FAIL,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_OUTSOURCING_FAIL,
    DELETE_OUTSOURCING_SUCCESS,
    DELETE_SUPPLIER_FAIL,
    DELETE_SUPPLIER_RM_FAIL,
    DELETE_SUPPLIER_RM_SUCCESS,
    DELETE_SUPPLIER_SUCCESS,
    DELETE_TRANSPORT_FAIL,
    DELETE_TRANSPORT_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    GET_CONDITIONS_FAIL,
    GET_CONDITIONS_SUCCESS,
    GET_CONTAINERS_FAIL,
    GET_CONTAINERS_SUCCESS,
    GET_COSTS_PRODUCTION_FAIL,
    GET_COSTS_PRODUCTION_SUCCESS,
    GET_CURRENCIES_FAIL,
    GET_CURRENCIES_SUCCESS,
    GET_CUSTOMER_FAIL,
    GET_CUSTOMER_SUCCESS,
    GET_CUSTOMERS_FAIL,
    GET_CUSTOMERS_SUCCESS,
    GET_CUTS_FAIL,
    GET_CUTS_SUCCESS,
    GET_FAMILIES_FAIL,
    GET_FAMILIES_SUCCESS,
    GET_LOCATIONS_FAIL,
    GET_LOCATIONS_SUCCESS,
    GET_OUTSOURCING_FAIL,
    GET_OUTSOURCING_SUCCESS,
    GET_OUTSOURCINGS_FAIL,
    GET_OUTSOURCINGS_SUCCESS,
    GET_PACKINGS_FAIL,
    GET_PACKINGS_SUCCESS,
    GET_STORAGE_AREAS_FAIL,
    GET_STORAGE_AREAS_SUCCESS,
    GET_SUBFAMILIES_FAIL,
    GET_SUBFAMILIES_SUCCESS,
    GET_SUPPLIER_FAIL,
    GET_SUPPLIER_RM_FAIL,
    GET_SUPPLIER_RM_SUCCESS,
    GET_SUPPLIER_SUCCESS,
    GET_SUPPLIERS_FAIL,
    GET_SUPPLIERS_RM_FAIL,
    GET_SUPPLIERS_RM_SUCCESS,
    GET_SUPPLIERS_SUCCESS,
    GET_TAXES_FAIL,
    GET_TAXES_SUCCESS,
    GET_TRANSPORT_FAIL,
    GET_TRANSPORT_SUCCESS,
    GET_TRANSPORTS_FAIL,
    GET_TRANSPORTS_SUCCESS,
    GET_UNITS_FAIL,
    GET_UNITS_SUCCESS,
    LOADING_MANAGEMENT_FAIL,
    LOADING_MANAGEMENT_SUCCESS,
    UPDATE_CONTACT_FAIL,
    UPDATE_CONTACT_SUCCESS,
    UPDATE_CUSTOMER_FAIL,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_OUTSOURCING_FAIL,
    UPDATE_OUTSOURCING_SUCCESS,
    UPDATE_SUPPLIER_FAIL,
    UPDATE_SUPPLIER_RM_FAIL,
    UPDATE_SUPPLIER_RM_SUCCESS,
    UPDATE_SUPPLIER_SUCCESS,
    UPDATE_TRANSPORT_FAIL,
    UPDATE_TRANSPORT_SUCCESS
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
    taxes: null,
    currencies: null,
    conditions: null,
    families: null,
    subfamilies: null,
    cuts: null,
    packings: null,
    contact: null,
    containers: null,

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

        case GET_CONTAINERS_SUCCESS:
            return {
                ...state, containers: payload.data
            }
        case GET_CONTAINERS_FAIL:
            return {
                ...state, containers: null
            }
        case GET_PACKINGS_SUCCESS:
            return {
                ...state, packings: payload.data
            }
        case GET_PACKINGS_FAIL:
            return {
                ...state, packings: null
            }
        case GET_CUTS_SUCCESS:
            return {
                ...state, cuts: payload.data
            }
        case GET_CUTS_FAIL:
            return {
                ...state, cuts: null
            }
        case GET_SUBFAMILIES_SUCCESS:
            return {
                ...state, subfamilies: payload.data
            }
        case GET_SUBFAMILIES_FAIL:
            return {
                ...state, subfamilies: null
            }
        case GET_FAMILIES_SUCCESS:
            return {
                ...state, families: payload.data
            }
        case GET_FAMILIES_FAIL:
            return {
                ...state, families: null
            }
        case GET_CONDITIONS_SUCCESS:
            return {
                ...state, conditions: payload.data
            }
        case GET_CONDITIONS_FAIL:
            return {
                ...state, conditions: null
            }
        case GET_CURRENCIES_SUCCESS:
            return {
                ...state, currencies: payload.data
            }
        case GET_CURRENCIES_FAIL:
            return {
                ...state, currencies: null
            }
        case GET_TAXES_SUCCESS:
            return {
                ...state, taxes: payload.data
            }
        case GET_TAXES_FAIL:
            return {
                ...state, taxes: null
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
                ...state,
                costs: null
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
        case UPDATE_CUSTOMER_SUCCESS:
        case UPDATE_CUSTOMER_FAIL:
        case DELETE_CUSTOMER_SUCCESS:
        case DELETE_CUSTOMER_FAIL:
        case UPDATE_SUPPLIER_SUCCESS:
        case UPDATE_SUPPLIER_FAIL:
        case DELETE_SUPPLIER_SUCCESS:
        case DELETE_SUPPLIER_FAIL:
        case UPDATE_SUPPLIER_RM_SUCCESS:
        case UPDATE_SUPPLIER_RM_FAIL:
        case DELETE_SUPPLIER_RM_SUCCESS:
        case DELETE_SUPPLIER_RM_FAIL:
        case UPDATE_TRANSPORT_SUCCESS:
        case UPDATE_TRANSPORT_FAIL:
        case DELETE_TRANSPORT_SUCCESS:
        case DELETE_TRANSPORT_FAIL:
        case UPDATE_OUTSOURCING_SUCCESS:
        case UPDATE_OUTSOURCING_FAIL:
        case DELETE_OUTSOURCING_SUCCESS:
        case DELETE_OUTSOURCING_FAIL:
        case UPDATE_CONTACT_SUCCESS:
        case UPDATE_CONTACT_FAIL:
        case DELETE_CONTACT_SUCCESS:
        case DELETE_CONTACT_FAIL:
        case ADD_CONTACT_SUCCESS:
        case ADD_CONTACT_FAIL:
        case ADD_CUSTOMER_SUCCESS:
        case ADD_CUSTOMER_FAIL:
        case ADD_SUPPLIER_SUCCESS:
        case ADD_SUPPLIER_FAIL:
        case ADD_SUPPLIER_RM_SUCCESS:
        case ADD_SUPPLIER_RM_FAIL:
        case ADD_TRANSPORT_SUCCESS:
        case ADD_TRANSPORT_FAIL:
        case ADD_OUTSOURCING_SUCCESS:
        case ADD_OUTSOURCING_FAIL:

            return {
                ...state
            }
        default:
            return state
    }
}