"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function none() {
    return {
        isNone: true,
        value: null,
        map: function (_) { return none(); },
        flatMap: function (_) { return none(); },
        getOrElse: function (defaultValue) { return defaultValue; }
    };
}
exports.none = none;
function some(value) {
    return {
        isNone: false,
        value: value,
        map: function (f) { return option(f(value)); },
        flatMap: function (f) { return f(value); },
        getOrElse: function (_) { return value; }
    };
}
exports.some = some;
function option(value) {
    return typeof value === 'undefined' || value === null
        ? none()
        : some(value);
}
exports.option = option;
