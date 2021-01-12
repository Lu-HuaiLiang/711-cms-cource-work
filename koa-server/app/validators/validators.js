const { LinValidator, Rule } = require('../../core/validator')
const Administrators = require('../models/administrators')

class RegisterValidator extends LinValidator {
    constructor(){
        super()
    }
    // 函数名一定是 validate- 
    // 这也是只有看了源码才知道！
    async validateUsername(v) {
        const username = v.body.username
        // 从源码可以看出函数执行的时候，是没有别名替换的
        // 最好是字段一致
        const administrator = await Administrators.findOne({
            where: { username }
        })
        // console.log(administrator)
        if (administrator) throw new Error('用户名存在')
    }
}

module.exports = {
    RegisterValidator
}