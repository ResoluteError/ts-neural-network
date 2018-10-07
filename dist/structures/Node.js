"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sigmoid_1 = require("../math/Sigmoid");
class NNNode {
    /**
     * Creates an instance of Node.
     *
     * @memberof Node
     */
    constructor() {
        this.weights = [];
        this.bias = 0;
        this.activity = 0;
        this.zValue = 0;
    }
    /**
     * Initialize the node with random data
     *
     * @param {number} numberOfWeights - equal to number of nodes in previous layer
     * @param {number} weightsRange - range between lowest and highest weight
     * @param {number} biasRange - range between lowest and highest bias
     * @memberof Node
     */
    init(numberOfWeights, weightsRange, biasRange) {
        for (var i = 0; i < numberOfWeights; i++) {
            this.weights.push((Math.random() - 0.5) * weightsRange);
        }
        this.bias = (Math.random() - 0.5) * biasRange;
    }
    /**
     * Load NN data from a previous run into this NN
     *
     * @param {NodeObj} data
     * @memberof Node
     */
    load(data) {
        this.weights = data.weights;
        this.bias = data.bias;
    }
    /**
     * Export Node Data to later rebuild the exact same NN
     *
     * @returns {NodeObj}
     * @memberof Node
     */
    export() {
        return {
            weights: this.weights,
            bias: this.bias
        };
    }
    /**
     * Calculates the node value based on the input and returns the activation value
     *
     * @param {number[]} inputActivations - array of input values from previious nodes
     * @returns {number} - activation value of this node
     * @memberof Node
     */
    calculateValue(inputActivations) {
        if (inputActivations.length !== this.weights.length) {
            throw new Error(`Length of inputs (${inputActivations.length}) does not match length of weights (${this.weights.length})`);
        }
        var sum = 0;
        for (var i = 0; i < inputActivations.length; i++) {
            sum += inputActivations[i] * this.weights[i];
        }
        sum += this.bias;
        this.zValue = sum;
        var result = Sigmoid_1.Sigmoid.calc(sum);
        this.activity = result;
        return result;
    }
}
exports.NNNode = NNNode;
