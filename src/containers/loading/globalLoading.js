 
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import styles from '../../styles/less/global_loading.less';

class GlobalLoading extends React.Component {
  render() {
    const { globalLoading } = this.props;
    return (
     <div className={styles.main + (globalLoading.gloading ? '' : (' ' + styles['main--hidden']))}>
        <div className={styles.icon}></div>
        <div className={styles.text}>Loading...</div>
      </div>
    );
  }
}
const getLoading = (state) => {
  return state.gloading;
}
const selectors = createSelector(
  [getLoading],
  (gloading) => {
    return {...gloading};
  }
)

export default connect(selectors)(GlobalLoading);


