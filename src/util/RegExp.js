/**
 * Created by yunrui001 on 2018-05-15.
 */


export default{
  phoneRegexp: /^1[0-9]{10}$/,
  emailRegexp: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  idcardRegExp: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  // 注册密码校验  考虑到老用户登录问题与登录密码校验规则不一样
  registerPassword: /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%\\\\_()\-+=^&*|{}";:',\\/<>?@.]{8,}$/,
  loginPassword: /(?!^(?:[\d]+)$)(?!^(?:[^a-zA-Z]+)$)^\S{8,}$/,
  Password: /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%\\\\_()\-+=^&*|{}";:',\\/<>?@.]{6,23}$/,
}
