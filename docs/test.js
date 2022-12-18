/**
 * 
 * @param {obj} context this的指向
 * @returns 
 */
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