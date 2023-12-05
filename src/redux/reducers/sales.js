import {
    ADD_SAMPLE_FAIL,
    ADD_SAMPLE_SUCCESS,
    GET_CALENDAR_SAMPLES_FAIL,
    GET_CALENDAR_SAMPLES_SUCCESS,
    GET_SAMPLES_FAIL,
    GET_SAMPLES_SUCCESS,
    UPDATE_SAMPLE_FAIL,
    UPDATE_SAMPLE_SUCCESS
} from "../actions/types";

const initialState = {
    samples: null, calendar: null
}

export default function Sales(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_SAMPLES_SUCCESS:
            return {
                ...state, samples: payload.data
            }
        case GET_SAMPLES_FAIL:
            return {
                ...state, samples: null
            }
        case GET_CALENDAR_SAMPLES_SUCCESS:
            return {
                ...state, calendar: payload.data
            }
        case GET_CALENDAR_SAMPLES_FAIL:
            return {
                ...state, calendar: null
            }
        case ADD_SAMPLE_SUCCESS:
        case ADD_SAMPLE_FAIL:
        case UPDATE_SAMPLE_SUCCESS:
        case UPDATE_SAMPLE_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}