/**
 * Created by yunrui001 on 2018-05-25.
 */
// Object.assign 方法用于将源对象（source）中可枚举属性复制（只是浅克隆）到目标对象（target）返回值为target

var target = {}
var source1 = {
    key1: 'hello'
}
var source2 = {
    key2: 'javascript'
}
var source3 = {
    key3: {
        hello: 'world'
    }
}

console.log(Object.assign(target, source1, source2, source3) === target)
source3.key3.hello = '世界'
console.log(target)

// 原型继承 修改构造函数的原型对象时，所有被构造出来的对象都会受到影响。因为所有构造函数的原型链都是指向同一个对象

function O() {
    this.name = 'abc'
}

O.prototype = {
    hello: 'javascript'
}

var o = new O()
var o1 = new O()
o1.hello = 'java'
console.log(o)
console.log(o1)

// 当使用了getter或setter方法，不允许使用writable和value这两个属性

var obj = {}
Object.defineProperty(obj, 'hello', {
    configurable: true,
    enumerable: true,
    /* value: 'javascript',
     writable: true,*/
    get: function () {
        console.log('监听到了取值')
        console.log(this)
    },
    set: function (value) {

    }
})
obj.hello