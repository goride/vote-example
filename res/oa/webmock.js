var Webmock = require('webmock')
const { mock , app } = Webmock.express({
    port: 7241,
    static: __dirname,
    url: {
        data: {
            pass: {},
            fail: {msg: 'fail message'}
        }
    }
})
