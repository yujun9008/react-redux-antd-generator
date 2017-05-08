 
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import util from '../../common/util';

import Home from '../../components/home/Index'


class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { home } = this.props;
    return (
     <div>
        冲田杏梨
        <img src={home.ctxl.img} />
      </div>
    );
  }
}
AppComponent.defaultProps = {
};
const getState = (state) => {
  return state;
}
const selectors = createSelector(
  [getState],
  (state) => {
    return state;
  }
)

export default connect(selectors)(AppComponent);


