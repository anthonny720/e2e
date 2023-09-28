import {
    GET_CONDITIONING_PINEAPPLE_FAIL,
    GET_CONDITIONING_PINEAPPLE_SUCCESS,
    GET_MOD_FAIL,
    GET_MOD_SUCCESS,
    GET_PACKING_PINEAPPLE_FAIL,
    GET_PACKING_PINEAPPLE_SUCCESS
} from "../actions/types";

const initialState = {
    process: null, mod: null, packing_process: null
}

export default function Production(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CONDITIONING_PINEAPPLE_SUCCESS:
            return {
                ...state, process: payload.data
            }
        case GET_CONDITIONING_PINEAPPLE_FAIL:
            return {
                ...state, process: null
            }
        case GET_PACKING_PINEAPPLE_SUCCESS:
            return {
                ...state, packing_process: payload.data
            }
        case GET_PACKING_PINEAPPLE_FAIL:
            return {
                ...state, packing_process: null
            }
        case GET_MOD_SUCCESS:
            return {
                ...state, mod: payload.data
            }
        case GET_MOD_FAIL:
            return {
                ...state, mod: null
            }
        default:
            return state
    }
}