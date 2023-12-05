import {
    GET_PARCELS_FAIL,
    GET_PARCELS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_SUCCESS,
    GET_PROVIDERS_CATEGORY_FAIL,
    GET_PROVIDERS_CATEGORY_SUCCESS,
} from "../actions/types";

const initialState = {
    products: null, parcels: null, providers: null, providers_category: null
}

export default function Collection(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {

        case GET_PARCELS_SUCCESS:
            return {
                ...state, parcels: payload.data
            }
        case GET_PARCELS_FAIL:
            return {
                ...state, parcels: null
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state, products: payload.data
            }
        case GET_PRODUCTS_FAIL:
            return {
                ...state, products: null
            }
        case GET_PROVIDERS_CATEGORY_SUCCESS:
            return {
                ...state, providers_category: payload.data
            }
        case GET_PROVIDERS_CATEGORY_FAIL:
            return {
                ...state, providers_category: null
            }
        default:
            return state
    }
}