
import global from './global';
 import moment from 'moment';

var util = {

  formatDate(date){

  },

 deepCopy(data){
     return JSON.parse(JSON.stringify(data));
 },

 dispatchAsync(action){
     setTimeout(()=>{
        global.store.dispatch(action);
      }, 0);
 },

 isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
 },
 /**
  * 获取URL参数
  * @return {Object} {key:value}
  */
  getURLParams() {
   function parseParams(str) {
     var rs = {};
     var i = str.indexOf('?')
     if (i >= 0) {
       str = str.substr(i + 1);
       var params = str.split('&');
       params.forEach(function (s) {
         var p = s.split('=');
         if (p.length >= 2) {
           rs[p[0]] = p[1];
         }
       });
     }
     return rs;
   }

   return Object.assign({}, parseParams(location.search), parseParams(location.hash));
 },

 addContextUrl(url){
   var contextPath = location.pathname.replace('/index.html', '');
   return contextPath + url;
 },



  /**
   * 转换日期，eg:2016-6-18 20:00
   * @param {Date}
   * @return {String}
   */
  formatDateTime(time){
    return moment(time).format('YYYY-MM-DD H:mm');
  },
    /**
   * 转换日期，eg:6.18
   * @param {Date}
   * @return {String}
   */
  formatDate(time){
    return moment(time).format('M.D');
  },
    /**
   * 转换时间24小时制，eg:20:30
   * @param {Date}
   * @return {String}
   */
  formatTime(time){
    return moment(time).format('H:mm');
  },

/**
 * 解析时间，按东八区解析
 * @str {String|Number}
 * @return {Date}
 */
  parseDate(str){
    if(!str){
      return new Date();
    }
    if(typeof str == 'number'){
      return new Date(str);
    }
    //东八区时间
    if(typeof str == 'string' && str.indexOf('+08') < 0){
      str = str + '+08:00';
    }
    return new Date(str);
  },
  /**
   * 马赛克字符串中指定位置的字符
   * @str {String|Number} 字符串
   * @start {Number} 开始打码的位置索引，从0开始计算，如果不填则默认从第一个开始打码
   * @end {Number} 结束打码的位置索引，从0开始计算，如果不填则默认打码到最后一个
   * @wildchar {String} 马赛克通配符
   * @count {Number} 替换马赛克的个数，如果不填则根据start和end之间的字符个数替换
   * @return {newStr} 打码后的字符串
   */
  mosaicStr(str = '', start = 0, end, wildchar = '*', count) {
    const reg = new RegExp('^(.{' + start + '})(.*)(.{' + (typeof end == 'undefined' ? 0 : (str.length - end - 1)) + '})$', 'g');
    let newStr = str.replace(reg, (match, p1, p2, p3) => {
      return p1 + new Array(p2.length + 1).join(wildchar) + p3
    });
    return newStr
  }

}

window.mosaicStr = util.mosaicStr

export default util;
