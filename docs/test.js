// /**
//  * 
//  * @param {obj} context this的指向
//  * @returns 
//  */
// Function.prototype.Bind = function(context) {
//     // 判断是否为函数
//     if (typeof this !== 'function') {
//         throw new TypeError("error")
//     }

//     // 获取参数
//     const args = [...arguments].slice(1),
//           fn = this;
//     return function Fn() {
//         console.log(this instanceof Fn);
//         return fn.apply(this instanceof Fn ? new fn(...arguments) : context, args.concat(...arguments))
//     }
// }


// var obj = {
//     name: "obj"
// };
// const fn =  function (...args) {
//     console.log(this.name, args);
// }
// // 方式一：只在bind中传递函数参数
// fn.Bind(obj,1,2)()

// // 方式二：在bind中传递函数参数，也在返回函数中传递参数
// fn.Bind(obj,1)(2)
let obj = {
    a: 1
}
console.log(obj);

function Person() {}
Person.prototype.name = 'achen'
Person.prototype.age = 23
Person.prototype.sayName = function() {
    console.log(this.name);
}

let person1 = new Person()
let person2 = new Person()
person1.name = "Achen"
console.log('person', person1)
console.log("Person", Person);
console.log(person1.name) // 寻找自身属性, 包含name, 所以返回"Achen"
console.log(person2.name) // 寻找自身属性, 没有找到, 通过[[prototype]]找到原型对象, 包含name, 返回"achen"
person1.sayName() // "Achen"
person2.sayName() // "achen"