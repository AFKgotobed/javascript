/**
 * 1.原型链继承
 * 面向对象语言都支持两种继承方式：接口继承和实现继承
 * ECMAScript只支持实现继承, 继承主要依靠原型链来实现
 * 原型链基本概念：
    (1)每一个函数都有一个 prototype 属性, 属性值是一个对象, 即原型对象;
    (2)原型对象上都包含一个constructor 属性, 它是一个指针, 指向其 prototype 属性所在的构造函数;
    (3)每个实例上都包含一个指向原型对象的内部指针（[[prototype]]）;
    (4)如果让一个原型对象A等于另一个类型的实例a, 那么这个原型对象A上就会包含一个指向实例a的原型的指针, 实例a的原型上有包含一个指向其构造函数的指针; 
       假如另一个原型又是另一个类型的实例, 那么上述关系依然成立, 如此层层递进, 就构成了实例与原型之间的链条;
 * 原型链的基本模式：让原型对象等于另一个类型的实例
 * 通过原型链实现继承不能使用对象字面量的方式, 其本质上是让原型等于另一个对象, 这样做实际上是重写了原型对象, 它会切断实例与原型之间的联系
 * 缺点：
    (1)子类型在原型上继承了超类型的所有属性, 那么超类型实例中的属性将位于子类型的原型中, 如果超类型实例属性是一个引用类型, 那么该属性将被
       所有子类型的实例所共享（重现原型模式的缺点）
    (2)切断了为超类型传值得可能
 *    
 */

//超类型
function Person() {
  //实例属性
  this.name = "javascript";
  this.age = 24;
  this.friend = ["html", "css"];

  //初始化原型
  if (typeof this.say !== "function") {
    Person.prototype.say = function() {
      return this.name + this.age;
    }
  }
}
//子类型
function Child() {}

//原型链继承
Child.prototype = new Person();

//实例
var p1 = new Child();
console.log(p1.say()); //"javascript24"

//example1：给原型添加新属性和方法一定要放在继承语句之后
Child.prototype.run = function(){
  return "running"
}
//导致上面代码无效
Child.prototype = new Person();

//example2：通过原型链实现继承不能使用对象字面量的方式

//原型链继承
Child.prototype = new Person();

// 导致上面继承语句失效,
Child.prototype = {
  run: function() {
    return "running"
  }
}


/**
 * 2.借用构造函数
 * 通过使用 apply() 和call () 方法可以在（将来）新建的对象上执行构造函数
 * 优点：这种继承方式可以为超类型传递参数
 * 缺点：
    (1)超类型原型上的属性对子类型是不可见的, 换句话说就是：子类型只继承了超类型的实例中的属性,而定义在超类型原型上的属性对子类型是获取不到的
    (2)
 */

//超类型
function Person(name, age) {
  //实例属性
  this.name = name;
  this.age = age;
  this.friend = ["html", "css"];

  //初始化原型
  if (typeof this.say !== "function") {
    Person.prototype.say = function() {
      return this.name + this.age;
    }
  }
}

//子类型
function Child(name, age, run) {
  //借用构造函数实现继承
  Person.call(this, name, age);
  this.run = run
  //Person.apply(this, "javascript", 24);
}

//实例
var p1 = new Child("javascript", 24, "running");

console.log(p1.name); //"javascript"
console.log(p1.age);  //24

console.log(p1.say()); //p1.say is not function

/**
 * 3.组合继承
 * 将原型链继承与借用构造函数技术结合到一起使用
 * 基本思路就是：原型链用于继承超类型的原型上的属性和方法;借用构造函数用于继承超类型实例中的属性
 * 优点：保证了每个实例都有独有的属性和在原型上共享的属性方法; 避免了原型链和借用构造函数的缺陷, 融合了它们的优点
 * 缺点：无论何时, 超类型都会被调用两次
 */

//超类型
function Person(name, age) {
  //实例属性
  this.name = name;
  this.age = age;
  this.friend = ["html", "css"];

  //初始化原型
  if (typeof this.say !== "function") {
    Person.prototype.say = function() {
      return this.name + this.age;
    }
  }
}

function Child(name, age) {
  //实例中属性继承
  Person.call(this, name, age); //第二次调用构造函数
}

//原型上属性继承
Child.prototype = new Person(); //第一次调用构造函数

var p1 = new Child("javascript", 24);
var p2 = new Child("sin", 20);

console.log(p1.name === p2.name); //false
console.log(p1.age === p2.age);   //false
console.log(p1.friend === p2.friend); //false
console.log(p1.say === p2.say); //true
console.log(p1.say() === p2.say()); //false