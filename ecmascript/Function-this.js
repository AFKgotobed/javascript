/**
 * 函数内部的特殊对象：this
 */

// 1.全局函数中 this 等于 window;
var name = "javascript";
function fn() {
  return this.name;
}
console.log(fn()); //"javascript"

// 2.函数被某个对象作为方法调用时，该函数的中 this 等于那个对象;
var name = "javascript";
var person = {
  name: "sin",
  say: function() {
    return this.name;
  }
};
console.log(person.say()); //"sin"

// 3.在闭包中, 匿名函数的作用域具有全局性, 因此它的 this 对象指向 window;
var name = "javascript";
var person = {
  name: "sin",
  say: function() {
    return function() {
      return this.name;
    }
  }
};
console.log(person.say()()); //"javascript"
