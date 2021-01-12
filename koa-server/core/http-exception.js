
class HttpException extends Error {
  //msg为异常信息, code为HTTP状态码
  constructor(msg='服务器异常',code=400) {
    super()
    this.code = code
    this.msg = msg
  }
}

class Success extends HttpException {
  constructor(data,msg) {
    super()
    this.code = 200
    this.msg = msg || '请求成功'
    this.data = data || {}
  }
}

class ParameterException extends HttpException {
  constructor(msg) {
    super()
    this.code = 400
    this.msg = msg || '参数异常'
  }
}

class DatabaseNotFoundException extends HttpException {
  constructor(msg) {
    super()
    this.code =  404
    this.msg = msg || '数据库找不到相关条目'
  }
}

class Forbidden extends HttpException {
  constructor(msg) {
    super()
    this.code =  403
    this.msg = msg || '禁止访问'
  }
}
  
module.exports = {
  HttpException,
  ParameterException,
  Forbidden,
  Success,
  DatabaseNotFoundException
}
  