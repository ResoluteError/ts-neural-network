"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ManipulationMatrix {
    constructor(network) {
        this.changes = [];
        for (var layerIndex = 0; layerIndex < network.layers.length; layerIndex++) {
            var nodeCount = network.layers[layerIndex].nodes.length;
            this.changes[layerIndex] = [];
            for (var nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++) {
                this.changes[layerIndex].push({ bias: 0, weights: [] });
            }
        }
    }
    addBias(value, layerIndex, nodeIndex) {
        this.changes[layerIndex][nodeIndex].bias += value;
    }
    addWeight(value, layerIndex, nodeIndex, weightIndex) {
        if (!this.changes[layerIndex][nodeIndex].weights[weightIndex]) {
            this.changes[layerIndex][nodeIndex].weights[weightIndex] = value;
        }
        else {
            this.changes[layerIndex][nodeIndex].weights[weightIndex] += value;
        }
    }
    export() {
        return this.changes;
    }
    apply(network, biasFactor, weightFactor) {
        var layerCount = network.layers.length;
        for (var layerIndex = 0; layerIndex < layerCount; layerIndex++) {
            var nodeCount = network.layers[layerIndex].nodes.length;
            for (var nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++) {
                var weightCount = network.layers[layerIndex].nodes[nodeIndex].weights.length;
                for (var weightIndex = 0; weightIndex < weightCount; weightIndex++) {
                    var weightDiff = this.changes[layerIndex][nodeIndex].weights[weightIndex] * weightFactor;
                    network.layers[layerIndex].nodes[nodeIndex].weights[weightIndex] -= weightDiff;
                }
                var biasDiff = this.changes[layerIndex][nodeIndex].bias * biasFactor;
                network.layers[layerIndex].nodes[nodeIndex].bias -= biasDiff;
            }
        }
    }
}
exports.ManipulationMatrix = ManipulationMatrix;
