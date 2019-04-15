/**
 * 检测对象中某个属性是实例属性还是原型属性
 * @param { Object } object '需要检测的对象'
 * @param { String } name '需要检测的对象的属性名'
 * @return '若返回值是true, 则表示该属性是实例属性; 反之, 是原型上的属性'
 */
function hasPrototypeProperty(object, name) {
  return !object.hasOwnProperty(name) && (name in object);
}

/**
 * 寄生组合式继承
 * 创建超类型的原型的一个副本, 用于子类型对其方法的继承
 * @param { Function } subType '子类型构造函数'
 * @param { Function } superType '超类型构造函数'
 */
//创建超类型的原型的一个副本函数
function inheritPrototype(subType, superType) {
  //Object() 根据传入值的类型,返回相应基本包装类型的实例; 如果不是作为构造函数实例化使用, new 操作符可以省略
  var o = Object(superType.prototype)
  //增强对象, 它使得超类型的原型上的 constructor 指针与子类型的原型上的 construtor 指针统一指向子类型构造函数
  o.constructor = subType
  //指定对象, 本质上依然是重写原型对象
  subType.prototype = o
}

