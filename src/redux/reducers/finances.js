import {GET_COSTS_FINANCES_FAIL, GET_COSTS_FINANCES_SUCCESS, ADD_COSTS_FINANCES_FAIL, ADD_COSTS_FINANCES_SUCCESS} from '../actions/types';

const initialState = {
    records: null,
}
export default function Finance(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case GET_COSTS_FINANCES_SUCCESS:
            return {
                ...state, records: payload.data
            }
        case GET_COSTS_FINANCES_FAIL:
            return {
                ...state, records: null
            }
        case ADD_COSTS_FINANCES_SUCCESS:
        case ADD_COSTS_FINANCES_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
}