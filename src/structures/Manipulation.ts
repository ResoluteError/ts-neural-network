import { NNNetworkObj, NNNetwork } from "./Network";

export interface ManipulationData {
  bias : number; 
  weights: number[];
}

export class ManipulationMatrix {

  // [layer][node].bias || [layer][node].weights[]
  changes : ManipulationData[][];

  constructor( network : NNNetworkObj ){
    this.changes = [];
    for( var layerIndex = 0; layerIndex < network.layers.length; layerIndex++){
      var nodeCount = network.layers[layerIndex].nodes.length;
      this.changes[layerIndex] = [];
      for( var nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++){
        this.changes[layerIndex].push({bias : 0, weights: []});
      }
    }
  }

  addBias( value: number, layerIndex: number, nodeIndex : number){
    this.changes[layerIndex][nodeIndex].bias += value;
  }

  addWeight( value: number, layerIndex: number, nodeIndex : number, weightIndex: number){
    if(!this.changes[layerIndex][nodeIndex].weights[weightIndex]){
      this.changes[layerIndex][nodeIndex].weights[weightIndex] = value;
    } else {
      this.changes[layerIndex][nodeIndex].weights[weightIndex] += value;
    }
  }

  export(): ManipulationData[][]{
    return this.changes;
  }

  apply(network : NNNetwork, biasLearningRate: number, weightLearningRate : number){
    var layerCount = network.layers.length;
    for(var layerIndex = 0; layerIndex < layerCount; layerIndex++){
      var nodeCount = network.layers[layerIndex].nodes.length;
      for( var nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++){
        var weightCount = network.layers[layerIndex].nodes[nodeIndex].weights.length;
        for( var weightIndex = 0; weightIndex < weightCount; weightIndex++){
          var weightDiff = this.changes[layerIndex][nodeIndex].weights[weightIndex] * weightLearningRate;
          network.layers[layerIndex].nodes[nodeIndex].weights[weightIndex] -= weightDiff;
        }
        var biasDiff = this.changes[layerIndex][nodeIndex].bias * biasLearningRate;
        network.layers[layerIndex].nodes[nodeIndex].bias -= biasDiff;
      }
    }
  }

}