import { NNLayer, NNLayerObj } from "./Layer";

export interface NNNetworkObj {

  layers : NNLayer[];

}

export class NNNetwork implements NNNetworkObj{

  layers : NNLayer[];

  constructor(){
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
  init(inputLength: number, nodesInLayer : number[], weightsInLayer : number[], biasInLayer: number[]): void{
    this.layers = [];
    if( nodesInLayer.length !== weightsInLayer.length ||
      nodesInLayer.length !== biasInLayer.length){
        throw new Error("Initializing NN failed - array lengths don't match");
    }
    for( var i = 0; i < nodesInLayer.length; i++){
      var prevNodes;
      if( i === 0){
        prevNodes = inputLength;
      } else {
        prevNodes = nodesInLayer[i-1];
      }
      var newLayer = new NNLayer();
      newLayer.init(nodesInLayer[i],prevNodes,weightsInLayer[i], biasInLayer[i]);
      this.layers.push(newLayer);
    }
  }

  /**
   * Load a network based on prior layer definitions
   *
   * @param {NNLayerObj[]} layers
   * @memberof NNNetwork
   */
  load( layers: NNLayerObj[]): void{
    this.layers = [];
    for(let layer of layers){
      var newLayer = new NNLayer();
      newLayer.load(layer);
      this.layers.push(newLayer);
    }
  }

}