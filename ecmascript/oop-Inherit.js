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