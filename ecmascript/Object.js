/**
 * 引用类型：Object 类型;
 * 引用类型是一种数据结构, 用于将数据和功能组织到一起, 称作"类";
 * ECMAScript 中原生引用类型包括：Object、Array、Function、Date、RegExp 等;
 * 引用类型的值（对象）是某个特定引用类型的一个实例;
 * 创建一个对象, 最简单的方式就是：使用 new 操作符 + （Object）构造函数;
 */

// 1.大部分对象都是 Object 类型的一个实例, 每个对象都具有自由扩展属性的特性;
var person = new Object();
person.name = "javascript";
person.age = 24;

// 2.对象字面量：这种方式不会调用 Object 构造函数;
var person = {
  name: "javascript",
  age: 24
}

// 3.对象属性可以使用字符串的形式; 读取属性时, 属性以字符串的形式放在大括号中;
var person = {
  "first-name": "javascript",
  "age": 24
}
console.log(person["first-name"])

////////////////////////////// Object 对象的内置方法 //////////////////////////////

/* 1.检测方法
 * typeof 操作符;
 * Array.isArray() 方法;
 */

var obj = {};
console.log(typeof obj) //object
