### 场景:
```js
var name = "window";
var obj = {
    name: "obj",
    sayName: function () {
        console.log(this.name);
    }
};
obj.sayName(); // obj this指向 obj 对象
setTimeout(obj.sayName,0); // window 指向 window 对象
setTimeout(()=>{obj.sayName()},0); // obj, this 指向 obj 对象, 注意两者区别
```

### 同
> - 作用: 都是改变函数this指向的方法
> - 三者的第一个参数都是this要指向的参数

### 异
> bind返回的是改变this指向后的**函数**, apply/call是立即执行改变指向后的函数
> apply的传参是以数组形式传入,即第二参数类型为数组, 数组包含原函数的参数, call是直接传入参数列表, 即多个参数

### bind
```js
var name = "window";
var obj = {
    name: "obj",
    sayName: function (...args) {
        console.log(this.name, args);
    }
};
obj.sayName(); // obj 指向 obj 对象
setTimeout(obj.sayName.bind(obj),0); // obj，bind将this指向obj
setTimeout(obj.sayName.bind(obj, 1,2,3)(4,5),0) // obj [1, 2, 3, 4, 5] bind可以分多次传参
```


### call && apply
```js
function func(...args) {
    console.log(this, args);
}

const obj = {
    name: 'obj'
}

func(1,2,3) // window对象, [1,2,3]
func.call(obj, 1,2,3) // obj对象, [1,2,3]
func.apply(obj, [1,2,3]) // obj对象, [1,2,3]
```
> apply的小技巧
```js
const Arr = [1,2,3,4,5]
Math.max.apply(null, Arr) //使Max能接收array类型, 但好像没必要
Math.max(...Arr)
```

### 手写实现bind函数
```js
Function.prototype.Bind = function(context) {
    // 判断是否为函数
    if (typeof this !== 'function') {
        throw new TypeError("error")
    }

    // 获取参数
    const args = [...arguments].slice(1),
          fn = this;
    return function Fn() {
        console.log(this instanceof Fn);
        return fn.apply(this instanceof Fn ? new fn(...arguments) : context, args.concat(...arguments))
    }
}


var obj = {
    name: "obj"
};
const fn =  function (...args) {
    console.log(this.name, args);
}
// 方式一：只在bind中传递函数参数
fn.Bind(obj,1,2)()

// 方式二：在bind中传递函数参数，也在返回函数中传递参数
fn.Bind(obj,1)(2)
```