/**
 * 1.原型链继承
 * 面向对象语言都支持两种继承方式：接口继承和实现继承
 * ECMAScript只支持实现继承, 继承主要依靠原型链来实现
 * 原型链基本概念：
    (1)每一个函数都有一个 prototype 属性, 属性值是一个对象, 即原型对象;
    (2)原型对象上都包含一个constructor 属性, 它是一个指针, 指向其 prototype 属性所在的构造函数;
    (3)每个实例上都包含一个指向原型对象的内部指针（[[prototype]]）;
    (4)如果让一个原型对象A等于另一个类型的实例a, 那么这个原型对象A上就会包含一个指向实例a的原型的指针, 实例a的原型上有包含一个指向其构造函数的指针。
       假如另一个原型又是另一个类型的实例, 那么上述关系依然成立, 如此层层递进, 就构成了实例与原型之间的链条;
 * 原型链的基本模式：让原型对象等于另一个类型的实例
 * 缺点：
    (1)子类型在原型上继承了超类型的所有属性, 那么超类型实例中的属性将位于子类型的原型中, 如果超类型实例属性是一个引用类型, 那么该属性将被
       所有子类型的实例所共享（重现原型模式的缺点）
    (2)切断了为超类型传值得可能
    (3)原型链本质上是让原型对象等于另一个对象, 与使用字面量的方式创建原型一样, 这样做实际上是重写了原型对象, 它会切断实例与原型之间的联系, 导致的问题就是
       子类型的原型对象上的 constructor 指针不再指向子类型构造函数, 而是指向超类型构造函数
 *    
 */

//超类型
function Person() {
  this.name = "javascript";
  this.age = 24;
  this.friends = ["html", "css"];

  if (typeof this.say !== "function") {
    Person.prototype.say = function() {
      return this.name + this.age;
    }
  }
}
//子类型
function Child() {}
Child.prototype = new Person();

var p1 = new Child();

console.log(p1.say()); //"javascript24"
console.log(Child.prototype.constructor === Person); //true

//example1：给原型添加新属性和方法一定要放在继承语句之后
Child.prototype.run = function(){
  return "running"
}
//导致上面代码无效
Child.prototype = new Person();

//example2：通过原型链实现继承不能使用对象字面量的方式

//原型链继承
Child.prototype = new Person();

//导致上面继承语句失效,
Child.prototype = {
  run: function() {
    return "running"
  }
}

/**
 * 2.借用构造函数
 * 通过使用 apply() 和call () 方法可以在（将来）新建的对象上执行构造函数
 * 优点：这种继承方式可以为超类型传递参数
 * 缺点：超类型原型上的属性对子类型是不可见的, 换句话说就是：子类型只继承了超类型的实例中的属性,而定义在超类型原型上的属性对子类型是获取不到的
 */

//超类型
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.friends = ["html", "css"];

  if (typeof this.say !== "function") {
    Person.prototype.say = function() {
      return this.name + this.age;
    }
  }
}

function Child(name, age, run) {
  Person.call(this, name, age);
  //Person.apply(this, "javascript", 24);
  this.run = run
}

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
  this.name = name;
  this.age = age;
  this.friends = ["html", "css"];

  if (typeof this.say !== "function") {
    Person.prototype.say = function() {
      return this.name + this.age;
    }
  }
}

function Child(name, age) {
  //第二次调用Person构造函数
  Person.call(this, name, age);
}

//第一次调用Person构造函数
Child.prototype = new Person();

var p1 = new Child("javascript", 24);
var p2 = new Child("sin", 20);

console.log(p1.name === p2.name); //false
console.log(p1.age === p2.age);   //false
console.log(p1.friends === p2.friends); //false
console.log(p1.say === p2.say); //true
console.log(p1.say() === p2.say()); //false

/**
 * 4.寄生组合式继承
 * 这种继承方式实际上是对组合继承的进一优化, 它将解决组合继承超类型被调用两次的问题
 * 这种继承方式的基本思路是：依然借用构造函数实现属性继承, 但子类型原型不必调用超类型的构造函数, 我们实际上只是需要超类型的原型的一个副本而已,
   因此我们可以创建一个超类型的原型的一个副本函数, 然后将它赋予子类型的原型

 */
//超类型
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.friends = ["html", "css"];

  if (typeof this.say !== "function") {
    Person.prototype.say = function() {
      return this.name + this.age;
    }
  }
}

//创建超类型的原型的一个副本函数
function inheritPrototype(subType, superType) {
  //Object() 根据传入值的类型,返回相应基本包装类型的实例; 在非构造函数的形式被调用时, 它等同于 new Object()
  var o = Object(superType.prototype)
  //增强对象, 它使得超类型的原型上的 constructor 指针与子类型的原型上的 construtor 指针统一指向子类型构造函数
  o.constructor = subType
  //指定对象, 本质上依然是重写原型对象
  subType.prototype = o
}

function Child(name, age) {
  //第二次调用Person构造函数
  Person.call(this, name, age);
}

inheritPrototype(Child, Person)

var p1 = new Child("javascript", 24);

console.log(p1.name);  //"javascript"
console.log(p1.age);   //24
console.log(p1.say()); //"javascript24"
console.log(Child.prototype.constructor);  //Child
console.log(Person.prototype.constructor); //Child

 /**
  * 5.继承的扩展1：原型式继承
  * 原型式继承的设计思路是：借助原型可以基于已有对象创建新对象, 同时不必因此创建自定义类型
  * 这种继承方式的前提是：必须有一个对象作为另一个对象继承的基础
  * 缺点：原型模式的缺点相同, 即包含引用类型值的属性始终都会共享相应的值
  */
var person = {
  name: "javascript",
  age: 24,
  friends: ["html", "css"],
  say: function() {
    return this.name + this.age;
  }
}

function fn(o) {
  //创建一个临时性的构造函数
  function Fn() {}
  //将传入的对象作为在这个构造函数的原型
  Fn.prototype = o
  //返回这个临时类型的新实例
  return new Fn()
}

//调用函数
var p = fn(person);

console.log(p.friends);   
console.log(p.say()); 

/**
 * example 原型是继承规范化：ECMAScript5 通过新增 Object.create() 方法来规范原型式继承
 * 传入一个参数时,Object.create() 与 Object() 行为相同
 * 传入两个参数时, 第二个参数格式必须是：每个属性都是通过自己的描述符定义
 */
var p = object(person);
var p = Object.create(person);
var p = Object.create(person, {
  tall: {
    value: 180
  }
});

 /**
  * 6.继承的扩展2：寄生式继承
  * 这是继承方式的思路是：创建一个用于封装继承过程的函数, 在函数内部以某种方式增强对象
  * 这种继承方式的前提与原型式继承一样：必须有一个对象作为另一个对象继承的基础
  * 缺点：与构造函数类似：为对象添加函数, 函数无法做到复用而降低效率; 又与工厂模式类似：对于自定义类型的对象, 无法准确识别其具体类型
  */
 var person = {
  name: "javascript",
  age: 24,
  friends: ["html", "css"],
  say: function() {
    return this.name + this.age;
  }
}

//创建一个普通函数
function fn(o) {
  //使用的Object () 函数不是必需的, 任何能够返回新对象的函数都可以
  var clone = Object(o); //通过调用函数创建一个新对象
  clone.tall = 180;      //以某种方式增强新对象
  return clone;          //返回新对象
}

var p = fn(person);

console.log(p.friends); //["html", "css"]
console.log(p.tall);    //180
console.log(p.say());   //"javascript" 
