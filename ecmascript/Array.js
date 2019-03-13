/**
 * 引用类型：Array 类型
 * 数组：数据的有序列表
 * ECMAScript中数组项可以是任何数据类型（String、Number、Boolean、Undefined、Null、Object）
 * 引用类型的值（对象）是某个特定引用类型的一个实例
 * 创建一个数组对象, 最简单的方式就是：使用 new 操作符 + （Array）构造函数
 * 数组的长度的动态性
 */

var arr = new Array()

/**
 * 1.数组字面量
 */
var arr = []

/**
 * 2.直接向 Array 构造函数传值
 * 可以向 Array 构造函数中传递数值, 表示数组将要保存的数组项数量 
 * 也可以向 Array 构造函数中传递数组项, 以逗号分隔
 */
var arr1 = new Array(10)
var arr2 = new Array("red", "green", "blue")

/**
 * 3.数组是数据的有序列表
 * 数组使用方括号并提供相应数组项的基于 0 的数字索引
 */
var arr = ["red"]
console.log(arr[0]) //"red"

/**
 * 4.数组长度
 * 数组的 length 属性决定了数组的长度
 * 设置数组的 length 属性值, 若数组实际数组项数量值大于 length 的值, 那么数组将从末尾删除多余的数组项;
 * 若数组的实际数组项小于 length 的值, 则使用 undefined 值填充数组
 */

var arr = ["red", "green", "blue"];
arr.length = 4;
console.log(arr[3]) //undefiend

arr.length = 2;
console.log(arr) //["red", "green"]
