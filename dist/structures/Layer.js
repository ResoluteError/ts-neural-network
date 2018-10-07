"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
class NNLayer {
    constructor() {
        this.nodes = [];
    }
    /**
     * Build the layer with random values
     *
     * @param {number} breadth - how many nodes are in this layer
     * @param {number} inputNodes - how many nodes are in the previous layer
     * @param {number} weightRange - weight range for each node
     * @param {number} biasRange - bias range for each node
     * @memberof NNLayer
     */
    init(breadth, inputNodes, weightRange, biasRange) {
        this.nodes = [];
        for (var i = 0; i < breadth; i++) {
            var newNode = new Node_1.NNNode();
            newNode.init(inputNodes, weightRange, biasRange);
            this.nodes.push(newNode);
        }
    }
    /**
     * Load NN to rebuild the exact NN layer
     *
     * @param {NNLayerObj} layer
     * @memberof NNLayer
     */
    load(layer) {
        this.nodes = [];
        for (var node of layer.nodes) {
            var newNode = new Node_1.NNNode();
            newNode.load(node);
            this.nodes.push(newNode);
        }
    }
    /**
     * export current layer to reload in next run
     *
     * @returns {NNLayerObj}
     * @memberof NNLayer
     */
    export() {
        return {
            nodes: this.nodes
        };
    }
    /**
     * Calculate the values of this layer based on the activations from the previous layer
     *
     * @param {number[]} inputValues - activations from previous layer or input
     * @returns {number[]} - activations of this layer
     * @memberof NNLayer
     */
    calculateValues(inputValues) {
        var resultArr = [];
        for (var node of this.nodes) {
            resultArr.push(node.calculateValue(inputValues));
        }
        return resultArr;
    }
    get nodeActivity() {
        var result = [];
        for (var node of this.nodes) {
            result.push(node.activity);
        }
        return result;
    }
}
exports.NNLayer = NNLayer;
