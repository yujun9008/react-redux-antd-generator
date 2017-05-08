import React from 'react';
import { handleActions } from 'redux-actions';

import { GET_DATA_SUCCEEDED, GET_DATA_FAILED, SHOW_TABLE_LOADING } from '../constants/home';

export default handleActions({
        [GET_DATA_SUCCEEDED](state, action) {
            return {...state, tableData: action.tableData, showLoading: false}
        },
        [GET_DATA_FAILED](state, action) {
            alert(action.message);
            return state;
        },
        [SHOW_TABLE_LOADING](state, action) {
            return {...state, tableData:[], showLoading: true}
        }
    },
    {
        tableData: [],
        cjk: {
            img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3826705620,2660866328&fm=58'
        },
        ctxl: {
            img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=249823385,2455080893&fm=58'
        },
        qnqm: {
            img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2475006254,1607338673&fm=58'
        },
        showLoading: false
    }
)