"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sigmoid {
    static calc(input) {
        this.counter++;
        var output = (1 / (1 + Math.pow(Math.E, (-1) * input)));
        return output;
    }
}
Sigmoid.counter = 0;
exports.Sigmoid = Sigmoid;
