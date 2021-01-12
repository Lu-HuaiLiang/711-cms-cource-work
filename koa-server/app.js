const Koa = require('koa');
const app = new Koa(); 
require('module-alias/register'); // 别名插件@
const InitManager = require('./core/init');
const Administrators = require('../koa-server/app/models/administrators')

InitManager.initCore(app);

app.listen(8082)

Administrators.create({
    username: 'Tom',
    password: '123',
    role: '1',
    phone: '18923585423'
})

