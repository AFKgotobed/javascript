/**
 * 闭包
 */

// 1.arguments 对象, 是一个类数组, 函数传递进来的参数都作为该数组的一项;
function fn() {
  console.log(arguments) //['javascript', 'sin']
  console.log(arguments.length) //2
  console.log(typeof arguments) //object
  console.log(arguments instanceof Array) //false
}
fn('javascript', 'sin');


// 2.arguments 对象有一个 callee 属性, 该属性是一个指针, 指向正在执行的函数, 利用这个属性可以实现对函数的递归调用;
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1)
  }
}
var result = factorial(4);
console.log(result); //4*3*2*1 = 24
