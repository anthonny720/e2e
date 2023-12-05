import {
    GET_ANALYSIS_FAIL,
    GET_ANALYSIS_SUCCESS,
    GET_STATUS_FAIL,
    GET_STATUS_SUCCESS,
    UPDATE_STATUS_FAIL,
    UPDATE_STATUS_SUCCESS
} from "../actions/types";

const initialState = {
    analysis: null, status: null
}

export default function Quality(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_ANALYSIS_SUCCESS:
            return {
                ...state, analysis: payload.data
            }
        case GET_ANALYSIS_FAIL:
            return {
                ...state, analysis: null
            }
        case GET_STATUS_SUCCESS:
            return {
                ...state, status: payload.data
            }
        case GET_STATUS_FAIL:
            return {
                ...state, status: null
            }
        case UPDATE_STATUS_SUCCESS:
        case UPDATE_STATUS_FAIL:
            return {
                ...state, status: null
            }
        default:
            return state
    }
}