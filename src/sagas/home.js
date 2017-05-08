import { takeEvery, isCancelError } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { getJSON } from '../common/dataService';

import { GET_DATA_REQUESTED, GET_DATA_SUCCEEDED, GET_DATA_FAILED, SHOW_TABLE_LOADING } from '../constants/home';
import { SHOW_GLOBAL_LOADING, HIDE_GLOBAL_LOADING } from '../constants/globalLoading';

import URLS from '../constants/URLS';

function* fetchTableData(action) {
    yield put({type: SHOW_TABLE_LOADING})
    yield put({type: SHOW_GLOBAL_LOADING})
    try {
      const data = yield call(getJSON, URLS.HOME_GET_TABLEDATA_URL, {accountId: action.accountId});
      yield put({type: GET_DATA_SUCCEEDED, tableData:data });
      yield put({type: HIDE_GLOBAL_LOADING})
   } catch (e) {
      yield put({type: GET_DATA_FAILED, message: e});
      yield put({type: HIDE_GLOBAL_LOADING})
   }
}

function* fetchTableDataSaga() {
  yield* takeEvery( GET_DATA_REQUESTED, fetchTableData );
}

export {
    fetchTableDataSaga
};
