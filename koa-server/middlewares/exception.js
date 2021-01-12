const { HttpException } = require("../core/http-exception")

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        let isDev = global.config.environment === 'dev'
        let isHttpException = error instanceof HttpException
        if (isDev && !isHttpException) throw error

        if (error.code == 200) {
            ctx.body = {
                request: `${ctx.method} ${ctx.path}`,
                msg: error.msg,
                data: error.data,
                code: error.code
            }
        } else if (error.code == 500) {
            // 未知错误
            ctx.body = {
                request: `${ctx.method} ${ctx.path}`,
                msg: 'we make a mistake',
                code: error.code
            }
            ctx.status = 500
        } else {
            ctx.body = {
                request: `${ctx.method} ${ctx.path}`,
                msg: error.msg,
                code: error.code       
            }
            // ctx.status = error.code
        }
    }
}

module.exports = catchError;