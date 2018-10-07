"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Memo {
    constructor() {
        this.activationOnCost = [];
    }
    /**
     * Resets and initializes the activationOnCost array
     *
     * @param {number} layerCount
     * @memberof Memo
     */
    init(layerCount) {
        this.activationOnCost = [];
        for (var i = 0; i < layerCount; i++) {
            this.activationOnCost.push([]);
        }
    }
    add(value, layerIndex, nodeIndex) {
        //console.log(`Adding ${value} to memo for activityOnCost[${layerIndex}][${nodeIndex}]`);
        if (!this.has(layerIndex, nodeIndex)) {
            this.activationOnCost[layerIndex][nodeIndex] = value;
        }
        else {
            this.activationOnCost[layerIndex][nodeIndex] += value;
        }
    }
    has(layerIndex, nodeIndex) {
        return this.activationOnCost[layerIndex][nodeIndex] != null;
    }
    get(layerIndex, nodeIndex) {
        if (!this.has(layerIndex, nodeIndex)) {
            throw new Error(`No memo for activityOnCost[${layerIndex}][${nodeIndex}]`);
        }
        return this.activationOnCost[layerIndex][nodeIndex];
    }
}
exports.Memo = Memo;
