 
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
        苍井空
        <img src={home.cjk.img} />
      </div>
    );
  }
}
AppComponent.defaultProps = {
};
const getHome = (state) => {
  return state;
}
const selectors = createSelector(
  [getHome],
  (home) => {
    return {...home};
  }
)

export default connect(selectors)(AppComponent);


