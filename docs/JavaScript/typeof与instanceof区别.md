- 都是用于判断变量的数据类型的方法
- typeof
  - 返回变量的基本数据类型
  - 复杂类型均返回`'object'`
  - 特殊的，`typeof function(){}`会返回`function`
> 注意：严格来讲，函数在ECMAScript中被认为是对象，并不代表一种数据类型。可是，函数也有自己特殊的属性。为此，就有必要通过typeof操作符来区分函数和其他对象。------摘自红宝书3.4.1

- instanceof
  - 准确的返回变量的复杂数据类型
  - 返回的是`Boolean`
  - 例：`[] instanceof Array` 返回`true`
  - 但不能判断简单类型

```js
// 通用的类型判断函数是
function getType(target) {
    const type = typeof target
    if (type !== 'object') {
        return type
    }
    return Object.prototype.toString.call(target).replace(/^\[object (\S+)\]$/, '$1')
}

console.log(getType(new Date())); // 'Date'
```