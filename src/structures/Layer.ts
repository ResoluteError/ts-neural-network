import { NNNodeObj, NNNode } from "./Node";


export interface NNLayerObj {

  nodes : NNNode[];

}

export class NNLayer implements NNLayerObj {

  nodes : NNNode[];

  constructor(){
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
  init(breadth: number, inputNodes: number, weightRange : number, biasRange: number): void{
    this.nodes = [];
    for( var i = 0; i < breadth; i++){
      var newNode = new NNNode();
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
  load(layer : NNLayerObj): void{
    this.nodes = [];
    for( var node of layer.nodes){
      var newNode = new NNNode();
      newNode.load(node);
      this.nodes.push( newNode);
    }
  }

  /**
   * export current layer to reload in next run
   *
   * @returns {NNLayerObj}
   * @memberof NNLayer
   */
  export() : NNLayerObj{
    return {
      nodes : this.nodes
    }
  }

  /**
   * Calculate the values of this layer based on the activations from the previous layer
   *
   * @param {number[]} inputValues - activations from previous layer or input
   * @returns {number[]} - activations of this layer
   * @memberof NNLayer
   */
  calculateValues( inputValues : number[]) : number[]{
    var resultArr = [];
    for( var node of this.nodes){
      resultArr.push( node.calculateValue(inputValues));
    }
    return resultArr;
  }

}