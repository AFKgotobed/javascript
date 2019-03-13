/**
 * 数组对象的方法：
 * 1.检测对象是否是一个数组对象：
 * 可以使用 instanceof 操作符
 * ECMAScript 提供一个 Array.isArray(obj) 方法
 */

var arr = []
console.log(arr instanceof Array) //true
console.log(Array.isArray(arr))   //true

/**
 * 2.继承 Object 而来的方法
 * toString() //返回一个由每个数组项的字符串形式拼接起来的字符串, 以逗号分隔; 实际上会调用每个数组项的 toString() 方法
 * valueOf() //与toString() 方法返回一样
 * toLocaleString() //通常与 toString() 方法返回一样; 实际上会调用每个数组项的 toLocaleString() 方法, 如果数组项没有 toLocaleString()方法, 
                      那么它就调用 toString() 方法
 */
var arr1 = ["red", "green", "blue"]
console.log(arr1.toString())       //"red" + "," + "green" + "," + "blue" => "red,green,blue"
console.log(arr1.valueOf())        //"red,green,blue"
console.log(arr1.toLocaleString()) //"red,green,blue"

var obj1 = {
  toString: function() {
    return 'red'
  }
}
var obj2 = {
  toString: function() {
    return 'green'
  },
  toLocaleString: function() {
    return 'gray'
  }
}

var arr2 = [obj1, obj2]
console.log(arr2.toLocaleString()) //"red,gray"
