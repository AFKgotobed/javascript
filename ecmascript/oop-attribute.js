/**
 * 面向对象程序设计（Object Oriented Programming）;
 * ECMA-262对象定义：无序属性的集合,其属性值可以包含基本类型值和对象（数组或函数）;
 * 每个对象都是基于一个引用类型创建的, 这个引用类型可以是原生类型（Object、Array、Function、Date 和 RegExp）, 也可以是开发者自定义类型;
 * 对象特性：可自由扩展属性;
 * 对象的属性类型：
    * ECMA-262定义属性的内部特性（attribute）, 描述了属性的各种特征;
    * 内部特性是为了实现 javascript 引擎用的, 因此在不能直接访问它们;
    * 为了表示特性是内部值, 通常将它们放在双括号中, 如：[[Enumerable]];
    * ECMAScript 中有两种属性：数据属性和访问器属性;
 * 
*/

////////// 一、数据属性 //////////

/* 1.数据属性
 * 它包含一个数据值的位置, 这个位置可以读取或写入值
 * 它有四个描述其行为的特性：
    * [[Configurable]]: 表示能否通过 delete 删除属性从而重新定义属性; 能否修改属性的特性或者能否把属性修改为访问器属性; 默认值为 true;
    * [[Enumerable]]: 表示能否通过 for-in 循环返回属性; 默认值为 true;
    * [[Writable]]: 表示能否修改属性的值; 默认值为 ture;
    * [[Value]]: 表示属性的数据值; 读取属性时, 从此位置读取, 写入数据值时, 把新值保存在这个位置; 默认值为 undefined;
 * 
*/
var person = {
  name: 'javascript'
};

/* 2.修改属性的特性
 * ECMAScript5 提供一个 Object.defineProperty() 方法用于修改属性特性, 它接收三个参数：
 * @param { Object } person 需要修改的对象
 * @param { String } name 需要修改的对象属性
 * @param { Object } 描述符对象
 * 若对象本身未定义某个属性而调用 Object.defineProperty() 时, 会为该对象添加这个属性, 若不指定 configurable、enumerable 和 writable 特性的值, 其默认值都是 false;
 * 若对象本身已经定义某个属性而调用 Object.defineProperty() 时, 则用于修改这个属性的特性, 若不指定 configurable、enumerable 和 writable 特性的值, 其默认值均为 true;
 */
Object.defineProperty(person, "name", {
  //configurable: true,
  //enumerable: true,
  //writable: true,
  value: "script"
});
person.name //script

////////// 二、访问器属性 //////////

/* 1.访问器属性
 * 它包含一对 getter 和 setter 函数; 读取访问器属性时调用 getter 函数, 它返回有效值; 写入访问器属性时调用 setter 函数并传入新值, 它决定如何去处理数据;
 * 它也有四个描述其行为的特性：
    * [[Configurable]]: 表示能否通过 delete 删除属性从而重新定义属性; 能否修改属性的特性或者能否把属性修改为访问器属性; 默认值为 true;
    * [[Enumerable]]: 表示能否通过 for-in 循环返回属性; 默认值为 true;
    * [[Get]]: 表示读取属性时调用的函数; 默认值为 undefined;
    * [[Set]]: 表示写入属性时调用的函数; 默认值为 undefined;
 * 访问器不能直接定义, 必须使用 Object.defineProperty() 方法来定义;
*/

var person = {};
Object.defineProperty(person, "year", {
  get: function() {
    return 2019;
  },
  set: function(value) {
    //...
  }
});
person.year = 2000;

/* 2.创建访问器属性还可以使用两个非标准的方法
 * __defineGetter__() 方法;
 * __defineSetter()__ 方法;
*/
var person = {};
person.__defineGetter__("year", function(){
  return 2019;
});
person.__defineSetter__("year", function(value){
   //...
});
person.year = 2000;

////////// 三、同时定义多个属性 //////////
/* 
 * ECMAScript5 提供一个 Object.defineProperties() 方法用于同时定义多个属性, 它接收两个参数：
 * @param { Object } person 需要定义属性的对象
 * @param { Object } 对象属性值以描述符对象的形式出现
*/
var person = {};
Object.defineProperties(person, {
  //数据属性
  name: {
    writable: true, 
    value: "javascript"
  },
  //访问器属性
  year: {
    get: function() {
      return this.name;
    },
    set: function(value) {
      //...
    }
  }
});

////////// 四、获取属性的特性 //////////
/*
 * ECMAScript5 提供一个 Object.getOwnPropertyDescriptor() 方法用于获取给定属性的描述符（也就是属性的特性）, 它接收两个参数：
 * @param { Object } person 该对象可以是 javascript 中的任何对象;
 * @param { String } 需要获取目标对象描述符的属性名;
 * @return object 若是数据属性, 则这个对象有 configurable、enumerable、writable 和 value; 若是访问器属性, 则这个对象有 configurable、enumerable、get 和 set;
 */
var person = {};
Object.defineProperties(person, {
  //数据属性
  name: {
    writable: true, 
    value: "javascript"
  },
  //访问器属性
  year: {
    get: function() {
      return this.name;
    }
  }
});

var myName = Object.getOwnPropertyDescriptor(person, "name");
myName.configurable //false
myName.enumerable   //false
myName.writable     //true
myName.value        //javascript

var year = Object.getOwnPropertyDescriptor(person, "year");
year.configurable //false
year.enumerable   //false
year.get          //function get()
year.set          //undefined



