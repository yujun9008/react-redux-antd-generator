import { handleActions } from 'redux-actions';

import { SHOW_GLOBAL_LOADING, HIDE_GLOBAL_LOADING } from '../constants/globalLoading';

export default handleActions({
        [SHOW_GLOBAL_LOADING](state, action) {
            return {...state, gloading: true}
        },
        [HIDE_GLOBAL_LOADING](state, action) {
            return {...state, gloading: false}
        }
    },
    {
        gloading: false
    }
)