 
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import util from '../../common/util';

import Home from '../../components/home/Index';
import styles from '../../styles/less/home.less';

import { GET_DATA_REQUESTED } from '../../constants/home'


class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }
  search() {
    const { dispatch } = this.props;
    dispatch({type: GET_DATA_REQUESTED})
  }
  render() {
    return (
     <div>
        <h1 className={styles.title}>Home</h1>
        <div className={styles['button--ml-15']} onClick={this.search}>click search</div>
        {this.props.children || <Home {...this.props}/>}
      </div>
    );
  }
}
AppComponent.defaultProps = {
};
const getHome = (state) => {
  return state.home;
}
const selectors = createSelector(
  [getHome],
  (home) => {
    return {...home};
  }
)

export default connect(selectors)(AppComponent);


