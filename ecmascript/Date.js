/**
 * 引用类型：Date
 * Date 类型使用自UTC（Coordinated Universal Time 国际协调时间）1970年1月1日午夜（零时）开始经过的毫秒数来保存时间;
 * 创建一个日期对象, 最简单的方式就是：使用 new 操作符 + （Date）构造函数;
 */

// 1.当 Date 构造函数中不传值, 新对象会自动获取当前日期和时间; 
var time = new Date()
console.log(time); //Sun Apr 07 2019 18:20:47 GMT+0800 (中国标准时间)

// 2.向 Date 构造函数中传递数表示日期类型的字符串, 可以创建一个保存特定日期和时间的对象;
var time = new Date('Sun Apr 07 2019 18:20:47 GMT+0800 (中国标准时间)');

/* 3.ECMAscript 提供两个方法用于表示日期的毫秒数;
 * Date.parse() 方法, 它接受一个表示日期的字符串参数, 返回该日期的毫秒数; 如果该字符串不能表示一个日期, 则返回NaN;
 * Date.UTC() 方法, 它接受一个表示日期的字符串参数, 返回该日期的毫秒数;
 */


// Date.parse() 方法
var milliseconds1 = Date.parse(new Date());
console.log(milliseconds1); //当前某一时刻的毫秒数

var milliseconds2 = Date.parse('2019-13');
console.log(milliseconds2); //NaN

// Date.UTC() 方法



