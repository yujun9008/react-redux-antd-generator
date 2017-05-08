import React from 'react';
import Link from 'react-router';

import { GET_DATA_REQUESTED } from '../../constants/home';

import Table from '../../components/home/Table';

import styles from '../../styles/less/home.less';
import loadingStyles from '../../styles/less/loading.less';

class Home extends React.Component {
    query() {
        const { dispatch } = this.props;
        dispatch({
            type: GET_DATA_REQUESTED
        })
    }

    componentDidMount() {

        this.query();
    }

    render() {
        const { dispatch, tableData, showLoading } = this.props;
        return (
            <div className={styles['table-container']} id="componentsIndex">
                {showLoading ? <div className={loadingStyles.main}></div> : ''}
                <Table dispatch={dispatch} tableData={tableData} showLoading={showLoading}/>
            </div>
        )
    }
}

export default Home;