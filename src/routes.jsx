import React from 'react';
import ReactDom from 'react-dom';

import {getJSON} from './common/dataService';
import global from './common/global';
import util from './common/util';
import URLS from './constants/URLS';

//main
import Main from './containers/Main';
//home
import Home from './containers/home/home';
import Ctxl from './containers/home/ctxl';
import Cjk from './containers/home/cjk';
import Qnqm from './containers/home/qnqm';


const routes = {
  path: '/',
  component: Main,
  indexRoute: {component: Home},
  childRoutes: [
    {
      path: 'home',
      component: Home,
      childRoutes: [
        {
          path: 'ctxl',
          component: Ctxl
        },
        {
          path: 'cjk',
          component: Cjk
        }
        ,
        {
          path: 'qnqm',
          component: Qnqm
        }
      ]
    }
  ]
};

export default routes;
