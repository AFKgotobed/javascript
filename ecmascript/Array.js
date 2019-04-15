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

////////////////////////////// 数组对象的内置方法 //////////////////////////////
/* 1.检测方法
 * instanceof 操作符;
 * Array.isArray() 方法;
 */

var arr = [];
console.log(arr instanceof Array) //true
console.log(Array.isArray(arr))   //true

/* 2.继承 Object 而来的方法;
 * toString() 方法：返回一个由每个数组项的字符串形式拼接起来的字符串, 以逗号分隔; 实际上会调用每个数组项的 toString() 方法;
 * valueOf() 方法：等同于 toString() 方法;
 * toLocaleString() 方法：
    * 通常 toString() 方法返回一样的结果; 
    * 区别在于：它会调用每个数组项的 toLocaleString() 方法, 如果数组项没有 toLocaleString() 方法, 那么它就调用 toString() 方法;
 */
var arr1 = ["red", "green", "blue"]
console.log(arr1.toString())       //"red" + "," + "green" + "," + "blue" => "red,green,blue"
console.log(arr1.valueOf())        //"red,green,blue"
console.log(arr1.toLocaleString()) //"red,green,blue"

var obj1 = {
  toString: function() {
    return 'red'
  }
}
var obj2 = {
  toString: function() {
    return 'green'
  },
  toLocaleString: function() {
    return 'gray'
  }
}

var arr2 = [obj1, obj2]
console.log(arr2.toLocaleString()) //"red,gray"

/* 3.栈方法
 * push() 方法：向数组末尾逐个添加任意数量参数, 返回修改后数组的长度;
 * pop() 方法：移除数组末尾最后一项, 它将减少数组 length 值, 返回被移除数组项;
 * 
*/

var arr1 = ["red", "green", "blue"];
console.log(arr1.push('yellow')); //5
console.log(arr1); //["red", "green", "blue", "yellow"]

var arr2 = ["red", "green", "blue"];
console.log(arr2.pop()); //"blue"
console.log(arr2); //["red", "green"]
console.log(arr2.length); //2

/* 4.队列方法
 * shift() 方法：移除数组中的第一项并返回该项;
 * unshift() 方法：数组前端添加任意数量项, 返回新数组的长度;
 * 
*/

var arr1 = ["red", "green", "blue"];
console.log(arr1.shift()); //"red"
console.log(arr1); //["green", "blue"]

var arr2 = ["red", "green", "blue"];
console.log(arr2.unshift("yellow", "white")); //5
console.log(arr2); //["red", "green", "blue", "yellow", "white"]

/* 5.重排序方法
 * reverse() 方法：仅用于反转数组项顺序;
 * sort() 方法：通过某种规则对数组进行排序;
    * 默认情况下, 按升序排列数组项 - 最小在前, 最大在后;
    * sort() 方法实际上会调用, 每个数组项的 toString() 方法, 然后比较得到的字符串;
    * 即使所有数组项都是数值, 它依然比较的是字符串;
    * sort() 方法可以接受一个函数作为参数, 以此来指定数组项的所在的位置;
 * 
*/
//reverse() 方法
var arr1 = [1, 2, 3, 4, 5];
arr1.reverse();
console.log(arr1); //[5, 4, 3, 2, 1]

//sort() 方法
var arr2 = [1, 2, 3, 4, 5, 10];
arr2.sort();
console.log(arr2); //[1, 10, 2, 3, 4, 5]

//定义一个比较函数
function compare1(value1, value2) {
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
}
var arr3 = [1, 2, 3, 4, 5, 10];
arr3.sort(compare1);
console.log(arr3); //[1, 2, 3, 4, 5, 10]


//对于数值类型, 或通过 valueOf() 方法返回数值类型的对象类型, 可以使用更简单的比较函数
function compare2(value1, value2) {
  return value2 - value1
}
var arr4 = [1, 2, 3, 4, 5, 10];
arr4.sort(compare2);
console.log(arr4); //[1, 2, 3, 4, 5, 10]

/* 5.操作方法
 * concat() 方法：基于当前数组创建一个新数组; （不会修改当前数组）
 * slice() 方法：基于当前数组创建一个新数组; （不会修改当前数组）
    * 接收一个参数时, 表示从起始位置截取到数组末尾最后一项（包含最后一项）;
    * 接收两个参数时, 表示从起始位置截取结束位置（不包含结束位置那一项）;
    * 接收两个参数时, 第二个参数必须大于第一个参数, 否则返回空数组;
    * 参数包含负值时, 通过数组长度加上该负值来确定位置;
    * 
 * splice() 方法：基于当前数组进行删除、插入和替换操作（对当前数组修改）
    * 接收两个参数时, 第一个参数表示起始位置; 第二个参数表示要删除项的数量;
    * 接收三个参数时，第一个参数表示起始位置; 第二个参数表示要删除项的数量; 第三个参数表示要插入的项; 若要插入多个项, 则可以再插入第四个、第五个...等参数;
    * 删除项的数量不必等于要插入项的数量, 要插入项的位置位于被删除项的位置;
    * 这个方法始终返回由被删除的项组成的数组, 若没有被删除的项, 也就是第二个参数为0时, 则返回一个空数组;
*/
//concat() 方法
var arr1 = [1, 2, 3, 4, 5];
var arr2 = [5, 6];

var arr3 = arr1.concat(arr2);
console.log(arr3); //[1, 2, 3, 4, 5, 5, 6]

var arr4 = arr3.concat(7, ['8', '9']);
console.log(arr4); //[1, 2, 3, 4, 5, 5, 6, 7, '8', '9']

//slice() 方法
var arr1 = [1, 2, 3, 4, 5];
var len = arr1.length;

var arr2 = arr1.slice(0);
console.log(arr2); //[1, 2, 3, 4, 5]

var arr3 = arr1.slice(1);
console.log(arr3); //[2, 3, 4, 5]

var arr4 = arr1.slice(1, 3);
console.log(arr4); //[2, 3]

var arr5 = arr1.slice(3, 1);
console.log(arr5); //[]

var arr6 = arr1.slice(-3, -1);
var arr7 = arr1.slice(len-3, len-1);
console.log(arr6); //[3, 4]
console.log(arr7); //[3, 4]

var arr8 = arr1.slice(-3, 1);
var arr9 = arr1.slice(len-3, 1); //第二个参数小于第一个参数, 返回空数组
console.log(arr8); //[] 
console.log(arr9); //[]

//splice() 方法

var arr1 = [1, 2, 3, 4, 5];
var arr2 = arr1.splice(0, 2);
console.log(arr1); //[3, 4, 5]
console.log(arr2); //[1, 2]

var arr3 = [1, 2, 3, 4, 5];
var arr4 = arr3.splice(0, 2, 6, 7);
console.log(arr3); //[6, 7, 3, 4, 5]
console.log(arr4); //[1, 2]

var arr5 = [1, 2, 3, 4, 5];
var arr6 = arr5.splice(0, 0, 6, 7);
console.log(arr5); //[6, 7, 1, 2, 3, 4, 5]
console.log(arr6); //[]

/* 6.位置方法
 * indexOf() 方法：要查找的项在当前数组中的位置, 即索引值;
    * 接收一个参数时, 表示要查找的项在当前数组中的位置, 查找的方向：从左往右
    * 接收两个参数时, 第一个参数表示：要查找的项; 第二个参数表示：起始位置; 
    * 接收两个参数时, 若第二个参数是负值, 则可以通过数组 length 属性值加上负值来确定位置; 
    * 要查找的项与数组项匹配时, 会使用全等操作符;
    * 若数组中没有匹配的项, 则返回-1;
 * lastIndexOf() 方法：与indexOf() 方法用法一致,只不过它的查找方向：从右到左
 * 
*/
var arr1 = [1, 2, 3, 4, 5, 3];

var arr2 = arr1.indexOf(3);
console.log(arr2); //2

var arr3 = arr1.indexOf(3, 3);
console.log(arr3); //5

var arr4 = arr1.indexOf('3', 3);
console.log(arr4); //-1

var arr4 = arr1.indexOf(3, -5);
var arr5 = arr1.indexOf(3, 1);
console.log(arr5); //2

var arr6 = arr1.lastIndexOf(3);
console.log(arr6); //5

/* 7.迭代方法
 * every() 方法：对数组中的每一项运行给定的函数, 若函数对每一项都返回 true, 则返回 true;
 * some() 方法：对数组中的每一项运行给定的函数, 若函数对任意一项返回 true, 则返回 true;
 * filter() 方法：对数组中的每一项运行给定的函数, 返回该函数返回 true 的项组成的数组;
 * map() 方法：对数组中的每一项运行给定的函数, 返回每次函数调用的结果组成的数组;
 * forEach() 方法：对数组中的每一项运行给定的函数, 没有返回值;
 * 上列方法中的函数都会接收三个参数：
    * 第一个参数表示：数组项的值;
    * 第二个参数表示：数组项的索引;
    * 第三个参数表示：数组对象本身;
*/

//every() 方法
var arr1 = [1, 2, 3, 4, 5];
var result = arr1.every(function(item, index, array){
  return (item >= 1);
})
console.log(result); //true

//every() 方法
var arr1 = [1, 2, 3, 4, 5];
var result = arr1.some(function(item, index, array){
  return (item === 1);
})
console.log(result); //true

//filter() 方法
var arr1 = [1, 2, 3, 4, 5];
var arr2 = arr1.filter(function(item, index, array){
  return (item > 2);
})
console.log(arr2); //[3, 4, 5]

//map() 方法
var arr1 = [1, 2, 3, 4, 5];
var arr2 = arr1.map(function(item, index, array){
  return (item * 2);
})
console.log(arr2); //[2, 4, 6, 8, 10]


//forEach() 方法
var arr1 = [1, 2, 3, 4, 5];
arr1.forEach(function(item, index, array){
  console.log(item + index);
})

/* 8.归并方法
 * reduce() 方法：迭代数组中的所有项, 返回一个最终值; 函数返回任何值都会作为第一个参数自动传递给下一项;
 * reduceRight() 方法：与 reduce() 方法用法相同;
 * 上列方法中的函数都会接收四个参数：
    * 第一个参数表示：前一个值, 数组第一项;
    * 第二个参数表示：当前值, 数组第二项;
    * 第三个参数表示：数组;
    * 第三个参数表示：数组对象本身;
*/

//reduce() 方法
var arr1 = [1, 2, 3, 4, 5];
var arr2 = arr1.reduce(function(prev, cur, index, array){
  return prev + cur;
})
console.log(arr2); //15

var arr1 = [1, 2, 3, 4, 5];
var arr2 = arr1.reduce(function(prev, cur, index, array){
  return prev - cur;
})
console.log(arr2); //-13

//reduceRight() 方法
var arr1 = [1, 2, 3, 4, 5];
var arr2 = arr1.reduceRight(function(prev, cur, index, array){
  return prev - cur;
})
console.log(arr2); //-5
