/**
 * 1.原型对象
 * 所有的函数都有一个 prototype（原型） 属性, 其属性值是一个对象, 即原型对象
 * 每个原型对象都会自动获取一个 constructor（构造函数）属性, 属性值是一个指向 prototype 属性所在构造函数的指针
 * 所有对象都有一个 内部的 [[prototype]] 属性, 属性值是一个指向其构造函数的原型对象
 * 主流浏览器都支持一个 __proto__ 属性, 该属性可以用于替代访问 [[prototype]] 内部属性
 * ECMAScript5中提供一个 Object.getPrototypeOf() 方法, 它返回 [[prototype]] 属性值
 */

function Person() {}
var p = new Person();

Person.prototype // 指向原型对象
Person.prototype.constructor   //指向构造函数 Person
Function.prototype.constructor //指向构造函数 Function
Object.prototype.constructor   //指向构造函数 Object


console.log(p.__proto__ === Person.prototype)  //true
console.log(Person.__proto__ === Function.prototype) //true
console.log(Person.prototype.__proto__ === Object.prototype) //true
console.log(Function.prototype.__proto__ === Object.prototype) //true

console.log(Object.getPrototypeOf(p) === Person.prototype); //true
console.log(Object.getPrototypeOf(Person) === Function.prototype); //true
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype);   //true

/**
 * 2.原型对象机制
 * 向上搜索机制：当需要读取对象的某个属性时, 首先会从实例属性中搜索, 若没找到, 则继续搜索指针指向的原型对象
 * 同名属性覆盖机制：若实例属性中与原型对象上有同名的属性, 则原型上的属性将被屏蔽阻止访问;
   若使用 delete 删除该实例属性后, 又可以重新访问原型上的属性
 */

/**
 * 3.检测属性是实例中的属性还是原型上的属性
 * 使用 in 操作符, 无论是实例中的还是原型上的, 只要存在都返回true
 * 使用 hasOwnProperty() 方法, 只有是实例中的属性才返回true
 * 综合使用详见：/lib/function
 */

 /**
 * 4.对象属性的可枚举性
 * 对象属性的 [[enumerable]] 特性决定了属性的可枚举性
 * 使用 for-in 操作符, 可遍历对象所有属性, 它返回对象所有可枚举的属性（无论是实例中的还是原型上的）
 * 使用 Object.keys() 方法, 可遍历对象所有属性, 它返回一个包含由所有可枚举属性构成的字符串数组
 * 使用 Object.getOwnPropertyNames() 同 Object.keys() 方法一样
 */

 /**
 * 5.如何确定对象与原型对象之间是否存在这种关系
 * 使用 isPrototypeOf() 方法, 若返回值为true, 则表示存在
 */

console.log(Person.prototype.isPrototypeOf(p)); //true
console.log(Function.prototype.isPrototypeOf(Person)); //true
console.log(Object.prototype.isPrototypeOf(Person.prototype));   //true
console.log(Object.prototype.isPrototypeOf(Function.prototype)); //true

/**
 * 6.原型字面量
 * 原型字面量的本质是：将原型对象等于另一个对象
 * 导致的问题：constructor 指针指向问题
 */
function Person() {}

Person.prototype = {
  say: function() {}
};

console.log(Person.prototype.constructor === Person) //false

/**
 * 7.原型动态性
 * 在实例对象中读取某个属性是一次搜索的过程, 在原型对象上所做的所有修改都可以立即映射到实例中, 
   因此, 即使先创建实例后修改原型, 依然可以正确的读取属性数据
 */

function Person() {}

var p = new Person();

Person.prototype = {
  constructor: "Person",
  say: function() {}
};

console.log(p.say())