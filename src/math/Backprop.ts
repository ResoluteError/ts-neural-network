import { NNNetworkObj } from "../structures/Network";
import {Sigmoid} from "./Sigmoid";

export class Backprop {

  network : NNNetworkObj;
  expected : number[]

  constructor( network : NNNetworkObj, expected : number[]){
    this.network = network;
    this.expected = expected;
  }

  get costArray() {
    var costArr = [];
    var output = this.network.layers[ this.network.layers.length -1].nodeActivity;
    if(output.length !== this.expected.length){
      throw new Error(`Ouput length (${output.length}) and expected length (${this.expected.length}) don't match!`);
    }
    for(var i = 0; i < output.length; i++){
      costArr.push(Math.pow(output[i] - this.expected[i],2)/2);
    }
    return costArr;
  }

  deltaBiasOnZ(){
    return 1;
  }

  deltaWeightOnZ(layerIndex : number, nodeIndex: number){
    if( layerIndex !== 0){
      return this.network.layers[layerIndex-1].nodes[nodeIndex].activity;
    } else {
      return this.network.input && this.network.input[nodeIndex];
    }
  }

  deltaZOnActivity(layerIndex : number, nodeIndex: number){
    var zValue = this.network.layers[layerIndex].nodes[nodeIndex].zValue;
    var sig = Sigmoid.calc(zValue);
    return (sig * ( 1 - sig));
  }

  deltaActivityOnCost(layerIndex : number, nodeIndex: number, expectedIndex : number){
    return (this.network.layers[layerIndex].nodes[nodeIndex].activity - this.expected[expectedIndex]);
  }

}