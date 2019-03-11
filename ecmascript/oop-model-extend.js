/**
 * 1.寄生构造函数模式
 * 与工厂模式相比：(1)包装函数叫做构造函数; (2)使用 new 操作符
 * 应用场景：在特殊情况下用来为对象创建构造函数
 * 缺点: 返回的新对象与构造函数或构造函数的原型之间没有关系; 与工厂模式一样的，它不能用 instanceof 操作符来确定对象类型
 */

function Person(name, age) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.friends = ['html', 'css'];
  o.say = function() {
    return this.name + this.age;
  };
  return o;
}

var p1 = new Person("javascript", 24);
var p2 = new Person("sin", 20);

//example: 创建一个具有额外方法的特殊数组
function SpecialArray() {
  //创建数组
  var values = new Array();
  //添加值
  values.push.apply(values, arguments);
  //添加方法
  values.toPipedString = function() {
    return this.join("|")
  };
  return values;
}

var colors = new SpecialArray("red", "green", "blue");
console.log(colors.toPipedString()) //"red|green|blue"

/**
 * 2.稳妥构造函数
 * 与寄生构造函数模式相比：(1)包装函数也叫构造函数; (2)不使用 new 操作符
 * 构造函数内部创建的新对象叫做稳妥对象
 * 特点：稳妥对象没有公共的属性, 其方法也不引用 this 的对象
 * 应用场景：它适合在一些安全的环境中使用或者在防止数据没其他应用程序改动时使用
 */

function Person(name) {
  //创建对象
  var o = new Object();

  //创建私有变量、函数

  //创建方法
  o.say = function () {
    alert(name);
  };
  return obj;
}
var p = Person("javascript");
p.say(); //"javascript"