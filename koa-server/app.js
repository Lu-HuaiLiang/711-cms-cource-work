const Koa = require('koa');
const app = new Koa(); 
require('module-alias/register'); // 别名插件@

const InitManager = require('./core/init');
InitManager.initCore(app);

app.listen(8082)