import { NNNetworkObj } from "../structures/Network";
import {Sigmoid} from "./Sigmoid";
import { Memo } from "./Memo";
import { ManipulationMatrix } from "../structures/Manipulation";

export class Backprop {

  network : NNNetworkObj;
  expected : number[];
  biasCorrection : number[];
  weightCorrection: number[];

  constructor( network : NNNetworkObj, expected : number[]){
    this.network = network;
    this.expected = expected;
    this.biasCorrection = [];
    this.weightCorrection = [];
  }

  /**
   * Get the cost of each output node in form of an array
   *
   * @readonly
   * @memberof Backprop
   */
  get costArray() : number[]{
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

  get totalCost() : number{
    var costArr = this.costArray;
    return costArr.reduce( (a, b) => a + b);
  }

  /**
   * Get how the activity of the previous node affects the input (z) of the current node
   * z(a[current-1]) = sum( weights * prevAcitivites) + bias
   * z'(a[current-1]) = weight[prevNodeIndex];
   * 
   * @param {number} layerIndex
   * @param {number} currentNodeIndex
   * @param {number} prevNodeIndex
   * @returns
   * @memberof Backprop
   */
  deltaPrevActivityOnZ( layerIndex : number, currentNodeIndex: number, prevNodeIndex: number){
    return this.network.layers[layerIndex].nodes[currentNodeIndex].weights[prevNodeIndex];
  }

  /**
   * "z" is the sigmoid input
   * z(Bias) = sum( weights * prevAcitivities) + bias
   * z'(Bias) = 1;
   *
   * @returns
   * @memberof Backprop
   */
  deltaBiasOnZ(){
    return 1;
  }

  /**
   * z(weight[x]) = Sum ( weights * prevActivities) + bias
   * z'(weight[x]) = prevActivity[x];
   *
   * @param {number} layerIndex
   * @param {number} weightIndex
   * @returns
   * @memberof Backprop
   */
  deltaWeightOnZ(layerIndex : number, weightIndex : number) : number{
    if( layerIndex !== 0){
      return this.network.layers[layerIndex-1].nodes[weightIndex].activity;
    } else {
      return this.network.input && this.network.input[weightIndex] || 0;
    }
  }

  /**
   * activity(z) = Sigmoid( z )
   * activity'(z) = Sigmoid( z ) * (1 - Sigmoid(z))
   * @param {number} layerIndex
   * @param {number} nodeIndex
   * @returns
   * @memberof Backprop
   */
  deltaZOnActivity(layerIndex : number, nodeIndex: number){
    var zValue = this.network.layers[layerIndex].nodes[nodeIndex].zValue;
    var sig = Sigmoid.calc(zValue);
    return (sig * ( 1 - sig));
  }

  /**
   * cost(activity) = 0.5 * (activity - expectedActivity) ^ 2
   * cost'(activity) = activity - expectedActivity
   *
   * @param {number} layerIndex
   * @param {number} nodeIndex
   * @param {number} expectedIndex
   * @returns
   * @memberof Backprop
   */
  deltaActivityOnCost(layerIndex : number, nodeIndex: number, expectedIndex : number){
    return (this.network.layers[layerIndex].nodes[nodeIndex].activity - this.expected[expectedIndex]);
  }

  execute( manipulationMatrix : ManipulationMatrix){
    var memo = new Memo();
    memo.init( this.network.layers.length);
    
    // Counting backwards as layer[0] is the first hidden layer
    var layerCount = this.network.layers.length - 1;
    for( var layerIndex = layerCount; layerIndex >= 0; layerIndex--){
      var nodeCount = this.network.layers[layerIndex].nodes.length;
      for( var nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++){
        var expectedIndex = nodeIndex;
        
        if(layerIndex === layerCount){
          var activityOnCost = this.deltaActivityOnCost(layerIndex, nodeIndex, expectedIndex);
          memo.add(activityOnCost, layerIndex, nodeIndex);
        }

        var weightCount = this.network.layers[layerIndex].nodes[nodeIndex].weights.length;
        var zOnActivity = this.deltaZOnActivity(layerIndex, nodeIndex);

        var activityOnCost = memo.get( layerIndex, nodeIndex);

        var biasOnZ = this.deltaBiasOnZ();
        var biasOnCost = biasOnZ * zOnActivity * activityOnCost;

        manipulationMatrix.addBias( biasOnCost, layerIndex, nodeIndex);
        //console.log(`Effect of increasing bias of layer[${layerIndex}].nodes[${nodeIndex}] on error: ${biasOnCost}`);

        for( var weightIndex = 0; weightIndex < weightCount; weightIndex++){
          // every weight connects to a node
          var prevNodeIndex = weightIndex;

          var weightOnZ = this.deltaWeightOnZ(layerIndex, weightIndex);
          var weightOnCost = weightOnZ * zOnActivity * activityOnCost;
          //console.log(`Effect of increasing weight of layer[${layerIndex}].nodes[${nodeIndex}].weights[${weightIndex}] on error: ${weightOnCost}`);

          manipulationMatrix.addWeight( weightOnCost, layerIndex, nodeIndex, weightIndex);

          if( layerIndex > 0){
            var prevActivityOnZ = this.deltaPrevActivityOnZ(layerIndex, nodeIndex, prevNodeIndex);
            var prevActivityOnCost = prevActivityOnZ * zOnActivity * activityOnCost;
            memo.add( prevActivityOnCost, layerIndex-1, prevNodeIndex);
          }
        }

      }
    }
  }

}