const requireDirectory = require('require-directory');
const Router = require('koa-router'); 
const catchError = require('../middlewares/exception');
const bodyparser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
const { HttpException } = require('./http-exception')
class InitManager {
    static initCore(app){
        InitManager.app = app
        // 捕捉异常
        InitManager.initCatchError()
        // 初始化全局属性
        InitManager.loadConfig()
        InitManager.loadHttpException()
        // 处理跨域
        // InitManager.initCors()

        // 接口拦截器
        InitManager.routerFilter()

        // 初始化路由
        InitManager.initLocalRouters()
        
    }

    static routerFilter(){
        InitManager.app.use(async(ctx,next)=>{
            const whiteListUrl = {
                GET: [],
                POST: [
                  '/index/login',
                ]
            }
            const hasOneOf = (str, arr) => arr.some(item => item.includes(str))
            let method = ctx.request.method
            let path = ctx.request.path
            let token = ctx.request.headers.authorization
            if(whiteListUrl[method] && hasOneOf(path, whiteListUrl[method])) await next()
            else if (!token) {
                throw new global.errs.HttpException('no token')
            } else {
                try {
                    var decode = jwt.verify(token, 'abcd') 
                } catch (error) {
                    throw new global.errs.Forbidden('口令无效')
                }
                ctx.state.role = decode.role
                ctx.state.username = decode.username  
            }
            
            await next()
        })
    }

    static initCors(){
        InitManager.app.use(async (ctx, next)=> {
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
            ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
            if (ctx.method == 'OPTIONS') {
              ctx.body = 200; 
            } else {
              await next();
            }
        });
    }

    static initLocalRouters(){
        //module为固定参数，'./api'为路由文件所在的路径(支持嵌套目录下的文件)，第三个参数中的visit为回调函数
        //注意这里的路径是依赖于当前文件所在位置的
        //最好写成绝对路径
        InitManager.app.use(bodyparser())
        const apiDirectory = `${process.cwd()}/app/api`
        const modules = requireDirectory(module,apiDirectory, {
            visit: whenLoadModule
        });
        function whenLoadModule(obj) {
            if(obj instanceof Router) {
                InitManager.app.use(obj.routes());
            }
        }
    }

    // 注册异常处理
    static initCatchError() { InitManager.app.use(catchError) }

    // 现在通过全局的global变量中就可以取到当前的环境啦
    static loadConfig() {
        const configPath = process.cwd() + '/config/config.js';
        const config = require(configPath);
        global.config = config;
    }
    
    static loadHttpException() {
        const errors = require('./http-exception');
        global.errs = errors;
    }
    
}

module.exports = InitManager;