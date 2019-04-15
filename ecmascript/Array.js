/**
 * 引用类型：Array
 * 数组即数据的有序列表;
 * ECMAScript 中的数组项可以是任何数据类型（String、Number、Boolean、Undefined、Null、Object）;
 * 创建一个数组对象, 最简单的方式就是：使用 new 操作符 + （Array）构造函数;
 */
var arr = new Array()

// 1.向 Array 构造函数中传递数值, 表示数组将要保存的数组项数量 
var arr = new Array(10)

// 2.向 Array 构造函数中传递数组项, 以逗号分隔;
var arr = new Array("red", "green", "blue")

// 3.数组是数据的有序列表, 数组使用方括号并提供相应数组项的基于 0 的数字索引;

var arr = ["red"]
console.log(arr[0]); //"red"

/* 4.数组长度
 * 数组的 length 属性决定了数组的长度;
 * 设置 length 值时, 若数组的实际数组项小于 length 的值, 则使用 undefined 值填充数组;
 * 设置 length 值时, 若数组的实际数组项大于 length 的值, 那么数组将从末尾删除多余的数组项;
 */
var arr = ["red", "green", "blue"];
arr.length = 4;
console.log(arr[3]); //undefiend

arr.length = 2;
console.log(arr); //["red", "green"]

// 5.数组字面量：不会调用Array 构造函数
var arr = [];
