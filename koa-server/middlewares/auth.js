const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');

class Auth {
    constructor() {
        Auth.USER = 8;
        Auth.ADMIN = 16;
    }
    get m() {
        return async (ctx, next) => {
            const userToken = basicAuth(ctx.req);
            console.log(userToken,ctx.req)
        }
    } 
}
module.exports = Auth