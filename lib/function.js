/**
 * 检测对象中某个属性是实例属性还是原型属性
 * @param { Object } object '需要检测的对象'
 * @param { String } name '需要检测的对象的属性名'
 * @return '若返回值是true, 则表示该属性是实例属性; 反之, 是原型属性'
 */
function hasPrototypeProperty(object, name) {
  return !object.hasOwnProperty(name) && (name in object);
}

/**
 * 阶乘递归函数
 * @param { Number } num
 */
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1)
  }
}