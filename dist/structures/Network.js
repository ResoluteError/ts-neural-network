"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require("./Layer");
class NNNetwork {
    constructor() {
        this.layers = [];
    }
    /**
     * Initialize a network with random weights and biases
     *
     * @param {number} inputLength - how many inputs the NN will receive
     * @param {number[]} nodesInLayer
     * @param {number[]} weightsInLayer - weight ranges for each node in each layer
     * @param {number[]} biasInLayer - bias range for each node in each layer
     * @memberof NNNetwork
     */
    init(inputLength, nodesInLayer, weightsInLayer, biasInLayer) {
        this.layers = [];
        if (nodesInLayer.length !== weightsInLayer.length ||
            nodesInLayer.length !== biasInLayer.length) {
            throw new Error("Initializing NN failed - array lengths don't match");
        }
        for (var i = 0; i < nodesInLayer.length; i++) {
            var prevNodes;
            if (i === 0) {
                prevNodes = inputLength;
            }
            else {
                prevNodes = nodesInLayer[i - 1];
            }
            var newLayer = new Layer_1.NNLayer();
            newLayer.init(nodesInLayer[i], prevNodes, weightsInLayer[i], biasInLayer[i]);
            this.layers.push(newLayer);
        }
    }
    /**
     * Load a network based on prior layer definitions
     *
     * @param {NNLayerObj[]} layers
     * @memberof NNNetwork
     */
    load(networkData) {
        this.layers = [];
        for (let layer of networkData.layers) {
            var newLayer = new Layer_1.NNLayer();
            newLayer.load(layer);
            this.layers.push(newLayer);
        }
    }
    /**
     * Export the current state of the network
     *
     * @returns {NNNetworkObj}
     * @memberof NNNetwork
     */
    export() {
        return {
            layers: this.layers,
            input: this.input
        };
    }
    calculate(inputValues) {
        this.input = inputValues;
        for (var i = 0; i < this.layers.length; i++) {
            inputValues = this.layers[i].calculateValues(inputValues);
        }
        return inputValues;
    }
}
exports.NNNetwork = NNNetwork;
