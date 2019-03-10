/**
 * 1.工厂模式
 * 优点：解决了使用同一接口创建多个对象, 从而产生大量重复代码的问题
 * 缺点：无法识别区分对象的具体类型（都是通过函数内部 Object 类型创建的）
 */

function person(name, age) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.friends = ['html', 'css'];
  o.say = function() {
    return this.name + this.age;
  };
  return o;
}

var p1 = person("javascript", 24);
var p2 = person("sin", 20);

/**
 * 2.构造函数模式
 * 构造函数本身也只是一个普通的函数, 若在全局作用域中调用, 函数内部的 this 指向window
 * 优点：用来创建特定类型的对象（原生构造函数, 如：Object、Function等, 在运行时会自动出现在执行环境中）
 * 缺点：不同实例上的同名函数不相等
 *
 */

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.friends = ['html', 'css'];
  this.say = function() {
    return this.name + this.age;
  };
}

var p1 = new Person("javascript", 24);
var p2 = new Person("sin", 20);

//缺点：
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.friends = ['html', 'css'];
  this.say = new Function() //不同实例上会创建新的 Function 实例
}

var p1 = new Person("javascript", 24);
var p2 = new Person("sin", 20);

console.log(p1.say === p2.say); //false

/**
 * 3.原型模式
 * 每个函数都有一个 prototype 属性, 属性值是一个对象（即：原型对象）
 * 优点：原型对象可以让所有实例对象共享它所包含的属性和方法
 * 缺点：(1)忽略构造函数传递初始化参数这一环节; (2)原型属性值是一个引用类型值;
 */
function Person() {}
Person.prototype.name = "javascript";
Person.prototype.age = 24;
Person.prototype.friends = ["html", "css"];
Person.prototype.say = function(){
  return this.name + this.age;
};

var p1 = new Person();
var p2 = new Person();

//缺点：
function Person() {}
Person.prototype.name = "javascript";
Person.prototype.age = 24;
Person.prototype.friends = ["html", "css"];
Person.prototype.say = function(){
  return this.name + this.age;
};

var p1 = new Person();
var p2 = new Person();

p1.push("html5");

//在p1上修改的数据会反映在p2上
console.log(p2.frineds); //["html", "css", "html5"]

/**
 * 4.构造 + 原型的组合模式
 * 这种模式只是一种设计思路, 即：构造函数用于定义实例属性; 原型模式用于定义方法和共享的属性
 * 优点：既可以为构造函数传值, 实现函数的复用; 又可以保证每个实例对象拥有属于自己的属性和所有实例共享的属性和方法
 * 缺点：没有封装性
 */

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.friends = ['html', 'css'];
}

Person.prototype.say = function(){
  return this.name + this.age;
};

var p1 = new Person("javascript", 24);
var p2 = new Person("sin", 20);

/**
 * 5.动态原型（最优方案）
 * 这种模式是对构造 + 原型模式的进一步优化, 即将原型对象封装进构造函数中
 * 它通过检查某个应该存在的方法是否有效, 来决定是否初始化原型
 * if语句只需检查一个方法是否存在即可
 * 不能使用对象字面量的方式初始化原型
 */

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.friends = ['html', 'css'];
  //仅当 say() 方法不存在时, 初始化原型
  if (typeof this.say !== "function") { 
    Person.prototype.say = function() {
      return this.name + this.age;
    }
  }
}

var p1 = new Person("javascript", 24);
var p2 = new Person("sin", 20);
