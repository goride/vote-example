const oa = {}
const queryString = require('query-string');
const Mock = require('mockjs')
oa.TreeStore = require('tree-store')
oa.Random = Mock.Random
oa.mock = Mock.mock
oa.day = require('dayjs')
oa.merge = function (...arg) {
  return require('safe-extend').apply(this, [true].concat(arg))
}
const TypeJSON = require('typejson').default
oa.tjson = new TypeJSON()
oa.json = JSON.stringify
oa.query = function (key) {
  let queryMap = queryString.parse(location.search)
  return queryMap[key]
}
oa.res = function res (res, fnMap) {
  const self = this
  if (typeof fnMap === 'function') {
    fnMap = {
      pass: fnMap
    }
  }
  fnMap.fail = fnMap.fail || function () {
    ELEMENT.Message({
      type: 'error',
      message: message
    });
  }
  fnMap[res.type](res)
}
oa.req = function (command, data) {
  const self = this
  let commandList = command.split(':')
  let request = {
    type: commandList[0],
    url: commandList[1] || location.pathname,
  }
  let sendData = data
  let loadingMask = oa.vm.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
  });
  if(request.type == 'POST'){
      sendData = JSON.stringify(sendData)
  }
  $.ajax({
    type: request.type,
    url: request.url,
    dataType: 'json',
    data: sendData,
    contentType: "application/json; charset=utf-8",
  }).done(function (res) {
    if (res.type === 'pass') {
      let message = '成功'
      res.data = res.data || {}
      if (res.data.redirect) {
        message = `${message} （跳转至： ${res.data.redirect}）`
        setTimeout(function () {
          if (res.data.redirect === 'refresh') {
            location.href = location.href
          }
          else {
            location.href = res.data.redirect
          }
        }, 1000)
      }
      oa.vm.$message({
        type: 'success',
        message: message
      });
    }
    else {
      oa.vm.$message({
        type: 'error',
        message: res.msg
      });
    }
  }).fail(function (res) {
    let content = Object.assign({}, res)
    delete content.responseText
    oa.vm.$alert(`<pre style="overflow:auto;" ><code>${JSON.stringify(content,null, 2)}</code></pre>${res.responseText}`, '网络错误', {
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true
    });
  }).always(function () {
    loadingMask.close()
  })
}
oa.href = function (pathname){
    setTimeout(function(){
      location.pathname = pathname
    },0)
}
oa.search = function (props){
    const self = this

    switch(typeof props){
        case 'object': // 搜索
            let $event = props
            $event.target.submit()
        break
        case 'number':case 'string': // 翻页
            // 修改location.search中page
            let page = props
            let queryMap = queryString.parse(location.search)
                queryMap.page = page
            location.search = queryString.stringify(queryMap)
        break
    }

}
window.oa = oa
window.onload=function(){
    // 定时是因为要等待 vue 加载完成
    setTimeout(function () {
      ;(function () {
        var defaultOptions = {
          el: '#app',
          methods: {
            oaSearch: oa.search,
            oaQuery: oa.query,
            oaReq: oa.req,
            oaDay: oa.day,
            oaJson: oa.json,
            oaHref: oa.href,
        }
      }
        oa.vm = new Vue($.extend(true, defaultOptions, vue))
        document.getElementById('app').style.display = 'block'
      })();
    }, 100)
}
