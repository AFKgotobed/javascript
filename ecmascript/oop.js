/**
 * 1.面向对象程序设计（Object Oriented Programming）
 * ECMA-262对象定义：无序属性的集合,其属性值可以包含基本类型值和对象（数组或函数） 
 * 每个对象都是基于一个引用类型创建的,引用类型可以是原生类型（Object、Array、Function、Date 和 RegExp）, 也可以是开发者自定义类型
 */

var person = {
  name: 'javascript',
  age: 24,
  friends: ['html', 'css'],
  say: function() {
    console.log(this.name + this.age)
  }
};

/**
 * 2.属性类型
 * ECMA-262定义属性的内部特性（attribute）, 描述了属性的各种特征
 * 内部特性是为了实现 javascript 引擎用的, 因此在不能直接访问它们
 * 为了表示特性是内部值, 通常将它们放在双括号中, 如：[[Enumerable]]
 * ECMAScript中有两种属性：数据属性和访问器属性
 */

/**
 * 3.数据属性
 * 它包含一个数据值的位置, 这个位置可以读取或写入值
 * 它有四个描述其行为的特性：
 * [[Configurable]]: 表示能否通过 delete 删除属性从而重新定义属性; 能否修改属性的特性或者能否把属性修改为访问器属性; 默认值为 true
 * [[Enumerable]]: 表示能否通过 for-in 循环返回属性; 默认值为 true
 * [[Writable]]: 表示能否修改属性的值; 默认值为 ture
 * [[Value]]: 表示属性的数据值; 读取属性时, 从此位置读取, 写入数据值时, 把新值保存在这个位置; 默认值为 undefined
 */
var person = {
  //configurable: true,
  //enumerable: true,
  //writable: true,
  name: 'javascript'
};

/**
 * 4.修改属性特性
 * ECMAScript5提供一个 Object.defineProperty() 方法用于修改属性特性, 它接收三个参数：
 * @param { Object } person 需要修改的对象
 * @param { String } name 需要修改的对象属性
 * @param { Object } 描述符对象
 * 在调用 Object.defineProperty() 方法为对象创建一个新属性时, 如果不指定 configurable、enumerable 和 writable 特性的值, 其默认值都是false, 
   若调用 Object.defineProperty() 方法只是修改已定义的属性的特性, 则均为true
 */
var person = {
  name: 'javascript'
};

Object.defineProperty(person, "name", {
  //configurable: true,
  //enumerable: true,
  //writable: true,
  value: "script"
});

/**
 * 5.访问器属性
 * 它包含一对 getter 和 setter 函数; 读取访问器属性时调用 getter 函数, 它返回有效值; 写入访问器属性时调用 setter 函数并传入新值, 它决定如何去处理数据
 * 它也有四个描述其行为的特性：
 * [[Configurable]]: 表示能否通过 delete 删除属性从而重新定义属性; 能否修改属性的特性或者能否把属性修改为访问器属性; 默认值为 true
 * [[Enumerable]]: 表示能否通过 for-in 循环返回属性; 默认值为 true
 * [[Get]]: 表示读取属性时调用的函数; 默认值为 undefined
 * [[Set]]: 表示写入属性时调用的函数; 默认值为 undefined
 * 访问器不能直接定义, 必须使用 Object.defineProperty() 方法来定义
 * 创建访问器属性还可以使用两个非标准的方法： __defineGetter__() 和 __defineSetter()__
 */

//example1：
var person = {};

Object.defineProperty(person, "year", {
  get: function() {
    return
  },
  set: function(value) {
    //...
  }
});

person.year = 2019;

//example2：
var person = {};

person.__defineGetter__("year", function(){
  return
});

person.__defineSetter__("year", function(value){

});

person.year = 2019;

/**
 * 6.同时定义多个属性
 * ECMAScript5提供一个 Object.defineProperties() 方法用于同时定义多个属性, 它接收两个参数：
 * @param { Object } person 需要定义属性的对象
 * @param { Object } 对象属性值以描述符对象的形式出现
 */

var person = {};

Object.defineProperty(person, {
  name: {
    writable: true, 
    value: "javascript"
  },
  age: {
    writable: true,
    value: 24
  },
  year: {
    get: function() {
      return this.name;
    },
    set: function(value) {
      //...
    }
  }
});

/*
 * 7.读取属性的特性
 * ECMAScript5提供一个 Object.getOwnPropertyDescriptor() 方法用于用于获取给定属性的描述符（属性的特性）, 它接收两个参数：
 * @param { Object } person 该对象可以是 javascript 中的任何对象
 * @param { String } 需要读取目标对象描述符的属性名
 */
var person = {};

Object.defineProperties(person, {
  name: {
    writable: true,
    value: "javascript"
  },
  year: {
    get: function() {
      return this.name;
    }
  }
});

var name = Object.getOwnPropertyDescriptor(person, "name");
var year = Object.getOwnPropertyDescriptor(person, "year");

console.log(name.configurable); //false
console.log(name.enumerable);   //false
console.log(name.writable);     //true
console.log(name.value);        //javascript

console.log(year.configurable); //false
console.log(year.enumerable);   //false
console.log(year.get);          //function
console.log(year.set);          //undefined