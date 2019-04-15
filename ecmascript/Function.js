/**
 * 引用类型：Function
 * 所有的函数都是 Function 类型的一个实例;
 * 函数声明;
 * 函数声明提升：解析器会率先读取函数声明, 并使其在执行任何代码之前可用;
 * 函数表达式;
 * 函数没有重载：即同名函数, 后定义的函数会覆盖前面的函数, 实质上是函数名（变量）的覆盖
 * 一个函数作为另一函数的返回值;
 * 一个函数作为另一函数的参数;
 */

// 1.所有的函数都是 Function 类型的一个实例;
var fn1 = new Function(); //函数表达式
console.log(typeof fn1);  //function

var fn2 = function() {}; //函数表达式

fn3(); //函数声明提升
function fn3() {} //函数声明

// 2.一个函数作为另一函数的返回值
function createComparisonFn(propertyName) {
  return function(object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  }
}

// 3.一个函数作为另一函数的参数
function fn(foo, arg) {
  return foo(arg);
}

function foo(num) {
  return 10 + num;
}

var result = fn(foo, 1)
console.log(result);  //11

// 4.所有函数的参数都是按值传递的
function fn1(num) {
  return num;
}
var count = 5;
var result = fn1(count);
console.log(result); //5


function fn2(o) {
  o.color = "red";
}
var obj = new Object();
fn2(obj);
console.log(obj.color); //"red"

function fn3(o) {
  o.color = "red";  // 这个内部变量 o 与外部变量 obj 引用的是同一个对象
  o = new Object(); // 这个内部变量 o 与上一行变量 o 引用了不同的对象，它是函数内部的一个局部变量对象
  o.color = "green";
  console.log(o.color);   //'red'
}
var obj = new Object();
fn3(obj);
console.log(obj.color); //"red"
console.log(o.color);   //error