const CODE = {
    'SUCCESS': 0,
    'FAIL': -1,
    'ERROR': -2,
    /** 输出参数错误 */
    'PARAM_ERROR': -3,
    'FILE_EMPTY': -10,
    'ERROR_PATH': -11,

    /** 未登录 */
    'NOT_LOGIN': -100,
    /** 用户已存在 */
    'USER_NAME_EXIST': -101,
    /** 用户名或者密码错误 */
    'USER_NAME_OR_PASSWORD_ERROR': -102,
    /** 注册失败 */
    'REGISTER_FAIL': -103,
    /** 登录安全错误 */
    'LOGIN_SAFETY_ERROR': -104,

    /** 平台登录失败 */
    'PLATFORM_LOGIN_FAIL': -120,
    /** 平台账号已存在 */
    'PLATFORM_USER_EXIST': -121,

    /** 游客登录失败 */
    'GUEST_LOGIN_FAIL': -130,
    /** 游客账号信息已存在 */
    'GUEST_USER_EXIST': -131,

    /** 404 */
    'NOT_FOUND': -404,

    Info(code) {
        const keys = Object.keys(CODE);
        for (let i = 0; i < keys.length; i++) {
            if (CODE[keys[i]] === code) {
                //return keys[i];
                return keys[i].toLowerCase().replace(/_/g, ' ');
            }
        }
        return 'unknown';
    }
};

module.exports = CODE;