### 增
- `arr.push()`
- `arr.unshfit`
- `arr.splice()` (改变原数组)
- `arr.concat()` (不改变原数组)

### 删
- `arr.pop()`
- `arr.shfit()`
- `arr.splice()` (改变原数组)
- `arr.slice()` (不改变原数组)

### 改
- `arr.splice()`
- `arr[i] = xxx`

### 查
- `arr.indexOf()`
- `arr.find(()=>{})`
- `arr.includes()`
- `arr.at(index)` (根据索引返回对应的值, **接受负数**)

### 排序
- `arr.sort(func)`
- `arr.reverse()` 反转

### 转换
- `arr.join(",")` [1, 2, 3] => '1,2,3'
- `arr.from()` (可以理解为`python`的`list()`)

### 去重
1. `Array.from(new Set(arr))`
    - Set去重
    - 优点: 最简单的实现方式, 并且可以对NaN去重
    - 缺点: 对于复杂类型不能去重
2. 双重循环+splice方法
    - 最原始的方法
    - 优点: 可以对复杂类型去重
    - 缺点: 不能对NaN去重
```js
function removeDuplicate(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1)
        len-- // 减少循环次数提高性能
        j-- // 保证j的值自加后不变
      }
    }
  }
  return arr
}
const arr = [1, 2, 2, 'abc', 'abc', true, true, false, false, undefined, undefined, NaN, NaN]
const result = removeDuplicate(arr)
console.log(result) // [ 1, 2, 'abc', true, false, undefined, NaN, NaN ]
```
3. `indexOf`或`includes`去重
    - 通过`indexOf`或者`includes`判断元素是否重复
    - indexOf不能对`NaN`去重
    - `includes`可以对`NaN`去重
    - 不能对复杂类型去重
```js
function removeDuplicate(arr) {
  const newArr = []
  arr.forEach(item => {
    if (newArr.indexOf(item) === -1) {
    // if (!newArr.includes(item)) {
      newArr.push(item)
    }
  })
  return newArr // 返回一个新数组
}
const arr = [1, 2, 2, 'abc', 'abc', true, true, false, false, undefined, undefined, NaN, NaN]
const result = removeDuplicate(arr)
console.log(result) // indexOf [ 1, 2, 'abc', true, false, undefined, NaN, NaN ]
console.log(result) // includes [ 1, 2, 'abc', true, false, undefined, NaN ]
```

4.利用数组的`filter()`+`indexOf()`
    - 结果会剔除`NaN`, 因为`indexOf()`无法对`NaN`进行判断，即`arr.indexOf(item) === index`返回结果为`false`。
```js
function removeDuplicate(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}
const arr = [1, 2, 2, 'abc', 'abc', true, true, false, false, undefined, undefined, NaN, NaN]
const result = removeDuplicate(arr)
console.log(result) // [ 1, 2, 'abc', true, false, undefined ]
```

5. Map()对象
    - 通过`set()`和`has()`方法判断键是否重复
```js
function removeDuplicate(arr) {
  const map = new Map()
  const newArr = []

  arr.forEach(item => {
    if (!map.has(item)) { // has()用于判断map是否包为item的属性值
      map.set(item, true) // 使用set()将item设置到map中，并设置其属性值为true
      newArr.push(item)
    }
  })

  return newArr
}
const arr = [1, 2, 2, 'abc', 'abc', true, true, false, false, undefined, undefined, NaN, NaN]
const result = removeDuplicate(arr)
console.log(result) // [ 1, 2, 'abc', true, false, undefined, NaN ]
```

### 迭代
- `arr.some()`
- `arr.every()`
- `arr.forEach()` (无返回值)
- `arr.map()` (返回执行函数后的数组)
- `arr.filter()` (返回值为true的元素)

### 类数组
JavaScript 类数组指的是具有数组类似特性的对象。它们通常不是真正的数组，而是类似数组的对象，但拥有一些数组特有的属性和方法，比如 length 属性和 push() 方法。例如，arguments 对象就是一个典型的类数组。