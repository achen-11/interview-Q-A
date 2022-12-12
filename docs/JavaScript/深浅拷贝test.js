// 先写一个浅拷贝
function _deepClone(target) {
    let cloneRes = {}
    for(const key in target) {
        cloneRes[key] = target[key]
    }
    return cloneRes
}
// 2. 普通深拷贝(只考虑对象/非对象)
function _deepClone(target) {
    if (typeof target === 'object') {
        let cloneRes = {};
        for (key in target) {
            cloneRes[key] = _deepClone(target[key])
        }
        return cloneRes // 记得返回
    } else {
        return target
    }
}

// 3.考虑数组的深拷贝
function _deepClone(target) {
    if (typeof target === 'object') {
        let cloneRes = Array.isArray(target) ? [] : {};
        for(key in target) {
            cloneRes[key] = _deepClone(target[key])
        }
        return cloneRes
    } else {
        return target
    }
}

// 4. 考虑循环引用
// Q：为什么要用WeakMap替代Map?
// A：强引用和弱引用的区别，强引用只能手动释放，弱引用能够被垃圾回收机制释放，使用Map会造成内存额外消耗。
//    WeakMap中的键是弱引用，Map中的键是强引用
function _deepClone(target, map = new WeakMap()) {
    if (typeof target === 'object') {
        let cloneRes = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target)
        }
        map.set(target, cloneRes)
        for (const key in target) {
            cloneRes[key] = _deepClone(target[key], map)
        }
        return cloneRes
    } else {
        return target
    }
}

// 5. 考虑其他数据类型
function _deepClone(target, map = new WeakMap()) {
    if (target === null) return null
    if (target instanceof RegExp) return new RegExp(target)
    if (target instanceof Date) return new Date(target)
    if (typeof target !== 'object') return target
    if (map.get(target)) return map.get(target) // 
    // let cloneRes = Array.isArray(target) ? [] : {}
    let cloneRes = new target.constructor()
    map.set(target, cloneRes)
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            cloneRes[key] = _deepClone(target[key], map);
        }
    }
    return cloneRes
}
// 6. 性能优化
// 把for..in改为普通的for循环，性能会有所提高

// 测试案例
const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
const newTarget = _deepClone(target)
newTarget.field4[1] = "Child2"
console.log(target);
console.log(newTarget);
console.log(target === newTarget);
// 输出：
// {
//   field1: 1,
//   field2: undefined,
//   field3: { child: 'child' },
//   field4: [ 2, 4, 8 ]
// }
// {
//   field1: 1,
//   field2: undefined,
//   field3: { child: 'child' },
//   field4: [ 2, 'Child2', 8 ]
// }
// false