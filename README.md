# react-redux-antd-generator
> react-redux生成器
> 
> 支持yarn安装
> 
> 支持flowd代码检查
> 
## 安装package

```
yarn / npm install 
```

## 运行

```
yarn/npm start
```

## 编译

```
npm run dist
```

会把源代码编译到`/dist`目录下

## 文档结构

```
webapp-
	cfg-  //webpack各种配置目录
		base.js //webpack基础配置
		defaults.js //webpack配置常量
		dev.js //webpack dev配置
		dist.js //webpack 编译配置
		test.js //webpack 自动化测试配置
	dist- //最终编译的目录
		assets/  //包括了编译后的css、js
		index.html  //编译后的spa的入口页面
	src-  //代码目录
		common 通用工具目录
		components //Dumb/Presentational Components目录
		constants //常量目录
		containers //Smart/Container Components目录
		images //图片目录
		reducers- //reducer目录
			index.js //reducer加载器
		sagas- //saga目录
			index.js //saga加载器
		styles- //样式目录
			less //less目录
		testdata //mock数据目录
		index.html //WebpackDevServer启动时候的页面
		index.js //程序入口，在cfg/dev.js中entry中定义了index bundle引用这个文件
		index_dist.html //编译的页面，最终这个页面会被编译生成dist/index.html
		routers.jsx //react-router路由的配置文件，在src/index.js中为react-router的<Router>设置
	test //测试用例目录
	.babelrc //babel配置文件
	.eslintrc //eslint配置文件
	.gitignore //git ignore文件
	build.sh //执行编译的入口shell
	karma.conf.js //karma配置文件
	package.json //不解释
	README.md //你现在阅读的文字都放在这个文件中
	server.js //启动WebpackDevServer服务
	webpackconfig.js //webpack配置文件
    .flowconfig //flow config
```



## 如何上手开发

### 1. router

#### router配置

路由使用的是[react-router](https://github.com/ReactTraining/react-router)和[react-router-redux](https://github.com/reactjs/react-router-redux)，在`src/index.js`中声明了router

```
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import routes from './routes.jsx';

//其他代码
//....

const history = syncHistoryWithStore(hashHistory, store);
ReactDom.render( 
    <Provider store={store}>
      <Router routes={routes} history={history}/>
    </Provider>
     , rootEl);

```

#### 增加一个router

在`src/router.jsx`中根path的childRoutes数组中增加一个新的路由对象，参考path为home的路由对象

```
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
```

需要注意，声明childRoutes的path时，只写自己这级的hash就可以了，不需要写父节点的hash。

如`src/home/ctxl`，在home的childRoutes中，只需要把path设置成`ctxl`就可以了。
]
### 2. Smart/Container Components

Redux提出了一种[容器组件和展示组件相分离](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 的开发思想。

Container组件中会使用redux，而它包含的组件仅仅是用来展示的，不需要引用redux，所有数据都通过`props`传入。

请在`src/containers/`目录中定义Container组件。

`src/containers/Main.js`是唯一的主入口Container组件，selector返回的是整个React生态的state，如下：

```
const getState = (state) => {
  return state ;
};

const selectors = createSelector(
  [getState],
  (state) => {
    return  state ;
  }
)
```

通过this.props.chidren来render其他Container组件，如下：

```
render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
}
```

除了唯一的主入口Container组件之外，可以定义多个Container组件，在Container组件创建对应的selector，如下：

```
const getHome = (state) => {
  return state.home;
}
const selectors = createSelector(
  [getHome],
  (home) => {
    return {...home};
  }
)
```

Container组件是Dumb组件的容器，通过`props`把`stores`的数据注入到Dumb组件中，如下：

```
render() {
    return (
     <div>
        Home
        <Home {...this.props}/>
        {this.props.children}
      </div>
    );
}
```

### 3.Dumb/Presentational Components

Dumb组件不能依赖依赖整个React生态的`actions`或者`stores`部分，依靠`this.props`中的数据render。

Dumb组件是可以高度重用的，比如翻页，导航等。antd的大部分组件可以被认为是Dumb组件。

请在`src/components`目录中定义Dumb组件。

Dumb组件相对简单，主要的代码就是从`this.props`中获得数据，在render()中渲染。

```
import React from 'react';
import { Link } from 'react-router';

class Table extends React.Component {
    
    render() {
        const { tableData } = this.props;

        if(!tableData || !tableData.length) {
            return (
                <div>
                    抱歉，无符合查询结果的数据
                </div>
            )
        } else {
            let getTableRows = ()=>{
                let rows = [];
                let tr;
                tableData.forEach( (data, index)=>{
                    tr = <tr key={'tr_' + index}>
                            <td>{index+1}</td>  
                            <td>{data.name}</td> 
                            <td>{data.email}</td> 
                            <td>{data.title}</td> 
                            <td><Link to={data.hash}>{data.hash}</Link></td>
                         </tr>;
                    rows[rows.length] = tr;
                } )
                return rows;
            }
            return (
                <table id="componentsHomeTable">
                    <thead>
                        <tr>
                            <th>
                                序号
                            </th>
                            <th>
                                姓名
                            </th>
                            <th>
                                邮箱
                            </th>
                            <th>
                                职位
                            </th>
                            <th>
                                详情
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getTableRows()}
                    </tbody>
                </table>
            )
        }
    }
}

Table.defaultProps = {};

export default Table;
```
### 4.reducer

请在`src/reducers`中定义reducer。

`src/reducers/index.js`是一个reducer的加载器，会遍历`src/reducers`目录下出index.js之外的所有js文件，并把这些js文件识别为reducer。注意，无法识别文件夹内的js，也就是说reducer需要直接定义在`src/reducers`目录中。

redux会根据reducer的文件名称，在state中创建对应的字段。

如定义了`src/reducers/home.js`，那么这个reducer返回的数据会被填充到`state.home`中。

使用[redux-actions](https://github.com/acdlite/redux-actions)创建reducer，如下：

```
import React from 'react';
import { handleActions } from 'redux-actions';

import { GET_DATA_SUCCEEDED, GET_DATA_FAILED } from '../constants/home';

export default handleActions({
        [GET_DATA_SUCCEEDED](state, action) {
            return {...state, tableData: action.tableData}
        },
        [GET_DATA_FAILED](state, action) {
            alert(action.message);
            return state;
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
        }
    }
)
```

注意，action请定义在对应的常量文件中。需要为reducer定义的state赋默认值。

### 5.如何发异步请求

在`src/common/dataService`对ajax做了封装，暴露了`getJSON(url,data)`方法，返回一个promise对象。

每一个ajax的请求url请定义在`src/constants/URLS.js`中，并为每一个url定义三个redux的action，分别是REQUESTED、SUCCEEDED和FAILED。

如在home模块中获得列表数据的异步请求，首先要在`src/constants`目录下新建`home.js`文件，`home.js`文件内容如下：

```
export const GET_DATA_REQUESTED = 'home/home/GET_DATA_REQUESTED';
export const GET_DATA_SUCCEEDED = 'home/home/GET_DATA_SUCCEEDED';
export const GET_DATA_FAILED = 'home/home/GET_DATA_FAILED';


export default{
    GET_DATA_REQUESTED,
    GET_DATA_SUCCEEDED,
    GET_DATA_FAILED
}
```

`GET_DATA_REQUESTED`代表发送获取列表的异步请求的action，`GET_DATA_SUCCEEDED`代表获取列表的异步请求成功返回的action，`GET_DATA_FAILED`代表获取列表的异步请求失败的action

定义好redux的action之后，当需要发送异步请求时，只需要dispatch相应的redux action即可，如下：

```
query() {
	const { dispatch } = this.props;
	dispatch({
		type: GET_DATA_REQUESTED
	})
}
```

我们已经发出了异步请求的redux action，对于redux action的处理我们使用[redux-saga](https://github.com/yelouafi/redux-saga)来处理

每一个saga请定义在`src/sagas`目录下。

与reducer类似，`src/sagas/index.js`是一个saga的加载器，会遍历`src/sagas`目录下出index.js之外的所有js文件，并把这些js文件识别为saga。注意，无法识别文件夹内的js，也就是说saga需要直接定义在`src/sagas`目录中。

`src/sagas/home.js`中定义了所有home模块的saga。[redux-saga](https://github.com/yelouafi/redux-saga)支持ES7的async/await，这会让我们发送异步请求和处理异步请求的回调时容易很多，如下：

```
import { takeEvery, isCancelError } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { getJSON } from '../common/dataService';

import { GET_DATA_REQUESTED, GET_DATA_SUCCEEDED, GET_DATA_FAILED } from '../constants/home';

import URLS from '../constants/URLS';

function* fetchTableData(action) {
    try {
      const data = yield call(getJSON, URLS.HOME_GET_TABLEDATA_URL, {accountId: action.accountId});
      yield put({type: GET_DATA_SUCCEEDED, tableData:data });
   } catch (e) {

      yield put({type: GET_DATA_FAILED, message: e});
   }
}

function* fetchTableDataSaga() {
  yield* takeEvery( GET_DATA_REQUESTED, fetchTableData );
}

export {
    fetchTableDataSaga
};
```

当异步请求返回后，无论成功失败，都dispatch对应的redux action，把数据传递给reducer。

### 6.mock数据

可以访问两种mock数据源，一种是本地mock数据，一种是远程mock数据。


#### 6.1本地mock数据

通过WebpackDevServer的proxy实现。已经在`cfg/base.js`中定义

```
proxy: {
    '/api/*': {
      target: 'http://localhost:' + defaultSettings.port,
      pathRewrite: function(path, req) {
                return path.replace(/^\/api/, '/testdata')
            },
      onProxyReq: function(proxyReq, req, res) {
          proxyReq.method = 'GET';
          proxyReq.setHeader('Access-Control-Allow-Origin', true);
      },
      bypass: function(req, res, proxyOptions) {
        var noProxy = [
          // '/api/course/courseList.action'
          ];
        if (noProxy.indexOf(req.url) !== -1) {
          console.log('Skipping proxy for browser request.');
          return req.url;
        }
       }
      }
    }
```

本地mock数据保存在`src/testdata`目录下。

当异步请求被发出后，会被proxy拦截，去掉异步请求一级path中的api，根据剩余path，执行`src/testdata`目录中的本地数据。

如我们要为`/api/home/getTableData`请求配置本地mock数据，那么需要在`src/testdata`目录下建立

```
home/
	getTableData //静态文件，json格式
```

这样请求会被转发到`src/testdata/home/getTableData`文件，读取文件内容，并作为响应返回。

#### 6.2远程mock服务

通过WebpackDevServer的proxy实现。已经在`cfg/base.js`中定义

假设远程mock服务的地址是：172.0.0.12:8080

```
proxy: {
    '/api/*': {target: 'http://172.0.0.12:8080'}
    }
```

这样，请求就会被转发到172.0.0.12:8080

### 7.如何开发样式

请在`src/styles`目录放置样式文件。

请在`src/styles/iconfont`目录放置字体文件。

请在`src/styles/less`目录放置less文件，其中的`index.less`是less样式文件的主入口，会在`src/index.js`中被引用。

请在`src/styles/lessindex.less`中import所有自定义的less样式。

### 8.发布

```
npm run dist
```

执行后，对js、less、css、模板、图片等等静态资源编译，编译后，会在`dist`目录下形成编译好的文件，如下：

```
assets-
	index.js
	index.map
	vendor.js
	vendor.map
	index.css
	index.map
	//各种字体文件
images-
	//图片
index.html //spa的页面
```

### 9.其他

#### 9.1代码检查

```
npm run lint
```

### 9.2清除dist

```
npm run clean
```

### 9.3测试

```
npm run test
```

### 10.使用flow

#### 10.1安装flow libdef

```
npm install -g flow-typed
flow-typed install
```

#### 10.2 flow代码检查

```
npm run flowStatus
```