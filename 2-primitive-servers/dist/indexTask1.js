"use strict";
// 1. 
function getFirstWord(a) {
    return a.split(/ +/)[0].length;
}
// 2. 
function getUserNamings(a) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}
// 3. 
// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a) {
    var _a;
    return ((_a = a === null || a === void 0 ? void 0 : a.products) === null || _a === void 0 ? void 0 : _a.map(prod => prod === null || prod === void 0 ? void 0 : prod.name)) || [];
}
// 4.1
// easy way is using 'as' keyword
// hard way is ?...
function hey1(a) {
    return "hey! i'm " + a.name();
}
hey1({ name: () => "roma", cuteness: 100 });
hey1({ name: () => "vasya", coolness: 100 });
// 4.2
class Cat {
    constructor(nameSt, bool) {
        this.nameSt = nameSt;
        this.bool = bool;
        this.nameSt = nameSt;
        this.bool = bool;
    }
    name() {
        return this.nameSt;
    }
}
;
class Dog {
    constructor(nameSt, quantity) {
        this.nameSt = nameSt;
        this.quantity = quantity;
        this.nameSt = nameSt;
        this.quantity = quantity;
    }
    name() {
        return this.nameSt;
    }
}
;
function hey2(abstractPet) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true);
let b = new Dog("gavchik", 333);
hey2(a);
hey2(b);
// 4.3
function hey3(a) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness));
}
hey3({ name: () => "roma", type: "cat", cuteness: 100 });
hey3({ name: () => "vasya", type: "dog", coolness: 100 });
// 5.
// google for Record type
function stringEntries(a) {
    return Array.isArray(a) ? a : Object.keys(a);
}
// 6.
// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it
async function world(a) {
    return "*".repeat(a);
}
const hello = async () => {
    return await world(10);
};
hello().then(r => console.log(r)).catch(e => console.log("fail"));
