/**
 * Created by yunrui001 on 2018-05-25.
 */
class Observer {
  constructor(value) {
    this.value = value
    Object.defineProperty(value, '__observer__', this)
    this.walk(value)
  }

  walk(value) {
    let keys = Object.keys(value)
    for (let i = 0; i < keys.length; i++) {
      console.log(value, keys[i], value[keys[i]])
      defineReactive(value, keys[i], value[keys[i]])
    }
  }
}
// 利用了闭包，防止无限set循环
function defineReactive(obj, key, value) {
  let des = Object.getOwnPropertyDescriptor(obj, key)
  if (des && des.configurable == false) {
    return
  }
  const get = des && des.get
  const set = des && des.set
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    set: function (val) {
      console.log('set')
      set ? set.call(obj, val) : value = val
    },
    get: function () {
      console.log('get')
      const val = get ? get.call(obj) : value
      return val
    }
  })
}

