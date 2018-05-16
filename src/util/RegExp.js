/**
 * Created by yunrui001 on 2018-05-15.
 */


export default{
  phoneRegexp: /^1[0-9]{10}$/,
  emailRegexp: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  // 注册密码校验  考虑到老用户登录问题与登录密码校验规则不一样
  registerPassword: /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%\\\\_()\-+=^&*|{}";:',\\/<>?@.]{8,}$/,
  loginPassword: /(?!^(?:[\d]+)$)(?!^(?:[^a-zA-Z]+)$)^\S{8,}$/
}
